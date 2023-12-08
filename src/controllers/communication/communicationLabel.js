'use strict';

const winston = require('winston');
const db = require('../../database');
const user = require('../../user');
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');
const getBatches = require('../../api/sdlms.api');
const communication = require('../../api/communication.api')
const {sidebar} = require('./sidebar')
const utils = require('../utils');

const labelController = module.exports;

labelController.get = async function (req, res, next) {

	var communicationLabel = {};
	communicationLabel.title = 'communication Label';
	req.query = { limit: '100' };
	
	[communicationLabel.batches, communicationLabel.cohort, communicationLabel.session] = await Promise.all([
		getBatches.getBatches(req),
		communication.listCohort(),
		communication.listSession(),
	]);

	communicationLabel.sidebar = utils.sidebar(sidebar, 'communicationlabel',{
        classes: 'active'
    });

	res.render('sdlms/communication/communicationLabel', communicationLabel);
};
