'use strict';

/* globals define */

define("forum/mobile/setting/pwd", ["translator"], function (translator) {
	var pwd = {};

	pwd.init = function () {
		$('#back-btn').on('click', () => window.location.href = 'account');

		$('body').on('submit', 'form', function (e) {
			e.preventDefault();

			$(".asset-create-btn").prop("disabled", true);

			let formData = new FormData(this);

			if (formData.get('newPassword') == formData.get('confirmpwd')) {
				const payload = {
					newPassword: formData.get('newPassword'),
					currentPassword: formData.get('currentPassword'),
				};

				doAjax({
					type: 'PUT',
					url: `/users/${app.user.uid}/password`,
					method: 'PUT',
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify(payload),
				}).then(function (res) {
					console.log(res);
				});
			} else {
				$('#match-check').append(`<p class="mb-0 font-12">New password does not match the confirmation, Please Try again</p>`);
			}
		});

		doAjax({
			type: "PUT",
			url: `/users/${app.user.uid}/password`,
			method: "PUT",
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(payload),
		}).then(function (res) {
			console.log(res);
			notify("Password updated", "success");
		}).catch((err) => {
			let { responseJSON } = err;
			$(".asset-create-btn").prop("disabled", false);
			if (responseJSON && responseJSON.status.message) {
				translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
			}
			else return notify('Oops! Some error occured while creating the post', 'error');
		});

		return pwd;
	}
});
