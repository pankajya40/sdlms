'use strict';

const winston = require('winston');
const db = require('../../../database');
const user = require('../../../user');
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');

const view = module.exports;

view.get = async function (req, res, next) {
	var view = {};

    view.title = 'Quiz Report'; //{Quiz Name}-Report
    res.render('socialquiz/user/view', view);
};