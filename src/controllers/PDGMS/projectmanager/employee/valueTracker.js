"use strict";

const valueTracker = module.exports;

valueTracker.get = async function (req, res) {
    const home = {};

    home.title = "Value Tracker";
    home.isValueTab = true
    
    res.render('pdgms/projectManager/employee/value_tracker', home)
}