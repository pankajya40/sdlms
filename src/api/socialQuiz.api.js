const meta = require("../meta");

const _ = require("lodash");
const db = require("../database");
const User = require('../user');
// const user = require("../user");
const ObjectId = require("mongodb").ObjectId;
const utils = require("../controllers/utils");

const socialQuiz = module.exports;

const collectionName = db.collections.SOCIAL_QUIZ.TEMPLATE;
const submissionCollection = db.collections.SOCIAL_QUIZ.SUBMISSION;


/**
 * @date 14-10-2022
 * @author Abdiqafar Abukar
 * @description this API For socialQuiz for creating the quiz and all other functionalities
 */
// create quiz
socialQuiz.createQuiz = async (req) => {
	const data = req.body
	const pid = await db.incrObjectField('global', 'nextPid')
	const title = data.title || '';
	const uid = parseInt(req.uid);
	const  quizDetail = data.blocks || [];
	const createdAt = Date.now();
	// let publishedDate = data.publishedAt;
	// let publishedAt = new Date(publishedDate).getTime();

	let payload = {
		pid,
		uid,
		title,
		quizDetail,
		// publishedAt,
		createdAt,
		isActive: false,
		status: 'draft'
	}
	return await db.setField(collectionName, payload);
};



// get quiz
socialQuiz.getQuiz = async (req) => {
	// let uid = parseInt(req.query.uid)

	// let keys = {
	// 	status: 'draft',
	// }
	//  if (uid) keys.uid = uid;

	const {userId} = req.params;
	if (!userId) throw new Error('User ID is not passed');

	let keys = {
		//pid:parseInt(pid),
		uid: parseInt(userId),
		// status: 'draft'
	}
	let title = req.query.title;
	if(title) keys.title = {$regex:title, $options:'i'}

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [quiz, count] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);
	return utils.paginate(`/socialquiz/${req.url}`, quiz, count, limit, page);
};

// get selected quiz
socialQuiz.getSelectedQuiz = async (req) => {
	const data = req.body
	const uid = req.uid

	const pid = data.pid;

	let keys = {
		pid: parseInt(pid),
		uid: parseInt(uid),
		status: 'published'
	}
	let res = await db.findField(collectionName, keys);
	return res
}

// edit quiz
socialQuiz.editQuiz = async (req) => {
	const data = req.body;

	const pid = parseInt(data.pid);
	const uid = parseInt(req.uid);

//	const publishedAt = data.publishedAt;
	let quizDetail = data.blocks;
	let updates = {}

	let keys = {
		pid,
		uid,
	}

//	if (publishedAt) updates.$set.publishedAt = publishedAt;
	if (quizDetail) updates.quizDetail = quizDetail;
	console.log(data);

	const state = await db.updateField(collectionName, keys, { $set: updates });
	return {
		updated: state.result.n === 1,
	};
};
// delete quiz
socialQuiz.deleteQuiz = async (req) => {
	const data = req.body;
	const uid = req.uid;
	const pid = parseInt(data.pid);
	let keys = {
		pid,
		uid,
		isActive: false
	}
	let quiz = await db.findField(collectionName, keys);
	if (!quiz) throw new Error("No quiz Found to delete!");
	if (quiz.isActive == true) throw new Error("Can't delete the quiz. The quiz is in active state")

	const res = await db.removeField(collectionName, keys);
	return await db.findField(collectionName, keys);

};
// publish the quiz
socialQuiz.publishedQuiz = async (req) => {
	const data = req.body;
	const pid = parseInt(data.pid);
	const uid = req.uid;
	let keys = {
		uid,
		pid,
		// status: 'draft'
	}
	let quiz = await db.findField(collectionName, keys);
	if (!quiz) throw new Error('No Quiz to publish');

	let res = await db.updateField(collectionName, keys, {
		$set: {
			status: 'published',
		}
	});
	// console.log("no one is there to publish")
	keys.status = 'published'
	return await db.findField(collectionName, keys);

}
// get published quiz
socialQuiz.getPublishedQuiz = async (req) => {
	let uid = parseInt(req.query.uid)

	let keys = {
		status: 'published',
	}
	//if (uid) keys.uid = uid;

	let title = new RegExp(req.query.title);
	if(title) keys['quizDetail.title'] = {$regex:title, $options:'i'}

	// let status = req.query.status;
	// if(status){
	//     keys.status = status
	// }

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [publishedQuiz, count] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page),
		db.countDocuments(collectionName, keys),
	]);
	return utils.paginate(`/socialquiz/${req.url}`, publishedQuiz, count, limit, page);
}
// get active quizzes
socialQuiz.getActiveQuiz = async (req) => {

	let keys = {
		type:"instance"
	}

	//let title = new RegExp(req.query.title);
	//if(title) keys['quizDetail.title'] = {$regex:title, $options:'i'}

	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

	const [activeQuiz, count] = await Promise.all([
		db.getFieldsWithPagination(submissionCollection, keys, limit, page),
		db.countDocuments(submissionCollection, keys),
	]);
	return utils.paginate(`/socialquiz/${req.url}`, activeQuiz, count, limit, page);
}

// start quiz
// socialQuiz.startQuiz = async (req) => {
// 	const data = req.body;
// 	const pid = parseInt(data.pid);
// 	const tid = await db.incrObjectField('global', 'nextTid')
// 	const uid = req.uid;

// 	let session = req.session;
// 	// store quizId in session store
// 	session.tid = tid;
// 	console.log(req.session);

// 	let keys = {
// 		uid,
// 		pid,
// 		status: 'published',
// 		isActive: false
// 	}
// 	let quiz = await db.findField(collectionName, keys);
// 	if (!quiz) throw new Error('Quiz not Found!');

// 	let res = await db.updateField(collectionName, keys, {
// 		$set: {
// 			isActive: true,
// 		}
// 	});
// 	keys.isActive = true;
// 	return await db.findField(collectionName, keys);

// }

socialQuiz.startQuiz = async (req) => {
	const data = req.body;
	// const pid = parseInt(data.pid);
	// const tid = await db.incrObjectField('global', 'nextTid')
	// const uid = req.uid;
	
	let sessionid = req.params.id;
	// store quizId in session store
	//session.tid = tid;
	

	let keys = {
		_id : ObjectId(sessionid) 
	}
	let quiz = await db.findField(submissionCollection, keys);
	if (!quiz) throw new Error('Quiz not Found!');

	let res = await db.updateField(submissionCollection, keys, {
		$set: {
			isStarted: true,
		}
	});
	keys.isStarted = true;
	return await db.findField(submissionCollection, keys);

}
// end quiz
// socialQuiz.endQuiz = async (req) => {
// 	const data = req.body;
// 	const pid = parseInt(data.pid);
// 	const uid = req.uid;
// 	let keys = {
// 		uid,
// 		pid,
// 		status: 'published',
// 		isActive: true,
// 	}
// 	let quiz = await db.findField(collectionName, keys);
// 	if (!quiz) throw new Error('Quiz not Found!');

// 	let res = await db.updateField(collectionName, keys, {
// 		$set: {
// 			isActive: false,
// 		}
// 	});
// 	keys.isActive = false;
// 	return await db.findField(collectionName, keys);

// }

socialQuiz.endQuiz = async (req) => {
	const data = req.body;
	// const pid = parseInt(data.pid);
	// const tid = await db.incrObjectField('global', 'nextTid')
	// const uid = req.uid;
	
	let sessionid = req.params.id;
	// store quizId in session store
	//session.tid = tid;
	

	let keys = {
		_id : ObjectId(sessionid) 
	}
	let quiz = await db.findField(submissionCollection, keys);
	if (!quiz) throw new Error('Quiz not Found!');

	let res = await db.updateField(submissionCollection, keys, {
		$set: {
			isStarted: false,
		}
	});
	keys.isStarted = false;
	return await db.findField(submissionCollection, keys);


}

// Submission operations
// Get a submissions
socialQuiz.getSubmission = async (req) => {

	//  with this quizID AND SessionID how will i get the submitted data
	// quizId: 10827,
	// sessionID: '7DHm0fucvxwWIfFhFW0P5TWw7-38T4yc'

	const {userId} = req.params;
	if (!userId) throw new Error('User ID is not passed');

	let session = req.session;

	let sessionID = session.sessionID;

	let quizId = session.quizId;

	const pid = quizId;

	let keys = {
		pid: parseInt(pid),
		uid: parseInt(userId),
		type: 'social-quiz-submission'
	}
	if(sessionID && quizId){
		let res = await db.findField(submissionCollection, keys);
		return res
	}


}
// Create Submission
socialQuiz.createSubmission = async (req) => {
	const data = req.body;
	const uid = req.uid;
	const pid = parseInt(data.pid);
	const tid = parseInt(data.tid)

	let session = req.session;
	let sessionID = req.sessionID;

	// store quizId and sessionID in session
	session.tid = tid;
	session.sessionID = sessionID;

	console.log(req.session);

	// const questionId = data.questionId;
	// const blocks = data.blocks || [];
	const submittedAt = Date.now();
	let answer = data.answer || '';

	let payload = {
		pid,
		uid,
		// blocks,
		answer,
		submittedAt,
		type: 'social-quiz-submission'
	}
	return await db.setField(submissionCollection, payload);
}
// Edit Submission
socialQuiz.editSubmission = async (req) => {
	 const data = req.body;
	 console.log(req.body)
	// const pid = parseInt(data.pid);
	const uid = req.uid;
	const questionId = data.questionId;
	const answers = data.blocks;
	const {id} = req.params;

	let updates = {
		$push: {
			submissions: {uid,answers}
		}
	}
	let keys = {
		type: "instance",
		_id: ObjectId(id),
	}
	//if (data) updates.$set.submissions = data;
	let res = await db.updateField(submissionCollection, keys, updates);

	return await db.findField(submissionCollection, keys);

}

socialQuiz.deleteSubmission = async (req) => {
	return {
		message: "Not implemented",
	}
}

//start marking quiz
socialQuiz.startMarking = async (req) => {
	const data = req.body;
	// const pid = parseInt(data.pid);
	// const tid = await db.incrObjectField('global', 'nextTid')
	// const uid = req.uid;

	let {session} = req.params;
	//session.tid = tid;
	console.log(session);

	let keys = {
		_id: ObjectId(session),
		type: "instance"
	}
	let quiz = await db.findField(submissionCollection, keys);
	if (!quiz) throw new Error('Quiz not Found!');

	let res = await db.updateField(submissionCollection, keys, {
		$set: {
			isMarkingStarted: true,
		}
	});

	return await db.findField(submissionCollection, keys);

}

//end marking quiz
socialQuiz.endMarking = async (req) => {
	const data = req.body;
	// const pid = parseInt(data.pid);
	// const tid = await db.incrObjectField('global', 'nextTid')
	// const uid = req.uid;

	let {session} = req.params;
	//session.tid = tid;
	console.log(session);

	let keys = {
		_id: ObjectId(session),
		type: "instance"
	}
	let quiz = await db.findField(submissionCollection, keys);
	if (!quiz) throw new Error('Quiz not Found!');

	let res = await db.updateField(submissionCollection, keys, {
		$set: {
			isMarkingStarted: false,
		}
	});
	
	return await db.findField(submissionCollection, keys);

}

socialQuiz.clone = async (req) => {
	const data = req.body;
	const pid = data.pid;
	const uid = req.uid;
	const quizData = await db.findField(collectionName,{pid: parseInt(pid)})
	
	const payload = {
		templatePid: parseInt(pid),
		uid,
		quizData,
		type: 'instance',
		isStarted: false,
		isMarkingStarted: false,
	};
	return await db.setField(submissionCollection, payload);
};

socialQuiz.addParticipantUid = async (req) => {
	//const data = req.body;
	// const pid = parseInt(data.pid);
	// const tid = await db.incrObjectField('global', 'nextTid')
	const uid = req.uid;

	let {session} = req.params;
	//session.tid = tid;
	console.log(session);
	//console.log(data)
	let keys = {
		_id: ObjectId(session),
		type: "instance"
	}
	let quiz = await db.findField(submissionCollection, keys);
	if (!quiz) throw new Error('Quiz not Found!');
	console.log(uid)
	let res = await db.updateField(submissionCollection, keys, {
		$push: {
			participants: uid,
		}
	});

	return await db.findField(submissionCollection, keys);

}

socialQuiz.setEvaluators = async (req) => {
	const data = req.body;
	// const pid = parseInt(data.pid);
	// const tid = await db.incrObjectField('global', 'nextTid')
	const uid = req.uid;
	let {session} = req.params;
	//session.tid = tid;
	console.log(session);
	//console.log(data)
	let keys = {
		_id: ObjectId(session),
		type: "instance"
	}
	let quiz = await db.findField(submissionCollection, keys);
	if (!quiz) throw new Error('Quiz not Found!');
	console.log(uid)
	let res = await db.updateField(submissionCollection, keys, {
		$set: {
			evaluators: data,
		}
	});

	return await db.findField(submissionCollection, keys);

};

socialQuiz.updateMarking = async (req) => {
	const data = req.body;
	// const pid = parseInt(data.pid);
	// const tid = await db.incrObjectField('global', 'nextTid')
	const uid = req.uid;
	let {sessionid} = req.params;
	//session.tid = tid;
	//console.log(session);
	//console.log(data)
	let keys = {
		_id: ObjectId(sessionid),
		type: "instance"
	}
	let quiz = await db.findField(submissionCollection, keys);
	if (!quiz) throw new Error('Quiz not Found!');
	//console.log(uid)
	let res = await db.updateField(submissionCollection, keys, {
		$push: {
			markings: {uid: uid,markingsdata: data, sessionId: sessionid},
		}
	});

	return await db.findField(submissionCollection, keys);

};
