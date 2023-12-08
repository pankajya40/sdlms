"use strict";

/* globals define */

define("forum/scorecard/submissions", ['api'], function (api) {
	var submissions = {};

	submissions.init = () => {
        let params = app.getQueryParams(location.href.split('?')[1] || '');
        params = {...params,...(ajaxify.data.params || {})};
        
        let $filterForm = $('#filter');

        Object.keys(params).forEach(key =>{
            $filterForm.find(`[name="${key}"]`).val(params[key])
        })
       

		$("#org-filter").off('change').on('change', function () {
			let data = $filterForm.serializeObject();
            ajaxify.go(`/scorecard/happiness/submissions?${$.param(data)}`)
		});

		let urlObj = submissions.URLSearchParamsToJSON(location.href);
		if (urlObj['org']) {
			$('#org-filter').find(`[value="${urlObj['org']}"]`).attr('selected', true);
		}
	}

	submissions.URLSearchParamsToJSON = (str) => {
		var searchParams = new URLSearchParams(str);
		return Object.fromEntries([...searchParams]);
	}

 

	return submissions;
});