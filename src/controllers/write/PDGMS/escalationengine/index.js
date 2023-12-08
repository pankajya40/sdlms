'use strict';

const winston = require('winston');
const api = require('../../../../api');
const helpers = require('../../../helpers');

const escalationEngine = module.exports;

escalationEngine.getJournals = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.escalationEngine.getJournals(req));
};

escalationEngine.writeJournal = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.escalationEngine.writeJournal(req));
};

escalationEngine.getFeedbacks = async (req, res) => {
	helpers.formatApiResponse(200,res,await api.PDGMS.escalationEngine.getFeedbacks(req));
}

escalationEngine.writeFeedbacks = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.escalationEngine.writeFeedback(req));
}

escalationEngine.addToLearningAgenda = async (req,res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.escalationEngine.addToLearningAgenda(req));
}

escalationEngine.getLearningAgenda = async (req,res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.escalationEngine.getLearningAgenda(req));
}

escalationEngine.editLearningAgenda = async (req,res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.escalationEngine.editLearningAgenda(req));
}

escalationEngine.deleteLearningAgenda = async (req,res) => {
	helpers.formatApiResponse(200, res, await api.PDGMS.escalationEngine.deleteLearningAgenda(req));
}