"use strict";

/**
 * 
 * @date 02-12-2022
 * @author iAmritMalviya
 * @description review reports
 */
const db = require('../../database')
const utilities = require('../../controllers/utils');
const handlebars = require('handlebars');
const fs = require('fs')
const path = require('path')
const email = require('../../adapters/email');
const user = require('../../user');
const group = require('../../groups');
const {
	ObjectId
} = require('mongodb');
const membership = require('../../groups/membership')(group);
const collectionName = db.collections.DT_FORMS;
const async = require('async');
const reviewReports = module.exports



reviewReports.sendResponse = async (req) => {
	

		let formId = (req.query.Id);

		let keys = {
			"formId": ObjectId(formId)
		}
		let response = await db.findFields(collectionName, keys);	
		 const regex = /.*Team(|\s)Name.*/i
		let teamNameIndex = response[0].blocks.findIndex((item) => regex.test(item.question) );
		let groupedResponse = response.reduce((acc, item) => {
			let teamName = item.blocks[teamNameIndex].responseRaw;
			if (!acc[teamName]) {
				acc[teamName] = [];
			}
			acc[teamName].push(item);
			return acc;
		}, {});
		groupedResponse = Object.keys(groupedResponse).map(function (key) {
			return {
				_id: key,
				data: groupedResponse[key]
			}
		})


		let PATH_TEMPLATE = '../../../src/views/emails/review_report.html'
		var source = fs.readFileSync(path.join(__dirname, PATH_TEMPLATE), 'utf8');
		let subject = "Review Report";
		async.forEachOf(groupedResponse, async (element, key) => {
			let emails = await getEmailsByTeam(element._id)

			let html = populate(source, {
				data: element.data
			})	
			emails.forEach(async element => {
				await email.sendCompiledEmail(element, html, subject);
			})
		})

}

async function getEmailsByTeam(groupName) {
	groupName = groupName.replace(/ /g, '');
	let memberUids = await group.getMembers(groupName, 0, -1);

	if (!memberUids || !Array.isArray(memberUids) || !memberUids.length) return [];
	let members = await user.getUsersFields(memberUids, ['email']);
	if (!members || !Array.isArray(members) || !members.length) return [];
	return members.map((member) => member.email).filter((email) => email);
}

function populate(source, data) {
	let template = handlebars.compile(source)
	return template(data);
}
