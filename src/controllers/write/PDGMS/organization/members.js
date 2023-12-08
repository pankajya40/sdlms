'use strict';

const winston = require('winston');
const api = require('../../../../api');
const helpers = require('../../../helpers');

const membersController = module.exports;

membersController.getMembers = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.organization.members.get(req));
};

membersController.addOrRemoveMembers = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.organization.members.addOrRemoveMembers(req));
};