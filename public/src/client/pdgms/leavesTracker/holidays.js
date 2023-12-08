"use strict";

/* globals define */

define("forum/pdgms/leavesTracker/holidays", ['sdlms/table'], function () {
	var holidays = {};

	holidays.init = () => {

        let holidaylistTable = new Table({
            target:'.holiday-table-area',
            columns:[
                {title:'S.No',value:'table'},
                {title:'Date',value:'end'},
                {title:"Name",value:'end'},
                {title:'Is it a DT Holiday',value:'Action'},
            ],
            formatter: holidays.formatHolidayTableResponse,
        })
        
        
        holidaylistTable.render(`/pdgms/holidaylist`);

    }

    holidays.formatHolidayTableResponse = function (data, from=0){
        return data.map(function(row,index){
            return {
                attributes: {
                    date: row.date,
                },
                data: {
                    Sno: `${(from + (index + 1))}`,
                    date: moment(row.date).format("DD MMM, YYYY"),
                    name: row.name,
                    isHoliday: row.isHoliday,
                }
            }
        });
    }

	return holidays;

});