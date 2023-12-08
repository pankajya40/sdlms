'use strict';

/* globals define */

define('forum/mobile/post/view', ['api', 'sdlms/comments'], function (api) {
	var view = {};
	const { defaultProfileImagesRelativeBase, defaultProfileImages } = ajaxify.data;

	function convertFonts() {
		$('#post-content p').each(function () {
			$(this).addClass('font-12');
		});

		$('#post-content h6').each(function () {
			$(this).addClass('font-12');
		});

		$('#post-content h5').each(function () {
			$(this).addClass('font-14');
		});

		$('#post-content h4').each(function () {
			$(this).addClass('font-16');
		});

		$('#post-content h3').each(function () {
			$(this).addClass('font-18');
		});

		$('#post-content h2').each(function () {
			$(this).addClass('font-20');
		});

		$('#post-content h1').each(function () {
			$(this).addClass('font-22');
		});

		$('#post-content iframe').each(function () {
			$(this).addClass('w-100');
			$(this).addClass('h-100');
		});
	}

	view.init = function () {
		// getting post pid from url
		const searchParams = new URLSearchParams(window.location.search);
		let currentPid;
		if (searchParams.has('pid')) {
			currentPid = searchParams.get('pid');
			console.log(currentPid);
		} else {
			alert('How did you get here?! SECURITY!!!');
		}

		const _templates = {
			authorDetails: function (payload) {
				let { data } = payload;
				let { user } = data;
				let imageOnError = `${defaultProfileImagesRelativeBase}/${defaultProfileImages[Math.floor(Math.random() * defaultProfileImages.length)]}`;

				return `<img src="${user.picture}" onerror="this.onerror=null;this.src='${imageOnError}';"
					alt="author-avatar" class="circle-md overflow-hidden">
                <div id="post-meta" class="ml-3">
                    <p class="mb-0 font-16 font-medium">${user.fullname || user.displayname || user.username}</p>
                    <p class="mb-0 brand-text font-12 text-truncate component-md">${user.signature
}</p>
                    <p class="font-10 mb-0">${moment(
		data.timestamp
	).format('MMMM DD, YYYY')}</p>
                </div>`;
			},
			imgAttach: function (data) {
				return `<img src="${data}"
                    alt="header-img" class="img-cover component-full rounded-10-px height-160 mt-3">`;
			},
			articleAttach: function (data) {
				return `<div id="attached-article" aid="${data.pid}" class="component-full rounded-10-px mt-3">
							<img src="${data.image}"
								alt="img" class="img-cover height-160 component-full rounded-top-10-px">
							<div class="d-flex px-3 py-2 justify-content-between align-items-center primary-bg rounded-bottom-10-px">
								<div>
									<p class="font-16 mb-0">${data.title}</p>
									<p class="font-12 brand-text mt-1 mb-0">${moment(data.timestamp).format('Do of MMMM, YYYY')}</p>
								</div>
								<div class="d-flex align-items-center">
									<p class="font-14 mb-0">Read more</p>
									<i class="fa-solid fa-chevron-right ml-1 mt-1 font-14"></i>
								</div>
							</div>
						</div>`;
			},
			reflection: function (data) {
				return `<div class="reflection d-flex" pid=${data.pid}>
							<div class="reflection-author-avatar my-1">
								<img class="circle-sm rounded-circle img-cover" src="${data.author.picture}" alt="">
							</div>
							<div class="ml-2 ">
								<div class="font-10 d-flex justify-content-between mb-2">
									<p class="mb-0">by ${data.author.displayname}</p>
									<p class="mb-0">${moment(data.createdAt).format('DD MMM, YYYY')}</p>
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
			if (res.blocks && Array.isArray(res.blocks)) {
				res.blocks.map((block, index) => {
					if (index % 2 == 0) $('#tp-tab-content').append(_templates.tpLeft(block));
					else $('#tp-tab-content').append(_templates.tpRight(block));
				});
			}
		});

		// tabs working
		// discussion tab
		// $("#discussion-tab").on("click", function () {
		// 	if (!$("#reflections-tab-content").hasClass("d-none"))
		// 		$("#reflections-tab-content").addClass("d-none");
		// 	if (!$("#tp-tab-content").hasClass("d-none"))
		// 		$("#tp-tab-content").addClass("d-none");
		// 	if (!$("#comments-tab-content").hasClass("d-none"))
		// 		$("#comments-tab-content").addClass("d-none");
		// 	if ($("#discussion-tab-content").hasClass("d-none"))
		// 		$("#discussion-tab-content").removeClass("d-none");
		// 	// tab color
		// 	if ($("#reflection-tab").hasClass("brand-text"))
		// 		$("#reflection-tab").removeClass("brand-text");
		// 	if ($("#thought-process-tab").hasClass("brand-text"))
		// 		$("#thought-process-tab").removeClass("brand-text");
		// 	if ($("#comments-tab").hasClass("brand-text"))
		// 		$("#comments-tab").removeClass("brand-text");
		// 	if (!$("#discussion-tab").hasClass("brand-text"))
		// 		$("#discussion-tab").addClass("brand-text");
		// });

		$("#reflections-container").on("click", ".reflection", function () {
			notify("Opening reflection", "success");
			ajaxify.go(`/mobile/reflection/view/${$(this).attr("pid")}`)
		})

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

			if (!$('#discussion-tab-content').hasClass('d-none')) $('#discussion-tab-content').addClass('d-none');
			if (!$('#tp-tab-content').hasClass('d-none')) $('#tp-tab-content').addClass('d-none');
			if (!$('#comments-tab-content').hasClass('d-none')) $('#comments-tab-content').addClass('d-none');
			if ($('#reflections-tab-content').hasClass('d-none')) $('#reflections-tab-content').removeClass('d-none');
			// tab color
			if ($('#discussion-tab').hasClass('brand-text')) $('#discussion-tab').removeClass('brand-text');
			if ($('#thought-process-tab').hasClass('brand-text')) $('#thought-process-tab').removeClass('brand-text');
			if ($('#comments-tab').hasClass('brand-text')) $('#comments-tab').removeClass('brand-text');
			if (!$('#reflection-tab').hasClass('brand-text')) $('#reflection-tab').addClass('brand-text');
		});

		$('#thought-process-tab').on('click', function () {
			if (!$('#reflections-tab-content').hasClass('d-none')) $('#reflections-tab-content').addClass('d-none');
			if (!$('#discussion-tab-content').hasClass('d-none')) $('#discussion-tab-content').addClass('d-none');
			if (!$('#comments-tab-content').hasClass('d-none')) $('#comments-tab-content').addClass('d-none');
			if ($('#tp-tab-content').hasClass('d-none')) $('#tp-tab-content').removeClass('d-none');
			// tab color
			if ($('#reflection-tab').hasClass('brand-text')) $('#reflection-tab').removeClass('brand-text');
			if ($('#discussion-tab').hasClass('brand-text')) $('#discussion-tab').removeClass('brand-text');
			if ($('#comments-tab').hasClass('brand-text')) $('#comments-tab').removeClass('brand-text');
			if (!$('#thought-process-tab').hasClass('brand-text')) $('#thought-process-tab').addClass('brand-text');
		});

		$('#comments-tab').on('click', function () {
			if (!$('#reflections-tab-content').hasClass('d-none')) $('#reflections-tab-content').addClass('d-none');
			if (!$('#tp-tab-content').hasClass('d-none')) $('#tp-tab-content').addClass('d-none');
			if (!$('#discussion-tab-content').hasClass('d-none')) $('#discussion-tab-content').addClass('d-none');
			if ($('#comments-tab-content').hasClass('d-none')) $('#comments-tab-content').removeClass('d-none');
			// tab color
			if ($('#reflection-tab').hasClass('brand-text')) $('#reflection-tab').removeClass('brand-text');
			if ($('#thought-process-tab').hasClass('brand-text')) $('#thought-process-tab').removeClass('brand-text');
			if ($('#discussion-tab').hasClass('brand-text')) $('#discussion-tab').removeClass('brand-text');
			if (!$('#comments-tab').hasClass('brand-text')) $('#comments-tab').addClass('brand-text');
		});

		$('#reflection-btn').on('click', () => {
			console.log(currentPid);
			notify("Opening reflection", "success");
			ajaxify.go(`/mobile/reflection/list?parent=${currentPid}&ptype=post`);
		});

		$("body").on("click", "#attached-article", function () {
			notify("Redirecting to article", "success")
			ajaxify.go(`/mobile/article/view?pid=${$(this).attr("aid")}`)
		})

		$('body').on('click', (event) => {
			if (!$.contains($('#menu-btn')[0], event.target)) {
				$('#author-options').addClass('d-none');
				$('#reader-options').addClass('d-none');
			}
		});

		$("#delete-btn").on("click", function () {
			notify("deleting post...", "error")
			api.del(`/app/posts/${currentPid}`, {}).then((res) => {
				console.log(res)
				notify("Post deleted", "success")
				ajaxify.go("/mobile/post/create");
			})
		})

		$("#edit-btn").on("click", () => {
			notify("Redirecting to post edit...", "success")
			ajaxify.go(`/mobile/post/create?pid=${currentPid}`)
		})

		api.post(`/app/getposts?pid=${currentPid}`, {}).then((res) => {
			let { comment_count, content } = res.data;
			const id = res.data && res.data._id ? res.data._id : 0;
			new Comment($.extend({}, res.data, {
				target: '.comment-container',
				assetId: id,
				type: 'post',
				uid: app.user.uid,
			}));

			$('#post-author-details').append(_templates.authorDetails(res));

			if (content && Array.isArray(content) && content.length) {
				content = content[0];
			}

			$('#post-content').append(content);

			convertFonts();

			if (res.data.image != null) $('#post-content').append(_templates.imgAttach(res.data.image));

			if (comment_count) {
				$('[comment-count-post]').text(comment_count + ' comments');
			}

			// If there is no attachment is present, there is no need to render it right??
			if (res.data.attachment) $('#post-content').append(_templates.articleAttach(res.data.attachment));

			$('#menu-btn').on('click', function () {
				if (res.data.user && res.data.user.uid == app.user.uid) {
					$('#author-options').removeClass('d-none');
				} else {
					$('#reader-options').removeClass('d-none');
				}
			});

			$('#save-btn').on('click', () => {
				doAjax({
					type: 'POST',
					url: '/app/save/post',
					method: 'POST',
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify({
						id: res.data._id,
					}),
				}).then(function () {
					notify("post has been saved", "success")
					ajaxify.go("/mobile/post/saved")
				})
			});

			/**
			 * @author imshawan {30-06-2022}
			 * @description Hide the loader after everything is rendered in background
			 */
			$('#app-loader').hide();
		});
	};

	return view;
});
