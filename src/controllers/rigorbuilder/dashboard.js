"use strict";

const dashboardController = module.exports;

dashboardController.get = async function (req, res, next) {
    var dashbaord = {};
    dashbaord.title = 'Dashboard Page';
    // tpf file where we rendered
    res.render('rigorbuilder/dashboard', dashbaord);
};