'use strict';

/* globals define */

define('forum/mobile/post/create', ['api',
	'translator',
	'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js'], function (api, translator) {
	var create = {};

	create.init = function () {
		const attachment = document.querySelector('.attachment');
		const attachments = document.querySelector('.attachments');
		const crossIcon = document.querySelector('.cross-icon');
		const filterIcon = document.querySelectorAll('.filter-icon');
		const closeFilterBtn = document.querySelectorAll('.close-filter-btn');
		const filters = document.querySelectorAll('.filters');
		const btnRack = document.querySelector('#btn-rack');

		let category;
		let subCategory;
		let articleCount = 0;
		let discussionCount = 0;
		const { pid } = ajaxify.data;

		const _templates = {
			category: function (data) {
				return `<li class="category-container" collpsible>
					<div class="category-name" cid="${data.cid}" collapse category>
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
			articleSelected: function (data) {
				return `<div class="article-attachment attachment-info p-2 bg-white shadow-sm w-50 mb-2 d-flex align-items-center rounded-lg" id="${data.id}">
                            <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/cross.svg" class="deselect-btn"  alt="">
                            <p class="font-12 font-bold text-black mb-0 ml-2">${data.name}</p>
                        </div>`;
			},
			discussionSelected: function (data) {
				return `<div class="discussion-attachment attachment-info p-2 bg-white shadow-sm w-50 mb-2 d-flex align-items-center rounded-lg" id="${data.id}">
                            <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/cross.svg" class="deselect-btn"  alt="">
                            <p class="font-12 font-bold text-black mb-0 ml-2">${data.name}</p>
                        </div>`;
				},
				articleOption: function (data) {
					return `<div class="article col-10 d-flex mb-3" id="${data.pid}">
        <img src="${data.picture}" alt="" class="img-cover circle-md rounded-circle" />
        <div class="article-text ml-2">
            <h2 class="article-heading font-10 font-semi-bold mb-0">
                ${data.title}
            </h2>
            <p class="article-date brand-text font-8 font-regular mb-0">
                ${moment(data.timestamp).format('MMMM DD, YYYY')}
            </p>
            <p class="article-content primary-text font-8 font-regular mb-0 text-truncate" style="max-width: 55vw">
                ${app.htmltoText(data.content)}
            </p>
        </div>
    </div>`;
			},
			discussionOption: function (data) {
				return `<div class="discussion col-10 d-flex mb-3" id="${data.tid}">
        <img src="${data.image
}" alt="" class="img-cover circle-md rounded-circle" />
        <div class="discussion-text ml-2">
            <h2 class="discussion-heading font-10 font-semi-bold mb-0">
                ${data.title}
            </h2>
            <p class="discussion-date brand-text font-8 font-regular mb-0">
                ${moment(data.timestamp).format('MMMM DD, YYYY')}
            </p>
            <p class="discussion-content primary-text font-8 font-regular mb-0 text-truncate" style="max-width: 55vw">
                ${app.htmltoText(data.description || '')}
            </p>
        </div>
    </div>`;
				},
			};

			$('body').on('click', '#mobile-post-action', function () {
				let isDraft = $(this).data('draft');
				$('body').find('#post-form').attr('is-draft', isDraft)
			})


			$("#post-content").tinymce({
				height: 550,
				menubar: false,
				branding: false,
				paste_data_images: true,
				automatic_uploads: true,
				file_picker_types: "image",
				setup: function (editor) {
					editor.on('init', function (e) {
						let localData = localStorage.getItem("postData");
						localData = JSON.parse(localData);
						let incomingData = localData[0].value;
						let incomingPid;

						incomingPid = localData.length == 2 && localData[1].pid;

						if ((pid && pid != incomingPid) || (!pid && incomingPid))
							localStorage.removeItem("postData");
						else if (!pid)
							tinymce.activeEditor.setContent(incomingData);
						else if (pid == incomingPid)
							tinymce.activeEditor.setContent(incomingData);

						localStorage.removeItem("postData");
					});
				},
				file_picker_callback: function (
					callback,
					value,
					meta
				) {
					// Provide file and text for the link dialog
					var input = document.createElement("input");
					input.setAttribute("type", "file");
					input.setAttribute("accept", "image/*");
					input.onchange = function () {
						var file = this.files[0];

						var reader = new FileReader();
						reader.onload = function () {
							var id = "blobid" + new Date().getTime();
							var blobCache =
								window.tinymce.activeEditor.editorUpload
									.blobCache;
							var base64 = reader.result.split(",")[1];
							var blobInfo = blobCache.create(
								id,
								file,
								base64
							);
							blobCache.add(blobInfo);
							callback(blobInfo.blobUri(), {
								title: file.name,
							});
						};
						reader.readAsDataURL(file);
					};

					input.click();
				},
				plugins: [
					'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
					'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
					'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'contextmenu', 'paste'
				],
				toolbar: 'undo redo fullscreen link media video | blocks | bold italic backcolor | ' +
					'alignleft aligncenter alignright alignjustify | ' +
					'bullist numlist outdent indent | removeformat | help',
				contextmenu: false,
			});

			$(window).on("beforeunload", () => pid ? setEdit() : setNew());

			// checking if we came here for post edit and setting up data that has already been entered
			// let searchParams = new URLSearchParams(window.location.search);
			let currentPid;
			if (pid) {
				currentPid = pid;

				api.post(`/app/getposts?pid=${currentPid}`, {}).then((res) => {
					articleCount = 1
					let { content } = res.data;
					if (res.data.attachment) {
						let articleData = {
							id: res.data.attachment.pid,
							name: res.data.attachment.title
						}

						$("#attachment-info-container").append(
							_templates.articleSelected(articleData)
						);
					}

					$(`[cid=${res.data.cid}]`).addClass("selected")
					$(`[cid=${res.data.sub_cid}]`).addClass("selected")

					if (Array.isArray(content) && content.length) content = content[0];

					$("#post-content").val(content)
				}).catch((err) => {
					let { message } = err;
					if (message) return notify(message, 'error');
					else return notify('Oops! Some error occured while fetching the post', 'error')
				})
			}

			// opening attachments div
			const toggleAttachments = function () {
				attachment.classList.toggle("d-flex");
				attachments.classList.toggle("d-flex");
				btnRack.classList.toggle("d-flex");
				btnRack.classList.toggle("d-none");
			};

			// checking attachments btn
			attachment.addEventListener("click", toggleAttachments);
			crossIcon.addEventListener("click", toggleAttachments);

			const toggleFilter = function () {
				for (let i = 0; i < filters.length; i++)
					filters[i].classList.toggle("d-flex");
			};

			for (let i = 0; i < filterIcon.length; i++)
				filterIcon[i].addEventListener("click", toggleFilter);

			for (let i = 0; i < closeFilterBtn.length; i++)
				closeFilterBtn[i].addEventListener("click", toggleFilter);

			// open categories modal
			$("#categories-btn").on("click", () => {
				$("#categories-modal").modal("show");
				$("#categories-modal").addClass("show");
			});

			// api get categories
			api.get("/app/category?type=mobile", {}).then((res) => {
				$.each(res, function (i, data) {
					data.categoryType == "mobile" &&
						$("#open-categories").append(_templates.category(data));
				});
			});

			$("body").on("click", "[sub-category]", function () {
				if ($("[sub-category].selected")) {
					$("[sub-category].selected").removeClass("selected");
					$("[category].selected").removeClass("selected");
				}
				$(this).toggleClass("selected");
				let parent = $(this).parents("[collpsible]").first()
				let parentCategory = $(parent).find("[category]").first()
				$(parentCategory).addClass("selected");
				if ($("[sub-category].selected").length == 0)
					$(parentCategory).removeClass("selected")
			})

			// submit category modal
			$("#submit-category").on("click", () => {
				category = parseInt($("[category].selected").attr("cid"));
				subCategory = parseInt($("[sub-category].selected").attr("cid"));
				console.log(category + "\n" + subCategory);
				$("#categories-modal").modal("hide");
				$("#categories-modal").removeClass("show");
			});

			// open aritlces modal
			$("#articles-btn").on("click", () => {
				$("#exampleModal").modal("show");
				$("#exampleModal").addClass("show");
			});

			// lazy load articles list
			let check = {
				root: null,
				rootMargin: "0px",
				threshold: 0.9,
			};
			let articlePage = 0;

			function loadArticles() {
				if ($("#article-modal-body .article").length < 5) {
					api
						.post(`/app/getarticles?limit=5&page=${articlePage}`, {})
						.then((res) => {
							// $("#article-modal-body").empty();
							$.each(res.data, function (i, data) {
								$("#article-modal-body").append(_templates.articleOption(data));
							});
						});
					articlePage++;
				}
			}

			let articlesObserver = new IntersectionObserver(loadArticles, check);
			articlesObserver.observe(document.getElementById("article-modal-body"));

			// searching through articcles
			let allArticles = $("#article-modal-body").children(".article");
			allArticles = allArticles.prevObject[0].children;

			$("#search-article").on("keyup", function () {
				let searchArticle = $("#search-article").val().toLowerCase();

				for (let index = 0; index < allArticles.length; index++) {
					let ArticleName = $($(allArticles[index]).children("h2")[0])
						.text()
						.toLowerCase();

					if (ArticleName.indexOf(searchArticle) <= -1) {
						$(allArticles[index]).removeClass("d-flex");
						$(allArticles[index]).addClass("d-none");
					} else {
						$(allArticles[index]).addClass("d-flex");
						$(allArticles[index]).removeClass("d-none");
					}
				}
			});

			// open discussions modal
			$("#discussions-btn").on("click", () => {
				$("#exampleModal2").modal("show");
				$("#exampleModal2").addClass("show");
			});

			// lazy load drs list
			let discussionPage = 0;

			function loadDiscussions() {
				if ($("#discussion-modal-body .discussion").length < 5) {
					api
						.post(`/app/getdiscussion_room?limit=5&page=${discussionPage}`, {})
						.then((res) => {
							$.each(res.data, function (i, data) {
								$("#discussion-modal-body").append(
									_templates.discussionOption(data)
								);
							});
						});
					discussionPage++;
				}
			}

			let discussionsObserver = new IntersectionObserver(loadDiscussions, check);
			discussionsObserver.observe(
				document.getElementById("discussion-modal-body")
			);

			// searching through drs
			let allDiscussions = $("#discussion-modal-body").children(".discussion");
			allDiscussions = allDiscussions.prevObject[0].children;

			$("#search-discussion").on("keyup", function () {
				let searchDiscussion = $("#search-discussion").val().toLowerCase();

				for (let index = 0; index < allDiscussions.length; index++) {
					let discussionName = $($(allDiscussions[index]).children("h2")[0])
						.text()
						.toLowerCase();

					if (discussionName.indexOf(searchDiscussion) <= -1) {
						$(allDiscussions[index]).removeClass("d-flex");
						$(allDiscussions[index]).addClass("d-none");
					} else {
						$(allDiscussions[index]).addClass("d-flex");
						$(allDiscussions[index]).removeClass("d-none");
					}
				}
			});

			// select article
			$("body").on("click", ".article", function () {
				if (articleCount == 0) {
					articleCount += 1;

					let data = {
						name: $($($(this)).children()[1])
							.children("h2")
							.text(),
						id: $(this).attr("id"),
					};

					notify("Article has been attached", "success");

					$("#attachment-info-container").append(
						_templates.articleSelected(data)
					);

					$("#exampleModal").modal("hide");
					$("#exampleModal").removeClass("show");
				} else {
					$("#article-alert").alert();
					$("#article-alert").addClass("show");
					$("#article-alert").removeClass("d-none");
					$("#exampleModal").modal("hide");
					$("#exampleModal").removeClass("show");
				}
			});

			// remove attached article
			$("body").on("click", ".article-attachment", function () {
				articleCount -= 1;
				notify("Article attachment removed", "error");
				$(this).remove();
			});

			// select drs
			$("body").on("click", ".discussion", function () {
				if (discussionCount <= 2) {
					discussionCount += 1;

					let data = {
						name: $($($(this)).children()[1])
							.children("h2")
							.text(),
						id: $(this).attr("id"),
					};

					notify("Discussion room attached", "success");

					$("#attachment-info-container").append(
						_templates.discussionSelected(data)
					);

					$("#exampleModal2").modal("hide");
					$("#exampleModal2").removeClass("show");
				} else {
					$("#discussion-alert").alert();
					$("#discussion-alert").addClass("show");
					$("#discussion-alert").removeClass("d-none");
					$("#exampleModal2").modal("hide");
					$("#exampleModal2").removeClass("show");
				}
			});

			// remove attached discussion
			$("body").on("click", ".discussion-attachment", function () {
				discussionCount -= 1;
				notify("Discussion attachment removed", "error");
				$(this).remove();
			});

			if (localStorage.getItem('thoughtprocess')) {
				let tpBlocks = JSON.parse(localStorage.getItem('thoughtprocess')).blocks;
				var tpData = { blocks: tpBlocks };
			}

			// editing given post if pid is passed in the url
			if (currentPid) {
				$(".tp-btn").on("click", function () {
					notify("redirecting to thought process page", "success");
					ajaxify.go(`/mobile/tp/list?ptype=post&parent=${currentPid}`);
				})

				$("body").on("submit", "#post-form", function (e) {
					e.preventDefault();
					$(".asset-create-btn").prop("disabled", true);
					$(".asset-create-btn").prop("disabled", false);

					let formData = new FormData(this);
					let isDraft = JSON.parse($(this).attr('is-draft').toLowerCase() || false);

					category = parseInt($("[category].selected").attr("cid"));
					subCategory = parseInt($("[sub-category].selected").attr("cid"));
					let postContent = $("#post-content").val();
					if (Array.isArray(postContent) && postContent.length) postContent = postContent[0];

					formData.append("cid", category);
					formData.append("sub_cid", subCategory);
					if (formData.get("content")) {
						formData.delete("content");
					}
					formData.append("content", postContent);
					formData.append("isDraft", isDraft);
					if (!formData.get("files[image]").name) {
						formData.delete("files[image]");
					}

					// check if there is any attached article
					if ($("#attachment-info-container .article-attachment").length > 0)
						formData.append(
							"attachment_id",
							// get id of the article and append it to the formData as a number
							parseInt(
								$("#attachment-info-container .article-attachment").attr("id")
							)
						);

					notify('Saving...', 'info');

					doAjax({
						type: 'PUT',
						url: `/app/posts/${currentPid}`,
						data: formData,
						cache: false,
						contentType: false,
						processData: false,
					}).then(function (res) {
						if (tpData != null) {
							doAjax({
								type: 'POST',
								url: "/thought_proccess",
								method: "POST",
								dataType: 'json',
								contentType: 'application/json',
								data: JSON.stringify(tpData),
							}).then(function (response) {
								ajaxify.go(`/mobile/post/view?pid=${currentPid}`);
								localStorage.removeItem("postData");
								localStorage.removeItem('thoughtprocess');
							}).catch((err) => {
								let { responseJSON } = err;
								$(".asset-create-btn").prop("disabled", false);
								if (responseJSON && responseJSON.status.message) {
									translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
								}
								else return notify('Oops! Some error occured while saving the thought proccess', 'error');

							})
						} else {
							ajaxify.go(`/mobile/post/view?pid=${currentPid}`);
							localStorage.removeItem("postData");
						}
					}).catch((err) => {
						let { responseJSON } = err;
						$(".asset-create-btn").prop("disabled", false);
						if (responseJSON && responseJSON.status.message) {
							translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
						}
						else return notify('Oops! Some error occured while saving the post', 'error');

					})
				})
			}
			// creating new post if no pid is passed in the url
			else {
				// thought process redirect
				$(".tp-btn").on("click", function () {
					ajaxify.go('/mobile/tp/list?ptype=post')
				})

				// submitting post
				$("body").on("submit", "#post-form", function (e) {
					e.preventDefault();

					$(".asset-create-btn").prop("disabled", true);

					let formData = new FormData(this);
					let isDraft = JSON.parse($(this).attr('is-draft').toLowerCase() || false);
					
					let category = parseInt($("[category].selected").attr("cid"));
					let subCategory = parseInt($("[sub-category].selected").attr("cid"));

					if (!category || !subCategory) return notify('Post category was not selected', 'error')
					let postContent = $("#post-content").val();
					if (Array.isArray(postContent) && postContent.length) postContent = postContent[0];

					formData.append("cid", category);
					formData.append("sub_cid", subCategory);
					if (formData.get("content")) {
						formData.delete("content");
					}
					formData.append("content", postContent);
					formData.append("isDraft", isDraft);

					// check if there is any attached article
					if ($("#attachment-info-container .article-attachment").length > 0)
						formData.append(
							"attachment_id",
							// get id of the article and append it to the formData as a number
							parseInt(
								$("#attachment-info-container .article-attachment").attr("id")
							)
						);

					notify('Saving...', 'info');

					if (!formData.get("files[image]").name) {
						formData.delete("files[image]");
					}

					doAjax({
						type: "POST",
						url: "/app/posts",
						data: formData,
						cache: false,
						contentType: false,
						processData: false,
					}).then(function (res) {
						if (tpData != null) {
							doAjax({
								type: 'POST',
								url: "/thought_proccess",
								method: "POST",
								dataType: 'json',
								contentType: 'application/json',
								data: JSON.stringify({ ...tpData, parentPid: res.response.pid }),
							}).then(function () {
								notify("Post created!", "success")
								localStorage.removeItem("postData");
								ajaxify.go(`/mobile/post/view?pid=${res.response.pid}`)
								localStorage.removeItem('thoughtprocess')
							}).catch((err) => {
								let { responseJSON } = err;
								$(".asset-create-btn").prop("disabled", false);
								if (responseJSON && responseJSON.status.message) {
									translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
								}
								else return notify('Oops! Some error occured while saving thought process', 'error');

							})
						} else {
							notify("Post created!", "success")
							localStorage.removeItem("postData");
							ajaxify.go(`/mobile/post/view?pid=${res.response.pid}`)
						}
					}).catch((err) => {
						let { responseJSON } = err;
						$(".asset-create-btn").prop("disabled", false);
						if (responseJSON && responseJSON.status.message) {
							translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
						}
						else return notify('Oops! Some error occured while creating the post', 'error');

					});
				});
			}

			$('#app-loader').hide();
		};

		function setEdit() {
			const { pid } = ajaxify.data;
			let formData = $("#post-form").serializeArray();
			formData.push({ pid });

			localStorage.setItem("postData", JSON.stringify(formData));
		}

		function setNew() {
			let formData = $("#post-form").serializeArray();
			localStorage.setItem("postData", JSON.stringify(formData));
		}

		return create;
	});
