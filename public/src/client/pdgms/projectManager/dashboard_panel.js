"use strict";

/* globals define */

define("forum/pdgms/projectManager/dashboard_panel", ['api' , "sdlms/table"], function (api) {

	var dashboard = {};

	dashboard.init = () => {
        console.log("Project Dashboard")
		
		// let applicantTable = new Table({
        //     target:'#task-allocated',
        //     columns:[
        //         {title:'S.No',value:'table'},
        //         {title:'Task',value:'end'},
        //         {title:"Description",value:'end'},
        //         {title:'Deadline',value:'Action'},
        //         {title:'Status',value:'Action'},
        //     ],
        //     formatter: formatTaskTableResponse
        // })

		// function formatTaskTableResponse(data, from=0){
        //     return data.map(function(row,index){
        //         return {
					
                    // attributes: {
                    //     uid: row.uid,
                    //     tid: row.tid,
                    //     status: row.status
                    // },
                    // data: {
                    //     Sno: `${(from + (index + 1))}`,
                    //     username: row.user.displayname,
                    //     applicantstatus: row.status,
                    //     date: `${moment(row.createdAt).format("DD MMM, YYYY")} at ${moment(row.createdAt).format("hh:mm A")}`,
                    //     info: `${row.status=="Submitted" ? `Submitted on ${moment(row.submission_time).format("DD MMM, YYYY")} at ${moment(row.submission_time).format("hh:mm A")}` : `${row.completed_tasks} out of ${row.total_tasks} tasks submitted`}`
            //         }
            //     })
            // }

            // $("body").on("click","#employee-view-dashboard",function(){
            //     console.log("Employeeview")
			// 	ajaxify.go("/pdgms/projectManager/dashboard")
    
            // })
    
            $("body").on("click","#leader-view-dashboard",function(){
                console.log("leaderview")
                ajaxify.go("/pdgms/projectManager/dashboard/leader")
                
            })

            // $("body").on("click","#employee-view-btn",function(){
            //     console.log("Employeeview")
			// 	ajaxify.go("/pdgms/projectManager/dashboard/employee")
    
            // })
    
            // $("body").on("click","#leader-view-btn",function(){
            //     console.log("leaderview")
            //     ajaxify.go("/pdgms/projectManager/dashboard/leader")
                
            // })

            // $("body").on("click","#employee-view-btn",function(){
            //     console.log("Employeeview")
			// 	ajaxify.go("/pdgms/projectManager/dashboard/employee")
    
            // })
    
            // $("body").on("click","#leader-view-btn",function(){
            //     console.log("leaderview")
            //     ajaxify.go("/pdgms/projectManager/dashboard/leader")
                
            // })
	};
	return dashboard;
});