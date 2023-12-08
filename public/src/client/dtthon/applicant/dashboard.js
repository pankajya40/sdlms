"use strict";

/* globals define */

define("forum/dtthon/applicant/dashboard", ["api","sdlms/pagination"], function (api) {
	var dashboard = {};
	dashboard.init = () => {
		$('#dtthon-card-search-bar').off('keyup').on('keyup',function(e) {            
            let name =$("input[type='text']").val();
			if(name.length > 3)
                paginateDashboard(`/apps/project?title=${name}&type=submission`)
	        else if(name.length < 1) {
			    paginateDashboard(`/apps/project?type=submission&limitBy=8`)
		    }
        })
	  
	    $('body').off('click').on('click', '[project-card]', function () {
		    let tid = $(this).data('id')
			window.location.href = `/dtthon/applicant/storyboard/${tid}`
	    });
	
		function paginateDashboard(url) {
			$(".project-cards").empty();
			let cardTemplate =	Template.cards();
			api.get(url, {}).then((res) => {
				res.data.map((ev, index) => {
					$(".project-cards").append(cardTemplate.dtthonCard.applicantProject(ev));
					if(ev.status=="In progress") {
						$(`#card-${ev.tid}`).find(`.hidden-detail`).append(`<div>${ev.tasks.length} task to be accomplish.</div>`);
					} else if (ev.status=="Submitted") {
						$(`#card-${ev.tid}`).find(`.hidden-detail`).append(`<div>Congratulations!!!</div><div>for Completion of ${ev.category}</div>`);
					}
				});
				pagination.paginate(res)
			});
		};
	
		let pagination = new Pagination({
			target:'#dashboard-pagination',
			onChange: paginateDashboard
		});
		
		paginateDashboard(`/apps/project?type=submission&limitBy=8`);
	};

	return dashboard;
});