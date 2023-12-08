"use strict";

const api = require("../../api");
const helpers = require("../helpers");

const workshopmanager = module.exports;

/**
 * @author Abdiqafar Abukar
 *  @description workshop manager operations (GET, CREATE, UPDATE, DELETE)
 *  * @key req, res
 */

workshopmanager.getWorkshop = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.workshopmanager.getWorkshop(req));

};
workshopmanager.getPublishedWorkshop = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.workshopmanager.getPublishedWorkshop(req));

};

workshopmanager.createWorkshop = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.workshopmanager.createWorkshop(req));

};

workshopmanager.updateWorkshop = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.workshopmanager.updateWorkshop(req));

};

workshopmanager.deleteWorkshop = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.workshopmanager.deleteWorkshop(req));

};


workshopmanager.startWorkshop = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.workshopmanager.startWorkshop(req));

};

workshopmanager.completeWorkshop = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.workshopmanager.completeWorkshop(req));

};

workshopmanager.getCompletedWorkshop = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.workshopmanager.getCompletedWorkshop(req));

};



workshopmanager.registerWorkshop = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.workshopmanager.registerWorkshop(req));

};

workshopmanager.getAttendedWorkshop = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.workshopmanager.getAttendedWorkshop(req));

};











