'use strict';

/* globals define */

define('forum/mobile/toc/todo', ['api', 'mobile/classes/mobiletoc'], function (api) {
	let todo = {};

	todo.Templates = MobileTOCTemplate.todo();
	todo.init = function () {
		
		todo.getTodos({
			"status": "upcoming",
			"limit": "50"
		})

		
		$('.submit-todo').on('click', function (e) {
			e.preventDefault()
			let submissionData = $('#todo').serializeObject()
			submissionData.status = 'upcoming';
			$('#todo')[0].reset()

			// post and put api call 
			if (!todo._id) {
				api.post(`/toc/todo`, submissionData).then(res => {
					console.log(res)
					$(".todo-container").prepend(todo.Templates.card(res));
					$('#todoModal').modal('hide')
				})
			} else {
				api.put(`/toc/todo/${todo._id}`, submissionData).then(res => {
					submissionData._id= todo._id;
					$(`[single-todo][data-_id="${todo._id}"]`).replaceWith(todo.Templates.card(submissionData));
					$('#todoModal').modal('hide')
				})
			}
		})

		$('body').on('change', '#complete-task', function () {
			let payload = {};
			payload.status = $(this).is(':checked') ? 'done' : 'upcoming';
			payload.limit = "50";
			todo.getTodos(payload)
		})


		$('body').on('click', '.todo-delete-button', function () {
			let id = $(this).data("_id")
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.isConfirmed) {
					
					api.del('/toc/todo/' + id, {}).then(res => {
						if (!res.deleted) return
						Swal.fire(
							'Deleted!',
							'Task has been deleted.',
							'success')
						$(`[single-todo][data-_id="${id}"]`).remove();
					}).catch(error => console.log(error))
				}
			})
		});

		$('body').on('change', '[name="isCompleted"]', function () {
			let isChecked = $(this).is(':checked');
			let _id = $(this).data("_id");
			let status = isChecked ? 'done' : 'upcoming';

			api.put(`/toc/todo/${_id}`, { status: status }).then(res => {
				if (res.updated) {
					Swal.fire(
						'Updated!',
						'Task has been Updated.',
						'success');
					todo.getTodos({
						"status": "upcoming",
						"limit": "50"
					})
				}
			});
		});

		$('body').on('click', '.todo-edit-button', function () {
			let data = $(this).data();
			Object.keys(data).forEach(key => {
				$('#todoModal').find(`[name="${key}"]`).val(data[key]);
			})
			$('#todoModal').modal('show')
		});

		$('#todoModal').on('hidden.bs.modal', function () {
			todo._id = null;
		})
		
		$("#close-button").on("click", function () {
			$('#todoModal').modal('hide')
		})
	};

	todo.getTodos = function (filters,params = {}, replace = true) {
		api.get('/toc/todo', params).then(res => {
			let todos = res.data;
			let html = todos.map(todo.Templates.card).join("")
			$(".todo-container")[replace ? 'html' : 'append'](html);
		})
	}

	return todo;
});