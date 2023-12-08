'use strict';

/* globals define */

define('forum/communitybuilder/comm',['api'], function (api) {
    var comm = {};


    comm.init = function(){

        
        $('[postBtn]').on('click',function(){

            
            let payload = {};

            let question = $('#posts').val();
            if(question !==''){
                
                payload.uid = ajaxify.uid;
                payload.question = ajaxify.question;

                
                
                
                
                api.post('/communitybuilder', payload)
                .then((payload) =>{
                    console.log(payload)
                }).catch((err)=>{
                    console.log(err)
                })
                
            }else{
                alert('The textbox is empty!')
            }
        })


        // Integrating the apis
		// $(".create-quiz").on("click", function(){
		// 	let payload = data.getJSON();
		// 	console.log(payload);
		// 	api.post('/socialquiz/quiz', payload)
		// 	.then((data) =>{
		// 		console.log(data)
		// 	}).catch((err)=>{
		// 		console.log(err)
		// 	})
		// })
    };
    return comm;
});
