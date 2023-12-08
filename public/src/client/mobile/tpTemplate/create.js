'use strict';

/* globals define */

define('forum/mobile/tpTemplate/create', ["translator"], function (translator) {
    var create = {};

    create.init = function () {
        let blockCount = 1

        const _templates = {
            block: function () {
                return `<div class="question-block mt-4" data-blocknum=${blockCount}>
                    <div class="form-group">
                        <div class="d-flex justify-content-between align-items-center">
                            <label class="font-12 question-label" for="q${blockCount}">Enter question:</label>
                            <button type="button" class="remove-block-btn bg-transparent p-2 border-0">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                        <input type="text" class="form-control font-12 question-field" id="q${blockCount}">
                        <label class="font-12 summary-label" for="q${blockCount}-summary">Enter a short summary for above question:</label>
                        <input type="text" class="form-control font-12 summary-field" id="q${blockCount}-summary" maxlength="20">
                    </div>
                </div>`
            }
        }

        $("#add-btn").on("click", () => {
            ++blockCount;
            $("#blocks-container").append(_templates.block());
        })

        $("#blocks-container").on("click", ".remove-block-btn", function () {
            $(this).parents(".question-block").remove();
        })

        $("body").on("submit", "form", function (event) {
            event.preventDefault();
            $(".asset-create-btn").prop("disabled", true);

            let blocks = [];
            $.each($(".question-block"), (index, questionBlock) => {
                const block = {
                    question: $(questionBlock).find(".question-field").val(),
                    summary: $(questionBlock).find(".summary-field").val(),
                }
                blocks.push(block);
            })

            let formData = new FormData(this);
            formData.append("blocks", JSON.stringify(blocks));
            console.log(...formData);

            doAjax({
                type: 'POST',
                url: "/thought_proccess/template",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
            }).then(function (res) {
                console.log(res);
            }).catch((err) => {
                let { responseJSON } = err;
                $(".asset-create-btn").prop("disabled", false);
                if (responseJSON && responseJSON.status.message) {
                    translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
                }
                else return notify('Oops! Some error occured while creating the template', 'error');
            });
        })

        $('#app-loader').hide();
    };

    return create;
});
