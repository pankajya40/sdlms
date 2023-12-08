"use strict";

/* globals define */

define("forum/socialquiz/user/view", ["api", "sdlms/socialquiz"], function () {
	var view = {};
	view.init = () => {
		$(".back-btn").on("click", function () {
			ajaxify.go(`/socialquiz/user/dashboard`)
		});
		let templates = Socialquiz.viewQuiz();

		$('#socialquizQuestion').append(templates.question())
		$('.viewResponse').append(templates.responseCard())
	};
	return view;
    
});