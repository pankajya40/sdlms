"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');

const  dashboardController = module.exports;

dashboardController.get = async function (req, res, next) {
    var dashboard = {};
    dashboard.title = 'Dashboard Page';
    res.render('workshop/user/dashboard', dashboard);
};