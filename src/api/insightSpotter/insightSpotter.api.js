"use strict";
const db = require('../../database');
const utilities = require('../../controllers/utils');
const {	ObjectId} = require('mongodb');
const insightSpotter = module.exports;
const collectionName = db.collections.GLOBAL.INSIGHT_SPOTTER;
const User = require("../../user")
insightSpotter.judgement = require('./judgement.api');
const userFields = [
	"username",
	"picture",
	"fullname",
];


//  write the reflection means, selection of the statement and give category [wisdom, value, emotion] 
// and sub category as well
insightSpotter.createInsight = async (req) => {
	const currentTime = utilities.getISOTimestamp();

	const {	uid	} = req;

	const {	statement,	reflection,	category, subCategory} = req.body; // CHECK REQUIRED IS ALREADY ADDED AT THE MIDDLEWARE

	const payload = {
		uid: parseInt(uid),
		statement: statement,
		reflection: reflection,
		category: category,
		subCategory: subCategory,
		createdAt: currentTime,
		updatedAt: currentTime,
		updatedBy: `user:${uid}`,
		type: "insight",
	};

	return await db.setField(collectionName, payload);
}
// for editing the insight, parameter will be coming from the url
insightSpotter.editInsight = async(req) =>{
	const currentTime = utilities.getISOTimestamp();
	const {id} = req.params;	
	const uid = parseInt(req.uid)

	let {reflection, category, subCategory} =req.body    

	if (!ObjectId.isValid(id))	throw new Error("Id parameter is not valid")

	const payload = {}

	reflection = reflection.trim()
	category= category.trim()
	subCategory = subCategory.trim()

    if ((reflection) || (category) || (subCategory)) {
		payload.updatedAt = currentTime;
		payload.updatedBy = `user:${uid}`;
	  
		if (reflection) {
		  payload.reflection = reflection;
		}
	  
		if (category) {
		  payload.category = category;
		}
	  
		if (subCategory) {
		  payload.subCategory = subCategory;
		}
	  }
	  
	if(Object.keys(payload).length){	
	const keys = {
			type: "insight",
			_id: ObjectId(id),
			uid: parseInt(uid) // number
		} 
	console.log(payload)

	const {result} = await db.updateField(collectionName, keys, {$set: payload});
	
	return {updated: result.n === 1}
	}
	return {updated: result.n === !true}

}

insightSpotter.deleteInsight = async(req) =>{
	const {id} = req.params;
	const uid = parseInt(req.uid);
	
	if (!ObjectId.isValid(id)) throw new Error("Id is not valid");
	
	const keys = {
		_id: ObjectId(id),		
		type: "insight",
		uid : parseInt(uid)  
	}

	const { result } = await db.removeField(collectionName, keys);
	return  { deleted: result.n > 0 }
}
//  will send the insights to the clint
insightSpotter.getInsights = async (req) => {
	let {	category, subCategory,	page, limit, order, records} = req.query;
	page = parseInt(page) || 0;
	limit = parseInt(limit) || 10;
	order = {createdAt : -1}
	const uid = parseInt(req.uid)

 	const keys = {type: "insight"}

	if (category)
		keys.category = category;

	if (subCategory)
		keys.subCategory = subCategory;

	if(order == 'oldest')
		order.createdAt = 1

// will give only user's insights 
// variable name

	if(records == 'self')
	{keys.uid = parseInt(uid); }	

	// will get all the insights
	// change the keys only
	const [responses = [], count = 0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);	

	if(!(responses && responses.length))
	throw new Error('No data found'); // optional

	const Uids = [...new Set(responses.map(obj => obj.uid))];

	const usersData = await User.getUsersFields(
		Uids, userFields
	)

	responses.forEach(res => {
		const userData = usersData.find(user => user.uid === res.uid);
		if (userData) {
			res.userData = userData;
		}
	});
	return utilities.paginate(`/insightspotter${req.url}`, responses, count, limit, page);

}
//  give the single insight to the client
insightSpotter.getInsight = async (req) => {
	// judgements will come using the id in the parameter
	const {	id } = req.params;

	if (!ObjectId.isValid(id))	throw new Error("Id parameter is not valid")

	const keys = {
		_id: ObjectId(id),
		type: "insight",
	}

	const result = await db.findField(collectionName, keys)

	const userData = await User.getUserFields(
		result.uid,
		userFields
	);

	if (!userData) {
		return null;
	}
	
	if (!result)
		throw new Error("No data found with the supplied Id");

	const response = { ...result, userData: userData}
	return response

}
