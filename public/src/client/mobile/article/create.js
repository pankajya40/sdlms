'use strict';

/* globals define */

define('forum/mobile/article/create', ['api',
	'translator',
	'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js'], function (api, translator) {
	var create = {};

	create.init = function () {
		$('#app-loader').hide();

		let category;
		let subCategory;
		let nudgeSelected;

		const imgOpen = document.querySelector('.img-open');
		const nudgeOpen = document.querySelector('.nudge-open');
		const categoriesOpen = document.querySelector('.categories-open');

			let { pid } = ajaxify.data;

			// categories templates
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
			nudgeTemp: function (data) {
				return `<div class="nudge font-12 d-flex align-items-center mb-2" nid=${data.pid}>
              <img
                src=${data.image}
                alt="pix" class="img-cover circle-sm rounded-circle">
              <p class="mb-0 ml-2">${data.title}</p>
            </div>`;
				},
			};

			$('body').on('click', '#mobile-article-action', function () {
				let isDraft = $(this).data('draft');
				$('body').find('#create-article').attr('is-draft', isDraft)
			})

			$("#article-content-field").tinymce({
				height: 500,
				menubar: false,
				branding: false,
				paste_data_images: true,
				automatic_uploads: true,
				file_picker_types: "image",
				setup: function (editor) {
					editor.on('init', function (e) {
						let localData = localStorage.getItem("articleData");
						localData = JSON.parse(localData);
						let incomingTitle = localData[0].value;
						let incomingContent = localData[1].value;
						let incomingPid;

						incomingPid = localData.length == 3 && localData[2].pid;

						if ((pid && pid != incomingPid) || (!pid && incomingPid))
							localStorage.removeItem("articleData");
						else if (!pid) {
							$("#nudge-title").val(incomingTitle)
							tinymce.activeEditor.setContent(incomingContent);
						} else if (pid == incomingPid) {
							$("#nudge-title").val(incomingTitle)
							tinymce.activeEditor.setContent(incomingContent);
						}

						localStorage.removeItem("articleData");
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
					'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
				],
				toolbar: 'undo redo fullscreen link media video | blocks | bold italic backcolor | ' +
					'alignleft aligncenter alignright alignjustify | ' +
					'bullist numlist outdent indent | removeformat | help'
			});

			$(window).on("beforeunload", () => pid ? setEdit() : setNew());

			// checking if we came here for post edit and setting up data that has already been entered
			let currentPid = false;

			if (ajaxify.data.pid) {
				currentPid = ajaxify.data.pid

				api.post(`/app/getarticles?pid=${currentPid}`, {}).then((res) => {
					console.log(res);
					$(`[cid=${res.data.cid}]`).addClass("selected")
					$(`[cid=${res.data.sub_cid}]`).addClass("selected")

					$("#nudge-title").val(res.data.title);
					$("#article-content-field").val(res.data.content);
					nudgeSelected = res.data.nid;
				})
			}

			$("body").on("click", "#nudge-btn", () => openNudge());
			$("body").on("click", "#categories-btn", () => openCategories());
			$("body").on("click", "#img-btn", () => openImg());

			// open img
			function openImg() {
				if (categoriesOpen.classList.contains("d-none") == false)
					categoriesOpen.classList.add("d-none");
				if (nudgeOpen.classList.contains("d-none") == false)
					nudgeOpen.classList.add("d-none");
				imgOpen.classList.remove("d-none");
			}

			// open nudge
			function openNudge() {
				if (categoriesOpen.classList.contains("d-none") == false)
					categoriesOpen.classList.add("d-none");
				if (imgOpen.classList.contains("d-none") == false)
					imgOpen.classList.add("d-none");
				nudgeOpen.classList.remove("d-none");
			}

			// lazy load nudges list
			let check = {
				root: null,
				rootMargin: "0px",
				threshold: 0.9,
			};
			let nudgePage = 0;

			function loadNudges() {
				api
					.post(`/app/getnudge`, { limitBy: 50, page: nudgePage })
					.then((res) => {
						$("#nudges-list").empty();
						$.each(res.data, function (i, data) {
							$("#nudges-list").append(_templates.nudgeTemp(data));
						});
					});
				nudgePage++;
			}

			let nudgeObserver = new IntersectionObserver(loadNudges, check);
			nudgeObserver.observe(document.getElementById("nudges-list"));

			// searching through nudges
			let allNudges = $("#nudges-list").children(".nudge");
			allNudges = allNudges.prevObject[0].children;

			$("#search-nudge").on("keyup", function () {
				let searchNudge = $("#search-nudge").val().toLowerCase();

				for (let index = 0; index < allNudges.length; index++) {
					let nudgeName = $($(allNudges[index]).children("p")[0])
						.text()
						.toLowerCase();

					if (nudgeName.indexOf(searchNudge) <= -1) {
						$(allNudges[index]).removeClass("d-flex");
						$(allNudges[index]).addClass("d-none");
					} else {
						$(allNudges[index]).addClass("d-flex");
						$(allNudges[index]).removeClass("d-none");
					}
				}
			});

			// selecting a nudge
			$("body").on("click", ".nudge", function () {
				nudgeSelected = $(this).attr("nid");
				openImg();
			});

			// open categories
			function openCategories() {
				if (imgOpen.classList.contains("d-none") == false)
					imgOpen.classList.add("d-none");
				if (nudgeOpen.classList.contains("d-none") == false)
					nudgeOpen.classList.add("d-none");
				categoriesOpen.classList.remove("d-none");
			}

			// api get categories
			api.get("/app/category?type=mobile", {}).then((res) => {
				$.each(res, function (i, data) {
					$("#open-categories").append(_templates.category(data));
				});
			});

			// categories modal working
			$("body").on("click", "[sub-category]", function (e) {
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

				category = parseInt($("[category].selected").attr("cid"));
				subCategory = parseInt($("[sub-category].selected").attr("cid"));
			});

			if (localStorage.getItem('thoughtprocess')) {
				let tpBlocks = JSON.parse(localStorage.getItem('thoughtprocess')).blocks;
				var tpData = { blocks: tpBlocks };
			}

			// thought process redirect
			$(".tp-btn").on("click", function () {
				console.log("tp btn clicked");
				if (currentPid)
					ajaxify.go(`/mobile/tp/list?ptype=article&parent=${currentPid}`)
				else
					ajaxify.go(`/mobile/tp/list?ptype=article`)
			})

			// create submission
			$("body").on("submit", "#create-article", function (e) {
				e.preventDefault();

				$(".asset-create-btn").prop("disabled", true);

				let formData = new FormData(this);
				let isDraft = JSON.parse($(this).attr('is-draft').toLowerCase() || false);

				formData.append("nid", nudgeSelected);
				formData.append("isDraft", isDraft);

				if (currentPid) {
					notify("Editing aricle", "success");
					category = parseInt($("[category].selected").attr("cid"));
					subCategory = parseInt($("[sub-category].selected").attr("cid"));

					formData.append("cid", category);
					formData.append("sub_cid", subCategory);
					if (!formData.get("files[image]").name) {
						formData.delete("files[image]");
					}


					doAjax({
						type: 'PUT',
						url: `/app/articles/${currentPid}`,
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
							}).then(function (response) {
								notify("Article edited", "success");
								localStorage.removeItem("articleData");
								ajaxify.go(`/mobile/article/view?pid=${currentPid}`)
								localStorage.removeItem('thoughtprocess')
							}).catch((err) => {
								let { responseJSON } = err;
								$(".asset-create-btn").prop("disabled", false);
								if (responseJSON && responseJSON.status.message) {
									translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
								}
								else return notify('Oops! Some error occured while creating the article', 'error');
							})
						} else {
							notify("Article edited", "success");
							localStorage.removeItem("articleData");
							ajaxify.go(`/mobile/article/view?pid=${currentPid}`)
						}
					}).catch((err) => {
						let { responseJSON } = err;
						$(".asset-create-btn").prop("disabled", false);
						if (responseJSON && responseJSON.status.message) {
							translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
						}
						else return notify('Oops! Some error occured while creating the article', 'error');
					});
				} else {
					notify("Creating aricle", "success");
					formData.append("cid", 1);
					formData.append("sub_cid", 10);

					doAjax({
						type: "POST",
						url: "/app/articles",
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
							}).then(function (response) {
								notify("Article created!", "success");
								localStorage.removeItem("articleData");
								ajaxify.go(`/mobile/article/view?pid=${res.response.pid}`)
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
							notify("Article created!", "success");
							localStorage.removeItem("articleData");
							ajaxify.go(`/mobile/article/view?pid=${res.response.pid}`)
						}
					}).catch((err) => {
						let { responseJSON } = err;
						$(".asset-create-btn").prop("disabled", false);
						if (responseJSON && responseJSON.status.message) {
							translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
						}
						else return notify('Oops! Some error occured while creating the article', 'error');
					});
				}
			});
		};

		function setEdit() {
			const { pid } = ajaxify.data;
			let formData = $("#create-article").serializeArray();
			formData.push({ pid });

			localStorage.setItem("articleData", JSON.stringify(formData));
		}

		function setNew() {
			let formData = $("#create-article").serializeArray();
			localStorage.setItem("articleData", JSON.stringify(formData));
		}

		return create;
	});
