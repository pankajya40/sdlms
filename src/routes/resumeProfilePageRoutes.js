'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/sdlms';
const routes = {
    PROFILE: ENDPOINT + '/profile',
}

module.exports = function (app, middleware, controllers) {
    var middlewares = [middleware.exposeUid, middleware.canViewUsers];
    var accountMiddlewares = [
        middleware.exposeUid,
        middleware.canViewUsers,
        middleware.checkAccountPermissions,
    ];
    var extendedMiddlewares = [...middlewares, middleware.requireLogin];

    setupPageRoute(
        app,
        `${routes.PROFILE}/:uid?`,
        middleware,
        middlewares,
        controllers.resumeProfile.get
    );
}