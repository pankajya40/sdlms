'use strict';

const db = require('../database');
const user = require('../user');
const meta = require('../meta');
const utils = require('../controllers/utils');
const { result } = require('lodash');
const { regexes } = require('../middleware');

const Classes = module.exports;

Classes.getClassRoom = async function (tid) {
	const collectionName = db.collections.DEFAULT;
	if (!tid) {
		return  ('INVALID_tid');
	}
	const classRoom = db.findField(collectionName, {
		tid: tid,
		type: "session"
	});
	return classRoom;
};

Classes.startClass = async function (tid, callerUid) {

    const collectionName = db.collections.DEFAULT;
	if (!tid) return  ('INVALID_tid');

	const classRoom = await Classes.getClassRoom(tid);

	if (!classRoom) return ('CLASS_NOT_FOUND');
	if (classRoom.isLive) return ('CLASS_ALREADY_RUNNING');
	if (classRoom.state == 'stop') return ('CLASS_IS_STOPPED');
	if (parseInt(classRoom.teacher_uid, 10) !== parseInt(callerUid, 10)) return ('NOT_AUTHORIZED');


	const payload = {
		isLive: true,
		schedule: Date.now(),
		ended_on: Date.now() + (1000 * 60 * 60),
	};

	const keys = {
		tid: tid,
		type: "session"
	}

	await db.updateFieldWithMultipleKeys(collectionName, keys, payload);

	return {
		status: 'OK',
		data: classRoom,
	};
};

Classes.joinClass = async function (tid, uid) {

	if (!tid) return  ('INVALID_tid');
	if (!uid) return  ('INVALID_UID');

	const classRoom = await Classes.getClassRoom(tid);
	const collectionName = db.collections.DEFAULT;

	if (!classRoom) return ('CLASS_NOT_FOUND');
	if (classRoom.state == 'stop') return ('CLASS_IS_STOPPED');
	if (parseInt(classRoom.teacher_uid, 10) === parseInt(uid, 10)) return ('TEACHER_CANNOT_JOIN');

	const userFields = ['username', 'picture', 'fullname', 'uid'];

	const keys = {
		_key: `attendance:${tid}:${uid}`,
		uid: uid
	}

	const userData = await user.getUserFields(uid, userFields);
	const payload = {
		tid,
		...keys,
		...userData,
		joinedAt: Date.now(),
		type: 'attendance',
	};

	const state = await db.updateField(collectionName, keys, payload, {
		upsert: true,
	});

	if (state && state.result.upserted) {
		await db.incrementCount(collectionName, {
			_key: `user:${uid}`,
		}, 'classes_attended');
	}
	return {
        status:"OK",
        data:userData
    }
}

Classes.createPoll = async function (req) {
	const uid = parseInt(req.uid);
	const group = req.group;

	const tid = parseInt(req.tid);
	const pid = await db.incrObjectField('global', 'nextPid');
	const collectionName = db.collections.SDLMS.POLL;

	let content = req.content;
	let data  = utils.isParsableJSON(req.data  || '') ? JSON.parse(req.data)  : req.data;
	const userFields = ['username', 'displayname', 'picture', 'fullname', 'uid'];
	const userData = await user.getUserFields([uid], userFields);

	let payload = {
		_key: `polls:${group}:${tid}`,
		pid,
		uid,
		content,
		group,
		data,
		votes: [],
		creator:userData,
		createdAt: Date.now(),
		status: 'new',
	}
	await db.setField(collectionName, payload);

	return await db.findField(collectionName, {
		_key: `polls:${group}:${tid}`,
		pid: pid
	});
}

Classes.announcePollGroup = async function (req) {
	const group = req.group;

	const tid = parseInt(req.tid);
	const collectionName = db.collections.SDLMS.POLL;
	const uids = Array.isArray(req.uids) ? req.uids : [];
	const createdAfter = parseInt(req.createdAfter);

	const keys = {
		_key: `polls:${group}:${tid}`,	
		status: 'new'
	}
	if (uids.length) {
		keys.uid = { $in: uids }
	}
	if (createdAfter) {
		keys.createdAt = { $gt: createdAfter }
	}
	

	 let publishedAt = Date.now();
	 let resp =  await db.updateField(collectionName, keys, { $set: {status: 'published',publishedAt:publishedAt} },{multi : true});
	//  console.log(resp);
	 keys.status = 'published';
	 keys.publishedAt = publishedAt;
	 let polls = await db.findFields(collectionName, keys);
	 // for group poll object
	if(req.pid){
		await db.updateField(collectionName, {
			pid:req.pid,
			status:'new',
			_key:`polls:group:${tid}`
		}, { $set: {status: 'published',publishedAt:publishedAt, threads:polls} },{multi : true});
	}
	return polls;
}

Classes.getPolls = async function (req) {
	const group = req.group;
	const groups = Array.isArray(group) ? group : [group];
	const tid = parseInt(req.tid);
	const uids = Array.isArray(req.uids) ? req.uids : [];
	const createdAfter = parseInt(req.createdAfter);
	const status = req.status;
	const collectionName = db.collections.SDLMS.POLL;


	let conditions = {};
	if (status) conditions.status = status;
	if (uids.length) conditions.uid = { $in: uids };
	if (createdAfter) conditions.createdAt = { $gt: createdAfter };

	let requests = [];
	groups.forEach(group => {
		let keys = {...conditions};
		keys._key = `polls:${group}:${tid}`;
		// console.log(keys);
		requests.push(db.findFields(collectionName, keys));
	});
	let result = {};
	let res = await Promise.all(requests);
	res.map((r,i) => result[groups[i]] = r);
	
	return result;

}

Classes.voteForPoll = async function (req) {
	const uid = parseInt(req.uid);
	const pid = parseInt(req.pid);
	const tid = parseInt(req.tid);

	const group = req.group;
	const userFields = ['username', 'displayname', 'picture', 'fullname', 'uid'];

	const collectionName = db.collections.SDLMS.POLL;
	const userData = await user.getUserFields([uid], userFields);
	userData.createdAt = Date.now();
	userData.selected = req.selected; 
	const keys = {
		_key: `polls:${group}:${tid}`,
		pid:pid,
		status: 'published'
	}
	if(req.parentPid){
		await db.updateField(collectionName, { 
			_key:`polls:group:${tid}`, 
			'votes.uid': {$ne: uid},
			pid:req.parentPid,
			status:'published',
		}, { $push: { 'votes': userData } });
	}
	await db.updateField(collectionName, { ...keys, 'votes.uid': {$ne: uid}}, { $push: { 'votes': userData } });
	return await db.findField(collectionName, keys);
}

Classes.getPollsCountByGroups = async function (req) {

	const groups = Array.isArray(req.groups) ? req.groups : [];
	const tid = parseInt(req.tid);
	const collectionName = db.collections.SDLMS.POLL;
	const uids = Array.isArray(req.uids) ? req.uids : [];
	const createdAfter = parseInt(req.createdAfter);
	const status = req.status;

	let conditions = {};
	if (status) conditions.status = status;
		if (uids.length) conditions.uid = { $in: uids };
		if (createdAfter) conditions.createdAt = { $gt: createdAfter };

	// let requests = {
	// 	new:[],
	// 	published:[],
	// };

	// groups.forEach(group => {
	// 	let keys = {...conditions};
	// 	keys._key = `polls:${group}:${tid}`;
	// 	keys.status = `new`;
	// 	requests.new.push(db.countDocuments(collectionName, keys));
	// });
	// groups.forEach(group => {
	// 	let keys = {...conditions};
	// 	keys._key = `polls:${group}:${tid}`;
	// 	keys.status = `published`;
	// 	requests.published.push(db.countDocuments(collectionName, keys));
	// });
	
	// let publishedPolls = await Promise.all(requests.published);
	// let newPolls = await Promise.all(requests.new);

	// let results  = {
	// 	new :newPolls.map((result,index) => new Object({group:groups[index],count:result})),
	// 	published:publishedPolls.map((result,index) => new Object({group:groups[index],count:result})),
	// };
	let results = {};
	let requests = [];
	groups.forEach(group => {
		let keys = {...conditions};
		keys._key = `polls:${group}:${tid}`;
		requests.push(db.countDocuments(collectionName, keys));
	});
	let polls = await Promise.all(requests);
	results.polls = polls.map((result,index) => new Object({group:groups[index],count:result}));
	return results;
}
Classes.announcePoll = async function (req) {

	const group = req.group || 'custom';
	const tid = parseInt(req.tid);
	const pid = parseInt(req.pid);
	const collectionName = db.collections.SDLMS.POLL;

	let published = await db.countDocuments(collectionName, {
		_key: `polls:${group}:${tid}`,
		status: 'published'
	});

	if(published > 0) return false;

	const keys = {
		_key: `polls:${group}:${tid}`,
		status: 'new',
		pid:pid
	}
	
	 let publishedAt = Date.now();
	 let resp =  await db.update(collectionName, keys, { $set: {status: 'published',publishedAt:publishedAt} });
	//  console.log(resp);
	 keys.status = 'published';
	 keys.publishedAt = publishedAt;
	 return  await db.findField(collectionName, keys);
}
Classes.getPoll = async function (req) {

	const group = req.group;
	const tid = parseInt(req.tid);
	const pid = parseInt(req.pid);
	const status =req.status;
	const collectionName = db.collections.SDLMS.POLL;

	const keys = {
		_key: `polls:${group}:${tid}`,
		pid:pid
	}
	if(status) keys.status = status;
	let poll = await db.findField(collectionName, keys);
	 return  poll;
}

Classes.updatePoll = async function (req) {
	const group = req.group;
	const tid = parseInt(req.tid);
	const pid = parseInt(req.pid);
	const collectionName = db.collections.SDLMS.POLL;

	const keys = {
		_key: `polls:${group}:${tid}`,
		pid: pid
	}
	let payload = {
		content: req.content,
		group: req.group,
		data: req.data,
	}


	let resp = await db.update(collectionName, keys, {
		$set: payload
	});

	return await db.findField(collectionName, keys);
}
Classes.completePoll = async function (req) {
	const group = req.group;
	const tid = parseInt(req.tid);
	const pid = parseInt(req.pid);
	const collectionName = db.collections.SDLMS.POLL;

	const keys = {
		_key: `polls:${group}:${tid}`,
		pid: pid,
		status: 'published'
	}
	const closedAt = Date.now();
	let payload = {
		status:'completed',
		closedAt
	}


	let resp = await db.update(collectionName, keys, {
		$set: payload
	});
	keys.status = 'completed';
	return await db.findField(collectionName, keys);
}
Classes.getNonVoted = async function (req) {

	const group = req.group;
	const groups = Array.isArray(req.groups) ? req.groups : [group];
	const tid = parseInt(req.tid);
	const uid = parseInt(req.uid);
	const collectionName = db.collections.SDLMS.POLL;

	const keys = {
		_key: `polls:${groups.join('|')}:${tid}`,
		status:'published',
		'votes.uid': {$ne:uid}
	}

	let poll = await db.findFields(collectionName, keys);
	return  poll;
}

Classes.getFeedbackForm = async function(req){
	if(!req.uid) throw new Error("Teacher uid not found")
	const uid = parseInt(req.uid)
	const keys = {
		type: "teaching_style",
		uid
	}
	const resp = await db.findField(db.collections.SDLMS.TEACHING_STYLE,keys)

	const dummy_feedback = {"title":"Response Thread feedback","blocks":[{"helptext":"","question":"Rate the current thread","min":"0","max":"5","default":"5","step":"1","input_type":"range","options":[],"child":[]},{"helptext":"Select any one.","question":"How do you want your next thread to be","input_type":"dropdown","options":[{"1":"Interesting"},{"2":"More fun"},{"3":"Experimentation"},{"4":"Example"}],"child":[]}]}

	if(!resp) throw new Error("no teaching style found for the given UID") 
	const response = {
		feedbacks: resp.feedbacks? resp.feedbacks : dummy_feedback
	}
	return response
}

Classes.addFeedbackResponse = async function(req) {
	if(!req.uid) throw new Error("Invalid uid")
	if(!req.tid) throw new Error("Invalid tid")
	if(!req.response) throw new Error("Invalid response")
	if(!req.threadNumber) throw new Error("Invalid threadNumber")
	const tid = req.tid
	const uid = req.uid
	const threadNumber = req.threadNumber
	const response = req.response
	const keys = {
		_key: `attendance:${tid}:${uid}`
	}	
	
	const payload = {
		response,
		timestamp: Date.now()
	}

	const res = await db.updateField(db.collections.DEFAULT, keys, {$set: { [`feedbacks.${threadNumber}`]: payload}})

	if (res.result.n){
		return await db.findField(db.collections.DEFAULT,keys)
	}
}

Classes.getFeeds = async function(req) {
	const data =  req.body
	const tid = parseInt(data.tid)
	const uids = Array.isArray(data.uids)?data.uids:[parseInt(data.uids)]
	let query = {
		tid,
	}
	data.timestamp = parseInt(data.timestamp)
	let conditions = []
	let match = [
		{tid:{$eq:tid}},
		{type:{$eq:'threadbuilder'}}
	]
	if(data.timestamp){
		query.createdAt = {$gte: data.timestamp}
		match.push({$or:[{updatedAt:{$gte: data.timestamp}}, {createdAt:{$gte: data.timestamp}}]})
	}
	if(data.uids){
		query.uid = {$in:uids}
		match.push({uid:{$in: uids}})
	}
	if(data.thought){
		query[`threads.subthreads.${data.thought}`] = "1"
		conditions.push({$eq: [`$$obj.${data.thought}`, "1"]})
	}
	if(data.process){
		query[`threads.subthreads.process`] = data.process
		conditions.push({$eq: ['$$obj.process', data.process]})
	}
	if(data.category){
		query[`threads.subthreads.category`] = data.category
		conditions.push({$eq: ['$$obj.category', data.category]})
	}
	if(data.content){
		query['threads.subthreads.content'] = {$regex: data.content, $options:'i'}
		conditions.push({$regexMatch:{input:'$$obj.content', regex: new RegExp(data.content, 'i') }} )
	}
	let response = await db.Aggregate(db.collections.DEFAULT,[
		{ "$unwind": "$threads" },
		{ $match:{
			$and: match
		}
		},{
			$project:{
				"uid":1,
				"tid":1,
				"createdAt":1,
				threads:{
					$filter:{
						input:"$threads.subthreads",
						as:'obj',
						cond:{ $and: conditions }
					}
				}
			}
		}
	])
	const userFields = ['username', 'picture', 'fullname', 'uid'];
	response = response.filter(e => e.threads.length)
	response = Promise.all(response.map(async(e) => {
		let userData = await user.getUserFields(e.uid, userFields)
		return {...e, userData}
	}))
	return response;
	// let res = await db.findFields(
	// 	db.collections.DEFAULT,
	// 	query,
	// )
	// let filtered = []
	// res.forEach((ele) => {
	// 	ele.threads.forEach(thread => {
	// 		thread.subthreads.forEach(e => {
	// 			if(data.thought){
	// 				if(e[data.thought] != '1') return;
	// 			}
	// 			if(data.process){
	// 				if(e.process!=data.process) return;
	// 			}			
	// 			if(data.category){
	// 				if(e.category!=data.category) return;
	// 			}			
	// 			if(data.content){
	// 				const regex = new RegExp(data.content, 'i');
	// 				if(!regex.test(e.content)) return;
	// 			}
	// 			filtered.push({
	// 				uid:ele.uid,
	// 				...e
	// 			})	
	// 		})		
	// 	})
	// })
	// return filtered;
}