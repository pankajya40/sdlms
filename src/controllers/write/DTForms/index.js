"use strict";

const api = require("../../../api");
const helpers = require("../../helpers");

const formsController = module.exports;


formsController.getForms = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtForms.core.getForms(req));
};

formsController.createForm = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtForms.core.createForm(req));
};

formsController.updateForm = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtForms.core.updateForm(req));
};

formsController.submitResponse = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtForms.core.submitResponse(req));
};

formsController.getRecordedResponses = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtForms.core.getRecordedResponses(req));
};

formsController.getMySubmissions = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtForms.core.getMySubmissions(req));
};

formsController.linkResponseSheet = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtForms.core.authenticateSheetAndLink(req));
};

formsController.saveAndWriteRows = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtForms.core.writeRowHeadersToSheet(req));
};

formsController.sendResponse = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtForms.reports.sendResponse(req));
};

