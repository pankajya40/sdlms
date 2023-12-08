"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');

const reflection = module.exports;

reflection.get = async function (req, res, next) {

    reflection.title = 'DTthon Reflection Creator';
    reflection.tid = req.params.tid;

    res.render('dtthon/creator/reflection', reflection);
};