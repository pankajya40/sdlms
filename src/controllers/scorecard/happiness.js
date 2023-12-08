"use strict";

const moment = require("moment");
const db = require("../../database");
const utils = require('../../controllers/utils');
const User = require("../../user");
const companies = require('./companies.json');
const {allowedUsers} = require('./config.js');
const {questions} = require('./config.js');
const teams = require('./teams.json');
const { ObjectId } = require("mongodb");
const benchpress = require('benchpressjs');

benchpress.registerHelper('isNaN', function (data) {
    return !isNaN(data) ? 'number' : 'text';
  });

benchpress.registerHelper('getCellColorsFromNumber', function (value) {
    if (isNaN(value)) return;

    if (value >= 8 && value <= 10) return '#d9ead3';
    else if (value >=5 && value <= 7) return '#fff2cc';
    else if (value >=0 && value <= 4) return '#f4cccc';
});


const collectionName = db.collections.SCORECARD.HAPPINESS;
const indexOfFriday = 5;

const happiness = module.exports;

happiness.get = async function (req, res, next) {
    
    const uid = parseInt(req.uid);
    let currentWeek = getCurrentWeekDuration();
    let scorecard = await db.findField(collectionName, {uid, currentWeek, type: 'social_scorecard:happiness'});
    if (!scorecard) {
        if (new Date().getDay() < indexOfFriday) {
            currentWeek = getPreviousWeekDuration();
            scorecard = await db.findField(collectionName, {uid, currentWeek, type: 'social_scorecard:happiness'});
        }
    }

    var happiness = {};
    
    happiness.title = 'Happiness scorecard';
    happiness.companies = companies;
    happiness.teams = teams;
    happiness.currentWeek = currentWeek;
    happiness.questions = questions;
    happiness.scorecard = scorecard;
    

    res.render('scorecard/happiness', happiness);
};

happiness.getSubmissions = async function (req, res, next) {
    
    const uid = parseInt(req.uid);
    const {start, end, org} = req.query;
    const {id} = req.params;
    const pageData = {};

    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not allowed to visit this page');
    }

    let currentWeek = {};
    
    if (start && end) {
        if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
            throw new Error('Invalid date supplied');
        }

        currentWeek = {start, end};
    }

    if (id) {
        if (id.length != 24) {
            throw new Error('Invalid Id supplied');
        }

        let scorecard = await db.findField(collectionName, {_id: ObjectId(id), type: 'social_scorecard:happiness'});
        if (!scorecard) {
            throw new Error('No data found with the supplied Id');
        }

        pageData.title = scorecard.meta.name;
        pageData.scorecard = scorecard;

        return res.render('scorecard/submission', pageData);
    }

    const aggregateionPipeline = [{
        $match: {
            type: 'social_scorecard:happiness'
        }
    }, {
        "$facet": {
            "data": [{
                    "$group": {
                        _id: '$currentWeek',
                    }
                },
                {
                    "$project": {
                        "_id": false,
                        "dateframes": "$_id",
                    }
                }
            ]
        }
    }, {
        "$group": {
            _id: '$data.dateframes',
        }
    }]

    const keys = {currentWeek, type: 'social_scorecard:happiness'};
    if (org) {
        keys['meta.organization'] = {$regex: new RegExp(org.trim()), $options: 'i'};
    }


    const [weekData, scorecardSubmissions] = await Promise.all([
        db.Aggregate(collectionName, aggregateionPipeline),
        db.findFields(collectionName, keys, ['uid', '_id', 'meta', 'createdAt'], {_id: -1})
    ]);

    const data = (weekData && weekData.length && weekData[0]._id.length) ? weekData[0]._id : [currentWeek];

    let sidebarData = data.map(el => {
        let endDate = new Date(el.end);
        endDate = endDate.setDate(endDate.getDate() - 1);

        return {
            url: '/scorecard/happiness/submissions' + parseObjectToQueryParams(el),
            title: `${moment(el.start).format('Do MMM')} - ${moment(endDate).format('Do MMM')}`,
            id: el.start,
            ...el,
        };
    });

    if (sidebarData.length) {
        sidebarData = sidebarData.sort((firstElem, secondElem) => new Date(secondElem['id']) - new Date(firstElem['id']));
        
        if (!Object.keys(currentWeek).length) {
            let {start, end} = sidebarData[0];

            let url = '/scorecard/happiness/submissions' + parseObjectToQueryParams({start, end});

            return res.redirect(url);
        }
    }
    
    pageData.title = 'Happiness scorecard submission';
    pageData.companies = companies;
    pageData.teams = teams;
    pageData.currentWeek = currentWeek;

    pageData.scorecardSubmissions = await Promise.all(scorecardSubmissions.map(async (el, ind) => {
        if (el.meta && !el.meta.name) {
            let user = await User.getUserFields(el.uid, ['fullname', 'username']);
            if (user) {
                el.meta.name = user.fullname || user.username;
            }
        }

        el.index = ind + 1; 
        el.createdAt = `${moment(el.createdAt).format("DD MMM, YYYY")}, ${moment(el.createdAt).format('hh:mm A')}`;

        return el;
    }));
    
    pageData.sidebar = utils.sidebar(sidebarData, currentWeek.start, {
        classes: 'active'
    });

    pageData.params = pageData.sidebar.find(el => el.classes);

    res.render('scorecard/submissions', pageData);
};

happiness.getSubmissionsByOrg = async (req, res) => {
    const uid = parseInt(req.uid);
    const {name} = req.params;
    const {start, end, csv} = req.query;
    const pageData = {};

    if (!start || !end) {
        throw new Error('Improper redirection, missing proper query params');
    }

    if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
        throw new Error('Invalid date supplied');
    }

    const currentWeek = {start, end};

    pageData.title = 'Organizations';
    pageData.params = currentWeek;
    pageData.isAdministrator = allowedUsers.includes(uid);

    if (name) {

        const {rows, headers} = await generateSubmissionTable(name, currentWeek);

        pageData.title = name;
        pageData.headers = headers;
        pageData.rows = rows;

        return res.render('scorecard/company_submission', pageData);
    }


    // Not allowing others to reach this part except the admins
    // Upper layer deals with company founders, so allowing them to access data.

    if (!uid || !allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not allowed to visit this page');
    }

    const companyData = companies.map((e, i) => ({index: i + 1, ...e}));

    pageData.companies = await Promise.all(companyData.map(async company => {
        let emailSent = await db.findField(collectionName, {
            currentWeek, 'meta.email': company.email,
            type: 'social_scorecard:happiness:email'
        });

        if (emailSent) {
            return {...company, status: 'Email sent'}
        } else return company;
    }));

    res.render('scorecard/company_submissions', pageData);
}

async function generateSubmissionTable (name, currentWeek) {
    const keys = {currentWeek, type: 'social_scorecard:happiness'};

    keys['meta.organization'] = {$regex: new RegExp(name.trim()), $options: 'i'};

    let scorecards = await db.findFields(collectionName, keys);

    scorecards = await Promise.all(scorecards.map(async elem => {
        if (!elem.meta.name) {

            let user = await User.getUserFields(elem.uid, ['fullname', 'username']);
            if (user) {
                elem['meta']['name'] = user.fullname || user.username;
            }
        }

        return elem;
    }));

    const headers = ['S. No', 'Parameters'].concat(scorecards.map(el => el.meta.name));
    let rows = [];
    let textRows = [];

    if (scorecards && scorecards.length) {
        const questions = scorecards[0]['response'].map(e => e.question);
        
        questions.forEach((el, i) => {
            let row = [];
            let textrow = [];
            let isNumber = false;

            scorecards.forEach(elem => {
                let {response} = elem;
                isNumber = false;
                
                if (response[i]) {
                    // Testing if the response is just whitespaces or not
                    if (/\s/g.test(response[i]['answer'])) {
                        response[i]['answer'] = response[i]['answer'].trim();
                    }

                    // Replacing empty responses with dashes
                    if (response[i]['answer'] == '') {
                        response[i]['answer'] = '--'
                    }
                    
                    // Numericals will be processed separately so that they can be displayed separately
                    if (isNaN(response[i]['answer'])) {
                        textrow.push(response[i]['answer']);
                    } else {
                        isNumber = true;
                        row.push(response[i]['answer']);
                    }
                } else {
                    textrow.push('--');
                }
                
            });
            
            if (isNumber) {
                row = [el].concat(row);
                rows.push(row);
            } else {
                textrow = [el].concat(textrow);
                textRows.push(textrow);
            }

        });

        rows = rows.concat(textRows).map((el, ind) => {
            if (el.length) {
                el.unshift(ind+1);
            }

            return el;
        });
    }

    return {rows, headers};
}

function getCurrentWeekDuration () {
    let curr = new Date; // get current date
    let first = curr.getDate() - curr.getDay() + 1;
    let last = first + 6;

    let start = new Date(curr.setDate(first)).toISOString();
    let end = new Date(curr.setDate(last)).toISOString();

    return {
        start: new Date(start.split('T')[0]).toISOString(), 
        end: new Date(end.split('T')[0]).toISOString()
    };
}

function parseObjectToQueryParams (obj) {
    if (!Object.keys(obj).length) return;
    
    let queryParams = '?';
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const element = obj[key];
            queryParams += key + '=' + element + '&';
        }
    }

    return queryParams;
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