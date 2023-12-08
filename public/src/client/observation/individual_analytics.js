'use strict';

/* globals define */

define('forum/observation/individual_analytics', ['sdlms/table'], function () {
	var explorePage = {};

    explorePage.init = function () {
        const {uid, timeframe, endingDate, startingDate} = ajaxify.data;
        const columns = [];

        for (const key in timeframe) {
            if (Object.hasOwnProperty.call(timeframe, key)) {
                const element = timeframe[key];
                columns.push({
                    title: moment(element.date).format("DD MMM, YYYY"),
                    value:'table'
                })
            }
        }

        columns.unshift({title:'Type', value:'table'});

        let observationsTable = new Table({
            target: '#analytics-table',
            columns,
            formatter: function (data, from=0) {
                return data.map(function(row,index){
                    let type = Object.keys(row)[0];
                    let object = row[type];

                    type = type.charAt(0).toUpperCase() + type.slice(1)

                    let data = {type};

                    for (const key in object) {
                        if (Object.hasOwnProperty.call(object, key)) {
                            const element = object[key];
                            
                            if (Array.isArray(element) && element.filter(e => e._id).length) {
                                data[`day_${key}`] = '<i style="color: limegreen; font-size: 18px" class="fa fa-check-circle" aria-hidden="true"></i>';
                            } else {
                                data[`day_${key}`] = '<i style="color: red; font-size: 18px" class="fa fa-times-circle" aria-hidden="true"></i>';
                            }
                        }
                    }

                    return {
                        attributes: {},
                        emptyMessage: 'No data found!',
                        data
                    }
                })
            },
        });

        observationsTable.render(`/observation/analytics/${uid}`);
        
    }
    
    return explorePage;
})