"use strict";

//const winston = require("winston");
//const db = require("../database");
// const user = require("../user");

//const helpers = require('../controllers/helpers');
//const groups = require('../groups');
//const privileges = require('../privileges');

const rigorMobileController = module.exports;
rigorMobileController.get = async function (req, res, next) {
var rigorMobile = {};
rigorMobile.title = 'rigor Mobile';
res.render('sdlms/rigormobile' , rigorMobile);
	

};