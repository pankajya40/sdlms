"use strict";

/* globals define */

define("forum/pdgms/escalation/supervisor/feedback", function () {
	var feedback = {};
	feedback.init = () => {
		console.log("List of all  supervise  feedback");

		$("[tabheader]").off("click").on("click", ".sdlms-sessions", function () {
			$(".sdlms-sessions").removeClass("active");
			$(this).addClass("active");
			location.href = location.origin + `/${$(this).data("state")}`;
		});

    };
	return feedback;
    
});