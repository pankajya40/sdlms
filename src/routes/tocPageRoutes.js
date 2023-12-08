'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/toc';
const routes = {
	TODO: ENDPOINT + '/todo',
	GARUDA: ENDPOINT + '/garuda/:week/:uid?',
	SARPA: ENDPOINT + '/sarpa',
	GROW: ENDPOINT + '/grow/:week',
	ANALYSIS: ENDPOINT + '/analysis'
}

module.exports = function (app, middleware, controllers) {
	var middlewares = [middleware.exposeUid, middleware.canViewUsers];
	var extendedMiddlewares = [...middlewares, middleware.requireLogin];

	setupPageRoute(
		app,
		`${routes.TODO}`,
		middleware,
		extendedMiddlewares,
		controllers.toc.home.todo
	);
	setupPageRoute(
		app,
		`${routes.GARUDA}`,
		middleware,
		extendedMiddlewares,
		controllers.toc.home.garuda
	);
	setupPageRoute(
		app,
		`${routes.SARPA}`,
		middleware,
		extendedMiddlewares,
		controllers.toc.home.sarpa
	);
	setupPageRoute(
		app,
		`${routes.GROW}`,
		middleware,
		extendedMiddlewares,
		controllers.toc.home.grow
	);

	setupPageRoute(
		app,
		`${routes.ANALYSIS}`,
		middleware,
		extendedMiddlewares,
		controllers.toc.home.analysis
	);

}