'use strict';

/* globals define */

define('forum/mobile/reflection/view', ['sdlms/enquiryform'], function () {
	var view = {};

	view.init = function () {
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

		doAjax({
			type: 'GET',
			url: '/app/reflection',
			data: {
				pid: ajaxify.data.pid,
			},
		}).then(function (res) {
			const reflectionData = res.response.data.length ? res.response.data[0] : {};

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
		});
	};

	return view;
});
