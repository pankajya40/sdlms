/**
 * @author Unknown
 * @date 05/2022
 * @description Allow user to build the Polls based on @tid and @uid
 * @returns @Polls 
 */

/**
 * @var {class} Polls
 * @description Contains the @methods or @function - to run the Polls
 * @function Polls.init
 * @function Polls.unique
 * @function Polls.log
 * @function Polls.builder
 * @function Polls.create
 */

class Polls extends Template{
	constructor(data = {}) {
		/**
		 * @author Unknown
		 * @description Tid is required to init a Poll
		 */
		super();
		if (!data.tid) throw new Error("Invalid tid supplied");
		this.tid = data.tid;
		this.data = data;
		this.groups = data.groups || [];
		this.statuses = data.statuses || [];
		this.times = data.times || [];
		this.showCustom = data.showCustom || false;
		this.canVote = data.canVote || true;
		this.canPublish = data.canPublish || true;
		this.isStudent = data.isStudent
		this.groups = this.groups.map(e => (e.group = String(e.group).toLowerCase(), e));
		if (this.showCustom && !this.groups.filter(e => String(e.group).toLowerCase() == 'custom').length) {
			this.groups.push({
				group: 'custom',
				name: 'Polls'
			});
		}
		if (!this.groups.length) throw new Error("No Groups Found");
		this.builder(this.data.target);
	}
	/**
	 * @author Unknown
	 * @date 12/2021
	 * @name unique
	 * @type {function} 
	 * @description to get unique id 
	 * @param {String} prefix optional identifier for generated unique id {prefix + id}
	 */

	static unique(prefix = "") {
		var dt = new Date().getTime();
		var uuid = "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			var r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
		});
		return prefix + uuid;
	}
	/**
	 * @author Unknown
	 * @date 05/2022
	 * @name log
	 * @type {function} 
	 * @description To Log 
	 * @param {*} log 
	 */

	log(log) {
		!this.data.log || console.log(log);
	}
	/**
	 * @author Unknown
	 * @date 05/2022
	 * @name builder
	 * @type {function} 
	 * @description Attach an  sdlms-thread-builder element
	 * @param {HTML ELEMENT} HTML element to render builder default body 
	 */

	builder(target = "body") {
		console.log("polls.js");

		this.id = Polls.unique("sdlms-polls-");
		let $that = this;
		let $target = $(target);
		if (!$target.length) {

			/**
			 * @author Unknown
			 * @description Given target should be a valid HTML Element
			 */
			$that.log("No HTML element found For Builder Given ==>" + target);
			throw new Error(`No HTML element found while searching ${target}`);
		}
		$('body').append($target)
		$target.empty();
		$target.append(
			$("<sdlms-polls>")
			.attr({
				id: $that.id,
				class: "d-flex h-100 justify-content-center" + ($that.data.noAction ? "sdlms-readonly" : '')
			})
			.append(
				$("<div>").attr({
					id: "poll-" + $that.id,
					class: 'w-50 h-100 overflow-auto sdlms-polls-container ' + ($that.data.action == 'reader' ? 'readonly' : 'create'),
				})
			)
		);
		let $builder = $(`#poll-${$that.id}`);
		$that.$builder = $builder;
		$that[$that.data.action == 'reader' ? 'reader' : 'create']($that.data.with);

	}

	/**
	 * @author Unknown
	 * @date 05/2022
	 * @name create
	 * @type {function} 
	 * @description Append @Polls and  attach all the events 
	 * @param {Object} data optional if @Polls is initied with existing @Polls then render it with Exisiting
	 */
	create(data = null) {

		let $target = this.$builder,
			$that = this;
		this.render();
	}

	reader(data = null) {
		let $target = this.$builder;
		let $that = this;

	}

	render() {
		let $target = this.$builder;
		let $that = this;
		let templates = Template.polls();
		let $id = Polls.unique("sdlms-polls-");
		this.$id = $id;

		let groupTab = this.statuses.map(e => {
			return {
				id: 'poll-tab-' + e.value + '-' + $id,
				title: e.name,
				classes: `${e.value}-${$id}`,
				type: e.value
			}
		});

		let groups = this.groups.map(e => e.group);

		let classCount = ajaxify.data.Sessions[0].attendance.length;
		let students = ajaxify.data.Sessions[0].attendance

		// students side
		if(this.isStudent){
			$("#SDLMSPolls").addClass('tray-close student-side')
			
			socket.on('event:class.joined', (data) => {
				console.log(data);
			})

			$target.append(templates.tray.header()+templates.tray.container({
				classes: `${$id} w-100 overflow-auto poll-main-page`
			},`<div class='parent-main-page p-2'><div class="card  pt-2 pb-4 main-page-body justify-content-center"></div></div>`))

			// bottom navbar
			$('.poll-main-page').append(templates.tray.bottomNavbar({teacher:false}))

			$('.sdlms-container').append(`<div class='poll-icon '>P</div>`)

			function handleGroupPoll(data){
				let createdAfter = data.data.createdAfter
				let pid = data.pid
				let group = data.data.type
				console.log(pid,group);
				// add createdAfter
				let votes = 0
				let options = data.threads.map(ele => {
					votes+=ele.votes.length
					return {content:ele.content, pid:ele.pid}
				})
				data.data.options = options
				data.group = group
				return {...data, responseCount:votes}

			}
			

			let payload = {
				tid: $that.tid,
				group: ['custom', 'group'],
			}
			let statuses = ['published', 'completed']
				statuses.map(e => {
					$('.main-page-body').append(templates.tray.pollListContainer({status:e}))
				})
				socket.emit('sdlms.polls.get.all', payload, function (err, polls) {
					if (err) return Polls.error(err);
					console.log(polls);

					// populating active polls list
					let latestOngoing = null
					let flag = false;
					for(var key in polls){
						polls[key].forEach(ele =>{

							if(ele.group == 'group'){
								if(ele.status=='new') return;
								flag= true
								let data = handleGroupPoll(ele)
								let {voteCount} = countVotes(ele)
								if(ele.status == 'published'){
									let pollData = {
										...data,
										voteCount,
										createdAt:Date.now(),
										content:`Here are Everyone's ${data.group} threads`,
									}
									$(`[poll-list-container-published]`).prepend(templates.tray.studentGroupPoll({...pollData,totalCount:classCount}))
								} else if(ele.status == 'completed'){
									let pollData = {
										...data,
										voteCount,
										createdAt:Date.now(),
										content:`Here are Everyone's ${data.group} threads`,
									}
									$(`[poll-list-container-completed]`).prepend(templates.tray.groupPollListItem({...pollData,totalCount:classCount}))
								}
								return;
							}

							let data = countVotes(ele)
							if(ele.status == 'published'){	
								flag= true
								latestOngoing = data.selected==null?ele:null;
								$(`[poll-list-container-${ele.status}]`).prepend(templates.tray.studentPollListItem(
									{
										...ele, 
										selected: data.selected,
										totalCount:classCount
									}
									))
							}
							else{
								flag= true
								$(`[poll-list-container-${ele.status}]`).prepend(templates.tray.pollListItem({
									...ele, 
									...data, 
									totalCount:classCount
								}))
							}
						} 
						)
					}
					$('.students-non-voted').remove()
					if(latestOngoing){
						$('body> .poll-modal').remove()
						let title = 'Simple Poll'
						if(latestOngoing.data.type=='spontaneous'){
							title = 'Spontaneous Poll'
						}
						$('body').append(templates.polls.modal({id:1,title},templates.tray.studentPollListItem({modal:true,...latestOngoing})))
						$('.poll-icon').addClass('active')
					}
					
					checkEmptyContainer(true)
					
				})
				$target.on('click','.poll-list-item  .fa.fa-angle-down,.poll-list-item [poll-action-button]', function(){
					const thisItem = $(this).parents('.poll-list-item')
					$('.sdlms-polls-container .poll-list-item').not(thisItem).each((i,e) => {
						$(e).find('.poll-option-list').addClass('d-none')
						$(e).find('[poll-action-button]').show()
					})
					$(thisItem).find('.poll-option-list').toggleClass('d-none')
					
					$(this).parent().find('[poll-action-button]').toggle()
					thisItem.parent().get()[0].scrollIntoView({behavior: "smooth"})
					thisItem.parent().get()[0].scrollIntoView({behavior: "smooth"})
				})

				$('body').on('click', '.student-option',function(){
					if($(this).parents('.poll-option-list').data('votted') == false){
						$(this).parents('.poll-option-list').find('.student-option').removeClass('selected-option')
						$(this).toggleClass('selected-option')
					}
				})

				$('body').on('click','.poll-modal .skip-poll-button',function(){
					$(this).parents('.poll-modal').hide()
				})

				$('body').on('click','.poll-icon.active',function(){
					$('.poll-modal').show();
				})

				function handleVote(payload, chosen, pid, group, item){
					socket.emit('sdlms.polls.vote', payload, (err, data) => {
						if (err) return Polls.error(err);
						$('[poll-list-container-published]').find(`.poll-list-item[data-pid=${pid}][data-group=${group}] [total-votes]`).text(data.votes.length)
						if(item.parents('.poll-list-item[modal-poll-list]').length){
							item.parents('.poll-modal').remove()
							$('.poll-icon').removeClass('active')
							let chosenItem = $('[poll-list-container-published]').find(`.poll-list-item[data-pid=${pid}][data-group=${group}]`)
							console.log(chosenItem);
							chosenItem.find('.poll-option-list').data('votted', true)
							chosenItem.find('[submit-vote-button]').attr('disabled', true)
							chosenItem.find('.student-option').eq(chosen).addClass('selected-option')
						}
						$('.poll-icon').removeClass('active')
					});
				}

				// getting vote
				$('body').on('click', '[submit-vote-button]', function(){
					let item = $(this).parents('.poll-option-list')
					if(item.data('votted')) return;
					let chosen = $(this).parents('.poll-option-list').find('.selected-option').data('option-index')
					console.log({chosen});
					if(chosen == null || chosen == undefined) return;
					const {pid, group} = $(this).parents('.poll-list-item').data()

					// voting for non-custom poll
					if(group!='custom'){
						let pid = item.find('.selected-option').data('pid')
						let parentPid = $(this).parents('.poll-list-item').data('pid')
						console.log(pid);
						const payload = {
							uid: ajaxify.data.user[0].uid,
							tid: $that.tid,
							pid,
							parentPid,
							group,
							selected: chosen
						}
						console.log(payload);
						handleVote(payload, chosen, parentPid, group, item)
						$(this).parents('.poll-option-list').data('votted', true)
						$(this).parents('.poll-option-list').find('[submit-vote-button]').attr('disabled', true)
						
						return;
					}
					const payload = {
						uid: ajaxify.data.user[0].uid,
						tid: $that.tid,
						pid,
						group,
						selected: chosen
					}
					console.log(payload);
					handleVote(payload, chosen, pid, group, item)
					$(this).parents('.poll-option-list').data('votted', true)
					$(this).parents('.poll-option-list').find('[submit-vote-button]').attr('disabled', true)
				})

				// on announce of a poll
				socket.on('event:polls.announce.single',function(data){
					console.log(data);
					$('body> .poll-modal').remove()
					$('.poll-icon').addClass('active')
					$('[poll-list-container-published]').parent().show()
					let title = data.data.type=='spontaneous'?'Spontaneous Poll':'Simple Poll'
					$('body').append(templates.polls.modal({id:1,title},templates.tray.studentPollListItem({modal:true,...data})))
					$(`[poll-list-container-published]`).prepend(templates.tray.studentPollListItem({...data, totalCount:classCount}))
					$target.find('.empty-polls').remove()
				});

				$('body').on('click','.poll-modal-content',function(event){
					event.stopPropagation();
				})

				$('body').on('click','.poll-modal',function(){
					$(this).hide()
				})

				// group poll announce
				socket.on('event:polls.announce.group',function(data){
					console.log(data);
					if(!data.polls.length) return;
					$('[poll-list-container-published]').parent().show()
					
					let group = data.data.group
					let options = data.polls.map(e => {
						return {pid:e.pid, content:e.content}
					})
					$('body> .poll-modal').remove()
					$('.poll-icon').addClass('active')
					let pollData = {
						group,
						pid:data.data.pid,
						data:{options},
						status:"published",
						createdAt:Date.now(),
						content:`Here are Everyone's ${group} threads`,
					}
					$('body').prepend(templates.polls.modal({id:1,title:'Social Poll'},templates.tray.studentGroupPoll({
						...pollData,
						modal:true
					})))
					$target.find('.empty-polls').remove()
					$(`[poll-list-container-published]`).append(templates.tray.studentGroupPoll({...pollData,totalCount:classCount}))
				});

				// on closing a poll
				socket.on('event:polls.complete',function(data){
					console.log(data);
					if(data.data.group!='custom'){
						
						let selected = $(`[poll-list-container-published] .poll-list-item[data-group=${data.data.groupType}][data-pid=${data.poll.pid}]`).find('.student-option.selected-option').data('option-index')
						$(`[poll-list-container-published] .poll-list-item[data-group=${data.data.groupType}][data-pid=${data.poll.pid}]`).parent().remove()
						$(`[poll-list-container-completed]`).prepend(templates.tray.groupPollListItem({
							selected, 
							...data.data,
							group:data.data.groupType,
							voteCount: data.data.voteCount,
							data:{options:data.data.options},
							totalCount:classCount
						}))
						$('.students-non-voted').remove()
						$(`[poll-list-container-completed]`).parent().show()
						checkEmptyContainer(false,['published']);

						return;
					}
					let selected = $(`[poll-list-container-published] .poll-list-item[data-pid=${data.poll.pid}]`).find('.student-option.selected-option').data('option-index')
					$(`[poll-list-container-published] .poll-list-item[data-pid=${data.poll.pid}]`).parent().remove()
					let {voteCount} = countVotes(data.poll)
					$(`[poll-list-container-completed]`).prepend(templates.tray.pollListItem({
						voteCount, 
						selected, 
						...data.poll,
						totalCount:classCount
					}))
					$(`[poll-list-container-completed]`).parent().show()
					$('.students-non-voted').remove()
					checkEmptyContainer(false,['published']);
				});


				$('#tray').on('click', function(){
					$('#SDLMSPolls').toggleClass('tray-open tray-close')
				})

				commonFunctionality();
				// checkEmptyContainer();
				
				return;
		}
		//add countvote function
		function countVotes(e){
			let selected = null
			let voteCount = []
			let studentuid = ajaxify.data.user[0].uid
			if(e.votes.length){
				e.votes.map(ele => {
					if(ele.uid == studentuid) selected = ele.selected
                	voteCount[ele.selected] = (voteCount[ele.selected]||0) + 1
				})
			}
			return {selected, voteCount}
		}

		function checkEmptyContainer(flag = false,statuses = ['new', 'published', 'completed']){
			console.log(statuses);
			console.log(flag);
			let c = 0
			statuses.forEach(e => {
				
				if(!$(`[poll-list-container-${e}] > div`).length){
					c++;
					$(`[poll-list-container-${e}]`).parent().hide()
				}
			})
			if(c==3 && flag){
				// $target.find('.main-page-body').empty()
				$target.find('.main-page-body').append(`<div class="d-flex h-100 justify-content-center align-items-center empty-polls"><div>No Ongoing Polls </div></div>`)
			}
		}

		$("#SDLMSPolls").addClass('tray-close teacher-side')
		
			function pollPage(){
				
				$target.append(templates.tray.header()+templates.tray.container({
					classes: `${$id} w-100 overflow-auto poll-main-page`
				},`<div class='parent-main-page p-2'><div class="card pt-2 pb-4 main-page-body justify-content-center"></div></div>`))

				let payload = {
					tid: $that.tid,
					group: ['custom'],
				}
				
				let statuses = ['new','published','completed']
				statuses.map(e => {
					$('.main-page-body').append(templates.tray.pollListContainer({status:e}))
				})
				socket.emit('sdlms.polls.get.all', payload, function (err, polls) {
					if (err) return Polls.error(err);
					console.log(polls);

					// populating active polls list
					for(var key in polls){
						polls[key].forEach(ele =>{
							// get voted ones and remove them from students array
							let nonvoted
							if(ele.votes.length!=students.length){
								nonvoted = students.filter(e => !ele.votes.filter(vote => vote.uid==e.uid).length)
							}
							let {voteCount} = countVotes(ele)
							$(`[poll-list-container-${ele.status}]`).prepend(templates.tray.pollListItem({
								voteCount, 
								...ele, 
								totalCount:classCount, 
								students:nonvoted
							}))
						} 
						)
					}

					$target.on('click','.poll-list-item  .fa.fa-angle-down, .poll-list-item[data-status=completed] [poll-action-button]', function(){
						const thisItem = $(this).parents('.poll-list-item')
						$('.poll-list-item').not(thisItem).each((i,e) => {
							$(e).find('.poll-option-list').addClass('d-none')
							$(e).find('[poll-action-button]').show()
						})
						$(thisItem).find('.poll-option-list').toggleClass('d-none')
						$(thisItem).find('[poll-action-button]').toggle()
						thisItem.parent().get()[0].scrollIntoView({behavior: "smooth"})
					})

					checkEmptyContainer(true)
				})
			}

		pollPage()

		$('#tray').on('click', function(){
			$('#SDLMSPolls').toggleClass('tray-open tray-close')
		})

		$(".sdlms-polls-container.create").append(templates.tray.container({
			classes: `${$id} create-poll-page w-100 overflow-auto `
		},
		templates.tray.roundedCard({},templates.tray.createHeader({header:'Create Your Polls'}))))

		$(".create-poll-form").append(`<div class="row m-0">` + templates.tray.radioInput(
		{
			classes:"col-3 form-check", value: "question", id:"question-radio"
		}) + ` <div class="col-8">
		<input type="text" class="form-control p-3 poll-question" id="exampleFormControlInput1"
			placeholder="Type your question or leave it empty">
		</div></div>` + templates.tray.radioInput(
		{
			classes:"form-check pt-3", value: "social", id:"social-radio"
		})).append(`<hr id="custom-horizontalrule" class="mt-4">`)

		let optionsHTML = templates.tray.pollOption() + templates.tray.pollOption() + templates.tray.pollOption()
		optionsHTML+= `<div id="addpolloption" class="ms-3 "><a href="">+ &nbsp; Add option</a></div>`
		
		$(".create-poll-form").append(`<div id="options" class="" data-assets-container="question">${optionsHTML}</div>`)

		console.log(this.times,this.groups);
		let socialPollHTML = templates.tray.filter(
			{
				heading: "Choose Time Constraint",
				default: "Last 10 Minutes",
				times: [{value: '5', name: 'Last 5 Minutes'}, { value: '10', name: 'Last 10 Minutes'}, {value: '15',name: 'Last 15 Minutes'},{value: '1',name: 'Beginning of the class',selected: 1,}]
			}
		) + templates.tray.filter(
			{
				heading: "What Category you want to Discuss ?",
				default: "Question",
				times: [{ group: 'eureka', name: 'Eureka' }, { group: 'answer', name: 'Answer' }, { group: 'question', name: 'Question' }, { group: 'root', name: 'Root' }]
			}
		)
		
		$(".create-poll-form")
		.append(`<div id="timeandcategory" class="align-items-center flex-column" style="display:none ;" data-assets-container="social">
		${socialPollHTML}</div><div class="d-flex justify-content-center">
		<button id="button-create-poll" type="button"
			class="btn mx-auto mt-4 sdlms-text-white-18px px-5" create-poll>Create Poll</button>
		</div>`)

		$('.poll-main-page').append(templates.tray.bottomNavbar({teacher:true}))

		$('.create-poll-page').hide()

		function commonFunctionality(){
			$target.on('click', '.bottom-navbar>div', function(){
				let name = $(this).attr('name')
				let element = $(`[poll-list-container-${name}]`).parent()
				$('.main-page-body').animate({
					scrollTop: element.position().top},
					'fast');
			})

			socket.on('event:class.joined', (data) => {	
				console.log(data.uid+' joined', data);
				if(data.uid==ajaxify.data.Sessions[0].teacher.uid) return;
				if(ajaxify.data.Sessions[0].attendance.filter(e => e.uid == data.uid).length) return;
				classCount++;
				students.push(data)
				console.log(students, classCount);
				$('.students-non-voted').append(`<span data-uid=${data.uid}>${data.username}</span>`)
				$('[poll-list-container-completed] .students-non-voted').show();
				$('[poll-list-container-published] .students-non-voted').show();
				$('#SDLMSPolls .poll-list-item').each((i,e) => {
					let t = $(e).find('[total-members]').text()
					t++;
					$(e).find('[total-members]').text(t);
					$(e).find('.poll-option').each((i,ele) => {
						let votes = parseInt($(ele).find('.vote-count').text())
						$(ele).find('.vote-bar > div').width(`${Math.round(votes*100/classCount)}%`)
					})
				})
			})

			checkEmptyContainer
		}

		commonFunctionality();

		$target.on('click','#addpolloption',function(){
			if($(this).parents('#options').find('[poll-option]').last().after(templates.tray.pollOption()).length) return;
			$(this).parent().find('[poll-option]').last().after(templates.tray.pollOption())
		})

		$target.on('click','.fa-solid.fa-arrow-left',() => {
			$('.poll-main-page').show()
			$('.create-poll-page').hide()
		})
			
		$target.on('change','[steps]',function(){
			let value = $(this).val();	
			let name = $(this).attr('name');
			$('[data-'+name+'-container]').hide();
			$('[data-'+name+'-container="'+value+'"]').show();
		})

		$target.on('click', 'a.sdlms-menu-item', function(){
			$(this).parent().parent().find('span.filter-label').text($(this).text())
		})

		$target.on('click',"[to-create-poll-page]",function(){
			$(".poll-main-page").hide()
			$('.create-poll-page').show()
			let numOptions = $('#addpolloption').parents('#options').find('[poll-option]').length
			if(numOptions>3){
				while(numOptions!=3){
					numOptions--;
					$('#addpolloption').parents('#options').find('[poll-option]').first().remove()
				}
			}
		})

		// edit poll
		$target.on('click', '[poll-list-container-new] .edit-poll-button',function(){
			let item = $(this).parents('.poll-list-item')
			$(this).parent().find('.cancel-edit-poll').removeClass('d-none')
			if(item.data('editing')){
				// submit edit
				let options = []
				item.find('[poll-option]').each((i,e) => {
					options.push($(e).val())
				})
				let { pid, group }= item.data()
				let question = item.find('[poll-heading]').text()
				let payload = {
					tid:$that.tid,
					pid,
					group,
					content:'',
					data:{
						format: "alphabets",
						question,
						options,
					}
				}
				socket.emit(`sdlms.polls.update`, payload, function (err, data) {
					if (err) return Polls.error(err);
					console.log(data);
					notify('Poll Updated Successfully')
					item.parent().after(templates.tray.pollListItem(data))
					item.parent().remove();
					$(window).trigger(`sdlms:polls.update`, data);
				});
				return;
			};
			item.data('editing', true)
			let options = []
			item.find('.vote-content').each((i,e) => {
				options.push($(e).text())
			})
			console.log(options);
			item.find('.poll-option-list .poll-option').hide()
			options.map((e,i) => {
				item.find('.poll-option-list').prepend(templates.tray.pollOption())
			})
			options.map((e,i) =>{
				item.find('[poll-option]').eq(i).val(e)
			})
			item.find('[poll-option]').last().after(`<div id="addpolloption" class="ms-3 "><a href="">+ &nbsp; Add option</a></div>`)
		})

		// cancel edit poll
		$target.on('click','[poll-list-container-new] .cancel-edit-poll', function(){
			let item = $(this).parents('.poll-list-item')
			if(!item.data('editing')) return;
			item.data('editing', false)
			$(this).addClass('d-none')
			item.find('[poll-option]').remove()
			item.find('#addpolloption').remove()
			item.find('.poll-option').show()
		})

		$target.on('click','.sdlms-menu-items > a.sdlms-menu-item',function(){
			$(this).parent().data('chosen',$(this).data('value'))
		})

		// on vote event - teacher side
		socket.on('event:polls.vote', function (data) {
			console.log(data);
			if(data.polls.group == 'custom'){
				$('[poll-list-container-published]').find(`.poll-list-item[data-pid=${data.polls.pid}] [total-votes]`).text(data.polls.votes.length)
				const option = $(`.poll-list-item[data-pid=${data.polls.pid}] [data-option-index=${data.data.selected}]`)
				let count = option.find('.vote-count').text();count++;
				option.find('.vote-count').text(count)
				option.find('.vote-bar>div').width(`${Math.round(count*100/classCount)}%`)
				let item = $('[poll-list-container-published]').find(`.poll-list-item[data-pid=${data.polls.pid}] .students-non-voted > span[data-uid=${data.data.uid}]`)
				let parentItem = item.parent()
				item.remove()
				if(!parentItem.find('span').length){parentItem.hide()}
			} else {
				let group = data.data.group
				$('[poll-list-container-published]').find(`.poll-list-item[data-group=${group}][data-pid=${data.data.parentPid}] [total-votes]`).text(data.polls.votes.length)
				const option = $(`.poll-list-item .poll-option[data-pid=${data.data.pid}][data-option-index=${data.data.selected}]`)
				let count = option.find('.vote-count').text();count++;
				option.find('.vote-count').text(count)
				option.find('.vote-bar>div').width(`${Math.round(count*100/classCount)}%`)
				let item = $('[poll-list-container-published]').find(`.poll-list-item[data-group=${group}][data-pid=${data.data.parentPid}] .students-non-voted > span[data-uid=${data.data.uid}]`)
				let parentItem = item.parent()
				item.remove()
				if(!parentItem.find('span').length){parentItem.hide()}
			}
		});

		function getGroupPollParams(){
			let timeConstraint = $('#timeandcategory .sdlms-menu-items').first().data('chosen')
			let group = $('#timeandcategory .sdlms-menu-items').last().data('chosen')
			timeConstraint = timeConstraint || 10
			group = group || 'question'
			console.log({timeConstraint, group});
			return {timeConstraint, group};
		}
		function getCustomPayload(){
			let question = $('.poll-question').val()
				let options = []
				let type = 'simple'
				$('[poll-option]').each(function(){
					if($(this).val()) options.push($(this).val())
				})
				
				if(!options.length){
					$('[poll-option]').each(function(i,e){
						options.push(`Option ${i+1}`)
					})
					type = 'spontaneous'
				}
				question = question || 'Spontaneous Poll'
				console.log(question,options);
				$('[poll-option]').val('')
				$('.poll-question').val('')
				let payload = {
					content: `From`,
					group: 'custom',
					tid: $that.tid,
					data: {
						format: 'alphabets',
						type,
						question,
						options,
					}
				}
				return payload
		}

		// create poll
		$target.on('click','[create-poll]', function(){
			if($('#timeandcategory').is(':visible')){
				// social poll
				let {timeConstraint, group} = getGroupPollParams()
				const createdAfter = Date.now() - parseInt(timeConstraint) * 1000
				const payload = {
					content: `Here are everyones's ${group[0].toUpperCase() + group.slice(1)} Threads`,
					group:'group',
					tid: $that.tid,
					createdAfter,
					data:{
						type:group,
						createdAfter,
					}
				}
				if(!confirm('Are you sure you want to start this Poll?')) return;
				socket.emit(`sdlms.polls.create`, payload, function (err, data) {
					if (err) return Polls.error(err);
					console.log(data);
					if(data.status){
						notify('Poll created Successfully!')
					}
					$(`[poll-list-container-new]`).append(templates.tray.groupPollListItem({
						status:"new",
						pid:data.pid,
						group,
						createdAt:Date.now(),
						content:`Here are Everyone's ${group} threads`,
						data:{},
						totalCount:classCount
					}))
					$target.find('.empty-polls').remove()
				});
				
			} else {
				// custom poll
				let payload = getCustomPayload()
				socket.emit(`sdlms.polls.create`, payload, function (err, data) {
					if (err) return Polls.error(err);
					console.log(data);
					if(data.status){
						notify('Poll created Successfully!')
					}
					if(!$(`[poll-list-container-${data.status}]`).length){
						$('.main-page-body').append(templates.tray.pollListContainer({status:data.status}))
					}
					$(`[poll-list-container-${data.status}]`).prepend(templates.tray.pollListItem({...data, totalCount:classCount}))
					$(window).trigger(`sdlms:polls.create`, data);
					$target.find('.empty-polls').remove()
				});
				
			}
			$('[poll-list-container-new]').parent().show()
		})

		function endCustomPoll(payload, group, pid, status){
			socket.emit('sdlms.polls.complete', payload, function (err, data) { 
				if (err) return Polls.error(err);
				notify('Poll Completed Successfully!', 'info')
				let pollItem = $(`.poll-list-item[data-pid=${pid}][data-group=${group}][data-status=${status}]`).parent()
				let nonVoted = []
				pollItem.find('.students-non-voted > span').each((i,e) => nonVoted.push({
					uid:$(e).data('uid'),
					username:$(e).text()
				}))
				pollItem.remove()
				$(`[poll-list-container-completed]`).parent().show()
				let {voteCount} = countVotes(data)
				$(`[poll-list-container-${data.status}]`).prepend(templates.tray.pollListItem({
					voteCount, 
					...data, 
					totalCount:classCount,
					students: nonVoted
				}))
				checkEmptyContainer(false,['published'])
			});
		}

		function groupPollPayload(item, group, pid){
			let payload = {
				pid,
				group:'group',
				tid: $that.tid,
				groupType:group
			};
			let options = []
			let voteCount = []
			item.parents('.poll-list-item').find('.poll-option').each((i,e)=>{
				options[i] = {pid:$(e).data('pid'), content: $(e).find('.vote-content').text()}
				voteCount[i] = parseInt($(e).find('.vote-count').text())
			})
			console.log(voteCount);
			payload.voteCount = voteCount
			payload.options = options
			return payload;
		}

		// Publish/ending Poll
		$target.on('click','.poll-list-item [poll-action-button],.poll-list-item [alternate-poll-button]', function(){
			let status = $(this).parents('.poll-list-item').data('status')
			let pid = $(this).parents('.poll-list-item').data('pid')
			let group = $(this).parents('.poll-list-item').data('group')
			if(group!='custom' && status=='new'){
				let payload = {
					pid,
					group,
					tid:$that.tid,
					status
				}
				socket.emit('sdlms.polls.announce.group', payload, function (err, polls) {
					if (err) return Polls.error(err);
					console.log(polls);
					if(!polls.length) return notify('No threads found!');
					$(`.poll-list-item[data-group=${group}][data-status=new][data-pid=${pid}]`).parent().remove()
					let options = polls.map(e => {
						return {content: e.content,pid: e.pid}
					})
					console.log(options);
					$(`[poll-list-container-published]`).parent().show()
					$(`[poll-list-container-published]`).prepend(templates.tray.groupPollListItem({
						group,
						pid,
						data:{options},
						createdAt:Date.now(),
						content:`Here are Everyone's ${group} threads`,
						status:"published",
						totalCount:classCount,
						students,
					}))
					$(window).trigger('sdlms:polls.announced', polls);
					checkEmptyContainer(false,['new'])
				});
				return;
			}
			if(status == 'new'){
				if(!confirm('Are you sure you want to publish the poll?')) return;
				let payload = {
					pid: pid,
					group: 'custom',
					tid: $that.tid
				};
				socket.emit('sdlms.polls.announce.single', payload, function (err, data) {
					$that.log(err);
					if (err) return Polls.error(err);
					notify('Poll Published Successfully!', 'info')
					$(`.poll-list-item[data-pid=${pid}][data-status=${status}]`).parent().remove()
					$(`[poll-list-container-published]`).parent().show()
					$(`[poll-list-container-${data.status}]`).prepend(templates.tray.pollListItem({...data, totalCount:classCount, students}))
					$target.find('.empty-polls').remove()
					checkEmptyContainer(false,['new'])
					$(window).trigger('sdlms:polls.announced', data);
				});

			} else if(status == "published"){
				if(group!='custom'){
					// end group poll
					if(!confirm('Are you sure you want to stop this poll?')) return;
					let pid = $(this).parents('.poll-list-item').data('pid')
					let payload = groupPollPayload($(this), group, pid);
					let thisItem = $(this).parents('.poll-list-item').parent()
					
					socket.emit('sdlms.polls.complete', payload, function (err, data) {
						if (err) return Polls.error(err);
						$(`[poll-list-container-completed]`).parent().show()
						thisItem.remove()
						thisItem.find('.poll-list-item').attr('data-status','completed')
						thisItem.find('[poll-action-button]').text('View')
						thisItem.find('[alternate-poll-button]').parent().remove();
						$('[poll-list-container-completed]').prepend(thisItem);
						notify('Poll Stopped Successfully');
						checkEmptyContainer(false,['published'])
					});
					return;
				}
				let status = $(this).parents('.poll-list-item').data('status')
				let pid = $(this).parents('.poll-list-item').data('pid')
				if(!confirm('Are you sure you want to stop this poll?')) return;
				let payload = {
					pid: pid,
					group: 'custom',
					tid: $that.tid
				};
				endCustomPoll(payload, 'custom', pid, status)
			}
		})

		graphs.groups();
		graphs.polls(graphs.single);
		graphs.list(null, null);

		$target.on('show.bs.tab', '.sdlms-polls-tab  > a', function (e) {
			let group = $(this).parents('.sdlms-polls-tab').first().data('group');
			$target.find('[publish-poll-group]')[group == 'custom' ? 'addClass' : 'removeClass']('action-disbaled');
			updateGroups(group);
		});

		$('#poll-tab-' + groups[0] + '-' + $id + '-tab').tab('show');

		$target.on('click', '[custom-poll-list] [publish-poll]', function (e) {
			let $this = $(this);
			let pid = $this.attr('publish-poll');
			let payload = {
				pid: pid,
				group: 'custom',
				tid: $that.tid
			};
			socket.emit('sdlms.polls.announce.single', payload, function (err, data) {
				$that.log(err);
				if (err) return Polls.error(err);
				let $group = $target.find(`.${data.group}-${$id} .sdlms-tab-polls-container`);
				let $elem = $group.find(`.sdlms-single-poll[data-pid="${data.pid}"]`);
				$elem.replaceWith(templates[data.group == 'custom' ? 'custom' : 'tray'].list(data, ($group.find(`.sdlms-single-poll`).length - $elem.index())));
				$(window).trigger('sdlms:polls.announced', data);
			});
		});

		$target.on('click', '[custom-poll-list] [complete-poll]', function (e) {
			let $this = $(this);
			let pid = $this.attr('complete-poll');
			let payload = {
				pid: pid,
				group: 'custom',
				tid: $that.tid
			};
			socket.emit('sdlms.polls.complete', payload, function (err, data) {
				if (err) return Polls.error(err);
				let $group = $target.find(`.${data.group}-${$id} .sdlms-tab-polls-container`);
				let $elem = $group.find(`.sdlms-single-poll[data-pid="${data.pid}"]`);
				$elem.replaceWith(templates[data.group == 'custom' ? 'custom' : 'tray'].list(data, ($group.find(`.sdlms-single-poll`).length - $elem.index())));
			});
		});

		$target.on('click', '[custom-poll-list] [edit-poll]', function (e) {
			let $this = $(this);
			let pid = $this.attr('edit-poll');
			let $tab = $target.find(`#poll-tab-custom-${$id}`).find(`[edit-container][data-pid="${pid}"]`);
			if ($tab.find('form.custom-poll-form').length) return $that.log('already exists');

			let payload = {
				pid: pid,
				group: 'custom',
				tid: $that.tid
			};

			socket.emit('sdlms.polls.get.single', payload, function (err, data) {
				if (err) return Polls.error(err);
				edit(data);

			});
		});
		
		$target.on('click', '[custom-poll-list] [view-poll-response]', function (e) {
			let $this = $(this);
			let pid = $this.attr('view-poll-response');

			let payload = {
				pid: pid,
				group: 'custom',
				tid: $that.tid
			};

			socket.emit('sdlms.polls.get.single', payload, function (err, data) {
				if (err) return Polls.error(err);
				if (!(data.votes || []).length) return notify('No response yet', 'info');
				response(data);
			});
		});

		$target.on('click', '[publish-poll-group]', function () {
			if (!$that.canPublish) return false;
			$that.log('publish');
			if ($(this).attr('publishing') == 1) return notify('Publishing...', 'info');
			$(this).attr('publishing', 1);
			let group = $target.find('.nav-item.active.sdlms-polls-tab').data('group');
			let data = {};
			data.tid = $that.tid;
			data.group = group;
			data.createdAfter = $that.active().filter().createdAfter;

			socket.emit('sdlms.polls.announce.group', data, function (err, res) {
				$(this).attr('publishing', 0);
				if (err) return Polls.error(err);
				updateGroups(data.group);
				$(window).trigger('sdlms:polls.announced', data);
			});

		});

		$target.on('click', '[create-custom-poll]', function () {

			let $tab = $target.find(`#poll-tab-custom-${$id}`);
			if ($tab.hasClass('active')) {
				if ($tab.find('form.custom-poll-form').length) return $that.log('already exists');

				let pollID = Polls.unique('');
				$tab.prepend(templates.custom.container({
					id: 'custom-poll-form-' + pollID,
					classes: 'custom-poll-form',
					html: (templates.custom.steps.one() + templates.custom.steps.two())
				}));
				let $container = $('#custom-poll-form-' + pollID);
				$that.customPollsEvents($container);
				return;
			};
			let $active = $target.find('[poll-group][data-group-type].tab-pane.active');
			let $selected = $active.find('.single-selectable-poll.selected');
			if (!$selected.length) return notify('Please select at one least option to create a poll', 'info');
			if (!confirm(`Are you sure you want to create a new poll with ${$selected.length} options?`)) return;
			let payload = {
				content: `From ${$active.attr('data-group-type')}`,
				group: 'custom',
				fromGroup: $active.attr('data-group-type'),
				tid: $that.tid,
				data: {
					format: 'alphabets',
					options: [],
				}
			}

			let $options = $selected;
			$options.each(function () {
				payload.data.options.push(app.processString($(this).find('[poll-content]').text()));
			});

			payload.data.options = [...new Set(payload.data.options)];

			if (!payload.data.options.length) return Polls.error('No options found', 'info');

			socket.emit(`sdlms.polls.create`, payload, function (err, data) {
				if (err) return Polls.error(err);
				$(window).trigger(`sdlms:polls.create`, data);
				$('.sdlms-polls-tab[data-group="custom"] > a').tab('show');
			});
		});

		$target.on('click', '.single-selectable-poll', function () {
			$(this).toggleClass('selected');
		});

		$target.on('click', '.dropdown-item[filter-status]', function () {

			let $this = $(this);
			$target.find('.dropdown-item[filter-status]').removeClass('active');
			$this.addClass('active');
			$this.parents('.polls-filter-dropdown').find('.filter-label').text($this.text());
			updateGroups($that.active().group(), $that.active().filter());
			$(window).trigger('sdlms:polls.filter.change', 'status');

		});

		$target.on('click', '.dropdown-item[filter-time]', function () {

			let $this = $(this);
			$target.find('.dropdown-item[filter-time]').removeClass('active');
			$this.addClass('active');
			$this.parents('.polls-filter-dropdown').find('.filter-label').text($this.text());
			updateGroups($that.active().group(), $that.active().filter());
			$(window).trigger('sdlms:polls.filter.change', 'time');

		});

		$target.on('submit', '[poll-filter-form]', function (e) {
			e.preventDefault();
			let $this = $(this);
			let students = [];
			$this.find("[student-checkbox] input[name='student']:checkbox:checked").each(function () {
				students.push($(this).val());
			});
			if (!students.length) return notify('Please select at least one student', 'error');
			students = students.map(e => Number(e));
			let group = $target.find(".sdlms-polls-tab.active").data('group');
			updateGroups(group, {
				uids: students
			});
		});

		$(window).on('sdlms:polls.created', function (e, data) {
			$that.log('polls:created', data);
			let $group = $target.find(`.${data.group}-${$id} .sdlms-tab-polls-container`);
			$group.prepend(templates[data.group == 'custom' ? 'custom' : 'tray'].list(data));
			graphs.list(data, true);
			$that.log(data);
			if (data.next == 'publish') {
				let $elem = $group.find(`.sdlms-single-poll[data-pid="${data.pid}"] [publish-poll="${data.pid}"]`);
				$elem.trigger('click');
			}

		});

		$(window).on('sdlms:polls.updated', function (e, data) {
			$that.log('polls:updated', data);
			let $group = $target.find(`.${data.group}-${$id} .sdlms-tab-polls-container`);
			let $elem = $group.find(`.sdlms-single-poll[data-pid="${data.pid}"]`);
			$elem.replaceWith(templates[data.group == 'custom' ? 'custom' : 'tray'].list(data, ($group.find(`.sdlms-single-poll`).length - $elem.index())));
		});

		socket.on('event:polls.selection', function (data) {
			let $group = $target.find(`.${data.group}-${$id} .sdlms-tab-polls-container`);
			$group.prepend(templates.tray.list(data));
			graphs.groups([data.group]);
			graphs.polls(graphs.single, [data.group]);
		});

		socket.on('event:polls.vote', function (data) {
			let $group = $target.find(`.${data.group}-${$id}`);
			let $list = $group.find(`[data-pid="${data.pid}"]`);
			$list.find(`[poll-vote-count="${data.pid}"]`).html((data.votes || 0).length);
			graphs.list(data, !true);
			if (data.group == 'custom' && $target.find(`#poll-tab-custom-${$id}`).find(`[response-container][data-pid="${data.pid}"] canvas`).length) {
				$that.log('update canvas');
				response(data);
			}
		});

		function edit(data) {
			let $tab = $target.find(`#poll-tab-custom-${$id}`).find(`[edit-container][data-pid="${data.pid}"]`);
			if ($tab.find('form.custom-poll-form').length) return $that.log('already exists');

			let pollID = Polls.unique('');
			$tab.append(templates.custom.container({
				id: 'custom-poll-form-' + pollID,
				classes: 'custom-poll-form position-relative z-index-1 px-0 border-top',
				html: (templates.custom.steps.two(data, templates.custom.option) + templates.custom.actions(true, data))
			}));
			let $container = $('#custom-poll-form-' + pollID);
			$that.customPollsEvents($container, {
				active: 1,
				pid: data.pid,
			});
		}

		function response(data) {
			let $tab = $target.find(`#poll-tab-custom-${$id}`).find(`[response-container][data-pid="${data.pid}"]`);
			$tab.find('.poll-responsse').remove();

			let pollID = Polls.unique('');
			$tab.append(templates.custom.container({
				id: 'poll-response-' + pollID,
				classes: 'poll-responsse',
				html: (templates.custom.canvas({
					id: 'poll-response-canvas-' + pollID,
				}))
			}));
			let $canvas = $('#poll-response-canvas-' + pollID);
			graphs.response($canvas, data);
		}

		function updateGroups(group, extr = {}) {
			if (!group) return;

			let label = $that.getNameByGroup(group);

			let payload = {
				tid: $that.tid,
				group: group,
				...$that.active().filter(),
				...extr
			}
			socket.emit('sdlms.polls.get.all', payload, function (err, polls) {
				if (err) return Polls.error(err);
				let noPollHTML = `<div class="text-muted no-poll p-3 text-center">No ${$that.active().filter().status || ''} polls for ${label} yet</div>`;
				polls[group] = polls[group] || [];
				polls[group] = polls[group].sort((a, b) => b.createdAt - a.createdAt);
				let pollsHTML = polls[group].length ? polls[group].map((poll, index) => templates[group == 'custom' ? 'custom' : 'tray'].list(poll, (polls[group].length - index))).join('') : noPollHTML;
				if ($(`.${group}-${$id}`).length) return $(`.${group}-${$id}`).find('.sdlms-tab-polls-container').html(pollsHTML);
			});
		}

	}
	static open(data, tid) {
		let $target = $('body');
		let $id = Polls.unique("sdlms-polls-");
		let templates = Template.polls();
		$('[poll-vote-modal]').remove();

		$target.append(templates.polls.modal({
			id: $id + '-modal',
			title: 'Vote'
		}));

		let $modal = $target.find('#' + $id + '-modal');
		$modal.find('.modal-body').append(templates.polls.container({}, ''));
		let $container = $modal.find('.poll-container');

		$.each(data, (i, poll) => {
			poll.tid = tid;
			$container.append(templates.polls[poll.group == 'custom' ? 'custom' : 'list'](poll));
		});


		$modal.modal('show');

		$modal.on('click', '[vote-poll]', function () {
			let data = $(this).data();
			let $this = $(this);
			if ($('[vote-poll].voted').length) notify('You have already voted', 'info');
			$(this).addClass('voted');
			socket.emit('sdlms.polls.vote', data, (err, data) => {
				if (err) return Polls.error(err);
				$this.removeClass('voted');
				$modal.modal('hide');
				$('body').removeClass('modal-open');
				$('.modal-backdrop').remove();
				$modal.remove();
			});
		});

		$modal.on('submit', '.custom-poll-response-form', function (e) {
			e.preventDefault();
			let $this = $(this);

			if (!$this.find('[name="response"]:checked').length) return notify('Please select a options', 'info');

			let payload = {
				tid: tid,
				group: 'custom',
				pid: data[0].pid,
				selected: [$this.find('[name="response"]:checked').val()],
			}
			if ($('.custom-poll-response-form.voted').length) notify('You have already voted', 'info');
			$(this).addClass('voted');
			socket.emit('sdlms.polls.vote', payload, (err, data) => {
				if (err) return Polls.error(err);
				$this.removeClass('voted');
				$modal.modal('hide');
				$('body').removeClass('modal-open');
				$('.modal-backdrop').remove();
				$modal.remove();
			});

		})

	}
	static close() {
		if ($('[poll-vote-modal]').length) {
			$('[poll-vote-modal]').remove();
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
		}

	}
	static error(err) {
		if ('message' in err) notify(err.message, 'error');
	}
	getNameByGroup(group) {
		return this.groups.find(e => e.group == group).name || 'No Group';
	}
	active() {
		let actives = {
			filter: () => {
				let time = this.$builder.find('.dropdown-item[filter-time].active').data('value');
				let status = this.$builder.find('.dropdown-item[filter-status].active').data('value');
				time = !time ? null : moment().subtract(time, 'minutes').valueOf();
				return {
					createdAfter: time,
					status: status
				}
			},
			group: () => {
				let group = this.$builder.find('.nav-item.active.sdlms-polls-tab').data('group');
				return group;
			}
		};
		return actives;
	}
	graph() {
		let $that = this;
		let $id = $that.$id;
		let $filter = $(`#useGraphFilter-${$id}`);
		var isBetween = function (date, start, end) {
			return moment(date).isBetween(moment(start), moment(end));
		}
		let canvas = {};
		canvas.single = {};
		canvas.responses = {};
		let graphs = {
			groups: function (groups = []) {
				let $target = $('#graph-canvas-groups-' + $id);

				socket.emit('sdlms.polls.getCountByGroups', {
					tid: $that.tid,
					groups: groups.length ? groups : $that.groups.map(e => e.group),
					createdAfter: $that.active().filter().createdAfter
				}, function (err, res) {
					if (err) return Polls.error(err);
					draw(res)
				});


				function draw(data) {
					let labels = [...$that.groups.map(e => e.name)];

					let datasets = [{
						data: [...data.polls.map(e => (e.count))],
						backgroundColor: '#000000',
						label: ['Polls'],
						// }, {
						// 	data: [...data.published.map(e => e.count)],
						// 	backgroundColor: '#000000',
						// 	label: ['Published'],
						// }];
					}]

					if (canvas.groups) {
						canvas.groups.data.labels = labels;
						canvas.groups.data.datasets = datasets;
						canvas.groups.update();
						return
					}

					canvas.groups = new Chart($target[0], {
						type: 'bar',
						data: {
							labels: labels,
							datasets: datasets
						},
						options: {
							indexAxis: 'x',
							title: {
								display: true,
								text: "Number of thoughts  from diffrent students threadbuilder"
							},
							scales: {
								y: {
									display: true,
									title: {
										display: !true,
										text: 'Number of thoughts'
									},
									min: 0,
									ticks: {
										stepSize: 1
									}
								}
							}
						}
					});
					$(`.polls-graph-${$id} .owl-carousel`).owlCarousel({
						items: 1,
						nav: true,
						dots: true,
						navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
						loop: true,
						autoplay: true,
						autoplayTimeout: 10000,
						autoplayHoverPause: true,
					});
				}
			},
			polls: function (cb, groups) {
				groups = groups || [];
				let $target = $('#graph-canvas-polls-all-' + $id);
				let filter = $that.active().filter();
				$that.log(groups);
				socket.emit('sdlms.polls.get.all', {
					tid: $that.tid,
					group: groups.length ? groups : $that.groups.map(e => e.group),
					createdAfter: $that.active().filter().createdAfter
				}, function (err, res) {
					if (err) return Polls.error(err);
					draw(res)
					if (typeof cb === 'function') cb(res);

				});


				function draw(data) {

					let sets = {};
					let datasets = [];

					let timestamps = app.splitTimeIntoChunks((filter.createdAfter || moment().subtract(1, 'days').valueOf()), Date.now(), 5);
					let labels = [...timestamps.map(e => moment(e).format('HH:mm'))];
					if (data.custom) delete data.custom;
					Object.keys(data).map(e => {
						sets[e] = {};
						timestamps.forEach((element, index) => {

							sets[e][element] = [...(sets[e][element] || []), data[e].filter(e => isBetween(e.createdAt, element, (index <timestamps.length ? timestamps[index + 1] : Date.now()))).length];

						});
						datasets.push({
							label: [$that.getNameByGroup(e)],
							data: Array.prototype.concat.apply([], ([...Object.keys(sets[e]).map(ei => sets[e][ei])])),
							backgroundColor: app.random.colors.random(),
						});
					});


					if (canvas.polls) {
						canvas.polls.data.labels = labels;
						canvas.polls.data.datasets = datasets;
						canvas.polls.update();
						return
					}

					canvas.polls = new Chart($target[0], {
						type: 'bar',
						data: {
							labels: labels,
							datasets: datasets
						},
						options: {
							indexAxis: 'x',
							title: {
								display: true,
								text: "Number of thoughts  from diffrent students threadbuilder"
							},
							scales: {
								y: {
									display: true,
									title: {
										display: !true,
										text: 'Number of thoughts'
									},
									min: 0,
									ticks: {
										stepSize: 1
									}
								}
							}
						}
					});
					// $(`.polls-graph-${$id} .owl-carousel`).owlCarousel({
					// 	items: 1,
					// 	nav: true,
					// 	dots: true,
					// 	navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
					// 	loop: true,
					// 	autoplay: true,
					// 	autoplayTimeout: 10000,
					// 	autoplayHoverPause: true,
					// });
				}
			},
			single: function (data) {

				let sets = {};
				let filter = $that.active().filter();
				let timestamps = app.splitTimeIntoChunks((filter.createdAfter || moment().subtract(1, 'days').valueOf()), Date.now(), 5);

				Object.keys(data).map(e => {
					let $target = $(`#graph-canvas-${e}-${$id}`);
					let labels = [...timestamps.map(e => moment(e).format('HH:mm'))];
					sets[e] = {
						new: {},
						published: {}
					};

					timestamps.forEach((element, index) => {
						sets[e]['new'][element] = [...(sets[e]['new'][element] || []), data[e].filter(e => e.status == 'new' && isBetween(e.createdAt, element, (index <timestamps.length ? timestamps[index + 1] : Date.now()))).length];
						// sets[e]['published'][element] = [...(sets[e]['published'][element] || []), data[e].filter(e =>  e.status == 'published' && isBetween(e.createdAt,element,(index <timestamps.length ? timestamps[index + 1] : Date.now()))).length];
					});

					let datasets = [{
							data: Array.prototype.concat.apply([], ([...Object.keys(sets[e].new).map(ei => sets[e].new[ei])])),
							backgroundColor: '#0029FF',
							label: [$that.getNameByGroup(e)] // ['New'], 
						}
						/*,},{
											data: Array.prototype.concat.apply([], ([...Object.keys(sets[e].published).map(ei => sets[e].published[ei])])),
											backgroundColor: '#000000',
											label: ['Published'],
										};,*/
					];

					$that.log(datasets);

					if (canvas.single[e]) {
						$that.log(labels);
						canvas.single[e].data.labels = labels;
						canvas.single[e].data.datasets = datasets;
						canvas.single[e].update();
						return
					}



					let k = new Chart($target[0], {
						type: 'bar',
						data: {
							labels: labels,
							datasets: datasets
						},
						options: {
							indexAxis: 'x',
							title: {
								display: !true,
								text: "Number of thoughts  from diffrent students threadbuilder"
							},
							scales: {
								y: {
									display: true,
									title: {
										display: !true,
										text: 'Number of thoughts'
									},
									min: 0,
									ticks: {
										stepSize: 1
									}
								}
							}
						}
					});
					canvas.single[e] = k;
				});

				$(`.polls-graph-${$id} .owl-carousel`).owlCarousel({
					items: 1,
					nav: true,
					dots: true,
					navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
					loop: true,
					autoplay: true,
					autoplayTimeout: 10000,
					autoplayHoverPause: true,
				});
			},
			response: function ($target, poll) {
				let votes = poll.votes || [];
				let labels = [];
				let data = [];
				let backgroundColors = []
				var getVoteCount = function (selected) {
					return votes.filter(e => (e.selected.map(e => Number(e))).includes(Number(selected))).length;
				}
				var getVotePercentage = function (selected) {
					return votes.length > 0 ? (
						String(((getVoteCount(selected) * 100) / votes.length).toFixed(2)).padStart(5, '0')
					) : 0;
				}
				poll.data.options.forEach((e, i) => {
					labels.push(`${app.numberToAlphabates(i+1)} (${getVotePercentage(i)}%)`);
					data.push(getVoteCount(i));
					backgroundColors.push(app.random.colors.random());
				});

				if (canvas.responses[poll.pid]) {
					canvas.responses[poll.pid].data.labels = labels;
					canvas.responses[poll.pid].data.datasets[0].data = data;
					canvas.responses[poll.pid].update();
					return;
				}

				canvas.responses[poll.pid] = new Chart($target[0], {
					type: 'bar',
					data: {
						labels: labels,
						datasets: [{
							label: '',
							data: data,
							backgroundColor: backgroundColors,
						}]
					},
					options: {
						indexAxis: 'y',
						title: {
							display: true,
							text: "Number of thoughts  from diffrent students threadbuilder"
						},
						scales: {
							x: {
								display: true,
								title: {
									display: !true,
									text: 'Number of thoughts'
								},
								min: 0,
								ticks: {
									stepSize: 1
								}
							}
						},
						plugins:{
							legend:false	
						}
					}
				});
				
			},
			list: function (poll, add ) {
				add = add || false;
				let $target = $('#graph-canvas-list-polls-' + $id);
				let filter = $that.active().filter();

				if (add && poll && canvas.lists) {
					canvas.lists.data.labels = [...canvas.lists.data.labels, app.numberToAlphabates(canvas.lists.data.labels.length + 1)];
					canvas.lists.data.datasets[0].data = [...canvas.lists.data.datasets[0].data, (poll.votes || []).length];
					canvas.lists.update();
					return;
				}
				if (!add && poll && canvas.lists) {
					canvas.lists.data.datasets[0].data[canvas.lists.data.datasets[0].data.length - 1] = (Number(canvas.lists.data.datasets[0].data[canvas.lists.data.datasets[0].data.length - 1]) + 1);
					canvas.lists.update();
					return;
				}

				socket.emit('sdlms.polls.get.all', {
					tid: $that.tid,
					group: ['custom'],
					...(filter)
				}, function (err, res) {
					if (err) return Polls.error(err);
					$that.log(res);
					draw(res.custom)
				});


				function draw(polls) {



					let labels = [];
					let data = [];
					let backgroundColors = [];



					polls.forEach((e, i) => {
						labels.push(`${app.numberToAlphabates(i+1)}`);
						data.push((e.votes || []).length);
						backgroundColors.push(app.random.colors.random());
					});
					$that.log(backgroundColors);
					if (canvas.lists) {
						canvas.lists.data.labels = labels;
						canvas.lists.data.datasets[0].data = data;
						canvas.lists.update();
						return;
					}

					canvas.lists = new Chart($target[0], {
						type: 'bar',
						data: {
							labels: labels,
							datasets: [{
								label: '',
								data: data,
								backgroundColor: backgroundColors,
							}]
						},
						options: {
							legend: {
								display: false
							},
							indexAxis: 'x'
						}
					});
				}
			},
		}
		$(window).on('sdlms:polls.filter.change', function (e, type) {
			if (type == 'time') {
				graphs.groups();
				graphs.polls(graphs.single);
				graphs.list();
			}
		});
		$(window).on('sdlms:polls.created', function (e, data) {
			$that.log('sdlms:polls.created');
			graphs.groups();
			graphs.polls(graphs.single, [data.group]);
		});
		$(window).on('sdlms:polls.announced', function (e, data) {
			$that.log('sdlms:polls.announced');
			graphs.groups();
			graphs.polls(graphs.single, [data.group]);
		})
		return graphs;
	}
	customPollsEvents($container, config = {}) {
		let $that = this;
		let $parent = $container.parents('.custom-poll-form').first();
		let templates = Template.polls();
		let step = new Stepper({
			target: $container,
			loop: false,
			active: config.active || 1,
		});

		$container.on('click', '.polls-step-2', function () {
			step.next();
		});
		$container.on('sdlms:step:change', function (e, data) {
			let {
				current,
				$elem,
				$prev
			} = data;
			if (current == 2) {
				let option_number = Number($prev.find('[name="options"]').val());

				$elem.find('.sdlms-polls-options').empty();
				if (option_number <1) return step.go(1);

				$elem.find('.sdlms-polls-options').append(`<ul class="list-group border-top border-bottom sdlms-polls-option-container rounded-0 px-2">${[...Array(option_number).fill('')].map((e,i)=>templates.custom.option(i,e)).join('')} </ul>`);
				$elem.find('.sdlms-polls-options').append(templates.custom.actions());
				$elem.find('.sdlms-polls-options .sdlms-polls-action-buttons .close-custom-polls')
					.off('click')
					.on('click', function () {
						$that.log('close');
						$parent.remove();
					});
			}
		});

		$parent.find('.close-custom-polls').on('click', function () {
			$that.log('close');
			$parent.remove();
		});

		$container.on('click', '.sdlms-polls-action-button-add', function () {
			let i = $parent.find('.sdlms-polls-option-container .sdlms-polls-option').length;
			$parent.find('.sdlms-polls-option-container').append(templates.custom.option(i, ''));
		});

		$container.on('click', '.remove-sdlms-polls-option', function () {
			$(this).parents('.sdlms-polls-option').remove();
		});

		$container.on('click', '.sdlms-polls-action-button-prev', function () {
			step.prev();
		});

		$container.on('click', '.sdlms-polls-action-button-publish', function () {
			$that.log('publish');
			let data = $container.serializeObject();
			$that.log(data);
			let payload = {
				content: app.processString(data.question),
				group: 'custom',
				tid: $that.tid,
				pid: config.pid,
				data: {
					format: data.format,
					options: [...(data.options || []).map(e => app.processString(e))],
				}
			}
			$that.log(payload);

			if (!payload.data.options.length) return Polls.error('Please add at least one option');

			socket.emit(`sdlms.polls.${config.pid ? 'update' :'create'}`, payload, function (err, data) {
				if (err) return Polls.error(err);
				$parent.remove();
				data.next = 'publish';
				$(window).trigger(`sdlms:polls.${config.pid ? 'updated' :'created'}`, data);
			});
		});

		$container.on('click', '.sdlms-polls-action-button-save', function () {

			let data = $container.serializeObject();
			let payload = {
				content: app.processString(data.question),
				group: 'custom',
				tid: $that.tid,
				pid: config.pid,
				data: {
					format: data.format,
					options: [...(data.options || []).map(e => app.processString(e))],
				}
			}
			if (!payload.data.options.length) return Polls.error('Please add at least one option');
			socket.emit(`sdlms.polls.${config.pid ? 'update' :'create'}`, payload, function (err, data) {
				if (err) return Polls.error(err);
				$(window).trigger(`sdlms:polls.${config.pid ? 'updated' :'created'}`, data);
				$parent.remove();
			});
		});
	}
};


// $('[search-student]').off('input').on('input', function () {
// 	let parent=$(this).parents('form').first().find('[data-target="search-student"]');
// 	let $searchelems=parent.find('[student-checkbox]');
// 	let query=$(this).val();
// 	let tid=$that.tid;
// 	let inQueue=$(this).data('inqueue') || false;
// 	let $this=$(this)
// 	query=$.trim(query);
// 	if (!query) return $searchelems.show();
// 	$searchelems.hide();
// 	$searchelems.each(function (index, element) {
// 		let data=$(element).data();
// 		let k=0;
// 		$.each(data, function (i, e) {
// 			if (e) e=String(e);
// 			if (e && e.toLowerCase().includes(query.toLowerCase())) k++;
// 		});
// 		if (k) $(element).show();
// 	});
// 	if (!(!inQueue && tid && !$searchelems.filter(':visible').length)) return;
// 	$(this).data('inqueue', true);
// 	require(['api'], function (api) {
// 		api.get(`/sdlms/${tid}/attendance`, {
// 			limit: 50,
// 			query: query,
// 			key: 'fullname'
// 		}).then(function (res) {
// 			if (res.data.length) {
// 				$.each(res.data, function (index, data) {
// 					if (Array.isArray(window.students) && window.students.indexOf(data.uid) === -1) window.students.push(data);
// 					if (!parent.find(`[student-checkbox][data-uid="${data.uid}"]`).length) parent.append(templates.checkbox(data));
// 				})
// 			}

// 		}).catch(function (err) {
// 			$that.log(err);
// 		}).finally(function () {
// 			$this.data('inqueue', false);
// 		});
// 	});

// });