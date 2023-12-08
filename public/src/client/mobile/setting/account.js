'use strict';

/* globals define */

define('forum/mobile/setting/account', function () {
	var account = {};

	account.init = function () {
		console.log('logging from account.js');

        $("#edit-profile").on("click", () => {
            notify("Opening profile edit", "success");
            ajaxify.go("/mobile/profile/edit")
        })

        $("#change-username").on("click", () => {
            notify("Opening username edit", "success");
            ajaxify.go("/mobile/setting/username")
        })
        $("#change-email").on("click", () => {
            notify("Opening email edit", "success");
            ajaxify.go("/mobile/setting/email")
        })
        $("#change-pass").on("click", () => {
            notify("Opening password edit", "success");
            ajaxify.go("/mobile/setting/pwd")
        })

		$('#app-loader').hide();
	};

	return account;
});
