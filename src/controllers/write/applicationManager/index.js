'use strict';

const api = require('../../../api');
const helpers = require('../../helpers');

const applicationManager = module.exports;

applicationManager.createProject = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.applicationManager.core.createProject(req));
}

applicationManager.getProjects = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.applicationManager.core.getProjects(req));
}

applicationManager.createApplication = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.applicationManager.core.createApplication(req));
}

applicationManager.addFeedbackToApplication = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.applicationManager.core.addFeedbackToApplication(req));
}

applicationManager.createRubric = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.applicationManager.core.createRubric(req));
}

applicationManager.getLeaderboard = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.applicationManager.core.getLeaderboard(req));
}