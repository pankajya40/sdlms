'use strict';

/* globals define */

define('forum/rigorbuilder/creator/quiz', ['api'], function (api) {
	var quiz = {};
	quiz.init = function () {
		let rigor = ajaxify.data.rigor || {}
		console.log(rigor);
		const BASE_URL = "/api/v3/rigor"

		// $("body").on("click", "#send", function () {
		// 	ajaxify.go('/rigor/dashboard');
		// })

		$('[exit]').on('click', function(){
			ajaxify.go('/rigor/home')
		})

		api.get(BASE_URL + `/single/${rigor.pid}`, {}).then((res) => {
			res.blocks.blocks.map((block, index) => {
				$('.test').append(`
                <p for="exampleFormControlTextarea1" class="font-poppins font-weight-500 py-4">
                            <span class="font-poppins font-weight-500 py-2">
                            ${index + 1}) ${block.text}
                            </span>
                        </p>
                </p>`)
			})
		}).catch((err) => {
			console.log(err);
		});



		// $("body").on("change", "#title", function () {
			
		// });


		$("body").on("click", "#saved", function () {
			console.log('workds');
			api.put('/rigor/title', { pid: rigor.pid, title: $('#title').val() }).then((res) => {
				notify('Succesfully Added  the title ', 'success')
				api.put('/rigor/publish', { pid: rigor.pid }).then((res) => {
					notify('Succesfully Published the rigor ', 'success')
					ajaxify.go('/rigor/dashboard');
				}).catch((err) => {
					console.log(err);
				});
			}).catch((err) => {
				console.log(err);
			});
			
		});

	};

	return quiz;
});
