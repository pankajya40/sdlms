"use strict";

const projectManager = module.exports;

projectManager.get = async function (req, res) {
    const home = {};

    home.title = "Project Dashbaord";
    home.isDashboardTab = true

    res.render('pdgms/projectManager/dashboard_panel', home)
}