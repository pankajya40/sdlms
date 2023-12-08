"use strict";

const api = require("../../api");
const helpers = require("../helpers");

const masters = module.exports;

masters.getCollections = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.master.getCollections());
};

masters.getRecords = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.master.getRecords(req));
};

masters.createRecord = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.master.createRecord(req));
};