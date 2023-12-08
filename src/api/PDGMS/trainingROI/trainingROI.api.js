"use strict";

const db = require('../../../database');
const User = require('../../../user');
const utilities =  require('../../../controllers/utils');
const { ObjectId } = require('mongodb');

const trainingROIAPI = module.exports;

/**
 * @description this function will give the count of word or character
 * @param {*} uid user id of the user whom the count is to be calculated
 * @param {*} builderType could be 'tb' or 'eb' ( thraed builder or eagle builder)
 * @param {*} type type could be 'characters' or 'words'
 * @returns character count or word count of the user from the given builder
 */
const countByUserId = async (uid,builderType, type) => {
    const collectionName = db.collections.DEFAULT;
    builderType = builderType.toLowerCase();
    const keys = {
        uid,
        type:'attendance',
    }

    const response = await db.findField(collectionName, keys, ['userCount']);
    if(response.result.length === 0){
        return 0;
    }
    const { tb, eb }= response.result[0].stats;
    if(builderType === 'tb'){
        const {characters, words } = tb.count;
        if(type === 'characters'){
            return characters;
        }else if(type === 'words'){
            return words;
        }
    }else if(builderType === 'eb'){
        const {characters, words } = eb.count;
        if(type === 'characters'){
            return characters;
        }else if(type === 'words'){
            return words;
        }
    }
}

const calculateAverage = async(sessionTid,builderType, type) => {
    // we could create some sort of system to keep track the state of the session

    builderType= builderType.toLowerCase();
    const userList = await getUserIdList(sessionTid, type);
    const totalUser = userList.length;
    const totalCount = 0;
    for(const uid in userList ){
        const count = await countByUserId(uid,builderType, type);
        totalCount += count;
    }
    return totalCount/totalUser;
    // while calculating the average the ' 0 ' count might be a problem since it lowers the average count
}
/**
 * 
 * @param {*} sessionTid the sessions id to find the  attendees 
 */


// get specific report , feedback and reflection by using a query,

/**
 * @param { * } 
 */

const getUserIdList = async(sessionTid, type)=> {
    const collectionName = db.collections.DEFAULT;
    const keys = {
        $and: [{ $or: [{ topicId: sessionTid }, { tid: sessionTid }] }],
        type: 'session',
    };
    const { result: { attendance } } = await db.findField(collectionName, keys, ['attendance']);
    // return attendance;
    // returns a list of attendees uid
}

// time creting 
trainingROIAPI.createReport = async function (req) {
	 const dataCollection = db.collections.DEFAULT; // just a place holder

     const tid = parseInt(req.body.tid); // getting session Tid
	//  const keys = {
	// 	 $and: [{ $or: [{ topicId: tid }, { tid: tid }] }],
	// 	 type: 'session',
	//  };
	 const { result : { members, attendance }} = await db.findField(dataCollection, {
        $and: [{ $or: [{ topicId: tid }, { tid: tid }] }],
        type: 'session',
    }, ['members', 'attendance']);

     // filter the attendes( the object thing into ) [ 45, 32, 23, 77 ]
     attendance.filter(attendee => {
        return attendee.filter( info => {
            return info.uid;
        })
     });

     members.filter(uid => {
        return uid;
     });
     var data = [];

    const currntTime = Date.now(); // utilites function to get the current time( utilities.getISOTimestamp() )
    const payload = {
        uid,
        flag,
        isAbsent,
        sessionTid,
        type: "report",
        createdAt: currentTime,
        updatedAt: currentTime,
        userCount,
        averageCount
    }

    const response = await db.setField(collectionName, payload);
    return response;
};

trainingROIAPI.updateReport = async function (req) {
    const collectionName = db.collections.PDGMS.TRAININGROI;

    // checking if feedbackId and uid is given and if report id is given 
    const uid = parseInt(req.uid);
    const reportId = ObjectId(req.params.reportId);
    const { flag } = req.body;

    // uid is required to update the report
    const keys = {
        _id: reportId,
        type: "report",
    }
    
    const currentTime = Date.now();
    const payload = {
        flag,
        updatedAt: currentTime,
    }
    const response= db.updateField(collectionName,keys, {$set: payload});
    return response;
}

trainingROIAPI.getReport = async function (req) {
    const collectionName = db.collections.PDGMS.TRAININGROI;

    const reportId = ObjectId(req.params.reportId);
    const keys = {
        _id: reportId,
        // type: "report",
    }

    const response = await db.findField(collectionName, keys);
    return response;
}

trainingROIAPI.deleteReport = async function (req) {
    const collectionName = db.collections.PDGMS.TRAININGROI;

    const reportId = ObjectId(req.params.reportId);
    const keys = {
        _id: reportId,
        // type: "report",
    }

    let state = await db.removeField(collectionName,keys);
    return { deleted: state.result.n === 1 };
}

trainingROIAPI.createFeedback = async function (req) {
   const collectionName = db.collections.PDGMS.TRAININGROI;

   if(!req.body.reportId || !req.uid){
         throw new Error('reportId or uid is missing'); // this could be checked from the router
   }

    const uid = parseInt(req.uid);
    const { content, reportId } = req.body;

    const currentTime = Date.now();
    const payload = {
        uid,
        content,
        reportId: ObjectId(reportId),
        type: "feedback",
        createdAt: currentTime,
        updatedAt: currentTime,
    };

    const response = await db.setField(collectionName, payload);
    return response;
}

trainingROIAPI.updateFeedback = async function (req) {
    const collectionName = db.collections.PDGMS.TRAININGROI;

    // checking if feedbackId and uid is given and if report id is given 
    const uid = parseInt(req.uid);
    const feedbackId = ObjectId(req.params.feedbackId);
    const { content } = req.body;

    const keys = {
        _id: feedbackId,
        // type: "feedback",
    }
    
    const currentTime = Date.now();
    const payload = {
        uid,
        updatedAt: currentTime,
    }
    if(content !== undefined){
        payload.content = content;
    }

    const response= db.updateField(collectionName,keys, {$set: payload}, {upsert: true});
    return response;
}

trainingROIAPI.getFeedback = async function (req) {
    const collectionName = db.collections.PDGMS.TRAININGROI;

    const feedbackId = ObjectId(req.params.feedbackId);
    const keys = {
        _id: feedbackId,
        // type: "feedback",
    }

    const response = await db.findField(collectionName, keys);
    return response;
}

trainingROIAPI.deleteFeedback = async function (req) {
    const collectionName = db.collections.PDGMS.TRAININGROI;

    const feedbackId = ObjectId(req.params.feedbackId);
    const keys = {
        _id: feedbackId,
        // type: "feedback",
    }

    let state = await db.removeField(collectionName,keys);
    return { deleted: state.result.n === 1 };
}

trainingROIAPI.createReflection = async function (req) {
    const collectionName = db.collections.PDGMS.TRAININGROI;

    if(!req.body.reportId || !req.uid){
        throw new Error('reportId or uid is missing'); // this could be checked from the router
    }

    const uid = parseInt(req.uid);
    const { content } = req.body;

    const currentTime = Date.now();
    const payload = {
        uid,
        content,
        reportId: ObjectId(reportId),
        type: "reflection",
        createdAt: currentTime,
        updatedAt: currentTime,
    };

    const response = await db.setField(collectionName, payload);
    return response;
}

trainingROIAPI.updateReflection = async function (req) {
    const collectionName = db.collections.PDGMS.TRAININGROI;

    // checking if feedbackId and uid is given and if report id is given 
    const uid = parseInt(req.uid);
    const reflectionId = ObjectId(req.params.reflectionId);
    const { content } = req.body;

    const keys = {
        _id: reflectionId,
        // type: "reflection",
    }
    
    const currentTime = Date.now();
    const payload = {
        uid,
        updatedAt: currentTime,
    }
    if(content !== undefined){
        payload.content = content;
    }

    const response= db.updateField(collectionName,keys, {$set: payload}, {upsert: true});
    return response;
}

trainingROIAPI.getReflection = async function (req) {
    const collectionName = db.collections.PDGMS.TRAININGROI;

    const reflectionId = ObjectId(req.params.reflectionId);
    const keys = {
        _id: reflectionId,
        // type: "reflection",
    }

    const response = await db.findField(collectionName, keys);
    return response;
}

// delete reflection, get multiple reflections, multiple feedbacks, multiple reports etc