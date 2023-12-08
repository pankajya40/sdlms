"use strict";
const api = require("../../api");
const helpers = require("../helpers");

const  commController = module.exports;

commController.get = async function (req, res, next) {
    var comm = {};
    comm.title = 'Community Page';
    res.render('communitybuilder/comm', comm);
};




