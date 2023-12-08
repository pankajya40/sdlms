'use strict';

const router = require('express')
	.Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author Fardin Kamal
 * @description This file handles all the custom routes that are required for the maturity builder to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	const { typedFieldValidation } = middleware.typedValidation;

	setupApiRoute(router, 'post', '/submitIncident', [...middlewares, middleware.authenticateOrGuest], controllers.write.maturitybuilder.submitIncident);
	setupApiRoute(router, 'get', '/allIncidents', [...middlewares, middleware.authenticateOrGuest], controllers.write.maturitybuilder.allIncidents);
	setupApiRoute(router, 'get', '/incident/:pid', [...middlewares, middleware.authenticateOrGuest], controllers.write.maturitybuilder.getIncident);
	setupApiRoute(router, 'post', '/addNudge', [...middlewares, middleware.authenticateOrGuest], controllers.write.maturitybuilder.addNudge);

    // Statistics
	setupApiRoute(router, 'get', '/stats', [...middlewares, middleware.authenticateOrGuest], controllers.write.maturitybuilder.getStats);

	return router;
};



