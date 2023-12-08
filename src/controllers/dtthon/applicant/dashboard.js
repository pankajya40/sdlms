"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');
const {sidebar, protectedMenus} = require('./sidebar');
const utils = require('../../utils');

const dashboard = module.exports;

dashboard.get = async function (req, res, next) {
    var dashboard = {};

    dashboard.title = 'DTthon Dashboard';
        dashboard.sidebar = utils.sidebar(sidebar, 'dashboard',{
        classes: 'active'
    });
    res.render('dtthon/applicant/dashboard', dashboard);
};