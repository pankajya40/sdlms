'use strict';

/* globals define */

define("forum/mobile/support/authentication", ["api", "translator"], function (api, translator) {
	var authentication = {};

	authentication.init = function () {
		$('body').on('submit', '#create-ticket', function (e) {
			e.preventDefault();
			$(".asset-create-btn").prop("disabled", true);

			const formData = new FormData(this);

			const contact = {
				firstName: formData.get('firstName'),
				lastName: formData.get('lastName'),
				email: formData.get('email'),
				phone: formData.get('phone'),
			};

			formData.append('contact', JSON.stringify(contact));

			const payload = {
				subject: formData.get('subject'),
				contact: contact,
				category: formData.get('category'),
				description: formData.get('description'),
			};

			doAjax({
				type: 'POST',
				url: `/app/tickets`,
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(payload),
			}).then(function (response) {
				console.log(response);
			}).catch((err) => {
				let { responseJSON } = err;
				$(".asset-create-btn").prop("disabled", false);
				if (responseJSON && responseJSON.status.message) {
					translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
				}
				else return notify('Oops! Some error occured', 'error');
			});
		});

		$('#app-loader').hide();
	};

	return authentication;
});
