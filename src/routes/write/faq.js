'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author Awwal 
 * @date 17-10-22
 * @description This file handles all the routes that are required for the GLOBAL FAQ to function.
 */

 

 module.exports = function () {
	const middlewares = [middleware.authenticate];
	 

    //for handling global FAQ 
    setupApiRoute(router, 'get', '/faqs', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.faq.getFaq);
    setupApiRoute(router, 'post', '/faqs', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.faq.createFaq);
    setupApiRoute(router, 'put', '/faqs', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.faq.updateFaq);
    setupApiRoute(router, 'delete', '/faqs', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.faq.deleteFaq);


    //for handling faQnA (questions and answer)
    setupApiRoute(router, 'post', '/faqs/faq', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.faq.addFaQnA);
    setupApiRoute(router, 'put', '/faqs/faq', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.faq.editFaQnA);
    setupApiRoute(router, 'delete', '/faqs/faq', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.faq.deleteFaQnA);

	return router;
};
