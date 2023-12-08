"use strict";

const db = require('../../database');
const User = require('../../user');
const _ = require('lodash');
const slugify = require('../../slugify');
const utilities =  require('../../controllers/utils');
const { ObjectId } = require('mongodb');
const { youtubeVideoIdParser, getCurrentDayOfObservation } = require('./utils');
const {paths} = require('../../constants');
const adapter = require('../../adapters');
const {allowedUsers} = require('../../controllers/observation/videoRef/config');
const {defaultWhatsAppGroupURL, defaultYoutubeVideoURL} = require('../../controllers/observation/config');

const observationsAPI = module.exports;

const collectionName = db.collections.GLOBAL.OBSERVATION;

observationsAPI.startObservation = async (req) => {
    const uid = parseInt(req.uid);
    const currentTime = utilities.getISOTimestamp();
    const {consentProvided} = req.body;
    
    const payload = {
        uid, consentProvided: JSON.parse(_.isBoolean(consentProvided) ? consentProvided : consentProvided.toLowerCase()),
    }

    payload.createdAt = currentTime;
    payload.type = 'observation';

    await db.updateField(collectionName, {uid, type: 'observation'}, {$set: payload}, {upsert: true});

    return { started: true };
}

observationsAPI.createReflection = async (req) => {
    const uid = parseInt(req.uid);
    const {content, observationDetails} = req.body;
    const currentTime = utilities.getISOTimestamp();

    const payload = {
        uid, content,
        observationDetails: ObjectId(observationDetails),
    }

    payload.createdAt = currentTime;
    payload.updatedAt = currentTime;
    payload.type = 'observation:reflection';

    return await db.setField(collectionName, payload);
}

observationsAPI.deleteReflection = async (req) => {
    const uid = parseInt(req.uid);
    const {id} = req.params;

    const keys = {
        uid, 
        _id: ObjectId(id),
        type: 'observation:reflection'
    }

    let state = await db.removeField(collectionName, keys);
    return {
		deleted: state.result.n === 1,
	};
}

observationsAPI.createObservation = async (req) => {
    const uid = parseInt(req.uid);
    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not alowed to do this operation');
    }

    const {name, whatsAppGroup, observationPeriod, poc} = req.body;
    const currentTime = utilities.getISOTimestamp();

    let {videoUrl} = req.body;

    if (!videoUrl || !Array.isArray(videoUrl)) {
        videoUrl = [defaultYoutubeVideoURL];
    }

    const payload = {
        uid,
        name,
        whatsAppGroup: whatsAppGroup ? (isAValidUrl(whatsAppGroup) ? whatsAppGroup : 'https://' + whatsAppGroup) : defaultWhatsAppGroupURL,
        videoUrl,
        videoId: videoUrl.map(l => youtubeVideoIdParser(l)),
        poc,
        observationPeriod: parseInt(observationPeriod || 6),
        createdAt: currentTime,
        updatedAt: currentTime,
        type: 'observation:company'
    }

    return await db.setField(collectionName, payload);
}

observationsAPI.getObservations = async (req) => {
    const uid = parseInt(req.uid);
    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not alowed to do this operation');
    }

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
    const order = {_id: -1};

    const [observations=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, {type: 'observation:company'}, limit, page, order),
		db.countDocuments(collectionName, {type: 'observation:company'}),
	]);

    return utilities.paginate(`/observation${req.url}`, observations, count, limit, page);
}


observationsAPI.deleteObservation = async (req) => {
    const {id} = req.params;
    const uid = parseInt(req.uid);

    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not alowed to do this operation');
    }

    const state = await db.removeField(collectionName, {_id: ObjectId(id), type: 'observation:company'});
    return { deleted: state.result.n === 1 };
}

observationsAPI.editObservation = async (req) => {
    const {id} = req.params;
    const uid = parseInt(req.uid);
    const {videoUrl, observationPeriod} = req.body;

    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not alowed to do this operation');
    }

    const currentTime = utilities.getISOTimestamp();
    const payload = {};

    ['name', 'whatsAppGroup', 'poc'].forEach(el => {
        if (req.body[el]) {
            payload[el] = req.body[el];
        }
    });

    if (videoUrl) {
        payload.videoUrl = videoUrl;
        payload.videoId = youtubeVideoIdParser(videoUrl);
    }

    if (observationPeriod) {
        payload.observationPeriod = parseInt(observationPeriod);
    }

    payload.updatedAt = currentTime;

    const state = await db.updateField(collectionName, {_id: ObjectId(id), type: 'observation:company'}, {$set: payload});
    return { updated: state.result.n === 1 };
}

observationsAPI.getPage = async (req) => {
    const {name} = req.params;

    return await db.findField(collectionName, {slug: slugify(name), type: 'observation:page'});
}

observationsAPI.createPage = async (req) => {
    const uid = parseInt(req.uid);
    const currentTime = utilities.getISOTimestamp();
    const {name, content} = req.body;

    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not alowed to do this operation');
    }

    const payload = {
        uid, name, content
    };

    payload.slug = slugify(name);
    payload.createdAt = currentTime;
    payload.updatedAt = currentTime;
    payload.type = 'observation:page';

    return await db.setField(collectionName, payload);
}

observationsAPI.updatePage = async (req) => {
    const {slug} = req.params;
    const uid = parseInt(req.uid);
    const {content} = req.body;
    const currentTime = utilities.getISOTimestamp();

    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not alowed to do this operation');
    }

    const payload = {};
    if (!content) return;

    payload.content = content;
    payload.updatedAt = currentTime;

    const state = await db.updateField(collectionName, {slug, type: 'observation:page'}, {$set: payload});
    return { updated: state.result.n === 1 };
}

observationsAPI.submitReflectionResponse = async (req) => {
    const uid = parseInt(req.uid);
    const currentTime = utilities.getISOTimestamp();

    const {response} = req.body;
    if (!Array.isArray(response)) {
        throw new Error("Property 'response' must be an array");
    }

    let reflectionResponse = await db.findField(collectionName, {uid, type: 'observation:reflection:signoff'});
    if (reflectionResponse) {
        throw new Error('Sign-off reflection response already exists!');
    }

    const payload = {
        uid,
        response,
        createdAt: currentTime,
        type: 'observation:reflection:signoff'
    }

    return await db.setField(collectionName, payload);
}

observationsAPI.getLeaderboard = async (req) => {
    const uid = parseInt(req.uid);
    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
    const order = {_id: -1};

    const isAdmin = allowedUsers.includes(uid);
    var observationData = [];
    var count = 0;

    if (!isAdmin) {
        let [videoRefProfile, observationData] =  await Promise.all([
            db.findField(collectionName, {uid, type: 'videoref:profile'}),
            db.findField(collectionName, {uid, type: 'observation'})
        ]);
        if (videoRefProfile && observationData) {
            
        } else {
            [observationData=[], count=0] = await Promise.all([
                db.getFieldsWithPagination(collectionName, {type: 'videoref:profile'}, limit, page, order),
                db.countDocuments(collectionName, {type: 'videoref:profile'}),
            ]);

            let videoReflectionData = await Promise.all(observationData.map( async record => {
                let fields = {};
            
                fields.status = 'Video reflection';
                fields.profile = record || {};
                fields.poc = 'NA';

                return fields;
            }));

            return utilities.paginate(`/observation${req.url}`, videoReflectionData, count, limit, page);
        }
    } else {
        [observationData=[], count=0] = await Promise.all([
            db.getFieldsWithPagination(collectionName, {type: 'videoref:profile'}, limit, page, order),
            db.countDocuments(collectionName, {type: 'videoref:profile'}),
        ]);
    }

    const videoRefProfileData = await Promise.all(observationData.map( async (profile) => {
        let {uid, createdAt} = profile;
        let observation = await db.findField(collectionName, {uid, type: 'observation'});
        let currentObservationDay = getCurrentDayOfObservation(observation);
        
        let fields = {};

        if (observation) {
            fields = observation;
            fields.status = 'Observation';
        } else {
            fields.status = 'Video reflection';
            fields.createdAt = createdAt;
        }

        fields.profile = profile || {};
        fields.currentObservationDay = currentObservationDay;

        if (profile && profile.companyId) {
            let poc = await db.findField(collectionName, {_id: ObjectId(profile.companyId)}, ['poc', 'name']);
            fields = {...fields, ...poc}
            fields.poc = poc ? poc.poc : 'NA';
        }

        return fields;
    }));

    return utilities.paginate(`/observation${req.url}`, videoRefProfileData, count, limit, page);
}


observationsAPI.completeObservation = async (req) => {
    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    const [reflectionSignOff=[],count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, {type: 'observation:reflection:signoff'}, limit, page),
		db.countDocuments(collectionName, {type: 'observation:reflection:signoff'}),
	]);

    var reflectionSignOffData = await Promise.all(reflectionSignOff.map( async (profile) => {
        let {uid} = profile;

        let [videoRefData, observationData, userData] = await Promise.all([
            db.findField(collectionName, {uid, type: 'videoref:profile'}),
            db.findField(collectionName, { uid, type: 'observation'}),
            User.getUserFields(uid, ['fullname', 'username'])
        ]);

        if (videoRefData && observationData) {
            let company = await  db.findField(collectionName, {_id: ObjectId(videoRefData.companyId), type: 'observation:company'});
            return {...profile, user: userData, videoRefData,company};  
        }

    }));

    reflectionSignOffData = reflectionSignOffData.filter(el => el);
    return utilities.paginate(`/observation${req.url}`, reflectionSignOffData, count, limit, page);
};


observationsAPI.analytics = async (req) => {
    const uid = parseInt(req.params.uid);
    const page = 0;
	const limit = 1;

    const startObservation = await db.findField(collectionName, {uid, type: 'observation'});
    if (!startObservation) {
        throw new Error('No observation data was found for this user');
    }

    let [endObservation] = await Promise.all([,
        db.findField(collectionName, {uid, type: 'observation:reflection:signoff'}),
    ]);

    const {
        startingDate, 
        endingDate, 
        timeframe
    } = observationsAPI.getObservationTimeframe(startObservation, endObservation);

    const searchKeys = {
        uid,
        type: 'observation:reflection',
        $and: [ { createdAt: { $gte: startingDate } }, { createdAt: { $lte: endingDate } } ]
      };

    const reflections = await db.findFields(collectionName, searchKeys);
    const reflectionDataWithTimeframe = timeframe;
    const dates = [];

    reflections.forEach(el => {
        let {createdAt} = el;
        let day = new Date(createdAt).getDate();
        let date = new Date(createdAt).toISOString();
        let payload = {...filterFieldsFromObject(el, ['_id', 'createdAt']), date, type: 'Reflections'};

        if (dates.includes(day)) {
            reflectionDataWithTimeframe[day].push(payload);
        } else {
            reflectionDataWithTimeframe[day] = [payload];
            dates.push(day);
        }
    });

    const data = [
        {reflections: reflectionDataWithTimeframe}
    ]

    return utilities.paginate(`/observation${req.url}`, data, 0, limit, page);
}; 

observationsAPI.getObservationTimeframe = (startObservation, endObservation, duration=7) => {
    const startingDate = startObservation.createdAt;
    const endingDate = endObservation ? endObservation.createdAt : new Date(Date.now()).toISOString();

    const timeframe = {};
    let index = 0;

    for (var d = new Date(startingDate); d <= new Date(endingDate); d.setDate(d.getDate() + 1)) {
        if (index == duration) break;

        timeframe[d.getDate()] = {
            date: new Date(d).toISOString()
        };

        index += 1;
    }

    return {startingDate, endingDate, timeframe};
}

observationsAPI.createFaq = async (req) => {
    const uid = parseInt(req.uid);
    const currentTime = utilities.getISOTimestamp();
    let {question, content,isObservation,isVideoRef} = req.body;
    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not allowed to do this operation');
    }
    if(isObservation=="true"){
        isObservation=true;
    }
    else{
        isObservation=false;
    }
    if(isVideoRef=="true"){
        isVideoRef=true;
    }
    else{
        isVideoRef=false;
    }
    if(!isObservation&&!isVideoRef){
        throw new Error("Please select one from observation or video refection")
    }
    const payload = {
        uid, question, content, isObservation,isVideoRef
    };

    payload.createdAt = currentTime;
    payload.updatedAt = currentTime;
    payload.type = 'observation-video:faq';

    return await db.setField(collectionName, payload);
}

observationsAPI.deleteFaq = async (req) => {
    const uid = parseInt(req.uid);
    const {id} = req.params;

    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not allowed to do this operation');
    }

    const keys = {
        uid, 
        _id: ObjectId(id),
        type: 'observation:faq'
    }

    let state = await db.removeField(collectionName, keys);
    return {
		deleted: state.result.n === 1,
	};
}

function filterFieldsFromObject (object={}, fields=[]) {
    const filtered = {};

    if (!fields.length) {
        return object;
    }

    fields.forEach(elem => {
        filtered[elem] = object[elem];
    });

    return filtered;
}

function isAValidUrl (url, protocols=['http', 'https']) {
    try {
        new URL(url);
        const parsed = parse(url);
        return protocols
            ? parsed.protocol
                ? protocols.map(x => `${x.toLowerCase()}:`).includes(parsed.protocol)
                : false
            : true;
    } catch (err) {
        return false;
    }
};