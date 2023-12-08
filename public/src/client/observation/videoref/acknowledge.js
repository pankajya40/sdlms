'use strict';

/* globals define */

define('forum/observation/videoref/acknowledge', [
    'api',
], function (api) {
	var reflect = {};

    reflect.init = function () {
        const {reflection, profile} = ajaxify.data;


        $('#acknowledgements').off().on('submit', function (e) {
            e.preventDefault()

            const formdata = $(this).serializeObject();
            const url = `/observation/videoref/reflection/${reflection._id}/acknowledge`;

            ['voiceNote', 'punctuality', 'whatsappGroup'].forEach(el => {
                if (!formdata[el]) {
                    formdata[el] = 'off';
                }
            });

            api.put(url, formdata)
                .then(() => {
                    setTimeout(() => location.reload(), 1000);
                    app.notifyUser('Reflection created successfully!', 'success');
                })
                .catch((err) => app.notifyUser(err.message, 'error'));
        })
    }

    return reflect;
})