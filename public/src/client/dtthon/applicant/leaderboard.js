'use strict';

/* globals define */

define('forum/dtthon/applicant/leaderboard',["sdlms/table"], function () {
var leaderboard ={};
leaderboard.init = function(){
    console.log("YEY!!! page build successfully")
		const close = $('.closePage');
		const showPopup = $("#showPopup");
		const how = $('.how-btn')

		close.on('click',function (){
			showPopup.removeClass("show");
			$('.header, .tabble').removeClass("blur");
		});

		how.on('click',function (){
			$('.header, .tabble').addClass("blur");
			showPopup.addClass("show");
		});


		let combinedProjectScTable = new Table({
			target:'#show-data',
			columns:[
					{title: "S.No",value:'table'},
					{title: "Applicant's Name",value:'end'},
					{title: "Event Status", value: 'end'},
					{title: 'Date of Application',value:'Action'},
					{title: 'Event Information',value:'Action'},
					{title: "Evaluation Status",value:'end'},
					{title: 'Date of Evaluation',value:'Action'},
					{title: 'Evaluation Information',value:'Action'},
			],
			emptyMessage :  `Responses are still coming because it is so early in your ${project.category}. Make a small amount of noise online or by calling a few individuals to collaborate for submission of your ${project.category}.`,
					formatter: formatCombinedTableResponse
	})

	combinedProjectScTable.render(`/apps/project/${project.tid}/applicants?limit=10`)
  }
	function formatCombinedTableResponse(data, from=0) {
		console.log(data)
		return data.map(function(row,index){
				return {
						attributes: {
								uid: row.uid,
								tid: row.tid,
								status: row.evalStatus,
								projectStatus: row.status,
								evaluator: row.evaluator
						},
						data: {
								Sno: `${(from + (index + 1))}`,
								username: row.user.displayname,
								applicantStatus: row.status,
								applicantDate: `${moment(row.createdAt).format("DD MMM, YYYY")} at ${moment(row.createdAt).format("hh:mm A")}`,
								applicantInfo: `${row.status=="Submitted" ? `Submitted on ${moment(row.submission_time).format("DD MMM, YYYY")} at ${moment(row.submission_time).format("hh:mm A")}` : `${row.completed_tasks} out of ${row.total_tasks} tasks submitted`}`,
								evalStatus: `${row.evalStatus.charAt(0).toUpperCase() + row.evalStatus.slice(1)}`,
								evalDate: `${row.score_start_time ? (`${moment(row.score_start_time).format("DD MMM, YYYY")} at ${moment(row.score_start_time).format("hh:mm A")}`) : "--"}`,
								evalInfo: `${row.evalStatus=="not_started" ? "--" : (row.evalStatus=="evaluating" ? (`${row.isScored ? row.isScored : "0"} out of ${row.totalAttributes} parameters evaluated`) : (`Evaluated on ${moment(row.score_publish_time).format("DD MMM, YYYY")} at ${moment(row.score_publish_time).format("hh:mm A")}`))}`
						}
				}
		})
}

  return leaderboard;
});
