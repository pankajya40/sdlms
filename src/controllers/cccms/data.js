"use strict";

const utils = require('../utils');
const {sidebar, protectedMenus} = require('./sidebar');
const db = require('../../database');
const User = require('../../user');
const {ObjectId} = require('mongodb');
const {paths} = require('../../constants');
const config = require('./config');
const data = module.exports;

const BASE = 'cccms';
// const collectionName = db.collections.DT_FORMS;

data.get = async (req, res) => {
    const pageData = {};
    pageData.sidebar = utils.sidebar(sidebar, 'index',{
        classes: 'active'
    });

    pageData.title = "CC-CMS HOME";

    res.render(BASE + '/index', pageData);
}

data.incomingrequests = async (req, res) => {
    const pageData = {};
    pageData.sidebar = utils.sidebar(sidebar, 'incoming',{
        classes: 'active'
    });

    pageData.title = "Incoming Requests";

    res.render(BASE + '/incomingrequests', pageData);
}
data.outgoingrequests = async (req, res) => {
    const pageData = {};
    pageData.sidebar = utils.sidebar(sidebar, 'outgoing',{
        classes: 'active'
    });

    pageData.title = "Outgoing Requests";

    res.render(BASE + '/outgoingrequests', pageData);
}

data.write = async (req, res) => {
    const pageData = {};

    pageData.title = "Outcomes/Reflections/Case Study";

    res.render(BASE + '/write');
}

data.connect = async (req, res) => {
    const pageData = {};
    pageData.sidebar = utils.sidebar(sidebar, 'connect',{
        classes: 'active'
    });

    pageData.title = "Connect";

    res.render(BASE + '/connect', pageData);
}

data.explore = async (req, res) => {
    const pageData = {};
    pageData.sidebar = utils.sidebar(sidebar, 'explore',{
        classes: 'active'
    });

    pageData.title = "Explore";

    res.render(BASE + '/explore', pageData);
}
