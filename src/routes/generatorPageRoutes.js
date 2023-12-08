'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/generators';
const routes = {
	JOINING_LETTER: ENDPOINT + '/joiningletter',
}

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
		`${routes.JOINING_LETTER}`,
		middleware,
		extendedMiddlewares,
		controllers.generators.joiningLetter.get
	);

	setupPageRoute(
		app,
		`${routes.JOINING_LETTER}/letters`,
		middleware,
		extendedMiddlewares,
		controllers.generators.joiningLetter.letters
	);

	setupPageRoute(
		app,
		`${routes.JOINING_LETTER}/letters/create`,
		middleware,
		extendedMiddlewares,
		controllers.generators.joiningLetter.create
	);

	setupPageRoute(
		app,
		`${routes.JOINING_LETTER}/letters/outputs/:id`,
		middleware,
		extendedMiddlewares,
		controllers.generators.joiningLetter.generatedLetters
	);

	setupPageRoute(
		app,
		`${routes.JOINING_LETTER}/templates`,
		middleware,
		extendedMiddlewares,
		controllers.generators.joiningLetter.templates
	);

	setupPageRoute(
		app,
		`${routes.JOINING_LETTER}/templates/create`,
		middleware,
		extendedMiddlewares,
		controllers.generators.joiningLetter.newTemplate
	);

	setupPageRoute(
		app,
		`${routes.JOINING_LETTER}/templates/edit/:id`,
		middleware,
		extendedMiddlewares,
		controllers.generators.joiningLetter.editTemplate
	);
}