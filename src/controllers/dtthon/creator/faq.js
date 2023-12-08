"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');

const faq = module.exports;

faq.get = async function (req, res, next) {
    var faq = {};

    let { tid } = req.params;

    if (tid) {
        faq.project = await db.findField(db.collections.DEFAULT, {tid: parseInt(tid), type: 'project'});
        if (!faq.project) {
            throw new Error('Invalid TID! No project was found with the tid: ' + tid)
        } else {
            let {faqs=[]} = faq.project;
            faq.project.faqs = faqs.reverse();
        }
    }

    faq.title = 'DTthon FAQ Create';
    
    faq.tid = tid;
    // faq.project;
    res.render('dtthon/creator/faq', faq);
    
};