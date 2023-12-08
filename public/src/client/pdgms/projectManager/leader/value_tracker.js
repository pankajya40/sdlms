"use strict";

/* globals define */

define("forum/pdgms/projectManager/leader/value_tracker", ['api'], function (api) {

	var valueTracker = {};

	valueTracker.init = () => {
        console.log("Value Tracker inited leader view")

		$("body").on("click","#team-value-employee-view-btn",function(){
			console.log("Employeeview Value")
			ajaxify.go("/pdgms/projectmanager/trackers/value")

		})
		$("body").on("click","#choose-mee",function(){
			console.log("a row clicked")
            $('.employees-list-table-section').toggleClass('change-class');
			$('[smaller-view].value').toggleClass('change-class');
            $('.target-view-section').toggleClass('change-class');

		})
        $("body").on("click","[exittomain]",function(){
			console.log("exit to main clicked")
            $('.employees-list-table-section').toggleClass('change-class');
			$('[smaller-view].value').toggleClass('change-class');
            $('.target-view-section').toggleClass('change-class');
            
		})

	};


	return valueTracker;

});