'use strict';

/* globals define */

define('forum/dtforms/creator/create', [
    "api",
    'translator',
    'sdlms/enquiryform',
    'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js',
    "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.full.js",
], function (translator) {
	var createForm = {};

	createForm.init = () => {
		const form = new EnquiryForm({
            target: '.sdlms-form',
            header: 'DT Forms',
			classes: 'shadow-md w-90 d-block',
            action: 'create',
            requiresValidation: true,
            with: {},
 		})

         $("[user-name-select]").select2({
			placeholder: "Add Editors",
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

         $("#after-submit-message").tinymce({
            height: 400,
            width: '100%',
            menubar: false,
            branding: false,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime','table', 'code', 'wordcount'
            ],
            toolbar: 'undo redo fullscreen link | blocks | bold italic backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | removeformat'
        });

        $('#collectUserInfo').on('change', function () {
            let val = JSON.parse($(this).val() || false);

            if (val) {
                $('#templateIdContainer').attr('class', 'row d-flex');
            } else $('#templateIdContainer').attr('class', 'd-none');
        });

        $('#create-form').off().on('click', function () {
            notify('Please wait...', 'info');

            const data = form.getJSON();
            const afterSubmissionMessage = $('#after-submit-message').val();
            const collectInfo = $('#collectUserInfo').val();
            const templateId = $('#templateId').val();

            if (collectInfo) {
                data.collectInfo = JSON.parse(collectInfo);
                data.templateId = templateId;
            }
            
            doAjax({
                type: "POST",
                url: "/forms",
                dataType: "json",
				contentType: "application/json",
                data: JSON.stringify({...data, message: afterSubmissionMessage}),
            }).then(() => {
                    notify('Form created successfully', 'success');
                    ajaxify.go('/forms');
                })
                .catch((err) => {
                    let { responseJSON } = err;
                    if (responseJSON && responseJSON.status.message) {
                        translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
                    }
                    else return notify('Oops! Some error occured', 'error');
                })
        });

        $('#form-preview').off().on('click', function () {
            $('#form-preview-container').empty();
            let formData = form.getJSON();

            new EnquiryForm({
                target: '#form-preview-container',
                header: 'DT Forms (preview)',
                classes: 'shadow-md d-block',
                action: 'answer',
                with: formData,
             });
        })
	}


	return createForm;
})