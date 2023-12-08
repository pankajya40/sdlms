"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');
const {sidebar, protectedMenus} = require('./sidebar');
const utils = require('../utils');


const csvController = module.exports;
const channels = [
    {
        value: 'whatsapp',
        name: 'WhatsApp'
    },
    {
        value: 'email',
        name: 'E-Mail'
    },
    {
        value: 'sms',
        name: 'SMS'
    },
]

csvController.get = async function (req, res, next) {

    var csv = {};
    csv.title = 'Mass communication via CSV';
    csv.channels = channels;

    csv.sidebar = utils.sidebar(sidebar, 'csv',{
        classes: 'active'
    });

    res.render('sdlms/communication/csv', csv);
}; 
