'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;

const ENDPOINT = '/mobile';
const routes = {
	ASSETS: ENDPOINT + '/assets',
	FEEDS: ENDPOINT + '/feeds',
	TODO : ENDPOINT + '/toc/todo',
	rigorMobile: ENDPOINT + '/rigormobile',
	CCCMS : ENDPOINT + '/cccms',
};

module.exports = function (app, middleware, controllers) {
	var middlewares = [middleware.exposeUid, middleware.canViewUsers];
	var accountMiddlewares = [
		middleware.exposeUid,
		middleware.canViewUsers,
		middleware.checkAccountPermissions,
	];
	var extendedMiddlewares = [...middlewares, middleware.requireLogin];

	// setupPageRoute(
	// 	app,
	// 	`${routes.ASSETS}/:type?/:id?`,
	// 	middleware,
	// 	extendedMiddlewares,
	// 	controllers.mobile.assetsExplore.get
	// );

	setupPageRoute(

		app,
		`${routes.ASSETS}`,
		middleware,
		extendedMiddlewares,
        controllers.mobile.assetsExplore.get	
	);

	setupPageRoute(
		app,
		`${routes.FEEDS}`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.insightfeeds.get
	);

	setupPageRoute(
		app,
		`${routes.TODO}`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.toc.todo
	);

	setupPageRoute(
		app,
		`${routes.ASSETS}/:type/:id?`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.assetsExplore.showassets
	);
	setupPageRoute(
		app,
		`${routes.rigorMobile}`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.rigorMobile.get
	);

	setupPageRoute(
		app,
		`${routes.FEEDS}`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.insightfeeds.get
	);

	setupPageRoute(
		app,
		`${routes.CCCMS}/explore/company`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.cccms.companyexplore
	);

	setupPageRoute(
		app,
		`${routes.CCCMS}/explore/student`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.cccms.studentexplore
	);

	setupPageRoute(
		app,
		`${routes.CCCMS}/explore/company`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.cccms.companyexplore
	);

	setupPageRoute(
		app,
		`${routes.CCCMS}/pitch/company/send`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.cccms.companypitchsend
	);

	setupPageRoute(
		app,
		`${routes.CCCMS}/pitch/company/view`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.cccms.companypitchview
	);

	setupPageRoute(
		app,
		`${routes.CCCMS}/pitch/student/send`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.cccms.studentpitchsend
	);

	setupPageRoute(
		app,
		`${routes.CCCMS}/pitch/student/view`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.cccms.studentpitchview
	);

	setupPageRoute(
		app,
		`${routes.CCCMS}/pitch/feed`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.cccms.pitchfeed
	);

	setupPageRoute(
		app,
		`${routes.CCCMS}/leaderboard`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.cccms.leaderboard
	);

	setupPageRoute(
		app,
		`${routes.CCCMS}/collaboration`,
		middleware,
		extendedMiddlewares,
		controllers.mobile.cccms.collaboration
	);

}