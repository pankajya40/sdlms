'use strict';

/* globals define */

define('forum/observation/sign_off', ['api'], function (api) {
	var signOffPage = {};

    signOffPage.init = function () {
        $('#signoff-form').on('submit', function (e) {
            e.preventDefault();

            let formData = $(this).serializeObject();
            
            api.post('/observation/signoff', formData)
                .then(() => {
                    setTimeout(() => location.href = '/observation', 1000);
                    notify('Submitted successfully!', 'success');
                })
                .catch((err) => notify(err.message, 'error'))
        });

    }

    return signOffPage;
})