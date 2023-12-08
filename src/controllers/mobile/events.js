const { constants } = require('../../constants');
const { MOBILE_APP } = constants;
const db = require('../../database')
const  categories  = require('../../categories');
const user = require('../../user');



const eventsController = module.exports;

eventsController.get = async function (req, res, next) {
	res.render("mobile/events/create", {
		title: "Create Event",
		eventTypes: MOBILE_APP.eventTypes,
	});
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @author Divyansh Verma
 * 
 */
eventsController.getDetails = async function (req, res, next) {

	const collectionName = db.collections.DEFAULT;
	let tid = parseInt(req.params.tid)
	//dbquery for tid 
	let data = await db.findField(collectionName, { tid })
	let userId = data.uid;
	let hostDetails = await user.getUserFields(userId,[
		"username",
		"email",
		"lastonline",
		"picture",
		"fullname",
		"status",
		"uid",
		"signature",
		"birthday",
		"location",
		"aboutme",
		"uploadedpicture",
		"pronoun",
		"social_designation",
	]);
	console.log(hostDetails);

	let cat;
	let subcat;
	if (!data) {
		throw new Error('event not found');
	}
	else {



		data.date = new Date(parseInt(data.schedule)).toLocaleDateString();	// Date of Event
		data.time = new Date(parseInt(data.schedule)).toLocaleTimeString();	// Time of Event
		data.attendeeNum = data.attendees.length;		// Stores number of Registration
		data.category_name = await categories.getCategoryData(data.category);
		data.sub_category_name = await categories.getCategoryData(parseInt(data.sub_category));
		data.hostDisplayName =hostDetails.displayname; 
		data.hostPicture = hostDetails.picture;
		console.log(data);
	}
	res.render("mobile/events/details", {
		title: "Event Details",
		message: "hello this is working",
		eventData: data,
		
	});
};

eventsController.getSaved = async function (req, res, next) {
	res.render("mobile/events/saved", {
		title: "Event Saved",
		message: "hello this is working",
	});
};
