'use strict';

/* globals define */

define('forum/mobile/preferences/learningStyles', function () {
	var learningStyles = {};

	learningStyles.init = function () {
		let prevImgSrc = 'https://cdni.iconscout.com/illustration/premium/preview/deep-learning-illustration-concept-1533030-1304577.png?w=0&h=700';
		const selectedImgSrc = 'https://blog.deepthought.education/wp-content/uploads/2022/06/blue-tick.svg';

		$('body').on('click', '.learning-style', function () {
			$('.selected-style').find('img').attr('src', prevImgSrc);
			$('.selected-style').removeClass('selected-style');
			prevImgSrc = $(this).find('img').attr('src');
			$(this).find('img').attr('src', selectedImgSrc);
			$(this).addClass('selected-style');
		});

		$('#app-loader').hide();
	};

	return learningStyles;
});
