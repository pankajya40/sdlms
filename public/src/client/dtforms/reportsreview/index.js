'use strict';

/* globals define */

define('forum/dtforms/reportsreview/index', ['sdlms/table', 'sdlms/enquiryform'], function () {
    let reportforms={};
   
    reportforms.init = function(){
        let data=ajaxify.data.data
        console.log(data,"data");
        let question = data[0]['blocks']
        let reporttable= new Table({
            target:'.main-body',
            columns:[{
                title : "User" , value : "User"
            },
            ...question.map((q) => {
                return {title : q['question'],value:q['question']}
            })
        ],
        formatter: function(data,from =0){
           return data.map((row,index) => {
                return {
                    attributes:{},
                    data:{
                        user: `<div>${row.title}</div>`,
                        ...row.blocks.reduce((acc,block) => {
                            acc[block.question] = block.responseRaw;
                            return acc;
                        },{})
                    }
                }
            })
        }
        })
       reporttable.render(`/forms/reviewreports/`);
    }


    return reportforms;
});






