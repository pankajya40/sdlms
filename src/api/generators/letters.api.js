"use strict";

const db = require('../../database');
const User = require('../../user');
const utilities =  require('../../controllers/utils');
const {joiningLetter} = require('../../generators');
const { ObjectId } = require('mongodb');

const joiningLetterApi = module.exports;

const collectionName = db.collections.GLOBAL.GENERATORS;


joiningLetterApi.getTemplates = async (req) => {
    const uid = parseInt(req.uid);
    const keys = {
        type: 'generators:joining_letter:template'
    };
    const order = {_id: -1}

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
    const {id} = req.query;

    if (id) {
        if (id.length != 24) {
            throw new Error('Invalid Id supplied');
        }

        return await db.findField(collectionName, {...keys, _id: ObjectId(id)});
    }

    const [templates=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    const templateData = await Promise.all(templates.map(async (template) => {
        let data = {};
        ['_id', 'templateName', 'updatedAt'].forEach(el => {
            data[el] = template[el];
        })

        data.user = await User.getUserFields(template.uid, ['username', 'fullname']);

        return data;
    }));

    return utilities.paginate(`/generators${req.url}`, templateData, count, limit, page);
}

joiningLetterApi.createTemplate = async (req) => {
    const uid = parseInt(req.uid);
    const {templateName, company, letterHeadTemplate} = req.body;
    const currentTime = utilities.getISOTimestamp();

    const payload = {
        uid, templateName, company, letterHeadTemplate
    };

    payload.createdAt = currentTime;
    payload.updatedAt = currentTime;
    payload.type = 'generators:joining_letter:template';

    return await db.setField(collectionName, payload);
}

joiningLetterApi.updateTemplate = async (req) => {
    const uid = parseInt(req.uid);
    const {templateName, company, letterHeadTemplate} = req.body;
    const {id} = req.params;
    const currentTime = utilities.getISOTimestamp();

    if (id.length != 24) {
        throw new Error('Invalid Id supplied');
    }

    const payload = {};
    const keys = {
        uid, _id: ObjectId(id),
        type: 'generators:joining_letter:template',
    }

    if (templateName) {
        payload.templateName = templateName;
    }
    if (company) {
        payload.company = company;
    }

    if (letterHeadTemplate) {
        payload.letterHeadTemplate = letterHeadTemplate;
    }

    payload.updatedAt = currentTime;
    payload.type = 'generators:joining_letter:template';

    const state = await db.updateField(collectionName, keys, {$set: payload});
    return {
		updated: state.result.n === 1
	};
}

joiningLetterApi.deleteTemplate = async (req) => {
    const uid = parseInt(req.uid);
    const {id} = req.params;

    if (id.length != 24) {
        throw new Error('Invalid Id supplied');
    }

    const keys = {
        uid, _id: ObjectId(id),
        type: 'generators:joining_letter:template',
    }

    const state = await db.removeField(collectionName, keys);
    return {
		deleted: state.result.n === 1
	};
}

joiningLetterApi.generateLettersInBatch = async (req) => {
    const uid = parseInt(req.uid);
    const currentTime = utilities.getISOTimestamp();
    let {templateId, requestName, projectRoles, dateOfJoining, timings, role, honorarium, batchList} = req.body;

    const payload = {
        uid, requestName, projectRoles, timings, batchList: batchList || [], dateOfJoining, honorarium, role
    };

    const templateData = await db.findField(collectionName, {
    	_id: ObjectId(templateId),
    	type: 'generators:joining_letter:template'
    })

    if (!templateData) {
        throw new Error('Invalid template id supplied, no template was found!');
    }

    const {company, letterHeadTemplate} = templateData;

    payload.templateId = ObjectId(templateId);
    payload.dateOfJoiningRaw = new Date(dateOfJoining).toISOString();
    payload.createdAt = currentTime;
    payload.updatedAt = currentTime;
    payload.status = 'in_progress';
    payload.type = 'generators:joining_letter:request';

    let acknowledgement = await db.setField(collectionName, payload);

    // Invoking a load intensive and lengthy task to generate letters one-by-one.
    generateJoiningLettersInBatch(batchList, {user: payload, company}, acknowledgement, letterHeadTemplate);

    return acknowledgement;
}

joiningLetterApi.getGeneratedLetters = async (req) => {
    const uid = parseInt(req.uid);
    const keys = {
        type: 'generators:joining_letter:request'
    };
    const order = {_id: -1}

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    const [requests=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    const requestData = await Promise.all(requests.map(async (request) => {
        let data = {}
        let filtered = ['_id', 'requestName', 'updatedAt'];

        filtered.forEach(el => {
            data[el] = request[el];
        });

        data.totalItems = request.batchList.length;
        data.processedItems = (request.processedItems || []).length;

        data.user = await User.getUserFields(request.uid, ['username', 'fullname']);
        return data;
    }));

    return utilities.paginate(`/generators${req.url}`, requestData, count, limit, page);
}

async function generateJoiningLettersInBatch (batchList=[], data={}, request, templateName) {
    const {_id} = request;

    await Promise.all(batchList.map(async (element) => {
        let {user} = data;
        user = {...element, ...user};

        let generatedFileUrl = await joiningLetter.generateJoiningLetter({...data, user}, templateName, [element.firstname]);
        await db.updateField(collectionName, 
            {_id: ObjectId(_id)}, 
            {$addToSet: {processedItems: {...element, url: generatedFileUrl}}});
    }));
}