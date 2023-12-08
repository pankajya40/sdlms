"use strict";

/* globals define */

define("forum/scorecard/view", ['api', 'sdlms/scorecard', 'https://cdnjs.cloudflare.com/ajax/libs/jquery-circle-progress/1.2.2/circle-progress.min.js'], function (api) {
	var view = {};
	view.init = function () {
		// const BASE_URL = "/api/v3/apps"
		let Templates = ScorecardTemplate.scorecard();
		let Scorecard = ajaxify.data.scorecard;
		let Submission = ajaxify.data.submission;

		Scorecard.overallObservation = Submission.overallObservation || "No observation was submitted by the evaluator for this scorecard"
		$.each(Submission.attributes, function (i, attr) {
			Scorecard.attributes[i].score = attr.score || 0
			Scorecard.attributes[i].observation = attr.observation || `No observation was submitted for ${Scorecard.attributes[i].title}`
			Scorecard.attributes[i].subattributes = attr.subattributes.map(function (subattr, index) {
				return {
					...Scorecard.attributes[i].subattributes[index],
					score: subattr.score || 0,
					observation: subattr.observation || `No observation was submitted for ${subattr.title}`
				}
			});
		});

		let sideBtn = Scorecard.attributes.map((attribute) => {
			return Templates.viewScorecard.tabContent(attribute)
		}).join('');
		let tabContent = Scorecard.attributes.map((attribute) => {
			return Templates.viewScorecard.tabContentHolder(attribute)
		}).join('');
		let finalObervationItems = Scorecard.attributes.map((attribute) => {
			return Templates.viewScorecard.finalObservationItem(attribute)
		}).join('');

		$('#tab-box').append(sideBtn);
		$('.tab-content').append(tabContent);
		$('#observation-details').append(finalObervationItems);
	//	$('.newobs').append(Templates.viewScorecard.newoverall(Scorecard));

		$('body').on('click','.view_details_button',function(){
			let current  = $(this).data('target')
				$(`[data-target="${current}"]`).trigger('click');
				console.log(current);
				$(`[data-target="#tab-default"]`).removeClass("active");
		})
		console.log(Scorecard);

		// Overall score calculation
		let maxSubScore;
		let overallMaxScore = 0;
		let sum = 0;

		let options = {
			startAngle: -1.55,
			size: 150,
			value: 0,
			fill: "#0029FF"
		}

		function findMaxRating(ratings) {
			let maxRating = parseInt(ratings[0].rating) || 0
			for(let i = 1; i < ratings.length; i++) {
				let currentRating = parseInt(ratings[i].rating)
				if(currentRating && currentRating > maxRating) {
					maxRating = currentRating
				}
			}
			return maxRating
		}

		//  Scores of attributes for final observation
		Scorecard.attributes.forEach(function(attr) {
			maxSubScore = 0;

			attr.subattributes.forEach(function(subattr) {
				let maxRating = findMaxRating(subattr.ratings);
				maxSubScore += maxRating
				// maxSubScore += parseInt(subattr.ratings[subattr.ratings.length - 1].rating);
			});

			$(`#total-sub-score-${attr.attributeId}`).text(maxSubScore);

			if(maxSubScore == 0) {
				options.value = (attr.score/1)
			} else {
				options.value = (attr.score/maxSubScore);
			}
			// console.log(options);
			$(`#score-wrapper-${attr.attributeId}`).circleProgress(options);

			sum += attr.score;
			overallMaxScore += maxSubScore;
		});

		// Overall Score
		$('#final-score-wrapper').circleProgress(
			{startAngle: -1.55,
			size: 150,
			value: sum/overallMaxScore,
			fill: "#0029FF"});
			
			$('#overall-score').text(`${sum}/`);
			$('#overall-max-score').text(overallMaxScore);

			// if(`${Scorecard.overallObservation}`) {
				$(".final-observation-text").text(`${Scorecard.overallObservation}`)
			// } else {
				// $("#final-observation-text").text("No observation was submitted by the evaluator for the overall scorecard")
			// }
		// console.log(overallMaxScore);
		// console.log(sum);
		// console.log(sum/overallMaxScore);
		
		// scorecard.forEach((elem, index) => {
		// 	let submissionAttr = submission[index];
		// 	let submission_subattributes = submissionAttr.subattributes;
		// 	let scorecard_subattributes = elem.subattributes;

		// 	scorecard_subattributes.forEach((item, i) => {
		// 		let s_obs = item.ratings;
		// 		let sub_obs = submission_subattributes[i]['observation'];


		// 		console.log(s_obs, sub_obs);
		// 	});
		// });

		// Old logic for final score evaluation
		// const numberOfAttributes = Scorecard.attributes.length;
		// let numberOfSubattributes;
		// let attributeScore = [];
		// let overallScore = 0;
		// let maxSubScore = 0;
		// let maxOverallScore = 0;
		// Scorecard.attributes.forEach(function(attr) {
		// 	numberOfSubattributes = attr.subattributes.length;
			// let maxSubScore = 0;
		// 	console.log(attributeScore);
		// 	attr.subattributes.forEach(function(subattr) {
		// 		maxSubScore += parseInt((subattr.ratings[subattr.ratings.length - 1]).rating);
		// 	});
		// 	if(numberOfSubattributes > 0) {
		// 		attributeScore.push(attr.score / numberOfSubattributes);
		// 		maxSubScore /= numberOfSubattributes;
		// 	} else {
		// 		attributeScore.push(attr.score);
		// 	}
		// 	console.log(maxSubScore);
		// 	maxOverallScore += maxSubScore;
		// });
		// maxOverallScore /= numberOfAttributes;
		// console.log(maxOverallScore);
		// attributeScore.forEach(score => {
		// 	overallScore += score;
		// });
		// maxOverallScore = maxOverallScore.toFixed(2);
		// console.log(overallScore);
		// console.log(numberOfAttributes);
		// overallScore = overallScore / numberOfAttributes;
		// console.log(overallScore);
	};
	return view;
});