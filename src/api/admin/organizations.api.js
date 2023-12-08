const db = require('../../database');
const Uploader = require('../../controllers/FIleUpload');
const utils = require('../../controllers/utils');

const { constants } = require('../../constants');
const { SDLMS } = constants;
const collectionName = db.collections.SDLMS.ORGANIZATION;
const organizationFields = ['name', 'sector', 'employeeRange', 'website', 'about', 'location', 'image', 'socialLinks', 'email', 'phoneNumber', 'leaders'];
const { log } = console;

const organization = module.exports

organization.get = async (req) => {
    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
    let [organizationData, count] = [[], 0];
    const keys = {
		type: "organization",
	}

    if (req.query.id) {
		organizationData = await db.findField(collectionName, 
            { ...keys, organizationId: parseInt(req.query.id) });

        if (organizationData) {
            delete organizationData.adminUids;
    
            organizationData = [organizationData];
            count = 1;
        } else {
            organizationData = [];
        }
	} else {
        [organizationData, count] = await Promise.all([
			db.getFieldsWithPagination(collectionName, keys, limit, page),
			db.countDocuments(collectionName, keys),
		]);
        if (organizationData) {
            organizationData = organizationData.map((elem) => {
                delete elem.adminUids;
                return elem;
            });
        }
        else {
            organizationData = [];
        }
    }

    
    return utils.paginate(`/sdlms/admin${req.url}`, organizationData, count, limit, page);
}

organization.create = async (req) => {
    const uid = parseInt(req.uid);
    const { type } = req.body;

    if (!SDLMS.organizationTypes.includes(type)) {
        throw new Error('Invalid organization type: ' + type);
    }

    const organizationId = await db.incrObjectField('global', 'organizationId');
    const currentTimestamp = Date.now();
    let orgType = type.toLowerCase();

    const payload = {
        _key: `organization:${orgType}:${organizationId}`,
        uid,
        organizationId,
        location: [],
        image: [],
        socialLinks: [],
        email: [],
        phoneNumber: [],
        leaders: [],
    };

    ['name','sector', 'employeeRange', 'website', 'about'].forEach((elem) => {
        if (req.body[elem]) {
            payload[elem] = req.body[elem];
        }
    });

    ['location', 'image', 'socialLinks', 'email', 'phoneNumber', 'leaders'].forEach((elem) => {
        let element = req.body[elem];
        if (element && Array.isArray(element)) {
            payload[elem] = element; 
        }
    });

    payload.adminUids = [uid];
    payload.createdAt = currentTimestamp;
    payload.updatedAt = currentTimestamp;
    payload.organizationType = type;
    payload.organizationTypeRaw = orgType;
    payload.type = 'organization';

    await db.setField(collectionName, payload);
    return { success: true, organizationId };
}

organization.update = async (req) => {
    const uid = parseInt(req.uid);
    const { type } = req.body;
    const { id } = req.params;

    let Id = id;
    if (!SDLMS.organizationTypes.includes(type)) {
        throw new Error('Invalid organization type: ' + type);
    }
    let orgType = type.toLowerCase();

    const organizationData = await db.findField(collectionName, {type: "organization", organizationId: parseInt(Id)});
    if (!organizationData) {
        throw new Error('Invalid organizationId supplied!');
    }
    if (!organizationData.adminUids.includes(uid)) {
        throw new Error('Only the admins/manager of the page has the access to modify details');
    }

    let payload = {};
    const uploadedImages = {};
    const keys = {
        organizationId: parseInt(Id),
        type: 'organization'
    };

    organizationFields.forEach((field) => {
        if (req.body[field]) {
            payload[field] = req.body[field];
        }
    })

    if (payload['leaders'].length) {
        let leaders = organizationData['leaders'] || [];
        payload['leaders'].forEach((elem) => {
            let id = elem.id && elem.id != '' ? elem.id : utils.generateUUID();
            leaders = updateObject(leaders, {...elem, id}, 'id', id)
        })
        payload['leaders'] = leaders;
    }

    if (req.files && req.files.files) {
		const uploads = await Uploader.uploadContent(req)
		if (uploads && uploads.length !== 0) {
			uploads.forEach((file) => {
				uploadedImages[file.field] = file.url
			})
		}
	}
    if (uploadedImages) {
        let imageFields = {
            image: organizationData['image'] || [],
            leaders: payload['leaders'] || []
        };
        for (const key in uploadedImages) {
            if (Object.hasOwnProperty.call(uploadedImages, key)) {
                const url = uploadedImages[key];

                let field = key.split('_')[0];
                let val = key.split('_')[1];

                if (field == 'image') {
                    imageFields[field] = updateObject(imageFields[field], {image: url, type: val}, 'type', val);
                } 
                if (field == 'leaders') {
                    let id = key.split('_')[2] || utils.generateUUID();
                    imageFields[field] = updateObject(imageFields[field], {image: url, id}, 'id', id);
                }
            }
        }
        payload = {...payload, ...imageFields};
    }
    
    payload.updatedAt = Date.now();
    payload.organizationType = type;
    payload.organizationTypeRaw = orgType;

    const resp = await db.updateField(collectionName, keys, { $set: payload }, { upsert: false });
    return { updated: resp && resp.result && resp.result.n === 1 };
}

organization.delete = async (req) => {
    const loggedInUID = parseInt(req.uid);
    const { id } = req.params;
    let organizationId = parseInt(id);

    const organizationData = await db.findField(collectionName, {type: "organization", organizationId});
    if (!organizationData) {
        throw new Error('Invalid organizationId supplied!');
    }
    if (organizationData.adminUids.includes(loggedInUID)) throw new Error('Only the admins are allowed to delete this page');

    const state = await db.removeField(collectionName, {type: "organization", organizationId});
	return { deleted: state.result.n === 1 };
}

organization.manageMemberRoles = async (req) => {
    const loggedInUID = parseInt(req.uid);
    const { id } = req.params;
    let { action, users } = req.body;
   
    if (!Array.isArray(users)) {
        throw new Error(`users property must be an array, received: ${typeof users}`);
    }

    // if (action == 'add' && !role) {
    //     throw new Error('Role is required');
    // }

    const organizationData = await db.findField(collectionName, {type: "organization", organizationId: parseInt(id)});
    if (!organizationData) {
        throw new Error('Invalid organizationId supplied!');
    }
    if (!organizationData.adminUids.includes(loggedInUID)) {
        throw new Error('Only the admins/manager of the organization has the access to manage membership and roles');
    }

    await Promise.all(users.map( async (elem) => {
        await manageMembership(elem.uid, id, elem.role || '', action);
    }));
}

async function manageMembership (uid, organizationId, role='', action) {
    organizationId = parseInt(organizationId);
    uid = parseInt(uid);

    const validActions = ['add', 'remove'];
    const keys = {type: "organization", organizationId};
    if (!validActions.includes(action)) {
        throw new Error('Invalid Action: ' + action);
    }

    let adminpPayload = { $addToSet: { 'adminUids': uid } };
    let userPayload = {
        organization: {
            organizationId,
            role,
            roleRaw: role ? role.toLowerCase().replace(' ', '_') : '',
        }
    };
    if (action == 'remove') {
        adminpPayload = { $pull: { 'adminUids': uid } };
        userPayload = {
            organization: {}
        };
    }

    if (role == 'administrator') {
        await db.updateField(collectionName, keys, adminpPayload, { upsert: false });
    }

    const resp = await db.updateField(db.collections.DEFAULT, {_key: `user:${uid}`}, {$set: userPayload}, { upsert: false });
    return { updated: resp && resp.result && resp.result.n === 1 };
}

function updateObject (data=[], updateObj={}, field, unique) {
    if (data) {
        let dataField = data.find((item) => item[field] == unique) || {};
        dataField = {...dataField, ...updateObj};

        data = data.filter((item) => item[field] != unique);
        data = [ ...data, dataField];
    } else {
        data.push(updateObj);
    }
    return data;
}

organization.getMembers = async (req) =>{
    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    const { id } = req.params;
    let organizationId = parseInt(id);

    const keys = {
        'organization.organizationId':organizationId
    }
    var [membersData,membersDataCount] = await Promise.all([
        db.getFieldsWithPagination(db.collections.DEFAULT, keys ,limit,page),
        db.countDocuments(db.collections.DEFAULT, keys)
    ]); 

    membersData = membersData.map((user) =>{
        const obj = {};
        obj.uid = user.uid;
        obj.username = user.username;
        obj.fullname = user.fullname;
        obj.userslug = user.userslug;
        obj.picture = user.picture;
        obj.signature = user.signature;
        obj.aboutme = user.aboutme;
        obj.userType = user.userType;
        obj.organization = user.organization;
        return obj;
    });
    
    return utils.paginate(`/sdlms/admin${req.url}`, membersData, membersDataCount, limit, page);
}