const _ = require("lodash");
const db = require("../../database");
const User = require("../../user");
const ObjectId = require("mongodb").ObjectId;
const utils = require("../../controllers/utils");
const attributes = require('../attributes');

const socialQuiz = module.exports;

const collectionName = db.collections.SOCIAL_QUIZ_V2;
const quizBasicFields = ['_key', 'title', 'questions', 'attachedTo', 'description'];


/**
 * 
 * @date 24-03-2023
 * @author imshawan <hello@imshawan.dev>
 * @function get
 * @description Gets a quiz by its id as passed in params or it can also fetch all the quizzes in a paginated manner
 * @param {Object} req 
 * @returns {Object} A single object if searched by id and returns a paginated object if its fetching all the quizzes.
 */

socialQuiz.get = async (req) => {
    const uid = parseInt(req.uid);
    const {quizId} = req.params;

    let { populate = "",query,status ,attachmentId,hasResponse=0} = req.query;
    populate = (populate || "").split(',').map(el => el.trim()).filter(el => el.length);

    if (quizId) {
        if (!ObjectId.isValid) {
            throw new Error('Invalid quiz id');
        }

        return await db.findField(collectionName, {_id: ObjectId(quizId), _key: 'quiz'});
    }

    const keys = {
        _key: 'quiz',
        deleted: {$ne: true}
    };
    

    /**
     * @author Alex
     * @description Adding the status and query filters
     */
    
    if(query) keys.title = {$regex: new RegExp(query, 'i')};
    if(status == 'available') {
       
        keys.$or = [
            { attachedTo: { $exists: false } },
            { attachedTo: { $size: 0 } }
        ];
    }

    if(attachmentId) keys.attachedTo = {
        $in : [attachmentId]
    }

    const order = {_id: -1}

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    let [quizzes=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    quizzes = await Promise.all(quizzes.map(async quiz => {
        let keys = {
            _key: {$regex: new RegExp(`^quiz:${quiz._id}:answer:(.*)$`), $options: 'i'},
            deleted: {$ne: true}
        };

        let responseCount = await db.countDocuments(collectionName, keys);
        return {...quiz, responseCount};
    }));

    if(hasResponse) quizzes = quizzes.filter(quiz => quiz.responseCount > 0);

    const populated = await attributes.populate(quizzes, populate);

    return utils.paginate(`/socialquiz${req.url}`, populated, count, limit, page);
}

socialQuiz.create = async (req) => {
    const uid = parseInt(req.uid);
    const {description, title, availableAt, expiresAt, startedAt, endedAt} = req.body;
    const currentTime = utils.getISOTimestamp();
    const payload = {
        _key: 'quiz',
        uid,
        title,
    };

    let {questions, attachedTo} = req.body;
    let errors = 0;

    if (!Array.isArray(questions)) {
        throw new Error(`'questions' must be an array, found ${typeof questions} instead`);
    }

    if (attachedTo) {
        if (!Array.isArray(attachedTo)) {
            throw new Error(`'attachedTo' must be an array, found ${typeof attachedTo} instead`);
        }

    } else {
        attachedTo = [];
    }

    questions = questions.map(question => {
        if (!question.question || !question.duration) {
            errors++;
        }

        question.id = utils.generateUUID();

        return question;
    });

    if (errors) {
        throw new Error(`Improper structure of questions found at multiple position(s) (${errors})`);
    }

    if (description) {
        payload.description = description;
    }

    if (startedAt) {
        payload.startedAt = new Date(Number(startedAt)).toISOString();
    }

    if (endedAt) {
        payload.endedAt = new Date(Number(endedAt)).toISOString();
    }

    payload.questions = questions;
    payload.attachedTo = attachedTo;
    payload.createdAt = currentTime;
    payload.createdBy = 'user:' + uid;
    payload.updatedAt = currentTime;
    payload.updatedBy = 'user:' + uid;

    return await db.setField(collectionName, payload);
}


/**
 * 
 * @date 24-03-2023
 * @author imshawan <hello@imshawan.dev>
 * @function update
 * @description Handles the update operation of a quiz. As of now only the auhor of the quiz can modify it, but we need to once
 * confirm if that is the right way to deal with this. In short, we need to check for permissions. 
 * @param {Object} req 
 * @returns updated: true/false
 */

socialQuiz.update = async (req) => {
    const uid = parseInt(req.uid);
    const {quizId} = req.params;
    const {description, title, startedAt, endedAt} = req.body;
    const currentTime = utils.getISOTimestamp();

    if (!ObjectId.isValid(quizId)) {
        throw new Error('Invalid quiz id supplied');
    }

    const keys = {
        _key: 'quiz',
        _id: ObjectId(quizId),
    };
    
    const quiz = await db.findField(collectionName, keys);
    if (!quiz) {
        throw new Error('No quiz was found with the supplied id');
    }

    if (quiz.uid != uid) {
        throw new Error('You are not authorized to perform this operation');
    }

    if (quiz.deleted) {
        throw new Error('Cannot update a quiz that is already deleted');
    }

    const payload = {};
    let {questions, attachedTo} = req.body;
    let errors = 0, updated = false;

    if (questions) {
        if (!Array.isArray(questions)) {
            throw new Error(`'questions' must be an array, found ${typeof questions} instead`);
        }

        var oldQuestions = quiz.questions || [];
        questions = questions.map(question => {
            const uuid = utils.generateUUID();
            if (!question.question || !question.duration) {
                errors++;
            } else if (oldQuestions && oldQuestions.length) {
                let objIndex = oldQuestions.findIndex(elem => elem.id == question.id);
                if (objIndex === -1) {
                    objIndex = oldQuestions.findIndex(elem => elem.question == question.question);
                }

                if (objIndex != -1) {
                    question.id = oldQuestions[objIndex]['id'];
                    oldQuestions.splice(objIndex, 1);
                } else {
                    question.id = uuid;
                }
            } else {
                question.id = uuid;
            }
    
            return question;
        });
    
        if (errors) {
            throw new Error(`Improper structure of questions found at multiple position(s) (${errors})`);
        }

        payload.questions = questions.concat(oldQuestions);
    }

    if (attachedTo) {
        if (!Array.isArray(attachedTo)) {
            throw new Error(`'attachedTo' must be an array, found ${typeof attachedTo} instead`);
        }

        payload.attachedTo = attachedTo;
    }

    if (title) {
        payload.title = title;
    }

    if (description) {
        payload.description = description;
    }

    if (startedAt) {
        payload.startedAt = new Date(Number(startedAt)).toISOString();
    }

    if (endedAt) {
        payload.endedAt = new Date(Number(endedAt)).toISOString();
    }

    if (Object.keys(payload).length) {
        payload.updatedAt = currentTime;
        payload.updatedBy = 'user:' + uid;

        const acknowledgement = await db.updateField(collectionName, keys, {$set: payload});
        updated = acknowledgement.result.n === 1;
    }

    return {
        updated
    };
}


/**
 * 
 * @date 24-03-2023
 * @author imshawan <hello@imshawan.dev>
 * @function delete
 * @description Handles the delete operation of a quiz. As of now only the auhor of the quiz can delete it, but we need to once
 * confirm if that is the case. 
 * 
 * @note This operation doesn't delete the quiz from the database but acts as a soft delete mechanism where a 'deleted' property
 * is attached with the document which marks it as ignored documents for the get operation for quizzes.
 * @param {Object} req 
 * @returns {Object} deleted: true/false
 */

socialQuiz.delete = async (req) => {
    const uid = parseInt(req.uid);
    const {quizId} = req.params;
    const currentTime = utils.getISOTimestamp();

    if (!ObjectId.isValid(quizId)) {
        throw new Error('Invalid quiz id supplied');
    }

    const keys = {
        _key: 'quiz',
        _id: ObjectId(quizId),
    };
    
    const quiz = await db.findField(collectionName, keys);
    if (!quiz) {
        throw new Error('No quiz was found with the supplied id');
    }

    if (quiz.uid != uid) {
        throw new Error('You are not authorized to perform this operation');
    }

    if (quiz.deleted) {
        throw new Error('Cannot delete a quiz that is already deleted');
    }

    const payload = {
        deleted: true,
        deletedAt: currentTime,
        deletedBy: `user:${uid}`,
    }

    const acknowledgement = await db.updateField(collectionName, keys, {$set: payload});
    return {
        deleted: acknowledgement.result.n === 1
    }
}

/**
 * 
 * @date 24-03-2023
 * @author imshawan <hello@imshawan.dev>
 * @function clone
 * @description Clones a quiz object as per the quiz id is supplied. 
 * (A duplicate quiz object is created with the reference of the old quiz and user who cloned it is assigned as the author)
 * @param {Object} req 
 * @returns 
 */
socialQuiz.clone = async (req) => {
    const uid = parseInt(req.uid);
    const {quizId} = req.params;
    const currentTime = utils.getISOTimestamp();

    if (!ObjectId.isValid(quizId)) {
        throw new Error('Invalid quiz id supplied');
    }

    const payload = {};
    const keys = {
        _key: 'quiz',
        _id: ObjectId(quizId),
    };
    
    const quiz = await db.findField(collectionName, keys);
    if (!quiz) {
        throw new Error('No quiz was found with the supplied id');
    }

    quizBasicFields.forEach(el => {
        if (quiz[el]) {
            payload[el] = quiz[el]
        }
    });

    payload.parent = 'quiz:' + quiz._id;
    payload.createdAt = currentTime;
    payload.createdBy = 'user:' + uid;
    payload.updatedAt = currentTime;
    payload.updatedBy = 'user:' + uid;

    return await db.setField(collectionName, payload);
}

socialQuiz.attach = async (req) => {
    const uid = parseInt(req.uid);
    const {quizId} = req.params;
    let {attachedTo=[]} = req.body;

    if (!ObjectId.isValid(quizId)) {
        throw new Error('Invalid quiz id supplied');
    }

    if (!Array.isArray(attachedTo)) {
        throw new Error(`'attachedTo' must be an array, found ${typeof attachedTo} instead`);
    }

    if (!attachedTo.length) {
        throw new Error(`Nothing to update as 'attachedTo' is empty`);
    }

    const keys = {
        _key: 'quiz',
        _id: ObjectId(quizId),
    };
    
    const quiz = await db.findField(collectionName, keys);
    if (!quiz) {
        throw new Error('No quiz was found with the supplied id');
    }

    attachedTo = attachedTo.map(each => String(each).trim());

    const acknowledgement = await db.updateField(collectionName, keys, { $addToSet: {attachedTo: {$each: attachedTo}} });
    return {
        attached: acknowledgement.result.n === 1
    }
}

socialQuiz.answer = async (req) => {
    const uid = parseInt(req.uid);
    const {quizId, questionId} = req.params;
    const {answer, timeTaken, attachmentId} = req.body;
    const timestamp = utils.getISOTimestamp();

    if (!ObjectId.isValid(quizId)) {
        throw new Error('Invalid quiz id supplied');
    }

    if (!ObjectId.isValid(attachmentId)) {
        throw new Error('Invalid attachment id supplied');
    }

    const keys = {
        _key: 'quiz',
        _id: ObjectId(quizId),
    };
    
    const quiz = await db.findField(collectionName, keys);
    if (!quiz) {
        throw new Error('No quiz was found with the supplied id');
    }

    const responseSearch = {
        _key: `quiz:${quizId}:answer:${attachmentId}`,
        uid,
    };
    var _response = await db.findField(collectionName, responseSearch);
    var isResponseExists = true;
    if (!_response) {
        isResponseExists = false;
        _response = {
            ...responseSearch,
            questions: [],
            createdAt: timestamp,
            createdBy: 'user:' + uid,
        };
    }

    const responseFoundIndex = (_response.questions || []).findIndex(elem => elem.questionId == questionId.trim());
    const questionFoundIndex = (quiz.questions || []).findIndex(elem => elem.id == questionId.trim());
    if (questionFoundIndex === -1) {
        throw new Error('Invalid question id, question is not a part of this quiz');
    }
    if (responseFoundIndex > -1) {
        _response.questions.splice(responseFoundIndex, 1);
    }

    if (Number(timeTaken) > Number(quiz.questions[questionFoundIndex]['duration'])) {
        // throw new Error('Time taken to answer is greater than the question\'s duration');
    }

    const response = {
        questionId: questionId.trim(),
        question: quiz.questions[questionFoundIndex]['question'],
        duration: quiz.questions[questionFoundIndex]['duration'],
        answer,
        answerId: utils.generateUUID(),
        timeTaken,
        createdAt: timestamp
    };

    _response.questions.push(response);
    _response.questions = await assignUserForMarking(attachmentId, uid, _response);
    
    await db.updateField(collectionName, responseSearch, {$set: isResponseExists ? {questions: _response.questions} : _response}, {upsert: true});

    return {
        data: {
            answer: _response,
            quiz: quiz,
        }
    }
}

async function assignUserForMarking (tid, uid, response) {
    if (isNaN(tid)) {
        throw new Error(`'tid' must be a number, found ${typeof tid} instead`);
    }

    if (isNaN(uid)) {
        throw new Error(`'uid' must be a number, found ${typeof uid} instead`);
    }

    if (typeof response != 'object') {
        throw new Error(`'uid' must be an object, found ${typeof response} instead`);
    }

    if (!response.hasOwnProperty('questions')) {
        throw new Error(`Property 'questions' missing from the response object`);
    }

    uid = Number(uid);
    tid = Number(tid);

    const attendance = await db.findFields(db.collections.DEFAULT, {type: 'attendance', tid});
    const UIDsForAllocation = attendance.filter(el => el && el.uid);
    var {questions} = response;

    if (UIDsForAllocation && UIDsForAllocation.length) {
        const assignedUids = questions.map(({ assignedForMarking }) => Number(assignedForMarking)).filter(Boolean);
        const availableUids = UIDsForAllocation.map(uid => Number(uid.trim())).filter(uid => !assignedUids.includes(uid));
        
        questions = questions.map(question => {
            if (!Number(question.assignedForMarking) && availableUids.length) {
                const shuffledUids = _.shuffle(availableUids);
                question.assignedForMarking = Number(shuffledUids.shift());
            }
            return question;
        });
    }

    return questions;
}

socialQuiz.getResponses = async (req) => {
    const {quizId,uid} = req.params;
    let { populate = "" , context=""} = req.query;
    populate = (populate || "").split(',').map(el => el.trim()).filter(el => el.length);

    if (!ObjectId.isValid(quizId)) {
        throw new Error('Invalid quiz id supplied');
    }
    
    const keys = {
        _key: {$regex: new RegExp(`^quiz:${quizId}:answer:(.*)$`), $options: 'i'},
        deleted: {$ne: true}
    };

    if(uid) keys.uid = parseInt(uid);



    const order = {_id: -1}

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    let [responses=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    if (context == 'marking') {
        responses = responses.map((response) => {
            response.questions = response.questions.filter((question) => Number(question.assignedForMarking) == Number(req.uid));
            if (!response.questions.length) return null;
            return response;
        }).filter(Boolean);
    }

    const populated = await attributes.populate(responses, populate);

    return utils.paginate(`/socialquiz${req.url}`, populated, count, limit, page);
}

socialQuiz.startQuiz = async (req) => {
    const uid = parseInt(req.uid);
    const {quizId} = req.params;
    const {attachmentId} = req.body;
    const timestamp = utils.getISOTimestamp();
    const keys = {
        _key: 'quiz',
        _id: ObjectId(quizId),
    };

    if (!ObjectId.isValid(quizId)) {
        throw new Error('Invalid quiz id supplied');
    }

    if (!ObjectId.isValid(attachmentId)) {
        throw new Error('Invalid attachment id supplied');
    }
    
    const quiz = await db.findField(collectionName, keys);
    if (!quiz) {
        throw new Error('No quiz was found with the supplied id');
    }

    if (quiz.uid != uid) {
        throw new Error('You are not authorized to perform this operation');
    }

    if (quiz.deleted) {
        throw new Error('Cannot start quiz as it is already deleted');
    }

    if (new Date(quiz.expiresAt) < new Date()) {
        throw new Error('Quiz cannot be started as it is already expired');
    }

    if (!quiz.attachedTo.includes(attachmentId)) {
        throw new Error('Quiz is not attached with the supplied attachment id');
    }

    const payload = {};

    payload.startedAt = timestamp;
    payload.startedBy = 'user:' + uid;

    const acknowledgement = await db.updateField(collectionName, keys, {$set: payload});
    return {
        started: acknowledgement.result.n === 1
    };
}

socialQuiz.updateQuestionState = async (req) => {
    const uid = parseInt(req.uid);
    const {quizId, questionId} = req.params;
    const {status} = req.body;

    if (!ObjectId.isValid(quizId)) {
        throw new Error('Invalid quiz id supplied');
    }

    const keys = {
        _key: 'quiz',
        _id: ObjectId(quizId),
    };
    
    const quiz = await db.findField(collectionName, keys);
    if (!quiz) {
        throw new Error('No quiz was found with the supplied id');
    }

    // if (quiz.uid != uid) {
    //     throw new Error('You are not authorized to perform this operation');
    // }

    const payload = {};
    let {questions} = quiz;

    const questionIndex = (questions || []).findIndex(elem => elem.id == questionId.trim());

    if (questionIndex === -1) {
        throw new Error('No question was found with the supplied question id');
    }

    ['startedAt', 'completedAt'].forEach(elem => {
        if (req.body[elem]) {
            payload[elem] = new Date(req.body[elem]).toISOString();
        }
    });

    if (status) {
        payload.status = status;
    }

    questions[questionIndex] = _.merge(questions[questionIndex], payload);
    
    const acknowledgement = await db.updateField(collectionName, keys, {$set: {questions}});
    return {
        updated: acknowledgement.result.n === 1
    };
}

socialQuiz.markAnswer = async (req) => {
    const uid = parseInt(req.uid);
    const {quizId, questionId} = req.params;
    const {mark,answerId} = req.body;
    const timestamp = utils.getISOTimestamp();

    if (typeof mark != 'object') {
        throw new Error(`mark must be an object, found ${typeof mark} instead`);
    }

    if (!mark.hasOwnProperty('by')) {
        throw new Error(`Missing property 'by' from 'mark'`);
    }

    if (!mark.hasOwnProperty('value')) {
        throw new Error(`Missing property 'value' from 'mark'`);
    }

    if(!answerId){
        throw new Error(`Missing property 'answerId'`);
    }

    if (!ObjectId.isValid(quizId)) {
        throw new Error('Invalid quiz id supplied');
    }

    const keys = {
        _key: 'quiz',
        _id: ObjectId(quizId),
    };
    
    const quiz = await db.findField(collectionName, keys);
    if (!quiz) {
        throw new Error('No quiz was found with the supplied id');
    }

    const responseSearch = {
        _key: new RegExp(`quiz:${quizId}:answer:*`),
    };
    
    var _response = await db.findField(collectionName, responseSearch);
    if (!_response) {
        throw new Error('No answer was found for question id: ' + questionId);
    }

    const responseFoundIndex = (_response.questions || []).findIndex(elem => elem.answerId == answerId.trim());
    const questionFoundIndex = (quiz.questions || []).findIndex(elem => elem.id == questionId.trim());
    
    if (questionFoundIndex === -1) {
        throw new Error('Invalid question id, question is not a part of this quiz');
    }

    if (responseFoundIndex > -1) {
        let {questions} = _response;
        let {by, value} = mark;

        if (!questions[responseFoundIndex].hasOwnProperty('mark')) {
            questions[responseFoundIndex]['mark'] = {};
        }

        questions[responseFoundIndex]['mark'] = {uid, by, value, createdAt: timestamp};
        _response.questions = questions;
        
        await db.updateField(collectionName, responseSearch, {$set: {questions}});
    }


    return {
        data: {
            answer: _response,
            quiz: quiz,
        }
    }
}