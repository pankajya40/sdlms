'use strict';

/* globals define */

define('forum/socialquiz/creator/select',["api","https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.full.js"],function (api) {
	var select = {};
	select.init = () => {

        $('[quiz-dropdown]').select2({
            containerCssClass: "custom-container shads-light border-0",
            dropdownCssClass: "custom-dropdown shads-light border-0",
            theme: "classic",
            placeholder: "Choose Quiz to be Associated...",

                ajax: {
                    url: '/api/v3/socialquiz/publish?limit=10',
                    dataType: 'json',
                    data: function (params) {
                        var query = {
                            title: params.term,
                            status: "published"
                        }
                        return query;
                    }, 
                    processResults: function (data) {
                        return {
                            results: data.response.data.map((item,index)=>{
                                $("[moveToControls]").removeAttr('disabled');
                                return {
                                    id:item.pid,
                                    text:item.quizDetail.title
                                }
                            })
                        };
                    }
                }
            });

        $(".sdlms-section").on("select2:select", function () {
            let pid = $('[quiz-dropdown]').val()
            
        $("#moveToControls").on("click", function(){
            // api.put('socialquiz/start',{}) // still to complete this part // work later
            // .then(res=>console.log(res))
            // .error(err=>console.log(err))
            api.post('/socialquiz/clone', { pid })
            .then((res) => {
                console.log(res)
                ajaxify.go(`/socialquiz/creator/control/${res._id}`);
            }).error((err) => { console.log(err); });

            // ajaxify.go(`/socialquiz/creator/control/${pid}`)
        })
        });
      
        $(".back-btn").on("click", function () {
			ajaxify.go(`/socialquiz/creator/dashboard`)
		});

    };
	return select;
});
