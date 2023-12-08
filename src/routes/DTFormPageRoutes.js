'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/forms';
const routes = {
	APPLICANT: ENDPOINT + '/applicant',
	CREATOR: ENDPOINT + '/creator',
	REPORT: ENDPOINT+'/reports',
}

module.exports = function (app, middleware, controllers) {
	var middlewares = [middleware.exposeUid, middleware.canViewUsers];
	var extendedMiddlewares = [...middlewares, middleware.requireLogin];

	setupPageRoute(
		app,
		`${routes.APPLICANT}/response/:id`,
		middleware,
		extendedMiddlewares,
		controllers.DTForms.data.getResponseForm
	);

	setupPageRoute(
		app,
		`${routes.CREATOR}/create`,
		middleware,
		extendedMiddlewares,
		controllers.DTForms.data.createForm
	);

	setupPageRoute(
		app,
		`${ENDPOINT}`,
		middleware,
		extendedMiddlewares,
		controllers.DTForms.data.home
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/edit/:id`,
		middleware,
		extendedMiddlewares,
		controllers.DTForms.data.editForm
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/responses/:id`,
		middleware,
		extendedMiddlewares,
		controllers.DTForms.data.viewResponses
	);

	setupPageRoute(
		app,
		`${routes.APPLICANT}/submissions/:id?`,
		middleware,
		extendedMiddlewares,
		controllers.DTForms.data.viewMySubmissions
	);
	setupPageRoute(
		app,
		`${routes.REPORT}`,
		middleware,
		extendedMiddlewares,
		controllers.DTForms.reportsReview.get
	);
}