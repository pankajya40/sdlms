'use strict';



/* globals define */

define("forum/socialquiz/user/solve", ["api","sdlms/enquiryform"], function () {
	var solve = {};
	solve.init = () => {
		let isStart = ajaxify.data.formdata[0].isStarted;
		if(isStart){
			solve.ifStarted()
		}
		else{
			$('.formComponent').append(`
			Quiz not started yet!`)
		}
    };
	solve.ifStarted = () =>{
		let sessionid = ajaxify.data.formdata[0]._id;
		$("[tabheader]").off("click").on("click", ".sdlms-sessions", function () {
			$(".sdlms-sessions").removeClass("active");
			$(this).addClass("active");
			location.href = location.origin + `/${$(this).data("state")}`;
		});

		let formData=ajaxify.data.formdata[0].quizData.quizDetail;
		let data = new EnquiryForm({
			target: '.formComponent',
			header: 'Solve Quiz',
			classes: 'shadow-lg d-block',
			action: 'answer',
			with:formData,
		})

		$(".submit-quiz").off('click').on('click',function(){
			console.log(formData)
			doAjax({
				type: "PUT",
				url: `/socialquiz/submission/${sessionid}`,
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(data.getJSON()),
			}).then((res)=>{
				console.log(res.response._id)
				notify("Submitted your answers","success")
				ajaxify.go(`socialquiz/user/mark/${res.response._id}`)
			}).catch((err) => {
                let { responseJSON } = err;
                if (responseJSON && responseJSON.status.message) {
                    translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
                }
                else return notify('Oops! Some error occured', 'error');
			})
			//ajaxify.refresh()
		})

		// let templates = Socialquiz.solveQuiz();

		// $('.loadingScreen').append(templates.loadingScreen())
		// $('.answerBox').append(templates.answerbox())

	}
	return solve;
});
