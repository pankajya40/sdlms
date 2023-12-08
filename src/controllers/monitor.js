"use strict";

const winston = require("winston");
const db = require("../database");
const user = require("../user");
const helpers = require('../controllers/helpers');
const groups = require('../groups');
const privileges = require('../privileges');
const async = require('async');
const moment = require('moment');

const monitorBoardController = module.exports;

monitorBoardController.get = async function (req, res, next) {
	const uid = parseInt(req.uid);
	// if (!req.uid || uid < 1) { throw new Error("Unauthorized"); }
	if (!uid) {
		return res.redirect(`/login`);
	}
	const fields = [
		"uid",
		"username",
		"fullname",
		"userslug",
		"picture",
		"status",
		"assetsCount",
		"classes_attended",
		"signature"
	]
	const monitorBoardData = {};
	const collectionName = db.collections.DEFAULT;
	const keys = {
		type: 'session',
		members: {$all:[parseInt(uid)]},
		state : { $ne: 'stop' }
		// ended_on : {
		// 	$gt: Date.now()
		// },
		// schedule: { $gte: Date.now() - 3600000 }
	}

	var [userData, userGroupData, isTeacher, isStudent, Sessions,
		feedbacksReceivedCount, feedbacksGivenCount] = await Promise.all([
		user.getUsersFields([req.uid], fields),
		groups.getUserGroups([req.uid]),
		privileges.users.isTeacher(req.uid),
		privileges.users.isStudent(req.uid),
		db.getFieldsWithPagination(collectionName, keys, 1, 0, { schedule: 1 }),
		db.countDocuments(collectionName, { type: 'feedback', asset_owner_uid: uid }),
		db.countDocuments(collectionName, { type: 'feedback', creator: uid })
	])

	userGroupData = userGroupData[0];
	const userGroupNames = userGroupData.filter(Boolean).map(group => group.name);
	userData[0].userGroups = userGroupNames;

	monitorBoardData.title = "Monitor Board";
	monitorBoardData.user = userData;
	/**
	 * @date 10-01-2023
	 * @author imshawan
	 * @description Making everyone a teacher, based on requirements by subhangi & merwin
	 */
	monitorBoardData.isTeacher = true;
	monitorBoardData.isStudent = isStudent;
	monitorBoardData.feedbackCount = feedbacksReceivedCount + feedbacksGivenCount;
	monitorBoardData.Sessions = Sessions[0] || {};

	try {
		const latest_session_tid = monitorBoardData.Sessions.tid;
		monitorBoardData.ebMapped = monitorBoardData.Sessions.sessionTracker || false;
	} catch { }

	res.render("sdlms/monitor", monitorBoardData);
};

monitorBoardController.create = async function (req, res, next) {
	const collectionName = db.collections.DEFAULT;

	//	The sharer link should basically never expire, therefore we set it to atleast 1 month,
	//	so that it can be used for a long time

	req.body.link_expiry = Date.now() + (1000 * 60 * 60 * 24 * 30);

	let autoStart = req.body.autoStart;

	const teacher_uid = parseInt(req.body.teacher_uid || req.uid);
	const classCid = parseInt(req.body.classCategoryId);
	const batchCid = parseInt(req.body.batchCategoryId);
	const mode = req.body.mode;
	const teacherData = await user.getUserFields([teacher_uid], [
		"username",
		"fullname",
		"userslug",
		"picture",//! what if teacher in future updates his photo?
		"status"
	])
	const category = await db.findField(collectionName, { cid: classCid, categoryType: { $exists: true } })
	const sub_category = await db.findField(collectionName, { cid: batchCid, categoryType: 'batch' })
	if (!category) { throw new Error('Invalid Class Cid') }
	if (!sub_category) { throw new Error('Invalid Batch Cid') }

	if (category && category.categoryType != 'class') {
		throw new Error(`Invalid Class cid: ${classCid}, maybe its not a category with the type class`)
	}
	if (sub_category && sub_category.parentCid != classCid) {
		throw new Error(`Invalid Batch cid or maybe its not a part of the class (class category) with cid: ${classCid}`);
	}

	//let members = Array.isArray(JSON.parse(req.body.members)) ? JSON.parse(req.body.members) : [];
	let members = Array.isArray(req.body.members) ? req.body.members : JSON.parse(req.body.members);

	if(!members.find(elem => elem == teacher_uid)) members.push(teacher_uid);

	members = members.map(member => parseInt(member));

	const tid = await db.incrObjectField('global', 'nextTid');
	const currentTime = Date.now();

	let sharePayload = {};
	sharePayload.name = "sharer";
	sharePayload.tid =  await db.incrObjectField('global', 'nextTid');;
	sharePayload.type = "class";
	sharePayload.parent_id = tid;
	sharePayload.mode = mode;
	sharePayload.members = members;
	sharePayload.expireAt = (req.body.link_expiry && req.body.link_expiry > currentTime) ? req.body.link_expiry : currentTime + 86400000;
	var _now = currentTime;
	var uuid = "xxxxxxxx-yxxx-yxxx-yxxx".replace(/[xy]/g, (c) => {
		var r = (_now + Math.random() * 16) % 16 | 0;
		_now = Math.floor(_now / 16);
		return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
	});
	sharePayload.uuid = uuid + '-' + currentTime;
	sharePayload.pid  = await db.incrObjectField('global', 'nextPid')

	await db.setField(collectionName, sharePayload);


	let payload = {
		uid: parseInt(req.uid),
		tid: parseInt(tid),
		type: "session",
		classCategoryId: classCid,
		category: category.name, // Class category name
		batchCategoryId: batchCid,
		sub_category: sub_category.name, // Batch category name
		topic: req.body.topic ? req.body.topic : "",
		teacher_uid: teacher_uid,
		teacher: teacherData,
		teaser: req.body.teaser,
		relatedSessions: req.body.relatedSessions ? req.body.relatedSessions : 'No related sessions',
		schedule: parseInt(req.body.schedule),
		ended_on: parseInt(req.body.ended_on),
		members: members,
		session_type: req.body.session_type,
		teaching_style: req.body.teaching_style,
		TeachingStyleId: req.body.TeachingStyleId,
		quizzes: req.body.quizzes ? req.body.quizzes : [],
		sharer:{
			link:`/sharer?id=${sharePayload.uuid}`,
			id:sharePayload.uuid,
			expireAt: sharePayload.expireAt,
			count:0
		},
		/**
		* @author: Shubham Bawner
		* @description: total no of of questions, answers, root of thoughts, words spoken, ... in all TBs of the session
		*/
		sessionSubthreadStats :{},
		createdAt: currentTime,
		updatedAt: currentTime,
	}
	if(autoStart){
		payload.isLive = true;
		payload.schedule = Date.now();
		payload.ended_on = Date.now() + (1000 * 60 * 60);
	}
	const resp = await db.setField(collectionName, payload);



	helpers.formatApiResponse(200, res, { tid: tid,sharer:sharePayload, ...resp });
}

monitorBoardController.update = async function (req, res, next) {
	const payload = {};
	const key = {
		tid: parseInt(req.body.tid),
		type: "session"
	}
	if (req.body.topic) {
		payload.topic = req.body.topic;
	}
	if (req.body.teaser) {
		payload.teaser = req.body.teaser;
	}
	if (req.body.teaching_style) {
		payload.teaching_style = req.body.teaching_style;
	}
	if (req.body.schedule) {
		payload.schedule = parseInt(req.body.schedule);
	}
	payload.updatedAt = Date.now();

	await monitorBoardController.updateStats(parseInt(req.body.tid))

	helpers.formatApiResponse(200, res, await update(key, payload));
}
/**
 * @author: Shubham Bawner
 * @date: 20th march 22
 * @description: This function is used to update the sessionSubthreadStats, to be called after session is over, in bakend itself, in order to update database and get sessionSubthreadStats from all individual TBs to the session.
 */
monitorBoardController.updateStats = async function (tid) {
	const collectionName = db.collections.DEFAULT;
	const payload = {};
	payload.sessionSubthreadStats ={};

	const tb = await db.findFields(collectionName, { type: 'threadbuilder',  topicId: tid });

	payload.sessionSubthreadStats = tb.reduce(function(a,b){
		return{
				totalQuestions: (a.stats && a.stats.question ? a.stats.question.length : 0) + (b.stats && b.stats.question ? b.stats.question.length : 0),
				totalAnswers: (a.stats && a.stats.answer ? a.stats.answer.length : 0) + (b.stats && b.stats.answer ? b.stats.answer.length : 0),
				totalEureka: (a.stats && a.stats.eureka ? a.stats.eureka.length : 0) + (b.stats && b.stats.eureka ? b.stats.eureka.length : 0),
				totalRoot: (a.stats && a.stats.question ? a.stats.root.length : 0) + (b.stats && b.stats.question ? b.stats.root.length : 0),
				totalCharacters: (a.stats && a.stats.count ? parseInt(a.stats.count.characters) : 0) + (b.stats && b.stats.count ? parseInt(b.stats.count.characters) : 0),
				totalWords: (a.stats && a.stats.count ? parseInt(a.stats.count.words) : 0) + (b.stats && b.stats.count ? parseInt(b.stats.count.words) : 0),
				totalThreads: (a.stats && a.stats.count ? parseInt(a.stats.count.threads) : 0) + (b.stats && b.stats.count ? parseInt(b.stats.count.threads) : 0),
			}
	},0)

	const key = {
		tid: parseInt(tid),
		type: "session"
	}

	await update(key, payload);
}

monitorBoardController.deleteSession = async function (req, res, next) {
	const luid = parseInt(req.uid);
	if (!luid || luid < 1) throw new Error("Unauthorized");
	const key = {
		tid: parseInt(req.params.tid),
		type: "session"
	}
	helpers.formatApiResponse(200, res, await deleteItem(key, luid));
}


monitorBoardController.updateClassStatus = async function (req, res, next) {
	const key = {
		tid: parseInt(req.params.tid),
		type: "session"
	}
	const collectionName = db.collections.DEFAULT;
	const currentTime = Date.now();

	const sessionData = await db.findField(collectionName, key);
	if (!sessionData) throw new Error("Session not found");

	const payload = {
		isLive: JSON.parse(req.body.isLive.toLowerCase()),
	};
	if(payload.isLive == false || payload.isLive == 'false') {
		if (!sessionData.isLive && sessionData.state == 'stop') {
			throw new Error('Session is already stopped');
		}
		payload['ended_on'] = currentTime;
	}else if(payload.isLive == true || payload.isLive == 'true'){
		if (sessionData.state == 'stop') { throw new Error('Session is already stopped'); }
		if (sessionData.isLive) { throw new Error('Session is already running'); }
		payload['schedule'] = currentTime;
		payload['ended_on'] = payload['schedule'] + (1000 * 60 * 60);
	}
	helpers.formatApiResponse(200, res, await update(key, payload));
}

async function update(keys, payload) {
	const collectionName = db.collections.DEFAULT;
	let state = await db.updateFieldWithMultipleKeys(collectionName, keys, payload);
	if (!state) { throw new Error("Unauthorized write access!"); }
	return state;
}

async function deleteItem(keys, luid) {
	const isAdmin = await user.isAdministrator(luid);
	const isTeacher = await privileges.users.isTeacher(luid);
	const collectionName = db.collections.DEFAULT;

	if (isAdmin || isTeacher) {
		await db.removeField(collectionName, keys);
		return { deleted: true }
	} else throw new Error("Unauthorized");
}


monitorBoardController.download = async function (req, res, next) {
	let csv = [];
	let name = req.query.name || "session";
	let headers = ['Title', "Date", "User Name", "TB Char Count", "TB Word Count", "EB Char Count", "EB Word Count"]

	try {
		let start = req.query.start && moment(req.query.start).startOf('day').valueOf() || 0;

		if (start > Date.now()) throw new Error("Invalid date range");

		let tid = parseInt(req.query.tid) || 0;
		let end = req.query.end && moment(req.query.end).endOf('day').valueOf() || Date.now();


		if (start > end) throw new Error("Invalid date range");

		let keys = {
			type: "session",
			createdAt: {
				$gte: start,
				$lte: end
			}
		}

		if (tid > 0) keys.tid = tid;


		const collectionName = db.collections.DEFAULT;
		let data = await db.findFields(collectionName, keys);


		await async.forEachOf(data, async function (value, key) {
			let title = value.topic;
			let members = await db.findFields(collectionName, { tid: value.tid, type: "attendance" });

			members.forEach(function (member) {
				let row = [];
				row.push(title);
				row.push(moment(value.createdAt).format('DD-MM-YYYY hh:mm A'));
				row.push(member.fullname || member.username);
				member.stats = member.stats || {
					tb: {
						count: {
							characters: 0,
							words: 0
						}
					},
					eb: {
						count: {
							characters: 0,
							words: 0
						}
					}
				};

				let tbChar = 0;
				let tbWord = 0;
				let ebChar = 0;
				let ebWord = 0;

				try {
					tbChar = member.stats.tb.count.characters
				} catch (error) {

				}
				try {
					tbWord = member.stats.tb.count.words
				} catch (error) {

				}

				try {
					ebChar = member.stats.eb.count.characters
				} catch (error) {

				}
				try {
					ebWord = member.stats.eb.count.words
				} catch (error) {

				}

				
				row.push(tbChar);
				row.push(tbWord);
				row.push(ebChar);
				row.push(ebWord);
				csv.push(row);
			});



		});




		// download csv headers


	} catch (error) {
		console.log(error);
	}

	csv.unshift(headers);
	csv = csv.map(function (row) {
		return row.join(',');
	});
	csv = csv.join('\n');
	res.setHeader('Content-disposition', 'attachment; filename=' + name + '.csv');
	res.set('Content-Type', 'text/csv');
	res.status(200).send(csv);

}