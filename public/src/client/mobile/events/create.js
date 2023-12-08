'use strict';

/* globals define */

define('forum/mobile/events/create', ['api', 'translator'], function (api, translator) {
	var create = {};

	create.init = function () {
		// console.log(api);
		
		let category;
		let subCategory;
		let rrSubmit;

		// categories templates
		const _templates = {
			category: function (data) {
				return `<li class="category-container" collpsible>
					<div class="category-name" collapse cid="${data.cid}" category>
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
					<div class="sub-category" sub-category cid=${data.cid}>
						<p>${data.name}</p>
					</div>
				</li>`;
			},
		};

		api.get('/app/category?type=mobile', {}).then((res) => {
			$.each(res, function (i, data) {
				$('#open-categories').append(_templates.category(data));
			});
		});

		// show categories modal
		$('#events-category').on('click', function (event) {
			event.preventDefault();
			$('#categories-modal').modal('show');
			$('#categories-modal').addClass('show');
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

			category = parseInt($('[category].selected').attr('cid'));
			subCategory = parseInt($('[sub-category].selected').attr('cid'));
		});

		// save category selection
		$("body").on("click", "#submit-categories", function () {
			category = parseInt($("[category].selected").attr("cid"));
			subCategory = parseInt($("[sub-category].selected").attr("cid"));

			// showing selected category and subcategory in the select field
			const categoryName = $("[category].selected > p").text(),
				subCategoryName = $("[sub-category].selected > p").text();

			$("#category-placeholder").text(categoryName + " > " + subCategoryName);

			if (category != NaN && subCategory != NaN)
				notify("categories selected successfully", "success");
			$("#categories-modal").modal("hide");
			$("#categories-modal").removeClass("show");
		});

		// show rr modal
		$('body').on('click', '#event-rr', function () {
			$('#rr-modal').modal('show');
			$('#rr-modal').addClass('show');
		});

		// rr modal
		const incrementBtn = $('.inc-btn');
		const decrementBtn = $('.dec-btn');
		const rrVal = $('#rr-select');
		let newVal = 5;

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

		// rr modal submit
		$('#submit-rr').on('click', function (e) {
			e.preventDefault();
			rrSubmit = newVal;
			notify(`rigor rank set to ${rrSubmit}`, 'success');
			$("#rr-modal").modal("hide");
			$("#rr-modal").removeClass("show");
		});

		// submission post
		$("body").on("submit", "#create-event", function (e) {
			// console.log(button,"chini");
			$("#host-event-btn").prop("disabled", true);
			e.preventDefault();

			$("#host-event-btn").prop("disabled", true);

			let formData = new FormData(this);
			let schedule = moment(
				`${formData.get("date")} ${formData.get("time")}`
			).valueOf();
			formData.append('schedule', schedule);
			formData.append('category', category);
			formData.append('sub_category', subCategory);
			formData.append('rigor_rank', rrSubmit);
			console.log(...formData);

			doAjax({
				type: 'POST',
				url: '/app/events',
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
			}).then(function (res) {

				console.log(res.response.msg, "dsfdsm");
				console.log('Event id Tid', res.response);
				$("#host-event-btn").prop("disabled", true);
				if (res.response.tid) {
					notify(res.response.tid, "success");
				} else {
					
					notify("Your event has been successfully created", "success")
				}
				alert(`Here's your event Id ${JSON.stringify(res.response.tid)}`)
			}).catch((err) => {
				let { responseJSON } = err;
				$("#host-event-btn").prop("disabled", false);
				if (responseJSON && responseJSON.status.message) {
					translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
					$("#host-event-btn").prop("disabled", false);
				}
				else return notify('Oops! Some error occured while creating the event', 'error');
				$("#host-event-btn").prop("disabled", false);
			});
		});
		$('#app-loader').hide();
	};

	return create;
});
