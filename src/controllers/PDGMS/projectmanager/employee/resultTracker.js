"use strict";

const resultTracker = module.exports;

resultTracker.get = async function (req, res) {
    const home = {};

    home.title = "Result Tracker";
    home.isResultTab = true

    res.render('pdgms/projectManager/employee/result_tracker', home)
}