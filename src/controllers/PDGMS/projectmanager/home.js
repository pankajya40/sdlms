"use strict";

const projectManager = module.exports;

projectManager.get = async function (req, res) {
    const home = {};

    home.title = "Project Manager";

    res.render('pdgms/projectManager/home', home)
}