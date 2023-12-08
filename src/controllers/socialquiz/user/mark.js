'use strict';

const winston = require('winston');
const db = require('../../../database');
const user = require('../../../user');
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');
const {ObjectId} = require('mongodb')
const mark = module.exports;

mark.get = async function (req, res, next) {
	var mark = {};
    mark.sessionid = req.params.id;
    mark.title = 'Mark Quiz'; //Solve-{Quiz Name}
    const collection = db.collections.SOCIAL_QUIZ.SUBMISSION;
    let uid = parseInt(req.uid)
    let data = await db.findFields(collection,{type:"instance",_id: ObjectId(mark.sessionid)});
    mark.data = data;
    mark.userUid = uid;
    // mark.myAnswerer = data[0].evaluators.data.map(e=>uid==e.evaluator?e.answerer:null);
    mark.myAnswerer = data[0].evaluators.data.filter(function(e){return (e.evaluator==uid);});
    mark.answers = data[0].submissions.filter(function(e){return(e.uid==mark.myAnswerer[0].answerer)});
    res.render('socialquiz/user/mark', mark);
};
