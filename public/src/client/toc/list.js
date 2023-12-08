"use strict";

/* globals define */

define("forum/toc/list", ["api", "sdlms/table"], function () {
	var list = {};
	list.init = () => {

		let userTable = new Table({
            target:'#user-table',
            columns:[
                {title:'S.No',value:'table'},
                {title:'Users',value:'end'},
                {title:'TOC',value:'end'},
                {title:'KPI',value:'end'},
            ],
                formatter: formatUserTableResponse
        })
        function formatUserTableResponse(data, from=0){
            return data.map(function(row,index){
				let date = Date.now();
                return {
                    attributes: {
						userid : row.uid
                    },
                    data: {
                        Sno: `${(from + (index + 1))}`,
                        username: row.displayname,
						TOC: `<button type="button" class="align-items-center button-primary sdlms-button toc-button" data-uid="${row.uid}" style="border-radius: 5px;">
                                <span class="sdlms-font-open-sans">Open</span>
                              </button>`,
                        KPI: `<button type="button" class="align-items-center button-primary sdlms-button kpi-button" data-uid="${row.uid}" style="border-radius: 5px;">
                                <span class="sdlms-font-open-sans">Open</span>
                              </button>`
                    }
                    }
                })
        }

		$('body').off('click').on('click', '.toc-button', function () {
            let userid = $(this).data('uid')
			let date = Date.now();
			ajaxify.go(`/toc/calendar/${moment(date).format("YYYY/MM/DD")}/${userid}`)
		});

        $('body').on('click', '.kpi-button', function () {
            let userid = $(this).data('uid')
			let date = Date.now();
			ajaxify.go(`/pdgms/kpitracker/view`);
		});
		
        userTable.render(`/sdlms/cohorts/DeepThought%20Associates/members?limit=15`);
    };
	return list;
});
