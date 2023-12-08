/**
 * @author Unknown
 * @date 12/2021
 * @description Allow user to build the threads based on @tid and @uid with update and private,public mode
 * @name Session as @name Topic
 * @returns @threadbuilder
 */

/**
 * @var {class} threadbuilder
 * @description Contains the @methods or @function - to run the threadbuilder
 * @function threadbuilder.init
 * @function threadbuilder.unique
 * @function threadbuilder.log
 * @function threadbuilder.builder
 * @function threadbuilder.thread
 * @function threadbuilder.create
 */

 class threadBuilder extends Template{
	constructor(data = {}) {
		/**
		 * @author Unknown
		 * @description Tid is required to init a thread builder
		 */

		if (!data.tid) {
			throw new Error('Invalid tid supplied');
		}
		super();
		this.tid = data.tid;
		this.data = data;
		this.assetId = data.assetId;
		this.data.with = this.restore() || data.with || {};
		this.students = data.students || [];
		this.lookup_id = data.lookup_id || null;
		var b = document.documentElement;
		b.setAttribute('data-useragent', navigator.userAgent);
		b.setAttribute('data-platform', navigator.platform);
		this.data.queue = 0;
		// let isMobiles = window.innerWidth;
		// let built = isMobiles < 700 ? $(`.mobile-sdlms ${this.data.target}`) : $(`.desktop-tb ${this.data.target}`)
		this.builder(this.data.target);
		$(window).trigger('sdlms.asset.selection.change');
	}

	restore() {
		if (this.data.noDraft) {
			console.log('No Draft Can not be Restored');
			return null;
		}
		if (localStorage.getItem(`tb_draft_${this.tid}_${this.data.uid}`) != null) {
			if (localStorage.getItem(`tb_draft_${this.tid}_${this.data.uid}_unsaved`)) {
				$('#nav-sdlms-thread-tab').append('<sup class="unsaved-changes">*</sup>');
			}
			const data = JSON.parse(localStorage.getItem(`tb_draft_${this.tid}_${this.data.uid}`));
			return data && data.threads ? data : null;
		}
	}

	draft() {
		if (!this.data.noDraft) {
			if ($('#nav-sdlms-thread-tab').find('.unsaved-changes').length) {
				localStorage.setItem(`tb_draft_${this.tid}_${this.data.uid}_unsaved`, true);
			}
			localStorage.setItem(`tb_draft_${this.tid}_${this.data.uid}`, JSON.stringify(this.getJSON()));
		}
	}
	/**
	 * @author Unknown
	 * @date 12/2021
	 * @name unique
	 * @type {function}
	 * @description to get unique id
	 * @param {String} prefix optional identifier for generated unique id {prefix + id}
	 */

	unique(prefix = '') {
		var dt = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			var r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
		});
		return prefix + uuid;
	}
	/**
	 * @author Unknown
	 * @date 12/2021
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
	 * @date 12/2021
	 * @name builder
	 * @type {function}
	 * @description Attach an  sdlms-thread-builder element
	 * @param {HTML ELEMENT} HTML element to render builder default body
	 */

	builder(target = 'body') {
		this.id = this.unique('sdlms-thread-');
		const $that = this;
		const $target = $(target);
		if (!$target.length) {
			/**
			 * @author Unknown
			 * @description Given target should be a valid HTML Element
			 */
			$that.log('No HTML element found For Builder Given ==>' + target);
			throw new Error(`No HTML element found while searching ${target}`);
		}
		$target.empty();
		$target.append(
			$('<sdlms-thread-builder>')
				.attr({
					id: $that.id,
					class: $that.data.noAction ? 'sdlms-readonly' : '',
				})
				.append(`<div class="sdlms-asset-owner" style="display:${$that.data.name || 'none'} " name="${$that.data.name}" ></div>`)
				.append(
					$('<form>').attr({
						id: 'form-' + $that.id,
						class: 'sdlms-form-elements sdlms-threadbuilder-container ' + ($that.data.action == 'reader' ? 'readonly' : 'create'),
					})
				)
		);
		const $builder = $(`#form-${$that.id}`);
		var buider_sdlms_id = $that.data.tid + '_' + $that.data.uid + '_' + ($that.data.id || 'new');
		$builder.attr('sdlms-id', buider_sdlms_id);
		$that.$builder = $builder;
		$that[$that.data.action == 'reader' ? 'reader' : 'create']($that.data.with);
		socket.on('meta.live.joined', (data) => {
			if (data.tid == $that.tid) {
				const i = $that.students.findIndex(x => x.uid == data.uid);
				if (i == -1) {
					$that.students.push(data);
				}
			}
		});
	}
	
	
	/**
	 * @author Unknown
	 * @date 12/2021
	 * @name create
	 * @type {function}
	 * @description Append @threabuilder to sdlms-thread-builder and attach all the events
	 * @param {Object} data optional if @threadbuilder is initied with existing @threadbuilder then render it with Exisiting
	 */
	create(data = null) {
		let isMobile = window.innerWidth;
		let $target = this.$builder,
			components = isMobile < 700 ? Template.threadbuilder_mobile(this).thread() :  Template.threadBuilder(this).thread(),
			$that = this;
		console.log(data,this.data.showHeader);
		if (data && data.threads) {
			$target.append(components.header(data.meta,Boolean(this.data.showHeader)));
			$target.append(components.container());
			const $container = $target.find('.sdlms-threads-container');
			$.each((data.threads || []), function (i, thread) {
				let subthread = '';
				$.each((thread.subthreads || []), function (ind, e) {
					subthread += components.subthread(e);
				});
				thread.summary = thread.summary || {};
				$container.append(components.thread(subthread, thread));
			});
			$target.append(components.action() +($that.data.hideDefault ? '' : components.save()));
		} else {
			$target.append(components.header({},Boolean(this.data.showHeader)));
			$target.append(components.container(components.thread(components.subthread())) + components.action() + ($that.data.hideDefault ? '' : components.save()));
		}
		this.stats();
		const ri = 0;
		function reIndex() {
			$target.find('[thread]').each(function () {
				const $this = $(this);
				const index = $(this).parent().children('[thread]').index(this);
				$this.find('index').text(app.numberToAlphabates(index + 1));
				$this.find('[subthreadcontainer] [subthread]').each(function () {
					const index = $(this).parent().children('[subthread]').index(this);
					console.log(index);
					$(this).find('index').text(index + 1);
				});
				const subthreads = $this.find('[subthreadcontainer] [subthread]').length;
				if (subthreads > 1) {
					$this.find('[remove-subthread]').show();
				} else {
					$this.find('[remove-subthread]').hide();
				}
			});
			const threads = $target.find('[thread]').length;
			if (threads > 1) {
				$target.find('[remove-thread]').show();
			} else {
				$target.find('[remove-thread]').hide();
			}
			$that.draft();
			$that.setIndexes();
			if ($that.tr) {
				$that.tr.events();
				$that.tr.track();
			}

			$target.attr('force-refresh', 1);
			if($that.data.autosave)$that.save(!1);
		}
		$target.on('click', '[save-thread-builder]', function (e, data) {
			$target.trigger('submit');
		});
		var [$submit, $newThread, $container] = [
			$target.find('button[type="submit"]'),
			$target.find('button[data-thread="new"]'),
			$target.find('.sdlms-threads-container'),
		];

		$target.find('.sdlms-thread-header [contenteditable]').keypress(function (e) {
			return e.which != 13 && $(this).text().length <= 64;
		});
		$target.on('copy paste','textarea,input',function(e){
			e.preventDefault();
			console.log('copy paste');
		})
		if (localStorage.getItem(`tb_draft_${$that.tid}_${$that.data.uid}_unsaved`)) {
			$target.trigger('make:dirty');
		}
		/**
		 * @author Unknown
		 * @description Remove the thread and their children [subthread]
		 */
		$target.on('click', '[remove-thread]', function () {
			$target.removeClass('sdlms-form-validated');
			if ($target.find('[thread]').length > 1) {
				$(this).parents('[thread]').first().remove();
				notify('Thread Removed', 'info');
				reIndex();
			} else {
				notify('Can not remove all Threads', 'info');
			}
		});
		/**
		 * @author Unknown
		 * @description Add subthread to a thread
		 */
		$target.on('click', '[add-subthread]', function () {
			$target.removeClass('sdlms-form-validated');
			console.log('new');
			$(this).parents('.sdlms-thread-builder-thread-body').find('[subthreadcontainer]').append(components.subthread());
			reIndex();
		});
		/**
		 * @author Unknown
		 * @description Remove subthread from a thread
		 */
		$target.on('click', '[remove-subthread]', function () {
			if ($(this).parents('[subthreadcontainer]').find('[subthread]').length > 1) {
				$target.removeClass('sdlms-form-validated');
				$(this).parents('[subthread]').first().remove();
				notify('Subthread Removed', 'info');
				reIndex();
			} else {
				notify('Can not remove all subthreads', 'info');
			}
		});
		$target.on('input','textarea, input:not([type="checkbox"],[type="radio"])' ,function(){
			$that.stats();
		})
		$target.on('change','[data-name="thoughts"]',function(){
			 let parent = $(this).parents('[subthread]');
			 let textarea = parent.find('textarea[name="content"]');
			 if($(this).is(":checked")){
				let data = {
					index:parent.index(),
					content:textarea.val(),
					group:$(this).data('group'),
					tid:$that.tid,
					selected:$(this).is(":checked"),
					data:$(this).data()
				}
				socket.emit('sdlms.class.poll.selection',data);
			 }
		});
		$target.find('select').each(function () {
			$(this).val($(this).attr('value'));
		});

		function save(noti = true) {
			/**
			 * @author Unknown
			 * @date 30-12-2021
			 * @description Making meta empty bcz we will read it when session tracker changes it's state
			 */

			var payload = $that.getJSON();
			console.log(payload);
			// api.get("sdlms/tid/threadbuilder/id")
			/**
			 * @author Unknown
			 * @description Make a request to Save/update @threadbuilder
			 */
			if (!$that.data.queue) {
				$that.data.queue = 1;
				require(['api'], function (api) {
					let request;
					let message = 'Saved Successfully';
					if ($that.data.id) {
						request = api.put(`/sdlms/${$that.tid}/threadbuilder/${$that.data.id}`, payload);
						message = 'Updated Successfully';
					} else {
						request = api.post(`/sdlms/${$that.tid}/threadbuilder`, payload);
					}

					$('#nav-sdlms-thread-tab').find('.unsaved-changes').remove();
					request.then((r) => {
						if (!$that.data.id) {
							console.log(($that.data.onAdded == 'function'), typeof $that.data.onAdded);
							if (typeof $that.data.onAdded === 'function') {
								$that.data.onAdded();
							}
						}
						$(window).trigger(('sdlms:asset.tb.'+($that.data.id?'updated':'created')),{
							pid:(r.pid || r._id),
							identifier:$that.data.identifier
						})
						$that.data.id = r.pid || r._id;
						// socket.emit('meta.live.assetUpdate', $.extend({}, $that.data, {
						// 	id: $that.data.id,
						// 	with: payload,
						// 	type: 'tb'
						// }));
						var buider_sdlms_id = $that.data.tid + '_' + $that.data.uid + '_' + $that.data.id;
						$that.$builder.attr('sdlms-id', buider_sdlms_id);
					}).catch((e) => {
						console.log(e);
					}).finally(() => {
						$that.data.queue = 0;
					});
					if (noti) {
						notify(message, 'success');
					}

					localStorage.removeItem(`tb_draft_${$that.tid}_${$that.data.uid}_unsaved`);
					localStorage.setItem(`tb_draft_${$that.tid}_${$that.data.uid}`, null);
				});
			} else {
				// Plese Wait We are ....
				console.log('Please wait');
				notify('Please Wait', 'info');
			}
		}
		/**
		 * @author Unknown
		 * @description Add new thread to @threadbuilder
		 */
		$newThread.off('click').on('click', function () {
			console.log($container);
			$target.removeClass('sdlms-form-validated');
			$container.append(components.thread(components.subthread()));
			setStudentforCredits();
			reIndex();
		});
		/**
		 * @author Unknown
		 * @description Save @threadbuilder
		 */
		$target.on('submit', function (e, data = {}) {
			if ($that.data.noAction) {
				alert('Sorry! You can not modify.');
				return;
			}
			e.preventDefault();
			if ($(this).find(':invalid').length) {
				return notify('Fields with Errors are not allowed', 'error');
			}
			$that.save();
		});
		$that.data.autosave = (isNaN($that.data.autosave) || $that.data.autosave < 30) ? 0 : $that.data.autosave;
		if ($that.data.autosave) {
			setInterval(() => {
				if ($that.dirty) {
					$that.save(!true);
					// notify('Threadbuilder auto Save', 'info');
				} else {
					console.log('No changes');
				}
			}, ($that.data.autosave || 120) * 1000);
		}
		reIndex();
		$target.find('[thread]').first().find('[collapse-subthread]').trigger('click');
		console.log($target.find('[thread]').first());
		console.log($target.find('[thread]').first().find('[collapse-subthread]'));
		$submit.on('click', function () {
			if ($that.data.noAction) {
				alert('Sorry! You can not modify.');
				return;
			}
			$target.addClass('sdlms-form-validated');
			$target.find(':invalid').each(function () {
				if ($(this).parents('[subthreadcontainerwithclosure]').length) {
					if (!$(this).parents('[subthreadcontainerwithclosure]').is(':visible')) {
						$(this).parents('[thread]').find('[collapse-subthread]').trigger('click');
					}
				}
			});
			try {
				$target.find(':invalid').focus();
			} catch (error) {
				console.error('Element is hidden so can not focus');
			}
		});
		if ($that.data.addFeedbacks && $that.data.id) {
			console.log('inited feedbacks');
			if (typeof FeedBacks !== 'function') {
				return console.log('TB:: Please add Feedbacks JS.');
			}
			new FeedBacks($.extend({}, $that.data, {
				target: `#${$that.id}`,
				assetId: $that.data.id,
				type: 'tb',
			}));
		}
		$target.dirrty();
		$target.on('dirty', function () {
			console.log(this, 'is Dirty');
			$that.dirty = true;
			$('#nav-sdlms-thread-tab').find('.unsaved-changes').remove();
			$('#nav-sdlms-thread-tab').append('<sup class="unsaved-changes">*</sup>');
		});
		$target.on('clean', function () {
			console.log(this, 'is clean');
			// if($that.restore()) return;
			$that.dirty = !true;
			localStorage.removeItem(`tb_draft_${$that.tid}_${$that.data.uid}_unsaved`);
			$('#nav-sdlms-thread-tab').find('.unsaved-changes').remove();
		});

		function setStudentforCredits() {
			$target.find('[student-list]').empty();
			$.each($that.students, function (index, student) {
				$target.find('[student-list]').append(`
						 <a class="dropdown-item sdlms-menu-item add-thread-credit" data-uid="${student.uid}" data-picture="${student.picture}" data-username="${student.username}" data-fullname="${student.fullname}" data-displayname="${student.displayname}" href="#">
							 <img onerror="${app.IMG_ERROR()}" src="${student.picture}" class="img-small rounded-circle mr-2"> <span>${student.fullname || student.displayname || student.username}</span>
						</a>
				`);
			});
			if ($that.students.length) {
				$target.find('[student-list]').append(`
					<a class="dropdown-item sdlms-menu-item add-thread-credit" data-uid="0"  href="#">
				  			 <span class="text-center w-100 mt-1 pt-2 d-flex justify-content-center border-top">Remove Credit</span>
					</a>
				`);
			}
		}
		setStudentforCredits();
		$target.on('click', '.add-thread-credit', function (e) {
			const student = $that.students.find(e => e.uid == $(this).data('uid'));
			const $ele = $(this).parents('[thread-credit]').find('[thread-credited-user]');
			$ele.empty();
			$.each($ele.data(), function (i) {
				$ele.data(i, null);
			});
			if (student) {
				$ele.html(`<img onerror="${app.IMG_ERROR()}" src="${student.picture}" class="img-md border-2px-unset rounded-circle"> <span class="sdlms-sub-text-tertiary-16px font-weight-500">${student.fullname || student.displayname || student.username}</span>`).data(student);
			}
			$that.draft();
			$target.trigger('make:dirty');
		});
		$(window).on('beforeunload', () => {
			$that.draft()
			// notify('ThreadBuilder Saved as draft', 'info');
		});
		if (!$that.data.noTracking) {
			console.log('inited tracking');
			$that.tr = new tracker($.extend({}, $that.data, {
				target: $target,
				event: 'session_tracking',
				asset_type: 'tb',
				key: $that.tid,
			}));
			$that.tr.events();
		}
		$that.setIndexes();
	}
	stats(){
		let string = '';
		this.$builder.find('textarea, input:not([type="checkbox"],[type="radio"])').each(function () {
			string += $(this).val().replace(/[\r\n\s\x0B\x0C\u0085\u2028\u2029]+/g, ' ') + ' ';
		});
		string = string.replace(/[\r\n\s\x0B\x0C\u0085\u2028\u2029]+/g, ' ');
		string = $.trim(string);
		this.$builder.find('[raw-stats]').html(`Words: ${(string.length ? string.split(' ').length : 0) || 0} | Characters: ${string.length || 0}`);
	}
	thoughts(thought) {
		let url = '';
		let title = '';
		switch (Number(thought)) {
			case 1:
				url = app.asset_url + '/eureka-moment.svg';
				title = 'Eureka Moment';
				break;
			case 2:
				url = app.asset_url + '/answer.svg';
				title = 'Answers';
				break;
			case 3:
				url = app.asset_url + '/question.svg';
				title = 'Questions';
				break;
			case 4:
				url = app.asset_url + '/root-of-thought.svg';
				title = 'Root of Thought';
				break;
			default:
				break;
		}

		return `<span data-title="${title}" title-bottom><img onerror="${app.IMG_ERROR()}" src="${url}"></span>`;
	}
	save(noti = true) {
		return new Promise((resolve, reject) => {
			let $that = this;
			/**
			 * @author Unknown
			 * @date 30-12-2021
			 * @description Making meta empty bcz we will read it when session tracker changes it's state
			 */
	
			var payload = $that.getJSON();
			console.log(payload);
			// api.get("sdlms/tid/threadbuilder/id")
			/**
			 * @author Unknown 
			 * @description Make a request to Save/update @threadbuilder
			 */
			if (!$that.data.queue) {
				$that.data.queue = 1;
				require(['api'], function (api) {
					let request;
					let message = 'Saved Successfully';
					if ($that.data.id) {
						request = api['put'](`/sdlms/${$that.tid}/threadbuilder/${$that.data.id}`, payload);
						message = 'Updated Successfully';
					} else {
						request = api['post'](`/sdlms/${$that.tid}/threadbuilder`, payload);
					}
	
					$('#nav-sdlms-thread-tab').find('.unsaved-changes').remove();
					request.then(r => {
						if (!$that.data.id) {
							console.log(($that.data.onAdded == 'function'), typeof $that.data.onAdded);
							if (typeof $that.data.onAdded == 'function') {
								$that.data.onAdded();
							}
						}
						$that.data.id = r.pid || r._id;
						r.lookup_id = $that.lookup_id;
						r.type = 'threadbuilder';
						resolve(r);
						var buider_sdlms_id = $that.data.tid + '_' + $that.data.uid + '_' + $that.data.id;
						$that.$builder.attr('sdlms-id', buider_sdlms_id);
					}).catch((e) => {
						console.log(e);
						reject(e);
					}).finally(() => {
						$that.data.queue = 0;
					})
					if (noti) {
						notify(message, 'success');
					}
	
					localStorage.removeItem(`tb_draft_${$that.tid}_${$that.data.uid}_unsaved`)
					localStorage.setItem(`tb_draft_${$that.tid}_${$that.data.uid}`, null);
				})
			} else {
				// Plese Wait We are .... 
				console.log("Please wait");
				notify('Please Wait', 'info');
			}
		})

	}
	getJSON() {
		var $target = this.$builder;
		var $that = this;
		var _threadBuilder = {};
		_threadBuilder.meta = {};
		_threadBuilder.threads = [];

		/**
		 * @author Shubham Bawner
		 * @date 16/03/2022
		 * @description sub thread stats to store subthreads that are questions, answers, etc
		 */
		var TBstats = {
			question: [],
			answer: [],
			eureka: [],
			root: [],
			remark: [],
			process: [],
		};
		_threadBuilder.meta.title = $target.find('[header-title]').text();
		$target.find('[thread]').each(function () {
			const _thread = {};
			_thread.subthreads = [];
			_thread.id = $(this).index() + 1;
			_thread.title = app.processString($(this).find('[thread-name="title"]').text());
			_thread.duration = app.processString($(this).find('[thread-name="duration"]').text());
			_thread.emotions = app.processString($(this).find('[name="emotions"]').val());
			_thread.summary = {};
			_thread.credit = $(this).find('[thread-credited-user]').data() || {};
			_thread.summary.content = app.processString($(this).find('[summary] [name="content"]').val());
			_thread.summary.title = app.processString($(this).find('[summary] [summary-title="name"]').text());
			$(this)
				.find('[subthread]')
				.each(function () {
					const subthread = {};
					subthread.id = `${_thread.id}-${$(this).index() + 1}`;
					subthread.title = app.processString($(this).find('[subthread-name="title"]').text());
					subthread.interpretation_title = app.processString($(this).find('[interpretation-name="title"]').text());
					subthread.content = app.processString($(this).find('[name="content"]').val());
					subthread.interpretation = app.processString($(this).find('[name="interpretation"]').val());
					subthread.category = app.processString($(this).find('[name="category"]').val());
					subthread.process = app.processString($(this).find('[name="process"]').val());
					subthread.eureka = $(this).find('[name="thought-eureka"]').is(':checked') ? 1 : 0;
					subthread.answer = $(this).find('[name="thought-answer"]').is(':checked') ? 1 : 0;
					subthread.question = $(this).find('[name="thought-question"]').is(':checked') ? 1 : 0;
					subthread.root = $(this).find('[name="thought-root"]').is(':checked') ? 1 : 0;
					_thread.subthreads.push(subthread);

					if (subthread.eureka) TBstats.eureka.push(subthread.id);
					if (subthread.answer) TBstats.answer.push(subthread.id);
					if (subthread.question) TBstats.question.push(subthread.id);
					if (subthread.root) TBstats.root.push(subthread.id);
					if (subthread.category == 'remark') TBstats.remark.push(subthread.id);
					if (subthread.process) TBstats.process.push(subthread.id);
				});
			_threadBuilder.threads.push(_thread);
		});

		let string = '';
		$target.find('textarea, input:not([type="checkbox"],[type="radio"])').each(function () {
			string += $(this).val().replace(/[\r\n\s\x0B\x0C\u0085\u2028\u2029]+/g, ' ') + ' ';
		});
		string = string.replace(/[\r\n\s\x0B\x0C\u0085\u2028\u2029]+/g, ' ');
		string = $.trim(string);
		const stats = {
			timestamp: new Date().getTime(),
			count: {
				characters: string.length,
				words: string.split(' ').length,
				threads: _threadBuilder.threads.length,
			},
			...TBstats,
		};
		const payload = {
			threads: _threadBuilder.threads,
			stats: stats,
			meta: _threadBuilder.meta,
		};
		return payload;
	}

	setIndexes() {
		var $target = this.$builder;

		$target.find('[thread]').each(function () {
			$(this).find('[thread-name="title"]').attr('sdlms-id', `sdlms-thread-title-${$(this).index()}`);
			$(this).find('[name="emotions"]').attr('sdlms-id', `sdlms-thread-emotions-${$(this).index()}`);
			$(this).find('[thread-credited-user]').attr('sdlms-id', `sdlms-thread-credited-user-${$(this).index()}`);
			$(this).find('[summary] [name="content"]').attr('sdlms-id', `sdlms-thread-summary-content-${$(this).index()}`);
			$(this).find('[summary] [summary-title="name"]').attr('sdlms-id', `sdlms-thread-summary-title-${$(this).index()}`);

			$(this)
				.find('[subthread]')
				.each(function () {
					$(this).find('[subthread-name="title"]').attr('sdlms-id', `sdlms-subthread-title-${$(this).index()}`);
					$(this).find('[interpretation-name="title"]').attr('sdlms-id', `sdlms-subthread-interpretation-title-${$(this).index()}`);
					$(this).find('[name="content"]').attr('sdlms-id', `sdlms-subthread-content-${$(this).index()}`);
					$(this).find('[name="interpretation"]').attr('sdlms-id', `sdlms-subthread-interpretation-${$(this).index()}`);
					$(this).find('[name="category"]').attr('sdlms-id', `sdlms-subthread-category-${$(this).index()}`);
					$(this).find('[name="process"]').attr('sdlms-id', `sdlms-subthread-process-${$(this).index()}`);
					$(this).find('[name="thought-eureka"]').attr('sdlms-id', `sdlms-subthread-eureka-${$(this).index()}`);
					$(this).find('[name="thought-answer"]').attr('sdlms-id', `sdlms-subthread-answer-${$(this).index()}`);
					$(this).find('[name="thought-question"]').attr('sdlms-id', `sdlms-subthread-question-${$(this).index()}`);
					$(this).find('[name="thought-root"]').attr('sdlms-id', `sdlms-subthread-root-${$(this).index()}`);
				});
		});
	}
	/**
	 * @author Unknown
	 * @date 15/02/2022
	 * @name reader
	 * @type {function}
	 * @description Append @threabuilder to sdlms-thread-builder read mode
	 * @param {Object} data Required if @threadbuilder is initied with existing @threadbuilder then render it with Exisiting
	 */

	reader(data) {
		if (!data.threads) {
			return;
		}
		data.stats = data.stats || {};
		let $target = this.$builder,
			_threabuilder = Template.threadBuilder(this)._reader(),
			$that = this;
		$('.sdlms-modified-asset').remove();
		if (data && data.threads) {
			$target.append(_threabuilder.container(_threabuilder.header(data.meta,Boolean(this.data.showHeader))));
			const $container = $target.find('.sdlms-threads-container');
			$container.addClass('readonly');
			$.each((data.threads || []), function (i, thread) {
				let subthread = '';
				$.each((thread.subthreads || []), function (ind, e) {
					subthread += _threabuilder.subthread(e);
				});
				$container.append(_threabuilder.thread(subthread, thread));
			});
		}
		$target.find('[show-more]').off('click').on('click', function () {
			$(this).parents('[target="show-more"]').find('[content]').toggleClass('text-ellipse-4');
			if ($.trim($(this).text()).toLowerCase() == 'see more') $(this).text('See less');
			else $(this).text('See more');
		});

		

		$target.find('select').each(function () {
			$(this).val($(this).attr('value'));
		});
		if ($that.data.addFeedbacks && $that.data.id) {
			console.log('inited feedbacks');
			new FeedBacks($.extend({}, $that.data, {
				target: `#${$that.id}`,
				assetId: $that.data.id,
				type: 'tb',
			}));
		}
		$that.setIndexes();
		if(data.stats.count){
			this.$builder.find('[raw-stats]').html(`Words: ${data.stats.count.words} | Characters: ${data.stats.count.characters}`);
		}
		// Clear any exsiting interval
	}
}
