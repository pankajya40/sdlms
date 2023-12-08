let SocialFeedTemplate = {
	container: (html) => {
		return `<div class="social-feed-container">${html}</div>`;
	},
	filters: (filters = {}) => {

		filters.timestamps = filters.timestamps || [];
		filters.categories = filters.categories || [];
		filters.processes = filters.processes || [];

		return `<div class="">
		<div class="w-100">
		  <div class="form-group w-100">
			<input type="text" filter placeholder="Search by keywords" name="content" class="form-control">
		  </div>
		  <div class="w-100 d-flex">
			<select name="category" filter class="form-control social-feed-form-elements ${filters.categories.length || "d-none"} sdlms-text-black-16px w-25 mr-3">
				 ${filters.categories.map((category) => `<option value="${category.type}">${category.title}</option>`).join('')}
			</select>
			<select name="process" filter class="form-control social-feed-form-elements ${filters.processes.length || "d-none"} sdlms-text-black-16px w-25  mr-3">
				${filters.processes.map((process) => `<option value="${process.type}">${process.title}</option>`).join('')}
			</select>
			<select name="timestamp" filter class="form-control social-feed-form-elements w-25 ${filters.timestamps.length || "d-none"} sdlms-text-black-16px mr-3">
				${filters.timestamps.map((timestamp) => `<option value="${timestamp.type}">${timestamp.title}</option>`).join('')}
			</select>
			<select name="uids" filter multiple class="form-control social-feed-form-elements w-25 " style="width: 25%"></select>
		  </div>
		</div>
	  </div>`
	},
	thoughts: (thoughts = []) => {
		return `<div class="social-feed-icons d-flex py-3 border flex-column social-feeds-border" data-container="social-feed-icons" ${thoughts.length || 'd-none'}">
		
			${thoughts.map((thought, i) => `<div class="mt-3 ${i === 0 ? 'active' : ''}" thought data-type="${thought.type}">
			<button class=""><img src="${thought.icon}" alt="" class="btn border-0"></button>
				</div>`).join('')}

	  		</div>`;
	},
	feeds: (feeds = []) => {
		return `<div name="feed-list" class="col-11 ml-5 pr-0"></div>`
	},
	body: (thoughts = [], feeds = []) => {
		return `<div class="row p-3">
		${SocialFeedTemplate.thoughts(thoughts)}
		${SocialFeedTemplate.feeds(feeds)}
	  </div>`
	},
	card: function (thread={}, filters, data) {
		let {userData={}, createdAt} = data;

		let selectedThought = Object.keys(thread).find(el => thread[el] == '1');
		let thought = filters.thoughts.find(thought => thought.type == selectedThought);

		return `
		  <div class=" social-feed-thread-container border mb-3 mr-3 mt-4 px-3 pb-3" data-container="${selectedThought}">
			   <div class="d-inline">
				   <img src="${userData.picture}" alt="" height="50px" width="50px" class="social-feed-profile-image">
			   </div>
			   <div class="content d-inline-block ml-3">
					<h1 class="d-inline-block sdlms-text-black-18px fw-bold mt-3">${userData.username}</h1>
				  <div class="d-flex">
					  <h3 class="process sdlms-text-black-12px mr-4 ps-0">Process: <span
					  class="bold-font" data-title="${thread.process}">${thread.process}</span> </h3>
					  <h3 class="category sdlms-text-black-12px ps-0">Category: <span
					  class="bold-font" data-title="${thread.category}">${thread.category}</span> </h3>
				  </div>
			   </div>
			   <div class="d-inline-block float-right m-3">
				   ${thought && thought.icon ? `<img id="socialfeedemotion" src="${thought.icon}" alt="" class="category-iconm-3 "
				  data-title="${selectedThought}">` : ''}
				</div>
			   
				<div class="mt-3">
				   <h3 class="thread sdlms-text-black-16px pe-3">${thread.content}</h3>
				</div>
			   <div class="d-inline-block float-right mx-3">
				   <h3 class="time sdlms-text-black-12px">${app.dateFormatter(createdAt)}</h3>
			   </div>
		  </div>`
	  }

}
class SocialFeed {
	constructor(data) {
		this.tid = data.tid;
		this.target = data.target;
		this.filters = data.filters;
		this.builder(this.target);
	}
	builder(target = 'body') {
		this.id = app.unique('sdlms-social-feed-');
		const $that = this;
		const $target = $(target);
		if (!$target.length) {
			$that.log('No HTML element found For Builder Given ==>' + target);
			throw new Error(`No HTML element found while searching ${target}`);
		}
		$target.empty();
		$target.append(
			$('<sdlms-social-feed-builder>')
				.attr({ id: $that.id })
				.append(
					$('<form>').attr({
						id: 'form-' + $that.id,
						class: 'sdlms-form-elements ',
					})
				)
		);
		const $builder = $(`#form-${$that.id}`);
		this.$builder = $builder;
		this.init();
	}
	log(log) {
		console.log(log);
	}
	init() {

		this.$builder.append(SocialFeedTemplate.container(SocialFeedTemplate.filters(this.filters) + SocialFeedTemplate.body(this.filters.thoughts, [])));
		this.elem('uids').select2({
			placeholder: 'Select Users',
			width: 'resolve',
			ajax: {
				url: `/api/v3/sdlms/${this.tid}/attendance`,
				processResults: this.results.bind(this),
			}
		});
		this.bindEvents();
	}

	results(data) {
		return {
			results: data.response.data.map((member) => {
				return {
					id: member.uid,
					text: member.fullname ||member.username,
				};
			}),
		};
	}
	elem(name) {
		return this.$builder.find(`[name="${name}"]`);
	}
	bindEvents() {
		this.$builder = $('body');
		let $that = this;
		let $builder = this.$builder;

		this.$builder.on('input', '[filter][name="content"]', debounce(() => this.search(), 500));
		this.$builder.on('change','select[filter]', (e) => this.search());


		this.$builder.on('click', '[thought]', function (e) {
			e.preventDefault();
			$builder.find('[thought]').not(this).removeClass('active');
			$(this).addClass('active');
			$that.search();
		});

		this.search();
	}
	async search() {
		if (this.request) this.request.abort();
		this.elem('feed-list').addClass('ajaxifying').html(this.message('Loading Feeds...'));
		this.request = $.ajax({
			url: '/api/v3/sdlms/feeds',
			type: 'POST',
			data: this.payload(),
			success: (res) => {
				this.render(res.response)
			},
			error: (err) => {
				console.log(err);
			},
			complete: () => {
				this.elem('feed-list').removeClass('ajaxifying');
			}
		});

	}
	render(feeds) {
		let $that = this;

		if (!feeds.length) return this.elem('feed-list').html(this.message('No Feeds Found'));
		this.elem('feed-list').html(feeds.map((feed, i) => feed.threads.map(thread => SocialFeedTemplate.card(thread, $that.filters, feed)).join('')).join(''));
	}
	message(msg) {
		return `<div class="col-12 h-100 d-flex align-items-center justify-content-center" style="min-height: 300px;">${msg}</div>`
	}
	payload() {
		let payload = {};
		let value = (name) => this.$builder.find(`[filter][name="${name}"]`).val();
		payload.tid = this.tid;
		payload.thought = this.$builder.find('[thought].active').data('type');
		payload.content = value('content');
		payload.process = value('process');
		payload.category = value('category');
		payload.timestamp = this.timestamp(value('timestamp'));
		payload.uids = value('uids');
		return payload;
	}
	timestamp(minute) {
		minute = parseInt(minute);
		return minute ? new Date().getTime() - (minute * 60 * 1000) : null;
	}
}



// let socialFeed = new SocialFeed({
// 	tid: 1290,
// 	target: ".feed-container",
// 	filters: {
// 		thoughts: [
// 			{
// 				type: "eureka",
// 				title: "Eureka",
// 			},
// 			{
// 				type: "root",
// 				title: "Root",
// 			},
// 			{
// 				type: "question",
// 				title: "Question",
// 			},
// 			{
// 				type: "answer",
// 				title: "Answer",
// 			}
// 		],
// 		processes: [
// 			{
// 				type: "question",
// 				title: "Question",
// 			},
// 			{
// 				type: "analogy",
// 				title: "Analogy",
// 			},
// 			{
// 				type: "sarcasm",
// 				title: "Sarcasm",
// 			},
// 			{
// 				type: "insight",
// 				title: "Insight",
// 			},
// 			{
// 				type: "counterexample",
// 				title: "Counter-Example",
// 			}
// 		],
// 		categories: [
// 			{
// 				type: "subargument",
// 				title: "Sub Argument",
// 			},
// 			{
// 				type: "subexplanation",
// 				title: "Sub-Explanation",
// 			},
// 			{
// 				type: "coreprinciple",
// 				title: "Core Principle",
// 			},
// 			{
// 				type: "remark",
// 				title: "Remark",
// 			}
// 		],
// 		timestamps: [
// 			{
// 				type: "5",
// 				title: "5 min ago",
// 			},
// 			{
// 				type: "10",
// 				title: "10 min ago",
// 			},
// 			{
// 				type: "15",
// 				title: "15 min ago",
// 			},
// 			{
// 				type: "20",
// 				title: "20 min ago",
// 			},
// 			{
// 				type: "0",
// 				title: "From Starting",
// 			}
// 		]
// 	}

// });