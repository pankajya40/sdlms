'use strict';

const scorecard = module.exports;

scorecard.applicant_view = require("./view");

scorecard.creator_create = require("./create");
scorecard.creator_dashboard = require("./dashboard");
scorecard.creator_mdashboard = require("./microDashboard");

scorecard.evaluator_score = require("./evaluate");
scorecard.happiness = require("./happiness");