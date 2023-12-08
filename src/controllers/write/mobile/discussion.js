'use strict';

const api = require("../../../api");
const helpers = require("../../helpers");

const discussionRoom = module.exports;

discussionRoom.getReactions = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.mobile.discussionRooms.getReactions(req));
};

discussionRoom.reactAndReflect = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.mobile.discussionRooms.reactAndReflect(req));
};

discussionRoom.removeReaction = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.mobile.discussionRooms.removeReaction(req));
};