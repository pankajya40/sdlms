'use strict';

/* globals define */

define('forum/mobile/discussion/enter', function () {
    var enter = {};

    enter.init = function () {
        $('body').on('click','#Delete-all',function(){
            console.log('deleting all rooms')

            doAjax({
                type: 'DELETE',
                url: "/app/deleteallrooms",
                method: "DELETE",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                }),
            }).then(function (response) {
                console.log(response);
            }).catch(err=>console.log(err))
        })

        $("body").on("click", ".enterbutton", function () {
            let roomId = $(this).attr("id").split("-")[1];

            console.log(roomId);

            doAjax({
                type: 'POST',
                url: "/app/adduser",
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    roomId: roomId,
                    uids: [app.user.uid],
                }),
            }).then(function (response) {
                console.log(response);
                ajaxify.go(`/mobile/discussion/${roomId}`)
            })
        });
    };

    return enter;
});
