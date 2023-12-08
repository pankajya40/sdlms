"use strict";

/* globals define */

define("forum/pdgms/projectManager/employee/index", ['api','sdlms/table','pdgms/projectManagerTemplates'], function (api) {

	var Dashboard = {};
    let  modal  = ProjectManagerTemplates.projectmanager();

	Dashboard.init = () => {

        console.log("Project Manager employee view")
		
		$("body").on("click","#leader-view-dashboard",function(){
			console.log("leaderview")
			ajaxify.go("/pdgms/projectmanager/dashboard/leader")

		})
		let projectslistTable = new Table({
            target:'.project-table-area',
            columns:[
                {title:'S.No',value:'table'},
                {title:'ProjectName',value:'end'},
				{title:"TaskName",value:'end'},
                {title:"Created Date",value:'end'},
                {title:"Deadline",value:'end'},
                {title:"Est. Credits",value:'end'},
                {title:"Priority",value:'Action'},
                
            ],
            formatter: Dashboard.formatProjectsTableResponse,
        })
        
        projectslistTable.render(`/pdgms/holidaylist`);
        $("#employee-view-content").find('.modals').html(modal.modals.detailModal());
       
	};
	Dashboard.formatProjectsTableResponse = function (data, from=0){
        return data.map(function(row,index){
            return {
                attributes: {
                    tid: row.tid,
                },
                data: {
                    Sno: `${(from + (index + 1))}`,
					pname: `<a data-toggle="modal" href="#myModal4" class="col-md-2">${row.pname} </a>`,
					tname: row.tname,
                    cdate: moment(row.cdate).format("DD MMM, YYYY"),
					ddate: moment(row.ddate).format("DD MMM, YYYY"),
                    ecredits: row.ecredits,
                    Priority: row.Priority,
                }
            }
        });
    }

	return Dashboard;
})
