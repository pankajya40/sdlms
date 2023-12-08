'use strict';

const api = require('../../api');
const helpers = require('../helpers');

const rigorbuilder = module.exports;

/**
 * @author Fardin
 *  @description Rigor Builder operations (GET, CREATE, UPDATE, DELETE)
 *  * @key req, res
 */

rigorbuilder.submitReason = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.rigorbuilder.submitReason(req));

};

rigorbuilder.addReason = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.rigorbuilder.addReason(req));
};

rigorbuilder.getReason = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.rigorbuilder.getReason(req));

};

rigorbuilder.getAllReasons = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.rigorbuilder.getAllReasons(req));

};
