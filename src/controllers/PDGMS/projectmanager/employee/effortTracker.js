"use strict";

const effortTracker = module.exports;

effortTracker.get = async function (req, res) {
    const home = {};

    home.title = "Effort tracker";
    home.isEffortTab = true

    res.render('pdgms/projectManager/employee/effort_tracker', home)
}