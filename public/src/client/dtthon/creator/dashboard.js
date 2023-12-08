"use strict";

/* globals define */

define("forum/dtthon/creator/dashboard", ["api","sdlms/pagination"], function (api) {
	var dashboard = {};
	dashboard.init = () => {

		$("[tabheader]").off("click").on("click", ".sdlms-sessions", function () {
			$(".sdlms-sessions").removeClass("active");
			$(this).addClass("active");
			location.href = location.origin + `/${$(this).data("state")}`;
		});

		$("[CreateNewproject]").off("click").on("click", function () {
			ajaxify.go(`/dtthon/creator/profile`);
	    });

		$('#dtthon-explore-search-bar').off('keyup').on('keyup',function(e){           
			let name =$("input[type='text']").val();
			if(name.length > 3) 
			    paginateDashboard(`/apps/project?title=${name}&active=true&limitBy=8&uid=all`)
		    else if(name.length < 1) 
		        paginateDashboard(`/apps/project?uid=${app.user.uid}&limitBy=8`)
	    })
		$('#myProjects').on("click", function() {
			if (!$(this).is(':checked')) {
				paginateDashboard(`/apps/project?active=true&limitBy=8`)
			} else { 
			    paginateDashboard(`/apps/project?uid=${app.user.uid}&limitBy=8`)
	        }
		});

		$('body').off('click').on('click', '[project-card-top]', function () {
			let status = $(this).data('status')
			if(status == "Published")
			    ajaxify.go('/dtthon/creator/microDashboard/'+ $(this).data('tid'));
			else if(status == "Draft")
			    ajaxify.go('/dtthon/creator/storyboard/'+ $(this).data('tid'));	
		});

		$('body').on("click", "[active-switch]", function()  {
			let category = $(this).data('category');
			let tid = $(this).data('id');
			let isActive = $(this).data('isactive');
            if(isActive) {
                if(confirm(`Are you sure? Want to deactivate ${category}...`)) {
					$(this).removeAttr('checked')
                    api.put(`/apps/project`, {tid: tid,isActive: false,}).then(function () {
                        notify(`${category} Deactivated successfully`, "success");
                    })
                }
            }
            else if(!isActive) {
                if(confirm(`Are you sure? Want to activate ${category}...`)) {
					$(this).attr('checked');
                    api.put(`/apps/project`, {tid: tid,isActive: true,}).then(function () {
                        notify(`${category} Activated successfully`, "success");
                    })
                }
            }
            ajaxify.refresh()
        })

		function paginateDashboard(url) {
			$(".project-cards").empty();
			let cardTemplate =	Template.cards();
			api.get(url, {}).then((res) => {
				res.data.map((ev, index) => { 
					$(".project-cards").append(cardTemplate.dtthonCard.creatorProject(ev));
					if(ev.isActive) 
						$(`#card-${ev.tid}`).find(`.active-state`).empty().append(`<span class="pr-1 light-text" style="font-size: var(--sdlms-font-size-14);">Active</span><i class="fa fa-check-circle" style="color: #2bc60c;" aria-hidden="true"></i>`)								
					if (ev.status=="Draft")
						$(`#card-${ev.tid}`).find(`.hidden-detail`).empty().append(`<div>Congratulations!!! <br> You have already added  ${ev.tasks.length} tasks.</div>`);

					else if(ev.status=="Published")
						$(`#card-${ev.tid}`).find(`.hidden-detail`).empty().append(`<div>Number of Tasks : ${ev.tasks.length}</div><div>Published Date : ${moment(ev.publishedAt? ev.publishedAt : ev.start_time).format("DD MMM, YYYY")}</div>`);
				});
				pagination.paginate(res)
			});
		};
	
		let pagination = new Pagination({
			target:'#dashboard-pagination',
			onChange: paginateDashboard
		});
		
		paginateDashboard(`/apps/project?uid=${app.user.uid}&limitBy=8`);

    };
    return dashboard;
});


{/* <div class="score-card-tile score-card-tile-hidden hidden-detail"><div class="mb-2">Number of Tasks : <b>1</b></div><div class="mb-2">Published Date : <b>14 Sep, 2022</b></div>
<div class="mb-2">Associated Scorecard : <br><b>ABCF Template of scorecard </b></div><div class="mb-2">Unevaluated Applicants : <b>36 </b></div>

</div> */}





	//changing for header
	// 	$("[tabheader]").off("click").on("click", ".sdlms-sessions", function () {
	// 			$(".sdlms-sessions").removeClass("active");
	// 			$(this).addClass("active");
	// 			location.href = location.origin + `/${$(this).data("state")}`;
	// 		});

	// 	dashboard.paginateMicroDashboard(`/apps/project?uid=${app.user.uid}`, {
	// 		parent: "sdlms-my-microdashboard-table-body",
	// 	});

		// $("[CreateNewproject]").off("click").on("click", function () {
		// 		//change the creator page..
		// 		ajaxify.go(`/dtthon/creator/profile`);
		// 	});

	// 	$("body").on("click", ".dropdown-item", function () {
	// 		var txt = $(this).text();
	// 		console.log(txt);
	// 		if (txt == "Draft") {
	// 			dashboard.paginateMicroDashboard(
	// 				`/apps/project?isRecruiter=true`,
	// 				{
	// 					parent: "sdlms-my-microdashboard-table-body",
	// 				}
	// 			);
	// 		} else if (txt == "Published") {
	// 			dashboard.paginateMicroDashboard(`/apps/project`, {
	// 				parent: "sdlms-my-microdashboard-table-body",
	// 			});
	// 		}
	// 	});

	// 	$("body").on("click", "[change-to-macrodashboard]", function () {
	// 		let tpid = $(this).data("id");
	// 		let status = $(this).data("status");
	// 		let title = $(this).data("project-title");

	// 		$('.share-project-url').attr('data-project-tid', tpid);

	// 		$("[microdb_heading]").empty().append(title);
	// 		if (status == "Draft")
    //             ajaxify.go(`/dtthon/creator/storyboard/${tpid}`);
	// 		else {
	// 			$(".Dashboard1-state-main").addClass("change-class");
	// 			$(".Dashboard1-state-detailed").removeClass("change-class");

	// 			dashboard.paginateMacroDashboard(`/apps/project/${tpid}/applicants`, {
	// 				parent: "sdlms-my-macrodashboard-table-body",
	// 			})	
          
	// 			$("[deleteproject]").off("click").on("click", function () {
	// 				var data = {tid:tpid}
	// 				api.del(`/apps/project`, data).then(function(res) {}).catch((error) => {
	// 					notify(error.message, "error");
	// 				});	
	// 				  $(".Dashboard1-state-main").removeClass("change-class");
	// 				  $(".Dashboard1-state-detailed").addClass("change-class");
	// 				  ajaxify.refresh()
				  
	// 			});
	// 		}
	// 	});

	// 	$("body").on("click", "[check-submission]", function() {
	// 		let tpid = $(this).data("id");
	// 		let status = $(this).data("status");
	// 		let uid = $(this).data("uid")
	// 		if(status === "Submitted") {
	// 		ajaxify.go(`/dtthon/applicant/storyboard/${tpid}?uid=${uid}`);
	// 		}
	// 	})

	// 	$("body").on("click", ".back-to-main", function () {
	// 		$(".Dashboard1-state-main").removeClass("change-class");
	// 		$(".Dashboard1-state-detailed").addClass("change-class");
	// 	});

	// 	$("body").on("click", ".share-project-url", function () {
	// 		let tid = $(this).data('project-tid');
	// 		app.copyText(location.origin + '/dtthon/applicant/profile/' + tid);
	// 	});
	// };
  
	// //paginator for dashboard
	// $(".Dashboard1-state-main").find(".page-navigator").off("click").on("click", function () {
	// 		let url = $(this).data("url");
	// 		if (url) {
	// 			dashboard.paginateMicroDashboard(url, {
	// 				parent: "sdlms-my-microdashboard-table-body",
	// 			});
	// 			return;
	// 		}
	// 	});

	// $(".Dashboard1-state-detailed").find(".page-navigator").off("click").on("click", function () {
	// 		let url = $(this).data("url");
	// 		if (url) {
	// 			dashboard.paginateMacroDashboard(url, {
	// 				parent: "sdlms-my-macrodashboard-table-body",
	// 			});
	// 			return;
	// 		}
	// 	});

	// dashboard.paginateMicroDashboard = (url, data = {}) => {
	// 	$(".Dashboard1-state-main").find(`.${data.parent}`).empty();
	// 	try {
	// 		api.get(url, {}).then((res) => {
	// 			res.data.map((ev, index) => {
	// 				// project uid	
	// 					$(".Dashboard1-state-main").find(`.${data.parent}`).append(`
	// 								<tr id="${ev.tid}" data-id="${ev.tid}" data-project-title="${ev.title ? ev.title : "project"}" change-to-macrodashboard data-status=${ev.status} class="sdlms-my-upcoming-session-table-row">
	// 									<td class="sdlms-my-upcoming-session-table-Sno font-weight-500 sdlms-text-black-18px dashboard-sessionIndex">
	// 										${(index + 1 + res.from).toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false,})}
	// 									</td>
	// 									<td class="sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
	// 										  ${ev.title ? ev.title : "project"}
	// 									</td>
	// 									<td class="sdlms-my-upcoming-session-table-date font-weight-500 sdlms-text-black-18px">
	// 										${moment(ev.timestamp).format("ddd, DD MMM, YYYY")} <br>
	// 										<span class="sdlms-my-upcoming-session-table-time font-weight-500 sdlms-text-black-18px"></span>
	// 										${moment(ev.timestamp).format("hh:mm A")}
	// 									</td>
	// 									<td class="sdlms-my-upcoming-session-table-related-sessions font-weight-500 sdlms-text-black-18px" >
	// 										${ev.status.charAt(0).toUpperCase() + ev.status.slice(1)} 
	// 									</td>
	// 									<td class="sdlms-my-upcoming-session-table-related-sessions font-weight-500 sdlms-text-black-18px">
	// 										${ev.applicants_count ? ev.applicants_count : "--"}
	// 									</td>		
	// 								</tr>`);
	// 			});

	// 			$(".Dashboard1-state-main").find(".sessions-page").val(res.current_page + 1);
	// 			$(".Dashboard1-state-main").find(".sessions-page-count").text(res.last_page + 1);
	// 			$(".Dashboard1-state-main").find(".page-navigator.next").data("url", res.next_page_url);
	// 			$(".Dashboard1-state-main").find(".page-navigator.prev").data("url", res.prev_page_url);
	// 		});
	// 	} catch (error) {
	// 		console.log("Error while fetching project details", error);
	// 	}
	// };

	// dashboard.paginateMacroDashboard = (url, data = {}) => {
	// 	api.get(url, {}).then((res) => {
	// 		console.log(res.data.length);
	// 		console.log(res);
	// 		$(".Dashboard1-state-detailed").find(`.${data.parent}`).empty();
	// 		res.data.map((ev, index) => {
	// 			$(".Dashboard1-state-detailed").find(`.${data.parent}`).append(`
    //             <tr data-id="${ev.tid}" data-status="${ev.status}" data-uid="${ev.uid}" class="sdlms-my-upcoming-session-table-row" check-submission>
    //                 <td class="sdlms-my-upcoming-session-table-Sno font-weight-500 sdlms-text-black-18px dashboard-sessionIndex">
    //                     ${(index + 1 + res.from).toLocaleString("en-US", {minimumIntegerDigits: 2,useGrouping: false,})}
	// 				</td>
    //                 <td class="sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
    //                     ${ev.user.username}
	// 				</td>
    //                 <td class="sdlms-my-upcoming-session-table-related-sessions font-weight-500 sdlms-text-black-18px">
    //   				    ${ev.status}
	// 				</td>
    //                 <td class="sdlms-my-upcoming-session-table-date font-weight-500 sdlms-text-black-18px">
    //                     ${moment(ev.createdAt).format("ddd, DD MMM, YYYY")} <br />
    //                     <span class="sdlms-my-upcoming-session-table-time font-weight-500 sdlms-text-black-18px"></span>
    //                     ${moment(ev.createdAt).format("hh:mm A")}
    //                 </td>
    //                 <td class="sdlms-my-upcoming-session-table-related-sessions font-weight-500 sdlms-text-black-18px">
	// 		            ${ev.status=="Submitted" ? `Submitted on ${moment(ev.submission_time).format("ddd, DD MMM, YYYY")} at ${moment(ev.submission_time).format("hh:mm A")}` : `${ev.completed_tasks} out of ${ev.total_tasks} tasks submitted`}
	// 				</td>
    //            </tr>`);
			   
	// 			//// have to add storyboard
	// 			$(`#${ev.pid}_Storyboard`).on("click", function () {
	// 				location.href = location.origin + `/monitor/${ev.pid}`;
	// 			});
	// 		});

	// 		$(".Dashboard1-state-detailed").find(".sessions-page").val(res.current_page + 1);
	// 		$(".Dashboard1-state-detailed").find(".sessions-page-count").text(res.last_page + 1);
	// 		$(".Dashboard1-state-detailed").find(".page-navigator.next").data("url", res.next_page_url);
	// 		$(".Dashboard1-state-detailed").find(".page-navigator.prev").data("url", res.prev_page_url);
	// 	});