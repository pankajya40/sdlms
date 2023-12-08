"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const createquiz = module.exports;

createquiz.get = async function (req, res, next) {
    var createquiz = {};

    createquiz.title = 'Create Quiz';
    res.render('socialquiz/createquiz', createquiz);
};