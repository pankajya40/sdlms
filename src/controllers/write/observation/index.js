"use strict";

const api = require("../../../api");
const helpers = require("../../helpers");

const observationController = module.exports;
observationController.videoRef = {}


observationController.startObservation = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.startObservation(req));
};

observationController.createReflection = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.createReflection(req));
};

observationController.deleteReflection = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.deleteReflection(req));
};

observationController.createObservation = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.createObservation(req));
};

observationController.deleteObservation = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.deleteObservation(req));
};

observationController.editObservation = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.editObservation(req));
};

observationController.getObservations = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.getObservations(req));
};

observationController.getPage = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.getPage(req));
};

observationController.createPage = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.createPage(req));
};

observationController.updatePage = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.updatePage(req));
};

observationController.submitReflectionResponse = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.submitReflectionResponse(req));
};

observationController.getLeaderboard = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.getLeaderboard(req));
};

// Video reflection panel

observationController.videoRef.createUserEntry = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.videoRef.createUserEntry(req));
};

observationController.videoRef.submitReflection = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.videoRef.submitReflection(req));
};

observationController.videoRef.submitAcknowledgement = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.videoRef.submitAcknowledgement(req));
};

observationController.videoRef.getSubmissions = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.videoRef.getSubmissions(req));
};

observationController.videoRef.getSubmissions = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.videoRef.getSubmissions(req));
};


observationController.completeObservation = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.completeObservation(req));
};

observationController.analytics = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.analytics(req));
};

observationController.createFaq = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.createFaq(req));
};

observationController.deleteFaq = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.observation.core.deleteFaq(req));
};