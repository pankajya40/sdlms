"use strict";

define("admin/manage/notifications/create", ["api"], function (api) {
    var create = {};

    let pageNum = 0,
        index = 1;

    create.init = function () {
        let typeSelected;

        $("#type-select").on("change", function () {
            pageNum = 0;
            index = 1;
            $("thead").empty();
            $("#table-body").empty();

            $("#table").removeClass("display-none");
            $("#load-btn").removeClass("display-none");

            typeSelected = $(this).val();

            switch (typeSelected) {
                case 'article':
                    $("thead").append(_templates.articleTable());
                    appendArticles();
                    break;
                case 'post':
                    $("thead").append(_templates.postTable());
                    appendPosts();
                    break;
                case 'discussion':
                    $("thead").append(_templates.discussionTable());
                    appendDiscussions();
                    break;
                case 'event':
                    $("thead").append(_templates.eventTable());
                    appendEvents();
                    break;
            }
        });

        $("#load-btn").on("click", () => {
            pageNum++;

            switch (typeSelected) {
                case 'article':
                    appendArticles();
                    break;
                case 'post':
                    appendPosts();
                    break;
                case 'discussion':
                    appendDiscussions();
                    break;
                case 'event':
                    appendEvents();
                    break;
            }
        })
    };

    function appendArticles() {
        doAjax({
            type: 'POST',
            url: `/app/getarticles?limit=5&page=${pageNum}`,
            method: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: {},
        }).then(function (res) {
            console.log(res);
            $.map(res.response.data, (article) => {
                $("#table-body").append(_templates.articleListing(article));
                index++;
            });
        })
    }

    function appendPosts() {
        doAjax({
            type: 'POST',
            url: `/app/getposts?limit=5&page=${pageNum}`,
            method: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: {},
        }).then(function (res) {
            console.log(res);
            $.map(res.response.data, (post) => {
                $("#table-body").append(_templates.postListing(post))
                index++;
            });
        })
    }

    function appendEvents() {
        doAjax({
            type: 'POST',
            url: `/app/getevents?type=latestlimit=5&page=${pageNum}`,
            method: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: {},
        }).then(function (res) {
            console.log(res);
            $.map(res.response.data, (event) => {
                $("#table-body").append(_templates.eventListing(event));
                index++;
            });
        })
    }

    function appendDiscussions() {
        doAjax({
            type: 'POST',
            url: `/app/getdiscussion_room?limit=5&page=${pageNum}`,
            method: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: {},
        }).then(function (res) {
            console.log(res);
            $.map(res.response.data, (roomDetails) => {
                $("#table-body").append(_templates.discussionListing(roomDetails));
                index++;
            });
        })
    }

    const _templates = {
        postTable: function () {
            return `<tr>
                        <th scope="col">Sno</th>
                        <th scope="col">Content</th>
                        <th scope="col">Comments</th>
                    </tr>`
        },
        articleTable: function () {
            return `<tr>
                        <th scope="col">Sno</th>
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col">Comments</th>
                    </tr>`
        },
        eventTable: function () {
            return `<tr>
                        <th scope="col">Sno</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Participants</th>
                    </tr>`
        },
        discussionTable: function () {
            return `<tr>
                        <th scope="col">Sno</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Participants</th>
                        <th scope="col">Highlights</th>
                    </tr>`
        },
        postListing: function (data) {
            return `<tr class="listing">
                        <th scope="col">${index}</th>
                        <th scope="col">${app.htmltoText(data.content)}</th>
                        <th scope="col">10</th>
                    </tr>`
        },
        articleListing: function (data) {
            return `<tr class="listing">
                        <th scope="col">${index}</th>
                        <th scope="col">${data.title}</th>
                        <th scope="col">${app.htmltoText(data.content)}</th>
                        <th scope="col">10</th>
                    </tr>`
        },
        eventListing: function (data) {
            return `<tr class="listing">
                        <th scope="col">${index}</th>
                        <th scope="col">${data.name}</th>
                        <th scope="col">${data.description}</th>
                        <th scope="col">${data.attendees.length}</th>
                    </tr>`
        },
        discussionListing: function (data) {
            return `<tr class="listing">
                        <th scope="col">${index}</th>
                        <th scope="col">${data.name}</th>
                        <th scope="col">${data.description}</th>
                        <th scope="col">12</th>
                        <th scope="col">8</th>
                    </tr>`
        },
    }

    return create;
});
