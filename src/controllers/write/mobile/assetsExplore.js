'use strict';

const api = require("../../../api");
const helpers = require("../../helpers");

const assetsExplore = module.exports;


assetsExplore.getAssets = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.mobile.assetsExplore.getAssets(req));
};