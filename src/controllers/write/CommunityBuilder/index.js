"use strict";

const api = require("../../../api");
const helpers = require("../../helpers");

const commController = module.exports;

commController.createQuestion = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.communitybuilder.core.createQuestion(req))
};
commController.getQuestion = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.communitybuilder.core.getQuestion(req))
};
commController.createAnswer = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.communitybuilder.core.createAnswer(req))
};
// commController.getAnswer = async (req, res) => {
//     helpers.formatApiResponse(200, res, await api.communitybuilder.core.getAnswer(req))
// };