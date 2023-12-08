"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');
const { create } = require("lodash");

const select = module.exports;

select.get = async function (req, res, next) {
    var select = {};
    var uid = parseInt(req.uid);
    const templateCollection = db.collections.SOCIAL_QUIZ.TEMPLATE;
    select.quiz = await db.findField(templateCollection,{uid: uid});
    select.title = 'Select Quiz'; //Select-{Quiz Name}
    res.render('socialquiz/creator/select', select);
};