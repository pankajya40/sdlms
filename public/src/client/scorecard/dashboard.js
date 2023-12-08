"use strict";

/* globals define */

define("forum/scorecard/dashboard", ['api', 'sdlms/scorecard', 'sdlms/pagination'], function (api) {
	var dashboard = {};
	dashboard.init = () => {
		$("[tabheader]").off("click").on("click", ".sdlms-sessions", function () {
			$(".sdlms-sessions").removeClass("active");
			$(this).addClass("active");
			location.href = location.origin + `/${$(this).data("state")}`;
		});

		$('body').on('click', '.add-score-card', function () {
			var task_name = $("[score-card-title]").val()
			if (String(task_name).trim() == "") { return alert("Please Enter Title of the Score Card"); }
			else {
				api.post(`/api/v3/social_scorecard/templates`, { title: task_name }).then(function (res) {
					ajaxify.go(`/scorecard/create/${res.tid}`);
				}).catch((error) => {
					notify(error.message, "error");
				});
			}
		})

		$('#score-card-search-bar').off('keyup').on('keyup', function (e) {
			let name = $("input[type='text']").val();
			if (name.length > 3)
				paginateScorecard(`/api/v3/social_scorecard/scorecards?limit=7&title=${name}&status=published&active=true`)
			else if (name.length < 1) {
				paginateScorecard(`/api/v3/social_scorecard/scorecards?uid=${app.user.uid}&limit=7`)
			}
		})

		$('body').on('click', '.score-card-top', function (e) {
			let status = $(this).data('status');
			if (status == "draft")
				ajaxify.go('/scorecard/create/' +tid);
			else if (status = "published")
				// ajaxify.go('/scorecard/microDashboard/' + $(this).data('tid'));
				location.href = '/scorecard/microDashboard/' + $(this).data('tid')
		});
		console.log('This')



		$('body').on('click', '[icon-scorecard]', function () {
			let status = $(this).data('status');
			if (status == "published") {
				ajaxify.go('/scorecard/microDashboard/' + $(this).data('tid'))
			}
		})

		$('#myScorecard').on("click", function () {
			if (!$(this).is(':checked')) {
				paginateScorecard(`/api/v3/social_scorecard/scorecards?limit=7&status=published&active=true`)
			}
			else {
				paginateScorecard(`/api/v3/social_scorecard/scorecards?uid=${app.user.uid}&limit=7`)
			}
		});

		$("body").off("click", "[active-switch]").on("click", "[active-switch]", function() {
			console.log("clicked!");
			let isActive = $(this).data('isactive');
			let tid = $(this).data('id');
			if(isActive) {
				if(confirm(`Are you sure? Want to deactivate this Scorecard...`)) {
					$(this).removeAttr("checked")
					api.put(`/api/v3/social_scorecard/state`, {tid: tid,state: false}).then(function () {
						notify(`Scorecard Deactivated successfully`, "success");
					})
				}
			}
			else if(!isActive) {
				if(confirm(`Are you sure? Want to activate this Scorecard...`)) {
					$(this).attr("checked")
					api.put(`/api/v3/social_scorecard/state`, {tid: tid,state: true}).then(function () {
						notify(`Scorecard Activated successfully`, "success");
					})
				}
			}
			ajaxify.refresh()
		})

		function paginateScorecard(url) {
			let scorecard = ScorecardTemplate.scorecard();
			$(".scorecards").empty().append(scorecard.dashboard.createScorecard());
			api.get(url, {}).then((res) => {
				res.data.map((ev) => {
					$(".scorecards").append(scorecard.dashboard.viewScorecard(ev));
					if (ev.status === "published") {
						$(`#card-${ev.tid}`).find(`.active-state`).append(`
						<div class="custom-control custom-switch">
							<input type="checkbox" class="custom-control-input active" active-switch ${ev.isActive ? "checked" : ""}  data-id="${ev.tid}" data-isActive="${ev.isActive}">
							<label class="custom-control-label light-text pt-1 active-label" for="${ev.tid}" style="font-size: var(--sdlms-font-size-14); font-weight: 700;"> ${ev.isActive ? "Active" : ""}</label>
						</div>
						<div class="d-flex justify-content-end align-items-center">
							<span class="pr-2 light-text" style="font-size: var(--sdlms-font-size-17);">${ev.associationCount ? ev.associationCount : "0"}</span>
							<i class="fa fa-folder light-text"></i>
						</div>
						`);
					}
					if (ev.attributes.length > 0)
						$(".score-card-tile-hidden").empty().append(`<p><b>${ev.attributes[0].title}</b></p><p>${ev.attributes[0].description}</p>`)
					if (ev.associations)
						$(".scorecard-details").empty().append(`<p>${ev.associations.length} Project Associated</p>`)
				});
				pagination.paginate(res)
			});
		};
		let pagination = new Pagination({
			target: '#scorcard-pagination',
			onChange: paginateScorecard
		});

		paginateScorecard(`/api/v3/social_scorecard/scorecards?uid=${app.user.uid}&limit=7`);


		$('body').on('change', '.scorecard-toggle', function (e) {
			
			let $this = $(this);
			let tid = $(this).data('tid');
			let isActive = $(this).is(':checked');
			console.log(isActive)
			let message = `Are you sure you want to ${isActive ? "activate" : "deactivate"} this scorecard?`;
			let ask = confirm(message);
			if(!ask) return $(this).prop('checked', !isActive);

			api.put(`/api/v3/social_scorecard/state`, { tid, state: isActive })
			.then((res) => {
				notify(`${isActive ? 'Activated' : 'Deactivated'} successfully`, "success");
			}).catch((error) => {
				notify(error.message, "error");
				$this.prop('checked', !isActive);
			});
		})

	};

	return dashboard;
});