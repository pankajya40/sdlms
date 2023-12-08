'use strict';

const router = require('express')
	.Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author Fardin
 * @description This file handles all the custom routes that are required for the rigor builder to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	const { typedFieldValidation } = middleware.typedValidation;

	setupApiRoute(router, 'post', '/submitReason', [...middlewares, middleware.authenticateOrGuest], controllers.write.rigorbuilder.submitReason);
	setupApiRoute(router, 'post', '/addReason', [...middlewares, middleware.authenticateOrGuest], controllers.write.rigorbuilder.addReason);
	setupApiRoute(router, 'get', '/reason/:pid', [...middlewares, middleware.authenticateOrGuest], controllers.write.rigorbuilder.getReason);
	setupApiRoute(router, 'get', '/allReasons', [...middlewares, middleware.authenticateOrGuest], controllers.write.rigorbuilder.getAllReasons);

	return router;
};



