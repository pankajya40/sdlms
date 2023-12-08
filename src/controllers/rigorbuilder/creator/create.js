"use strict";

const createController = module.exports;

createController.get = async function (req, res, next) {
    var create = {};
    create.title = 'Create Page';
    // tpf file where we rendered
    res.render('rigorbuilder/creator/create', create);
};