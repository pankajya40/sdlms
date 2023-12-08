'use strict';

const winston = require('winston');
const db = require('../../../database');
const user = require('../../../user');
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');

const dashboard = module.exports;
const templateCollection = db.collections.SCORECARD.TEMPLATE;

dashboard.get = async function (req, res, next) {
    const uid = parseInt(req.uid);
    var dashboard = {};
    let { tid } = req.params;

    if (tid) {
        dashboard.project = await db.findField(db.collections.DEFAULT, {tid: parseInt(tid), type: 'project'});
        if (!dashboard.project) {
            throw new Error('Invalid TID! No project was found with the tid: ' + tid)
        }

        dashboard.isProjectOwner = uid && (dashboard.project.uid === uid);
    }
    dashboard.scorecard = await db.findField(templateCollection,{tid: parseInt(dashboard.project.scorecardId),type:'social_scorecard_template'});

    dashboard.title = 'DTthon Creator Micro Dashboard';
    res.render('dtthon/creator/microDashboard', dashboard);
};