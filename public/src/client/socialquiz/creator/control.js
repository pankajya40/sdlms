'use strict';

/* globals define */

define('forum/socialquiz/creator/control', ['api'], function (api) {
	var control = {};
	control.init = () => {
		$('.back-btn').on('click', function () {
		    ajaxify.go(`/socialquiz/creator/dashboard`);
		});

		let sessionid=ajaxify.data.quizdetail._id;
		let participants = ajaxify.data.quizdetail.participants;
		$("#start-quiz").on("click", function(){
		api.put('/socialquiz/start/'+sessionid,{}).then((res) => {
			
			notify('Quiz session started','success')
			console.log(res);
		})
	    })

		$("#end-quiz").on("click", function(){
			api.put('/socialquiz/end/'+sessionid,{}).then((res) => {
				notify('Quiz session stopped','success')
				console.log(res);
			})
		})

		$("#start-marking").on("click", function(){
			api.put('/socialquiz/mark/'+sessionid,{}).then((res) => {
				console.log(res);
			})
			control.setEvaluators(participants,sessionid)
		})

		$("#end-marking").on("click", function(){
			api.put('/socialquiz/endmarking/'+sessionid,{}).then((res) => {
				console.log(res);
			})
		})


	
		// api.get('/socialquiz/publish',{}).then((res) => {
		// 	console.log(res);
		// });
		
	};

	control.setEvaluators = (participants,id) => {
		function settingEvals(people)  {
			let evals = []
			// if(people.length>2)
			for(let i=0;i<people.length-1;i++){
				evals.push({"answerer":people[i],"evaluator":people[i+1]})
			}
			

			evals.push({ "answerer": people[people.length - 1], "evaluator": people[0] })

			return evals
		}
		let data = settingEvals(participants)
		console.log(data)
		api.put('/socialquiz/setEvaluators/'+id, {data})
		.then(res=>console.log(res))
		.catch(err => console.log(err))

		console.log(settingEvals(participants))
	}
	return control;
});
