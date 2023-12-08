'use strict';

/* globals define */

define('forum/mobile/thoughtProcess/form', ['api'], function (api) {
	var form = {};

	form.init = function () {
		const _templates = {
			questionBlock: function (data, index) {
				return `<div class="form-group question-block">
                            <div class="question-summary pb-1 d-flex justify-content-between">
                                <p class="mb-0 font-12 font-bold">${data.summary}</p>
                                <i class="fa fa-solid fa-caret-down"></i>
                            </div>
                            <p class="mb-0 font-12 question-full d-none">Q${index + 1}. ${data.question}</p>

                            <input type="text" class="form-control font-12 summary-field mt-2"
                                placeholder="Enter custom summary for the question" maxlength="20">

                            <div class="d-flex justify-content-between my-2 icon-rack">
                                <button type="button" class="border-0 bg-transparent icon-option">
                                    <i class="fa fa-solid fa-anchor"></i>
                                </button>
                                <button type="button" class="border-0 bg-transparent icon-option">
                                    <i class="fa fa-solid fa-atom"></i>
                                </button>
                                <button type="button" class="border-0 bg-transparent icon-option">
                                    <i class="fa fa-solid fa-award"></i>
                                </button>
                                <button type="button" class="border-0 bg-transparent icon-option">
                                    <i class="fa fa-solid fa-binoculars"></i>
                                </button>
                                <button type="button" class="border-0 bg-transparent icon-option">
                                    <i class="fa fa-solid fa-chart-column"></i>
                                </button>
                                <button type="button" class="border-0 bg-transparent icon-option">
                                    <i class="fa fa-solid fa-chess-king"></i>
                                </button>
                            </div>
                            <div class="icon-message"></div>

                            <textarea name="answer-field" class="answer-field font-12 form-control" cols="30" rows="3"
                                placeholder="Enter your answer here..."></textarea>

                        </div>`;
			},
		};

		$('body').on('click', '.icon-option', function () {
			const iconRack = $(this).parent();
			$(iconRack).find('.brand-text').removeClass('brand-text');
			$(this).addClass('brand-text');
		});

		$('#questions-container').on('click', '.question-summary', function () {
			$(this).next().toggleClass('d-none');
		});

		api.get(`/thought_proccess/template?tid=${ajaxify.data.tid}`, {}).then(function (res) {
			console.log(res);
			const blocks = res.blocks;
			blocks.map((block, index) => $('#questions-container').append(_templates.questionBlock(block, index)));

			$('#app-loader').hide();
		});

		$('body').on('submit', 'form', function (event) {
			event.preventDefault();

			$(".asset-create-btn").prop("disabled", true);

			let blocks = [];

			$.each($('.question-block'), (index, questionBlock) => {
				if ($(questionBlock).find('.answer-field').val().trim() == '') {
					$(questionBlock).append("<p class='text-danger font-12 mb-0'>Please answer the question</p>");
					eraseWarnings();
				}

				if ($(questionBlock).find('.icon-option.brand-text').length == 0) {
					$(questionBlock).find('.icon-message').append("<p class='text-danger font-12 mb-0'>Please pick an icon that represents your answer</p>");
					eraseWarnings();
				}

				if ($(questionBlock).find('.summary-field').val().trim()) {
					const block = {
						summary: $(questionBlock).find('.summary-field').val(),
						answer: $(questionBlock).find('.answer-field').val(),
						icon: $(questionBlock).find('.icon-option.brand-text').children('i').attr('class'),
					};
					blocks.push(block);
				} else {
					const block = {
						summary: $(questionBlock).find('.question-summary').children('p').text(),
						answer: $(questionBlock).find('.answer-field').val(),
						icon: $(questionBlock).find('.icon-option.brand-text').children('i').attr('class'),
					};
					blocks.push(block);
				}
			});

			if ($('.text-danger').length == 0) {
				blocks = JSON.stringify(blocks);

				localStorage.setItem('thoughtprocess', JSON.stringify({ blocks }));

				notify('thought process created', 'success');

				if (ajaxify.data.ptype == 'post')
					ajaxify.data.parent ? ajaxify.go(`/mobile/post/create?pid=${parseInt(ajaxify.data.parent)}`) : ajaxify.go(`/mobile/post/create`);
				else if (ajaxify.data.ptype == 'article')
					ajaxify.data.parent ? ajaxify.go(`/mobile/article/create?pid=${parseInt(ajaxify.data.parent)}`) : ajaxify.go(`/mobile/article/create`);
			} else $(".asset-create-btn").prop("disabled", false);
		})

		function eraseWarnings() {
			setTimeout(() => {
				$.each($('.text-danger'), (index, warning) => {
					$(warning).remove();
				});
			}, 3000);
		}
	};

	return form;
});
