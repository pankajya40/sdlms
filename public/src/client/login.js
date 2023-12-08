'use strict';

const home_routes = {
    parent: '/parentDashboard',
    student:'/monitor'
}
let url = home_routes[window.app.user.userType] || '/monitor';

define('forum/login', ['jquery-form'], function () {
	var Login = {};

	Login.init = function () {
		console.log('here in login')
		var errorEl = $('#login-error-notify');
		var submitEl = $('#login');
		var formEl = $('#login-form');
		submitEl.on('click', function (e) {
			e.preventDefault();

			if (!$('#username').val() || !$('#password').val()) {
				errorEl.find('p').translateText('[[error:invalid-username-or-password]]');
				errorEl.show();
			} else {
				errorEl.hide();

				if (submitEl.hasClass('disabled')) {
					return;
				}

				submitEl.addClass('disabled');

				$(window).trigger('action:app.login');
				formEl.ajaxSubmit({
					headers: {
						'x-csrf-token': config.csrf_token,
					},
					beforeSend: function () {
						app.flags._login = true;
					},
					success: function (data) {
						$(window).trigger('action:app.loggedIn', data);
						var pathname = utils.urlToLocation(data.next).pathname;
						var params = utils.params({
							url: data.next
						});
						params.loggedin = true;
						var qs = decodeURIComponent($.param(params));
						try {
							/**
							 * @author Unknown [19-03-2022]
							 * @description Added Redirect to the page after registration from url
							 */

							var queryString = app.getQueryParams();
							console.log(window.app.user.userType)
							if (queryString.url) {
								ajaxify.go(queryString.url);
								// ajaxify.go('/parentDashboard');
							} else {
								// ajaxify.go(url);
								// console.log(app)
								// ajaxify.go('/parentDashboard'); // the ajaxify.go thing isn't working , it requires refreshing for it to recognize the user(  initially logs in a guest user )
								// window.location.href = config.relative_path + url;
								
								// Changing it to dashboard page
								window.location.href = config.relative_path + '/dashboard';
							}

						} catch (error) {
							ajaxify.go('/monitor');
							// ajaxify.go('/parentDashboard');
						}
					},
					error: function (data) {
						if (data.status === 403 && data.responseText === 'Forbidden') {
							window.location.href = config.relative_path + '/login?error=csrf-invalid';
						} else {
							errorEl.find('p').translateText(data.responseText);
							errorEl.show();
							submitEl.removeClass('disabled');

							// Select the entire password if that field has focus
							if ($('#password:focus').length) {
								$('#password').select();
							}
						}
					},
				});
			}
		});

		$('#login-error-notify button').on('click', function (e) {
			e.preventDefault();
			errorEl.hide();
			return false;
		});

		if ($('#content #username').val()) {
			$('#content #password').val('').focus();
		} else {
			$('#content #username').focus();
		}
		$('#content #noscript').val('false');
	};

	return Login;
});