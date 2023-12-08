"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const utils = require('../utils');
const {sidebar, protectedMenus} = require('./sidebar');
const privileges = require('../../privileges');

const dashboard = module.exports;

dashboard.get = async function (req, res, next) {
    var dashboard = {};
    console.log("err")
    dashboard.title = 'Dashboard application manager';
    dashboard.sidebar = utils.sidebar(sidebar, 'dashboard',{
        classes: 'active'
    });
    res.render('applicationManager/dashboard', dashboard);
};