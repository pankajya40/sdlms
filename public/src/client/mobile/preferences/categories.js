'use strict';

/* globals define */

define('forum/mobile/preferences/categories', ['api'], function (api) {
	var categories = {};

	categories.init = function () {
		const selectedCategories = [];

		$('body').on('click', '.category-block', function () {
			if ($(this).find('.overlay-block').hasClass('overlay-black-60')) {
				$(this).find('.overlay-block').removeClass('overlay-black-60');
				$(this).find('.overlay-block').addClass('overlay-brand-60');
				selectedCategories.push({ cid: $(this).data('cid') });
			} else {
				$(this).find('.overlay-block').addClass('overlay-black-60');
				$(this).find('.overlay-block').removeClass('overlay-brand-60');
				selectedCategories.pop({ cid: $(this).data('cid') });
			}
		});

		$('#submit-btn').on('click', () => {
			console.log(selectedCategories);
			api.put('/app/preferences', { preferences: selectedCategories })
				.then(res => console.log(res));
		});

		$('#app-loader').hide();
	};

	return categories;
});
