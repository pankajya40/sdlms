'use strict';

const api = require("../../../api");
const helpers = require("../../helpers");

const postController = module.exports;

postController.createPost = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.mobile.posts.createPost(req));
};
