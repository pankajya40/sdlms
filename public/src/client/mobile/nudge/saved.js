'use strict';

/* globals define */

define('forum/mobile/nudge/saved', function () {
	var saved = {};

	saved.init = function () {
		$("body").on("click", function (event) {
			if ($.contains($("#filtering-btn")[0], event.target) || $.contains($("#filtering-btn > img")[0], event.target))
				$("#filtering-options").removeClass("d-none");
			else
				$("#filtering-options").addClass("d-none");
		});

		console.log("after");

		$("#filtering-options").on("click", ".filter-opt", function () {
			const filterSelect = $(this).data("filterby")
			filterNudges(filterSelect);
		});

		appendNudges().then(
			function (nudges) {
				$('#app-loader').hide();
				console.log('Nudges', nudges);

				// lazy load nudges
				const check = {
					root: null,
					rootMargin: '0px',
					threshold: 0.1,
				};
				let nudgePage = 1;

				const nudgesObserver = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting && nudgePage < nudges.pageCount) {
						appendNudges(nudgePage);
						nudgePage++;
					}
				}, check);
				nudgesObserver.observe(document.getElementById('page-checker'));
			}
		);
	};

	function filterNudges(filterSelect) {
		const currentTimestamp = Date.now();

		switch (filterSelect) {

			case 'upcoming':
				$.each($(".nudge-listing"), function (i, nudge) {
					const nudgeStart = $(nudge).data("start-time");
					if (nudgeStart > currentTimestamp) {
						$(nudge).removeClass("d-none");
						$(nudge).addClass("d-flex");
					} else {
						$(nudge).addClass("d-none");
						$(nudge).removeClass("d-flex");
					}
				});
				break;

			case 'ongoing':
				$.each($(".nudge-listing"), function (i, nudge) {
					const nudgeStart = $(nudge).data("start-time"),
						nudgeEnd = $(nudge).data("end-time");
					if (nudgeStart <= currentTimestamp && nudgeEnd > currentTimestamp) {
						$(nudge).removeClass("d-none");
						$(nudge).addClass("d-flex");
					} else {
						$(nudge).addClass("d-none");
						$(nudge).removeClass("d-flex");
					}
				});
				break;

			case 'articles':
				$.each($(".nudge-listing"), function (i, nudge) {
					const nudgeType = $(nudge).data("type");
					if (nudgeType == "Article") {
						$(nudge).removeClass("d-none");
						$(nudge).addClass("d-flex");
					} else {
						$(nudge).addClass("d-none");
						$(nudge).removeClass("d-flex");
					}
				});
				break;

			case 'events':
				$.each($(".nudge-listing"), function (i, nudge) {
					const nudgeType = $(nudge).data("type");
					if (nudgeType == "Event") {
						$(nudge).removeClass("d-none");
						$(nudge).addClass("d-flex");
					} else {
						$(nudge).addClass("d-none");
						$(nudge).removeClass("d-flex");
					}
				});
				break;
		}
	}

	async function appendNudges(pageNumber = 0) {

		let getNudges = new Promise((resolve, reject) => {
			doAjax({
				type: 'GET',
				url: `/app/saved/nudge?page=${pageNumber}`,
				data: {},
			}).then(function (res) {
				let pageCount = res.response.last_page + 1;
				let pageData = res.response.data;
				let nudges = {
					pageCount,
					pageData
				}

				resolve(nudges);
				reject("no data");
			})
		})

		let nudges = await getNudges;

		nudges.pageData.map((data) => $("#page-container").append(_templates.listing(data)));
		return nudges;
	}

	const _templates = {
		listing: function (data) {
			let {user} = data;
			
			return `<div class="nudge-listing" nudgeId=${data.assetId} data-start-time=${data.schedule} data-end-time=${data.end_time} data-type=${data.asset_type}>
						<div class="d-flex justify-content-between align-items-center mt-3 mb-1 container">
							<div class="nudge-details ml-2 mr-1 d-flex">
								<img style="object-fit: contain;" src="${data.image}" alt="random-img" class="img-cover listing-img rounded-lg mr-3">
								<div>
									<p class="font-14 font-medium mb-0">${data.title}</p>
									<p class="font-12 brand-text mb-0">by ${user.fullname || user.username}</p>
									<p class="mb-0 mt-3 font-12 truncate-line-2">${data.description}</p>
								</div>
							</div>
							<img src="https://blog.deepthought.education/wp-content/uploads/2022/08/chevron-right.svg">
						</div>
						<hr class="mt-2">
					</div>`
		},
	}

	return saved;
});
