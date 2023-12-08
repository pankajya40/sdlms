"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');
const User = require('../../../user');

const profile = module.exports;

profile.get = async function (req, res, next) {

    let { tid } = req.params;
    if (!tid) throw new Error("No project tid was supplied!");

    const uid = parseInt(req.uid);

    var profile = {};

    [profile.project, profile.applicant] = await Promise.all([
        db.findField(db.collections.DEFAULT, {tid: parseInt(tid),type: "project"}),
        db.findField(db.collections.DEFAULT, {tid: parseInt(tid), type: 'project:applicants', uid})
    ]);

    if (!profile.project || (profile.project && !Object.keys(profile.project).length)) {
        throw new Error("Invalid tid! No project was found with tid: " + tid);
    }

    [profile.userData] = await Promise.all([
        User.getUserFields(profile.project.uid, ['username'])
    ])

    if (profile.applicant) {
        return res.redirect('/dtthon/applicant/storyboard/' + tid);
    }

    profile.title = `${profile.project.title}`;

    res.render('dtthon/applicant/profile', profile);
};