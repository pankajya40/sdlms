"use strict";

const employee = module.exports;

employee.get = async function (req, res) {
    const home = {};

    home.title = "Employee View";
    home.isDashboardTab = true

    res.render('pdgms/projectManager/employee/index', home)
}