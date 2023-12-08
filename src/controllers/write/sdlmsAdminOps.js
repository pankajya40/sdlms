'use strict';

const api = require('../../api');
const categories = require('../../categories');
const helpers = require('../helpers');

const sdlmsAdmin = module.exports;

sdlmsAdmin.getOrganization = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.organization.get(req));
}

sdlmsAdmin.createOrganization = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.organization.create(req));
}

sdlmsAdmin.updateOrganization = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.organization.update(req));
}

sdlmsAdmin.manageMemberRoles = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.organization.manageMemberRoles(req));
}

sdlmsAdmin.deleteOrganization = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.organization.delete(req));
}

sdlmsAdmin.getOrganizationMembers = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.organization.getMembers(req));
}

/**
 * 
 * @description Department controllers 
 */
sdlmsAdmin.getDepartments = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.department.get(req));
}
sdlmsAdmin.createDepartment = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.department.create(req));
}
sdlmsAdmin.updateDepartment = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.department.update(req));
}
sdlmsAdmin.deleteDepartment = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.department.delete(req));
}

/**
 * 
 * @description Team controllers 
 */
 sdlmsAdmin.getTeams = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.team.get(req));
}
sdlmsAdmin.createTeam = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.team.create(req));
}
sdlmsAdmin.updateTeam = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.team.update(req));
}
sdlmsAdmin.deleteTeam = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.team.delete(req));
}

/**
 * 
 * @description Organization role controllers 
 */
 sdlmsAdmin.getRoles = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.role.get(req));
}
sdlmsAdmin.createRole = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.role.create(req));
}
sdlmsAdmin.updateRole = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.role.update(req));
}
sdlmsAdmin.deleteRole = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.sdlmsAdmin.role.delete(req));
}
