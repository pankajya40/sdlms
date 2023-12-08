'use strict';

const winston = require('winston');
const api = require('../../../../api');
const helpers = require('../../../helpers');

const trainingROI = module.exports;

trainingROI.createReport = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.roi.createReport(req));
};

trainingROI.getReport = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.PDGMS.roi.getReport(req));
};

trainingROI.updateReport = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.PDGMS.roi.updateReport(req));
};

trainingROI.deleteReport = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.PDGMS.roi.deleteReport(req));
};

trainingROI.createFeedback = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.PDGMS.roi.createFeedback(req));
};

trainingROI.getFeedback = async (req, res) =>  {
    helpers.formatApiResponse(200, res, await api.PDGMS.roi.getFeedback(req));
};

trainingROI.updateFeedback = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.PDGMS.roi.updateFeedback(req));
};

trainingROI.deleteFeedback = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.PDGMS.roi.deleteFeedback(req));
};

trainingROI.createReflection = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.PDGMS.roi.createReflection(req));
};

trainingROI.getReflection = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.PDGMS.roi.getReflection(req));
};

trainingROI.updateReflection = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.PDGMS.roi.updateReflection(req));
};

trainingROI.deleteReflection = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.PDGMS.roi.deleteReflection(req));
};


