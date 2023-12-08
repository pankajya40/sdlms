'use strict';

/* globals define */

define('forum/mobile/setting/index', function () {
	var index = {};

	index.init = function () {
		$("#account-settings").on(
			"click",
			() => {
				notify("Opening Account settings", "success");
				ajaxify.go("/mobile/setting/account")
			});

		$('#app-loader').hide();
	};

	return index;
});
