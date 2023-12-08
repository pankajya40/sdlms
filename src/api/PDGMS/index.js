"use strict";

const PDGMS = module.exports;

PDGMS.leaves = require('./leavesTracker/leaves.api')
PDGMS.trainingROI = require('./trainingROI/trainingROI.api')
PDGMS.escalationEngine = require('./escalationEngine/journals.api')
PDGMS.tags = require('./tags');
PDGMS.tasks = require('./tasks');
PDGMS.projects = require('./projects');
PDGMS.organization = require('./organization');
