'use strict';

/**
    * @author Alex
    * @description Form for creating mcq
    */

/* globals define */

define("forum/socialquiz/mcq/form", [], function () {

    let form = {};
    form.cache = {}; // Cache for select2
    form.$elem = null;   // jQuery element of the form
    form._id = null;   // mcq id
    form.quizzes = []; // Objects of quizzes
    form.$questions = null; // jQuery element of options
    form.searches = []; // Array of searches
    form.selectedQuizId = null; // Selected quiz
    const DEFAULT_NUMBER_OF_OPTIONS = 4; // Number of options

    form.init = function (mcq = {}) {
        this.$elem = $('#mcqForm');
        this.mcq = mcq;
        this._id = mcq._id;
        this.setData(); // Set data if mcq is already created
        this.events(); // Attach events
    }

    form.events = function () {

        const self = this;
        if(this._id ) return;
        // Add question
        this.$elem.on('click', '[add-question]', function (e) {
            e.preventDefault();
            form.addQuestion();
        });

         // Add question
         this.$elem.on('click', '[add-options]', function (e) {
            e.preventDefault();
            form.addOption($(this).parents('[question-container]').first());
        });

        // Remove question
        this.$elem.on('click', '[remove-question]', function (e) {
            e.preventDefault();

            // Check if atleast one question is present
            if (form.$elem.find('[questions] [question]').length == 1) return alert('You must have atleast one question');
            $(this).parents('[question]').first().remove();

            // Update index
            $('[question-index]').each(function (index, elem) {
                $(elem).text(index + 1);
            });
        });

         // Remove options
         this.$elem.on('click', '[remove-option]', function (e) {
            e.preventDefault();

            // Check if atleast one question is present
            if ($(this).parents('[question-options]').find('[options]').length < 4) return alert('You must have atleast 3 options');

            $(this).parents('[options]').first().attr('removed', 1)

            // Update index            
            $(this).parents('[question-options]')
            .find('[options]:not([removed="1"]) [option-index]').each(function (index, elem) {
                console.log(index, elem);
                $(elem).text(index + 1);
            });

            $(this).parents('[options]').first().remove();
        });

        // quiz select2
        this.$elem.find('[select2="quiz"]').select2({
            ajax: {
                url: ('/api/v3/socialquiz/quiz' +( this.mcq._id ? ('/' + this.mcq._id) : '')),
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        query: params.term, // search term
                        hasResponse: true,
                    };
                },
                processResults: function (data, params) {
                    let results = {
                        results: data.response.data.map(function (row) {
                            return {
                                id: row._id,
                                text: row.title
                            }
                        }).filter(e => e)
                    };
                    self.searches.push(...results.results);
                    return results;
                }
            }
        });

        // select event
        this.$elem.find('[select2="quiz"]').on('select2:select', async function (e) {

            if (self.selectedQuizId &&
                self.$elem.find('[questions] [question]').length &&
                !confirm('Are you sure you want to change the quiz?')
            ) {
                return $(this).val(self.selectedQuizId).trigger('change');
            }

            let data = e.params.data;
            let id = data.id;
            let cache = self.cache;
            self.selectedQuizId = id;

            if (cache[id]) return self.prepareTemplate(id);

            let responses = await self.getQuestions(id);
            responses = self.formatResponse(responses);
            cache[id] = responses;

            self.prepareTemplate(id);

        });

        // unselect event

        this.$elem.find('[select2="quiz"]').on('select2:unselect', function (e) {
            let data = e.params.data;
            let id = data.id;
            self.quizzes = self.quizzes.filter(e => e != id);
        });

        this.$elem.off('select2:select', '[select2="option"]')
            .on('select2:select', '[select2="option"]', function (e) {
                let data = e.params.data;
                let id = data.id;
                if(id != '0') return;
               
                let select2 = $(this).parents('[options]').first().find('[select2="option"]');
                select2.select2('destroy');

                let name = select2.attr('name');
                select2.replaceWith(`<input type="text" name="${name}" required placeholder="Write here" class="form-control" />`);
                // destroy select2
            });

            this.$elem.off('select2:select', '[select2="question"]')
            .on('select2:select', '[select2="question"]', function (e) {
                let data = e.params.data;
                let id = data.id;
                if(id != '0') return;
               
                let select2 = $(this).parents('[question]').first().find('[select2="question"]');
                select2.select2('destroy');

                let name = select2.attr('name');
                select2.replaceWith(`<input type="text" name="${name}" required placeholder="Write here" class="form-control" />`);
                // destroy select2
            });

    }

    // prepare template
    form.prepareTemplate = function (id) {

        let responses = this.cache[id];
        if (!responses) return;
        $('[questions]').html('');
        this.quizzes.push(id);
        this.setQuestionsHTML();
        this.setOptionsHTML();
        this.addQuestion();


    }


    // form format response 
    form.formatResponse = function (response) {
        // group the answers by question 
        let answers = response.reduce((acc, answer) => {
            answer.questions.forEach(question => {
                if (!acc[question.questionId]) {
                    acc[question.questionId] = {
                        question: question.question,
                        answers: [],
                        title: this.searches.find(e => e.id == answer._key.split(':')[1]).text
                    }
                }
                acc[question.questionId].answers.push({
                    content: question.answer,
                    user: answer.createdBy || {},
                    title: this.searches.find(e => e.id == answer._key.split(':')[1]).text
                });
            });
            return acc;
        }, {});

        return answers;

    }


    
    // Get form data
    form.getJSON = function () {

        return this.$elem.serializeObject();

    }


    form.getQuestions = async function (quizId) {
        let resp = null;

        try {

            // Answer the question
            resp = await doAjax({
                url: `/socialquiz/quiz/${quizId}/responses/`,
                data: {
                    populate: 'createdBy:user'
                }
            });

            resp = resp.response.data;
        } catch (error) {
            console.error(error);
        }

        return resp;


    }


    // Add question
    form.addQuestion =  (data) => {

        form.$elem.find('[questions]').append(form.template().questions(data));
        $('[select2="question"]').last().select2();

        for (let index = 0; index < (data ? data.options.length: DEFAULT_NUMBER_OF_OPTIONS); index++) {
            form.addOption(form.$elem.find('[questions] [question-container]').last(), (data ? data.options[index] : null));    
        }
       

    }


    form.addOption = function ($elem,data) {
        $elem.find('[question-options]').append(form.template().options($elem,data));
        $elem.find('[select2="option"]').last().select2();
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


        if (!this.mcq._id) return;
        this.$elem.find('[name="title"]').val(this.mcq.title);
        this.mcq.questions.forEach(this.addQuestion);

    }

    form.setQuestionsHTML = function () {

        // Get questions html
        let html = '';

        let questions = this.cache[this.selectedQuizId];
        console.log(this.selectedQuizId, questions);
        if (!questions) return html;

        // Add questions to html
        Object.keys(questions).forEach(questionId => {
            // add quiz
            html += `<option data-question-id="${questionId}" value="${questions[questionId].question}">${questions[questionId].question}</option>`;
        });
        html += `<option data-question-id="0" value="0">Custom</option>` ;
        this.questionHTML = html;

    }

    form.setOptionsHTML = function () {

        // Get options html
        let html = '';

        let questions = this.cache[this.selectedQuizId];
        if (!questions) return html;

        // Add Options to html
        Object.keys(questions).forEach(questionId => {
            questions[questionId].answers.filter(answer => $.trim(answer.content || '')).forEach(answer => {
                html += `<option data-question-id="${questionId}" value="${answer.content}">${answer.content}</option>`;
            });
        });
        html += `<option data-question-id="0" value="0">Custom</option>` ;
        this.optionHTML = html;


    }


    // Template for question
    form.template = function () {
        return {
            questions: (data={}) => {
                data.index = data.index || $('[question]').length;

                return `<div class="card mb-3" question-container>
                         <div class="input-group mb-3" question>
                             <div class="input-group-prepend">
                                 <span class="input-group-text" question-index>${data.index + 1}</span>
                             </div>
                             <select class="form-control" select2="question" name="questions[${data.index}][title]">
                              ${data.title ? '<option value="'+data.title+'" selected>'+data.title+'</option>' : ''}
                                 ${this.questionHTML}
                             </select>
                             <div class="input-group-append cursor-pointer" remove-question>
                                 <span class="input-group-text"><i class="fa fa-trash"></i></span>
                             </div>
                         </div>
                         <label class="pl-3 d-flex justify-content-between">
                            <span>Options</span>
                            <span>
                                <div class="form-check form-check-inline">
                                  <input class="form-check-input" type="checkbox" ${data.isRequired ? 'checked="true"' : ""} name="questions[${data.index}][isRequired]" id="required_questions[${data.index}][isRequired]" value="1">
                                  <label class="form-check-label" for="required_questions[${data.index}][isRequired]">Required</label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input class="form-check-input" type="checkbox" ${data.isMultiple ? 'checked="true"' : ""} name="questions[${data.index}][isMultiple]" id="required_questions[${data.index}][isMultiple]" value="1">
                                  <label class="form-check-label" for="required_questions[${data.index}][isMultiple]">Multiple</label>
                                </div>
                            </span>
                        </label>
                         <div class="d-flex flex-wrap px-3" question-options>
                             
                         </div>
                         <div class="form-group col-12 d-flex justify-content-end">
                             <button type="button" class="btn btn-primary" add-options>Add Options</button>
                         </div>
                      </div>
        `
            },
            options: ($parent,data={}) => {
                data = data || {};
                data.index = data.index || $parent.find('[options]').length;
                data.question = data.question || {};
                data.question.index = data.question.index || $parent.closest('[question-container]').index();
              
                return `<div class="input-group w-100 mb-3" options>
            <div class="input-group-prepend">
                <span class="input-group-text" option-index>${data.index + 1}</span>
            </div>
            <select class="form-control" select2="option" name="questions[${data.question.index}][options][${data.index}][option]">
                ${data.option ? '<option value="'+data.option+'" selected>'+data.option+'</option>' : ''}
                ${this.optionHTML}
            </select>
            <div class="input-group-append cursor-pointer" remove-option>
                <span class="input-group-text"><i class="fa fa-trash"></i></span>
            </div>
         </div>`
            }
        }
    }
    return form;

});
