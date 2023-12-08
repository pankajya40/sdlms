'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/pdgms';
const routes = {
	ESCALATION: ENDPOINT + '/escalation',
	PROJECT_MANAGER: ENDPOINT + '/projectmanager',
	ATTENDANCE: ENDPOINT + '/attendance',
}

module.exports = function (app, middleware, controllers) {
	var middlewares = [middleware.exposeUid, middleware.canViewUsers];
	var accountMiddlewares = [
		middleware.exposeUid,
		middleware.canViewUsers,
		middleware.checkAccountPermissions,
	];
	var extendedMiddlewares = [...middlewares, middleware.requireLogin];

	setupPageRoute(
		app,
		`${routes.ESCALATION}`,
		middleware,
		extendedMiddlewares,
		controllers.PDGMS.escalation.dashboard.get
	);
	setupPageRoute(
		app,
		`${routes.ESCALATION}/journals`,
		middleware,
		extendedMiddlewares,
		controllers.PDGMS.escalation.journals.get
	);
	setupPageRoute(
		app,
		`${routes.ESCALATION}/journals/:journalId`,
		middleware,
		extendedMiddlewares,
		controllers.PDGMS.escalation.journals.single
	);
	// setupPageRoute(
	// 	app,
	// 	`${routes.ESCALATION}/employee/learning_agenda`,
	// 	middleware,
	// 	extendedMiddlewares,
	// 	controllers.PDGMS.escalation.employee.learning_agenda.get
	// );
	// setupPageRoute(
	// 	app,
	// 	`${routes.ESCALATION}/employee/feedback`,
	// 	middleware,
	// 	extendedMiddlewares,
	// 	controllers.PDGMS.escalation.employee.feedback.get
	// );
	// setupPageRoute(
	// 	app,
	// 	`${routes.ESCALATION}/employee/journal`,
	// 	middleware,
	// 	extendedMiddlewares,
	// 	controllers.PDGMS.escalation.employee.journal.get
	// );
	// setupPageRoute(
	// 	app,
	// 	`${routes.ESCALATION}/supervisor/dashboard`,
	// 	middleware,
	// 	extendedMiddlewares,
	// 	controllers.PDGMS.escalation.supervisor.dashboard.get
	// );
	// setupPageRoute(
	// 	app,
	// 	`${routes.ESCALATION}/supervisor/feedback`,
	// 	middleware,
	// 	extendedMiddlewares,
	// 	controllers.PDGMS.escalation.supervisor.feedback.get
	// );
	// setupPageRoute(
	// 	app,
	// 	`${routes.ESCALATION}/supervisor/journal`,
	// 	middleware,
	// 	extendedMiddlewares,
	// 	controllers.PDGMS.escalation.supervisor.journal.get
	// );

	setupPageRoute(
		app,
		`${routes.ATTENDANCE}/dashboard`,
		middleware,
		extendedMiddlewares,
		controllers.PDGMS.leavesTracker.getDashboard
	);

	setupPageRoute(
		app,
		`${routes.ATTENDANCE}/leaves`,
		middleware,
		extendedMiddlewares,
		controllers.PDGMS.leavesTracker.getLeaves
	);

	setupPageRoute(
		app,
		`${routes.ATTENDANCE}/approveleaves`,
		middleware,
		extendedMiddlewares,
		controllers.PDGMS.leavesTracker.approve
	);

	setupPageRoute(
		app,
		`${routes.ATTENDANCE}/holidays`,
		middleware,
		extendedMiddlewares,
		controllers.PDGMS.leavesTracker.getHolidays
	);

	setupPageRoute(
		app,
		`${routes.ATTENDANCE}/statistics`,
		middleware,
		extendedMiddlewares,
		controllers.PDGMS.leavesTracker.getStatistics
	);

	setupPageRoute(
		app,
		`${routes.PROJECT_MANAGER}`,
		middleware,
		middlewares,
		controllers.PDGMS.projectManager.home.get
	);

	setupPageRoute(
		app,
		`${routes.PROJECT_MANAGER}/trackers/effort`,
		middleware,
		middlewares,
		controllers.PDGMS.projectManager.effortTracker.get
	);

	setupPageRoute(
		app,
		`${routes.PROJECT_MANAGER}/trackers/result`,
		middleware,
		middlewares,
		controllers.PDGMS.projectManager.resultTracker.get
	);

	setupPageRoute(
		app,
		`${routes.PROJECT_MANAGER}/trackers/value`,
		middleware,
		middlewares,
		controllers.PDGMS.projectManager.valueTracker.get
	);

	setupPageRoute(
		app,
		`${routes.PROJECT_MANAGER}/dashboard`,
		middleware,
		middlewares,
		controllers.PDGMS.projectManager.projectDashboard.get
	);

	setupPageRoute(
		app,
		'/pdgms/projectmanager/dashboard/employee',
		middleware,
		middlewares,
		controllers.PDGMS.projectManager.employee.get
	);

	setupPageRoute(
		app,
		'/pdgms/projectmanager/dashboard/leader',
		middleware,
		middlewares,
		controllers.PDGMS.projectManager.leader.get
	);

	setupPageRoute(
		app,
		'/pdgms/projectmanager/trackers/effort/teamview',
		middleware,
		middlewares,
		controllers.PDGMS.projectManager.teamEffortTracker.get
	);

	setupPageRoute(
		app,
		'/pdgms/projectmanager/trackers/result/teamview',
		middleware,
		middlewares,
		controllers.PDGMS.projectManager.teamResultTracker.get
	);

	setupPageRoute(
		app,
		'/pdgms/projectmanager/trackers/value/teamview',
		middleware,
		middlewares,
		controllers.PDGMS.projectManager.teamValueTracker.get
	);
}