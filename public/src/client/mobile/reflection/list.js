'use strict';

/* globals define */

define('forum/mobile/reflection/list', function () {
	var list = {};

	list.init = function () {
		const _templates = {
			templateTile: function (data) {
				return `<div class="rounded-lg secondary-border px-2 pb-2 template mb-4 shadow-sm template-tile" tid="${data.tid}">
                            <div class="d-flex justify-content-center">
                                <img src="${data.image}" alt="icon-one"
                                    class="img-cover circle-md rounded-circle translate-y--50">
                            </div>
                            <p class="text-center font-14 font-bold mb-2 template-title">${data.title}</p>
                            <p class="font-12 mb-0">${data.description}</p>
                        </div>`;
			},
		};

		$('#search-template').on('keyup', function () {
			const searchQuery = $(this).val().toLowerCase();
			$('.template-tile').each(function () {
				$(this).find('.template-title').text().toLowerCase()
					.indexOf(searchQuery) == -1 ? $(this).addClass('d-none') : $(this).removeClass('d-none');
			});
		});

		doAjax({
			type: 'GET',
			url: '/app/reflections/template',
			data: {},
		}).then(function (res) {
			const templates = res.response.data;

			$.map(templates, (template, index) => $('#list-container').append(_templates.templateTile(template)));

			$('#app-loader').hide();
		});

        $("#list-container").on("click", ".template-tile", function () {
            notify("Opening Template", "success");
            ajaxify.go(`/mobile/reflection/form/${$(this).attr("tid")}?parent=${ajaxify.data.parent}&ptype=${ajaxify.data.ptype}`);
        })
    };

	return list;
});
