"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const userside = module.exports;

userside.get = async function (req, res, next) {
    var userside = {};

    userside.title = 'User Side';
    res.render('socialquiz/userside', userside);
};