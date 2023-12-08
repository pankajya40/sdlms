const _ = require("lodash");
const db = require("../../database");
const User = require("../../user");
const ObjectId = require("mongodb").ObjectId;
const utils = require("../../controllers/utils");
const attributes = require('../attributes');

const mcqApi = module.exports;

const collectionName = db.collections.SOCIAL_QUIZ_V2;
const mcqBasicFields = [
    "_key",
    "questions",
    "availableAt",
    "expiresAt",
    "title",
];

/**
 * 
 * @date 31-03-2023
 * @author imshawan <hello@imshawan.dev>
 * @function get
 * @description Gets a mcq by its id as passed in params or it can also fetch all the mcqs in a paginated format
 * @param {Object} req 
 * @returns {Object} A single object if searched by id and returns a paginated object if its fetching all the mcqs.
 */
mcqApi.get = async (req) => {
    const uid = parseInt(req.uid);
    const {mcqId} = req.params;

    let { populate = ""} = req.query;
    populate = (populate || "").split(',').map(el => el.trim()).filter(el => el.length);

    if (mcqId) {
        if (!ObjectId.isValid) {
            throw new Error('Invalid MCQ id');
        }

        return await db.findField(collectionName, {_id: ObjectId(mcqId), _key: 'mcq'});
    }

    const keys = {
        _key: 'mcq',
        deleted: {$ne: true}
    };

    const order = {_id: -1}

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    let [mcqs=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    mcqs = await Promise.all(mcqs.map(async mcq => {
        let keys = {
            _key: {$regex: new RegExp(`^mcq:${mcq._id}:answer:(.*)$`), $options: 'i'},
            deleted: {$ne: true}
        };

        let responseCount = await db.countDocuments(collectionName, keys);
        return {...mcq, responseCount};
    }));


    const populated = await attributes.populate(mcqs, populate);

    return utils.paginate(`/socialquiz${req.url}`, populated, count, limit, page);
}

mcqApi.create = async (req) => {
    const uid = parseInt(req.uid);
    const {description, title, availableAt, expiresAt, startedAt, endedAt} = req.body;
    const currentTime = utils.getISOTimestamp();
    const payload = {
        _key: 'mcq',
        uid,
        title,
    };

    let {questions} = req.body;
    let errors = 0;

    if (!Array.isArray(questions)) {
        throw new Error(`'questions' must be an array, found ${typeof questions} instead`);
    }
    console.log(questions);

    questions = questions.map(question => {
        if (!question.title || !question.options) {
            errors++;
        }

        const {options} = question;

        question.id = utils.generateUUID();
        question.options = options.map(option => {
            return {...option, id: utils.generateUUID()};
        });

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
    payload.createdAt = currentTime;
    payload.createdBy = 'user:' + uid;
    payload.updatedAt = currentTime;
    payload.updatedBy = 'user:' + uid;

    return await db.setField(collectionName, payload);
}

/**
 * 
 * @date 31-03-2023
 * @author imshawan <hello@imshawan.dev>
 * @function update
 * @description Handles the update operation of a mcq. As of now only the auhor of the mcq can modify it, but we need to once
 * confirm if that is the right way to deal with this. In short, we need to check for permissions. 
 * @param {Object} req 
 * @returns updated: true/false
 */

mcqApi.update = async (req) => {
    const uid = parseInt(req.uid);
    const {mcqId} = req.params;
    const {description, title, startedAt, endedAt} = req.body;
    const currentTime = utils.getISOTimestamp();

    if (!ObjectId.isValid(mcqId)) {
        throw new Error('Invalid mcq id supplied');
    }

    const keys = {
        _key: 'mcq',
        _id: ObjectId(mcqId),
    };
    
    const mcq = await db.findField(collectionName, keys);
    if (!mcq) {
        throw new Error('No mcq was found with the supplied id');
    }

    if (mcq.uid != uid) {
        throw new Error('You are not authorized to perform this operation');
    }

    if (mcq.deleted) {
        throw new Error('Cannot update a mcq that is already deleted');
    }

    const payload = {};
    let {questions} = req.body;
    let errors = 0, updated = false;

    if (questions) {
        if (!Array.isArray(questions)) {
            throw new Error(`'questions' must be an array, found ${typeof questions} instead`);
        }

        var oldQuestions = mcq.questions || [];
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
 * @date 31-03-2023
 * @author imshawan <hello@imshawan.dev>
 * @function delete
 * @description Handles the delete operation of a mcq. As of now only the auhor of the mcq can delete it, but we need to once
 * confirm if that is the case. 
 * 
 * @note This operation doesn't delete the mcq from the database but acts as a soft delete mechanism where a 'deleted' property
 * is attached with the document which marks it as ignored documents for the get operation for mcqs.
 * @param {Object} req 
 * @returns {Object} deleted: true/false
 */

mcqApi.delete = async (req) => {
    const uid = parseInt(req.uid);
    const {mcqId} = req.params;
    const currentTime = utils.getISOTimestamp();

    if (!ObjectId.isValid(mcqId)) {
        throw new Error('Invalid mcq id supplied');
    }

    const keys = {
        _key: 'mcq',
        _id: ObjectId(mcqId),
    };
    
    const mcq = await db.findField(collectionName, keys);
    if (!mcq) {
        throw new Error('No mcq was found with the supplied id');
    }

    if (mcq.uid != uid) {
        throw new Error('You are not authorized to perform this operation');
    }

    if (mcq.deleted) {
        throw new Error('Cannot delete a mcq that is already deleted');
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
 * @date 31-03-2023
 * @author imshawan <hello@imshawan.dev>
 * @function clone
 * @description Clones a mcq object as per the existing mcq id is supplied. 
 * (A duplicate mcq object is created with the reference of the old mcq and user who cloned it is assigned as the author)
 * @param {Object} req 
 * @returns 
 */
mcqApi.clone = async (req) => {
    const uid = parseInt(req.uid);
    const {mcqId} = req.params;
    const currentTime = utils.getISOTimestamp();

    if (!ObjectId.isValid(mcqId)) {
        throw new Error('Invalid mcq id supplied');
    }

    const payload = {};
    const keys = {
        _key: 'mcq',
        _id: ObjectId(mcqId),
    };
    
    const mcq = await db.findField(collectionName, keys);
    if (!mcq) {
        throw new Error('No mcq was found with the supplied id');
    }

    mcqBasicFields.forEach(el => {
        if (mcq[el]) {
            payload[el] = mcq[el];
        }
    });

    payload.parent = 'mcq:' + mcq._id;
    payload.createdAt = currentTime;
    payload.createdBy = 'user:' + uid;
    payload.updatedAt = currentTime;
    payload.updatedBy = 'user:' + uid;

    return await db.setField(collectionName, payload);
}

mcqApi._answer = async (req) => {
    const uid = parseInt(req.uid);
    const {mcqId, questionId} = req.params;
    const {timeTaken, optionId} = req.body;
    const timestamp = utils.getISOTimestamp();

    if (!ObjectId.isValid(mcqId)) {
        throw new Error('Invalid mcq id supplied');
    }

    const keys = {
        _key: 'mcq',
        _id: ObjectId(mcqId),
    };
    
    const mcq = await db.findField(collectionName, keys);
    if (!mcq) {
        throw new Error('No mcq was found with the supplied id');
    }

    const responseSearch = {
        _key: `mcq:${mcqId}:answer:${uid}`,
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
    const questionFoundIndex = (mcq.questions || []).findIndex(elem => elem.id == questionId.trim());
    if (questionFoundIndex === -1) {
        throw new Error('Invalid question id, question is not a part of this mcq');
    }
    if (responseFoundIndex > -1) {
        _response.questions.splice(responseFoundIndex, 1);
    }

    if (Number(timeTaken) > Number(mcq.questions[questionFoundIndex]['duration'])) {
        throw new Error('Time taken to answer is greater than the question\'s duration');
    }

    const mcqOptions = mcq.questions[questionFoundIndex]['options'] || [];
    const selectedOptionIndex = mcqOptions.findIndex(elem => elem.id == optionId.trim());
    if (selectedOptionIndex === -1) {
        throw new Error('No option was found with the supplied option id');
    }

    const options = mcqOptions.map((elem, ind) => {
        if (ind === selectedOptionIndex) {
            return {...elem, timeTaken, selected: true};
        } else {
            return {...elem, selected: false};
        }
    });

    const response = {
        questionId: questionId.trim(),
        question: mcq.questions[questionFoundIndex]['question'],
        duration: mcq.questions[questionFoundIndex]['duration'],
        options,
        createdAt: timestamp
    };

    _response.questions.push(response);

    await db.updateField(collectionName, responseSearch, {$set: isResponseExists ? {questions: _response.questions} : _response}, {upsert: true});

    return {
        data: {
            answer: _response,
            mcq: mcq,
        }
    }
}

mcqApi.getResponses = async (req) => {
    const {mcqId,uid} = req.params;
    let { populate = "" } = req.query;
    populate = (populate || "").split(',').map(el => el.trim()).filter(el => el.length);

    if (!ObjectId.isValid(mcqId)) {
        throw new Error('Invalid mcq id supplied');
    }
    
    const keys = {
        _key: {$regex: new RegExp(`^mcq:${mcqId}:answer:(.*)$`), $options: 'i'},
        deleted: {$ne: true}
    };

    if(uid) keys.uid = parseInt(uid);

    const order = {_id: -1}

    const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 5;

    const [responses=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

    const populated = await attributes.populate(responses, populate);

    return utils.paginate(`/socialquiz${req.url}`, populated, count, limit, page);
}

mcqApi.answer = async (req) => {
    const uid = parseInt(req.uid);
    const {mcqId} = req.params;
    const currentTime = utils.getISOTimestamp();
    const payload = {
        _key: `mcq:${mcqId}:answer:${uid}`,
        uid,
    };

    let isExists = await db.findField(collectionName, payload);
    if(isExists) throw new Error('You have already answered this mcq');

    let {questions,title} = req.body;
    let errors = 0;

    if (!Array.isArray(questions)) {
        throw new Error(`'questions' must be an array, found ${typeof questions} instead`);
    }

    questions = questions.map(question => {
        if (!question.title || !question.options) {
            errors++;
        }

        const {options} = question;

        question.id = utils.generateUUID();
        question.options = options.map(option => {
            return {...option, id: utils.generateUUID()};
        });

        return question;
    });

    if (errors) {
        throw new Error(`Improper structure of questions found at multiple position(s) (${errors})`);
    }


    payload.questions = questions;
    payload.createdAt = currentTime;
    payload.createdBy = 'user:' + uid;
    payload.updatedAt = currentTime;
    payload.updatedBy = 'user:' + uid;
    payload.title = title;

    return await db.setField(collectionName, payload);
}