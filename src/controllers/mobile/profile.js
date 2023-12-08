const user = require('../../user');
const db = require('../../database');
const utilities = require('../../controllers/utils');
const axios = require('axios');

const profileController = module.exports;

const fields = [
	'uid',
	'username',
	'fullname',
	'userslug',
	'picture',
	'status',
	'assetsCount',
	'classes_attended',
	'signature',
	'aboutme',
	'birthday',
	'website',
	'location',
	'pronoun',
	'social_designation',
];

const preferredPronouns = [
	'He / Him',
	'She / Her',
	'They / Them',
	'Don\'t share'
];


profileController.getEdit = async function (req, res, next) {
	const profileEditPage = {};

	var userProfile = await user.getUsersFields([req.uid], fields);
	userProfile = userProfile.length ? userProfile[0] : {};

	let countries = await db.findField(db.collections.DEFAULT, {_key: 'rest:countries'});

	if (!countries) {
		const { data } = await axios.get('https://restcountries.com/v3.1/all');
		await db.setField(db.collections.DEFAULT, { _key: 'rest:countries', data })
		countries = data;
	} else {
		countries = countries['data'];
	}

	profileEditPage.title ='Editing "' + (userProfile.fullname || userProfile.username) + '"';
	profileEditPage.user = userProfile;
	profileEditPage.countries = countries;
	profileEditPage.preferredPronouns = preferredPronouns;


	res.render('mobile/profile/edit', profileEditPage);
};

profileController.getView = async function (req, res, next) {
	const uid = parseInt(req.uid);
	const MAX_CHARS_PER_POST = 200;

	if (!req.uid || uid < 1) {
		res.redirect('/');
	}
	var [userProfile, posts] = await Promise.all([
		user.getUsersFields([req.uid], fields),
		db.getFieldsWithPagination(db.collections.DEFAULT,
			{ uid, type: 'post', pid: {$exists: true}, comment_count: {$exists: true} }, 5, 0, {comment_count: -1})
	]);
	let bestPosts = [];
	if (!userProfile.length) {
		throw new Error('This user profile not found');
	}
	userProfile = userProfile[0];

	if (posts.length) {
		bestPosts = posts.map((elem) => {
			let content;
			if (elem.content) {
				// return {...elem, content: elem.content.substring(0, MAX_CHARS_PER_POST)};
				if (Array.isArray(elem.content) && elem.content.length) {
					content = elem.content[0];
				} else {
					content = elem.content;
				}
		
				content = utilities.htmltoText(content);
				if (content) {
					content = content.substring(0, MAX_CHARS_PER_POST).replace("\n", "")
				}
				return { ...elem, content}
			} return elem;
		})
	}

	res.render('mobile/profile/view', {
		title: (userProfile.fullname || userProfile.username),
		user: userProfile,
		bestPosts
	});
};
