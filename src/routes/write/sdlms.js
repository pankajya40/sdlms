'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan
 * @description This file handles all the custom routes that are required for the SDLMS to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();
	const fileUploadMiddleware = [middleware.maintenanceMode, multipartMiddleware];


	setupApiRoute(router, 'post', '/monitor', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['classCategoryId', 'batchCategoryId', 'schedule', 'members'])], controllers.monitor.create);
	setupApiRoute(router, 'put', '/monitor', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['tid'])], controllers.monitor.update);
	setupApiRoute(router, 'put', '/monitor/:tid', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['isLive'])], controllers.monitor.updateClassStatus);
	setupApiRoute(router, 'delete', '/monitor/:tid', [...middlewares, middleware.authenticateOrGuest], controllers.monitor.deleteSession);
	setupApiRoute(router, 'get', '/monitor/download', [...middlewares, middleware.authenticateOrGuest], controllers.monitor.download);
	
	setupApiRoute(router, 'get', '/getsessions', [middleware.authenticateOrGuest], controllers.write.sdlms.getSessions);
	setupApiRoute(router, 'post', '/sharer', [middleware.authenticateOrGuest], controllers.write.sdlms.getShareLink);
	setupApiRoute(router, 'get', '/sharer/:id', [middleware.authenticateOrGuest], controllers.write.sdlms.getDataByShareLink);
	setupApiRoute(router, 'get', '/pids', [middleware.authenticateOrGuest], controllers.write.sdlms.getBypids);


	setupApiRoute(router, 'put', '/sessions/:tid/join', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.joinClass);
	setupApiRoute(router, 'put', '/session/update', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['id', 'state'])], controllers.write.sdlms.updateSessionState);
	setupApiRoute(router, 'get', '/attendance/:tid', [middleware.authenticateOrGuest], controllers.live.getAttendance);
	setupApiRoute(router, 'get', '/members/:tid', [middleware.authenticateOrGuest], controllers.live.getMembers);

	setupApiRoute(router, 'get', '/:tid/eaglebuilder', [middleware.authenticateOrGuest], controllers.write.sdlms.getEB);
	setupApiRoute(router, 'post', '/:tid/eaglebuilder', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['meta', 'tracks'])], controllers.write.sdlms.createEB);
	setupApiRoute(router, 'put', '/:tid/eaglebuilder/:id', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['meta', 'tracks'])], controllers.write.sdlms.updateEB);

	setupApiRoute(router, 'get', '/:tid/tracker', [middleware.authenticateOrGuest], controllers.write.sdlms.sessionTracker);

	setupApiRoute(router, 'get', '/:tid/threadbuilder', [middleware.authenticateOrGuest], controllers.write.sdlms.getTB_ByUid);
	setupApiRoute(router, 'get', '/:tid/threadbuilder/(:id)?', [middleware.authenticateOrGuest], controllers.write.sdlms.getTB);
	setupApiRoute(router, 'post', '/:tid/threadbuilder', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['threads'])], controllers.write.sdlms.createTB);
	setupApiRoute(router, 'put', '/:tid/threadbuilder/:id', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['threads'])], controllers.write.sdlms.updateTB);

	setupApiRoute(router, 'put', '/:tid/public/:id', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.markPublic);

	setupApiRoute(router, 'get', '/:tid/quiz/(:id)?', [middleware.authenticateOrGuest], controllers.write.sdlms.getQZ);
	setupApiRoute(router, 'post', '/:tid/quiz', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['data'])], controllers.write.sdlms.createQZ);
	setupApiRoute(router, 'put', '/:tid/quiz/:id', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['data'])], controllers.write.sdlms.updateQZ);

	setupApiRoute(router, 'get', '/:tid/assets/:uid', [middleware.authenticateOrGuest], controllers.write.sdlms.getAllAssets);

	setupApiRoute(router, 'put', '/groups/:slug/membership/:uid', [...middlewares, middleware.assert.group], controllers.write.groups.join);
	setupApiRoute(router, 'delete', '/groups/:slug/membership/:uid', [...middlewares, middleware.assert.group], controllers.write.groups.leave);

	setupApiRoute(router, 'get', '/reaction/:uid', [middleware.authenticateOrGuest], controllers.reaction.getReactionsByDuration);
	setupApiRoute(router, 'get', '/reactions', [middleware.authenticateOrGuest], controllers.reaction.getAllReactions);
	setupApiRoute(router, 'get', '/reactions/:tid', [middleware.authenticateOrGuest], controllers.reaction.getReactions);
	setupApiRoute(router, 'put', '/reactions/:tid/:rid', [...middlewares, middleware.authenticateOrGuest], controllers.reaction.react);

	setupApiRoute(router, 'delete', '/categories/:cid', [...middlewares], controllers.write.sdlms.deleteCategoryWithTypeClass);

	setupApiRoute(router, 'get', '/feedbacks', [middleware.authenticateOrGuest], controllers.write.sdlms.getFeedbacks);
	setupApiRoute(router, 'post', '/feedbacks', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.createFeedback);
	setupApiRoute(router, 'put', '/feedbacks/:id', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.updateFeedback);
	setupApiRoute(router, 'delete', '/feedbacks/:id', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.deleteFeedback);

	setupApiRoute(router, 'put', '/feedbacks/:id/vote', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.vote);

	setupApiRoute(router, 'get', '/batch', [middleware.authenticateOrGuest], controllers.write.sdlms.getBatches);
	setupApiRoute(router, 'post', '/batch', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['classCategoryId', 'batchName'])], controllers.write.sdlms.createBatch);
	setupApiRoute(router, 'put', '/batch/:cid', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['batchName'])], controllers.write.sdlms.updateBatch);
	setupApiRoute(router, 'delete', '/batch/:cid', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.deleteBatch);

	setupApiRoute(router, 'get', '/spreadsheet', [middleware.authenticateOrGuest], controllers.write.sdlms.getSpreadSheets);
	setupApiRoute(router, 'post', '/spreadsheet', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['data'])], controllers.write.sdlms.createSpreadSheet);
	setupApiRoute(router, 'put', '/spreadsheet/:pid', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.updateSpreadSheet);
	setupApiRoute(router, 'delete', '/spreadsheet/:pid', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.deleteSpreadSheet);

	setupApiRoute(router, 'get', '/:tid/attendance', [middleware.authenticateOrGuest], controllers.write.sdlms.getAttendance);

	setupApiRoute(router, 'get', '/cohorts/:name/members', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.getMembersByCohortName);
	setupApiRoute(router, 'post', '/cohorts', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['name'])], controllers.cohort.createCohort);
	setupApiRoute(router, 'put', '/cohorts/:slug', [multipartMiddleware, ...middlewares, middleware.authenticateOrGuest], controllers.cohort.updateCohort);
	setupApiRoute(router, 'delete', '/cohorts/:name', [...middlewares, middleware.authenticateOrGuest], controllers.cohort.deleteCohort);
	setupApiRoute(router, 'put', '/cohorts/:name/leave', [...middlewares, middleware.authenticateOrGuest], controllers.cohort.removeMembers);

	setupApiRoute(router, 'get', '/comment', [middleware.authenticateOrGuest], controllers.write.sdlms.getComments);
	setupApiRoute(router, 'post', '/comment', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.createComment);
	setupApiRoute(router, 'put', '/comment', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.updateComment);
	setupApiRoute(router, 'delete', '/comment/:pid', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.deleteComment);

	setupApiRoute(router, 'get', '/curriculums', [...middlewares, middleware.authenticateOrGuest], controllers.curriculum.getCurriculums);
	setupApiRoute(router, 'post', '/curriculums', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['name'])], controllers.curriculum.create);
	setupApiRoute(router, 'put', '/curriculums/:id', [...middlewares, middleware.authenticateOrGuest], controllers.curriculum.update);
	setupApiRoute(router, 'delete', '/curriculums/:id', [...middlewares, middleware.authenticateOrGuest], controllers.curriculum.delete);

	setupApiRoute(router, 'post', '/error', [], controllers.logger.log);

	setupApiRoute(router, 'get', '/teachingstyles', [...middlewares, middleware.authenticateOrGuest], controllers.teaching_style.getTeachingStyles);
	setupApiRoute(router, 'post', '/teachingstyles', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['name'])], controllers.teaching_style.create);
	setupApiRoute(router, 'put', '/teachingstyles/:id', [...middlewares, middleware.authenticateOrGuest], controllers.teaching_style.update);
	setupApiRoute(router, 'delete', '/teachingstyles/:id', [...middlewares, middleware.authenticateOrGuest], controllers.teaching_style.delete);
	
	setupApiRoute(router, 'post', '/enquiry/:tid', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest,middleware.checkRequired.bind(null, ['blocks','title'])], controllers.write.sdlms.createEnquiry);
	setupApiRoute(router, 'get', '/enquiry/:pid', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.getEnquiry);
	setupApiRoute(router, 'put', '/enquiry/:pid', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest], controllers.write.sdlms.updateEnquiry);
	setupApiRoute(router, 'delete', '/enquiry/:pid', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest], controllers.write.sdlms.deleteEnquiry);
	

	setupApiRoute(router, 'get', '/polls/single/:tid/:pid', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest], controllers.write.sdlms.getSinglePoll);
	setupApiRoute(router, 'post', '/polls', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest,middleware.checkRequired.bind(null, ['tid', 'group'])], controllers.write.sdlms.createPoll);
	setupApiRoute(router, 'put', '/polls', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest,middleware.checkRequired.bind(null, ['pid', 'tid', 'group'])], controllers.write.sdlms.updatePoll);
	setupApiRoute(router, 'put', '/polls/vote', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest,middleware.checkRequired.bind(null, ['pid', 'tid', 'group'])], controllers.write.sdlms.voteForPoll);
	setupApiRoute(router, 'put', '/polls/complete', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest,middleware.checkRequired.bind(null, ['pid', 'tid', 'group'])], controllers.write.sdlms.completePoll);
	setupApiRoute(router, 'put', '/polls/announce', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest,middleware.checkRequired.bind(null, ['tid'])], controllers.write.sdlms.announcePoll);
	setupApiRoute(router, 'post', '/polls/getcount', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest,middleware.checkRequired.bind(null, ['tid'])], controllers.write.sdlms.getPollsCountByGroups);
	setupApiRoute(router, 'post', '/polls/getall', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest, middleware.checkRequired.bind(undefined, ['tid'])], controllers.write.sdlms.getPolls);
	setupApiRoute(router, 'get', '/polls/nonvoted/:tid/:uid', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest], controllers.write.sdlms.getNonVoted);

	setupApiRoute(router, 'get', '/question', [middleware.authenticateOrGuest],controllers.write.sdlms.getQuestionByUid);
	setupApiRoute(router, 'get', '/answer', [middleware.authenticateOrGuest],controllers.write.sdlms.getAnswerByUid);
	setupApiRoute(router, 'post', '/feeds', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['tid'])], controllers.write.sdlms.getFeeds);

	setupApiRoute(router, 'delete', '/asset', [...middlewares, middleware.isLoggedin, middleware.authenticateOrGuest], controllers.write.sdlms.deleteAsset);
	

	//social feed
	setupApiRoute(router, 'get', '/socialfeed', [...middlewares, middleware.authenticateOrGuest], controllers.write.sdlms.getSocialFeed);

	return router;
};