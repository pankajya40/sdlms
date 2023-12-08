'use strict';

define('forum/sdlms/communication/template', [
    "api",
    'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js'
], function (api) {
	var template = {};
	template.init = function () {
        const {templateData} = ajaxify.data;

        if (templateData && templateData.compatibleChannel) {
            console.log(`[value="${templateData.compatibleChannel}"]`);
            $('#compatibleChannel').find(`[value="${templateData.compatibleChannel}"]`).attr('selected', true);
        }

        $("#template-content").tinymce({
            height: 500,
            menubar: true,
            branding: false,
            paste_data_images: true,
            automatic_uploads: true,
            file_picker_types: "image",
            setup: function (editor) {
                editor.on('init', function (e) {
                    if (templateData && templateData.content) {
                        tinymce.activeEditor.setContent(templateData.content);
                    }
                });
            },
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
                        var blobCache =
                            window.tinymce.activeEditor.editorUpload
                                .blobCache;
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
                'insertdatetime', 'media', 'table', 'code', 'wordcount'
            ],
            toolbar: 'undo redo fullscreen link media | blocks | bold italic backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | removeformat | help'
        });

        $('#save-template').off().on('click', function () {
            const matchVariables = /(?<=\{{)(.*?)(?=\}})/gi

            let templateContent = $('#template-content').val();
            let templateName = $('#templateName').val();
            let compatibleChannel = $('#compatibleChannel').val();

            let variables = templateContent.match(matchVariables);

            let payload = {
                templateName,
                entities: variables || [],
                context: 'none',
                compatibleChannel,
                content: templateContent,
                status: 'public'
            }

            let url = '/communication/template';
            let isEditing = templateData && templateData._id;

            url = isEditing ? ['/communication/template/', templateData._id].join('') : url;

            api[isEditing ? 'put' : 'post'](url, payload)
                .then((el) => {
                    if (isEditing) {
                        setTimeout(() => location.reload(), 1000);
                        return notify('Created successfully!', 'success');
                    }
                    setTimeout(() => location.href = '/communication/templates', 1000);
                    notify('Saved successfully!', 'success');
                })
                .catch((el) => {
                    notify(er.message, 'error');
                })
            
        });
	
	};
	return template;
}
);
