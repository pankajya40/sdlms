'use strict';

const communication = require('../../api/communication.api');
const {sidebar, protectedMenus} = require('./sidebar');
const utils = require('../utils');


const reportController = module.exports;

reportController.get = async function (req, res) {
	const cmreport = {};
	cmreport.title = 'View Report';
	[cmreport.reports] = await Promise.all([
		communication.getReports(req),
	]);

	cmreport.sidebar = utils.sidebar(sidebar, 'report',{
        classes: 'active'
    });
	res.render('sdlms/communication/cmreport', cmreport);
};

// reportController.report = async function (req, res) {
//     const pageData = {}

//     pageData.title = 'Report';
//         pageData.sidebar = utils.sidebar(sidebar, 'report',{
//         classes: 'active'
//     });

//     pageData.sidebar = sidebar; 

//     res.render('communication/report', pageData);
// }

