'use strict';

define('forum/sdlms/communication/templates', ["api", "sdlms/table"], function () {
	var templates = {};
	templates.init = function () {

		let templateTable = new Table({
			target:'#templates-table',
			columns:[
				{title:'S.No',value:'table'},
				{title:'Name',value:'end'},
				{title:"Created At",value:'end'},
				{title:'Compatable Channel',value:'end'},
				{title:'Action',value:'action'},
			],
            formatter: function (data, from=0) {
                return data.map(function(row,index){
                    console.log(row,"anotherrow")
                    let {compatibleChannel, createdAt, templateName, tid, _id} = row;

                    return {
                        attributes: {
                            tid,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            templateName,
                            createdAt: `${moment(createdAt).format("DD MMM, YYYY")}, ${moment(createdAt).format('hh:mm A')}`,
                            compatibleChannel,
                            action: `<button style="width: 120px; font-size: 15px;" data-action="copy" data-tid="${_id}" class="mx-1 btn btn-primary button-primary">
                                            Copy ID <i class="fa fa-copy mx-1" style="font-size: 12px;" aria-hidden="true"></i>
                                    </button>
                                    <button style="width: 120px; font-size: 15px;" data-action="edit" data-tid="${_id}" class="mx-1 btn btn-primary button-primary">
                                            Edit <i class="fa fa-edit mx-1" style="font-size: 12px;" aria-hidden="true"></i>
                                    </button>`
                        }
                    }
                })
            },
		});

        templateTable.render(`/communication/template`);

        $('body').off().on('click', '[data-tid]', function () {
            let {tid, action} = $(this).data();

            if (action == 'edit') {
                location.href = [location.pathname, '/', tid].join('');

            } else if (action == 'copy') {
                app.copyText(tid);
            }
        });
	};
	return templates;
}
);
