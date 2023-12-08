'use strict';

const db = require('../database');
const User = require('../user');
const utilities = require('../controllers/utils');

const rigorbuilder = module.exports;

const collectionName = db.collections.RIGORBUILDER;


/**
 * @date 8-12-2022
 * @author Fardin
 * @description this CRUD functionalities of the the Rigor Builder required
 */

// Reasoning a statement
rigorbuilder.submitReason = async (req) => {
	const data = req.body;

	const statement = data.statement;
	const reason = data.reason;
	const rigor = data.rigor;

	const uid = parseInt(req.uid);
	const pid = await db.incrObjectField('global', 'nextPid');

	const createdAt = utilities.getISOTimestamp();
	const updatedAt = utilities.getISOTimestamp();

	const userFields = [
		'fullname',
		'username',
		'picture',
		'uploadedpicture',
		'email',
	];

	const userData = await User.getUserFields([uid], userFields);

	const payload = {
		uid,
		pid,
		statement,
		reason,
		createdAt,
		updatedAt,
		userData,
		type: 'reason',
	};

	const result = await db.setField(collectionName, payload);

	req.body.pid = result.pid;

	rigor && this.addReason(req);

	if (result) {
		return {
			status: 'success',
			message: 'RigorBuilder Reasoning successfully Created',
			data: payload,
		};
	}
};

// adding rigor
rigorbuilder.addReason = async (req) => {
	const data = req.body;
	const pid = parseInt(req.body.pid);

	const userFields = [
		'fullname',
		'username',
		'picture',
		'uploadedpicture',
		'email',
	];

	const userData = await User.getUserFields([req.uid], userFields);

	const payload = {
		_key: `rigor:${pid}`,
		uid: req.uid,
		rigor: data.rigor,
		type: 'rigor',
		createdAt: utilities.getISOTimestamp(),
		userData,
	};

	const result = await db.setField(collectionName, payload);

	if (result) {
		return {
			status: 'success',
			message: 'Rigor successfully added',
			data: result,
		};
	}
};

// getting single reasons
rigorbuilder.getReason = async (req) => {
	const pid = parseInt(req.params.pid);

	const keys = {
		_key: `rigor:${pid}`
	};

	return await db.findFields(collectionName, keys);
};

// getting all the reasons
rigorbuilder.getAllReasons = async (req) => {
	const keys = {
		type: 'reason'
	};
	req.query.uid && (keys.uid = parseInt(req.uid));

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [rigors, count] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);

	return utilities.paginate(`${req.url}`, rigors, count, limit, page);
};
