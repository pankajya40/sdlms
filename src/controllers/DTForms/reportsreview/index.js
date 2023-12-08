"use strict";

const winston = require("winston");
const db = require("../../../database");
const user = require("../../../user");
const helpers = require('../../helpers');
const groups = require('../../../groups');
const privileges = require('../../../privileges');
const {sidebar, protectedMenus} = require('../sidebar');
const utils = require('../../utils');
// const data= require('./data.json')

const explore = module.exports;
explore.get = async function (req, res, next) {
    var explore = {};
    // explore.data=data;
    explore.title = 'DTForms';
        explore.sidebar = utils.sidebar(sidebar, 'explore',{
        classes: 'active'
    });
    res.render('dtforms/reportsreview/index', explore);
};