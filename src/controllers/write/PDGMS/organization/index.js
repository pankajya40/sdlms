'use strict';

const winston = require('winston');
const api = require('../../../../api');
const helpers = require('../../../helpers');

const organizationController = module.exports;

organizationController.departments = require('./departments');
organizationController.members = require('./members');


organizationController.getOrganization = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.organization.get(req));
};

organizationController.createOrganization = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.organization.create(req));
};

organizationController.updateOrganization = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.organization.update(req));
};

organizationController.deleteOrganization = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.organization.delete(req));
};