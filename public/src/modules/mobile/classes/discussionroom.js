/**
 * @typedef {import("./template")} _
 */

 class DiscussionRoom{
    /**
     * 
     * @param { number } tid 
     * @param { any } api
     * @param { String | HTMLElement | JQuery<HTMLElement> } target 
     * @param { boolean } scrollToMessageOnRender
     */
    constructor(tid, api, target, scrollToMessageOnRender){
        /**
         * @type {number}
         */
        this.tid = tid

        /**
         * @type { JQuery<HTMLEllement> }
         */ 
        this.target = $(target)

        this.api = api

        
        /**
         * @type {boolean}
         */
        this.scrollToMessageOnRender = scrollToMessageOnRender

        /**
         * @type {number}
         */
        this.cursorXPosition = 0;

        /**
         * @type {number}
         */
        this.cursorXPositionDiff = 0;

        /**
         * @type {number}
         */
	    this.threadSelected = false;

        /**
         * @type {number}
         */
	    this.replyMode = false;

        /**
         * @type {string}
         */
        this.imageModalId = DiscussionRoom.incrementId("image-modal")

        /**
         * @type {string}
         */
         this.deleteRoomModalId = DiscussionRoom.incrementId("delete-room-modal")
    }



    setupSearchEventListener() {
        this.template
        this.target.on("click", ".search-thread", () => {
            this.target.find(".search-thread-box").removeClass("d-none")
            this.target.find(".dr-header").addClass("d-none")
        })
        this.target.on("click", ".close-search", () => {
            this.target.find(".search-thread-box").addClass("d-none")
            this.target.find(".dr-header").removeClass("d-none")
        })
    }
    setupHighlightedThreadsEventListener(modList) {
        this.target.on("click", ".highlighted-threads", () => {
            this.target.find(".wrapper").toggleClass(this.isUidInModList(modList, app.user.uid) ? "mod-toggled" : "toggled")
            this.target.find('.dr-header').toggleClass('d-none');
            if(this.isUidInModList(modList, app.user.uid)) this.target.find('.dr-footer').addClass('d-none');
        })
        this.target.on('click', '.close-highlighted', () => {
            this.target.find('.wrapper').addClass(this.isUidInModList(modList, app.user.uid) ? "mod-toggled" : "toggled");
            this.target.find('.dr-header').toggleClass('d-none');
            if(this.isUidInModList(modList, app.user.uid)) this.target.find('.dr-footer').addClass('d-none');
        })
    }

    
    /**
     * 
     * @author Divyansh Verma
     * @returns {Boolean}
     */
    isMobile() {
        return (function (userAgentVendor) {
            return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                        userAgentVendor
                    ) ||
                    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                        userAgentVendor.substr(0, 4)
                    )
        }(navigator.userAgent || navigator.vendor || window.opera));

    }

    /**
     * @author Divyansh Verma
     * @description "Handles Swipe Event"
     */
    handleChatTouchMove  (event) {
        console.log(event.changedTouches[0].pageX, event.changedTouches[0].screenX, event.changedTouches[0].clientX)
        if (this.cursorXPosition === 0) {
            this.cursorXPosition = this.isMobile() ? event.changedTouches[0].pageX : event.clientX;
        }
        console.log(this.cursorXPosition)
        this.cursorXPositionDiff = this.isMobile() ? event.changedTouches[0].pageX : event.clientX - this.cursorXPosition;
        // event.target.style.marginLeft = cursorXPositionDiff+'px'
        // this.target.find(this).css({marginLeft:cursorXPositionDiff+"px"})
        console.log('difference :', this.cursorXPositionDiff)
    }

    /**
     * @author Divyansh Verma
     * @description "Handles Swipe Event"
     */
    handleChatTouchEnd (event) {
        console.log('handleend')
        this.threadSelected = true;
        this.target.find('.chat.tertiary-border').removeClass('tertiary-border');
        this.isMobile() ? '' : this.cursorXPositionDiff = event.clientX - this.cursorXPosition;
        console.log(this.cursorXPositionDiff)
        if (this.cursorXPositionDiff > 125) {
            console.log('swipped left')
            this.target.find(event.target).addClass('replying');
            this.replyMode = true;
            this.target.find('.chat-input').focus();
            // this.target.find('.reply-to').addClass('chat')
            // this.target.find('.replyto').text()

        }
        this.target.find(event.target).addClass('tertiary-border focussed-chat').parent(".chat-row").addClass("focussed-chat-parent");

        this.cursorXPosition = 0;
        this.cursorXPositionDiff = 0;
    }

    /**
     * @author Divyansh Verma
     * @param { number } pid 
     * @param { Template } templates
     */
    renderArticle(pid, templates) {
        doAjax({
            type: 'POST',
            url: `/app/getarticles?pid=${pid}`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({}),
        }).then(function (res) {
            this.target.find('.article-container').append(templates.article(res.response.data)).attr("href", `/mobile/article/view?pid=${res.response.data}`);
        });
    }


    /**
     * @author Divyansh Verma
     * @param { number } messageId
     */
     saveMessage(messageId) {
        this.api.put('/app/room/thread/save', {
            messageId,
            roomId: this.tid,
        }).then(() => notify('Message has been saved', 'success'));
    }


    /**
     * 
     * @param { number } messageId 
     */
    highlightMessage(messageId) {
        this.api.put('/app/room/thread/highlight', {
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
            this.target.find(".remove-user-modal").modal("hide");
            this.target.find(".remove-user-modal").removeClass("show");
        })
    }


    /**
     * @author Divyansh Verma
     */
    reportThread() {
        const messageId = this.target.find(this.target.find('.chat.tertiary-border').parents('.chat-row')[0]).attr('id');
        let reportedFor;

        this.target.find('.report-thread-reason-modal').modal('show');

        this.target.find('.report-thread-reason-modal').on('click', '.report-option', function () {
            reportedFor = this.target.find(this).text();
            console.log('reportedFor', reportedFor);
            this.target.find('.report-thread-reason-modal').modal('hide');
            this.target.find('.report-thread-modal').modal('show');
        });

        this.target.find('.cancel-report').on('click', () => {
            this.target.find('.chat.tertiary-border').removeClass('tertiary-border');
            this.target.find('.report-thread-modal').modal('hide');
        });

        this.target.find('.report-final').on('click', function () {
            this.target.find('.chat.tertiary-border').removeClass('tertiary-border');
            this.target.find('.report-thread-modal').modal('hide');

            this.api.put('/app/room/thread/report', {
                messageId,
                roomId: roomTid,
                reportedFor,
            }).then(() => notify('thread reported successfully', 'success'));
        });
    }

    /**
     * @author Divyansh Verma
     * @param {Template} templates
     */
    loadHighlighted(templates) {
        this.target.find('.highlighted-body').empty();
        this.api.get(`/app/room/thread/highlighted/${this.tid}`, {})
            .then((res) => {
                console.log(res);
                res.data.map(message => this.target.find('.highlighted-body').append(templates.highlightedMessage(message)));
            });
    }

    /**
     * @author Divyansh Verma
     * @param {Template} templates
     */
    loadModHighlighted(templates) {
        this.target.find('.mod-highlighted-body').empty();
        this.api.get(`/app/room/thread/highlighted/${this.tid}`, {})
            .then((res) => {
                console.log(res);
                res.data.map(message => this.target.find('.mod-highlighted-body').append(templates.highlightedModMessage(message)));
            });
    }

    /**
     * @author Divyansh Verma
     * @param { number } messageId 
     */
    scrollToMessage(messageId) {
        console.log(messageId);
        this.target.find(`[mid="${messageId}]"`)[0].scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center',
        });
    }

    /**
     * @author Divyansh Verma
     */
    showChatImageInModal(){
        this.target.on('click', '.chat > img', function () {
				this.target.find('.modalImg').attr('src', this.target.find(this).attr('src'));
				this.target.find('.imageModal').modal('show');
			});
    }

    /**
     * @author Divyansh Verma
     */
    showProfileImageInModal(){
        this.target.on('click', '.room-img', function () {
            this.target.find('.modalImg').attr('src', this.target.find(this).attr('src'));
        });
    }

    /**
     * @author Divyansh Verma
     */
    deselectChat(){
        this.target.on('click', function (e) {
            const eventTarget = this.target.find(e.target);
            const eventParent = this.target.find(e.target).parent();

            // check if user clicks outside menu options, text field or any chat and remove selected
            if (
                !$.contains(this.target.find('.menu-btn')[0], e.target) &&
                !$.contains(this.target.find('.participant-options-selected')[0], e.target) &&
                !$.contains(this.target.find('.mod-options-selected')[0], e.target) &&
                !$.contains(this.target.find('.reply-selected')[0], e.target) &&
                !$.contains(this.target.find('.chatbox')[0], e.target) &&
                !eventTarget.hasClass('chat') &&
                !eventParent.hasClass('chat')
            ) {
                this.target.find('.chat.tertiary-border').removeClass('tertiary-border');
                this.threadSelected = false;
            }
        });
    }

    /**
     * @author Divyansh Verma
     */
    hideIntroBoxes(){
        if (this.target.find('.chat-row').length > 0) {
            this.target.find('.intro-boxes').addClass('d-none');
        }
    }

    /**
     * @author Divyansh Verma
     */
    deleteHighlightedThread(){
        this.target.find('.sidebar-footer').on('click', function () {
            const selectedThreads = this.target.find('input[name="thread-selector"]:checked');
            selectedThreads.each(function () {
                const threadContainer = this.target.find(this).parents('.highlighted-thread-content').first();
                this.api.del('/app/room/thread/highlight', {
                    messageId: this.target.find(threadContainer).data('mid'),
                    roomId: this.tid,
                }).then((res) => {
                    this.target.find(threadContainer).removeClass('d-flex');
                    this.target.find(threadContainer).addClass('d-none');
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
        this.target.find('.wrapper').on('submit', '.chatbox', function (e) {
            e.preventDefault();
            const $this = this.target.find('.chat-input');
            const text = $this.val();
            if (!text.trim()) {
                return console.log('empty');
            }

            // this.target.find('.chat').on('swipe', function () {
            // 	replyMode = true;
            // 	document.querySelector('.chat-input').focus();
            // })

            // if replying
            if (this.replyMode) {

                console.log('emitting reply');
                const pointer = this.target.find('.chat.tertiary-border').parent().parent().attr('id');
                const orgText = this.target.find(`.chat.tertiary-border > p`).text();
                const imageUrl = this.target.find(`.chat.tertiary-border > img`).attr('src');
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
                this.target.find('.chat.tertiary-border').removeClass('tertiary-border');
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
     * this.target.find('body') gets changed to this.target
     */ 
    scrollToHighlightedMessage(){
        this.target.on('click', '.visit-listed-btn', function () {
            const messageId = parseInt(this.target.find(this).data('mid'));
            scrollToMessage(messageId);

            this.target.find('.wrapper').addClass('mod-toggled');
            this.target.find('.wrapper').addClass('toggled');
            this.target.find('.dr-header').removeClass('d-none');
            this.target.find('.dr-footer').removeClass('d-none');
        });
    }

    /**
     * @author Divyansh Verma
     * @param {string[]} modList
     * @param {boolean} isOwner
     * @param {Template} templates 
     */ 
    loadDiscussionRoomData(modList, isOwner, templates) {
        doAjax({
            type: 'POST',
            url: '/app/loadroom',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                roomId: [this.tid],
            }),
        }).then(res => {
            this.target.find(".mod-options").append(templates.deleteRoomButton(this.deleteRoomModalId))
            if (res.response.messages.length < modList.length) this.target.find(".page-content-wrapper > div > div > div").append(templates.pageContentIntroBoxes())
            for(let message of res.response.messages) this.processMessage(message)
            this.target.find('.app-loader').hide();
            if(!this.scrollToMessageOnRender) return
            if (ajaxify.data.data.scrollId) return scrollToMessage(parseInt(ajaxify.data.data.scrollId));
            $('html, body').animate({ scrollTop: $(document).height() }, 100);
        })
    }

    replyToHighlightedMessage(){
        this.target.on('click', '.reply-listed-btn', function () {
            const messageId = parseInt(this.target.find(this).data('mid'));
            scrollToMessage(messageId);

            this.target.find('.wrapper').addClass('mod-toggled');
            this.target.find('.wrapper').addClass('toggled');
            this.target.find('.dr-header').removeClass('d-none');
            this.target.find('.dr-footer').removeClass('d-none');
        });
    }

    /**
     * @author Divyansh Verma
     * 
     */
    scrollOnReplyClick(){
        this.target.on('click', '.reply', function () {
            const scrollId = this.target.find(this).attr('pointer');
            scrollToMessage(scrollId);
        });
    }

    /**
     * @author Divyansh Verma
     */
    closeMenu(){
        $('body').on('click', function (event) {

            if (!$.contains(this.target.find('.attachments-btn')[0], event.target)) this.target.find('.attachments-menu').addClass('d-none');
            if (!$.contains(this.target.find('.menu-btn')[0], event.target)) {
                this.target.find('.participant-options-selected').addClass('d-none');
                this.target.find('.participant-options').addClass('d-none');
                this.target.find('.mod-options-selected').addClass('d-none');
                this.target.find('.mod-options').addClass('d-none');
                this.target.find('.menu-btn').removeClass('d-none');
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
     */
    closeArticle(){

        this.target.find('.close-article').on('click', () => this.target.find('.room-article-text').addClass('d-none'));
    }

    /**
     * @author Divyansh Verma
     */
    closeRules(){
        this.target.find(".close-rules").on("click", this.target.find(".room-rules-text").addClass("d-none"))
        this.target.find('.close-rules').on('click', () => this.target.find('.room-rules-text').addClass('d-none'));
    }

    /**
     * @author Divyansh Verma
     */
    closeAttachmentsMenu(){
        this.target.on('click', '.attachments-btn', () => {
            this.target.find('.attachments-menu').toggleClass('d-none')
            console.log('clicked')
        }
        );
    }

    /**
     * 
     * @param {number[]} modList 
     * @param {number} uid 
     * @returns {boolean}
     */
    isUidInModList(modList, uid) {
        return modList.includes(uid)
    }

    /**
     * 
     * @param {{
     *  name: string
     *  image: string
     *  rules: string[]
     * }} room 
     * @param {Template} templates
     */
    setupDiscussionRoomTop(room, templates) {


        this.target.append(templates.pageContentHeader(room.name, room.image, this.imageModalId))

        this.target.append(templates.pageContentIntroBoxes())

        room.rules
            .split('\n')
            .map(rule => this.target.find('.rules-list').append(templates.rule(rule)));

    }

    

    deleteMessage(messageId) {
        doAjax({
            type: 'POST',
            url: '/app/deletemessage',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                mid: messageId,
            }),
        }).then(function (response) {
            this.target.find(`.${messageId}`).remove();
        });
    }

    deleteCurrentRoom() {
        doAjax({
            type: 'DELETE',
            url: `/app/room/${roomTid}`,

            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({



            }),
        }).then(function (response) {
            this.target.find('.delete-room-modal').modal('hide');
            this.target.find('.delete-room-modal').removeClass('show');

            console.log(response);
            ajaxify.go(`/mobile/discussion/joined`)


        });
    }

    /**
     * 
     * @param {Template} templates 
     */
    setupDiscussionRoom(templates) {
        notify('Deleting room', 'error');
        doAjax({
            type: 'POST',
            url: '/app/getroom',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                roomId: [this.tid],
            }),
        }).then((res) => {
            this.loadHighlighted(templates)
            this.setupDiscussionRoomTop(res.response, templates)
            if(res.response.attachment_id) this.renderArticle(res.response.attachment_id)
            
            const modList = [...res.response.moderators, res.response.owner]
            this.target.find(".mod-options-selected").after(templates.mainContent(this.isUidInModList(modList, app.user.uid)))
            this.setupSearchEventListener()
            this.setupHighlightedThreadsEventListener(modList)
            
            this.target.on("click", ".reply-selected", () => {
                this.target.find(".chat-input").trigger("focus")
                this.replyMode = true
            })
            // this.target.on("click", ".report-selected", this.reportThread())
            this.target.on("click", ".save-selected", () => {
                const messageId = this.target.find(".focussed-chat-parent").attr("id")
                this.saveMessage(messageId)
            })
            this.target.on("click", ".leave-final", () => {
                notify("leaving room", "error");
                this.removeUser()
            })
            this.target.on("click", ".delete-ok", () => {
                if(this.isUidInModList(modList, app.user.uid)) {
                    this.deleteCurrentRoom()
                    return
                }
                this.removeUser()
            })
            if(!this.isUidInModList(modList, app.user.uid)) {
                this.loadHighlighted(templates)
                this.target.on("click", ".menu-btn", e => {
                    this.target.find(".menu-btn").addClass("d-none")
                    if(this.threadSelected) {
                        this.target.find(".participant-options-selected").removeClass("d-none")
                        return
                    }
                    this.target.find(".participant-options").removeClass("d-none")
                    this.target.find(".search-thread-box").removeClass("d-none")
                    this.target.find(".dr-header").addClass("d-none")
                })
                return
            }
            this.loadModHighlighted(templates)
            this.target.on("click", '.menu-btn', () => {
                if (!threadSelected) {
                    this.target.find('.mod-options').removeClass('d-none');
                    this.target.find('.mod-options-selected').addClass('d-none');
                    this.target.find('.menu-btn').addClass('d-none');
                } else {
                    this.target.find('.menu-btn').addClass('d-none');
                    this.target.find('.mod-options').addClass('d-none');
                    this.target.find('.mod-options-selected').removeClass('d-none');
                    this.target.on("click", '.delete-final', () => {
                        const messageId = this.target.find(".focussed-chat-parent").attr("id")
                        this.deleteMessage(messageId)
                    })
                    this.target.on("click", ".remove-final", () => {
                        const userId = this.target.find(".focussed-chat-parent").attr("uid")
                        if (userUid != app.user.uid) {
							removeUser(userUid);
                            return
						}
                        this.target.find('.remove-user-modal').modal('hide');
                        this.target.find('.remove-user-modal').removeClass('show');
                    })
                }
            })
        })
    }

    render() {
        const that = this
        require(["mobile/template"], function () {
            console.log(Templates)
            const templates = new Templates()
            const imageShowcaseModalId = DiscussionRoom.incrementId("image-showcase-modal")
            const leaveRoomModalId = DiscussionRoom.incrementId("leave-room-modal")
            const reportMessageModalId = DiscussionRoom.incrementId("report-message-modal")
            const deleteThreadModalId = DiscussionRoom.incrementId("delete-thread-modal")
            const removeUserModalId = DiscussionRoom.incrementId("remove-user-modal")
            const reportMessageOptionsModalId = DiscussionRoom.incrementId("report-message-options-modal")

            that.target.append(templates().components.imageShowcaseModal(imageShowcaseModalId))
            that.target.append(templates.participantOptions(leaveRoomModalId, that.tid))
            that.target.append(templates.participantOptionsOnSelectedThread(reportMessageOptionsModalId))
            that.target.append(templates.moderatorOptions(leaveRoomModalId, that.tid))
            that.target.append(templates.moderatorOptionsOnSelectedThread(removeUserModalId, deleteThreadModalId))
            that.target.append(templates.leaveModal(that.leaveRoomModalId))
            that.target.append(templates.deleteRoomModal(that.deleteRoomModalId))
            that.target.append(templates.reportMessageModal(reportMessageModalId))
            that.target.append(templates.deleteThreadModal(deleteThreadModalId))
            that.target.append(templates.removeUserModal(removeUserModalId))
            that.target.append(templates.messageReportOptionsModal(reportMessageOptionsModalId, reportMessageModalId))
            that.setupDiscussionRoom(templates)
            console.log(reportMessageOptionsModalId)
        })
    }

    //!  will be implemented later
    // uploadingFile(){
    //     this.target.find('body').on('change', '[name="files"]', function (e) {
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

/**
 * 
 * @param {string} idPrefix 
 * @returns {string}
 */
DiscussionRoom.incrementId = function (idPrefix) {
    if(!DiscussionRoom.countIds) DiscussionRoom.countIds = {}
    if(idPrefix in DiscussionRoom.countIds) {
        DiscussionRoom.countIds[idPrefix] = DiscussionRoom.countIds[idPrefix] + 1
        return `${idPrefix}-${DiscussionRoom.countIds[idPrefix]}`
    }
    DiscussionRoom.countIds[idPrefix] = 0
    return `${idPrefix}-0`
}