'use strict';

/* globals define */

define("forum/scorecard/microDashboard", ["api","sdlms/table", "sdlms/scorecard"], function (api) {
	var dashboard = {};
	dashboard.init = () => {

		let scorecard = ajaxify.data.scorecard;
		let Template = ScorecardTemplate.scorecard();

		$("[back-btn]").on("click", function() {
            ajaxify.go("/scorecard/dashboard")
        })

		$("#pageTitle").append(`${scorecard.title}`)

		// if(scorecard.uid !== app.user.uid) {
		// $("[deletescorecard]").hide()
		// $("[activate-scorecard-btn]").attr('style','display:none !important');
		// }

		// $("[activate-scorecard-btn]").on("click", function()  {
		// 	if(scorecard.isActive) {
		// 		if(confirm(`Are you sure? Want to deactivate this Scorecard...`)) {
		// 			api.put(`/api/v3/social_scorecard/state`, {tid: scorecard.tid,state: false}).then(function () {
		// 				notify(`Scorecard Deactivated successfully`, "success");
		// 			})
		// 		}
		// 	}
		// 	else if(!scorecard.isActive) {
		// 		if(confirm(`Are you sure? Want to activate this Scorecard...`)) {
		// 			api.put(`/api/v3/social_scorecard/state`, {tid: scorecard.tid,state: true}).then(function () {
		// 				notify(`Scorecard Activated successfully`, "success");
		// 			})
		// 		}
		// 	}
		// 	ajaxify.refresh()
		// })

		// $('body').on('click','[deletescorecard]',function(){
		// 	if(scorecard.isActive) {
		// 	    notify(`You can't delete the Scorecard in Active State`,'success');
		// 		return;
		// 	}	
		// 	api.del(`/api/v3/social_scorecard/template`,{tid: scorecard.tid})
		// 	notify(`Delete Scorecard ${ scorecard.title}`,'success');
		// 	ajaxify.go('/scorecard/dashboard')
		// })

		let projectDetailsTable = new Table({
			target:'#project-details',
			columns:[
				{title:'S.No',value:'table'},
				{title:'Project Name',value:'Action'},
				{title:"Associated At",value:'end'},
			],
			formatter: formatProjectDetailsTableResponse
		})
		function formatProjectDetailsTableResponse(data, from=0){
			return data.map(function(row,index){
				return {
					attributes: {
						tid: row.tid
					},
					data: {
						Sno:`${(from + (index + 1))}`,
						projectname: row.title,
						associationdate: `${moment(row.associatedAt).format("DD MMM, YYYY")} at ${moment(row.associatedAt).format("hh:mm A")}`,
					}
				}
			})
		}
	   
		projectDetailsTable.render(`/api/v3/social_scorecard/details?tid=${scorecard.tid}`);

		$('body').on('click', '.sdlms-my-upcoming-session-table-row', function () {
			let tid = $(this).data('tid')
			ajaxify.go(`/dtthon/creator/microDashboard/${tid}`)
		})

		$('#preview-scorecard-modal').find('#scorecard-title').text(`Preview - ${scorecard.title}`)
		scorecard.attributes.map((value)=>{
			value.pagetype = "preview"
			$('#attribute-box').append(Template.creatorScorecard.emptyparameter(value))
		})
		$('body').on("click",".showdescription", function(){
			let currentId = $(this).data('description-id') 
			$(`[showmedescriptionof${currentId}]`).toggleClass('hidden')
			$(`#emptysubattribute${currentId}`).toggleClass('hidden')
		})
  };
	return dashboard;
});
