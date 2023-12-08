//feed function html
function feedModal(data) {
	return `<div class="modal modal_outer right_modal fade" id="${data.id}" tabindex="-1" role="dialog"
     aria-labelledby="createLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content border-0 py-0 rounded-0">
            <div class="modal-header">
                <h4 class="modal-title">Rigor Builder Feed</h4>
            </div>
            <div class="modal-body overflow-auto p-0 rounded-0 pb-5">
                <form action="" class="py-3 sdlms-form-elements" id="form-${data.id}">
                    <div class="d-flex flex-wrap">
                        <div class="col-md-12 mb-3" framework-modal>
                            <!-- <div class="problem-statement" >
                                <p class=" bg-gray p-4 sdlms-section shadow-none" id="statement" statement>${data.content}</p>
                            </div> -->
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>`;
}

/**
 * @type {class} Feed
 * @param {String} content
 */

class Feed {

	constructor(content, config = {}, api = {}) {
		this.content = content || '';
		this.config = config;
		this.api = api;
		this.modal();
		this.isSaved = false;
		this.save = this.save.bind(this);
		this.loading = false;
	}

	async modal(text) {
		let id = app.unique('feed-modal');
		let $modal = $(feedModal({
			id,
			content: this.content,
			title: this.config
		}));
		$('body')
			.append($modal);
		this.events($modal);
		let pid;
		// save function
		$('body')
			.on('click', '[btn-action="save"]', () => {
				this.save();
			});

		$('.modal-rigor-icon')
			.on('click', function () {
				$('.modal-rigor')
					.toggleClass('modal-rigor-open');
			});

	}

	events($modal) {
		let self = this;
		self.$modal = $modal;
		$modal.modal('show');
		// removing event listener after modal closed 
		$modal.on('hidden.bs.modal', () => {
			$modal.remove();
			$('body')
				.off('click', '[btn-action="save"]');
		});
		this.$form = $modal.find('form');
		this.$form.on('submit', function (e) {
			e.preventDefault();
		});
	}

	// Save function for rigorbuilder
	save() {
		$('[reason-btn]').remove();
		$('.reasoning-textbox').attr('disabled', '').addClass('border-0');
		$('#SaveBtn').remove();
		$('.counts-textarea').remove();
		let textBox = document.querySelectorAll('.reasoning-textbox');
		// let statement = this.content;
		const statement = $(`#statement-${parseInt(textBox[textBox.length - 1].id.replace('textarea-', ''))}`).text();
		let pid = parseInt(textBox[textBox.length - 1].id.replace('textarea-', ''));
		let reasons = [];
		textBox.forEach((e) => {
			console.log(statement);
			if (e.value !== '') {
				let obj = { }
				obj[e.id] = e.value;
				reasons.push( obj )
			} else {
				return;
				// isEmpty = false;
			}
		});
		let isSaved = this.isSaved;
		//
		if (!isSaved) {
			$('[save-btn]')
				.hide();
			let BASE_URL = '/api/v3/rigor';
			require(['api'], (api) => {
				api.post(BASE_URL + '/addReason', {
					pid,
					blocks: {
						reasons,
						statement: [statement]
					}
				})
					.then((data) => {
						pid = data.data.pid;
						$('[reason-btn]')
							.hide();
						notify('Submit Succesfully ', 'success');
					})
					.catch((err) => {
						console.log(err);
						notify('Failed To submit', 'failure');
						$('[save-btn]')
							.show();
					});

				$('[next-btn], [preview]')
					.removeClass('d-none');
			});
		} else {
			console.log('Please enter a problem statement');
		}

		let rigor = ajaxify.data.rigor || {};
	}
}