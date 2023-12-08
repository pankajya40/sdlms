"use strict";

const db = require('../../../database');
const User = require('../../../user');
const utilities =  require('../../../controllers/utils');
const organizationUtils = require('./organizationUtils');
const { ObjectId } = require('mongodb');

const organizationFields = ['name', 'sector', 'website', 'about'];
const collectionName = db.collections.PDGMS.ORGANIZATION;

const Organization = module.exports;

Organization.departments = require('./departments');
Organization.members = require('./members');


Organization.get = async (req) => {
    const {id} = req.query;

    if (id) {
        return await db.findField(collectionName, {_id: ObjectId(id)});
    }

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
    const order = {_id: -1};

    const [organizationData=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, {type: 'organization'}, limit, page, order),
		db.countDocuments(collectionName, {type: 'organization'}),
	]);

    return utilities.paginate(`/pdgms${req.url}`, organizationData, count, limit, page);
    
}

Organization.create = async (req) => {
    const uid = parseInt(req.uid);
    const currentTimestamp = utilities.getISOTimestamp();

    const payload = {uid};

    organizationFields.forEach(item => {
        if (req.body[item]) {
            payload[item] = req.body[item];
        }
    });

    payload.locations = [];
    payload.images = [];
    payload.socialLinks = [];
    payload.emails = [];
    payload.phoneNumbers = [];
    payload.createdBy = 'user:' + uid;
    payload.createdAt = currentTimestamp;
    payload.updatedAt = currentTimestamp;
    payload.updatedBy = 'user:' + uid;
    payload.type = 'organization';

    return await db.setField(collectionName, payload);
}

Organization.update = async (req) => {
    const uid = parseInt(req.uid);
    const {id} = req.params;
    const currentTimestamp = utilities.getISOTimestamp();

    const organization = await db.findField(collectionName, {_id: ObjectId(id)});
    if (!organization) throw new Error('Invalid Organization Id');

    const payload = {};

    organizationFields.forEach(item => {
        if (req.body[item]) {
            payload[item] = req.body[item];
        }
    });

    await setAttributes(req.body, organization);

    payload.updatedAt = currentTimestamp;
    payload.updatedBy = 'user:' + uid;

    const state = await db.updateField(collectionName, {_id: ObjectId(id)}, { $set: payload });
	return {
		updated: state.result.n === 1,
	};
}

Organization.delete = async (req) => {
    const uid = parseInt(req.uid);

    return { message: 'Still not yet sure who\'s going to have the power to delete the organization' }
}

async function setAttributes (payload, organization) {
    Object.keys(payload).forEach(async (key) => {

        let func = `set${utilities.capitalizeFirstLetter(key)}`;

        if(typeof organizationUtils[func] === 'function'){
            payload = await organizationUtils[func](payload, organization[key], organization._id);
        }

    });
}