'use strict';

define('forum/observation/statuses', ['api', 'sdlms/table'], function (api) {
    var statuses = {};
    
    statuses.init = function () {
        let observationsTable = new Table({
            target: "#reports-section",
            columns:[
                {title:'S.No',value:'table'},
                {title:'Name',value:'end'},
                {title:'Company Name',value:'end'},
                {title:'Roles Applied',value:'end'},
                {title:'project Name',value:'end'},
                {title:'Action',value:'Action'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row,index){
                    let {user,company,_id,videoRefData } = row;
                    return {
                        attributes: {companyId : _id, },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            name : user.fullname || user.username,
                            companyName : company.name,
                            rolesApplied : videoRefData.role,
                           projectName : videoRefData.projectName,
                           action : `<div>
                            <button style="width: 110px; font-size: 15px;" data-redirect-uri="${[location.pathname, '/', user.uid].join('')}" class="btn btn-primary button-primary">
                                   Analytics <i class="fa fa-chevron-right" style="font-size: 12px;" aria-hidden="true"></i>
                           </button>
               
                       </div>`
                        }
                    }
                })
            },
        });
        observationsTable.render(`/observation/completeObservation`);

        $('body').off().on('click', '[data-redirect-uri]', function () {
            let redirectUri = $(this).data('redirect-uri');
            ajaxify.go(redirectUri);
        });

    }   
    return  statuses;
})

