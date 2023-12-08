"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');

const  adminController = module.exports;

adminController.get = async function (req, res, next) {
    var admin = {};
    admin.title = 'Admin Page';
    res.render('workshop/creator/admin', admin);
};