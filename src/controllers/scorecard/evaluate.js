"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const evaluate = module.exports;
const templateCollection = db.collections.SCORECARD.TEMPLATE;

evaluate.get = async function (req, res, next) {

    let { tid, uid } = req.params;
    if (!tid) throw new Error("No project tid was supplied!");

    var evaluate = {};

    let [submission] = await Promise.all([
        db.findField(db.collections.DEFAULT, {tid: parseInt(tid), uid:parseInt(uid), type: 'submission'}),
    ]);

    evaluate.uid = submission.uid;

    evaluate.projectID = submission.tid

    evaluate.projectTitle = submission.title
    evaluate.submission = submission;

    evaluate.scorecard = await db.findField(templateCollection,{tid: parseInt(submission.scorecardId),type:'social_scorecard_template'});

    if (!evaluate.scorecard || (evaluate.scorecard && !Object.keys(evaluate.scorecard).length)) {
        throw new Error("Invalid tid! No project was found with tid: " + tid);
    }

    evaluate.title = `${evaluate.scorecard.title}-Evaluate`; //{Name of Scorecard}-Evaluate
    res.render('scorecard/evaluate', evaluate);
};