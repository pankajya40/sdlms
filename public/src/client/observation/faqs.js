'use strict';

/* globals define */

define('forum/observation/faqs', [
    'api',
    'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js'
], function (api) {
	var faqs = {};

    faqs.init = function () {
        var faqs = {};
        console.log('FAQs');
        $('.faq-container').addClass('container');
    }
    return faqs;
})