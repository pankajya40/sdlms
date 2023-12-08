"use strict";

/* globals define */

define("forum/pdgms/escalation/supervisor/journal", function () {
	var journal = {};
	journal.init = () => {
		console.log("List of aall journal od supervisor");

		$("[tabheader]").off("click").on("click", ".sdlms-sessions", function () {
			$(".sdlms-sessions").removeClass("active");
			$(this).addClass("active");
			location.href = location.origin + `/${$(this).data("state")}`;
		});
    };
	return journal;
    
});