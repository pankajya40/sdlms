"use strict";

/* globals define */

define("forum/contentManager/post",
	["api",
		'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
		'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js',
		"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.full.js",
	],
	function (api) {
		var post = {};
		
		post.setup = function () {
			$('.tab-content').addClass('px-lg-5');

			$(`.content-description`).tinymce({
				menubar: false,
				branding: false,
				paste_data_images: false,
				automatic_uploads: false,
				placeholder: "Please write the content you spotted",
				plugins: [
					'advlist', 'autolink', 'lists', 'link', 'charmap',
					'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
					'insertdatetime', 'wordcount'
				],
				toolbar: 'undo redo fullscreen | blocks | bold italic backcolor | ' +
					'alignleft aligncenter alignright alignjustify | ' +
					'bullist numlist outdent indent | removeformat'
			});
		}

		post.getSelectTo = function () {
			$("[user-name-select]").select2({
				width: '100%',
				placeholder: "Click me to select a name",
				ajax: {
					url: '/api/users',
					dataType: 'json',
					data: function (params) {
						var query = {
							query: params.term
						}
						return query;
					},
					processResults: function (data) {
						let results = {
							results: data.users.map(function (row) {
								return {
									id: row.uid,
									text: row.displayname || row.fullname || row.username
								}
							})
						};

						return results;
					}
				}
			});
		}

		post.events = function () {
			$("#submit-content").on("click", function () {
				if (String($("#title").val()).trim() == "" || String($("#content").val()).trim() == "") return alert("Please enter the title and spotted content...");
				let data = {
					title: $("#title").val(),
					content: $("#content").val(),
					message: $("#message").val(),
					spottedfrom: $("#source").find(':selected').text(),
					source: $("#source-name").val(),
					usage: $("#usage").find(':selected').text().toLowerCase(),
					author: $("[user-name-select]").val(),
					contentFor: $("#nativePlatform").find(':selected').text().toLowerCase()
				}
				api.post('/content', data).then((res) => {
					notify('Content Posted', 'success');
					ajaxify.refresh();
				})
			})

		}
		post.init = () => {

			post.setup();
			post.getSelectTo();
			post.events();

		};

		return post;
	});