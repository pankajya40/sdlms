'use strict';


/* globals define */

define("forum/socialquiz/single", [
    "forum/socialquiz/form",
    'api'
], function (Form,api) {
    
    let single = {};
    single.quiz = {};
    single.init = function(){
        console.log("create init");
        single.quiz = ajaxify.data.quiz;
        Form.init(single.quiz);
        !ajaxify.data.update && Form.lock();
        single.events();
    }

    single.events = function(){
        Form.$elem.on('submit', function (e) {
            e.preventDefault();
            if(!ajaxify.data.update) return alert('You can not update this quiz');

            let data = Form.getQuestions();
            Form.lock();
            
            api.put(`/socialquiz/quiz/${single.quiz._id}`, data)
            .then(function (response) {
                // ajaxify.go('/quiz/' + _id);
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
