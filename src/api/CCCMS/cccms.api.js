"use strict";


/**
 * @author dev-raman
 * @date 10-12-2022 (started at)
 * @date 28-12-2022 (last updated at)
 */

const db = require('../../database');
const User = require('../../user');
const utilities = require('../../controllers/utils');
const {
	ObjectId
} = require('mongodb');
const msg = require('../../messaging')
const cccmsAPIs = module.exports;

const TICKETS = db.collections.CCCMS.TICKETS;
const REQUESTS = db.collections.CCCMS.REQUESTS;
const CONSEQUENCES = db.collections.CCCMS.CONSEQUENCES

const consequenceType = ['ref', 'cas', 'out']
const modes = ['mentor', 'mentee', 'peer']
const requestMode = ['mentee', 'peer']
const types = ['sent', 'pending']
const actions = ['save', 'publish']
const requestAction = ['approve', 'decline', 'cancel']

const validators = {
	consType: consequenceType,
	modes: modes,
	reqMode: requestMode,
	actions: actions,
	reqAction: requestAction,
	types: types,
}

/***
 * @function handleRequests
 * @description caller can access all his the sent and pending Requests with
 * the following handler
 */
cccmsAPIs.handleRequests = async (req) => {

	let query = req.query
	let uid = query.uid ? parseInt(query.uid, 10) : parseInt(req.uid, 10)
	let type = query.type ? `${query.type}` : null
	let mode = query.mode ? `${query.mode}` : null
	query.uid = uid

	if (!uid ||
		!type ||
		!validate('types', type)
	) {
		return []
	}

	if (mode) {
		if (!validate('modes', mode)) {
			return []
		}
	}

	let rxQueryStr = new RegExp(getKeyForSentPendRequests(query))
	return await db.findFields(REQUESTS, {
		_KEY: {
			$in: [rxQueryStr]
		}
	})
}


/***
 * @function handleCreateRequest
 * @description caller can create a request based on the relationship he 
 * wants with the other guy, with the help of following handler
 */

cccmsAPIs.handleCreateRequest = async (req) => {
	let query = req.body

	let uid = query.uid ? parseInt(query.uid, 10) : parseInt(req.uid, 10)
	let toUid = query.toUid ? parseInt(query.toUid, 10) : null
	let mode = query.mode ? `${query.mode}` : null
	let objectives = query.objectives ? query.objectives : null
	let kpis = query.kpis ? query.kpis : null
	if (!uid ||
		!toUid ||
		!mode ||
		!validate('reqMode', mode) ||
		!Array.isArray(objectives) ||
		!Array.isArray(kpis)
	) {
		return {
			status: false
		}
	}
	let isRequestAlreadyExists = await checkDoc(REQUESTS, {
		uid: uid,
		toUid: toUid
	})

	if (isRequestAlreadyExists) {
		return {
			status: false
		}
	}

	let u1Exists = await User.exists(uid)
	let u2Exists = await User.exists(toUid)
	if (!u1Exists) {
		return {
			status: false,
			message: 'sender does not exists'
		}
	}
	if (!u2Exists) {
		return {
			status: false,
			message: 'receiver does not exists'
		}
	}

	let usersData = await User.getUsersFields([uid, toUid], ["username", "fullname", "picture"])

	if (!Array.isArray(usersData) && usersData.length !== 2) {
		return {
			message: 'not able to fetch user data',
			status: false
		}
	}

	let requestId = ObjectId().toHexString()
	let roles = getModes(query);
	let doc1 = {},
		doc2 = {}
	let sender = {
		mode: mode,
		objectives: objectives,
		kpis: kpis,
		...usersData[0]
	}

	let receiver = {
		...usersData[1]
	}
	query.requestId = requestId
	let createdAt = utilities.getISOTimestamp()

	query.type = 'sent'
	query.uid = uid
	doc1._KEY = getKeyForSentPendRequests(query)
	doc1.uid = uid
	doc1.toUid = toUid
	doc1.sender = sender
	doc1.status = 'sent'
	doc1.createdAt = createdAt
	doc1.receiver = receiver

	query.type = 'pending'
	query.uid = query.toUid
	query.mode = roles.length === 2 ? roles[1] : roles[0]
	doc2._KEY = getKeyForSentPendRequests(query)
	doc2.uid = uid
	doc2.toUid = toUid
	doc2.sender = sender
	doc2.status = 'pending'
	doc2.createdAt = createdAt
	doc2.receiver = receiver

	await db.setField(REQUESTS, doc1)
	await db.setField(REQUESTS, doc2)
	return {
		status: true
	}
}




/***
 * 
 * @function handleApproveOrDeclineRequest
 * @description caller can approve or decline a request with the following handler
 */
cccmsAPIs.handleApproveOrDeclineRequest = async (req) => {
	let query = req.body
	let uid = query.uid ? parseInt(query.uid, 10) : parseInt(req.uid, 10)
	req.uid = uid // preparing req for creating room
	let requestId = query.requestId ? `${query.requestId}` : null // requestid = mongodb id
	let action = query.action ? `${query.action}` : null
	let objectives = query.objectives ? query.objectives : null
	let kpis = query.kpis ? query.kpis : null

	if (action == 'approve' || action == 'decline') {
		if (
			!uid ||
			!requestId ||
			!action ||
			!validate('reqAction', action) ||
			!Array.isArray(objectives) ||
			!Array.isArray(kpis)
		) {
			return {
				status: false
			}
		}
	}

	if (action == 'cancel') {
		if (
			!requestId ||
			!action ||
			!validate('reqAction', action)
		) {
			return {
				status: false
			}
		}
	}


	let doc = await db.findField(REQUESTS, {
		_id: ObjectId(requestId)
	})
	if (!doc) {
		return {
			status: false
		}
	}

	if ((action == 'approve' || action == 'decline') && parseInt(doc.toUid) === uid) {

		query.mode = doc.sender.mode
		let roles = getModes(query)

		let ticket = {}
		let ticketId = ObjectId().toHexString()
		ticket._KEY = `ticketId:${ticketId}`
		ticket.uid = doc.uid
		ticket.toUid = doc.toUid
		ticket.sender = doc.sender
		ticket.receiver = {
			mode: roles.length == 1 ? roles[0] : roles[1],
			objectives: objectives,
			kpis: kpis,
			...doc.receiver
		}
		ticket.mode = roles[0]
		ticket.toMode = roles.length == 1 ? roles[0] : roles[1]
		ticket.status = action
		ticket.createdAt = utilities.getISOTimestamp()
		ticket.updatedAt = utilities.getISOTimestamp()

		if (action == 'approve') {
			let data = []
			data.toUids = query.toUids ? query.toUids : [doc.uid, doc.toUid]
			data.description = query.description ? query.description : "We wish you find this collaboratio fruitful"
			data.name = roles.length == 1 ? 'Peer/Peer' : 'Mentor/Mentee'
			let roomId = await msg.createRoom(data, req.uid)
			ticket.roomId = roomId.roomId
		}
		await db.setField(TICKETS, ticket)
		await db.client.collection(REQUESTS).deleteMany({
			uid: doc.uid,
			toUid: doc.toUid
		})
		return {
			status: true
		}

	}

	if (action == 'cancel' && uid == doc.uid) {

		await db.client.collection(REQUESTS).deleteMany({
			uid: doc.uid,
			toUid: doc.toUid
		})
		return {
			status: true
		}
	}
	return {
		status: false
	}
}





/***
 * @function handleTicketHistory
 * @description caller can get his 'ticket history'/'collaboration history',
 * with the help of following handler
 */

cccmsAPIs.handleTicketHistory = async (req) => {
	let query = req.query
	let searchObj = {}
	let uid = query.uid ? parseInt(query.uid, 10) : parseInt(req.uid, 10)
	let mode = query.mode ? `${query.mode}` : null
	let limit = query.limit ? parseInt(query.limit) : 10
	let page = query.page ? parseInt(query.page) : 0
	if (!uid) {
		return []
	} else {
		uid = parseInt(uid)
		searchObj = {
			$or: [{
				uid: uid
			}, {
				toUid: uid
			}]
		}
	}
	if (mode && validate('modes', mode)) {
		if (`${query.mode}` === 'mentor') {
			searchObj = {
				toUid: uid,
				toMode: mode
			}
		} else if (`${query.mode}` === 'mentee') {
			searchObj = {
				uid: uid,
				mode: mode
			}

		} else if (`${query.mode}` === 'peer') {
			searchObj = {
				$or: [{
						uid: uid,
						mode: mode
					},
					{
						toUid: uid,
						mode: mode
					}
				]
			}
		}
	}

	return await db.getFieldsWithPagination(TICKETS, searchObj, limit, page)
}





/***
 * @function handleReadConsequence
 * @description caller can read the different type of consequences, with the help of following handler
 */

cccmsAPIs.handleReadConsequence = async (req) => {
	let query = req.query
	query.action = "save" //have no effect, just a placeholder
	let callee = query.callee ? parseInt(query.callee, 10) : parseInt(req.uid, 10)
	let param = handleCreateAndUpdateParam(query)
	let [uid, ticketId, action, type] = param.param

	let uExists = await User.exists(uid)
	let calleeExists = await User.exists(callee)
	if (!uExists) {
		return {
			status: false,
		}
	}

	if (!calleeExists) {
		return {
			status: false,
		}
	}
	let doc = {}
	doc._KEY = `ticketId:${ticketId}`
	doc.uid = uid
	doc.type = type
	if (callee === uid) {
		doc.status = 'drafted'
		let docs = await db.findField(CONSEQUENCES, doc)
		if (docs) {
			return docs
		}
		doc.status = 'published'
		docs = await db.findField(CONSEQUENCES, doc)
		return docs
	} else {
		doc.status = 'published'
		let docs = await db.findField(CONSEQUENCES, doc)
		return docs
	}
}





/***
 * @function handleCreateConsequence
 * @description caller can create a consequence by specifying the type of consequence, One can also save a consequence as draft, with the help of following handler
 */

cccmsAPIs.handleCreateConsequence = async (req) => {
	let query = req.body
	let consequence = query.consequence ? `${query.consequence}` : null

	let param = handleCreateAndUpdateParam(query)
	if (!param.status || !consequence) {
		return {
			status: false
		}
	}

	let [uid, ticketId, action, type] = param.param

	let uExists = await User.exists(uid)
	if (!uExists) {
		return {
			status: false,
			message: `you are not authorized`
		}
	}

	ticketId = `ticketId:${ticketId}`

	let isTicketExists = await db.findField(TICKETS, {
		_KEY: ticketId,
		status: 'approve'
	})
	let isConsExists = await db.findField(CONSEQUENCES, {
		_KEY: ticketId,
		uid: uid,
		type: type
	})

	if (!isTicketExists || isConsExists) {
		return {
			status: false,
			message: ""
		}
	}

	let doc = {}
	doc._KEY = ticketId
	doc.uid = uid
	doc.type = type
	doc.status = action == 'save' ? 'drafted' : 'published'
	doc.consequence = `${query.consequence}`
	doc.createdAt = utilities.getISOTimestamp()
	doc.updatedAt = utilities.getISOTimestamp()
	await db.setField(CONSEQUENCES, doc)
	return {
		status: true
	}
}




/***
 * @function handleUpdateConsequence
 * @description caller can update a consequence as draft or published, with the help of following handler
 */

cccmsAPIs.handleUpdateConsequence = async (req) => {
	let query = req.body
	let consequence = query.consequence ? `${query.consequence}` : null
	let id = query._id ? `${query._id}` : null
	let action = query.action ? query.action : null
	let type = query.type ? query.type : null

	if (!consequence ||
		!id ||
		id.length !== 24 ||
		!action ||
		!validate('actions', action) ||
		!type ||
		!validate('consType', type)
	) {
		return {
			status: false
		}
	}
	let isConsExists = await db.findField(CONSEQUENCES, {
		_id: ObjectId(id)
	})
	if (!isConsExists) {
		return {
			status: false
		}
	}

	await db.updateField(CONSEQUENCES, {
		_id: ObjectId(id)
	}, {
		$set: {
			consequence: consequence,
			updatedAt: utilities.getISOTimestamp(),
			status: action == 'save' ? 'drafted' : 'published'
		}
	})
	return {
		status: true
	}
}

// open ticket system
// in explore, user can see all the open ticket


// what is ticket: it happens when both parties are involved 
// what is request: it happens only one paty is involved

// + 
cccmsAPIs.explore = async (req) => {
    let tag = req.query.tag;    
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 0;
   
    let keys = 
    { type: "open", }

 
    if(tag) keys = {
        type: "open",
        tags: tag, 
    }
    let order = {
        createdAt : parseInt(req.query.order)  || -1
    }
    const [responses=[], count=0] = await Promise.all([
		db.getFieldsWithPagination(REQUESTS, keys, limit, page, order),
		db.countDocuments(REQUESTS, keys),
	]);

    return utilities.paginate(`/cccms${req.url}`, responses, count, limit, page);
     
}
// connect is pending 
/*
   the idea behind this is to show all the profiles of the users with their signature.
  ip: database of the sdlms profiles
  op: all the profiles with their signatuere

*/
const userAPI = require('../../controllers/admin/users');
cccmsAPIs.connect = async(req, res) =>{
	return await userAPI.index(req, res);

}




/***
 * @function handleCreateAndUpdateParam
 * @description for validating the query parameters for consequences
 */

function handleCreateAndUpdateParam(query) {
	let uid = query.uid ? parseInt(query.uid) : null
	let ticketId = query.ticketId ? query.ticketId : null
	let action = query.action ? query.action : null
	let type = query.type ? query.type : null
	if (!uid ||
		!ticketId ||
		!action ||
		!validate('actions', action) ||
		!type ||
		!validate('consType', type)
	) {
		return {
			status: false
		}
	}
	return {
		status: true,
		param: [uid, ticketId, action, type]
	}

}




/***
 * @function getKeyForSentPendRequests
 * @description for creating the keys for sent and pending requests
 */
function getKeyForSentPendRequests(query) {
	let uid = query.uid
	let mode = query.mode ? query.mode : '[a-z]*'
	let type = query.type ? query.type : '[a-z]*'
	let requestId = query.requestId ? query.requestId : '[\w]*'
	let queryStr = `uid:${uid}:type:${type}:mode:${mode}:requestId:${requestId}`
	return queryStr
}


function getModes(query) {
	return `${query.mode}` == "mentee" ? ["mentee", "mentor"] : ["peer"]
}


function validate(validator, arg) {
	return validators[validator].indexOf(arg) !== -1 ? true : false
}


async function checkDoc(collection, queryObj) {
	let docs = await db.findFields(collection, queryObj)
	if (Array.isArray(docs) && docs.length === 2) {
		return true
	} else {
		return false
	}

}