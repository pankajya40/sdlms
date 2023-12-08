'use strict';

// const fetch = require('node-fetch');
// TODO Rework
// TODO don't use node-fetch

const axios = require('axios');
const nconf = require('nconf');

const WATI_BEARER = nconf.get('wati_bearer');
const WATI_ENDPOINT = nconf.get('wati_endpoint');

const whatsapp = module.exports;

// expired
const url = WATI_ENDPOINT || 'https://app-server.wati.io/api/v1';
const bearer = WATI_BEARER || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YzNlZjhlZC1iNTg1LTRmYzAtYjJlNS0yMjQ0YTY4ZmYxYzAiLCJ1bmlxdWVfbmFtZSI6InRpaGdwZWhyQHNoYXJrbGFzZXJzLmNvbSIsIm5hbWVpZCI6InRpaGdwZWhyQHNoYXJrbGFzZXJzLmNvbSIsImVtYWlsIjoidGloZ3BlaHJAc2hhcmtsYXNlcnMuY29tIiwiYXV0aF90aW1lIjoiMDgvMDUvMjAyMiAxMDoyOToxMiIsImRiX25hbWUiOiJ3YXRpX2FwcCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlRSSUFMIiwiZXhwIjoxNjYwMzQ4ODAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.Rg1q3e7aHz_kkXdIF2eiYvtIKU20yOUc8kb_tgp8PHU';

const options = {
	method: 'POST',
	headers: {
		Authorization: bearer,
	},
};

whatsapp.sendTemplateMessage = async (recipient, templateName, broadcastName="Notification", parameters=[]) => {
	const body = {
		"template_name": templateName,
		"broadcast_name": broadcastName,
	  };

	if (!parameters.length) {
		body.parameters = [
			{
			  "name": "string",
			  "value": "string"
			}
		  ]
	} else {
		body.parameters = parameters;
	}

	const response = await axios.request({
		url: url + `/api/v1/sendTemplateMessage/?whatsappNumber=${recipient}`,
		method: 'POST',
		data: body,
		headers: {
			Authorization: bearer,
		}
	});
}

whatsapp.sendMessages = async (templateId) => {}

whatsapp.sendMessage = async (message, recipient) => {
	const response = await axios.request({
		url: url + `/sendSessionMessage/${recipient}?messageText=${message}`,
		method: 'POST',
		data: {},
		headers: {
			Authorization: bearer,
		}
	});
}

whatsapp.text = async (number, text, batch, cohort) => {
	let result;

	const populated = populate('Fardin', batch, cohort, 'Anirban', text);

	for (let i = 0; i < number.length; i++) {
		const url1 = url + `sendSessionMessage/${number[i]}?messageText=${populated}`;
		// await fetch(url1, options)

		// 	.then(res => res.json())

		// 	.then((json) => {
		// 		result = json;
		// 	})

		// 	.catch(err => console.error('error:' + err));
	}
	const output = {
		text: result.message.text,
		time: result.message.time,
	};
	return 'Message sent via WhatsApp';
};

// populate variables like name, no. of articles etc.
function populate(studentName, batch, cohort, teacherName, text) {
	text = text.replaceAll('<NAME>', studentName);
	text = text.replaceAll('<BATCH>', batch);
	text = text.replaceAll('<COHORT>', cohort);
	text = text.replaceAll('<TEACHER>', teacherName);
	return text;
}
