"use strict";

const db = require('../../database');
const User = require('../../user');
const utilities =  require('../../controllers/utils');
const { ObjectId } = require('mongodb');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const {paths} = require('../../constants');

const commAPI = module.exports;

const collectionName = db.collections.GLOBAL.COMMUNITYBUILDER;

commAPI.createQuestion = async (req) => {
    // get uid
    const uid = parseInt(req.uid);

    // QUESTION
    const question = req.body.question;

    const payload = {
        uid,
        question,
        type: 'question',
    }
    const result = await db.setField(collectionName, payload);

    if (result) {
        return {
            status: "success",
            message: "Question successfully Created",
            data: payload,
        };
    }

}

commAPI.getQuestion = async (req) => {

    let keys = {type : "question"}

    let questionId = req.query.id;
    if(questionId){
        keys._id = ObjectId(questionId);
        let result = await db.findField(collectionName,keys)
        return result
    }

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;

    const question = await db.getFieldsWithPagination(collectionName, keys, limit, page);
    const count = question.length;

	const results = [];
	for (let i = 0; i < question.length; i++) {
		let ans = await db.findField(collectionName, { questionId : ObjectId(question[i]._id) } )
        results.push({ "Question":question[i].question, "Answer": ans == null? null : ans.answer })

	}

    return utilities.paginate(`/communitybuilder/${req.url}`, results, count, limit, page);

}

commAPI.createAnswer = async (req) => {
    const data = req.body

    const uid = parseInt(req.uid);
    const questionId = ObjectId(data.id);

    const answer = data.answer;

    let payload = {
        uid,
        questionId,
        answer,
        type : 'answer'
    }

    let result = await db.setField(collectionName, payload)
    if(result){
        return{
            status:"success",
            message:"Answer successfully Created",
            data: payload,
        }
    }


}

// commAPI.getAnswer = async (req) => {
//     if(!req.param.qid){
//         throw new Error('qid not provided')
//     }
//     let qid = parseInt(req.param.qid);

//     let keys = {
//         type:'answer',
//         qid
//     }


//     const page = parseInt(req.query.page) || 0;
//     const limit = parseInt(req.query.limit) || 5;

//     const answer = await db.getFieldsWithPagination(collectionName, keys, limit, page);
//     const count = answer.length;


//     return utilities.paginate(`/communitybuilder/${req.url}`, answer, count, limit, page);



// }





