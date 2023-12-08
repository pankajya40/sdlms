"use strict";

/* globals define */

define("forum/generators/joiningletter/new_letters", ['api', 'translator', 'sdlms/jquery_csv'], function (api, translator) {
	var newRequest = {};
    var csvContents = [];

	newRequest.init = function () {

        const {workDays} = ajaxify.data;

        // By default, joining date will be 15 days from the moment of letter generation
        let joiningDate = newRequest.addDays(Date.now(), 15);
        $('[name="dateOfJoining"]').val(moment(joiningDate).format('yyyy-MM-DD'));

        $('body').on('click', '#remove-user', function () {
            $(this).parent().remove();
        });

        $('#templateName').on('change', function () {
            let id = $(this).val();
            api.get('/generators/joiningletter/templates', {id})
                .then((resp) => {
                    let {company} = resp;
                    let {payScale, internshipDuration, noticePeriod} = company;
                    let options = '<option selected value="">Select</option>';
                    let joiningDate = newRequest.addDays(Date.now(), Number(noticePeriod));

                    if (payScale.length) {
                        payScale.forEach(el => {
                            el = {...el, internshipDuration, noticePeriod};
                            let dataBindings = Object.keys(el).map(key => `data-${key}="${el[key]}"`).join(' ');
                            options += `<option ${dataBindings} value="">${el.type}, ${el.hours}hrs/day: Rs. ${el.amount}/month</option>\n`;
                        });
                    }
                    $('#userpayscale').empty().append(options);
                    $('[name="dateOfJoining"]').val(moment(joiningDate).format('yyyy-MM-DD'));
                })
                .catch((err) => notify(err.message, 'error'));
        });

        $('#add-user').off().on('click', function () {
            const usersArea = $('#users-area');

            usersArea.append(newRequest.addUserTemplate(usersArea.children().length));
        });

        $('#newRequestForm').off().on('submit', function (e) {
            e.preventDefault();

            var data = $(this).serializeObject();
            var {projectRoles, days={}, workingHours={}, dateOfJoining} = data;

            projectRoles = projectRoles ? projectRoles.split(', ') : [];
            data.projectRoles = projectRoles;

            if (csvContents.length) {
                data.batchList = [...data.batchList, ...csvContents];
            }

            let {amount, hours, type, internshipduration} = $('#userpayscale').find('option:selected').data();
            let workingDaysCount = Math.abs(Number(days.to) - Number(days.from)) + 1;
            hours = Math.round(hours * workingDaysCount);

            let honorarium = {
                total: Number(internshipduration) * amount,
                perMonth: amount
            };

            let timings = {
                workDuration: [newRequest.formatTime(workingHours.from), newRequest.formatTime(workingHours.to)].join(' to '),
                timeZone: 'IST',
                workHours: hours + 'hrs/week',
                workDays: [workDays[days['from']], workDays[days['to']]].join(' to '),
            }

            data.honorarium = honorarium;
            data.timings = timings;
            data.dateOfJoining = newRequest.getFormattedDate(dateOfJoining);

            delete data.workingHours;
            delete data.payscale;
            delete data.days;

            
            doAjax({
                type: "POST",
                url: "/generators/joiningletter/letters",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
            }).then(() => {
                    setTimeout(() => ajaxify.go('/generators/joiningletter/letters'), 1000);
                    notify('Request submitted successfully', 'success');
                })
                .catch((err) => {
                    let { responseJSON } = err;
                    if (responseJSON && responseJSON.status.message) {
                        translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
                    }
                    else return notify('Oops! Some error occured', 'error');
                })
            
        });

        $("#choose-csv-file").on("change", function () {
            $('#processed-result').hide();

			const fileName = $(this).val().replace(/.*[\/\\]/, '');
			$("#choose-file-label").text(fileName);

            var file = this.files[0];
			var reader = new FileReader();

            if (file.type && file.type != 'text/csv') {
                $('#csv-read-status').empty().text(`File of type "${file.type}" is not allowed. Please upload a valid "text/csv" file.`);
                return $('#processed-result').show();
            }

			reader.onload = function () {
				csvContents = $.csv.toObjects(this.result);
                $('#csv-read-status').empty().text(`Found a total of ${csvContents.length} record(s).`);
                $('#processed-result').show();
			};
			// reader.readAsDataURL(file);
			reader.readAsBinaryString(file);
		});

        $('#reset-file-upload').on('click', function () {
            csvContents = [];

            $("#choose-file-label").text('Choose a CSV file');
            $('#processed-result').hide();
            $("#choose-csv-file").val('');
        });

        $('[name="payscale"]').on('change', function () {
            let {internshipduration, amount} = $(this).find('option:selected').data();
            console.log(internshipduration, amount);
            if (!internshipduration || !amount) return;

            $('#view-honorarium').val(`Rs. ${amount}/month. Total: Rs. ${Number(internshipduration) * Number(amount)})`);
        });

    }

    newRequest.addDays = function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.getTime();
      }

    newRequest.formatTime = function (timeString) {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
    }

    newRequest.getFormattedDate = function (time = Date.now()) {
        const date = new Date(time);
        return `${date.getDate()} ${date.toLocaleDateString(undefined, { month: "long" })}, ${date.getFullYear()}`;
    }

    newRequest.addUserTemplate = function (index) {
        return `
            <div class="row w-100 ml-0 position-relative">
                <div class="form-group col-6 col-lg-4 pr-lg-3">
                    <input required name="batchList[${index}][firstname]" placeholder="Firstname" value="" class="form-control"></input>
                </div>
                <div class="form-group col-6 col-lg-4 pr-lg-3">
                    <input required name="batchList[${index}][lastname]" placeholder="Lastname" value="" class="form-control"></input>
                </div>
                <div class="form-group col-6 col-lg-4 pr-lg-3">
                    <input required type="email" name="batchList[${index}][email]" placeholder="Email id of the user" value="" class="form-control"></input>
                </div>

                <div class="position-absolute d-flex cursor-pointer" id="remove-user" style="right: 0; height: 40px;">
                    <i class="fa fa-trash my-auto" aria-hidden="true"></i>
                </div>
            </div>
        `;
    }


    return newRequest;
});