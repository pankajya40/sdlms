'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author Naveen K R (menkr)
 * @date 03-03-2023
 * @description This is routes for data portal
 */

module.exports = function () {
	const middlewares = [middleware.authenticate, middleware.authenticateOrGuest, middleware.isLoggedin];

	setupApiRoute(router, 'get', '/datasets', [...middlewares], controllers.write.dataportal.getDatasets); // could be not used
	setupApiRoute(router, 'get', '/datasets/:datasetid', [...middlewares], controllers.write.dataportal.getDataset);
	setupApiRoute(router, 'post', '/data/', [...middlewares], controllers.write.dataportal.getData);
	setupApiRoute(router, 'post', '/data/csv', [...middlewares], controllers.write.dataportal.getCSVData);

	setupApiRoute(router, 'get', '/manage/datasets', [...middlewares], controllers.write.dataportal.getFullDatasetList); // could be not used
	setupApiRoute(router, 'get', '/manage/datasets/:datasetid', [...middlewares], controllers.write.dataportal.getFullDatasetDetails);
	setupApiRoute(router, 'post', '/manage/datasets', [...middlewares], controllers.write.dataportal.createDataset);
	setupApiRoute(router, 'put', '/manage/datasets/:datasetid', [...middlewares], controllers.write.dataportal.updateDataset);
	setupApiRoute(router, 'delete', '/manage/datasets/:datasetid', [...middlewares], controllers.write.dataportal.deleteDataset);

    return router;
}