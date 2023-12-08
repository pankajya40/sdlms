
"use strict";

/* globals define */

define("forum/scorecard/evaluate", ['api', 'sdlms/scorecard'], function (api) {
	var evaluate = {};
	evaluate.init = () => {
		 const BASE_URL = "/api/v3/apps"
		let Template = ScorecardTemplate.scorecard();
		let SCORE_CARD_DATA = ajaxify.data.scorecard || {};
		let SUBMISSION_DATA = ajaxify.data.submission;
		console.log(SUBMISSION_DATA);

		// api.get(`/api/v3/apps/scorecard/view?=${ajaxify.data.projectID}&uid=${ajaxify.data.uid}`,{})
		// .then((res)=>{console.log(res)})
		// .catch((error)=>{console.log(error)})
		$('#pageTitle').append(`<p> Evaluate Scorecard - ${SCORE_CARD_DATA.title} for ${ajaxify.data.projectTitle} </p>`);
		SCORE_CARD_DATA.attributes.map((value)=>{
			value.pagetype = "evaluate"
			$('#attributecontainer').append(Template.creatorScorecard.emptyparameter(value))
		})
		
		$("[back-btn]").on("click", function () {
			ajaxify.go(ajaxify.go(`/dtthon/creator/microDashboard/${ajaxify.data.projectID}`))
		})
		// let autosaveOn = false;
		// function saveSubattributeData(attributeId, currentId) {
		// 	let projectid = ajaxify.data.projectID
		// 	let checked = $("body").find(`#emptysubattribute${currentId}`).find("[type='radio']:checked")
		// 	let rating = parseInt($(`#rating-${checked.data("id")}`).text())
		// 	let observation = $('body').find(`[observationforsubattribute${currentId}]`).val()
		// 	if(checked) {
		// 		let data = {
		// 			tid : Number(projectid),
		// 			uid : Number(ajaxify.data.uid),
		// 			attributeId : Number(attributeId),
		// 			subattributeId : Number(currentId),
		// 			score : String(rating),
		// 			observation: observation
		// 		}
		// 	}
		// 	if(observation) {
		// 		let data = {
		// 			tid : Number(projectid),
		// 			uid : Number(ajaxify.data.uid),
		// 			attributeId : Number(attributeId),
		// 			subattributeId : Number(currentId),
		// 			observation: observation
		// 		}
		// 	}
		// 	api.put(BASE_URL+"/scorecard/score/subattribute",data)
		// 	.then((res)=>{
				// notify("Submitted successully","success")
		// 		console.log("saved!");
		// 	})
		// 	.catch((error)=>{notify(error,"error")})
		// }

		// Auto-save score and observation
		let projectid = ajaxify.data.projectID
		let timeout = 3000;
		let timeoutId;
		$('.observation').on('keyup', function() {
			clearInterval(timeoutId)
			let attributeId = $(this).data("attribute-id")
			let currentId = $(this).data("subattribute-id")
			let observation = $('body').find(`[observationforsubattribute${currentId}]`).val()
			let checked = $("body").find(`#emptysubattribute${currentId}`).find("[type='radio']:checked")
			let rating = parseInt($(`#rating-${checked.data("id")}`).text())
			timeoutId = setTimeout(() => {
				let data = {
					tid : Number(projectid),
					uid : Number(ajaxify.data.uid),
					attributeId : Number(attributeId),
					subattributeId : Number(currentId),
					observation: observation,
					score: String(rating)
					}
				api.put(BASE_URL+"/scorecard/score/subattribute",data)
			}, timeout)
		})

		$(".radio-btn").on("click", function() {
			console.log("clicked!")
			let attributeId = $(this).data("attribute-id")
			let currentId = $(this).data("subattribute-id")
			let checked = $("body").find(`#emptysubattribute${currentId}`).find("[type='radio']:checked")
			let rating = parseInt($(`#rating-${checked.data("id")}`).text())
			let observation = $('body').find(`[observationforsubattribute${currentId}]`).val()
			let data = {
				tid : Number(projectid),
				uid : Number(ajaxify.data.uid),
				attributeId : Number(attributeId),
				subattributeId : Number(currentId),
				score : String(rating),
				observation: observation
			}
			api.put(BASE_URL+"/scorecard/score/subattribute",data)
		})

		// when the page loads check if any observation & score is saved and display it
		$(function() {
			SUBMISSION_DATA.attributes.forEach(function(attr) {
				if(attr.observation) {
					$(`[overallobservationattribute${attr.attributeId}]`).val(attr.observation)
				}
				attr.subattributes.forEach(function(subattr) {
					if(subattr.observation) {
						$('body').find(`[observationforsubattribute${subattr.subattributeId}]`).val(subattr.observation)
					}
					$(`#emptysubattribute${subattr.subattributeId}`).find('.radio-btn').each(function() {
						let currentRadioBtn= $(this)
						let currentId = currentRadioBtn.data('id')
						let currentRating = parseInt($(`#rating-${currentId}`).text())
						if(currentRating === subattr.score) {
						currentRadioBtn.prop('checked', true)
						}
					})
				})
			})
		})

		// old logic to save sub-attribute score & observation
		// $("[submitevaluationsubattribute]").on("click",function(){
		// 	let projectid = ajaxify.data.projectID
		// 	let attributeId = $(this).data("attribute-id")
		// 	let currentId = $(this).data("subattribute-id")
		// 	let checked = $("body").find(`#emptysubattribute${currentId}`).find("[type='radio']:checked")
		// 	console.log(checked)
		// 	let rating = parseInt($(`#rating-${checked.data("id")}`).text())
		// 	let observation = $('body').find(`[observationforsubattribute${currentId}]`).val()
		// 	let data = {
		// 		tid : Number(projectid),
		// 		uid : Number(ajaxify.data.uid),
		// 		attributeId : Number(attributeId),
		// 		subattributeId : Number(currentId),
		// 		score : String(rating),
		// 		observation : observation
		// 	}
		// 	if(checked){api.put(BASE_URL+"/scorecard/score/subattribute",data)
		// 	.then((res)=>{notify("Submitted successully","success")})
		// 	.catch((error)=>{notify(error,"error")})}	
		// 	else{
		// 		notify("Not checked anything","error")
		// 	}	
		// })
		
		function calculatescore(id){
			let sum = 0;
			console.log(id)
			$('body').find(`#emptyparameter${id}`).find('li').each(
				function(){
					let check  = $(this).find("[type='radio']:checked");
                    console.log(check)
                    let rating = parseInt($(`#rating-${check.data("id")}`).text())
					sum = sum +( isNaN(rating) ? 0 : rating)
				}
			)
			return sum
		}


		$(`[evaluateattribute]`).on('click',function(){
			let currentid = $(this).data("attribute-id")
			let projectid = ajaxify.data.projectID
			let overallObservation = $('body').find(`[overallobservationattribute${currentid}]`).val()
			//let overallscore = calculatescore(currentid)
			let data = {
				tid : Number(projectid),
				uid : Number(ajaxify.data.uid),
				attributeId : currentid,
				score : calculatescore(currentid),
				observation : overallObservation
			}
			console.log(data)
			api.put(BASE_URL+"/scorecard/score/attribute",data)
			.then((res)=>{notify("Submitted successfully","success")})
			.catch((error)=>{notify(error,"error")})
		})

		$("[publishscore]").on("click",function(){ 
			let overallObservation = $("#overall-observation").val()
			console.log(overallObservation)
			if(overallObservation){
				if(confirm("You can't edit after publishing. Are you sure?")){
					api.put(BASE_URL+"/scorecard/score/publish",{tid:ajaxify.data.projectID,uid:ajaxify.data.uid,overallObservation:overallObservation})
					.then((res)=>{notify("Scores published !","success");
					if(window == window.parent) {
						ajaxify.go(`/dtthon/applicant/storyboard/${ajaxify.data.projectID}`)
					} else {
						window.parent.location.reload()
					}
						// ajaxify.go(`dtthon/scorecard/view/${ajaxify.data.projectID}/user/${ajaxify.data.uid}`);
				})
					.catch((error)=>{notify(error,"error")})	
				}
			}
			else{
				notify("Please write an overall observation for scorecard")
			}
			
		})


		$('body').on('click', '[btn-parameter]', function () {
			let overAllObservation = $('overallObservationData').val(); // FOR OverAll observation input data
			require(['api'], function (api) {
				api.put(`/apps/scorecard/score/attribute`, {
					overallObservation: overAllObservation,
				}).then(function (res) {
					notify('Task updated Successfully', 'success');
				}).catch((error) => {
					notify(error.message, "error");
				});
			});
		});
		$('body').on('click','.showdescription',function(){
			let currentId = $(this).data('description-id') 
			// toggleDescription(currentId);
			$(`[showmedescriptionof${currentId}]`).toggleClass('hidden')
			$(`#emptysubattribute${currentId}`).toggleClass('hidden')
		})
	};

	return evaluate;
});
