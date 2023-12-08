'use strict';

 /**
     * @author Alex
     * @description   creating quiz
     */
    

/* globals define */

define("forum/socialquiz/mcq/create", [
    "forum/socialquiz/mcq/form",
    'api'
], function (Form,api) {
    
    let mcq = {};
    mcq.init = function(){
        console.log("create init");

        // Initialize form
        Form.init();
        this.events();
    }

    mcq.events = function(){

        // Submit form
        Form.$elem.on('submit', function (e) {
            e.preventDefault();
            let data = Form.getJSON();
            Form.lock();
            
            api.post('/socialquiz/mcq', data)
            .then(function ({_id}) {
                ajaxify.go('/mcq/' + _id);
            }).catch(function (err) {
                console.log(err);
            }).finally(function () {
                Form.unlock();
            });
        });
    }

    return mcq;

});
