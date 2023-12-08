'use strict';

/**
 * @author Fardin
 * @date 04/2023
 * @description Allow user to build rigor builder feed
 */

/**
 * @var {class} RigorFeed
 * @description Contains the @methods or @function - to run the RigorFeed
 * @function RigorFeed.init
 * @function RigorFeed.feedModal
 * @function RigorFeed.newReasonDiv
 * @function RigorFeed.filter
 * @function RigorFeed.modal
 * @function RigorFeed.reasons
 * @function RigorFeed.eventListeners
 * @function RigorFeed.disableEventListeners
 * @function RigorFeed.rigor
 * @function RigorFeed.scroller
 * @function RigorFeed.newReason
 */

class RigorFeed {
	constructor() {
		this.init();
		this.loading = false;
		this.checked = false;
	}

	// modal
	feedModal() {
		return `<div class="modal modal_outer right_modal fade show" id="rigorbuilder-feed" tabindex="-1" role="dialog"
     aria-labelledby="createLabel" style="  display: block; padding-right: 0;">
    <div class="modal-dialog" role="document">
        <div class="modal-content border-0 py-0 rounded-0">
            <div class="modal-header">
                <h4 class="modal-title">Rigor Builder Feed</h4>
            </div>
            <div class="rigor-feed-body overflow-auto p-0 rounded-0 pb-5">
            	<div class="d-flex flex-wrap">
					<div class="mb-3 elements"></div>
            	</div>
            </div>
        </div>
    </div>
</div>`;
	}

	// new reason div
	newReasonDiv() {
		return (`
	<div id='newReason'>
	<div class='d-flex justify-content-between'>
		${this.filter()}
    	<button class="btn btn-primary btn-sm m-3" id="addNewReason">Reason a statement</button>
    </div>
    <div id='newReasonBody' class='d-none m-3 p-3 border'>
    	<div id="rigor-body">
				<div>
					<div class="d-flex justify-content-between">
						<p class="font-weight-medium text-dark">Statement</p>
					</div>
					<textarea name="statement" id="new-statement-textarea" cols="30"class="form-control" maxlength="200"
					style="resize:none; min-height: 50px;"></textarea>
					<span class="sdlms-text-tertiary-12px d-flex justify-content-end" id="new-statement-char"> 0/200 characters</span>
				</div>
				<div id="reason">
					<div class="d-flex justify-content-between">
						<p class="font-weight-medium text-dark my-2">Reason</p>
					</div>
					<textarea name="statement" id="new-reason-textarea" maxlength="200" cols="30" rows="2" class="form-control" style="resize:none;"></textarea>
					<span class="sdlms-text-tertiary-12px d-flex justify-content-end" id="new-reason-char"> 0/200 characters</span>
				</div>
				<div id="rigor">
					<div class="d-flex justify-content-between">
						<p class="font-weight-medium text-dark my-2">Rigor</p>
					</div>
					<textarea name="statement" id="new-rigor-textarea" maxlength="200" cols="30" rows="2" class="form-control" style="resize:none;"></textarea>
					<span class="sdlms-text-tertiary-12px d-flex justify-content-end py-2" id="new-rigor-char"> 0/200 characters</span>
				</div>
    </div>
    <div class="d-flex justify-content-end">
		<i id="save-new-reason" class="fa fa-save btn-lg btn my-2" aria-hidden="true"></i>
	</div>
</div>
`);
	}

	// filter
	filter() {
		return (`<div class="m-3">
  				<input type="checkbox" id="self-reasons">
  				<label class="form-check-label" for="self-reasons">My Reasons Only</label>
			</div>
`);
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
					.off('click', '#addNewReason',);
			});
			// end of removing event listener after modal closed
		})($modal);
		// end of event handler of modal
		this.scroller($modal.find('.rigor-feed-body'));
	}

	// fetches reasons from api
	reasons(next_page_url) {
		this.loading = true;
		const self = this;

		const BASE_URL = '/api/v3/rigor';
		let PAGE_URL = next_page_url || '/allReasons';
		this.checked && (PAGE_URL += `?uid=${config.uid}`);

		require(['api'], (api) => {
			api.get(BASE_URL + PAGE_URL, {})
				.then((response) => {
					$('.rigor-feed-body')
						.attr('next_page_url', response.next_page_url);

					let reasons = response.data;
					let $elements = $('.elements');

					// iterating over reasons
					reasons.forEach((reason, index) => {
						$elements.append(`
				<div style="width: auto; border-radius: 20px;" class="card m-3">
                    <div class="card-body p-3">
                        <div class="py-1-2">
                            <img src="${reason.userData.picture}" class="round-background" style="margin-left: 0px;"/>
                            <span class="text-secondary" data-uid="${reason.userData.uid}">${reason.userData.fullname || reason.userData.username}</span>
                            <span class="text-secondary" style="margin-left: 120px;">${moment(reason.createdAt).format('MMM DD h:mm A')}</span>
                        </div>
                        <p class="card-title py-2" id="statement-${reason.pid}">${reason.statement}</p>
                        <!-- reason of the statement -->
                        <div>
							<p class="sdlms-text-black-12px">Reason</p>
							<p class="px-3 reasoning-textbox">${reason.reason}</p>
						</div>
                        <a href="#" class="btn btn-primary btn-sm show-threads-button" data-pid="${reason.pid}" reasons-${index}>Show Reasons</a>
                    </div>
                    <div class="pl-2">
                        <div quiz-body="${reason.pid}" class="d-none">
							<p class="sdlms-text-black-12px px-2">Rigor</p>
							<div class='rigor-${reason.pid}'></div>
                        	
                        </div>
                    </div>
                </div>`);
					});
					self.loading = false;
				});
		});
	}

	// event listeners
	/*
	* Add all the event listeners here
	* When adding event listeners, make sure to add them to the disableEventListeners function to disable them on modal close
	*/
	eventListeners() {
		const self = this;
		// event listener for show reasons button
		$('body')
			.on('click', '.show-threads-button', (e) => {
				$(e.target)
					.removeClass('show-threads-button');
				let pid = $(e.target)
					.attr('data-pid');
				this.rigor(pid);
			});
		// end event listener for show reasons button


		$('body')
			.on('click', '#addNewReason', () => {
				$('#newReasonBody')
					.removeClass('d-none');
			});
		$('body')
			.on('keyup', '#new-rigor-textarea', (e) => {
				const charCount = e.target.value.length;

				$(`#new-rigor-char`)
					.text(`${charCount}/200 characters`);
			});
		$('body')
			.on('keyup', '#new-reason-textarea', (e) => {
				const charCount = e.target.value.length;

				$(`#new-reason-char`)
					.text(`${charCount}/200 characters`);
			});
		$('body')
			.on('keyup', '#new-statement-textarea', (e) => {
				const charCount = e.target.value.length;

				$(`#new-statement-char`)
					.text(`${charCount}/200 characters`);
			});
		$('body')
			.on('keyup', '.reason-textarea', (e) => {
				const charCount = e.target.value.length;

				$(`#add-reason-char`)
					.text(`${charCount}/200 characters`);
			});
		// event listener for add new reason button
		$('body')
			.on('click', '#save-new-reason', () => {
				const BASE_URL = '/api/v3/rigor';
				const statement = $('#new-statement-textarea')
					.val();
				const reason = $('#new-reason-textarea')
					.val();
				const rigor = $('#new-rigor-textarea')
					.val();

				if (!reason || !statement) return;

				require(['api'], (api) => {
					api.post(BASE_URL + '/submitReason', {
						statement,
						reason,
						rigor,
					})
						.then(() => {
							$('#newReasonBody')
								.addClass('d-none');
							$('.elements')
								.empty();
							$('#new-reason-textarea')
								.val('');
							$('#new-statement-textarea')
								.val('');
							$('#new-rigor-textarea')
								.val('');
							self.reasons();
							notify('Successfully Added a submission ', 'success');
						})
						.catch((err) => {
							console.log(err);
						});
				});
			});
		// end event listener for add new reason button

		// event listener for filter
		$('body')
			.on('change', '#self-reasons', (e) => {
				this.checked = e.target.checked;
				$('.elements')
					.empty();
				self.reasons();
			});
		// end event listener for filter
	}

	// disable event listeners
	disableEventListeners() {
		$('body')
			.off('click', '.show-threads-button');
		$('body')
			.off('click', '#save-new-reason');
		$('body')
			.off('click', '#addNewReason');
		$('body')
			.off('keyup', '#new-rigor-textarea');
		$('body')
			.off('keyup', '#new-reason-textarea');
		$('body')
			.off('keyup', '#new-statement-textarea');
		$('body')
			.off('change', '#self-reasons');
	}
	// end disable event listeners

	// fetches rigor for particular statement
	rigor(pid) {
		const BASE_URL = '/api/v3/rigor';
		require(['api'], (api) => {
			// get single reason
			api.get(BASE_URL + `/reason/${pid}`, {})
				.then((reasons) => {
					reasons.map((reason) => {
						$(`.rigor-${pid}`)
							.append(`
							
				<div style="width: auto;" class='px-4'>
                    <div>
                        <div class="py-1-2">
                            <img src="${reason.userData.picture}" class="round-background" style="margin-left: 0px;"/>
                            <span class="text-secondary" data-uid="${reason.userData.uid}">${reason.userData.fullname || reason.userData.username}</span>
                            <span class="text-secondary" style="margin-left: 90px;">${moment(reason.createdAt).format('MMM DD h:mm A')}</span>
                        </div>
                        <p id="statement-${reason._key.replace('rigor:', '')}" class='px-2'>${reason.rigor}</p>
                    </div>
                </div>
							`);
					});
					$(`.rigor-${pid}`)
						.append(`
					<div class='p-3'>
						<textarea class="sdlms-section shadow-none rounded w-100 p-2 reason-textarea" placeholder="Add your reason" 
						style="resize:none"></textarea>
						<span class="sdlms-text-tertiary-12px d-flex justify-content-end" id="add-reason-char" maxlength="200"> 0/200 characters</span>
						<div class='d-flex justify-content-between py-2'>
							<button class='btn btn-sm btn-primary reason'>Reason</button>
						</div>
					</div>
					`);
					$(`[quiz-body=${pid}]`)
						.removeClass('d-none');
					// event listener for reason button
					$('.reason')
						.on('click', () => {
							const rigor = $('.reason-textarea')
								.val();

							if (!rigor) return;

							api.post(BASE_URL + '/addReason', {
								pid,
								rigor
							});
							$(`.rigor-${pid}`)
								.empty();
							this.rigor(pid);
						});
					// end of event listener for reason button
				});
			// end of get single reason
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
					self.reasons(nextPageURL);
				}
			});
	}

	// new reason button
	newReason() {
		$('.rigor-feed-body')
			.prepend(this.newReasonDiv());
	}

	init() {
		this.modal();
		this.newReason();
		this.reasons();
		this.eventListeners();
	}
}
