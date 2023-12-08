'use strict';

const db = require('../database');
const User = require('../user');
const utilities = require('../controllers/utils');

const maturitybuilder = module.exports;

const collectionName = db.collections.MATURITYBUILDER;


/**
 * @date 25-02-2023
 * @author Fardin Kamal
 * @description this CRUD functionalities of the the Maturity Builder required
 */

maturitybuilder.allIncidents = async (req) => {
		const keys = {
			type: 'incident'
		};
		req.query.uid && (keys.uid = parseInt(req.uid));

		const page = parseInt(req.query.page) || 0;
		const limit = parseInt(req.query.limit) || 5;

		const [incidents, count] = await Promise.all([
			db.getFieldsWithPagination(collectionName, keys, limit, page),
			db.countDocuments(collectionName, keys),
		]);

		return utilities.paginate(`${req.url}`, incidents, count, limit, page);
}

maturitybuilder.getIncident = async (req) => {
	const pid = parseInt(req.params.pid);

	const keys = {
		_key: `nudge:${pid}`
	};

	return await db.findFields(collectionName, keys);
}

maturitybuilder.submitIncident = async (req) => {
	const data = req.body;

	const incident = data.incident;
	const rootbehaviour = data.rootbehaviour;
	const nudge = data.nudge;

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
		incident,
		rootbehaviour,
		createdAt,
		updatedAt,
		userData,
		type: 'incident',
	};

	const result = await db.setField(collectionName, payload);

	req.body.pid = result.pid;

	nudge && this.addNudge(req);

	if (result) {
		return {
			status: 'success',
			message: 'Incident Successfully Created',
			data: payload,
		};
	}
};

maturitybuilder.addNudge = async (req) => {
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
		_key: `nudge:${pid}`,
		uid: req.uid,
		nudge: data.nudge,
		type: 'nudge',
		createdAt: utilities.getISOTimestamp(),
		userData,
	};

	const result = await db.setField(collectionName, payload);

	if (result) {
		return {
			status: 'success',
			message: 'Nudge successfully added',
			data: result,
		};
	}

};
