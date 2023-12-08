'use strict';

/* globals define */

define("forum/mobile/setting/email", ["translator"], function (translator) {
	var email = {};

	email.init = function () {
		$('#back-btn').on('click', () => window.location.href = 'account');

		$('body').on('submit', 'form', function (e) {
			e.preventDefault();
			$(".asset-create-btn").prop("disabled", true);

			notify("Changing password...", "info");

			let formData = new FormData(this);

			formData.append('uid', app.user.uid);

			doAjax({
				type: 'PUT',
				url: `/users/${app.user.uid}`,
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
			}).then(function (res) {
				notify("Password updated", "success");
				console.log(res);
			}).catch((err) => {
				let { responseJSON } = err;
				$(".asset-create-btn").prop("disabled", false);
				if (responseJSON && responseJSON.status.message) {
					translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
				}
				else return notify('Oops! Some error occured while creating the post', 'error');

			});
		});

		$('#app-loader').hide();
	};

	return email;
});
