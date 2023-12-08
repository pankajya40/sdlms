'use strict';



/* globals define */

define("forum/socialquiz/creator/create", ["api", "sdlms/enquiryform"], function (api) {
	var create = {};
	create.init = () => {
		var add_questions = [];
		var pre_requisites = [];
		var quiz = ajaxify.data.quiz
		$(".back-btn").on("click", function () {
			ajaxify.go(`/socialquiz/creator/dashboard`)
		});

		
		
		// console.log(quiz)

		let data = new EnquiryForm(
			create.konsamodechiye(quiz.status, quiz.quizDetail)  //which mode do you want ?
		)

		// Integrating the apis
		// $(".create-quiz").on("click", function(){
		// 	let payload = data.getJSON();
		// 	console.log(payload);
		// 	api.post('/socialquiz/quiz', payload)
		// 	.then((data) =>{
		// 		console.log(data)
		// 	}).catch((err)=>{
		// 		console.log(err)
		// 	})
		// })

		$("#publish-quiz").on("click",function(){
			ajaxify.go(`socialquiz/creator/dashboard`)

			doAjax({
				type: "PUT",
				url: "/socialquiz/publish",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(quiz)
			}).then((res)=>{
				console.log(res)
			}).catch((err) => {
                let { responseJSON } = err;
                if (responseJSON && responseJSON.status.message) {
                    translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
                }
                else return notify('Oops! Some error occured', 'error');
			})
		})

		$("#save-draft-quiz").on("click",function(){
			let payload = {}
			payload.pid = ajaxify.data.quiz.pid;
			payload.uid = ajaxify.data.quiz.uid;
			payload.blocks = data.getJSON()
			console.log(payload)
			ajaxify.go(`socialquiz/creator/dashboard`)
			
			// api.put("/socialquiz/quiz",JSON.stringify(payload))
			// .then(res => notify("Saved","success"))
			// .catch(err => notify(err,"error"))

			doAjax({
				type: "PUT",
				url: "/socialquiz/quiz",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(payload)
			}).then((res)=>{
				console.log(res)
			}).catch((err) => {
                let { responseJSON } = err;
                if (responseJSON && responseJSON.status.message) {
                    translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
                }
                else return notify('Oops! Some error occured', 'error');
            });
		})
		$("#delete-quiz").off("click").on("click", function () {
			api.del("/socialquiz/quiz", { pid: ajaxify.data.quiz.pid, uid: ajaxify.data.quiz.uid })
				.then((res) => { notify("Deleted successfully", "success"); ajaxify.go("socialquiz/creator/dashboard") })
				.catch(err => notify("Could not delete", "error"))
		})
	};

	create.konsamodechiye = (status, quiz) => {
		let mode = {}
		if (status == "draft") {
			mode.target = ".formComponent";
			mode.header = "Create Quiz";
			mode.classes = "shadow-lg d-block";
			mode.action = "create";
			mode.requiresValidation = true;
			mode.with = quiz

		}
		else if (status == "published") {
			mode.target = ".formComponent";
			mode.header = "Preview Quiz";
			mode.classes = "shadow-lg d-block";
			mode.action = "reader";
			mode.requiresValidation = true;
			mode.with = quiz
		}
		return mode;
	}


	return create;


});
