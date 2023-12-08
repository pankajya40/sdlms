"use strict";

const db = require('../../database');
const User = require('../../user');
const utilities =  require('../../controllers/utils');
const { ObjectId } = require('mongodb');
const {paths} = require('../../constants');
const adapters = require('../../adapters');
const emailer = require('./emailer/emailer');
const {allowedUsers} = require('../../controllers/observation/videoRef/config');
const observationApi = require('./observation.api');

const videoRefApi = module.exports;

const collectionName = db.collections.GLOBAL.OBSERVATION;

videoRefApi.createUserEntry = async (req) => {
    const uid = parseInt(req.uid);
    let {email, name, companyId, contact, role, projectName} = req.body;

    email = email.trim().toLowerCase();

    const payload = {
        uid,
        name,
        email,
        companyId: ObjectId(companyId),
        role, projectName,
        contact,
        createdAt: utilities.getISOTimestamp(),
        type: 'videoref:profile'
    }

    const userEntry = await db.findField(collectionName, {uid, type: 'videoref:profile'});
    if (userEntry) {
        await db.updateField(collectionName, {_id: ObjectId(userEntry._id)}, {$set: payload});
        return {...userEntry, ...payload};
    }

    return await db.setField(collectionName, payload);
}

videoRefApi.submitReflection = async (req) => {
    const uid = parseInt(req.uid);
    const createdAt = utilities.getISOTimestamp();
    let {email, profileId, reflection} = req.body;
    email = email.trim().toLowerCase();

    const keys = {
        uid,
        profileId: ObjectId(profileId),
        type: 'videoref:profile:reflection'
    }

    const [acknowledgement, me] = await Promise.all([
        db.updateField(collectionName, keys, {$set: {...keys, reflection, createdAt, email}}, {upsert: true}),
        User.getUserFields(uid, ['username', 'fullname']),
    ]);


    // let acknowledgement = await db.updateField(collectionName, keys, {$set: {...keys, reflection, createdAt}}, {upsert: true});

        // console.log(acknowledgement)
        // if(me){
        //     // console.log(me)
        //     const to = me.fullname || me.username;
        //     const from = 'shawan@deepthought.education';
        
        //     // await emailer.sendNewLeaveAlert(from, to, 'mohitjakhotra@gmail.com');
        //     await adapters.email.sendCompiledEmail('shawan@deepthought.education', '<h1>Testing email with sendgrid</h1>', 'Testing email with sendgrid');
        // }
        
    

    // return acknowledgement;
   
}

videoRefApi.submitAcknowledgement = async (req) => {
    const {reflectionId} = req.params;
    const uid = parseInt(req.uid);

    if (reflectionId.length != 24) {
        throw new Error('Invalid reflection Id supplied');
    }

    const keys = {
        _id: ObjectId(reflectionId),
        type: 'videoref:profile:reflection',
        uid,
    };

    const reflection = await db.findField(collectionName, keys);
    if (!reflection) {
        throw new Error('No reflection was found with the supplied parameters');
    }

    const payload = {
        acknowledgements: {}
    };

    ['voiceNote', 'punctuality', 'whatsappGroup'].forEach(el => {
        if (req.body[el]) {
            payload['acknowledgements'][el] = req.body[el] == 'on';
        }
    });

    // Let the promises get resolved in series so that the code never proceeds ahead with fail
    await db.updateField(collectionName, keys, {$set: payload}, {$upsert: false});
    await observationApi.startObservation({
        uid: req.uid,
        body: {consentProvided: true}
    });
}

videoRefApi.getSubmissions = async (req) => {
    const uid = parseInt(req.uid);
    const {id} = req.query;
    
    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not allowed to perform this action');
    }

    if (id) {
        return await db.findField(collectionName, {_id: ObjectId(id), type: 'videoref:profile:reflection'});
    }

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
    const order = {_id: -1};

    const [submissions=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, {type: 'videoref:profile:reflection'}, limit, page, order),
		db.countDocuments(collectionName, {type: 'videoref:profile:reflection'}),
	]);

    const submissionData = await Promise.all(submissions.map(async(elem) => {
        let user = await db.findField(collectionName, {_id: ObjectId(elem.profileId)});
        let company = await db.findField(collectionName, {_id: ObjectId(user.companyId)});

        if (company) {
            user.company = company.name;
        } else {
            user.company = '--';
        }

        delete elem.reflection;
        return {...elem, user};
    }));

    return utilities.paginate(`/observation${req.url}`, submissionData, count, limit, page);
}