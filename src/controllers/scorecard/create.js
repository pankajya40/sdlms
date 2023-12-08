"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const create = module.exports;
const templateCollection = db.collections.SCORECARD.TEMPLATE;

create.get = async function (req, res, next) {
    let { tid } = req.params;
    let uid = parseInt(req.uid);
    if (!tid) throw new Error("No project tid was supplied!");

    var create = {};

    create.title = 'Create Scorecard';
    create.scorecard = await db.findField(templateCollection,{tid: parseInt(tid),uid:uid,type:'social_scorecard_template'});

    if (!create.scorecard || (create.scorecard && !Object.keys(create.scorecard).length)) {
        throw new Error("Invalid tid! No project was found with tid: " + tid);
    }
    res.render('scorecard/create', create);
};