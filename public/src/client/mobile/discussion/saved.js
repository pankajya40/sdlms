'use strict';

/* globals define */

define('forum/mobile/discussion/saved', ['api'], function (api) {
	var saved = {};

	saved.init = function () {
		const _templates = {
			message: function (data) {
				return `<div class="saved-message">
							<div class="d-flex">
								<img src="${data.author.picture}" alt="pfp"
									class="img-cover circle-md rounded-circle mr-2">
								<div class="w-100">
									<div class="d-flex justify-content-between">
										<p class="font-8 mb-0 ml-1">${data.author.fullname}</p>
										<p class="font-8 mb-0">Posted on ${moment(data.timestamp).format('Do MMM, YYYY')}</p>
									</div>
									<div class="font-10 px-2 py-1 mb-2 secondary-border rounded-lg mb-2">
										<p class="mb-0">${data.content}</p>
									</div>
									<div class="d-flex justify-content-between">
										<div class="d-flex flex-column align-items-center visit-btn" data-mid=${data.messageId}>
											<i class="fas fa font-12 fa-solid fa-circle-chevron-up mb-1"></i>
											<p class="font-8 mb-0">Visit thread</p>
										</div>
										<div class="d-flex flex-column align-items-center mb-1 reply-btn" data-mid=${data.messageId}>
											<i class="fas fa font-12 fa-solid fa-reply"></i>
											<p class="font-8 mb-0">Reply</p>
										</div>
										<div class="d-flex flex-column align-items-center mb-1 remove-btn" data-mid=${data.messageId}>
											<i class="fa fas fa fa-solid fa-xmark"></i>
											<p class="font-8 mb-0">Remove saved</p>
										</div>
									</div>
								</div>
							</div>
							<hr class="primary-border mb-20-px">
						</div>`;
			},
		};

		const roomId = ajaxify.data.roomId;
		console.log(roomId);
		$('#saved-messages-container').empty();

		api.get(`/app/room/thread/saved/${roomId}`, {})
			.then((res) => {
				res.data.map(message => $('#saved-messages-container').append(_templates.message(message)));
				$('#app-loader').hide();
			});

		$('#saved-messages-container').on('click', '.visit-btn', function () {
			notify('Routing to message', 'success');
			const messageId = $(this).data('mid');
			ajaxify.go(`/mobile/discussion/${roomId}?scrollId=${messageId}`);
		});

		$('#saved-messages-container').on('click', '.reply-btn', function () {
			notify('Routing to message', 'success');
			const messageId = $(this).data('mid');
			ajaxify.go(`/mobile/discussion/${roomId}?scrollId=${messageId}`);
		});

		$('#saved-messages-container').on('click', '.remove-btn', function () {
			notify('Removing message from saved', 'success');
			const messageId = $(this).data('mid');
			const thisMessage = $(this).parents('.saved-message').first();
			api.del(`/app/room/thread/save`, {
				roomId,
				messageId,
			}).then(() => {
				notify('message has been removed', 'success');
				$(thisMessage).remove();
			})
				.catch(() => notify('message could not be removed from saved', 'error'));
		});

		$('.back-btn').on('click', () => ajaxify.go(`/mobile/discussion/${roomId}`));
	};

	return saved;
});
