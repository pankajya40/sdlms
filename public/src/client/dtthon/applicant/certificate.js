'use strict';

/* globals define */

define('forum/dtthon/applicant/certificate', ['api', 'sdlms/reflectiveComments'], function () {
	let certificate = {};
	// if(ajaxify.data.submissionstatus !== "submitted")
	//     ajaxify.go(`dtthon/applicant/storyboard/${ajaxify.data.tid}`);

	$('.user-name')
		.html(app.user.displayname || app.user.username);

	certificate.reflectiveComments = new ReflectiveComments();
	const data = {};
	data.tid = parseInt(ajaxify.data.tid);
	data.uid = parseInt(ajaxify.data.uid);
	data.req_uid = parseInt(ajaxify.data.req_uid);

	const load = () => {
		certificate.reflectiveComments.get(data);
		$('#messages')
			.empty();
		$('textarea')
			.val('');
	};
	load();

	return certificate;
});

