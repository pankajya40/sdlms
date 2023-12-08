'use strict';

/* globals define */

define('forum/mobile/nudge/create', ["api", "translator"], function (api, translator) {
	var CreateNudge = {};

	CreateNudge.init = function () {
		let assetType = null,
			assetId,
			eventsPage = 0,
			articlesPage = 0;

		$("body").on("click", function () {
			if ($("#assetId").is(":focus"))
				assetType == 'event' ?
					$("#event-listing-container").removeClass("d-none") :
					$("#article-listing-container").removeClass("d-none");
			else {
				$("#event-listing-container").addClass("d-none");
				$("#article-listing-container").addClass("d-none");
			}
		});

		$('[name="asset_type"]').on("change", function () {
			assetType = $(this).val();
			$("#attachment-listing-container").empty();
		});

		$('#assetId').on("keyup", function () {
			const searchQuery = $(this).val().toLowerCase();

			if (assetType == "event") {
				if ($(".attchment-listing").not(".d-none").length < 5)
					eventsPage = appendEvents(eventsPage, searchQuery);
			} else {
				if ($(".attchment-listing").not(".d-none").length < 5)
					articlesPage = appendArticles(articlesPage, searchQuery);
			}

			filterListings(searchQuery);
		});

		$("body").on("click", ".attchment-listing", function () {
			assetId = $(this).data("id");
			notify(`${assetType} ${$(this).find(".name").text()} selected`)
			console.log(assetId);
		});

		$('body').on('submit', '#nudgeCreate', function (e) {
			e.preventDefault();
			$(".asset-create-btn").prop("disabled", true);

			const formData = new FormData(this);
			formData.append('assetId', assetId);

			doAjax(
				{
					type: 'POST',
					url: '/app/nudge',
					data: formData,
					cache: false,
					contentType: false,
					processData: false,
				}
			).then(function () {
				notify('Nudge has been successfully created');
				ajaxify.refresh();
			})
				.catch(function (err) {
					let { responseJSON } = err;
					$(".asset-create-btn").prop("disabled", false);
					if (responseJSON && responseJSON.status.message) {
						translator.translate(responseJSON.status.message).then(msg => notify(msg, 'error'));
					} else return notify('Oops! Some error occured while creating the Nudge', 'error');
				});
		});

		$('#app-loader').hide();
	};

	function appendEvents(pageNum, searchQuery) {
		api.post(`/app/getevents?type=latest&limit=5&page=${pageNum}`, {}).then((res) =>
			pageNum <= res.last_page && $.map(res.data, (eventData) => $("#event-listing-container").append(_templates.listing(eventData, 'event')))
		)

		return ++pageNum;
	}

	function appendArticles(pageNum, searchQuery) {
		api.post(`/app/getarticles?type=latest&limit=5&page=${pageNum}`, {}).then((res) =>
			pageNum <= res.last_page && $.map(res.data, (articleData) => $("#article-listing-container").append(_templates.listing(articleData, 'article')))
		)

		return ++pageNum;
	}

	function filterListings(searchQuery) {
		$(".attchment-listing").each(function () {
			const attachmentName = $(this).find(".name").text().toLowerCase();
			if (attachmentName.indexOf(searchQuery) == -1) {
				$(this).addClass("d-none");
				$(this).removeClass("d-flex");
			}
			else {
				$(this).removeClass("d-none");
				$(this).addClass("d-flex");
			}
		});
	}

	const _templates = {
		listing: function (data, assetType) {
			return `<div class="attchment-listing d-flex align-items-center py-2" data-id=${assetType == 'event' ? data.tid : data.pid}>
						<img src="${data.image}" alt="attchment-img" class="circle-sm rounded-circle img-cover mr-2">
						<p class="font-12 name mb-0">${data.name ? data.name : data.title}</p>
					</div>`
		},
	}

	return CreateNudge;
});
