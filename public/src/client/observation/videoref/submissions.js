'use strict';

/* globals define */

define('forum/observation/videoref/submissions', [
    'sdlms/table',
    'pdgms/leavesTrackerTemplates'
], function () {
	var submissions = {};

    submissions.init = function () {

        const { Modals, Components } = LeavesTrackerTemplates.Templates();

        let submissionsTable = new Table({
            target: '#submissions-area',
            perPage: 25,
            columns:[
                {title:'S.No',value:'table'},
                {title:'Candidate Name',value:'end'},
                {title:"Company",value:'end'},
                {title:"Submitted at",value:'end'},
                {title:"Email",value:'end'},
                {title:"Contact",value:'end'},
                {title:'Action',value:'Action'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row,index){
                    let {createdAt, user, _id} = row;

                    return {
                        attributes: {
                            reflectionId: _id,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            name: user.name,
                            company: user.company,
                            createdAt: `${moment(createdAt).format("DD MMM, YYYY")}, ${moment(createdAt).format('hh:mm A')}`,
                            email: user.email,
                            contact: user.contact,
                            action: `<div>

                                        <button style="width: 100px; font-size: 15px;" data-redirect-uri="${[location.pathname, '/', _id].join('')}" class="btn btn-primary button-primary">
                                                View <i class="fa fa-chevron-right" style="font-size: 12px;" aria-hidden="true"></i>
                                        </button>
                            
                                    </div>`
                        }
                    }
                })
            },
        });

        submissionsTable.render(`/observation/videoref/submissions`);

        $('body').off().on('click', '[data-redirect-uri]', function () {
            let redirectUri = $(this).data('redirect-uri');
            ajaxify.go(redirectUri);
        });

        // $('body').on('click', '[data-contact-view]', function () {
        //     let {email, contact, id} = $(this).data();

        //     let modalTargetId = 'PromptModel-' + id;

        //     $('body').find('#modal-area').empty().append(`
        //         <button class="d-none" data-toggle="modal" data-target="#${modalTargetId}">button</button>
        //     `)
        //     .append(Modals.promptModal({
        //         header: 'Applicant details',
        //         showSubmitButton: false,
        //         promptBody: submissions.modalBody({email, contact, id}),
        //         modalId: modalTargetId,
        //     }));

        //     $(`[data-target="#${modalTargetId}"]`).trigger('click');
        // });
        
    }

    submissions.modalBody = function (data={}) {
        let {email, contact, id} = data;
        return `
                <div data-id="${id}" class="sdlms-form-elements">
                    <div class="mx-4 mt-2" style="margin-bottom: 0!important;">

                        <div class="form-row">
                    
                            <div class="form-group col-12 px-lg-3">
                                <label class="bold-medium-font">Email of the applicant</label>
                                <div class="sdlms-text-tertiary-18px">${email}</div>
                            </div>

                            <div class="form-group col-12 px-lg-3">
                                <label class="bold-medium-font">Contact number</label>
                                <div class="sdlms-text-tertiary-18px">${contact == 'undefined' ? 'Not submitted' : contact}</div>
                            </div>

                        </div>

                    </div>
                </div>
        `;
    }

    return submissions;
})