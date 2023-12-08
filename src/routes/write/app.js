'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan
 * @description This file handles all the custom routes that are required for the Mobile App to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();
	const fileUpload_middlewares = [middleware.maintenanceMode, multipartMiddleware];

	setupApiRoute(router, 'get', '/users', [], controllers.write.app.checkUser)

	setupApiRoute(router, 'get', '/rigorrank', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.getRanks)
	setupApiRoute(router, 'get', '/csv/rigorrank', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.getRankList)
	setupApiRoute(router, 'put', '/rigorrank', [...middlewares, middleware.authenticateOrGuest, fileUpload_middlewares], controllers.write.app.updateRank)
	setupApiRoute(router, 'delete', '/rigorrank', [middleware.authenticateOrGuest], controllers.write.app.deleteRank)

	setupApiRoute(router, 'put', '/rank', [middleware.authenticateOrGuest], controllers.write.app.updateRank);
	setupApiRoute(router, 'delete', '/rank', [middleware.authenticateOrGuest], controllers.write.app.deleteRank);

	setupApiRoute(router, 'post', '/reset', [], controllers.otp.sendOtp);
	setupApiRoute(router, 'post', '/verify', [], controllers.otp.verifyOtp);
	setupApiRoute(router, 'post', '/resetpassword', [], controllers.otp.resetPassword);

	setupApiRoute(router, 'get', '/user', [middleware.authenticateOrGuest], controllers.write.app.getUser);
	setupApiRoute(router, 'get', '/home', [middleware.authenticateOrGuest], controllers.write.app.getHome);

	setupApiRoute(router, 'get', '/joke', [], controllers.write.app.getJoke);
	setupApiRoute(router, 'post', '/joke', [], controllers.write.app.createJoke);

	setupApiRoute(router, 'get', '/annecdote', [middleware.authenticateOrGuest], controllers.write.app.getAnnecdote)
	setupApiRoute(router, 'post', '/annecdote', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ["title", "content", "author_uid"])], controllers.write.app.createAnnecdote)
	setupApiRoute(router, 'put', '/annecdote/:tid', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.updateAnnecdote)
	setupApiRoute(router, 'delete', '/annecdote/:tid', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.deleteAnnecdote)

	setupApiRoute(router, 'get', '/nudge', [middleware.authenticateOrGuest], controllers.write.app.getNudge)
	// setupApiRoute(router, 'post', '/getnudge', [middleware.authenticateOrGuest], controllers.write.app.getNudge);
	setupApiRoute(router, 'post', '/nudge', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest, middleware.checkRequiredFiles.bind(null, ['image']),
	middleware.checkRequired.bind(null, ['asset_type', 'assetId', 'title', 'schedule', 'end_time', 'description', 'invitation_text'])], controllers.write.app.createNudge);
	setupApiRoute(router, 'put', '/nudge/:id', [...middlewares, middleware.authenticateOrGuest, fileUpload_middlewares], controllers.write.app.updateNudge);
	setupApiRoute(router, 'delete', '/nudge/:id', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.deleteNudge);

	setupApiRoute(router, 'get', '/mascot', [middleware.authenticateOrGuest], controllers.write.app.getMascot);
	setupApiRoute(router, 'post', '/register/mascot', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['email', 'username', 'password', 'personality_traits', 'favourite_authors', 'favourite_movies', 'followed']), middleware.checkRequiredFiles.bind(null, ['picture'])], controllers.write.app.createMascot);
	setupApiRoute(router, 'put', '/mascot/:uid', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.updateMascot);
	setupApiRoute(router, 'delete', '/mascot/:uid', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.deleteMascot);

	// setupApiRoute(router, 'get', '/events', [middleware.authenticateOrGuest], controllers.write.app.getEvents)
	setupApiRoute(router, 'post', '/getevents', [middleware.authenticateOrGuest], controllers.write.app.getEvents);
	setupApiRoute(router, 'post', '/events', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.createEvent);
	setupApiRoute(router, 'put', '/events/:tid', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.updateEvent);
	setupApiRoute(router, 'delete', '/events/:tid', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.deleteEvent);
	setupApiRoute(router, 'put', '/events/register/:id', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.registerEvent);
	setupApiRoute(router, 'put', '/events/unregister/:id', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.unregisterEvent);

	// setupApiRoute(router, 'get', '/posts', [middleware.authenticateOrGuest], controllers.write.app.getPosts)
	setupApiRoute(router, 'post', '/getposts', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.getPosts);
	setupApiRoute(router, 'post', '/posts', [...middlewares, middleware.authenticateOrGuest, fileUpload_middlewares, middleware.checkRequired.bind(null, ['cid', 'content'])], controllers.write.app.createPost);
	setupApiRoute(router, 'put', '/posts/:pid', [...middlewares, middleware.authenticateOrGuest, fileUpload_middlewares], controllers.write.app.updatePost);
	setupApiRoute(router, 'delete', '/posts/:pid', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.deletePost);

	// setupApiRoute(router, 'get', '/articles', [middleware.authenticateOrGuest], controllers.write.app.getArticles)
	setupApiRoute(router, 'post', '/getarticles', [middleware.authenticateOrGuest], controllers.write.app.getArticles)
	setupApiRoute(router, 'post', '/articles', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.createArticle)
	setupApiRoute(router, 'put', '/articles/:pid', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.updateArticle)
	setupApiRoute(router, 'delete', '/articles/:pid', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.deleteArticle)

	// setupApiRoute(router, 'get', '/discussion_room', [...middlewares], controllers.write.app.getDiscussionRoom)
	setupApiRoute(router, 'post', '/getdiscussion_room', [...middlewares], controllers.write.app.getDiscussionRoom);
	setupApiRoute(router, 'post', '/discussion_room', [...middlewares, middleware.authenticateOrGuest, fileUpload_middlewares], controllers.write.app.createDiscussionRoom);
	setupApiRoute(router, 'put', '/discussion_room/:tid', [...middlewares, fileUpload_middlewares], controllers.write.app.updateDiscussionRoom);
	setupApiRoute(router, 'delete', '/discussion_room/:tid', [...middlewares], controllers.write.app.deleteDiscussionRoom);

	setupApiRoute(router, 'get', '/tag', [middleware.authenticateOrGuest], controllers.write.app.getTags);
	setupApiRoute(router, 'post', '/tag', [...middlewares, middleware.checkRequired.bind(null, ['tag'])], controllers.write.app.createTag);
	setupApiRoute(router, 'put', '/tag/:tag', [...middlewares], controllers.write.app.updateTag);
	setupApiRoute(router, 'delete', '/tag/:tag', [...middlewares], controllers.write.app.deleteTag);

	setupApiRoute(router, 'post', '/reflections/template', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['title', 'blocks', 'description']), middleware.checkRequiredFiles.bind(null, ['image'])], controllers.write.app.createReflectionTemplate);
	setupApiRoute(router, 'get', '/reflections/template', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.getReflectionTemplates);
	setupApiRoute(router, 'put', '/reflections/template/:tid', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.updateReflectionTemplate);
	setupApiRoute(router, 'delete', '/reflections/template/:tid', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.deleteReflectionTemplate);

	setupApiRoute(router, 'post', '/reflection', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['blocks', 'summary'])], controllers.write.app.createReflection);
	setupApiRoute(router, 'get', '/reflection', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.getReflection);
	setupApiRoute(router, 'put', '/reflection/:pid', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.updateReflection);
	setupApiRoute(router, 'delete', '/reflection/:pid', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.deleteReflection);

	// setupApiRoute(router, 'get', '/reflections', [middleware.authenticateOrGuest], controllers.write.app.getReflections);
	// setupApiRoute(router, 'post', '/reflections', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.createReflection); // to check iff the parameters are passed, we need to verify iff some parameters are there , by: middleware.checkRequired.bind(null, ["cid", "content", "attachment_id"])
	// setupApiRoute(router, 'put', '/reflections/:tid', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.updateReflection);
	// setupApiRoute(router, 'delete', '/reflections/:tid', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.deleteReflection);

	setupApiRoute(router, 'post', '/save/:item_name', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['id'])], controllers.write.app.save);
	setupApiRoute(router, 'get', '/saved/:item_name', [middleware.authenticateOrGuest], controllers.write.app.getSavedItems);

	setupApiRoute(router, 'post', '/tickets', [middleware.checkRequired.bind(null, ['subject', 'contact', 'category', 'description'])], controllers.write.app.raiseTicket);
	setupApiRoute(router, 'get', '/tickets', [], controllers.write.app.searchTickets);
	setupApiRoute(router, 'post', '/tickets', [], controllers.write.app.deleteTickets);

	setupApiRoute(router, 'get', '/preferences', [middleware.authenticateOrGuest], controllers.write.app.getPreferences);
	setupApiRoute(router, 'put', '/preferences', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.savePreferences);
	// setupApiRoute(router, 'delete', '/preferences', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.removePreferences)
	// setupApiRoute(router, 'put', '/preferences', [...middlewares, middleware.authenticateOrGuest], controllers.write.app.savePreferences)

	setupApiRoute(router, 'get', '/category', [middleware.authenticateOrGuest], controllers.write.app.getCategory);
	setupApiRoute(router, 'post', '/upload/:id', [fileUpload_middlewares], controllers.write.app.upload);

	setupApiRoute(router, 'post', '/createroom', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.createRoom);
	setupApiRoute(router, 'post', '/getroom', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['roomId'])], controllers.write.app.getRoom);
	setupApiRoute(router, 'post', '/sendmessage', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.sendMessage);
	setupApiRoute(router, 'post', '/adduser', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.addUsers);
	setupApiRoute(router, 'post', '/removeuser', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.removeUsers);
	setupApiRoute(router, 'post', '/deletemessage', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.deleteMessage);
	setupApiRoute(router, 'post', '/getmessages', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.getMessages);
	setupApiRoute(router, 'post', '/loadroom', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.loadRoom);
	setupApiRoute(router, 'put', '/room/:roomId', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.updateRoom);
	setupApiRoute(router, 'delete', '/room/:roomId', [middleware.authenticateOrGuest], controllers.write.app.deleteRoom);
	setupApiRoute(router, 'delete', '/deleteallrooms', [middleware.authenticateOrGuest], controllers.write.app.deleteAllRooms);
	// setupApiRoute(router, 'post', '/createroom', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.createRoom)
	// setupApiRoute(router, 'post', '/getroom', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.getRoom)
	// setupApiRoute(router, 'post', '/sendmessage', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.sendMessage)
	// setupApiRoute(router, 'post', '/adduser', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.addUsers)
	// setupApiRoute(router, 'post', '/removeuser', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.removeUsers)
	// setupApiRoute(router, 'post', '/deletemessage', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.deleteMessage)
	// setupApiRoute(router, 'post', '/getmessages', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.getMessages)
	// setupApiRoute(router, 'post', '/loadroom', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.loadRoom)
	// setupApiRoute(router, 'put', '/room/:roomId', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.updateRoom)
	// setupApiRoute(router, 'delete', '/room/:roomId', [middleware.authenticateOrGuest], controllers.write.app.deleteRoom)
	setupApiRoute(router, 'post', '/changeowner', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.changeOwner)

	setupApiRoute(router, 'post', '/uploadfile', [...middlewares, fileUpload_middlewares, middleware.authenticateOrGuest], controllers.write.app.uploadFile)

	setupApiRoute(router, 'delete', '/room/:roomId/moderators', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['moderators'])], controllers.write.app.removeMods)
	setupApiRoute(router, 'put', '/room/:roomId/moderators', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['moderators'])], controllers.write.app.addMods)

	setupApiRoute(router, 'put', '/room/:roomId/rules', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['rules'])], controllers.write.app.updateRules)

	setupApiRoute(router, 'put', '/room/thread/highlight', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['messageId', 'roomId'])], controllers.write.app.highlightThread)
	setupApiRoute(router, 'put', '/room/thread/report', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['messageId', 'roomId'])], controllers.write.app.reportThread)
	setupApiRoute(router, 'put', '/room/thread/save', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['messageId', 'roomId'])], controllers.write.app.saveThread)
	setupApiRoute(router, 'get', '/room/thread/highlighted/:roomId', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.getHighlightedThreads)
	setupApiRoute(router, 'get', '/room/thread/reported/:roomId', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.getReportedThreads)
	setupApiRoute(router, 'get', '/room/thread/saved/:roomId', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.getSavedThreads)
	setupApiRoute(router, 'delete', '/room/thread/highlight', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['messageId', 'roomId'])], controllers.write.app.removeHighlightedThread)
	setupApiRoute(router, 'delete', '/room/thread/report', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['messageId', 'roomId'])], controllers.write.app.removeReportedThread)
	setupApiRoute(router, 'delete', '/room/thread/save', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['messageId', 'roomId'])], controllers.write.app.removeSavedThread)

	setupApiRoute(router, 'get', '/comments', [middleware.authenticateOrGuest], controllers.write.app.getComments);
	setupApiRoute(router, 'post', '/comments', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.createComment);
	setupApiRoute(router, 'put', '/comments/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.updateComment);
	setupApiRoute(router, 'delete', '/comments/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.deleteComment);

	setupApiRoute(router, 'get', '/globalnotification', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.getGlobalNotifications);
	setupApiRoute(router, 'post', '/globalnotification', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.postGlobalNotifications);
	setupApiRoute(router, 'delete', '/globalnotification', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.deleteGlobalNotifications);

	setupApiRoute(router, 'get', '/mydiscussions', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.getMyDiscussions);

	setupApiRoute(router, 'post', '/getfeeds', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.getFeeds);

	setupApiRoute(router, 'get', '/drafts', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.getDrafts);
	
	setupApiRoute(router,'post','/getmess',[...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.app.getMess);


	
	// New features for discussion rooms

	setupApiRoute(router, 'get', '/reactions', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.mobile.discussionRooms.getReactions);
	setupApiRoute(router, 'post', '/reactions', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['category', 'subCategory', 'reflection', 'messageId', 'roomId'])], controllers.write.mobile.discussionRooms.reactAndReflect);
	setupApiRoute(router, 'delete', '/reactions/:messageId', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['roomId'])], controllers.write.mobile.discussionRooms.removeReaction);
	
	// Assets explore
	setupApiRoute(router, 'get', '/assets', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.mobile.assetsExplore.getAssets);
	
	setupApiRoute(router, 'get', '/insightfeeds', [middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.mobile.insightfeed.getFeeds);

	setupApiRoute(router, 'post', '/createpost', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['content'])], controllers.write.mobile.posts.createPost);

	setupApiRoute(router, 'get', '/session/:uuid', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.mobile.getSessionByUUID);

	return router;
};