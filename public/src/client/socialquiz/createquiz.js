"use strict"; /* globals define */
define("forum/socialquiz/creator/create", ["api", "sdlms/enquiryform"], function (api) {
	var create = {};
	const BASE_URL = "/api/v3/socialquiz"
	create.init = () => {
		var add_questions = [];
		var pre_requisites = [];
		$(".back-btn").on("click", function () {
			ajaxify.go(`/socialquiz/creator/dashboard`)
		});
		let data = new EnquiryForm({
			target: '.formComponent',
			header: 'Create Quiz',
			classes: 'shadow-lg d-block',
			action: 'create', //Modes: create, answer, reader requiresValidation: true, with: {} })
			// Integrating the apis
		})
		$(".create-quiz").on("click", function () {
			let payload = data.getJSON();
			// console.log(payload);
			api.post(BASE_URL+"/socialquiz/quiz",payload)
					.then((res)=>{
						notify("Created succesfully quiz","success")
						console.log(res);
						// ajaxify.go('/scorecard/dashboard')
					})
					.catch((err)=>{console.log(err);notify("Some error encountered","error")})
			// api.post('/socialquiz/quiz', payload)
			// 	.then((s) => {
			// 		console.log(s.response)
			// 	})
			// 	.catch((err) => {
			// 		console.log(err)
			// 	})
		})
	};
	return create;


});