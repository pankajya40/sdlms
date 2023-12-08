'use strict';

const { ObjectId } = require('mongodb');
const { parse } = require('csv-parse');
const {
	createReadStream,
	unlink,
} = require('fs');
const db = require('../database');
const user = require('../user');
const utils = require('../controllers/utils');
const sdlms = require('./sdlms.api');
const adapters = require('../adapters');
const utilities = require('../controllers/utils');

const communication = module.exports;

/**
 * @date 01-09-2022
 * @author Ebrahim Aliyou
 * @description CRUD operation for Request and Template
 */

communication.createTemplate = async (req) => {
	const collectionName = db.collections.COMMUNICATION.TEMPLATE;

	var {
		isActive,
		context,
		status,
		content,
		templateName,
		compatibleChannel,
		entities,
	} = req.body;

	isActive = isActive && JSON.parse(isActive.toLowerCase());
	const currentTime = utilities.getISOTimestamp();

	const payload = {
		uid: req.uid,
		createdAt: currentTime,
		updatedAt: currentTime,
		type: 'template',
		status,
		context,
		isActive,
		content,
		templateName,
		compatibleChannel,
		entities,
	};

	return await db.setField(collectionName, payload);
};

communication.getTemplateByUid = async (req) => {
	const collectionName = db.collections.COMMUNICATION.TEMPLATE;

	const keys = {
		type: 'template',
		// uid: parseInt(req.uid),  anyone can see templates right?
	};

	if (req.params.templateId) {
		const templateId = ObjectId(req.params.templateId);
		keys._id = templateId;
	}

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [templates, count] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);
	// return templates;

	return utils.paginate(`/communication${req.url}`, templates, count, limit, page);
};

communication.getTemplate = async (req) => {
	const collectionName = db.collections.COMMUNICATION.TEMPLATE;

	const keys = {
		type: 'template',
		// isPublic: true,
	};

	if (req.query.own === 'true') {
		keys.uid = parseInt(req.uid);
		if (req.query.isPublic === 'false') {
			delete keys.isPublic;
		}
	}

	if (req.query.templateId) {
		keys._id = ObjectId(req.query.templateId);
	}

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [templates, count] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);

	return utils.paginate(`/communication${req.url}`, templates, count, limit, page);
};

communication.updateTemplate = async (req) => {
	const collectionName = db.collections.COMMUNICATION.TEMPLATE;
	const {templateId} = req.params;
	
	if (!req.uid) {
		throw new Error('uid is required');
	} else if (!templateId) {
		throw new Error('templateId is required');
	}
	
	
	const keys = {
		// uid: parseInt(req.uid),
		_id: ObjectId(templateId),
		type: 'template',
	};
	
	const currentTime = utilities.getISOTimestamp();
	const payload = {
		updatedAt: currentTime,
		// status,
		// context,
		// isActive,
		// content,
		// templateName,
		// compatableChannel,
		// entities,
	};

	const {isActive} = req.body;
	Object.keys(req.body)
		.forEach((ele) => {
			if (ele != undefined) {
				payload[ele] = req.body[ele];
			}
		});

	if (isActive) {
		payload['isActive'] = JSON.parse(isActive.toLowerCase());
	}

	const state = await db.updateField(collectionName, keys, { $set: payload });

	return {
		updated: state.result.n === 1,
	};
};

communication.deleteTemplate = async (req) => {
	const collectionName = db.collections.COMMUNICATION.TEMPLATE;

	if (!req.uid) {
		throw new Error('uid is required');
	} else if (!templateId) {
		throw new Error('templateId is required');
	}
	const templateId = ObjectId(req.params.templateId);

	const keys = {
		uid: parseInt(req.uid),
		_id: templateId,
		type: 'template',
	};

	const state = await db.deleteField(collectionName, keys);

	return {
		deleted: state.result.n === 1,
	};
};

communication.createRequest = async (req) => {
	const collectionName = db.collections.COMMUNICATION.REQUEST;

	if (!req.uid) {
		throw new Error('uid is required');
	}
	const {
		// status,
		// templateId,
		// accountId,
	} = req.body;

	const uid = parseInt(req.uid);
	// templateId = ObjectId(templateId);
	// accountId = ObjectId(accountId);

	const currentTime = new Date().getTime();

	const payload = {
		type: 'request',
		// templateId,
		uid,
		status: 'published',
		createdAt: currentTime,
		updatedAt: currentTime,
		label: req.body.subject,
		// accountId,
	};

	return await db.setField(collectionName, payload);
};

communication.updateRequest = async (req) => {
	const collectionName = db.collections.COMMUNICATION.REQUEST;

	if (!req.uid) {
		throw new Error('uid is required');
	} else if (!req.params.requestId) {
		throw new Error('requestId is required');
	}

	const requestId = ObjectId(req.params.requestId);
	const keys = {
		uid: parseInt(req.uid),
		requestId,
		type: 'request',
	};

	const currentTime = new Date();
	const payload = {
		updatedAt: currentTime,
		// status,
		// accountId,
		// templateId,
	};

	var {
		status,
		templateId,
		accountId,
	} = req.body;

	if (status != undefined) payload[status] = status;
	if (templateId != undefined) payload[templateId] = ObjectId(templateId);
	if (accountId != undefined) payload[accountId] = ObjectId(accountId);

	const state = await db.updateField(collectionName, keys, { $set: payload });

	return {
		updated: state.result.n === 1,
	};
};

// get all or a specific request
communication.getRequest = async (req) => {
	const collectionName = db.collections.COMMUNICATION.REQUEST;

	if (!req.uid) {
		throw new Error('uid is required');
	}

	const keys = {
		uid: parseInt(req.uid),
		type: 'request',
	};

	if (req.query.requestId) {
		const requestId = ObjectId(req.query.requestId);
		keys._id = requestId;
	}

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [requests, count] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);

	return utils.paginate(`/communication${req.url}`, requests, count, limit, page);
};

communication.deleteRequest = async (req) => {
	const collectionName = db.collections.COMMUNICATION.REQUEST;

	if (!req.uid) {
		throw new Error('uid is required');
	} else if (!requestId) {
		throw new Error('requestId is required');
	}

	const requestId = ObjectId(req.params.requestId);

	const keys = {
		uid: parseInt(req.uid),
		_id: requestId,
		type: 'request',
	};

	const state = await db.deleteField(collectionName, keys);

	return {
		deleted: state.result.n === 1,
	};
};

communication.getChannels = async (req) => {
	const collectionName = db.collections.COMMUNICATION.CHANNEL;

	if (!req.uid) {
		throw new Error('uid is required');
	}

	const channels = await db.findFields(collectionName, {
		type: 'channel',
		isActive: true,
	});
	return channels;
};


communication.getProviders = async (req) => {
	const collectionName = db.collections.COMMUNICATION.CHANNEL;

	if (!req.uid) {
		throw new Error('uid is required');
	}
	if (!req.query.channelId) {
		throw new Error('channelId is required');
	}

	const channelId = ObjectId(req.body.channelId);
	const keys = {
		channelId,
		type: 'provider',
		isActive: true,
	};

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [providers, count] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);

	return utils.paginate(`/communication${req.url}`, providers, count, limit, page);
};

communication.getAccounts = async (req) => {
	const collectionName = db.collections.COMMUNICATION.CHANNEL;

	if (!req.uid) {
		throw new Error('uid is required');
	}
	if (!req.query.channelId || !req.query.providerId) {
		throw new Error('channelId and providerId is required');
	}
	const keys = {
		channelId: ObjectId(req.body.channelId),
		providerId: ObjectId(req.body.providerId),
		type: 'account',
		isActive: true,
	};

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [accounts, count] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);

	return utils.paginate(`/communication${req.url}`, accounts, count, limit, page);
};

communication.createChannel = async (req) => {
	const collectionName = db.collections.COMMUNICATION.CHANNEL;

	if (!req.uid) {
		throw new Error('uid is required');
	}

	const {
		channelName,
		isActive,
	} = req.body;

	const uid = parseInt(req.uid);
	isActive = JSON.parse(isActive.toLowerCase()) || true;
	const currentTime = new Date();

	const payload = {
		uid,
		type: 'channel',
		channelName,
		isActive,
		createdAt: currentTime,
	};

	return await db.setField(collectionName, payload);
};

communication.createProvider = async (req) => {
	const collectionName = db.collections.COMMUNICATION.CHANNEL;

	if (!req.uid) {
		throw new Error('uid is required');
	}

	const {
		channelId,
		providerName,
		isActive,
	} = req.body;
	const uid = parseInt(req.uid);

	isActive = JSON.parse(isActive.toLowerCase()) || true;

	const payload = {
		uid,
		type: 'provider',
		channelId,
		providerName,
		isActive,
	};

	return await db.setField(collectionName, payload);
};

communication.createAccount = async (req) => {
	const collectionName = db.collections.COMMUNICATION.CHANNEL;

	if (!req.uid) {
		throw new Error('uid is required');
	}

	const {
		channelId,
		providerId,
		accountName,
		providerDetails,
		isActive,
	} = req.body;
	const uid = parseInt(req.uid);

	channelId = ObjectId(req.body.channelId);
	providerId = ObjectId(req.body.providerId);
	isActive = JSON.parse(isActive.toLowerCase()) || true;

	const payload = {
		uid,
		type: 'account',
		channelId,
		providerId,
		accountName,
		providerDetails,
		isActive,
	};

	return await db.setField(collectionName, payload);
};

communication.updateAccount = async (req) => {
	const collectionName = db.collections.COMMUNICATION.CHANNEL;

	if (!req.uid) {
		throw new Error('uid is required');
	} else if (!req.body.AccountId) {
		throw new Error('accountId is required');
	}

	const keys = {
		uid: parseInt(req.uid),
		accountId: ObjectId(req.body.accountId),
	};

	const payload = {
		// accountName,
		// providerDetails,
		// isActive,
	};

	const {
		accountName,
		providerDetails,
		isActive,
	} = req.body;

	Object.keys(req.body)
		.forEach((key) => {
			if (req.body[key] != undefined) {
				payload[key] = req.body[key];
			}
		});

	if (payload[isActive]) JSON.parse(isActive.toLowerCase()) || true;

	const state = await db.updateField(collectionName, keys, { $set: payload });

	return {
		updated: state.result.n === 1,
	};
};

communication.createReport = async (req) => {
	const collectionName = db.collections.COMMUNICATION.REPORT;

	// if (!req.body.channelId || !req.body.providerId) {
	// 	throw new Error('channel channelId and providerId is required');
	// }

	const {
		// requestId,
		// accountId,
		name,
		contact,
		message,
		requestId,
		accountId,
		uid,
		// templateId,
	} = req;

	// the status is determined after sending the message
	// the deliveredAt is determined after the message is delivered
	// the ReadAt is determined after the message is read
	// the providerReferenceId is determined after the message is sent and we get the return from the the provider

	// requestId = ObjectId(requestId);
	// accountId = ObjectId(accountId);
	// templateId = ObjectId(templateId);

	const currentTime = new Date().getTime();

	const payload = {
		uid,
		type: 'report',
		name,
		requestId,
		accountId,
		contact,
		message,
		// templateId,
		status: 'sent',
		createdAt: currentTime,
		deliveredAt: currentTime,
		// readAt: currentTime, // just for placeholder
		// providerReferenceId: { id: '1234567890' }, // just for placeholder
	};

	return await db.setField(collectionName, payload);
};

// get reports by requestId
communication.getReports = async (req) => {
	const collectionName = db.collections.COMMUNICATION.REPORT;

	const keys = {
		type: 'report',
	};

	if (req.query.requestId) keys.requestId = ObjectId(req.query.requestId);

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [reports, count] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);

	return utils.paginate(`/communication${req.url}`, reports, count, limit, page);
};

// crud for error db
communication.createError = async (data) => {
	const collectionName = db.collections.COMMUNICATION.ERROR;

	const {
		requestId,
		// accountId,
		name,
		contact,
		message,
		errorMessage,
		// templateId,
	} = data;

	const uid = parseInt(data.uid);
	requestId = ObjectId(requestId);
	const currentTime = new Date().getTime();

	const payload = {
		uid,
		contact,
		type: 'error',
		requestId,
		contact,
		errorMessage,
		createdAt: currentTime,
	};

	return await db.setField(collectionName, payload);
};

communication.getErrors = async (req) => {
	const collectionName = db.collections.COMMUNICATION.ERROR; // just a placeholder

	// auth the user for the request

	if (!req.uid) {
		throw new Error('uid is required');
	}
	const keys = {
		type: 'error',
	};

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [errors, count] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);

	return utils.paginate(`/communication${req.url}`, errors, count, limit, page);
};


// requeires a schema
communication.getVariablesByContext = async (req) => {
	const collectionName = db.collections.COMMUNICATION.VARIABLE;

	if (!req.query.context) {
		throw new Error('context is required');
	}

	const keys = {
		context: req.query.context,
	};

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [variables, count] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);

	return utils.paginate(`/communication${req.url}`, variables, count, limit, page);
};

/**
 * @date 03-10-2022
 * @author Fardin Kamal
 * @description base function for CPaaS
 */

const tbData = async (req, tid, uid) => {
	const data = {
		uid: req.uid,
		params: { tid: tid },
		query: { uid: uid },
	};
	const response = await sdlms.getThreadBuilderByUid(data);
	return response.stats.count;
};

const ebData = async (req, tid, uid) => {
	const data = {
		uid: req.uid,
		params: { tid: tid },
		query: { uid: uid },
	};
	const response = await sdlms.getEagleBuilder(data);
	return response.stats.count;
};

const getSessionData = async (req, tid) => {
	const data = [];
	const mentor = [];

	// getting session of a given batch by cid( batch id)
	const sessions = await db.findField(db.collections.DEFAULT, {
		tid: tid,
		type: 'session',
	});

	mentor.push({
		uid: sessions.teacher.uid,
		mentorName: sessions.teacher.fullname,
	});
	// attendance uid
	const attendance = [];
	const tb = [];
	const eb = [];
	for (let i = 0; i < sessions.members.length; i++) {
		attendance.push(parseInt(sessions.members[i], 10));
		tb.push(await tbData(req, tid, parseInt(sessions.members[i])));
		eb.push(await ebData(req, tid, parseInt(sessions.members[i])));
	}
	const userFields = ['fullname', 'email'];
	var members = await user.getUsersFields(attendance, userFields); // attended student info
	// store user data
	for (let i = 0; i < members.length; i++) {
		data.push({
			uid: members[i].uid,
			fullName: members[i].fullname,
			email: members[i].email,
			tbCount: tb[i],
			ebCount: eb[i],
			// assetsCount: 0,
		});
	}

	return data;
};

communication.listCohort = async () => {
	const collectionName = db.collections.DEFAULT;
	const cohort = await db.findFields(collectionName, { type: 'cohort' }, ['name']);
	return cohort;
};

communication.listSession = async () => {
	const collectionName = db.collections.DEFAULT;
	const fields = ['topic', 'tid'];
	const session = await db.getFieldsWithPagination(collectionName, { type: 'session' }, 5, 0, { schedule: -1 });
	// return session;
	return session.map((record) => {
		const fieldData = {};
		fields.forEach((field) => {
			if (record[field]) fieldData[field] = record[field];
		});
		return fieldData;
	});
};

const getUserDataFromUid = async (uidArray) => {
	const userFields = ['fullname', 'email', 'username'];
	return await user.getUsersFields(uidArray, userFields);
};

function removeDuplicates(arr) {
	return [...new Set(arr)];
}

communication.getUidByCohort = async (req) => {
	const collectionName = db.collections.DEFAULT;
	var uid = [];

	const uids = await db.findFields(collectionName, { _key: `group:${req.query.name}:members` });

	uids.forEach((a) => {
		function comma(s) {
			var match = s.split(',');
			match.forEach(b => uid.push(b));
		}

		a.value.indexOf(',') > -1 ? comma(a.value) : uid.push(a.value);
	});

	return getUserDataFromUid(removeDuplicates(uid));
};

const sendMessageToSession = async (text, context, req, tid) => {
	const members = await getSessionData(req, tid);

	for (let i = 0; i < members.length; i++) {
		if (context.indexOf('tbData') > -1) {
			members[i].tb = await tbData(req, tid, parseInt(members[i]));
		}
		if (context.indexOf('ebData') > -1) {
			members[i].eb = await ebData(req, tid, parseInt(members[i]));
		}
	}
	return members;
};

const sendMessageToCohort = async (uidArray) => {
	const members = await getUserDataFromUid(uidArray);
	return members;
};

// main function
var members; // userdata
communication.sendMessage = async (req) => {
	const uid = req.body.uidArray;
	const text = req.body.text;
	const subject = req.body.subject;
	const channel = req.body.channel;
	const context = ['ebData', 'tbData'];

	// tid for getting session data
	let tid;
	if (req.body.session !== 'Session' && req.body.session !== undefined) {
		tid = parseInt(req.body.session);
	}


	// send message to session
	if (tid !== undefined) {
		members = await sendMessageToSession(text, context, req, tid);
	}

	// send message to cohort
	if (req.body.cohort !== 'Cohort' && req.body.cohort !== undefined) {
		if (req.body.uidArray === undefined) {
			return 'No recipient selected';
		}
		const uidArray = [];
		uid.forEach((u) => {
			uidArray.push(parseInt(u));
		});
		members = await sendMessageToCohort(uidArray, text, subject);
	}
	if (members === undefined) {
		members = await getUserDataFromUid(uid);
	}
	await adapter(members, text, subject, channel, req);
};

const adapter = async (members, text, subject, channel, req) => {
	const { _id } = await this.createRequest(req);
	const {templateId} = req.body;

	if (channel.indexOf('email') > -1) {
		await adapters.email.sendEmail(members, text, subject, _id, req);
	}
	if (channel.indexOf('whatsapp') > -1) {
		return await adapters.whatsapp.sendMessages(templateId)
	}
	// if (channel.indexOf('sms') > -1) {
	// 	return await adapters.sms.sendSMS();
	// }
};

// searchbar api
communication.search = async (req) => {
	const collectionName = db.collections.DEFAULT;
	const keys = {
		topic: { $regex: new RegExp('^' + req.query.search + '.*', 'i') },
	};
	const result = await db.getFieldsWithPagination(collectionName, keys, 5, 0, { schedule: -1 });
	const search = [];
	for (let i = 0; i < result.length; i++) {
		search.push({
			topic: result[i].topic,
			teaser: result[i].teaser,
		});
	}
	return search;
};

// handling csv file
communication.sendMessagesCSV = async (req) => {
	const {
		text,
		channel,
		broadcastName, subject
	} = req.body;

	var products = [];
	(() => {
		const readStream = createReadStream(req.files.csv.path, 'utf8');

		readStream
			.pipe(
				parse({
					delimiter: ',',
					columns: true,
					trim: true,
				})
			)
			.on('data', (chunk) => {
				products.push(chunk);
			});

		readStream.on('error', (err) => {
			console.log(err);
		});

		readStream.on('end', async () => {
			unlink(req.files.csv.path, (err) => {
				if (err) {
					throw err;
				}
			});
			await adapter(products, text, subject, channel, req);
		});
	})();
};
