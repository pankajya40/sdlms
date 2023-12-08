'use strict';

/**
 * @author Fardin Kamal
 * @date 23-02-2023
 * @class Mini Rigorbuilder
 * @description Allows the user to use rigorbuilder quickly on SD-LMS
 */

class RigorMini {
	constructor(selectionText, e) {
		count += 1;
		const left = e.pageX;
		const top = e.pageY;

		require(['https://unpkg.com/interactjs/dist/interact.min.js'], function (interact) {
			// InteractJS
			// drag
			interact('.draggable')
				.draggable({
					// enable inertial throwing
					inertia: false,
					// keep the element within the area of it's parent
					modifiers: [
						interact.modifiers.restrictRect({
							restriction: 'parent',
							endOnly: true,
						}),
					],
					// enable autoScroll
					autoScroll: true,

					listeners: {
						// call this function on every dragmove event
						move: dragMoveListener,

					},
				});
			// drag end
			// resize

			function dragMoveListener(event) {
				var target = event.target;
				// keep the dragged position in the data-x/data-y attributes
				var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
				var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

				// translate the element
				target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

				// update the posiion attributes
				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
			}

			// this function is used later in the resizing and gesture demos
			window.dragMoveListener = dragMoveListener;
			// interactjs end
		});

		$('body')
			.append(`
		<div id="rigor-popup-${count}" class="draggable m-5 p-1 w-25 position-absolute shadow-lg" style="background-color: rgba(136, 136, 136, 0.8); backdrop-filter: blur(8px); left: ${left}px; top:${top}px; border-radius: calc(var(--primary-border-radius)*1.4); user-select:none; z-index: 1000;">
			<div class="d-flex justify-content-between">
				<div class="pl-2 pt-2">
					<p class="fs-3 text-white" id="popup-text">Rigor Builder</p>
				</div>
				<div class="pr-2">
					<i id="rigor-minimize" class="fa fa-solid fa-minus text-white btn-lg" data-count=${count}></i>
					<i class="fa fa-close text-white btn-lg" id="rigor-close" data-count=${count}></i>
				</div>
			</div>
			<!-- inside item -->
			<div id="rigor-body-${count}" class="p-2" style="background-color: #f4f4f4; border-radius: calc(var(--primary-border-radius)*1.4);">
				<div>
					<div class="d-flex justify-content-between">
						<p class="font-weight-medium text-dark">Statement</p>
						<!-- <button class="btn" id="locate"><i class="fa fa-bullseye"></i></button> -->
					</div>
					<textarea name="statement" id="statement-text-${count}" cols="30"
							class="form-control" style="resize:none; height:${selectionText.length}px; min-height: 50px;" disabled>${selectionText.substr(0, 300)
				.trim()}</textarea>
				</div>
				<div id="reason-${count}">
					<div class="d-flex justify-content-between">
						<p class="font-weight-medium text-dark my-2">Reason</p>
					</div>
					<textarea name="statement" id="reason-text-${count}" maxlength="200" cols="30" rows="2" class="form-control reason-textarea" style="resize:none;"></textarea>
					<span class="sdlms-text-tertiary-12px d-flex justify-content-end" id="reason-char-${count}"> 0/200 characters</span>
				</div>
				<div id="rigor-${count}">
					<div class="d-flex justify-content-between">
						<p class="font-weight-medium text-dark my-2">Rigor</p>
					</div>
					<textarea name="statement" id="rigor-text-${count}" maxlength="200" cols="30" rows="2" class="form-control rigor-textarea" style="resize:none;"></textarea>
					<span class="sdlms-text-tertiary-12px d-flex justify-content-end py-2" id="rigor-char-${count}"> 0/200 characters</span>
				</div>
				<!-- inside end -->
				<div class="d-flex justify-content-end">
					<i id="${count}" class="fa fa-save btn-lg btn my-2 rigor-save" aria-hidden="true"></i>
				</div>
			</div>
			<!-- popup end -->
			<div class="reasons"></div>
		</div>`);
		this.escape()
	}

	save(reason, statement, rigor) {
		if (reason.trim() === '' || statement.trim() === '') return null;

		const payload = { statement: statement.trim(), reason: reason.trim() }
		if (rigor.trim() !== '') payload.rigor = rigor.trim();

		const BASE_URL = '/api/v3/rigor';
		require(['api'], function (api) {
			api.post(BASE_URL + '/submitReason', payload)
				.then((data) => {
					notify('Succesfully Added a submission ', 'success');
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}

	escape() {
		// close popup on press on ESC
		document.onkeydown = function (evt) {
			evt = evt || window.event;
			if (document.activeElement.id.includes('reason') || document.activeElement.id.includes('rigor')) {
				if (evt.key === 'Escape' || evt.key === 'Esc') {
					const e = { target: { id: '' } };
					e.target.id = parseInt(document.activeElement.id.replace('reason-text-', '')) || parseInt(document.activeElement.id.replace('rigor-text-', ''));

					saveFunction(e);
				}
			}
		};
	}
}

const saveFunction = (e) => {
	const id = parseInt(e.target.id);
	RigorMini.prototype.save($(`#reason-text-${id}`).val(), $(`#statement-text-${id}`).val(), $(`#rigor-text-${id}`).val());

	$(`#rigor-popup-${id}`).remove();
};

$('body')
	.on('click', '.rigor-save', (e) => {
		saveFunction(e);
	});

$('body')
	.on('click', '#rigor-close', (e) => {
		const dataCountClose = e.target.getAttribute('data-count');
		$(`#rigor-popup-${parseInt(dataCountClose)}`)
			.remove();
	});

$('body')
	.on('click', '#rigor-minimize', (e) => {
		const dataCountMinimize = e.target.getAttribute('data-count');
		$(`#rigor-body-${parseInt(dataCountMinimize)}`)
			.toggleClass('d-none');
	});

$('body')
	.on('keyup', '.reason-textarea', (e) => {
		const id = e.target.id;
		const charCount = e.target.value.length;

		$(`#reason-char-${parseInt(id.replace('reason-text-', ''))}`)
			.text(`${charCount}/200 characters`);
	});
$('body')
	.on('keyup', '.rigor-textarea', (e) => {
		const id = e.target.id;
		const charCount = e.target.value.length;

		$(`#rigor-char-${parseInt(id.replace('rigor-text-', ''))}`)
			.text(`${charCount}/200 characters`);
	});