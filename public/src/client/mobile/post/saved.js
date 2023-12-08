'use strict';

/* globals define */

define('forum/mobile/post/saved', ['api'], function (api) {
	var saved = {};
	let isLoading = true;

	saved.init = function () {
		let validClick = false;

		$('body').on('click', '.post-settings', function () {
			$(this).siblings('.reader-options').removeClass('d-none');
		});

		$('body').on('click', function (e) {
			const settingsBtns = $('.post-settings');
			const readerMenus = $('.reader-options');
			const authorMenus = $('.author-options');

			for (let index = 0; index < readerMenus.length; index++) {
				if (!$(readerMenus[index]).hasClass('d-none')) {
					for (let i = 0; i < readerMenus.length; i++) {
						if ($.contains(settingsBtns[i], e.target)) validClick = true;
					}
					validClick && readerMenus[index].addClass('d-none');
				}

				if (!$(authorMenus[index]).hasClass('d-none')) {
					for (let i = 0; i < readerMenus.length; i++) {
						if ($.contains(settingsBtns[i], e.target)) validClick = true;
					}
					validClick && authorMenus[index].addClass('d-none');
				}
			}

			!$.contains($('.post-settings')[0], e.target) && console.log('closing');
		});

		const _templates = {
			post: function (data) {
				return `<div class="article-container container pt-3 rounded-10-px bg-white mt-3" data-pid=${data.pid} data-cid="${data.cid}" data-subcid="${data.sub_cid}" data-uid="${data.uid}" data-type="post">
							<!-- article-header starts here -->
							<div id="post-author" class="d-flex justify-content-between align-items-center mb-2">
								<div id="post-author-details" class="d-flex">
									<img src="${app.user.signature}"
										alt="author-avatar" class="circle-lg overflow-hidden rounded-circle img-cover">
									<div id="post-meta" class="ml-2">
										<p class="mb-0 font-14 font-medium">${data.user.fullname}</p>
										<p class="mb-0 brand-text font-10 truncate-line-1">${data.user.signature}Amet minim mollit non deserunt</p>
										<p class="font-10 mb-0">${moment(data.timestamp).format('MMMM DD, YYYY')}</p>
									</div>
								</div>
								<button class="menu-btn px-2 bg-transparent border-0">
									<i class="fa-solid fa-ellipsis-vertical"></i>
								</button>
								<div class="author-options p-3 floating-right-bottom shadow-sm secondary-bg rounded-10-px d-none">
									<div class="d-flex align-items-center mb-3 edit-btn">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/edit.svg" alt="edit-icon">
										<p class="font-8 ml-2 mb-0">Edit</p>
									</div>
									<div class="align-items-center mb-3 d-none">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/share.svg" alt="share-icon">
										<p class="font-8 ml-2 mb-0">Share</p>
									</div>
									<div class="d-flex align-items-center mb-3 remove-btn">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/bookmark.svg"
											alt="save-icon">
										<p class="font-8 ml-2 mb-0">Remove</p>
									</div>
									<div class="align-items-center mb-3 d-none">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/repost.svg"
											alt="repost-icon">
										<p class="font-8 ml-2 mb-0">Repost</p>
									</div>
									<div class="d-flex align-items-center delete-btn">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/delete.svg"
											alt="delete-icon">
										<p class="font-8 ml-2 mb-0">Delete</p>
									</div>
								</div>
								<div class="reader-options p-3 floating-right-bottom shadow-sm secondary-bg rounded-10-px d-none">
									<div class="align-items-center mb-3 d-none">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/share.svg" alt="share-icon">
										<p class="font-8 ml-2 mb-0">Share</p>
									</div>
									<div class="d-flex align-items-center mb-3 remove-btn">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/bookmark.svg"
											alt="save-icon">
										<p class="font-8 ml-2 mb-0">Remove</p>
									</div>
									<div class="align-items-center d-none">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/report.svg"
											alt="report-icon">
										<p class="font-8 ml-2 mb-0">Report</p>
									</div>
								</div>
							</div>
							<!-- article-header ends here -->
							<!-- article-content starts here -->
							<div
								class="d-flex article-content-container justify-content-center align-items-center overflow-hidden">
								<div id="article-content" class="rounded-10-px primary-border p-2 w-100">
									<p class="font-12">${data.content}</p>

									<img src="${data.image}"
										alt="header-img" class="img-cover component-full rounded-10-px height-160 mb-1">
								</div>
							</div>`;
			},
			article: function (data) {
				return `<div class="article-container container pt-3 rounded-10-px bg-white mt-3" data-pid=${data.pid} data-cid="${data.cid}" data-subcid="${data.sub_cid}" data-type="article">
							<!-- article-header starts here -->
							<div id="post-author" class="d-flex justify-content-between align-items-center mb-2">
								<div id="post-author-details" class="d-flex">
									<img src="${app.user.signature}"
										alt="author-avatar" class="circle-lg overflow-hidden rounded-circle img-cover">
									<div id="post-meta" class="ml-2">
										<p class="mb-0 font-14 font-medium">${data.user.fullname}</p>
										<p class="mb-0 brand-text font-10 truncate-line-1">${data.user.signature}Amet minim mollit non deserunt</p>
										<p class="font-10 mb-0">${moment(data.timestamp).format('MMMM DD, YYYY')}</p>
									</div>
								</div>
								<div class="post-settings mr-3">
									<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/settings-icon.svg"
										alt="settings" class="overflow-hidden">
								</div>
								<div class="author-options p-3 floating-right-bottom shadow-sm secondary-bg rounded-10-px d-none">
									<div class="d-flex align-items-center mb-3" id="edit-btn">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/edit.svg" alt="edit-icon">
										<p class="font-8 ml-2 mb-0">Edit</p>
									</div>
									<div class="d-none align-items-center mb-3">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/share.svg" alt="share-icon">
										<p class="font-8 ml-2 mb-0">Share</p>
									</div>
									<div class="d-flex align-items-center mb-3">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/bookmark.svg"
											alt="save-icon">
										<p class="font-8 ml-2 mb-0">remove from saved</p>
									</div>
									<div class="d-none align-items-center mb-3">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/repost.svg"
											alt="repost-icon">
										<p class="font-8 ml-2 mb-0">Repost</p>
									</div>
									<div class="d-none align-items-center" id="delete-btn">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/delete.svg"
											alt="delete-icon">
										<p class="font-8 ml-2 mb-0">Delete</p>
									</div>
								</div>
								<div class="reader-options p-3 floating-right-bottom shadow-sm secondary-bg rounded-10-px d-none">
									<div class="d-none align-items-center mb-3">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/share.svg" alt="share-icon">
										<p class="font-8 ml-2 mb-0">Share</p>
									</div>
									<div class="d-flex align-items-center mb-3">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/bookmark.svg"
											alt="save-icon">
										<p class="font-8 ml-2 mb-0">remove from saved</p>
									</div>
									<div class="d-none align-items-center">
										<img src="https://blog.deepthought.education/wp-content/uploads/2022/04/report.svg"
											alt="report-icon">
										<p class="font-8 ml-2 mb-0">Report</p>
									</div>
								</div>
							</div>
							<!-- article-header ends here -->
							<!-- article-content starts here -->
							<div id="article-content-container"
								class="d-flex justify-content-center align-items-center overflow-hidden">
								<div id="article-content" class="rounded-10-px primary-border p-2 w-100">
								<img src="${data.image}"
									alt="header-img" class="img-cover component-full rounded-10-px height-160 mb-1">
									<p class="font-12">${data.content}</p>
								</div>
							</div>
						</div>`;
			},
		};

		$('#page-container').on('click', '.menu-btn', function () {
			const clickedPost = $(this).parents('.article-container')[0];
			$(clickedPost).data('uid') == app.user.uid ? $(clickedPost).find('.author-options').toggleClass('d-none open') : $(clickedPost).find('.reader-options').toggleClass('d-none open');
		});

		$('#page-container').on('click', '.article-content-container', function () {
			const clickedPost = $(this).parents('.article-container')[0];
			$(clickedPost).data('type') == 'post' ? ajaxify.go(`/mobile/post/view?pid=${$(clickedPost).data('pid')}`) : ajaxify.go(`/mobile/article/view?pid=${$(clickedPost).data('pid')}`);
		});

		$("#page-container").on("click", ".edit-btn", function () {
			const clickedPost = $(this).parents(".article-container")[0];
			notify("Redirecting to edit", "info");
			ajaxify.go(`/mobile/post/create?pid=${$(clickedPost).data("pid")}`)
		})

		$("#page-container").on("click", ".delete-btn", function () {
			const clickedPost = $(this).parents(".article-container")[0];
			notify("deleting...", "error")
			api.del(`/app/posts/${$(clickedPost).data("pid")}`, {}).then((res) => {
				notify("deleted successfully", "success")
				ajaxify.refresh();
			})
		})

		// $("body").on("click", function (event) {
		// 	let clickedMenu = false;

		// 	$.each($(".menu-btn"), (menuBtn) => {
		// 		if ($.contains(menuBtn, event.target)) clickedMenu = true;
		// 	})

		// 	if (clickedMenu == false) {
		// 		$(".author-options.open").addClass("d-none").removeClass("open");
		// 		$(".reader-options.open").addClass("d-none").removeClass("open");
		// 	}
		// })

		async function appendPosts(pageNumber = 0) {
			const getPosts = new Promise((resolve, reject) => {
				doAjax({
					type: 'GET',
					url: `/app/saved/post?page=${pageNumber}`,
					data: {},
				}).then(function (res) {
					const pageCount = res.response.last_page + 1;
					const pageData = res.response.data;
					const posts = {
						pageCount,
						pageData,
					};
					if (isLoading) {
						$('#app-loader').hide();
						isLoading = false;
					}

					resolve(posts);
					reject('no data');
				});
			});

			const posts = await getPosts;

			posts.pageData.map(data => $('#page-container').append(_templates.post(data)));
			return posts;
		}

		async function appendArticles(pageNumber = 0) {
			const getArticles = new Promise((resolve, reject) => {
				doAjax({
					type: 'GET',
					url: `/app/saved/article?page=${pageNumber}`,
					data: {},
				}).then(function (res) {
					const pageCount = res.response.last_page + 1;
					const pageData = res.response.data;
					const articles = {
						pageCount,
						pageData,
					};

					resolve(articles);
					reject('no data');
				});
			});

			let articles = await getArticles;

			articles.pageData.map(data => $('#page-container').append(_templates.article(data)));
			return articles;
		}

		appendPosts().then(
			function (posts) {
				// lazy load posts
				const check = {
					root: null,
					rootMargin: '0px',
					threshold: 0.1,
				};
				let postPage = 1;

				const postsObserver = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting && postPage < posts.pageCount) {
						appendPosts(postPage);
						postPage++;
					}
				}, check);
				postsObserver.observe(document.getElementById('page-checker'));
			}
		);

		appendArticles().then(
			function (articles) {
				// lazy load posts
				const check = {
					root: null,
					rootMargin: '0px',
					threshold: 0.1,
				};
				let articlesPage = 1;

				const articlessObserver = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting && articlesPage < articles.pageCount) {
						appendArticles(articlesPage);
						articlesPage++;
					}
				}, check);
				articlessObserver.observe(document.getElementById('page-checker'));
			}
		);
	};

	return saved;
});
