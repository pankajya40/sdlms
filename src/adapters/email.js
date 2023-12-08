'use strict';

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const nconf = require('nconf');
const sgMail = require('@sendgrid/mail')

const communication = require('../api/communication.api');

const SENDGRID = nconf.get('sendgrid');

const email = module.exports;

const populate = (text, members) => {
	// As we have implemented iinyMCE, we do not need to convert it into HTML anymore
	// text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
	// 	.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
	// 	.replace(/\n/g, '<br>')
	// 	.replace(/\n\r/g, '<br>')
	// 	.replace(/\r/g, '<br>');

	const populated = [];
	const template = handlebars.compile(text);

	for (let i = 0; i < members.length; i++) {
		if (members[i].fullname === null || members[i].fullname === '') {
			members[i].fullname = members[i].username;
		}
		populated.push(template(members[i]));
	}
	return populated;
};

email.populateVariablesWithRealData = (content, data, variables) => {
	if (!Array.isArray(variables)) {
		throw new Error('variables must be an array');
	}

	content = content.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
		.replace(/\n/g, '<br>')
		.replace(/\n\r/g, '<br>')
		.replace(/\r/g, '<br>');

	variables.forEach((el) => {
		content = content.split(`{{${el}}}`).join(`${data[el]}`);
	})

	return content;
}

email.sendEmail = async (data, text, subject, requestId, request) => {
	const populated = populate(text, data);
	let req;

	for (let i = 0; i < data.length; i++) {
		req = {
			name: data[i].name,
			contact: data[i].email,
			message: populated[i],
			requestId,
			accountId: {
				channel: 'email',
			},
			uid: parseInt(request.uid),
		};
		// console.log(data[i].email, populated[i], subject);
		await this.sendCompiledEmail(data[i].email, populated[i], subject);
		await communication.createReport(req);
	}
};

email.sendCompiledEmail = async (recipient, body, subject) => {
	
	sgMail.setApiKey(SENDGRID.api_key);

	const message = {
		to: recipient, // Change to your recipient
		from: SENDGRID.sender, // Change to your verified sender
		subject: subject,
		// text: 'and easy to do anywhere, even with Node.js',
		html: body,
	  }

	await sgMail.send(message)
}

// function to actually send email
async function send(rec, text, subject) {
	async function main() {
		const transporter = nodemailer.createTransport({
			host: 'smtp-relay.sendinblue.com',
			port: 587,
			secure: false,
			auth: {
				user: 'mohit.jakhotra@gmail.com',
				pass: 'OL2qDNjR4kQJcXk',
			},
		});

		const info = await transporter.sendMail({
			from: '"Mohit Jakhotra", mohit.jakhotra@gmail.com', // sender address
			to: rec, // list of receivers
			subject: subject, // Subject line
			text: 'Email from your friend', // plain text body
			html: `<body>${text}</body>`, // html body
		});
	}

	main()
}
