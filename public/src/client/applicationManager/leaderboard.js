"use strict";

/* globals define */

define("forum/applicationManager/leaderboard", ["api", "sdlms/table"],function (api) {
	var leaderboard = {};
	leaderboard.init = () => {

		let applicantsTable = new Table({
			target:'#applicants-detail',
			columns:[
				{title: "S.No",value:'table'},
				{title: "Applicant Name",value:'end'},
				{title: 'Feedback',value:'Action'},
			],
			emptyMessage :  `Zero applicants `,
				formatter: formatApplicantsTable
		})
		function formatApplicantsTable(data, from=0){
			return data.map(function(row,index){
				return {
					attributes: {
						id: row._id,
					},
					data: {
						Sno: `${(from + (index + 1))}`,
						name: row.name,
						feedback: `${row.feedback ? row.feedback.remark : "--"}`
					}
					}
				})
		}
		
		applicantsTable.render(`/application_manager/leaderboard/${ajaxify.data.projectId}?limit=10`);

	};

	return leaderboard;
});

