'use strict';
/**
    * @author Alex
    * @description Dashboard for quiz with Clone and Delete functionality
    */


/* globals define */

define("forum/socialquiz/dashboard", ["api", "sdlms/table"], function (api) {
    let dashboard = {};
    dashboard.table = null;  // Table object
    dashboard.CLONING = false; // Flag to check if cloning is in progress
    dashboard.DELETING = false; // Flag to check if deleting is in progress
    const RECORDS_PER_PAGE = 20; // Number of records to show per page

    dashboard.init = function () {
        this.renderQuiz();
    }

    dashboard.getActions = function (id) {

        // Return html for actions
        return `<div class="nowrap"><i class="fas fa-edit mr-2" edit data-id="${id}"></i>
        <i class="fas fa-copy  mr-2" clone data-id="${id}"></i>
        <i class="fas fa-trash" delete data-id="${id}"></i></div>
                `
    }

    dashboard.renderQuiz = function () {

        // Render table
        this.table = new Table({
            target: "#quiz-table",
            columns: [
                { title: 'S.No', value: 'table' },
                { title: 'Title', value: 'title' },
                { title: 'Questions', value: 'questions' },
                { title: 'Responses', value: 'responseCount' },
                { title: 'Created At', value: 'createdAt' },
                { title: 'Actions', value: 'Action' },
            ],
            formatter: dashboard.formatter,
        });

        // Render table
        this.events();

        // Render table
        this.table.render('/socialquiz/quiz?limit=' + RECORDS_PER_PAGE);
    }

    dashboard.formatter = function (data, from = 0) {

        dashboard.quizes = [(dashboard.quizes || []), ...data];

        // Format data for table
        return data.map(function (row, index) {
            let { _id, title, questions = [], responseCount = 0, createdAt, startedAt = moment(), endedAt = moment().add(3, 'days') } = row;
            return {
                attributes: {},
                data: {
                    Sno: `${(from + (index + 1))}`,
                    title: `<div class="text-left nowrap">${title || 'Untitled Quiz'}</div>`,
                    questions: questions.length,
                    responseCount: `<a href="#" data-id="${_id}" show-response>${responseCount}</a>`,
                    createdAt: `${moment(createdAt).format("DD MMM, YYYY, hh:mm A")}`,
                    action: dashboard.getActions(_id)
                }
            }
        })
    }

    dashboard.events = function () {


        // Edit quiz
        $(this.table.target).off('click', '[edit]')
            .on('click', '[edit]', function () {
                let id = $(this).data('id');
                ajaxify.go(`/quizzes/${id}`);
            });

        // Delete quiz
        $(this.table.target).off('click', '[delete]')
            .on('click', '[delete]', function () {
                let id = $(this).data('id');

                // Check if quiz is already being deleted
                if (dashboard.DELETING) return alert('Please wait while we delete the quiz');

                // Confirm delete
                if (!confirm('Are you sure you want to delete this quiz?')) return;

                // Set flag to true
                dashboard.DELETING = true;
                api.del(`/socialquiz/quiz/${id}`, {}, function (err, data) {

                    // Set flag to false
                    dashboard.DELETING = false;
                    if (err) return console.log(err);
                    dashboard.table.refresh();
                });

            });


        // Clone quiz
        $(this.table.target).off('click', '[clone]')
            .on('click', '[clone]', function () {
                let id = $(this).data('id');

                // Check if quiz is already being cloned
                if (dashboard.CLONING) return alert('Please wait while we clone the quiz');

                // Confirm clone
                if (!confirm('Are you sure you want to clone this quiz?')) return;

                dashboard.CLONING = true;

                // Clone quiz
                api.post(`/socialquiz/quiz/${id}/clone`, {}, function (err, data) {
                    dashboard.CLONING = false;
                    if (err) return console.log(err);

                    // Redirect to edit page
                    ajaxify.go(`/quizzes/${data._id}`);
                });
            });

        $(this.table.target).off('click', '[show-response]')
            .on('click', '[show-response]', function () {
                let id = $(this).data('id');
                let quiz = dashboard.quizes.find(q => q._id === id);
                if(!quiz) return;

                if(!quiz.responseCount) return alert('No responses found');

                let attachmentId = quiz.attachedTo && quiz.attachedTo[0];
                if(!attachmentId) return;

                let QuizInstance = new Quiz(attachmentId);
                QuizInstance.state('show');
                window.Quiz.listeners(QuizInstance);
                
            });
    }

    return dashboard;
});
