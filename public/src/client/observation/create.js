'use strict';

/* globals define */

define('forum/observation/create', [
    'api',
    'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js'
], function (api) {
	var create = {};

    create.init = function () {
        const {observationDetails, MAX_WORDS} = ajaxify.data;

        $("#content-area").tinymce({
            height: 400,
            width: '100%',
            menubar: false,
            branding: false,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime','table', 'code', 'wordcount'
            ],
            toolbar: 'undo redo fullscreen link | bold italic | ' +
                'bullist numlist outdent indent | removeformat'
        });

        $('#submit-reflection').on('click', function () {
            let content = $('#content-area').val();
            const {_id} = observationDetails;

            if (create.getEditorWordsCount() < MAX_WORDS) {
                return notify(`The reflection needs to be atleast of ${MAX_WORDS} words`, 'error');
            }

            api.post('/observation/reflection', {content, observationDetails: _id})
                .then(() => {
                    setTimeout(() => ajaxify.go('/observation/reflections'), 1000);
                    notify('Reflection created successfully!', 'success');
                })
                .catch((err) => notify(err.message, 'error'));
        })
    }

    create.getEditorWordsCount = function () {
        var editor = tinymce.activeEditor.plugins.wordcount;
        return editor.body.getWordCount();
    }

    return create;
})