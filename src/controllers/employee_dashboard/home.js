"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const homeController = module.exports;

homeController.get = async function (req, res, next) {
    const Homepage = {};

    Homepage.title = 'User list';

    res.render('sdlms/employee_dashboard/index', Homepage);
}