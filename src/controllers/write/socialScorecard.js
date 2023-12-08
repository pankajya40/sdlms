'use strict';

const api = require('../../api');
const categories = require('../../categories');
const helpers = require('../helpers');

const socialScorecard = module.exports;

/**
* @author 
* @description APIs for the social scorecard
* @key 
*/


socialScorecard.createScoreCard = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.createScoreCard(req));
}

socialScorecard.postEval = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.postEval(req));
}

socialScorecard.addScore = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.addScore(req));
}



//

socialScorecard.getAssignments = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.getAssignments(req));
}

socialScorecard.getScoreCard = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.getScoreCard(req));
}

socialScorecard.viewScore = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.viewScore(req));
}


socialScorecard.createRubric = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.createRubric(req));
}

socialScorecard.createAttribute = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.createAttribute(req));
}
socialScorecard.getCards = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.getCards(req));
}
socialScorecard.createTemplate = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.createTemplate(req));
}
socialScorecard.updateTemplate = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.updateTemplate(req));
}
socialScorecard.publishCard = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.publishCard(req));
}
socialScorecard.updateApplicants = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.updateApplicants(req));
}
socialScorecard.updateEvaluators = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.updateEvaluators(req));
}
socialScorecard.getPublishedScorecard = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.getPublishedScorecard(req));
}
socialScorecard.getDraftScorecard = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.getDraftScorecard(req));
}
socialScorecard.associateScorecard = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.socialScorecard.associateScorecard(req));
}
socialScorecard.updateAttribute = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.socialScorecard.updateAttribute(req));
}
socialScorecard.deleteAttribute = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.socialScorecard.deleteAttribute(req));
}

socialScorecard.addAttribute = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.socialScorecard.addAttribute(req));
}
socialScorecard.editTemplate = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.socialScorecard.editTemplate(req));
}
socialScorecard.editAttribute = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.socialScorecard.editAttribute(req));
}
socialScorecard.addSubattribute = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.socialScorecard.addSubattribute(req));
}
socialScorecard.editSubattribute = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.socialScorecard.editSubattribute(req));
}
socialScorecard.deleteSubattribute = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.socialScorecard.deleteSubattribute(req));
}
socialScorecard.getScorecardDetails = async (req, res) => {
    helpers.formatApiResponse(200, res, await api.socialScorecard.getScorecardDetails(req));
}

socialScorecard.deleteTemplate = async(req,res) => {
    helpers.formatApiResponse(200, res, await api.socialScorecard.deleteTemplate(req));
}
socialScorecard.changeState = async(req,res) => {
    helpers.formatApiResponse(200, res, await api.socialScorecard.changeState(req));
}