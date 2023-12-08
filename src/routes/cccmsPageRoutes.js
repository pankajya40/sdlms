'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/cccms';
const routes = {
	HOME: ENDPOINT + '/',
	INCOMINGREQUESTS: ENDPOINT + '/incomingrequests',
	OUTGOINGREQUESTS: ENDPOINT + '/outgoingrequests',
	WRITE: ENDPOINT + '/write',
	CONNECT: ENDPOINT + '/connect'
}

module.exports = function (app, middleware, controllers) {
	var middlewares = [middleware.exposeUid, middleware.canViewUsers];
	var extendedMiddlewares = [...middlewares, middleware.requireLogin];

	setupPageRoute(
		app,
		`${routes.HOME}`,
		middleware,
		extendedMiddlewares,
		controllers.cccms.data.get
	);
	setupPageRoute(
		app,
		`${routes.INCOMINGREQUESTS}`,
		middleware,
		extendedMiddlewares,
		controllers.cccms.data.incomingrequests
	);
	setupPageRoute(
		app,
		`${routes.OUTGOINGREQUESTS}`,
		middleware,
		extendedMiddlewares,
		controllers.cccms.data.outgoingrequests
	);
	setupPageRoute(
		app,
		`${routes.WRITE}`,
		middleware,
		extendedMiddlewares,
		controllers.cccms.data.write
	);

	setupPageRoute(
		app,
		`${routes.CONNECT}`,
		middleware,
		extendedMiddlewares,
		controllers.cccms.data.connect
	);

}