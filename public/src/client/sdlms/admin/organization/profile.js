'use strict';

define('forum/sdlms/admin/organization/profile', ['api'], function (api) { 

    var organizationProfile = {};

    organizationProfile.init = function () {
        $('#edit-organization').on('click', function () {
            ajaxify.go('/organization/edit/' + $(this).data('id'));
        })
    }

    return organizationProfile;
});