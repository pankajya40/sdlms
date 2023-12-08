"use strict";
var meta = require("../meta");

const groups = require("../groups");
const _ = require("lodash");
const categories = require("../categories");
const db = require("../database");
const user = require("../user");
const topics = require("../topics");
const plugins = require("../plugins");
const slugify = require("../slugify");
const winston = require("winston");
const ObjectId = require("mongodb").ObjectId;
const nconf = require("nconf");
const axios = require("axios");
const { privileges } = require("../controllers/admin");
const userPrivileges = require("../privileges");
const utils = require("../controllers/utils");

const dtthon = module.exports;

/**
 * @author: Ebrahim Aliyou
 * @description: crud for scoresheet
 */


socialScoresheet.createScoresheet = async function (req, res, next) {
    

    // when called calls the smaller segment recursively i.e,
    // createScorecard(req,res);
	try {

		const payload = {
            uid: 0, // creators id
            luid: 0, // applicants id
            pid: 0, // pid of the model
			type: "socialScoresheet",
			scorecard: [], // an array of scorecard
		};

		const tid = await createScoresheet(payload); // not done yet
		return { tid };
	} catch (e) {
		console.error(e);
		throw new Error(e.message);
	}
};

const createScorecard = async (req,res) =>{
    // calls for the smaller segment ie, 
    // createRubric();


}
// dtthon.editProject = async function (req, res, next) {
// 	const collectionName = db.collections.DEFAULT;
// 	try {
// 		const luid = parseInt(req.uid);
// 		if (!req.uid || luid < 1) throw new Error("Unauthorized");

// 		const keys = {
// 			uid: luid,
// 			tid: parseInt(req.body.tid),
// 		};
// 		let parsedData = {};

// 		if (req.body.content) parsedData.content = req.body.content;
// 		if (req.body.title) parsedData.title = req.body.title;
// 		if (req.body.short_description)
// 			parsedData.topic_tid = req.body.short_description;
// 		if (req.body.description) parsedData.description = req.body.description;
// 		if (req.body.start_time) parsedData.start_time = req.body.start_time;
// 		//if (req.body.end_times) parsedData.end_time = req.body.end_times;
// 		if (req.body.project_image)
// 			parsedData.project_image = req.body.project_image;
// 		if (req.body.pre_requisites)
// 			parsedData.uploaded_images = req.body.pre_requisites;
// 		if (req.body.learning_outcomes)
// 			parsedData.uploaded_images = req.body.learning_outcomes;
// 		if (req.body.tools) parsedData.commitment = req.body.commitment;
// 		if (req.body.status) {
// 			parsedData.status = req.body.status;
// 			if (req.body.status == "published") {
// 				parsedData.start_time = Date.now();
// 			}
// 			if (req.body.status == "closed") {
// 				parsedData.end_time = Date.now();
// 			}
// 		}

// 		const state = await db.updateFieldWithMultipleKeys(
// 			collectionName,
// 			keys,
// 			parsedData
// 		);
// 		if (!state) {
// 			throw new Error("Unauthorized write access!");
// 		}
// 		return state;
// 	} catch (e) {
// 		console.error(e);
// 		throw new Error(e.message);
// 	}
// };

// dtthon.getProjects = async function (req, res, next) {
// 	const collectionName = db.collections.DEFAULT;
// 	try {
// 		//get 1 project with a tid
// 		console.log(req.body);
// 		const uid = parseInt(req.uid);
// 		// let requirments = req.body.requirments ? (Array.isArray(req.body.requirments) ? req.body.requirments : JSON.parse(req.body.requirments)) : [];
// 		const isRecruiter =
// 			req.query.isRecruiter && (await userPrivileges.users.isRecruiter(uid));
// 		if (req.query.tid) {
// 			const tid = parseInt(req.query.tid);
// 			if (!tid || tid < 1) throw new Error("Invalid tid");

// 			const keys = {
// 				tid: tid,
// 				status: {
// 					$regex: isRecruiter
// 						? "published|draft|visible|closed"
// 						: "published|visible",
// 				},
// 			};

// 			const Project = await db.findField(collectionName, keys);

// 			if (!Project) {
// 				throw new Error("No Project found!");
// 			}
// 			Project.recruiter = await user.getUserFields(
// 				[Project.uid],
// 				["username", "fullname", "userslug", "picture"]
// 			);
// 			return Project;
// 		}

// 		//(get all projects for perticular filters, no login needed)

// 		const page = parseInt(req.query.page) || 0;
// 		const limit = parseInt(req.query.limitBy) || 5;
// 		let keys = {
// 			type: "project",
// 			status: { $regex: "published|closed|visible" },
// 		};

// 		if (
// 			req.query.fromDate ||
// 			req.query.toDate ||
// 			req.query.from ||
// 			req.query.to
// 		)
// 			keys = {
// 				...keys,
// 				...getKeysByTime(req, isRecruiter ? "timestamp" : "start-time"),
// 			};
// 		if (req.query.tags) {
// 			let tags = Array.isArray(req.query.tag) ? req.query.tag : [req.query.tag];
// 			keys = { ...keys, globalTags: { $regex: `${tags.join("$|")}$` } }; // $ sign in regex is for newline, this is added for not getting webdevelopement when searching for tag web
// 			//console.log(`tag:${req.query.tags.join("$|tag:")}$`)
// 		}
// 		// did not use internal functionality of isRecruiter, because: recruiter may want to see all projects on forum that are not made by him (just like applicant)
// 		if (isRecruiter) {
// 			keys.uid = req.uid;
// 			keys.status = { $regex: "published|closed|draft|visible" };
// 		}
// 		if (req.query.cid) keys.cid = parseInt(req.query.cid);

// 		let Projects = null;

// 		Projects = await db.getFieldsWithPagination(
// 			collectionName,
// 			keys,
// 			limit,
// 			page,
// 			{ timestamp: -1 }
// 		);
// 		let count = await db.countDocuments(collectionName, keys);

// 		if (!Projects) {
// 			throw new Error("Unauthorized write access!");
// 		}
// 		if (!isRecruiter) {
// 			Projects = await Promise.all(
// 				Projects.map(async (elem) => {
// 					let recruiter = await user.getUserFields(
// 						[elem.uid],
// 						["username", "fullname", "userslug", "picture"]
// 					);
// 					return { ...elem, recruiter };
// 				})
// 			);
// 		}

// 		Projects = await Promise.all(
// 			Projects.map(async (elem) => {
// 				let macrodata = {};
// 				const applicant_count = await db.countDocuments(collectionName, {
// 					type: "submissionInfo",
// 					tid: elem.tid,
// 				}); //count of applicants

// 				const pending_count = await db.countDocuments(collectionName, {
// 					type: "submissionInfo",
// 					tid: elem.tid,
// 					"submission_history.eval_status": "pending",
// 				}); //count of pending applicants
// 				const reAsigned_count = await db.countDocuments(collectionName, {
// 					type: "submissionInfo",
// 					tid: elem.tid,
// 					"submission_history.eval_status": "re-asigned",
// 				}); //count of pending applicants

// 				// macrodata.pending_count = 50; //count of  applicants

// 				return {
// 					...elem,
// 					macrodata: { applicant_count, pending_count, reAsigned_count },
// 				};
// 			})
// 		);

// 		return utils.paginate(`/apps${req.url}`, Projects, count, limit, page);
// 	} catch (e) {
// 		console.error(e);
// 		throw new Error(e.message);
// 	}
// };
// dtthon.getCustomProjects = async function (req, res, next) {
// 	const collectionName = db.collections.DEFAULT;
// 	try {
// 		//get 1 project with a tid
// 		let requirments = req.query.requirments;
// 		console.log(requirments);
// 		if (!Array.isArray(requirments)) requirments = [requirments];

// 		if (!requirments.length) throw new Error("Invalid requirments passed!");

// 		//(get all projects for perticular filters, no login needed)

// 		const isRecruiter = req.query.isRecruiter
// 			? JSON.parse(req.query.isRecruiter.toLowerCase())
// 			: false;
// 		const page = parseInt(req.query.page) || 0;
// 		const limit = parseInt(req.query.limitBy) || 5;
// 		let keys = {
// 			type: "project",
// 			status: { $regex: "published|closed" },
// 		};

// 		if (
// 			req.query.fromDate ||
// 			req.query.toDate ||
// 			req.query.from ||
// 			req.query.to
// 		)
// 			keys = {
// 				...keys,
// 				...getKeysByTime(req, isRecruiter ? "timestamp" : "start-time"),
// 			};
// 		if (req.query.tags) {
// 			let tags = Array.isArray(req.query.tag) ? req.query.tag : [req.query.tag];
// 			keys = { ...keys, globalTags: { $regex: `${tags.join("$|")}$` } }; // $ sign in regex is for newline, this is added for not getting webdevelopement when searching for tag web
// 			//console.log(`tag:${req.query.tags.join("$|tag:")}$`)
// 		}
// 		// did not use internal functionality of isRecruiter, because: recruiter may want to see all projects on forum that are not made by him (just like applicant)
// 		if (isRecruiter) {
// 			keys.uid = req.uid;
// 			keys.status = { $regex: "published|closed|draft" };
// 		}
// 		if (req.query.cid) keys.cid = parseInt(req.query.cid);

// 		let Projects = null;

// 		let requirmentsKey = {};
// 		requirments.forEach((requirment) => {
// 			requirmentsKey[requirment] = `$${requirment}`;
// 		});
// 		console.log(requirmentsKey, keys);
// 		Projects = await db.Aggregate(collectionName, [
// 			{ $match: keys },
// 			{ $sort: { timestamp: -1 } },
// 			{ $skip: page * limit },
// 			{ $limit: limit },
// 			{ $project: requirmentsKey },
// 		]);
// 		//console.log(Projects, typeof projects)

// 		let count = await db.countDocuments(collectionName, keys);

// 		if (!Projects) {
// 			throw new Error("Unauthorized write access!");
// 		}
// 		if (!isRecruiter && requirments.indexOf("recruiter") != -1) {
// 			Projects = await Promise.all(
// 				Projects.map(async (elem) => {
// 					let recruiter = await user.getUserFields(
// 						[elem.uid],
// 						["username", "fullname", "userslug", "picture"]
// 					);
// 					return { ...elem, recruiter: recruiter };
// 				})
// 			);
// 		}

// 		if (requirments.indexOf("macrodata") > -1)
// 			Projects = await Promise.all(
// 				Projects.map(async (elem) => {
// 					let macrodata = {};
// 					macrodata.applicant_count = await db.countDocuments(collectionName, {
// 						type: "submissionInfo",
// 						tid: elem.tid,
// 					}); //count of applicants

// 					macrodata.pending_count = await db.countDocuments(collectionName, {
// 						type: "submissionInfo",
// 						tid: elem.tid,
// 						"submission_history.eval_status": "pending",
// 					}); //count of pending applicants
// 					macrodata.reAsigned_count = await db.countDocuments(collectionName, {
// 						type: "submissionInfo",
// 						tid: elem.tid,
// 						"submission_history.eval_status": "re-asigned",
// 					}); //count of pending applicants

// 					// macrodata.pending_count = 50; //count of  applicants

// 					return { ...elem, macrodata: macrodata };
// 				})
// 			);

// 		return utils.paginate(`/apps${req.url}`, Projects, count, limit, page);
// 	} catch (e) {
// 		console.error(e);
// 		throw new Error(e.message);
// 	}
// };






// const socialScoresheet = module.exports;


// // scoresheet creator 

// socialScoresheet.createScoresheet = async(req,res,next) =>{
    
// }



// //scorecard creator // takes on  a scorecard and iteratively send each score card to a score sheet , not connected to a database