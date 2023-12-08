'use strict';

const winston = require('winston');
const api = require('../../../../api');
const helpers = require('../../../helpers');

const departmentController = module.exports;

departmentController.getDepartments = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.organization.departments.get(req));
};

departmentController.createDepartments = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.organization.departments.create(req));
};

departmentController.updateDepartments = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.organization.departments.update(req));
};

departmentController.deleteDepartments = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.organization.departments.delete(req));
};