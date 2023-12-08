
'use strict';

const moment = require('moment');
const db = require('../database');
const User = require('../user');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../controllers/utils');
const adapters = require('../adapters');
const companies = require('../controllers/scorecard/companies.json');
const {allowedUsers} = require('../controllers/scorecard/config');

const collectionName = db.collections.SCORECARD.HAPPINESS;
const indexOfFriday = 5;

const happinessScorecard = module.exports;

happinessScorecard.create = async (req) => {
    const uid = parseInt(req.uid);
    const {meta, response} = req.body;
    const currentTime = utils.getISOTimestamp();
    const currentDay = new Date().getDay();

    let currentWeek = {};

    if (currentDay == 0 || (currentDay > 0 && currentDay < indexOfFriday)) {
        currentWeek = getPreviousWeekDuration();
    } else {
        currentWeek = getCurrentWeekDuration();
    }
    
    const payload = {
        uid,
        response,
        meta,
        createdAt: currentTime,
        currentWeek,
        type: 'social_scorecard:happiness'
    };

    // return payload;
    return await db.setField(collectionName, payload);
}

happinessScorecard.compileAndSendEmail = async (req) => {
    const uid = parseInt(req.uid);
    const {email, subject, emailContent, meta, currentWeek} = req.body;

    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not allowed for this action');
    }

    const selected = Object.keys(meta).length ? meta : companies.find(el => el.email == email.trim());

    const payload = {
        uid,
        email,
        meta: selected,
        subject,
        emailContent,
        currentWeek,
        createdAt: utils.getISOTimestamp(),
        type: 'social_scorecard:happiness:email'
    }

    // return payload;

    await adapters.email.sendCompiledEmail(email, emailContent, subject);
    await db.setField(collectionName, payload);
}

function getCurrentWeekDuration () {
    let curr = new Date; // get current date
    let first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6

    let start = new Date(curr.setDate(first)).toISOString();
    let end = new Date(curr.setDate(last)).toISOString();

    return {
        start: new Date(start.split('T')[0]).toISOString(), 
        end: new Date(end.split('T')[0]).toISOString()
    };
}

function getPreviousWeekDuration() {
    let first = new Date(new Date(moment().subtract(1, 'weeks').startOf('week')).toISOString()).getDate() + 2;
    let last = new Date(moment().subtract(1, 'weeks').endOf('week')).getDate() + 1;

    first = new Date(new Date(moment().subtract(1, 'weeks').startOf('week')).setDate(first)).toISOString();
    last = new Date(new Date(moment().subtract(1, 'weeks').endOf('week')).setDate(last)).toISOString();

    return {
        start: new Date(first.split('T')[0]).toISOString(),
        end: new Date(last.split('T')[0]).toISOString()
    };
}