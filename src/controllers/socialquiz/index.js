'use strict';

const socialquiz = module.exports;
socialquiz.mcq = {};

const { quiz: quizConfig, mcq: mcqConfig } = require('./config');
const utils = require('../utils');
const db = require('../../database');
const collectionName = db.collections.SOCIAL_QUIZ_V2;
const Object = require('mongodb').ObjectID;
const attributes = require('../../api/attributes');




// socialquiz.creator_control = require("./creator/control");
// socialquiz.creator_create = require("./creator/create");
// socialquiz.creator_dashboard = require("./creator/dashboard");
// socialquiz.creator_select = require("./creator/select");

// socialquiz.user_mark = require("./user/mark");
// socialquiz.user_dashboard = require("./user/dashboard");
// socialquiz.user_solve = require("./user/solve");
// socialquiz.user_view = require("./user/view");

const TEMPLATE_BASE_PATH = 'socialquiz';
const MCQ_TEMPLATE_BASE_PATH = TEMPLATE_BASE_PATH + '/mcq';

socialquiz.dashboard = async (req, res) => {

    let dashboard = {};
    dashboard.title = 'Social Quiz Dashboard';
    dashboard.sidebar = utils.sidebar(quizConfig.sidebar, 'dashboard', {
        classes: 'active'
    })

    res.render(`${TEMPLATE_BASE_PATH}/dashboard`, dashboard);
}

socialquiz.create = async (req, res) => {

    let create = {};
    create.title = 'Create Quiz';
    create.sidebar = utils.sidebar(quizConfig.sidebar, 'create', {
        classes: 'active'
    })

    res.render(`${TEMPLATE_BASE_PATH}/create`, create);
}

socialquiz.single = async (req, res) => {

    let single = {};

    let quizId = req.params.quizId;
    if (Object.isValid(quizId) === false) return res.redirect('/404');

    let quiz = await db.findField(collectionName, { _id: Object(quizId) });
    if (!quiz) return res.redirect('/404');

    single.title = `Quiz : ${quiz.title}`
    single.sidebar = utils.sidebar(quizConfig.sidebar, 'dashboard', {
        classes: 'active'
    });

    single.quiz = quiz;
    single.update = quiz.createdBy == `user:${req.uid}`;
    single.backUrl = `/quizzes/dashboard`;

    res.render(`${TEMPLATE_BASE_PATH}/single`, single);
}

socialquiz.mcq.dashboard = async (req, res) => {

    let dashboard = {};
    dashboard.title = 'MCQ Dashboard';
    dashboard.sidebar = utils.sidebar(mcqConfig.sidebar, 'dashboard', {
        classes: 'active'
    })

    res.render(`${MCQ_TEMPLATE_BASE_PATH}/dashboard`, dashboard);
}

socialquiz.mcq.create = async (req, res) => {

    let create = {};
    create.title = 'Create MCQ';
    create.sidebar = utils.sidebar(mcqConfig.sidebar, 'create', {
        classes: 'active'
    })

    res.render(`${MCQ_TEMPLATE_BASE_PATH}/create`, create);
}

socialquiz.mcq.single = async (req, res) => {

    let single = {};

    let mcqId = req.params.mcqId;
    if (Object.isValid(mcqId) === false) return res.redirect('/404');

    let mcq = await db.findField(collectionName, { _id: Object(mcqId) });
    if (!mcq) return res.redirect('/404');

    single.title = `MCQ : ${mcq.title || "Untitled"}`
    single.sidebar = utils.sidebar(mcqConfig.sidebar, 'dashboard', {
        classes: 'active'
    });

    single.mcq = mcq;
    single.update = mcq.createdBy == `user:${req.uid}`;
    single.backUrl = `/mcq/dashboard`;

    res.render(`${MCQ_TEMPLATE_BASE_PATH}/single`, single);
}

socialquiz.mcq.submit = async (req, res) => {

    let single = {};

    let mcqId = req.params.mcqId;
    if (Object.isValid(mcqId) === false) return res.redirect('/404');

    let mcq = await db.findField(collectionName, { _id: Object(mcqId) });
    if (!mcq) return res.redirect('/404');

    const uid = parseInt(req.uid);
    const payload = {
        _key: `mcq:${mcqId}:answer:${uid}`,
        uid,
    };

    let isExists = await db.findField(collectionName, payload);
    if (isExists) throw new Error('You have already answered this mcq');

    single.title = `MCQ : ${mcq.title || "Untitled"}`
    single.sidebar = utils.sidebar(mcqConfig.sidebar, 'dashboard', {
        classes: 'active'
    });

    single.mcq = mcq;
    single.update = mcq.createdBy == `user:${req.uid}`;
    single.backUrl = `/mcq/dashboard`;

    res.render(`${MCQ_TEMPLATE_BASE_PATH}/submit`, single);
}

socialquiz.mcq.responses = async (req, res) => {

    let responses = {};

    let mcqId = req.params.mcqId;
    if (Object.isValid(mcqId) === false) return res.redirect('/404');

    let mcq = await db.findField(collectionName, { _id: Object(mcqId) });
    if (!mcq) return res.redirect('/404');

    let keys = {
        _key: { $regex: new RegExp(`^mcq:${mcqId}:answer:(.*)$`), $options: 'i' },
        deleted: { $ne: true }
    };
    mcq.responses = await db.findFields(collectionName, keys);

    
    mcq.responses =  await attributes.populate(mcq.responses, ['createdBy:user']);

    mcq.responses.forEach((response, index) => {
        response.questions.forEach((question, index) => {
            question.answer  = question.options
            .filter(o => o.selected == "true" || o.selected == 1)
            .map(o => o.option)
            .join(', ');
        });
        response.user = response.createdBy.fullname || response.createdBy.displayname || response.createdBy.username;
    });

    responses.title = `MCQ : ${mcq.title || "Untitled"}`
    responses.sidebar = utils.sidebar(mcqConfig.sidebar, 'dashboard', {
        classes: 'active'
    });

    responses.mcq = mcq;
    responses.update = mcq.createdBy == `user:${req.uid}`;
    responses.backUrl = `/mcq/dashboard`;


    res.render(`${MCQ_TEMPLATE_BASE_PATH}/responses`, responses);
}

