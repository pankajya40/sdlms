'use strict';
/* globals define */
define('forum/mobile/discussion/view',
	['api','mobile/DiscussionRoom'],
	function (api) {
		var view = {};
		view.init=()=>{
			let roomId=ajaxify.data.data.roomId;
			let discuss=new DiscussionRoom(roomId,"#newwrapper")
		}

		// console.log('this is running')
		// function processMessage(message, old) {

		// 	message.class = message.self ? 'outgoing' : 'incoming';
		// 	let template = 'chat'
		// 	// console.log(message.cleanedContent.split('||').length)
		// 	if (message.cleanedContent.split('||').length === 1) {
		// 		try {
		// 			// console.log(location.origin + "/" + message.cleanedContent);
		// 			let url = new URL(String(location.origin + "/" + message.cleanedContent))
		// 			// debugger
		// 			// console.log(url, message.cleanedContent);
		// 			template = app.getFileTypeByURL(url.href)
		// 			// template="image";
		// 			console.log(template);
		// 			if(!template){
		// 				template = "chat";
		// 			}
		// 			if (template != 'chat') {
		// 				message.content = message.cleanedContent;

		// 			}
		// 			console.trace(message)
		// 			$('#wrapper')[old ? 'prepend' : 'append'](view._template[`${template}`](message));
		// 		}
		// 		catch (err) {
		// 			console.log(err)
		// 		}

		// 		// $('#wrapper')[old ? 'prepend' : 'append'](view._template[template](message));
		// 	}
		// 	else if (message.cleanedContent.split('||').length === 3) {
		// 		let temp = 'chatReply'
		// 		console.log("Reply time");
		// 		const pointer = message.cleanedContent.split('||')[0];
		// 		const orgText = message.cleanedContent.split('||')[1];
		// 		const replyText = message.cleanedContent.split('||')[2];
		// 		const replyData = {
		// 			pointer: pointer,
		// 			orgText: orgText.replace(' ', ""),
		// 			replyText: replyText,
		// 			uid: message.fromUser.uid,
		// 			picture: message.fromUser.picture,
		// 			mid: message.mid || message.messageId,
		// 			displayname: message.fromUser.displayname,
		// 		};
		// 		console.log(replyData);
		// 		if (replyData.orgText.split('/').length > 1) {
		// 			// console.log(app.user.uid);
		// 			temp = 'imageReply'
		// 			console.log(view._template[temp](replyData));
		// 		}
		// 		$('#wrapper').append(view._template[temp](replyData));

		// 		// try {
		// 		// 	let url = new URL(String(location.origin + replyData.orgText))
		// 		// 	console.log(url.href)
		// 		// 	type = app.getFileTypeByURL(url.href)
		// 		// 	console.log(type)
		// 		// }
		// 		// catch (err) {
		// 		// 	console.log(err)
		// 		// }
		// 		// if (type != 'chat') {
		// 		// 	message.content = message.cleanedContent
		// 		// }

		// 		// $('#wrapper').append(view._template.chatReply(replyData));




		// 	}
		// 	else {
		// 		console.log('here in else')
		// 	}
		// 	// try {
		// 	// 	let url = new URL(String(location.origin + message.cleanedContent))
		// 	// 	template = app.getFileTypeByURL(url.href)
		// 	// 	if (template == 'chat') {
		// 	// 		if (message.cleanedContent.split('||').length == 1) {
		// 	// 			console.log('|| here')
		// 	// 			$('#wrapper').append(view._template.chat(message));
		// 	// 		}
		// 	// 		else {
		// 	// 			const pointer = message.cleanedContent.split('||')[0];
		// 	// 			const orgText = message.cleanedContent.split('||')[1];
		// 	// 			const replyText = message.cleanedContent.split('||')[2];

		// 	// 			const replyData = {
		// 	// 				pointer: pointer,
		// 	// 				orgText: orgText,
		// 	// 				replyText: replyText,
		// 	// 				uid: message.fromUser.uid,
		// 	// 				picture: message.fromUser.picture,
		// 	// 				mid: message.mid,
		// 	// 				displayname: message.fromUser.displayname,
		// 	// 			};

		// 	// 			$('#wrapper').append(view._template.chatReply(replyData));
		// 	// 		}
		// 	// 	}
		// 	// 	else if(template!='chat'){
		// 	// 		message.content = message.cleanedContent
		// 	// 	}
		// 	// 	// if (template != 'chat') { message.content = message.cleanedContent }
		// 	// }
		// 	// catch (err) {
		// 	// 	console.log(err)
		// 	// }
		// 	// $('#wrapper')[old ? 'prepend' : 'append'](view._template[template](message));
		// 	// if (fileType) {
		// 	// 	template = fileType;
		// 	// 	$('#wrapper')[old ? 'prepend' : 'append'](view._template[template](message));
		// 	// } else if (message.cleanedContent.split('||').length == 1) $('#wrapper').append(view._template.chat(message));
		// 	// else {
		// 	// 	const pointer = message.cleanedContent.split('||')[0];
		// 	// 	const orgText = message.cleanedContent.split('||')[1];
		// 	// 	const replyText = message.cleanedContent.split('||')[2];

		// 	// 	const replyData = {
		// 	// 		pointer: pointer,
		// 	// 		orgText: orgText,
		// 	// 		replyText: replyText,
		// 	// 		uid: message.fromUser.uid,
		// 	// 		picture: message.fromUser.picture,
		// 	// 		mid: message.mid,
		// 	// 		displayname: message.fromUser.displayname,
		// 	// 	};

		// 	// 	$('#wrapper').append(view._template.chatReply(replyData));
		// 	// }

		// 	$('html, body').animate({ scrollTop: $(document).height() }, 100);
		// }

		// view.init = function () {
		// 	// variables
		// 	var reactions = ajaxify.data.data.reactions;
		// 	var cursorXPosition = 0;
		// 	var cursorXPositionDiff = 0;
		// 	let threadSelected = false;
		// 	let replyMode = false;
		// 	const TOUCHEVENTS = {
		// 		mobile: {
		// 			START: 'touchstart',
		// 			MOVE: 'touchmove',
		// 			END: 'touchend'

		// 		},
		// 		desktop: {
		// 			START: 'mousedown',
		// 			MOVE: 'mousemove',
		// 			END: 'mouseup'
		// 		}
		// 	}

		// 	const deskMob = isMobile() ? 'mobile' : 'desktop';

		// 	const menuBtn = document.querySelector('#menu-btn');

		// 	// getting roomId from url

		// 	const roomTid = ajaxify.data.data.roomId;

		// $(".backBtn").on("click", function() {
		// 	ajaxify.go("/mobile/message/list")
		// })

		// 	var handleTouchMove = function (event) {
		// 		console.log(event.changedTouches[0].pageX, event.changedTouches[0].screenX, event.changedTouches[0].clientX)
		// 		if (cursorXPosition === 0) {
		// 			cursorXPosition = isMobile() ? event.changedTouches[0].pageX : event.clientX;
		// 		}
		// 		console.log(cursorXPosition)
		// 		cursorXPositionDiff = isMobile() ? event.changedTouches[0].pageX : event.clientX - cursorXPosition;
		// 		// event.target.style.marginLeft = cursorXPositionDiff+'px'
		// 		// $(this).css({marginLeft:cursorXPositionDiff+"px"})
		// 		console.log('difference :', cursorXPositionDiff)
		// 	}

		// 	var handleTouchEnd = function (event) {
		// 		console.log('handleend')
		// 		threadSelected = true;
		// 		$('.chat.tertiary-border').removeClass('tertiary-border');
		// 		isMobile() ? '' : cursorXPositionDiff = event.clientX - cursorXPosition;
		// 		console.log(cursorXPositionDiff)
		// 		if (cursorXPositionDiff > 125) {
		// 			console.log('swipped left')
		// 			event.target.classList.add('replying');
		// 			replyMode = true;
		// 			document.querySelector('#chat-input').focus();
		// 			// $('.reply-to').addClass('chat')
		// 			// $('#replyto').text()

		// 		}
		// 		$(this).addClass('tertiary-border');
		// 		cursorXPosition = 0;
		// 		cursorXPositionDiff = 0;
		// 	}


		// 	//end swipe 
		// 	// function to render article
		// 	function renderArticle(pid) {
		// 		doAjax({
		// 			type: 'POST',
		// 			url: `/app/getarticles?pid=${pid}`,
		// 			method: 'POST',
		// 			dataType: 'json',
		// 			contentType: 'application/json',
		// 			data: JSON.stringify({}),
		// 		}).then(function (res) {
		// 			$('#article-container').append(view._template.article(res.response.data));
		// 		});
		// 	}

		// 	// function to save message
		// 	function saveMessage(messageId) {
		// 		api.put('/app/room/thread/save', {
		// 			messageId,
		// 			roomId: roomTid,
		// 		}).then(() => notify('Message has been saved', 'success'));
		// 	}

		// 	// function to highlight message
		// 	function highlightMessage(messageId) {
		// 		api.put('/app/room/thread/highlight', {
		// 			messageId,
		// 			roomId: roomTid,
		// 		}).then(() => {
		// 			notify('message has been highlighted', 'success');
		// 			ajaxify.refresh();
		// 		});
		// 	}

		// 	function removeUser(userId) {
		// 		doAjax({
		// 			type: 'POST',
		// 			url: '/app/removeuser',
		// 			method: 'POST',
		// 			dataType: 'json',
		// 			contentType: 'application/json',
		// 			data: JSON.stringify({
		// 				roomId: roomTid,
		// 				uids: [userId],
		// 			}),
		// 		}).then(function () {
		// 			notify("User has been removed from the room", "success")
		// 			$("#remove-user-modal").modal("hide");
		// 			$("#remove-user-modal").removeClass("show");
		// 		})
		// 	}



		// 	// report thread function
		// 	function reportThread() {
		// 		const messageId = $($('.chat.tertiary-border').parents('.chat-row')[0]).attr('id');
		// 		let reportedFor;

		// 		$('#report-thread-reason-modal').modal('show');

		// 		$('#report-thread-reason-modal').on('click', '.report-option', function () {
		// 			reportedFor = $(this).text();
		// 			console.log('reportedFor', reportedFor);
		// 			$('#report-thread-reason-modal').modal('hide');
		// 			$('#report-thread-modal').modal('show');
		// 		});

		// 		$('#cancel-report').on('click', () => {
		// 			$('.chat.tertiary-border').removeClass('tertiary-border');
		// 			$('#report-thread-modal').modal('hide');
		// 		});

		// 		$('#report-final').on('click', function () {
		// 			$('.chat.tertiary-border').removeClass('tertiary-border');
		// 			$('#report-thread-modal').modal('hide');

		// 			api.put('/app/room/thread/report', {
		// 				messageId:messageId,
		// 				roomId: roomTid,
		// 				reportedFor: reportedFor,
		// 			}).then(() => notify('thread reported successfully', 'success'))
		// 			.catch(err=>console.log(err));
		// 		});
		// 	}

		// 	// append highlighteed messages to sidebar
		// 	function loadHighlighted() {
		// 		$('#highlighted-body').empty();
		// 		api.get(`/app/room/thread/highlighted/${roomTid}`, {})
		// 			.then((res) => {
		// 				console.log(res);
		// 				res.data.map(message => $('#highlighted-body').append(view._template.highlightedMessage(message)));
		// 			});
		// 	}

		// 	// append highlighteed messages to sidebar
		// 	function loadModHighlighted() {
		// 		$('#mod-highlighted-body').empty();
		// 		api.get(`/app/room/thread/highlighted/${roomTid}`, {})
		// 			.then((res) => {
		// 				console.log(res);
		// 				res.data.map(message => $('#mod-highlighted-body').append(view._template.highlightedModMessage(message)));
		// 			});
		// 	}

		// 	// scroll to message using id of message
		// 	function scrollToMessage(messageId) {
		// 		console.log(messageId);
		// 		$(`#${messageId}`)[0].scrollIntoView({
		// 			behavior: 'auto',
		// 			block: 'center',
		// 			inline: 'center',
		// 		});
		// 	}

		// 	// function to check if device is mobile
		// 	function isMobile() {
		// 		var check = false;
		// 		(function (a) {
		// 			if (
		// 				/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
		// 					a
		// 				) ||
		// 				/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
		// 					a.substr(0, 4)
		// 				)
		// 			) {
		// 				check = true;
		// 			}
		// 		}(navigator.userAgent || navigator.vendor || window.opera));

		// 		return check;
		// 	}

			

		// 	// // showcase image in modal on click
		// 	$('body').on('click', '.chat > img', function () {
		// 		$('#modalImg').attr('src', $(this).attr('src'));
		// 		$('#imageModal').modal('show');
		// 	});

		// 	// showcase image in profile on click
		// 	$('body').on('click', '#room-img', function () {
		// 		$('#modalImg').attr('src', $(this).attr('src'));
		// 		$('#imageModal').modal('show');
		// 	});

		// 	$('#wrapper').on('click','.thread', function () {
		// 		var messageId= $(this).data("id");
		// 		$(`.hold-options`).empty().addClass('d-none');
		// 		$(`[hold-options-${messageId}]`).removeClass('d-none');
		// 		$(`[hold-options-${messageId}]`).html( `<div class="view-thread-profile col-6 p-0 pl-0" data-id=${messageId}><i class="fa fa-street-view" aria-hidden="true" id="view"></i></div><div class="view-thread-reaction-modal col-6 p-0 pl-2" data-id=${messageId}><i class="fa fa-smile-o" id="reaction" data-toggle="modal" data-target="#exampleModalCenter"></i></div>`)
		// 	});

		// 	$('#wrapper').on('click', '.view-thread-profile', function() {
		// 		var messageId=$(this).data("id");
		// 		ajaxify.go(`mobile/discussion/profile/${roomTid}?type=thread&id=${messageId}`)
		// 	})

		// 	$('#wrapper').on('click', '.view-thread-reaction-modal', function(e) {
		// 		var messageId=$(this).data("id");
		// 		$('.main-box').removeClass('d-none');
		// 		localStorage.setItem('messageId',messageId);
		// 	})

		// 	// $('body').on('click', '.reaction-tab', function() {
		// 	// 	var name = $(this).data('name')
		// 	// 	$(".reaction-tab").removeClass("tab-active");
		// 	//     $(this).addClass("tab-active");
		// 	// 	$(".select-lable").html(name);
		// 	// 	$('select[name="reaction_category"]').html(reactions[name].map((item)=>`<option value="${item.value}">${item.name}</option>`).join(''));				
		// 	// });

		// 	// $('.submit-reflection').on('click', function(e) {
		// 	// 	e.preventDefault()
		// 	// 	var submissionData = $('#submit-reflection').serializeObject()
		// 	// 	let messageId = localStorage.getItem('messageId')
		// 	// 	var data = {
		// 	// 		category : $(".tab-active").text(),
		// 	// 		subCategory : submissionData.reaction_category,
		// 	// 		reflection : submissionData.reflection,
		// 	// 		messageId : messageId,
		// 	// 		roomId : ajaxify.data.data.roomId
		// 	// 	}
		// 	// 	$('.main-box').addClass('d-none');
		// 	// 	api.post(`/app/reactions`, data).then(res => {
		// 	// 		console.log(res);
		// 	// 	})
		// 	// })

		// 	// $('.reaction-tab').first().click()

		// 	$('body').on('click', '.close-modal', function () {
		// 		$('.main-box').addClass('d-none');
		// 	});

		// 	// deselect chat if click outside selected chat
		// 	$('body').on('click', function (e) {
		// 		const eventTarget = $(e.target);
		// 		const eventParent = $(e.target).parent();

		// 		// check if user clicks outside menu options, text field or any chat and remove selected
		// 		if (
		// 			!$.contains($('#menu-btn')[0], e.target) &&
		// 			!$.contains($('#participant-options-selected')[0], e.target) &&
		// 			!$.contains($('#mod-options-selected')[0], e.target) &&
		// 			!$.contains($('#reply-selected')[0], e.target) &&
		// 			!$.contains($('#chatbox')[0], e.target) &&
		// 			!eventTarget.hasClass('chat') &&
		// 			!eventParent.hasClass('chat')
		// 		) {
		// 			$('.chat.tertiary-border').removeClass('tertiary-border');
		// 			threadSelected = false;
		// 		}
		// 	});

		// 	// select chat on click
		// 	// $('#wrapper').on(holdStart, '.chat', function () {
		// 	// 	const that = $(this);
		// 	// 	setTimeout(() => {
		// 	// 		threadSelected = true;
		// 	// 		$('.chat.tertiary-border').removeClass('tertiary-border');
		// 	// 		that.addClass('tertiary-border');
		// 	// 	}, 500);
		// 	// });

		// 	// hide intro boxes if chats exist
		// 	if ($('.chat-row').length > 0) {
		// 		$('#intro-boxes').addClass('d-none');
		// 	}

		// 	// delete highlighted thread
		// 	$('#sidebar-footer').on('click', function () {
		// 		const selectedThreads = $('input[name="thread-selector"]:checked');
		// 		selectedThreads.each(function () {
		// 			const threadContainer = $(this).parents('.highlighted-thread-content').first();
		// 			api.del('/app/room/thread/highlight', {
		// 				messageId: $(threadContainer).data('mid'),
		// 				roomId: roomTid,
		// 			}).then((res) => {
		// 				$(threadContainer).removeClass('d-flex');
		// 				$(threadContainer).addClass('d-none');
		// 			});
		// 		});
		// 	});

		// 	// append received chat
		// 	socket.off().on('event:chats.receive', function (data) {
		// 		console.log("socket.on here")
		// 		console.log(data.roomId);
		// 		if (parseInt(data.roomId, 10) === parseInt(roomTid, 10)) {
		// 			console.log('data.message : ', data.message)
		// 			processMessage(data.message);
		// 		}
		// 	});

		// 	// chat append
		// 	$('#wrapper').on('submit', '#chatbox', function (e) {
		// 		e.preventDefault();

		// 		const $this = $('#chat-input');
		// 		const text = $this.val();
		// 		console.log(text.trim());
		// 		if (!text.trim()) {
		// 			return console.log('empty');
		// 		}

		// 		// $('.chat').on('swipe', function () {
		// 		// 	replyMode = true;
		// 		// 	document.querySelector('#chat-input').focus();
		// 		// })

		// 		// if replying
		// 		if (replyMode) {

		// 			console.log('emitting reply');
		// 			const pointer = $('.chat.tertiary-border').parent().parent().attr('id');
		// 			const orgText = $(`.chat.tertiary-border > p`).text();
		// 			const imageUrl = $(`.chat.tertiary-border > img`).attr('src');
		// 			const replyMessage = `${pointer}|| ${orgText}||${text}`;
		// 			const replyImage = `${pointer}|| ${imageUrl}||${text}`;
		// 			console.log('here message :', replyMessage, 'here image : ', replyImage)
		// 			var message = replyImage;
		// 			if (replyImage.split('||')[1] == ' undefined') {
		// 				message = replyMessage;
		// 			}

		// 			socket.emit('modules.chats.send', {
		// 				roomId: roomTid,
		// 				message: message,
		// 			}, function (err) {
		// 				if (err) {
		// 					return console.log(err);
		// 				}
		// 			});

		// 			replyMode = false;
		// 			$('.chat.tertiary-border').removeClass('tertiary-border');
		// 		} else {
		// 			console.log('emitting text');
		// 			// processMessage(text);

		// 			socket.emit('modules.chats.send', {
		// 				roomId: roomTid,
		// 				message: text,
		// 			}, function (err) {
		// 				if (err) {
		// 					return console.log(err);
		// 				}
		// 			});
		// 		}

		// 		$this.val('');
		// 	});

		// 	// scroll to highlighted message
		// 	$('body').on('click', '.visit-listed-btn', function () {
		// 		const messageId = parseInt($(this).data('mid'));
		// 		scrollToMessage(messageId);

		// 		$('#wrapper').addClass('mod-toggled');
		// 		$('#wrapper').addClass('toggled');
		// 		$('#dr-header').removeClass('d-none');
		// 		$('#dr-footer').removeClass('d-none');
		// 	});

		// 	// reply to highlighted message
		// 	$('body').on('click', '.reply-listed-btn', function () {
		// 		const messageId = parseInt($(this).data('mid'));
		// 		scrollToMessage(messageId);

		// 		$('#wrapper').addClass('mod-toggled');
		// 		$('#wrapper').addClass('toggled');
		// 		$('#dr-header').removeClass('d-none');
		// 		$('#dr-footer').removeClass('d-none');
		// 	});

		// 	// scroll on reply click
		// 	$('body').on('click', '.reply', function () {
		// 		const scrollId = $(this).attr('pointer');
		// 		scrollToMessage(scrollId);
		// 	});

		// 	$('#article-container').on('click', function () {
		// 		const articlePid = $(this).find('img').data('pid');
		// 		notify("redirecting to article", "success");
		// 		ajaxify.go(`/mobile/article/view?pid=${articlePid}`)
		// 	})

		// 	document
		// 		.querySelector('#close-article')
		// 		.addEventListener('click', () => document.querySelector('#room-article-text').classList.add('d-none')
		// 		);

		// 	document
		// 		.querySelector('#close-rules')
		// 		.addEventListener('click', () => document.querySelector('#room-rules-text').classList.add('d-none')
		// 		);

		// 	// open attachments menu
		// 	// $('body').on('click', '#attachments-btn', () => $('.attachments-menu').removeClass('d-none')
		// 	// );

		// 	$('body').on('click', '#attachments-btn', () => {
		// 		$('.attachments-menu').toggleClass('d-none')
		// 		console.log('clicked')
		// 	}
		// 	);

		// 	// close menus
		// 	$('body').on('click', function (event) {

		// 		if (!$.contains($('#attachments-btn')[0], event.target)) $('.attachments-menu').addClass('d-none');
		// 		if (!$.contains($('#menu-btn')[0], event.target)) {
		// 			$('#participant-options-selected').addClass('d-none');
		// 			$('#participant-options').addClass('d-none');
		// 			$('#mod-options-selected').addClass('d-none');
		// 			$('#mod-options').addClass('d-none');
		// 			$('#menu-btn').removeClass('d-none');
		// 		}
		// 	});




		// 	function sendMessage(message) {
		// 		if (!message) return;
		// 		console.log('here socket.on')
		// 		socket.emit('modules.chats.send', {
		// 			roomId: roomTid,
		// 			message: message,
		// 		}, function (err) {
		// 			if (err) {
		// 				return console.log(err);
		// 			}
		// 		});
		// 	}

		// 	$('body').on('change', '[name="files"]', function (e) {
		// 		const formData = new FormData();
		// 		const $that = this;

		// 		if (!window.FileReader) {
		// 			console.log("The file API isn't supported on this browser yet.");
		// 			return;
		// 		}
		// 		if (!$that) {
		// 			console.error("This browser doesn't seem to support the `files` property of file inputs.");
		// 			return;
		// 		}
		// 		var file = $that.files[0];
		// 		if (!file) {
		// 			console.log("Please select a file before clicking 'Load'");
		// 			return;
		// 		}

		// 		const size = file.size / 1024 / 1024;
		// 		if (size > 5) {
		// 			return alert('File size must be less than 5MB');
		// 		}

		// 		console.log(file);
		// 		console.log('here', app.getFileTypeByURL(file.name, true));
		// 		if (!app.getFileTypeByURL(file.name, true)) return alert('File type is not supported');
		// 		checkt = app.getFileTypeByURL(file.name, true);
		// 		formData.append('files[files]', file);

		// 		doAjax({
		// 			url: '/app/uploadfile',
		// 			type: 'POST',
		// 			data: JSON.stringify(formData),
		// 			cache: false,
		// 			contentType: false,
		// 			processData: false,
		// 		}).then((res) => {
		// 			console.log(res.response, res);
		// 			sendMessage(res.response.files);
		// 			$that.value = '';
		// 		});
		// 	});

		// 	// getting room details and rendering them
		// 	doAjax({
		// 		type: 'POST',
		// 		url: '/app/getroom',
		// 		method: 'POST',
		// 		dataType: 'json',
		// 		contentType: 'application/json',
		// 		data: JSON.stringify({
		// 			roomId: [roomTid],
		// 		}),
		// 	}).then(function (res) {
		// 		console.log('res is here', res)
		// 		doAjax({
		// 			type: 'POST',
		// 			url: '/app/loadroom',
		// 			method: 'POST',
		// 			dataType: 'json',
		// 			contentType: 'application/json',
		// 			data: JSON.stringify({
		// 				roomId: [roomTid],
		// 			}),
		// 		}).then(function (response) {
		// 			console.log('here', response.response.isOwner);

		// 			const modList = response.response.moderators;

		// 			modList.push(response.response.owner);

		// 			if (response.response.isOwner) {
		// 				console.log('login owner')
		// 				$('body').find('#delete-room').removeClass('d-none')
		// 			};


		// 			if (response.response.messages.length > modList.length) $('#intro-boxes').addClass('d-none');

		// 			for (let index = 0; index < response.response.messages.length; index++) {
		// 				const message = response.response.messages[index];


		// 				processMessage(message)




		// 				// let url = new URL(String(location.origin + message.cleanedContent))
		// 				// template = app.getFileTypeByURL(url.href)
		// 				// console.log(template)
		// 				// if (message.cleanedContent.split('||').length == 1) {
		// 				// 	$('#wrapper').append(view._template.image(message));
		// 				// } else {
		// 				// 	const pointer = message.cleanedContent.split('||')[0];
		// 				// 	const orgText = message.cleanedContent.split('||')[1];
		// 				// 	const replyText = message.cleanedContent.split('||')[2];

		// 				// 	const replyData = {
		// 				// 		pointer: pointer,
		// 				// 		orgText: orgText,
		// 				// 		replyText: replyText,
		// 				// 		uid: message.fromUser.uid,
		// 				// 		picture: message.fromUser.picture,
		// 				// 		mid: message.mid,
		// 				// 		displayname: message.fromUser.displayname,
		// 				// 	};

		// 				// 	$('#wrapper').append(view._template.chatReply(replyData));
		// 				// }
		// 			}

		// 			// scroll on load
		// 			if (ajaxify.data.data.scrollId) scrollToMessage(parseInt(ajaxify.data.data.scrollId));
		// 			else $('html, body').animate({ scrollTop: $(document).height() }, 100);

		// 			$('#app-loader').hide();

		// 			$('body').on(TOUCHEVENTS[deskMob].START, '.chat', function (e) {
		// 				cursorXPosition = e.clientX;
		// 				this.addEventListener(isMobile() ? TOUCHEVENTS['mobile'].MOVE : TOUCHEVENTS['desktop'].END, isMobile() ? handleTouchMove : handleTouchEnd, false);
		// 				this.addEventListener(TOUCHEVENTS[deskMob].END, handleTouchEnd, false);
		// 			})
		// 			// app.link.script(app.script.HAMMERJS.HAMMER, function () {
		// 			// 	var el = document.getElementsByClassName('chat')
		// 			// 	$('.chat').each(function(){
		// 			// 		var hammertime = new Hammer(this)

		// 			// 		hammertime.on('swipe',function(ev){
		// 			// 			// handleAnimation(ev)
		// 			// 			// handleReply(ev)
		// 			// 		})
		// 			// 	})
		// 			// })


		// 		});

		// 		let isMod;

		// 		$('#room-title').text(res.response.name);
		// 		$('#room-img').attr('src', res.response.image);
		// 		res.response.rules
		// 			.split('\n')
		// 			.map(rule => $('#rules-list').append(view._template.rule(rule)));

		// 		// render article if attached
		// 		res.response.attachment_id ? renderArticle(res.response.attachment_id) : $('#room-article-text').addClass('d-none');

		// 		const modList = res.response.moderators;

		// 		modList.push(res.response.owner);

		// 		console.log(modList);

		// 		$.inArray(app.user.uid, modList) == -1 ? isMod = false : isMod = true;

		// 		console.log(isMod);

		// 		// participant specific functionality if not mod
		// 		if (isMod == false) {
		// 			loadHighlighted();

		// 			const participantOptions = document.querySelector('#participant-options');
		// 			const participantOptionsSelected = document.querySelector(
		// 				'#participant-options-selected'
		// 			);

		// 			// check menu
		// 			menuBtn.addEventListener('click', () => {
		// 				if (threadSelected) {
		// 					menuBtn.classList.add('d-none');
		// 					participantOptionsSelected.classList.remove('d-none');
		// 				} else {
		// 					menuBtn.classList.add('d-none');
		// 					participantOptions.classList.remove('d-none');
		// 				}
		// 			});

		// 			document
		// 				.querySelector("#saved-threads")
		// 				.addEventListener("click", () => {
		// 					notify("redirecting to saved threads", "success");
		// 					ajaxify.go(`/mobile/discussion/saved?tid=${roomTid}&uid=${app.user.uid}`)
		// 				});

		// 			// open and close search threads box
		// 			document
		// 				.querySelector('#search-thread')
		// 				.addEventListener('click', () => {
		// 					document
		// 						.querySelector('#search-thread-box')
		// 						.classList.remove('d-none');
		// 					document.querySelector('#dr-header').classList.add('d-none');
		// 				});

		// 			document
		// 				.querySelector('#close-search')
		// 				.addEventListener('click', () => {
		// 					document
		// 						.querySelector('#search-thread-box')
		// 						.classList.add('d-none');
		// 					document.querySelector('#dr-header').classList.remove('d-none');
		// 				});

		// 			document
		// 				.querySelector("#mod-list")
		// 				.addEventListener("click", () => {
		// 					notify("redirecting to moderator's list", "success");
		// 					ajaxify.go(`/mobile/discussion/modlist?tid=${roomTid}`)
		// 				});

		// 			document
		// 				.querySelector("#dr-rules")
		// 				.addEventListener("click", () => {
		// 					notify("redirecting to discussion room rules", "success");
		// 					ajaxify.go(`/mobile/discussion/rules?tid=${roomTid}`)
		// 				});

		// 			// leave modal
		// 			$('#leave-room').on('click', function () {
		// 				$('#leave-room-modal').modal('show');
		// 			});

		// 			$('#cancel-leave').on('click', function () {
		// 				$('#leave-room-modal').modal('hide');
		// 			});

		// 			$("#leave-final").on("click", () => {
		// 				$("#leave-room-modal").modal("hide");
		// 				$("#leave-room-modal").removeClass("show");
		// 				notify("leaving room", "error");

		// 				removeUser(app.user.uid);
		// 			});

		// 			// // delete modal
		// 			$('#delete-room').on('click', function () {
		// 				$('#delete-room-modal').modal('show');
		// 			});

		// 			$('#cancel-delete').on('click', function () {
		// 				$('#delete-room-modal').modal('hide');
		// 			});

		// 			$("#delete-ok").on("click", () => {
		// 				$("#delete-room-modal").modal("hide");
		// 				$("#delete-room-modal").removeClass("show");
		// 				notify("deleting room", "error");

		// 				removeUser(app.user.uid);
		// 			});

		// 			// sidebar toggle
		// 			$('#highlighted-threads').on('click', function (e) {
		// 				e.preventDefault();
		// 				$('#wrapper').toggleClass('toggled');
		// 				$('#dr-header').toggleClass('d-none');
		// 			});

		// 			$('#close-highlighted').on('click', () => {
		// 				$('#wrapper').addClass('toggled');
		// 				$('#dr-header').toggleClass('d-none');
		// 			});

		// 			document
		// 				.querySelector('#reply-selected')
		// 				.addEventListener('click', () => {
		// 					document.querySelector('#chat-input').focus();
		// 					replyMode = true;
		// 				});

		// 			$('#report-selected').on('click', () => reportThread());

		// 			$('#save-selected').on('click', () => {
		// 				const messageId = $($('.chat.tertiary-border').parents('.chat-row')[0]).attr('id');
		// 				saveMessage(messageId);
		// 			});
		// 		} else {
		// 			loadModHighlighted();

		// 			$('body').on('click', '#menu-btn', function () {
		// 				if (!threadSelected) {
		// 					$('#mod-options').removeClass('d-none');
		// 					$('#mod-options-selected').addClass('d-none');
		// 					$('#menu-btn').addClass('d-none');
		// 				} else {
		// 					$('#menu-btn').addClass('d-none');
		// 					$('#mod-options').addClass('d-none');
		// 					$('#mod-options-selected').removeClass('d-none');
		// 				}
		// 			});

		// 			$('#mod-options > #saved-threads').on('click', () => {
		// 				notify('Redirecting to saved threads', 'success');
		// 				ajaxify.go(`/mobile/discussion/saved?mod=true&uid=${app.user.uid}&tid=${roomTid}`);
		// 			});

		// 			$('#mod-options > #search-thread').on('click', () => $('#search-thread-box').removeClass('d-none'));

		// 			$('#close-search').on('click', () => $('#search-thread-box').addClass('d-none'));

		// 			$('#mod-options > #mod-list').on('click', () => {
		// 				notify("Opening moderators' list", 'success');
		// 				ajaxify.go(`/mobile/discussion/modlist?mod=true&tid=${roomTid}`);
		// 			});

		// 			$('#mod-options > #dr-rules').on('click', () => {
		// 				notify('Redirecting to rules of the discussion room', 'success');
		// 				ajaxify.go(`/mobile/discussion/rules?mod=true&tid=${roomTid}`);
		// 			}
		// 			);

		// 			$('#mod-options > #highlighted-threads').on('click', () => {
		// 				$('#wrapper').removeClass('mod-toggled');
		// 				$('#dr-header').addClass('d-none');
		// 				$('#dr-footer').addClass('d-none');
		// 			});

		// 			$('#mod-sidebar-wrapper #close-highlighted').on('click', () => {
		// 				$('#wrapper').addClass('mod-toggled');
		// 				$('#dr-header').removeClass('d-none');
		// 				$('#dr-footer').removeClass('d-none');
		// 			});

		// 			$('#mod-options > #reported-threads').on('click', () => {
		// 				notify('Redirecting to saved threads', 'success');
		// 				ajaxify.go(`/mobile/discussion/reported/?roomid=${roomTid}`);
		// 			});

		// 			$('#mod-options > #leave-room').on('click', () => {
		// 				$('#leave-room-modal').modal('show');
		// 				$('#leave-room-modal').addClass('show');
		// 			});

		// 			$('#cancel-leave').on('click', () => {
		// 				$('#leave-room-modal').modal('hide');
		// 				$('#leave-room-modal').removeClass('show');
		// 			});

		// 			$('#leave-final').on('click', () => {
		// 				notify('leaving room', 'error');

		// 				$('#leave-room-modal').modal('hide');
		// 				$('#leave-room-modal').removeClass('show');

		// 				removeUser(app.user.uid);
		// 			});






		// 			$('#mod-options > #delete-room').on('click', () => {
		// 				$('#delete-room-modal').modal('show');
		// 				$('#delete-room-modal').addClass('show');
		// 			});

		// 			$('#cancel-delete').on('click', () => {
		// 				$('#delete-room-modal').modal('hide');
		// 				$('#delete-room-modal').removeClass('show');
		// 			});

		// 			$('#delete-ok').on('click', () => {
		// 				const roomId = $($('.chat.tertiary-border').parents('.chat-row')[0]).attr('id');

		// 				notify('Deleting room', 'error');

		// 				doAjax({
		// 					type: 'DELETE',
		// 					url: `/app/room/${roomTid}`,

		// 					method: 'DELETE',
		// 					dataType: 'json',
		// 					contentType: 'application/json',
		// 					data: JSON.stringify({



		// 					}),
		// 				}).then(function (response) {
		// 					$('#delete-room-modal').modal('hide');
		// 					$('#delete-room-modal').removeClass('show');

		// 					console.log(response);
		// 					ajaxify.go(`/mobile/discussion/joined`)


		// 				});
		// 			});











		// 			$('#mod-options-selected > #reply-selected').on('click', () => {
		// 				document.querySelector('#chat-input').focus();
		// 				replyMode = true;
		// 			});

		// 			$('#mod-options-selected > #save-selected').on('click', () => {
		// 				const messageId = $($('.chat.tertiary-border').parents('.chat-row')[0]).attr('id');
		// 				saveMessage(messageId);
		// 			});

		// 			$('#mod-options-selected > #highlight-selected').on('click', () => {
		// 				const messageId = $($('.chat.tertiary-border').parents('.chat-row')[0]).attr('id');
		// 				highlightMessage(messageId);
		// 			});

		// 			$('#mod-options-selected > #delete-selected').on('click', () => {
		// 				$('#delete-thread-modal').modal('show');
		// 				$('#delete-thread-modal').addClass('show');
		// 			});

		// 			$('#cancel-delete').on('click', () => {
		// 				$('#delete-thread-modal').modal('hide');
		// 				$('#delete-thread-modal').removeClass('show');
		// 			});

		// 			$('#delete-final').on('click', () => {
		// 				const messageId = $($('.chat.tertiary-border').parents('.chat-row')[0]).attr('id');

		// 				doAjax({
		// 					type: 'POST',
		// 					url: '/app/deletemessage',
		// 					method: 'POST',
		// 					dataType: 'json',
		// 					contentType: 'application/json',
		// 					data: JSON.stringify({
		// 						mid: messageId,
		// 					}),
		// 				}).then(function (response) {
		// 					$('#delete-thread-modal').modal('hide');
		// 					$('#delete-thread-modal').removeClass('show');

		// 					$(`#${messageId}`).addClass('d-none');
		// 				});
		// 			});

		// 			$('#mod-options-selected > #remove-selected').on('click', () => {
		// 				$('#remove-user-modal').modal('show');
		// 				$('#remove-user-modal').addClass('show');
		// 			});

		// 			$('#cancel-remove').on('click', () => {
		// 				$('#remove-user-modal').modal('hide');
		// 				$('#remove-user-modal').removeClass('show');
		// 			});

		// 			$('#remove-final').on('click', () => {
		// 				userUid = $($('.chat.tertiary-border').parents('.chat-row')[0]).attr('uid');

		// 				if (userUid != app.user.uid) {
		// 					removeUser(userUid);
		// 				} else {
		// 					$('#remove-user-modal').modal('hide');
		// 					$('#remove-user-modal').removeClass('show');
		// 				}
		// 			});
		// 		}
		// 	});
		// };

		// // chat template
		// view._template = {
		// 	chat: function (data) {
		// 		if (app.user.uid == data.fromUser.uid) {
		// 			return `<div class="chat-row outgoing unselectable" data-id=${data.mid ? data.mid : data.messageId} uid=${data.fromUser.uid}>
		// 		     <div class="d-flex thread" data-id=${data.mid ? data.mid : data.messageId}>
		// 			 <div class="hold-options mr-3 d-none row" hold-options-${data.mid ? data.mid : data.messageId}> </div>		
		// 			 <div class="addclr">
	    //              			<div class="chat w-break" >
		// 							<p class="mb-0 font-14">${data.cleanedContent}</p>
		// 						</div>			
        //                  </div>
        //                  </div>
		// 				 </div>
		// 				`;
		// 		}
		// 		return `<div class=" chat-row incoming unselectable" data-id=${data.mid ? data.mid : data.messageId} uid=${data.fromUser.uid}>
		// 					<div class="d-flex thread" data-id=${data.mid ? data.mid : data.messageId}>
		// 					<div class="bordr">
		// 						<p class="font-14 mb-0 f-weight leftm">
		// 							${data.fromUser.displayname}
		// 						</p>
		// 						<div class="chat w-break">
		// 							<p class="mb-0 font-14">${data.cleanedContent}</p>
		// 						</div>
		// 					</div>
		// 					<div class="ml-1 hold-options row d-none" hold-options-${data.mid ? data.mid : data.messageId}> 
		// 					</div>
        //                      </div>
		// 				`;
		// 	},
		// 	image: function (data) {
		// 		if (app.user.uid == data.fromUser.uid) {
		// 			return `<div class="chat-row outgoing day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  id=${data.mid ? data.mid : data.messageId}>
		// 					<div>
		// 						<p class="font-10 mb-0">
		// 							Me
		// 						</p>
		// 						<div class="chat">
		// 							<img src="${data.content}" alt="" class="circle-lg img-cover">
		// 						</div>
		// 					</div>
		// 					<img src="${data.fromUser.picture}" alt="man 2" class="circle-sm rounded-circle img-cover">
		// 				</div>`;
		// 		}
		// 		return `<div class="chat-row incoming day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  id=${data.mid ? data.mid : data.messageId}>
		// 					<img src="${data.fromUser.picture}" alt="man 2" class="circle-sm rounded-circle img-cover">
		// 					<div>
		// 						<p class="font-10 mb-0">
		// 							${data.fromUser.displayname}
		// 						</p>
		// 						<div class="chat">
		// 							<img src="${data.content}" alt="" class="circle-lg img-cover">
		// 						</div>
		// 					</div>
		// 				</div>`;
		// 	},
		// 	audio: function (data) {
		// 		if (app.user.uid == data.fromUser.uid) {
		// 			return `<div class="chat-row  outgoing day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  data-id=${data.mid ? data.mid : data.messageId}>
		// 					<div class="w-75">
		// 						<p class="font-10 mb-0">
		// 							Me
		// 						</p>
		// 						<div class="chat">
		// 							<audio controls class="w-100">
		// 								<source src="${data.content}" type="audio/mpeg">
		// 								Your browser does not support the audio element.
		// 							</audio>
		// 						</div>
		// 					</div>
		// 					<img src="${data.fromUser.picture}"
		// 						alt="man 2" class="circle-sm rounded-circle img-cover">
		// 				</div>`;
		// 		}
		// 		return `<div class="chat-row  incoming day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  id=${data.mid ? data.mid : data.messageId}>
		// 					<img src="${data.fromUser.picture}"
		// 					alt="man 2" class="circle-sm rounded-circle img-cover">
		// 					<div class="w-75">
		// 						<p class="font-10 mb-0">
		// 							${data.fromUser.displayname}
		// 						</p>
		// 						<div class="chat">
		// 							<audio controls class="w-100">
		// 								<source src="${data.content}" type="audio/mpeg">
		// 								Your browser does not support the audio element.
		// 							</audio>
		// 						</div>
		// 					</div>
		// 				</div>`;
		// 	},
		// 	video: function (data) {
		// 		if (app.user.uid == data.fromUser.uid) {
		// 			return `<div class="chat-row  outgoing day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  id=${data.mid ? data.mid : data.messageId}>
		// 					<div>
		// 						<p class="font-10 mb-0">
		// 							Me
		// 						</p>
		// 						<div class="chat">
		// 							<video controls>
		// 								<source src="${data.content}" type="video/mp4">
		// 								Your browser does not support the audio element.
		// 							</video>
		// 						</div>
		// 					</div>
		// 					<img src="${data.fromUser.picture}"
		// 						alt="man 2" class="circle-sm rounded-circle img-cover">
		// 				</div>`;
		// 		}
		// 		return `<div class="chat-row  incoming day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  id=${data.mid ? data.mid : data.messageId}>
		// 					<img src="${data.fromUser.picture}" alt="man 2" class="circle-sm rounded-circle img-cover">
		// 					<div>
		// 						<p class="font-10 mb-0">
		// 							${data.fromUser.displayname}
		// 						</p>
		// 						<div class="chat">
		// 							<video controls>
		// 								<source src="${data.content}" type="video/mp4">
		// 								Your browser does not support the audio element.
		// 							</video>
		// 						</div>
		// 					</div>
		// 				</div>`;
		// 	},
		// 	pdf: function (data) {
		// 		if (app.user.uid == data.fromUser.uid) {
		// 			return `<div class="chat-row  outgoing day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  id=${data.mid ? data.mid : data.messageId}>
		// 					<div>
		// 						<p class="font-10 mb-0">
		// 							Me
		// 						</p>
		// 						<div class="chat">
		// 							${view._template.download(data, data.content)}
		// 						</div>
		// 					</div>
		// 					<img src="${data.fromUser.picture}"
		// 						alt="man 2" class="circle-sm rounded-circle img-cover">
		// 				</div>`;
		// 		}
		// 		return `<div class="chat-row  incoming day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  id=${data.mid ? data.mid : data.messageId}>
		// 					<img src="${data.fromUser.picture}" alt="man 2" class="circle-sm rounded-circle img-cover">
		// 					<div>
		// 						<p class="font-10 mb-0">
		// 							${data.fromUser.displayname}
		// 						</p>
		// 						<div class="chat">
		// 							${view._template.download(data, data.content)}
		// 						</div>
		// 					</div>
		// 				</div>`;
		// 	},
		// 	download: function (data, name) {
		// 		return `<div class="w-100 d-flex justify-content-end" ><a href="${data.content}" download="">${name || 'Download'}</a></div>`;
		// 	},
		// 	imageReply: function (data) {
		// 		if (app.user.uid == data.uid) {
		// 			return `<div class="chat-row outgoing" id=${data.mid ? data.mid : data.messageId} uid=${data.uid}>
		// 						<div>
		// 							<p class="font-10 mb-0 f-weight">
		// 								Me
		// 							</p>
		// 							<div class="chat unselectable">
		// 								<div  pointer=${data.pointer}>
		// 										<img class="circle-lg img-cover" src="${data.orgText}">
		// 								</div>
		// 								<p class="mb-0 font-12">${data.replyText}</p>
		// 							</div>
		// 						</div>
		// 						<img src="${data.picture}"
		// 							alt="man 2" class="circle-sm rounded-circle img-cover">
		// 					</div>`;
		// 		}
		// 		return `<div class="chat-row incoming" id=${data.mid ? data.mid : data.messageId} uid=${data.uid}>
		// 						<img src="${data.picture}"
		// 						alt="man 2" class="circle-sm rounded-circle img-cover">
		// 						<div>
		// 							<p class="font-10 mb-0 f-weight">
		// 								${data.displayname}
		// 							</p>
		// 							<div class="chat">
		// 								<div class="reply mb-1" pointer=${data.pointer}>
		// 										<img class="circle-lg img-cover" src="${data.orgText}">
		// 								</div>
		// 								<p class="mb-0 font-12">${data.replyText}</p>
		// 							</div>
		// 						</div>
		// 					</div>`;
		// 	},
		// 	chatReply: function (data) {
		// 		if (app.user.uid == data.uid) {
		// 			return `<div class="chat-row outgoing" data-id=${data.mid ? data.mid : data.messageId} uid=${data.uid}>
		// 			            <div class="ml-1 hold-options row d-none" hold-options-${data.mid ? data.mid : data.messageId}></div>
		// 						<div class="addclr m-0 ml-1">
		// 							<div class="chat unselectable ">
		// 								<div class="reply mb-1 bgcolor" pointer=${data.pointer}>
		// 										<p class="font-14 mb-0">${data.orgText}</p>
		// 								</div>
		// 								<p class="mb-0 font-14 w-break">${data.replyText}</p>
		// 							</div>
		// 						</div>
		// 					</div>`;
		// 		}
		// 		return `<div class="chat-row incoming" data-id=${data.mid ? data.mid : data.messageId} uid=${data.uid}>
		// 						<div class="bordr m-0">
		// 							<p class="font-14 mb-0 leftm f-weight">
		// 								${data.displayname}
		// 							</p>
		// 							<div class="chat">
		// 								<div class="reply mb-1 bgcolor" pointer=${data.pointer}>
		// 										<p class="font-14 mb-0">${data.orgText}</p>
		// 								</div>
		// 								<p class="mb-0 font-14 w-break">${data.replyText}</p>
		// 							</div>
		// 						</div>
		// 						<div class="ml-1 hold-options row d-none" hold-options-${data.mid ? data.mid : data.messageId}> 
		// 					    </div>
		// 					</div>`;
		// 	},
		// 	rule: function (data) {
		// 		return `<li>${data}</li>`;
		// 	},
		// 	article: function (data) {
		// 		return `<img src="${data.image}"
		// 							alt="article-img" class="circle-md rounded-circle mr-2 img-cover" data-pid=${data.pid}>
		// 				<div class="w-75">
		// 					<p class="font-14 mb-0">${data.title}</p>
		// 					<p class="font-10 brand-text mb-0">${moment(data.timestamp).format(
		// 			'ddd Do MMM, YYYY'
		// 		)}</p>
		// 					<p class="mt-1 font-10 text-secondary mb-0 truncate-line-2">${app.htmltoText(
		// 			data.content
		// 		)}</p>
		// 				</div>`;
		// 	},
		// 	highlightedMessage: function (data) {
		// 		return `<div class="d-flex">
		// 					<img src="${data.author.picture}"
		// 						alt="pfp" class="img-cover circle-md rounded-circle mr-2">
		// 					<div class="w-100">
		// 						<div class="d-flex justify-content-between">
		// 							<p class="font-10 mb-0 ml-1">${data.author.fullname|| data.author.displayname || data.author.username}</p>
		// 							<p class="font-10 mb-0">Posted on ${moment(data.timestamp).format('Do MMM, YYYY')}</p>
		// 						</div>
		// 						<div class="font-12 px-2 py-1 mb-2 secondary-border rounded-lg mb-2">
		// 							<p class="mb-0">${data.content}</p>
		// 						</div>
		// 						<div class="d-flex justify-content-between">
		// 							<div class="d-flex flex-column align-items-center visit-listed-btn" data-mid=${data.messageId}>
		// 								<i class="fas fa font-14 fa-solid fa-circle-chevron-up mb-1"></i>
		// 								<p class="font-10 mb-0">Visit thread</p>
		// 							</div>
		// 							<div class="d-flex flex-column align-items-center mb-1 reply-listed-btn" data-mid=${data.messageId}>
		// 								<i class="fas fa font-14 fa-solid fa-reply"></i>
		// 								<p class="font-10 mb-0">Reply</p>
		// 							</div>
		// 						</div>
		// 						<hr class="primary-border mb-20-px">
		// 					</div>
		// 				</div>`;
		// 	},
		// 	highlightedModMessage: function (data) {
		// 		return `<div class="d-flex highlighted-thread-content" data-mid=${data.messageId}>
		// 					<div class="form-check">
		// 						<input class="form-check-input position-static" type="checkbox" id="blankCheckbox"
		// 							name="thread-selector" value=${data.messageId}>
		// 					</div>
		// 					<div class="w-100">
		// 						<div class="d-flex justify-content-between">
		// 							<p class="font-10 mb-0 ml-1">${data.author.fullname}</p>
		// 							<p class="font-10 mb-0">Posted on ${moment(data.timestamp).format('Do MMM, YYYY')}</p>
		// 						</div>
		// 						<div class="font-12 px-2 py-1 mb-2 secondary-border rounded-lg mb-2">
		// 							<p class="mb-0">${data.content}</p>
		// 						</div>
		// 						<div class="d-flex justify-content-between">
		// 							<div class="d-flex flex-column align-items-center visit-listed-btn" data-mid=${data.messageId}>
		// 								<i class="fas fa font-14 fa-solid fa-circle-chevron-up mb-1"></i>
		// 								<p class="font-10 mb-0">Visit thread</p>
		// 							</div>
		// 							<div class="d-flex flex-column align-items-center mb-1 reply-listed-btn" data-mid=${data.messageId}>
		// 								<i class="fas fa font-14 fa-solid fa-reply"></i>
		// 								<p class="font-10 mb-0">Reply</p>
		// 							</div>
		// 						</div>
		// 						<hr class="primary-border mb-20-px">
		// 					</div>
		// 				</div>`;
		// 	},
		// };

		return view;
	});