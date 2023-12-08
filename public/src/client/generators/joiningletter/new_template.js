"use strict";

/* globals define */

define("forum/generators/joiningletter/new_template", ['api', 'translator'], function (api, translator) {
	var newTemplate = {};

	newTemplate.init = function () {
        const {letterTemplate} = ajaxify.data;

        $('body').on('click', '#remove-payscale', function () {
            $(this).parent().remove()
        });

        $('#newTemplateForm').off().on('submit', function (e) {
            e.preventDefault();

            var data = $(this).serializeObject();
            var action = $(this).data('action');

            doAjax({
                type: action == "edit" ? "PUT" : "POST",
                url: "/generators/joiningletter/templates" + (action == "edit" ? `/${letterTemplate._id}` : ""),
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
            }).then(() => {
                    setTimeout(() => location.reload(), 1000);
                    notify(`${action == "edit" ? 'Updated' : 'Created'} successfully`, 'success');
                })
                .catch((err) => {
                    let { responseJSON } = err;
                    if (responseJSON && responseJSON.status.message) {
                        translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
                    }
                    else return notify('Oops! Some error occured', 'error');
                })

        });

        $('#add-payscale').off().on('click', function () {
            const payScaleArea = $('#payscale-area');

            payScaleArea.append(newTemplate.payScaleTemplate(payScaleArea.children().length));
        });

        $('#companyName').off().on('change', function () {
            $('#signingAuthorityCompany').val($(this).val());
        });

    }

    newTemplate.payScaleTemplate = function (index) {
        return `
            <div class="row w-100 ml-0 position-relative" >
                <div class="form-group col-6 col-lg-4 pr-lg-3">
                    <input required name="company[payScale][${index}][type]" placeholder="Type (e.g. Full time, Part time)" value="" class="form-control"></input>
                </div>
                <div class="form-group col-6 col-lg-4 pr-lg-3">
                    <input required type="number" name="company[payScale][${index}][hours]" placeholder="Working hours" value="" class="form-control"></input>
                </div>
                <div class="form-group col-12 col-lg-4 pr-lg-3">
                    <input required type="number" name="company[payScale][${index}][amount]" placeholder="Amount per month" value="" class="form-control"></input>
                </div>
                <div class="position-absolute d-flex cursor-pointer" id="remove-payscale" style="right: 0; height: 40px;">
                    <i class="fa fa-trash my-auto" aria-hidden="true"></i>
                </div>
            </div>
        `;
    }

    return newTemplate;
});