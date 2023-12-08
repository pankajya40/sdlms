'use strict';

const api = require('../../api');
const helpers = require('../helpers');

const maturitybuilder = module.exports;

/**
 * @author Fardin Kamal
 *  @description Maturity Builder operations (GET, CREATE, UPDATE, DELETE)
 *  * @key req, res
 */

maturitybuilder.submitIncident = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.maturitybuilder.submitIncident(req));

};

maturitybuilder.allIncidents = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.maturitybuilder.allIncidents(req));

};

maturitybuilder.getIncident = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.maturitybuilder.getIncident(req));
};

maturitybuilder.addNudge = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.maturitybuilder.addNudge(req));
};

maturitybuilder.getStats = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.maturitybuilder.getStats(req));
};
