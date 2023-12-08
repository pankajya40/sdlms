"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const dashboard = module.exports;
const templateCollection = db.collections.SCORECARD.TEMPLATE;

dashboard.get = async function (req, res, next) {
    var dashboard = {};

    let { tid } = req.params;
    let uid = parseInt(req.uid);
    if (!tid) throw new Error("No project tid was supplied!");

    dashboard.scorecard = await db.findField(templateCollection,{tid: parseInt(tid),type:'social_scorecard_template'});

    if (!dashboard.scorecard || (dashboard.scorecard && !Object.keys(dashboard.scorecard).length)) {
        throw new Error("Invalid tid! No project was found with tid: " + tid);
    }

    dashboard.title = 'Scorecard Creator Micro Dashboard ';
    res.render('scorecard/microDashboard', dashboard);
};