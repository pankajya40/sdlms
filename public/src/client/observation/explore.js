'use strict';

/* globals define */

define('forum/observation/explore', ['api'], function (api) {
	var explorePage = {};

    explorePage.init = function () {

        let options = {
            filters: {
                type: null,
                users: null,
                date: null,
                // query: null,
                hidden: {
                    type: "observation:reflection",
                    limit: 20,
                    contentLength: 200
                }
            },
            classes:'col-12 col-md-6',
            callbacks: {
                onClick: this.onClick
            },
            pagination: "scroll",
        };
        if(!app.user.isAdmin) options.stickers = null;
        window.widgets && new window.widgets.Assets(options)
    }

    explorePage.onClick = function ($elem) {
        let data = $elem.data();
        // console.log(data);
        ajaxify.go(`/observation/reflections/view/${data._id}`);
    }
    return explorePage;
})