const User = require('../../user');
const db = require('../../database');
const Messaging = require('../../messaging');
var {reactions} = require('./config')

const discussionRoomController = module.exports;

discussionRoomController.getCreate = async function (req, res, next) {
	res.render("mobile/discussion/create", {
		title: "create discussion room",
		message: "hello this is working",
	});
};

// discussionRoomController.getModListMV = async function (req, res, next) {
// 	res.render("mobile/discussion/modlist_mod", {
// 		title: "Moderator's list",
// 		message: "hello this is working",
// 	});
// };

discussionRoomController.viewProfile = async function (req, res, next) {
	const {type, id} = req.query;
	const {roomId} = req.params

	const collectionName = db.collections.MOBILE.DISCUSSION_ROOM;
	const keys = {
		type: 'thread:reaction'
	};
	const counters = {};
	const pageData = {
		title: "Profile of Discussion Room",
		type,
		id,
		roomId,
	};

	if (type == 'room') {
		keys.roomId = parseInt(id);
	}
	else if (type == 'thread') {
		keys.messageId = parseInt(id);
		let thread = await db.findField(db.collections.DEFAULT, {_key: 'message:' + id});
		if (thread) {
			let {fromuid, content} = thread;
			let userData = await User.getUserFields(fromuid, ['fullname', 'username']);

			pageData.thread = {content, author: userData};
		}
	}
	else if (type == 'user') {
		keys.uid = parseInt(id);
		keys.roomId = parseInt(roomId);
	}

	[counters.values, counters.emotions, counters.wisdoms] = await Promise.all([
		db.countDocuments(collectionName, {...keys, category: {$regex: 'value', $options: '$i'}}),
		db.countDocuments(collectionName, {...keys, category: {$regex: 'emotion', $options: '$i'}}),
		db.countDocuments(collectionName, {...keys, category: {$regex: 'wisdom', $options: '$i'}}),
	]);

	pageData.counters = counters;

	res.render("mobile/discussion/profile", pageData);

};

discussionRoomController.getModListPV = async function (req, res, next) {
	const ModeratorPage = {
		title: "Moderator's list",
		message: "hello this is working",
	}
	const { tid } = req.query;
	const userFields = ['rigor_rank', 'username', 'fullname', 'picture'];

	if (tid) {
		let room = await db.findField(db.collections.DEFAULT, { type: 'discuss_room', roomId: parseInt(tid) });
		if (room) {
			let mods = room.moderators;
			let moderators = []
			if (mods) {
				await Promise.all(mods.map(async (item) => {
					let userData = await User.getUserFields([item], userFields);
					moderators.push(userData);
				}))
			}
			ModeratorPage.moderators = moderators;
			ModeratorPage.ownerData = await User.getUserFields([room.owner], userFields);
		}
	}

	res.render("mobile/discussion/modlist", ModeratorPage);
};

discussionRoomController.getReported = async function (req, res, next) {
	const roomId = req.query.roomid;
	const roomData = await Messaging.getRoomData(roomId);

	res.render("mobile/discussion/reported", {
		title: "Reported Threads",
		message: "hello this is working",
		roomId,
		roomData,
	});
};

// discussionRoomController.getRulesMV = async function (req, res, next) {
// 	res.render("mobile/discussion/rules_mod", {
// 		title: "Room rules",
// 		message: "hello this is working",
// 	});
// };

discussionRoomController.getRulesPV = async function (req, res, next) {
	const roomId = req.query.tid,
		isMod = req.query.mod;

	res.render("mobile/discussion/rules", {
		title: "Room rules",
		message: "hello this is working",
		roomId,
		isMod,
	});
};

// discussionRoomController.getViewMV = async function (req, res, next) {
// 	res.render("mobile/discussion/view_mod", {
// 		title: "Discussion room",
// 		message: "hello this is working",
// 	});
// };

discussionRoomController.getViewPV = async function (req, res, next) {
	const {roomId} = req.params;
	const scrollId = req.query.scrollId;

	res.render("mobile/discussion/view", {
		title: "Discussion room",
		message: "hello this is working",
		data: {
			roomId: roomId,
			scrollId,
			reactions
		},
	});
};

discussionRoomController.getSaved = async function (req, res, next) {
	const roomId = req.query.tid;
	const roomData = await Messaging.getRoomData(roomId);

	res.render("mobile/discussion/saved", {
		title: "Saved Threads",
		message: "hello this is working",
		roomId,
		roomData,
	});
};

discussionRoomController.getEnter = async function (req, res, next) {
	res.render("mobile/discussion/enter", {
		title: "enter discussion room",
		message: "hello this is working",
	});
};

discussionRoomController.getJoined = async function (req, res, next) {
	res.render("mobile/discussion/joined", {
		title: "joined discussion rooms",
		message: "hello this is working",
	});  
};

discussionRoomController.getReaction = async function(req, res, next){
	res.render("mobile/discussion/reaction", {
		title: "template open",
		message: "hello this is working",
	});
};