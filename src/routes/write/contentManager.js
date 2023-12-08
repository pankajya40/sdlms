'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

module.exports = function () {

    const middlewares = [middleware.authenticate];

    setupApiRoute(router, 'get', '/', [], controllers.write.content.getContent);
    setupApiRoute(router, 'post', '/', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.content.postContent);

    // feedback routes for content
    setupApiRoute(router, 'get', '/feedback/:contentId?', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.content.getFeedback);
    setupApiRoute(router, 'post', '/feedback', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.content.postFeedback);

    // feedback check routes
    setupApiRoute(router, 'get', '/isFeedbackExist/:contentId?', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.content.isFeedbackExist);
    return router;
};