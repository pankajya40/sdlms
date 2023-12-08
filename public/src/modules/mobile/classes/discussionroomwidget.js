
class DiscussionRoom {
    constructor(roomId, target) {
        this.roomId = roomId;
        this.target = $(target);
        this.setupBaseLayout();
        this.roomData = {}
    }
    // async appendModal(){
    //     $('body').find('.sdlms-container').append(this.templates().modalTemplate())
    //     return true
    // }
    async setupBaseLayout() {
        let that = this
        // console.log('hello')
        // await this.appendModal()
        await this.setupDiscussionRoom()
        console.log('hello',this.roomData)
        console.log("data",that.roomData)
        that.target.find('[header]').append(this.templates().showPageContent(that.roomData))
        that.target.find('[discussionRoomBody]').append(this.templates().mainPage(that.roomData))
        $('[discussionRoomBody]').scrollTop($('[discussionRoomBody]').height())
        that.target.find('[discussionRoomBody]').append(this.templates().reflectionmodalTemplate())
        // that.target.find('[header]').append(this.templates().pageContentIntroBoxes(that.roomData.rules))

   
        that.target.find('[footer]').append(this.templates().commentTextInputField())
        this.loadDiscussionRoomData()
        this.appendReceivedChat()
        this.sendMessage()
        this.selectchat()
        this.reaction()
        this.viewprofile()
        // this.viewreflection()
        // this.reflection()
        // this.submitreflection()
        this.reply()
        this.touchevents()
        this.goback()
        // this.rules()

        $('[discussionRoomBody]').animate({ scrollTop: $('[discussionRoomBody]').height() }, 100);
    }
    async setupDiscussionRoom() {
        var that = this
        let res = await doAjax({
            type: 'POST',
            url: '/app/getroom',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                roomId: that.roomId
            }),
        })
        console.log(res)
        this.roomData.title = res.response[0].name;
        this.roomData.image = res.response[0].image;
        // this.roomData.rules=res.response[0].rules;
        this.roomData.imageModalId = `image-modal${res.response[0].roomId}`
    }


    processMessage(message, old) {

        message.class = message.self ? 'outgoing' : 'incoming';
        let template = 'chat'
        if (message.cleanedContent.split('||').length === 1) {
            try {
              
                let url = new URL(String(location.origin + "/" + message.cleanedContent))
               
                template = app.getFileTypeByURL(url.href)
             
                console.log(template);
                if(!template){
                    template = "chat";
                }
                if (template != 'chat') {
                    message.content = message.cleanedContent;

                }
                // console.trace(message)
                try {
                    console.log(message)
                    message = {...message, cleanedContent: message.cleanedContent.split('\n').join('<br/> <br/>')};
                    message = {...message, cleanedContent: message.cleanedContent.split('\t').join('&nbsp;&nbsp;')};
                    // console.log(message)
                } catch (err) {}
                this.target.find('.wrapper')[old ? 'prepend' : 'append'](this.templates().chat(message));
            }
            catch (err) {
                console.log(err)
            }
        }
        else if (message.cleanedContent.split('||').length === 3) {
            let temp = 'chatReply'
            console.log("Reply time");
            const pointer = message.cleanedContent.split('||')[0];
            const orgText = message.cleanedContent.split('||')[1];
            const replyText = message.cleanedContent.split('||')[2];
            const replyData = {
                pointer: pointer,
                orgText: orgText.replace(' ', ""),
                replyText: replyText,
                uid: message.fromUser.uid,
                picture: message.fromUser.picture,
                mid: message.mid || message.messageId,
                displayname: message.fromUser.displayname,
            };
            console.log(replyData);
            // if (replyData.orgText.split('/').length > 1) {
               
            //     temp = 'imageReply'
            // }
            $(this.target).find('.wrapper').append(this.templates()[temp](replyData));
        }
        else {
            console.log('here in else')
        }
       
        $('html, body').animate({ scrollTop: $(document).height() }, 100);
    }
    
    loadDiscussionRoomData() {
        var that = this.roomId
        doAjax({
            type: 'POST',
            url: '/app/loadroom',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                roomId: that,
            }),
        }).then(res => {
               console.log(res)
               for(let message of res.response.messages) this.processMessage(message)
        })
            .catch(err => console.log(err))
    }

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
				}(navigator.userAgent || window.opera));

				return check;
	}

    touchevents(){
        const deskMob = this.isMobile() ? 'mobile' : 'desktop';
        var cursorXPosition = 0;
        var cursorXPositionDiff = 0;
        let threadSelected = false;
        let replyMode = false;
        let isMobile = this.isMobile()
        const TOUCHEVENTS = {
            		mobile: {
            			START: 'touchstart',
            			MOVE: 'touchmove',
            			END: 'touchend'
    
            		},
            		desktop: {
            			START: 'mousedown',
            			MOVE: 'mousemove',
            			END: 'mouseup'
            		}
            	}

                var handleTouchMove = function (event) {
                    console.log(event.changedTouches[0].pageX, event.changedTouches[0].screenX, event.changedTouches[0].clientX)
                    if (cursorXPosition === 0) {
                        cursorXPosition = isMobile ? event.changedTouches[0].pageX : event.clientX;
                    }
                    console.log(cursorXPosition)
                    cursorXPositionDiff = isMobile ? event.changedTouches[0].pageX : event.clientX - cursorXPosition;
                    // event.target.style.marginLeft = cursorXPositionDiff+'px'
                    // $(this).css({marginLeft:cursorXPositionDiff+"px"})
                    console.log('difference :', cursorXPositionDiff)
        }

                var handleTouchEnd = function (event) {
                    // let threadSelected = false;
                    // let replyMode = false;
                    console.log('handleend')
                    threadSelected = true;
                    $(this).find('.chat.tertiary-border').removeClass('tertiary-border');
                    isMobile ? '' : cursorXPositionDiff = event.clientX - cursorXPosition;
                    console.log(cursorXPositionDiff)
                    if (cursorXPositionDiff > 125) {
                        console.log('swipped left')
                        event.target.classList.add('replying');
                        replyMode = true;
                        // $(this).find('[footer]').find('#chat-input').trigger('focus');
                        document.querySelector('#chat-input').focus();
                        // $('.reply-to').addClass('chat')
                        // $('#replyto').text()

                    }
                    $(this).addClass('tertiary-border');
                    cursorXPosition = 0;
                    cursorXPositionDiff = 0;
                }

                $(this.target).find('[discussionRoomBody]').on(TOUCHEVENTS[deskMob].START, '.chat',function (e) {
                                    cursorXPosition = e.clientX;
                                    this.addEventListener(isMobile ? TOUCHEVENTS['mobile'].MOVE : TOUCHEVENTS['desktop'].END, isMobile ? handleTouchMove(e) : handleTouchEnd(e), false);
                                    this.addEventListener(TOUCHEVENTS[deskMob].END, handleTouchEnd(e), false);
                                })
                                // app.link.script(app.script.HAMMERJS.HAMMER, function () {
                                //     var el = document.getElementsByClassName('chat')
                                //     $('.chat').each(function(){
                                //         var hammertime = new Hammer(this)

                                //         hammertime.on('swipe',function(ev){
                                //             // handleAnimation(ev)
                                //             // handleReply(ev)
                                //         })
                                //     })
                                // })
    }

    appendReceivedChat(){
        let that = this
        socket.off().on('event:chats.receive', function (data) {
            if (parseInt(data.roomId, 10) === parseInt(that.roomId, 10)) {
                console.log('data.message : ', data.message)
                that.processMessage(data.message)
            }
        });
    }

    sendMessage(){
       
        let  that = this

        $(this.target).find('[footer]').on("submit","#chatbox",function(e){
            e.preventDefault()
            const $this = $('#chat-input');
            const text = $this.val();
            console.log(text)
            socket.emit('modules.chats.send', {
                roomId: that.roomId,
                message: text,
            }, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
           
        })}
        
        reply(){
        $(this.target).find('[footer]').on('submit', '[name="chatbox"]', function (e) {
            e.preventDefault();

            const $this = $(this.target).find('#chat-input');
            const text = $this.val();
            console.log(text.trim());
            if (!text.trim()) {
                return console.log('empty');
            }
            // $(this.target).on('swipe','.chat', function () {
            //     // let replyMode = false;
            //     console.log('swiped')
            // 	replyMode = true;
            // 	$(this.target).find('#chat-input').trigger('focus');
            // })

            // if replying
            let replyMode=false;
            if (that.replyMode) {
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
                    roomId: roomTid,
                    message: message,
                }, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                replyMode = false;
                $('.chat.tertiary-border').removeClass('tertiary-border');
            } else {
                console.log('emitting text');
                processMessage(text);

                socket.emit('modules.chats.send', {
                    roomId: roomTid,
                    message: text,
                }, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }

            $this.val('');
        });}

    selectchat(){
        const holdStart = this.isMobile() ? 'touchstart' : 'mousedown';
        let threadSelected=false;
			$(this.target).find('[discussionRoomBody]').on(holdStart, '.chat', function () {
				const that = $(this);
				setTimeout(() => {
					threadSelected = true;
					$('.chat.tertiary-border').removeClass('tertiary-border');
					that.addClass('tertiary-border');
				}, 500);
			});

        $('[discussionRoomBody]').on('click', function (e) {
                const eventTarget = $(e.target);
                const eventParent = $(e.target).parent();
                if (
                                !$.contains($('#reply-selected')[0], e.target) &&
                                !$.contains($('#chatbox')[0], e.target) &&
                                !eventTarget.hasClass('chat') &&
                                !eventParent.hasClass('chat')
                            ) {
                                $('.chat.tertiary-border').removeClass('tertiary-border');
                                threadSelected = false;
                            }})
                        }
    
    goback(){
		$(this.target).find("[header]").on("click",".backBtn", function() {
			ajaxify.go("/mobile/message/list")
		})
    }
    
    reaction(){
        $(this.target).find('[discussionRoomBody]').on('click','.thread', function () {
            var messageId= $(this).data("id");
            $(`.hold-options`).empty().addClass('d-none');
            $(`[hold-options-${messageId}]`).removeClass('d-none');
            $(`[hold-options-${messageId}]`).html( `<div class="view-thread-profile col-6 p-0 pl-0" data-id=${messageId}><i class="fa fa-street-view" aria-hidden="true" id="view"></i></div><div class="view-thread-reaction-modal col-6 p-0 pl-2" data-id=${messageId}><i class="fa fa-bullseye" aria-hidden="true" 
            id="reaction" data-toggle="modal" data-target="#exampleModalCenter"></i></div>`)
        });
    }

    viewprofile(){
        let that = this
        $(this.target).find('[discussionRoomBody]').on('click', '.view-thread-profile', function() {
            var roomId=that.roomId;
            var messageId=$(this).data("id");
            ajaxify.go(`mobile/discussion/profile/${roomId}?type=thread&id=${messageId}`)
        })
    }

    selectIcon(){
        $(this.target).find('[discussionRoomBody]').on('click', '#reaction', function() {
           ajaxify.go("/mobile/rigormobile")

        })
        
    }

    viewreflection(){
        var reactions = ajaxify.data.data.reactions;
        $(this.target).find('[discussionRoomBody]').on('click', '.view-thread-reaction-modal', function() {
            var messageId=$(this).data("id");
            $('.main-box').removeClass('d-none');
            localStorage.setItem('messageId',messageId);
            $(this.target).find('[discussionRoomBody]').on('click', '.reaction-tab', function() {
            var name = $(this).data('name')
            $(".reaction-tab").removeClass("tab-active");
            $(this).addClass("tab-active");
            $(".select-lable").html(name);
            $('select[name="reaction_category"]').html(reactions[name].map((item)=>`<option value="${item.value}">${item.name}</option>`).join(''));				
        })
    })
    }
    
    reflection(){
        var reactions = ajaxify.data.data.reactions;
        $(this.target).find('[discussionRoomBody]').on('click', '.reaction-tab', function() {
            var name = $(this).data('name')
            $(".reaction-tab").removeClass("tab-active");
            $(this).addClass("tab-active");
            $(".select-lable").html(name);
            $('select[name="reaction_category"]').html(reactions[name].map((item)=>`<option value="${item.value}">${item.name}</option>`).join(''));
            $('.reaction-tab').first().on('click');	
            $('body').on('click', '.close-modal', function () {
                $('.main-box').addClass('d-none');	})		
        })
    }

    submitreflection(){
        $(this.target).find('[discussionRoomBody]').on('click','.submit-reflection' ,function(e) {
            e.preventDefault()
            var submissionData = $('#submit-reflection').serializeObject()
            let messageId = localStorage.getItem('messageId')
            var data = {
                category : $(".tab-active").text(),
                subCategory : submissionData.reaction_category,
                reflection : submissionData.reflection,
                messageId : messageId,
                roomId : ajaxify.data.data.roomId
            }
            $('.main-box').addClass('d-none');
            require(['api'], function (api) {
                api.post(`/app/reactions`, data)
                .then(res => {
                    console.log(res);
                })
        })
    })}

    // rules(){
    //     var chat=$(this.target).find('[discussionRoomBody]').find('.chat-row')
    //     if (chat.length > 0) {
    //         $('.intro-boxes').addClass('d-none');
    //     }
    // }

    templates() {

        let components = {
            // chat: (data) => {
            //     if (app.user.uid == data.fromUser.uid) {
            //         return `<div class="chat-row outgoing unselectable" mid=${data.mid ? data.mid : data.messageId} uid=${data.fromUser.uid}>
            //         <div>
            //             <p class="font-10 mb-0">
            //                 Me
            //             </p>
            //             <div class="chat">
            //                 <p class="mb-0 font-12">${data.cleanedContent}</p>
            //             </div>
            //         </div>
            //         <img src="${data.fromUser.picture}"
            //             alt="man 2" class="circle-sm rounded-circle img-cover">
            //     </div>`;
            //     }
            //     return `<div class=" chat-row incoming unselectable" mid=${data.mid ? data.mid : data.messageId} uid=${data.fromUser.uid}>
            //         <img src="${data.fromUser.picture}"
            //         alt="man 2" class="circle-sm rounded-circle img-cover">
            //         <div>
            //             <p class="font-10 mb-0">
            //                 ${data.fromUser.displayname}
            //             </p>
            //             <div class="chat">
            //                 <p class="mb-0 font-12">${data.cleanedContent}</p>
            //             </div>
            //         </div>
            //     </div>`;
            // },
            chat : (data) =>{
                if (app.user.uid == data.fromUser.uid){
                    return `
                    <div class="chat-row outgoing unselectable" data-id="${data.mid ? data.mid : data.messageId}" uid="${data.fromUser.uid}">
                         <div class="d-flex thread" data-id="${data.mid ? data.mid : data.messageId}">
                         <div class="hold-options mr-1 d-none row" hold-options-${data.mid ? data.mid : data.messageId}=""> </div>		
                         <div class="addclr">
                                     <div class="chat w-break">
                                        <p class="mb-0 font-14">
                                        ${data.cleanedContent}
                                        </p>
                                    </div>			
                             </div>
                             </div>
                             </div>`
                }
                else {
                    return `
                    <div class="chat-row incoming unselectable" data-id="${data.mid ? data.mid : data.messageId}" uid="${data.fromUser.uid}">
                         <div class="d-flex thread" data-id="${data.mid ? data.mid : data.messageId}">
                         <div class="bordr">
                         <p class="font-14 mb-0 f-weight leftm">
                         ${data.fromUser.displayname}
								</p>
                                     <div class="chat w-break">
                                        <p class="mb-0 font-14">
                                        ${data.cleanedContent}
                                        </p>
                                    </div>		
                             </div>
                             <div class="hold-options ml-1 d-none row" hold-options-${data.mid ? data.mid : data.messageId}=""> 
                             </div>	
                             </div>
                             </div>`
                }
               
            },
            // modalTemplate: (data) => {
            //     return `
            //     <div class="modal fade" id="discussionRoomModal" tabindex="-1" role="dialog" aria-labelledby="discussionRoomModalLabel" aria-hidden="true">
            //     <div class="modal-dialog" role="document">
            //         <div class="modal-content" id="targetedmodal">
            //         <div class="modal-header">
                        
            //             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            //             <span aria-hidden="true">&times;</span>
            //             </button>
            //         </div>
            //         <div class="modal-body" style="overflow: auto;">
                    
            //         </div>
            //         <div class=" d-flex justify-content-md-center modal-footer p-0">
                    
            //         </div>
            //         </div>
            //     </div>
            //     </div>`
            // },
            reflectionmodalTemplate: () => {
                return `
                <div class="modal d-none main-box font-12" data-backdrop="false" id="main-box" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <form id="submit-reflection" class="" style="border-radius: 0.25rem;">
                    <div style="border: 1px solid #ced4da; border-radius: 10px; box-shadow: -1px 5px 18px -7px #000;">
                        <div class="cross-mod d-flex">
                            <div class="col-10 ml-2 p-2" style="font-size: medium; font-weight: 600;">Hey! It's time to reflect...</div>
                            <div class="close-modal d-flex">x</div>
                        </div>
                        <div class="d-flex tabs">
                            <div class="reaction-tab tab-active font-12" data-name="emotion"><i class="fa fa-smile-o" aria-hidden="true"></i> Emotion</div>
                            <div class="reaction-tab font-12" data-name="value"><i class="fa fa-diamond" aria-hidden="true"></i> Value</div>
                            <div class="reaction-tab font-12" data-name="wisdom"><i class="fa fa-lightbulb-o" aria-hidden="true"></i> Wisdom</div>
                        </div>
                        <div class="reactions" id="reactions">
                            <label for="options" class="font-12">Select <span class="select-lable">emotion</span><span style="color: red;">*</span></label>
                            <div>
                                <select class="form-control font-12" name="reaction_category">
                                    <option selected disabled class="sel-opt">Select Option</option>
                                </select>
                            </div>
                            <div class="col-12 p-0">
                                <label for="input" class="font-12">Reflection<span style="color: red;">*</span></label>
                                <div class="align-items-center d-flex flex-column justify-content-between" style="border: 1px solid #ced4da; border-radius: 0.25rem;">
                                    <textarea class="form-control reflection" placeholder="Please give reflection about this thread..." name="reflection" rows="6" no-of-characters maxlength="200" style="border: none; resize: none; font-size: smaller;"></textarea>
                                    <label class="holder">
                                        <span class="sdlms-text-primary-12px"><span show-characters="">0</span>/200</span>
                                    </label> 
                                </div>
                            </div>
                            <div class="main-box mt-20-px">
                                <button class="border-0 button-lg-p font-12 submit-reflection" style="background: #0029ff; color: white;">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            `
            },
                
            image: (data) => {
                if (app.user.uid == data.fromUser.uid) {
                    return `<div class="chat-row outgoing day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                    <div>
                        <p class="font-10 mb-0">
                            Me
                        </p>
                        <div class="chat">
                            <img src="${data.content}" alt="" class="circle-lg img-cover">
                        </div>
                    </div>
                    <img src="${data.fromUser.picture}" alt="man 2" class="circle-sm rounded-circle img-cover">
                </div>`;
                }
                return `<div class="chat-row incoming day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                    <img src="${data.fromUser.picture}" alt="man 2" class="circle-sm rounded-circle img-cover">
                    <div>
                        <p class="font-10 mb-0">
                            ${data.fromUser.displayname}
                        </p>
                        <div class="chat">
                            <img src="${data.content}" alt="" class="circle-lg img-cover">
                        </div>
                    </div>
                </div>`;
            },
            audio: (data) => {
                if (app.user.uid == data.fromUser.uid) {
                    return `<div class="chat-row  outgoing day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                    <div class="w-75">
                        <p class="font-10 mb-0">
                            Me
                        </p>
                        <div class="chat">
                            <audio controls class="w-100">
                                <source src="${data.content}" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                    <img src="${data.fromUser.picture}"
                        alt="man 2" class="circle-sm rounded-circle img-cover">
                </div>`;
                }
                return `<div class="chat-row  incoming day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                    <img src="${data.fromUser.picture}"
                    alt="man 2" class="circle-sm rounded-circle img-cover">
                    <div class="w-75">
                        <p class="font-10 mb-0">
                            ${data.fromUser.displayname}
                        </p>
                        <div class="chat">
                            <audio controls class="w-100">
                                <source src="${data.content}" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                </div>`;
            },
            video: (data) => {
                if (app.user.uid == data.fromUser.uid) {
                    return `<div class="chat-row  outgoing day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                    <div>
                        <p class="font-10 mb-0">
                            Me
                        </p>
                        <div class="chat">
                            <video controls>
                                <source src="${data.content}" type="video/mp4">
                                Your browser does not support the audio element.
                            </video>
                        </div>
                    </div>
                    <img src="${data.fromUser.picture}"
                        alt="man 2" class="circle-sm rounded-circle img-cover">
                </div>`;
                }
                return `<div class="chat-row  incoming day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                    <img src="${data.fromUser.picture}" alt="man 2" class="circle-sm rounded-circle img-cover">
                    <div>
                        <p class="font-10 mb-0">
                            ${data.fromUser.displayname}
                        </p>
                        <div class="chat">
                            <video controls>
                                <source src="${data.content}" type="video/mp4">
                                Your browser does not support the audio element.
                            </video>
                        </div>
                    </div>
                </div>`;
            },
            pdf: (data) => {
                if (app.user.uid == data.fromUser.uid) {
                    return `<div class="chat-row  outgoing day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                    <div>
                        <p class="font-10 mb-0">
                            Me
                        </p>
                        <div class="chat">
                            ${view._template.download(data, data.content)}
                        </div>
                    </div>
                    <img src="${data.fromUser.picture}"
                        alt="man 2" class="circle-sm rounded-circle img-cover">
                </div>`;
                }
                return `<div class="chat-row  incoming day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                    <img src="${data.fromUser.picture}" alt="man 2" class="circle-sm rounded-circle img-cover">
                    <div>
                        <p class="font-10 mb-0">
                            ${data.fromUser.displayname}
                        </p>
                        <div class="chat">
                            ${view._template.download(data, data.content)}
                        </div>
                    </div>
                </div>`;
            },
            download: (data, name) => {
                return `<div class="w-100 d-flex justify-content-end" ><a href="${data.content}" download="">${name || 'Download'}</a></div>`;
            },
            imageReply: (data) => {
                if (app.user.uid == data.uid) {
                    return `<div class="chat-row outgoing" mid=${data.mid ? data.mid : data.messageId} uid=${data.uid}>
                        <div>
                            <p class="font-10 mb-0">
                                Me
                            </p>
                            <div class="chat unselectable">
                                <div  pointer=${data.pointer}>
                                        <img class="circle-lg img-cover" src="${data.orgText}">
                                </div>
                                <p class="mb-0 font-12">${data.replyText}</p>
                            </div>
                        </div>
                        <img src="${data.picture}"
                            alt="man 2" class="circle-sm rounded-circle img-cover">
                    </div>`;
                }
                return `<div class="chat-row incoming" mid=${data.mid ? data.mid : data.messageId} uid=${data.uid}>
                        <img src="${data.picture}"
                        alt="man 2" class="circle-sm rounded-circle img-cover">
                        <div>
                            <p class="font-10 mb-0">
                                ${data.displayname}
                            </p>
                            <div class="chat">
                                <div class="reply mb-1" pointer=${data.pointer}>
                                        <img class="circle-lg img-cover" src="${data.orgText}">
                                </div>
                                <p class="mb-0 font-12">${data.replyText}</p>
                            </div>
                        </div>
                    </div>`;
            },
            chatReply: function (data) {
                		if (app.user.uid == data.uid) {
                			return `<div class="chat-row outgoing" data-id=${data.mid ? data.mid : data.messageId} uid=${data.uid}>
                                        <div class="d-flex thread" data-id="${data.mid ? data.mid : data.messageId}">
                			            <div class="mr-1 hold-options row d-none" hold-options-${data.mid ? data.mid : data.messageId}></div>
                						<div class="addclr m-0 ml-1">
                							<div class="chat unselectable ">
                								<div class="reply mb-1 bgcolor" pointer=${data.pointer}>
                										<p class="font-14 mb-0">${data.orgText}</p>
                								</div>
                								<p class="mb-0 font-14 w-break">${data.replyText}</p>
                							</div>
                						</div>
                                        </div>
                					</div>`;
                		}
                		return `<div class="chat-row incoming" data-id=${data.mid ? data.mid : data.messageId} uid=${data.uid}>
                                        <div class="d-flex thread" data-id="${data.mid ? data.mid : data.messageId}">
                						<div class="bordr m-0 ">
                							<p class="font-14 mb-0 leftm f-weight">
                								${data.displayname}
                							</p>
                							<div class="chat">
                								<div class="reply mb-1 bgcolor" pointer=${data.pointer}>
                										<p class="font-14 mb-0">${data.orgText}</p>
                								</div>
                								<p class="mb-0 font-14 w-break">${data.replyText}</p>
                							</div>
                						</div>
                						<div class="ml-1 hold-options row d-none" hold-options-${data.mid ? data.mid : data.messageId}> 
                					    </div>
                                        </div>
                					</div>`;
                	},
            /**
             * @param {string} data
             */
            rule: (data) => {
                return `
                <li>${data}</li>
                `
            },
            /**
             * 
             * @param {Article} data 
             * @returns 
             */
            article: (data) => {
                return `<img src="${data.image}"
                            alt="article-img" class="circle-md rounded-circle mr-2 img-cover" data-pid=${data.pid}>
                <div class="w-75">
                    <p class="font-14 mb-0">${data.title}</p>
                    <p class="font-10 brand-text mb-0">${moment(data.timestamp).format(
                    'ddd Do MMM, YYYY'
                )}</p>
                    <p class="mt-1 font-10 text-secondary mb-0 truncate-line-2">${app.htmltoText(
                    data.content
                )}</p>
                </div>`;
            },

            /**
             * 
             * @param {HighlightedMessage} data 
             * @returns 
             */
            highlightedMessage: (data) => {
                return `<div class="d-flex">
                    <img src="${data.author.picture}"
                        alt="pfp" class="img-cover circle-md rounded-circle mr-2">
                    <div class="w-100">
                        <div class="d-flex justify-content-between">
                            <p class="font-10 mb-0 ml-1">${data.author.fullname}</p>
                            <p class="font-10 mb-0">Posted on ${moment(data.timestamp).format('Do MMM, YYYY')}</p>
                        </div>
                        <div class="font-12 px-2 py-1 mb-2 secondary-border rounded-lg mb-2">
                            <p class="mb-0">${data.content}</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex flex-column align-items-center visit-listed-btn" data-mid=${data.messageId}>
                                <i class="fas fa font-14 fa-solid fa-circle-chevron-up mb-1"></i>
                                <p class="font-10 mb-0">Visit thread</p>
                            </div>
                            <div class="d-flex flex-column align-items-center mb-1 reply-listed-btn" data-mid=${data.messageId}>
                                <i class="fas fa font-14 fa-solid fa-reply"></i>
                                <p class="font-10 mb-0">Reply</p>
                            </div>
                        </div>
                        <hr class="primary-border mb-20-px">
                    </div>
                </div>`;
            },

            /**
             * 
             * @param {HighlightedMessage} data 
             * @returns 
             */
            highlightedModMessage: (data) => {
                return `<div class="d-flex highlighted-thread-content" data-mid=${data.messageId}>
                    <div class="form-check">
                        <input 
                            class="form-check-input 
                            position-static blankCheckbox" 
                            type="checkbox"
                            name="thread-selector" value=${data.messageId}>
                    </div>
                    <div class="w-100">
                        <div class="d-flex justify-content-between">
                            <p class="font-10 mb-0 ml-1">${data.author.fullname}</p>
                            <p class="font-10 mb-0">Posted on ${moment(data.timestamp).format('Do MMM, YYYY')}</p>
                        </div>
                        <div class="font-12 px-2 py-1 mb-2 secondary-border rounded-lg mb-2">
                            <p class="mb-0">${data.content}</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex flex-column align-items-center visit-listed-btn" data-mid=${data.messageId}>
                                <i class="fas fa font-14 fa-solid fa-circle-chevron-up mb-1"></i>
                                <p class="font-10 mb-0">Visit thread</p>
                            </div>
                            <div class="d-flex flex-column align-items-center mb-1 reply-listed-btn" data-mid=${data.messageId}>
                                <i class="fas fa font-14 fa-solid fa-reply"></i>
                                <p class="font-10 mb-0">Reply</p>
                            </div>
                        </div>
                        <hr class="primary-border mb-20-px">
                    </div>
                </div>`;
            },
            /** 
             * @author Divyansh Verma
             * @param {string} id
             * @returns {string}
             * 
             */
            imageShowcaseModal: (id) => {
                return `<div class="modal fade collapse" id="${id}" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-10-px message-modal">
                <div class="modal-header border-0">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" data-bs-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body py-2">
                    <img src="" alt="" class="rounded-lg w-100 img-cover modalImg">
                </div>
            </div>
        </div>
    </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @returns {string}
             */
            commentAttachments: () => {
                return ` <div class="d-none attachments-menu">
                    <div
                        class="secondary-bg shadow-sm primary-border rounded-10-px d-inline-flex flex-column py-2 px-1 justify-content-between align-items-center">

                        <input type="file" class="form-control-file d-none event-img" name="files" />
                        <label for="event-img" class="mb-2">
                            <i class="fas fa fa-solid fa-file"></i>
                        </label>

                        <input type="file" accept="image/*" name="files" class="form-control-file d-none event-img"/>
                        <label for="event-img" class="mb-2">
                            <i class="fas fa fa-solid fa-image"></i>
                        </label>

                        <input type="file" accept="image/*" name="files" class="form-control-file d-none event-img" />
                        <label for="event-img" class="mb-0">
                            <i class="fas fa fa-solid fa-camera"></i>
                        </label>
                    </div>
                </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @returns {string}
             */
            commentTextInputField: () => {
                return `
                <div class="fixed-bottom pb-3 px-3 grey-background" id="dr-footer" style="background: #f5f5f5;">
                <form action="" id="chatbox">
                    <div class="reply-to">
                        <p id="replyto"></p>
                    <div class="input-group">
                        <input type="text" class="form-control font-12 rounded-lg mr-2" placeholder="Type a message" name="chatbox"
                            id="chat-input" style=" height: 40px;">
                        <div class="input-group-append" id="button-addon4">
                             <button class="border-0 ml-1 bg-transparent " id="attachments-btn" type="button">
                                 <!--<i class="fas fa fa-solid fa-paperclip"></i>-->
                           <!--  </button>-->
                            <!-- <button class="border-0 bg-transparent ml-1 attachment" id="attachments-btn" type="button">
                            <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/paperclip-solid.svg" alt="" class="circle-xsm attachment">
                            </button> -->
                            <button class="border-0 brand-text ml-1 bg-transparent" type="submit" id="submit-thread">
                                <i class="fa fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
                </form>
        
            </div>
        </div>
              
    `
            },

            /**
             * @author Subham Bhattacharjee
             * @param {string} leaveRoomModalId
             * @returns {string}
             */
            leaveModal: (leaveRoomModalId) => {
                return `<div class="modal fade leave-room-modal" id="${leaveRoomModalId}" tabindex="-1" aria-labelledby="leave-room-modal-label" aria-hidden="true">
                    <div class="modal-dialog p-4 m-0">
                        <div class="modal-content secondary-bg rounded-10-px">
                            <div class="modal-body">
                                <div class="d-flex justify-content-center mb-1">
                                    <p class="font-medium text-center">Are you sure you want to leave the discussion room?
                                    </p>
                                </div>
                                <div class="d-flex justify-content-between px-5">
                                    <button 
                                        type="button" 
                                        class="button-tertiary-brand-text font-14 border-0 cancel-leave"
                                        data-bs-dismiss="modal"
                                    >Cancel</button>
                                    <button 
                                        type="button" 
                                        class="button-tertiary text-danger font-14 border-0 leave-final leave-final"
                                        data-bs-dismiss="modal"
                                    >Leave</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @param {string} id
             * @returns {string}
             */
            deleteRoomModal: (id) => {
                return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="delete-room-modal-label" aria-hidden="true">
                    <div class="modal-dialog p-4 m-0">
                        <div class="modal-content secondary-bg rounded-10-px">
                            <div class="modal-body">
                                <div class="d-flex justify-content-center mb-1">
                                    <p class=" font-medium text-center">Are you sure you want to delete the discussion room?
                                    </p>
                                </div>
                                <div class="d-flex justify-content-between px-5">
                                    <button 
                                        type="button" 
                                        class="button-tertiary-brand-text font-14 border-0 cancel-delete"
                                        data-bs-dismiss="modal"
                                    >Cancel</button>
                                    <button 
                                        type="button" 
                                        class="button-tertiary text-danger font-14 border-0 delete-ok"
                                        data-bs-dismiss="modal"
                                    >Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @param {string} id
             * @returns {string}
             */
            reportMessageModal: (id) => {
                return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="report-thread-modal-label"
                    aria-hidden="true">
                    <div class="modal-dialog p-4 m-0">
                        <div class="modal-content secondary-bg rounded-10-px">
                            <div class="modal-body">
                                <div class="d-flex justify-content-center mb-1">
                                    <p class=" font-medium text-center">Are you sure you want to report this thread?
                                    </p>
                                </div>
                                <div class="d-flex justify-content-between px-5">
                                    <button 
                                        type="button" 
                                        class="button-tertiary-brand-text font-14 border-0 cancel-report"
                                        data-bs-dismiss="modal"
                                    >Cancel</button>
                                    <button 
                                        type="button" 
                                        class="button-tertiary text-danger font-14 border-0 report-final"
                                        data-bs-dismiss="modal"
                                    >Report</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @param {string} id
             * @returns {string}
             */
            deleteThreadModal: (id) => {
                return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="delete-thread-modal-label"
                    aria-hidden="true">
                    <div class="modal-dialog p-4 m-0">
                        <div class="modal-content secondary-bg rounded-10-px">
                            <div class="modal-body">
                                <div class="d-flex justify-content-center mb-1">
                                    <p class=" font-medium text-center">Are you sure you want to delete this thread?
                                    </p>
                                </div>
                                <div class="d-flex justify-content-between px-5">
                                    <button 
                                        type="button" 
                                        class="button-tertiary-brand-text font-14 border-0 cancel-delete"
                                        data-bs-dismiss="modal"
                                    >Cancel</button>
                                    <button 
                                        type="button" 
                                        class="button-tertiary text-danger font-14 border-0 delete-final"
                                        data-bs-dismiss="modal"
                                    >delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @param {string} id
             * @returns {string}
             */
            removeUserModal: (id) => {
                return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="remove-user-modal-label"
                    aria-hidden="true">
                    <div class="modal-dialog p-4 m-0">
                        <div class="modal-content secondary-bg rounded-10-px">
                            <div class="modal-body">
                                <div class="d-flex justify-content-center mb-1">
                                    <p class=" font-medium text-center">Are you sure you want to remove this user?
                                    </p>
                                </div>
                                <div class="d-flex justify-content-between px-5">
                                    <button 
                                        type="button" 
                                        class="button-tertiary-brand-text font-14 border-0 cancel-remove"
                                        data-bs-dismiss="modal"
                                    >Cancel</button>
                                    <button 
                                        type="button" 
                                        class="button-tertiary text-danger font-14 border-0 remove-final"
                                        data-bs-dismiss="modal"
                                    >remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @param {string} id
             * @param {dtring} reportMessageModalId
             * @returns {string}
             */
            messageReportOptionsModal: (id, reportMessageModalId) => {
                return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="report-thread-reason-modal-label"
                    aria-hidden="true">
                    <div class="modal-dialog p-4 m-0">
                        <div class="modal-content secondary-bg rounded-10-px">
                            <div class="modal-body">
                                <div class="d-flex justify-content-center mb-1">
                                    <p class="mb-0 font-medium text-center">What do you want to report this message for?</p>
                                </div>
                                <div>
                                    <hr class="mb-0">
                                    <button 
                                        type="button"
                                        class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3"
                                        data-bs-dismiss="modal"
                                        data-bs-toggle="modal"
                                        data-bs-target="#${reportMessageModalId}"
                                    >Fake news</button>
                                    <hr class="m-0">
                                    <button 
                                        type="button"
                                        class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3"
                                        data-bs-dismiss="modal"
                                        data-bs-toggle="modal"
                                        data-bs-target="#${reportMessageModalId}"
                                    >Discriminatory comment</button>
                                    <hr class="m-0">
                                    <button 
                                        type="button"
                                        class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3"
                                        data-bs-dismiss="modal"
                                        data-bs-toggle="modal"
                                        data-bs-target="#${reportMessageModalId}"
                                    >Sexual content</button>
                                    <hr class="m-0">
                                    <button 
                                        type="button"
                                        class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3"
                                        data-bs-dismiss="modal"
                                        data-bs-toggle="modal"
                                        data-bs-target="#${reportMessageModalId}"
                                    >Irrelevent</button>
                                    <hr class="m-0">
                                    <button 
                                        type="button"
                                        class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3"
                                        data-bs-dismiss="modal"
                                        data-bs-toggle="modal"
                                        data-bs-target="#${reportMessageModalId}"
                                    >Spam</button>
                                    <hr class="m-0">
                                    <button 
                                        type="button"
                                        class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3"
                                        data-bs-dismiss="modal"
                                        data-bs-toggle="modal"
                                        data-bs-target="#${reportMessageModalId}"
                                    >Promotional content</button>
                                    <hr class="mt-0 mb-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            },
            /** 
             * @author Divyansh Verma
             * @param {string} leaveRoomModalId
             * @param {number} roomTid
             * @returns {string}
             * 
             */
            participantOptions: (leaveRoomModalId, roomTid) => {
                return `<div class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right participant-options">
        <a class="d-flex align-items-center mb-3 saved-threads" href="/mobile/discussion/saved?tid=${roomTid}&uid=${app.user.uid}">
            <i class="fas fa fa-solid fa-bookmark font-14"></i>
            <p class="font-12 ml-2 mb-0">Saved Threads</p>
        </a>
        <div class="d-flex align-items-center mb-3 search-thread">
            <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/search-dr-icon.svg" alt="search-icon"
                class="icon-15">
            <p class="font-12 ml-2 mb-0">Search Thread</p>
        </div>
        <a class="d-flex align-items-center mb-3 mod-list" href="/mobile/discussion/modlist?tid=${roomTid}">
            <i class="fas fa fa-solid fa-users font-14"></i>
            <p class="font-12 ml-2 mb-0">Moderators List</p>
        </a>
        <a class="d-flex align-items-center mb-3 dr-rules" href="/mobile/discussion/rules?tid=${roomTid}">
            <i class="fas fa fa-solid fa-book font-14"></i>
            <p class="font-12 ml-2 mb-0">Rules of the room</p>
        </a>
        <div class="d-flex align-items-center mb-3 highlighted-threads">
            <i class="fa fa-solid fa-thumbtack font-14"></i>
            <p class="font-12 ml-2 mb-0">Highlighted Threads</p>
        </div>
        <div class="d-flex align-items-center mb-3 mute-room">
            <i class="fas fa fa-solid fa-bell-slash font-14"></i>
            <p class="font-12 ml-2 mb-0">Mute room</p>
        </div>
        <div class="d-flex align-items-center mb-3 text-danger leave-room" data-bs-toggle="modal" data-bs-target="#${leaveRoomModalId}">
            <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/leave-dr-icon.svg" alt="leave-icon"
                class="icon-15">
            <p class="font-12 ml-2 mb-0">Leave room</p>
        </div>
        </div>`
            },
            /** 
             * @author Divyansh Verma
             * @param {string} reportModalOptionsId
             * @returns {string}
             * 
             */
            participantOptionsOnSelectedThread: (reportModalOptionsId) => {
                return `<div id="${reportModalOptionsId}" class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right chat-focused participant-options-selected">
        <div class="d-flex align-items-center mb-3 chat-focused reply-selected">
            <i class="fas fa fa-solid fa-reply font-14"></i>
            <p class="font-12 ml-2 mb-0">Reply</p>
        </div>
        <div class="d-flex align-items-center mb-3 save-selected">
            <i class="fas fa fa-solid fa-bookmark font-14"></i>
            <p class="font-12 ml-2 mb-0">Save Thread</p>
        </div>
        <div class="d-flex align-items-center mb-3 share-selected">
            <img 
                src="https://blog.deepthought.education/wp-content/uploads/2022/04/share.svg" 
                class="icon-15"
                alt="share-icon"
            >
            <p class="font-12 ml-2 mb-0">Share thread</p>
        </div>
        <div class="d-flex align-items-center text-danger report-selected" data-bs-toggle="modal" data-bs-target="#${reportModalOptionsId}">
            <i class="fas fa fa-solid fa-shield font-14"></i>
            <p class="font-12 ml-2 mb-0">Report</p>
        </div>report-option
                </div>`
            },
            /** 
             * @author Divyansh Verma
             * @param {string} leaveRoomModalId
             * @param {number} roomTid
             * @returns {string}
             * 
             */
            moderatorOptions: (leaveRoomModalId, roomTid) => {
                return `<div class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right mod-options">
        <a class="d-flex align-items-center mb-3 saved-threads" href="/mobile/discussion/saved?tid=${roomTid}&uid=${app.user.uid}">
            <i class="fas fa fa-solid fa-bookmark font-14"></i>
            <p class="font-12 ml-2 mb-0">Saved Threads</p>
        </a>
        <div class="d-flex align-items-center mb-3 search-thread">
            <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/search-dr-icon.svg" alt="search-icon"
                class="icon-15">
            <p class="font-12 ml-2 mb-0">Search Thread</p>
        </div>
        <a class="d-flex align-items-center mb-3 mod-list" href="/mobile/discussion/modlist?tid=${roomTid}">
            <i class="fas fa fa-solid fa-users font-14"></i>
            <p class="font-12 ml-2 mb-0">Moderators List</p>
        </a>
        <a class="d-flex align-items-center mb-3 dr-rules" href="/mobile/discussion/rules?tid=${roomTid}">
            <i class="fas fa fa-solid fa-book font-14"></i>
            <p class="font-12 ml-2 mb-0">Rules of the room</p>
        </a>
        <div class="d-flex align-items-center mb-3 highlighted-threads">
            <i class="fa fa-solid fa-thumbtack font-14"></i>
            <p class="font-12 ml-2 mb-0">Highlighted Threads</p>
        </div>
        <a class="d-flex align-items-center mb-3 reported-threads" href="/mobile/discussion/reported/?roomid=${roomTid}">
            <i class="fas fa fa-solid fa-shield font-14"></i>
            <p class="font-12 ml-2 mb-0">Reported Threads</p>
        </a>
        <div class="d-flex align-items-center mb-3 mute-room">
            <i class="fas fa fa-solid fa-bell-slash font-14"></i>
            <p class="font-12 ml-2 mb-0">Mute room</p>
        </div>
        <div class="d-flex align-items-center mb-3 text-danger leave-room" data-bs-toggle="modal" data-bs-target="#${leaveRoomModalId}">
            <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/leave-dr-icon.svg" alt="leave-icon"
                class="icon-15">
            <p class="font-12 ml-2 mb-0">Leave room</p>
        </div>
        
        
    </div>`
            },

            /**
             * 
             * @param {string} deleteRoomModalId 
             * @returns 
             */
            deleteRoomButton: (deleteRoomModalId) => {
                return `<div class="d-none d-flex align-items-center text-danger delete-room" data-bs-toggle="modal" data-bs-target="#${deleteRoomModalId}">
            <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/delete-dr-icon.svg" alt="leave-icon"
                class="icon-15">
            <p class="font-12 ml-2 mb-0">Delete room</p>
        </div>`
            },

            /** 
             * @author Divyansh Verma
             * @param {string} removeUserModalId
             * @param {string} deleteThreadModalId
             * @returns {string}
             * 
             */
            moderatorOptionsOnSelectedThread: (removeUserModalId, deleteThreadModalId) => {
                return `<div class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right chat-focused mod-options-selected">
        <div class="d-flex align-items-center mb-3 chat-focused mod-options-selected">
            <i class="fas fa fa-solid fa-reply font-14"></i>
            <p class="font-12 ml-2 mb-0">Reply</p>
        </div>
        <div class="d-flex align-items-center mb-3 save-selected">
            <i class="fas fa fa-solid fa-bookmark font-14"></i>
            <p class="font-12 ml-2 mb-0">Save Thread</p>
        </div>
        <div class="d-flex align-items-center mb-3 share-selected">
            <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/share.svg" class="icon-15"
                alt="share-icon">
            <p class="font-12 ml-2 mb-0">Share thread</p>
        </div>
        <div class="d-flex align-items-center mb-3 highlight-selected">
            <i class="fa fa-solid fa-thumbtack font-14"></i>
            <p class="font-12 ml-2 mb-0">Highlight Thread</p>
        </div>
        <div class="d-flex align-items-center text-danger mb-3 delete-selected" data-bs-toggle="modal" data-bs-target="#${deleteThreadModalId}">
            <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/delete-dr-icon.svg" alt="delete-icon"
                class="icon-15">
            <p class="font-12 ml-2 mb-0">Delete Thread</p>
        </div>
        <div class="d-flex align-items-center text-danger remove-selected" data-bs-toggle="modal" data-bs-target="#${removeUserModalId}">
            <i class="fa fa-solid fa-user-minus font-14"></i>
            <p class="font-12 ml-2 mb-0">Remove user</p>
        </div>
    </div>`
            },
            /** 
             * @author Divyansh Verma
             * @returns {string}
             * 
             */
            sidebar: () => {
                return `<div class="sidebar-wrapper">
        <div class="sidebar-nav">
            <!-- sidebar header -->
            <div class="d-flex justify-content-between align-items-center px-2 py-2 mb-3 shadow-sm secondary-bg sidebar-wrapper">
                <div class=" d-flex align-items-center">
                    <i class="fa fa-solid fa-thumbtack"></i>
                    <p class="mb-0 ml-1 font-bold">Highlighted Threads</p>
                </div>
                <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/black-cross.svg"
                    class="close-highlighted">
            </div>
            <div class="px-3 highlighted-body"></div>
        </div>
    </div>`
            },
            /** 
             * @author Divyansh Verma
             * @returns {string}
             * 
             */
            moderatorSidebar: () => {
                return `<div class="mod-sidebar-wrapper">
        <div class="sidebar-nav">
            <!-- sidebar header -->
            <div class="d-flex justify-content-between align-items-center px-2 py-2 mb-3 shadow-sm secondary-bg sidebar-header">
                <div class=" d-flex align-items-center">
                    <i class="fa fa-solid fa-thumbtack"></i>
                    <p class="mb-0 ml-1 font-bold">Highlighted Threads</p>
                </div>
                <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/black-cross.svg close-highlighted">
            </div>
            <!-- sidebar body -->
            <div class="px-3" class="mod-highlighted-body"></div>
            <!-- sidebar footer -->
            <div class="primary-bg d-flex justify-content-center align-items-center py-2 text-danger sidebar-footer">
                <p class="font-14 mb-0">Remove Highlighted Thread</p>
            </div>
        </div>
    </div>`
            },
            /** 
             * @author Divyansh Verma
             * @returns {string}
             */
            showPageContent: (data) => {
                return `<div id="page-content-wrapper" class="pt-5 px-0 pb-0">     
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        ${components.pageContentHeader(data)}
                    </div>
                </div>
            </div>
        </div>`
            },

            /**
             * 
             * @param {boolean} isMod 
             * @returns {string}
             */
            mainContent: (data) => {
                return `<main class="toggled mod-toggled wrapper">
                   ${this.templates().sidebar(data)}
                   ${this.templates().showPageContent(data)}
                   ${this.templates().commentTextInputField(data)}
               </main>`
            },

            mainPage: () => {
                return `<main class="toggled mod-toggled wrapper"> 
              
                </main>`
               
            },

            /** 
             * @author Divyansh Verma
             * @param {string} title
             * @param {string} image
             * @param {string} imageModalId
             * @returns {string}
             * 
             */
            pageContentHeader: (data) => {
                console.log(data)
                return `
                <div id="page-content-wrapper" class="pt-5 px-0 pb-0" style="width: 100%!important;">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="fixed-top" id="dr-header">
                                <div
                                    class="dr-header d-flex justify-content-between align-items-center py-2 px-3 secondary-bg" style="box-shadow: 0 .125rem .25rem rgba(0,0,0,0.25)!important">
                                    <div class="dr-name d-flex align-items-center">
                                        <div class="backBtn pr-2"><i class="fa fa-arrow-left" aria-hidden="true" style=" font-size: smaller;"></i></div>
                                        <img src="${data.image}" alt="tesla roadster" class="circle-sm rounded-circle mr-2 img-cover" id="room-img">
                                        <p class="font-bold  mb-0" id="room-title">${data.title}</p>
                                    </div>
                                    <button class="border-0 bg-transparent" type="button" id="menu-btn">
                                        <!--<i class="fa fa-ellipsis-v" aria-hidden="true"></i>-->
                                    </button> 
                                </div>
                            </div>`
        
            },
            /** 
             * @author Divyansh Verma
             * @returns {string}
             * 
             */
            pageContentSearchThread: () => {
                return `<div class="d-none fixed-top search-thread-box">
        <div class="d-flex justify-content-between align-items-center py-1 shadow-sm px-3 secondary-bg">
            <i class="fas fa fa-solid fa-arrow-left mr-2 close-search"></i>
            <input type="search" name="search-thread-input search-thread-input"
                class="form-control " placeholder="Search Thread">
        </div>
    </div>`
            },
            /** 
             * @author Divyansh Verma
             * @returns {string}
             * @description intro boxes: rules and suggested article
             */
            pageContentIntroBoxes: (data) => {
                return `<div class="intro-boxes">
        <div class="primary-bg rounded-10-px border-secondary p-3 mb-3 room-rules-text">
            <div class="d-flex justify-content-between align-items-center">
                <p class=" mb-0">Rules of Discussion Room:</p>
               <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/black-cross.svg" class="close-rules">

            </div>
            <ol class="font-12 mb-0 pl-3 mt-2 rules-list">
               ${data}
            </ol>
        </div>

        <!--<div class="primary-bg rounded-10-px border-secondary px-3 pt-3 pb-1 mb-3 room-article-text">
            <div class="d-flex justify-content-between align-items-center">
                <p class="font-14 mb-0">Article Recommended by the host:</p>
                <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/black-cross.svg"
                    class="close-article">
            </div>
            <a 
                class="m-3 secondary-bg d-flex justify-content-between align-items-center py-1 px-3 rounded-10-px shadow-sm article-container"
                href=""
            >
            </a>
        </div>
    </div>-->`
            },

        }
        return components;
    }



};