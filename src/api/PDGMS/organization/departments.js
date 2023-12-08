"use strict";

const db = require('../../../database');
const User = require('../../../user');
const utilities =  require('../../../controllers/utils');
const { ObjectId } = require('mongodb');

const collectionName = db.collections.PDGMS.ORGANIZATION;

const Departments = module.exports;

Departments.get = async (req) => {
    const {id} = req.query;

    if (id) {
        return await db.findField(collectionName, {_id: ObjectId(id)});
    }

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
    const order = {_id: -1};

    const [departmentData=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, {type: 'departments'}, limit, page, order),
		db.countDocuments(collectionName, {type: 'departments'}),
	]);

    return utilities.paginate(`/pdgms${req.url}`, departmentData, count, limit, page);
}

Departments.create = async (req) => {
    const uid = parseInt(req.uid);
    const currentTimestamp = utilities.getISOTimestamp();
    const {organizationId, name, description} = req.body;

    const payload = {
        _key: `organization:${organizationId}`,
        uid, 
        organizationId, 
        name, 
        description
    };

    payload.createdBy = 'user:' + uid;
    payload.createdAt = currentTimestamp;
    payload.updatedAt = currentTimestamp;
    payload.updatedBy = 'user:' + uid;
    payload.type = 'department';

    return await db.setField(collectionName, payload);
}

Departments.update = async (req) => {
    const uid = parseInt(req.uid);
    const currentTimestamp = utilities.getISOTimestamp();

    const {id} = req.params;
    const {organizationId, name, description} = req.body;

    const payload = {};
    const keys = {
        _id: ObjectId(id),
        organizationId,
        type: 'department',
    }

    if (name) payload.name = name;
    if (description) payload.description = name;

    payload.updatedAt = currentTimestamp;
    payload.updatedBy = 'user:' + uid;

    const state = await db.updateField(collectionName, keys, { $set: payload });
	return {
		updated: state.result.n === 1,
	};
}

Departments.delete = async (req) => {
    return { message: 'DELETE on department'}
}