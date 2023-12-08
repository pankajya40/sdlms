"use strict";



/* globals define */

define("forum/pdgms/escalation/employee/journal", function () {
	var journal = {};
	journal.init = () => {
		console.log("List of journal");
		// let escalation=Template.escalation();
		// $('#box').append(escalation.journal.creator())

		$("[tabheader]").off("click").on("click", ".sdlms-sessions", function () {
			$(".sdlms-sessions").removeClass("active");
			$(this).addClass("active");
			location.href = location.origin + `/${$(this).data("state")}`;
		});


    };
	return journal;
    
});