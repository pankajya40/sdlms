'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;



module.exports = function () {
	const middlewares = [middleware.authenticate];
	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();
	
    // setupApiRoute(router, 'get', '/getcard/:projectId', [...middlewares, middleware.authenticateOrGuest], controllers.write.socialScorecard.getScoreCard);
    setupApiRoute(router, 'post', '/createcard', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['attribute', 'projectId'])], controllers.write.socialScorecard.createScoreCard);
    setupApiRoute(router, 'post', '/eval', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialScorecard.postEval);

	
    setupApiRoute(router, 'put', '/addscore', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['pid'])], controllers.write.socialScorecard.addScore);

    setupApiRoute(router, 'get', '/evaluations', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialScorecard.getAssignments);
    setupApiRoute(router, 'get', '/scorecard/:templateId/:tid', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialScorecard.getScoreCard);
    setupApiRoute(router, 'get', '/score/view/:projectId/:uid', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialScorecard.viewScore);
    // setupApiRoute(router, 'get', '/score', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['pid' ,'uid', 'tid'])], controllers.write.socialScorecard.publishScore);

    setupApiRoute(router, 'post', '/create/rubric', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialScorecard.createRubric);
    setupApiRoute(router, 'post', '/create/attribute', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.socialScorecard.createAttribute);
    setupApiRoute(router, 'get', '/scorecards', [...middlewares, middleware.authenticateOrGuest], controllers.write.socialScorecard.getCards);
    setupApiRoute(router, 'post', '/templates', [...middlewares, middleware.authenticateOrGuest], controllers.write.socialScorecard.createTemplate);
    setupApiRoute(router, 'put', '/templates', [...middlewares, middleware.authenticateOrGuest,  middleware.checkRequired.bind(null, ['tid', 'title'])], controllers.write.socialScorecard.updateTemplate);
    setupApiRoute(router, 'put', '/update/attribute', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['attributeId'])], controllers.write.socialScorecard.updateAttribute);
    setupApiRoute(router, 'post', '/publish', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['tid'])], controllers.write.socialScorecard.publishCard);
    setupApiRoute(router, 'put', '/applicants', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['pid'])], controllers.write.socialScorecard.updateApplicants);
    setupApiRoute(router, 'put', '/evaluators', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['pid'])], controllers.write.socialScorecard.updateEvaluators);
    setupApiRoute(router, 'get', '/published/:tid/:pid', [...middlewares, middleware.authenticateOrGuest ], controllers.write.socialScorecard.getPublishedScorecard);
    setupApiRoute(router, 'get', '/draft/:pid', [...middlewares, middleware.authenticateOrGuest], controllers.write.socialScorecard.getDraftScorecard);
    setupApiRoute(router, 'post', '/assigncard', [...middlewares, middleware.authenticateOrGuest], controllers.write.socialScorecard.associateScorecard);
    
    setupApiRoute(router, 'post', '/attribute', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['tid'])], controllers.write.socialScorecard.addAttribute);
    setupApiRoute(router, 'put', '/attribute', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['attributeId', 'tid'])], controllers.write.socialScorecard.editAttribute);
    setupApiRoute(router, 'delete', '/attribute', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['attributeId', 'tid'])], controllers.write.socialScorecard.deleteAttribute);
    setupApiRoute(router, 'put', '/update/template', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['tid'])], controllers.write.socialScorecard.editTemplate);

    setupApiRoute(router, 'post', '/subattribute', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['attributeId', 'tid'])], controllers.write.socialScorecard.addSubattribute);
    setupApiRoute(router, 'put', '/subattribute', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['attributeId', 'tid', 'subattributeId'])], controllers.write.socialScorecard.editSubattribute);
    setupApiRoute(router, 'delete', '/subattribute', [...middlewares, middleware.authenticateOrGuest,  middleware.checkRequired.bind(null, ['attributeId', 'tid', 'subattributeId'])], controllers.write.socialScorecard.deleteSubattribute);
    setupApiRoute(router, 'get', '/details', [...middlewares, middleware.authenticateOrGuest], controllers.write.socialScorecard.getScorecardDetails);

    setupApiRoute(router, 'delete', '/template', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['tid'])], controllers.write.socialScorecard.deleteTemplate);
    setupApiRoute(router, 'put', '/state', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['state'])], controllers.write.socialScorecard.changeState);
    
    
    /**
     * @date 08-02-2023
     * @author imshawan
     * @description APIs for happiness scorecard
     */
    setupApiRoute(router, 'post', '/happiness', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['meta', 'response'])], controllers.write.happinessScorecard.createScoreCard);
    setupApiRoute(router, 'post', '/happiness/emailer', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['email', 'subject', 'emailContent', 'currentWeek'])], controllers.write.happinessScorecard.compileAndSendEmail);
	
    
    return router;

}