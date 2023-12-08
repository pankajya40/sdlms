'use strict';

/* globals define */

define('forum/observation/consent', ['api'], function (api) {
	var consent = {};

    consent.init = function () {
        const {pageName=''} = ajaxify.data;

        if (pageName == 'consent') {

            $('#consent-form').off().on('submit', function (e) {
                e.preventDefault();

                let consentProvided = $('[name="consent"]').is(':checked');
                if (!consentProvided) {
                    // console.log('User consent is required to proceed further');
                    return notify('User consent is required to proceed further', 'error');
                }

                if (!confirm('Are you sure to start your observation?')) return;

                api.post('/observation/start', {consentProvided})
                    .then((res) => {
                        console.log(res);
                        setTimeout(() => location.reload(), 1000);
                        notify('Process started successfully!', 'success');
                    })
                    .catch((err) => notify(err.message, 'error'));
            });
        }
    }

    return consent;
});