"use strict";

const router = require("express").Router();
const middleware = require("../../middleware");
const controllers = require("../../controllers");
const routeHelpers = require("../helpers");

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author Abdiqafar Abukar
 * @description This file handles all the custom routes that are required for the workshop manager to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	const { typedFieldValidation } = middleware.typedValidation;

	//Create Workshop manager
	setupApiRoute(router, "get", "/all", [...middlewares, middleware.authenticateOrGuest], controllers.write.workshopmanager.getWorkshop);
	setupApiRoute(router, "get", "/publish", [...middlewares, middleware.authenticateOrGuest], controllers.write.workshopmanager.getPublishedWorkshop);

	setupApiRoute(router, "post", "/", [...middlewares, middleware.authenticateOrGuest], controllers.write.workshopmanager.createWorkshop);
	setupApiRoute(router, "put", "/", [...middlewares, middleware.authenticateOrGuest], controllers.write.workshopmanager.updateWorkshop);
	setupApiRoute(router, "delete", "/:pid", [...middlewares, middleware.authenticateOrGuest], controllers.write.workshopmanager.deleteWorkshop);
	setupApiRoute(router, "put", "/start", [...middlewares, middleware.authenticateOrGuest], controllers.write.workshopmanager.startWorkshop);
	setupApiRoute(router, "put", "/complete", [...middlewares, middleware.authenticateOrGuest], controllers.write.workshopmanager.completeWorkshop);
	setupApiRoute(router, "get", "/complete", [...middlewares, middleware.authenticateOrGuest], controllers.write.workshopmanager.getCompletedWorkshop);

	// User
	setupApiRoute(router, "post", "/user", [...middlewares, middleware.authenticateOrGuest], controllers.write.workshopmanager.registerWorkshop);
	setupApiRoute(router, "get", "/user", [...middlewares, middleware.authenticateOrGuest], controllers.write.workshopmanager.getAttendedWorkshop);

	return router;
};
