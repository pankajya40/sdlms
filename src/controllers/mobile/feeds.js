"use-strict";

const {reactions} = require('./config');
const utilities = require('../utils');
const  appApi= require('../../api/app.api');
const user = require('../../user');

const feedsController = module.exports;

feedsController.get = async function (req, res, next) {
    const assets = {};
    assets.title = 'Feeds';

    assets.categories = Object.keys(reactions).map(el => ({name: el, value: utilities.capitalizeFirstLetter(el)}));
    assets.reactions = reactions;
    [assets.events] = await Promise.all([
		appApi.getEvents(req),
    
	]);
  assets.events.data.hostDetail = assets.events.data.map(async (param)=>{
    let userId = param.uid;
    console.log(param);
    let hostDetails = await user.getUserFields(userId,[
      "username",
      "email",
      "lastonline",
      "picture",
      "fullname",
      "uid",
      "uploadedpicture",
      "pronoun",
      "social_designation",
    ]);
    console.log(hostDetails);
    param.hostDetails = hostDetails
    return param;
  })
  console.log(assets.events);


	res.render('mobile/insightfeeds/index', assets);
};
