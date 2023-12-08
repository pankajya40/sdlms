'use strict';

const db = require('../../../database');
const ObjectId = require("mongodb").ObjectId;

const control = module.exports;

control.get = async function (req, res, next) {
	var control = {};
    let { id } = req.params;
    let uid = parseInt(req.uid);
    if (!id) throw new Error("No project ID was supplied!");
    const submissionCollection = db.collections.SOCIAL_QUIZ.SUBMISSION;

    let data = await db.findField(submissionCollection, { _id: ObjectId(id), uid: uid });
    control.quizdetail = data
    control.title = 'Control Quiz'; //Control-{Quiz Name}
    res.render('socialquiz/creator/control', control);
};
