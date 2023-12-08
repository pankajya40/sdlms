"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');

const profile = module.exports;

profile.get = async function (req, res, next) {
    let { tid } = req.params;

    var profile = {};

    if (tid) {
        profile.project = await db.findField(db.collections.DEFAULT, {tid: parseInt(tid), type: 'project'});
        if (!profile.project) {
            throw new Error('Invalid TID! No project was found with the tid: ' + tid)
        }
    }

    profile.title = 'DTthon Profile Create';
	profile.clone = req.query.clone;
    res.render('dtthon/creator/profile', profile);
};