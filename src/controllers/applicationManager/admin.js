"use strict";

const utils = require('../utils');
const db = require("../../database");
const sidebar = require("./sidebar")
const { ObjectId } = require('mongodb');


const core = module.exports;

const collection = db.collections.GLOBAL.APPLICATION_MANAGER;

core.project = async function (req, res, next) {
    var project = {};

    project.title = 'Project';

    res.render('applicationManager/admin/project', project);
};

core.application = async function (req, res, next) {
    var application = {};
    let { id } = req.params;
    if (!id) throw new Error("No project tid was supplied!");

    let project = await db.findField(collection, {_id: ObjectId(id), type: "project"});
    let rubric = await db.findField(collection, {_id: ObjectId(project.rubricId), type: "rubric"});;
    
    application.rubric = rubric;
    application.project = project;
    application.projectId = id;

    application.title = 'Application';
    res.render('applicationManager/admin/application', application);
};
