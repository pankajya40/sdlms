'use strict';

/* globals define */

define('forum/observation/videoref/reflect', [
    'api',
    'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js'
], function (api) {
	var reflect = {};

    reflect.init = function () {
        const {company, reflection} = ajaxify.data;
        const AUTOSAVE_INTERVAL = 5000;

        let {videoId} = company;

        if (!Array.isArray(videoId)) {
            videoId = [videoId];
        }
        
        videoId.map((l) => {
            $('.video-container').append(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${l}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
        });

        const {profile, MIN_WORDS} = ajaxify.data;

        $(".reflection").tinymce({
            height: 400,
            width: '100%',
            menubar: false,
            branding: false,
            responsive: true,
            plugins: ['wordcount'],
            placeholder: 'Type here to get started...',
            setup: function(editor) {
                editor.shortcuts.add('ctrl+shift+i', "Disable browser dev tools", function() {
                    app.notifyUser("Browser development tools are disabled for this window");
                });

                editor.on('keyup', debounce(function(e) {
                    const {email, _id} = profile;

                    api.post('/observation/videoref/reflection', {reflection: editor.getContent(), email, profileId: _id})
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => app.notifyUser(err.message, 'error'));
                }, AUTOSAVE_INTERVAL));
            },
            paste_preprocess: function (plugin, args) {
                // replace copied text with empty string
                args.content = '';

                app.notifyUser("Blocked attempt to paste content");
                console.log("Blocked attempt to paste content");
            },
            toolbar: false
        });

        reflect.attachKeyboardAndMouseBlockEvents();

        $('body').on('keyup', function (e) {
            if (e.key == 'Escape' && !$('[enter-fullscreen]').hasClass('show')) {
                $('[enter-fullscreen]').trigger('click');
            }
        });

        $('[enter-fullscreen]').off().on('click', function () {
            $('.reflection-section').toggleClass('fullscreen');
            $(this).toggleClass('show');

            if ($(this).hasClass('show')) {
                $(this).find('img').hide();
                $(this).find('i').show();

                $('[fullscreen-text]').css({display: 'none'});
            } else {
                $(this).find('img').show();
                $(this).find('i').hide();

                $('[fullscreen-text]').css({display: 'flex'});
            }
        });

        $('#submit-reflection').on('click', function () {
            $('[data-target="#hyginecheckModal"]').trigger('click');
        });

        $('#submit-checklist-form').on('click', function () {
            let checkedItems = 0;

            $.each($('#checklist-form input[type="checkbox"]:checked'), function () {
                checkedItems++;
            });

            if (checkedItems !== 5) {
                return app.notifyUser(`Please verify and check all the items of hygiene checklist`, 'error');
            }
            
            $('#reflection-form').trigger('submit');
        });

        $('#reflection-form').off().on('submit', function (e) {
            e.preventDefault();

            var reflectionData = $('[name="reflection"]').val();
            var {email, _id} = profile;

            if (reflect.getEditorWordsCount() < MIN_WORDS) {
                return app.notifyUser(`The reflection needs to be atleast of ${MIN_WORDS} words`, 'error');
            }

            api.post('/observation/videoref/reflection', {reflection: reflectionData, email, profileId: _id})
                .then(() => {
                    setTimeout(() => location.href ='/observation/videoref/complete', 1000);
                    app.notifyUser('Reflection created successfully!', 'success');
                })
                .catch((err) => app.notifyUser(err.message, 'error'));
        });

        let stepper  = new Stepper({
            target:'.example-reflections-carousel',
            loop:true
        });

        $('.example-reflections-nav').on('click', function () {
            let go = $(this).data('go');
            stepper[go] && stepper[go]();
        });
    }

    reflect.attachKeyboardAndMouseBlockEvents = function () {
        $(document).on("contextmenu",function(e){
            e.preventDefault();
            });
            
        // Prevent from Right Click
        
        $(document).keydown(function(event){
            if(event.keyCode==123){
            return false; //Prevent from F12

        } else if(event.ctrlKey && event.shiftKey && event.keyCode==73){        
            return false;  //Prevent from ctrl+shift+i
        }
        });
    
        document.onkeydown = function(e) {
            if (e.ctrlKey &&
                (e.keyCode === 67 ||
                e.keyCode === 86 ||
                e.keyCode === 85 ||
                e.keyCode === 117)) {
                return false;
            } else {
                return true;
            }
        };
    }

    reflect.getEditorWordsCount = function () {
        var editor = tinymce.activeEditor.plugins.wordcount;
        return editor.body.getWordCount();
    }

    return reflect;
})