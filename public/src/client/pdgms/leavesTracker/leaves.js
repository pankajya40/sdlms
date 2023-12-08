"use strict";

/* globals define */

define("forum/pdgms/leavesTracker/leaves", ['translator', 'api', 'pdgms/leavesTrackerTemplates', 'sdlms/table'], function (translator, api) {
	var leaves = {};
    
    const $target = $('.leaves-table-section');
    const tableBody = '.appliedleaves-table-body';
    const previousLeaves = '.previousleaves-table-body'
    const { Modals, Components } = LeavesTrackerTemplates.Templates();

	leaves.init = () => {

        const Icons = {
            accepted: '<i class="fa fa-check-circle text-success" aria-hidden="true"></i>',
            pending: '<i class="fa fa-hourglass-half text-warning" aria-hidden="true"></i>',
            rejected: '<i class="fa fa-times-circle-o text-danger" aria-hidden="true"></i>',
        };

        let currentLeavesTable = new Table({
            target: tableBody,
            columns:[
                {title:'S.No',value:'table'},
                {title:'From',value:'end'},
                {title:"To",value:'end'},
                {title:"Type/Reason",value:'end'},
                {title:"Deliverables",value:'end'},
                {title:"Name",value:'end'},
                {title:'Status',value:'Action'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row,index){
                    let {requestedTo, status, description, reason, remarks, _id} = row;

                    return {
                        attributes: {
                            description, reason, status: status.status, remarks, leaveId: _id,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            from: `${moment(row.from).format("DD MMM, YYYY")}, ${moment(row.from).format('hh:mm A')}`,
                            to: `${moment(row.to).format("DD MMM, YYYY")}, ${moment(row.to).format('hh:mm A')}`,
                            reason: row.reason,
                            deliverables: row.deliverables,
                            name: requestedTo.fullname || requestedTo.username,
                            status: `${status.status ? Icons[status.status.toLowerCase()] : ''}&nbsp;${status.status}`,
                        }
                    }
                })
            },
        });

        let previousLeavesTable = new Table({
            target: previousLeaves,
            columns:[
                {title:'S.No',value:'table'},
                {title:'From',value:'end'},
                {title:"To",value:'end'},
                {title:"Type/Reason",value:'end'},
                {title:"Deliverables",value:'end'},
                {title:"Name",value:'end'},
                {title:'Status',value:'Action'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row,index){
                    let {requestedTo, status, description, reason, remarks, _id} = row;

                    return {
                        attributes: {
                            description, reason, status: status.status, remarks, leaveId: _id,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            from: `${moment(row.from).format("DD MMM, YYYY")}, ${moment(row.from).format('hh:mm A')}`,
                            to: `${moment(row.to).format("DD MMM, YYYY")}, ${moment(row.to).format('hh:mm A')}`,
                            reason,
                            deliverables: row.deliverables,
                            name: requestedTo.fullname || requestedTo.username,
                            status: `${status.status ? Icons[status.status.toLowerCase()] : ''}&nbsp;${status.status}`,
                        }
                    }
                })
            },
        });
        
        
        previousLeavesTable.render(`/pdgms/leaves?type=previous`);
        currentLeavesTable.render(`/pdgms/leaves?type=applied`);

        $('#submit-leave-form').on('click', function () {
			// notify('Please wait...', 'info');
			let formData = leaves.serializeFormToObject('#leave-form');
			api.post('/pdgms/leaves', formData).then((resp) => {
				if (resp) {
					notify('Application was submitted successfully', 'success');
				}
			})
			.catch((error) => {
				notify(error.message, 'error');
			})
			.finally(() => {
				setTimeout(() => {
                    location.reload();
                }, 1500);
			});
		});

        $('body').on('change', '[name="to"], [name="from"]', function () {
            let hours = leaves.getHoursFromRange('[name="to"]', '[name="from"]');
            $('#totalLeaveHours').val(~(hours));
        });

        $('body').on('click', '[data-leaveid]', function () {
            let element = $(this);

            let leaveId = element.attr('data-leaveid');
            let reason = element.attr('data-reason');
            let description = element.attr('data-description');
            let status = element.attr('data-status');

            let modalTargetId = 'PromptModel-' + leaveId;

            $('body').find('#leave-action-prompt-area').empty().append(`
                <button class="d-none" data-toggle="modal" data-target="#${modalTargetId}">button</button>
            `)
            .append(Modals.promptModal({
                header: 'Leave details',
                submitButtonId: 'submit-approval-action',
                promptBody: Components.leaveDetailsPrompt({
                	formId: 'leave-action-submission',
                	uniqueId: leaveId,
                    reason,
                    description,
                    status,
                }),
                modalId: modalTargetId,
            }));

            $(`[data-target="#${modalTargetId}"]`).trigger('click');
        });

    }

    leaves.serializeFormToObject = function (target) {
        if (!target) return {};
        let payload = {};

        $(target).serializeArray().reduce(function (obj, item) {
            return payload[item.name] = item.value;
        }, {});

        return payload;
    }

    leaves.getHoursFromRange = function (start, end) {
        end = $(end).val();
        start = $(start).val();
        if (!end || !start) return;

        let ms = new Date(end).getTime() - new Date(start).getTime();
        return (ms / (1000 * 60 * 60)).toFixed(1);
    }

	return leaves;


});