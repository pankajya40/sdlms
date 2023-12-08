'use strict';

/* globals define */

define('forum/mobile/preferences/inApp', ['api', "translator"], function (api, translator) {
    var inApp = {};

    let selectedGlobal = [],
        selectedFeed = [],
        selectedDiscussion = [],
        selectedEvent = [],
        selectedNudge = [];

    inApp.init = function () {
        // $("body").on("click", ".choose-btn:enabled", function () {
        //     $(".choose-btn:disabled").parents(".accordian-block").removeClass("tertiary-border");
        //     $(".choose-btn:disabled").parents(".accordian-block").addClass("primary-border");
        //     $(".choose-btn:disabled").removeClass("bg-light")
        //     $(".choose-btn:disabled").prop("disabled", false)
        //     $(this).prop("disabled", true);
        //     $(this).addClass("bg-light")
        //     $(this).parents(".accordian-block").addClass("tertiary-border");
        //     $(this).parents(".accordian-block").removeClass("primary-border");
        // });

        $("body").on("click", ".category", function () {
            const assetType = $(this).parent().data("asset");
            const categoryId = $(this).data("cid");

            selectPreferences(categoryId, assetType);
        });

        // $("#search-btn").on("click", () => {
        //     $("#categories-header").removeClass("d-flex");
        //     $("#categories-search").addClass("d-flex");
        // });

        // $("#cross-btn").on("click", () => {
        //     $("#categories-header").addClass("d-flex");
        //     $("#categories-search").removeClass("d-flex");
        // });

        // $("body").on("keyup", "#categories-input", function () {
        //     const searchQuery = $(this).val().toLowerCase(),
        //         categories = $(".category");

        //     console.log(searchQuery);

        //     for (let index = 0; index < categories.length; index++) {
        //         const category = categories[index],
        //             categoryText = $(category).find("p").text().toLowerCase();

        //         categoryText.indexOf(searchQuery) == -1 ? $(category).removeClass("d-flex") : $(category).addClass("d-flex");
        //     }
        // });

        api.get('/app/category?type=mobile', {}).then((categoriesRes) => {
            $.each(categoriesRes, (i, category) => category.sub_categories.map((subCategory) => $(".preferences-body").append(_templates.category(category.cid, subCategory))))

            api.get("/app/preferences", {}).then((res) => {
                const preferences = res[0].category.preferences;

                for (const selector in preferences) {
                    if (preferences[selector].length != 0) {
                        preferences[selector].map((preference) => {
                            const subCategories = preference.sub_cats;
                            subCategories.map((subCategory) => selectPreferences(subCategory.cid, selector));
                        })
                    }
                }

                $('#app-loader').hide();
            });
        });

        $("#confirm-btn").on("click", () => {
            $("#confirm-btn").prop("disabled", true);

            const payload = {
                preferences: {
                    global: selectedGlobal,
                    feed: selectedFeed,
                    events: selectedEvent,
                    nudge: selectedNudge,
                    discussion: selectedDiscussion,
                },
            }

            doAjax({
                type: 'PUT',
                url: "/app/preferences",
                method: "PUT",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(payload),
            }).then(function () {
                notify("Preferences updated successfully", "success");
                $("#confirm-btn").prop("disabled", false);
            }).catch((err) => {
                let { responseJSON } = err;
                if (responseJSON && responseJSON.status.message) {
                    translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
                    $("#confirm-btn").prop("disabled", false);
                }
                else return notify('Oops! Could not save preferences', 'error');
                $("#confirm-btn").prop("disabled", false);
            });
        });
    };

    function selectPreferences(categoryId, assetType) {
        const plusURL = 'https://blog.deepthought.education/wp-content/uploads/2022/08/black-plus.svg',
            crossURL = 'https://blog.deepthought.education/wp-content/uploads/2022/04/cross.svg';

        const selectCategory = $(`[data-asset="${assetType}"]`).children(`[data-cid="${categoryId}"]`).first();

        $(selectCategory).toggleClass("secondary-border tertiary-border brand-text");
        if ($(selectCategory).find("img").attr("src") == plusURL) {
            $(selectCategory).children("img").first().attr("src", crossURL);
            pushCategory(selectCategory);
        } else {
            $(selectCategory).children("img").first().attr("src", plusURL);
            popCategory(selectCategory);
        }
    }

    function pushCategory(category) {
        const forAsset = $(category).parents(".preferences-body").first().data("asset"),
            categoryId = $(category).data("parent-cid"),
            subCategoryId = $(category).data("cid");

        switch (forAsset) {
            case 'global':
                selectedGlobal.push({
                    cid: categoryId,
                    sub_cids: [subCategoryId],
                });
                break;

            case 'feed':
                selectedFeed.push({
                    cid: categoryId,
                    sub_cids: [subCategoryId],
                });
                break;

            case 'discussion':
                selectedDiscussion.push({
                    cid: categoryId,
                    sub_cids: [subCategoryId],
                });
                break;

            case 'events':
                selectedEvent.push({
                    cid: categoryId,
                    sub_cids: [subCategoryId],
                });
                break;

            case 'nudge':
                selectedNudge.push({
                    cid: categoryId,
                    sub_cids: [subCategoryId],
                });
                break;
        };
    }

    function popCategory(category) {
        const forAsset = $(category).parents(".preferences-body").first().data("asset"),
            categoryId = $(category).data("parent-cid"),
            subCategoryId = $(category).data("cid");

        switch (forAsset) {
            case 'global':
                selectedGlobal.pop({
                    cid: categoryId,
                    sub_cids: [subCategoryId],
                });
                break;

            case 'feed':
                selectedFeed.pop({
                    cid: categoryId,
                    sub_cids: [subCategoryId],
                });
                break;

            case 'discussion':
                selectedDiscussion.pop({
                    cid: categoryId,
                    sub_cids: [subCategoryId],
                });
                break;

            case 'events':
                selectedEvent.pop({
                    cid: categoryId,
                    sub_cids: [subCategoryId],
                });
                break;

            case 'nudge':
                selectedNudge.pop({
                    cid: categoryId,
                    sub_cids: [subCategoryId],
                });
                break;
        };
    }

    // function showSuccess() {
    //     $("#success-message").addClass("d-float");
    //     $("#success-message").removeClass("d-none");

    //     setTimeout(function () {
    //         $("#success-message").removeClass("d-float");
    //         $("#success-message").addClass("d-none");
    //     }, 1000)
    // }

    const _templates = {
        category: function (parentCid, data) {
            return `<div class="rounded-10-px secondary-border p-2 d-flex mb-2 category d-none align-items-center col-5 col-sm-3 justify-content-between" data-parent-cid="${parentCid}" data-cid="${data.cid}">
                        <p class="font-12 mb-0 mr-2">${data.name}</p>
                        <img src='https://blog.deepthought.education/wp-content/uploads/2022/08/black-plus.svg'>
                    </div>`
        },
    }

    return inApp;
});
