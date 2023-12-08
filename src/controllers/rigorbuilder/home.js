"use strict";

const homeController = module.exports;

homeController.get = async function (req, res, next) {
    var home = {};
    home.title = 'home Page';
    // tpf file where we rendered
    res.render('rigorbuilder/home', home);
};