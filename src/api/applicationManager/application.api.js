"use strict";

const db = require('../../database');
const User = require('../../user');
const utilities =  require('../../controllers/utils');
const { ObjectId } = require('mongodb');

const applicationApi = module.exports;

const collectionName = db.collections.GLOBAL.APPLICATION_MANAGER;

applicationApi.createProject = async (req) => {
    const {content, name, videoUrl, personForm, assignmentForm, rubricId} = req.body;

    const payload = {
        name, content, videoUrl,
    };

    if (rubricId.length != 24) {
        throw new Error('Invalid rubric id');
    }

    const rubric = await db.findField(collectionName, {_id: ObjectId(rubricId), type: 'rubric'});
    if (!rubric) {
        throw new Error('No rubric was found with the supplied id');
    }

    const forms = [];

    forms.push({
        url: personForm,
        type: 'persona',
        formId: extractGFormId(personForm)
    });

    forms.push({
        url: assignmentForm,
        type: 'assignment',
        formId: extractGFormId(assignmentForm)
    });

    payload.rubricId = ObjectId(rubricId);
    payload.forms = forms;

    payload.createdAt = utilities.getISOTimestamp();
    payload.type = 'project';

    return await db.setField(collectionName, payload);
}

applicationApi.createRubric = async (req) => {
    const {rubrics} = req.body;

    if (!rubrics) {
        throw new Error('rubrics is required and must be an array');
    }

    if (!Array.isArray(rubrics)) {
        throw new Error(`rubrics must be an array, found ${typeof rubrics} instead`);
    }

    if (!rubrics.length) return;

    const errors = [];
    const payload = {
        createdAt: utilities.getISOTimestamp(),
    };

    payload.rubrics = rubrics.map((elem, ind) => {
        if (!elem.hasOwnProperty('remark') || !elem.hasOwnProperty('shortCode') || !elem.hasOwnProperty('scale')) {
            errors.push(ind+1);
        }

        let {remark, shortCode, scale} = elem;

        return {
            id: utilities.generateUUID(), 
            remark, shortCode, scale
        };
    });

    if (errors.length) {
        throw new Error(`Improper structure (missing properties) of rubric at position ${errors.join(', ')}`);
    }

    payload.type = 'rubric';
    
    return await db.setField(collectionName, payload);
}

applicationApi.createApplication = async (req) => {
    const {formUrl, name, appliedAt} = req.body;

    const payload = {};
    
    const project = await db.findField(collectionName, {
        'forms.formId': {$regex: new RegExp(extractGFormId(formUrl)), $options: 'i'},
    });

    if (!project) {
        throw new Error('No project was found associated with the supplied form URL');
    }

    payload.name = name;
    payload.projectId = project ? ObjectId(project._id) : null;
    payload.rubricId = project ? ObjectId(project.rubricId) : null;
    payload.feedbackId = null;
    payload.createdAt = utilities.getISOTimestamp();
    payload.appliedAt = new Date(isNaN(appliedAt) ? appliedAt : Number(appliedAt)).toISOString();
    payload.type = 'application';

    return await db.setField(collectionName, payload);
}

applicationApi.addFeedbackToApplication = async (req) => {
    // Here feedback id is the id of the rubric
    const {feedbackId} = req.body;
    const {applicationId} = req.params;
    const uid = parseInt(req.uid);

    if (applicationId.length != 24) {
        throw new Error('Invalid application id');
    }

    const payload = {};
    const keys = {
        _id: ObjectId(applicationId),
        type: 'application',
    };

    const application = await db.findField(collectionName, keys);
    if (!application) {
        throw new Error('No application was found with the supplied id');
    }

    if (application.reviewed && application.reviewedBy) {
        throw new Error('Application has already been reviewed');
    }

    const rubricsData = await db.findField(collectionName, {_id: ObjectId(application.rubricId)});
    if (!rubricsData) {
        throw new Error(`Couldn't find record for rubric for the current application`);
    }

    const feedback = (rubricsData.rubrics || []).find(el => el.id == feedbackId.trim());
    if (!feedback) {
        throw new Error('No feedback was found with the supplied id');
    }
    
    payload.feedbackId = feedbackId;
    payload.feedback = feedback;
    payload.updatedAt = utilities.getISOTimestamp();
    payload.reviewed = true;
    payload.reviewedBy = uid;

    const acknowledgement = await db.updateField(collectionName, keys, {$set: payload});
    return { reviewed: acknowledgement.result.n === 1 };
}

applicationApi.getLeaderboard = async (req) => {
    const {projectId} = req.params;
    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    if (projectId.length != 24) {
        throw new Error('Invalid project id');
    }

    const order = {_id: -1};
    const keys = {
        projectId: ObjectId(projectId),
        type: 'application'
    };

    const [records=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    return utilities.paginate(`/application_manager${req.url}`, records, count, limit, page);
}

applicationApi.getProjects = async (req) => {
    const {projectId} = req.params;
    const uid = parseInt(req.uid);

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    const order = {_id: -1};
    const keys = {
        type: 'project'
    };

    if (projectId) {
        if (projectId.length != 24) {
            throw new Error('Invalid project id');
        }

        return await db.findField(collectionName, {...keys, _id: ObjectId(projectId)});
    }

    const [projects=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    const projectsData = projects.map(project => {
        // content is a huge payload, therefore clearing it out.
        // Content can be fetched while retriving individual project by its _id
        delete project.content;

        return project;
    });

    return utilities.paginate(`/application_manager${req.url}`, projectsData, count, limit, page);
}

function extractGFormId(formUrl) {
    if (!formUrl) return;

    if (typeof formUrl != 'string') {
        throw new Error(`formUrl must be an string, found ${typeof formUrl}`);
    }

    const match = formUrl.match(new RegExp('d\/e\/(.*?)\/'));
    if (Array.isArray(match) && match.length) {
        return match[1];
    }

    else throw new Error('Invalid GForm link! Please enter the form URL without shortening it');
}