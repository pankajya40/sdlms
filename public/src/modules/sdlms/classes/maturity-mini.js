'use strict';

/**
 * @author Fardin Kamal
 * @date 23-02-2023
 * @class Mini Rigorbuilder
 * @description Allows the user to use rigorbuilder quickly on SD-LMS
 */

class MaturityMini {
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
		<div id="maturity-popup-${count}" class="draggable m-5 p-1 w-25 position-absolute shadow-lg" style="background-color: rgba(136, 136, 136, 0.8); backdrop-filter: blur(8px); left: ${left}px; top:${top}px; border-radius: calc(var(--primary-border-radius)*1.4); user-select:none; z-index: 1000;">
			<div class="d-flex justify-content-between">
				<div class="pl-2 pt-2">
					<p class="fs-3 text-white" id="popup-text">Maturity Builder</p>
				</div>
				<div class="pr-2">
					<i id="maturity-minimize" class="fa fa-solid fa-minus text-white btn-lg" data-count=${count}></i>
					<i class="fa fa-close text-white btn-lg" id="maturity-close" data-count=${count}></i>
				</div>
			</div>
			<!-- inside item -->
			<div id="incident-box-${count}" class="p-2" style="background-color: #f4f4f4; border-radius: calc(var(--primary-border-radius)*1.4);">
				<div>
					<div class="d-flex justify-content-between">
						<p class="font-weight-medium text-dark">Incident</p>
					</div>
					<textarea name="incident" id="incident-text-${count}" maxlength="200" cols="30" rows="2"
							class="form-control incident-textarea" style="resize:none; height:${selectionText.length}px; min-height:50px;" disabled>${selectionText.substr(0, 300).trim()}</textarea>
				</div>
				<div id="rootbehaviour">
					<div class="d-flex justify-content-between">
						<p class="font-weight-medium text-dark my-2">Root Behaviour</p>
					</div>
					<textarea name="incident" id="rootbehaviour-text-${count}" maxlength="200" cols="30" rows="2" class="form-control rootbehaviour-textarea" style="resize:none;"></textarea>
					<span class="sdlms-text-tertiary-12px d-flex justify-content-end py-2" id="rootbehaviour-char-${count}"> 0/200 characters</span>
				</div>
				<div id="nudge">
					<div class="d-flex justify-content-between">
						<p class="font-weight-medium text-dark">Nudge</p>
					</div>
					<textarea name="incident" id="nudge-text-${count}" maxlength="200" cols="30" rows="2" class="form-control nudge-textarea" style="resize:none;"></textarea>
					<span class="sdlms-text-tertiary-12px d-flex justify-content-end py-2" id="nudge-char-${count}"> 0/200 characters</span>
				</div>
				<!-- inside end -->
				<div class="d-flex justify-content-end">	
				<i id="${count}" class="fa fa-save btn-lg btn my-2 save-incident" aria-hidden="true"></i>
				</div>
			</div>
			<!-- popup end -->
		</div>;`);
		this.escape();
	}

	escape() {
		document.onkeydown = function (evt) {
			evt = evt || window.event;
			if (document.activeElement.id.includes('rootbehaviour') || document.activeElement.id.includes('nudge')) {
				if (evt.key === 'Escape' || evt.key === 'Esc') {
					const id = parseInt(document.activeElement.id.replace('rootbehaviour-text-', '')) || parseInt(document.activeElement.id.replace('nudge-text-', ''));

					MaturityMini.prototype.save($(`#rootbehaviour-text-${id}`)
						.val(), $(`#incident-text-${id}`)
							.val(), $(`#nudge-text-${id}`)
								.val());
					$(`#maturity-popup-${parseInt(id)}`)
						.remove();
				}
			}
		}
	}


	save(rootbehaviour, incident, nudge) {
		if (rootbehaviour.trim() === '' || incident.trim() === '') return null;

		const payload = {
			rootbehaviour: rootbehaviour.trim(),
			incident: incident.trim(),
		};

		if (nudge.trim() !== '') payload.nudge = nudge.trim();

		const BASE_URL = '/api/v3/maturity';
		require(['api'], function (api) {
			api.post(BASE_URL + '/submitIncident', payload)
				.then((data) => {
					notify('Succesfully Added a submission ', 'success');
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
}

$('body')
	.on('click', '.save-incident', (e) => {
		const id = parseInt(e.target.id);
		MaturityMini.prototype.save($(`#rootbehaviour-text-${id}`)
			.val(), $(`#incident-text-${id}`)
				.val(), $(`#nudge-text-${id}`)
					.val());
		$(`#maturity-popup-${parseInt(id)}`)
			.remove();
	});

$('body')
	.on('click', '#maturity-close', (e) => {
		const count = e.target.getAttribute('data-count');
		$(`#maturity-popup-${parseInt(count)}`)
			.remove();
	});

$('body')
	.on('click', '#maturity-minimize', (e) => {
		const count = e.target.getAttribute('data-count');
		$(`#incident-box-${parseInt(count)}`)
			.toggleClass('d-none');
	});


$('body')
	.on('keyup', '.rootbehaviour-textarea', (e) => {
		const id = e.target.id;
		const charCount = e.target.value.length;

		$(`#rootbehaviour-char-${parseInt(id.replace('rootbehaviour-text-', ''))}`)
			.text(`${charCount}/200 characters`);
	});
$('body')
	.on('keyup', '.nudge-textarea', (e) => {
		const id = e.target.id;
		const charCount = e.target.value.length;

		$(`#nudge-char-${parseInt(id.replace('nudge-text-', ''))}`)
			.text(`${charCount}/200 characters`);
	});
