'use strict';

define('forum/sdlms/communication/csv', [
	'api', 'sdlms/jquery_csv',
	'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js', 
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js'
], function (api) {
	var communicationLabel = {};
	communicationLabel.init = function () {
		const channel = ajaxify.data.channels;
		
		$('#exampleFormControlTextarea3').tinymce({
			height: 500,
			menubar: false,
			branding: false,
			paste_data_images: true,
			automatic_uploads: true,
			file_picker_types: "image",
			placeholder: 'Compose your email here...',
			file_picker_callback: communicationLabel.filePicker,
			plugins: [
			  'advlist', 'autolink', 'lists', 'link', 'image', 'preview',
			  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
			  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
			],
			toolbar: 'undo redo fullscreen image | blocks | bold italic backcolor | ' +
			  'alignleft aligncenter alignright alignjustify | ' +
			  'bullist numlist outdent indent | removeformat | help'
		  });
		
		$('#channel-dropdown').on('change', function () {
			let val = $(this).val();
			if (val == 'whatsapp') {
				$('#subject').hide();
				return $('#channelId').show();
			} else if (val == 'email') {
				$('#channelId').hide();
				return $('#subject').show();
			}
			$('#channelId').hide();
			$('#subject').hide();
		});

		const textarea = $('#exampleFormControlTextarea3')[0];
		$('#buttons')
			.append('<p class=\'text1\'>Upload a file to see list of available variable</p>');
		// reset values
		$('#csv')[0].value = '';
		$('.append')
			.val('');
		$('#exampleFormControlInput1')
			.val('');

		$('#submit')
			.click(() => {
				let channelname = $('#channel-dropdown').val();
				let templateId = $('#templateId').val();
				let subject = $('#emailSubject').val();

				if ($('.append').val() === '' || $('#exampleFormControlInput1').val() === '' || !channelname) {
					return alert('Fill all the required fields');
				}

				if (channelname == 'whatsapp' && !templateId) {
					return alert('Template Id is required!');
				}

				if (channelname == 'email' && !subject) {
					return alert('Email\'s subject is required!');
				}

				const formData = new FormData();
				formData.append('csv', $('#csv')[0].files[0]);
				formData.append('text', tinyMCE.activeEditor.getContent());
				formData.append('broadcastName', $('#exampleFormControlInput1')[0].value);
				formData.append('channel', [channelname],)
				formData.append('templateId', templateId)
				formData.append('subject', subject)

				doAjax({
					type: 'POST',
					url: '/communication/send',
					data: formData,
					cache: false,
					contentType: false,
					processData: false,
				})
					.then(function (response) {
						ajaxify.go('/communication/dashboard')
					});
			});

		$('#csv')
			.on('change', (e) => {
				$('#buttons')
					.empty();
				if (e.target.files[0].type !== 'text/csv') {
					console.log('Filetype not supported');
					$('#csv')[0].value = '';
					return 'Filetype not supported';
				}
				readCSV(e.target.files[0]);
			});

		$('#reset')
			.click(() => {
				$('#buttons')
					.empty();
				$('#buttons')
					.append('<p class=\'text1\'>Upload a file</p>');
			});

		$('#resetUpload')
			.on('click', (e) => {
				$('#buttons')
					.empty();
				$('#buttons')
					.append('<p class=\'text1\'>Upload a file</p>');
				$('#csv')[0].value = '';
			});

		function readCSV(file) {
			let csvContents = [];
			var reader = new FileReader();
			reader.onload = function () {
				csvContents = $.csv.toObjects(this.result);

				var keys = Object.keys(csvContents[0]);

				keys.forEach((a) => {
					$('#buttons')
						.append(`<button type='button' class='btn  btn-sm btn-block side-btn-height side-btn-shadow' id='${a}'>${a}</button>`);
				});
				eventListener();
			};
			reader.readAsBinaryString(file);
		}

		function eventListener() {
			document.querySelectorAll('.btn')
				.forEach((item) => {
					item.addEventListener('click', (event) => {
						$(tinyMCE.activeEditor.selection.getNode()).append(`{{${event.target.id}}}`)
						// textarea.value += `{{${event.target.id}}}`;
					});
				});
		}
	};

	communicationLabel.filePicker = function (callback,value,meta) {
		// Provide file and text for the link dialog
		var input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.onchange = function () {
			var file = this.files[0];

			var reader = new FileReader();
			reader.onload = function () {
				var id = "blobid" + new Date().getTime();
				var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
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
	}

	return communicationLabel;
});
