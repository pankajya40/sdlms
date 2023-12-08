'use strict';

 /**
     * @author Alex
     * @description   creating quiz
     */
    

/* globals define */

define("forum/socialquiz/create", [
    "forum/socialquiz/form",
    'api'
], function (Form,api) {
    
    let create = {};
    create.init = function(){
        console.log("create init");

        // Initialize form
        Form.init();
        Form.addQuestion();
        this.events();
    }

    create.events = function(){

        // Submit form
        Form.$elem.on('submit', function (e) {
            e.preventDefault();
            let data = Form.getQuestions();
            Form.lock();
            
            api.post('/socialquiz/quiz', data)
            .then(function ({_id}) {
                ajaxify.go('/quiz/dashboard');
            }).catch(function (err) {
                console.log(err);
            }).finally(function () {
                Form.unlock();
            });
        });
    }

    return create;

});
