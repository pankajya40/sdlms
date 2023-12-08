"use strict";

/* globals define */

define("forum/mobile/discussion/joined", ['api'], function (api) {
    var joined = {};

    joined.init = function () {
        console.log("i am here in joined")
        api.get("/app/mydiscussions", {}).then((res) => res.map((discussionRoom) => {
            $("#page-container").append(_templates.listing(discussionRoom));
            $('#app-loader').hide();
        }));

        $("#page-container").on("click", ".discussion-listing", function () {
            const roomId = $(this).data('id');
            ajaxify.go(`/mobile/discussion/${roomId}`)
        })
    };

    const _templates = {
        listing: function (data) {
            return `<div class="d-flex justify-content-between align-items-center mt-3 mb-1 container discussion-listing" data-id=${data.roomId} data-cid="${data.cid}" data-sub-cid="${data.sub_cid}">
                        <div class="d-flex">
                            <img src="${data.image}" class="img-cover overflow-visible listing-img rounded-lg mr-2" style="width: 200px;">
                            <div class="discussion-details ml-2 mr-1">
                                <p class="font-14 font-medium mb-0">${data.name}</p>
                                <p class="font-12 brand-text mb-0">${data.classification}</p>
                                <p class="mb-0 mt-3 font-12 truncate-line-2">${app.processString(data.description)}</p>
                            </div>
                        </div>
                        <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/chevron-right.svg">
                    </div>
                    <hr class="mt-2">`;
        },
    }

    return joined;
});
