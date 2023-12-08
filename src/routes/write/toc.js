"use strict";

const router = require("express").Router();
const middleware = require("../../middleware");
const controllers = require("../../controllers");
const routeHelpers = require("../helpers");

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author Rahul Ranjan
 * @description This file handles all the custom routes that are required for the toc to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	const { typedFieldValidation } = middleware.typedValidation;

	//setupApiRoute(router, "get", "/task", [...middlewares, middleware.authenticateOrGuest,middleware.isLoggedin], controllers.write.toc.getsTask);
	//setupApiRoute(router, "post", "/task", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.createTask);
	
	// Route for todo
	setupApiRoute(router, "get", "/todo", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.getTodos);
	setupApiRoute(router, "post", "/todo", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['title'])], controllers.write.toc.addTodo);
	setupApiRoute(router, "put", "/todo/:id", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.updateTodo);
	setupApiRoute(router, "delete", "/todo/:id", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.deleteTodo);
	setupApiRoute(router, "get", "/counturgentimportant", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.countUrgentImportant);
	// Router for the Sarpa API

	// setupApiRoute(router, "get", "/sarpa", [...middlewares, middleware.authenticateOrGuest], controllers.write.toc.getSarpa);
	// setupApiRoute(router, "post", "/sarpa", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.createSarpa);
	// setupApiRoute(router, "put","/sarpa", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.updateSarpa);
	// setupApiRoute(router, "delete", "/sarpa", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.deleteSarpa);

	// Router for the Journal API
	
	// setupApiRoute(router, "post", "/journal", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.createJournal);
	// setupApiRoute(router, "post", "/journals", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.addJournal);
	// setupApiRoute(router, "get", "/journal", [...middlewares, middleware.authenticateOrGuest,middleware.isLoggedin], controllers.write.toc.getsJournal);
	// setupApiRoute(router, "put", "/journal", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.updateJournal);
	// setupApiRoute(router, "delete", "/journal", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.deleteJournal);
	setupApiRoute(router, "post", "/journal", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.createJournal);
	setupApiRoute(router, "post", "/journals", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.addJournal);
	setupApiRoute(router, "get", "/journal/:id?", [...middlewares, middleware.authenticateOrGuest,middleware.isLoggedin], controllers.write.toc.getsJournal);
	setupApiRoute(router, "get", "/publishedjournal", [...middlewares, middleware.authenticateOrGuest,middleware.isLoggedin], controllers.write.toc.getsPublishedJournal);
	setupApiRoute(router, "put", "/journal", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['journalId'])], controllers.write.toc.updateJournal);
	setupApiRoute(router, "delete", "/journal/:id?", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.deleteJournal);

    // Router for the Calender API

	// setupApiRoute(router, "get", "/calender", [...middlewares, middleware.authenticateOrGuest], controllers.write.toc.getCalendar);
	// setupApiRoute(router, "post", "/calender", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.createCalendar);
	// setupApiRoute(router, "post", "/calenderinfo", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.addCalendarInfo);

	

	setupApiRoute(router, "post", "/", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.addToc);
	setupApiRoute(router, "put", "/", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.updateToc);

	setupApiRoute(router, "post", "/grow/reflection/:ISOweek", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.toc.createReflection);
	setupApiRoute(router,"post","/learning/:ISOweek",[...middlewares,middleware.authenticateOrGuest,middleware.isLoggedin],controllers.write.toc.setLearningWeekly);
	setupApiRoute(router,"delete","/grow/reflection/:id",[...middlewares,middleware.authenticateOrGuest,middleware.isLoggedin],controllers.write.toc.deleteSelfGrowReflection);
	setupApiRoute(router,"get","/learning/publicreflections",[...middlewares,middleware.authenticateOrGuest,middleware.isLoggedin],controllers.write.toc.getLearningsPublicReflections);
	setupApiRoute(router,"put","/learning/:id",[...middlewares,middleware.authenticateOrGuest,middleware.isLoggedin],controllers.write.toc.updateLearningWeekly);
	setupApiRoute(router,"delete","/learning/:id",[...middlewares,middleware.authenticateOrGuest,middleware.isLoggedin],controllers.write.toc.deleteLearning);
	setupApiRoute(router,"put","/grow/streak",[...middlewares,middleware.authenticateOrGuest,middleware.isLoggedin],controllers.write.toc.updateStreak);
	setupApiRoute(router,"get","/grow/streak",[...middlewares,middleware.authenticateOrGuest,middleware.isLoggedin],controllers.write.toc.getStreak);
	return router;
};
