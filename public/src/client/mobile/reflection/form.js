'use strict';

define('forum/mobile/reflection/form', function () {
	var form = {};

	form.init = function () {
		const _templates = {
			block: function (data) {
				return `<div class="form-group question-block">
                    <label class="font-12 question" for="q${app.numberToAlphabates(data.index + 1)}">Question ${data.index + 1}: ${data.question}</label>
                    <textarea class="form-control font-12 answer" id="q${app.numberToAlphabates(data.index + 1)}" aria-describedby="q${app.numberToAlphabates(data.index + 1)}ans"></textarea>
                </div>`;
			},
		};

		function renderBlocks(blocks) {
			for (let index = 0; index < blocks.length; index++) {
				const block = blocks[index];
				$('#questions-container').append(_templates.block({
					question: block.question,
					index,
				}));
			}
		}

		function fillBlocks(data) {
			for (let index = 0; index < data.blocks.length; index++) {
				const block = data.blocks[index];
				$($('.answer')[index]).val(block.answer);
			}

			$('#summary-input').val(data.summary);
		}

		const templateId = ajaxify.data.tid;
		const localStorageData = JSON.parse(localStorage.getItem('payload'));
		console.log(templateId);

		doAjax({
			type: 'GET',
			url: '/app/reflections/template',
			data: {
				tid: templateId,
			},
		}).then(function (res) {
			const templateData = res.response.data;
			renderBlocks(templateData.blocks);
			$('#template-title').text(templateData.title);
			$('#app-loader').hide();
			if (localStorageData.tid) localStorageData.tid == templateId ? fillBlocks(localStorageData) : localStorage.removeItem('payload');
		});

		$('body').on('submit', 'form', function (event) {
			event.preventDefault();

			const payload = {
				title: $('#title-input').val(),
				tid: templateId,
				summary: $('#summary-input').val(),
				parent_pid: ajaxify.data.parent,
				parent_type: ajaxify.data.ptype,
			};

			const blocks = [];
			$('.question-block').each(function (index) {
				blocks.push({
					question: $(this).find('.question').text(),
					answer: app.htmltoText($(this).find('.answer').val()),
				});
			});

			payload.blocks = blocks;

			localStorage.setItem('payload', JSON.stringify(payload));

            notify("Creating preview", "success");

            ajaxify.go("/mobile/reflection/review");
        })
    };

	return form;
});
