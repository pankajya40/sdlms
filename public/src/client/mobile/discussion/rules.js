'use strict';

/* globals define */

define('forum/mobile/discussion/rules', ['api', 'translator'], function (api, translator) {
	var rules = {};

	rules.init = function () {
		const { roomId, isMod } = ajaxify.data;

		// appending rules
		doAjax({
			type: 'POST',
			url: '/app/getroom',
			method: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({
				roomId: [roomId],
			}),
		}).then(function (res) {
			console.log(res);

			$('.dr-title').each((index, titleSpace) => {
				$(titleSpace).text(res.response.name);
			});

			$('.header-img').each((index, imgSpace) => {
				$(imgSpace).attr('src', res.response.image);
			});
             console.log(res.response);
			res.response.rules
				.split('\n')
				.map(rule => $('#rules-list').append(`<li>${rule}</li>`));

			$('#app-loader').hide();
		});

		isMod == 'true' && $('#edit-rules-btn').removeClass('d-none');

		$('.back-btn').on('click', () => ajaxify.go(`/mobile/discussion/${roomId}`));

		$('#edit-rules-btn').on('click', () => editRules());

		$('#save-rules-btn').on('click', () => saveRules());

		function editRules() {
			document.querySelector('#rules-list').contentEditable = 'true';
			document.querySelector('#rules-list').classList.add('primary-border');
			document.querySelector('#rules-list').classList.add('rounded-10-px');
			document.querySelector('#rules-list').classList.add('p-1');
			document.querySelector('#edit-rules-btn').classList.add('d-none');
			document.querySelector('#save-rules-btn').classList.remove('d-none');
		}

		function saveRules() {
			notify('Saving new rules', 'success');

			document.querySelector('#rules-list').contentEditable = 'false';
			document.querySelector('#rules-list').classList.remove('primary-border');
			document.querySelector('#rules-list').classList.remove('p-1');
			document.querySelector('#save-rules-btn').classList.add('d-none');
			document.querySelector('#edit-rules-btn').classList.remove('d-none');

			api.put(`/app/room/${roomId}/rules`, {
				rules: $('#rules-list').text().trim(),
			})
				.then(() => notify('New rules have been saved', 'success'))
				.catch((err) => {
					const { responseJSON } = err;
					if (responseJSON && responseJSON.status.message) {
						translator.translate(responseJSON.status.message).then(msg => notify(msg, 'error'));
					} else return notify('Oops! Some error occured while creating the discussion room', 'error');
				});
		}
	};

	return rules;
});
