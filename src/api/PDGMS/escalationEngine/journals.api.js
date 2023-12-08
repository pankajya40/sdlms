"use strict";

const db = require('../../../database');
const utilities =  require('../../../controllers/utils');

const escalationEngineFields = ['title', 'content', 'stimulus', 'rating', 'category'];
const { ObjectId } = require('mongodb');
const collectionName = db.collections.GLOBAL.JOURNAL;
const escalationEngineApi = module.exports;


escalationEngineApi.writeJournal=async function(req){
    const uid=parseInt(req.uid);

    if(uid < 0) return ;

    const {isPublic} = req.body;
    const currentTime = Date.now();

    const payload={};
    payload.uid = uid;

    escalationEngineFields.forEach(item => payload[item] = req.body[item] || null);

    payload.createdAt=new Date(currentTime).toISOString();

    payload.updatedAt=new Date(currentTime).toISOString();

    payload.isPublic = JSON.stringify(isPublic);
    payload.isPublic.toLowerCase();
    payload.type="journal";
    return await db.setField(collectionName, payload);
}

escalationEngineApi.getJournals = async function (req) {
    const uid = parseInt(req.uid);
    const keys = {
        type: 'journal',
    };

    // fetch via object id of a particular Journal

    if(req.body.id){
        const journal = await db.findField(collectionName, {...keys, _id:ObjectId(req.body.id)});
        return journal;
    }
    
    // fetch all journals for particular uid or all the journals in the database

    else {
        if(req.body.uid) keys.uid = req.body.uid;
        const order = { _id: -1 };

        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 5;

        const journals = await db.getFieldsWithPagination(collectionName, keys, limit, page, order);
        return journals;
    }
}

escalationEngineApi.addToLearningAgenda = async function(req) {
    const collectionName = db.collections.GLOBAL.LEARNING_AGENDA;
    const uid = parseInt(req.uid);
	const currentTime = Date.now();
    const validPriorities = ['urgent', 'normal'];

    const { priority="", id } = req.body;

    const payload = {uid};

    if (!validPriorities.includes(priority)) {
        throw new Error('Invalid priority supplied, valid priorities are: ' + validPriorities.join(', '));
    }

    ['title', 'description', 'taggedProject', 'deadline'].forEach((elem) => {
        if (req.body[elem]) {
            payload[elem] = req.body[elem];
        }
    })

    payload.status = "incomplete";
    payload.priority = priority;
    payload.createdAt = new Date(currentTime).toISOString();
    payload.updatedAt = new Date(currentTime).toISOString();
    payload.type = "journal:todos";


    // // if a journal has to be added in learning agenda

    // if(req.body.id){
    //     const keys = {_id: ObjectId(req.body.id)}
    //     const fetched = await db.findField(collectionName, keys);
    //     payload.title =  fetched.title;

    //     payload.description = fetched.content;
    //     payload.taggedProject = req.body.taggedProject != null ? req.body.taggedProject : "";
        
    // }

    // // if manager's desc has to be added as learning agenda

    // // learning agenda can be made by 3 ways:- a) personally written  b) given my other people  c) managers and higher ups

    // else {
    //     payload.title = req.body.title != null ? req.body.title : "";
    //     payload.description = req.body.description != null ? req.body.description : "";
    //     payload.taggedProject = req.body.taggedProject != null ? req.body.taggedProject : "";
    //     // scheduleFrom: req.body.scheduleFrom != null ? req.body.scheduleFrom : "",
    //     payload.deadline = req.body.deadline; // deadline
    //     // jornals: [],
        
    // }
	return await db.setField(collectionName, payload);
}

escalationEngineApi.getLearningAgenda = async function (req) {
    const uid = req.uid;
    const keys = {
        uid,
        type: 'journal:todos',
    };
    const order = { _id: -1 };

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    if(req.body.type) keys.type = req.body.type;
    if(req.body.date) keys.date = req.body.date;

    return await db.getFieldsWithPagination(collectionName, keys, limit, page, order);
}

escalationEngineApi.editLearningAgenda = async function(req) {
    const uid = parseInt(req.uid);
    const _id = ObjectId(req.body.id);
    const currentTime = Date.now();
    const keys = {_id};

    let field = await db.findField(collectionName, keys);
    const createdAt = field.createdAt;
    if(!field){
        throw new Error("Learning Agenda not found");
    }

    if(field.uid != uid){
        throw new Error("Not authorized");
    }

    const payload = {
        uid,
		title: req.body.title != null ? req.body.title : field.title,
		status: req.body.status != null ? req.body.status : field.status,
		priority: req.body.priority != null ? req.body.priority : field.priority,
		description: req.body.description != null ? req.body.description : field.description,
		taggedProject: req.body.taggedProject != null ? req.body.taggedProject : field.taggedProject,
		// scheduleFrom: req.body.scheduleFrom != null ? req.body.scheduleFrom : "",
		deadline: req.body.deadline != null ? req.body.deadline : field.deadline,
		// jornals: [],
		createdAt: createdAt,
		updatedAt: currentTime,
        type: "journal:todos",
	};

    const result = await db.updateFieldWithMultipleKeys(collectionName, {...keys, uid}, payload);
    return result;
}

escalationEngineApi.deleteLearningAgenda = async function(req) {
    const uid = parseInt(req.uid);
    const _id = ObjectId(req.query);

    const keys = {_id};
    let field = await db.findField(collectionName, keys);
    if(!field) {
        throw new Error ("No such LearningAgenda found!");
    }

    if(field.uid != uid){
        throw new Error("Not authorized");
    }

    let state = await db.removeField(collectionName, {...keys, uid});
    return { deleted: state.result.n === 1 };
}

escalationEngineApi.writeFeedback=async function(req){
    const uid=parseInt(req.uid);
    const payload={};
    payload.uid=uid;
    const feedbackLevel={};
    feedbackLevel.type=req.body.type;
    feedbackLevel.type=req.body.content;
    const currentTime = Date.now();

    ['content', 'asset_owner_uid', 'learningAgenda', 'feedback_for','feedback_to','feedbackType','attachment_id',
    'attachment_type'].forEach(item => payload[item] = req.body[item] || null);
    
    payload.createdAt=new Date(currentTime).toISOString();

    payload.updatedAt=new Date(currentTime).toISOString();
    payload.type='journal:feedback';

    return await db.setField(collectionName, payload);
}

escalationEngineApi.getFeedbacks = async function (req) {
    const uid = parseInt(req.uid);
    
    const keys = {
        uid,
        type: 'journal:feedback',
    };
    const order = { _id: -1 };

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    const journals = await db.getFieldsWithPagination(collectionName, keys, limit, page, order);
    return journals;
}


// Data Model For FeedBack

// const feedback = {
//     ObjectId : "",
//     uid: "",
//     content: data.body.content,
//     asset_owner_uid: asset_owner_uid,
//     learningAgenda : [],  
//     feedback_for: feedbackFor.type,
//     feedback_to: feedbackTo,
//     feedbackType: "ps/appr", // for normal user -> empty
//     feedbackLevel: {
//       type: "rating/emo/",
//       content: "",
//     } ,
//     attachment_id: (data.body.attachment_id), //journalId
//     attachment_type: data.body.attachment_type,
//     created: currentTime,
//     modified: currentTime,
//     type: 'journal:feedback',
  
//   }