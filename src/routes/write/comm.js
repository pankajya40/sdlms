"use strict";

const router = require("express").Router();
const middleware = require("../../middleware");
const controllers = require("../../controllers");
const routeHelpers = require("../helpers");

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author Ryan Banis
 * @description This file handles all the custom routes that are required for the community builder to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	// const { typedFieldValidation } = middleware.typedValidation;

	setupApiRoute(router, 'post', '/', [...middlewares, middleware.authenticateOrGuest], controllers.write.communitybuilder.createQuestion)
	setupApiRoute(router, 'get', '/',[...middlewares, middleware.authenticateOrGuest], controllers.write.communitybuilder.getQuestion)
	setupApiRoute(router, 'post', '/ans',[...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.communitybuilder.createAnswer)
	// setupApiRoute(router, 'get', '/ans',[...middlewares, middleware.authenticateOrGuest], controllers.write.communitybuilder.getAnswer)
	

	return router;
};