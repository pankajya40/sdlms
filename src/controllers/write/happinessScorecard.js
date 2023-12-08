'use strict';

const api = require('../../api');
const helpers = require('../helpers');

const happinessScorecard = module.exports;

happinessScorecard.createScoreCard = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.happinessScorecard.create(req));
}

happinessScorecard.compileAndSendEmail = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.happinessScorecard.compileAndSendEmail(req));
}