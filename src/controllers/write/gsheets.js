"use strict";

const api = require("../../api");
const helpers = require("../helpers");

const gSheets = module.exports;
gSheets.wati = {};
gSheets.email = {};

gSheets.wati.notifyUser = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.gsheets.wati.notifyUser(req));
};

gSheets.email.notifyUser = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.gsheets.email.notifyUser(req));
};