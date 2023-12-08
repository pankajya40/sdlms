'use strict';

const utilities = require("../controllers/utils");
const db = require("../database");


const masterApi = module.exports;

const COLLECTION_NAME_PREFIX = 'prototype_';

masterApi.getCollections = async () => {

    const collections = await db.client.listCollections({name: {$regex: new RegExp(COLLECTION_NAME_PREFIX)}}).toArray();

    return {
        total: collections.length,
        collections: collections.map((el) => {
            return {name: el.name};
        }),
    }
}

masterApi.getRecords = async (req) => {
    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    let {projectName, query={}} = req.body;

    typevalidation(projectName, 'string');
    typevalidation(query, 'object');

    projectName = projectName.toLowerCase();

    const [data, count] = await Promise.all([
        db.getFieldsWithPagination(COLLECTION_NAME_PREFIX + projectName, query, limit, page),
        db.countDocuments(COLLECTION_NAME_PREFIX + projectName, query),
    ]);

    return utilities.paginate(`/master${req.url}`, data, count, limit, page);
}

masterApi.createRecord = async (req) => {
    const uid = parseInt(req.uid);
    const currentTime = utilities.getISOTimestamp();

    let {payload={}, projectName} = req.body;

    if (payload && !Object.keys(payload).length) {
        throw new Error('Payload cannot be empty!')
    }

    typevalidation(projectName, 'string');
    typevalidation(payload, 'object');

    projectName = projectName.toLowerCase();

    payload.createdAt = currentTime;
    payload.updatedAt = currentTime;

    return await db.setField(COLLECTION_NAME_PREFIX + projectName, {uid, ...payload});
}

function typevalidation(property, type) {
    if (typeof property !== type) {
        throw new Error(`Must be of type ${type}, received ${typeof property}`);
    }
}