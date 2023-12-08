'use strict';

const winston = require('winston');
const db = require('../../../database');
const user = require('../../../user');
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');

const dashboard = module.exports;

dashboard.get = async function (req, res, next) {
	var dashboard = {};
	dashboard.title = 'Quiz User Dashboard';
    let uid = parseInt(req.uid);
	const submissionCollection = db.collections.SOCIAL_QUIZ.SUBMISSION;

    dashboard.quiz = await db.findFields(submissionCollection,{type:'instance'});
    
    if(!dashboard.quiz || (dashboard.quiz && !Object.keys(dashboard.quiz).length)){
        throw new Error("No quizzes avaiable")
    }


	res.render('socialquiz/user/dashboard', dashboard);
};
