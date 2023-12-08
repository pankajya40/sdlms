"use strict";

const utils = require('../utils');
const {sidebar, protectedMenus} = require('./sidebar');
const db = require('../../database');
const User = require('../../user');
const {ObjectId} = require('mongodb');
const {paths} = require('../../constants');
const countryCodes = require('./countryCodes.json');
const dtFormsApi = require('../../api/DTForms')

const data = module.exports;
const BASE = 'dtforms';
const collectionName = db.collections.DT_FORMS;
const sharerUriBase = '/forms/applicant/response/';

data.home = async (req, res) => {
    const pageData = {};
    pageData.title = 'My forms';

    pageData.sidebar = utils.sidebar(sidebar, 'home',{
        classes: 'active'
    });

    pageData.sharerUriBase = sharerUriBase;

    res.render(BASE + '/view_all', pageData);
}

data.editForm = async (req, res) => {
    const {id} = req.params;
    const pageData = {};
    pageData.title = 'Manage your form';

    pageData.sidebar = utils.sidebar(sidebar, 'home',{
        classes: 'active'
    });

    pageData.serviceEmail = 'shawan@deepthought.education';
    pageData.sharerUriBase = sharerUriBase;

    try {
        const {client_email} = require(paths.baseDir + 'gsheetsapi.json');
        pageData.serviceEmail = client_email;
    } catch {}

    const form = await db.findField(collectionName, {_id: ObjectId(id), type: 'form'});
    if (!form) {
        throw new Error('Invalid form Id, no data was found!');
    }

    if (form.linkedSheetId) {
        try {
            form.subsheets = await dtFormsApi.core.getSubsheetsBySheetId(form.linkedSheetId);
        } catch {}
    }

    pageData.form = form;
    res.render(BASE + '/creator/edit', pageData);
}

data.getResponseForm = async (req, res) => {
    const {id} = req.params;
    const {action, ref} = req.query;
    const uid = parseInt(req.uid);

    const pageData = {};

    pageData.title = 'Submit your response';
    pageData.id = id;

    const form = await db.findField(collectionName, {_id: ObjectId(id), type: 'form'});
    if (!form) {
        throw new Error('Invalid form Id');
    }

    if ((action && action == 'success') && ref) {
        let response = await db.findField(collectionName, {_id: ObjectId(ref), type: 'response', uid});
        if (!response) {
            return res.redirect(BASE + '/applicant/response');
        }
        console.log(response.formId == form._id);

        if (response.formId != id) {
            throw new Error('You might have stumbled into a page that doesn\'t exist.');
        }

        pageData.title = form.title;
        pageData.message = form.message;
        pageData.isSuccessPage = true;

        return res.render(BASE + '/applicant/response', pageData);
    }

    pageData.collectInfo = form.collectInfo || false;
    pageData.countryCodes = [
        {
            country: 'India',
            code: '91'
        }
    ];

    pageData.form = form;

    res.render(BASE + '/applicant/response', pageData);
}

data.createForm = async (req, res) => {
    const pageData = {};
    pageData.title = 'Create a new form';

    pageData.sidebar = utils.sidebar(sidebar, 'create',{
        classes: 'active'
    });

    res.render(BASE + '/creator/create', pageData);
}

data.viewResponses = async (req, res) => {
    const {id} = req.params;
    const {responseId, uid} = req.query;

    const pageData = {};
    pageData.title = 'View recorded responses';

    pageData.sidebar = utils.sidebar(sidebar, 'home',{
        classes: 'active'
    });

    pageData.id = id;

    if (responseId) {
        pageData.isIndividualResponse = true;
        pageData.response = await db.findField(collectionName, {_id: ObjectId(responseId), type: 'response', uid: parseInt(uid)});

        if (pageData.response && pageData.response.uid) {
            let userData = await User.getUserFields(pageData.response.uid, ['username', 'fullname']);
            let name = userData.fullname || userData.username || 'Guest';

            pageData.response.user = userData;
            pageData.title = 'Viewing response from ' + name;
        }

        return res.render(BASE + '/responses', pageData);
    }

    res.render(BASE + '/responses', pageData);
}

data.viewMySubmissions = async (req, res) => {
    const {id} = req.params;

    const pageData = {};
    pageData.title = 'My submissions';
    pageData.id = id;

    pageData.sidebar = utils.sidebar(sidebar, 'submissions', {
        classes: 'active'
    });

    if (id) {
        let response = await db.findField(collectionName, {_id: ObjectId(id), type: 'response'});
        if (!response) {
            throw new Error('Invalid response Id, nothing was found.');
        }

        pageData.response = response;
        pageData.isIndividualSubmission = true;
    }

    res.render(BASE + '/applicant/submissions', pageData);
}