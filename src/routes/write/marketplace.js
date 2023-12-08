'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author Fardin Kamal
 * @description This file handles all the custom routes that are required for the marketplace
 */

module.exports = function () {
	const userAuth = [middleware.authenticate, middleware.authenticateOrGuest];

	setupApiRoute(router, 'get', '/:id?', [...userAuth], controllers.write.marketplace.listModules);
	setupApiRoute(router, 'post', '/', [...userAuth, middleware.checkRequired.bind(null, ['name', 'description', 'type', 'submarket', 'duration', 'cocreds', 'start_date', 'end_date'])], controllers.write.marketplace.createModule);
	setupApiRoute(router, 'put', '/', [...userAuth], controllers.write.marketplace.updateModule);
	setupApiRoute(router, 'delete', '/:id', [...userAuth], controllers.write.marketplace.deleteModule);

	setupApiRoute(router, 'get', '/submarket/', [...userAuth], controllers.write.marketplace.listSubMarkets);
	setupApiRoute(router, 'get', '/submarket/:name', [...userAuth], controllers.write.marketplace.getSubMarket);
	setupApiRoute(router, 'post', '/submarket/', [...userAuth], controllers.write.marketplace.createSubMarket);
	setupApiRoute(router, 'put', '/submarket/:name', [...userAuth], controllers.write.marketplace.updateSubMarket);
	setupApiRoute(router, 'delete', '/submarket/:name', [...userAuth], controllers.write.marketplace.deleteSubMarket);

	return router;
};
