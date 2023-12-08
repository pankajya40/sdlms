'use strict';

define('forum/sdlms/admin/organization/create', ['api'], function (api) { 

    var createOrganization = {};
    const VERIFY_URL = new RegExp('[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?');

    createOrganization.init = function () {
        (function () {
            'use strict'
        
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')
        
            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
        
                form.classList.add('was-validated')
                }, false)
            })
        })();

        $('form').on('submit', function (e) {
            e.preventDefault();
            if ($('#inputWebsite4').val()) {
                if (!VERIFY_URL.test($('#inputWebsite4').val())) {
                    return notify('Invalid website URL, please enter a valid one', 'error');
                }
            }

            $(this).find('[type=submit]').attr('disabled', true);
            notify('Please wait...', 'info');

            let payload = {};
            $(this).serializeArray().reduce(function (obj, item) {
				return payload[item.name] = item.value;
			}, {});

            api.post('/sdlms/admin/organization', payload).then((response) => {
                if (response && response.success) {
                    notify('Organization was created successfully', 'success');
                    $('#organization-basic-details').trigger('reset');
                    $('#organization-basic-details').find('[type=submit]').attr('disabled', false);
                    ajaxify.go('/organization/' + response.organizationId);
                }
            }).catch((err) => {
                notify(err.message, 'error');
            })
        })
    }

    return createOrganization;
});