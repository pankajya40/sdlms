'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan
 * @date 23-02-2022
 * @description This file handles all the routes that are required for the new Social Quiz APIs to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
    var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();
	const fileUploadMiddleware = [middleware.maintenanceMode, multipartMiddleware];

    setupApiRoute(router, 'get', '/quiz/:quizId?', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialQuiz.get);
    setupApiRoute(router, 'post', '/quiz', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['title', 'questions'])], controllers.write.socialQuiz.create);
    setupApiRoute(router, 'put', '/quiz/:quizId', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialQuiz.update);
    setupApiRoute(router, 'delete', '/quiz/:quizId', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialQuiz.delete);
    setupApiRoute(router, 'post', '/quiz/:quizId/clone', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialQuiz.clone);
    setupApiRoute(router, 'post', '/quiz/:quizId/attach', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['attachedTo'])], controllers.write.socialQuiz.attach);
    setupApiRoute(router, 'post', '/quiz/:quizId/answer/:questionId', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['attachmentId', 'timeTaken', 'answer'])], controllers.write.socialQuiz.answer);
    setupApiRoute(router, 'get', '/quiz/:quizId/responses/:uid?', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialQuiz.responses);
    setupApiRoute(router, 'post', '/quiz/:quizId/start', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['attachmentId'])], controllers.write.socialQuiz.start);
    setupApiRoute(router, 'put', '/quiz/:quizId/question/:questionId', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialQuiz.updateQuestionState);
    setupApiRoute(router, 'post', '/quiz/:quizId/answer/:questionId/mark', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['mark'])], controllers.write.socialQuiz.markAnswer);

    setupApiRoute(router, 'get', '/mcq/:mcqId?', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialQuiz.mcq.get);
    setupApiRoute(router, 'post', '/mcq', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['questions'])], controllers.write.socialQuiz.mcq.create);
    setupApiRoute(router, 'put', '/mcq/:mcqId', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialQuiz.mcq.update);
    setupApiRoute(router, 'delete', '/mcq/:mcqId', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialQuiz.mcq.delete);
    setupApiRoute(router, 'post', '/mcq/:mcqId/clone', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialQuiz.mcq.clone);
    setupApiRoute(router, 'post', '/mcq/:mcqId/answer', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['questions'])], controllers.write.socialQuiz.mcq.answer);
    setupApiRoute(router, 'get', '/mcq/:mcqId/responses', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialQuiz.mcq.responses);

    return router;
}