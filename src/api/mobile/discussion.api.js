'use strict';

const db = require('../../database');
const utilities = require("../../controllers/utils");
const User = require("../../user");

const collectionName = db.collections.MOBILE.DISCUSSION_ROOM;
const userFields = ["username", "fullname", "userslug", "picture"];

const discussionRooms = module.exports;

discussionRooms.getReactions = async (req) => {
    const validTypes = ['uid', 'messageId'];
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;

    let {type, value, roomId} = req.query;
    if (!roomId) {
        throw new Error('RoomId is missing in query parameters')
    }

    roomId = parseInt(roomId);

    if (!isNaN(value)) {
        value = parseInt(value);
    }

    const keys = {
        roomId: parseInt(roomId),
        type: 'thread:reaction',
    };

    if (type && value) {
        if (!validTypes.includes(type)) {
            throw new Error(`Invalid type: ${type}, valid types are: ${validTypes.join(', ')}`);
        }

        keys[type] = value;
    }

    const [reflections, count=0] = await Promise.all([
        db.getFieldsWithPagination(collectionName, keys, limit, page),
        db.countDocuments(collectionName, keys),
    ]);

    let reflectionData = [];

    if (type == 'uid') {
        let userdata = await User.getUserFields(value, userFields);
        reflectionData = reflections.map((e) => {
            return {...e, user: userdata};
        });
    } else {
        reflectionData = await Promise.all(reflections.map(async (el) => {
            let userdata = await User.getUserFields(el.uid, userFields);
            return {...el, user: userdata};
        }));
    }

    return utilities.paginate(`/app${req.url}`, reflectionData, count, limit, page);
}

discussionRooms.reactAndReflect = async (req) => {
    const uid = parseInt(req.uid);
    let {category='', subCategory='', reflection='', messageId, roomId} = req.body;

    roomId = parseInt(roomId);
    messageId = parseInt(messageId);

    const [discussRoom, message] = await Promise.all([
        db.findField(db.collections.DEFAULT, {roomId, type: 'discuss_room'}),
        db.findField(db.collections.DEFAULT, {_key: `message:${messageId}`, roomId: String(roomId)}),
    ]);

    if (!discussRoom) {
        throw new Error('Invalid discussion roomId, no room was found!');
    }
    if (!message) {
        throw new Error('Invalid messagId or roomId, no message was found!');
    }

    const keys = {
        uid,
        type: 'thread:reaction',
        messageId,
        roomId,
    }

    const payload = {
        ...keys,
        category: category.trim(),
        subCategory: subCategory.trim(),
        reflection: reflection.trim(),
    }

    const state = await db.updateField(collectionName, keys, 
            {$set: {...payload, updatedAt: utilities.getISOTimestamp()}}, 
            {upsert: true}
        );

    if (state.result.upserted && state.result.upserted.length) {
        return {_id: state.result.upserted[0]['_id']};
    } else {
        return { updated: state.result.n === 1};
    }
}

discussionRooms.removeReaction = async (req) => {
    const uid = parseInt(req.uid);
    const {roomId} = req.body;
    const {messageId} = req.params;

    const keys = {
        roomId: parseInt(roomId),
        messageId: parseInt(messageId),
        type: 'thread:reaction',
    }

    const reflection = await db.findField(collectionName, keys);
    if (!reflection) {
        throw new Error('Reflection was not found!');
    }

    if (reflection.uid != uid) {
        throw new Error('You are not authorized to delete this reaction!');
    }

    const state = await db.removeField(collectionName, keys);
	return {
		deleted: state.result.n === 1,
	};
}