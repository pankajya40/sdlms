"use strict";

const router = require("express").Router();
const middleware = require("../../middleware");
const controllers = require("../../controllers");
const routeHelpers = require("../helpers");
const sdlmsAdminSchema = require("../../schema/write/admin");

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @date 04-08-2022
 * @author imshawan
 * @description This file handles all the custom routes that are required for the SDLMS admin page to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	const multipart = require("connect-multiparty");
	const multipartMiddleware = multipart();
	const { typedFieldValidation } = middleware.typedValidation;
	const fileUploadMiddleware = [middleware.maintenanceMode, multipartMiddleware];

    setupApiRoute(router, 'get', '/organization', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.sdlmsAdmin.getOrganization);
    setupApiRoute(router, 'post', '/organization', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, fileUploadMiddleware, typedFieldValidation(sdlmsAdminSchema.organization.$Organization)], controllers.write.sdlmsAdmin.createOrganization);
    setupApiRoute(router, 'put', '/organization/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, fileUploadMiddleware, middleware.parseFormDataToJSON.bind(null, ['location', 'image', 'socialLinks', 'email', 'phoneNumber', 'leaders']), 
	typedFieldValidation(sdlmsAdminSchema.organization.$Organization), middleware.checkRequired.bind(null, ['name','sector', 'employeeRange', 'website', 'about'])], controllers.write.sdlmsAdmin.updateOrganization);

	setupApiRoute(router, 'put', '/organization/:id/memberships', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['users', 'action'])], controllers.write.sdlmsAdmin.manageMemberRoles);
	setupApiRoute(router, 'delete', '/organization/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.sdlmsAdmin.manageMemberRoles);

	setupApiRoute(router, 'get', '/organization/members/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.sdlmsAdmin.getOrganizationMembers);


	setupApiRoute(router, 'get', '/organization/department', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.sdlmsAdmin.getDepartments);
	setupApiRoute(router, 'post', '/organization/department', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['name', 'organizationId'])], controllers.write.sdlmsAdmin.createDepartment);
	setupApiRoute(router, 'put', '/organization/department/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.sdlmsAdmin.updateDepartment);
	setupApiRoute(router, 'delete', '/organization/department/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.sdlmsAdmin.deleteDepartment);


	setupApiRoute(router, 'get', '/organization/team', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.sdlmsAdmin.getTeams);
	setupApiRoute(router, 'post', '/organization/team', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['name', 'organizationId'])], controllers.write.sdlmsAdmin.createTeam);
	setupApiRoute(router, 'put', '/organization/team/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['organizationId', 'departmentId'])], controllers.write.sdlmsAdmin.updateTeam);
	setupApiRoute(router, 'delete', '/organization/team/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['organizationId', 'departmentId'])], controllers.write.sdlmsAdmin.deleteTeam);


	setupApiRoute(router, 'get', '/organization/role', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.sdlmsAdmin.getRoles);
	setupApiRoute(router, 'post', '/organization/role', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['name', 'organizationId'])], controllers.write.sdlmsAdmin.createRole);
	setupApiRoute(router, 'put', '/organization/role/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['organizationId'])], controllers.write.sdlmsAdmin.updateRole);
	setupApiRoute(router, 'delete', '/organization/role/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['organizationId'])], controllers.write.sdlmsAdmin.deleteRole);

    return router;
}
