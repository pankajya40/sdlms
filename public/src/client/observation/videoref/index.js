'use strict';

/* globals define */

define('forum/observation/videoref/index', [
    'api',
], function (api) {
	var index = {};

    index.init = function () {

        const {profile, companies=[]} = ajaxify.data;
        if (profile) {
            $('#companySelect').find(`[value="${profile.companyId}"]`).attr('selected', true);

            // if (profile.role) {
            
                // let selectedCompany = companies.find(elem => elem._id == profile.companyId);
                // let {roles} = selectedCompany;
                // index.populateCompanyRoles(roles);

                // $('#roleSelect').find(`[value="${profile.role}"]`).attr('selected', true);
            // }
        }

        // $('#companySelect').on('change', function () {
        //     let id = $(this).val();
            
        //     let selectedCompany = companies.find(el => el._id == id);
        //     let {roles} = selectedCompany;

        //     index.populateCompanyRoles(roles);
            
        // });

        $('#reflection-form').off().on('submit', function (e) {
            e.preventDefault()
            var formData = $(this).serializeObject();

            api.post('/observation/videoref', formData)
                .then((response) => {
                    if (response && !response._id) {
                        return notify('Something went wrong!', 'error');
                    }
                    setTimeout(() => ajaxify.go('/observation/videoref/introduction'), 1000);
                    notify('Submitted successfully!', 'success');
                })
                .catch((err) => notify(err.message, 'error'));
        })
    }

    // index.populateCompanyRoles = function (roles) {
    //     let options = '<option value="">Select</option>';

    //     if (roles && roles.length) {
    //         roles.forEach(element => {
    //             options += `<option value="${element}">${element}</option>`;
    //         });
    //     }

    //     $('#roleSelect').empty().append(options);
    // }

    return index;
})