"use strict";

const utils = require('../../utils');
const db = require('../../../database');
const User = require('../../../user');
const {sidebar} = require('./sidebar');
const {ObjectId} = require('mongodb');
const generators = require('../../../generators')

const joiningletter = module.exports;

const BASE = 'generators/joiningletter';
const collectionName = db.collections.GLOBAL.GENERATORS;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

joiningletter.get = async (req, res) => {
    const pageData = {}

    pageData.title = 'Home';
    pageData.sidebar = utils.sidebar(sidebar, 'index', {
        classes: 'active'
    });

    res.render(BASE + '/index', pageData);
}

joiningletter.letters = async (req, res) => {
    const pageData = {}

    pageData.title = 'Letters';
    pageData.sidebar = utils.sidebar(sidebar, 'letters', {
        classes: 'active'
    });

    res.render(BASE + '/letters', pageData);
}

joiningletter.generatedLetters = async (req, res) => {
    const {id} = req.params;
    const pageData = {}

    if (id.length != 24) {
        throw new Error('Invalid Id supplied');
    }

    const requests = await db.findField(collectionName, {_id: ObjectId(id), type: 'generators:joining_letter:request'});
    if (!requests) {
        throw new Error('Nothing was found against the supplied Id');
    }

    const {processedItems=[]} = requests;

    pageData.title = 'Processed letters';
    pageData.sidebar = utils.sidebar(sidebar, 'letters', {
        classes: 'active'
    });

    pageData.processedItems = processedItems;

    res.render(BASE + '/outputs', pageData);
}

joiningletter.create = async (req, res) => {
    const pageData = {}

    pageData.title = 'Generate letters in batch';
    pageData.sidebar = utils.sidebar(sidebar, 'letters', {
        classes: 'active'
    });

    pageData.templates = await db.findFields(collectionName, {type: 'generators:joining_letter:template'}, ['_id', 'templateName']);
    pageData.workDays = days;

    res.render(BASE + '/new_letters', pageData);
}

joiningletter.templates = async (req, res) => {
    const pageData = {}

    pageData.title = 'Templates';
    pageData.sidebar = utils.sidebar(sidebar, 'templates', {
        classes: 'active'
    });

    res.render(BASE + '/templates', pageData);
}

joiningletter.newTemplate = async (req, res) => {
    const pageData = {}
    const letterTemplates = generators.joiningLetter.listTemplates();

    pageData.title = 'Create new template';
    pageData.sidebar = utils.sidebar(sidebar, 'templates', {
        classes: 'active'
    });
    pageData.letterTemplates = letterTemplates.map(el => {
        let name = el.split('_');
        name = name.map(e => utils.capitalizeFirstLetter(e));

        return {name: name.join(' '), value: el};
    });

    res.render(BASE + '/new_template', pageData);
}

joiningletter.editTemplate = async (req, res) => {
    const {id} = req.params;
    if (id.length != 24) {
        throw new Error('Invalid Id supplied');
    }

    const pageData = {};
    const letterTemplates = generators.joiningLetter.listTemplates();

    const [template] = await Promise.all([
        db.findField(collectionName, {_id: ObjectId(id), type: 'generators:joining_letter:template'}),
    ])

    if (!template) {
        throw new Error('No template was found with the supplied Id');
    }
    const {company} = template;
    delete template.company;

    pageData.title = 'Editing template';
    pageData.sidebar = utils.sidebar(sidebar, 'templates', {
        classes: 'active'
    });
    pageData.letterTemplate = template;
    pageData.company = company;
    pageData.editing = true;
    pageData.letterTemplates = letterTemplates.map(el => {
        let name = el.split('_');
        name = name.map(e => utils.capitalizeFirstLetter(e));

        return {name: name.join(' '), value: el};
    });

    res.render(BASE + '/new_template', pageData);
}