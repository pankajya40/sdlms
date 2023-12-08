'use strict';

const adminAPIs = module.exports;

adminAPIs.organization = require('./organizations.api');
adminAPIs.department = require('./department.api');
adminAPIs.team = require('./team.api');
adminAPIs.role = require('./role.api');