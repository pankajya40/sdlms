"use strict";

/* globals define */

// Load required modules
define("forum/toc/journal", ["api",
	'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js',
	'mobile/classes/mobiletoc',], function (api) {

		// Initialize the journal object
		var journal = {};

		// Get the templates for the mobile table of contents
		journal.Templates = MobileTOCTemplate.todo();

		// Get the current date from the ajaxify data
		journal.currentDate = ajaxify.data.currentDate;

		// Initialize the journal object
		journal.init = () => {

			// Make an API call to get the journal data
			api.get("/toc/journal", {})
				.then(res => {
					// Loop through the journal data and append it to the DOM
					res.data.map(e => {
						$("[journalsection]").append(journal.Templates.journalcard(e))
					})
				})
				.catch(err => console.log(err))

			// Log a message to the console
			console.log('here in journal')

			// Attach event listeners to the journal object
			journal.events()

			// Get the journal feed
			journal.feed()
		};
		journal.events = () => {
			// Show the add journal card when the add button is clicked
			$('.add-journal-button').on('click', function () {
				$('.add-journal-card').removeClass('d-none')
				$('.add-journal-button').toggleClass('d-none')
			})

			// Close the add journal card when the close button is clicked
			$('.close-add-journal').on('click', function () {
				$('.add-journal-card').addClass('d-none')
				$('.add-journal-button').toggleClass('d-none')
			})

			// Handle form submission to add a new journal entry
			$("#addjournal").on("click", function (e) {
				e.preventDefault()
				let journalData = $("#journal").serializeArray()
				console.log(journalData)
				// Convert the serialized form data into an object
				const resultObj = journalData.reduce((acc, { name, value }) => {
					if (!acc[name]) {
						acc[name] = value;
					} else if (Array.isArray(acc[name])) {
						acc[name].push(value);
					} else {
						acc[name] = [acc[name], value];
					}
					return acc;
				}, {});
				console.log(resultObj)
				// Send a POST request to add the journal entry
				api.post("/toc/journal", resultObj)
					.then(res => {
						console.log(res)
						// Prepend the newly added journal entry to the page
						let journalCard = journal.Templates.journalcard(res.result)
						$('.add-journal-card').addClass('d-none')
						$('.add-journal-button').toggleClass('d-none')
						$("[journalsection]").prepend(journalCard)
					})
					.catch(err => { console.log(err) })
				console.log(journalData)
			})

			// Handle click events for publishing a journal entry
			$("body").on("click", "[journalpublishbutton]", function () {
				let journalId = $(this).data("publish-id");
				console.log(journalId)
				// Send a PUT request to publish the journal entry
				api.put("/toc/journal", {
					journalId: journalId,
					isPublished: true
				})
					.then(res => {
						console.log(res)
						// Disable the publish button and show success notification
						//$(`[data-publish-id=${journalId}]`).prop('disabled', true).html("Published");

						// Redirect to the grow page after a short delay
						setTimeout(() => {
							location.reload();
						}, 500)
						notify("Published", "success")
					})
					.catch(err => console.log(err))
			})

			// Handle click events for deleting a journal entry
			$("body").on("click", "[journaldeletebutton]", function (e) {
				e.preventDefault();
				let journalId = $(this).data("id");
				// Send a DELETE request to remove the journal entry
				api.del(`/toc/journal/${journalId}`, {})
					.then(res => {
						// Show success notification and redirect to the grow page
						notify("Deleted", "success")
						location.reload()
						
					})
					.catch(err => console.log(err))
			})

			$('body').on('click', '#autoplay', function () {
				if ($(this).is(':checked')) {
					$('#journalFeed').trigger('stop.owl.autoplay');
					console.log('paused')
				} else {
					$('#journalFeed').trigger('play.owl.autoplay');
					console.log('resume')
				}
			});

			$('body').on('click', '#prev-day', function (e) {
				const from = moment().subtract(10, 'days').startOf('day').toISOString();
				const to = moment().subtract(1, 'days').endOf('day').toISOString();
				
				// const previousDate = new Date();
				// previousDate.setDate(previousDate.getDate() - 2);
			  
				// const slot = {
				//   from: previousDate.toISOString(),
				//   to: new Date().toISOString()
				// };
				console.log(from,to)
				api.get('/toc/journal',{from,to}) 
				  .then(function(response) {
					console.log(response);
				  })
				  .catch(function(error) {
					console.log(error);
				  });
			  
			  });
			  
		}

		journal.feed = async function (uid) {
			let RECORD_PER_PAGE = 4;
			let loading = true;
			let loadedItems = 0;
			let card = (card, index) => {
				// 	return `<div class="card" style="width: 18rem;">
				// 	<div class="card-body">

				// 	  <div class="d-flex justify-content-between">
				// 	 <h6 class="card-subtitle mb-2 text-muted">${card.category}</h6>
				// 	<h6 class="card-subtitle mb-2 text-muted">${moment(card.createdAt).format('dd MMM YY')}</h6>
				// 		</div>
				// 	  <p class="card-text">${card.content}</p>

				// 		<div class="d-flex justify-content-end text-muted">
				// 			  <h6>${card.reason}</h6>
				// 			</div>


				// 	</div>
				//   </div>`;
				return journal.Templates.pubslishedJournalCard(card);
			}; //  will change

			let $feedsContainer = $('#journalFeed');  //  will change
			$feedsContainer.empty();
			$feedsContainer.addClass('owl-carousel')
			let load = async function (params = {}, url, cb) {

				params.uid = uid;
				if (url) {
					let urlParams = new URLSearchParams(url.split('?')[1]);
					params = { params, ...Object.fromEntries(urlParams) };
					url = url.split('?')[0];

				}

				params = { ...params, limit: RECORD_PER_PAGE };

				await api.get(url || `/toc/publishedjournal`, params)  //url  will change
					.then(res => {
						let { data } = res;



						let showItem = loadedItems;
						let html = data.map(card).join('');


						if (loadedItems) {
							$feedsContainer.trigger('destroy.owl.carousel');
							$feedsContainer.find('.owl-stage-outer').children().unwrap();
							$feedsContainer.removeClass("owl-center owl-loaded owl-text-select-on");
						}

						$feedsContainer.append(html);
						$feedsContainer.attr('next_page_url', res.next_page_url);
						loadedItems += data.length;
						if (loadedItems) {
							$('[feed-container]').toggleClass('d-none d-flex');
							cb && cb(showItem - 1);
						};

					}).catch(err => {
						console.log(err);
					}).finally(() => {
						loading = false;
					})
			}

			let callback = function (showItem = 0) {
				console.log('callback', showItem);
				$feedsContainer.owlCarousel({
					loop: true,
					dots: true,
					margin: 20,
					autoplay: true,
					autoHeight: true,
					items: 1,
					nav: true,
					navText: [
						'<i class="fa fa-caret-left mr-5" aria-hidden="true"></i>',
						'<i class="fa fa-caret-right ml-5" aria-hidden="true"></i>'
					],
					startPosition: showItem < 0 ? 0 : showItem,
				});

				$feedsContainer.on('changed.owl.carousel', function (e) {

					let itemRemain = e.item.count - (e.item.index + 1);
					let nextPageURL = $feedsContainer.attr('next_page_url');
					console.log(itemRemain, loadedItems);
					if (itemRemain === 0 && !loading && nextPageURL) {
						console.log('load more');
						loading = true;
						load({}, nextPageURL, callback);
					}
				})


			}

			load({}, null, callback);
		}
		return journal;
	});
