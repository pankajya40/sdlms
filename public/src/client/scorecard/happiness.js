
"use strict";

/* globals define */

define("forum/scorecard/happiness", ['api'],function (api) {
	var happiness = {};

	happiness.init = () => {

        const mojis = ['😖','😒','🙁','😕','☹️','🙃','🙂','😀','😃','😊','🤩'];


        $("#reflectionform").on('submit', function(event){
            event.preventDefault();

            app.notifyUser('Please wait...');

            const $form = $(this);

            $form.find('[type="submit"]').attr('disabled', true);

            var form_data = $("#reflectionform").serializeArray();
            let data = {
                response: [],
                meta: $('#metainfo').serializeObject(),
            }

            let missingfields = [];

            Object.keys(data.meta).forEach(el => {
                if (!data.meta[el]) {
                    missingfields.push(el);
                }
            });

            if (missingfields.length) {
                return app.notifyUser('Required fields: ' + missingfields.join(', '), 'error');
            }
            
            $.each(form_data, function (ind, el) {
                let payload = {
                    question: el['name'],
                    answer: el['value'],
                }
        
                data.response.push(payload);
            });

            api.post('/social_scorecard/happiness', data)
                .then((resp) => {
                    setTimeout(() => location.reload(), 1000);
                    app.notifyUser('Submitted successfully', 'success');
                })
                .catch((err) => {
                    console.log(err);
                    $form.find('[type="submit"]').attr('disabled', false);
                    app.notifyUser(err.message, 'error');
                });
        });
        
        $('[range-selector]').on('input', function (e) {
            let emojiId = $(this).data('emoji-id');
            let rangeValue = e.target.value;
            $(`#${emojiId}`).text(mojis[rangeValue])
        });
    }

	return happiness;
});
