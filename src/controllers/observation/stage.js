"use strict";

const utils = require('../utils');
const db = require('../../database');
const {ObjectId} = require('mongodb');

const MAX_OBSERVATION_DAYS = 6;
const collectionName = db.collections.GLOBAL.OBSERVATION;

const stage = module.exports;

stage.prepareStageer = async (req) => {
    const uid = parseInt(req.uid);
    let observationDetails = {
        company: {}
    };
    let companyInfo = {};

    const [observationData, videoRefprofile, signOffReflection] = await Promise.all([
        db.findField(collectionName, {uid, type: 'observation'}),
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findField(collectionName, {uid, type: 'observation:reflection:signoff'}),
    ]);

    if (videoRefprofile) {
        companyInfo = await db.findField(collectionName, {_id: ObjectId(videoRefprofile.companyId), type: 'observation:company'});
        
        videoRefprofile.company = companyInfo;
        observationDetails = videoRefprofile;
    }

    const stager = {
        'video_reflection': true,
        'observation': true,
        'sign_off_reflections': true,
        'observation_complete': true,
    }
    

    if (!videoRefprofile) {
        stager.video_reflection = false;

    } 
    if (!observationData) {
        stager.observation = false;

    } 
    if (!signOffReflection) {
        stager.observation_complete = false;
        stager.sign_off_reflections = false;

    }

    return stager;
}

stage.isSignOffStage = async (observationData) => {
    if (!observationData) return false;
    const {uid} = observationData;

    const reflectionKeys = {
        uid, type: 'observation:reflection',
        createdAt: {$gte: new Date(observationData.createdAt).toISOString()}
    };

    const [reflections, videoRefprofile] = await Promise.all([
        db.findFields(collectionName, reflectionKeys),
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
    ]);
    
    if (!videoRefprofile || !reflections) return false;
    
    const companyInfo = await db.findField(collectionName, {_id: ObjectId(videoRefprofile.companyId), type: 'observation:company'});
    const {observationPeriod} = companyInfo;
    const currentDayOfObservation = this.getCurrentDayOfObservation(observationData);

    if (currentDayOfObservation < (observationPeriod || MAX_OBSERVATION_DAYS)) {
        return false;
    }

    let daysOfReflection = new Set();

    (reflections || []).forEach((elem) => {
        let createdAt = new Date(elem.createdAt);

        // Skipping the sundays, as it's not a working day
        if (createdAt.getDay() != 0) {
            daysOfReflection.add(createdAt.getDate());
        }
    });

    if ([...daysOfReflection].length >= (observationPeriod || MAX_OBSERVATION_DAYS)) {
        return true;
    }

    return false;
}

stage.getCurrentDayOfObservation = (observationData={}) => {
    if (!observationData || !Object.keys(observationData).length) {
        return 0;
    }

    const {createdAt} = observationData;

    const startingDate = new Date(createdAt);
    const today = new Date(utils.getISOTimestamp());

    // const differanceinTime = Math.abs(today - startingDate);
    // const differanceinDays = Math.ceil(differanceinTime / (1000 * 60 * 60 * 24)); 

    // return differanceinDays;

    const daysWithOutWeekEnd = [];
    for (var currentDate = startingDate; currentDate <= today; currentDate.setDate(currentDate.getDate() + 1)) {
    
        //  Excluding the sundays
        if (currentDate.getDay() != 0) {
            daysWithOutWeekEnd.push(new Date(currentDate));
        }
    }
    return daysWithOutWeekEnd.length;
}