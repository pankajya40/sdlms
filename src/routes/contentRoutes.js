'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/content';
const routes = {
	POST: ENDPOINT + '/post',
	VIEW: ENDPOINT + '/view/:id?',
}

module.exports = function (app, middleware, controllers) {
	var extendedMiddlewares = [middleware.exposeUid, middleware.canViewUsers, middleware.requireLogin];

	setupPageRoute(
		app,
		`${routes.POST}`,
		middleware,
		extendedMiddlewares,
		controllers.contentManager.data.post
	);

    setupPageRoute(
		app,
		`${routes.VIEW}`,
		middleware,
		extendedMiddlewares,
		controllers.contentManager.data.view
	);

}