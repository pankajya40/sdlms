class DiscussionRoom{
    /**
     * 
     * @param { number } tid 
     * @param { String | HTMLElement | JQuery } target 
     */
    constructor(tid , target){
        this.tid = tid,
        this.target = $(target)
    }

    
    /**
     * 
     * @author Divyansh Verma
     * @returns {Boolean}
     */
    isMobile() {
        var check = false;
        (function (a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    a.substr(0, 4)
                )
            ) {
                check = true;
            }
        }(navigator.userAgent || navigator.vendor || window.opera));

        return check;
    }

    /**
     * @author Divyansh Verma
     * @description "Handles Swipe Event"
     */
    handleTouchMove  (event) {
        console.log(event.changedTouches[0].pageX, event.changedTouches[0].screenX, event.changedTouches[0].clientX)
        if (this.cursorXPosition    === 0) {
            this.cursorXPosition = this.isMobile() ? event.changedTouches[0].pageX : event.clientX;
        }
        console.log(this.cursorXPosition)
        this.cursorXPositionDiff = this.isMobile() ? event.changedTouches[0].pageX : event.clientX - this.cursorXPosition;
        // event.target.style.marginLeft = cursorXPositionDiff+'px'
        // $(this).css({marginLeft:cursorXPositionDiff+"px"})
        console.log('difference :', this.cursorXPositionDiff)
    }

    /**
     * @author Divyansh Verma
     * @description "Handles Swipe Event"
     */
    handleTouchEnd (event) {
        console.log('handleend')
        this.threadSelected = true;
        $('.chat.tertiary-border').removeClass('tertiary-border');
        this.isMobile() ? '' : this.cursorXPositionDiff = event.clientX - this.cursorXPosition;
        console.log(this.cursorXPositionDiff)
        if (this.cursorXPositionDiff > 125) {
            console.log('swipped left')
            event.target.classList.add('replying');
            this.replyMode = true;
            document.querySelector('#chat-input').focus();
            // $('.reply-to').addClass('chat')
            // $('#replyto').text()

        }
        $(event.target).addClass('tertiary-border');
        this.cursorXPosition = 0;
        this.cursorXPositionDiff = 0;
    }

    /**
     * @author Divyansh Verma
     * @param { number } pid 
     */
    renderArticle(pid) {
        doAjax({
            type: 'POST',
            url: `/app/getarticles?pid=${pid}`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({}),
        }).then(function (res) {
            //! looking towards view._template
            $('#article-container').append(view._template.article(res.response.data));
        });
    }

    /**
     * @author Divyansh Verma
     * @param { number } messageId
     */
    saveMessage(messageId) {
        api.put('/app/room/thread/save', {
            messageId,
            roomId: this.tid,
        }).then(() => notify('Message has been saved', 'success'));
    }


    /**
     * @author Divyansh Verma
     * @param { number } messageId 
     */
    highlightMessage(messageId) {
        api.put('/app/room/thread/highlight', {
            messageId,
            roomId: this.tid,
        }).then(() => {
            notify('message has been highlighted', 'success');
            ajaxify.refresh();
        });
    }


    /**
     * @author Divyansh Verma
     * @param { number } userId 
     */
    removeUser(userId) {
        doAjax({
            type: 'POST',
            url: '/app/removeuser',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                roomId: this.tid,
                uids: [userId],
            }),
        }).then(function () {
            notify("User has been removed from the room", "success")
            $("#remove-user-modal").modal("hide");
            $("#remove-user-modal").removeClass("show");
        })
    }


    /**
     * @author Divyansh Verma
     */
    reportThread() {
        const messageId = $($('.chat.tertiary-border').parents('.chat-row')[0]).attr('id');
        let reportedFor;

        $('#report-thread-reason-modal').modal('show');

        $('#report-thread-reason-modal').on('click', '.report-option', function () {
            reportedFor = $(this).text();
            console.log('reportedFor', reportedFor);
            $('#report-thread-reason-modal').modal('hide');
            $('#report-thread-modal').modal('show');
        });

        $('#cancel-report').on('click', () => {
            $('.chat.tertiary-border').removeClass('tertiary-border');
            $('#report-thread-modal').modal('hide');
        });

        $('#report-final').on('click', function () {
            $('.chat.tertiary-border').removeClass('tertiary-border');
            $('#report-thread-modal').modal('hide');

            api.put('/app/room/thread/report', {
                messageId,
                roomId: roomTid,
                reportedFor,
            }).then(() => notify('thread reported successfully', 'success'));
        });
    }

    /**
     * @author Divyansh Verma
     */
    loadHighlighted() {
        $('#highlighted-body').empty();
        api.get(`/app/room/thread/highlighted/${this.tid}`, {})
            .then((res) => {
                console.log(res);
                //! look for view._template
                res.data.map(message => $('#highlighted-body').append(view._template.highlightedMessage(message)));
            });
    }

    /**
     * @author Divyansh Verma
     */
    loadModHighlighted() {
        $('#mod-highlighted-body').empty();
        api.get(`/app/room/thread/highlighted/${this.tid}`, {})
            .then((res) => {
                console.log(res);
                //! Look for view._template
                res.data.map(message => $('#mod-highlighted-body').append(view._template.highlightedModMessage(message)));
            });
    }

    /**
     * @author Divyansh Verma
     * @param { number } messageId 
     */
    scrollToMessage(messageId) {
        console.log(messageId);
        $(`#${messageId}`)[0].scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center',
        });
    }

    /**
     * @author Divyansh Verma
     */
    showChatImageInModal(){
        $('body').on('click', '.chat > img', function () {
				$('#modalImg').attr('src', $(this).attr('src'));
				$('#imageModal').modal('show');
			});
    }

    /**
     * @author Divyansh Verma
     */
    showProfileImageInModal(){
        $('body').on('click', '#room-img', function () {
            $('#modalImg').attr('src', $(this).attr('src'));
            $('#imageModal').modal('show');
        });
    }

    /**
     * @author Divyansh Verma
     */
    deselectChat(){
        $('body').on('click', function (e) {
            const eventTarget = $(e.target);
            const eventParent = $(e.target).parent();

            // check if user clicks outside menu options, text field or any chat and remove selected
            if (
                !$.contains($('#menu-btn')[0], e.target) &&
                !$.contains($('#participant-options-selected')[0], e.target) &&
                !$.contains($('#mod-options-selected')[0], e.target) &&
                !$.contains($('#reply-selected')[0], e.target) &&
                !$.contains($('#chatbox')[0], e.target) &&
                !eventTarget.hasClass('chat') &&
                !eventParent.hasClass('chat')
            ) {
                $('.chat.tertiary-border').removeClass('tertiary-border');
                this.threadSelected = false;
            }
        });
    }

    /**
     * @author Divyansh Verma
     */
    hideIntroBoxes(){
        if ($('.chat-row').length > 0) {
            $('#intro-boxes').addClass('d-none');
        }
    }

    /**
     * @author Divyansh Verma
     */
    deleteHighlightedThread(){
        $('#sidebar-footer').on('click', function () {
            const selectedThreads = $('input[name="thread-selector"]:checked');
            selectedThreads.each(function () {
                const threadContainer = $(this).parents('.highlighted-thread-content').first();
                api.del('/app/room/thread/highlight', {
                    messageId: $(threadContainer).data('mid'),
                    roomId: this.tid,
                }).then((res) => {
                    $(threadContainer).removeClass('d-flex');
                    $(threadContainer).addClass('d-none');
                });
            });
        });
    }

    /**
     * @author Divyansh Verma
     */
    appendReceivedChat(){
        socket.on('event:chats.receive', function (data) {
            console.log("socket.on here")
            if (parseInt(data.roomId, 10) === parseInt(this.tid, 10)) {
                console.log('data.message : ', data.message)
                processMessage(data.message);
            }
        });
    }

    /**
     * @author Divyansh Verma
     */
    appendChat(){
        $('#wrapper').on('submit', '#chatbox', function (e) {
            e.preventDefault();
            const $this = $('#chat-input');
            const text = $this.val();
            if (!text.trim()) {
                return console.log('empty');
            }

            // $('.chat').on('swipe', function () {
            // 	replyMode = true;
            // 	document.querySelector('#chat-input').focus();
            // })

            // if replying
            if (this.replyMode) {

                console.log('emitting reply');
                const pointer = $('.chat.tertiary-border').parent().parent().attr('id');
                const orgText = $(`.chat.tertiary-border > p`).text();
                const imageUrl = $(`.chat.tertiary-border > img`).attr('src');
                const replyMessage = `${pointer}|| ${orgText}||${text}`;
                const replyImage = `${pointer}|| ${imageUrl}||${text}`;
                console.log('here message :', replyMessage, 'here image : ', replyImage)
                var message = replyImage;
                if (replyImage.split('||')[1] == ' undefined') {
                    message = replyMessage;
                }

                socket.emit('modules.chats.send', {
                    roomId: this.tid,
                    message: message,
                }, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                this.replyMode = false;
                $('.chat.tertiary-border').removeClass('tertiary-border');
            } else {
                console.log('emitting text');
                socket.emit('modules.chats.send', {
                    roomId: this.tid,
                    message: text,
                }, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }

            $this.val('');
        });
    }

    /**
     * @author Divyansh Verma
     * $('body') gets changed to this.target
     */ 
    scrollToHighlightedMessage(){
        $('body').on('click', '.visit-listed-btn', function () {
            const messageId = parseInt($(this).data('mid'));
            scrollToMessage(messageId);

            $('#wrapper').addClass('mod-toggled');
            $('#wrapper').addClass('toggled');
            $('#dr-header').removeClass('d-none');
            $('#dr-footer').removeClass('d-none');
        });
    }

    /**
     * @author Divyansh Verma
     * 
     */ 
    replyToHighlightedMessage(){
        this.target.on('click', '.reply-listed-btn', function () {
            const messageId = parseInt($(this).data('mid'));
            scrollToMessage(messageId);

            $('#wrapper').addClass('mod-toggled');
            $('#wrapper').addClass('toggled');
            $('#dr-header').removeClass('d-none');
            $('#dr-footer').removeClass('d-none');
        });
    }

    /**
     * @author Divyansh Verma
     * 
     */
    scrollOnReplyClick(){
        this.target.on('click', '.reply', function () {
            const scrollId = $(this).attr('pointer');
            scrollToMessage(scrollId);
        });
    }

    /**
     * @author Divyansh Verma
     */
    closeMenu(){
        $('body').on('click', function (event) {

            if (!$.contains($('#attachments-btn')[0], event.target)) $('.attachments-menu').addClass('d-none');
            if (!$.contains($('#menu-btn')[0], event.target)) {
                $('#participant-options-selected').addClass('d-none');
                $('#participant-options').addClass('d-none');
                $('#mod-options-selected').addClass('d-none');
                $('#mod-options').addClass('d-none');
                $('#menu-btn').removeClass('d-none');
            }
        });
    }

    /**
     * @author Divyansh Verma
     */
    sendMessage(message) {
        if (!message) return;
        console.log('here socket.on')
        socket.emit('modules.chats.send', {
            roomId: this.tid,
            message: message,
        }, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }

    /**
     * @author Divyansh Verma
     * 
     */
    //! will be converted to link AS Ajaxify used here
    linkToArticle(){
        $('#article-container').on('click', function () {
            const articlePid = $(this).find('img').data('pid');
            notify("redirecting to article", "success");
            ajaxify.go(`/mobile/article/view?pid=${articlePid}`)
        })
    }

    /**
     * @author Divyansh Verma
     */
    closeArticle(){
        document
				.querySelector('#close-article')
				.addEventListener('click', () => document.querySelector('#room-article-text').classList.add('d-none')
				);
    }

    /**
     * @author Divyansh Verma
     */
    closeRules(){
        document
				.querySelector('#close-rules')
				.addEventListener('click', () => document.querySelector('#room-rules-text').classList.add('d-none')
				);
    }

    /**
     * @author Divyansh Verma
     */
    closeAttachmentsMenu(){
        $('body').on('click', '#attachments-btn', () => {
            $('.attachments-menu').toggleClass('d-none')
            console.log('clicked')
        }
        );
    }


    loadDiscussionRoomData() {
        //! Adding two functions to seperate out the concern
    }

    //!  will be implemented later
    // uploadingFile(){
    //     $('body').on('change', '[name="files"]', function (e) {
    //         const formData = new FormData();
    //         const $that = this;

    //         if (!window.FileReader) {
    //             console.log("The file API isn't supported on this browser yet.");
    //             return;
    //         }
    //         if (!$that) {
    //             console.error("This browser doesn't seem to support the `files` property of file inputs.");
    //             return;
    //         }
    //         var file = $that.files[0];
    //         if (!file) {
    //             console.log("Please select a file before clicking 'Load'");
    //             return;
    //         }

    //         const size = file.size / 1024 / 1024;
    //         if (size > 5) {
    //             return alert('File size must be less than 5MB');
    //         }

    //         console.log(file);
    //         console.log('here', app.getFileTypeByURL(file.name, true));
    //         if (!app.getFileTypeByURL(file.name, true)) return alert('File type is not supported');

    //         formData.append('files[files]', file);

    //         doAjax({
    //             url: '/app/uploadfile',
    //             type: 'POST',
    //             data: formData,
    //             cache: false,
    //             contentType: false,
    //             processData: false,
    //         }).then((res) => {
    //             console.log(res.response);
    //             sendMessage(res.response.files);
    //             $that.value = '';
    //         });
    //     });
    // }

    
};