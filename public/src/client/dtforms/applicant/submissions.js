'use strict';

/* globals define */

define('forum/dtforms/applicant/submissions', ['sdlms/table', 'sdlms/enquiryform'], function () {
	var viewMySubmissions = {};

    viewMySubmissions.init = function () {
        const {isIndividualSubmission, id, response} = ajaxify.data;

        if (isIndividualSubmission) {
            let {title, blocks} = response;
            
            new EnquiryForm({
                target: '.submission-form',
                header: 'DT Form response',
                classes: 'shadow-lg d-block w-90',
                action: 'reader',
                with: {title, blocks},
            });

            return;
        }

        let mySubmissionsTable = new Table({
            target: '.submission-table',
            columns:[
                {title:'S.No',value:'table'},
                {title:'Form title',value:'end'},
                {title:'Submission time',value:'end'},
                {title:'Actions',value:'Action'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row, index){
                    let {_id, createdAt, title} = row;
                    let sharerUri = ['/forms/applicant/submissions/', _id].join('');

                    return {
                        attributes: {},
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            title,
                            createdAt: `${moment(createdAt).format("DD MMM, YYYY")}, ${moment(createdAt).format('hh:mm A')}`,
                            action: `<button style="width: 114px; font-size: 15px;" data-redirect-uri="${sharerUri}" class="btn btn-primary button-primary">
                                            View <i class="fa fa-chevron-right" style="font-size: 12px;" aria-hidden="true"></i>
                                    </button>`
                        }
                    }
                })
            },
        });

        mySubmissionsTable.render(`/forms/submissions`);

        $('body').off().on('click', '[data-redirect-uri]', function () {
            let uri = $(this).data('redirect-uri');
            ajaxify.go(uri);
        });

    }

	return viewMySubmissions;
})