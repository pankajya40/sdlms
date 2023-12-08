"use strict";

const api = require("../../../api");
const helpers = require("../../helpers");

const cccmsController = module.exports;


cccmsController.getRequests = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.cccms.core.handleRequests(req));
};

cccmsController.createRequest = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.cccms.core.handleCreateRequest(req));
}

cccmsController.requestAction = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.cccms.core.handleRequestAction(req))
}

cccmsController.getTicketHistory = async (req, res) => {
	helpers.formatApiResponse(200, res, await (api.cccms.core.handleTicketHistory(req)))
}


cccmsController.getConsequences = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.cccms.core.handleReadConclusion(req))
}

cccmsController.addConsequence = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.cccms.core.handleCreateConclusion(req))
}

cccmsController.updateConsequce = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.cccms.core.handleUpdateConsequence(req))
}

cccmsController.explore = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.cccms.core.explore(req))
}

cccmsController.connect = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.cccms.core.connect(req))
}
