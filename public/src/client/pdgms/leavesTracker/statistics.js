"use strict";

/* globals define */

define("forum/pdgms/leavesTracker/statistics", ['sdlms/table'], function () {
	var statisticsPanel = {};

	statisticsPanel.init = () => {
        let statisticsTable = new Table({
            target:'.statistics-panel',
            columns:[
                {title:'S.No',value:'table'},
                {title:'Member name',value:'table'},
                {title:"Total leaves taken",value:'end'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row,index){
                    return {
                        attributes: {
                            id: row._id,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            name: row.user.fullname || row.user.username || row.user.displayname,
                            leavecount: row.count
                        }
                    }
                });
            }
        });

		statisticsTable.render(`/pdgms/leaves/statistics`);
    }

	return statisticsPanel;

});