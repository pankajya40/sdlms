'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan
 * @date 11-10-2022
 * @description This file handles all the routes that are required for the DTForms APIs to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];

    setupApiRoute(router, 'get', '/', [], controllers.write.dtForms.getForms);
    setupApiRoute(router, 'post', '/', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['blocks', 'title'])], controllers.write.dtForms.createForm);
    setupApiRoute(router, 'put', '/:id', [], controllers.write.dtForms.updateForm);
    // setupApiRoute(router, 'delete', '/:id', [], controllers.write.gsheets.wati.notifyUser);

    setupApiRoute(router, 'post', '/response', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['blocks', 'title', 'formId'])], controllers.write.dtForms.submitResponse);

    setupApiRoute(router, 'get', '/responses/:formId', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.dtForms.getRecordedResponses);

    setupApiRoute(router, 'get', '/submissions', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.dtForms.getMySubmissions);

    setupApiRoute(router, 'post', '/linksheet', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['sheetId', 'formId'])], controllers.write.dtForms.linkResponseSheet);
    
    setupApiRoute(router, 'post', '/savesheet', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['sheetId', 'formId', ])], controllers.write.dtForms.saveAndWriteRows);

   
    setupApiRoute(router, 'get', '/reviewreports', [...middlewares, middleware.authenticateOrGuest], controllers.write.dtForms.sendResponse);


    return router;
}