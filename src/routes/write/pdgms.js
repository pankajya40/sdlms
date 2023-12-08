'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan
 * @date 07-09-2022
 * @description This file handles all the routes that are required for the PDGMS to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();
	const fileUploadMiddleware = [middleware.maintenanceMode, multipartMiddleware];

    setupApiRoute(router, 'get', '/leaves/statistics', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.leavesTracker.getOrganizationStatistics);

    setupApiRoute(router, 'get', '/leaves', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.leavesTracker.getLeaves);
    setupApiRoute(router, 'get', '/leaves/current', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.leavesTracker.peopleOnLeave);
    setupApiRoute(router, 'post', '/leaves', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['from', 'to', 'reason', 'teamName', 'requestedTo', 'totalLeaveHours'])], controllers.write.PDGMS.leavesTracker.createLeave);
    setupApiRoute(router, 'delete', '/leaves/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.leavesTracker.deleteLeave);
    
    setupApiRoute(router, 'get', '/holidaylist', [middleware.authenticateOrGuest], controllers.write.PDGMS.leavesTracker.getHolidayList);
	
    setupApiRoute(router, 'get', '/approvals', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.leavesTracker.getLeaveRequestList);

    setupApiRoute(router, 'put', '/profile', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.leavesTracker.updateProfile);

    setupApiRoute(router, 'post', '/approve/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['status'])], controllers.write.PDGMS.leavesTracker.approveLeaves);

    setupApiRoute(router, 'get', '/approved', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.leavesTracker.getPreviousApprovals);
	// escalation engine

	setupApiRoute(router,'get', '/journals', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.escalationEngine.getJournals);
	setupApiRoute(router,'post', '/journal', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['title', 'content', 'stimulus', 'rating']), middleware.isLoggedin], controllers.write.PDGMS.escalationEngine.writeJournal);

	setupApiRoute(router, 'post', '/learningagenda', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['title', 'description', 'taggedProject']), middleware.isLoggedin], controllers.write.PDGMS.escalationEngine.addToLearningAgenda);
	setupApiRoute(router, 'get', '/learningagenda', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.escalationEngine.getLearningAgenda);
	setupApiRoute(router, 'put', '/learningagenda' , [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.escalationEngine.editLearningAgenda);
	setupApiRoute(router, 'delete', '/learningagenda', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.escalationEngine.deleteLearningAgenda);

	setupApiRoute(router,'get', '/feedback', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.escalationEngine.getFeedbacks);
	setupApiRoute(router,'post', '/feedback', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.escalationEngine.writeFeedbacks);

	// Hashtags for PDGMS (Global entity)
	setupApiRoute(router, 'get', '/tag', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.tags.get);
	setupApiRoute(router, 'post', '/tag', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['name', 'context'])], controllers.write.PDGMS.tags.create);

	// Router for the tasks
	setupApiRoute(router, "get", "/task", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.tasks.getTask);
	setupApiRoute(router, "post", "/task", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.tasks.createTask);
	setupApiRoute(router, "put", "/task", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.tasks.updateTask);
	setupApiRoute(router, "delete", "/task", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.tasks.deleteTask);
	
	// Router for the projects can be written below
	setupApiRoute(router, "get", "/project", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.projects.getProject);
	setupApiRoute(router, "post", "/project", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.projects.createProject);
	setupApiRoute(router, "put", "/project/:Id", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.projects.updateProject);
	setupApiRoute(router, "delete", "/project/:Id", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.projects.deleteProject);
	
    setupApiRoute(router, 'post', '/report', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.createReport);
    setupApiRoute(router, 'get', '/report', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.getReport);
    // setupApiRoute(router, 'get', '/report/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.getReportById);
    setupApiRoute(router, 'put', '/report/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.updateReport);
    setupApiRoute(router, 'delete', '/report/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.deleteReport);

    setupApiRoute(router, 'post', '/feedback', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.createFeedback);
    setupApiRoute(router, 'get', '/feedback', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.getFeedback);
    // setupApiRoute(router, 'get', '/feedback/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.getFeedbackById);
    setupApiRoute(router, 'put', '/feedback/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.updateFeedback);
    setupApiRoute(router, 'delete', '/feedback/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.deleteFeedback);

    setupApiRoute(router, 'post', '/reflection', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.createReflection);
    setupApiRoute(router, 'get', '/reflection', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.getReflection);
    // setupApiRoute(router, 'get', '/reflection/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.getReflectionById);
    setupApiRoute(router, 'put', '/reflection/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.updateReflection);
    setupApiRoute(router, 'delete', '/reflection/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.trainingROI.deleteReflection);


	return router;
};
