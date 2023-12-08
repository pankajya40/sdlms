"use strict";

const db = require("../../../database");

const solutionController = module.exports;
const collectionName = db.collections.RIGORBUILDER.TEMPLATE;

solutionController.get = async function (req, res, next) {
    let { pid } = req.params;
    let uid = req.uid;

    var solution = {};

    solution.title = 'Solution Page';

    solution.rigor = await db.findField(collectionName, { pid: parseInt(pid), uid: uid });

    if (!solution.rigor) {
        throw new Error("Invalid pid! No Rigor was found with pid: " + pid);
    }
    // tpf file where we rendered
    res.render('rigorbuilder/user/solution', solution);
};
