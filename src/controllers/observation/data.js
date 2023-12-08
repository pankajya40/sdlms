"use strict";

const utils = require('../utils');
const {sidebar, protectedMenus} = require('./sidebar');
const db = require('../../database');
const User = require('../../user');
const {ObjectId} = require('mongodb');
const {allowedUsers} = require('./videoRef/config');
const config = require('./config');
const slugify = require('../../slugify');
const moment = require('moment');
const observationApi = require('../../api/observation');
const {defaultWhatsAppGroupURL, defaultYoutubeVideoURL} = require('./config');
const {isSignOffStage, prepareStageer, getCurrentDayOfObservation} = require('./stage');

const MAX_WORDS = 300; // The reflection must be of tleast 300 words
const MAX_OBSERVATION_DAYS = 6;
const BASE = 'observation';
const collectionName = db.collections.GLOBAL.OBSERVATION;

const data = module.exports;

data.home = async (req, res) => {
    const uid = parseInt(req.uid);
    let observationDetails = {
        company: {}
    };
    let companyInfo = {};

    const [userData, observationData, videoRefprofile, signOffReflection] = await Promise.all([
        User.getUserFields(uid, ['username', 'fullname']),
        db.findField(collectionName, {uid, type: 'observation'}),
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findField(collectionName, {uid, type: 'observation:reflection:signoff'}),
    ]);

    if (videoRefprofile) {
        companyInfo = await db.findField(collectionName, {_id: ObjectId(videoRefprofile.companyId), type: 'observation:company'});
        
        videoRefprofile.company = companyInfo;
        observationDetails = videoRefprofile;
    }

    const pageData = {};
    pageData.title = 'Observation panel';
    pageData.stage = await prepareStageer(req);
    
    let sidebarContent = utils.sidebar(sidebar, 'home', {
        classes: 'active', title: 'Observation'
    });
    
    const {observationPeriod} = companyInfo || {};
    const currentDayOfObservation = getCurrentDayOfObservation(observationData);
    if (currentDayOfObservation >= (observationPeriod || MAX_OBSERVATION_DAYS)) {
        pageData.signOffStage = true;
    }

    if (userData) {
        userData.fullname = userData.fullname || userData.username
    }

    if (!observationData) pageData.isNewObserver = true;

    pageData.user = userData;
    pageData.observation = observationData;

    if (!videoRefprofile) {
        pageData.sidebar = reStructureSidebar(sidebarContent, config.noVideoReflection, uid);
        return res.render(BASE + '/no_videoref', pageData);

    } else if (!observationData) {
        sidebarContent = utils.sidebar(sidebar, 'consent', {
            classes: 'active', title: 'Start'
        });

        pageData.pageName = 'consent';
        pageData.title = 'Provide consent and start observation';
        pageData.sidebar = reStructureSidebar(sidebarContent, config.noObservation, uid);

        return res.render(BASE + '/consent', pageData);

    } else if (signOffReflection) {
        return res.redirect(req.url + '/page/thank-you');

    } else if (await isSignOffStage(observationData)) {
        return res.redirect(req.url + '/sign-off');

    } else { 
        pageData.sidebar = reStructureSidebar(sidebarContent, config.observation, uid);

        if (req.url.includes('/api/observation')) {
            return res.redirect('/api/observation/reflections');
        }

        if (req.url.includes('/reflections')) {
            return res.redirect(req.url);
        }

        return res.redirect(req.url + '/reflections');
    }
}

data.introduction = async (req, res) => {
    const uid = parseInt(req.uid);
    const pageData = {};
    let sidebarContent = utils.sidebar(sidebar, 'introduction', {
        classes: 'active'
    });

    const [userProfile, companies, reflection] = await Promise.all([
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findFields(collectionName, {type: 'observation:company'}),
        db.findField(collectionName, {uid, type: 'videoref:profile:reflection'}),
    ]);

    if (!userProfile) {
        throw new Error('Not found! You landed on the the wrong page.')
    }

    if (!reflection || !Object.keys(reflection).length) {
        return res.redirect('/observation/videoref');
    }

    const {acknowledgements} = reflection;
    if (!acknowledgements || !Object.keys(acknowledgements).length) {
        return res.redirect('/observation/videoref/complete');
    }

    const name = userProfile.name.split(' ');
    const company = companies.find(el => el._id == String(userProfile.companyId));
    let {whatsAppGroup} = company;

    if (!utils.isAValidUrl(whatsAppGroup)) {
        company.whatsAppGroup = ['https://', whatsAppGroup].join('');
    }

    pageData.title = 'Introduction';
    pageData.firstname = name.length ? name[0] : '';
    pageData.company = company;
    pageData.reflection = reflection;
    pageData.sidebar = reStructureSidebar(sidebarContent, config.observation, uid);

    res.render(BASE + '/introduction', pageData);
}

data.reflections = async (req, res) => {
    const uid = parseInt(req.uid);
    const {id} = req.query;

    let observationDetails = {};
    let reflections = [];
    
    const pageData = {};

    pageData.title = 'Reflections';
    pageData.stage = await prepareStageer(req);

    let sidebarContent = utils.sidebar(sidebar, 'reflections', {
        classes: 'active'
    });

    if (id) {
        if (id.length != 24) {
            throw new Error('Invalid Id supplied');
        }

        let reflection = await db.findField(collectionName, {_id: ObjectId(id), type: 'observation:reflection'});
        if (!reflection) {
            throw new Error('Invalid reflection Id, nothing as found!');
        }

        let usrData = await User.getUserFields(reflection.uid, ['username', 'fullname', 'picture']);
        if (usrData) {
            usrData.fullname = usrData.fullname || usrData.username
        }

        if (reflection.createdAt) {
            let createdAt = new Date(reflection.createdAt);
            reflection.createdAt = `${createdAt.getDate()} ${createdAt.toLocaleDateString(undefined, { month: "long" })}, ${createdAt.getFullYear()}`;
        }

        reflection.user = usrData;
        pageData.reflection = reflection;

        return res.render(BASE + '/reflection', pageData);
    }

    const [userData, observationData, reflectionData] = await Promise.all([
        User.getUserFields(uid, ['username', 'fullname', 'picture']),
        db.findField(collectionName, {uid, type: 'observation'}),
        db.findFields(collectionName, {uid, type: 'observation:reflection'}),
    ]);

    pageData.signOffStage = await isSignOffStage(observationData);

    if (reflectionData.length) {
        reflections = await Promise.all(reflectionData.map(async (el) => {
            let usrData;
            if (userData.uid == el.uid) {
                usrData = userData;
            } else usrData = await User.getUserFields(el.uid, ['username', 'fullname', 'picture']);

            if (usrData) {
                usrData.fullname = usrData.fullname || usrData.username
            }

            return {...el, user: usrData };
        }));
    }

    if (userData) {
        userData.fullname = userData.fullname || userData.username
    }

    const videoRefprofile = await db.findField(collectionName, {uid, type: 'videoref:profile'});
    
    if (!observationData) pageData.disallowPost = true;

    pageData.sidebar = await getSidebarBasedOnObservationStage(videoRefprofile, observationData, sidebarContent, uid);

    pageData.WALink = 'https://chat.whatsapp.com/JKYMbtOu2d5AXgwSOWcOAf'; // Have to figure out a way how to open a WA Group with message as payload
    if (observationDetails) {
        pageData.WALink = observationDetails.whatsAppGroup;
        pageData.observationDetails = observationDetails;
    }
    
    pageData.user = userData;
    pageData.observation = observationData;
    pageData.reflections = reflections;
    pageData.pageUrl = '/observation/reflections';

    res.render(BASE + '/reflections', pageData);
}

data.explore = async (req, res) => {
    const uid = parseInt(req.uid);
    const {page=0} = req.params;

    let reflections = [];
    let reflectionData = [];
    let total = 0;
    
    const pageData = {};
    const limit = 20;

    pageData.title = 'Explore what others have reflected!';
    pageData.stage = await prepareStageer(req);

    let sidebarContent = utils.sidebar(sidebar, 'explore', {
        classes: 'active'
    });

    [reflectionData, total] = await Promise.all([
        db.getFieldsWithPagination(collectionName, {type: 'observation:reflection'}, limit, parseInt(page)),
        db.countDocuments(collectionName, {type: 'observation:reflection'}),
    ]);

    const [userData, observationData] = await Promise.all([
        User.getUserFields(uid, ['username', 'fullname', 'picture']),
        db.findField(collectionName, {uid, type: 'observation'}),
    ]);

    if (reflectionData.length) {
        reflections = await Promise.all(reflectionData.map(async (el) => {
            let usrData;
            if (userData.uid == el.uid) {
                usrData = userData;
            } else usrData = await User.getUserFields(el.uid, ['username', 'fullname', 'picture']);

            if (usrData) {
                usrData.fullname = usrData.fullname || usrData.username
            }

            return {...el, user: usrData };
        }));
    }

    if (userData) {
        userData.fullname = userData.fullname || userData.username
    }

    const videoRefprofile = await db.findField(collectionName, {uid, type: 'videoref:profile'});

    if (!observationData) pageData.isNewObserver = true;

    pageData.sidebar = await getSidebarBasedOnObservationStage(videoRefprofile, observationData, sidebarContent, uid);
    
    pageData.user = userData;
    pageData.reflections = reflections;
    pageData.pageUrl = '/observation/explore';

    res.render(BASE + '/explore', pageData);
}

data.create = async (req, res) => {
    const uid = parseInt(req.uid);
    
    const pageData = {};
    pageData.title = 'Create reflection';
    pageData.stage = await prepareStageer(req);

    let sidebarContent = utils.sidebar(sidebar, 'reflections',{
        classes: 'active'
    });

    const [videoRefprofile, observationData] = await Promise.all([
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findField(collectionName, {uid, type: 'observation'})
    ]);

    if (!videoRefprofile || !observationData) {
        throw new Error('Unauthorized! You are not allowed to view this page as you\'ve not yet started your observation process.')
    } else if (observationData) {
        pageData.sidebar = reStructureSidebar(sidebarContent, config.newObservation, uid);
    } else {
        pageData.sidebar = reStructureSidebar(sidebarContent, config.observation, uid);
    }

    const companyInfo = await db.findField(collectionName, {_id: ObjectId(videoRefprofile.companyId), type: 'observation:company'});
    const {observationPeriod} = companyInfo;
    const currentDayOfObservation = getCurrentDayOfObservation(observationData);
    if (currentDayOfObservation >= (observationPeriod || MAX_OBSERVATION_DAYS)) {
        pageData.signOffStage = true;
    }

    pageData.MAX_WORDS = MAX_WORDS;
    pageData.observationDetails = observationData;

    res.render(BASE + '/create', pageData);
}

data.projects = async (req, res) => {
    const uid = parseInt(req.uid);
    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not allowed to view this page')
    }

    const pageData = {};
    pageData.title = 'Manage observations for companies';

    let sidebarContent = utils.sidebar(sidebar, 'admin', {
        classes: 'active'
    });
    
    pageData.sidebar = reStructureSidebar(sidebarContent, config.administrator);

    res.render(BASE + '/admin', pageData);
}

data.pages = async (req, res) => {
    const uid = parseInt(req.uid);
    const {id} = req.params;
    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not allowed to view this page')
    }

    const pageData = {};
    const pages = ['Why observation', 'Take a tour', 'Thank you'];

    pageData.title = 'Manage pages for observation';
    
    let sidebarContent = utils.sidebar(sidebar, 'admin', {
        classes: 'active'
    });

    pageData.sidebar = reStructureSidebar(sidebarContent, config.administrator);

    pageData.pages = pages;
    pageData.pageInfo = await db.findField(collectionName, {slug: slugify(pages[0]), type: 'observation:page'});

    res.render(BASE + '/static_pages', pageData);
}

data.viewStaticPage = async (req, res) => {
    let {pageSlug} = req.params;
    const uid = parseInt(req.uid);

    const pageData = {};
    pageData.stage = await prepareStageer(req);

    let staticPageContent = await db.findField(collectionName, {slug: pageSlug, type: 'observation:page'});

    if (!staticPageContent) {
        throw new Error('Oops! You might have stumbled into the wrong page.');
    }

    const [videoRefprofile, observationData] = await Promise.all([
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findField(collectionName, {uid, type: 'observation'})
    ]);

    const companyInfo = await db.findField(collectionName, {_id: ObjectId(videoRefprofile.companyId), type: 'observation:company'});
    const {observationPeriod} = companyInfo;
    const currentDayOfObservation = getCurrentDayOfObservation(observationData);
    if (currentDayOfObservation >= (observationPeriod || MAX_OBSERVATION_DAYS)) {
        pageData.signOffStage = true;
    }
    
    let sidebarContent = utils.sidebar(sidebar, staticPageContent.slug, {
        classes: 'active', title: staticPageContent.name
    });
    
    pageData.sidebar = await getSidebarBasedOnObservationStage(videoRefprofile, observationData, sidebarContent, uid);

    pageData.title = staticPageContent.name;
    pageData.pageContent = staticPageContent;

    res.render(BASE + '/view_static_page', pageData);
}

data.statuses = async (req, res) => {
    const uid = parseInt(req.uid);
    const {id} = req.params;
    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not allowed to view this page')
    }

    const pageData = {};
    pageData.title = 'Manage observer statuses';
    let sidebarContent = utils.sidebar(sidebar, 'admin', {
        classes: 'active'
    });

    pageData.sidebar = reStructureSidebar(sidebarContent, config.administrator);

    res.render(BASE + '/statuses', pageData);
}

data.events = async (req, res) => {
    const uid = parseInt(req.uid);

    const pageData = {};
    pageData.title = 'Events';
    pageData.stage = await prepareStageer(req);

    let sidebarContent = utils.sidebar(sidebar, 'events', {
        classes: 'active'
    });

    const [videoRefprofile, observationData] = await Promise.all([
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findField(collectionName, {uid, type: 'observation'})
    ]);

    pageData.signOffStage = await isSignOffStage(observationData);
    pageData.sidebar = await getSidebarBasedOnObservationStage(videoRefprofile, observationData, sidebarContent, uid);

    res.render(BASE + '/events', pageData)
}

data.leaderboard = async (req, res) => {
    const uid = parseInt(req.uid);
    
    const pageData = {};
    pageData.title = 'Leaderboard';
    pageData.stage = await prepareStageer(req);

    let sidebarContent = utils.sidebar(sidebar, 'leaderboard', {
        classes: 'active'
    });

    const [videoRefprofile, observationData] = await Promise.all([
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findField(collectionName, {uid, type: 'observation'})
    ]);

    pageData.isAdmin = isAdmin(uid);
    pageData.signOffStage = await isSignOffStage(observationData);
    pageData.sidebar = await getSidebarBasedOnObservationStage(videoRefprofile, observationData, sidebarContent, uid);

    res.render(BASE + '/leaderboard', pageData)
}

data.signOff = async (req, res) => {
    const uid = parseInt(req.uid);
    
    const pageData = {};
    pageData.title = 'Sign-off reflections';
    pageData.stage = await prepareStageer(req);

    let sidebarContent = utils.sidebar(sidebar, 'sign-off', {
        classes: 'active'
    });

    const [observationData, videoRefprofile, signOff] = await Promise.all([
        db.findField(collectionName, {uid, type: 'observation'}),
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findField(collectionName, {uid, type: 'observation:reflection:signoff'})
    ]);

    if (signOff) {
        return res.redirect('/observation');
    }

    pageData.signOffStage = await isSignOffStage(observationData);

    pageData.profile = videoRefprofile;
    pageData.reflectionQuestions = config.signOffReflectionQuestions;
    pageData.sidebar = reStructureSidebar(sidebarContent, config.signOff, uid);

    res.render(BASE + '/sign_off', pageData);
}

data.reports = async (req, res) => {
    const uid = parseInt(req.uid);
    
    const pageData = {};
    pageData.title = 'Reports';

    let sidebarContent = utils.sidebar(sidebar, 'report', {
        classes: 'active'
    });

    const [observationData, videoRefprofile, signOff] = await Promise.all([
        db.findField(collectionName, {uid, type: 'observation'}),
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findField(collectionName, {uid, type: 'observation:reflection:signoff'})
    ]);

    const reflectionKeys = {
        uid, type: 'observation:reflection',
        createdAt: {$gte: new Date(observationData.createdAt).toISOString()}
    };
    const leaveKeys = {
        uid, type: 'leave',
        fromRaw: { $gte: new Date(observationData.createdAt).getTime() }
    }

    // if (signOff) {
    //     leaveKeys.toRaw = {$lte: new Date(signOff.createdAt).getTime()};
    // }

    const [reflections, leaves] = await Promise.all([
        db.findFields(collectionName, reflectionKeys),
        db.findFields(db.collections.PDGMS.LEAVES, leaveKeys),
    ]);

    if (leaves && leaves.length) {
        pageData.leaves = await Promise.all(leaves.map(async (el, ind) => {
            let {requestedTo, from, to} = el;
            let usrData = await User.getUserFields(requestedTo, ['fullname', 'username']);

            if (!usrData.fullname) {
                usrData.fullname = usrData.username;
            }

            return {...el, 
                index: ind + 1,
                user: usrData, 
                from: formateDate(from), 
                to: formateDate(to),
            };
        }));
    }

    pageData.reflections = reflections.map((el, ind) => {
        let {content='', createdAt} = el;
        content = utils.htmltoText(content);

        return {...el, 
            content: content.substr(0, 30) + '...',
            createdAt: formateDate(createdAt),
            index: ind + 1,
        };
    });
    pageData.profile = videoRefprofile;
    pageData.sidebar = await getSidebarBasedOnObservationStage(videoRefprofile, observationData, sidebarContent, uid); 

    res.render(BASE + '/reports', pageData);
}

data.viewMyReflection = async (req, res) => {
    const uid = parseInt(req.uid);
    const {id} = req.params;
    if (id.length != 24) {
        throw new Error('Invalid Id supplied');
    }

    const pageData = {};
    pageData.title = 'Viewing reflection';

    let sidebarContent = utils.sidebar(sidebar, 'report', {
        classes: 'active'
    });

    const [reflection, videoRefprofile, observationData] = await Promise.all([
        db.findField(collectionName, {_id: ObjectId(id), type: 'observation:reflection'}),
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findField(collectionName, {uid, type: 'observation'}),
    ]);

    if (!reflection) {
        throw new Error('No reflection was found with the supplied id');
    }

    const profile = await User.getUserFields(reflection.uid, ['fullname', 'username']);
    profile.name = profile.fullname || profile.username;

    pageData.reflection = {...reflection, createdAt: formateDate(reflection.createdAt)};
    pageData.profile = profile;
    pageData.sidebar = await getSidebarBasedOnObservationStage(videoRefprofile, observationData, sidebarContent, uid);

    res.render(BASE + '/my_reflection', pageData);
}

data.analytics = async (req, res) => {
    const uid = parseInt(req.uid);

    const pageData = {};
    pageData.title = 'Observation analytics';
    pageData.inProgress = true;

    let sidebarContent = utils.sidebar(sidebar, 'report', {
        classes: 'active'
    });

    const [observationData, videoRefprofile] = await Promise.all([
        db.findField(collectionName, {uid, type: 'observation'}),
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
    ]);

    // const probability = 40

    // pageData.probability = getProbabilityValues(probability);
    pageData.sidebar = await getSidebarBasedOnObservationStage(videoRefprofile, observationData, sidebarContent, uid); 

    res.render(BASE + '/analytics', pageData);
}

data.getIndividualAnalytics = async (req, res) => {
    const userId = req.params.uid;

    if (isNaN(userId)) {
        throw new Error('UID must be a number');
    }

    const uid = parseInt(userId);
    const pageData = {}

    if (!allowedUsers.includes(parseInt(req.uid))) {
        throw new Error('Unauthorized! You are not allowed to view this page')
    }

    pageData.title = 'Analytics';
    let sidebarContent = utils.sidebar(sidebar, 'admin', {
        classes: 'active'
    });

    const startObservation = await db.findField(collectionName, {uid, type: 'observation'});
    if (!startObservation) {
        throw new Error('No observation data was found for this user');
    }

    const [endObservation] = await Promise.all([,
        db.findField(collectionName, {uid, type: 'observation:reflection:signoff'}),
    ]);

    const {
        startingDate, 
        endingDate, 
        timeframe
    } = observationApi.core.getObservationTimeframe(startObservation, endObservation);

    pageData.sidebar = reStructureSidebar(sidebarContent, config.administrator);
    pageData.uid = uid;
    pageData.startingDate = startingDate;
    pageData.endingDate = endingDate;
    pageData.timeframe = timeframe;


    res.render(BASE + '/individual_analytics', pageData);
}

data.faq = async (req, res) => {
    const uid = parseInt(req.uid);
    if (!allowedUsers.includes(uid)) {
        throw new Error('Unauthorized! You are not allowed to view this page')
    }

    const faq = {};
    faq.title = 'FAQs';

    let sidebarContent = utils.sidebar(sidebar, 'faq', {
        classes: 'active'
    });
    
    faq.sidebar = reStructureSidebar(sidebarContent, config.administrator);
    faq.isAdmin = isAdmin(uid)
    faq.data = await db.findFields(collectionName, {uid, type: 'observation:faq'});
    res.render(BASE + '/faq', faq);
}

data.faqs = async (req, res) => {
    const uid = parseInt(req.uid);
    const faqs = {};
    faqs.title = 'Frequently Asked Questions';
    faqs.stage = await prepareStageer(req);

    let sidebarContent = utils.sidebar(sidebar, 'faqs', {
        classes: 'active'
    });
    const [videoRefprofile, observationData] = await Promise.all([
        db.findField(collectionName, {uid, type: 'videoref:profile'}),
        db.findField(collectionName, {uid, type: 'observation'})
    ]);
    faqs.isAdmin = isAdmin(uid);
    faqs.sidebar = await getSidebarBasedOnObservationStage(videoRefprofile, observationData, sidebarContent, uid);
    faqs.faqs = await db.findFields(collectionName, {type:"observation-video:faq",isObservation:true});
    res.render(BASE + '/faqs', faqs);
}

function getProbabilityValues (probability) {
    const hiringProbability = {
        value: probability
    };

    if (probability > 60) {
        hiringProbability.classes = 'bg-success';
    } else if (probability >= 50) {
        hiringProbability.classes = 'bg-warning';
    } else if (probability > 40) {
        hiringProbability.classes = 'bg-danger';
    }

    return hiringProbability;
}

async function getSidebarBasedOnObservationStage (videoRefprofile, observationData, sidebarContent, uid) {
    
    if (!videoRefprofile) {
        return reStructureSidebar(sidebarContent, config.noVideoReflection, uid);
    } else if (!observationData) {
        return reStructureSidebar(sidebarContent, config.noObservation, uid);

    } else if (observationData) {
        let signOffReflection = await db.findField(collectionName, {uid, type: 'observation:reflection:signoff'});
        
        if (signOffReflection) {
            return reStructureSidebar(sidebarContent, config.thankYou, uid);
        }

        if (await isSignOffStage(observationData)) {
            return reStructureSidebar(sidebarContent, config.signOff, uid);
    
        }

        return reStructureSidebar(sidebarContent, config.newObservation, uid);

    } else {
        return reStructureSidebar(sidebarContent, config.observation, uid);
    }
}


function reStructureSidebar (sidebarArray=[], additions=[], uid=0) {
    let newArray = [];

    if (isAdmin(uid)) {
        additions.push('admin');
    }

    sidebarArray.forEach(el => {
        if (additions.includes(el.id)) {
            newArray.push(el);
        }
    });

    return newArray;
}

function isAdmin (uid) {
    return allowedUsers.includes(uid);
}

function formateDate (date) {
    return `${moment(date).format("DD MMM, YYYY")}, ${moment(date).format('hh:mm A')}`;
}