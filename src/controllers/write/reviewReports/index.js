"use strict";

const api = require("../../../api");
const helpers = require("../../helpers");

const reportsController = module.exports;


reportsController.getReports = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtForms.reports(req));
};



