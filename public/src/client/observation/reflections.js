'use strict';

/* globals define */

define('forum/observation/reflections', ['api'], function (api) {
	var reflectionPage = {};
    
    reflectionPage.reflectionNotice = "Sharing your reflections with others is a powerful way to enhance learning. Let's make our learning journey more interactive by sharing reflections through WhatsApp and foster collaboration for valuable insights and new perspectives."
    reflectionPage.reflectionNote = "<strong>Click on Share WhatsApp button </strong> to share your reflection on the respective observation WhatsApp group."
    reflectionPage.init = function () {
        const {isNewObserver=false, reflections=[], observationDetails, WALink, mode} = ajaxify.data;
        let current, day = 0;

        if (isNewObserver) {
            $('#start-observation').off().on('click', function () {

                if (!confirm('Are you sure to start your observation?')) return;

                api.post('/observation/start', {observationDetails: observationDetails._id})
                    .then((res) => {
                        setTimeout(() => location.reload(), 1000);
                        notify('Process started successfully!', 'success');
                    })
                    .catch((err) => notify(err.message, 'error'));
            });
        }

        if (!reflections || !reflections.length && !isNewObserver) {
            $('body').find('.no-reflection').show();
        } else $('body').find('.no-reflection').hide();

        if (reflections.length && !mode) {
            $.each(reflections, function (index, elem) {
                let classes = (index % 2 === 0) ? 'left' : 'right';
                let {createdAt} = elem;

                if (new Date(createdAt).getDate() != current) {
                    current = new Date(createdAt).getDate();
                    day++;
                }

                $('.timeline').append(reflectionPage.contentTemplate(elem, classes, day))
            })
        }

        $('body').off().on('click', '[data-delete]', function () {
            let id = $(this).data('delete');
            if (!id) return;
            
            if (confirm('Are you sure to delete this reflection?')) {
                api.del('/observation/reflection/' + id)
                    .then(() => {
                        setTimeout(() => location.reload(), 1000);
                        notify('Deleted successfully!', 'success');
                    }).catch((err) => notify(err.message, 'error'))
            }
        });

        $("[reflectionNotice]").append(reflectionPage.reflectionNotice);
        $("[reflectionNote]").append(reflectionPage.reflectionNote)
        function convertToWhatsAppText(inputText) {
                    // Replace <p> tags with new line
            var text = inputText.replace(/<\/?p>/g, '\n');

            // Replace <strong> tags with *
            text = text.replace(/<\/?strong>/g, '*');

            // Replace <em> tags with _
            text = text.replace(/<\/?em>/g, '_');

            // Remove all other HTML tags
            text = text.replace(/<[^>]*>?/gm, '');
            console.log('text',text)
            return text;
                
        }
        $('body').on('click', '[data-share]', function () {
            let id = $(this).data('share');
            let reflection = reflections.find(el => el._id === id);
          
              
            if (reflection) {
                let {content} = reflection;
               // console.log(content)
               content = convertToWhatsAppText(content)
               app.copyText(content);
                    var url = "https://web.whatsapp.com/send?text=" + encodeURIComponent(content);
                    setTimeout(()=>{
                        notify('Opening Whatsapp...','success');
                        window.open(url, "_blank");
                    },1000)  // Meanwhile we figure out how to sent message through controllers using WALINK we can use this for redirection to whatsapp

            //    convertToWhatsAppText(content)
            //    .then(function(result) {
                    
            //    })
            //    .catch(function(error) {
                
            //       notify("Some error occurred !")
            //    });
                
                if (WALink) {
                    setTimeout(() => {
                        notify('Opening WhatsApp...', 'success');
                        window.open(WALink);
                    }, 1000);
                }
            }
        });

    }

    reflectionPage.dateFormatter = function (timestamp) {
        let date = new Date(timestamp)
        return `${date.getDate()} ${date.toLocaleDateString(undefined, { month: "long" })}, ${date.getFullYear()}`
    }

    reflectionPage.contentTemplate = function (data, classes='', index) {
        let date = reflectionPage.dateFormatter(data.createdAt);

        return `
            <div class="timeline-container ${classes}">
                <div class="timeline-content shadow-sm" style="background:#e7e7e7">
                    <h5 class="mb-1">Day ${index}</h5>
                    <div style="font-size: 14px;" class="mb-2">${date}</div>
                    <div style="word-break: break-all;">
                        ${data.content}
                    </div>
                </div>
                <div class="row align-items-center mx-0 ${classes === 'left' ? '' : 'justify-content-end'}">
                    <button type="button" data-delete="${data._id}" class="btn btn-sm mt-2 btn-danger bg-danger border-0 mr-2">
                        <span>Delete</span><span class="badge badge-danger" style="top: 0px;"><i class="fa fa-trash-o" style="font-size: 16px;" aria-hidden="true"></i></span>
                    </button>
                    <button type="button" data-share="${data._id}" class="btn btn-sm mt-2 btn-dark bg-success border-0">
                        <span>Share on</span><span class="badge badge-success" style="top: 0px;"><i class="fa fa-whatsapp" style="font-size: 18px;" aria-hidden="true"></i></span>
                    </button>
                </div>
            </div>
        `;
    }

    return reflectionPage;
})