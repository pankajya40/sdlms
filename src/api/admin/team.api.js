const db = require('../../database');
const Uploader = require('../../controllers/FIleUpload');
const utils = require('../../controllers/utils');
const { ObjectId } = require('mongodb');

const collectionName = db.collections.SDLMS.ORGANIZATION;
const { constants } = require('../../constants');
const { log } = console;

const team = module.exports;

team.get = async (req) => {
    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
    const keys = {
        type: "team",
	}
    
    let [teamData, count] = [[], 0];

    if (req.query.id) {
		teamData = await db.findField(collectionName, 
            { ...keys, _id: ObjectId(req.query.id) });

        if (teamData) {
            count = 1;
        } else {
            teamData = [];
        }
	} else {
        [teamData, count] = await Promise.all([
			db.getFieldsWithPagination(collectionName, keys, limit, page),
			db.countDocuments(collectionName, keys),
		]);
    }

    
    return utils.paginate(`/sdlms/admin${req.url}`, teamData, count, limit, page);
}


team.delete = async (req) => {
    const uid = parseInt(req.uid);
    const { id } = req.params;
    const { organizationId, departmentId } = req.body;

    let _id = ObjectId(id);

    const teamData = await db.findField(collectionName, {type: "team", _id});
    if (!teamData) {
        throw new Error('Invalid teamId supplied!');
    }

    const keys = {
        _id,
        uid,
        departmentId: parseInt(departmentId),
        organizationId: parseInt(organizationId),
        type: 'team',
    }

    /**
     * @author imshawan (27-09-2022)
     * @description A proper mechanism/logic has to be implemented for correctly identifying who is allowed to delete a particular team
     * as of now I'm allowing only the creator of the team to delete.
     */

    if (teamData.uid != uid) {
        throw new Error('You are not authorized to perform this operation');
    }

    const state = await db.removeField(collectionName, keys);
	return { deleted: state.result.n === 1 };
}

team.create = async (req) => {
    const uid = parseInt(req.uid);
    const { organizationId, departmentId } = req.body;
    const currentISOTimestamp = new Date(Date.now()).toISOString();
    const payload = {uid};

    ['name', 'description'].forEach((elem) => {
        if (req.body[elem]) {
            payload[elem] = req.body[elem];
        }
    });

    payload.organizationId = parseInt(organizationId);
    payload.departmentId = parseInt(departmentId);
    payload.createdAt = currentISOTimestamp;
    payload.updatedAt = currentISOTimestamp;
    payload.type = 'team';

    return await db.setField(collectionName, payload);
}

team.update = async (req) => {
    const uid = parseInt(req.uid);
    const { id } = req.params;
    const { departmentId, organizationId } = req.body;

    const currentISOTimestamp = new Date(Date.now()).toISOString();
    const payload = {};

    const keys = {
        _id: ObjectId(id),
        uid,
        type: 'team',
        departmentId: parseInt(departmentId),
        organizationId: parseInt(organizationId),
    };

    ['name', 'description'].forEach((elem) => {
        if (req.body[elem]) {
            payload[elem] = req.body[elem];
        }
    });

    payload.updatedAt = currentISOTimestamp;

    /**
     * @author imshawan (27-09-2022)
     * @description A proper mechanism/logic has to be implemented for correctly identifying who is allowed to update a particular team
     * as of now I'm allowing only the creator of the team to update.
     */

    const resp = await db.updateField(collectionName, keys, { $set: payload }, { upsert: false });
    return { updated: resp && resp.result && resp.result.n === 1 };
}