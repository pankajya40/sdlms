"use strict";

const router = require("express").Router();
const middleware = require("../../middleware");
const controllers = require("../../controllers");
const routeHelpers = require("../helpers");

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author Rahul Ranjan
 * @description This file handles all the custom routes that are required for the socialquiz to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	const { typedFieldValidation } = middleware.typedValidation;

	// Quiz operations
	setupApiRoute(router,	"get", "/quiz/:userId", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.getQuiz);
//	setupApiRoute(router,	"get", "/quiz", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.getSelectedQuiz);
	setupApiRoute(router,	"post",	"/quiz", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.createQuiz);
	setupApiRoute(router,	"put", "/quiz",	[...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.editQuiz);
	setupApiRoute(router,	"delete","/quiz", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.deleteQuiz);
	setupApiRoute(router,	"put",	"/publish", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.publishedQuiz);
	setupApiRoute(router,	"get",	"/publish", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.getPublishedQuiz);
	setupApiRoute(router,   "get",  "/active",  [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.getActiveQuiz);
	setupApiRoute(router,	"put",	"/start/:id", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.startQuiz);
	setupApiRoute(router,	"put",	"/end/:id", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.endQuiz);
	setupApiRoute(router,	"post",	"/question", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.addQuestion);
	setupApiRoute(router,	"put",	"/question", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.updateQuestion);
	setupApiRoute(router,	"delete",	"/question", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.deleteQuestion);
	setupApiRoute(router,	"post",	"/option", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.addOptions);
	setupApiRoute(router,	"put",	"/mark/:session", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.startMarking);
	setupApiRoute(router,	"put",	"/endmark/:pid", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.endMarking);
	setupApiRoute(router,	"put",	"/addParticipant/:session", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.addParticipantUid);
	setupApiRoute(router,	"put",	"/setEvaluators/:session", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.setEvaluators);
	setupApiRoute(router,	"put",	"/markingslelo/:sessionid", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.updateMarkings);
	// Submission Routes
	setupApiRoute(router,	"get",	"/submission/:userId", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.getSubmission);
	setupApiRoute(router,	"post",	"/submission", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.createSubmission);
	setupApiRoute(router,	"put",	"/submission/:id", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.editSubmission);
	setupApiRoute(router,	"put",	"/submission", [...middlewares, middleware.authenticateOrGuest],controllers.write.socialQuiz.deleteSubmission);

	setupApiRoute(router,	'post',	'/clone', [...middlewares, middleware.authenticateOrGuest], controllers.write.socialQuiz.clone);

	return router;
};
