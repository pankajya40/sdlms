"use strict";

define("forum/sdlms/employee_dashboard/user_list", ["api",], function (api) {
	
	var user_list = {};
    user_list.init = function () {
        let data = ajaxify.data;
        let $target = $('#members_list');
        let { members } = data;

        if (members.length) {
            $.each(members ,function (index, value) {
                $target.append(user_list.card(value, data.baseUrl));
            });
        }

        $('[member]').on('click', function (e) {
            e.preventDefault();
            let uid = $(this).data(' ');
            ajaxify.go(`/company/dashboard/${uid}`);
        })

        if($('[sdlms-card]').length){
			$('.sdlms-pagination').show();
		}

        user_list.card = function (items, baseUrl) {
           
            return `
        <div class="container">
            <ul class="list-group list-group-flush">
                <li class="list-group-item shadow-sm m-2 rounded text-center member">
                    <div class="row d-flex justify-content-center align-items-center p-0">
                    <div class="col-4 float-left"><img src='${image}' alt="profile pic" width="50px" height="50px" class="rounded-circle shadow-sm"/></div>
                    <div class="members_name col-4">
                       ${members_name}
                    </div>
                    <div class="col-4">${designation}</div>
                </div>
                </li>
            </ul>
        </div> `;
        }

       

    }
})