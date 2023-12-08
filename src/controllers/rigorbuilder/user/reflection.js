"use strict";
const db = require("../../../database");
const collectionName = db.collections.RIGORBUILDER.TEMPLATE;

const reflectionController = module.exports;

reflectionController.get = async function (req, res, next) {
    let { pid } = req.params;
    let uid = req.uid;

    var reflection = {};
    reflection.title = 'home Page';

    reflection.rigor = await db.findField(collectionName, { pid: parseInt(pid), uid: uid });

    if (!reflection.rigor) {
        throw new Error("Invalid pid! No Rigor was found with pid: " + pid);
    }
    // tpf file where we rendered
    res.render('rigorbuilder/user/reflection', reflection);
};



