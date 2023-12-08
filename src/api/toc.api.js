const meta = require("../meta");

const groups = require("../groups");
const _ = require("lodash");
const categories = require("../categories");
const db = require("../database");
const user = require("../user");
const topics = require("../topics");
const plugins = require("../plugins");
const slugify = require("../slugify");
const winston = require("winston");
const Uploader = require("../controllers/FIleUpload");
const ObjectId = require("mongodb").ObjectId
const nconf = require("nconf");
const axios = require("axios");
const {
	privileges
} = require("../controllers/admin");
const userPrivileges = require("../privileges");
const utils = require("../controllers/utils");
const moment = require("moment");

const toc = module.exports;
const TOCS = db.collections.GLOBAL.TOC;

// const validTODOPriorities = ['urgent', 'critical', 'high','medium','low'];
const validTODOStatuses = ['upcoming', 'in_progress', 'dropped', 'done'];

// const possibleCategories = ['heuristic', 'celebration', 'insight']
// const possibleReasons = ['observation', 'speculation', 'motivation', 'mythbuster']
/**
 * @author: Rahul Ranjan
 * @description: Crud operations for TOC
 */

// Create Calendar
toc.addCalendarInfo = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;

	const uid = parseInt(req.uid);
	const payload = {
		uid: uid,
		type: "calendar",
		calendarInfo: [{
				id: "1",
				name: "Hackathon",
				color: "#ffffff",
				borderColor: "#9e5fff",
				backgroundColor: "#9e5fff",
				dragBackgroundColor: "#9e5fff",
			},
			{
				id: "2",
				name: "Learning",
				color: "#ffffff",
				borderColor: "#00a9ff",
				backgroundColor: "#00a9ff",
				dragBackgroundColor: "#00a9ff",
			},
			{
				id: "3",
				name: "Progress",
				color: "#ffffee",
				borderColor: "#DB473F",
				backgroundColor: "#DB473F",
				dragBackgroundColor: "#DB473F",
			},
		],
		calendar: [],
		createdAt: Date.now(),
		updatedAt: Date.now(),
	};
	const result = await db.setField(TOC, payload);
	// console.log("result", result);
	if (result) {
		return {
			status: "success",
			message: "Calendar info added successfully",
			data: payload,
		};
	}
};
// Create Calendar
toc.createCalendar = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;

	const luid = req.uid;

	// console.log(req.body);
	// console.log(req.query);

	const keys = {
		uid: luid,
		_id: ObjectId(req.body.id),
		type: "calendar",
	};
	if (!keys._id) throw new Error("id is required");
	// console.log("keys", keys);

	let calendarInfo = await db.findFields(TOC, keys);
	// console.log("calendarInfo", calendarInfo);
	if (!calendarInfo) throw new Error("Calendar not found");

	const payload = {
		uid: luid,
		calendarId: req.body.calendarId,
		title: req.body.title != null ? req.body.title : "",
		body: req.body.body != null ? req.body.body : "",
		isAllDay: false,
		start: req.body.start,
		end: req.body.end,
		state: req.body.state != null ? req.body.state : "",
		category: req.body.category != null ? req.body.category : "",
		location: req.body.location != null ? req.body.location : "",
		isPrivate: false,
		isReadOnly: false,
		comingDuration: req.body.comingDuration != null ? req.body.comingDuration : "",
		goingDuration: req.body.goingDuration != null ? req.body.goingDuration : "",
		attendess: [],
		recureenceRule: req.body.recureenceRule != null ? req.body.recureenceRule : "",
		isVisibile: true,
		isPending: false,
		isFocused: false,
		color: "#00bcd4",
		borderColor: "#00bcd4",
		dragBackgroundColor: "#00bcd4",
		backgroundColor: "#00bcd4",
		customStyle: {
			backgroundColor: "#00bcd4",
			borderColor: "#00bcd4",
			color: "#00bcd4",
			dragBackgroundColor: "#00bcd4",
		},
		raw: {},
		createdAt: Date.now(),
		updatedAt: Date.now(),
	};
	// console.log("payload", payload);

	const result = await db.updateField(TOC, keys, {
		$push: {
			calendar: payload
		}
	});
	// console.log("result", result);
	if (result) {
		return {
			success: true,
			message: "Calendar Created Successfully",
			data: payload,
		};
	}
};

// Get Calendar

toc.getCalendar = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;
	const uid = parseInt(req.uid);

	const keys = {
		uid: uid,
		type: "calendar",
	};
	// console.log("keys", keys);
	const result = await db.findFields(TOC, keys);
	// console.log("result", result);
	return result;
};

// update Calendar

toc.updateCalendar = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;
	const uid = parseInt(req.uid);

	const keys = {
		uid: uid,
		type: "calendar",
	};

	let calander = await db.findFields(TOC, keys);
	if (!calander) throw new Error("Calendar not found");

	const oldCalendar = [...calander.calendar];
	// console.log("oldCalendar", oldCalendar);

	const newCalendar = {
		calendarId: req.body.calendarId != null ? req.body.calendarId : calander.calendarId,
		title: req.body.title != null ? req.body.title : calander.title,
		body: req.body.body != null ? req.body.body : calander.body,
		isAllDay: false != null ? false : calander.isAllDay,
		start: req.body.start != null ? req.body.start : calander.start,
		end: req.body.end != null ? req.body.end : calander.end,
		state: req.body.state != null ? req.body.state : calander.state,
		category: req.body.category != null ? req.body.category : calander.category,
		location: req.body.location != null ? req.body.location : calander.location,
		isPrivate: false != null ? false : calander.isPrivate,
		isReadOnly: false != null ? false : calander.isReadOnly,
		comingDuration: req.body.comingDuration != null ? req.body.comingDuration : calander.comingDuration,
		goingDuration: req.body.goingDuration != null ? req.body.goingDuration : calander.goingDuration,
		attendess: [] != null ? [] : calander.attendess,
		recureenceRule: req.body.recureenceRule != null ? req.body.recureenceRule : calander.recureenceRule,
		isVisibile: true != null ? true : calander.isVisibile,
		isPending: false != null ? false : calander.isPending,
		isFocused: false != null ? false : calander.isFocused,
		color: "#00bcd4" != null ? "#00bcd4" : calander.color,
		borderColor: "#00bcd4" != null ? "#00bcd4" : calander.borderColor,
		dragBackgroundColor: "#00bcd4" != null ? "#00bcd4" : calander.dragBackgroundColor,
		backgroundColor: "#00bcd4" != null ? "#00bcd4" : calander.backgroundColor,
		customStyle: {
			backgroundColor: "#00bcd4" != null ? "#00bcd4" : calander.customStyle.backgroundColor,
			borderColor: "#00bcd4" != null ? "#00bcd4" : calander.customStyle.borderColor,
			color: "#00bcd4" != null ? "#00bcd4" : calander.customStyle.color,
			dragBackgroundColor: "#00bcd4" != null ? "#00bcd4" : calander.customStyle.dragBackgroundColor,
		},
		raw: {} != null ? {} : calander.raw,
		createdAt: calander.createdAt,
		updatedAt: Date.now(),
	}
	// console.log("newCalendar", newCalendar);

	const result = await db.updateField(TOC, keys, {
		$set: {
			calendar: newCalendar
		}
	});
	if (!result) throw new Error("Calendar not updated");
	// console.log("result", result);

	return {
		newCalendar
	};
};

// Create a new task
toc.createTask = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;

	const uid = parseInt(req.uid);
	const pid = await db.incrObjectField("global", "nextPid");

	const payload = {
		uid: uid,
		pid: pid,
		type: "todos",
		tasks: [], // array of tasks
	};

	const result = await db.setField(TOC, payload); // create a new TOC

	if (result) {
		return {
			pid: pid,
			payload: payload,
		};
	}
};

toc.getTodos = async (req) => {
	const TOC = db.collections.GLOBAL.TOC;
	const uid = parseInt(req.uid);
	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
	const order = {
		_id: -1
	};
	let keys = {
		uid,
		type: 'todo',
	};
	let filters = {
		urgent: {
			isUrgent: true
		},
		important: {
			isImportant: true
		},
		urgentandimportant: {
			isUrgent: true,
			isImportant: true
		},
		complete: {
			isCompleted: true
		},
		incomplete: {
			isCompleted: false
		},
	};

	let filter = {};

	if (req.query && filters.hasOwnProperty(req.query.filters)) {
		const filterKey = req.query.filters;
		filter = {
			...filter,
			...filters[filterKey]
		};
	}

	if (req.query && filters.hasOwnProperty(req.query.isCompleted)) {
		const filterKey = req.query.isCompleted;
		filter = {
			...filter,
			...filters[filterKey]
		};
	}
	keys = Object.assign({}, keys, filter);

	if (req.query.status) {
		let {
			status
		} = req.query;
		status = status.trim();

		if (!validTODOStatuses.includes(status)) {
			throw new Error('Invalid todo status: ' + status);
		}

		keys.status = status;
	}

	if (req.query.name) {
		const term = new RegExp(req.query.name, 'i');
		keys = {
			...keys,
			title: {
				$regex: term
			},
		};
	}
	const [todos = [], count = 0] = await Promise.all([
		db.getFieldsWithPagination(TOC, keys, limit, page, order),
		db.countDocuments(TOC, keys),
	]);

	let todoData = todos.map((todo) => {
		let {
			priority_reason,
			priority
		} = todo;

		priority_reason = priority_reason && utils.capitalizeFirstLetter(priority_reason);
		priority = priority && utils.capitalizeFirstLetter(priority);

		return {
			...todo,
			priority,
			priority_reason
		};
	});

	return utils.paginate(`/toc${req.url}`, todoData, count, limit, page);
};


// Add Todo to Task
toc.addTodo = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;
	const uid = parseInt(req.uid);
	const {
		title,
		isUrgent,
		isImportant,
		status = '',
		description = '',
		priority_reason = '',
		assignee,
		scheduleFrom,
		scheduleTo
	} = req.body;
	const currentTime = utils.getISOTimestamp();

	// if (priority) {
	// 	if (!validTODOPriorities.includes(priority)) {
	// 		throw new Error(`Invalid priority: ${priority}, valid priorities are ${validTODOPriorities.join(', ')}`);
	// 	}
	// }

	if (status) {
		if (!validTODOStatuses.includes(status)) {
			throw new Error(`Invalid status: ${status}, valid statuses are ${validTODOStatuses.join(', ')}`);
		}
	}

	const payload = {
		uid,
		title,
		status,
		description: description || "",
		priority_reason: priority_reason || "",
		//taggedProject: req.body.taggedProject != null ? req.body.taggedProject : [],
		scheduleFrom: req.body.scheduleFrom != null ? req.body.scheduleFrom : "",
		scheduleTo: req.body.scheduleTo != null ? req.body.scheduleTo : "",
		// jornals: [],
		// sarpa: [],
		createdAt: currentTime,
		updatedAt: currentTime,
		isScheduled: false,
		isImportant: isImportant == "true" ? true : false,
		isUrgent: isUrgent == "true" ? true : false,
		assignedBy: assignee,
		isCompleted: false,
		type: "todo",
	};

	return await db.setField(TOC, payload); // add todo to task
};

toc.countUrgentImportant = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;
	const uid = parseInt(req.uid);

	const todo = db.findField(TOC, {
		uid: uid
	})

	if (!todo) {
		throw new Error("You dont have any todos")
	}

	const [countUrgentAndImportant, countUrgentAndNotImportant, countNotUrgentAndImportant, countNotUrgentAndNotImportant, countCompletedTasks] = await Promise.all([
		db.countDocuments(TOC, {
			uid: uid,
			isUrgent: true,
			isImportant: true,
			type: "todo"
		}),
		db.countDocuments(TOC, {
			uid: uid,
			isUrgent: true,
			isImportant: false,
			type: "todo"
		}),
		db.countDocuments(TOC, {
			uid: uid,
			isUrgent: false,
			isImportant: true,
			type: "todo"
		}),
		db.countDocuments(TOC, {
			uid: uid,
			isUrgent: false,
			isImportant: false,
			type: "todo"
		}),
		db.countDocuments(TOC, {
			uid: uid,
			isCompleted: true,
			type: "todo"
		}),

	]);
	// if(countUrgentAndImportant ==0 && countUrgentAndNotImportant == 0 && countNotUrgentAndImportant == 0 &&  countNotUrgentAndNotImportant == 0 &&  countCompletedTasks == 0)
	// {
	// 	throw new Error("No Data Found")
	// }
	return {
		countUrgentAndImportant,
		countUrgentAndNotImportant,
		countNotUrgentAndImportant,
		countNotUrgentAndNotImportant,
		countCompletedTasks
	}

};

toc.updateTodo = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;
	const uid = parseInt(req.uid);
	const currentTime = utils.getISOTimestamp();

	const {
		status,
		priority
	} = req.body;
	const {
		id
	} = req.params;

	if (priority) {
		if (!validTODOPriorities.includes(priority)) {
			throw new Error(`Invalid priority: ${priority}, valid priorities are ${validTODOPriorities.join(', ')}`);
		}
	}

	if (status) {
		if (!validTODOStatuses.includes(status)) {
			throw new Error(`Invalid status: ${status}, valid statuses are ${validTODOStatuses.join(', ')}`);
		}
	}

	const payload = {};

	['title', 'status', 'priority', 'description', 'priority_reason', 'scheduleFrom', 'scheduleTo', 'isCompleted'].forEach((elem) => {
		if (req.body[elem]) {
			payload[elem] = req.body[elem];
		}
	});

	payload.updatedAt = currentTime;
	payload.isCompleted = payload.isCompleted == "true" ? true : false;
	const keys = {
		_id: ObjectId(id),
		uid,
		type: "todo",
	};

	const state = await db.updateField(TOC, keys, {
		$set: payload
	});
	return {
		updated: state.result.n === 1,
		updatedData: state
	};
};

toc.deleteTodo = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;
	const uid = parseInt(req.uid);
	const {
		id
	} = req.params;

	const keys = {
		_id: ObjectId(id),
		uid,
		type: "todo",
	};

	const state = await db.removeField(TOC, keys);
	return {
		deleted: state.result.n === 1
	};
}

// Get a Sarpa Task
toc.getSarpa = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;

	const luid = req.uid;
	const pid = parseInt(req.body.pid);
	if (!pid) throw new Error("pid is required");

	const todoId = parseInt(req.body.todoId);
	if (!todoId) throw new Error("todoId is required");

	let task = await db.findField(TOC, {
		uid: luid,
		pid: pid,
		type: "todos"
	});
	if (!task) throw new Error("TOC not found"); // Check if TOC exists

	task = task.tasks.find((task) => task.todoId === todoId);
	if (!task) throw new Error("Task not found"); // Check if task exists

	return task.sarpa;
};

// Create a new Sarpa task
toc.createSarpa = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;

	const luid = req.uid;
	const pid = parseInt(req.body.pid);
	if (!pid) throw new Error("pid is required");

	const sarpaId = await db.incrObjectField("global", "next_sarpa_id");

	let task = await db.findField(TOC, {
		uid: luid,
		pid: pid,
		type: "todos"
	});
	if (!task) throw new Error("TOC not found"); // Check if TOC exists

	task = task.tasks.find((task) => task.todoId === todoId);
	if (!task) throw new Error("Task not found"); // Check if task exists

	const keys = {
		uid: luid,
		pid: pid,
		type: "todos",
	};


	const dividendTime = () => {
		// 1. Get the task scheduleFrom and scheduleTo time
		// 2. Get the current time
		// 3. Calculate the time difference
		// 4. Divide the time into 15 minutes intervals
		// 5. Return the number of intervals
	};

	const payload = {
		eachSarpa: [{
			sarpaId: sarpaId,
			timeSlot: Date.now(), // dividendTime function will be called here 
			plan: [{
				planCount: req.body.planCount != null ? req.body.planCount : "",
				planName: req.body.planName != null ? req.body.planName : "",
			}, ],
			actual: [{
				actualCount: req.body.actualCount != null ? req.body.actualCount : "",
				actualName: req.body.actualName != null ? req.body.actualName : "",
			}, ],
			comment: req.body.comment != null ? req.body.comment : "",
		}, ], // Array of each sarpa
		createdAt: Date.now(),
	};


	const result = await db.updateField(TOC, keys, {
		$push: {
			sarpa: payload
		}
	}); // create sarpa

	if (!result) throw new Error("Unauthorized write access!");

	return {
		sarpaId,
		payload
	};
};

// Update a Sarpa task by id
toc.updateSarpa = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;
	const luid = req.uid;

	const keys = {
		uid: luid,
		pid: parseInt(req.body.pid),
		sarpaId: parseInt(req.body.sarpaId),
	};


	if (!keys.pid) throw new Error("pid is required");
	if (!keys.sarpaId) throw new Error("sarpaId is required");

	let sarpa = await db.findField(TOC, {
		uid: luid,
		pid: keys.pid,
		type: "todos"
	});
	if (!sarpa) throw new Error("TOC not found"); // Check if TOC exists

	sarpa = sarpa.sarpa.find((sarpa) => sarpa.sarpaId === keys.sarpaId);
	if (!sarpa) throw new Error("Sarpa not found"); // Check if sarpa exists

	const oldSarpa = []; // To store old sarpa

	const newSarpa = {
		eachSarpa: [{
			sarpaId: keys.sarpaId,
			timeSlot: sarpa.timeSlot,
			plan: [{
				planCount: req.body.planCount != null ? req.body.planCount : sarpa.plan.planCount,
				planName: req.body.planName != null ? req.body.planName : sarpa.plan.planName,
			}, ],
			actual: [{
				actualCount: req.body.actualCount != null ? req.body.actualCount : sarpa.actual.actualCount,
				actualName: req.body.actualName != null ? req.body.actualName : sarpa.actual.actualName,
			}, ],
			comment: req.body.comment != null ? req.body.comment : sarpa.comment,
		}, ], // Array of each sarpa
		createdAt: sarpa.createdAt,
		updatedAt: Date.now(),
	};



	const newSarpas = oldSarpa.map((sarpa) => {
		if (sarpa.sarpaId === keys.sarpaId) {
			return newSarpa;
		} else {
			return sarpa;
		}
	});

	const result = await db.updateField(TOC, keys, {
		$set: {
			"task.$[sarpa]": newSarpa
		}
	}); // update sarpa

	if (!result) throw new Error("Unauthorized write access!");

	return {
		sarpaId: keys.sarpaId,
		newSarpa
	};
};

// Delete a Sarpa task by id
toc.deleteSarpa = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;
	const luid = req.uid;

	const keys = {
		uid: luid,
		pid: parseInt(req.body.pid),
		sarpaId: parseInt(req.body.sarpaId),
	};


	if (!keys.pid) throw new Error("pid is required");
	if (!keys.sarpaId) throw new Error("sarpaId is required");

	let sarpa = await db.findField(TOC, {
		uid: luid,
		pid: keys.pid,
		type: "todos"
	});
	if (!sarpa) throw new Error("TOC not found"); // Check if TOC exists

	sarpa = sarpa.sarpa.find((sarpa) => sarpa.sarpaId === keys.sarpaId);
	if (!sarpa) throw new Error("Sarpa not found"); // Check if sarpa exists

	const result = await db.updateField(TOC, keys, {
		$pull: {
			sarpa: {
				sarpaId: keys.sarpaId
			}
		}
	}); // delete sarpa

	if (!result) throw new Error("Unauthorized write access!");

	return {
		deleted: true
	};
};


/**
 * @author raman
 * @description This api will be responsible for creating a journal. 
 * @function createJournal
 * 
 */
toc.createJournal = async (req) => {

	const uid = parseInt(req.uid);
	const {
		category,
		feeling,
		content,
		isPublished = false
	} = req.body
	// if(category && !possibleCategories.includes(category)){
	// 	throw new Error(`invalid category : ${category}`)
	// }

	// if(reason && !possibleReasons.includes(reason)){
	// 	throw new Error(`invalid reason : ${reason}`)
	// }

	// if(isPublished && typeof isPublished !== 'boolean'){
	// 	throw new Error(`invalid type [isPublished] : ${typeof isPublished}`)
	// }

	// const pid = await db.incrObjectField("global", "nextpid");

	// const payload = {
	// 	uid: uid,
	// 	pid: pid,
	// 	type: "journals",
	// 	journals: [],
	// };


	// return { pid, payload, result };

	let createdAt = utils.getISOTimestamp()
	const keys = {
		uid: uid,
		type: 'journal',
		category: category,
		reason: feeling,
		content: content,
		isPublished: isPublished,
		createdAt: createdAt,
		updatedAt: createdAt
	}

	const result = await db.setField(TOCS, keys)

	if (!result) throw new Error("Unauthorized write access!");

	return {
		result
	}
};

toc.addJournal = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;

	const luid = req.uid;
	const pid = parseInt(req.body.pid);
	if (!pid) throw new Error("pid is required");

	const keys = {
		uid: luid,
		pid: pid,
		type: "journals",
	};

	const journalId = await db.incrObjectField("global", "nextjournalId");
	const currentTime = Date.now();

	const payload = {
		journalId: journalId,
		title: req.body.title != null ? req.body.title : "",
		description: req.body.description != null ? req.body.description : "",
		stimulus: req.body.stimulus != null ? req.body.stimulus : "",
		perception: req.body.perception != null ? req.body.perception : "",
		createdAt: currentTime,
		updatedAt: currentTime,
	};

	const result = await db.updateField(TOC, keys, {
		$push: {
			journals: payload,
		}
	});

	if (!result) throw new Error("Unauthorized write access!");

	return {
		journalId,
		payload
	}
};


/**
 * @author raman
 * @description This api will be responsible for fetching journals in following
 * scenarios 
 * -> If [ @param id ] is given in params, provide the corresponding journal. 
 * -> If [slot] is given which is an Object with following properties : 'from', 'to' and
 * provide the journals falling in range [from - to]. Following API expect the 'slot' object
 *  in [req.body]. Format for 'from' and 'to' is [%Y-%m-%d]
 * -> If [id, slot] none is given, than the api will return present day journals, if available.
 * @function getsJournal
 * 
 */

// toc.getsJournal = async (req) => {
// 	const uid = parseInt(req.uid);

// 	const { id } = req.params;

// 	let { limit, page } = req.query;
// 	limit = parseInt(limit) || 5;
// 	page = parseInt(page) || 0;
// 	let {from, to} = req.body
// 	if (id) {
// 	  if (id.length !== 24) throw new Error(`Invalid Journal Id : ${id}`);

// 	  return await db.findField(TOCS, { _id: ObjectId(id), uid: uid, type: 'journal' });
// 	}
// 	let slot = {from,to}
// 	console.log(slot)
// 	if (slot && Object.keys(slot).length) {
// 		console.log('here in slot')
// 	  if (typeof slot !== 'object') {
// 		throw new Error('Slot must be an object, found ' + typeof slot);
// 	  }

// 	  // Check if from and to properties are valid dates
// 	  const fromDate = new Date(slot.from);
// 	  const toDate = new Date(slot.to);
// 	  console.log(fromDate,toDate)
// 	  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
// 		throw new Error('Invalid date format for from/to properties');
// 	  }

// 	  let keys = {
// 		uid: uid,
// 		type: 'journal',
// 		createdAt: {
// 		  $gte: fromDate,
// 		  $lte: toDate,
// 		},
// 	  };

// 	  let [journals, count] = await Promise.all([
// 		db.getFieldsWithPagination(TOCS, keys, limit, page),
// 		db.countDocuments(TOCS, keys),
// 	  ]);

// 	  return utils.paginate(`/toc${req.url}`, journals, count, limit, page);
// 	}

// 	let keys = {
// 	  uid: uid,
// 	  type: 'journal',
// 	};

// 	let [journals, count] = await Promise.all([
// 	  db.getFieldsWithPagination(TOCS, keys, limit, page),
// 	  db.countDocuments(TOCS, keys),
// 	]);

// 	journals = journals.filter((el) => el.content);

// 	return utils.paginate(`/toc${req.url}`, journals, count, limit, page);
//   };

toc.getsJournal = async (req) => {
	const uid = parseInt(req.uid);

	const {
		id
	} = req.params

	let {
		limit,
		page
	} = req.query;
	limit = parseInt(limit) || 5;
	page = parseInt(page) || 0;
	let {
		slot
	} = req.body;

	if (id) {
		if (id.length !== 24)
			throw new Error(`Invalid Journal Id : ${id}`)

		return await db.findField(TOCS, {
			_id: ObjectId(id),
			uid: uid,
			type: 'journal'
		})
	}

	if (slot) {
		if (typeof slot != 'object') {
			throw new Error('Slot must be an object, found ' + typeof slot);
		}

		let keys = {
			uid: uid,
			type: 'journal',
			createdAt: {
				$gte: new Date(slot.from).toISOString(),
				$lte: new Date(slot.to).toISOString()
			}
		}

		let [journals, count] = await Promise.all([
			db.getFieldsWithPagination(TOCS, keys, limit, page),
			db.countDocuments(TOCS, keys)
		])

		return utils.paginate(`/toc${req.url}`, journals, count, limit, page);
	}

	let keys = {
		uid: uid,
		type: 'journal',
	}

	let [journals, count] = await Promise.all([
		db.getFieldsWithPagination(TOCS, keys, limit, page),
		db.countDocuments(TOCS, keys)
	])

	journals = journals.filter(el => el.content);

	return utils.paginate(`/toc${req.url}`, journals, count, limit, page);

	// const pid = parseInt(req.body.pid);
	// if (!pid) throw new Error("pid is required");

	// let journals = await db.findFields(TOC, {	uid: luid, pid: pid, type: "journals"});
	// if (!journals) throw new Error("Journal not found");

	// return { journals };

};

toc.getsPublishedJournal = async (req) => {
	const uid = parseInt(req.uid);

	const {
		id
	} = req.params

	let {
		limit,
		page
	} = req.query;
	limit = parseInt(limit) || 5;
	page = parseInt(page) || 0;
	let {
		slot
	} = req.body;

	if (id) {
		if (id.length !== 24)
			throw new Error(`Invalid Journal Id : ${id}`)

		return await db.findField(TOCS, {
			_id: ObjectId(id),
			uid: uid,
			type: 'journal'
		})
	}

	if (slot) {
		if (typeof slot != 'object') {
			throw new Error('Slot must be an object, found ' + typeof slot);
		}

		let keys = {
			uid: uid,
			type: 'journal',
			createdAt: {
				$gte: new Date(slot.from).toISOString(),
				$lte: new Date(slot.to).toISOString()
			}
		}

		let [journals, count] = await Promise.all([
			db.getFieldsWithPagination(TOCS, keys, limit, page),
			db.countDocuments(TOCS, keys)
		])

		return utils.paginate(`/toc${req.url}`, journals, count, limit, page);
	}

	let keys = {
		type: 'journal',
		isPublished: true,
	}

	let [journals, count] = await Promise.all([
		db.getFieldsWithPagination(TOCS, keys, limit, page),
		db.countDocuments(TOCS, keys)
	])

	journals = journals.filter(el => el.content);

	async function getUserDatawithLearnings(journals) {

		// collect all uids
		let uids = journals.map(e => parseInt(e.uid));

		/// remove duplicate
		uids = [...(new Set(uids))];


		// find all data
		let users = await user.getUsersFields(uids, ['picture', 'username']);

		/// map it back 
		journals = journals.map(function(e) {
			e.user = ((users || []).find(user => user.uid == e.uid) || {});
			return e;
		});


	}


	await getUserDatawithLearnings(journals)
	return utils.paginate(`/toc${req.url}`, journals, count, limit, page);

	// const pid = parseInt(req.body.pid);
	// if (!pid) throw new Error("pid is required");

	// let journals = await db.findFields(TOC, {	uid: luid, pid: pid, type: "journals"});
	// if (!journals) throw new Error("Journal not found");

	// return { journals };

};

/**
 * @author raman
 * @description This api will be responsible for updating journals, based on given [journalId].
 * There are four fields to update in a typical journal.
 * [category, reason, content, isPublished]. Please follow the possible values for category and reason.
 * If anyone of the above fields is given will be udpated. To update a particular field in a journal
 * , the API does not depends on other fields except the [journalId].
 * Updatable Fields are expected to be in [req.body].
 * @function updateJournal
 * 
 */
toc.updateJournal = async (req) => {
	const uid = parseInt(req.uid);
	// const pid = parseInt(req.body.pid);
	// if (!pid) throw new Error("pid is required");

	const {
		category,
		reason,
		isPublished,
		journalId
	} = req.body

	// if(category && !possibleCategories.includes(category)){
	// 	throw new Error(`invalid category : ${category}`)
	// }

	// if(reason && !possibleReasons.includes(reason)){
	// 	throw new Error(`invalid reason : ${reason}`)
	// }

	// if(isPublished && typeof isPublished !== 'boolean'){
	// 	throw new Error(`invalid type [isPublished] : ${typeof isPublished}`)
	// }

	if (journalId.length !== 24) throw new Error(`Invalid Journal Id : ${journalId}`)

	let journal = await db.findField(TOCS, {
		_id: ObjectId(journalId),
		uid: uid,
		type: 'journal'
	})
	if (!journal) throw new Error(`no journal exists with id ${journalId}`);

	let keys = {
		$set: {}
	}

	// ['title', 'status', 'priority', 'description','priority_reason','scheduleFrom','scheduleTo','isCompleted'].forEach((elem) => {
	// 	if (req.body[elem]) {
	// 		payload[elem] = req.body[elem];
	// 	}
	// });
	let payload = {}
	let fields = ['category', 'reason', 'isPublished', 'content']

	fields.forEach((field) => {
		if (req.body[field]) {
			payload[field] = req.body[field];
		}
	})

	payload.isPublished = payload.isPublished == "true" ? true : false;

	//const state = await db.updateField(TOC, keys, { $set: payload});

	if (Object.entries(keys).length > 0) {
		payload.updatedAt = utils.getISOTimestamp();
		await db.updateField(TOCS, {
			_id: ObjectId(journalId),
			uid: uid,
			type: 'journal'
		}, {
			$set: payload
		})
	}

	// let keys = {
	// 	$set:{
	// 		category:category || journal.category,
	// 		reason: reason || journal.reason,
	// 		content:content || journal.content,
	// 		isPublished: isPublished,
	// 		updatedAt: utils.getISOTimestamp()
	// 	}
	// }


	// journal = journal.journals.find((j) => j.journalId === journalId);
	// if (!journal) throw new Error("Journal not found");

	// const currentTime = Date.now();

	// const oldJournal = [];

	// const newJournal = {
	// 	journalId: journalId,
	// 	title: req.body.title != null ? req.body.title : journal.title,
	// 	description:
	// 		req.body.description != null ? req.body.description : journal.description,
	// 	stimulus: req.body.stimulus != null ? req.body.stimulus : journal.stimulus,
	// 	perception:
	// 		req.body.perception != null ? req.body.perception : journal.perception,
	// 	createdAt: journal.createdAt,
	// 	updatedAt: currentTime,
	// };

	// const newJournals = oldJournal.map((j) => {
	// 	if (j.journalId === journalId) {
	// 		return newJournal;
	// 	} else {
	// 		return j;
	// 	}
	// });

	// const keys = {
	// 	uid: luid,
	// 	pid: pid,
	// 	type: "journals",
	// 	"journals.journalId": journalId,
	// };

	// const result = await db.updateField(TOC, keys, { $set: { "journals.$": newJournal	}});

	// if (!result) throw new Error("Unauthorized write access!");

	// return { journalId: keys.journalId, newJournal };
};

/**
 * @author raman
 * @description This api will be responsible for removing a journal based on the [id] field
 * @param id the id of the journal
 * @function deleteJournal
 * 
 */
toc.deleteJournal = async (req) => {
	const uid = parseInt(req.uid);
	// const pid = parseInt(req.body.pid);
	// if (!pid) throw new Error("pid is required");

	// const journalId = parseInt(req.body.journalId);
	// if (!journalId) throw new Error("journalId is required");

	// let journal = await db.findField(TOC, {	uid: luid, pid: pid, type: "journals",});
	// if (!journal) throw new Error("Journals not found");
	// journal = journal.journals.find((j) => j.journalId === journalId);
	// if (!journal) throw new Error("Journal not found");

	// const keys = {
	// 	uid: luid,
	// 	pid: pid,
	// 	type: "journals",
	// 	"journals.journalId": journalId,
	// };

	// const result = await db.updateField(TOC, keys, {
	// 	$pull: { journals: { journalId: journalId } },
	// });

	// if (result) {
	// 	return { deleted: true };
	// }

	// if (!result) {
	// 	throw new Error("Unauthorized write access!");
	// }

	if (await db.findField(TOCS, {
			_id: ObjectId(req.params.id),
			uid: uid,
			type: 'journal'
		})) {
		await db.removeField(TOCS, {
			_id: ObjectId(req.params.id),
			uid: uid,
			type: 'journal'
		})
	} else {
		throw new Error(`no journal exists with id ${req.params.id}`)
	}
};

toc.addToc = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;
	let uid = parseInt(req.uid);
	let data = req.body.data;
	let weekNum = req.body.weekNum;
	console.log(weekNum)
	const pid = await db.incrObjectField("global", "nextPid");
	let payload = {
		uid: uid,
		pid,
		_key: `${weekNum}`,
		data: data,
		createdAt: utils.getISOTimestamp(),
		updatedAt: utils.getISOTimestamp()
	}
	const result = await db.setField(TOC, payload);
	if (result) {
		return payload;
	}
};

toc.updateToc = async (req, res) => {
	const TOC = db.collections.GLOBAL.TOC;

	const uid = req.uid;
	const weekNum = req.body.weekNum;
	const data = req.body.data;
	const pid = parseInt(req.body.pid);

	if (!data) throw new Error("data is required");
	if (!weekNum) throw new Error("date is required");

	let keys = {};
	keys.uid = uid;
	keys._key = `${weekNum}`;
	keys.pid = pid;




	const result = await db.updateField(TOC, keys, {
		$set: {
			data: data
		}
	});

	if (!result) throw new Error("Unauthorized write access!");

	return data;
}

/**
 * @author mohit
 * @description This api is to post reflections 
 * from self grow
 * @function createReflection
 * 
 */
toc.createReflection = async (req) => {
	const uid = parseInt(req.uid);
	const {
		ISOweek
	} = req.params;
	const {
		reflection,
		today
	} = req.body
	let createdAt = utils.getISOTimestamp()
	const keys = {
		uid: uid,
		type: 'selfgrow-reflection',
		reflection: reflection,
		createdAt: today,
		updatedAt: createdAt,
		ISOweek: ISOweek,
	}

	const result = await db.setField(TOCS, keys)

	if (!result) throw new Error("Unauthorized write access!");

	return {
		result
	}
};

/**
 * @author mohit
 * @description This api is to set the learning milestone for the week
 * @function createReflection
 * id 
_key
learning
uid 
type
createdat
isAcomplished
Reflection
Description
week
 */

toc.setLearningWeekly = async (req) => {

	const TOC = db.collections.GLOBAL.TOC;
	let uid = parseInt(req.uid);
	let payload = req.body;
	payload.type = "learning"
	payload.uid = uid;
	payload.isAcomplished = false;
	payload.ISOweek = req.params.ISOweek;
	payload.createdAt = Date.now()
	payload.reflection = "";
	payload.isPublished = false;
	const result = await db.setField(TOC, payload);
	if (result) {
		return result;
	}

}

toc.updateLearningWeekly = async (req) => {
	// const TOC = db.collections.GLOBAL.TOC;
	const uid = parseInt(req.uid);
	const currentTime = utils.getISOTimestamp();
	const {
		id
	} = req.params;
	if (!id) {
		throw new Error("Id is not passed !")
	}

	const payload = {};
	['ISOweek', 'learning', 'isAcomplished', 'createdAt', 'reflection', 'isPublished'].forEach((elem) => {
		if (req.body[elem]) {
			payload[elem] = req.body[elem];
		}
	});
	if (payload.isAcomplished) {
		payload.isAcomplished = payload.isAcomplished == "true" ? true : false;
	}
	if (payload.isPublished) {
		payload.isPublished = payload.isPublished == "true" ? true : false;
	}

	const keys = {
		_id: ObjectId(id),
		uid,
		type: "learning",
	};


	// const state = await db.updateField(TOC, keys, { $set: payload });
	// return { updated: state.result.n === 1, updatedData: state };
	payload.updatedAt = currentTime;
	const state = await db.updateField(TOCS, keys, {
		$set: payload
	});
	return {
		updated: state.result.n === 1,
		updatedData: state
	};

}

toc.deleteLearning = async (req) => {
	const uid = parseInt(req.uid);
	const {
		id
	} = req.params;
	if (!id) {
		throw new Error("Id is not passed !")
	}

	const keys = {
		_id: ObjectId(id),
		uid,
		type: "learning",
	};

	const state = await db.removeField(TOCS, keys);
	return {
		deleted: state.result.n === 1
	};

}

toc.deleteSelfGrowReflection = async (req) => {
	const uid = parseInt(req.uid);
	const {
		id
	} = req.params;
	if (!id) {
		throw new Error("Id is not passed !")
	}

	const keys = {
		_id: ObjectId(id),
		uid,
		type: "selfgrow-reflection",
	};

	const state = await db.removeField(TOCS, keys);
	return {
		deleted: state.result.n === 1
	};
}
toc.getStreak = async (req) => {
	/**
	 * 
	 * 
	 * let model = {
	 * 
	 * 	_key: "streak",
	 * 	user: `user:${uid}`,
	 * 	uid: uid,
	 * 	currentStreak: 0,
	 * 	history: {
	 * 				"2023-03-24": 1,
	 * 				"2023-03-25": 1,
	 * 				"2023-03-26": 0,
	 * 		}
	 * }
	 * 
	 */

	const uid = parseInt(req.uid);
	const keys = {
		_key: "streak",
		user: `user:${uid}`,
	};
	let streak = await db.findField(TOCS, keys);

	streak = streak || {
		_key: "streak",
		user: `user:${uid}`,
		uid: uid,
		currentStreak: 0,
		history: {
			"2023-03-24": 0,
		},
	};

	let currentDate = moment().format("YYYY-MM-DD");
	if (streak.history[currentDate]) return streak;

	let lastStreakDate = Object.keys(streak.history).reverse()[0];
	let prevDate = moment().subtract(1, 'days').format("YYYY-MM-DD");

	// fill the gap between last streak date and current date

	while (lastStreakDate != prevDate) {
		let date = moment(lastStreakDate).format("YYYY-MM-DD");
		date = moment(date).add(1, 'days').format("YYYY-MM-DD");
		lastStreakDate = date;
		streak.history[lastStreakDate] = 0;
	}

	// if last date is 1 then increase the streak else reset the streak
	if (streak.history[lastStreakDate]) streak.currentStreak += 1;
	else streak.currentStreak = 1;

	// update the current date streak
	streak.history[currentDate] = 1;

	return streak;
}

toc.updateStreak = async (req) => {
	const uid = parseInt(req.uid);
	const keys = {
		_key: "streak",
		user: `user:${uid}`,
		uid,
	};

	let streak = await toc.getStreak(req);
	streak.updatedAt = moment()
	const state = await db.updateField(TOCS, keys, {
		$set: streak
	}, {
		upsert: true
	});
	return {
		updated: state.result.n === 1,
		updatedData: state
	};

}

toc.getLearningsPublicReflections = async (req) => {
	const uid = parseInt(req.uid);

	const {
		id
	} = req.params

	let {
		limit,
		page
	} = req.query;
	limit = parseInt(limit) || 5;
	page = parseInt(page) || 0;
	let {
		slot
	} = req.body;

	if (id) {
		if (id.length !== 24)
			throw new Error(`Invalid learning Id : ${id}`)

		return await db.findField(TOCS, {
			_id: ObjectId(id),
			uid: uid,
			type: 'learning'
		})
	}

	if (slot) {
		if (typeof slot != 'object') {
			throw new Error('Slot must be an object, found ' + typeof slot);
		}

		let keys = {
			uid: uid,
			type: 'learning',
			createdAt: {
				$gte: new Date(slot.from).toISOString(),
				$lte: new Date(slot.to).toISOString()
			}
		}

		let [learnings, count] = await Promise.all([
			db.getFieldsWithPagination(TOCS, keys, limit, page),
			db.countDocuments(TOCS, keys)
		])

		return utils.paginate(`/toc${req.url}`, journals, count, limit, page);
	}

	let keys = {
		type: "learning",
		isPublished: true,
	}

	let [learnings, count] = await Promise.all([
		db.getFieldsWithPagination(TOCS, keys, limit, page),
		db.countDocuments(TOCS, keys)
	])

	//user.getUserFields([uid], ['picture', 'fullname']);

	learnings = learnings.filter(el => el.learning);

	async function getUserDatawithLearnings(learnings) {

		// collect all uids
		let uids = learnings.map(e => parseInt(e.uid));

		/// remove duplicate
		uids = [...(new Set(uids))];


		// find all data
		let users = await user.getUsersFields(uids, ['picture', 'username']);

		/// map it back 
		learnings = learnings.map(function(e) {
			e.user = ((users || []).find(user => user.uid == e.uid) || {});
			return e;
		});


	}


	await getUserDatawithLearnings(learnings)
	return utils.paginate(`/toc${req.url}`, learnings, count, limit, page);
}
// // Create Journal
// toc.createJournal = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;

// 	const uid = parseInt(req.uid);
// 	const pid = await db.incrObjectField("global", "nextpid");

// 	const payload = {
// 		uid: uid,
// 		pid: pid,
// 		type: "journals",
// 		journals: [],
// 	};

// 	const result = await db.setField(TOC, payload);

// 	return { pid, payload, result };
// };

// toc.addJournal = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;

// 	const luid = req.uid;
// 	const pid = parseInt(req.body.pid);
// 	if (!pid) throw new Error("pid is required");

// 	const keys = {
// 		uid: luid,
// 		pid: pid,
// 		type: "journals",
// 	};

// 	const journalId = await db.incrObjectField("global", "nextjournalId");
// 	const currentTime = Date.now();

// 	const payload = {
// 		journalId: journalId,
// 		title: req.body.title != null ? req.body.title : "",
// 		description: req.body.description != null ? req.body.description : "",
// 		stimulus: req.body.stimulus != null ? req.body.stimulus : "",
// 		perception: req.body.perception != null ? req.body.perception : "",
// 		createdAt: currentTime,
// 		updatedAt: currentTime,
// 	};

// 	const result = await db.updateField(TOC, keys, { $push: {	journals: payload, }});

// 	if (!result) throw new Error("Unauthorized write access!");

// 	return { journalId, payload }
// };

// // Get Jornal by id
// toc.getsJournal = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;

// 	const luid = req.uid;
// 	const pid = parseInt(req.body.pid);
// 	if (!pid) throw new Error("pid is required");

// 	let journals = await db.findFields(TOC, {	uid: luid, pid: pid, type: "journals"});
// 	if (!journals) throw new Error("Journal not found");

// 	return { journals };
// };

// // Update a Jornal by id
// toc.updateJournal = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;

// 	const luid = req.uid;
// 	const pid = parseInt(req.body.pid);
// 	if (!pid) throw new Error("pid is required");

// 	const journalId = parseInt(req.body.journalId);
// 	if (!journalId) throw new Error("journalId is required");

// 	let journal = await db.findField(TOC, {	uid: luid, pid: pid, type: "journals"});
// 	if (!journal) throw new Error("Journals not found");
// 	journal = journal.journals.find((j) => j.journalId === journalId);
// 	if (!journal) throw new Error("Journal not found");

// 	const currentTime = Date.now();

// 	const oldJournal = [];

// 	const newJournal = {
// 		journalId: journalId,
// 		title: req.body.title != null ? req.body.title : journal.title,
// 		description:
// 			req.body.description != null ? req.body.description : journal.description,
// 		stimulus: req.body.stimulus != null ? req.body.stimulus : journal.stimulus,
// 		perception:
// 			req.body.perception != null ? req.body.perception : journal.perception,
// 		createdAt: journal.createdAt,
// 		updatedAt: currentTime,
// 	};

// 	const newJournals = oldJournal.map((j) => {
// 		if (j.journalId === journalId) {
// 			return newJournal;
// 		} else {
// 			return j;
// 		}
// 	});

// 	const keys = {
// 		uid: luid,
// 		pid: pid,
// 		type: "journals",
// 		"journals.journalId": journalId,
// 	};

// 	const result = await db.updateField(TOC, keys, { $set: { "journals.$": newJournal	}});

// 	if (!result) throw new Error("Unauthorized write access!");

// 	return { journalId: keys.journalId, newJournal };
// };

// // Delete a Jornal by tid
// toc.deleteJournal = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;

// 	const luid = req.uid;
// 	const pid = parseInt(req.body.pid);
// 	if (!pid) throw new Error("pid is required");

// 	const journalId = parseInt(req.body.journalId);
// 	if (!journalId) throw new Error("journalId is required");

// 	let journal = await db.findField(TOC, {	uid: luid, pid: pid, type: "journals",});
// 	if (!journal) throw new Error("Journals not found");
// 	journal = journal.journals.find((j) => j.journalId === journalId);
// 	if (!journal) throw new Error("Journal not found");

// 	const keys = {
// 		uid: luid,
// 		pid: pid,
// 		type: "journals",
// 		"journals.journalId": journalId,
// 	};

// 	const result = await db.updateField(TOC, keys, {
// 		$pull: { journals: { journalId: journalId } },
// 	});

// 	if (result) {
// 		return { deleted: true };
// 	}

// 	if (!result) {
// 		throw new Error("Unauthorized write access!");
// 	}
// };












// /**
//  * @author: Rahul Ranjan
//  * @description: Crud operations for TOC
//  */

// // Create Calendar
// toc.addCalendarInfo = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;

// 	const uid = parseInt(req.uid);


// 	const payload = {
// 		uid: uid,
// 		type: "calendar",
// 		calendarInfo: [
// 			{
// 				id: "1",
// 				name: "Hackathon",
// 				color: "#ffffff",
// 				borderColor: "#9e5fff",
// 				backgroundColor: "#9e5fff",
// 				dragBackgroundColor: "#9e5fff",
// 			},
// 			{
// 				id: "2",
// 				name: "Learning",
// 				color: "#ffffff",
// 				borderColor: "#00a9ff",
// 				backgroundColor: "#00a9ff",
// 				dragBackgroundColor: "#00a9ff",
// 			},
// 			{
// 				id: "3",
// 				name: "Progress",
// 				color: "#ffffee",
// 				borderColor: "#DB473F",
// 				backgroundColor: "#DB473F",
// 				dragBackgroundColor: "#DB473F",
// 			},
// 		],
// 		calendar: [],
// 		createdAt: Date.now(),
// 		updatedAt: Date.now(),
// 	};
//
// 	const result = await db.setField(TOC, payload);
//
// 	if (result) {
// 		return {
// 			status: "success",
// 			message: "Calendar info added successfully",
// 			data: payload,
// 		};
// 	}
// };
// // Create Calendar
// toc.createCalendar = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;

// 	const luid = req.uid;

// 	console.log(req.body);
// 	console.log(req.query);

// 	const keys = {
// 		uid: luid,
// 		_id : ObjectId(req.body.id),
// 		type: "calendar", 
// 	};
// 	if (!keys._id) throw new Error("id is required");
// 	console.log("keys", keys);

// 	let calendarInfo = await db.findFields(TOC, keys);
// 	console.log("calendarInfo", calendarInfo);
// 	if (!calendarInfo) throw new Error("Calendar not found");

// 	const payload = {
// 		uid: luid,
// 		calendarId: req.body.calendarId,
// 		title: req.body.title != null ? req.body.title : "",
// 		body: req.body.body != null ? req.body.body : "",
// 		isAllDay: false,
// 		start: req.body.start,
// 		end: req.body.end,
// 		state: req.body.state != null ? req.body.state : "",
// 		category: req.body.category != null ? req.body.category : "",
// 		location: req.body.location != null ? req.body.location : "",
// 		isPrivate: false,
// 		isReadOnly: false,
// 		comingDuration: req.body.comingDuration != null ? req.body.comingDuration : "",
// 		goingDuration: req.body.goingDuration != null ? req.body.goingDuration : "",
// 		attendess: [],
// 		recureenceRule: req.body.recureenceRule != null ? req.body.recureenceRule : "",
// 		isVisibile: true,
// 		isPending: false,
// 		isFocused: false,
// 		color: "#00bcd4",
// 		borderColor: "#00bcd4",
// 		dragBackgroundColor: "#00bcd4",
// 		backgroundColor: "#00bcd4",
// 		customStyle: {
// 			backgroundColor: "#00bcd4",
// 			borderColor: "#00bcd4",
// 			color: "#00bcd4",
// 			dragBackgroundColor: "#00bcd4",
// 		},
// 		raw: {},
// 		createdAt: Date.now(),
// 		updatedAt: Date.now(),
// 	};
// 	console.log("payload", payload);

// 	const result = await db.updateField(TOC, keys, { $push: { calendar: payload }});
// 	console.log("result", result);
// 	if (result) {
// 		return {
// 			success: true,
// 			message: "Calendar Created Successfully",
// 			data: payload,
// 		};
// 	}
// };

// // Get Calendar

// toc.getCalendar = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;
// 	const uid = parseInt(req.uid);

// 	const keys = {
// 		uid: uid,
// 		type: "calendar",
// 	};
// 	console.log("keys", keys);
// 	const result = await db.findFields(TOC, keys);
// 	console.log("result", result);
// 	return result;
// };

// // update Calendar

// toc.updateCalendar = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;
// 	const uid = parseInt(req.uid);

// 	const keys = {
// 		uid: uid,
// 		type: "calendar",
// 	};

// 	let calander = await db.findFields(TOC, keys);
// 	if (!calander) throw new Error("Calendar not found");

// 	const oldCalendar = [...calander.calendar];
// 	console.log("oldCalendar", oldCalendar);

// 	const newCalendar = {
// 		calendarId: req.body.calendarId != null ? req.body.calendarId : calander.calendarId,
// 		title: req.body.title != null ? req.body.title : calander.title,
// 		body: req.body.body != null ? req.body.body : calander.body,
// 		isAllDay: false != null ? false : calander.isAllDay,
// 		start: req.body.start != null ? req.body.start : calander.start,
// 		end: req.body.end != null ? req.body.end : calander.end,
// 		state: req.body.state != null ? req.body.state : calander.state,
// 		category: req.body.category != null ? req.body.category : calander.category,
// 		location: req.body.location != null ? req.body.location :	calander.location,
// 		isPrivate: false != null ? false : calander.isPrivate,
// 		isReadOnly: false != null ? false : calander.isReadOnly,
// 		comingDuration: req.body.comingDuration != null ? req.body.comingDuration : calander.comingDuration,
// 		goingDuration: req.body.goingDuration != null ? req.body.goingDuration : calander.goingDuration,
// 		attendess: [] != null ? [] : calander.attendess,
// 		recureenceRule: req.body.recureenceRule != null ? req.body.recureenceRule : calander.recureenceRule,
// 		isVisibile: true != null ? true : calander.isVisibile,
// 		isPending: false != null ? false : calander.isPending,
// 		isFocused: false != null ? false : calander.isFocused,
// 		color: "#00bcd4" != null ? "#00bcd4" : calander.color,
// 		borderColor: "#00bcd4" != null ? "#00bcd4" : calander.borderColor,
// 		dragBackgroundColor: "#00bcd4" != null ? "#00bcd4" : calander.dragBackgroundColor,
// 		backgroundColor: "#00bcd4" != null ? "#00bcd4" : calander.backgroundColor,
// 		customStyle: {
// 			backgroundColor: "#00bcd4" != null ? "#00bcd4" : calander.customStyle.backgroundColor,
// 			borderColor: "#00bcd4" != null ? "#00bcd4" : calander.customStyle.borderColor,
// 			color: "#00bcd4" != null ? "#00bcd4" : calander.customStyle.color,
// 			dragBackgroundColor: "#00bcd4" != null ? "#00bcd4" : calander.customStyle.dragBackgroundColor,
// 		},
// 		raw: {} != null ? {} : calander.raw,
// 		createdAt: calander.createdAt,
// 		updatedAt: Date.now(),
// 	}
// 	console.log("newCalendar", newCalendar);

// 	const result = await db.updateField(TOC, keys, { $set: { calendar: newCalendar }});
// 	if (!result) throw new Error("Calendar not updated");
// 	console.log("result", result);

// 	return { newCalendar };
// };






// // Get a Sarpa Task
// toc.getSarpa = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;

// 	const luid = req.uid;
// 	const pid = parseInt(req.body.pid);
// 	if (!pid) throw new Error("pid is required");

// 	const todoId = parseInt(req.body.todoId);
// 	if (!todoId) throw new Error("todoId is required");

// 	let task = await db.findField(TOC, { uid: luid, pid: pid, type: "todos" });
// 	if (!task) throw new Error("TOC not found"); // Check if TOC exists

// 	task = task.tasks.find((task) => task.todoId === todoId);
// 	if (!task) throw new Error("Task not found"); // Check if task exists

// 	return task.sarpa;
// };

// // Create a new Sarpa task
// toc.createSarpa = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;

// 	const luid = req.uid;
// 	const pid = parseInt(req.body.pid);
// 	if (!pid) throw new Error("pid is required");

// 	const sarpaId = await db.incrObjectField("global", "next_sarpa_id"); 

// 	let task = await db.findField(TOC, { uid: luid, pid: pid, type: "todos" });
// 	if (!task) throw new Error("TOC not found"); // Check if TOC exists

// 	task = task.tasks.find((task) => task.todoId === todoId);
// 	if (!task) throw new Error("Task not found"); // Check if task exists

// 	const keys = {
// 		uid: luid,
// 		pid: pid,
// 		type: "todos",
// 	};
// 	console.log(keys);

// 	const dividendTime = () => {
// 		// 1. Get the task scheduleFrom and scheduleTo time
// 		// 2. Get the current time
// 		// 3. Calculate the time difference
// 		// 4. Divide the time into 15 minutes intervals
// 		// 5. Return the number of intervals
// 	};

// 	const payload = {
// 		eachSarpa: [
// 			{
// 				sarpaId: sarpaId,
// 				timeSlot: Date.now(), // dividendTime function will be called here 
// 				plan: [
// 					{
// 						planCount: req.body.planCount != null ? req.body.planCount : "",
// 						planName: req.body.planName != null ? req.body.planName : "",
// 					},
// 				],
// 				actual: [
// 					{
// 						actualCount: req.body.actualCount != null ? req.body.actualCount : "",
// 						actualName: req.body.actualName != null ? req.body.actualName : "",
// 					},
// 				],
// 				comment: req.body.comment != null ? req.body.comment : "",
// 			},
// 		], // Array of each sarpa
// 		createdAt: Date.now(),
// 	};
// 	console.log(payload);

// 	const result = await db.updateField(TOC, keys, { $push: { sarpa: payload }}); // create sarpa

// 	if (!result) throw new Error("Unauthorized write access!");

// 	return { sarpaId, payload };
// };

// // Update a Sarpa task by id
// toc.updateSarpa = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;
// 	const luid = req.uid;

// 	const keys = {
// 		uid: luid,
// 		pid: parseInt(req.body.pid),
// 		sarpaId: parseInt(req.body.sarpaId),
// 	};
// 	console.log(keys);

// 	if(!keys.pid) throw new Error("pid is required");
// 	if(!keys.sarpaId) throw new Error("sarpaId is required");

// 	let sarpa = await db.findField(TOC, { uid: luid, pid: keys.pid, type: "todos" });
// 	if (!sarpa) throw new Error("TOC not found"); // Check if TOC exists

// 	sarpa = sarpa.sarpa.find((sarpa) => sarpa.sarpaId === keys.sarpaId);
// 	if (!sarpa) throw new Error("Sarpa not found"); // Check if sarpa exists

// 	const oldSarpa = []; // To store old sarpa

// 	const newSarpa = {
// 		eachSarpa: [
// 			{
// 				sarpaId: keys.sarpaId,
// 				timeSlot: sarpa.timeSlot,
// 				plan: [
// 					{
// 						planCount: req.body.planCount != null ? req.body.planCount : sarpa.plan.planCount,
// 						planName: req.body.planName != null ? req.body.planName : sarpa.plan.planName,
// 					},
// 				],
// 				actual: [
// 					{
// 						actualCount: req.body.actualCount != null ? req.body.actualCount : sarpa.actual.actualCount,
// 						actualName: req.body.actualName != null ? req.body.actualName : sarpa.actual.actualName,
// 					},
// 				],
// 				comment: req.body.comment != null ? req.body.comment : sarpa.comment,
// 			},
// 		], // Array of each sarpa
// 		createdAt: sarpa.createdAt,
// 		updatedAt: Date.now(),
// 	};
// 	console.log(newSarpa);

// 	const newSarpas = oldSarpa.map((sarpa) => {
// 		if (sarpa.sarpaId === keys.sarpaId) {
// 			return newSarpa;
// 		} else {
// 			return sarpa;
// 	}}); 

// 	const result = await db.updateField(TOC, keys, { $set: { "task.$[sarpa]": newSarpa }}); // update sarpa

// 	if (!result) throw new Error("Unauthorized write access!");

// 	return { sarpaId: keys.sarpaId, newSarpa };
// };

// // Delete a Sarpa task by id
// toc.deleteSarpa = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;
// 	const luid = req.uid;

// 	const keys = {
// 		uid: luid,
// 		pid: parseInt(req.body.pid),
// 		sarpaId: parseInt(req.body.sarpaId),
// 	};
// 	console.log(keys);

// 	if(!keys.pid) throw new Error("pid is required");
// 	if(!keys.sarpaId) throw new Error("sarpaId is required");

// 	let sarpa = await db.findField(TOC, { uid: luid, pid: keys.pid, type: "todos" });
// 	if (!sarpa) throw new Error("TOC not found"); // Check if TOC exists

// 	sarpa = sarpa.sarpa.find((sarpa) => sarpa.sarpaId === keys.sarpaId);
// 	if (!sarpa) throw new Error("Sarpa not found"); // Check if sarpa exists

// 	const result = await db.updateField(TOC, keys, { $pull: { sarpa: { sarpaId: keys.sarpaId }}}); // delete sarpa

// 	if (!result) throw new Error("Unauthorized write access!");

// 	return { deleted: true };
// };





// // Create a new task
// toc.createTask = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;

// 	const uid = parseInt(req.uid);
// 	const pid = await db.incrObjectField("global", "nextPid");

// 	const payload = {
// 		uid: uid,
// 		pid: pid,
// 		type: "todos", 
// 		tasks: [], // array of tasks
// 	};

// 	const result = await db.setField(TOC, payload); // create a new TOC

// 	if (result) {
// 		return {
// 			pid: pid,
// 			payload: payload,
// 		};
// 	}
// };


// // Getting tasks of a user
// toc.getsTask = async (req, res) => {
// 	const TOC = db.collections.GLOBAL.TOC;

// 	const luid = req.uid;
// 	const pid = parseInt(req.body.pid);
// 	if (!pid) throw new Error("pid is required");

// 	let task = await db.findFields(TOC, { uid: luid, pid: pid, type: "todos" }); // get task of a user
// 	if (!task) throw new Error("TOC not found");

// 	return task; 
// };

const getDate = (dateString) => dateString.split('T')[0]