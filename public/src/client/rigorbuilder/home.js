'use strict';

/* globals define */

define('forum/rigorbuilder/home', function () {
    var quiz = {};
    quiz.init = function () {
        console.log("Hey!! HOme Page");
        $("body").on("click", "#help", function () {
            ajaxify.go('/rigor/creator/create');
        })
        $("body").on("click", "#start-reason", function () {
            ajaxify.go("rigor/dashboard")
        })

    };
    return quiz;
});

