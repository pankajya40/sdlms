"use strict";

/* globals define */

define("forum/contentManager/view", [
	'api',
	"forum/contentManager/cards",
	"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.full.js",
	"sdlms/pagination"
], function (api) {
	var view = {};

	/**
	 * @author raman
	 * @function view.events
	 * @description will add the event listeners to filters on view tab and to the cards as well.
	 */
	view.events = function () {

		$('body').off('click', '[data-contentid]')
			.on('click', '[data-contentid]', function () {
				let id = $(this).data('contentid');

				ajaxify.go('/content/view/' + id);
			});

		$("#titleSearch").off('change').on('change', function () {
			if ($(this).val() !== '')
				ajaxify.go(`/content/view?title=${$(this).val()}`, {})
		})

		$("#searchBy").on('change', function () {
			if ($(this).val() !== '') {
				ajaxify.go(`/content/view?author=${$(this).val()}`, {})
			}
		})
	}

	view.pagination = () => new Pagination({
		target: '#view-page-pagination',
		onChange: view.paginate
	});

	/**
	 * @author raman
	 * @function view.paginate
	 * @description will be used for paginating the cards used to show the minimum content-info cards.
	 */
	view.paginate = function (url) {
		$("#content-info-cards").empty();
		api.get(url, {}).then((contents) => {
			if (contents.data.length > 0) {
				contents.data.map((content) => {
					$("#content-info-cards").append(new CardTemplate(content).card);
				});
				view.pagination().paginate(contents)
			} else {
				$("#content-info-cards").append($("<div class='no-placeholder-container'><p class='badge rounded-pill no-placeholder'>No Content Yet!</p></div>"))
			}
		});
	};

	/**
	 * @author raman
	 * @function view.getGrid
	 * @description will be used to get the grid of cards to show the minified content cards
	 * 
	 */
	view.getGrid = function getGrid() {
		$('#content-info-cards').empty()
		let contents = ajaxify.data
		if (contents.data.length > 0) {
			contents.data.map((content) => {
				$("#content-info-cards").append(new CardTemplate(content).card);
			});
		} else {
			$("#content-info-cards").append($("<div class='no-placeholder-container'><p class='badge rounded-pill no-placeholder'>No Content Yet!</p></div>"))
		}
	}

	/**
	 * @author raman
	 * @function view.getSelectTo
	 * @description will be used to add the filter for "search by username" on view tab.
	 */
	view.getSelectTo = function () {
		$("[user-name-select-for-view]").select2({
			width: '20%',
			placeholder: "Written by",
			ajax: {
				url: '/api/users',
				dataType: 'json',
				data: function (params) {
					var query = {
						query: params.term
					}
					return query;
				},
				processResults: function (data) {
					let results = {
						results: data.users.map(function (row) {
							return {
								id: row.uid,
								text: row.displayname || row.fullname || row.username
							}
						})
					};
					return results;
				}
			}
		});
	}

	/**
	 * @author raman
	 * @function view.hideNavigation
	 * @description will be used for hiding the pagination buttons, if data is null.
	 */
	view.hideNavigation = function () {
		let { data } = ajaxify.data;

		if (data.length) {
			$('.sdlms-pagination').show();
		}

	}
	view.init = () => {

		view.hideNavigation();
		view.events();
		view.getSelectTo();
		view.getGrid();
	};

	return view;
});

