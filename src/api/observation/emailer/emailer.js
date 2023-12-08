const nconf = require('nconf');
const meta = require('../../../meta');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const {paths} = require('../../../constants');
const adapters = require('../../../adapters');
const utilities =  require('../../../controllers/utils');

const emailer = module.exports;
const TEMPLATES_DIR = path.join(paths.baseDir, 'src', 'views', 'observation', 'emails');

emailer.sendNewLeaveAlert = async (from, to, recipient) => {
	if (!from) {
		throw new Error('from is required');
	}
	if (!recipient) return;
	
	if (!utilities.isValidEmail(recipient)) {
		throw new Error('Invalid email id');
	}

	const params = {
		recipient,
		subject: 'New leave request from team',
		header: 'Hello, ' + to,
		sub_header: 'You have 1 new leave request from ' + from,
		cta_link: 'https://pdgms.deepthought.education/pdgms/attendance/approve/leaves',
		cta_text: 'View request',
	};

	await sendEmail('notification.tpl', params);
}

async function sendEmail (template, params) {
	var {subject, recipient} = params;
	var logo = null;

	if (meta.config.hasOwnProperty('brand:emailLogo')) {
		logo = (!meta.config['brand:emailLogo'].startsWith('http') ? nconf.get('url') : '') + meta.config['brand:emailLogo'];
	}

	const templatePath = path.join(TEMPLATES_DIR, template);
	const defaultPayload = {
		url: nconf.get('url'),
		site_title: meta.config.title || 'DeepThought',
		logo: {
			src: logo,
			height: meta.config['brand:emailLogo:height'],
			width: meta.config['brand:emailLogo:width'],
		},
	};

	if (!fs.existsSync(templatePath)) {
		throw new Error('No such template exists');
	}
	if (!recipient) {
		throw new Error('Cannot send email without recipient\'s address');
	}
	if (!subject) {
		subject = 'Notificaton from ' + defaultPayload.site_title;
	}

	const emailBody = renderTemplate(templatePath, params);

	await adapters.email.sendCompiledEmail(recipient, emailBody, subject);
}

function renderTemplate(templateSource, data={}) {
	const templateHtml = fs.readFileSync(templateSource, "utf8");

	let template = handlebars.compile(templateHtml)
	return template(data);
}