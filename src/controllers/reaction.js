'use strict';

const winston = require('winston');
const db = require('../database');
const user = require('../user');
const helpers = require('./helpers');

const reactionController = module.exports;

reactionController.getAllReactions = async function (req, res, next) {
	const collectionName = db.collections.DEFAULT;
	var data = await db.findField(collectionName, { type: 'reaction' });
	delete data._id;
	helpers.formatApiResponse(200, res, data);
};

/**
 * @author imshawan
 * @description {*} Gets all the reaction of that topic based on the user Id
 *
 * @param {req.params} req
 * @param {*} res
 */

reactionController.getReactionsByUid = async function (req, res, next) {
	const collectionName = db.collections.DEFAULT;
	const keys = {
		tid: parseInt(req.params.tid),
		uid: parseInt(req.params.uid),
		type: 'reaction',
	};

	helpers.formatApiResponse(200, res, await db.findField(collectionName, keys));
};

/**
 * @description Handles reactions for a particular session
 */

reactionController.react = async function (req, res, next) {
	const keys = {
		tid: parseInt(req.params.tid),
		type: 'reactions',
	};
	const uid = parseInt(req.uid);
	const field = {
		uid: uid,
		username: req.body.username,
		rid: parseInt(req.params.rid),
		icon: req.body.icon,
		emoji: req.body.emoji,
		timestamp: Date.now(),
	};

	helpers.formatApiResponse(200, res, await db.addReactions(keys, field));
};

/**
 * @description Gets the reactions for a particular session based on the session topic Id
 */


reactionController.getReactions = async function (req, res, next) {
	const collectionName = db.collections.DEFAULT;
	const key = {
		tid: parseInt(req.params.tid),
		type: 'reactions',
	};
	var field = await db.findField(collectionName, key);

	helpers.formatApiResponse(200, res, { tid: field.tid, reactions: field.reactions });
};


/**
 * @date 18-08-2022
 * @author Srijit Patra
 * @description this controllers fetches each emoticons count within the given timestamps(passed as query parameters) for a specfic uid(passed as params) it returns the data according to the months(that exists between given timestamps)
 * months are 0-indexed(january == 0)
 */

reactionController.getReactionsByDuration = async function (req, res, next) {

	const uid = parseInt(req.params.uid); // id of the user
	const start = parseInt(req.query.start); // starting timestamp 
	const end = parseInt(req.query.end); // ending timestamp

	const collectionName = db.collections.DEFAULT;
	const keys = {
		type: 'reactions',
		reactions: {
			$elemMatch:{
				uid: uid
			}
		}
	};
	var fields = await db.findFields(collectionName, keys);	

	//filter the fields according to user id and timestamp duration.
	const newFields = fields.map((element) =>{
		const obj = {}
		obj.reactions = element.reactions.filter( react => react.uid == uid && react.timestamp >= start && react.timestamp <= end);
		return obj;
	});

	//Count the no of emoticons used by user within a given timestamps. 
	const reactionsCount = {};
	const icons = {
		hakunaMatata:"https://sdlms.deepthought.education/assets/uploads/files/files/unamused.svg",
		SocratesGlass:"https://sdlms.deepthought.education/assets/uploads/files/files/confused.svg",
		BuddhasEther:"https://sdlms.deepthought.education/assets/uploads/files/files/buddha.svg",
		FoodforThought:"https://sdlms.deepthought.education/assets/uploads/files/files/food-of-thought.svg",
		EurekaMoment:"https://sdlms.deepthought.education/assets/uploads/files/files/idea.svg",
		UniversalPrinciple:"https://sdlms.deepthought.education/assets/uploads/files/files/atom.svg",
	}

	const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    for(let field of newFields)
	{
		for(let react of field.reactions)
		{
			var month = new Date(react.timestamp).getMonth();
			/**
			* if the month exists as key in reaction object update data 
			* if it doesn't create a new obj and store it in reaction object with the month as a key.
			*/
			var obj = (!reactionsCount[months[month]]) ? {} : reactionsCount[months[month]]; 
			if(react.rid == 1)
			{
				obj.hakunaMatata = (!obj.hakunaMatata) ? 1 : obj.hakunaMatata+1;
			}
			else if(react.rid == 2)
			{	
				obj.SocratesGlass= (!obj.SocratesGlass) ? 1 : obj.SocratesGlass+1;			
			}
			else if(react.rid == 3)
			{	
				obj.BuddhasEther= (!obj.BuddhasEther) ? 1 : obj.BuddhasEther+1;				
			}
			else if(react.rid == 4)
			{	
				obj.FoodforThought= (!obj.FoodforThought) ? 1 : obj.FoodforThought+1;
			}
			else if(react.rid == 5)
			{
				obj.EurekaMoment= (!obj.EurekaMoment) ? 1 : obj.EurekaMoment+1;
			}
			else if(react.rid == 6)
			{	
				obj.UniversalPrinciple= (!obj.UniversalPrinciple) ? 1 : obj.UniversalPrinciple+1;
			}
			reactionsCount[months[month]] = obj;
		}
	}
	//sorting the count of emoticons of each month in descending order
    for(let month in reactionsCount)
	{
		var sorted = Object.entries(reactionsCount[month])
							.sort((a,b) => b[1]-a[1])
							.reduce((obj , [key,value]) => {
								obj[key] = value;
								return obj;
							},{});
		reactionsCount[month] = sorted;
	}
	reactionsCount.uid = uid;
	reactionsCount.icons = icons;
	const reactionsCountData = {};
	reactionsCountData.data = reactionsCount;
	helpers.formatApiResponse(200, res, reactionsCountData);
}
