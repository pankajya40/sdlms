'use strict';

const api = require("../../../api");
const helpers = require("../../helpers");

const insightFeedsController = module.exports;


insightFeedsController.getFeeds = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.mobile.insightFeeds.getFeeds(req));
};