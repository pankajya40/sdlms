'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;

const ENDPOINT = '/observation';
const routes = {
	EXPLORE: ENDPOINT + '/explore',
	REFLECTIONS: ENDPOINT + '/reflections',
	VIDEO_REF: ENDPOINT + '/videoref',
}

module.exports = function (app, middleware, controllers) {
	var extendedMiddlewares = [middleware.exposeUid, middleware.canViewUsers, middleware.requireRegister];
	var middlewares = [middleware.exposeUid, middleware.canViewUsers];

	setupPageRoute(
		app,
		`${ENDPOINT}/page/:pageSlug`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.viewStaticPage
	);
	
	setupPageRoute(
		app,
		`${ENDPOINT}/admin/pages`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.pages
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/admin/statuses`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.statuses
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/admin/statuses/:uid`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.getIndividualAnalytics
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/admin`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.projects
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/events/:id?`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.events
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/leaderboard`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.leaderboard
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/sign-off`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.signOff
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/report`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.reports
	);

	setupPageRoute(
		app,
		`${routes.REFLECTIONS}/create`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.create
	);

	setupPageRoute(
		app,
		`${routes.REFLECTIONS}/view/:id`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.viewMyReflection
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/report/analytics`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.analytics
	);

	setupPageRoute(
		app,
		`${routes.VIDEO_REF}`,
		middleware,
		extendedMiddlewares,
		controllers.observation.videoRef.get
	);

	setupPageRoute(
		app,
		`${routes.VIDEO_REF}/introduction`,
		middleware,
		extendedMiddlewares,
		controllers.observation.videoRef.introduction
	);

	setupPageRoute(
		app,
		`${routes.VIDEO_REF}/reflections`,
		middleware,
		extendedMiddlewares,
		controllers.observation.videoRef.sampleReflections
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/introduction`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.introduction
	);

	setupPageRoute(
		app,
		`${routes.EXPLORE}/:page?`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.explore
	);

	setupPageRoute(
		app,
		`${routes.REFLECTIONS}/:id?`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.reflections
	);

	setupPageRoute(
		app,
		`${ENDPOINT}`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.home
	);

	setupPageRoute(
		app,
		`${routes.VIDEO_REF}/reflect`,
		middleware,
		extendedMiddlewares,
		controllers.observation.videoRef.reflect
	);

	setupPageRoute(
		app,
		`${routes.VIDEO_REF}/complete/:id?`,
		middleware,
		extendedMiddlewares,
		controllers.observation.videoRef.complete
	);

	setupPageRoute(
		app,
		`${routes.VIDEO_REF}/submissions/:id?`,
		middleware,
		extendedMiddlewares,
		controllers.observation.videoRef.submissions
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/admin/faq`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.faq
	);

	setupPageRoute(
		app,
		`${ENDPOINT}/public/faqs`,
		middleware,
		extendedMiddlewares,
		controllers.observation.data.faqs
	);

	setupPageRoute(
		app,
		`${routes.VIDEO_REF}/faqs`,
		middleware,
		extendedMiddlewares,
		controllers.observation.videoRef.faqs
	);
}