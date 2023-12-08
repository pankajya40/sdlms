'use strict';

/* globals define */

define('forum/mobile/profile/edit', ['api', 'translator'], function (api, translator) {
	var edit = {};
	edit.user = ajaxify.data.user;

	const { countries, user } = ajaxify.data;

	var isPictureChanged = false;

	const MAX_FILE_SIZE = 3 * (1024 * 1024); // 3mb

	edit.init = function () {
		(() => {
			const $location = document.getElementById('location');

			let str = `<option selected>${app.user.location}</option>`;

			let data = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
			data.forEach((country) => {
				str += `<option value="${country.name.common}" >${country.name.common}</option>`;
			});
			$location.innerHTML = str;
			$('#app-loader').hide();
		})();

		$('body').on('change', '[type="file"]', function () {
			var file = this.files[0];
			var reader = new FileReader();
			reader.onload = function () {
				$('body').find('#profilePicture').attr('src', this.result);
			};
			reader.readAsDataURL(file);
			isPictureChanged = true;
		});

		$('body').find('[name="pronoun"]').find(`[value="${user.pronoun}"]`).attr('selected', true);

		$('body').find('#profilePicture').attr('src', `${config.relative_path}${edit.user.picture || edit.user.uploadedpicture}?${Date.now()}`);
		$('body').on('submit', '#profileEdit', function (e) {
			e.preventDefault();
			var userInfo = {
				fullname: $('#fullname').val(),
				pronoun: $('#pronoun').val(),
				birthday: $('#birthday').val(),
				location: $('#location').val(),
				social_designation: $('#social_designation').val(),
				signature: $('#signature').val(),
				aboutme: $('#aboutMe').val(),
			};
			notify('Saving...', 'info');
			doAjax({
				type: 'PUT',
				url: '/users/' + app.user.uid,
				dataType: 'xml/html/script/json',
				contentType: 'application/json',
				data: JSON.stringify(userInfo),
			})
				.then(function (res) {
					notify('Updated successfully', 'info');
				})
				.catch(function (error) {
					const { responseJSON } = error;
					if (responseJSON && responseJSON.status.message) {
						translator.translate(responseJSON.status.message).then(msg => notify(msg, 'error'));
					}
				}).finally(function () {
					location.href = '/mobile/profile/view';
				});

			const formData = new FormData(this);
			if (isPictureChanged) {
				doAjax({
					type: 'POST',
					url: '/api/user/' + app.user.userslug + '/uploadpicture',
					data: formData,
					cache: false,
					contentType: false,
					processData: false,
					isCustom: true,
				}).then(function (res) {
					if (Array.isArray(res) && res.length) {
						const { url } = res[0];
						$('body').find('#profilePicture').attr('src', url);
					}
					notify('Updated successfully', 'info');
				}).catch(function (error) {
					const { responseJSON } = error;
					if (responseJSON && responseJSON.status.message) {
						translator.translate(responseJSON.status.message).then(msg => notify(msg, 'error'));
					}
				});
			}
		});

		$.each(app.user, function (i, e) {
			$(`[name="${i}"]`).val(e);
		});

		$('#app-loader').hide();
	};

	return edit;
});
