"use strict";

/* globals define */

define("forum/applicationManager/admin/application", ["api", "sdlms/table"], function (api) {
	var application = {};
	application.init = () => {

        let applicantsTable = new Table({
			target:'#application-detail',
			columns:[
                {title:'Select', value:"table"},
                {title:'S.No', value:"serial-number"},
                {title:'Applicant Name', value:"applicant-name"},
                {title:"Applied on", value:"applied-date"},
                {title:"Score", value:"score"},
                {title:"Remark", value:"remark"}
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
                        check: `${row.feedback ? `<i class="fa fa-check-circle" aria-hidden="true" style="color: green; font-size: large;"></i>` : `<input data-id="${row._id}" was-shortlisted="0" type="checkbox" name="confirm" class="w-100 explore-checkbox" style="height:15px;">`}`,
                        sno: `${(from + (index + 1))}`,
                        applicant: row.name,
                        applied: `${moment(row.createdAt).format("DD MMM, YYYY")} at ${moment(row.appliedAt).format("hh:mm A")}`,
                        score: `${row.feedback ? row.feedback.scale : "--"}`,
                        remark:  `${row.feedback ? row.feedback.remark : "--"}` 
                    }
					}
				})
		}		
		applicantsTable.render(`/application_manager/leaderboard/${ajaxify.data.projectId}?limit=10`);

        $(".score").on('click', function() {
            let checked = $('input[name="confirm"]:checked');
            let ids = checked.map((i, el) => {
                return {
                    ...$(el).data(),
                    feedbackId:$(this).data('id')
                }
            }).get();
            $.each(ids, function(i, el) {
                let data = {
                    feedbackId : el.feedbackId
                }
                api.put(`/application_manager/application/${el.id}`,data).then((res)=> {
				    notify('Feedback Posted', 'success');
		            ajaxify.refresh();
			   })
            })
        })
        $("#back-btn").on('click', function() {
            ajaxify.go("/application/project")
        })
        $("#assignment").on('click', function() {
            ajaxify.go(`/application/leaderboard/${ajaxify.data.projectId}`)
        })
	};

	return application;
});