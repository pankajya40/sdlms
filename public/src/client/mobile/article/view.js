'use strict';

/* globals define */

define('forum/mobile/article/view', ['api', 'sdlms/comments'], function (api) {
	var view = {};

	function convertFonts() {
		$('#article-content p').each(function () {
			$(this).addClass('font-12');
		});

		$('#article-content h6').each(function () {
			$(this).addClass('font-12');
		});

		$('#article-content h5').each(function () {
			$(this).addClass('font-14');
		});

		$('#article-content h4').each(function () {
			$(this).addClass('font-16');
		});

		$('#article-content h3').each(function () {
			$(this).addClass('font-18');
		});

		$('#article-content h2').each(function () {
			$(this).addClass('font-20');
		});

		$('#article-content h1').each(function () {
			$(this).addClass('font-22');
		});

		$('#article-content iframe').each(function () {
			$(this).addClass('w-100');
			$(this).addClass('h-100');
		});
	}

	view.init = function () {
		// getting pid from url to load the article
		const searchParams = new URLSearchParams(window.location.search);
		let currentPid;
		if (searchParams.has('pid')) {
			currentPid = searchParams.get('pid');
			console.log(currentPid);
		}

		const _templates = {
			authorDetails: function (data) {
				return `<img src="${data.response.data.user.picture
				}" alt="author-avatar" class="circle-md img-cover rounded-circle overflow-hidden">
                <div id="post-meta" class="ml-2">
				<p class="mb-0 font-16 font-medium">${data.response.data.user.fullname
}</p>
                    <p class="mb-0 brand-text font-12 text-truncate component-md">${data.response.data.user.signature
}</p>
                    <p class="font-10 mb-0">${moment(
		data.response.data.timestamp
	).format('MMMM DD, YYYY')}</p>
                </div>`;
			},
			imgBlock: function (data) {
				return `<img src="${data.response.data.image}"
                    alt="header-img" class="img-cover component-full rounded-10-px height-160 mb-2">`;
			},
			nudgeContent: function (data) {
				return `<div class="nudges px-3 py-2 rounded-10-px" style="background-image: url(${data.response.image});>
							<div class="author-suggestion">
								<p class="font-12 font-regular text-white">Author's Suggestion</p>
							</div>
							<div class="nudge-details d-flex justify-content-between w-100">
								<div class="discussion-on d-flex flex-column">
									<p class="font-12 font-regular text-white mb-0">${data.response.fav_icon} on</p>
									<p class="font-18 font-regular text-white mb-0">${data.response.title}</p>
								</div>
								<div class="nudge-date-time d-flex flex-column align-items-center align-self-end">
									<p class="font-12 font-regular text-white mb-0">20th Feb, 2022</p>
									<p class="font-12 font-regular text-white mb-0">${data.response.schedule}</p>
								</div>
							</div>
							<hr class="border border-light">
							<div class="nudge-content d-flex flex-column">
							<div class="note-from-author">
							<p class="font-14 font-regular text-white mb-2">Note from author:</p>
							</div>
								<div class="nudge-content-text">
									<p class="font-12 font-regular text-white mb-0">
										This discussion room is being hosted by Mr. Josh Doyle who is a practicing psychologist and
										has
										been
										studying the EV industry closely. So there is allot to learn and discuss for both Technology
										enthusiasts
										and folks just looking to learn best behavioral practices from an experiecned psychologist
									</p>
								</div>
							</div>
							<div class="d-flex justify-content-center align-items-center mt-3">
								<button class="text-center button-secondary border-0 mr-3 rounded-5-px button-lg-p font-14">Know
								more</button>
								<button class="border-0 rounded-5-px button-lg-p font-14 button-brand">Register</button>
							</div>
						</div>`;
			},
			reflection: function (data) {
				return `<div class="reflection d-flex" pid=${data.pid}>
							<div class="reflection-author-avatar my-1">
								<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/user-avatar.svg" alt="">
							</div>
							<div class="ml-2 ">
								<div class="font-10 d-flex justify-content-between mb-2">
									<p class="mb-0">by Aaron Rogan</p>
									<p class="mb-0"> 21 Feb, 2022 </p>
								</div>
								<p class="font-10 mb-0">${data.summary}</p>
							</div>
						</div>
						<hr>`;
			},
			tpLeft: function (data) {
				return `<div class="d-flex secondary-bg rounded-10-px shadow tp-block mb-2">
								<div class="d-flex align-items-stretch w-25">
									<div
										class="rounded-lg h-100 d-flex flex-column justify-content-center align-items-center postit-orange-bg px-2 py-4">
										<i class="font-24 ${data.icon}"></i>
										<p class="mb-0 mt-2 font-12 text-center">${data.summary}</p>
									</div>
								</div>
								<p class="font-12 mb-0 p-2">${data.answer}</p>
							</div>`;
			},
			tpRight: function (data) {
				return `<div class="d-flex secondary-bg rounded-10-px shadow tp-block mb-2 justify-content-between">
							<p class="font-12 mb-0 p-2">${data.answer}</p>
							<div class="d-flex align-items-stretch w-25">
								<div
									class="rounded-lg h-100 d-flex flex-column justify-content-center align-items-center postit-green-bg px-2 py-4">
									<i class="font-24 ${data.icon}"></i>
									<p class="mb-0 mt-2 font-12 text-center">${data.summary}</p>
								</div>
							</div>
						</div>`;
			},
		};

		// loading thought process
		api.get(`/thought_proccess?parentPid=${currentPid}`, {}).then((res) => {
			$('#tp-tab-content').empty();
			res.blocks.map((block, index) => {
				if (index % 2 == 0) $('#tp-tab-content').append(_templates.tpLeft(block));
				else $('#tp-tab-content').append(_templates.tpRight(block));
			});
		});

		// tabs working
		// nudges tab
		$('#nudges-tab').on('click', function () {
			$('#reflections-tab-content').addClass('d-none');
			$('#tp-tab-content').addClass('d-none');
			$('#comments-tab-content').addClass('d-none');
			$('#nudges-tab-content').removeClass('d-none');
			// tab color
			$('#reflection-tab').removeClass('brand-text');
			$('#thought-process-tab').removeClass('brand-text');
			$('#comments-tab').removeClass('brand-text');
			$('#nudges-tab').addClass('brand-text');
		});

		$('#reflection-tab').on('click', function () {
			if (!$('#reflection-tab').hasClass('brand-text')) {
				doAjax({
					type: 'GET',
					url: `/app/reflection`,
					data: {
						parent_pid: currentPid,
					},
				}).then(function (res) {
					$('#reflections-container').empty();
					$.map(res.response.data, reflectionData => $('#reflections-container').append(_templates.reflection(reflectionData)));
				});
			}

			$('#nudges-tab-content').addClass('d-none');
			$('#tp-tab-content').addClass('d-none');
			$('#comments-tab-content').addClass('d-none');
			$('#reflections-tab-content').removeClass('d-none');
			// tab color
			$('#nudges-tab').removeClass('brand-text');
			$('#thought-process-tab').removeClass('brand-text');
			$('#comments-tab').removeClass('brand-text');
			$('#reflection-tab').addClass('brand-text');
		});

		$('#thought-process-tab').on('click', function () {
			$('#reflections-tab-content').addClass('d-none');
			$('#nudges-tab-content').addClass('d-none');
			$('#comments-tab-content').addClass('d-none');
			$('#tp-tab-content').removeClass('d-none');
			// tab color
			$('#reflection-tab').removeClass('brand-text');
			$('#nudges-tab').removeClass('brand-text');
			$('#comments-tab').removeClass('brand-text');
			$('#thought-process-tab').addClass('brand-text');
		});

		$('#comments-tab').on('click', function () {
			$('#reflections-tab-content').addClass('d-none');
			$('#tp-tab-content').addClass('d-none');
			$('#nudges-tab-content').addClass('d-none');
			$('#comments-tab-content').removeClass('d-none');
			// tab color
			$('#reflection-tab').removeClass('brand-text');
			$('#thought-process-tab').removeClass('brand-text');
			$('#nudges-tab').removeClass('brand-text');
			$('#comments-tab').addClass('brand-text');
		});


		$('#delete-btn').on('click', function () {
			api.del(`/app/posts/${currentPid}`, {}).then((res) => {
				notify('Article has been deleted!', 'success');
				ajaxify.go('mobile/article/create');
			});
		});

		$('#edit-btn').on('click', () => ajaxify.go(`/mobile/article/create?pid=${currentPid}`));

		$('#reflection-btn').on('click', () => ajaxify.go(`/mobile/reflection/list?parent=${currentPid}&ptype=article`));

		// api.post(`/app/getarticles?pid=${currentPid}`, {}).then((res) => console.log(res))

		$('body').on('click', (event) => {
			if (!$.contains($('#post-settings')[0], event.target)) {
				$('#author-options').addClass('d-none');
				$('#reader-options').addClass('d-none');
			}
		});

		doAjax({
			type: 'POST',
			url: `/app/getarticles?pid=${currentPid}`,
			method: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({}),
		}).then(function (res) {
			console.log(res);
			const id = res.response.data && res.response.data._id ? res.response.data._id : 0;
			new Comment($.extend({}, res.response.data, {
				target: '#comments-tab-content',
				assetId: id,
				type: 'article',
				uid: app.user.uid,
			}));

			$('#post-author-details').append(_templates.authorDetails(res));

			if (res.response.data.image) $('#article-content').append(_templates.imgBlock(res));

			const articleContent = res.response.data.content;
			const articleBlocks = articleContent.split('\n');

			for (let index = 0; index < articleBlocks.length; index++) {
				$('#article-content').append(articleBlocks[index]);
			}

			convertFonts();

			doAjax({
				type: 'POST',
				method: 'POST',
				url: `/app/getnudge?id=604`,
				data: JSON.stringify({}),
				dataType: 'json',
				contentType: 'application/json',
			}).then(function (res) {
				console.log(res);
				console.log('appending nudge');
				$('#nudges-tab-content').append(_templates.nudgeContent(res));
			});

			$('#post-settings').on('click', function () {
				if (res.response.data.user && res.response.data.uid == app.user.uid) {
					$('#author-options').removeClass('d-none');
				} else {
					$('#reader-options').removeClass('d-none');
				}
			});

			$('#app-loader').hide();
		});
	};

	return view;
});
