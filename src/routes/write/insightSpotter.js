'use strict';
const router = require('express').Router();
const middleware = require('../../middleware');
const helpers = require('../helpers');
const controller = require('../../controllers');
const {setupApiRoute} = helpers

/**
 * @date 16-03-2023
 * @author iAmritMalviya
 * @description This file handles all the custom routes that are required for the insight spotter.
 */

module.exports = function () {

    let essentialMiddlewares = [
        middleware.authenticate,middleware.authenticate, middleware.isLoggedin
    ]
    // check required 
    setupApiRoute(router, 'get', '/getInsights', [...essentialMiddlewares], controller.write.insightSpotter.getInsights);

    setupApiRoute(router, 'post', '/createInsight', [...essentialMiddlewares, middleware.checkRequired, middleware.checkRequired.bind(null,['statement', 'reflection','category', 'subCategory' ])], controller.write.insightSpotter.createInsight);
    
    setupApiRoute(router, 'put', '/editInsight/:id', [...essentialMiddlewares], controller.write.insightSpotter.editInsight);

    setupApiRoute(router, 'delete', '/deleteInsight/:id', [...essentialMiddlewares], controller.write.insightSpotter.deleteInsight);
    
    setupApiRoute(router, 'get', '/getInsight/:id', [...essentialMiddlewares], controller.write.insightSpotter.getInsight);

    setupApiRoute(router, 'get', '/getJudgements/:id', [...essentialMiddlewares], controller.write.insightSpotter.getJudgements);

    setupApiRoute(router, 'post', '/createJudgement/:id', [...essentialMiddlewares, middleware.checkRequired.bind(null,['judgement', 'category'])], controller.write.insightSpotter.createJudgement);

    setupApiRoute(router, 'put', '/editJudgement/:id', [...essentialMiddlewares], controller.write.insightSpotter.editJudgement);

    setupApiRoute(router, 'delete', '/deleteJudgement/:id', [...essentialMiddlewares], controller.write.insightSpotter.deleteJudgement);    



    return router;
}