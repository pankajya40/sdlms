'use strict';

const communication = require('../../api/communication.api');
const {sidebar, protectedMenus} = require('./sidebar');
const utils = require('../utils');


const dashboardController = module.exports;

dashboardController.get = async function (req, res) {
	var dashboard = {};
	[dashboard.entries] = await Promise.all([
		communication.getRequest(req),
	]);
	dashboard.title = "Dashboard";

	dashboard.sidebar = utils.sidebar(sidebar, 'dashboard',{
		        classes: 'active'
	});

	res.render('sdlms/communication/cmdashboard', dashboard);	
};

// dashboardController.dashboard = async function (req, res) {
//     const pageData = {}

//     pageData.title = 'dashboard';
//         pageData.sidebar = utils.sidebar(sidebar, 'dashboard',{
//         classes: 'active'
//     });

//     pageData.sidebar = sidebar; 

//     res.render('communication/dashboard', pageData);
// }




