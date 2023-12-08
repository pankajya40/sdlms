"use strict";

const leader = module.exports;

leader.get = async function (req, res) {
    const home = {};

    home.title = "Leader View";
    home.isDashboardTab = true

    res.render('pdgms/projectManager/leader/index', home)
}