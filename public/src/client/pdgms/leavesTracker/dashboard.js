"use strict";

/* globals define */

define("forum/pdgms/leavesTracker/dashboard", ['api', 'sdlms/table'], function (api) {
	var dashboardPanel = {};

	dashboardPanel.init = () => {

        var { profile={} } = ajaxify.data;

        if (profile && Object.keys(profile).length) {
            dashboardPanel.populateData(profile, ['currency', 'commitedHours', 'internshipType', 'rolls']);
        }

        let peopleOnLeave = new Table({
            target:'.currently-on-leave-table',
            columns:[
                {title:'S.No',value:'table'},
                {title:"Name",value:'end'},
                {title:'From',value:'end'},
                {title:'To',value:'end'},
                {title:'Reason',value:'end'},
                {title:'Approved by',value:'Action'},
            ],
            emptyMessage: 'No leaves found!',
            formatter: function (data, from=0){
                return data.map(function(row,index){
                    return {
                        attributes: {
                            date: row.date,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            name: row.requestedBy.fullname || row.requestedBy.username,
                            from: moment(row.from).format("DD MMM, YYYY"),
                            to: moment(row.to).format("DD MMM, YYYY"),
                            reason: row.reason,
                            approvedBy: row.approvedBy.fullname || row.approvedBy.username,
                        }
                    }
                });
            }
        });

        peopleOnLeave.render(`/pdgms/leaves/current`);

        $('body').on('click', '#submit-profile-form', function () {
			let profileFormData = dashboardPanel.serializeFormToObject('#profile-form');
            api.put('/pdgms/profile', profileFormData).then(() => {
                notify('Profile updated successfully!', 'success');
            })
            .catch((err) => {
                notify(err.message, 'error');
            }).finally(() => setTimeout(() => {
            	location.reload();
            }, 1000));
		});
    }

    dashboardPanel.populateData = function (object, fields) {
        fields.forEach((item) => $(`[name="${item}"]`).find(`[value="${object[item]}"]`).attr('selected', true))
    }

	dashboardPanel.serializeFormToObject = function (target) {
        if (!target) return {};
        let payload = {};

        $(target).serializeArray().reduce(function (obj, item) {
            return payload[item.name] = item.value;
        }, {});

        return payload;
    }

	return dashboardPanel;

});