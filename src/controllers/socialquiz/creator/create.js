'use strict';

const winston = require('winston');
const db = require('../../../database');
const user = require('../../../user');
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');

const create = module.exports;

create.get = async function (req, res, next) {
    var create = {};
    let { pid } = req.params;
    let uid = parseInt(req.uid);
    if (!pid) throw new Error("No project pid was supplied!");
    const templateCollection = db.collections.SOCIAL_QUIZ.TEMPLATE;

    var create = {};

    create.quiz = await db.findField(templateCollection,{pid: parseInt(pid),uid:uid});
    
    if(!create.quiz || (create.quiz && !Object.keys(create.quiz).length)){
        throw new Error("Invalid PID no quiz found with pid : "+ pid)
    }
    
    create.title = 'Create Quiz';
    res.render('socialquiz/creator/create', create);
};
