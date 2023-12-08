"use strict";

const teamValueTracker = module.exports;

teamValueTracker.get = async function (req, res) {
    const home = {};

    home.title = "Value Tracker";
    home.isValueTab = true
    
    res.render('pdgms/projectManager/leader/value_tracker', home)
}