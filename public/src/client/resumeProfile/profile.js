'use strict';

/* globals define */

define('forum/resumeProfile/profile', ['api', 'translator'], function (api, translator) {
    var userprofile = {};

    userprofile.init = function () {
        console.log("its created");
        const resp = {
            learner: {
                badge: 'pro',
                score: 3,
                metrics: {
                    threadbuilder: [
                        {
                            metricName: 'Character Count',
                            count: 2000
                        },
                        {
                            metricName: 'Sub-thread Count',
                            count: 200
                        }
                    ]
                }
            },
            // add proper data and the red lines will disappear
            thinker: {
                badge: 'pro',
                score: 5,
                metrics: {
                    threadbuilder: [
                        {
                            metricName: 'Character Count',
                            count: 5000
                        },
                        {
                            metricName: 'Sub-interpretation Count',
                            count: 2000
                        }
                    ],
                    reflection: [{
                        metricName: 'Character count',
                        count: 5000
                    }]
                }
            },
            doer: {
                badge: 'pro',
                score: 100,
                metrics: {
                    toc: [
                        {
                            metricName: 'Number of KPI',
                            count: 500
                        },
    
                    ],
                    articles: [
                        {
                            metricName: 'Articles',
                            count: 2000
                        },
                        {
                            metricName: 'Character Count',
                            count: 50000
                        }
                    ]
                }
            },
            strategist: {
                badge: 'pro',
                score: 10,
                metrics: {
    
                    dtthon: [
                        {
                            metricName: 'DT-thon created',
                            count: 2000
                        },
                        {
                            metricName: 'Score card created',
                            count: 500
                        }
                    ]
                }
            },
            leader: {
                badge: 'pro',
                score: 10,
                metrics: {
                    session: [
                        {
                            metricName: 'people attended workshop',
                            count: 2000
                        }
                    ]
                }
            },
            builder: {
                badge: 'pro',
                score: 6,
                metrics: {
    
                    dtthon: [
                        {
                            metricName: 'DT-thon created',
                            count: 2000
                        },
                        {
                            metricName: 'times referanced',
                            count: 500
                        }
                    ]
                }
            }
        }
    
        var xValues = ["Learner", "Thinker", "Doer", "Strategist", "Leader", "Institution Builder"];
        var yValues = [resp.learner.score, resp.thinker.score, resp.doer.score, resp.strategist.score, resp.leader.score, resp.builder.score];
        var barColors = "blue";
        new Chart("myChart", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: 0,
                            // fontSize:"15"
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            fontFamily: "Poppins",
                            // fontSize:"15"
                        }
                    }],
                },
    
                legend: { display: false },
                title: {
                    display: true,
                    text: "DT Texonomy Graph"
                }
            }
        });
    

    }


    return userprofile;
})