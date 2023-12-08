'use stbbict';

/* globals define */

define('forum/mobile/message/list', ['api'], function (api) {
	var list = {};

	list.init = function () {
		/* selectors start here */
		const $container = $('#nav-chats').find('.messages');

		const _templates = {
			userListing: function (data) {
				return `<div class="d-flex align-items-center mb-1" uid=${data.uid}>
              <img src="${data}" alt="" class="img-cover circle-md mr-2">
              <p class="font-14 mb-0">${data}</p>
          </div>`;
			},
			search: function (data) {
				return `<div class="message rooms new d-flex align-items-center" data-uid="${data.uid}">
				<div class="mr-3 profile-pic position-relative">
					<img class="rounded-circle img-cover  circle-lg" onerror="${app.IMG_ERROR()}" src="${data.picture}">
				</div>
				<div class="d-flex justify-content-between w-100">
					<div class="message-content d-flex flex-column ">
						<div class="username">
							<h2 class="font-14 font-medium mb-1">${data.fullname || data.displayname || data.username}</h2>
							<h3 class="font-14 font-medium text-black-50 mb-1">@${data.username}</h3>
						</div>
					</div>
				</div>
			</div>`;
			},
			list: function (data) {
				const { type='', roomName, roomId, author={} } = data;
				// as this room is going ot have only one user so showing last user only
				const user = data.lastUser || {};
				const teaser = data.teaser || {};
				const fileType = app.getFileTypeByURL(location.origin + teaser.content);
				if (fileType) teaser.content = fileType.toUpperCase();
				
				//let fixedStr = String(teaser.content);
				let fixedStr = teaser.content;
				if(fixedStr){
					if(fixedStr.includes("||")){
						let i = fixedStr.split("||", 2).join("||").length;
						fixedStr = fixedStr.slice(i+2,)
					}
				}
				
				console.log(fixedStr)				

				const roomChip = `<div class="col-3 d-flex justify-content-end">
				                    <div class="badge-secondary sdlms-text-white-10px my-auto px-1 ml-2" style="border-radius: 4px;">
				                        discussion
			                        </div>
								</div>`

                return`<div class="row message rooms existing d-flex align-items-center" data-type="${type}" data-uid="${user.uid || author.uid}" data-room-id="${roomId}">
                    <div class="col-2 profile-pic position-relative">
                        <img class="rounded-circle img-cover circle-lg" onerror="${app.IMG_ERROR()}" src="${data.picture || data.image}">
                        <div class="tickmark d-none">
                            <img class="position-absolute" src="https://blog.deepthought.education/wp-content/uploads/2022/04/tickmark.svg" style="top: 80%; right: 1%;" />
                        </div>
                    </div>
                    <div class="col-10 w-100">
                        <div class="row">
                            <div class="col-9 message-content d-flex flex-column">
                                <div class="username d-flex">
                                    <h2 class="font-14 font-medium mb-1 text-ellipse">${type == 'discuss_room' ? (roomName || 'Room ' + roomId) : (user.fullname || user.username || 'Deleted')}</h2>
                                </div>
                                <div class="message-details">
                                    <p class="font-12 font-regular mb-0 text-ellipse-2">${fixedStr ? fixedStr : ''}</p>
                                </div>
                            </div>
                            <div class="col-3 message-extra-details d-flex flex-column align-items-center">
                                <div class="message-time">
                                    <p class="font-10 font-regular text-center">
                					${teaser.timestamp ? getDateLabel(teaser.timestamp) : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-end">
                            <div class="messages__read d-${data.unread || 'none'} mr-3">
                                <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/Read.svg" style="height: 12px;" />
                            </div>
							${type == 'discuss_room' ? roomChip : ''}
                        </div>
                    </div>
				<!--	<div class="w-100 px-3 mt-2 d-flex justify-content-end"><i class="fa fa-trash delete-room" aria-hidden="true"  id="delete-room-${roomId}" data-id="${roomId}"></i></div> -->
                </div>
				`;
			},
		};


		$.each(ajaxify.data.rooms, function (i, e) {
				$container.append(_templates.list(e))
		})
		const filterIcon = document.querySelector("#filter-icon");
		const filters = document.querySelector("#filters");

		const settingsIcon = document.querySelector('.settings-icon');
		const deleteIcon = document.querySelector('#delete-icon');
		const archiveIcon = document.querySelector('#archive-icon');
		const writeIcon = document.querySelector('#write-icon');
		const dropDown = document.querySelector('#dropdown');
		const dropDownAction = document.querySelectorAll(
			'.dropdown-content__action'
		);
		const dropDownHold = document.querySelectorAll('.dropdown-content__hold');
		const message = document.querySelectorAll('.message');
		const messages = document.querySelector('.messages');
		const header2 = document.querySelector('#header-2');
		const header1 = document.querySelector('#header-1');
		const markAsUnread = document.querySelector('#unread');
		const markAsRead = document.querySelector('#read');


		window.unread = false;

		function loadDiscussionRooms (params) {
			let query = new URLSearchParams({
				...params
			}).toString();
			let url = '/app/getdiscussion_room';

			api.post([url, query].join('?'), {})
				.then((res) => {
					let {data} = res;
					$('.rooms-area').empty();

					if (data && data.length) {
						$.each(data, function (index, el) {
							$('.rooms-area').append(_templates.list(el))
						});
					}
				})
				.catch((err) => notify(err.message, 'error'));
		}
		/* selectors ends here */
		/* hold function starts here */
		function isMobile() {
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

		const container = document.querySelector('.messages');
		if (messages) {
			const chats = container.querySelectorAll('.message');
			const holdStart = isMobile() ? 'touchstart' : 'mousedown';
			const holdStop = isMobile() ? 'touchend' : 'mouseup';
			let selected = 0;
			let clearing = 0;

			/* if click */
			function mouseUP() {
				clearInterval(this.getAttribute('interval'));
				if (!container.querySelectorAll('.message.hold').length && !clearing) {
					// location.href = "./chat";
				}
				clearing =
					container.querySelectorAll(
						'.message.hold'
					).length; /* checks the length of array containing message holded  */
			}
			/* to clear hold state from every element */
			function clearMarks() {
				for (let index = 0; index < chats.length; index++) {
					chats[index].classList.remove('hold');
					chats[index].removeEventListener(holdStart, mouseDown);
					chats[index].removeEventListener(holdStop, mouseUP);
					chats[index].addEventListener(holdStart, mouseDown);
					chats[index].addEventListener(holdStop, mouseUP);
				}
				selected = 0;
				clearing = container.querySelectorAll('.message.hold').length;
			}
			/* removes hold class */
			function mouseDown() {
				const that = this;
				if (that.classList.value.includes('hold')) {
					that.classList.remove('hold');
					that.querySelector('.tickmark').classList.add('d-none');
					// that.querySelector('.read').classList.add('d-none')

					that.addEventListener(holdStart, mouseDown);
					that.addEventListener(holdStop, mouseUP);
					selected = container.querySelectorAll('.message.hold').length;
					if (!selected) {
						writeIcon.classList.remove('d-none');
						deleteIcon.classList.add('d-none');
						archiveIcon.classList.add('d-none');
						dropDownAction.forEach(element => element.classList.remove('d-none')
						);
						dropDownHold.forEach(element => element.classList.add('d-none'));
					}
					// if(!selected){
					//   header1.classList.remove('d-none')
					//   header2.classList.add('d-none')
					// }
					return;
				}
				/* adds hold class */
				const i = setInterval(
					() => {
						that.classList.add('hold');
						dropDown.classList[window.unread ? 'add' : 'remove']('markread');
						that.querySelector('.tickmark').classList.remove('d-none');
						dropDownAction.forEach(element => element.classList.add('d-none')
						);
						dropDownHold.forEach(element => element.classList.remove('d-none')
						);
						writeIcon.classList.add('d-none');
						deleteIcon.classList.remove('d-none');
						archiveIcon.classList.remove('d-none');

						selected = 1;
						clearInterval(i); /* if selected clear interval */
						clearing++;
						that.removeEventListener(holdStop, mouseUP);
					},
					selected ? 0 : 500
				);

				// if(selected){
				//   header1.classList.add('d-none')
				//   header2.classList.remove('d-none')
				// }

				that.setAttribute('interval', i);
			}

			clearMarks();
			/* hold function ends here */
			const onClick = function () {
				clearMarks();
				dropDownAction.forEach(element => element.classList.remove('d-none'));
				dropDownHold.forEach(element => element.classList.add('d-none'));
			};
		}

		function getDateLabel(timestamp) {
			const yesterday = moment().add(-1, 'day').startOf('day').valueOf();
			const today = moment().startOf('day').valueOf();
			const timestampDay = moment(timestamp).startOf('day').valueOf();
			if (timestampDay == today) return moment(timestamp).format('hh:mm A');
			if (timestampDay == yesterday) return 'Yesterday';
			return moment(timestamp).format('MMM DD');
		}

		const markUnread = function () {
			dropDown.classList.add('markread');
			message.forEach((item) => {
				if (item.classList.value.includes('hold')) {
					item.querySelector('.messages__read').classList.remove('d-none');
					item.querySelector('.tickmark').classList.add('d-none');
					window.unread = true;
					item.classList.remove('hold');
				}
			});
		};

		const markRead = function () {
			dropDown.classList.remove('markread');
			message.forEach((item) => {
				if (item.classList.value.includes('hold')) {
					window.unread = false;
					item.querySelector('.messages__read').classList.add('d-none');
					item.querySelector('.tickmark').classList.add('d-none');
					item.classList.remove('hold');
				}
			});
		};

		const showUnread = function () {
			markAsRead.classList.remove('d-none');
		};

		/* function to show and hide element start here */

		/* function to show and hide element ends here  */

		/* function and eventlistener to toggle filters starts here */
		const showDropDown = function () {
			dropDown.classList.add('d-flex');
		};
		const hideDropDown = function () {
			dropDown.classList.remove('d-flex');
		};
		if (settingsIcon) {
			const toggleSettings = function (event) {
				if (settingsIcon.contains(event.target)) {
					showDropDown();
				} else {
					hideDropDown();
				}
			};
			window.addEventListener('click', toggleSettings);
		}

		const showFilter = function () {
			filters.classList.add('d-flex');
		};
		const hideFilter = function () {
			filters.classList.remove('d-flex');
		};

		loadDiscussionRooms({limit: 50})

		if (filterIcon) {
			const toggleFilters = function (event) {
				if (filterIcon.contains(event.target)) {
					showFilter();
				} else {
					hideFilter();
				}
			};
			window.addEventListener('click', toggleFilters);
		}

		/* function and eventlistener to toggle filters ends here */

		/* function and eventlistener to toggle settings starts here */

		if (markAsUnread) {
			markAsUnread.addEventListener('click', markUnread);
		}
		if (markAsRead) {
			markAsRead.addEventListener('click', markRead);
		}

		$("#nav-profile-tab").on("click", () => {
			$("#nav-profile-tab").addClass("font-bold tertiary-border-bottom");
			$("#nav-homr-tab").removeClass("font-bold tertiary-border-bottom");
		});

		$("#nav-homr-tab").on("click", () => {
			$("#nav-profile-tab").removeClass("font-bold tertiary-border-bottom");
			$("#nav-homr-tab").addClass("font-bold tertiary-border-bottom");
		});

		$("#menu-btn").on("click", () => {
			$("#nav-homr-tab").removeClass("font-bold tertiary-border-bottom");
		});

		$('#search').off('keyup').on('keyup', debounce(function () {
			const search = $(this).val();
			const isDiscussionRoomTab = $('[discussion-rooms]').attr('aria-selected');
			
			if (JSON.parse(isDiscussionRoomTab)) {
				return loadDiscussionRooms({term: search, limit: 50})
			}

			const $elems = $container.find('.message.existing');
			$elems.removeClass('d-flex').addClass('d-none');
			$container.find('.rooms.new').remove();
			if (!search) return $elems.addClass('d-flex').removeClass('d-none');
			api.get('/api/users', {
				query: search,
				paginate: false,
			}).then((response) => {
				const users = response.users;
				$.each(users, function (i, e) {
					$container.append(_templates.search(e));
				});
			});
		}, 500));

		// $('body').on('click','.row.message',function(){
		// 	console.log('hi')
		// 	const data = $(this).data();
		// 	const {type} = data;
		// 	if (type && type == 'discuss_room') {
		// 		console.log('hello')

		// 	}


		// })

		$('body').off().on('click', '.message.existing', function () {
			// notify("Please wait...", "info");
			const data = $(this).data();
			const {type} = data;
			const roomId = data.roomId;
			console.log('going in the room'+roomId)
			if (type && type == 'discuss_room') {
				// $('#DiscussionModal').modal('toggle')

				doAjax({
					type: 'POST',
					url: "/app/adduser",
					method: "POST",
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify({
						roomId,
						uids: [app.user.uid],
					}),
				}).then((res) => {
					console.log("hello here",res)
					ajaxify.go("mobile/discussion/" + roomId);
				}).catch((err) => console.log(err.message, 'error'));
			}
			else{
				ajaxify.go("mobile/message/chat/" + roomId);
			}
		});

		socket.on('event:chats.receive', function (data) {
			if ($(`[data-room-id="${data.roomId}"]`).length) {
				$(`[data-room-id="${data.roomId}"]`).find('.message-details').html(`<p class="font-10 font-regular mb-0">${data.message.cleanedContent}</p>`);
				$(`[data-room-id="${data.roomId}"]`).prependTo($container);
				$(`[data-room-id="${data.roomId}"]`).find('.messages__read').removeClass('d-none');
			} else {
				const payLoad = {};
				payLoad.roomId = data.roomId;
				payLoad.lastUser = data.message.fromUser;
				payLoad.teaser = data.message;
				payLoad.content = data.message.cleanedContent;
				payLoad.unread = true;
				$container.prepend(_templates.list(payLoad));
			}
			window.scrollTo(0, 0);
		});
		
		$('body').on('click','.delete-room',function(e){
			console.log('delete')
			let roomId = $(this).data('id');
			console.log(roomId)
			if(roomId){
				api.del(`/app/room/${roomId}`)
				.then(res=>console.log(res))
				.catch(err => console.log(err))
				// doAjax({
				// 	type: "DELETE",
				// 	url: `/app/room/${roomId}`,
				// 	method: "DELETE",
				// 	dataType: 'json',
				// 	contentType: 'application/json',
				// 	data: JSON.stringify({
				// 	}),
				// }).then((res) => {
				// 	console.log("hello here",res)
				// }).catch((err) => console.log(err.message, 'error'));
			}
			if (!e) var e = window.event;
			e.cancelBubble = true;
			if (e.stopPropagation) e.stopPropagation();
		})
		$('body').on('click', '.message.new', function () {
			const data = $(this).data();
			const uid = data.uid;
			console.log(uid);
			socket.emit('modules.chats.hasPrivateChat', uid, function (err, roomId) {
				if (err) return console.log(err);
				if (!roomId) {
					socket.emit('modules.chats.newRoom', {
						touid: uid,
					}, function (err, newRoomId) {
						if (err) return console.log(err)
						notify("opening chat...", "success");
						ajaxify.go("mobile/discussion/" + newRoomId);
					});
				} else {
					notify("opening chat...", "success");
					ajaxify.go("mobile/discussion/" + roomId);
				}
			});
		});
		$('body').on('click','#create-rooms',function(){
			ajaxify.go('mobile/discussion/create')
		})
		$('#app-loader').hide();
	};

	return list;
});
