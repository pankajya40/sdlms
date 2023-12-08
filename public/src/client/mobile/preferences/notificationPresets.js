'use strict';

/* globals define */

define('forum/mobile/preferences/notificationPresets', function () {
	var notificationPresets = {};

	notificationPresets.init = function () {
		$('body').on('click', '.notification-preset', function () {
			for (let index = 0; index < 2; index++) {
				const selectedHr = $('.tertiary-border')[0];
				$(selectedHr).removeClass('tertiary-border');
			}
			$('.preset-header.brand-text').removeClass('brand-text');
			$('.preset-icon.brand-text').removeClass('brand-text');
			$(this).find('.preset-icon').addClass('brand-text');
			$(this).find('.preset-header').addClass('brand-text');
			$(this).prev('hr').addClass('tertiary-border');
			$(this).next('hr').addClass('tertiary-border');
		});

		$('#app-loader').hide();
	};

	return notificationPresets;
});
