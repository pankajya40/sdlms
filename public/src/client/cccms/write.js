'use strict';

/* globals define */

define('forum/cccms/write', ["api",
'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js', 
'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js'], function () {
	var requests = {};

    requests.init = function () {
        console.log('working my G')
		$('.backToDash').on('click', function (){
            ajaxify.go(`/cccms/`)
        })

        $('.discript-textarea').on('keyup', function () {
			var characterCount = $(this).val().length;
			var current = $('#current');
			var maximum = $('#maximum');
			var theCount = $('#the-count');

			current.text(characterCount);
		});

        $(`#pDescription`).tinymce({
			height: 300,
      width: 1175,
			menubar: false,
			branding: false,
			paste_data_images: false,
			automatic_uploads: false,
			plugins: [
			  'advlist', 'autolink', 'lists', 'link', 'charmap',
			  'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
			  'insertdatetime', 'wordcount'
			],
			toolbar: 'undo redo fullscreen | blocks | bold italic backcolor | ' +
			  'alignleft aligncenter alignright alignjustify | ' +
			  'bullist numlist outdent indent | removeformat'
		  });

    }

	return requests;
})