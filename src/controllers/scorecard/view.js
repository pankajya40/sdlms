"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const view = module.exports;
const templateCollection = db.collections.SCORECARD.TEMPLATE;
view.get = async function (req, res, next) {

    let { tid, uid } = req.params;
    if (!tid) throw new Error("No project tid was supplied!");

    var view = {};

    let [submission] = await Promise.all([
        db.findField(db.collections.DEFAULT, { tid: parseInt(tid), uid: parseInt(uid), type: 'submission' }),
    ]);

    view.submission = submission

    view.scorecard = await db.findField(templateCollection, { tid: parseInt(submission.scorecardId), type: 'social_scorecard_template' });

    if (!view.scorecard || (view.scorecard && !Object.keys(view.scorecard).length)) {
        throw new Error("Invalid tid! No project was found with tid: " + tid);
    }

    view.title = `${view.scorecard.title}-View`;
    res.render('scorecard/view', view);
};