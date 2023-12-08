"use strict";

const db = require('../../../database');
const User = require('../../../user');
const utilities =  require('../../../controllers/utils');
const { ObjectId } = require('mongodb');

const leaveFields = ['from', 'to', 'reason', 'teamName', 'description', 'deliverables', 'assignee', 'requestedTo', 'totalLeaveHours'];
const profileFields = ['rolls', 'internshipType', 'joiningDate', 'commitedHours', 'honororium', 'currency', 'accountNuber', 'ifscCode'];
const approvalFields = ['status', 'reason'];
const allowedAprrovalStatus = ['accepted', 'rejected'];

const collectionName = db.collections.PDGMS.LEAVES;
const userFields = [
    "username",
    "fullname",
    "userslug",
    "picture",
];

const leavesTrackerApi = module.exports;


leavesTrackerApi.getHolidayList = async function (req) {
    const uid = parseInt(req.uid);

    const { items } = await db.findField(collectionName, {type: 'holidays'});

	return utilities.paginate(`/pdgms${req.url}`, items, items.length -1, items.length, 0);
}


leavesTrackerApi.createHolidays = async function (req) {}


leavesTrackerApi.updateHolidays = async function (req) {}


leavesTrackerApi.updateProfile = async function (req) {
	const uid = parseInt(req.uid);
    const { joiningDate } = req.body;

    const payload = {uid};

    profileFields.forEach((field) => {
        if (req.body[field]) {
            payload[field] = req.body[field];
        }
    });

    payload.joiningDateRaw = new Date(joiningDate).getTime();
    payload.updatedAt = new Date(Date.now()).getTime();
    payload.type = 'profile';
    
    return await db.updateField(collectionName, {uid, type: 'profile'}, {$set: payload}, {upsert: true});
}


leavesTrackerApi.getLeaves = async function (req) {
	const uid = parseInt(req.uid);
    const { type } = req.query;

    const keys = {
        uid,
        type: 'leave'
    };
    const order = { _id: -1 };

    if (type) {
        if (type == 'previous') {
            keys.toRaw = { $lt: Date.now() };
            keys.reviewed = {$eq: true}
        } else if (type == 'applied') {
            keys.reviewed = {$ne: true}
        }
    }

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [leaves=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    let leavesData = await Promise.all(leaves.map( async (element) => {
        if (element.requestedTo && !isNaN(element.requestedTo)) {
            let [requestedTo, leaveStatus={}] = await Promise.all([
                User.getUserFields(element.requestedTo, userFields),
                db.findField(collectionName, { leaveId: ObjectId(element._id)})
            ])
            if (leaveStatus && Object.keys(leaveStatus).length) {
                leaveStatus.status = utilities.capitalizeFirstLetter(leaveStatus.status);
            } else {
                leaveStatus = {
                    status: 'Pending'
                }
            }
            return {...element, requestedTo, status: leaveStatus}
        } else {
            return element;
        }
    }))

	return utilities.paginate(`/pdgms${req.url}`, leavesData, count, limit, page);
}


leavesTrackerApi.createLeaveApplication = async function (req) {
    const uid = parseInt(req.uid);
    const payload = {uid};

    leaveFields.forEach((field) => {
        payload[field] = req.body[field] || null;
    })

    payload.requestedTo = parseInt(req.body.requestedTo);
    payload.fromRaw = new Date(payload.from).getTime();
    payload.toRaw = new Date(payload.to).getTime();
    payload.appliedAt = Date.now();
    payload.status = 'Pending';
    payload.approvedBy = null;
    payload.reviewed = false;
    payload.type = 'leave';
    
    return await db.setField(collectionName, payload);
}


leavesTrackerApi.deleteLeaveApplication = async function (req) {
    const { id } = req.params;
    const keys = {_id: ObjectId(id)}

    let application = await db.findField(collectionName, keys);
    if (!application) {
        throw new Error('No leave application was found with the supplied Id');
    }

    if (application.uid != parseInt(req.uid)) {
        throw new Error('You are not authorized to delete this application');
    }
    
    let state = await db.removeField(collectionName, {...keys, uid});
    return { deleted: state.result.n === 1 };
}


leavesTrackerApi.getLeaveRequestList = async function (req) {
    const uid = parseInt(req.uid);
    const keys = {
        requestedTo: uid,
        reviewed: {$ne: true},
        type: 'leave'
    };
    const ORDER = { _id: -1 }; // GET the latest ones first in order

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [leaves=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, ORDER),
		db.countDocuments(collectionName, keys),
	]);

    let approvalData = await Promise.all(leaves.map( async (element) => {
        if (element.uid) {
            let userData = await User.getUserFields(element.uid, userFields);
            return {...element, user: userData};
        } else {
            return element;
        }
    }))
    
	return utilities.paginate(`/pdgms${req.url}`, approvalData, count, limit, page);
}


leavesTrackerApi.approveLeaves = async function (req) {
    const uid = parseInt(req.uid);
    const { id } = req.params;
    const { status } = req.body;
    const payload = {uid};
    const keys = {
        _id: ObjectId(id)
    };
    const reviewed = true;

    let leaveApplication = await db.findField(collectionName, keys);
    if (!leaveApplication) {
        throw new Error('No leave application was found with the supplied application Id');
    }

    let { requestedTo } = leaveApplication; 
    if (requestedTo != uid) {
        throw new Error("You are not authorized to approve this leave as it was not requested to you");
    }

    if(!(allowedAprrovalStatus.includes(status))){
        throw new Error('Invalid status! Valid statuses are: ' + allowedAprrovalStatus.join(', '));
    }

    approvalFields.forEach((fields) => {
        payload[fields] = req.body[fields] || null;
    })

    payload.leaveId = leaveApplication._id;
    payload.reviewedAt = new Date(Date.now()).getTime();
    payload.type = 'leave:status';
    
    await Promise.all([
        db.updateField(collectionName, {leaveId: ObjectId(id)}, {$set: payload}, {upsert: true}),
        db.updateField(collectionName, keys, {$set: {reviewed, approvedBy: uid}}),
    ]);

    return {reviewed};
}


leavesTrackerApi.getPreviousApprovals = async function (req) {
    const uid = parseInt(req.uid);
    const keys = {
        uid,
        type: 'leave:status'
    };
    const ORDER = { _id: -1 }; // GET the latest ones first in order

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [approvals=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, ORDER),
		db.countDocuments(collectionName, keys),
	]);

    let approvalData = await Promise.all(approvals.map( async (element) => {
        let leaveData = {},
        userData = {};

        leaveData = await db.findField(collectionName, {_id: ObjectId(element.leaveId)});
        if (leaveData) {
            userData =  await User.getUserFields(leaveData.uid, userFields);
        }
        element.status = utilities.capitalizeFirstLetter(element.status);
        return {...element, user: userData, leave: leaveData};
    }))
    
	return utilities.paginate(`/pdgms${req.url}`, approvalData, count, limit, page);
}


leavesTrackerApi.peopleOnLeave = async function (req) {
    const currentTime = Date.now();
    const keys = {
        type: 'leave',
        fromRaw: {$lte: currentTime},
        toRaw: {$gte: currentTime},
        reviewed: {$ne: false}
    };
    const order = { _id: -1 };

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [leaves=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);
    
    let leavesData = await Promise.all(leaves.map( async (element) => {
        let [approvedBy, leaveStatus={}, requestedBy] = await Promise.all([
            User.getUserFields(element.approvedBy, userFields),
            db.findField(collectionName, { leaveId: ObjectId(element._id)}),
            User.getUserFields(element.uid, userFields),
        ])
        leaveStatus.status = utilities.capitalizeFirstLetter(leaveStatus.status);
        return {...element, approvedBy, requestedBy, status: leaveStatus}
    }))

	return utilities.paginate(`/pdgms${req.url}`, leavesData, count, limit, page);
}

leavesTrackerApi.getOrganizationStatistics = async (req) => {
    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
    const {from, to} = req.query;

    let query = {$match: {type: 'leave'}};

    const pipeline = [query, {
        $group: {
           _id: '$uid',
           leaveData: {$push: {from: '$fromRaw', to: '$toRaw', totalHours: '$totalLeaveHours'}},
           count: {$count: {}}
        },
      }];
    

    let leaves = await db.Aggregate(collectionName, pipeline);
    let leavesData = [];
    
    if (leaves) {
        leavesData = await Promise.all(leaves.map(async (el) => {
            
            let userData = await User.getUserFields(el._id, ["username", "fullname"]);
            return { ...el, user: userData};
        }));
    }

    return utilities.paginate(`/pdgms${req.url}`, leavesData, 0, limit, page);
}