'use strict';

const api = require("../../../api");
const helpers = require("../../helpers");

const mobile = module.exports;

mobile.discussionRooms = require('./discussion');
mobile.assetsExplore = require('./assetsExplore');
mobile.insightfeed = require('./insightfeed');
mobile.posts = require('./posts');


mobile.getSessionByUUID = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.mobile.getSessionByUUID(req));
};
