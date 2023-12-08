"use strict";

/* globals define */

define("forum/mobile/post/drafts", ['api'], function (api) {
    var drafts = {};
    const { defaultProfileImagesRelativeBase, defaultProfileImages } = ajaxify.data;

    drafts.init = function () {
        $("body").on("click", ".article-container", function () {
            const pid = $(this).data("pid"),
                type = $(this).data("type");

            ajaxify.go(`/mobile/${type}/create?pid=${pid}`);
        })

        appendPosts().then(
            function () {
                // lazy load posts
                let check = {
                    root: null,
                    rootMargin: "0px",
                    threshold: 0.1,
                };
                let postPage = 1;

                let postsObserver = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        appendPosts(postPage);
                        postPage++;
                    }
                }, check);
                postsObserver.observe(document.getElementById("page-checker"));
            }
        )
    };

    async function appendPosts(pageNumber = 0) {

        let getPosts = new Promise((resolve, reject) => {
            api.get(`/app/drafts?page=${pageNumber}`, {}).then(function (res) {
                console.log(res);

                let pageData = res.data;

                if (pageNumber == 0)
                    $('#app-loader').hide();

                resolve(pageData);
                reject("no data");
            })
        })

        let posts = await getPosts;

        posts.map((draft) => {
            // draft.uid == app.user.uid &&
            $("#page-container").append(_templates.draft(draft));
        });

        convertFonts();

        return posts;
    }

    function convertFonts() {
        $(".article-content-container p").each(function () {
            $(this).addClass("font-12");
        });

        $(".article-content-container h6").each(function () {
            $(this).addClass("font-12");
        });

        $(".article-content-container h5").each(function () {
            $(this).addClass("font-14");
        });

        $(".article-content-container h4").each(function () {
            $(this).addClass("font-16");
        });

        $(".article-content-container h3").each(function () {
            $(this).addClass("font-18");
        });

        $(".article-content-container h2").each(function () {
            $(this).addClass("font-20");
        });

        $(".article-content-container h1").each(function () {
            $(this).addClass("font-22");
        });

        $(".article-content-container iframe").each(function () {
            $(this).addClass("w-100");
            $(this).addClass("h-100");
        });
    }

    const _templates = {
        draft: function (data) {
            let imageOnError = `${defaultProfileImagesRelativeBase}/${defaultProfileImages[Math.floor(Math.random() * defaultProfileImages.length)]}`;

            return `<div class="article-container container py-3 rounded-10-px bg-white mt-3" data-pid=${data.pid} data-cid="${data.cid}" data-subcid="${data.sub_cid}" data-uid="${data.uid}" data-type="${data.type}">
                        <div id="post-author" class="d-flex justify-content-between align-items-center mb-2">
                            <div id="post-author-details" class="d-flex">
                                <img src="${data.user.picture}" onerror="this.onerror=null;this.src='${imageOnError}';"
                                    alt="author-avatar" class="circle-lg overflow-hidden rounded-circle img-cover">
                                <div id="post-meta" class="ml-2">
                                    <p class="mb-0 font-14 font-medium">${data.user.fullname}</p>
                                    <p class="mb-0 brand-text font-10 truncate-line-1">${data.user.signature}Amet minim mollit non deserunt</p>
                                    <p class="font-10 mb-0">${moment(data.timestamp).format("MMMM DD, YYYY")}</p>
                                </div>
                            </div>
                            <button class="border-0 p-2 bg-transparent edit-btn">
                                <i class="fa fas fa-solid fa-square-pen"></i>
                            </button>
                        </div>
                        <div
                            class="d-flex article-content-container justify-content-center align-items-center overflow-hidden">
                            <div id="article-content" class="rounded-10-px primary-border p-2 w-100">
                                <p class="font-12">${data.content}</p>

                                ${data.image ? `
                                    <img src="${data.image}" alt="header-img" class="img-cover component-full rounded-10-px height-160 mb-1">
                                ` : ''}
                            </div>
                        </div>
                    </div>`
        }
    }

    return drafts;
});
