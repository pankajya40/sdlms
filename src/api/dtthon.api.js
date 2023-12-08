'use strict';

const fs = require('fs');
const path = require('path');
const { baseDir } = require('../constants').paths;
const _ = require('lodash');
const categories = require('../categories');
const db = require('../database');
const user = require('../user');
const plugins = require('../plugins');
const slugify = require('../slugify');
const userPrivileges = require('../privileges');
const utils = require('../controllers/utils');

const dtthon = module.exports;

/**
 * @author: Shubham Bawner
 * @description: crud for project
 */

/**
 * @author: Rahul Ranjan
 * @description: added missing fields in the project
 */

/** for testing: "tid": 370 */

dtthon.createProject = async function (req) {
	try {
		// db.creditDetails.insertOne({test: "test"});
		const tag = req.body.tags || [];

		const payload = {
			mainPid: 0,
			lastposttime: 0,
			postcount: 0,
			viewcount: 0,
			cid: parseInt(req.body.cid),
			uid: req.uid, // recruiter uid
			title: req.body.title || '',
			globalTags: tag, //! store slugified tag names as: tag:<slugified_tag_name>, use _key aspect of tag

			type: 'project',
			tasks: req.body.tasks || [], //*
			faqs: [], // faqs will be stored here
			status: req.body.status || 'draft', // published, draft, closed, visible

			short_description: req.body.short_description || '', //*
			description: req.body.description || '', //*
			// start_time: null, //*
			// end_time: (Array.isArray(req.body.end_time) ? req.body.end_time : JSON.parse(req.body.end_time)).map(N => parseInt(N)),
			learning_outcomes: req.body.learning_outcomes || [],
			pre_requisites: req.body.pre_requisites || [],
			project_image: req.body.project_image || '',

			isActive: false,

			// Rahul
			category: req.body.category || '',
			commitment: req.body.commitment || '',
			deadline: req.body.deadline || '',

			// tools: req.body.tools != null ? req.body.tools : [], deleted
			native_tid: req.body.native_tid,
			native_uid: req.body.native_uid,
		};

		if (req.body.commitment_type) payload.commitment_type = req.body.commitment_type.toLowerCase();

		if (req.body.scorecardId) {
			const scorecardId = parseInt(req.body.scorecardId);
			const res = await db.findField(db.collections.SCORECARD.TEMPLATE,
				{
					tid: scorecardId,
					type: 'social_scorecard_template',
				}
			);
			if (res.status === 'published' && res.isActive) {
				payload.scorecardId = scorecardId;
				payload.scorecardTitle = res.title;
				payload.scorecardAssociationTime = Date.now();
			} else {
				throw new Error('This Scorecard Template cannot be used!');
			}
		}

		const tid = await createDtThonTopic(payload);

		return {
			tid,
			payload,
		};
	} catch (e) {
		console.error(e);
		throw new Error(e.message);
	}
};

/**
 * published: see and make submission
 * visible: see but not make submission
 * draft: not visible
 * closed: not visible, end time is noted while closing it.
 */

const collectionName = db.collections.DEFAULT;
dtthon.editProject = async function (req) {
	if (req.body.clone) return await this.cloneProject(req);

	const luid = parseInt(req.uid);
	const currentTime = Date.now();

	if (!req.uid || luid < 1) throw new Error('Unauthorized');

	let {
		pre_requisites,
		learning_outcomes,
		status,
		tid,
		scorecardId,
	} = req.body;
	const keys = {
		uid: luid,
		tid: parseInt(tid),
		type: 'project',
	};
	const parsedData = {};

	try {
		pre_requisites = JSON.parse(pre_requisites);
		learning_outcomes = JSON.parse(learning_outcomes);
	} catch (err) {
		console.log(err);
	}

	['content', 'title', 'short_description', 'description', 'start_time', 'project_image', 'commitment'].forEach((field) => {
		if (req.body[field]) {
			parsedData[field] = req.body[field];
		}
	});

	// if (req.body.end_times) parsedData.end_time = req.body.end_times;

	if (pre_requisites) parsedData.pre_requisites = pre_requisites;

	if (learning_outcomes) parsedData.learning_outcomes = learning_outcomes;

	if (scorecardId) {
		const res = await db.findField(db.collections.SCORECARD.TEMPLATE,
			{
				tid: parseInt(scorecardId),
				type: 'social_scorecard_template',
			}
		);
		if (res.status === 'published' && res.isActive) {
			parsedData.scorecardId = scorecardId;
			parsedData.scorecardTitle = res.title;
			parsedData.scorecardAssociationTime = Date.now();
		} else {
			throw new Error('This Scorecard Template cannot be used!');
		}
	}

	if (req.body.isActive) parsedData.isActive = JSON.parse((req.body.isActive).toLowerCase());

	if (status) {
		parsedData.status = status;
		if (status === 'published') {
			// parsedData.start_time = Date.now();
			parsedData.publishedAt = currentTime;
		}
		if (status === 'closed') {
			// parsedData.end_time = Date.now();
			parsedData.closedAt = currentTime;
		}
	}

	const state = await db.updateField(collectionName, keys, { $set: parsedData });
	return {
		updated: state.result.n === 1,
		tid,
	};
};

const validProjectTypes = ['submission'];
const validProjectStatuses = ['published', 'draft'];

dtthon.getProjects = async function (req) {
	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limitBy) || 5;

	try {
		// get 1 project with a tid
		const uid = parseInt(req.uid);
		// let requirments = req.body.requirments ? (Array.isArray(req.body.requirments) ? req.body.requirments : JSON.parse(req.body.requirments)) : [];
		const isRecruiter =
			req.query.isRecruiter && (await userPrivileges.users.isRecruiter(uid));
		if (req.query.tid) {
			const tid = parseInt(req.query.tid);
			if (!tid || tid < 1) throw new Error('Invalid tid');

			const keys = {
				tid: tid,
				status: {
					$regex: isRecruiter ? 'published|draft|visible|closed' : 'published|visible',
				},
			};

			const Project = await db.findField(collectionName, keys);

			if (!Project) {
				throw new Error('No Project found!');
			}
			Project.recruiter = await user.getUserFields(
				[Project.uid],
				['username', 'fullname', 'userslug', 'picture']
			);
			return Project;
		}
		const requestURL = `/apps${req.url}`;

		// GET projects based on project title
		if (req.query.title) {
			req.query.status = req.query.status || 'published';
			const term = new RegExp(req.query.title);

			const query = prepareQueryForGETProject(req);
			if (req.query.type) {
				query.type = req.query.type;
			}

			return await getProjectsBasedOnQuery({
				title: {
					$regex: term,
					$options: '$i',
				},
				type: 'project',
				...query,
			}, requestURL, limit, page);
		}

		/**
		 * @author imshawan (26-08-2022)
		 * @description GET Projects based on status
		 */

		if (req.query.status) {
			const { status } = req.query;

			if (!validProjectStatuses.includes(status.toLowerCase())) {
				throw new Error('Invalid status: ' + status);
			}

			const query = prepareQueryForGETProject(req);

			return await getProjectsBasedOnQuery(query, requestURL, limit, page);
		}

		if (req.query.active) {
			let { active } = req.query;
			active = JSON.parse(active.toLowerCase());

			return await getProjectsBasedOnQuery({
				isActive: {
					$exists: true,
					$ne: null,
					$eq: active,
				},
				type: 'project',
			}, requestURL, limit, page);
		}

		// GET projects based on type
		if (req.query.type) {
			if (!validProjectTypes.includes(req.query.type)) {
				throw new Error('Invalid type: ' + req.query.type);
			}
			return await getProjectsBasedOnQuery({
				type: req.query.type,
				uid: parseInt(req.uid),
			}, requestURL, limit, page);
		}

		// GET projects based on uid
		if (req.query.uid) {
			const uid = parseInt(req.query.uid);
			return await getProjectsBasedOnQuery({
				uid,
				type: 'project',
			}, requestURL, limit, page);
		}

		// (get all projects for perticular filters, no login needed)


		let keys = {
			type: 'project',
			status: { $regex: 'published|closed|visible' },
		};

		if (
			req.query.fromDate ||
			req.query.toDate ||
			req.query.from ||
			req.query.to
		) {
			keys = {
				...keys,
				...getKeysByTime(req, isRecruiter ? 'timestamp' : 'start-time'),
			};
		}
		if (req.query.tags) {
			const tags = Array.isArray(req.query.tag) ? req.query.tag : [req.query.tag];
			keys = {
				...keys,
				globalTags: { $regex: `${tags.join('$|')}$` },
			}; // $ sign in regex is for newline, this is added for not getting webdevelopement when searching for tag web
		}
		// did not use internal functionality of isRecruiter, because: recruiter may want to see all projects on forum that are not made by him (just like applicant)
		if (isRecruiter) {
			keys.uid = req.uid;
			keys.status = { $regex: 'published|closed|draft|visible' };
		}
		if (req.query.cid) keys.cid = parseInt(req.query.cid);

		let Projects = await db.getFieldsWithPagination(
			collectionName,
			keys,
			limit,
			page,
			{ timestamp: -1 }
		);
		const count = await db.countDocuments(collectionName, keys);

		if (!Projects) throw new Error('Unauthorized write access!');

		if (!isRecruiter) {
			Projects = await Promise.all(
				Projects.map(async (elem) => {
					const recruiter = await user.getUserFields(
						[elem.uid],
						['username', 'fullname', 'userslug', 'picture']
					);
					return {
						...elem,
						recruiter,
					};
				})
			);
		}

		Projects = await Promise.all(
			Projects.map(async (elem) => {
				const applicant_count = await db.countDocuments(collectionName, {
					type: 'submissionInfo',
					tid: elem.tid,
				}); // count of applicants

				const pending_count = await db.countDocuments(collectionName, {
					type: 'submissionInfo',
					tid: elem.tid,
					'submission_history.eval_status': 'pending',
				}); // count of pending applicants
				const reAsigned_count = await db.countDocuments(collectionName, {
					type: 'submissionInfo',
					tid: elem.tid,
					'submission_history.eval_status': 're-asigned',
				}); // count of pending applicants

				// macrodata.pending_count = 50; //count of  applicants

				return {
					...elem,
					macrodata: {
						applicant_count,
						pending_count,
						reAsigned_count,
					},
				};
			})
		);
		Projects = await Promise.all(Projects.map(async (elem) => {
			const evaluatedCount = await db.countDocuments(collectionName, {
				tid: elem.tid,
				type: 'submission',
				evalStatus: 'evaluating',
			});
			return {
				...elem,
				evaluatedCount,
			};
		}));

		return utils.paginate(`/apps${req.url}`, Projects, count, limit, page);
	} catch (e) {
		console.error(e);
		throw new Error(e.message);
	}
};

function prepareQueryForGETProject(req) {
	const { status } = req.query;
	const query = {
		// Some project 'status' have capitalization, so I had to do this 😒
		$or: [{ status: status.toLowerCase() }, { status: utils.capitalizeFirstLetter(status) }],
		type: 'project',
	};
	if (req.query.uid && !isNaN(req.query.uid)) {
		query.uid = parseInt(req.query.uid);
	} else {
		query.uid = parseInt(req.uid);
	}
	if (isNaN(req.query.uid) && req.query.uid === 'all') {
		delete query.uid;
	}
	return query;
}

/**
 * @author imshawan {21-07-2022}
 * @function getProjectsBasedOnQuery
 * @description Returns projects based on a certain query in a paginated format
 * @param {String} query
 * @param {String} url
 * @param {Int} limit
 * @param {Int} page
 * @returns Array of projects
 */
async function getProjectsBasedOnQuery(query, url, limit, page) {
	const [projects, projectsCount] = await Promise.all([
		db.getFieldsWithPagination(db.collections.DEFAULT, query, limit, page),
		db.countDocuments(db.collections.DEFAULT, query),
	]);

	const projectsData = await Promise.all(projects.map(async (elem) => {
		const [recruiter, applicants_count, not_evaluated_count] = await Promise.all([
			user.getUserFields([elem.uid], ['username', 'fullname', 'userslug', 'picture']),
			db.countDocuments(db.collections.DEFAULT, {
				tid: parseInt(elem.tid),
				type: 'project:applicants',
			}),
			db.countDocuments(db.collections.DEFAULT, {
				tid: elem.tid,
				type: 'submission',
				evalStatus: { $ne: 'evaluated' },
			}),
		]);

		const status = elem.status.split('_').join(' ');
		elem.status = status.charAt(0).toUpperCase() + status.slice(1);

		let scorecardTitle;
		if (!elem.scorecardTitle && elem.scorecardId) {
			const template = await db.findField(db.collections.SCORECARD.TEMPLATE, {
				tid: elem.scorecardId,
				type: 'social_scorecard_template',
			});
			if (template) scorecardTitle = template.title;
		}

		return {
			...elem,
			recruiter,
			applicants_count,
			not_evaluated_count,
			scorecardTitle,
		};
	}));

	return utils.paginate(url, projectsData, projectsCount, limit, page);
}

dtthon.getCustomProjects = async function (req) {
	try {
		// get 1 project with a tid
		let requirments = req.query.requirments;
		if (!Array.isArray(requirments)) requirments = [requirments];

		if (!requirments.length) throw new Error('Invalid requirments passed!');

		// (get all projects for perticular filters, no login needed)

		const isRecruiter = req.query.isRecruiter ? JSON.parse(req.query.isRecruiter.toLowerCase()) : false;
		const page = parseInt(req.query.page) || 0;
		const limit = parseInt(req.query.limitBy) || 5;
		let keys = {
			type: 'project',
			status: { $regex: 'published|closed' },
		};

		if (
			req.query.fromDate ||
			req.query.toDate ||
			req.query.from ||
			req.query.to
		) {
			keys = {
				...keys,
				...getKeysByTime(req, isRecruiter ? 'timestamp' : 'start-time'),
			};
		}
		if (req.query.tags) {
			const tags = Array.isArray(req.query.tag) ? req.query.tag : [req.query.tag];
			keys = {
				...keys,
				globalTags: { $regex: `${tags.join('$|')}$` },
			}; // $ sign in regex is for newline, this is added for not getting webdevelopement when searching for tag web
		}
		// did not use internal functionality of isRecruiter, because: recruiter may want to see all projects on forum that are not made by him (just like applicant)
		if (isRecruiter) {
			keys.uid = req.uid;
			keys.status = { $regex: 'published|closed|draft' };
		}
		if (req.query.cid) keys.cid = parseInt(req.query.cid);

		let Projects;

		const requirmentsKey = {};
		requirments.forEach((requirment) => {
			requirmentsKey[requirment] = `$${requirment}`;
		});
		Projects = await db.Aggregate(collectionName, [
			{ $match: keys },
			{ $sort: { timestamp: -1 } },
			{ $skip: page * limit },
			{ $limit: limit },
			{ $project: requirmentsKey },
		]);

		const count = await db.countDocuments(collectionName, keys);

		if (!Projects) throw new Error('Unauthorized write access!');

		if (!isRecruiter && requirments.indexOf('recruiter') !== -1) {
			Projects = await Promise.all(
				Projects.map(async (elem) => {
					const recruiter = await user.getUserFields(
						[elem.uid],
						['username', 'fullname', 'userslug', 'picture']
					);
					return {
						...elem,
						recruiter: recruiter,
					};
				})
			);
		}

		if (requirments.indexOf('macrodata') > -1) {
			Projects = await Promise.all(
				Projects.map(async (elem) => {
					const macrodata = {};
					macrodata.applicant_count = await db.countDocuments(collectionName, {
						type: 'submissionInfo',
						tid: elem.tid,
					}); // count of applicants

					macrodata.pending_count = await db.countDocuments(collectionName, {
						type: 'submissionInfo',
						tid: elem.tid,
						'submission_history.eval_status': 'pending',
					}); // count of pending applicants
					macrodata.reAsigned_count = await db.countDocuments(collectionName, {
						type: 'submissionInfo',
						tid: elem.tid,
						'submission_history.eval_status': 're-asigned',
					}); // count of pending applicants

					// macrodata.pending_count = 50; //count of  applicants

					return {
						...elem,
						macrodata: macrodata,
					};
				})
			);
		}

		return utils.paginate(`/apps${req.url}`, Projects, count, limit, page);
	} catch (e) {
		console.error(e);
		throw new Error(e.message);
	}
};

dtthon.deleteProject = async function (req) {
	try {
		const tid = req.body.tid;

		const uid = parseInt(req.uid);
		if (!uid || uid < 1) throw new Error('unauthorised!');

		const keys = {
			tid: tid,
			type: 'project',
			uid: uid,
		};

		const state = await db.removeField(collectionName, keys);
		return { deleted: state.result.n === 1 };
	} catch (e) {
		throw new Error(e.message);
	}
};

/**
 * @author: Shubham Bawner
 * @description: crud for task
 */
dtthon.addTask = async function (req) {
	try {
		const luid = parseInt(req.uid);
		if (!req.uid || luid < 1) throw new Error('Unauthorized');
		const tid = req.body.tid;
		if (!tid) throw new Error('tid of a project is required');

		const keys = {
			uid: luid,
			tid: tid,
			type: 'project', // change it
		};

		const task = req.body.task;
		const task_id = await db.incrObjectField('global', 'nextPid'); // task id
		const taskData = {
			task_id: task_id,
			task_title: task.task_title != null ? task.task_title : '',
			task_description:
				task.task_description != null ? task.task_description : '',

			// tools: task.tools ? Array.isArray(task.tools) ?  task.tools :JSON.parse(task.tools) : [],
			// assets: task.assets ? Array.isArray(task.assets) ?task.assets: JSON.parse(task.assets) : [],
			// tools: task.tools != null ? task.tools : [],
			// Rahul Ranjan: added status to task
			status: task.status != null ? task.status : 'notworkyet',

			assets: [],
		};

		const state = await db.update(collectionName, keys, {
			$push: { tasks: taskData },
		});
		if (!state) throw new Error('Unauthorized write access!');

		return {
			task_id,
			taskData,
		};
	} catch (e) {
		console.error(e);
		throw new Error(e.message);
	}
};

// ? I am not verifying what data they are sending, not even keys...
dtthon.editTask = async function (req) {
	try {
		const luid = parseInt(req.uid);
		if (!req.uid || luid < 1) throw new Error('Unauthorized');

		const project_tid = parseInt(req.body.tid);
		const task_id = parseInt(req.body.task_id);
		const { task } = req.body;

		const project = await db.findField(collectionName, {
			tid: project_tid,
			type: 'project',
		});
		if (!project) throw new Error('Project was not found!');

		const { tasks } = project;
		if (!tasks) throw new Error('No tasks found!');

		let _tasks = tasks.find(elem => elem.task_id === task_id);
		if (!Object.keys(_tasks).length) throw new Error('Task wasn\'t found');

		const parsedItem = _tasks;
		['task_title', 'task_description', 'status', 'notices'].forEach((item) => {
			if (task[item]) {
				parsedItem[item] = task[item];
			}
		});

		_tasks = tasks.filter(el => el.task_id !== task_id);
		_tasks.push(parsedItem);


		const keys = {
			uid: luid,
			tid: project_tid,
			type: 'project',
		};
		// const keys = {
		// 	uid: luid,
		// 	tid,
		// 	type: "project",
		// 	"tasks.task_id": task_id,
		// };

		// const task = req.body.task;

		// const taskData = {};

		// for (const key in task) {
		// 	taskData[`tasks.$.${key}`] = task[key];
		// }

		// console.log(taskData);

		return await db.updateField(collectionName, keys, { $set: { tasks: _tasks } }, { upsert: false });
	} catch (e) {
		console.error(e);
		throw new Error(e.message);
	}
};

dtthon.deleteTask = async function (req) {
	try {
		const luid = parseInt(req.uid);
		if (!req.uid || luid < 1) throw new Error('Unauthorized');
		const tid = parseInt(req.body.tid);
		const task_id = parseInt(req.body.task_id);

		const keys = {
			uid: luid,
			tid: tid,
			type: 'project',
		};

		const status = await db.update(collectionName, keys, {
			$pull: { tasks: { task_id } },
		});
		return { deleted: status.updated };
	} catch (e) {
		console.error(e);
		throw new Error(e.message);
	}
};

/**
 * @author: Shubham Bawner
 * @description: crud for Asset
 */
dtthon.addAsset = async function (req) {
	try {
		const uid = parseInt(req.uid);
		if (!uid || uid < 1) throw new Error('Unauthorized');
		const keys = {
			uid,
			tid: req.body.tid,
			type: 'project',
			'tasks.task_id': req.body.task_id,
			// "tasks.$.assets.asset_id": asset_id
		};

		const asset = req.body.asset;
		// if(!asset.asset_content) throw new Error("asset content title is required");
		const asset_id = await db.incrObjectField('global', 'nextPid'); // task id
		const assetData = {
			asset_id: asset_id,
			asset_title: asset.asset_title,
			asset_description: asset.asset_description || '',
			asset_content: asset.asset_content || '',
			asset_type: asset.asset_type || 'input_asset', // input_asset or display_asset
			asset_content_type: asset.asset_content_type, // tb, eb, article, reflection, quiz, other
			// asset_url:
			// 	asset.asset_type === "display_asset"
			// 		? asset.asset_url != null
			// 			? asset.asset_url
			// 			: ""
			// 		: null,
			// asset_image:
			// 	asset.asset_type === "display_asset"
			// 		? asset.asset_image != null
			// 			? asset.asset_image
			// 			: ""
			// 		: null,
			// asset_video:
			// 	asset.asset_type === "display_asset"
			// 		? asset.asset_video != null
			// 			? asset.asset_video
			// 			: ""
			// 		: null,
			// asset_docs:
			// 	asset.asset_type === "display_asset"
			// 		? asset.asset_docs != null
			// 			? asset.asset_docs
			// 			: ""
			// 		: null,
			// tb_tid:
			// 	asset.asset_type === "display_asset" &&
			// 	asset.asset_content_type === "tb"
			// 		? asset.tb_tid != null
			// 			? asset.tb_tid
			// 			: 0
			// 		: null,
			// tb_pid:
			// 	asset.asset_type === "display_asset" &&
			// 	asset.asset_content_type === "tb"
			// 		? asset.tb_pid != null
			// 			? asset.tb_pid
			// 			: 0
			// 		: null,
			// eb_tid:
			// 	asset.asset_type === "display_asset" &&
			// 	asset.asset_content_type === "eb"
			// 		? asset.eb_tid != null
			// 			? asset.eb_tid
			// 			: 0
			// 		: null,
			// eb_pid:
			// 	asset.asset_type === "display_asset" &&
			// 	asset.asset_content_type === "eb"
			// 		? asset.eb_pid != null
			// 			? asset.eb_pid
			// 			: 0
			// 		: null,
			// asset_reflection:
			// 	asset.asset_type === "display_asset" &&
			// 	asset.asset_content_type === "reflection"
			// 		? asset.asset_reflection != null
			// 			? asset.asset_reflection
			// 			: ""
			// 		: null,

			/*  display_asset_url: asset.asset_type === "display_asset" ? asset.asset_url != null ? asset.asset_url : "" : null,
            display_asset_image: asset.asset_type === "display_asset" ? asset.asset_image != null ? asset.asset_image : "" : null,
            display_asset_video: asset.asset_type === "display_asset" ? asset.asset_video != null ? asset.asset_video : "" : null,
            display_asset_docs: asset.asset_type === "display_asset" ? asset.asset_docs != null ? asset.asset_docs : "" : null,
            display_tb_tid: asset.asset_type === "display_asset" && asset.asset_content === "tb" ? asset.tb_tid != null ? asset.tb_tid : 0 : null,
            display_tb_pid: asset.asset_type === "display_asset" && asset.asset_content === "tb" ? asset.tb_pid != null ? asset.tb_pid : 0 : null,
            display_eb_tid: asset.asset_type === "display_asset" && asset.asset_content === "eb" ? asset.eb_tid != null ? asset.eb_tid : 0 : null,
            display_eb_pid: asset.asset_type === "display_asset" && asset.asset_content === "eb" ? asset.eb_pid != null ? asset.eb_pid : 0 : null,
            display_asset_reflection: asset.asset_type === "display_asset" && asset.asset_content === "reflection" ? asset.asset_reflection != null ? asset.asset_reflection : "" : null, */
		};

		const state = await db.update(collectionName, keys, {
			$push: { 'tasks.$.assets': assetData },
		});
		if (!state) {
			throw new Error('Unauthorized write access!');
		}

		return {
			asset_id,
			assetData,
		};
	} catch (e) {
		console.error(e);
		throw new Error(e.message);
	}
};

// ? I am not verifying what data they are sending, not even keys...
dtthon.editAsset = async function (req) {
	try {
		const uid = req.uid;
		const tid = req.body.tid;
		const task_id = req.body.task_id;
		const asset_id = req.body.asset_id;

		const keys = {
			uid: uid,
			tid: tid,
			type: 'project',
		};

		const asset = req.body.asset;
		const project = await db.findField(collectionName, {
			...keys,
			'tasks.task_id': task_id,
			'tasks.assets.asset_id': asset_id,
		});
		if (!project) throw new Error('No such asset found');
		const requiredTask =
			project.tasks != null ?
				project.tasks.find(task => task.task_id === task_id) : {};
		const previousAsset = Array.isArray(requiredTask.assets) ?
			requiredTask.assets.find(asset => asset.asset_id === asset_id) : null;
		if (!previousAsset) throw new Error('No such asset found');
		const assetData = {
			...[
				'asset_title',
				'asset_description',
				'asset_type',
				'asset_content_type',
				'asset_content',
			].reduce(
				(assetData, key) => (asset[key] ?
					{
						...assetData,
						[`tasks.$[outer].assets.$[inner].${key}`]: asset[key],
					} :
					assetData),
				{}
			),
		};
		const arrayFilterOptions = {
			arrayFilters: [
				{ 'outer.task_id': task_id },
				{ 'inner.asset_id': asset_id },
			],
		};

		const query = [keys, { $set: { ...assetData } }, arrayFilterOptions];

		return { modified: (await db.updateField(collectionName, ...query)).n > 0 };
	} catch (e) {
		console.error(e);
		throw new Error(e.message);
	}
};

dtthon.deleteAsset = async function (req) {
	try {
		const luid = parseInt(req.uid);
		if (!req.uid || luid < 1) throw new Error('Unauthorized');

		const tid = parseInt(req.body.tid);

		const task_id = parseInt(req.body.task_id);

		const asset_id = parseInt(req.body.asset_id);

		const keys = {
			uid: luid,
			tid: tid,
			type: 'project',
		};
		const arrayFilterOptions = { arrayFilters: [{ 'outer.task_id': task_id }] };
		const status = await db.updateField(
			collectionName,
			keys,
			{ $pull: { 'tasks.$[outer].assets': { asset_id } } },
			arrayFilterOptions
		);
		return { deleted: status.result.n > 0 };
	} catch (e) {
		console.error(e);
		throw new Error(e.message);
	}
};

dtthon.getSubmissions = async (req) => {
	const type = 'submission';
	const uid = parseInt(req.uid);
	if (!uid || uid < 1) throw new Error('Unauthorised');
	const isRecruiter =
		req.query.isRecruiter && (await userPrivileges.users.isRecruiter(uid));
	const pid = req.query.pid;
	if (pid) {
		const keys = {
			pid,
			type,
		};
		const submission = await db.findField(
			collectionName,
			isRecruiter ?
				{
					...keys,
					status: {
						$regex: '^(?!in_progress)+$',
					},
				} :
				{
					...keys,
					uid,
				}
		);
		if (!submission) throw new Error('No submission found');
		return submission;
	}
	const tid = req.query.tid;
	const keys = isRecruiter ? {
		type,
	} : req.query.uid != null ? (req.query.uid === req.uid ? {
		type,
		uid,
	} : {
		type,
		status: {
			$regex: '^(?!in_progress)+$',
		},
		uid: req.query.uid,
	}) : {
		type,
		status: {
			$regex: '^(?!in_progress)+$',
		},
	};
	const result = await db.findField(
		collectionName,
		tid ? {
			...keys,
			tid,
		} : keys
	);
	if (!result) throw new Error('No submission found!');
	return result;
};
dtthon.createSubmission = async (req) => {
	const uid = parseInt(req.uid);

	if (!uid || uid < 1) throw new Error('Unauthorised');

	const tid = parseInt(req.body.tid);
	const timestamp =
		req.body.timestamp != null ? req.body.timestamp : Date.now();

	const project = await db.findField(collectionName, {
		type: 'project',
		tid,
	});
	if (!project) throw new Error('No project found!');

	const recruiter_uid = project.uid;
	const tasks = await project.tasks.reduce(async (rawTasks, task) => {
		const tasks = await rawTasks;
		const innitialTaskSubmission = req.body.tasks.find(
			taskSubmission => taskSubmission.task_id === task.task_id
		);
		const assets = await task.assets.reduce(async (rawAssets, asset) => {
			const assets = await rawAssets;
			if (asset.asset_type !== 'input_asset') return assets;
			const innitialAssetSubmission = (
				innitialTaskSubmission || { assets: [] }
			).assets.find(
				assetSubmission => assetSubmission.asset_id === asset.asset_id
			);
			if (innitialAssetSubmission == null) {
				return [
					...assets,
					{
						asset_id: asset.asset_id,
						type: asset.asset_content_type,
						comment: '',
						pid: null,
					},
				];
			}
			if (innitialAssetSubmission.content_pid == null && innitialAssetSubmission.content == null) {
				return [
					...assets,
					{
						asset_id: asset.asset_id,
						type: asset.asset_content_type,
						comment: '',
						pid: null,
					},
				];
			}
			return [
				...assets,
				{
					asset_id: asset.asset_id,
					type: asset.asset_content_type,
					comment: '',
					pid: await updateAssetContent(
						collectionName,
						innitialAssetSubmission.content_pid,
						innitialAssetSubmission.content
					),
				},
			];
		}, Promise.resolve([]));
		return [...tasks, {
			task_id: task.task_id,
			status: 'in_progress',
			assets,
		}];
	}, Promise.resolve([]));
	const pid = await db.incrObjectField('global', 'nextPid');
	const submissionHistoryPid = await db.incrObjectField('global', 'nextPid');
	const submission = {
		pid,
		uid,
		tid,
		timestamp,
		recruiter_uid,
		tasks,
		status: req.body.tasks == null ? 'pending' : 'in_progress',
		type: 'submission',
	};


	await db.setField(collectionName, {
		pid: submissionHistoryPid,
		uid,
		project_tid: tid,
		recruiter_uid,
		currentSubmission: null,
		history: [],
		type: 'submission_history',
		submission_pid: pid,
	});
	return await db.setField(collectionName, submission);
};

dtthon.updateSubmission = async (req) => {
	const uid = req.uid;
	if (!uid || uid < 1) throw new Error('Unauthorised');

	const pid = req.body.pid;
	if (req.body.task.length < 1) throw new Error('Nothing changed!');
	const keys = {
		uid,
		pid,
		type: 'submission',
		status: {
			$regex: '^(re_assigned|in_progress|pending)$',
		},
	};
	const submission = await db.findField(collectionName, keys);
	if (!submission) throw new Error('Can\'t update submission!');
	const updates = await formatTasksForUpdate(collectionName, req.body.tasks, submission);
	const result = await db.updateField(collectionName, keys, {
		...updates,
		status: 'in_progress',
	});
	return { modified: result.n > 0 };
};

dtthon.updateSubmissionAsset = async (req) => {
	const pid = parseInt(req.body.pid);
	const uid = parseInt(req.uid);
	const task_id = parseInt(req.body.task_id);
	const asset_id = parseInt(req.body.asset.asset_id);
	const asset_content_type = req.body.asset.asset_content_type;
	const content_pid = parseInt(req.body.asset.pid) || null;
	const content = req.body.asset.content;
	const submission = await db.findField(collectionName, {
		pid,
		uid,
		status: 'in_progress',
		tasks: {
			$elemMatch: {
				task_id,
				'assets.asset_id': asset_id,
			},
		},
	});
	if (submission == null) throw new Error('can not find submission with the given pid, task_id and asset_id');
	const task_index = submission.tasks.findIndex(task => task.task_id === task_id);
	const asset_index = submission.tasks[task_index].assets.findIndex(asset => asset.asset_id === asset_id);
	const asset_content_pid = await updateAssetContent(collectionName, content_pid, content, uid, asset_content_type);

	await db.updateField(collectionName, {
		pid,
		uid,
	}, {
		$set: {
			[`tasks.${task_index}.assets.${asset_index}.pid`]: asset_content_pid,
		},
	});
	return { pid: asset_content_pid };
};

dtthon.partialSubmission = async (req) => {
	const uid = req.uid;
	const pid = req.body.pid;
	const task_id = req.body.task_id;
	const asset_id = req.body.asset_id;
	const payload = {
		uid,
		pid,
	};
	const submission = db.findField(collectionName, asset_id == null ? {
		...payload,
		'tasks.taskid': task_id,
	} : {
		...payload,
		tasks: {
			$elemMatch: {
				task_id,
				'assets.asset_id': asset_id,
			},
		},
	});
	if (submission == null) throw new Error('can\'t find the given submission with the given task/asset');
	const newPid = db.incrObjectField('global', 'nextPid');
	const task = submission.tasks.find(task => task.task_id === task_id);
	if (asset_id == null) {
		return await db.updateField(collectionName, {
			pid: newPid,
			parent_pid: pid,
			assets: task.assets,
			task_id,
			status: 'submitted',
			type: 'task_submission',
		});
	}
	const asset = task.assets.find(asset => asset.asset_id === asset_id);
	return await db.updateField(collectionName, {
		pid: newPid,
		parent_pid: pid,
		content: asset.content,
		asset_type: asset.type,
		task_id,
		status: 'submitted',
		type: 'asset_submission',
	});
};

dtthon.submitSubmission = async (req) => {
	const uid = req.uid;
	if (!uid || uid < 1) throw new Error('Unauthorised');
	const pid = req.body.pid;
	const submission = await db.findField(collectionName, {
		uid,
		pid,
		type: 'submission',
	});

	if (!submission) throw new Error('No submission was found with the pid: ' + pid);
	const {
		recruiter_uid,
		tid,
	} = submission;

	/* submission.tasks = submission.tasks.reduce(async (rawTasks, task) => {
		const tasks = await rawTasks
		const TaskSubmission = req.body.tasks.find(
			(taskSubmission) => taskSubmission.task_id === task.task_id
		);
		const assets = task.assets.reduce(async (rawAssets, asset) => {
			const assets = await rawAssets
			const AssetSubmission = (
				TaskSubmission != null ? TaskSubmission : {}
			).assets.find(
				(assetSubmission) => assetSubmission.asset_id === asset.asset_id
			);
			if(AssetSubmission == null) return [assets, asset];
			if(AssetSubmission.content_pid == null && AssetSubmission.content == null) return [assets, asset];

			return {
				...assets,
				pid: await updateAssetContent(collectionName, AssetSubmission.content_pid, AssetSubmission.content)
			};
		}, []);
		return [tasks, {
			...task,
			assets,
		}];
	}, Promise.resolve([])); */
	const submittedTasks = submission.tasks.map(task => ({
		task_id: task.task_id,
		submittedAssetNumber: task.assets.reduce(
			(submittedAssetNumber, asset) => (asset.content ? submittedAssetNumber + 1 : submittedAssetNumber),
			0
		),
	}));
	const submittedTaskNumber = submittedTasks.reduce(
		(submittedTaskNumber, submittedTasks, index) => (submission.tasks[index].assets.length >
			submittedTasks.submittedAssetNumber ?
			submittedTaskNumber :
			submittedTaskNumber + 1),
		0
	);
	const totalSubmittedAssets = submittedTasks.reduce(
		(totalSubmittedAssets, submittedTask) => totalSubmittedAssets + submittedTask.submittedAssetNumber,
		0
	);
	const completed = submittedTaskNumber >= submission.tasks.length;
	if (
		!(
			req.body.task == null ?
				/^(reassigned|in_progress)$/ :
				/^(reassigned|in_progress|pending)$/
		).test(submission.status) &&
		req.body.tasks == null
	) {
		throw new Error('Can\'t submit to this project!');
	}

	const currentSubmission = {
		uid,
		project_tid: tid,
		submission_pid: pid,
		submission_time: Date.now(),
		submittedTasks,
		submittedTaskNumber,
		totalSubmittedAssets,
		completed,
		reviewStatus: 'not_reviewed',
		submission,
		recruiter_uid,
		type: 'submission_history',
	};

	await Promise.all([
		db.updateField(collectionName, {
			uid,
			pid,
			type: 'submission',
		}, {
			$set: {
				status: 'submitted',
				tasks: submission.tasks,
			},
		}),
		db.updateField(collectionName, {
			uid,
			submission_pid: pid,
			type: 'submission_history',
		}, { $set: { currentSubmission } }, { upsert: true }),
	]);

	return submission;
};

dtthon.reviewSubmission = async (req) => {
	const uid = req.uid;
	if (!uid || uid < 1) throw new Error('Unathorised');
	const pid = req.body.pid;
	const status = req.body.status;
	const keys = {
		submission_pid: pid,
		type: 'submission_history',
	};
	const submissionHistory = await db.findField(collectionName, keys);

	if (
		(submissionHistory != null ? submissionHistory : {}).currentSubmission ==
		null
	) {
		throw new Error('No submission to review');
	}
	await db.updateField(collectionName, keys, {
		$push: {
			history: {
				...submissionHistory.currentSubmission,
				status: 'reviewed',
			},
		},
		$set: {
			currentSubmission: null,
		},
	});
	const updateResult = await db.updateField(
		collectionName,
		{
			pid,
			type: 'submission',
		},
		{ $set: { status } }
	);
	return { modified: updateResult.result.n > 0 };
};

dtthon.recordApplicant = async (req) => {
	const uid = parseInt(req.uid);
	const tid = parseInt(req.params.tid);

	const currentTime = Date.now();
	const keys = {
		tid,
		_key: `project:${tid}:applicant:${uid}`,
	};
	const payload = {
		...keys,
		uid,
		type: 'project:applicants',
		createdAt: currentTime,
		updatedAt: currentTime,
	};

	const project = await db.findField(collectionName, {
		tid,
		type: 'project',
	});
	if (!project) throw new Error('Invalid TID! No project was found associated to the supplied tid');

	const { tasks } = project;
	const taskId = tasks[0] ? tasks[0].task_id : null;

	payload.currentTask = 1;
	payload.currentTaskId = taskId;
	payload.totalTasks = tasks.length || 1;

	await db.updateField(collectionName, keys, {
		$set: payload,
	}, { upsert: true });

	return { recorded: true };
};

dtthon.getApplicants = async (req) => {
	const tid = parseInt(req.params.tid);

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
	const keys = {
		tid,
		type: 'project:applicants',
	};

	const [applicants, count] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);

	const applicantsData = await Promise.all(applicants.map(async (elem) => {
		let status = 'Unknown';
		let completed_tasks = 0;
		let total_tasks = 0;
		let submission_time;

		const [userData, submission_details] = await Promise.all([
			user.getUserFields([elem.uid], ['username', 'fullname', 'userslug', 'picture']),
			db.findField(collectionName, {
				uid: parseInt(elem.uid),
				type: 'submission',
				tid,
			}),
		]);
		let submissionSearchKeys = {
			tid,
			type: 'submission',
			scorecardId: { $exists: true },
			uid: elem.uid,
		};

		let submissionData = await db.findField(collectionName, submissionSearchKeys);
		let {attributes=[]} = submissionData || {};

		elem['totalAttributes'] = attributes.length || 0;

		if (submission_details) {
			['evalStatus', 'score_start_time', 'timestamp', 'evaluator', 'isScored', 'score_publish_time'].forEach(el => {
				elem[el] = submission_details[el] || null;
			});


			if (submission_details.status) {
				status = submission_details.status.split('_')
					.join(' ');
				elem.status_raw = submission_details.status;
			}

			if (submission_details.tasks) {
				const { tasks } = submission_details;

				if (tasks && Array.isArray(tasks)) {
					total_tasks = tasks.length;
					tasks.forEach((el) => {
						if (el.status && el.status.toLowerCase() === 'done') {
							completed_tasks++;
						}
					});
				}
			}

			if (submission_details.pid) {
				const submission_pid = parseInt(submission_details.pid);
				const submission_history = await db.findField(collectionName, {
					uid: parseInt(elem.uid),
					submission_pid,
					type: 'submission_history',
				});
				if (submission_history) {
					const { currentSubmission } = submission_history;
					if (currentSubmission) {
						submission_time = currentSubmission.submission_time || null;
					}
				}
			}
		}


		elem.completed_tasks = completed_tasks;
		elem.status = status.charAt(0)
			.toUpperCase() + status.slice(1);
		elem.total_tasks = total_tasks;
		elem.submission_time = submission_time;

		return {
			...elem,
			user: userData,
		};
	}));

	return utils.paginate(`/apps${req.url}`, applicantsData, count, limit, page);
};

async function formatTasksForUpdate(collectionName, tasks, submission) {
	if (tasks == null) return {};
	return await tasks.reduce(async (rawUpdates, task) => {
		const updates = await rawUpdates;
		const taskIndex = submission.tasks.findIndex(
			Task => Task.task_id === task.task_id
		);
		if (taskIndex < 0) return updates;
		return {
			...updates,
			...(await task.assets.reduce(async (rawUpdates, asset) => {
				const updates = await rawUpdates;
				const assetIndex = submission.tasks[taskIndex].assets.findIndex(
					Asset => Asset.asset_id === asset.asset_id
				);
				if (assetIndex < 0) return updates;
				if (asset.content_pid == null && asset.content == null) return updates;
				return {
					...updates,
					[`tasks.${taskIndex}.assets.${assetIndex}.pid`]: await updateAssetContent(collectionName, asset.content_pid, asset.content),
				};
			}, Promise.resolve({}))),
		};
	}, Promise.resolve({}));
}

/**
 * //! under construction !!
 * @author Shubham Bawner
 * @desc creates dtThon project as a topic, that is associated with multiple cids
 */
const createDtThonTopic = async function (data, tid) {
	try {
		// This is an internal method, consider using Topics.post instead
		const timestamp = data.timestamp || Date.now();

		tid = tid || await db.incrObjectField('global', 'nextTid');

		let topicData = {
			tid: tid,
			...data,
			slug: tid + '/' + (slugify(data.title) || 'topic'),
			timestamp: timestamp,

			//! note that data has to have:
			// uid: data.uid,
			// cid: data.cid,//! needs to be an array of cids
			// mainPid: 0,
			// title: data.title,
			// slug: tid + '/' + (slugify(data.title) || 'topic'),
			// lastposttime: 0,
			// postcount: 0,
			// viewcount: 0,
		};

		if (data.picture) {
			topicData.picture = data.picture;
		}
		if (data.type) {
			topicData.type = data.type;
		}

		const result = await plugins.hooks.fire('filter:topic.create', {
			topic: topicData,
			data: data,
		});
		topicData = result.topic;
		await db.setObject('topic:' + topicData.tid, topicData);

		for (let i = 0; i < topicData.cid.length; i++) {
			const cid = topicData.cid[i];
			await Promise.all([
				db.sortedSetsAdd(
					[
						'topics:tid',
						'cid:' + cid + ':tids',
						'cid:' + cid + ':uid:' + topicData.uid + ':tids',
					],
					timestamp,
					topicData.tid
				),
				db.sortedSetsAdd(
					[
						'topics:views',
						'topics:posts',
						'topics:votes',
						'cid:' + cid + ':tids:votes',
						'cid:' + cid + ':tids:posts',
					],
					0,
					topicData.tid
				),
				categories.updateRecentTid(cid, topicData.tid),
				user.addTopicIdToUser(topicData.uid, topicData.tid, timestamp),
				db.incrObjectField('category:' + cid, 'topic_count'),
				db.incrObjectField('global', 'topicCount'),
				Topics.createTags(data.tags, topicData.tid, timestamp),
			]);
		}

		plugins.hooks.fire('action:topic.save', {
			topic: _.clone(topicData),
			data: data,
		});
		return topicData.tid;
	} catch (e) {
		throw new Error(e.message);
	}
};

// --- helper function

let getKeysByTime = (req, parameter) => {
	try {
		let from =
			!isNaN(parseInt(req.query.from)) &&
			JSON.stringify(req.query.from).length >= 12 ?
				parseInt(req.query.from) :
				Date.now() - 3600000 * 24 * 7; // default period 1 week, 3600000 is no. of milliseconds in 1 hour
		let to =
			!isNaN(parseInt(req.query.to)) &&
			JSON.stringify(req.query.to).length >= 12 ?
				parseInt(req.query.to) :
				Date.now(); // default period 1 week, 3600000 is no. of milliseconds in 1 hour

		let customFromDate;
		let customToDate;

		if (req.query.fromDate) {
			customFromDate = req.query.fromDate.split('/'); // pass as "yyyy/mm/dd"
			customFromDate[1]--; // month is by default taken from 0(0 is Jan), but query is to be passed as general date(Jan is 1)
			from = !isNaN(new Date(...customFromDate).getTime()) ?
				new Date(...customFromDate).getTime() :
				from;
		}
		if (req.query.toDate) {
			customToDate = req.query.toDate.split('/'); // pass as "yyyy/mm/dd"
			customToDate[1]--; // month is by default taken from 0(0 is Jan), but query is to be passed as general date(Jan is 1)
			to = !isNaN(new Date(...customToDate).getTime()) ?
				new Date(...customToDate).getTime() :
				to;
		}
		return {
			$and: [{ [parameter]: { $gte: from } }, { [parameter]: { $lte: to } }],
		};
	} catch (e) {
		throw new Error(e.message);
	}
};

async function updateAssetContent(collectionName, id, data, uid, type) {
	const pid = id == null ? await db.incrObjectField('global', 'nextPid') : id;
	const payload = Object.keys(data) < 1 ? {} : data;
	const currentDate = Date.now();

	if (id == null) {
		await db.setField(collectionName, {
			pid,
			uid,
			createdAt: currentDate,
			timestamp: currentDate,
			...payload,
			type: type || 'asset_content',
		});
		return pid;
	}
	await db.updateField(collectionName, { pid }, {
		$set: {
			...payload,
			updatedAt: currentDate,
		},
	});
	return pid;
}

dtthon.submitTask = async function (req) {
	const luid = parseInt(req.uid);
	if (!req.uid || luid < 1) throw new Error('Unauthorized');

	const project_pid = parseInt(req.body.pid);
	const task_id = parseInt(req.body.task_id);
	const {
		task,
		task_number,
	} = req.body;

	const project = await db.findField(collectionName, {
		pid: project_pid,
		type: 'submission',
	});
	if (!project) throw new Error('Project was not found!');

	const { tasks } = project;
	if (!tasks) throw new Error('No tasks found!');

	const _tasks = tasks.find(elem => elem.task_id === task_id);
	if (!Object.keys(_tasks).length) throw new Error('Task wasn\'t found');

	const parsedItem = _tasks;
	if (parsedItem.status === 'done') throw new Error('Task already done!');
	['task_title', 'task_description', 'status'].forEach((item) => {
		if (task[item]) {
			parsedItem[item] = task[item];
		}
	});

	const taskIndex = tasks.findIndex(el => el.task_id === task_id);
	tasks[taskIndex] = parsedItem;

	const keys = {
		uid: luid,
		pid: project_pid,
		type: 'submission',
	};

	const applicantProgress = {
		currentTask: parseInt(task_number),
		currentTaskId: task_id,
		totalTasks: tasks.length,
	};

	db.updateField(collectionName, { _key: `project:${project.tid}:applicant:${luid}` }, { $set: applicantProgress }, { upsert: false });
	return await db.updateField(collectionName, keys, { $set: { tasks: tasks } }, { upsert: false });
};

dtthon.createNotice = async function (req) {
	const collectionName = db.collections.DT_THON.NOTICE;
	const {
		taskId,
		projectTid,
		notice,
		taskNumber,
	} = req.body;
	const uid = parseInt(req.uid);

	const payload = {
		_key: `task:${taskId}:notice`,
		uid,
		taskId: parseInt(taskId),
		taskNumber: parseInt(taskNumber),
		projectTid: parseInt(projectTid),
		notice,
		type: 'notice',
	};

	return db.setField(collectionName, payload);
};

dtthon.getNotice = async function (req) {
	const collectionName = db.collections.DT_THON.NOTICE;
	const { id } = req.query;
	if (!id) throw new Error('The task Id is required');

	return await db.findField(collectionName, { taskId: parseInt(id) });
};

dtthon.updateNotice = async function (req) {
	const collectionName = db.collections.DT_THON.NOTICE;
	const {
		projectId,
		notice,
	} = req.body;
	const { id } = req.params;

	const uid = parseInt(req.uid);

	const keys = {
		uid,
		taskId: parseInt(id),
		projectId,
		type: 'notice',
	};

	const state = await db.updateField(collectionName, keys, { $set: { notice } }, { upsert: false });
	return {
		updated: state.result.n === 1,
	};
};

dtthon.deleteNotice = async function (req) {
	const collectionName = db.collections.DT_THON.NOTICE;
	const { id } = req.params;
	const uid = parseInt(req.uid);

	const keys = {
		taskId: parseInt(id),
		uid,
		type: 'notice',
	};

	const state = await db.removeField(collectionName, keys);
	return {
		deleted: state.result.n === 1,
	};
};

dtthon.assignScorecard = async (req) => {
	const data = req.body;
	const scorecardId = parseInt(data.scorecardId);
	const tid = parseInt(data.tid);
	const templateCollection = db.collections.SCORECARD.TEMPLATE;
	const response = await db.findField(templateCollection,
		{
			tid: scorecardId,
			type: 'social_scorecard_template',
		}
	);
	if (!response) throw new Error('No such scorecard exists!');
	if (response.status !== 'published' && !response.isActive) {
		throw new Error('This Scorecard Template cannot be used!');
	}

	const keys = {
		tid,
		_key: `topic:${tid}`,
		type: 'project',
	};
	const project = await db.findField(collectionName, keys);
	if (!project) throw new Error('Project with the given tid does not exist!');
	const res = await db.updateField(collectionName, keys, {
		$set: {
			scorecardId: scorecardId,
			scorecardTitle: response.title,
			scorecardAssociationTime: Date.now(),
		},
	});
	const attributes = await this.trimFields(response.attributes);
	if (res.result.n) {
		const response = await db.updateField(collectionName, {
			tid,
			type: 'submission',
		},
		{
			$set: {
				scorecardId,
				attributes,
				evalStatus: 'not_started',
				isScored: false,
			},
		},
		{ multi: true }
		);
	}
	return await db.findField(collectionName, keys);
};

dtthon.getEvaluations = async (req) => {
	const tid = parseInt(req.query.tid);
	if (!tid) throw new Error('tid of project was not sent!');
	const keys = {
		tid,
		type: 'submission',
		scorecardId: { $exists: true },
	};
	await db.findFields(collectionName, keys);
	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;
	let assets = await db.getFieldsWithPagination(collectionName, keys, limit, page, { createdAt: -1 });
	const fields = ['evalStatus', 'score_start_time', 'timestamp', 'tid', 'scorecardId', 'evaluator', 'isScored', 'title', 'score_publish_time', 'status'];
	const userFields = ['username', 'picture', 'fullname', 'uid'];
	assets = await Promise.all(assets.map(async e => {
		let data = {};
		let attrs = e.attributes;
		data.attributeScore = attrs.filter(ele => !isNaN(ele.score)).length;
		data.totalAttributes = attrs.length || 0;

		fields.forEach(field => {
			data[field] = e[field] || null;
		});

		data.userData = await user.getUserFields(e.uid, userFields);
		return data;
	}));
	const count = await db.countDocuments(collectionName, keys);
	return utils.paginate(`/apps${req.url}`, assets, count, limit, page);
};

dtthon.evaluateScorecard = async (req) => {
	const data = req.body;
	const evaluatorUid = req.uid;
	const tid = parseInt(data.tid); // project tid
	const uid = parseInt(data.uid); // applicant uid
	const templateCollection = db.collections.SCORECARD.TEMPLATE;
	if (!data.uid) throw new Error('Invalid applicant UID');
	const createdAt = Date.now();
	const keys = {
		tid,
		uid,
		type: 'submission',
	};

	const res = await db.findField(collectionName, keys);
	if (!res) throw new Error('Submission Not Found!');
	if (res.isScored) throw new Error('Applicant has already been scored!');
	if (res.evaluator === evaluatorUid) {
		return res; // draft state
	}
	if (res.hasOwnProperty('evaluator')) throw new Error('This submission is being evaluated by someone else!');
	if (res.status !== 'submitted') throw new Error('Project Not yet Submitted!');

	const payload = {
		evaluator: evaluatorUid,
		isScored: false,
		score_start_time: createdAt,
		evalStatus: 'evaluating',
	};
	const scorecardId = res.scorecardId;
	if (!scorecardId) throw new Error('No Scorecard Associated!');
	const template = await db.findField(templateCollection, {
		tid: scorecardId,
		type: 'social_scorecard_template',
	});
	if (!template) throw new Error('No Template found!');
	payload.attributes = await this.trimFields(template.attributes);
	await db.updateField(collectionName, keys, { $set: payload });
	return await db.findField(collectionName, keys);
};

dtthon.trimFields = async attrs => attrs.map((ele) => {
	delete ele.description;
	ele.subattributes = ele.subattributes.map((e) => {
		delete e.description;
		delete e.rubric;
		delete e.ratings;
		return e;
	});
	return ele;
});

dtthon.scoreAttribute = async (req) => {
	const data = req.body;
	const uid = parseInt(data.uid);
	const evalUid = req.uid;
	const score = parseInt(data.score);
	const observation = data.observation;
	const tid = parseInt(data.tid);
	const attributeId = parseInt(data.attributeId);
	if (!attributeId) throw new Error('Invalid attribute Id');
	const keys = {
		uid,
		tid,
		// evaluator:evalUid,
		// isScored:false,
		type: 'submission',
	};

	const submission = await db.findField(collectionName, keys);
	if (!submission) throw new Error('No submission found!');
	if (submission.isScored || submission.evalStatus === 'evaluated') throw new Error('The submission has already been scored');
	if (submission.evalStatus === 'not_started') throw new Error('The evaluation has not started yet!');
	if (submission.evaluator !== evalUid) throw new Error('This submission is being scored by some other evaluator!');

	const res = await db.updateField(collectionName, keys,
		{
			$set: {
				'attributes.$[attribute].observation': observation,
				'attributes.$[attribute].score': score,
			},
		}, {
			arrayFilters: [{ 'attribute.attributeId': attributeId }],
		});
	if (res.result.n) return await db.findField(collectionName, keys);
	return false;
};

dtthon.scoreSubattribute = async (req) => {
	const data = req.body;
	const uid = parseInt(data.uid);
	const evalUid = req.uid;
	const score = parseInt(data.score);
	const observation = data.observation;
	const tid = parseInt(data.tid);
	const attributeId = parseInt(data.attributeId);
	const subattributeId = parseInt(data.subattributeId);
	if (!attributeId) throw new Error('Invalid attribute Id');
	if (!subattributeId) throw new Error('Invalid subattribute Id');
	const keys = {
		uid,
		tid,
		// evaluator:evalUid,
		// isScored:false,
		type: 'submission',
	};

	const submission = await db.findField(collectionName, keys);
	if (!submission) throw new Error('No submission found!');
	if (submission.isScored || submission.evalStatus === 'evaluated') throw new Error('The submission has already been scored');
	if (submission.evalStatus === 'not_started') throw new Error('The evaluation has not started yet!');
	if (submission.evaluator !== evalUid) throw new Error('This submission is being scored by some other evaluator!');

	const res = await db.updateField(collectionName, keys,
		{
			$set: {
				'attributes.$[attribute].subattributes.$[subattribute].observation': observation,
				'attributes.$[attribute].subattributes.$[subattribute].score': score,
			},
		}, {
			arrayFilters: [{ 'attribute.attributeId': attributeId }, { 'subattribute.subattributeId': subattributeId }],
		});
	if (res.result.n) return await db.findField(collectionName, keys);
	throw new Error('You are not authorized to evaluate this scorecard!');
};

dtthon.scoreOverall = async (req) => {
	const data = req.body;
	const uid = parseInt(data.uid);
	const evalUid = req.uid;
	const overallScore = parseInt(data.score);
	const overallObservation = data.observation;
	const tid = parseInt(data.tid);
	const keys = {
		uid,
		tid,
		// evaluator:evalUid,
		// isScored:false,
		type: 'submission',
	};
	const submission = await db.findField(collectionName, keys);
	if (!submission) throw new Error('No submission found!');
	if ((submission.isScored || submission.evalStatus) === 'evaluated') throw new Error('The submission has already been scored');
	if (submission.evalStatus === 'not_started') throw new Error('The evaluation has not started yet!');
	if (submission.evaluator !== evalUid) throw new Error('This submission is being scored by some other evaluator!');

	const res = await db.updateField(collectionName, keys, {
		$set: {
			overallScore,
			overallObservation,
		},
	});
	if (res.result.n) return await db.findField(collectionName, keys);
	throw new Error('Could not score');
};

dtthon.publishScore = async (req) => {
	const data = req.body;
	const uid = parseInt(data.uid);
	const tid = parseInt(data.tid);
	const overallObservation = data.overallObservation
	const evalUid = req.uid;
	const keys = {
		uid,
		tid,
		// evaluator:evalUid,
		// isScored:false,
		type: 'submission',
	};

	const submission = await db.findField(collectionName, keys);
	if (!submission) throw new Error('No submission found!');
	if (submission.isScored || submission.evalStatus === 'evaluated') throw new Error('The submission has already been scored');
	if (submission.evalStatus === 'not_started') throw new Error('The evaluation has not started yet!');
	if (submission.evaluator !== evalUid) throw new Error('This submission is being scored by some other evaluator!');

	const score_publish_time = Date.now();
	const res = await db.updateField(collectionName, keys, {
		$set: {
			isScored: true,
			score_publish_time,
			evalStatus: 'evaluated',
			overallObservation: overallObservation
		}
	});

	if (res.result.n) {
		keys.isScored = true;
		return await db.findField(collectionName, keys);
	}
	throw new Error('Could not publish score!');
};

dtthon.viewScore = async (req) => {
	const uid = parseInt(req.query.uid);
	const tid = parseInt(req.query.tid);
	if (!tid) throw new Error('Tid was not passed');
	if (!uid) throw new Error('uid was not passed');
	const keys = {
		uid,
		tid,
		type: 'submission',
	};
	return await db.findField(db.collections.DEFAULT, keys);
};

dtthon.addFaq = async (req) => {
	const uid = parseInt(req.uid);
	const tid = parseInt(req.body.tid);
	if (!tid) throw new Error('project tid is required');

	const keys = {
		uid,
		tid: tid,
		type: 'project',
	};

	const faqId = await db.incrObjectField('global', 'nextPid');
	const faQnA = {
		faqId,
		question: req.body.question || req.body.question,
		answer: req.body.answer || req.body.answer,
	};


	await db.updateField(collectionName, keys, { $addToSet: { faqs: faQnA } }); // check addToSet in Mongodb docs

	return faQnA;
};

dtthon.editFaq = async (req) => {
	const uid = parseInt(req.uid);
	const projectTid = parseInt(req.body.tid);
	const faqId = parseInt(req.body.faqId);

	const project = await db.findField(collectionName, {
		tid: projectTid,
		type: 'project',
	});
	if (!project) throw new Error('No project found');

	const { faqs } = project;
	if (!faqs) throw new Error('No FAQs present!');

	const _faqs = [...faqs];

	const __faqs = _faqs.find(elem => elem.faqId === faqId);
	if (!Object.keys(__faqs).length) throw new Error('FAQ was not found');

	const updatedFaq = parseInt(_faqs.findIndex(faq => faq.faqId === faqId));
	console.log('updatedFaq:', updatedFaq);

	if (updatedFaq === -1) return 'no FAQ with specified Id';
	_faqs[updatedFaq].question = req.body.question || _faqs[updatedFaq].question;
	_faqs[updatedFaq].answer = req.body.answer || _faqs[updatedFaq].answer;

	const keys = {
		uid,
		tid: projectTid,
		type: 'project',
	};

	await db.updateField(collectionName, keys, { $set: { faqs: _faqs } });

	return { _faqs };
};

dtthon.deleteFaq = async (req) => {
	const uid = parseInt(req.uid);
	const projectTid = parseInt(req.body.tid);
	const faqId = parseInt(req.body.faqId);

	const project = await db.findField(collectionName, {
		tid: projectTid,
		type: 'project',
	});
	if (!project) throw new Error('No project found');

	const { faqs } = project;
	if (!faqs) throw new Error('No FAQs present!');

	const _faq = faqs.find(faq => faq.faqId === faqId);
	if (!Object.keys(_faq).length) throw new Error('No FAQ with such id found');

	const keys = {
		uid,
		tid: projectTid,
		type: 'project',
	};

	const state = await db.updateField(collectionName, keys, { $pull: { faqs: { faqId: faqId } } });

	return { deleted: state.result.n === 1 };
};
/**
 * @date 17-10-2022
 * @author imshawan
 * @function exportSubmissionReportAsCSV
 * @description Responsible for exporting the list of users who have submitted a particular project, in CSV format
 * @param {Object} data
 */
dtthon.exportSubmissionReportAsCSV = async function (data) {
	const tid = parseInt(data.query.tid);
	if (!tid) throw new Error('tid is required!');

	const csvFileFields = ['username', 'fullname', 'email'];
	const keys = {
		type: 'submission',
		tid,
		$or: [{ status: 'Submitted' }, { status: 'submitted' }],
	};

	const submissionList = await db.findFields(collectionName, keys);

	const submissionUsers = await Promise.all(submissionList.map(async record => await user.getUserFields(record.uid, csvFileFields)));

	const submissionReport = submissionUsers.map((user) => {
		let line = '';
		csvFileFields.forEach((field) => {
			line += `${user[field] || '---'},`;
		});
		return line;
	});

	const fd = await fs.promises.open(path.join(baseDir, 'build/export', `${tid}_submission_report.csv`), 'w');

	await fs.promises.appendFile(fd, csvFileFields.join() + '\n');
	await fs.promises.appendFile(fd, submissionReport.join('\n'));

	await fd.close();
};

dtthon.makeItPrivate = async (req) => {
	const data = req.body;
	console.log(req.body)
	console.log(data)
	//const scorecardId = parseInt(data.scorecardId);
	const tid= req.params.id;
	console.log(tid)
	
	let dtthonproject = await db.findFields(collectionName,
		{
			_key:`topic:${tid}`
			
		}
	);
	console.log(dtthonproject)
	if (!dtthonproject) throw new Error(`No project with tid ${tid} exists!`);
	let keys = {
		_key: `topic:${tid}`,
	};
	let res = await db.updateField(collectionName, keys, {
		$set: {
			data
		},
		$set: {
			isItPrivate: true
		}
	});

	return await db.findField(collectionName, keys);
};

dtthon.makeItPublic = async (req) => {
	let tid = req.params.id;
	let keys = {
		_key:`topic:${tid}`
	}
	let dtthonproject = await db.findFields(collectionName,keys);
	if(!dtthonproject) throw new Error(`No project with tid ${tid} exists!`)
	let res = await db.updateField(collectionName,keys,{
		$set:{
			isItPrivate: false
		}
	});
	return await db.findField(collectionName,keys)
};
//create submission info object
// dtthon.submissionInfo = async function (req) {
//     try {
//     const uid = parseInt(req.uid);
//     const tid = req.body.tid;
//     const timestamp = req.timestamp != null ? req.timestamp : Date.now();

dtthon.cloneProject = async (req) => {
	const project = await db.findField(collectionName, { tid: parseInt(req.body.tid) });

	req.body.tasks = project.tasks;
	req.body.native_tid = project.tid;
	req.body.native_uid = project.uid;

	return await this.createProject(req);
};
