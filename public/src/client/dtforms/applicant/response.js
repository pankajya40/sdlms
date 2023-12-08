"use strict";

/* globals define */

define("forum/dtforms/applicant/response", ["translator", "sdlms/enquiryform"], function (translator) {
	var response = {};

	response.init = () => {
		const {isSuccessPage, collectInfo} = ajaxify.data;
		
		if (isSuccessPage) {
			$('.sdlms-form').append(ajaxify.data.message);
			return;
		}
		
		const {title, blocks=[], _id} = ajaxify.data.form || {};

		const form = new EnquiryForm({
            target: '.sdlms-form',
            header: 'DT Forms',
			classes: 'shadow-lg d-block',
            action: 'answer',
            requiresValidation: true,
            with: {title, blocks},
 		});

		$('#submit-form').off().on('click', function() {
			let button = $(this);

			notify('Please wait...', 'info');

			let formResponse = form.getJSON();

			let emailId = $('#contact-info-form').find('[name="emailId"]').val();
			let countryCode = $('#contact-info-form').find('[name="countryCode"]').val();
			let contact = $('#contact-info-form').find('[name="contact"]').val();

			if (collectInfo) {
				if (!emailId) return notify('Email Id is required', 'error');
				if (!countryCode) return notify('Country code is required', 'error');
				if (!contact) return notify('Contact number is required', 'error');

				formResponse.emailId = emailId;
				formResponse.countryCode = countryCode;
				formResponse.contact = contact;
			}

			$('#spinner').show();
			button.attr('disabled', true);

			doAjax({
                type: "POST",
                url: "/forms/response",
                dataType: "json",
				contentType: "application/json",
                data: JSON.stringify({...formResponse, formId: _id}),
            }).then((resp) => {
				$('#spinner').hide();
				// button.attr('disabled', false);

				let {response} = resp;
				notify('Response submitted successfully', 'success');
				ajaxify.go(location.pathname + '?action=success&ref=' + response._id);
			})
			.catch((err) => {
				$('#spinner').hide();
				button.attr('disabled', false);

				let { responseJSON } = err;
				if (responseJSON && responseJSON.status.message) {
					translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
				}
				else return notify('Oops! Some error occured', 'error');
			});
		});
	}

	return response;
})