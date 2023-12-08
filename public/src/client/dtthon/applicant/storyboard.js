"use strict";

/* globals define */

define("forum/dtthon/applicant/storyboard", [
	"api",
	'forum/scorecard/evaluate',
	"sdlms/threadbuilder",
	"sdlms/eaglebuilder",
	"sdlms/quiz",
	"sdlms/spreadsheet",
	"sdlms/article",
	"sdlms/enquiryform",
	'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js',
	// "Sortable",
	'https://unpkg.com/interactjs/dist/interact.min.js',
], function (api,tb,eb,qz,sp,ar,eq,tn,tnjq,Sortable) {
	var storyboard = {};
	storyboard.init = function () {

		let project = ajaxify.data.submissions || {};
		let classes = {
			notworkyet: "notworkyet",
			ongoing: "ongoing number-list-active",
			done: "number-list-complete done",
			reassigned: "reassigned number-list-reassigned"
		}
		let status = project.status || {};
		$('#project-action-btn')[project.tasks.find(e => e.status != 'done') ? 'remove' : 'show']();
		// let submission = ajaxify.data.submission || {};
		let tasks = project.tasks || [];
		let $containers = {
			journey: $(".dtThone-journey-board").find("[expanded-tasks]"),
			tasks: $("#applicant-storyboard_container")
		};
		let templates = Template.storyBoard();

		$("[collapsed-tasks]").hide();
		$("[collapse-menu-icon]").on("click", function (e) {
			$("[save-btn]").toggle();
			$("[expanded-tasks],[collapsed-tasks]").toggle();
			$("[collapse-header]").text(
				$("[collapse-header]").text() == "" ? "Journey Board" : ""
			);
			$(".applicant-sidebar[collapse]").toggleClass("col-md-2 col-md-1");
			$("[collapse-menu-icon]").toggleClass("fa-arrow-circle-left fa-arrow-circle-right");
		});


		function getNumberList(count) {
			$("[number-list]").append(`<div class="number-list cursor-pointer ${classes[tasks[count - 1]['status']]}" show-task="${tasks[count - 1]['task_id']}" >${count}</div>`);
		}


		for (let i = 0; i < tasks.length; i++) getNumberList(i + 1);

		$("[tool-bar] [collapse-body]").hide();
		$("[tool-bar]").on("click", "[collapse-icon]", function () {
			$("[collapse-body]").animate({ width: "toggle" });
			$(this).toggleClass("rotate");
		});
		
		$('body').on("click", ".description-icon", function () {
			$(this).parents(".single-asset").find("[description-box]").slideToggle()
		}) 

		$(document).mouseup(function (e) {
			var container = $('.dtThone-journey-board');
			if (!container.is(e.target) && container.has(e.target).length === 0 && $('[expanded-tasks]').is(':visible')) {
				$('[collapse-menu-icon]').trigger('click');
			};
		});

		$containers.journey.html(tasks.map((task) => templates.task.get({ ...task, $container: $containers.tasks, showAssets: true, hideAction: true, showComplete: (task.status != 'done') })).join(''));

		const showTask = (id, status = null) => {
			$containers.tasks.find(`[task-target]`).hide();
			$containers.tasks.find(`[task-target="task-${id}"]`).show();
			let $task = $containers.journey.end().find('[collapsed-tasks]').find(`[show-task="${id}"]`);
			if (status && !$task.hasClass(status) && !$task.hasClass('done')) {
				$task.addClass(status);
				updateTask(id, status, function () {
					$task.addClass(classes[status]);
				});
			}
		}
		const updateTask = (task_id, status, cb) => {
			require(['api'], function (api) {
				api.put(`/apps/task/submit`, {
					task_id: Number(task_id),
					tid: Number(ajaxify.data.project.tid),
					pid: Number(project.pid),
					task: {
						status: status,
					}
				}).then(function (res) {
					notify('Task updated Successfully', 'success');
					cb();
				}).catch((error) => {
					notify(error.message, "error");
				});
			});
		}
		$('body').on('click', '[show-task]', function () {
			showTask($(this).attr('show-task'), 'ongoing');
		});

		$('body').on('click', '[mark-as-done]', function () {
		// 	let task_id = $(this).attr('mark-as-done');
		// 	const assetsAreSaved  = project.tasks
		// 	.find(task => task.task_id === parseInt(task_id)).assets
		// 	.filter(asset => asset.asset_type === "input_asset")
		// 	.reduce((acc, curr) => Object.keys(curr.content).length === 0 ? false : acc, true);
			
		// 	if(!assetsAreSaved) {
		// 		alert("It's seem like you didn't save the asset, Please save the asset by clicking save button.")
		// 	}
		// 	else 
		// 	{
		// 		updateTask(task_id, 'done', function () {
		// 		location.reload();
		// 	});
		// 	$(this).remove();
		// }
			let task_id = $(this).attr('mark-as-done');	
			updateTask(task_id, 'done', function () {location.reload();});
			$(this).remove();
		})

		if (tasks.length) {
			$('[collapse-menu-icon]').trigger('click');
			showTask(tasks.find(e => e.status != 'done') ? tasks.find(e => e.status != 'done').task_id : tasks[0].task_id);
		}

		let pids = project.tasks.map(task => task.assets.map(asset => asset.pid).filter(e => e).join(',')).filter(e => e).join(',');

		require(['api'], function (api) {
			api.get(`/sdlms/pids?pids=${pids}&uid=${project.uid}`, {}).then(res => {
				tasks.forEach((task) => {
					task.assets.forEach((asset) => {
						asset.hide_task = true;
						asset.content = res.find(e => e.pid == asset.pid) || {},
							new Widget_Factory({
								target: `[task-assets-container-id="${asset.asset_id}"]`,
								role: 'applicant',
								status: status,
								task_id: task.task_id,
								asset_id: asset.asset_id,
								asset: asset,
								hideDefault: true,
								tid: project.tid,
								pid: project.pid,
								uid: app.user.uid,
								type: asset.asset_content_type,
								readonly: status == 'in_progress' ? false : true,
								onSave: function (data, cb, err) {
									api.put('/apps/submission/asset', data)
										.then(function (res) {
											if (!res.pid) return;
											typeof cb == 'function' && cb(res);
										}).catch((error) => {
											console.log(error);
											notify('Error saving asset', 'error');
											typeof err == 'function' && err(error);
										})
								}
							})
					})
				});
			})
		})

		$("#toc-btn").on("click", function () {
			let date = Date.now();
			window.open(`/toc/calendar/${moment(date).format("YYYY/MM/DD")}`, '_blank');
		})

		$("#observation-btn").on("click", function() {
			window.open(`/observation`, '_blank');
		})

		$("#scorecard-view-btn").on("click", function() {
			window.open(`/scorecard/view/${project.tid}/user/${project.uid}`, '_blank');
		})

		$("#scorecard-evaluate-btn").on("click", () => {
			window.open(`/scorecard/evaluate/${project.tid}/user/${app.user.uid}`, '_blank');
		})

		$("#certificate-btn").on("click", () => {
			window.open(`/dtthon/applicant/certificate/${project.tid}/${app.user.uid}`, '_blank');
		})

		$("#discussion-open-btn").on("click", () => {
			window.open(`https://chat.whatsapp.com/LIB71r0lKWBHehHaOqzBf5`, '_blank');
		});

		$('#project-action-btn').on('click', function (e) {
			e.preventDefault();
			if(confirm("You can't edit your progress after submitting it.")) {
			let $this = $(this);
			api.post(`/apps/submit`, { pid: project.pid }).then(res => {
				// window.location.reload();
				location.pathname = `dtthon/creator/microDashboard/${project.tid}`;
				//window.open(`/dtthon/applicant/certificate/${project.tid}/${app.user.uid}`)
			}).catch(err => {
				notify("Project Already Submitted", 'error');
			}).finally(() => {
				$this.prop('disabled', true);
			})
		}
		})

		// $("#discussion-open-btn").on("click", () => {
		// 	$("#discussion-open-btn").addClass("d-none");
		// 	$("#discussion-close-btn").removeClass("d-none");
		// 	$("#discussion-widget-container").slideDown("fast");
		// });

		// $("#discussion-close-btn").on("click", () => {
		// 	$("#discussion-close-btn").addClass("d-none");
		// 	$("#discussion-open-btn").removeClass("d-none");
		// 	$("#discussion-widget-container").slideUp("fast");
		// });

		$("#close-notice-btn").on("click", () => {
			$("#task-notice-body").removeClass("d-flex");
			$("#task-notice-body").addClass("d-none");
			$("#open-notice-btn").addClass("d-flex");
			$("#open-notice-btn").removeClass("d-none");
		});

		$("#open-notice-btn").on("click", () => {
			$("#task-notice-body").addClass("d-flex");
			$("#task-notice-body").removeClass("d-none");
			$("#open-notice-btn").removeClass("d-flex");
			$("#open-notice-btn").addClass("d-none");
		});

		// $('[task-container-id]').each(function () {
		// 	Sortable.create(this, {
		// 		handle: '.sdlms-section-header',
		// 		onEnd: function (evt) {
		// 			tasks = tasks.map(task => {
		// 				if (task.task_id == $(evt.target).attr('task-container-id')) {
		// 					task.assets = task.assets.map(asset => {
		// 						return {
		// 							...asset,
		// 							order:$(evt.target).find(`[task-assets-container-id="${asset.asset_id}"]`).index()
		// 						}
		// 					}).sort((a, b) => a.order - b.order)
		// 				}
		// 				return task;
		// 			});
		// 			/// here call update asset order API ... based on task id and asset Array
		// 		}
		// 	})
		// });

		interact('.resize-drag').resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true, top: true },

            listeners: {
                move(event) {
                    var target = event.target
                    var x = (parseFloat(target.getAttribute('data-x')) || 0)
                    var y = (parseFloat(target.getAttribute('data-y')) || 0)

                    // update the element's style
                    target.style.width = event.rect.width + 'px'
                    target.style.height = event.rect.height + 'px'

                    // translate when resizing from top or left edges
                    x += event.deltaRect.left
                    y += event.deltaRect.top

                    target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

                    target.setAttribute('data-x', x)
                    target.setAttribute('data-y', y)

                }
            },
            modifiers: [

                // minimum size
                interact.modifiers.restrictSize({
                    min: { width: 100, height: 50 }
                })
            ],

            inertia: true
        });

   	interact('.resize-drag').draggable({
            inertia: true,
            autoScroll: false,
            // dragMoveListener from the dragging demo above
            listeners: { move: storyboard.dragMoveListener }
        });

		if(ajaxify.data.isSubmitted && !ajaxify.data.submissionOwner && ajaxify.data.project.scorecardId && (ajaxify.data.submissions.evalStatus == "evaluating" && ajaxify.data.submissions.evaluator == app.user.uid) || ajaxify.data.submissions.evalStatus == "not_started") {
				$("#scorecard-evaluate").attr("src", `/scorecard/evaluate/${project.tid}/user/${project.uid}?header=false`)
		}	

		// show the scorecard after all assets has been loaded succefully & the scorecard is only accessible to the evaluator
		if($("[task-container-id]").html() && ((ajaxify.data.submissions.evalStatus == "evaluating" && ajaxify.data.submissions.evaluator == app.user.uid) || ajaxify.data.submissions.evalStatus == "not_started")) {
			$("#scorecard-container").removeClass("d-none")
			$("#scorecard-container").addClass("d-flex")
		}		

		// console.log($("[task-assets-container-id]").html())
		// if($("[task-assets-container-id]").html()) {
		// 	console.log($("[task-assets-container-id]").html())
		// 	$("#scorecard-container").removeClass("d-none")
		// 	$("#scorecard-container").addClass("d-flex")
		// }
	};

	storyboard.dragMoveListener = function (event) {
		var target = event.target
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
	}

	return storyboard;
});

