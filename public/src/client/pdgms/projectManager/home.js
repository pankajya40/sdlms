"use strict";

/* globals define */

define("forum/pdgms/projectManager/home", ['api'], function (api) {

	var Home = {};

	Home.init = () => {
        console.log("Project Manager Homepage inited")
		$('body').on('click', '#sidebarToggle', function (event) {
			event.preventDefault();
			$('body').toggleClass('sb-sidenav-toggled');
		});
		
		$('body').on('click', '#sidebarToggle', function() {
			$(this).find('i').toggleClass('rotate');
		})

		var $tabs = $("#assets li");
		$tabs.removeClass("active");


		$tabs.filter("[tab='dashboard']").addClass("active");

		// $('body').on('click', '.navlink', function (event) {
		// 	$('.active').removeClass
		// });
		
	};
	


	return Home;

});

