'use strict';

const db = require('../../database');
const utilities = require("../../controllers/utils");
const User = require("../../user");

const collectionName = db.collections.DEFAULT;
const userFields = ["username", "fullname", "userslug", "picture"];

const postsApi = module.exports;

postsApi.createPost = async (req) => {
    const luid = parseInt(req.uid);
    const pid = await db.incrObjectField("global", "nextPid");
    const payload = {
        pid,
        uid: luid,
        content: req.body.content,
        attachment_id: req.body.attachment_id || null,
        approved: false,
        timestamp: utilities.getISOTimestamp(),
        mainPid: 0,
        lastposttime: 0,
		postcount: 0,
		viewcount: 0,
        type: "post",
    };

    if (req.body.isDraft) {
        Post.status = JSON.parse(req.body.isDraft.toLowerCase()) ? 'draft' : 'published';
    }

    await db.setField(collectionName, payload);
    return { pid };
}

