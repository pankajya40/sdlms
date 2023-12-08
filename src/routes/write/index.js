'use strict';

const winston = require('winston');
const meta = require('../../meta');
const plugins = require('../../plugins');
const middleware = require('../../middleware');
const writeControllers = require('../../controllers/write');
const helpers = require('../../controllers/helpers');

const Write = module.exports;

Write.reload = async (params) => {
	const router = params.router;
	let apiSettings = await meta.settings.get('core.api');
	plugins.registerHook('core', {
		hook: 'action:settings.set',
		method: async (data) => {
			if (data.plugin === 'core.api') {
				apiSettings = await meta.settings.get('core.api');
			}
		},
	});

	router.use('/api/v3', function (req, res, next) {
		// Require https if configured so
		if (apiSettings.requireHttps === 'on') {
			res.set('Upgrade', 'TLS/1.0, HTTP/1.1');
			return helpers.formatApiResponse(426, res);
		}

		res.locals.isAPI = true;
		next();
	});

	router.use('/api/v3/users', require('./users')());
	router.use('/api/v3/groups', require('./groups')());
	router.use('/api/v3/categories', require('./categories')());
	router.use('/api/v3/topics', require('./topics')());
	router.use('/api/v3/posts', require('./posts')());
	router.use('/api/v3/admin', require('./admin')());
	router.use('/api/v3/files', require('./files')());
	router.use('/api/v3/utilities', require('./utilities')());
	router.use('/api/v3/sdlms', middleware.logRequest.bind(null, 'SDLMS'), require('./sdlms')());
	router.use('/api/v3/app', middleware.logRequest.bind(null, 'MOBILE_APP'), require('./app')());
	router.use('/api/v3/apps', middleware.logRequest.bind(null, 'DT_THON'), require('./dt_thon')());
	router.use('/api/v3/payments', require('./payments')());
	router.use('/api/v3/profile', require('./profile')());
	router.use('/api/v3/articles', require('./articles_home')());
	router.use('/api/v3/thought_proccess', require("./thought_proccess")())
	router.use('/api/v3/communication', require('./communication')());
	router.use('/api/v3/marketplace', require('./marketplace')());
	router.use('/api/v3/push_notification', require('./pushNotification')())
	router.use('/api/v3/social_scorecard', require('./social_scorecard')());
	router.use('/api/v3/poster', require('./poster_generator')());
	router.use('/api/v3/toc', require('./toc')());
	// router.use('/api/v3/socialquiz', require('./socialQuiz')()); Unmounting the old APIs for social quiz
	router.use('/api/v3/socialquiz', require('./socialQuiz.v2')());
	router.use('/api/v3/sdlms/admin', middleware.logRequest.bind(null, 'SDLMS'), require('./sdlmsAdmin')());
	router.use('/api/v3/pdgms', middleware.logRequest.bind(null, 'PDGMS'), require('./pdgms')());
	router.use('/api/v3/help', require('./faq')())
	router.use('/api/v3/pdgms/organization', middleware.logRequest.bind(null, 'PDGMS'), require('./organization')());
	router.use('/api/v3/gsheets', require('./gsheets')());
	router.use('/api/v3/master', require('./masters')());
	router.use('/api/v3/forms', require('./dtForms')());
	router.use('/api/v3/content', require('./contentManager')());
	router.use('/api/v3/observation', require('./observation')());
	router.use('/api/v3/dataportal', require('./dataportal')());
	router.use('/api/v3/generators', require('./generators')());
	router.use('/api/v3/cccms', require('./cccms')());
	router.use('/api/v3/globals', require('./globals')());
    router.use('/api/v3/insightspotter', require('./insightSpotter')());
	router.use('/api/v3/application_manager', require('./applicationManager')());

	router.get('/api/v3/ping', writeControllers.utilities.ping.get);
	router.post('/api/v3/ping', middleware.authenticate, writeControllers.utilities.ping.post);

	router.get("/api/v3/ping", writeControllers.utilities.ping.get);
	router.post(
		"/api/v3/ping",
		middleware.authenticate,
		writeControllers.utilities.ping.post
	);
	router.use('/api/v3/workshop', require('./workshop_manager')());
	router.use('/api/v3/rigor', require('./rigorbuilder')());
	router.use('/api/v3/community', require('./comm')());
	router.use('/api/v3/maturity', require('./maturitybuilder')());

	// -----added
	// router.use('/api/v3/communication', require('./expressdata')());


	/**
	 * Plugins can add routes to the Write API by attaching a listener to the
	 * below hook. The hooks added to the passed-in router will be mounted to
	 * `/api/v3/plugins`.
	 */
	const pluginRouter = require('express').Router();
	await plugins.hooks.fire('static:api.routes', {
		router: pluginRouter,
		middleware,
		helpers,
	});
	winston.info(`[api] Adding ${pluginRouter.stack.length} route(s) to \`api/v3/plugins\``);
	router.use('/api/v3/plugins', pluginRouter);

	// 404 handling
	router.use('/api/v3', (req, res) => {
		helpers.formatApiResponse(404, res);
	});
};
