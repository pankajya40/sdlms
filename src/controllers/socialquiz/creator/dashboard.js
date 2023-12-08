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
    let uid = parseInt(req.uid);
    dashboard.title = 'Quiz Creator Dashboard';
    dashboard.uid = uid;
    
    res.render('socialquiz/creator/dashboard', dashboard);
};
