'use strict';

/* globals define */

define('forum/mobile/discussion/reported', ['api', 'translator'], function (api, translator) {
	var reported = {};

	reported.init = function () {
		const roomId = ajaxify.data.roomId;

		const _templates = {
			report: function (data) {
				return `<div class="d-flex reported-card">
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
								<div>
									${data.reporters.map(reporter => _templates.reporter(reporter)).join('')}
								</div>
								<div class="d-flex justify-content-between">
									<div class="d-flex flex-column align-items-center visit-btn" data-mid=${data.messageId}>
										<i class="fas fa font-12 fa-solid fa-circle-chevron-up mb-1"></i>
										<p class="font-8 mb-0">Visit thread</p>
									</div>

									<div class="d-flex flex-column align-items-center delete-btn" data-mid=${data.messageId}>
										<i class="fa-solid fa-circle-minus fas fa font-12 mb-1"></i>
										<p class="font-8 mb-0">Delete thread</p>
									</div>

									<div class="d-flex flex-column align-items-center mb-1 remove-btn" data-uid=${data.fromuid}>
										<i class="fa-solid fa-user-minus fas fa font-12 mb-1"></i>
										<p class="font-8 mb-0">Remove participant</p>
									</div>
								</div>
								<hr class="primary-border mb-20-px">
							</div>
						</div>`;
			},
			reporter: function (data) {
				return `<div class="d-flex align-items-center my-2">
							<img src="${data.user.picture}" alt="pfp" class="img-cover circle-xsm rounded-circle mr-2">
							<p class="font-12 mb-0">${data.user.fullname}: ${data.reportedFor}</p>
						</div>`;
			},
		};

		$('.back-btn').on('click', () => ajaxify.go(`/mobile/discussion/${roomId}`));

		api.get(`/app/room/thread/reported/${roomId}`, {})
			.then((res) => {
				console.log(res);
				res.data.map(report => $('#reports-container').append(_templates.report(report)));
				$('#app-loader').hide();
			}).catch(err => console.log('there was an error', err));

		$('#reports-container').on('click', '.visit-btn', function () {
			notify('Routing to message', 'success');
			const messageId = $(this).data('mid');
			ajaxify.go(`/mobile/discussion/${roomId}?scrollId=${messageId}`);
		});

		$('#reports-container').on('click', '.delete-btn', function () {
			notify('Deleting message', 'error');
			const $thisBtn = this;
			const messageId = $(this).data('mid');
			doAjax({
				type: 'POST',
				url: '/app/deletemessage',
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify({
					mid: messageId,
				}),
			}).then(function (res) {
				notify('Message has been deleted!', 'success');
				console.log(res);
				$($thisBtn).parents('.reported-card').first().remove();
				notify('Message has been deleted', 'success');
			}).catch(() => notify('Message could not be deleted! Please try again', 'error'));
		});

		$('#reports-container').on('click', '.remove-btn', function () {
			notify('Removing user from discussion room', 'error');
			const $thisBtn = this;
			const userId = $(this).data('uid');
			doAjax({
				type: 'POST',
				url: '/app/removeuser',
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify({
					roomId,
					uids: [userId],
				}),
			}).then(function (res) {
				notify('User has been removed from the discussion room', 'success');
				console.log(res);
				$($thisBtn).parents('.reported-card').first().remove();
				notify('User has been removed from the room', 'success');
			}).catch(() => notify('User could not be removed! Please try again', 'error'));
		});
	};

	return reported;
});
