'use strict';

const winston = require('winston');
const db = require('../../../database');
const user = require('../../../user');
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');
const {ObjectId} = require('mongodb')
const solve = module.exports;

solve.get = async function (req, res, next) {
	var solve = {};
   // let { pid } = req.params;
    let uid = parseInt(req.uid);
   // if (!pid) throw new Error("No project pid was supplied!");
    //const templateCollection = db.collections.SOCIAL_QUIZ.TEMPLATE;
    let {sessionid } = req.params
    if(!sessionid) throw new Error("No session id was supplied");
    const collection = db.collections.SOCIAL_QUIZ.SUBMISSION;
    let data = await db.findFields(collection,{type:"instance",_id: ObjectId(sessionid)})
   // let data = await db.findField(templateCollection,{pid: parseInt(pid),uid:uid});
    solve.title = 'Solve Quiz'; //Mark-{Quiz Name}
    solve.formdata = data
    res.render('socialquiz/user/solve', solve);
};
