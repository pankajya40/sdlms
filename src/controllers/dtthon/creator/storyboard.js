"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');

const storyboard = module.exports;

storyboard.get = async function (req, res, next) {
    let { tid } = req.params;
    let uid = parseInt(req.uid);
    if (!tid) throw new Error("No project tid was supplied!");

    var storyboard = {};

    storyboard.title = 'DTthon Storyboard Create';
    storyboard.project = await db.findField(db.collections.DEFAULT,{tid: parseInt(tid),uid:uid,type:'project'});

    if (!storyboard.project || (storyboard.project && !Object.keys(storyboard.project).length)) {
        throw new Error("Invalid tid! No project was found with tid: " + tid);
    }
 
    res.render('dtthon/creator/storyboard', storyboard);
};