
"use strict";

/* globals define */

define("forum/scorecard/company_submissions", [
    'api', 
    'pdgms/leavesTrackerTemplates',
    'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js',
],function (api) {
	var company_submissions = {};
    var meta = {};

	company_submissions.init = () => {
        const { Modals } = LeavesTrackerTemplates.Templates();
        const {companies} = ajaxify.data;
        const subject = 'Student Unicorns Happiness Report';

        $('body').on('click', '[broadcast-email]', function () {
            let element = $(this);
            let url = element.attr('data-url');
            let email = element.attr('data-email');
            let poc = element.attr('data-poc');
            let selfReflection = element.attr('data-self-reflection');

            meta = companies.find(el => el.email.trim().toLowerCase() == email.trim().toLowerCase())
            
            let modalTargetId = 'PromptModel-';

            $('body').find('#email-action-prompt-area').empty().append(`
                <button class="d-none" data-toggle="modal" data-target="#${modalTargetId}">button</button>
            `)
            .append(Modals.promptModal({
                header: 'Preview',
                submitButtonId: 'send-email-action',
                promptBody: company_submissions.modalBody({email, subject}),
                modalId: modalTargetId,
                modalClass: 'modal-lg',
                submitButtonText: 'Send',
                submitButtonData: {url}
            }));

            $("#email-content").tinymce({
                height: 350,
                width: '100%',
                menubar: false,
                branding: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime','table', 'code', 'wordcount'
                ],
                toolbar: 'undo redo fullscreen link code | blocks | bold italic backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | removeformat',

                setup: function (editor) {
                    editor.on('init', function (e) {
                        //this gets executed AFTER TinyMCE is fully initialized
                        editor.setContent(company_submissions.generateEmail({
                            happinessScorecard: [location.origin, url].join(''), poc, selfReflection
                        }));
                    });
                    }
            });

            
            $(`[data-target="#${modalTargetId}"]`).trigger('click');
        });

        $('body').on('click', '[view-scores]', function () {
            let url = $(this).data('href');
            location.href = url;
        });

        $('body').on('click', '#send-email-action', function () {
            let url = $(this).attr('data-url');
            let formdata = $('#broadcast-email-form').serializeObject();
            let {emailContent} = formdata;

            emailContent = $(emailContent);
            emailContent.find('[data-scorecard]').attr('href', [location.origin, url].join(''));

            let payload = {
                ...formdata, currentWeek: ajaxify.data.params, meta,
                emailContent: emailContent.html(),
            };

            api.post('/social_scorecard/happiness/emailer', payload)
                .then((resp) => {
                    console.log(resp);
                    setTimeout(() => location.reload(), 1000);
                    notify('Email sent successfully', 'success');
                })
                .catch((err) => {
                    console.log(err);
                    notify(err.message, 'error');
                });
        });

    }

    company_submissions.modalBody = function (data={}) {
        let {email, subject} = data;
        return `
        <form id="broadcast-email-form">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" name="email" value="${email || ''}" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            </div>

            <div class="form-group">
                <label for="exampleInputEmailSubject">Subject</label>
                <input type="text" name="subject" value="${subject || ''}" class="form-control" id="exampleInputEmailSubject" aria-describedby="emailHelp" placeholder="Enter subject">
            </div>

            <div class="form-group">
                <textarea id="email-content" name="emailContent" class="form-control d-none"></textarea>
            </div>
        </form>
        `;
    }

    company_submissions.generateEmail = function (data={}) {
        let compiled = '';
        const emailTemplate = `
        <p>
            Hello {{poc}},<br />
            <br />
            We have compiled a report on how happy our Student Unicorns feel in our ecosystem and would like to share it with you.<br />
            <br />
            Please find the report attached below.<br />
            <br />
            Student Unicorn's Report: <a data-scorecard="" href="{{happinessScorecard}}"> {{happinessScorecard}} </a><br />
            <br />
            Self-Reflection Response: <a self-reflection-link href="{{selfReflection}}"> {{selfReflection}} </a><br />
            <br />
            Regards,<br />
            Subhangi,<br />
            L&amp;D Innovation Manager,<br />
            DeepThought
        </p>
        `;

        compiled = emailTemplate;

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const element = data[key];
                
                if (emailTemplate.includes(`{{${key}}}`)) {
                    compiled = compiled.split(`{{${key}}}`).join(element);
                }
            }
        }

        return compiled;
    }

	return company_submissions;
});
