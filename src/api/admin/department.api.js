const db = require('../../database');
const Uploader = require('../../controllers/FIleUpload');
const utils = require('../../controllers/utils');
const { ObjectId } = require('mongodb');

const collectionName = db.collections.SDLMS.ORGANIZATION;
const { constants } = require('../../constants');
const { log } = console;

const department = module.exports;

department.get = async (req) => {
    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
    const keys = {
        type: "department",
	}
    
    let [departmentData, count] = [[], 0];

    if (req.query.id) {
		departmentData = await db.findField(collectionName, 
            { ...keys, _id: ObjectId(req.query.id) });

        if (departmentData) {
            count = 1;
        } else {
            departmentData = [];
        }
	} else {
        [departmentData, count] = await Promise.all([
			db.getFieldsWithPagination(collectionName, keys, limit, page),
			db.countDocuments(collectionName, keys),
		]);
    }

    
    return utils.paginate(`/sdlms/admin${req.url}`, departmentData, count, limit, page);
}


department.delete = async (req) => {
    const uid = parseInt(req.uid);
    const { id } = req.params;
    let _id = ObjectId(id);

    const departmentData = await db.findField(collectionName, {type: "department", _id});
    if (!departmentData) {
        throw new Error('Invalid departmentId supplied!');
    }

    /**
     * @author imshawan (27-09-2022)
     * @description A proper mechanism/logic has to be implemented for correctly identifying who is allowed to delete a particular department
     * as of now I'm allowing only the creator of the department to delete.
     */

    if (departmentData.uid != uid) {
        throw new Error('You are not authorized to perform this operation');
    }

    const state = await db.removeField(collectionName, {type: "department", _id, uid});
	return { deleted: state.result.n === 1 };
}

department.create = async (req) => {
    const uid = parseInt(req.uid);
    const { organizationId } = req.body;
    const currentISOTimestamp =  utils.getISOTimestamp();
    const payload = {uid};

    ['name', 'description'].forEach((elem) => {
        if (req.body[elem]) {
            payload[elem] = req.body[elem];
        }
    });

    payload.organizationId = parseInt(organizationId);
    payload.memberCount = 0;
    payload.isPublic = true;
    payload.createdAt = currentISOTimestamp;
    payload.updatedAt = currentISOTimestamp;
    payload.type = 'department';

    return await db.setField(collectionName, payload);
}

department.update = async (req) => {
    const uid = parseInt(req.uid);
    const { id } = req.params;
    const currentISOTimestamp = utils.getISOTimestamp()
    const payload = {};

    const keys = {
        _id: ObjectId(id),
        uid,
        type: 'department',
    };

    ['name', 'description'].forEach((elem) => {
        if (req.body[elem]) {
            payload[elem] = req.body[elem];
        }
    });

    payload.updatedAt = currentISOTimestamp;

    /**
     * @author imshawan (27-09-2022)
     * @description A proper mechanism/logic has to be implemented for correctly identifying who is allowed to update a particular department
     * as of now I'm allowing only the creator of the department to update.
     */

    const resp = await db.updateField(collectionName, keys, { $set: payload }, { upsert: false });
    return { updated: resp && resp.result && resp.result.n === 1 };
}

department.addMember = async (req) => {

}

department.removeMember = async (req) => {
    
}

/**
 * 
 * @author imshawan {06-10-2022}
 * @function manageMember
 * @description Handler method that deals with the addition or deletion/remove members from a department in a particular organization
 * @param {Object} data 
 * @param {String} action 
 */

async function manageMember (data, action) {
    let missingFields = [];

    if (!['add', 'remove'].includes(action)) {
        throw new Error('Invalid action: ' + action)
    }
    
    ['organizationId', 'departmentId', 'uid'].forEach(el => !data[el] ? missingFields.push(el) : null);

    if (missingFields.length) {
        throw new Error('Missing required fields: ' + missingFields.join(', '));
    }
    
    const {organizationId, departmentId, role, uid} = data;
    const key = {
        _key: `department:${departmentId}:members`,
        organizationId: ObjectId(organizationId),
        uid: parseInt(uid),
    }
    const payload = {
        ...key,
        role,
        createdAt: utils.getISOTimestamp(),
    }

    if (action == 'add') {
        await Promise.all([
            db.updateField(collectionName, key, {$set: payload}, {upsert: true}),
            db.incrementCount(collectionName, {_id: ObjectId(departmentId)}, 'memberCount')
        ]);
    } else {
        await Promise.all([
            db.removeField(collectionName, key),
            db.decrAssetcount(collectionName, {_id: ObjectId(departmentId)}, 'memberCount')
        ]);
    }

    return { modified: true };
}