'use strict';

/* globals define */

define('forum/mobile/reflectionTemplate/create', ['api', 'sdlms/enquiryform', 'translator'], function (translator) {
	var create = {};

	create.init = function () {
		$('#add-btn').on('click', () => {
			++blockCount;
			$('#blocks-container').append(_templates.block());
		});

		$('#blocks-container').on('click', '.remove-block-btn', function () {
			$(this).parents('.question-block').remove();
		});

		$("#template-form").on("submit", function (event) {
			event.preventDefault();
			$(".asset-create-btn").prop("disabled", true);

			const blocks = [];
			$.each($('.question-block'), (index, questionBlock) => {
				const question = { question: $(questionBlock).find('.question-field').val() };
				blocks.push(question);
			});

			const formData = new FormData(this);

			formData.append('title', app.htmltoText($('#title-field').val()));
			formData.append('description', app.htmltoText($('#pitch-field').val()));
			formData.append('blocks', JSON.stringify(blocks));

			console.log(...formData);

			doAjax({
				type: 'POST',
				url: "/app/reflections/template",
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
			}).then(function (res) {
				console.log("template created", res);
				notify("Template created succesfully", "success");
			}).catch((err) => {
				let { responseJSON } = err;
				$(".asset-create-btn").prop("disabled", false);
				if (responseJSON && responseJSON.status.message) {
					translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
				}
				else return notify('Oops! Some error occured while creating the template', 'error');
			});
		})

		$('#app-loader').hide();
	};

	let blockCount = 1;

	const _templates = {
		block: function () {
			return `<div class="question-block mt-4" data-blocknum=${blockCount}>
                <div class="form-group">
                    <div class="d-flex justify-content-between align-items-center">
                        <label class="font-12" for="q${blockCount}">Enter question:</label>
                        <button type="button" class="remove-block-btn bg-transparent p-2 border-0">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    <input type="text" class="form-control font-12 question-field" id="q${blockCount}"
                        aria-describedby="q1-ans">
                </div>
            </div>`;
		},
	};

	return create;
});
