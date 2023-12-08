"use strict";
const db = require("../../../database");
const collectionName = db.collections.RIGORBUILDER.TEMPLATE;

const reasonController = module.exports;

reasonController.get = async function (req, res, next) {
    let { pid } = req.params;
    let uid = req.uid;

    var reason = {};
    reason.title = 'home Page';

    reason.rigor = await db.findField(collectionName, { pid: parseInt(pid), uid: uid });

    if (!reason.rigor) {
        throw new Error("Invalid pid! No Rigor was found with pid: " + pid);
    }
    // tpf file where we rendered
    res.render('rigorbuilder/user/reason', reason);
};



