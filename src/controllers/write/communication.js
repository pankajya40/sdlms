const helpers = require('../helpers');
const api = require('../../api');

const communication = module.exports;

/**
 * @date 05-07-2022
 * @author Fardin Kamal
 * @description This file handles all the custom routes that are required for the appreciation feed to work
 */


/**
 * @date 03-09-2022
 * @description controller for template CRUD operations
 */

communication.createTemplate = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.createTemplate(req));
};

communication.updateTemplate = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.updateTemplate(req));
};

communication.getTemplate = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.getTemplate(req));
};

communication.deleteTemplate = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.deleteTemplate(req));
}

communication.createRequest = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.createRequest(req));
}

communication.updateRequest = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.updateRequest(req));
}

communication.getRequest = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.getRequest(req));
}

communication.deleteRequest = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.deleteRequest(req));
}

communication.getChannels = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.getChannels(req));
}

communication.getProviders = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.getProviders(req));
}

communication.getAccounts = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.getAccounts(req));
}

communication.createChannel = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.createChannel(req));
}

communication.createProvider = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.createProvider(req));
}

communication.createAccount = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.createAccount(req));
}

communication.updateAccount = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.updateAccount(req));
}

communication.getTemplateByUid = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.getTemplateByUid(req));
}

communication.createReport = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.createReport(req));
}

communication.getReport = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.getReports(req));
}

communication.sendMessage = async (req, res) => {
	if (req.files) {
		helpers.formatApiResponse(200, res, await api.communication.sendMessagesCSV(req))
	} else {
		helpers.formatApiResponse(200, res, await api.communication.sendMessage(req));
	}
}

communication.listCohort = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.listCohort(req));
}

communication.listSession = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.listSession(req));
}

communication.getUidByCohort = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.getUidByCohort(req));
}

communication.search = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.communication.search(req));
}

// communication.getErrors = async (req, res) => {
// 	helpers.formatApiResponse(200, res, await api.communication.getErrors(req));
// }
