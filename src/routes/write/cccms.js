'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');


const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author dev-raman
 * @date 14-12-22
 * @description This file handles all the routes that are required for the CCCMS to function.
 */



module.exports = function () {
    const middlewares = [middleware.authenticate];

    let essentialMiddlewares = [
        middleware.authenticateOrGuest, middleware.isLoggedin
    ]
    //for handling CCCMS 

    setupApiRoute(router, 'get', '/request', [...essentialMiddlewares], controllers.write.cccms.getRequests);


    setupApiRoute(router, 'post', '/request', [...essentialMiddlewares], controllers.write.cccms.createRequest)

    setupApiRoute(router, 'post', '/requestAction', [...essentialMiddlewares], controllers.write.cccms.requestAction)

    setupApiRoute(router, 'get', '/tickets', [...essentialMiddlewares], controllers.write.cccms.getTicketHistory)

    setupApiRoute(router, 'get', '/conclusion', [...essentialMiddlewares], controllers.write.cccms.getConsequences)

    setupApiRoute(router, 'post', '/conclusion', [...essentialMiddlewares], controllers.write.cccms.addConsequence)

    setupApiRoute(router, 'put', '/conclusion', [...essentialMiddlewares], controllers.write.cccms.updateConsequce)


    setupApiRoute(router, 'get', '/explore', [...essentialMiddlewares], controllers.write.cccms.explore)

    setupApiRoute(router, 'get', '/connect', [...essentialMiddlewares], controllers.write.cccms.connect)

    
        
    return router;
};
