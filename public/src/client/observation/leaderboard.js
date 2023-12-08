'use strict';

/* globals define */

define('forum/observation/leaderboard', ['sdlms/table'], function () {
	var leaderboard = {};

    leaderboard.init = function () {
        let observationsTable = new Table({
            target: '#leaderboard-table',
            perPage: 20,
            columns:[
                {title:'S.No',value:'table'},
                {title:'Date',value:'end'},
                {title:'Name',value:'end'},
                {title:'Role',value:'end'},
                {title:'Project',value:'end'},
                {title:'Day',value:'end'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row,index){
                    let {profile, _id, createdAt, currentObservationDay, poc, uid} = row;
                    let {name, role, projectName} = profile;
                    let project = row.name;

                    return {
                        attributes: {id: _id, uid},
                        emptyMessage: 'No data found!',
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            createdAt: `${moment(createdAt).format("DD MMM")}`,
                            name, role, 
                            projectName: project || '--',
                            currentObservationDay: currentObservationDay > 7 ? '7+' : currentObservationDay,
                        }
                    }
                })
            },
        });

        observationsTable.render(`/observation/leaderboard`);
    }

    return leaderboard;
});