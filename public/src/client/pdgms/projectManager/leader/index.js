"use strict";

/* globals define */

define("forum/pdgms/projectManager/leader/index", ['api', 'sdlms/table','pdgms/projectManagerTemplates'], function (api) {

	var Dashboard = {};
    let components = ProjectManagerTemplates.projectmanager();

	Dashboard.init = () => {
        
       // console.log("Project Manager leader view")
		
		$("body").on("click","#employee-view-dashboard",function(){
			console.log("Employeeview")
			ajaxify.go("/pdgms/projectManager/dashboard/employee")

		})
        $("body").on("click","#choose-me",function(){
			console.log("a row clicked")
            $('.projects-table-section').toggleClass('change-class');
			$('[smaller-view].dashboard').toggleClass('change-class');
            $('.task-accordian').toggleClass('change-class');

		})
        $("body").on("click","[exittomain]",function(){
			console.log("exit to main clicked")
            $('.projects-table-section').toggleClass('change-class');
			$('[smaller-view].dashboard').toggleClass('change-class');
            $('.task-accordian').toggleClass('change-class');
            
		})


		let projectslistTable = new Table({
            target:'.projects-table-area',
            columns:[
                {title:'S.No',value:'table'},
                {title:'Title',value:'end'},
                {title:'Assigner',value:'end'},
                {title:"Created Date",value:'end'},
                {title:"Deadline",value:'end'},
                {title:"Est. Credits",value:'end'},
                {title:"Priority",value:'Action'},
                
            ],
            formatter: Dashboard.formatProjectsTableResponse,
        })
        
        
        projectslistTable.render(`/pdgms/holidaylist`);

        // $(function() {
        //     $('input[name="daterange"]').daterangepicker({
        //       opens: 'left'
        //     }, function(start, end, label) {
        //       console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        //     });
        //   });
       $("#leader-view-content").find('.task-available').html(components.pmcomponents.taskDescription());
	};
	Dashboard.formatProjectsTableResponse = function (data, from=0){
        return data.map(function(row,index){
            return {
                attributes: {
                    date: row.date,
                },
                data: {
                    Sno: `${(from + (index + 1))}`,
                    pname: row.pname,
                    assigner: row.aname,
                    date: moment(row.date).format("DD MMM, YYYY"),
                    date: moment(row.date).format("DD MMM, YYYY"),
                    pname: row.pname,
                    pcredits: row.pcredits,
                    isHoliday: row.isHoliday,
                }
            }
        });
    }
	
	return Dashboard;
})