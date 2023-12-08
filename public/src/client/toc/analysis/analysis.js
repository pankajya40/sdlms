"use strict";



/* globals define */
define("forum/toc/analysis/analysis", [],

	function (api, journal) {

		var analysis = {};
		analysis.init = () => {
            console.log('here in analysis')
			$("body").on("click",".no-ajaxify",function(){
				let url = $(this).data("href");
				location.href = url;
			})
		
		};

		return analysis;
	});
