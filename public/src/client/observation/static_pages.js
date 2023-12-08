'use strict';

/* globals define */

define('forum/observation/static_pages', [
    'api',
    'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js'
], function (api) {
	var staticPages = {};

    staticPages.init = function () {
        var selectPageData = {};
		var content = '';
        const {pageInfo={}} = ajaxify.data;

        if (pageInfo) {
            selectPageData = pageInfo;

			if (pageInfo.content) {
				content = pageInfo.content;
			}
        }

        $("#content-area").tinymce({
			height: 600,
			menubar: true,
			branding: false,
            defaultValue: content,
			paste_data_images: true,
			automatic_uploads: true,
			file_picker_types: "image",
			file_picker_callback: function (
				callback,
				value,
				meta
			  ) {
				// Provide file and text for the link dialog
				var input = document.createElement("input");
				input.setAttribute("type", "file");
				input.setAttribute("accept", "image/*");
				input.onchange = function () {
				  var file = this.files[0];
		
				  var reader = new FileReader();
				  reader.onload = function () {
					var id = "blobid" + new Date().getTime();
					var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
					var base64 = reader.result.split(",")[1];
					var blobInfo = blobCache.create(
					  id,
					  file,
					  base64
					);
					blobCache.add(blobInfo);
					callback(blobInfo.blobUri(), {
					  title: file.name,
					});
				  };
				  reader.readAsDataURL(file);
				};
		
				input.click();
			  },
			plugins: [
			  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
			  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
			  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
			],
			toolbar: 'undo redo fullscreen image | blocks | bold italic backcolor | ' +
			  'alignleft aligncenter alignright alignjustify | ' +
			  'bullist numlist outdent indent | removeformat | help'
		  });

        $('#staticPage').on('change', function () {
            let name = $(this).val();

            api.get('/observation/page/' + name, {})
                .then((resp) => {
                    selectPageData = resp;
                    $("#content-area").val(resp.content || '');
                })
                .catch((err) => notify(err.message, 'error'));
        });

        $('#reflection-form').on('submit', function (e) {
            e.preventDefault();
            // notify('Please wait...', 'info');

            let content = $('#content-area').val();
            let name = $('#staticPage').val()
            let url = selectPageData.name ? ['/observation/page/', selectPageData.slug].join('') : '/observation/page';

            api[selectPageData.name ? 'put' : 'post'](url, {content, name})
                .then(() => {
                    setTimeout(() => location.reload(), 1000);
                    notify('Updated successfully!', 'success');
                })
                .catch((err) => notify(err.message, 'error'));
        })
    }

    return staticPages;
})