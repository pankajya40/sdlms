'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan
 * @date 02-12-2022
 * @description This file handles all the routes that are required for the generator APIs to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
    
    setupApiRoute(router, 'get', '/joiningletter/templates', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.generators.joiningLetter.getTemplates);
    setupApiRoute(router, 'post', '/joiningletter/templates', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.generators.joiningLetter.createTemplate);
    setupApiRoute(router, 'put', '/joiningletter/templates/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.generators.joiningLetter.updateTemplate);
    setupApiRoute(router, 'delete', '/joiningletter/templates/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.generators.joiningLetter.deleteTemplate);
    

    setupApiRoute(router, 'get', '/joiningletter/letters', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.generators.joiningLetter.getGeneratedLetters);
    setupApiRoute(router, 'post', '/joiningletter/letters', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.generators.joiningLetter.generateLetters);

    return router;
}