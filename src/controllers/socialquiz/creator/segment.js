'use strict';

const winston = require('winston');
const db = require('../../../database');
const user = require('../../../user');
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');

const segment = module.exports;

segment.get = async function (req, res, next) {
	var segment = {};

	segment.title = 'Create Segment';
	res.render('socialquiz/creator/segment', segment);
};
