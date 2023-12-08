"use strict";

/* globals define */

define("forum/pdgms/escalation/employee/learning_agenda", function () {
	var learning_agenda = {};
	learning_agenda.init = () => {
		console.log("List of all agenda");

		$("[tabheader]").off("click").on("click", ".sdlms-sessions", function () {
			$(".sdlms-sessions").removeClass("active");
			$(this).addClass("active");
			location.href = location.origin + `/${$(this).data("state")}`;
		});

		
		
		
    };
	return learning_agenda;
    
});