"use strict";

/* globals define */

define("forum/dtthon/creator/storyboard", ["api", "sdlms/task", "sdlms/asset"], function (api) {
	var storyboard = {};
	storyboard.init = function () {

		let project = ajaxify.data.project || {};
		let tasks = project.tasks || [];
		let $containers = {
			journey: $(".dtThone-journey-board").find("[expanded-tasks]"),
			tasks: $("#create-task")
		};
		let templates = Template.storyBoard();

		$(".backBtn").on("click", function() {
			ajaxify.go(`/dtthon/creator/dashboard`);
		});

		$("#delete-btn").off("click").on("click", function () {
			if(confirm(`Are you sure? Want to delete ${project.category}-${project.title}`)) {
				var data = {tid:project.tid}
				api.del(`/apps/project`, data).then(function(res) {}).catch((error) => {
					notify(error.message, "error");
				});
				ajaxify.go("/dtthon/creator/dashboard")
			}
		});

		$("#edit-profile-btn").off("click").on("click", function () {
			ajaxify.go(`/dtthon/creator/profile/${project.tid}`)
		})

		$("[collapsed-tasks]").hide();
		$("[collapse-menu-icon]").on("click", function (e) {
			$("[save-btn]").toggle();
			$("[expanded-tasks],[collapsed-tasks]").toggle();
			$("[collapse-header]").text(
				$("[collapse-header]").text() == "" ? "Journey Board" : ""
			);
			$("[collapse]").toggleClass("col-md-2 collapsed col-md-1");
		});

		$containers.journey.html(function () {
			return !tasks.length ?
				(templates.journey.empty()) :
				($('[collapse-menu-icon]').trigger('click'), templates.journey.start({ tasks: tasks.map((task) => templates.task.get({ ...task, $container: $containers.tasks })).join('') }));
		});

		$('#addtask').off('click').on('click', () => $containers.journey.empty().append(templates.journey.start()));

		const showTask = (id) => {
			$containers.tasks.find(`[task-target]`).hide();
			$containers.tasks.find(`[task-target="task-${id}"]`).show();
		}
		const deleteTask = (id) => {
			// delete API
			require(['api'], function (api) {
				api.del(`/apps/task`, {
					task_id: Number(id),
					tid: Number(project.tid)
				}).then(function (res) {
					notify('Task deleted Successfully', 'success');
					$containers.tasks.find(`[task-target="task-${id}"]`).remove();
					$containers.journey.find(`[show-task="${id}"]`).parent('[task-list]').remove();
					$(`.number-list`).first().remove();
					$containers.journey.find(`[show-task]`).last().trigger('click');
					$(`.number-list`).each(function (i, e) {
						$(e).text(i + 1);
					});
					tasks = tasks.filter(task => task.task_id != id);
					$('[collapse-menu-icon]').trigger('click');


				}).catch((error) => {
					notify(error.message, "error");
				});
			})

		}



		tasks.forEach((task) => {
			task.assets.forEach((asset) => {
				new Challenge({
					target: `[task-assets-container-id="${asset.asset_id}"]`,
					task_id: task.task_id,
					tid: project.tid,
					with: asset
				})
			})
		});

		$containers.tasks.find('sdlms-challenge select').each(function () {
			if ($(this).data('value')) $(this).val($(this).data('value')).trigger('change', { ignore: true });
		});

		$('body').off('click').on('click', '[show-task]', function () {
			if ($(this).attr('edit') == 1) return;
			showTask($(this).attr('show-task'));
		});
		$('body').on('click', '[focus-task]', function () {
			showTask($(this).attr('focus-task'));
		});

		$containers.journey.on('click', '[remove-task]', function () {
			deleteTask($(this).attr('remove-task'));
		});

		$containers.journey.on('click', '[edit-task]', function () {
			let task_id = $(this).attr('edit-task');
			let $li = $(this).parents('[task-list]').first();
			let task = tasks.find((task) => task.task_id == task_id);
			$(`[show-task="${task_id}"]`).html(`<input type="text" class="form-control" edit-input-${task_id} value="${task.task_title}"> <textarea type="text" class="form-control mt-2" style="outline: none;resize: none;" edit-description-${task_id} value="${task.task_description}">${task.task_description}</textarea>`).attr('edit', 1);
			$(`[edit-input-${task_id}]`).off('keydown').on('keydown', function (e) {
				if (e.key === "Enter") $li.find('[save-edited-task]').trigger('click');
			});
			$li.find('[task-action]').toggle();
		});

		$containers.journey.on('click', '[save-edited-task]', function () {
			let $li = $(this).parents('[task-list]').first();
			let task_id = $(this).attr('save-edited-task');
			let task = tasks.find((task) => task.task_id == task_id);
			let title = $li.find(`[edit-input-${task_id}]`).val();
			let description = $li.find(`[edit-description-${task_id}]`).val();
			console.log(description);
			if (title == '') return;
			task.task_title = title;
			task.task_description = description;
			task.assets = task.assets || [];
			delete task.assets;
			require(['api'], function (api) {
				api.put(`/apps/task`, {
					task_id: Number(task_id),
					tid: Number(project.tid),
					task: {
						task_title: title,
						task_description: description
					}
				}).then(function (res) {
					notify('Task updated Successfully', 'success');
					$(`[show-task="${task_id}"]`).html(task.task_title).attr('edit', 0);
					$li.find('[task-action]').toggle();
					$(`[task-title-${task_id}]`).text(task.task_title);
					$li.find(`[edit-description-${task_id}]`).text(description)
					let i = tasks.findIndex((task) => task.task_id == task_id);
					tasks[i] = task;
				}).catch((error) => {
					notify(error.message, "error");
				});
			});
		});

		$containers.journey.on('click', '[cancel-edit-task]', function () {
			let $li = $(this).parents('[task-list]').first();
			let task_id = $(this).attr('cancel-edit-task');
			let task = tasks.find((task) => task.task_id == task_id);
			$(`[show-task="${task_id}"]`).html(task.task_title).attr('edit', 0);
			$li.find('[task-action]').toggle();
		});

		// $containers.journey.on('keydown', '[task-input]', function (e) {
		// 	if (e.key === "Enter") $('#add-btn').trigger('click');
		// });

		$('body').on("click", "#add-btn", function () {
			let task_name = $("[task-input]").val();
			let task_description = $("[task-description]").val();
			if (String(task_name).trim() == "" || String(task_description).trim() == "") return alert("Please enter a task name and description");
			let data = {
				tid: Number(project.tid),
				task: {
					task_title: task_name,
					task_description: task_description,
				},
			};
			api.post(`/apps/task`, data).then(function (res) {
				tasks.push(res.taskData);
				$containers.journey.find('ol').append(templates.task.get({ ...res.taskData, $container: $containers.tasks }));
				showTask(res.taskData.task_id);
				getNumberList(tasks.length);
				$("[task-input]").val('');
				$("[task-description]").val('');
			}).catch((error) => {
				notify(error.message, "error");
			});
		});

		function getNumberList(count) {
			$("[number-list]").append(`<div class="number-list cursor-pointer" focus-task="${tasks[count - 1]['task_id']}" >${count}</div>`);
		}

		for (let i = 0; i < tasks.length; i++) getNumberList(i + 1);

		$(`body`).on("click", '[create-asset-btn]', function () {
			let id = $(this).data('task-id');
			let temp_id = app.unique('task_asset_id-');
			$containers
				.tasks
				.find(`[task-container-id="${id}"]`)
				.append(`<div class="p-3" id="asset-${temp_id}" task-assets-container-id="${temp_id}"></div>`);
			new Challenge({
				target: `[task-assets-container-id="${temp_id}"]`,
				task_id: id,
				tid: project.tid
			});
		});

		tasks.length ? showTask(tasks.reverse()[0].task_id) : console.log('no tasks');

		$(document).mouseup(function (e) {
			var container = $('.dtThone-journey-board');
			if (!container.is(e.target) && container.has(e.target).length === 0 && $('[expanded-tasks]').is(':visible')) {
				$('[collapse-menu-icon]').trigger('click');
			};
		});
		$('body').on('click','#create-btn-faq',function(){
			ajaxify.go(`dtthon/creator/faq/${project.tid}`);
		})
		$("body").on("click", "#finish-btn", function () {
			let errors = [];
			if (!tasks.length) return alert("Please add atleast one task");
			tasks.forEach((task) => {
				if (!$(`[task-target="task-${task.task_id}"] sdlms-challenge`).length) errors.push(`Task ${task.task_title} does not have any assets`);
			});
			if (errors.length) return alert(errors.join('\n'));
			if (!confirm("Are you sure you want to publish this project? You can't edit your project after this...")) return;
			var data = {
				tid: project.tid,
				status: "published",
				isActive: true,
			};
			api.put(`/apps/project`, data).then(function (res) {
				notify("Project published successfully", "success");
				location.pathname = `/dtthon/creator/dashboard`;
			}).catch((error) => {
				notify(error.message, "error");
			});
		});
	};
	return storyboard;
});




