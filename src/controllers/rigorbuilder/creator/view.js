"use strict";

const db = require("../../../database");

const viewController = module.exports;
const collectionName = db.collections.RIGORBUILDER.TEMPLATE;

viewController.get = async function (req, res, next) {
	let { pid } = req.params;
	let uid = req.uid;

	var view = {};
	view.title = 'View Page';
	view.rigor = await db.findField(collectionName, { pid: parseInt(pid), uid: uid });

	if (!view.rigor) {
		throw new Error("Invalid pid! No Rigor was found with pid: " + pid);
	}

	// tpf file where we rendered
	res.render('rigorbuilder/creator/view', view);
};