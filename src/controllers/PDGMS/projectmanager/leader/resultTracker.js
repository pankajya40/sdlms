"use strict";

const teamResultTracker = module.exports;

teamResultTracker.get = async function (req, res) {
    const home = {};

    home.title = "Result Tracker";
    home.isResultTab = true

    res.render('pdgms/projectManager/leader/result_tracker', home)
}