'use strict';

/**
    * @author Alex
    * @description Form for creating quiz
    */

/* globals define */

define("forum/socialquiz/form", [], function () {

    let form = {};
    form.$elem = null;   // jQuery element of the form
    form._id = null;   // Quiz id
    form.init = function (quiz = {}) {
        this.$elem = $('#quizForm');
        this.quiz = quiz;
        this.setData(); // Set data if quiz is already created
        this.events(); // Attach events
    }

    form.events = function () {

        // Add question
        this.$elem.on('click', '[add-question]', function (e) {
            e.preventDefault();
            form.addQuestion();
        });

        // Remove question
        this.$elem.on('click', '[remove]', function (e) {
            e.preventDefault();

            // Check if atleast one question is present
            if (form.$elem.find('[questions] [question]').length == 1) return alert('You must have atleast one question');
            $(this).parents('[question]').first().remove();

            // Update index
            $('[index]').each(function (index, elem) {
                $(elem).text(index + 1);
            });
        });

       
    }

    // Get form data
    form.getQuestions = function () {
        return this.$elem.serializeObject();
    }


    // Add question
    form.addQuestion = function (data = {}) {

        form.$elem.find('[questions]').append(form.template({ index: data.index || form.$elem.find('[questions] [question]').length, ...data }).questions);
    }

    form.lock = function () {

        // Disable all inputs
        this.$elem.find('input,button').attr('disabled', true);
    }

    form.unlock = function () {

        // Enable all inputs
        this.$elem.find('input,button').attr('disabled', false);
    }

    form.setData = function () {


        if (!this.quiz._id) return;
        this.$elem.find('[name="title"]').val(this.quiz.title);
        (this.quiz.questions || []).forEach(this.addQuestion);
    }

    // Template for question
    form.template = function (data = {}) {
        return {
            questions: `<div class="input-group mb-3" question>
                           <div class="input-group-prepend">
                             <span class="input-group-text" index>${data.index + 1}</span>
                           </div>
                           <input type="text" required name="questions[${data.index}][question]" value="${data.question || ''}" class="form-control w-80" placeholder="Enter Question" />
                           <input type="number" min="1" required name="questions[${data.index}][duration]" value="${data.duration || ''}" class="form-control" placeholder="Duration" />
                           <div class="input-group-append cursor-pointer" remove>
                              <span class="input-group-text" ><i class="fa fa-trash"></i></span>
                           </div>
                         </div> `
        }
    }
    return form;

});
