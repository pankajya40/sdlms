'use strict';

const db = require("../../database");

const mobileAppApis = module.exports;

mobileAppApis.discussionRooms = require('./discussion.api');
mobileAppApis.posts = require('./posts.api');
mobileAppApis.assetsExplore = require('./assets.api');
mobileAppApis.insightFeeds = require('./feeds.api');
mobileAppApis.posts = require('./posts.api');


mobileAppApis.getSessionByUUID = async (req) => {
    const uid = parseInt(req.uid);
    const {uuid} = req.params;
    const collectionName = 'sessions';
    const unAuthorizedError = new Error('You are not authorized to access the session information');

    if (uuid.length != 36) {
        throw new Error('Invalid UUID supplied!');
    }

    const sessionData = await db.findField(collectionName, {
        session: {$regex: new RegExp(uuid), $options: '$i'}
    });

    if (!sessionData) {
        throw new Error('Session not found with the UUID supplied');
    }
    
    var {session} = sessionData;

    if (typeof session === 'string') {
        session = JSON.parse(session);
    }

    const {passport} = session;
    if (!passport || passport.user != uid) {
        throw unAuthorizedError;
    }

    return {...sessionData, session};
}
