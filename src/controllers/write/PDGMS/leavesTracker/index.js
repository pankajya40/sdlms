'use strict';

const winston = require('winston');
const api = require('../../../../api');
const helpers = require('../../../helpers');

const leavesTracker = module.exports;

leavesTracker.getLeaves = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.leaves.getLeaves(req));
};

leavesTracker.createLeave = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.leaves.createLeaveApplication(req));
};

leavesTracker.deleteLeave = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.leaves.deleteLeaveApplication(req));
};

leavesTracker.getHolidayList = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.leaves.getHolidayList(req));
};

leavesTracker.getLeaveRequestList = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.leaves.getLeaveRequestList(req));
};

leavesTracker.updateProfile = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.leaves.updateProfile(req));
}
leavesTracker.approveLeaves = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.leaves.approveLeaves(req));
};

leavesTracker.getPreviousApprovals = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.leaves.getPreviousApprovals(req));
};

leavesTracker.peopleOnLeave = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.leaves.peopleOnLeave(req));
};

leavesTracker.getOrganizationStatistics = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.leaves.getOrganizationStatistics(req));
};