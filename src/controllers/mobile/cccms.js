const cccms = module.exports;

cccms.companyexplore = async function (req, res, next) {
	res.render('mobile/cccms/explore/company', {
		title: 'Company-Explore',
	});
};

cccms.studentexplore = async function (req, res, next) {
	res.render('mobile/cccms/explore/student', {
		title: 'Student-Explore',
	});
};

cccms.companypitchsend = async function (req, res, next) {
	res.render('mobile/cccms/pitch/company/send', {
		title: 'Company-Pitch-Send',
	});
};

cccms.companypitchview = async function (req, res, next) {
	res.render('mobile/cccms/pitch/company/view', {
		title: 'Company-Pitch-View',
	});
};

cccms.studentpitchsend = async function (req, res, next) {
	res.render('mobile/cccms/pitch/student/send', {
		title: 'Student-Pitch-Send',
	});
};

cccms.studentpitchview = async function (req, res, next) {
	res.render('mobile/cccms/pitch/student/view', {
		title: 'Student-Pitch-View',
	});
};

cccms.pitchfeed = async function (req, res, next) {
	res.render('mobile/cccms/pitch/feed', {
		title: 'Pitch-Feed',
	});
};

cccms.leaderboard = async function (req, res, next) {
	res.render('mobile/cccms/leaderboard', {
		title: 'Leaderboard',
	});
};

cccms.collaboration = async function (req, res, next) {
	res.render('mobile/cccms/collaboration', {
		title: 'Collaboration',
	});
};




