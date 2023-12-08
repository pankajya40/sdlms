'use strict';

/* globals define */

define('forum/rigorbuilder/creator/view', ['api'], function (api) {
    var view = {};
    view.init = function () {
        const rigor = ajaxify.data.rigor;
        console.log(rigor)
        const BASE_URL = "/api/v3/rigor"

        $("body").on("click", "#edit", function () {
            ajaxify.go('/rigor/creator/create');
        })

        $("body").on("click", "#quiz", function () {
            ajaxify.go(`/rigor/creator/quiz/${rigor.pid}`);
        })


        api.get(BASE_URL + `/single/${rigor.pid}`, {}).then((res) => {

            res.blocks.blocks.map((block, index) => {
                $('.test').append(`
                <p for="exampleFormControlTextarea1" class="font-poppins font-weight-500 py-4">
                            <span class="font-poppins font-weight-500 py-2">
                            ${index + 1}) ${block.text}
                            </span>
                        </p>
                </p>`)
            })
        }).catch((err) => {
            console.log(err);
        });


    };

    return view;
});