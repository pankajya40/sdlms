'use strict';

/* globals define */

define('forum/mobile/discussion/profile', ['api', 'mobile/classes/profile','sdlms/pagination'], function (api) {
	var profile = {};

	profile.init = function () { 

		const {counters} = ajaxify.data;
		const {id, roomId} = ajaxify.data;

		$(".sdlms-container").addClass("p-0");
		let Templates = DiscussionProfileTemplate.profile();
		$(".profile-reaction").append(Templates.reaction(counters));

		$(".backBtn").on("click", function() {
			ajaxify.go(`mobile/discussion/${roomId}`);
		});


		// $(".reflections").append(Templates.reflection.thread());
		// $(".reflections").append(Templates.reflection.discussion());

		function reflections(url) {
			api.get(url, {}).then((res) => {
				res.data.map((ev) => {
					$(".reflections").append(Templates.reflection.thread(ev));
				});
				pagination.paginate(res)
			});
		};
		let pagination = new Pagination({
			target: '#reflection-pagination',
			onChange: reflections
		});
		
		reflections(`/app/reactions?type=messageId&value=${id}&roomId=${roomId}&limit=8`);

	    };

	return profile;
});