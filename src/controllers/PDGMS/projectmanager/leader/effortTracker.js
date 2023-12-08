"use strict";

const teamEffortTracker = module.exports;

teamEffortTracker.get = async function (req, res) {
    const home = {};

    home.title = "Effort tracker";
    home.isEffortTab = true

    res.render('pdgms/projectManager/leader/effort_tracker', home)
}