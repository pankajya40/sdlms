'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan
 * @date 29-10-2022
 * @description This file handles all the routes that are required for the Observation Panel APIs to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];

    setupApiRoute(router, 'post', '/start', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['consentProvided'])], controllers.write.observation.startObservation);
    setupApiRoute(router, 'get', '/', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.observation.getObservations);
    setupApiRoute(router, 'post', '/', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['name'])], controllers.write.observation.createObservation);
    setupApiRoute(router, 'put', '/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.observation.editObservation);
    setupApiRoute(router, 'delete', '/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.observation.deleteObservation);
    
    setupApiRoute(router, 'post', '/reflection', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['content'])], controllers.write.observation.createReflection);
    setupApiRoute(router, 'delete', '/reflection/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.observation.deleteReflection);

    setupApiRoute(router, 'get', '/page/:name', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.observation.getPage);
    setupApiRoute(router, 'put', '/page/:slug', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.observation.updatePage);
    setupApiRoute(router, 'post', '/page', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['name', 'content'])], controllers.write.observation.createPage);
    
    setupApiRoute(router, 'post', '/signoff', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['response'])], controllers.write.observation.submitReflectionResponse);
    setupApiRoute(router, 'get', '/leaderboard', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.observation.getLeaderboard);


    setupApiRoute(router, 'post', '/videoref', [middleware.checkRequired.bind(null,['email', 'companyId', 'name', 'contact', 'role'])], controllers.write.observation.videoRef.createUserEntry);
    setupApiRoute(router, 'post', '/videoref/reflection', [middleware.checkRequired.bind(null,['profileId', 'email', 'reflection'])], controllers.write.observation.videoRef.submitReflection);
    setupApiRoute(router, 'put', '/videoref/reflection/:reflectionId/acknowledge', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['voiceNote', 'punctuality', 'whatsappGroup'])], controllers.write.observation.videoRef.submitAcknowledgement);

    setupApiRoute(router, 'get', '/videoref/submissions', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.observation.videoRef.getSubmissions);
            

    setupApiRoute(router, 'get', '/completeObservation', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.observation.completeObservation);
 
    setupApiRoute(router, 'get', '/analytics/:uid', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.observation.analytics);
            
    setupApiRoute(router, 'post', '/faq', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null,['question', 'content'])], controllers.write.observation.createFaq);
    setupApiRoute(router, 'delete', '/faq/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.observation.deleteFaq);
    return router;
}