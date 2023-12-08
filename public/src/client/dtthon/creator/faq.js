"use strict";

/* globals define */

define("forum/dtthon/creator/faq", ["sdlms/classes/faq",
'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js', 
'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js'], function () {
	var faq = {};
	faq.init = () => {
        let faq = new FAQ({
         target:"#faqbody",
         onSuccess: function (faq) {
            notify('Created successfully!', 'success');
            location.reload();
         }
        })

        $("[back-btn]").on("click", function() {
            ajaxify.go(`/dtthon/creator/microDashboard/${ajaxify.data.project.tid}`)
        })

        $('[data-delete]').off().on('click', function() {
            let faqId = $(this).data('faq-id');

            if (confirm('Are you sure to delete this FAQ?')) {
                // do api call here
                require(['api'], function (api) {
                api.del('/apps/faq',{
                    tid: ajaxify.data.project.tid,
                    faqId: faqId
                }).then(res => {
                   location.reload()
                }).catch(error => console.log(error))
            })
            }
        });
    };
    return faq;
    });



