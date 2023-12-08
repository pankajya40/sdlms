'use strict';

define('forum/sdlms/communication/cmreport',["api", "sdlms/table"], function () {
	const cmreport = {};
	// cmreport.init = function () {
	// 	$('#dashboard-button')
	// 		.on('click', () => {
	// 			ajaxify.go('/communication/dashboard');
	// 		});
	// 	const data = ajaxify.data.reports.data;
	// 	if (data.length === 0) {
	// 		$("#content").append("<h1 class='text-center p-5'>No recipient found</h1>")
	// 	}
	// 	for (let i = 0; i < data.length; i++) {
	// 		$('#reports').append(`<tbody class="sdlms-my-upcoming-session-table-body tbody-hover">
    //             <th class="font-weight-500" style="color: rgb(0, 0, 0);">${data[i].name}
    //             </th>
    //             <th class="font-weight-500" style="color: rgb(0, 0, 0);">${data[i].contact}
    //             </th>
    //             <th class="font-weight-500" style="color: rgb(0, 0, 0);">${data[i].status}
    //             </th>
    //             <th class="font-weight-500" style="color: rgb(0, 0, 0);">${new Date(data[i].createdAt).toLocaleDateString('en-GB')}
    //             </th>
    //         </tbody>`);
	// 	}
	// };
	cmreport.init = function () {

		$('#message').on('click', () => {
				ajaxify.go('/communication');
		});
		
		// const data = ajaxify.data.entries.data;

		let templateTable = new Table({
			target:'#report-table',
			columns:[
				{title:'S.No',value:'table'},
				{title:'Nams',value:'end'},
				{title:"Email",value:'end'},
				{title:'Status',value:'end'},
				{title:'Sent On',value:'end'},
				{title:'Action',value:'action'},
			],
            formatter: function (data, from=0) {
				console.log(data,"data")
                return data.map(function(row,index){
					console.log(row,"ddddjdjdj")
                    let {name, contact, status, uid,createdAt} = row;

					console.log(row,"row")

                    return {
                        attributes: {
                            uid,
                        },
                        data: {
                            Sno: `${(from + (index + 1))}`,
                            name,
							contact,
							status,
                            createdAt: `${moment(createdAt).format("DD MMM, YYYY")}, ${moment(createdAt).format('hh:mm A')}`,
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

        templateTable.render(`/communication/report`);
	
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
	return cmreport;
});
