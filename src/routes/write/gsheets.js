'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan
 * @date 11-10-2022
 * @description This file handles all the routes that are required for the GSHEET APIs to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];

    setupApiRoute(router, 'post', '/wati/notifyuser/:templateName', [], controllers.write.gsheets.wati.notifyUser);
    setupApiRoute(router, 'post', '/email/notifyuser/:templateId?', [middleware.checkRequired.bind(null, ['recipient', 'token'])], controllers.write.gsheets.email.notifyUser);


    return router;
}