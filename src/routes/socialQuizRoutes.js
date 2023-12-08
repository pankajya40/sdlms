'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/quiz';
const MCQ_ENDPOINT =  '/mcq';

module.exports = function (app, middleware, controllers) {
    var middlewares = [middleware.exposeUid, middleware.canViewUsers];
    var extendedMiddlewares = [...middlewares, middleware.requireLogin];

    setupPageRoute(
        app,
        `${ENDPOINT}/dashboard`,
        middleware,
        extendedMiddlewares,
        controllers.socialquiz.dashboard
    );
    setupPageRoute(
        app,
        `${ENDPOINT}/create`,
        middleware,
        extendedMiddlewares,
        controllers.socialquiz.create
    );
    setupPageRoute(
        app,
        `${ENDPOINT}/:quizId`,
        middleware,
        extendedMiddlewares,
        controllers.socialquiz.single
    );

    setupPageRoute(
        app,
        `${MCQ_ENDPOINT}/dashboard`,
        middleware,
        extendedMiddlewares,
        controllers.socialquiz.mcq.dashboard
    );
    setupPageRoute(
        app,
        `${MCQ_ENDPOINT}/create`,
        middleware,
        extendedMiddlewares,
        controllers.socialquiz.mcq.create
    );
    setupPageRoute(
        app,
        `${MCQ_ENDPOINT}/:mcqId`,
        middleware,
        extendedMiddlewares,
        controllers.socialquiz.mcq.single
    );

    setupPageRoute(
        app,
        `${MCQ_ENDPOINT}/submit/:mcqId`,
        middleware,
        extendedMiddlewares,
        controllers.socialquiz.mcq.submit
    );

    
    setupPageRoute(
        app,
        `${MCQ_ENDPOINT}/responses/:mcqId`,
        middleware,
        extendedMiddlewares,
        controllers.socialquiz.mcq.responses
    );
  
}