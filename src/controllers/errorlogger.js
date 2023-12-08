'use strict';

const winston = require('winston');
const helpers = require('./helpers');
const adapters = require('../adapters');

const errorController = module.exports;

errorController.log = async function (req, res) {
	// winston.info(JSON.stringify(req.body))

	helpers.formatApiResponse(200, res, { message: 'Logs saved!' });
};
