'use strict';

/* globals define */

define('forum/mobile/reflection/review', ['sdlms/enquiryform'], function () {
	var review = {};

	review.init = function () {
		const { reflection, author } = ajaxify.data;

		const _templates = {
			accordianBlock: function (data) {
				return `<div class="mb-2 reflection-question" collpsible>
                            <div collapse>
                                <h2 class="mb-0">
                                    <button
                                        class="button-primary d-flex justify-content-between w-100 border-0 rounded-lg button-lg-p"
                                        type="button">
                                        <p class="font-12 mb-0">${data.block.question}</p>
                                        <i class="fa-solid fa-chevron-down font-12" collapse-icon></i>
                                    </button>
                                </h2>
                            </div>

                            <div collapse-body>
                                <div class="px-2 font-12">${data.block.answer}</div>
                            </div>
                        </div>`;
			},
		};

		$('#author-img').attr('src', app.user.picture);
		$('#author-name').text(`${app.user.displayname}'s reflection`);

		const reflectionData = JSON.parse(localStorage.getItem('payload'));

        $("#confirm-btn").on("click", function () {
            notify("submitting  reflection", "info")
            $(".asset-create-btn").prop("disabled", true);
            doAjax({
                type: 'POST',
                url: "/app/reflection",
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(reflectionData),
            }).then(function (res) {
                localStorage.removeItem('payload')
                notify("reflection created", "success")
                ajaxify.go(`/mobile/reflection/view/${res.response.pid}`);
            }).catch((err) => {
                let { responseJSON } = err;
                $(".asset-create-btn").prop("disabled", false);
                if (responseJSON && responseJSON.status.message) {
                    translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
                }
                else return notify('Oops! Some error occured while creating the reflection', 'error');
            });
        })

		$('#prev-btn').on('click', function () {
			ajaxify.go(`/mobile/reflection/form/${reflectionData.tid}?parent=${reflectionData.parent_pid}&ptype=${reflectionData.parent_type}`);
		});

		$('#summary-text').text(reflectionData.summary);
		$.map(reflectionData.blocks, (block, index) => {
			const blockData = {
				block,
				index,
			};
			console.log(blockData);
			$('#reflectionAccordion').append(_templates.accordianBlock(blockData));
		});

		$('#app-loader').hide();
	};

	return review;
});
