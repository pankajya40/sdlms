'use strict';

/* globals define */

define('forum/dtforms/view_all', ['sdlms/table'], function () {
	var viewForms = {};

    viewForms.init = function () {
        const {sharerUriBase} = ajaxify.data;

        const prepareSheetLinkError = (sheet, subsheet) => {
            let missingFields = [];
            let fields = {sheet, subsheet};


            ['sheet', 'subsheet'].forEach(el => {
                if (!fields[el] || (fields[el] && !isNaN(fields[el]) && fields[el] < 0)) {
                    missingFields.push(el)
                }
            });

            if (missingFields.length) {
                return `<span class="badge badge-danger ml-2 p-1">${missingFields.join(', ')} not linked</span>`;
            }

            return '';
        }

        let viewFormsTable = new Table({
            target: '.forms-table',
            columns:[
                {title:'S.No',value:'table'},
                {title:'Form title',value:'end'},
                {title:"Responses received",value:'end'},
                {title:'Last updated',value:'end'},
                {title:'Send',value:'Action'},
                {title:'Actions',value:'Action'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row, index){
                    let {title, responseCount=0, updatedAt, _id, linkedSheetId, subsheetIndex} = row;
                    title = title + prepareSheetLinkError(linkedSheetId, subsheetIndex);

                    return {
                        attributes: {
                            formid: _id,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            title,
                            responseCount,
                            updatedAt: `${moment(updatedAt).format("DD MMM, YYYY")}, ${moment(updatedAt).format('hh:mm A')}`,
                            send:`<button style="width: 114px; font-size: 15px;" data-id="${_id}" class="btn btn-primary button-primary send-btn">
                                            Send
                                  </button>`,
                            action: `<button style="width: 114px; font-size: 15px;" data-share-uri="${location.origin + sharerUriBase + _id}" class="btn btn-primary button-primary">
                                            Share <i class="fa fa-share-alt" style="font-size: 12px;" aria-hidden="true"></i>
                                    </button>`
                        }
                    }
                })
            },
        });

        viewFormsTable.render(`/forms`);

        $('body').off().on('click', '.Sno , .title , .responseCount , .updatedAt', function () {
            let formId = $(this).parent().data('formid');
            ajaxify.go('/forms/edit/' + formId);
        });

        $('body').on('click', '[data-share-uri]', function () {
            let sharerUri = $(this).data('share-uri');
            app.copyText(sharerUri);
        });
        $('body').on('click', '.send-btn', function () {
            let id = $(this).data('id');
            viewForms.sendreports(id)
        });

    }

    viewForms.sendreports = function (id){
    
        require(['api'],function(api){
            api.get('/forms/reviewreports',{
                Id: id
            }).then(function (response) {
                console.log(response);
            }).catch((err)=>{
                console.log(err)
            })
        })
    
    }
	return viewForms;
})
