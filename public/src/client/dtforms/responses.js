'use strict';

/* globals define */

define('forum/dtforms/responses', ['sdlms/table', 'sdlms/enquiryform'], function () {
	var viewResponses = {};

    viewResponses.init = function () {
        const {isIndividualResponse, id, response} = ajaxify.data;

        if (isIndividualResponse) {
            let {title, blocks} = response;
            
            new EnquiryForm({
                target: '.response-form',
                header: 'DT Form response',
                classes: 'shadow-lg d-block w-90',
                action: 'reader',
                with: {title, blocks},
            });

            return;
        }

        let viewResponsesTable = new Table({
            target: '.forms-table',
            columns:[
                {title:'S.No',value:'table'},
                {title:'User\'s name',value:'end'},
                {title:'Email',value:'end'},
                {title:'Contact',value:'end'},
                {title:'Submission time',value:'end'},
                {title:'Actions',value:'Action'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row, index){
                    let {user={}, _id, createdAt, emailId, contact} = row;
                    let sharerUri = ['/forms/responses/', id, '?responseId=', _id, '&uid=', user.uid].join('');

                    return {
                        attributes: {},
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            name: user.fullname || user.username || 'Guest',
                            emailId, contact,
                            createdAt: `${moment(createdAt).format("DD MMM, YYYY")}, ${moment(createdAt).format('hh:mm A')}`,
                            action: `<button style="width: 114px; font-size: 15px;" data-redirect-uri="${sharerUri}" class="btn btn-primary button-primary">
                                            View <i class="fa fa-chevron-right" style="font-size: 12px;" aria-hidden="true"></i>
                                    </button>`
                        }
                    }
                })
            },
        });

        viewResponsesTable.render(`/forms/responses/${id}`);

        $('body').off().on('click', '[data-redirect-uri]', function () {
            let uri = $(this).data('redirect-uri');
            ajaxify.go(uri);
        });

    }

	return viewResponses;
})