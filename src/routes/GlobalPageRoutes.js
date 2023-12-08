'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;

module.exports = function (app, middleware, controllers) {
	var middlewares = [middleware.exposeUid, middleware.canViewUsers];
	var accountMiddlewares = [
		middleware.exposeUid,
		middleware.canViewUsers,
		middleware.checkAccountPermissions,
	];
	var extendedMiddlewares = [...middlewares, middleware.requireLogin];

	setupPageRoute(
		app,
		`/scorecard/happiness`,
		middleware,
		extendedMiddlewares,
		controllers.scorecard.happiness.get
	);

	setupPageRoute(
		app,
		`/scorecard/happiness/submissions/organization/:name?`,
		middleware,
		middlewares,
		controllers.scorecard.happiness.getSubmissionsByOrg
	);

	setupPageRoute(
		app,
		`/scorecard/happiness/submissions/:id?`,
		middleware,
		extendedMiddlewares,
		controllers.scorecard.happiness.getSubmissions
	);
}