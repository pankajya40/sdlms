"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const userListController = module.exports;

userListController.get = async function (req, res, next) {
    const userList = {};

    userList.title = 'User list';

    res.render('sdlms/employee_dashboard/user_list', userList);
}