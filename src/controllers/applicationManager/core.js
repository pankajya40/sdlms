"use strict";

const utils = require('../utils');
const db = require("../../database");
const { sidebar } = require("./sidebar");
const { ObjectId } = require('mongodb');

const core = module.exports;.0

const collection = db.collections.GLOBAL.APPLICATION_MANAGER;

core.persona = async function (req, res, next) {
    var persona = {};
    let { id } = req.params;
    if (!id) throw new Error("No project tid was supplied!");

    let project = await db.findField(collection, {_id: ObjectId(id), type: "project"});
    persona.name = project.name;
    persona.content = project.content;
    persona.video = project.videoUrl
    persona.assignment = project.forms[0].url;

    persona.title = `${project.name} Persona`;
    persona.sidebar = utils.sidebar(getSideBar(id), 'persona', {
        classes: 'active'
    });
    res.render('applicationManager/persona', persona);
};

core.assignment = async function (req, res, next) {
    var assignment = {};
    let { id } = req.params;
    if (!id) throw new Error("No project tid was supplied!");

    let project = await db.findField(collection, {_id: ObjectId(id), type: "project"});
    assignment.name = project.name;
    assignment.assignment = project.forms[1].url;

    assignment.title = `${project.name} Assignment`;

    assignment.sidebar = utils.sidebar(getSideBar(id), 'assignment', {
        classes: 'active'
    });
    res.render('applicationManager/assignment', assignment);
};

core.leaderboard = async function (req, res, next) {
    var leaderboard = {};
    let { id } = req.params;
    if (!id) throw new Error("No project tid was supplied!");

    leaderboard.projectId = id;
    let project = await db.findField(collection, {_id: ObjectId(id), type: "project"});

    leaderboard.sidebar = utils.sidebar(getSideBar(id), 'leaderboard', {
        classes: 'active'
    });

    leaderboard.title = `${project.name} Leaderboard`;
    res.render('applicationManager/leaderboard', leaderboard);
};

function getSideBar(projectId) {
    return sidebar.map((item) => {
        item.url = item.url.replace(':projectId', projectId);
        return item;
    })
}
