'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @date 05-07-2022
 * @author Fardin Kamal
 * @description This file handles all the custom routes that are required for the appreciation feed
 */

module.exports = () => {
	const middlewares = [middleware.authenticate];
	const multipart = require('connect-multiparty');
	const multipartMiddleware = multipart({ uploadDir: './psudocode' });

	// // ---added
	// setupApiRoute(router, 'get', '/report', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.getReports)

	setupApiRoute(router, 'get', '/template', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.getTemplate);
	setupApiRoute(router, 'post', '/template', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['context', 'status', 'content', 'templateName', 'compatibleChannel', 'entities'])], controllers.write.communication.createTemplate);
	setupApiRoute(router, 'put', '/template/:templateId', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.updateTemplate);
	setupApiRoute(router, 'delete', '/template/:templateId', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.deleteTemplate);

	setupApiRoute(router, 'get', '/request', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.getRequest);
	// setupApiRoute(router, 'post', '/request', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['status', 'templateId', 'accountId'])], controllers.write.communication.createRequest);
	// setupApiRoute(router, 'put', '/request/:requestId', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.updateRequest);
	// setupApiRoute(router, 'delete', '/request/:requestId', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.deleteRequest);

	// setupApiRoute(router, 'get', '/channels', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.getChannels);
	// setupApiRoute(router, 'get', '/providers/', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.getProviders);
	// setupApiRoute(router, 'get', '/accounts', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.getAccounts);

	// setupApiRoute(router, 'post', '/createChannel', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['channelName'])], controllers.write.communication.createChannel);
	// setupApiRoute(router, 'post', '/createProvider', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['providerName', 'channelId'])], controllers.write.communication.createProvider);
	// setupApiRoute(router, 'post', '/createAccount', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['providerId', 'channelId', 'providerDetails', 'accountName'])], controllers.write.communication.createAccount);

	// setupApiRoute(router, 'put', '/updateAccount', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.updateAccount);

	setupApiRoute(router, 'get', '/report', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.getReport);
	// setupApiRoute(router, 'post', '/report', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, [''])], controllers.write.communication.createReport);

	setupApiRoute(router, 'put', '/updateAccount', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.updateAccount);

	setupApiRoute(router, 'post', '/createReport', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, [''])], controllers.write.communication.createReport);
	setupApiRoute(router, 'get', '/reports', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.getReport);

	setupApiRoute(router, 'post', '/send', [...middlewares, middleware.authenticateOrGuest, multipartMiddleware], controllers.write.communication.sendMessage);

	setupApiRoute(router, 'get', '/listCohort', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.listCohort);
	setupApiRoute(router, 'get', '/listSession', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.listSession);
	setupApiRoute(router, 'get', '/getUidByCohort', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.getUidByCohort);

	setupApiRoute(router, 'get', '/search', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.search);

	// setupApiRoute(router, 'get', '/getErrors', [...middlewares, middleware.authenticateOrGuest], controllers.write.communication.getErrors);

	return router;
};
