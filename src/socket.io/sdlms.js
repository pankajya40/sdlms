'use strict';

const classes = require('../sdlms/classes');
const Sockets = require('.');
const user = require('../user');
const db = require('../database');

var SocketSdlms = {
	class: {
		assets: {
			spreadsheet: {}
		},
		polls: {

		},
		poll: {

		},
		thread: {
			feedback:{}

		}
	},
	quiz:{},
	polls: {
		announce: {

		},
		get: {

		}
	},
	monitor: {}
}
SocketSdlms.class.enter = async function (socket, data, callback) {

	let tid = data.tid;
	const userFields = ['username', 'picture', 'fullname', 'uid'];
	const userData = await user.getUserFields(socket.uid, userFields);

	joinClassAndNotify(socket, tid, true, userData);

	return {
		status: "OK"
	}
}
function joinClassAndNotify(socket, tid, notify = false, data = {}) {

	socket.currentClassRooms = socket.currentClassRooms || [];
	leaveCurrentClassRoom(socket, `class:room:${tid}`);
	socket.join(`class:room:${tid}`);
	socket.currentClassRooms.push(`class:room:${tid}`);
	console.log(`class:room:${tid}:: `, Sockets.getCountInRoom(`class:room:${tid}`));
	if (notify) socket.in(`class:room:${tid}`).emit('event:class.joined', data);

}
SocketSdlms.class.start = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');

	let tid = data.tid;
	let live = await classes.startClass(tid, socket.uid);

	if (live.status == 'OK') {

		joinClassAndNotify(socket, tid);

		(live.data.members || []).forEach(function (uid) {
			socket.in('uid_' + uid).emit('event:class.started', live.data);
		});
	} else {
		throw new Error(live);
	}
	return {
		status: 'OK',
	};
};

function leaveCurrentClassRoom(socket, classRoom) {
	if ((socket.currentClassRooms || []).findIndex(e => e == classRoom) > -1) {
		socket.leave(classRoom);
		socket.currentClassRooms = socket.currentClassRooms.filter(e => e != classRoom);
	}
}

SocketSdlms.class.join = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');

	let tid = data.tid;
	let joined = await classes.joinClass(tid, socket.uid);

	if (joined.status == 'OK') {
		joinClassAndNotify(socket, tid, true, joined.data);
	}

	return {
		status: 'OK',
	};
};
SocketSdlms.class.assets.update = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');
	const collectionName = db.collections.DEFAULT;

	let tid = data.tid;

	const payload = {
		$set: { [`stats.${data.asset_type}`]: data.latest },
	};

	await db.updateField(collectionName, { _key: `attendance:${tid}:${socket.uid}` }, payload);

	socket.in(`class:room:${tid}`).emit('event:class.assets.update', data);
}
SocketSdlms.class.assets.spreadsheet.update = function (socket, data, callback) {

	let tid = data.tid;
	socket.in(`class:room:${tid}`).emit('event:spreadsheet.update', data);
};
SocketSdlms.class.poll.selection = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');
	if (!data.content) throw new Error('Invalid content');
	if (!data.group) throw new Error('Invalid group');

	let tid = data.tid;
	data.uid = socket.uid;

	let poll = await classes.createPoll(data);
	console.log(`class:room:${tid}:: `, Sockets.getCountInRoom(`class:room:${tid}`));
	socket.in(`class:room:${tid}`).emit('event:polls.selection', poll);

};
SocketSdlms.polls.announce.group = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');

	let tid = data.tid;

	let polls = await classes.announcePollGroup(data);

	socket.in(`class:room:${tid}`).emit('event:polls.announce.group', {polls,data});
	return polls;

};

SocketSdlms.polls.announce.single = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');
	if (!data.pid) throw new Error('Invalid pid');

	let tid = data.tid;

	let poll = await classes.announcePoll(data);

	if (!poll) throw new Error('already another poll is announced');

	socket.in(`class:room:${tid}`).emit('event:polls.announce.single', poll);
	return poll;

};

SocketSdlms.polls.get.single = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');
	if (!data.pid) throw new Error('Invalid pid');
	if (!data.group) throw new Error('Invalid group');

	let poll = await classes.getPoll(data);
	return poll
};
SocketSdlms.polls.getNonVoted = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');
	if (!data.group) throw new Error('Invalid group');
	data.uid = socket.uid;

	let poll = await classes.getNonVoted(data);
	return poll
};

SocketSdlms.polls.get.all = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');
	let polls = await classes.getPolls(data);

	return polls;

};
SocketSdlms.polls.vote = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');
	if (!data.pid) throw new Error('Invalid pid');
	if (!data.group) throw new Error('Invalid group');

	data.uid = socket.uid;
	let polls = await classes.voteForPoll(data);

	socket.in(`class:room:${data.tid}`).emit('event:polls.vote', {polls, data});
	return polls;

};
SocketSdlms.polls.create = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');
	if (!data.group) throw new Error('Invalid group');

	let tid = data.tid;
	data.uid = socket.uid;

	let poll = await classes.createPoll(data);
	return poll
};
SocketSdlms.polls.update = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');
	if (!data.group) throw new Error('Invalid group');
	if (!data.pid) throw new Error('Invalid pid');

	let tid = data.tid;
	data.uid = socket.uid;

	let poll = await classes.updatePoll(data);
	// console.log(poll);
	return poll;
};
SocketSdlms.polls.getCountByGroups = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');

	let tid = data.tid;

	let polls = await classes.getPollsCountByGroups(data);

	return polls;

};
SocketSdlms.polls.complete = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');
	if (!data.group) throw new Error('Invalid group');
	if (!data.pid) throw new Error('Invalid pid');

	let tid = data.tid;
	data.uid = socket.uid;

	let poll = await classes.completePoll(data);
	socket.in(`class:room:${tid}`).emit('event:polls.complete', {data, poll});
	return poll;
};
SocketSdlms.class.thread.completed = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');

	let tid = data.tid;
	data.uid = socket.uid;

	//  here get feedback will come

	socket.in(`class:room:${tid}`).emit('event:thread.feedback', { "title": "Response Thread feedback", "blocks": [{ "helptext": "", "question": "Rate the current thread", "min": "0", "max": "5", "default": "5", "step": "1", "input_type": "range", "options": [], "child": [] }, { "helptext": "Select any one.", "question": "How do you want your next thread to be", "input_type": "dropdown", "options": [{ "1": "Interesting" }, { "2": "More fun" }, { "3": "Experimentation" }, { "4": "Example" }], "child": [] }] });
}
SocketSdlms.class.thread.feedback.submit = async function (socket, data, callback) {

	if (!socket.uid) throw new Error('You must be logged in');
	if (!data) throw new Error('Invalid data');
	if (!data.tid) throw new Error('Invalid tid');
	if (!data.response) throw new Error('Invalid response');

	let tid = data.tid;
	data.uid = socket.uid;

	//  here get feedback will come
	// Save to student feedback
	// console.log(data);

	socket.in(`class:room:${tid}`).emit('event:thread.feedback.submit', data);
}

SocketSdlms.quiz.start = async function (socket, data, callback) {
	// if(!data.tid) throw new Error('Invalid tid');

	socket.broadcast.emit('event:quiz.start', data);
}
module.exports = SocketSdlms;
