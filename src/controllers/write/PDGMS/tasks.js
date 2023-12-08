"use strict";

const api = require("../../../api");
const helpers = require("../../helpers");

const task = module.exports;


// Task Operations
task.getTask = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.tasks.getTask(req));
};
task.createTask = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.tasks.createTask(req));
};
task.updateTask = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.tasks.updateTask(req));
};
task.deleteTask = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.tasks.deleteTask(req));
};