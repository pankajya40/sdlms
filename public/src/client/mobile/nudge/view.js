'use strict';

/* globals define */

define('forum/mobile/nudge/view', ["api"],  function (api) {
	var view = {};

	view.init = function () {

		api.get(`/app/nudge`, {}).then((res) => {
			console.log(res);
		})
	};

	return view;
});
