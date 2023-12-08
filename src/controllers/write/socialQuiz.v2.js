"use strict";

const api = require("../../api");
const helpers = require("../helpers");

const socialQuiz = module.exports;
socialQuiz.mcq = {};

socialQuiz.get = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.quizzes.get(req));
};

socialQuiz.create = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.quizzes.create(req));
};

socialQuiz.update = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.quizzes.update(req));
};

socialQuiz.delete = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.quizzes.delete(req));
};

socialQuiz.clone = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.quizzes.clone(req));
};

socialQuiz.attach = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.quizzes.attach(req));
};

socialQuiz.answer = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.quizzes.answer(req));
};

socialQuiz.responses = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.quizzes.getResponses(req));
};

socialQuiz.start = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.quizzes.startQuiz(req));
};

socialQuiz.updateQuestionState = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.quizzes.updateQuestionState(req));
};

socialQuiz.markAnswer = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.quizzes.markAnswer(req));
};


/**
 * @date 31-03-2023
 * @author imshawan <hello@imshawan.dev>
 * @description Controllers for MCQs, an integral part of social quiz (community quiz)
 */

socialQuiz.mcq.get = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.mcq.get(req));
};

socialQuiz.mcq.create = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.mcq.create(req));
};

socialQuiz.mcq.update = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.mcq.update(req));
};

socialQuiz.mcq.delete = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.mcq.delete(req));
};

socialQuiz.mcq.clone = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.mcq.clone(req));
};

socialQuiz.mcq.answer = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.mcq.answer(req));
};

socialQuiz.mcq.responses = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialQuiz.mcq.getResponses(req));
};