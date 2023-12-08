const db = require('../../database');
const Uploader = require('../../controllers/FIleUpload');
const utils = require('../../controllers/utils');
const { ObjectId } = require('mongodb');

const collectionName = db.collections.SDLMS.ORGANIZATION;
const { constants } = require('../../constants');
const { log } = console;

const role = module.exports;

role.get = async (req) => {
    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
    const keys = {
        type: "role",
	}
    
    let [roleData, count] = [[], 0];

    if (req.query.id) {
		roleData = await db.findField(collectionName, 
            { ...keys, _id: ObjectId(req.query.id) });

        if (roleData) {
            count = 1;
        } else {
            roleData = [];
        }
	} else {
        [roleData, count] = await Promise.all([
			db.getFieldsWithPagination(collectionName, keys, limit, page),
			db.countDocuments(collectionName, keys),
		]);
    }

    
    return utils.paginate(`/sdlms/admin${req.url}`, roleData, count, limit, page);
}


role.delete = async (req) => {
    const uid = parseInt(req.uid);
    const { id } = req.params;
    const {organizationId} = req.body;

    let _id = ObjectId(id);

    const roleData = await db.findField(collectionName, {type: "role", _id});
    if (!roleData) {
        throw new Error('Invalid roleId supplied!');
    }

    const keys = {
        type: "role", _id, uid,
        organizationId: parseInt(organizationId),
    };

    /**
     * @author imshawan (27-09-2022)
     * @description A proper mechanism/logic has to be implemented for correctly identifying who is allowed to delete a particular role
     * as of now I'm allowing only the creator of the role to delete.
     */

    if (roleData.uid != uid) {
        throw new Error('You are not authorized to perform this operation');
    }

    const state = await db.removeField(collectionName, keys);
	return { deleted: state.result.n === 1 };
}

role.create = async (req) => {
    const uid = parseInt(req.uid);
    const { organizationId, level } = req.body;
    const currentISOTimestamp = new Date(Date.now()).toISOString();
    const payload = {uid};

    ['name', 'description'].forEach((elem) => {
        if (req.body[elem]) {
            payload[elem] = req.body[elem];
        }
    });

    if (level) {
        payload.level = parseInt(level);
    }

    payload.organizationId = parseInt(organizationId);
    payload.createdAt = currentISOTimestamp;
    payload.updatedAt = currentISOTimestamp;
    payload.type = 'role';

    return await db.setField(collectionName, payload);
}

role.update = async (req) => {
    const uid = parseInt(req.uid);
    const { id } = req.params;
    const {level, organizationId} = req.body;

    const currentISOTimestamp = new Date(Date.now()).toISOString();
    const payload = {};

    const keys = {
        _id: ObjectId(id),
        uid,
        organizationId: parseInt(organizationId),
        type: 'role',
    };

    ['name', 'description'].forEach((elem) => {
        if (req.body[elem]) {
            payload[elem] = req.body[elem];
        }
    });

    if (level) {
        payload.level = parseInt(level);
    }

    payload.updatedAt = currentISOTimestamp;

    /**
     * @author imshawan (27-09-2022)
     * @description A proper mechanism/logic has to be implemented for correctly identifying who is allowed to update a particular role
     * as of now I'm allowing only the creator of the role to update.
     */

    const resp = await db.updateField(collectionName, keys, { $set: payload }, { upsert: false });
    return { updated: resp && resp.result && resp.result.n === 1 };
}