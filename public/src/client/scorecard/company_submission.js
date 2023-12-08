
"use strict";

/* globals define */

define("forum/scorecard/company_submission", [
    'https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/js/jquery.dataTables.min.js',
], function () {
	var company_submission = {};

	company_submission.init = () => {

        const $target = $('#submissions-table');

        $('#download-report').on('click', function () {
            notify('Starting download...', 'info');

            let path = location.pathname.split('/');
            let orgname = path[path.length - 1];
            let filename = [orgname, Date.now(), 'report.csv'].join('_');

            $target.tableHTMLExport({type: 'csv', filename});
        });

        if (ajaxify.data.headers.length > 3) {
            $target.DataTable({
                dom: 'Bfrtip',
                scrollX: true,
                scrollY: 480,
                scrollCollapse: true,
                paging: false,
                scroller: true, 
                fixedColumns: true,
                responsive: true
            });
        }

    }

	return company_submission;
});
