"use strict";

const projectManager = module.exports;

projectManager.effortTracker = require("./employee/effortTracker");
projectManager.home = require("./home");
projectManager.resultTracker = require("./employee/resultTracker");
projectManager.valueTracker = require("./employee/valueTracker");
projectManager.projectDashboard= require("./projectDashboard");
projectManager.employee= require("./employee/home");
projectManager.leader= require("./leader/home");
projectManager.teamResultTracker = require("./leader/resultTracker");
projectManager.teamValueTracker = require("./leader/valueTracker");
projectManager.teamEffortTracker = require("./leader/effortTracker");