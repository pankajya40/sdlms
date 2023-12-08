"use strict";

/* globals define */

define("forum/contentManager/view_single",
	["api",
		"forum/contentManager/feedbackTemplate",
		'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
		'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js',
		"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.full.js",
		"sdlms/pagination"
	], function (api) {

		var view = {};

		view.prependNavBar = function () {
			$(".navbar").prepend(
				`<a class="mr-2 mb-4" href="/content/view">
                	<i data-icon="left" class="fa fa-chevron-left" aria-hidden="true"></i>
            	</a>`
			);
		}

		view.pagination = () => new Pagination({
			target: '#view-single-page-pagination',
			onChange: view.paginate
		});

		/**
		 * @author raman
		 * @function view.paginate
		 * @description will be used for paginating the feedbacks on a content.
		 *  
		 */
		view.paginate = function (url) {
			$("#feedbacks-container").empty();
			api.get(url, {}).then((feeds) => {
				if (feeds.data.length > 0) {
					feeds.data.map((feed) => {
						$("#feedbacks-container").append(new feedbackTemplate(feed).template);
					});
					view.pagination().paginate(feeds)
				}else{
					$("#feedbacks-container").append($("<div class='no-placeholder-container'><p class='badge rounded-pill no-placeholder'>No Feedback Yet!</p></div>"))
				}
			});
		};

		/**
		 * @author raman
		 * @function view.checkFeedbackExistsOrNot
		 * @description when the page loads, it will check for the current user, feedback
		 * exists or not for the particular content.
		 *  
		 */
		view.checkFeedbackExitsOrNot = function () {
			api.get('/api/v3/content/isFeedbackExist/' + view.contentId, {}).then(res => {
				if (!res.status) {
					$('#approveBtn').attr('disabled', false).removeClass('disabled')
				}

			}).catch(err => {
				app.notifyUser(err.message, 'error');
			});

			view.paginate(`/api/v3/content/feedback/${view.contentId}`)
		}

		/**
		 * @author raman
		 * @function view.events
		 * @description will add the event listener to the submit button, for the feedback.
		 *  
		 */
		view.events = function () {
			$("#submit-feedback").on("click", function (e) {
				e.preventDefault()
				let ratings = $("input[name='rate']")
				let data = {}
				for (let i = 0; i < ratings.length; i++) {
					if (ratings[i].checked) {
						data.rating = ++i
					}
				}
				data.feedback = $('#pTitle').val()
				data.isApproved = $('#customSwitch1')[0].checked
				data.contentId = view.contentId

				api.post('/api/v3/content/feedback', data).then(async (res) => {
					notify('Feedback Posted', 'success');
					$('.modal-backdrop').css('display', 'none');
					$('#feedbackModal').fadeOut();
					ajaxify.refresh();
				}).catch((err) => {
					app.notifyUser(err.message, 'error')
				});
			});
		}

		/**
		 * @author raman
		 * @function view.setContentData
		 * @description Will be used to set the content details dynamically to view_single.tpl template.
		 *  
		 */
		view.setContentData = function () {
			let data = ajaxify.data.content
			$('#vs-title').text(data.title)
			$('#vs-written-by').text(data.author)
			$('#vs-created-at').text(data.createdAt)
			$('#vs-content-spotter').text(data.spotter)
			$('#vs-content-spotted-from').text(`${data.spottedfrom}, ${data.source}`)
			$('#vs-usage').text(data.usage)
			$('#vs-content').append($(`${data.content}`))
			$('#vs-message').text(data.message)
		}

		view.init = () => {
			view.contentId = ajaxify.data.content._id
			view.prependNavBar()
			view.checkFeedbackExitsOrNot()
			view.setContentData()
			view.events()
			view.pagination()
		};

		return view;
	});
