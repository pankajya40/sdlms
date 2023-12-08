'use strict';


/* globals define */

define("forum/socialquiz/mcq/single", [
    "forum/socialquiz/mcq/form",
    'api'
], function (Form,api) {
    
    let single = {};
    single.mcq = {};
    single.init = function(){
        console.log("create init");
        single.mcq = ajaxify.data.mcq;
        Form.init(single.mcq);
        Form.lock();
        single.events();
    }

    single.events = function(){
        Form.$elem.on('submit', function (e) {
            e.preventDefault();
            if(!ajaxify.data.update) return alert('You can not update this mcq');

            let data = Form.getQuestions();
            Form.lock();
            
            api.put(`/socialquiz/mcq/${single.mcq._id}`, data)
            .then(function (response) {
                // ajaxify.go('/mcq/' + _id);
                console.log(response);
            }).catch(function (err) {
                console.log(err);
            }).finally(function () {
                Form.unlock();
            });
        });
    }

   
    return single;

});
