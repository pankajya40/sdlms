"use strict";

/* globals define */

define("forum/sdlms/dtthon/applicant/storyboard", [
	"api",
	"sdlms/threadbuilder",
	"sdlms/eaglebuilder",
	"sdlms/quiz",
	"sdlms/spreadsheet",
	"sdlms/article",
	"sdlms/dtthon_template",
	"sdlms/enquiryform",
	'mobile/DiscussionRoom',
	'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js'
], function (api) {
	var storyboard = {};
	storyboard.init = function () {
		let discuss = new DiscussionRoom("168","#chatboxcard");
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
			    let task_id = $(this).attr('mark-as-done');
			    updateTask(task_id, 'done', function () {
				    location.reload();
			    });
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

		$("[toc-btn]").on("click", function() {
			window.open(`/toc/home`, '_blank');
		})


		$('#project-action-btn').on('click', function () {
			if(confirm("You can't edit your progress after submitting it.")) {
			let $this = $(this);
			api.post(`/apps/submit`, { pid: project.pid }).then(res => {
				ajaxify.go(`/certificate/${project.tid}`)
			}).catch(err => {
				notify("Project Already Submitted", 'error');
			}).finally(() => {
				$this.prop('disabled', true);
				
			})
		}
		})
	};
	return storyboard;
});


function dragMoveListener(event) {
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


    interact('.resize-drag')
        .resizable({
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
        })

    interact('.resize-drag')
        .draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,
            // dragMoveListener from the dragging demo above
            listeners: { move: dragMoveListener }
        })

