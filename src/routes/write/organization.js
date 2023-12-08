'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan
 * @date 07-09-2022
 * @description This file handles all the routes that are required for the PDGMS to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();
	const fileUploadMiddleware = [middleware.maintenanceMode, multipartMiddleware];

    setupApiRoute(router, 'get', '/', [middleware.authenticateOrGuest], controllers.write.PDGMS.organization.getOrganization);
    setupApiRoute(router, 'post', '/', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['name', 'sector'])], controllers.write.PDGMS.organization.createOrganization);
    setupApiRoute(router, 'put', '/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.organization.updateOrganization);
    setupApiRoute(router, 'delete', '/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.organization.deleteOrganization);


	setupApiRoute(router, 'get', '/department', [middleware.authenticateOrGuest], controllers.write.PDGMS.organization.departments.getDepartments);
    setupApiRoute(router, 'post', '/department', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.organization.departments.createDepartments);
    setupApiRoute(router, 'put', '/department/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.organization.departments.updateDepartments);
    setupApiRoute(router, 'delete', '/department/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.PDGMS.organization.departments.deleteDepartments);


	setupApiRoute(router, 'get', '/members', [middleware.authenticateOrGuest], controllers.write.PDGMS.organization.members.getMembers);
	setupApiRoute(router, 'put', '/members/:action', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['uids', 'departmentId', 'organizationId'])], controllers.write.PDGMS.organization.members.addOrRemoveMembers);

	return router;
};
