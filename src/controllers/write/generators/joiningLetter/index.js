"use strict";

const api = require("../../../../api");
const helpers = require("../../../helpers");

const formsController = module.exports;


formsController.getTemplates = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.generators.joiningLetter.getTemplates(req));
};

formsController.createTemplate = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.generators.joiningLetter.createTemplate(req));
};

formsController.updateTemplate = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.generators.joiningLetter.updateTemplate(req));
};

formsController.deleteTemplate = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.generators.joiningLetter.deleteTemplate(req));
};

formsController.getGeneratedLetters = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.generators.joiningLetter.getGeneratedLetters(req));
};

formsController.generateLetters = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.generators.joiningLetter.generateLettersInBatch(req));
};