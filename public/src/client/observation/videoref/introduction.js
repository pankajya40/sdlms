'use strict';

/* globals define */

define('forum/observation/videoref/introduction', [], function (api) {
	var introduction = {};

    introduction.init = function () {
        $('[redirect-videoref]').off().on('click', function () {
            location.href = '/observation/videoref/reflect';
        });

        $('[collapse-target]').on('click', function () {
            let elem = $(this);
            let collapseId = elem.attr('id');

            if ($(`[data-parent-id="${collapseId}"]`).attr('style') != '') {
                elem.text('Read less')
            } else {
                elem.text('Read more');
            }
        });
    }

    return introduction;
})