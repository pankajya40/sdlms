class eagleBuilder extends Template {
	constructor(data) {
		super();
		if (!data.tid) {
			throw new Error('Invalid tid supplied');
		}

		this.tid = data.tid;
		this.enableCopyPaste = data.enableCopyPaste || false;
		this.data = data;
		this.data.with = this.restore() || data.with || {};
		this.lookup_id = data.lookup_id || null ;
		console.log(this.data.with);
		this.builder(this.data.target);
		// clear existing events
		$(window).trigger('sdlms.asset.selection.change');
	}

	restore() {
		if (this.data.tracking) {
			console.log('Tracker Can not be Restored');
			return null;
		}
		
		if (this.data.action == 'reader') {
			console.log('Reader Can not be Restored');
			return null;
		}
		if (this.data.sessionTracker) {
			console.log('Session Tracker Can not be Restored');
			return null;
		}
		if (this.data.noDraft) {
			console.log('No Draft Can not be Restored');
			return null;
		}

		if (localStorage.getItem(`eb_draft_${this.tid}_${this.data.uid}`) != null) {
			if (localStorage.getItem(`eb_draft_${this.tid}_${this.data.uid}_unsaved`)) {
				$('#nav-sdlms-eagle-tab').append('<sup class="unsaved-changes">*</sup>');
			}
			const data = JSON.parse(localStorage.getItem(`eb_draft_${this.tid}_${this.data.uid}`));
			return data && data.tracks ? data : null;
		}
	}

	draft() {
		if (!this.data.noDraft) {
			if ($('#nav-sdlms-eagle-tab').find('.unsaved-changes').length) {
				localStorage.setItem(`eb_draft_${this.tid}_${this.data.uid}_unsaved`, true);
			}
			localStorage.setItem(`eb_draft_${this.tid}_${this.data.uid}`, JSON.stringify(this.getJSON()));
		}
	}

	unique(prefix = '') {
		var dt = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			var r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
		});
		return prefix + uuid;
	}

	builder(target = 'body') {
		this.id = this.unique('sdlms-eagle-');
		const $that = this;
		const $target = $(target);
		if (!$target.length) {
			console.log('No HTML element found For Builder Given ==>' + target);
			return;
		}
		$target.empty();
		$target.append(
			$('<sdlms-eagle-builder>')
				.attr({
					id: $that.id,
					class: $that.data.noAction ? 'sdlms-readonly' : '',
				})
				.append(`<div class="sdlms-asset-owner" style="display:${$that.data.name || 'none'} " name="${$that.data.name}" ></div>`)
				.append(
					$('<form>').attr({
						id: 'form-' + $that.id,
						class: 'sdlms-eagle-container sdlms-form-elements needs-validation ' + ($that.data.action == 'reader' ? 'readonly' : 'create') + (!$that.data.control ? ' no-control' : ''),
						novalidate: '',
					})
				)
		);
		const $builder = $(`#form-${$that.id}`);
		var buider_sdlms_id = $that.data.tid + '_' + $that.data.uid + '_' + ($that.data.id || 'new');
		$builder.attr('sdlms-id', buider_sdlms_id);
		$that.$builder = $builder;
		$that[$that.data.action == 'reader' ? 'reader' : 'create']($that.data.with);
	}
	create(data = null) {
		let isMobile = window.innerWidth;
		let $target = this.$builder,
			eagle = isMobile < 700 ? Template.eaglebuilder_mobile(this).eagle() :  Template.eagleBuilder(this).eagle(),
			$that = this;

		if (data && data.tracks) {
			$target.append(eagle.container(eagle.header(data.meta)));
			const $container = $target.find('.sdlms-threads-container');
			$.each((data.tracks || []), function (i, track) {
				let subthread = '';
				$.each((track.subtracks || []), function (ind, e) {
					subthread += eagle.subthread(e);
				});
				$container.append(eagle.thread(subthread, track));
				if (track.transitions && track.transitions.content && $.trim(track.transitions.content)) {
					$container.append(eagle.transitions(track.id, track.transitions));
				}
			});
			$target.append(eagle.actions() +
				eagle.conclusion(data.conclusion) +
				($that.data.hideDefault ? '' : eagle.save()));
		} else {
			$target.append(eagle.container(
				eagle.header() +
					eagle.thread(eagle.subthread())
			) +
				eagle.actions() +
				eagle.conclusion() +
				($that.data.hideDefault ? '' : eagle.save())
			);
		}


		var [$submit, $newThread, $container] = [
			$target.find('button[type="submit"]'),
			$target.find('button[data-thread="new"]'),
			$target.find('.sdlms-threads-container'),
		];

		function reIndex() {
			$target.find('[thread]').each(function () {
				const $this = $(this);
				const index = $(this).parent().children('[thread]').index(this);
				$this.find('index').text(app.numberToAlphabates(index + 1));
				$this.next('[transitions]').first().find('index').text(index + 1);
				$this.find('[subthreadcontainer] [subthread]').each(function () {
					const index = $(this).parent().children('[subthread]').index(this);
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
			if ($that.data.autosave){
				$that.save(!1).then(function(resp){
					console.log(resp);
				});
			};
			if ($that.tr) {
				$that.tr.events();
				$that.tr.track();
			}
			$target.attr('force-refresh', 1);
		}
		$target.find('.sdlms-thread [contenteditable]').keypress(function (e) {
			if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
		});
		
		if (!$that.enableCopyPaste) {
			$target.on('copy paste','textarea,input',function(e){
				e.preventDefault();
				console.log('copy paste');
			});
		}

		$target.on('click', '[remove-thread]', function () {
			if ($that.data.noAction) {
				alert('Sorry! You can not modify.');
				return;
			}
			if (!($target.find('[thread]').length > 1)) {
				return notify('Can not remove all threads', 'info');
			}
			notify('Thread Removed', 'info');
			$target.removeClass('sdlms-form-validated');
			$(this).parents('[thread]').next('[transitions]').first()
				.remove();
			$(this).parents('[thread]').first().remove();
			reIndex();
		});

		$target.on('click', '[add-subthread]', function () {
			if ($that.data.noAction) {
				alert('Sorry! You can not modify.');
				return;
			}
			$target.removeClass('sdlms-form-validated');
			const index = $(this).parents('[thread]').find('[subthreadcontainer]').find('[subthread]').length;
			$(this).parents('[thread]').find('[subthreadcontainer]').append(eagle.subthread({}, index + 1));
			reIndex();
		});
		$target.on('click', '[remove-subthread]', function () {
			if ($that.data.noAction) {
				alert('Sorry! You can not modify.');
				return;
			}
			if (!($(this).parents('[thread]').first().find('[subthread]').length > 1)) {
				return notify('Can not remove all Sub threads', 'info');
			}
			notify('Subthread Removed', 'info');
			$target.removeClass('sdlms-form-validated');
			$(this).parents('[subthread]').first().remove();
			reIndex();
		});
		$newThread.off('click').on('click', function () {
			if ($that.data.noAction) {
				alert('Sorry! You can not modify.');
				return;
			}
			$target.removeClass('sdlms-form-validated');
			const index = $container.find('[thread]').length;
			$container.append(eagle.transitions(null, {}, index + 1) + eagle.thread(eagle.subthread(), {}, index + 1));
			reIndex();
		});
		if (localStorage.getItem(`eb_draft_${$that.tid}_${$that.data.uid}_unsaved`)) {
			$target.trigger('make:dirty');
		}
		$target.on('click', '[save-eagle-builder]', function (e, data) {
			$target.trigger('submit');
		});


		$target.on("submit", function (e, data = {}) {
			if ($that.data.noAction) {
				alert('Sorry! You can not modify.');
				return;
			}
			e.preventDefault();
			if ($(this).find(':invalid').length) {
				return notify('Please fill all required fields', 'error');
			}
			$that.save()

		});
		$that.data.autosave = (isNaN($that.data.autosave) || $that.data.autosave < 30) ? 0 : $that.data.autosave;
		if (!$that.data.sessionTracker) {
			if ($that.data.autosave) {
				setInterval(() => {
					if ($that.dirty) {
						$that.save(!true);
						// notify('Eaglebuilder auto Save', 'info');
					} else {
						console.log('No changes');
					}
				}, ($that.data.autosave || 120) * 1000);
			}
		}
		$submit.on('click', function () {
			if ($that.data.noAction) {
				alert('Sorry! You can not modify.');
				return;
			}
			$target.addClass('sdlms-form-validated');
			$target.find(':invalid').each(function () {
				if ($(this).parents('[subthreadcontainer]').length) {
					if (!$(this).parents('[subthreadcontainer]').is(':visible')) {
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
				return console.log('EB:: Please add Feedbacks JS.');
			}
			new FeedBacks($.extend({}, $that.data, {
				target: `#${$that.id}`,
				assetId: $that.data.id,
				type: 'eb',
			}));
		}
		reIndex();
		$target.dirrty();
		$target.on('dirty', function () {
			console.log(this, 'is Dirty');
			$that.dirty = true;
			$('#nav-sdlms-eagle-tab').find('.unsaved-changes').remove();
			$('#nav-sdlms-eagle-tab').append('<sup class="unsaved-changes">*</sup>');
		});
		$target.on('clean', function () {
			console.log(this, 'is clean');
			$that.dirty = !true;
			localStorage.removeItem(`eb_draft_${$that.tid}_${$that.data.uid}_unsaved`);
			$('#nav-sdlms-eagle-tab').find('.unsaved-changes').remove();
		});
		if (!$that.data.sessionTracker) {
			$(window).on('beforeunload', () => {
				$that.draft();
			});
			if (!$that.data.noTracking) {
				$that.tr = new tracker($.extend({}, $that.data, {
					target: $target,
					event: 'session_tracking',
					asset_type: 'eb',
					key: $that.tid,
					form: $that.$builder,
				}));
				$that.tr.events();
			}
		}
	}

	getJSON() {
		var $target = this.$builder;
		var $that = this;
		$that.errors = [];
		var totalTime = 0;
		var eaglebuilder = {};
		eaglebuilder.meta = {};
		eaglebuilder.meta.id = $that.unique('meta-');
		eaglebuilder.meta.introduction = app.processString($target.find('[meta] textarea[name="content"]').val());
		eaglebuilder.meta.title = app.processString($target.find('[meta] [name="title"]').text());
		eaglebuilder.meta.duration = app.processString($target.find('[meta] [name="duration"]').text()) || 0;
		eaglebuilder.meta.duration = isNaN(Number(eaglebuilder.meta.duration)) ? 0 : Number(eaglebuilder.meta.duration);
		totalTime += eaglebuilder.meta.duration;
		if ($that.data.sessionTracker && !eaglebuilder.meta.duration) {
			$that.errors.push('Please add duration for Introduction');
		}
		eaglebuilder.tracks = [];
		eaglebuilder.conclusion = {};
		eaglebuilder.conclusion.title = app.processString($target.find('[conclusion] [name="title"]').text());
		eaglebuilder.conclusion.content = app.processString($target.find('[conclusion] [name="content"]').val());
		eaglebuilder.conclusion.duration = app.processString($target.find('[conclusion] [name="duration"]').text()) || 0;
		eaglebuilder.conclusion.duration = isNaN(Number(eaglebuilder.conclusion.duration)) ? 0 : Number(eaglebuilder.conclusion.duration);;
		totalTime += eaglebuilder.conclusion.duration;
		if ($that.data.sessionTracker && !eaglebuilder.conclusion.duration) {
			$that.errors.push('Please add duration for conclusion');
		}
		$target.find('[thread]').each(function () {
			const thread = {};
			thread.subtracks = [];
			thread.id = $that.unique('track-');
			thread.type = "track";
			thread.duration = app.processString($(this).find('[thread-name="duration"]').text()) || 0;
			thread.duration = isNaN(Number(thread.duration)) ? 0 : Number(thread.duration);
			totalTime += thread.duration;
			thread.arguement = app.processString($(this).find("[arguement] textarea[name='content']").val());
			thread.title = $(this).find('[thread-name="title"]').text();
			if ($that.data.sessionTracker && !thread.duration) {
				$that.errors.push(`Please add duration for ${thread.title}`);
			}
			thread.transitions = {};
			$(this)
				.find('[subthread]')
				.each(function () {
					const subthread = {};
					subthread.id = 'subtrack-' + thread.id;
					subthread.title = app.processString($.trim($(this).find('[subthread-name="title"]').text()));
					subthread.duration = 0;
					subthread.content = app.processString($.trim($(this).find('[name="content"]').val()));
					totalTime += isNaN(Number(subthread.duration)) ? 0 : Number(subthread.duration);
					thread.subtracks.push(subthread);
				});
			var $transition = $(this).next('[transitions]').first();
			thread.transitions.id = 'transition-' + thread.id;
			thread.transitions.title = app.processString($.trim($transition.find('[transition-name="title"]').text()));
			thread.transitions.content = app.processString($.trim($transition.find('[name="content"]').val()));
			thread.transitions.duration = app.processString($transition.find('[transition-name="duration"]').text()) || 0;
			thread.transitions.duration = isNaN(Number(thread.transitions.duration)) ? 0 : Number(thread.transitions.duration);
			totalTime += thread.transitions.duration;
			eaglebuilder.tracks.push(thread);
			if ($that.data.sessionTracker && $.trim(thread.transitions.content) && !thread.transitions.duration) {
				$that.errors.push(`Please add duration for ${thread.transitions.title}`);
			}
		});

		if ($that.data.sessionTracker) {
			if ((!eaglebuilder.meta.duration || isNaN(eaglebuilder.meta.duration))) $that.errors.push('Please add duration');
			eaglebuilder.meta.totalTime = totalTime;
		}

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
				threads: eaglebuilder.tracks.length,
			},
		};
		const payload = {
			meta: eaglebuilder.meta,
			tracks: eaglebuilder.tracks,
			conclusion: eaglebuilder.conclusion,
			stats: stats,
		};
		return payload;
	}
	save(noti = true) {
		return new Promise(async (resolve, reject) => {
			let $that = this;
			let payload = $that.getJSON();
			let resp = {};
			payload.sessionTracker = $that.data.sessionTracker || false;
			if (payload.sessionTracker && ($that.errors || []).length) {
				$.each(($that.errors || []), function (i, e) {
					notify(e, 'error');
				});
				return;
			}
			require(['api'], function (api) {
				let request;
				let message = 'Saved Successfully';
				if ($that.data.id) {
					request = api['put'](`/sdlms/${$that.tid}/eaglebuilder/${$that.data.id}`, payload);
					message = 'Updated Successfully';
				} else {
					request = api['post'](`/sdlms/${$that.tid}/eaglebuilder`, payload);
				}

				request.then(r => {
					if (!$that.data.id) {
						if (typeof $that.data.onAdded == 'function') {
							$that.data.onAdded();
						}
					}
					if (!payload.sessionTracker) $that.data.id = r._id
					else if (ajaxify.data.isTeacher && payload.sessionTracker) location.reload();

					$that.data.id = r.pid || r._id;
					resp.pid = r.pid || r._id;
					resp.lookup_id = $that.lookup_id;
					resp.type = 'eaglebuilder';
					resolve(resp)
					if (noti) notify(message, 'success');

					$('#nav-sdlms-eagle-tab').find('.unsaved-changes').remove();
					localStorage.removeItem(`eb_draft_${$that.tid}_${$that.data.uid}_unsaved`)
					localStorage.setItem(`eb_draft_${$that.tid}_${$that.data.uid}`, null);
					var buider_sdlms_id = $that.data.tid + '_' + $that.data.uid + '_' + $that.data.id;
					$that.$builder.attr('sdlms-id', buider_sdlms_id);
				}).catch(e => {
					reject(e)
				})
			});
		});
	}
	setIndexes() {
		var $target = this.$builder;


		$target.find('[meta] [name="content"]').attr('sdlms-id', `sdlms-meta-content`);
		$target.find('[meta] [name="title"]').attr('sdlms-id', 'sdlms-meta-title');
		$target.find('[conclusion] [name="title"]').attr('sdlms-id', 'sdlms-conclusion-title');
		$target.find('[conclusion] [name="content"]').attr('sdlms-id', 'sdlms-conclusion-content');

		$target.find('[thread]').each(function () {
			$(this).find("[arguement] [name='content']").attr('sdlms-id', `sdlms-arguement-content-${$(this).index()}`);
			$(this).find('[thread-name="title"]').attr('sdlms-id', `sdlms-thread-title-${$(this).index()}`);

			$(this)
				.find('[subthread]')
				.each(function () {
					$(this).find('[subthread-name="title"]').attr('sdlms-id', `sdlms-subthread-title-${$(this).index()}`);
					$(this).find('[name="content"]').attr('sdlms-id', `sdlms-subthread-content-${$(this).index()}`);
				});

			var $transition = $(this).next('[transitions]').first();
			$transition.find('[transition-name="title"]').attr('sdlms-id', `sdlms-transition-title-${$(this).index()}`);
			$transition.find('[name="content"]').attr('sdlms-id', `sdlms-transition-content-${$(this).index()}`);
		});
	}

	reader(data) {
		if (!data.tracks) {
			return;
		}
		$('.sdlms-modified-asset').remove();
		let $target = this.$builder,
			eagle = Template.eagleBuilder(this)._reader(),
			$that = this;
		if (data && data.tracks) {
			$target.append(eagle.container(eagle.header(data.meta)));
			const $container = $target.find('.sdlms-threads-container');
			$container.addClass('readonly');
			$.each((data.tracks || []), function (i, track) {
				let subthread = '';
				$.each((track.subtracks || []), function (ind, e) {
					subthread += eagle.subthread(e);
				});
				$container.append(eagle.thread(subthread, track));
				if ($.trim(track.transitions.content)) {
					$container.append(eagle.transitions(track.id, track.transitions));
				}
			});
			$target.append(eagle.conclusion(data.conclusion));
		}
		$target.find('[show-more]').off('click').on('click', function () {
			$(this).parents('[target="show-more"]').find('[content]').toggleClass('text-ellipse-4');
			if ($.trim($(this).text()).toLowerCase() == 'see more') $(this).text('See less');
			else $(this).text('See more');
		});
		if ($that.data.addFeedbacks && $that.data.id) {
			console.log('inited feedbacks');
			new FeedBacks($.extend({}, $that.data, {
				target: `#${$that.id}`,
				assetId: $that.data.id,
				type: 'eb',
			}));
		}

		// Clear any exsiting interval
		$that.setIndexes();
		/**
		 * @author Unknown
		 * @date 16-02-2022
		 * @description This function is used to track current session
		 * 	here we are using current time stamp to track session
		 * 	so there is no need to update on refresh bcz it will
		 * 	always calcuated it real time
		 * */
		if (this.data.tracking) {
			const tracker = [];

			function formatTime(time) {
				var hrs = ~~(time / 3600);
				var mins = ~~((time % 3600) / 60);
				var secs = ~~time % 60;
				var convert = '';
				if (hrs > 0) convert += '' + hrs + ':' + (mins < 10 ? '0' : '');
				convert += '' + mins + ':' + (secs < 10 ? '0' : '');
				convert += '' + secs;
				return convert;
			}
			$target.find('[convert-to-minute]').each(function () {
				const $this = $(this);
				const time = isNaN($.trim($this.text())) ? 0 : $.trim($this.text());
				$this.text(formatTime(time * 60));
			});
			//  Job
			$target.find('[track-mode="online"]').each(function () {
				//  Queue all jobs for tracking
				if (isNaN($(this).data('threadDuration')) || !$.trim($(this).data('threadDuration'))) {
					$(this).data('threadDuration', 0.001);
				}
				if ($(this).data('threadProgress') > 0) {
					const percentage = $(this).data('threadProgress');
					const threadDuration = $(this).data('threadDuration');
					const value = ((threadDuration * percentage) / 100);
					$(this).parents('.sdlms-thread').find('[data-name="percentageToTime"]').css('color', (percentage > 100 ? 'var(--primary-danger-color)' : ''))
						.text(formatTime(value * 60) + ' /');
				}
				tracker.push($.extend({}, {
					$elem: $(this),
				}, $(this).data()));
			});

			// if jobs
			if (tracker.length) {
				// get the job which is not completed 0-1
				const currentIndex = tracker.findIndex(e => e.threadStatus == -1);

				if (currentIndex < 0) {
					socket.emit('meta.live.ebRefresh', {
						name: 'completed',
						message: `Great! All threads have been completed`,
						tid: $that.tid,
					});
					return console.log('all jobs completed');
				}
				var current = tracker.at(currentIndex);

				// reverse the array to get the last completed job 1-0
				const prevIndex = tracker.findLastIndex(e => e.threadStatus == 1);
				var prev = prevIndex > -1 ? tracker.at(prevIndex) : null;

				// if there are not any prev track then set the current session as prev
				var start = prev ? prev.threadCompleted : ajaxify.data.Sessions.at().schedule;

				// if start time + next thread expected end time
				var end = (start + (1000 * 60 * Number(current.threadDuration)));
				var percentage;

				current.$elem.parents('.sdlms-thread').first().find('[mark-as-completed]').css({
					display: 'initial',
					pointerEvents: 'all',
				});
				const interval = setInterval(() => {
					// get the percentage of completion
					var now = Date.now();
					percentage = ((Math.abs(now - start) / (Math.abs(end - start) || 1)) * 100).toFixed(2);
					current.$elem.css({
						width: (percentage >= 100 ? 100 : percentage) + '%',
						background: `${percentage > 100 ? 'var(--primary-danger-color)' : 'var(--primary-background-color)'}`,
					});
					const value = ((current.threadDuration * percentage) / 100);
					current.$elem.parents('.sdlms-thread').find('[data-name="percentageToTime"]').css('color', (percentage > 100 ? 'var(--primary-danger-color)' : '')).text(formatTime(value * 60) + ' /');
					current.$elem.data('threadProgress', percentage);
					current.$elem.addClass('loading');
				}, 1000);

				// attach event to mark as completed
				if (!$that.data.control) {
					// $target.find('[mark-as-completed]').remove();
					return;
				}
				socket.emit('meta.live.ebRefresh', {
					tid: $that.tid,
					name: current.$elem.data('name'),
					message: `${current.$elem.data('name')} is running`,
				});
				$target.find('[mark-as-completed]').off('click').on('click', function () {
					const $id = $(this).attr('mark-as-completed');
					const $bar = $(`[track-mode="online"][data-id="${$id}"]`);
					const $data = $bar.data();
					$bar.removeClass('loading');
					socket.emit('meta.live.ebRefresh', {
						name: $data.name,
						tid: $that.tid,
						message: `${$data.name} has been marked as completed`,
					});
					const session = data;
					$that.draft();
					// update existing tracks
					if ($data.threadMode == 'meta') {
						session.meta.progress = percentage;
						session.meta.completed = Date.now();
						session.meta.status = 1;
					} else if ($data.threadMode == 'track') {
						session.tracks.map((e) => {
							if (e.id == $data.id) {
								e.progress = percentage;
								e.completed = Date.now();
								e.status = 1;
							}
							return e;
						});
					} else if ($data.threadMode == 'transitions') {
						session.tracks.map((e) => {
							if (e.transitions.id == $data.id) {
								e.transitions.progress = percentage;
								e.transitions.completed = Date.now();
								e.transitions.status = 1;
							}
							return e;
						});
					} else if ($data.threadMode == 'conclusion') {
						session.conclusion.progress = percentage;
						session.conclusion.completed = Date.now();
						session.conclusion.status = 1;
					}
					if($data.threadMode){
						socket.emit('sdlms.class.thread.completed', {
							tid: $that.tid,
						});
					}
					// update it in the session
					require(['api'], function (api) {
						api.put(`/sdlms/${$that.tid}/eaglebuilder/${$that.data.id}`, session).then((res) => {
							/**
							 * @todo Register event and listen and Refresh Students tracker based on this event
							 * @author Unknown
							 * @date 16-02-2022
							 */

							// socket.emit('meta.tracker.stateChange', $.extend({}, {}, {
							// 	data: session
							// }));

							// dettach the event
							$target.find('[mark-as-completed]').off('click');
							$($that.data.target).empty();
							clearInterval(interval);
							$(window).trigger('sdlms.asset.selection.change');
							// reinit it
							let _payload = {
								target: $that.data.target,
								control: $that.data.control,
								action: 'reader',
								tid: $that.tid,
								tracking: true,
								id: $that.data.id,
								with: session,
							};
							_payload = $.extend({}, $that.data, _payload)
							console.log(_payload)
							new eagleBuilder(_payload);

							// socket.emit('meta.live.assetUpdate', $.extend({}, _payload, {
							// 	control: false,
							// 	id: $that.data.id,
							// 	type: 'eb',
							// 	forceUpdate: true,
							// 	title: current.$elem.data('name')
							// }))

						});
					});
				});
			}
		}
	}
}
