'use strict';

define('forum/sdlms/communication/communicationLabel', ['api'], function (api) {
	var communicationLabel = {};
	communicationLabel.init = function () {
		const textarea = document.querySelector('.append');
		// const batch_dropdown = document.getElementById('batch');
		const data = ajaxify.data.batches.data;
		const cohort = ajaxify.data.cohort;
		const session = ajaxify.data.session;

		const channel = [
			{
				value: 'whatsapp',
				name: 'WhatsApp',
			},
			{
				value: 'email',
				name: 'E-Mail',
			},
			{
				value: 'sms',
				name: 'SMS',
			},
		];

		$('.append')
			.val('');

		$('#exampleFormControlInput1')
			.val('');

		var batchArray = [];
		var batchArrayCID = [];

		for (let index = 0; index < data.length; index++) {
			batchArray.push(data[index].name);
			batchArrayCID.push(data[index].cid);
		}
		batchArray.sort();
		batchArrayCID.sort();


		for (let i = 0; i < batchArray.length; i++) {
			$('#batch-dropdown')
				.append(`<option value="${batchArrayCID[i]}" name="${batchArray[i]}" >${batchArray[i]}</option>`);
		}

		for (let i = 0; i < channel.length; i++) {
			$('#channel-dropdown')
				.append(`<option value="${channel[i].value}">${channel[i].name}</option>`);
		}

		for (let i = 0; i < cohort.length; i++) {
			$('#cohort-dropdown')
				.append(`<option value="${cohort[i].name}">${cohort[i].name}</option>`);
		}

		for (let i = 0; i < session.length; i++) {
			$('#session-dropdown')
				.append(`<option value="${session[i].tid}">${session[i].topic}</option>`);
		}

		$('#search')
			.on('keyup', function () {
				const search = this.value;

				if (this.textLength === 0) {
					$('#searchResults')
						.empty();
				}

				const match = search.match(/^[a-zA-Z0-9 ]*/);
				const match2 = search.match(/\s*/);

				if (match2[0] === search) {
					$('#searchText')
						.text('');
					return;
				}
				if (match[0] === search) {
					api.get(`/communication/search?search=${search}`, {})
						.then((res) => {
							$('#searchResults')
								.empty();
							if (res.length === 0) {
								$('#searchResults')
									.append(`<p>Sorry. Nothing found.</p>`);
							}
							for (let i = 0; i < res.length; i++) {
								$('#searchResults')
									.append(`<p class='dropdown-item'>${res[i].topic} <small>${res[i].teaser}</small></p>`);
							}
						});
				}
			});

		$('#submit')
			.click(() => {
				if ($('#channel-dropdown')
					.val() === 'Channel' || $('.append')
						.val() === '' || $('#exampleFormControlInput1')
							.val() === '') {
					alert('Fill all the required fields');
					return;
				}

				var uidList = [];
				var uid = $('#uid');

				for (let i = 0; i < uid[0].children.length; i++) {
					uid[0].children[i].checked === true && uidList.push(parseInt(uid[0].children[i].value));
				}

				api.post('/communication/send', {
					broadcastName: $('#exampleFormControlInput1')
						.val(),
					text: $('#exampleFormControlTextarea3').val(),
					batch: $('#batch-dropdown')
						.val(),
					cohort: $('#cohort-dropdown')
						.val(),
					session: $('#session-dropdown')
						.val(),
					channel: [$('#channel-dropdown')
						.val()],
					uidArray: uidList,
					subject: $('#exampleFormControlInput1')[0].value,
				})
					.then((res) => {
						ajaxify.go('/communication/dashboard')
					});
			}
			);
		$('#cohort-dropdown')
			.on('change', () => {
				$('#textarea').attr("class", "col-7");
				$('#uid').empty()
				$('#buttons').empty()
				$('#batch-dropdown').val('Batch')
				$('#session-dropdown').val('Session')
				$('#buttons').append("<button type='button' class='btn  btn-sm btn-block side-btn-height side-btn-shadow' id='name'>Name</button><button type='button' class='btn  btn-sm btn-block side-btn-height side-btn-shadow'id='mentor'>MentorName</button>")
				eventListener()
				var uid;
				var name = $('#cohort-dropdown')
					.val();
				api.get(`/communication/getUidByCohort?name=${name}`, {})
					.then((response) => {
						uid = response;


						$('#uid').empty();
						console.log(uid);

						if (uid.length === 0) {
							$('#uid').append('No Students');
							return
						}
						for (let index = 0; index < uid.length; index++) {
							let name;
							if (uid[index].fullname === null || uid[index].fullname === "") { name = uid[index].username }
							else { name = uid[index].fullname }
							$('#uid').append(`<input type="checkbox" id="${uid[index].uid}" name="${name}" value="${uid[index].uid}"> <label for="${uid[index].uid}">${name}</label><br>`);
						}

					});
			});
		$('#session-dropdown').change(() => {
			$('#textarea').attr("class", "col-9");
			$('#uid').empty()
			$('#buttons').empty()
			$('#cohort-dropdown').val('Cohort')
			$('#batch-dropdown').val('Batch')
			$('#buttons').append("<button type='button' class='btn  btn-sm btn-block side-btn-height side-btn-shadow' id='name'>Name</button><button type='button' class='btn  btn-sm btn-block side-btn-height side-btn-shadow' id='mentor'>Mentor Name</button><button type='button' class='btn  btn-sm btn-block side-btn-height side-btn-shadow' id='tb.count'>Threadbuilder Count</button><button type='button' class='btn  btn-sm btn-block side-btn-height side-btn-shadow' id='eb.count'>Eaglebuilder Count</button>");
			eventListener()
		})

		$('#batch-dropdown').change(() => {
			$('#textarea').attr("class", "col-9");
			$('#uid').empty()
			$('#buttons').empty()
			$('#session-dropdown').val('Session')
			$('#cohort-dropdown').val('Cohort')
			$('#buttons').append("<button type='button' class='btn  btn-sm btn-block side-btn-height side-btn-shadow' id='name'>Name</button><button type='button' class='btn  btn-sm btn-block side-btn-height side-btn-shadow'id='mentor'>MentorName</button>")
			eventListener()
		})
		function eventListener() {
			document.querySelectorAll('.btn').forEach(item => {
				item.addEventListener('click', event => {
					textarea.value += "{{" + event.target.id + "}}"
				})
			})
		}
		$('#reset').click(() => {
			$('#uid').empty();
			$('#searchResults').empty();
			$('#buttons').empty();
			$('#buttons').append("<p class='text1'>Select Cohort/Session</p>")
		})
	};
	return communicationLabel;
});

// function getHTML(val){ return val.replaceAll(/</g, '&lt;') .replaceAll(/>/g, '&gt;') .replaceAll(/"/g, '&quot;') .replaceAll(/'/g, '&#39;') .replaceAll(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;') .replaceAll(/\n/g, '<br>') .replaceAll(/\n\r/g, '<br>') .replaceAll(/\r/g, '<br>') }