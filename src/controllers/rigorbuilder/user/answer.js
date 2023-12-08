"use strict";
const db = require("../../../database");

const answerController = module.exports;
const collectionName = db.collections.RIGORBUILDER.TEMPLATE;

answerController.get = async function (req, res, next) {
    let pid = req.params.pid;
    let uid = req.uid;
    var answer = {};

    answer.title = 'Answer Page';
    answer.rigor = await db.findField(collectionName, { pid: parseInt(pid), uid: uid });

    if (!answer.rigor) {
        throw new Error("Invalid pid! No Rigor was found with pid: " + pid);
    }

    // tpf file where we rendered
    res.render('rigorbuilder/user/answer', answer);
};

