"use strict";

const db = require('../../database');
const utilities =  require('../../controllers/utils');
const { ObjectId } = require('mongodb');

const collectionName = db.collections.PDGMS.TAG;

const tags = module.exports;

tags.get = async (req) => {
    const keys = {};
    const {name, context} = req.query;

    if (name) keys.name = { $regex: new RegExp(name), $options: '$i' };
    if (context) keys.context = context;

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
    const order = {_id: -1};

	const [tags=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    return utilities.paginate(`/pdgms${req.url}`, tags, count, limit, page);
}

tags.create = async (req) => {
    const uid = parseInt(req.uid);
    const {name, context} = req.body;

    const payload = {
        uid,
        name,
        context,
        createdAt: utilities.getISOTimestamp(),
    };

    return await db.setField(collectionName, payload);
}