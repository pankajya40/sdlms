"use strict";

/* globals define */

define("forum/generators/joiningletter/letters", ['api', 'sdlms/table'], function (api) {
	var letters = {};

	letters.init = function () {

        let viewlettersTable = new Table({
            target: '#letters-table',
            columns:[
                {title:'S.No',value:'table'},
                {title:'Request name',value:'end'},
                {title:'Status',value:'end'},
                {title:"Created by",value:'end'},
                {title:'Last updated',value:'end'},
                {title:'Actions',value:'Action'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row, index){
                    let {requestName, createdAt, _id, user, processedItems, totalItems} = row;

                    return {
                        attributes: {
                            requestId: _id,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            requestName,
                            status: `${processedItems}/${totalItems} completed`,
                            name: user.fullname || user.username,
                            createdAt: `${moment(createdAt).format("DD MMM, YYYY")}, ${moment(createdAt).format('hh:mm A')}`,
                            action: `<div>
                                        <a href="${[location.pathname, '/outputs/', _id].join('')}" style="width: 140px; font-size: 15px;" data-view-url="" class="btn btn-primary button-primary mx-1">
                                                View letters <i class="fa fa-chevron-right" style="font-size: 12px;" aria-hidden="true"></i>
                                        </a>
                                    </div>`
                        }
                    }
                })
            },
        });

        viewlettersTable.render(`/generators/joiningletter/letters`);


        $('body').on('click', '[data-delete-id]', function () {
            let id = $(this).data('delete-id');

            if(!confirm('Are you sure to delete this template?')) return;

            // api.del('/generators/joiningletter/letters/' + id)
            //     .then((res) => {
            //         console.log(res);
            //         setTimeout(() => location.reload(), 1000);
            //         notify('Deleted successfully', 'success');
            //     })
            //     .catch((err) => notify(err.message, 'error'));
        });
    }


    return letters;
});