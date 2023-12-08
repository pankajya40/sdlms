'use strict';

/* globals define */

define('forum/mobile/discussion/modlist', ['api'], function (api) {
	var modlist = {};

	modlist.init = function () {
		const _templates = {
			card: function (data) {
				return `<div class="shadow-sm rounded-10-px mt-2 p-2 mod-card" uid=${data.uid}>
							<div class="d-flex justify-content-between align-items-center">
								<div class="d-flex">
									<img src="${data.picture}"
										alt="mod-1" class="img-cover circle-md rounded-circle mr-2">
									<div>
										<p class="mb-0 font-10 brand-text">Moderator</p>
										<p class="font-12 mb-0 mod-name">${data.displayname}</p>
									</div>
								</div>
								<div>
									<p class="mb-1 font-10">Rigor rank: ${data.rigor_rank}</p>
									<p class="mb-1 font-10">Articles written: 4</p>
									<p class="font-10 mb-0">Discussion Rooms: 1</p>
								</div>
							</div>
							<div class="d-flex mt-2 justify-content-center">
								<button type="button" class="button-primary rounded-lg button-md-p border-0 font-medium font-10"
									id="send-mod-message">Send
									Message</button>
								<button type="button"
									class="button-primary rounded-lg button-md-p border-0 font-medium ml-4 font-10"
									id="view-mod-profile">View
									Profile</button>
								<button type="button"
									class="button-primary rounded-lg button-md-p border-0 font-medium ml-4 font-10 text-danger d-none"
									id="rm-mod">Remove Moderator</button>
							</div>
						</div>`;
			},
			ownerCard: function (data) {
				return `<div class="shadow-sm rounded-10-px mt-2 p-2 owner-card" uid=${data.uid}>
							<div class="d-flex justify-content-between align-items-center">
								<div class="d-flex">
									<img src="${data.picture}"
										alt="mod-1" class="img-cover circle-md rounded-circle mr-2">
									<div>
										<p class="mb-0 font-10 brand-text">Owner</p>
										<p class="font-12 mb-0">${data.displayname}</p>
									</div>
								</div>
								<div>
									<p class="mb-1 font-10">Rigor rank: ${data.rigor_rank}</p>
									<p class="mb-1 font-10">Articles written: 4</p>
									<p class="font-10 mb-0">Discussion Rooms: 1</p>
								</div>
							</div>
							<div class="d-flex mt-2 justify-content-center">
								<button type="button" class="button-primary rounded-lg button-md-p border-0 font-medium font-10"
									id="send-mod-message">Send Message</button>
								<button type="button"
									class="button-primary rounded-lg button-md-p border-0 font-medium ml-4 font-10"
									id="view-mod-profile">View Profile</button>
							</div>
						</div>`;
			},
			myCard: function (data) {
				return `<div class="shadow-sm rounded-10-px p-2 my-card" uid=${data.uid}>
							<div class="d-flex justify-content-between align-items-center">
								<div class="d-flex">
									<img src="${data.picture}"
										alt="mod-1" class="img-cover circle-md rounded-circle mr-2">
									<div>
										<p class="mb-0 font-10 brand-text">Me</p>
										<p class="font-12 mb-0">${data.displayname}</p>
									</div>
								</div>
								<div>
									<p class="mb-1 font-10">Rigor rank: ${data.rigor_rank}</p>
									<p class="mb-1 font-10">Articles written: 2</p>
									<p class="font-10 mb-0">Discussion Rooms: 3</p>
								</div>
							</div>
						</div>`;
			},
			user: function (data) {
				return `<div class="user-listing d-flex" uid=${data.uid}>
                            <img src="${data.picture}" alt="user-img" class="circle-sm rounded-circle img-cover mr-3">
                            <p class="font-12">${data.displayname}</p>
                        </div>`;
			},
		};

		const urlParams = new URLSearchParams(window.location.search);
		const roomTid = urlParams.get('tid');
		let isMod;

		urlParams.has('mod') ? isMod = urlParams.get('mod') : isMod = false;

		ajaxify.data.ownerData.uid == app.user.uid ? $('#mod-list').append(_templates.myCard(ajaxify.data.ownerData)) : $('#mod-list').append(_templates.ownerCard(ajaxify.data.ownerData));

		for (let index = 0; index < ajaxify.data.moderators.length; index++) {
			const moderator = ajaxify.data.moderators[index];
			moderator.uid == app.user.uid ? $('#mod-list').append(_templates.myCard(moderator)) : $('#mod-list').append(_templates.card(moderator));
		}

		$('#back-btn').on('click', () => ajaxify.go(`/mobile/discussion/${roomTid}`));

		$('#save-mods-btn').on('click', function () {
			$('#edit-mods-btn').removeClass('d-none');
			$('#add-mods-btn').addClass('d-none');
			$('#save-mods-btn').addClass('d-none');

			for (let index = 0; index < $('.mod-card').length; index++) {
				const modCard = $('.mod-card')[index];
				$(modCard).find('#send-mod-message').removeClass('d-none');
				$(modCard).find('#view-mod-profile').removeClass('d-none');
				$(modCard).find('#rm-mod').addClass('d-none');
			}
		});

		$('body').on('click', '#rm-mod', function () {
			$('.deleting-card').removeClass('deleting-card');
			const modCard = $(this).parents('.mod-card');
			modCard.addClass('deleting-card');

			$('#remove-mod-modal').modal('show');
			$('#remove-mod-modal').addClass('show');
			$('#remove-mod-text').text(`Are you sure you want to remove ${$(modCard.find('.mod-name')).text()}`);
		});

		$('#cancel-remove').on('click', () => {
			$('#remove-mod-modal').modal('hide');
			$('#remove-mod-modal').removeClass('show');
		});

		$('#remove-final').on('click', function () {
			notify('Removing moderator', 'success');
			$('#remove-mod-modal').modal('hide');
			$('#remove-mod-modal').removeClass('show');
			const moderators = [];
			moderators.push(parseInt($('.deleting-card').attr('uid')));

			api.del(`/app/room/${roomTid}/moderators`, { moderators }).then(() => {
				notify('Removed moderator!', 'success');
				$('.deleting-card').addClass('d-none');
				$('.deleting-card').removeClass('deleting-card');
			}).catch((error) => {
				notify(error.message, 'error');
			});
		});

		$('#add-mods-btn').on('click', () => {
			$('#add-mods-modal').modal('show');
			$('#add-mods-modal').addClass('show');
		});

		$('#cancel-add-mod').on('click', () => {
			$('#add-mods-modal').modal('hide');
			$('#add-mods-modal').removeClass('show');
		});

		$('body').on('keyup', '#add-mod-input', function () {
			$.ajax({
				url:
					config.relative_path +
					`/api/users?query=${$(this).val()}&paginate=true`,
				type: 'GET',
				dataType: 'json',
				success: function (res) {
					$('#add-mod-body').empty();
					for (
						let index = 0;
						index < (res.users.length > 10 ? 10 : res.users.length);
						index++
					) {
						const user = res.users[index];
						$('#add-mod-body').append(_templates.user(user));
					}
				},
			});
		});

		$('body').on('click', '.user-listing', function () {
			const selectedUser = this;
			$('#add-mod-body').empty();
			$('#add-mod-body').append(selectedUser);
			$(selectedUser).addClass('tertiary-border px-3 py-2 rounded-lg');
		});

		if (isMod) {
			console.log(isMod);

			$('#mod-btns').removeClass('d-none');
			$('#mod-btns').addClass('d-flex');

			$('#edit-mods-btn').on('click', function () {
				$('#edit-mods-btn').addClass('d-none');
				$('#add-mods-btn').removeClass('d-none');
				$('#save-mods-btn').removeClass('d-none');

				for (let index = 0; index < $('.mod-card').length; index++) {
					const modCard = $('.mod-card')[index];
					$(modCard).find('#send-mod-message').addClass('d-none');
					$(modCard).find('#view-mod-profile').addClass('d-none');
					$(modCard).find('#rm-mod').removeClass('d-none');
				}
			});


			$('#add-mod-btn').on('click', function () {
				notify('Adding moderator', 'success');

				$('#add-mods-modal').modal('hide');
				$('#add-mods-modal').removeClass('show');

				const moderators = [];
				moderators.push(parseInt($('.user-listing.d-flex.tertiary-border.px-3.py-2.rounded-lg').attr('uid')));

				api.put(`/app/room/${roomTid}/moderators`, { moderators }).then(() => {
					notify('Moderator added!', 'success');
					ajaxify.refresh();
				}).catch((error) => {
					notify(error.message, 'error');
				});
			});
		}

		doAjax({
			type: 'POST',
			url: '/app/getroom',
			method: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({ roomId: [roomTid] }),
		}).then(function (res) {
			console.log(res);

			for (let index = 0; index < $('.header-img').length; index++) {
				const headerImg = $('.header-img')[index];
				$(headerImg).attr('src', res.response.image);
			}

			for (let index = 0; index < $('.dr-title').length; index++) {
				const drTitle = $('.dr-title')[index];
				$(drTitle).text(res.response.name);
			}

			$('#app-loader').hide();
		});
	};

	return modlist;
});
