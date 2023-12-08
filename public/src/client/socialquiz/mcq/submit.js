'use strict';

 /**
     * @author Alex
     * @description   submit MCQ
     */
    

/* globals define */

define("forum/socialquiz/mcq/submit", [
    'api'
], function (api) {
    
    let mcq = {};
    mcq.init = function(){
        console.log("create init");
        this.events();
    }

    mcq.events = function(){

       

        $('#submitMCQ').on('submit', function (e) {
            e.preventDefault();
            $('#submitMCQ').find('button[type="submit"]').attr('disabled',true);
            let data ={
                questions: ajaxify.data.mcq.questions,
                title: ajaxify.data.mcq.title,
            };
            let error = false;
            data.questions.forEach((question,index) => {
                let $question = $(`[question="${index}"]`);
                question.options.forEach((option,optionIndex) => {
                    let $option = $question.find(`[options="${optionIndex}"]`);
                    option.selected = $option.is(':checked') ? 1 : 0;
                });
                error = question.isRequired && !question.options.filter(option => option.selected).length;
            });
            if(error) alert('Please Fill All Required Fields');

            mcq.isSubmitting = true;
            api.post(`/socialquiz/mcq/${ajaxify.data.mcq._id}/answer`, data)
            .then(function (data) {
                notify('Answer Submitted','success');
            }).catch(function (err) {
                console.log(err);
                notify(err.message,'error');
                $('#submitMCQ').find('button[type="submit"]').attr('disabled',false);

            }).finally(function () {
                mcq.isSubmitting = false;
            });

        });
    }

    return mcq;

});
