'use strict'
const api = require('../../../api');
const helpers = require('../../helpers');

const insightSpotter = module.exports;

insightSpotter.createInsight = async (req, res) =>{
    helpers.formatApiResponse(200, res, await api.insightSpotter.core.createInsight(req));
}

insightSpotter.editInsight = async (req, res) =>{
    helpers.formatApiResponse(200, res, await api.insightSpotter.core.editInsight(req));
}

insightSpotter.deleteInsight = async (req, res) =>{
    helpers.formatApiResponse(200, res, await api.insightSpotter.core.deleteInsight(req));
}

insightSpotter.getInsights = async (req, res) =>{
    helpers.formatApiResponse(200, res, await api.insightSpotter.core.getInsights(req));
}

insightSpotter.getInsight = async (req, res) =>{
    helpers.formatApiResponse(200, res, await api.insightSpotter.core.getInsight(req));
}

insightSpotter.getJudgements = async (req, res) =>{
    helpers.formatApiResponse(200, res, await api.insightSpotter.core.judgement.get(req));
}

insightSpotter.createJudgement = async (req, res) =>{
    helpers.formatApiResponse(200, res, await api.insightSpotter.core.judgement.create(req));
}

insightSpotter.editJudgement = async (req, res) =>{
    helpers.formatApiResponse(200, res, await api.insightSpotter.core.judgement.edit(req));
}

insightSpotter.deleteJudgement = async (req, res) =>{
    helpers.formatApiResponse(200, res, await api.insightSpotter.core.judgement.delete(req));
}





