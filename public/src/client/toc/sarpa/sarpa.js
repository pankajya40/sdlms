"use strict";



/* globals define */
define("forum/toc/sarpa/sarpa", [],

	function (api, journal) {

		var sarpa = {};
		sarpa.init = () => {
            console.log('here in sarpa')
			$("body").on("click",".no-ajaxify",function(){
				let url = $(this).data("href");
				location.href = url;
			})
		
		};

		return sarpa;
	});
