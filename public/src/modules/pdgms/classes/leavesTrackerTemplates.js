class LeavesTrackerTemplates {
    constructor() {
        
    }

    static Templates() {
        const Components = {
            approveLeavePromptTemplate: function (data={}) {
                const {formId, uniqueId, description, reason} = data;

                const descriptionForLeave = `<div class="form-group col-12 px-lg-3">
                                                <label class="bold-medium-font">Description</label>
                                                <div class="sdlms-text-tertiary-16px">${description}</div>
                                            </div>`;

                return `
                <form id="${formId}" data-unique="${uniqueId}" class="sdlms-form-elements">
                    <div class="mx-4 mt-3" style="margin-bottom: 0!important;">

                        <div class="form-row mb-3">
                    
                            <div class="form-group col-12 px-lg-3">
                                <label class="bold-medium-font">Reason for leave</label>
                                <div class="sdlms-text-tertiary-16px">${reason}</div>
                            </div>

                            ${description ? descriptionForLeave : ''}

                            <div class="form-group col-12 px-lg-3">
                                <label class="bold-medium-font" for="leaveActionSelect">Approve or Reject</label>
                                <select id="leaveActionSelect" name="status" class="form-control">                                                    
                                    <option value="">Select</option>
                                    <option value="accepted">Accept/Approve leave</option>
                                    <option value="rejected">Reject leave</option>
                                </select>
                            </div>
                            <div class="form-group col-12 px-lg-3">
                                <label class="bold-medium-font" for="reason">Why accepting or rejecting?</label>
                                <textarea id="reason" placeholder="Describe your reason" rows="3" name="reason" class="form-control"></textarea>
                            </div>
                        </div>

                    </div>
                </form>
                `;
            },

            leaveDetailsPrompt: function (data={}) {
                const {description, reason, status, remarks} = data;

                return `
                    <div class="sdlms-form-elements">
                        <div class="mx-4 mt-3" style="margin-bottom: 0!important;">

                            <div class="form-row mb-3">
                        
                                <div class="form-group col-12 px-lg-3">
                                    <label class="bold-medium-font">Reason for leave</label>
                                    <div class="sdlms-text-tertiary-16px">${reason}</div>
                                </div>

                                ${description ? `<div class="form-group col-12 px-lg-3">
                                <label class="bold-medium-font">Description</label>
                                <div class="sdlms-text-tertiary-16px">${description}</div>
                            </div>` : ''}

                                <div class="form-group col-12 px-lg-3">
                                    <label class="bold-medium-font" for="leaveActionSelect">Status</label>
                                    <div class="sdlms-text-tertiary-16px">${status}</div>
                                </div>
                                ${remarks ? `<div class="form-group col-12 px-lg-3">
                                <label class="bold-medium-font" for="reason">Remarks</label>
                                <div class="sdlms-text-tertiary-16px">${remarks}</div>
                            </div>` : ''}
                            </div>

                        </div>
                    </div>
                `;
            }
        };

        const TableTemplates = {
            leavesTableRow: function (element, page) {
                const Icons = {
                    accepted: '<i class="fa fa-check-circle text-success" aria-hidden="true"></i>',
                    pending: '<i class="fa fa-hourglass-half text-warning" aria-hidden="true"></i>',
                    rejected: '<i class="fa fa-times-circle-o text-danger" aria-hidden="true"></i>',
                };
                let {requestedTo, status} = element;

                return `
                    <tr data-id="${element.tid}" class="leaves-table-row">
                        <td
                            class="leaves-table-Sno font-weight-500 sdlms-text-black-18px">
                            ${(page.index + 1 + page.from || 0).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })} 
                        </td>
                        <td
                            class="leaves-table-date font-weight-500 sdlms-text-black-18px">
                            ${moment(element.from).format('ddd, DD MMM, YYYY')} <br />
                            <span
                                class="leaves-table-time font-weight-500 sdlms-text-black-18px"></span>
                            ${moment(element.from).format('hh:mm A')}
                        </td>
                        <td
                            class="leaves-table-date font-weight-500 sdlms-text-black-18px">
                            ${moment(element.to).format('ddd, DD MMM, YYYY')} <br />
                            <span
                                class="leaves-table-time font-weight-500 sdlms-text-black-18px"></span>
                            ${moment(element.to).format('hh:mm A')}
                        </td>
                        <td
                            class="leaves-table-Sno font-weight-500 sdlms-text-black-18px">
                            ${element.reason} 
                        </td>
                        <td
                            class="leaves-table-Sno font-weight-500 sdlms-text-black-18px">
                            ${element.deliverables || 'None'} 
                        </td>
                        <td
                            class="leaves-table-Sno font-weight-500 sdlms-text-black-18px">
                            ${requestedTo.fullname || requestedTo.username} 
                        </td>
                        <td
                            class="leaves-table-Sno font-weight-500 sdlms-text-black-18px">
                            ${status.status ? Icons[status.status.toLowerCase()] : ''} 
                            ${status.status} 
                        </td>
                    </tr>`
                }
            };

        const Modals = {
            promptModal: function (data) {
                const {
                	header,
                	submitButtonId = 'submit-action',
                	promptBody,
                	modalId = 'newPromptModel',
                    modalClass,
                    showSubmitButton = true,
                    submitButtonText,
                    submitButtonData={},
                } = data;

                let submitBtnData = '';

                for (const key in submitButtonData) {
                    if (Object.hasOwnProperty.call(submitButtonData, key)) {
                        const element = submitButtonData[key];
                        submitBtnData += ` data-${key}="${element}"`;
                    }
                }

                return `
                    <div class="modal fade" id="${modalId}" tabindex="-1" role="dialog" aria-labelledby="promptModel" aria-hidden="true">
                        <div class="modal-dialog ${modalClass}" style="position: relative; width: 100%; margin: 2rem auto;" role="document">
                            <div class="modal-content border-0 sdlms-section" style="height: auto;">
                                <div class="modal-header primary-header sdlms-section-header align-items-center sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
                                    <h5 class="modal-title" id="promptModel">${header}</h5>
                                    <button type="button" class="close close-modal text-white" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body pb-0">
                                    ${promptBody}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary border-0" data-dismiss="modal">Close</button>
                                    ${showSubmitButton ? `<button ${submitBtnData} type="button" id="${submitButtonId}" class="btn btn-primary button-primary">${submitButtonText || 'Save'}</button>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            },
        };

        return { TableTemplates, Modals, Components };
    }
}