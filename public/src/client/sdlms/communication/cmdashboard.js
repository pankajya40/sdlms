'use strict';

define('forum/sdlms/communication/cmdashboard', ["api", "sdlms/table"], function () {
	var cmdashboard = {};
	cmdashboard.init = function () {

		$('#message').on('click', () => {
				ajaxify.go('/communication');
		});
		
		const data = ajaxify.data.entries.data;

		let templateTable = new Table({
			target:'#dashboardtable',
			columns:[
				{title:'S.No',value:'table'},
				{title:'Lable',value:'end'},
				{title:"Date",value:'end'},
				{title:'Status',value:'end'},
				{title:'Action',value:'action'},
			],
            formatter: function (data, from=0) {
				console.log(data,"data")
                return data.map(function(row,index){
					console.log(row,"ddddjdjdj")
                    let {label, createdAt, status, uid} = row;

					console.log(row,"row")

                    return {
                        attributes: {
                            uid,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            label,
                            createdAt: `${moment(createdAt).format("DD MMM, YYYY")}, ${moment(createdAt).format('hh:mm A')}`,
                            status,
                            action: `<button style="width: 120px; font-size: 15px;" data-action="copy" data-tid="${uid}" class="mx-1 btn btn-primary button-primary">
                                            Copy ID <i class="fa fa-copy mx-1" style="font-size: 12px;" aria-hidden="true"></i>
                                    </button>
                                    <button style="width: 120px; font-size: 15px;" data-action="edit" data-tid="${uid}" class="mx-1 btn btn-primary button-primary">
                                            Edit <i class="fa fa-edit mx-1" style="font-size: 12px;" aria-hidden="true"></i>
                                    </button>
                                    
                                    `
                        }
                    }
                })
            },
		});

        templateTable.render(`/communication/request`);
	
		$(".sdlms-my-upcoming-session-table").on('click', (e) => {
			ajaxify.go(`/communication/report?requestId=${e.target.parentElement.parentElement.id}`)
		})

        
        $('body').off().on('click', '[data-tid]', function () {
            let {tid, action} = $(this).data();

            // console.log($(this).data(),"ddddddddd")
            console.log(tid,"tid")
            console.log(action,"action")

            if (action == 'edit') {
                location.href = [location.pathname, '/', tid].join('');

            } else if (action == 'copy') {
                app.copyText(tid);
            }
        });
	};
	return cmdashboard;
}
);
