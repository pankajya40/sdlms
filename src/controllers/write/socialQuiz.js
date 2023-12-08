"use strict";

const api = require("../../api");
const helpers = require("../helpers");

const socialQuiz = module.exports;

/**
 * @description socialQuiz operations (GET, CREATE, UPDATE, DELETE)
 * @key req, res
 */

// Quiz operations

socialQuiz.createQuiz = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.createQuiz(req));

};

socialQuiz.getQuiz = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.getQuiz(req));
};

socialQuiz.getSelectedQuiz = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.getSelectedQuiz(req));
};


socialQuiz.editQuiz = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.editQuiz(req));
};

socialQuiz.deleteQuiz = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.deleteQuiz(req));
};

socialQuiz.publishedQuiz = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.publishedQuiz(req));
};

socialQuiz.getPublishedQuiz = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.getPublishedQuiz(req));
};

socialQuiz.getActiveQuiz = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.getActiveQuiz(req));
};

socialQuiz.startQuiz = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.startQuiz(req));
};

socialQuiz.endQuiz = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.endQuiz(req));
};

socialQuiz.addQuestion = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.addQuestion(req));
};

socialQuiz.updateQuestion = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.updateQuestion(req));
};

socialQuiz.deleteQuestion = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.deleteQuestion(req));
};

socialQuiz.addOptions = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.addOptions(req));
};

socialQuiz.startMarking = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.startMarking(req));
};

socialQuiz.endMarking = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.endMarking(req));
};

socialQuiz.addParticipantUid = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.addParticipantUid(req));
};

socialQuiz.setEvaluators = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.setEvaluators(req));
};

socialQuiz.updateMarkings = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.updateMarking(req));
};



// Submission operations

socialQuiz.createSubmission = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.createSubmission(req));
}

socialQuiz.getSubmission = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.getSubmission(req));
}

socialQuiz.editSubmission = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.editSubmission(req));
}

socialQuiz.deleteSubmission = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.deleteSubmission(req));
}

socialQuiz.clone = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.clone(req));
};
