'use strict';

const api = require('../../api');
const helpers = require('../helpers');

const socialScoresheet = module.exports;

/**
* @description socialScoresheet (GET, CREATE, UPDATE)
* @key req, res
*/

socialScoresheet.createScoresheet = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScoresheet.createScoresheet(req));
}
socialScoresheet.editScoresheet = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScoresheet.editScoresheet(req));
}
socialScoresheet.getScoresheet = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.socialScoresheet.getScoresheet(req));
}



socialScoresheet.copyScoresheet = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScoresheet.copyScoresheet(req));
}
socialScoresheet.editScoresheetcopy = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScoresheet.editScoresheetcopy(req));
}
socialScoresheet.getScoresheetcopy = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.socialScoresheet.getScoresheetcopy(req));
}
