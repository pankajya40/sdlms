'use strict';

/* globals define */

define('forum/rigorbuilder/creator/create', ['api'], function (api) {
	var create = {};
	const BASE_URL = "/api/v3/rigor"
	create.init = function () {
		console.log("Hey!! Create Page");

		$("body").on("click", "#delete-problem", function () {
			$(this).parents("#parent-input").remove();
		})

		$("body").on("click", "#add-problem", function () {
			console.log("clicked")
			$('.new-input').append(
				`<div class="position-relative" id="parent-input">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                    id="delete-problem"
                    class="alert-danger bi bi-trash cursor-pointer mx-sm-n3 my-lg-n3 position-absolute rounded rounded-lg"
                    viewBox="0 0 16 16">
                    <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg>
                <textarea class="form-control py-4 my-5"  id="myInput"
                rows="3"></textarea>
            </div>`
			);
		});

		let pid;
		if (pid) {
			console.log(pid)
		}

		$("body").on("click", "[save-btn]", function () {
			let payload = { blocks: [] };
			let textareas = $('textarea');
			// console.log(textareas.val().length !== 0);

			if(textareas.val().length !== 0){
				textareas.each(function () {
					payload.blocks.push({ text: $(this).val() });
				});
	
				api.post(BASE_URL + '/create', { blocks: payload })
					.then((data) => {
						// notify('Succesfully Created a Workshop ', 'success')
						console.log(data)
						pid = data.data.pid;
						console.log(data.data.pid)
						notify('Succesfully Created the rigor ', 'success');
						
					}).catch((err) => {
						console.log(err)
					})
				$(this).hide();
				$('[next-btn], [preview]').removeClass('d-none');
			} else {
				alert("Please enter a problem statement")
			}
				
			});

		$("body").on("click", '[preview]', function () {
			if (pid) {
				ajaxify.go(`/rigor/creator/view/${pid}`);
			}
		});

		$("body").on("click", '[next-btn]', function () {
			if (pid) {
				ajaxify.go(`/rigor/creator/quiz/${pid}`);
			}
		});

		// home
		$('[exit]').on('click', function(){
			ajaxify.go('/rigor/home')
		})
	};

	return create;
});
