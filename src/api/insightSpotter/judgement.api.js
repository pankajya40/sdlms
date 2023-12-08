"use strict";

const db = require('../../database');
const utilities = require('../../controllers/utils');
const {	ObjectId} = require('mongodb');
const collectionName = db.collections.GLOBAL.INSIGHT_SPOTTER;
const User = require("../../user")
const userFields = [
	"username",
	"picture",
	"fullname",
];

const judgement = module.exports;

// writing the judgement using the id in the parameter
judgement.create = async (req) =>{
	const {	id} = req.params;

	const {	uid	} = req;

	if (!ObjectId.isValid(id))	throw new Error("Id parameter is not valid");

	const currentTime = utilities.getISOTimestamp();

	const {	judgement,	category} = req.body; // check required is already set

	const payload = {
		_key: `insight:${id}`,
		uid: parseInt(uid),
		judgement: judgement,
		category: category,
		createdAt: currentTime,
		updatedAt: currentTime,
		updatedBy: `user:${uid}`,
		type: "insight:judgement",
	}

	return await db.setField(collectionName, payload)
}

// all the judgements associate with the id in the parameter
judgement.get = async (req) =>{
	const {id} = req.params;
	const {category} = req.query;
	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 10;
	const order = {createdAt : -1}

	if(!ObjectId.isValid(id))	
	throw new Error("Id parameter is not valid");

	const keys = {
		_key: `insight:${id}`,
		type: "insight:judgement",
	}

	if (category)
		keys.category = category;

	const [responses = [], count = 0] = await Promise.all([
		db.getFieldsWithPagination(collectionName, keys, limit, page, order),
		db.countDocuments(collectionName, keys),
	]);

	if(!responses && !responses.length ) throw new Error('No data found');	 // optional
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

// edit the judgement using the id in the parameter
judgement.edit = async (req) =>{   
    const currentTime = utilities.getISOTimestamp();
	const {id} = req.params;	
	const uid = parseInt(req.uid)
	let {judgement, category} = req.body	    

	if(!ObjectId.isValid(id))
		throw new Error("Id parameter is not valid")
	
	const payload = {}

	if ((judgement && judgement.length) || (category && category.length))
	{		
		payload.updatedAt = currentTime;
		payload.updatedBy = `user:${uid}`;
	  
		if (judgement) {
		  payload.judgement = judgement;
		}
	  
		if (category) {
		  payload.category = category;
		}	  
	}
	
	if(Object.keys(payload).length){	
		console.log(payload)
	const keys = {
			type: "insight:judgement",
			_id: ObjectId(id),
			uid: parseInt(uid)
		}
	const {result} = await db.updateField(collectionName, keys, {$set: payload});
	
	return {updated: result.n == 1}
	}		
	return {updated: !true};
}
// it will delete the using id in the parameter
judgement.delete = async (req) =>{    
    
	const {uid} = req;
	const {id} = req.params;
	
	if(!ObjectId.isValid(id))
		throw new Error("Id parameter is not valid");

	const keys = {
		_id: ObjectId(id),
		type: 'insight:judgement',	
		uid : parseInt(uid)	
	}

	const { result } = await db.removeField(collectionName, keys);
	return  { deleted: result.n > 0 }
}


                   