'use strict';


/* globals define */

define("forum/socialquiz/user/mark", ["api", "sdlms/enquiryform"], function (api) {
	var mark = {};
	mark.init = () => {

		ajaxify.refresh()
		let sessionid = ajaxify.data.sessionid;
		let uid = ajaxify.data.uid;
		if(ajaxify.data.data[0].isMarkingStarted){
			mark.isMarkingStarted()
		}
		else{
			$('.formComponent').append("<b>Wait ! Marking is not started yet.")
		}
		$('[scores]').on('submit',function(e){
			e.preventDefault()
			let payload = $(this).serializeObject()
			api.put('/socialquiz/markingslelo/'+sessionid,{payload})
			.then(res=>{
				console.log(res)
				notify("Successfully marked !","success")
				ajaxify.go('/socialquiz/user/dashboard')
			})
		})
    };

	mark.isMarkingStarted = () => {
		$("[tabheader]").off("click").on("click", ".sdlms-sessions", function () {
			$(".sdlms-sessions").removeClass("active");
			$(this).addClass("active");
			location.href = location.origin + `/${$(this).data("state")}`;
		});
		//console.log(ajaxify.data.data[0].submissions[0].answers)
		// api.get('/socialquiz/submission/:userId',{uid:uid,pid:pid}).then((res) => {
		// 	console.log(res);
		// })

		let data = new EnquiryForm({
			target: '.formComponent',
			header: 'Marking your buddy answers',
			classes: 'shadow-lg d-block',
			action: 'reader',
			with : {"title":"Please rate the answers with a reflection","blocks":ajaxify.data.answers[0].answers},
		})

		// let templates = Socialquiz.markQuiz();
	
		// $('.loadingScreen').append(templates.loadingScreen())
		// $('.markAnswer').append(templates.markCard())
	};
	
	return mark;
});
