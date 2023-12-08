'use strict';

/* globals define */

define('forum/observation/admin', ['api', 'sdlms/table', 'pdgms/leavesTrackerTemplates'], function (api) {
	var adminPage = {};

    adminPage.init = function () {

        var companiesData = [];
        const { Modals } = LeavesTrackerTemplates.Templates();
        
        $('#submit-observation-form').off().on('click', function () {
            var observationData = $('#observation-form').serializeObject();
            var missingFields =  [];

            ['name', 'whatsAppGroup', 'videoUrl'].forEach(el => {
                if (!observationData[el]) missingFields.push(el);
            });

            if (missingFields.length) {
                return notify('Required fields: ' + missingFields.join(', '), 'error');
            }

            if (observationData.roles && observationData.roles.length) {
                observationData.roles = observationData.roles.filter(el => el);
            }

            api.post('/observation', observationData)
                .then((res) => {
                    setTimeout(() => location.reload(), 1000);
                    notify('Created successfully!', 'success');
                }).catch((err) => notify(err.message, 'error'));
        });

        $('body').off().on('click', '[data-delete-id]', function () {
            if (!confirm('Are you sure to delete?')) return;

            let id = $(this).data('delete-id');
            api.del('/observation/' + id)
                .then(() => {
                    setTimeout(() => location.reload(), 1000);
                    notify('Deleted successfully!', 'success');
                })
                .catch((err) => notify(err.message, 'error'));
        });

        $('body').on('click', '[data-edit-id]', function () {
            let {name, videourl, whatsappgroup, editId} = $(this).data();
            let {roles, poc, observationPeriod} = companiesData.find(el => el._id == editId);

            let modalTargetId = 'PromptModel-' + editId;

            $('body').find('#modal-area').empty().append(`
                <button class="d-none" data-toggle="modal" data-target="#${modalTargetId}">button</button>
            `)
            .append(Modals.promptModal({
                header: 'Applicant details',
                submitButtonId: 'save-observation',
                promptBody: adminPage.modalBody({
                    name, whatsAppGroup: whatsappgroup, 
                    videourl, id: editId, roles, poc, observationPeriod
                }),
                modalId: modalTargetId,
            }));

            $(`[data-target="#${modalTargetId}"]`).trigger('click');
        });

        $('body').on('click', '#save-observation', function () {
            let formData = $('#edit-observation-form').serializeObject();
            let id = $('#edit-observation-form').data('id');

            if (formData.roles && formData.roles.length) {
                formData.roles = formData.roles.filter(el => el);
            }

            api.put('/observation/' + id, formData)
                .then((res) => {
                    setTimeout(() => location.reload(), 1000);
                    notify('Saved successfully!', 'success');
                }).catch((err) => notify(err.message, 'error'));
        });

        $('#add-role-btn').on('click', function () {
            let $target = $('#role-group');
            $target.append(adminPage.roleInputArea($target.children().length));
        });

        $('#add-video-btn')
            .on('click', (e) => {
                $('#add-video-btn').after("<div class='form-group col-12'>\n" +
                    "\t\t\t\t\t\t\t\t\t<label class='bold-medium-font' for='videoId'>Video Reflection url</label>\n " +
                    "\t\t\t\t\t\t\t\t\t<input required id='videoId' name='videoUrl' placeholder='Youtube video URL for writing reflection' class='form-control'></input><i delete-video class=\"fa fa-trash mr-1 my-auto ml-3 cursor-pointer\" aria-hidden=\"true\"></i>\n" +
                    "\t\t\t\t\t\t\t\t</div>");
            });

        $('body').on('click', '[delete-video]', function () {
            $(this).parent().remove();
        });

        $('body').on('click', '#edit-role-btn' ,function () {
            let $target = $('#edit-role-group');
            $target.append(adminPage.roleInputArea($target.children().length));
        });

        $('body').on('click', '[delete-role]', function () {
            if ($(this).parent().parent().children().length < 2) {
                return alert('Cannot remove all the blocks');
            }

            $(this).parent().remove();
        });

        let observationsTable = new Table({
            target: '.observations-table',
            columns:[
                {title:'S.No',value:'table'},
                {title:'Name',value:'end'},
                {title:'Created At',value:'end'},
                {title:'Action',value:'Action'},
            ],
            formatter: function (data, from=0) {
                companiesData = data;

                return data.map(function(row,index){
                    let {name, _id, createdAt, videoUrl, whatsAppGroup } = row;

                    return {
                        attributes: { },
                        emptyMessage: 'No data found!',
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            name,
                            createdAt: `${moment(createdAt).format("DD MMM, YYYY")}, ${moment(createdAt).format('hh:mm A')}`,
                            action: `<div>
                                        <button style="width: 100px; font-size: 15px;" 
                                            data-edit-id="${_id}" data-name="${name}" data-videourl="${videoUrl}" data-whatsAppGroup="${whatsAppGroup}"
                                            class="btn btn-primary button-primary mx-1">
                                            Edit <i class="fa fa-pencil" style="font-size: 12px;" aria-hidden="true"></i>
                                        </button>

                                        <button style="width: 100px; font-size: 15px;" data-delete-id="${_id}" class="btn btn-primary button-primary mx-1">
                                            Delete <i class="fa fa-trash" style="font-size: 12px;" aria-hidden="true"></i>
                                        </button>
                                    </div>`
                        }
                    }
                })
            },
        });

        observationsTable.render(`/observation`);
    }

    adminPage.roleInputArea = function (index, value='') {
        return `
            <div class="d-flex my-1 justify-content-between">
                <input required placeholder="Enter a role" value="${value}" name="roles[${index}]" class="form-control ml-1 w-100"></input>
                <i delete-role class="fa fa-trash mr-1 my-auto ml-3 cursor-pointer" aria-hidden="true"></i>
            </div>
        `;
    }

    adminPage.modalBody = function (data={}) {
        const {name, whatsAppGroup, videourl, id, roles=[], poc, observationPeriod} = data;
        // let rolesToHtml = adminPage.roleInputArea(0);

        // if (roles && roles.length) {
        //     rolesToHtml = roles.map((el, index) => adminPage.roleInputArea(index, el)).join('');
        // }
        
        return `
            <form id="edit-observation-form" data-id="${id}" class="sdlms-form-elements">
                <div class="mx-4 mt-3" style="margin-bottom: 0!important;">

                    <div class="form-row mb-4">
                        <div class="form-group col-12">
                            <label class="bold-medium-font" for="companyName">Project name</label>
                            <input required id="companyName" value="${name == undefined ? '' : name}" name="name" placeholder="Add your current deliverables" class="form-control"></input>
                        </div>
                        <div class="form-group col-12 ">
                            <label class="bold-medium-font" for="WAGroup">WhatsApp Group</label>
                            <input required id="WAGroup" value="${whatsAppGroup == undefined ? '' : whatsAppGroup}" placeholder="Paste Whatsapp group link" name="whatsAppGroup" class="form-control"></input>
                        </div>
                        <div class="form-group col-12">
                            <label class="bold-medium-font" for="videoId">Youtube video link (Enter multiple, separated by comma)</label>
                            <input id="videoId" value="${videourl == undefined ? '' : videourl}" name="videoUrl" placeholder="Youtube video URL for writing reflection" class="form-control"></input>
                        </div>
                        
                        <div class="form-group col-6">
                            <label class="bold-medium-font" for="pocs">POC</label>
                            <input required id="pocs" value="${poc || ''}" placeholder="Person of contact for the organization" name="poc" class="form-control"></input>
                        </div>

                        <div class="form-group col-6">
                            <label class="bold-medium-font" for="observationPeriod">Observation period</label>
                            <input required id="observationPeriod" value="${observationPeriod || ''}" placeholder="No. of days (e.g. 6)" name="observationPeriod" class="form-control"></input>
                        </div>

                    </div>
                </div>
            </form>
        `;
    }
    
    return adminPage;
})