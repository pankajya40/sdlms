"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const utils = require('../utils');
const {sidebar, protectedMenus} = require('./sidebar');
const {content} = require('./config')

const homeController = module.exports;

homeController.tools = async function (req, res) {
    const pageData = {}

    pageData.title = 'Welcome to DeepThought';
        pageData.sidebar = utils.sidebar(sidebar, 'tools',{
        classes: 'active'
    });

    pageData.content = content.tools; 

    res.render('dashboard/tools', pageData);
}

homeController.sdlms = async function (req, res) {
    const pageData = {}

    pageData.title = 'Socratic Dailogue Learning Managment System';
    pageData.sidebar = utils.sidebar(sidebar, 'sdlms', {
        classes: 'active'
    });

    pageData.content = content.sdlms; 

    res.render('dashboard/sdlms', pageData);
}

homeController.dtthon = async function (req, res) {
    const pageData = {}

    pageData.title = 'DT Thon';
        pageData.sidebar = utils.sidebar(sidebar, 'dtthon',{
        classes: 'active'
    });

    pageData.content = content.dtthon; 

    res.render('dashboard/dtthon', pageData);
}

homeController.pdgms = async function (req, res) {
    const pageData = {}

    pageData.title = 'Peter Drucker Growth Management System';
        pageData.sidebar = utils.sidebar(sidebar, 'pdgms',{
        classes: 'active'
    });

    pageData.content = content.pdgms; 

    res.render('dashboard/pdgms', pageData);
}
