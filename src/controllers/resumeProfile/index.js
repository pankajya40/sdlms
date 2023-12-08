"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const userprofile = module.exports;

userprofile.get = async function (req, res, next) {
    if (req.params.uid && isNaN(req.params.uid)) return res.status(404).send();
    const uid = parseInt(req.params.uid || req.uid);

    let userprofile = {};

    userprofile.title = 'user profile';
    res.render('resumeProfile/profile', userprofile);
};