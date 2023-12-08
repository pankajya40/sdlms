"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');

const certificate = module.exports;

certificate.get = async function (req, res, next) {
    var certificate = {};

    let { tid } = req.params;
    let {uid} = req.params;
    let project, submission;
    if (tid) {
        [project, submission] = await Promise.all([
        db.findField(db.collections.DEFAULT, {tid: parseInt(tid),type: 'project'}),
        db.findLatestField(db.collections.DEFAULT, {tid: parseInt(tid), type:'submission',uid:parseInt(uid)})
    ]);
    }
    
    certificate.tid = project.tid;
    certificate.coursetitle = project.title;
    certificate.coursedescription = project.description;
    certificate.courseoutcomes = project.learning_outcomes;
    certificate.submissionstatus = submission.status;
    certificate.uid = uid;
    certificate.req_uid = req.uid;


    certificate.title = `${project.title}-Certificate`;
    res.render('dtthon/applicant/certificate', certificate);
    
};