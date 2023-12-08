"use strict";

const db = require('../../../database');

const noticeBoard = module.exports;

noticeBoard.get = async function (req, res, next) {
    var noticeBoard = {};
    let { tid } = req.params;
    let uid = parseInt(req.uid);

    noticeBoard.title = 'DTthon Notice Board';
    noticeBoard.tasks = [];

    let [project] = await Promise.all([
        db.findField(db.collections.DEFAULT, {tid: parseInt(tid), type: 'project'}),
    ]);

    if (!project) {
        throw new Error('No project was found with the given tid: ' + tid);
    }
    if (project.uid != uid) {
        throw new Error('Unauthorized! Only the creator of the project has access to noticeboard.');
    }

    noticeBoard.tid = project.tid;

    let { tasks } = project;
    if (tasks && tasks.length) {
        const taskData = tasks.map((element, index) => {
            let { task_id, task_title, task_number = index + 1 } = element;
            return {task_id, task_title, task_number};
        });

        noticeBoard.tasks = taskData;
    }

    res.render('dtthon/creator/noticeBoard', noticeBoard);
};