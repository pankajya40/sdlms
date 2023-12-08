'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan <hello@imshawan.dev>
 * @date 28-02-2022
 * @description This file handles all the routes that are required for the Application Manager APIs to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];

    setupApiRoute(router, 'post', '/project', [middleware.checkRequired.bind(null, ["content", "name", "videoUrl", "personForm", "assignmentForm", "rubricId"])], controllers.write.applicationManager.createProject);
    setupApiRoute(router, 'get', '/project/:projectId?', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.applicationManager.getProjects);

    setupApiRoute(router, 'post', '/application', [middleware.checkRequired.bind(null, ['formUrl', 'name', 'appliedAt'])], controllers.write.applicationManager.createApplication);
    setupApiRoute(router, 'put', '/application/:applicationId', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['feedbackId'])], controllers.write.applicationManager.addFeedbackToApplication);
    
    setupApiRoute(router, 'post', '/rubrics', [middleware.checkRequired.bind(null, ['rubrics'])], controllers.write.applicationManager.createRubric);

    setupApiRoute(router, 'get', '/leaderboard/:projectId', [], controllers.write.applicationManager.getLeaderboard);


    return router;
}