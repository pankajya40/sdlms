'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;


/**
 * @author imshawan
 * @description Ganesha API begins here
 * This file deals with all the routes required for the ganesha API to work
 */

 module.exports = function () {
	const middlewares = [middleware.authenticate];

    setupApiRoute(router, 'get', '/collections', [...middlewares, middleware.authenticateOrGuest], controllers.write.master.getCollections);

    setupApiRoute(router, 'post', '/getdata', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['projectName'])], controllers.write.master.getRecords);
    setupApiRoute(router, 'post', '/create', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['projectName', 'payload'])], controllers.write.master.createRecord);


    return router;
}