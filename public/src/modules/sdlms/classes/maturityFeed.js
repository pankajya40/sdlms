'use strict';

/**
 * @author Fardin
 * @date 04/2023
 * @description Allow user to build maturity builder feed
 */

/**
 * @var {class} MaturityFeed
 * @description Contains the @methods or @function - to run the MaturityFeed
 * @function MaturityFeed.init
 * @function MaturityFeed.feedModal
 * @function MaturityFeed.newrootbehaviourDiv
 * @function MaturityFeed.filter
 * @function MaturityFeed.modal
 * @function MaturityFeed.rootbehaviours
 * @function MaturityFeed.nudge
 * @function MaturityFeed.eventListeners
 * @function MaturityFeed.disableEventListeners
 * @function MaturityFeed.scroller
 * @function MaturityFeed.newrootbehaviour
 */

class MaturityFeed {
	constructor() {
		this.init();
		this.loading = false;
		this.checked = false;
	}

	// modal
	feedModal() {
		return `<div class="modal modal_outer right_modal fade show" id="maturitybuilder-feed" tabindex="-1" role="dialog"
     aria-labelledby="createLabel" style="  display: block; padding-right: 0;">
    <div class="modal-dialog" role="document">
        <div class="modal-content border-0 py-0 rounded-0">
            <div class="modal-header">
                <h4 class="modal-title">Maturity Builder Feed</h4>
            </div>
            <div class="maturity-feed-body overflow-auto p-0 rounded-0 pb-5">
            	<div class="d-flex flex-wrap">
					<div class="mb-3 elements"></div>
            	</div>
            </div>
        </div>
    </div>
</div>`;
	}

	// new rootbehaviour div
	// responsible for 'Examine an incident' button
	newrootbehaviourDiv() {
		return (`
	<div id='newIncident'>
	<div class='d-flex justify-content-between'>
		${this.filter()}
    	<button class="btn btn-primary btn-sm m-3" id="addNewIncident">Examine an incident</button>
    </div>
    <div id='newIncidentBody' class='d-none m-3 p-3 border'>
    	<div id="maturity-body">
				<div>
					<div class="d-flex justify-content-between">
						<p class="font-weight-medium text-dark">Incident</p>
					</div>
					<textarea name="incident" id="new-incident-textarea" cols="30"class="form-control" maxlength="200"
					style="resize:none; min-height: 50px;"></textarea>
					<span class="sdlms-text-tertiary-12px d-flex justify-content-end" id="new-incident-char"> 0/200 characters</span>
				</div>
				<div id="rootbehaviour">
					<div class="d-flex justify-content-between">
						<p class="font-weight-medium text-dark my-2">Rootbehaviour</p>
					</div>
					<textarea id="new-rootbehaviour-textarea" maxlength="200" cols="30" rows="2" class="form-control" style="resize:none;"></textarea>
					<span class="sdlms-text-tertiary-12px d-flex justify-content-end" id="new-rootbehaviour-char"> 0/200 characters</span>
				</div>
				<div id="nudge">
					<div class="d-flex justify-content-between">
						<p class="font-weight-medium text-dark my-2">Nudge</p>
					</div>
					<textarea id="new-nudge-textarea" maxlength="200" cols="30" rows="2" class="form-control" style="resize:none;"></textarea>
					<span class="sdlms-text-tertiary-12px d-flex justify-content-end py-2" id="new-nudge-char"> 0/200 characters</span>
				</div>
    </div>
    <div class="d-flex justify-content-end">
		<i id="save-new-incident" class="fa fa-save btn-lg btn my-2" aria-hidden="true"></i>
	</div>
</div>
`);
	}

	// filter
	filter() {
		return (`<div class="m-3">
  				<input type="checkbox" id="self-incident">
  				<label class="form-check-label" for="self-incident">My Rootbehaviours Only</label>
			</div>
`)
	}

	// creates modal
	modal() {
		let $modal = $(this.feedModal());

		$('body')
			.append($modal);

		// event handler of modal
		(($modal) => {		// self invoking function
			let self = this;
			self.$modal = $modal;
			$modal.modal('show');
			// removing event listener after modal closed
			$modal.on('hidden.bs.modal', () => {
				this.disableEventListeners();
				$modal.remove();
				$('body')
					.off('click', '#addNewIncident',);
			});
			// end of removing event listener after modal closed
		})($modal);
		// end of event handler of modal
		this.scroller($modal.find('.maturity-feed-body'));
	}

	// fetches rootbehaviours from api
	rootbehaviours(next_page_url) {
		this.loading = true;
		const self = this;

		const BASE_URL = '/api/v3/maturity';
		let PAGE_URL = next_page_url || '/allIncidents';
		this.checked && (PAGE_URL += `?uid=${config.uid}`);

		require(['api'], (api) => {
			api.get(BASE_URL + PAGE_URL, {})
				.then((response) => {
					$('.maturity-feed-body')
						.attr('next_page_url', response.next_page_url);

					let rootbehaviours = response.data;
					let $elements = $('.elements');

					// iterating over rootbehaviours
					rootbehaviours.forEach((rootbehaviour, index) => {
						$elements.append(`
				<div style="width: auto; border-radius: 20px;" class="card m-3">
                    <div class="card-body p-3">
                        <div class="py-1-2">
                            <img src="${rootbehaviour.userData.picture}" class="round-background" style="margin-left: 0px;"/>
                            <span class="text-secondary" data-uid="${rootbehaviour.userData.uid}">${rootbehaviour.userData.fullname || rootbehaviour.userData.username}</span>
                            <span class="text-secondary" style="margin-left: 120px;">${moment(rootbehaviour.createdAt).format('MMM DD h:mm A')}</span>
                        </div>
                        <p class="card-title py-2" id="incident-${rootbehaviour.pid}">${rootbehaviour.incident}</p>
                        <!-- rootbehaviour of the incident -->
                        <div>
							<p class="sdlms-text-black-12px">Rootbehaviour</p>
							<p class="px-3 rootbehaviour-textbox">${rootbehaviour.rootbehaviour}</p>
						</div>
                        <a href="#" class="btn btn-primary btn-sm show-threads-button" data-pid="${rootbehaviour.pid}" rootbehaviours-${index}>Show Nudges</a>
                    </div>
                    <div class="pl-2">
                        <div quiz-body="${rootbehaviour.pid}" class="d-none">
							<p class="sdlms-text-black-12px px-2">Nudge</p>
							<div class='nudge-${rootbehaviour.pid}'></div>
                        	
                        </div>
                    </div>
                </div>`);
					});
					self.loading = false;
				});
		});
	}

	// event listeners
	eventListeners() {
		const self = this;
		// event listener for show nudges button
		$('body')
			.on('click', '.show-threads-button', (e) => {
				$(e.target)
					.removeClass('show-threads-button');
				let pid = $(e.target)
					.attr('data-pid');
				this.nudge(pid);
			});
		// end event listener for show nudges button


		$('body')
			.on('click', '#addNewIncident', () => {
				$('#newIncidentBody')
					.removeClass('d-none');
			});
		$('body')
			.on('keyup', '#new-nudge-textarea', (e) => {
				const charCount = e.target.value.length;

				$(`#new-nudge-char`)
					.text(`${charCount}/200 characters`);
			});
		$('body')
			.on('keyup', '#new-rootbehaviour-textarea', (e) => {
				const charCount = e.target.value.length;

				$(`#new-rootbehaviour-char`)
					.text(`${charCount}/200 characters`);
			});
		$('body')
			.on('keyup', '#new-incident-textarea', (e) => {
				const charCount = e.target.value.length;

				$(`#new-incident-char`)
					.text(`${charCount}/200 characters`);
			});
		$('body')
			.on('keyup', '.rootbehaviour-textarea', (e) => {
				const charCount = e.target.value.length;

				$(`#add-nudge-char`)
					.text(`${charCount}/200 characters`);
			});
		// event listener for adding new incident
		$('body')
			.on('click', '#save-new-incident', () => {
				const BASE_URL = '/api/v3/maturity';
				const incident = $('#new-incident-textarea')
					.val();
				const rootbehaviour = $('#new-rootbehaviour-textarea')
					.val();
				const nudge = $('#new-nudge-textarea')
					.val();

				if (!rootbehaviour || !incident) return;
				const payload = { incident, rootbehaviour }
				if (nudge !== '') payload.nudge = nudge;

				require(['api'], (api) => {
					api.post(BASE_URL + '/submitIncident', payload)
						.then(() => {
							$('#newIncidentBody')
								.addClass('d-none');
							$('.elements')
								.empty();
							$('#new-rootbehaviour-textarea')
								.val('');
							$('#new-incident-textarea')
								.val('');
							$('#new-nudge-textarea')
								.val('');
							self.rootbehaviours();
							notify('Successfully Added a submission ', 'success');
						})
						.catch((err) => {
							console.log(err);
						});
				});
			});
		// end event listener for adding new incident

		// event listener for 'My reasons only' checkbox
		$('body').on('change', '#self-incident', (e) => {
			this.checked = e.target.checked;
			$('.elements').empty();
			self.rootbehaviours();
		})
		// end event listener for 'My reasons only' checkbox
	}

	// disable event listeners
	disableEventListeners() {
		$('body')
			.off('click', '.show-threads-button');
		$('body')
			.off('click', '#save-new-incident');
		$('body')
			.off('click', '#save-new-rootbehaviour');
		$('body')
			.off('click', '#addNewIncident');
		$('body')
			.off('keyup', '#new-nudge-textarea');
		$('body')
			.off('keyup', '#new-rootbehaviour-textarea');
		$('body')
			.off('keyup', '#new-incident-textarea');
		$('body').off('change', '#self-incident')
	}
	// end of disable event listeners

	// fetches nudges for particular incident
	nudge(pid) {
		const BASE_URL = '/api/v3/maturity';
		require(['api'], (api) => {
			// get single incident
			api.get(BASE_URL + `/incident/${pid}`, {})
				.then((rootbehaviours) => {
					rootbehaviours.map((rootbehaviour) => {
						$(`.nudge-${pid}`)
							.append(`
							
				<div style="width: auto;" class='px-4'>
                    <div>
                        <div class="py-1-2">
                            <img src="${rootbehaviour.userData.picture}" class="round-background" style="margin-left: 0px;"/>
                            <span class="text-secondary" data-uid="${rootbehaviour.userData.uid}">${rootbehaviour.userData.fullname || rootbehaviour.userData.username}</span>
                            <span class="text-secondary" style="margin-left: 90px;">${moment(rootbehaviour.createdAt).format('MMM DD h:mm A')}</span>
                        </div>
                        <p id="incident-${rootbehaviour._key.replace('nudge:', '')}" class='px-2'>${rootbehaviour.nudge}</p>
                    </div>
                </div>
							`);
					});
					$(`.nudge-${pid}`)
						.append(`
					<div class='p-3'>
						<textarea class="sdlms-section shadow-none rounded w-100 p-2 rootbehaviour-textarea" placeholder="Add a Nudge" 
						style="resize:none"></textarea>
						<span class="sdlms-text-tertiary-12px d-flex justify-content-end" id="add-nudge-char" maxlength="200"> 0/200 characters</span>
						<div class='d-flex justify-content-between py-2'>
							<button class='btn btn-sm btn-primary rootbehaviour'>Nudge</button>
						</div>
					</div>
					`);
					$(`[quiz-body=${pid}]`)
						.removeClass('d-none');
					// event listener for rootbehaviour button
					$('.rootbehaviour')
						.on('click', () => {
							const nudge = $('.rootbehaviour-textarea')
								.val();

							if (!nudge) return;

							api.post(BASE_URL + '/addNudge', {
								pid,
								nudge
							});
							$(`.nudge-${pid}`)
								.empty();
							this.nudge(pid);
						});
					// end of event listener for rootbehaviour button
				});
			// end of get single rootbehaviour
		});
	}

	// infinite scroll event listener
	scroller(selector) {
		const self = this;
		$(selector)
			.on('scroll', function () {
				if (self.loading) return;
				let {
					scrollTop,
					scrollHeight,
					clientHeight
				} = this;
				let nextPageURL = $(selector)
					.attr('next_page_url');
				if ((scrollTop + clientHeight >= scrollHeight * 0.8) && nextPageURL) {
					self.rootbehaviours(nextPageURL);
				}
			});
	}

	// new rootbehaviour button
	newrootbehaviour() {
		$('.maturity-feed-body')
			.prepend(this.newrootbehaviourDiv());
	}

	init() {
		this.modal();
		this.newrootbehaviour();
		this.rootbehaviours();
		this.eventListeners();
	}
}
