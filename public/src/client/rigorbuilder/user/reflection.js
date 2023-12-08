'use strict';

/* globals define */

define('forum/rigorbuilder/user/reflection', ['api'], function (api) {
    var reflection = {};

    reflection.init = function () {
        let rigor = ajaxify.data.rigor || {}
        console.log(rigor.pid)
        const BASE_URL = "/api/v3/rigor"

        $("body").on("click", "#save", function () {
            let target = $('#reflection').val()
            console.log(target)
            api.put('/rigor/reflection', { pid: rigor.pid, reflection: $('#reflection').val() }).then((res) => {
                notify('Succesfully Added the reflection ', 'success')
                console.log(res)
            }).catch((err) => {
                console.log(err);
            });
        });

        // start reasoning btn - redirect to dashbaord
        $("#complete").on("click", function () {
            ajaxify.go("rigor/dashboard")
        })
    };
    return reflection;
});