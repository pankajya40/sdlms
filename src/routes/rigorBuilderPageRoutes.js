'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/rigor';
const routes = {
    USER: ENDPOINT + '/user',
    CREATOR: ENDPOINT + '/creator',

}

module.exports = function (app, middleware, controllers) {
    var middlewares = [middleware.exposeUid, middleware.canViewUsers];
    var extendedMiddlewares = [...middlewares, middleware.requireLogin];

    setupPageRoute(
        app,
        `${ENDPOINT}/dashboard`,
        middleware,
        extendedMiddlewares,
        controllers.rigorBuilder.dashboard.get
    );


    setupPageRoute(
        app,
        `${routes.CREATOR}/create`,
        middleware,
        extendedMiddlewares,
        controllers.rigorBuilder.create.get
    );

    setupPageRoute(
        app,
        `${routes.CREATOR}/view/:pid`,
        middleware,
        extendedMiddlewares,
        controllers.rigorBuilder.view.get
    );

    setupPageRoute(
        app,
        `${routes.CREATOR}/quiz/:pid`,
        middleware,
        extendedMiddlewares,
        controllers.rigorBuilder.quiz.get
    );

    setupPageRoute(
        app,
        `${ENDPOINT}/home`,
        middleware,
        extendedMiddlewares,
        controllers.rigorBuilder.home.get
    );

    setupPageRoute(
        app,
        `${routes.USER}/reflection/:pid`,
        middleware,
        extendedMiddlewares,
        controllers.rigorBuilder.reflection.get
    );

    setupPageRoute(
        app,
        `${routes.USER}/solution/:pid`,
        middleware,
        extendedMiddlewares,
        controllers.rigorBuilder.solution.get
    );

    setupPageRoute(
        app,
        `${routes.USER}/answer/:pid`,
        middleware,
        extendedMiddlewares,
        controllers.rigorBuilder.answer.get
    );

    setupPageRoute(
        app,
        `${routes.USER}/reason/`,
        middleware,
        extendedMiddlewares,
        controllers.rigorBuilder.reason.get
    );
}