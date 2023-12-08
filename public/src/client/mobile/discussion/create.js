'use strict';

/* globals define */

define('forum/mobile/discussion/create', ['api', 'translator'], function (api, translator) {
	var create = {};

	create.init = function () {
		$('#app-loader').hide();

		function appendEvents(pageNum) {
			api.post(`/app/getevents?type=latest&limit=5&page=${pageNum}`, {}).then(res => pageNum <= res.last_page && $.map(res.data, eventData => $('#events-menu').append(_templates.event(eventData)))
			);

			return ++pageNum;
		}

		// show rr modal
		$('body').on('change', '#dr-participant-criteria', function () {
			if ($(this).val() == 'rr') {
				$('#rr-modal').modal('show');
				$('#rr-modal').addClass('show');
			}
		});

		// rr modal
		const incrementBtn = $('.inc-btn');
		const decrementBtn = $('.dec-btn');
		const rrVal = $('#rr-select');
		let newVal = 5;
		let cid;
		let eventsPage = 0;
		let sub_cid;
		let x = 0;

		incrementBtn.on('click', () => {
			if (rrVal.val() < 10) newVal = parseFloat(rrVal.val()) + 1;
			else newVal = 10;

			rrVal.val(newVal);
		});

		decrementBtn.on('click', () => {
			if (rrVal.val() > 0) newVal = parseFloat(rrVal.val()) - 1;
			else newVal = 0;

			rrVal.val(newVal);
		});

		$('body').on('click', '#submit-rr', () => {
			$('#rr-modal').modal('hide');
			$('#rr-modal').removeClass('show');
		});

		//preview image
		function readURL(input) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();

				reader.onload = function (e) {
					console.log(e.target.result);
					$('#preview-img').css('background-image', 'url(' + e.target.result + ')');

				}
				x = 1;
				reader.readAsDataURL(input.files[0]);
			}
		}

		$('#event-img').on('change', function () {
			console.log($(this).val);
			readURL(this)
		});




		// show categories modal
		$('#dr-category').on('click', function (event) {
			event.preventDefault();
			$('#categories-modal').modal('show');
			$('#categories-modal').addClass('show');
		});

		// api get categories
		api.get("/app/category?type=mobile", {}).then((res) => {
			$.each(res, function (i, data) {
				$('#open-categories').append(_templates.category(data));
			});
		});

		// categories modal working
		$('body').on('click', '[sub-category]', function (e) {
			if ($('[sub-category].selected')) {
				$('[sub-category].selected').removeClass('selected');
				$('[category].selected').removeClass('selected');
			}
			$(this).toggleClass('selected');
			const parent = $(this).parents('[collpsible]').first();
			const parentCategory = $(parent).find('[category]').first();
			$(parentCategory).addClass('selected');
			if ($('[sub-category].selected').length == 0) $(parentCategory).removeClass('selected');
		});

		$("#submit-categories").on("click", () => {
			cid = $("[category].selected").data("cid");
			sub_cid = $("[sub-category].selected").data("cid");

			// showing selected category and subcategory in the select field
			const categoryName = $("[category].selected > p").text(),
				subCategoryName = $("[sub-category].selected > p").text();

			$("#category-placeholder").text(categoryName + " > " + subCategoryName);

			$("#categories-modal").modal("hide");
			$("#categories-modal").removeClass("show");
			$("#serch-articles-modal").modal("show");
			$("#serch-articles-modal").addClass("show");
		});

		const filterIcon = document.querySelectorAll('.filter-icon');
		const filters = document.querySelectorAll('.filters');
		const closeFilterBtn = document.querySelectorAll('.close-filter-btn');
		const toggleFilter = function () {
			for (let i = 0; i < filters.length; i++) filters[i].classList.toggle('d-flex');
		};
		for (let i = 0; i < filterIcon.length; i++) filterIcon[i].addEventListener('click', toggleFilter);
		for (let i = 0; i < closeFilterBtn.length; i++) closeFilterBtn[i].addEventListener('click', toggleFilter);

		// article selection
		let articlesPage = 1;
		let selectedArticle;

		// getting initial articles
		doAjax({
			type: 'POST',
			url: '/app/getarticles?limit=5',
			method: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: {},
		}).then(function (res) {
			console.log(res);
			res.response.data.map(article => $('#articles-modal-body').append(_templates.article(article)));
		});

		// on selecting article
		$('body').on('click', '.article', function () {
			selectedArticle = $(this).attr('pid');
			$('#serch-articles-modal').modal('hide');
			$('#serch-articles-modal').removeClass('show');
		});

		// on skipping selection
		$('body').on('click', '#skip-article-select', function () {
			selectedArticle = null;
			$('#serch-articles-modal').modal('hide');
			$('#serch-articles-modal').removeClass('show');
		});

		// filtering articles on search
		$('body').on('keyup', '#article-input', function () {
			const listedArticles = $('.article');
			const searchQuery = $('#article-input').val().toUpperCase();

			for (let index = 0; index < listedArticles.length; index++) {
				const listedArticle = listedArticles[index];
				const articleHeading = $(listedArticle).find('.article-heading').text().toUpperCase();
				if (articleHeading.indexOf(searchQuery) <= -1) {
					$(listedArticle).removeClass('d-flex');
					$(listedArticle).addClass('d-none');
				} else {
					$(listedArticle).addClass('d-flex');
					$(listedArticle).removeClass('d-none');
				}
			}

			$('.article.d-flex').length < 5 && renderArticles();
		});

		// function to render 5 more articles
		function renderArticles() {
			doAjax({
				type: 'POST',
				url: `/app/getarticles?limit=5&page=${articlesPage}`,
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: {},
			}).then(function (res) {
				console.log(res);
				res.response.data.map(article => $('#articles-modal-body').append(_templates.article(article)));
				return res;
			});

			articlesPage++;
		}

		// showing list of users when user searches for potential mods

		$('body').on('click', function () {
			$('#username-search').is(':focus') ?
				$('#users-menu').removeClass('d-none') :
				$('#users-menu').addClass('d-none');
		});

		$('body').on('keyup', '#username-search', function () {
			$.ajax({
				url:
					config.relative_path +
					`/api/users?query=${$(this).val()}&paginate=true`,
				type: 'GET',
				dataType: 'json',
				success: function (res) {
					$('#user-menu-content').empty();
					for (
						let index = 0;
						index < (res.users.length > 10 ? 10 : res.users.length);
						index++
					) {
						const user = res.users[index];
						$('#user-menu-content').append(_templates.user(user));
					}
				},
			});
		});

		$('body').on('click', '.user-listing', function () {
			const userData = {
				uid: parseInt($(this).attr('uid')),
				name: $(this).find('.user-name').text(),
			};
			$('#mod-holder').append(_templates.selectedMods(userData));
			$('#username-search').val('');
		});

		$('#mod-holder').on('click', '.mod-card', function () {
			$(this).remove();
		});

		$('body').on('click', function () {
			$('#events-search').is(':focus') ?
				$('#events-menu').removeClass('d-none') :
				$('#events-menu').addClass('d-none');
		});

		$('body').on('keyup', '#events-search', async function () {
			$('#events-menu').removeClass('d-none');

			if ($('.event-listing').not('.d-none').length < 5) eventsPage = await appendEvents(eventsPage);

			const searchQuery = $(this).val().toLowerCase();
			$('.event-listing').each(function () {
				const eventName = $(this).find('.name').text().toLowerCase();
				if (eventName.indexOf(searchQuery) == -1) {
					$(this).addClass('d-none');
					$(this).removeClass('d-flex');
				} else {
					$(this).removeClass('d-none');
					$(this).addClass('d-flex');
				}
			});
		});

		$('#events-menu').on('click', '.event-listing', function () {
			const eventData = {
				tid: $(this).data('tid'),
				name: $(this).find('.name').text(),
			};

			$('#events-holder').append(_templates.selectedEvent(eventData));
		});

		$('#events-holder').on('click', '.event-card', function () {
			$(this).remove();
		});

		// submission
		$('body').on('submit', '#create-dr-form', function (e) {
			e.preventDefault();
			if (x == 0) {
				console.log("HERE");
				notify('attach image', 'failure');
			} else {
				notify('Creating discussion room', 'success');

				$(".asset-create-btn").prop("disabled", true);

				// let formData = new FormData(this);
				const formData = new FormData(this);

				const selectedMods = [];
				const selectedEvents = [];

				// collecting mod ids
				$('.mod-card').each(function () {
					selectedMods.push($(this).data('uid'));
				});

				// collecting event id
				$('.event-card').each(function () {
					selectedEvents.push($(this).data('tid'));
				});

				console.log(app.htmltoText($('#dr-name').val()));
				console.log(app.htmltoText($('#dr-description').val()));
				console.log(app.htmltoText($('#dr-rules').val()));

				formData.append('cid', cid);
				formData.append('sub_cid', sub_cid);
				formData.append('type', 'discuss_room');
				formData.append('rigor_rank', newVal);
				selectedArticle != null && formData.append('attachment_id', selectedArticle);
				formData.append('moderators', selectedMods);
				formData.append('name', app.htmltoText($('#dr-name').val()));
				formData.append('description', app.htmltoText($('#dr-description').val()));
				formData.append('rules', app.htmltoText($('#dr-rules').val()));

				console.log(...formData);

				doAjax({
					type: 'POST',
					url: '/app/createroom',
					data: formData,
					cache: false,
					contentType: false,
					processData: false,
				}).then(function (res) {
					notify('Discussion room created!', 'success');
					ajaxify.go(`/mobile/discussion/${res.response.roomId}`);
				}).catch((err) => {
					let { responseJSON } = err;
					console.log("this is error" + err);
					$(".asset-create-btn").prop("disabled", false);
					if (responseJSON && responseJSON.status.message) {
						translator.translate(responseJSON.status.message).then(msg => notify(msg, 'error'));
					} else return notify('Oops! Some error occured while creating the discussion room', 'error');
				});
			}


		});
	};

	const _templates = {
		article: function (data) {
			return `<div class="article col-10 d-flex mb-3 mx-auto" pid=${data.pid}>
							<div class="article-img">
								<img src="${data.image}"
									alt="" class="img-cover circle-lg rounded-circle">
							</div>
							<div class="article-text line-height-12px ml-2">
								<h2 class="article-heading font-10 font-regular mb-0">${data.title}</h2>
								<p class="article-date brand-text font-8 font-regular mb-0">${moment(data.timestamp).format('ddd, MMM DD, YYYY')}</p>
								<p class="article-content primary-text font-8 font-regular mb-0 truncate-line-2">${app.htmltoText(data.content)}</p>
							</div>
						</div>`;
		},
		user: function (data) {
			return `<div class="user-listing d-flex" uid=${data.uid}>
                            <img src="${data.picture}" alt="user-img" class="circle-sm rounded-circle img-cover">
                            <p class="font-12 user-name">${data.displayname}</p>
                        </div>`;
		},
		event: function (data) {
			return `<div class="event-listing d-flex" data-tid=${data.tid}>
                            <img src="${data.image}" alt="event-img" class="circle-sm rounded-circle img-cover">
                            <p class="font-12 name">${data.name}</p>
                        </div>`;
		},
		selectedEvent: function (data) {
			return `<div class="bg-white rounded-lg shadow-sm d-flex p-2 align-items-center justify-content-between event-card" data-tid=${data.tid}>
							<p class="event-name mb-0">${data.name}</p>
							<i class="fa-solid fa-xmark remove-event-btn"></i>
						</div>`;
		},
		selectedMods: function (data) {
			return `<div class="bg-white rounded-lg shadow-sm d-flex mt-1 mod-card p-2 align-items-center justify-content-between" data-uid=${data.uid}>
							<p class="mod-name mb-0">${data.name}</p>
							<i class="fa-solid fa-xmark remove-mod-btn ml-2"></i>
						</div>`;
		},
		category: function (data) {
			return `<li class="category-container" collpsible>
					<div class="category-name" data-cid="${data.cid}" collapse category>
						<p>${data.name}</p>
						<i class="fas fa fa-solid fa-chevron-down chevron-180 mr-2" collapse-icon></i>
					</div>
					<ul collapse-body style="display: none;">
						${data.sub_categories.map(e => _templates.subCategory(e)).join('')}
					</ul>
				</li>`;
		},
		subCategory: function (data) {
			return `<li>
					<div class="sub-category" sub-category data-cid=${data.cid}>
						<p>${data.name}</p>
					</div>
				</li>`;
		},


	};

	return create;
});
