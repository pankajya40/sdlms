"use strict";

/* globals define */

define("forum/dtthon/creator/microDashboard", ["api", "sdlms/table", "sdlms/scorecard", "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.full.js"], function (api) {
	var dashboard = {};
	dashboard.init = () => {

        let project = ajaxify.data.project;
        let isProjectOwner = ajaxify.data.isProjectOwner;
        let emptyMessage;

        let ScTemplate = ScorecardTemplate.scorecard();
        let scorecard = ajaxify.data.scorecard;

        $("[back-btn]").on("click", function() {
            ajaxify.go("/dtthon/creator/dashboard")
        })
        $("[allowpeopledtthon]").on("click",function(){
            let allowedTids = $("#selectAllowedUsers").val();
            console.log(allowedTids)
           api.put(`/apps/makeItPrivate/${ajaxify.data.project.tid}`,allowedTids)
           .then(res=>{console.log(res)
            ajaxify.refresh()
            notify(`${ajaxify.data.project.title} is now Private`,'success')
            })
           .catch(err=>{
            console.log(err)
            notify('Something went wrong !',"error")
            })
        })

        $("#makeProjectPublic").on('click',function(){
            api.put(`/apps/makeItPublic/${ajaxify.data.project.tid}`,{})
            .then(res=>{
                notify(`${ajaxify.data.project.title} is now Public`,'success')
                ajaxify.refresh()
            })
            .catch(err => notify('Sorry request not successfull !','error'))
        })
        $("#pageTitle").append(`${project.title}`)

        $("[deleteproject]").off("click").on("click", function () {
            var data = {tid:project.tid}
			api.del(`/apps/project`, data).then(function(res) {}).catch((error) => {
				notify(error.message, "error");
			});
            ajaxify.go("/dtthon/creator/dashboard")
        });

        $("#selectAllowedUsers").select2({
            containerCssClass: "custom-container shads-light",
            dropdownCssClass: "custom-dropdown shads-light",
			placeholder: "Click me to select options",
            ajax: {
				url: '/api/users',
				dataType: 'json',
				data: function (params) {
					var query = {
						query: params.term
					}
					return query;
				},
				processResults: function (data) {
					let results = {
						results: data.users.map(function (row) {
							return {
								id: row.uid,
								text: row.displayname || row.fullname || row.username
							}
						})
					};
	
					return results;
				}
			}
		})

        $('[scorecards-select]').select2({
            containerCssClass: "custom-container shads-light",
            dropdownCssClass: "custom-dropdown shads-light",
            placeholder: "Choose Scorecard to be Associated...",
                ajax: {
                    url: '/api/v3/social_scorecard/scorecards?limit=10',
                    dataType: 'json',
                    data: function (params) {
                        console.log(params.term)
                        var query = {
                            title: params.term,
                            status: "published"
                        }
                        return query;
                    }, 
                    processResults: function (data) {
                        return {
                            results: data.response.data.map((item,index)=>{
                                $("[associate-scorecard]").removeAttr('disabled');
                                return {
                                    id:item.tid,
                                    text:item.title
                                }
                            })
                        };
                    }
                }
        });

        $("[associate-scorecard]").on("click", function () {
            let scorecardId = $('[scorecards-select]').val()
            api.put("/api/v3/apps/scorecard/assign",{scorecardId: scorecardId,tid: project.tid}).then(function () {
                notify(`Scorecard is assign to your ${project.category}`, "success");
                $("[activate-project-btn]").removeAttr('disabled');
            })
            ajaxify.refresh();
        })

        $(".share-project-url").on("click", function () {
            app.copyText(location.origin + '/dtthon/applicant/profile/' + project.tid);
        });
		$(".clone-project").on("click", function () {
			ajaxify.go(`/dtthon/creator/profile/${project.tid}?clone=1`);
        });
        $("[noticeboard]").on("click", function() {
            ajaxify.go(`/dtthon/creator/storyboard/${project.tid}/notice`);
        })
        
        $("[storyboard]").on("click", function() {
            location.href = `/dtthon/applicant/profile/${project.tid}`;
        })
        $("[faq]").on("click", function() {
           location.href = `/dtthon/creator/faq/${project.tid}`;
        })
        $("[reflection]").on("click", function() {
            location.href = `/dtthon/creator/reflection/${project.tid}`;
        })
        $("[flip-button]").on("click", function() {
            $('#applicants-detail').toggle()
            $('[applicant-detail-heading]').toggle()
            $('#scorecard-detail').toggle()
            $('[scorecard-detail-heading]').toggle()
        })        
        $("[activate-project-btn]").on("click", function()  {
            if(project.isActive) {
                if(confirm(`Are you sure? Want to deactivate ${project.category}...`)) {
                    api.put(`/apps/project`, {tid: project.tid,isActive: false,}).then(function () {
                        notify(`${project.category} Deactivated successfully`, "success");
                    })
                }
            }
            else if(!project.isActive) {
                if(confirm(`Are you sure? Want to activate ${project.category}...`)) {
                    api.put(`/apps/project`, {tid: project.tid,isActive: true,}).then(function () {
                        notify(`${project.category} Activated successfully`, "success");
                    })
                }
            }
            ajaxify.refresh()
        })

        //combined table of project and scorecard for event type process when a scorecard is associated
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

        if(project.category == "Event" && project.scorecardId) {
            let combinedProjectScTable = new Table({
                target:'#applicants-detail',
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
        } else if(project.category == "Event" && !project.scorecardId) {
            $("#applicants-detail").append(`<p class="d-flex justify-content-center sdlms-text-black-18px sdlms-font-weight-bold">Responses will start coming in once you associate a scorecard with your event.
            </p>`)
        } else {
            let applicantTable = new Table({
                target:'#applicants-detail',
                columns:[
                    {title:'S.No',value:'table'},
                    {title:'Applicant Name',value:'end'},
                    {title:"Applicant's Project Status",value:'end'},
                    {title:'Date of Application',value:'Action'},
                    {title:'Additional Information',value:'Action'},
                ],
                emptyMessage : `Responses are still coming because it is so early in your ${project.category}. Make a small amount of noise online or by calling a few individuals to collaborate for submission of your ${project.category}.`,
                    formatter: formatApplicantTableResponse
            })
            function formatApplicantTableResponse(data, from=0){
                return data.map(function(row,index){
                    return {
                        attributes: {
                            uid: row.uid,
                            tid: row.tid,
                            status: row.status,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            username: row.user.displayname,
                            applicantstatus: row.status,
                            date: `${moment(row.createdAt).format("DD MMM, YYYY")} at ${moment(row.createdAt).format("hh:mm A")}`,
                            info: `${row.status=="Submitted" ? `Submitted on ${moment(row.submission_time).format("DD MMM, YYYY")} at ${moment(row.submission_time).format("hh:mm A")}` : `${row.completed_tasks} out of ${row.total_tasks} tasks submitted`}`
                        }
                        }
                    })
            }
            
            applicantTable.render(`/apps/project/${project.tid}/applicants?limit=10`);

            if(isProjectOwner) {
                emptyMessage = `Scorecard to your ${project.category} is not associated yet. To get evaluation information and to evaluate the submission in accordance with the ${project.category}, associate one scorecard.`;
            }
            else {
                emptyMessage = `Unfortunately, this ${project.category} has no scoring and no scorecard is accessible. Once the score card is connected to this ${project.category}, you can start scoring.`;    
            }

            let scorecardTable = new Table({
                target:'#scorecard-detail',
                columns:[
                    {title:'S.No',value:'table'},
                    {title:'Applicant Name',value:'end'},
                    {title:"Applicant's Evaluation Status",value:'end'},
                    {title:'Date of Evaluation',value:'Action'},
                    {title:'Additional Information',value:'Action'},
                ],
                emptyMessage : emptyMessage,
                    formatter: formatScorecardTableResponse
                })

            function formatScorecardTableResponse(data, from=0) {
                return data.map(function(row,index){
                    return {
                        attributes: {
                            uid: row.userData.uid,
                            tid: row.tid,
                            status: row.evalStatus,
                            evaluator : row.evaluator,
                            projectStatus : row.status
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            username: row.userData.displayname,
                            applicantstatus: `${row.evalStatus.charAt(0).toUpperCase() + row.evalStatus.slice(1)}`,
                            date: `${row.score_start_time ? (`${moment(row.score_start_time).format("DD MMM, YYYY")} at ${moment(row.score_start_time).format("hh:mm A")}`) : "--"}`,
                            info: `${row.evalStatus=="not_started" ? "--" : (row.evalStatus=="evaluating" ? (`${row.isScored ? row.isScored : "0"} out of ${row.totalAttributes} parameters evaluated`) : (`Evaluated on ${moment(row.score_publish_time).format("DD MMM, YYYY")} at ${moment(row.score_publish_time).format("hh:mm A")}`))}`
                        }
                    }
                })
            }

            scorecardTable.render(`/apps/scorecard/evaluations?tid=${project.tid}?limit=10`);
        }

        $('body').off('click').on('click', '.sdlms-my-upcoming-session-table-row', function () {
            let status = $(this).data('status')
            let projectstatus = $(this).data('projectstatus')
            let category = project.category
            if(category == "Event") {
                if(projectstatus == "Submitted" && status == "not_started") {
                    if(app.user.uid != $(this).data('uid')) {
                        api.put(`/api/v3/apps/scorecard/evaluate`, {uid:$(this).data('uid'),tid:$(this).data('tid')}) 
                    }
                }
                location.href = `/dtthon/applicant/storyboard/${$(this).data('tid')}?uid=${$(this).data('uid')}`
            } else {
                if(status == "Submitted" || status == "In progress") {
                    location.href = `/dtthon/applicant/storyboard/${$(this).data('tid')}?uid=${$(this).data('uid')}`
                }
                else if(status == "not_started" && projectstatus == "in_progress") {
                    alert(`It appears that the applicant missed to submit the process. Upon submission, you can evaluate.`)
                }
                else if(status == "not_started") {
                    api.put(`/api/v3/apps/scorecard/evaluate`, {uid:$(this).data('uid'),tid:$(this).data('tid')})    
                    ajaxify.go(`/scorecard/evaluate/${$(this).data('tid')}/user/${$(this).data('uid')}`)
                }
                else if(status == "evaluating") {
                    if(app.user.uid == $(this).data('evaluator')) 
                        ajaxify.go(`/scorecard/evaluate/${$(this).data('tid')}/user/${$(this).data('uid')}`)
                    else    
                        alert(`You are not allowed to access Scorecard is Evaluating`)
                }
                else if(status == "evaluated")
                    ajaxify.go(`/scorecard/view/${$(this).data('tid')}/user/${$(this).data('uid')}`)
            }
        })   

        // Modal to show the scorecard after it is associated
        if(project.scorecardId) {
            $("#scorecard-title").text(`${project.scorecardTitle}`);
            let scorecardId = project.scorecardId;
            scorecard.attributes.map((value)=>{
                value.pagetype = "preview"
                $('#attribute-box').append(ScTemplate.creatorScorecard.emptyparameter(value))
            })
            $('body').on("click",".showdescription", function(){
                let currentId = $(this).data('description-id') 
                $(`[showmedescriptionof${currentId}]`).toggleClass('hidden')
                $(`#emptysubattribute${currentId}`).toggleClass('hidden')
            })
        }
	};
	return dashboard;
});