"use strict";

const { URL, parse } = require('url');
const utils = require('../../utils');
const db = require('../../../database');
const User = require('../../../user');
const {sidebar} = require('./sidebar');
const {ObjectId} = require('mongodb');
const {defaultCompany, allowedUsers, hygineChecklist} = require('./config');
const {prepareStageer} = require('../stage');
const {isAValidUrl} = utils;

const videoRef = module.exports;

const MIN_WORDS = 300; // The reflection must be of tleast 300 words

const BASE = 'observation/videoref';
const collectionName = db.collections.GLOBAL.OBSERVATION;
videoRef.getFaqs = async () =>{
    const faqs = db.findFields(collectionName,{type:"observation-video:faq",isVideoRef:true});
    return faqs;
}
videoRef.get = async (req, res) => {
    const uid = parseInt(req.uid);
    
    const pageData = {};
    pageData.title = 'Fill in your basic details';

    pageData.sidebar = utils.sidebar(sidebar, 'index',{
        classes: 'active'
    }, ['introduction', 'sample_reflections', 'reflect', 'complete', 'faqs']);

    const [companies, roles, user, profile] = await Promise.all([
        db.findFields(collectionName, {type: 'observation:company'}),
        db.findFields(collectionName, {type: 'observation:role'}),
        User.getUserFields(uid, ['email']),
        db.findField(collectionName, {uid, type: 'videoref:profile'})
    ]);
    
    pageData.companies = companies;
    pageData.roles = roles;
    pageData.user = user;
    pageData.profile = profile;
    res.render(BASE + '/index', pageData);
}

videoRef.introduction = async (req, res) => {
    const uid = parseInt(req.uid);
    
    const pageData = {};
    pageData.title = 'Why Reflection?';

    pageData.sidebar = utils.sidebar(sidebar, 'introduction', {
        classes: 'active'
    }, ['complete', 'index']);


    res.render(BASE + '/introduction', pageData);
}

videoRef.reflect = async (req, res) => {
    const uid = parseInt(req.uid);

    const sidebarData = utils.sidebar(sidebar, 'reflect',{
        classes: 'active'
    }, ['complete', 'index']);

    var sidebarIndex = sidebarData.findIndex(el => el.classes);
    // if (sidebarIndex != -1) {
    //     sidebarData[sidebarIndex].url = sidebarData[sidebarIndex].url + ['/', id].join('');
    // }

    // Disabling the homepage click so that the user doesn't go back to the index page 
    // and start filling the details once again during their ongoing video reflection process
    sidebarIndex = sidebarData.findIndex(el => el.id == 'index');
    if (sidebarIndex != -1) {
        sidebarData[sidebarIndex].url = '#';
    }
    
    const pageData = {};
    pageData.title = 'Video Reflection';
    pageData.stage = await prepareStageer(req);

    pageData.sidebar = sidebarData;

    const [userProfile, reflection] = await Promise.all([
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findField(collectionName, {uid, type: 'videoref:profile:reflection'}),
    ]);
    if (!userProfile) {
        throw new Error('Not found! You landed on the the wrong page.')
    }
    const companies = await db.findFields(collectionName, {type: 'observation:company'});
    const company = companies.find(el => el._id == String(userProfile.companyId));

    pageData.profile = userProfile;
    pageData.reflection = reflection;
    pageData.MIN_WORDS = MIN_WORDS;
    pageData.company = company.videoId ? company : {...company, videoId: defaultCompany.videoId};
    pageData.hygineChecklist = hygineChecklist;
    pageData.faqs = await videoRef.getFaqs()
    res.render(BASE + '/reflect', pageData);
}

videoRef.faqs = async (req, res) => {
    const uid = parseInt(req.uid);

    const sidebarData = utils.sidebar(sidebar, 'faqs',{
        classes: 'active'
    }, ['complete', 'index']);

    var sidebarIndex = sidebarData.findIndex(el => el.classes);
    // if (sidebarIndex != -1) {
    //     sidebarData[sidebarIndex].url = sidebarData[sidebarIndex].url + ['/', id].join('');
    // }

    // Disabling the homepage click so that the user doesn't go back to the index page 
    // and start filling the details once again during their ongoing video reflection process
    sidebarIndex = sidebarData.findIndex(el => el.id == 'index');
    if (sidebarIndex != -1) {
        sidebarData[sidebarIndex].url = '#';
    }
    
    const pageData = {};
    pageData.title = 'Frequently Asked Questions';
    pageData.stage = await prepareStageer(req);

    pageData.sidebar = sidebarData;

    const [userProfile, reflection] = await Promise.all([
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findField(collectionName, {uid, type: 'videoref:profile:reflection'}),
    ]);
    if (!userProfile) {
        throw new Error('Not found! You landed on the the wrong page.')
    }
    const companies = await db.findFields(collectionName, {type: 'observation:company'});
    const company = companies.find(el => el._id == String(userProfile.companyId));

    pageData.profile = userProfile;
    pageData.reflection = reflection;
    pageData.MIN_WORDS = MIN_WORDS;
    pageData.company = company.videoId ? company : {...company, videoId: defaultCompany.videoId};
    pageData.hygineChecklist = hygineChecklist;
    pageData.faqs = await videoRef.getFaqs()
    res.render(BASE + '/faqs', pageData);
}

videoRef.complete = async (req, res) => {
    const uid = parseInt(req.uid);

    const pageData = {};
    pageData.title = 'Reflection submitted';
    pageData.stage = await prepareStageer(req);

    pageData.sidebar = utils.sidebar(sidebar, 'complete', {
        classes: 'active'
    },['faqs', 'index']);
    
    const [userProfile, companies, reflection] = await Promise.all([
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findFields(collectionName, {type: 'observation:company'}),
        db.findField(collectionName, {uid, type: 'videoref:profile:reflection'}),
    ]);

    if (!userProfile) {
        throw new Error('Not found! You landed on the the wrong page.')
    }
    const name = userProfile.name.split(' ');
    const company = companies.find(el => el._id == String(userProfile.companyId));
    const {acknowledgements} = reflection || {};
    let {whatsAppGroup} = company;

    if (!isAValidUrl(whatsAppGroup)) {
        company.whatsAppGroup = ['https://', whatsAppGroup].join('');
    }

    pageData.firstname = name.length ? name[0] : '';
    pageData.company = company;
    pageData.reflection = reflection;
    pageData.faqs = await videoRef.getFaqs()
    if (!acknowledgements || !Object.keys(acknowledgements).length) {
        return res.render(BASE + '/acknowledge', pageData);
    }

    res.redirect('/observation/introduction');
}

videoRef.submissions = async (req, res) => {
    const uid = parseInt(req.uid);
    const pageData = {};

    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not allowed to view this page, please contact the administrator.');
    }

    const {id} = req.params;

    if (id) {
        if (id.length != 24) {
            throw new Error('Invalid Id supplied');
        }

        let submission = await db.findField(collectionName, {_id: ObjectId(id), type: 'videoref:profile:reflection'});
        if (!submission) {
            throw new Error('No submission was found!');
        }

        if (submission.createdAt) {
            let createdAt = new Date(submission.createdAt);
            submission.createdAt = `${createdAt.getDate()} ${createdAt.toLocaleDateString(undefined, { month: "long" })}, ${createdAt.getFullYear()}`;
        }

        pageData.submission = submission;
        pageData.user = await db.findField(collectionName, {_id: ObjectId(submission.profileId), type: 'videoref:profile'});
        pageData.title = pageData.user.name;

        return res.render(BASE + '/submission', pageData);
    }

    pageData.title = 'Submissions';

    const companies = await db.findFields(collectionName, {type: 'observation:company'});
    pageData.companies = companies.map(el => el.name);

    res.render(BASE + '/submissions', pageData);
}

videoRef.sampleReflections = async (req, res) => {
    const pageData = {};

    pageData.title = 'Sample reflections';
    pageData.sidebar = utils.sidebar(sidebar, 'sample_reflections',{
        classes: 'active'
    }, ['complete', 'index']);

    res.render(BASE + '/sample_reflections', pageData);
}