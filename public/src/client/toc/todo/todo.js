"use strict";
/* globals define */
define("forum/toc/todo/todo", ["api", 'forum/toc/journal', "sdlms/pagination", 'mobile/classes/mobiletoc',
	"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.full.js",
	"https://cdn.jsdelivr.net/npm/chart.js",
	"https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
],


	function (api, journal) {
		const RECORDS_PER_PAGE = 15;
		var todo = {};
		//const ChartJS = require("../chart");

		todo.Templates = MobileTOCTemplate.todo();
		function getISOWeekNumber(date) {
			let fixeddate = new Date(date);
			// Set the target date to Monday of the current week
			let target = new Date(fixeddate.getTime());

			target.setDate(target.getDate() - target.getDay() + 1);

			// Get the year and week number of the target date
			let year = target.getFullYear();
			let weekNumber = Math.floor((target.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

			// Adjust the week number if necessary (week 1 might belong to the previous year)
			if (weekNumber === 0) {
				year--;
				weekNumber = getISOWeekNumber(new Date(year, 11, 31));
			} else if (weekNumber > 52) {
				year++;
				weekNumber = 1;
			}

			// Return the year and week number as a string
			return year + '-W' + weekNumber.toString().padStart(2, '0');
		}
		// ,"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.full.js"
		todo.init = () => {
			$('body').css('overflow-x', 'hidden')
			journal.init()

			todo.paginateTodo(`/toc/todo`, {
				isCompleted: "incomplete"
			});

			todo.events();
			todo.renderChart();
		};
		todo.getFilters = () => {
			let filters = {};
			filters = {
				filters: $('.urgency-button').val(),
				isCompleted: $('#completestatus').val(),
				name: $('#search-input').val()
			}

			Object.keys(filters).forEach(key => {
				if (!filters[key]) {
					delete filters[key]
				}
			})

			return filters;
		}

		todo.events = () => {
			$('body').on('click', '[data-toggle="popover"]', function () {
				var $popoverToggle = $(this);
			  
				if (!$popoverToggle.data('bs.popover')) {
				  $popoverToggle.popover({
					trigger: 'click'
				  });
				  $popoverToggle.popover('show');
				} else {
				  $popoverToggle.popover('toggle');
				}
			  });

			  $(document).on('click', function (e) {
				var $popoverToggle = $('[data-toggle="popover"]');
				var $popoverContent = $('.popover');
			  
				// Check if the clicked element is outside the popover toggle and popover content
				if (!$popoverToggle.is(e.target) && $popoverToggle.has(e.target).length === 0 &&
					!$popoverContent.is(e.target) && $popoverContent.has(e.target).length === 0) {
				  $popoverToggle.popover('hide');
				}
			  });
			  
			// var noCardsMessageShown = false;
			// // Check for cards every second
			// setInterval(function() {

			// 	if ($('.todo-tasks').length === 0 && !noCardsMessageShown) {

			// 		$('#tasks').append(`
			// 	<div class="d-flex justify-content-center mb-5 w-100"><div class="text-muted"><img src="https://res.cloudinary.com/duhtmh8hp/image/upload/v1683021641/7732645_5272_wwoey7-min_nvt3am.jpg" width="500px">
			// 	<h5 class="text-center">No tasks available</h5></div>
			// 	</div>
			// 	`);
			// 		noCardsMessageShown = true;
			// 	} else if ($('.todo-tasks').length > 0 && noCardsMessageShown) {
			// 		// Cards are present and message shown, remove message
			// 		// $('p').remove();
			// 		noCardsMessageShown = false;
			// 	}
			// }, 4000);

			// Create a new MutationObserver
			// const observer = new MutationObserver((mutationsList) => {
			//     // Check if there are any tasks in the task list
			//     const tasks = $('.todo-tasks');
			//     if (tasks.length === 0) {
			//     // If there are no tasks, show the message
			//     showNoTasksMessage();
			//     } else {
			//     // If there are tasks, hide the message
			//     hideNoTasksMessage();
			//     }
			// });

			// // Define the options for the observer
			//     const observerOptions = {
			//         childList: true, // Watch for changes to the children of the task list container
			//         subtree: true, // Watch for changes to the descendants of the task list container
			//     };

			//     // Start observing the task list container for changes
			//     observer.observe(taskListContainer, observerOptions);

			//     // Define functions to show and hide the message
			//     function showNoTasksMessage() {
			//         const noTasksMessage = $('<div class="no-tasks-message">No tasks available</div>');
			//         $('#tasks').append(noTasksMessage);
			//     }

			//     function hideNoTasksMessage() {
			//         const noTasksMessage = $('.no-tasks-message');
			//         if (noTasksMessage.length > 0) {
			//         noTasksMessage.remove();
			//         }
			//     }

			$("body").on("change", ".urgency-button,#completestatus,#search-input", function () {

				todo.paginateTodo(`/toc/todo/`, {
					page: 0
				})
			})


			$("body").on("click", ".no-ajaxify", function () {
				let url = $(this).data("href");
				location.href = url;
			})
			$(".todo").addClass("active");
			$(".myassets").on("click", ".has-subnav", function () {
				console.log('hello')
				$(".has-subnav").removeClass("active");
				$(this).addClass("active");
			});
			let items = ''

			$("#close-button").on("click", function () {
				$('#todoModal').modal('hide')
			})

			$('#todoModal').on('hidden.bs.modal', function () {
				todo._id = null;
			})

			$("#selectAssignee").select2({
				containerCssClass: "custom-container shads-light",
				dropdownCssClass: "custom-dropdown shads-light",
				placeholder: "Click me to select options",
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
			})

			// $('#scheduleModal').on('show.bs.modal', function(event) {
			// 	var button = $(event.relatedTarget); // Button that triggered the modal
			// 	var id = button.data('id');

			// 	if (id == null) {
			// 	  console.error('Error: data-id attribute not set on button.');
			// 	  return;
			// 	}

			// 	console.log('ID:', id);

			// 	var modal = $(this);
			// 	$('body').find('#submitschedule').data('id', id);

			//   });

			//   $('[schedule]').on('click',function(){
			// 	var id = $(this).data('id');
			// 	console.log(id)
			// 	$('#submitschedule').data('id',id)
			//   })



			$('body').on('click', '.close-collapse', function () {
				var id = $(this).data('id');
				$(`#schedule-form${id}`).addClass('d-none')
			})

			$('body').on('click', '.submit-schedule', function (e) {
				e.preventDefault()
				let id = $(this).data('id');
				let data = $(`#scheduledata${id}`).serializeObject();
				$('#scheduledata')[0].reset();
				console.log(data)
				api.put(`/toc/todo/${id}`, data)
					.then(res => {
						console.log(res)
					})
					.catch(err => {
						console.log(err)
					})
			})

			$('body').on('click', '.complete-task-check', function (e) {
				let id = $(this).data('id')
				let isCompleted = $(this).data('iscompleted')
				let updatedValue = true;
				if (isCompleted) {
					updatedValue = false;
				}
				api.put(`/toc/todo/${id}`, {
					isCompleted: updatedValue
				})
					.then(res => {
						console.log(res)
						if (updatedValue) {
							$(`#tasklabel${id}`).toggleClass('complete-task');
							$(`#taskCheck-${id}`).removeClass('fa-square-o');
							$(`#taskCheck-${id}`).addClass('fa-check-square-o');
						} else {
							$(`#tasklabel${id}`).toggleClass('complete-task');
							$(`#taskCheck-${id}`).addClass('fa-square-o');
							$(`#taskCheck-${id}`).removeClass('fa-check-square-o');
						}

					})
					.catch(err => console.log(err))
				// if ($(this).is(':checked')) {
				// 	console.log('checked')
				// 	api.put(`/toc/todo/${id}`,{isCompleted:false})
				// 	.then(res=>{console.log(res)})
				// 	.catch(err=>{console.log(err)})
				//   } else {
				// 	api.put(`/toc/todo/${id}`,{isCompleted:true})
				// 	.then(res=>{console.log(res)})
				// 	.catch(err=>{console.log(err)})
				//   }
			})

			$('.clear-todo').on('click', function () {
				$('#todo')[0].reset()
			})

			$('#todo').on('submit', function (e) {
				e.preventDefault()
				let submissionData = $('#todo').serializeObject()
				submissionData.status = 'upcoming';
				$('#todo')[0].reset()
				console.log("submission data :", submissionData)
				// post and put api call
				if (!todo._id) {
					api.post(`/toc/todo`, submissionData)
						.then(res => {
							console.log(res)
							$(".todo-container").prepend(todo.Templates.card(res));
							$('#todoModal').modal('hide')
							window.location.reload();
						})
						.catch(err => {
							console.log("error", err)
							notify(err.message, "error")
						})
				} else {
					api.put(`/toc/todo/${todo._id}`, submissionData).then(res => {
						submissionData._id = todo._id;
						$(`[single-todo][data-_id="${todo._id}"]`).replaceWith(todo.Templates.card(submissionData));
						$('#todoModal').modal('hide')
						window.location.reload();
					})
						.catch(err => {
							notify("Did not update", "error")
						})
				}
			})

			$("body").on("click", "#edittodo", function () {
				let id = $(this).data("id");
				$("#saveedit").data("data", `${id}`);
			});


			$("body").on("click", "#delete", function () {
				let id = $(this).data('id');
				api.del('/toc/todo/' + id, {})
					.then(res => {
						console.log(res);
						$(`#task${id}`).remove()
					})
					.catch(error => {
						console.log(error)
					})
			})

			document.querySelectorAll('input[type=checkbox]').forEach(function (checkbox) {
				checkbox.addEventListener('change', function () {
					if (this.checked) {
						console.log(this.previousElementSibling.textContent.trim());
					}
				});
			});

			const $titleInput = $('textarea[name="title"]');
			const $descriptionInput = $('textarea[name="description"]');

			$titleInput.on('keydown', (event) => {
				if (event.key === 'Enter') {
					event.preventDefault(); // prevent the default behavior of adding a new line
					$descriptionInput.focus(); // move focus to the next field
				}
			});

			$descriptionInput.on('keydown', (event) => {
				if (event.key === 'Enter') {
					event.preventDefault(); // prevent the default behavior of adding a new line
					$('#todo').submit(); // submit the form
				}
			});

			$("body").on("click", "#grow-button", function (e) {
				e.preventDefault();
				location.href = `/toc/grow/${getISOWeekNumber(moment().format("YYYY/MM/DD"))}`;
			});

			$("body").on("click", "#garuda-button", function (e) {
				e.preventDefault();
				location.href = `/toc/garuda/${getISOWeekNumber(moment().format("YYYY/MM/DD"))}`;
			});
			// $('body').on('click', '.todo-delete-button', function () {
			// 	let id = $(this).data("_id")
			// 	let confirmation = confirm("Are you sure ?")
			// 	if (confirmation) {
			// 		api.del('/toc/todo/' + id, {}).then(res => {
			// 			if (!res.deleted) return
			// 			$(`[single-todo][data-_id="${id}"]`).remove();
			// 		}).catch(error => console.log(error))
			// 	}
			// });
		}

		// todo.paginateTodo = (name, filters, isCompleted, params = {}, replace = true) => {
		//     $("#tasks").empty()
		//     let something = null;
		//     console.log()
		//     api.get()
		//         .then(res => {
		//             console.log(res)
		//             something = res.content;
		//             let todos = res.data;
		//             let html = todos.map(todo.Templates.desktopcard).join("")

		//             $("#tasks")[replace ? 'html' : 'append'](html);
		//             console.log(todos)
		//         })
		//         .catch(err => console.log(err))
		// };

		// todo.paginateTodo = (name, filters, isCompleted, params = {}, replace = true) => {
		//     console.log('paginatetodo')
		//     $("#tasks").empty();
		//     // var url = `/toc/todo?name=${name}${filters ? `&filters=${filters}` : "","&limitBy=6"}`;
		//     var url = `/toc/todo?limit=6`;
		//     // let cardTemplate =	Template.cards();
		//     console.log(url)
		//     api.get(url, params)
		//         .then((res) => {
		//             res.data.map((val, index) => {
		//                 $("#tasks").append(todo.Templates.desktopcard(val));
		//                 // if(ev.status=="In progress") {
		//                 // 	$(`#card-${ev.tid}`).find(`.hidden-detail`).append(`<div>${ev.tasks.length} task to be accomplish.</div>`);
		//                 // } else if (ev.status=="Submitted") {
		//                 // 	$(`#card-${ev.tid}`).find(`.hidden-detail`).append(`<div>Congratulations!!!</div><div>for Completion of ${ev.category}</div>`);
		//                 // }
		//             });
		//             pagination.paginate(res)
		//         });


		// };
		todo.paginateTodo = (url, params) => {

			console.log('paginatetodo')
			$("#tasks").empty();
			let _params = {}
			try {
				url = url.split('?');
				_params = url[1] || "";

				_params = Object.fromEntries(new URLSearchParams(_params));
				params = {
					...params,
					..._params
				};
				console.log(params)
				url = url[0];
			} catch (error) {

			}
			// var url = `/toc/todo?name=${name}${filters ? `&filters=${filters}` : "","&limitBy=6"}`;
			// var url = `/toc/todo?limit=6`;
			// let cardTemplate =	Template.cards();
			let filters = todo.getFilters();

			filters = {
				...filters,
				...params,
				limit: RECORDS_PER_PAGE
			};
			api.get(url, filters)
				.then((res) => {
					res.data.map((val, index) => {
						$("#tasks").append(todo.Templates.desktopcard(val));
					});
					pagination.paginate(res)
				})
				.catch((error)=>{
					console.log(error)
				})
		};
		let pagination = new Pagination({
			target: '#tasks-pagination',
			onChange: todo.paginateTodo
		});


		todo.feeds = async function ($parent = $('.feeds')) {
			console.log($parent)
			let loading = true;
			const RECORD_PER_PAGE = 8
			let loadedItems = 0;
			//let card = CCCMSTemplate.profile().modals.feedModal;

			let $feedsContainer = $parent.find('.feeds-container');
			let load = async function (params = {}, url, cb) {

				if (url) {
					let urlParams = new URLSearchParams(url.split('?')[1]);
					params = {
						params,
						...Object.fromEntries(urlParams)
					};
					url = url.split('?')[0];

				}

				params = {
					...params,
					limit: RECORD_PER_PAGE
				};

				await api.get(url || `/toc/publishedjournal`, params)
					.then(res => {
						let {
							data
						} = res;



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
					margin: 10,
					nav: true,
					autoHeight: true,
					dots: false,
					items: 1,
					startPosition: showItem,
				});

				$feedsContainer.on('changed.owl.carousel', function (e) {

					let itemRemain = e.item.count - e.item.index - e.page.size + loadedItems;
					let nextPageURL = $feedsContainer.attr('next_page_url');

					if (itemRemain === 0 && !loading && nextPageURL) {
						console.log('load more');
						loading = true;
						load({}, nextPageURL, callback);
					}
				})


			}

			load({}, null, callback);


		};

		todo.renderChart = () => {
			api.get('/toc/counturgentimportant', {})
				.then(res => {
					const data = [{
						label: 'countNotUrgentAndImportant',
						data: [res.countNotUrgentAndImportant],
						backgroundColor: 'rgba(255, 99, 132, 0.2)'
					},
					{
						label: 'countNotUrgentAndNotImportant',
						data: [res.countNotUrgentAndNotImportant],
						backgroundColor: 'rgba(54, 162, 235, 0.2)'
					},
					{
						label: 'countUrgentAndImportant',
						data: [res.countUrgentAndImportant],
						backgroundColor: 'rgba(255, 206, 86, 0.2)'
					},
					{
						label: 'countUrgentAndNotImportant',
						data: [res.countUrgentAndNotImportant],
						backgroundColor: 'rgba(75, 192, 192, 0.2)'
					},
					{
						label: 'countCompletedTasks',
						data: [res.countCompletedTasks],
						backgroundColor: 'rgba(153, 102, 255, 0.2)'
					}
					];

					const options = {
						responsive: true,
						maintainAspectRatio: true,
						plugins: {
							legend: {
								display: false,
							},
							tooltip: {
								enabled: true,
							},
							title: {
								display: false,
							},
						},
						scales: {
							y: {
								display: false,
								beginAtZero: true,
								grid: {
									display: false,
								},
								line: {
									display: false
								}
							},
							x: {
								ticks: {
									display: false,
								},
								beginAtZero: true,
								grid: {
									display: false,
								},
							},
						},
					};

					const chart = todo.ChartJS('bar', data, 'myChart', options);
					console.log(chart)
				})
				.catch(err => console.log(err));
		};

		todo.ChartJS = (chartType, data, container, options = {}, colors = []) => {
			let chart = null;
			console.log(options)
			const init = () => {
				const ctx = document.getElementById(container).getContext('2d');
				const chartData = parseData();
				const chartOptions = parseOptions();
				chart = new Chart(ctx, {
					type: chartType,
					data: chartData,
					options: chartOptions,
				});
			};

			const parseData = () => {

				const labels = data.map(obj => obj.label);
				console.log(labels)
				const datasets = [{
					data: data.map(obj => obj.data),
					backgroundColor: colors.length ? colors : getDefaultColors(labels.length),
					borderWidth: 1
				}];
				console.log(labels, datasets)
				return {
					labels,
					datasets
				};
			};

			const parseOptions = () => {
				const defaultOptions = {
					responsive: true,
					maintainAspectRatio: true,
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true,
							},
						}],
					},
				};
				return Object.assign({}, defaultOptions, options);
			};

			const setData = (newData) => {
				data = newData;
				const chartData = parseData();
				chart.data = chartData;
				chart.update();
			};

			const setOptions = (newOptions) => {
				options = newOptions;
				const chartOptions = parseOptions();
				chart.options = chartOptions;
				chart.update();
			};

			const on = (eventName, callback) => {
				chart.config.options.on = chart.config.options.on || {};
				chart.config.options.on[eventName] = callback;
				chart.update();
			};

			const addDataset = (dataset) => {
				const labels = Object.keys(dataset);
				const data = labels.map(label => dataset[label]);
				const backgroundColor = colors[chart.data.datasets.length] || getDefaultColors(1)[0];
				const borderWidth = 1;
				const newData = {
					label: '# of Votes',
					data,
					backgroundColor,
					borderWidth
				};
				chart.data.datasets.push(newData);
				chart.update();
			};

			const noDataMessage = () => {
				const canvas = document.getElementById(container);
				canvas.style.display = 'none';

				const message = document.createElement('div');
				message.innerHTML = 'No data to display';
				message.style.textAlign = 'center';

				const parent = canvas.parentNode;
				parent.insertBefore(message, canvas);
			};

			const getDefaultColors = (count) => {
				const defaultColors = [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				];
				return defaultColors.slice(0, count);
			};

			if (data.length === 0) {
				noDataMessage();
				return;
			}

			init();

			return {
				setData,
				setOptions,
				on,
				addDataset,
			};
		};



		return todo;
	});