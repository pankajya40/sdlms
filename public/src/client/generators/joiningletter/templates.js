"use strict";

/* globals define */

define("forum/generators/joiningletter/templates", ['api', 'sdlms/table'], function (api) {
	var templates = {};

	templates.init = function () {

        let viewTemplatesTable = new Table({
            target: '#templates-table',
            columns:[
                {title:'S.No',value:'table'},
                {title:'Template name',value:'end'},
                {title:"Created by",value:'end'},
                {title:'Last updated',value:'end'},
                {title:'Actions',value:'Action'},
            ],
            formatter: function (data, from=0) {
                return data.map(function(row, index){
                    let {templateName, updatedAt, _id, user} = row;

                    return {
                        attributes: {
                            templateid: _id,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            templateName,
                            name: user.fullname || user.username,
                            updatedAt: `${moment(updatedAt).format("DD MMM, YYYY")}, ${moment(updatedAt).format('hh:mm A')}`,
                            action: `<div>
                                        <button style="width: 100px; font-size: 15px;" data-edit-url="${[location.pathname, '/edit/', _id].join('')}" class="btn btn-primary button-primary mx-1">
                                                Edit <i class="fa fa-pencil-square-o" style="font-size: 12px;" aria-hidden="true"></i>
                                        </button>

                                        <button style="width: 100px; font-size: 15px;" data-delete-id="${_id}" class="btn btn-primary button-primary mx-1">
                                                Delete <i class="fa fa-trash" style="font-size: 12px;" aria-hidden="true"></i>
                                        </button>
                                    </div>`
                        }
                    }
                })
            },
        });

        viewTemplatesTable.render(`/generators/joiningletter/templates`);

        $('body').off().on('click', '[data-edit-url]', function () {
            let url = $(this).data('edit-url');
            ajaxify.go(url);
        });

        $('body').on('click', '[data-delete-id]', function () {
            let id = $(this).data('delete-id');

            if(!confirm('Are you sure to delete this template?')) return;

            api.del('/generators/joiningletter/templates/' + id)
                .then((res) => {
                    console.log(res);
                    setTimeout(() => location.reload(), 1000);
                    notify('Deleted successfully', 'success');
                })
                .catch((err) => notify(err.message, 'error'));
        });
    }


    return templates;
});