'use strict';

/* globals define */

define('forum/dtforms/creator/edit', [
    'api',
    'translator',
    'sdlms/enquiryform',
    'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js'
], function (api, translator) {
	var editForm = {};

	editForm.init = () => {
        const {title, blocks, _id, collectInfo=false, subsheets} = ajaxify.data.form;
        const {sharerUriBase} = ajaxify.data;
        
		const form = new EnquiryForm({
            target: '.sdlms-form-edit',
            header: 'DT Forms',
			classes: 'shadow-md w-90 d-block',
            action: 'create',
            requiresValidation: true,
            with: {title, blocks},
 		})

         $("#after-submit-message-edit").tinymce({
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

        $('#collectUserInfo').find(`[value="${collectInfo}"]`).attr('selected', true);

        editForm.toggleTemplateInput(collectInfo);

        if (subsheets && subsheets.length) {
            $('#subsheet-selection').empty().append(editForm.getSubsheetListOptions(subsheets));
            if (ajaxify.data.form && ajaxify.data.form.subsheetIndex) {
                let {subsheetIndex} = ajaxify.data.form;
                $('#subsheet-selection').find(`[value="${subsheetIndex}"]`).attr('selected', true);
            }
            $('#subsheet-section').show();
        }

        $('#collectUserInfo').on('change', function () {
            let val = JSON.parse($(this).val() || false);

            editForm.toggleTemplateInput(val)
        });

        $('#edit-form').off().on('click', function () {
            notify('Please wait...', 'info');

            const data = form.getJSON();
            const formId = $(this).data('id');

            const afterSubmissionMessage = $('#after-submit-message-edit').val();
            const collectInfo = $('#collectUserInfo').val();
            const templateId = $('#templateId').val();

            if (collectInfo) {
                data.collectInfo = JSON.parse(collectInfo);
                data.templateId = templateId;
            }

            doAjax({
                type: "PUT",
                url: "/forms/" + formId,
                dataType: "json",
				contentType: "application/json",
                data: JSON.stringify({...data, message: afterSubmissionMessage}),
            }).then(() => {
                    notify('Form created successfully', 'success');
            }).catch((err) => {
                let { responseJSON } = err;
                if (responseJSON && responseJSON.status.message) {
                    translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
                }
                else return notify('Oops! Some error occured', 'error');
            });
        });

        $('#verify-linkage').off().on('click', function () {
            $('#process-success').hide();
            $('#process-failed').hide();
            $('#spinner').show();

            let sheetId = $('#google-sheet-id').val();

            api.post('/forms/linksheet', {sheetId, formId: _id})
                .then((resp) => {
                    $('#process-success').text(resp.message).show();
                    $('#spinner').hide();
                    // setTimeout(() => location.reload(), 1000);
                    if (resp.subsheets && resp.subsheets.length) {
                        $('#subsheet-selection').empty().append(editForm.getSubsheetListOptions(resp.subsheets));
                        if (ajaxify.data.form && ajaxify.data.form.subsheetIndex) {
                            let {subsheetIndex} = ajaxify.data.form;
                            $('#subsheet-selection').find(`[value="${subsheetIndex}"]`).attr('selected', true);
                        }
                        $('#subsheet-section').show();
                    } else {
                        $('#subsheet-section').hide();
                    }
                })
                .catch((err) => {
                    $('#process-failed').text(err.message).show();
                    $('#spinner').hide();
                    $('#subsheet-section').hide();
                });
        });

        $('#save-spreadsheet-data').off().on('click', function () {
            notify('Please wait...', 'info');

            let button = $(this);
            let sheetId = $('#google-sheet-id').val();
            let subsheetIndex = $('#subsheet-selection').val();

            if (!subsheetIndex) {
                return notify('Please select a subsheet for the response to be recorded', 'error');
            }

            $('#save-form-spinner').show();
            button.attr('disabled', true);

            let rowHeaders = [];
            
            blocks.forEach((elem) => {
                rowHeaders.push(elem.question);
            
                if (elem.child && elem.child.length) {
                    elem.child.forEach(el => rowHeaders.push(el.question))
                }
            });

            api.post('/forms/savesheet', {sheetId, subsheetIndex, rowHeaders, formId: _id})
                .then((resp) => {
                    // console.log(resp);
                    $('#save-form-spinner').hide();
                    button.attr('disabled', false);

                    notify(resp.message, 'success');
                    setTimeout(() => location.reload(), 1000);
                })
                .catch((err) => {
                    // console.log(err);
                    $('#save-form-spinner').hide();
                    button.attr('disabled', false);

                    notify(err.message, 'error');
                });
        });

        $('#copy-form-link').off().on('click', function () {
            app.copyText(location.origin + sharerUriBase + _id);
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

    editForm.getSubsheetListOptions = (list) => {
        let options = '<option selected value="">Select</option> \n';

        list.forEach((el, index) => {
            options += `<option value="${index}">${el}</option> \n`
        });

        return options;
    }

    editForm.toggleTemplateInput = function (val) {
        if (val) {
            $('#templateIdContainer').attr('class', 'row d-flex');
        } else $('#templateIdContainer').attr('class', 'd-none');
    }

	return editForm;
})