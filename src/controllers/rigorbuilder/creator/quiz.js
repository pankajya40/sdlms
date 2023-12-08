"use strict";
const db = require("../../../database");

const quizController = module.exports;
const collectionName = db.collections.RIGORBUILDER.TEMPLATE;

quizController.get = async function (req, res, next) {
    let { pid } = req.params;
    let uid = req.uid;
    var quiz = {};

    quiz.title = 'Quiz Page';
    quiz.rigor = await db.findField(collectionName, { pid: parseInt(pid), uid: uid });

    if (!quiz.rigor) {
        throw new Error("Invalid pid! No Rigor was found with pid: " + pid);
    }

    // tpf file where we rendered
    res.render('rigorbuilder/creator/quiz', quiz);
};