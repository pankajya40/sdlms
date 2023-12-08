'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/application';
const routes = {
	PERSONA: ENDPOINT + '/persona',
	ASSIGNMENT: ENDPOINT + '/assignment',
	LEADERBOARD: ENDPOINT + '/leaderboard',
	PROJECT: ENDPOINT + '/project',
	APPLICATION: ENDPOINT
}

module.exports = function (app, middleware, controllers) {
	var extendedMiddlewares = [middleware.exposeUid, middleware.canViewUsers, middleware.requireLogin];

	setupPageRoute(
		app,
		`${routes.PERSONA}/:id`,
		middleware,
		extendedMiddlewares,
		controllers.applicationManager.core.persona
	);

	setupPageRoute(
		app,
		`${routes.ASSIGNMENT}/:id`,
		middleware,
		extendedMiddlewares,
		controllers.applicationManager.core.assignment
	);

	setupPageRoute(
		app,
		`${routes.LEADERBOARD}/:id`,
		middleware,
		extendedMiddlewares,
		controllers.applicationManager.core.leaderboard
	);

	setupPageRoute(
		app,
		`${routes.PROJECT}`,
		middleware,
		extendedMiddlewares,
		controllers.applicationManager.admin.project
	);

	setupPageRoute(
		app,
		`${routes.APPLICATION}/:id`,
		middleware,
		extendedMiddlewares,
		controllers.applicationManager.admin.application
	);

}