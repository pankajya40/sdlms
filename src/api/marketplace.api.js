'use strict';

const db = require('../database');
const slugify = require('../slugify');
const marketplace = module.exports;

const collections = {
	MODULEPURCHASEORDERS: 'module_purchase_orders',
	MODULES: 'modules',
	COCREDORDERS: 'cocred_orders',
	PRICELIST: 'price_list',
	COCREDDETAILS: 'cocred_details',
	COCREDPRODUCTS: 'cocred_products',
	SUBMARKET: 'submarket',
};

marketplace.listSubMarkets = async (req) => {
	try {
		var limit = parseInt(req.query.limit) || 12;
		var page = parseInt(req.query.page) || 0;
		var orderBy = req.query.orderBy || 'moduleCount';
		var sort = parseInt(req.query.sort) || -1;
		var order = { orderBy: sort };

		return await db.getFieldsWithPagination(collections.SUBMARKET, {}, limit, page, order);
	} catch (e) {
		console.log(e.message);
	}
};

marketplace.getSubMarket = async (req) => {
	try {
		var keys = { slug: slugify(req.params.name) };
		return await db.findField(collections.SUBMARKET, keys);
	} catch (error) {
		console.log(error.message);
	}
};

marketplace.createSubMarket = async (req) => {
	try {
		const submarket = {
			name: req.body.name,
			slug: slugify(req.body.name),
			description: req.body.description,
			created: Date.now(),
			ownerUID: parseInt(req.uid),
			moduleCount: 0,
		};
		const result = await db.setField(collections.SUBMARKET, submarket);
		return result;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

marketplace.updateSubMarket = async (req) => {
	try {
		var keys = { name: req.params.name };

		var field = await db.findField(collections.SUBMARKET, keys);
		if (field.ownerUID !== req.uid) return 'Unauthorised';

		const update = {
			name: req.body.name,
			slug: slugify(req.body.name),
			description: req.body.description,
		};
		// TODO name & description is must, they should be added in route

		return await db.updateField(collections.SUBMARKET, keys, { $set: update });
	} catch (error) {
		console.log(error.message);
	}
};

marketplace.deleteSubMarket = async (req) => {
	try {
		var keys = { slug: slugify(req.params.name) };
		var field = await db.findField(collections.SUBMARKET, keys);
		if (field.ownerUID !== req.uid) return 'Unauthorised';
		const state = await db.removeField(collections.SUBMARKET, keys);

		return { deleted: state.result.n === 1 };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

marketplace.listModules = async function (req, res) {
	const limit = parseInt(req.query.limit) || 2;
	const page = parseInt(req.query.page) || 0;
	const orderBy = req.query.orderBy || 'moduleID';
	const sort = req.query.sort === 'latest' ? -1 : 1;
	const order = { orderBy: sort };
	const filter = { status: 'active' };
	if (req.query.submarket) filter.submarket = slugify(req.query.submarket);
	if (req.params.id !== undefined) filter.moduleID = `module:${parseInt(req.params.id)}`;

	return await db.getFieldsWithPagination(collections.MODULES, filter, limit, page, order);
};

marketplace.createModule = async function (req) {
	try {
		var field = await db.findLatestField(collections.MODULES, {});
		var id = parseInt(field.moduleID.slice(7));
		const module = {
			moduleID: `module:${id + 1}`,
			status: 'pending',
			created: Date.now(),
			name: req.body.name,
			description: req.body.description,
			moduleType: req.body.type,
			submarket: slugify(req.body.submarket),
			ownerUID: parseInt(req.uid),
			duration: parseInt(req.body.duration),
			cocreds: parseInt(req.body.cocreds),
			start_date: parseInt(req.body.start_date),
			end_date: parseInt(req.body.end_date),
		};
		const pricelist = {
			end_date: parseInt(req.body.end_date),
			moduleID: `module:${id + 1}`,
			duration: parseInt(req.body.duration),
			cocreds: parseInt(req.body.cocreds),
		};
		const moduleResult = await db.setField(collections.MODULES, module);
		const pricelistResult = await db.setField(collections.PRICELIST, pricelist);
		await db.incrObjectFieldCount(collections.SUBMARKET, { slug: slugify(req.body.submarket) }, 'moduleCount', 1);
		return {
			created: true,
			id: parseInt(moduleResult.moduleID.slice(7))
		};
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

marketplace.updateModule = async function (req) {
	try {
		const query = { moduleID: `module:${parseInt(req.params.id)}` };
		const update = {};
		const update_pricelist = {};
		if (req.body.name) update.name = req.body.name;
		if (req.body.description) update.description = req.body.description;
		if (req.body.duration) update.duration = parseInt(req.body.duration);
		if (req.body.status) update.status = req.body.status;
		if (req.body.type) update.moduleType = req.body.type;
		if (req.body.uid) update.updatedUID = parseInt(req.body.uid);
		if (req.body.start_date) update_pricelist.start_date = parseInt(req.body.start_date);
		if (req.body.end_date) update_pricelist.end_date = update.end_date = parseInt(req.body.end_date);
		if (req.body.duration) update_pricelist.duration = update.duration = parseInt(req.body.duration);
		if (req.body.cocreds) update_pricelist.cocreds = update.cocreds = parseInt(req.body.cocreds);
		update.lastUpdated = Date.now();
		update.slug = slugify(req.body.name);

		await db.updateField(collections.MODULES, query, { $set: update });
		await db.updateField(collections.PRICELIST, query, { $set: update_pricelist });
		return { updated: true };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

marketplace.deleteModule = async function (req) {
	try {
		const find = await db.findField(collections.MODULES, { moduleID: `module:${parseInt(req.params.id)}` });
		var keys = { moduleID: `module:${parseInt(req.params.id)}` };
		const state = await db.removeField(collections.MODULES, keys);
		const pricelist = await db.removeField(collections.PRICELIST, keys);
		await db.incrObjectFieldCount(collections.SUBMARKET, { name: find.submarket }, 'moduleCount', -1);
		return { deleted: state.result.n === 1 };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
