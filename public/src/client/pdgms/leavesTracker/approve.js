"use strict";

/* globals define */

define("forum/pdgms/leavesTracker/approve", ['api', 'sdlms/table', 'pdgms/leavesTrackerTemplates'], function (api) {
	var approveLeaves = {};

	approveLeaves.init = () => {
        const { Modals, Components } = LeavesTrackerTemplates.Templates();

        let approvalList = new Table({
            target:'.approval-table-area',
            columns:[
                {title:'S.No',value:'table'},
                {title:'Member name',value:'table'},
                {title:'From',value:'end'},
                {title:"To",value:'end'},
                {title:"Reason",value:'end'},
                {title:'Action',value:'Action'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row,index){
                    return {
                        attributes: {
                            id: row._id,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            name: row.user.username,
                            from: moment(row.from).format("DD MMM, YYYY"),
                            to: moment(row.to).format("DD MMM, YYYY"),
                            reason: row.reason,
                            actions: `<button style="width: 114px; font-size: 15px;" data-leaveid="${row._id}" data-description="${row.description}" data-reason="${row.reason}" class="btn btn-primary button-primary">
                                            Approve <i class="fa fa-chevron-right" style="font-size: 12px;" aria-hidden="true"></i>
                                    </button>`
                        }
                    }
                });
            }
        })
        
        approvalList.render(`/pdgms/approvals`);

        let previousApprovals = new Table({
            target:'.approved-table-area',
            columns:[
                {title:'S.No',value:'table'},
                {title:'Member name',value:'table'},
                {title:'From',value:'end'},
                {title:"To",value:'end'},
                {title:"Remarks",value:'end'},
                {title:'Status',value:'Action'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row,index){
                    return {
                        attributes: {},
                        data: {
                            sno: `${(from + (index + 1))}`,
                            name: row.user.username,
                            from: moment(row.leave.from).format("DD MMM, YYYY"),
                            to: moment(row.leave.to).format("DD MMM, YYYY"),
                            reason: row.reason,
                            status: row.status
                        }
                    }
                });  
            },
        })
        
        previousApprovals.render(`/pdgms/approved`);

        $('body').on('click', '[data-leaveid]', function () {
            let element = $(this);

            let leaveId = element.attr('data-leaveid');
            let reason = element.attr('data-reason');
            let description = element.attr('data-description');

            let modalTargetId = 'PromptModel-' + leaveId;

            $('body').find('#leave-action-prompt-area').empty().append(`
                <button class="d-none" data-toggle="modal" data-target="#${modalTargetId}">button</button>
            `)
            .append(Modals.promptModal({
                header: 'Approve leave',
                submitButtonId: 'submit-approval-action',
                promptBody: Components.approveLeavePromptTemplate({
                	formId: 'leave-action-submission',
                	uniqueId: leaveId,
                    reason,
                    description
                }),
                modalId: modalTargetId,
            }));

            $(`[data-target="#${modalTargetId}"]`).trigger('click');
        });

        $('body').on('click', '#submit-approval-action', function () {
            var element = $('#leave-action-submission');

            var leaveId = element.data('unique');
            var status = element.find('[name="status"]').val();
            var reason = element.find('[name="reason"]').val();

            if (!status) return notify('Status is required', 'error');

            api.post('/pdgms/approve/' + leaveId, {status, reason}).then((resp) => {
				if (resp) {
					notify('Application was approved!', 'success');
				}
                console.log(resp);
			}).catch((err) => {
                notify(err.message, 'error');
            }).finally(() => setTimeout(() => {
            	location.reload();
            }, 1000));
        });

    }

	return approveLeaves;

});