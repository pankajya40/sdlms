"use strict";

const router = require("express").Router();
const middleware = require("../../middleware");
const controllers = require("../../controllers");
const routeHelpers = require("../helpers");

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @date 06-05-2022
 * @author imshawan
 * @description This file handles all the custom routes that are required for the SDLMS profile page to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	const multipart = require("connect-multiparty");
	const multipartMiddleware = multipart();

	const fileUploadMiddleware = [
		middleware.maintenanceMode,
		multipartMiddleware,
	];

	setupApiRoute(router, "get", "/assets", [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.getAssets)
	setupApiRoute(router, 'get', '/profile_page', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.getProfiles)
	setupApiRoute(router, 'post', '/profile_page', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.postBio)
	setupApiRoute(router, 'put', '/profile_page', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.updateBio)
	
	
	
	
	
	setupApiRoute(router, 'delete', '/assets', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.deleteAssets)
	setupApiRoute(router, 'put', '/assets', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.updateAssets)
	setupApiRoute(router, 'get', '/accolades', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.getAccolades)
	setupApiRoute(router, 'put', '/accolades', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.postAccolades)





	setupApiRoute(router, 'post', '/qualities', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, fileUploadMiddleware], controllers.write.userProfile.createQuality)
	setupApiRoute(router, 'get', '/qualities', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.getQualities)
	setupApiRoute(router, 'put', '/qualities', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.showOrHideQuality)
	setupApiRoute(router, 'delete', '/qualities', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.deleteQuality)






	setupApiRoute(router, 'get', '/memberships/batches', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.getBatches)
	setupApiRoute(router, 'put', '/membership/batches/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.updateBatches)






	setupApiRoute(router, 'post', '/memberships/communities', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, fileUploadMiddleware], controllers.write.userProfile.createCommunity)
	setupApiRoute(router, 'get', '/memberships/communities', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.getCommunities);
	setupApiRoute(router, 'get', '/memberships/discussionRooms', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.getDiscussionRooms);
	setupApiRoute(router, 'get', '/memberships/posts', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.getPosts);
	setupApiRoute(router, 'put', '/memberships/discussionRooms', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.showOrHideDiscussionRoom);
	setupApiRoute(router, 'get', '/leaderboard', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.getLeaderboard);
	





	setupApiRoute(router, 'get', '/membership/schools', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.getSchools)
	setupApiRoute(router, 'post', '/membership/schools', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.insertSchool)
	setupApiRoute(router, 'put', '/membership/schools/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.updateSchool)
	setupApiRoute(router, 'delete', '/membership/schools', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.deleteSchool)
	





	setupApiRoute(router, 'get', '/question', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.getQuestion)
	setupApiRoute(router, 'post', '/question', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.insertQuestion)
	setupApiRoute(router, 'put', '/question/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.userProfile.updateQuestion)
	setupApiRoute(router, 'post', '/answer', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, fileUploadMiddleware], controllers.write.userProfile.insertAnswer)

    return router;
}
