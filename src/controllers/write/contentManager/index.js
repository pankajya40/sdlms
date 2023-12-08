"use strict";

const api = require("../../../api");
const helpers = require("../../helpers");

const contentController = module.exports;


contentController.getContent = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.content.core.getContent(req));
};

contentController.postContent = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.content.core.postContent(req));
};

contentController.postFeedback = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.content.core.postFeedback(req));
}

contentController.getFeedback = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.content.core.getFeedback(req));
}

contentController.isFeedbackExist = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.content.core.isFeedbackExist(req));
}
