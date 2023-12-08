'use strict';

/* globals define */

define('forum/mobile/discussion/reaction', ['api', 'translator'], function (api, translator) {
    var reaction = {};

    reaction.init = function () {
        console.log("its created");

        $(document).on('click', (e) => {
            var container = $(".main-box");
            if(e.target.id=="react"){
                $('.main-box').removeClass('d-none');
            console.log('clicked');
            }else
            if (!container.is(e.target) && !container.has(e.target).length) {
                $('.main-box').addClass('d-none');
            }
        });

        $('body').on('click', '.emotion', () => {
            $(".emotion").css("background-color","blue");
            $(".emotion").css("color","white");
            $(".values").css("background-color","white");
            $(".values").css("color","black");
            $(".wisdom").css("background-color","white");
            $(".wisdom").css("color","black");
            console.log('clicked');
        }
        );
        $('body').on('click', '.values', () => {
            $(".values").css("background-color","blue");
            $(".values").css("color","white");
            $(".emotion").css("background-color","white");
            $(".emotion").css("color","black");
            $(".wisdom").css("background-color","white");
            $(".wisdom").css("color","black");
            console.log('clicked');
        }
        );
        $('body').on('click', '.wisdom', () => {
            $(".wisdom").css("background-color","blue");
            $(".wisdom").css("color","white");
            $(".values").css("background-color","white");
            $(".values").css("color","black");
            $(".emotion").css("background-color","white");
            $(".emotion").css("color","black");
            console.log('clicked');
        }
        );
    


    }


    return reaction;
})