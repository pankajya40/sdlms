"use strict";

const winston = require("winston");
const db = require("../database");
const user = require("../user");
const helpers = require('../controllers/helpers');
const groups = require('../groups');
const privileges = require('../privileges');
const api = require('../api');
const Messaging = require('../messaging');

const profile = module.exports;

const userFields = [
    "username",
    "fullname",
    "userslug",
    "picture",
    "status",
    "signature",
    "aboutme"
]

profile.get = async function (req, res, next) {
    const uid = parseInt(req.params.uid);

    if (!uid) {
        return res.redirect(req.url.split('/view').join(`/${req.uid}/view`));
    }

    const collectionName = db.collections.DEFAULT;
    const threadBuilderKeys = { uid: uid, type: 'threadbuilder' };
    const eagleBuilderKeys = { uid: uid, type: 'eaglebuilder' };
    const postKeys = { uid: uid, type: 'post' };
    const articleKeys = { uid: uid, type: 'article' }

    const MAX_ASSETS = 5;
    const MAX_THREADS = 2;
    const PAGE = 0

    var profile = {
        title: 'Profile',
    };
    var discussionRooms = [];

    var [userData, batches, threadBuilder, eagleBuilder, events, eventsRegistered,
            articles, posts, reflectionsCompleted, recentThreadbuilders, recentEaglebuilders, 
            recentAttendedEvents, recentCreatedEvents, recentPosts, recentArticles, roomIds] = await Promise.all([
        user.getUserFields(uid, userFields),
        api.profilePage.getBatches({uid}),
        db.countDocuments(collectionName, threadBuilderKeys),
        db.countDocuments(collectionName, eagleBuilderKeys),
        db.countDocuments(collectionName, { uid: uid, type: 'event' }),
        db.countDocuments(collectionName, { attendees: uid, type: 'event' }),
        db.countDocuments(collectionName, articleKeys),
        db.countDocuments(collectionName, postKeys),
        db.countDocuments(db.collections.MOBILE.REFLECTION, {uid: uid, type: "reflection"}),
        db.getFieldsWithPagination(collectionName, threadBuilderKeys, MAX_ASSETS, PAGE, {_id: -1}),
        db.getFieldsWithPagination(collectionName, eagleBuilderKeys, MAX_ASSETS, PAGE, {_id: -1}),
        db.getFieldsWithPagination(collectionName, {type: 'event', attendees: uid}, MAX_ASSETS, PAGE, {_id: -1}),
        db.getFieldsWithPagination(collectionName, {type: 'event', uid}, MAX_ASSETS, PAGE, {_id: -1}),
        db.getFieldsWithPagination(collectionName, postKeys, MAX_ASSETS, PAGE, {_id: -1}),
        db.getFieldsWithPagination(collectionName, articleKeys, MAX_ASSETS, PAGE, {_id: -1}),
        db.findFields(collectionName, {_key: `uid:${uid}:chat:rooms`}),
    ])

    const counters = {
        threadBuilder,
        eagleBuilder,
        events,
        eventsRegistered,
        articles,
        posts,
        reflectionsCommitted: 0, // Hardcoding it as of now because we do not have a way to check if somebody took a reflection but didn't complete it.
        reflectionsCompleted,
    }

    profile.recentThreadbuilders = [];
    profile.recentAttendedEvents = [];
    profile.recentEaglebuilders = [];

    
    if (userData) {
        profile.title = userData.fullname || userData.displayname;
    }

    if (recentAttendedEvents.length) {
        profile.recentAttendedEvents = await Promise.all(recentAttendedEvents.map( async (elem) => {
            let usrData = await user.getUserFields(elem.uid, ['fullname', 'username']);
            return { ...elem, user: usrData};
        }));
    }

    if (roomIds.length) {
        discussionRooms = await Promise.all(roomIds.map( async (elem) => {
            return await db.findField(collectionName, {roomId: parseInt(elem.value), type: 'discuss_room'});
        }));
    }

    if (recentThreadbuilders.length) {
        recentThreadbuilders.forEach((item) => {
            let { threads, tid, pid } = item;
            let processedThreads = [];
    
            if (threads.length) {
                let { subthreads } = threads[0];
                if (subthreads && subthreads.length) {
                    for (let index = 0; index < MAX_THREADS; index++) {
                        if (subthreads[index]) {
                            processedThreads.push(subthreads[index]);
                        }
                    }
                }
            }

            profile.recentThreadbuilders.push({ threads: processedThreads, tid, pid });
        });
    }

    if (recentEaglebuilders.length) {
        recentEaglebuilders.forEach((item) => {
            let { tracks, tid, pid } = item;
            let threads = [];
    
            if (tracks.length) {
                let { subtracks } = tracks[0];
                if (subtracks && subtracks.length) {
                    for (let index = 0; index < MAX_THREADS; index++) {
                        if (subtracks[index]) {
                            threads.push(subtracks[index]);
                        }
                    }
                }
            }

            profile.recentEaglebuilders.push({ threads, tid, pid });
        });
    }

    profile.user = userData;
    profile.batches = batches;
    profile.counters = counters;
    profile.recentAttendedEvents = recentAttendedEvents;
    profile.recentCreatedEvents = recentCreatedEvents;
    profile.recentPosts = recentPosts;
    profile.recentArticles = recentArticles;
    profile.discussionRooms = discussionRooms;

    res.render("sdlms/persona/profile", profile);
};