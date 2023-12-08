'use strict';
/**
    * @author Alex
    * @description Dashboard for mcq with Clone and Delete functionality
    */


/* globals define */

define("forum/socialquiz/mcq/dashboard", ["api", "sdlms/table"], function (api) {
    let dashboard = {};
    dashboard.table = null;  // Table object
    dashboard.CLONING = false; // Flag to check if cloning is in progress
    dashboard.DELETING = false; // Flag to check if deleting is in progress
    const RECORDS_PER_PAGE = 20; // Number of records to show per page

    dashboard.init = function () {
        console.log("mcq dashboard init");
        this.renderQuiz();
    }

    dashboard.getActions = function (id) {

        // Return html for actions
        return `<div class="nowrap">
        <i class="fas fa-share-alt mr-2" share data-id="${id}"></i>
        <i class="fas  fa-eye mr-2" edit data-id="${id}"></i>
        <i class="fas fa-copy  mr-2" clone data-id="${id}"></i>
        <i class="fas fa-trash" delete data-id="${id}"></i></div>
                `
    }

    dashboard.renderQuiz = function () {

        // Render table
        this.table = new Table({
            target: "#mcq-table",
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
        this.table.render('/socialquiz/mcq?limit=' + RECORDS_PER_PAGE);
    }

    dashboard.formatter = function (data, from = 0) {

        dashboard.mcqs = [(dashboard.mcqs || []), ...data];

        // Format data for table
        return data.map(function (row, index) {
            let { _id, title, questions = [], responseCount = 0, createdAt } = row;
            return {
                attributes: {},
                data: {
                    Sno: `${(from + (index + 1))}`,
                    title: `<div class="text-left nowrap">${title || 'Untitled mcq'}</div>`,
                    questions: questions.length,
                    responseCount: `<a href="#" data-id="${_id}" class="download-response">${responseCount}</a>`,
                    createdAt: `${moment(createdAt).format("DD MMM, YYYY, hh:mm A")}`,
                    action: dashboard.getActions(_id)
                }
            }
        })
    }

    

    dashboard.events = function () {


        // Edit mcq
        $(this.table.target).off('click', '[edit]')
            .on('click', '[edit]', function () {
                let id = $(this).data('id');
                ajaxify.go(`/mcq/${id}`);
            });

        // Delete mcq
        $(this.table.target).off('click', '[delete]')
            .on('click', '[delete]', function () {
                let id = $(this).data('id');

                // Check if mcq is already being deleted
                if (dashboard.DELETING) return alert('Please wait while we delete the mcq');

                // Confirm delete
                if (!confirm('Are you sure you want to delete this mcq?')) return;

                // Set flag to true
                dashboard.DELETING = true;
                api.del(`/socialquiz/mcq/${id}`, {}, function (err, data) {

                    // Set flag to false
                    dashboard.DELETING = false;
                    if (err) return console.log(err);
                    dashboard.table.refresh();
                });

            });


        // Clone mcq
        $(this.table.target).off('click', '[clone]')
            .on('click', '[clone]', function () {
                let id = $(this).data('id');

                // Check if mcq is already being cloned
                if (dashboard.CLONING) return alert('Please wait while we clone the mcq');

                // Confirm clone
                if (!confirm('Are you sure you want to clone this mcq?')) return;

                dashboard.CLONING = true;

                // Clone mcq
                api.post(`/socialquiz/mcq/${id}/clone`, {}, function (err, data) {
                    dashboard.CLONING = false;
                    if (err) return console.log(err);

                    // Redirect to edit page
                    ajaxify.go(`/mcq/${data._id}`);
                });
            });

        // Share mcq
        $(this.table.target).off('click', '[share]')
            .on('click', '[share]', function () {
                let id = $(this).data('id');
                app.copyText(`${window.location.origin}/mcq/submit/${id}`)
            });


        // Download responses
        $(this.table.target).off('click', '.download-response')
            .on('click', '.download-response', function () {
                let id = $(this).data('id');
                window.open(`/mcq/responses/${id}`, '_blank');
            });

       
    }

    return dashboard;
});
