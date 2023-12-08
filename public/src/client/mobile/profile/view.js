'use strict';

/* globals define */

define('forum/mobile/profile/view', ['api'], function (api) {
	var view = {};

	let { user } = ajaxify.data;

	view.init = function () {
		$('body').find('#profilePicture').attr('src', `${user.picture || user.uploadedpicture}`);

		$('body').on('click', '[data-post-pid]', function () {
			ajaxify.go(`/mobile/post/view?pid=${$(this).data('post-pid')}`);
		});

		$('body').on('click', '#navigation-to-editpage', function () {
			ajaxify.go('/mobile/profile/edit');
		});
	};

	return view;
});
