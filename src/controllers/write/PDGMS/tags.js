'use strict';

const winston = require('winston');
const api = require('../../../api');
const helpers = require('../../helpers');

const tagsController = module.exports;

tagsController.get = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.tags.get(req));
};

tagsController.create = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.tags.create(req));
};
