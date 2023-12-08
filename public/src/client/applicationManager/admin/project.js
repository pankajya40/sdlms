"use strict";

/* globals define */

define("forum/applicationManager/admin/project", ["sdlms/table"], function () {
	var project = {};
	project.init = () => {
        let applicantTable = new Table({
            target:'#project-detail',
            columns:[
                {title:'S No',value:'serial-number'},
                {title:'Project Name',value:'project-name'},
                {title:"Created At",value:'created-at'},
            ],
            emptyMessage : `Zero Project`,
            formatter: formatApplicantTableResponse
        })
        function formatApplicantTableResponse(data, from=0){
            return data.map(function(row,index){
                return {
                    attributes: {
                        id: row._id,
                    },
                    data: {
                        Sno: `${(from + (index + 1))}`,
                        name: row.name,
                        date: `${moment(row.createdAt).format("DD MMM, YYYY")} at ${moment(row.createdAt).format("hh:mm A")}`,
                    }
                    }
                })
        }
        
        applicantTable.render(`/application_manager/project?limit=10`);

        $('body').off('click').on('click', '.sdlms-my-upcoming-session-table-row', function () {
            let id = $(this).data('id')
            ajaxify.go(`/application/${id}`)
        })   

	};

	return project;
});