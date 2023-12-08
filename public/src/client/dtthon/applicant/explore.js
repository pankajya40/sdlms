"use strict";

/* globals define */

define("forum/dtthon/applicant/explore", ["api","sdlms/pagination"], function (api) {
	var explorePage = {};

	explorePage.init = function () {

		$("[tabheader]").off("click").on("click", ".sdlms-sessions", function () {
			$(".sdlms-sessions").removeClass("active");
			$(this).addClass("active");
			location.href = location.origin + `/${$(this).data("state")}`;
		});	

		$("body").on("click", "[change-to-aProfile]", function () {
			let tpid = $(this).data("tid");
			location.href = `/dtthon/applicant/profile/${tpid}`
		})
		
		$("[toc-btn]").on("click", function() {
			window.open(`/toc/home`, '_blank');
		})

		$('#dtthon-explore-search-bar').off('keyup').on('keyup',function(e){            
            let name =$("input[type='text']").val();
			if(name.length > 3) 
			    paginateExplorePage(`/apps/project?title=${name}&uid=all&limitBy=6`)
		    else if(name.length < 1) 
			    paginateExplorePage(`/apps/project&limitBy=6`)
        })

	    function paginateExplorePage(url) {
		    $(".dtthon-explore-page").empty();
		    let cardTemplate =	Template.cards();
		    api.get(url, {}).then((res) => {
			    res.data.map((ev, index) => { 
				    $(".dtthon-explore-page").append(cardTemplate.dtthonCard.exploreProject(ev));
			    });
			    pagination.paginate(res)
		    });
	    };

	    let pagination = new Pagination({
		    target:'#explore-page-pagination',
		    onChange: paginateExplorePage
	    });
	
	    paginateExplorePage(`/apps/project?active=true&limitBy=6`);
    };

	return explorePage;
});








		// let DtthonArray = [];
		// $(".Dtthon-filter").on("click", ".dtthon-filter-icon", function () {
		// 	$(".Dtthon-filter-body").slideToggle("slow");
		// 	DtthonArray = [];
		// 	$("input[type='checkbox']").prop("checked", false);
		// 	$(".dtthon-filters-array").find("button").remove();
		// });

		// $($(".type .type-body")).off("click").on("click", "input[type='checkbox']", function () {
		// 		let value = $(this).val();

		// 		if ($(this).is(":checked")) {
		// 			DtthonArray.push(value);
		// 		} else {
		// 			DtthonArray.pop(value);
		// 		}
		// 		console.log(DtthonArray);
		// 	});
		// $("[ApplyFilter]").on("click", function () {
		// 	let html;
		// 	DtthonArray.map(function (val, i) {
		// 		html = `
        //       <button type="button" class="sdlms-button button-primary button-md d-flex align-items-center mx-2">
        //       <span class="sdlms-text-white-20px">${val}</span>
        //       <span class="ml-2" delete-filter>
        //         <svg width="10" height="3" viewBox="0 0 10 3" fill="none" xmlns="http://www.w3.org/2000/svg" >
        //           <path d="M9.28572 0H0.714286C0.319866 0 0 0.447812 0 1V2C0 2.55219 0.319866 3 0.714286 3H9.28572C9.68013 3 10 2.55219 10 2V1C10 0.447812 9.68013 0 9.28572 0Z" fill="white"/>
        //           </svg>                        
        //       </span>
        //     </button>
        //       `;
		// 		$(".dtthon-filters-array").append(html);
		// 	});
        //     DtthonArray
		// 	$(".Dtthon-filter-body").slideToggle("slow");
        //     explorePage.paginateExplorePage(`/apps/project?title=${name}`, {
        //         parent: "dtthon-explore-page",
        //     });

		// });
		// $(".dtthon-filters-array").off("click").on("click", "[delete-filter]", function () {
		// 		console.log($(this).prev().text());
		// 		if (DtthonArray.length) {
		// 			DtthonArray.pop($(this).prev().text());
		// 			$(this).parent().remove();
		// 		}
		// });

		// $("[resetFilter]").on("click", function () {
		// 	DtthonArray = [];
		// 	$("input[type='checkbox']").prop("checked", false);
		// });

	// $(".sdlms-container").find(".page-navigator").off("click").on("click", function () {
	// 		let url = $(this).data("url");
	// 		if (url) {
	// 			explorePage.paginateExplorePage(url, {
	// 				parent: "dtthon-explore-page",
	// 			});
	// 			return;
	// 		}
	// });





