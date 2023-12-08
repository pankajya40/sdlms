"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');
const async = require('async');
const moment = require('moment');

const leaderboardController = module.exports;

leaderboardController.get = async function (req, res, next) {
	var leaderboard = {};
    leaderboard.title = "leaderboard"
    res.render('dtthon/applicant/leaderboard' , leaderboard)
};