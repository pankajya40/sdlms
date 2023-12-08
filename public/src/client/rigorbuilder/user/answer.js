'use strict';

/* globals define */

define('forum/rigorbuilder/user/answer', ['api'], function (api) {
    var answer = {};

    answer.init = function () {
        let rigor = ajaxify.data.rigor || {}
        console.log(rigor)
        // console.log(rigor.pid)
        const BASE_URL = "/api/v3/rigor"

        api.get(BASE_URL + `/answer/${rigor.pid}`, {}).then((res) => {
            // console.log(res)
        }).catch((err) => {
            console.log(err);
        });
        
        $("body").on("click", "[exit-dashboard]", function () {
            ajaxify.go('/rigor/home');
        })

        api.get(BASE_URL + `/single/${rigor.pid}`, {}).then((res) => {
            console.log(res.title)
            $('.rigor-title').append(` <h2 class="text-center text-capitalize ">${res.title}</h2>`)

            $('.username').append(`<span class="text-justify pb-4">${res.userData.username} Reflection</span>`)

            res.blocks.blocks.map((block, index) => {
                $('.problem-statement').append(`
                <div class="align-items-baseline d-flex">
                        <p class="font-poppins font-weight-500 py-2 ">
                            ${index + 1}.
                        </p>
                            <p class="mx-2">${block.text}</p>
               </div>
                `)
            })
        }).catch((err) => {
            console.log(err);
        });

        api.get(BASE_URL + `/answer/${rigor.pid}`, {}).then((res) => {
            // console.log(res.block.openingLine)
            let obj = res.block
            console.log(obj)

            $.each((obj), function( key, value ) {
                console.log( key + ": " + value );
                $('#my-answers').append(`
                <li class="text-justify mb-2 text-capitalize">
                        <strong > ${key.split(/(?=[A-Z])/).join(" ").replace(/-[0-9]/, '')} </strong> ${value}
                </li>
                    `)
            });

            $('.reflection').append(`<p class="text-justify pb-4">${res.reflection}</p>`)

        }).catch((err) => {
            console.log(err);
        });

    };

    return answer;
});


