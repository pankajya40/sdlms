<style>
	.video-container iframe {
		width: 100%;
		height: 400px;
	}

	#sidebar-wrapper {
		min-width: 15rem;
	}

	.navbar-expand-lg {
		display: none;
	}

	.fullscreen {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99999;
		background: white;
		height: 100vh;
	}
</style>
<!-- IMPORT partials/sidebar.tpl -->
<section>

	<div class="modal fade" id="hyginecheckModal" tabindex="-1" role="dialog" aria-labelledby="hyginecheckModalLabel" aria-hidden="true">
		<div class="modal-dialog" style="position: relative; width: 100%; margin: 2rem auto;" role="document">
			<div class="modal-content border-0 sdlms-section" style="height: auto;">
				<div class="modal-header primary-header sdlms-section-header align-items-center sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
					<h5 class="modal-title" id="hyginecheckModalLabel">Self-edit hygiene checklist</h5>
					<button type="button" class="close close-modal text-white" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body pb-0">
					<div class="tabs-section">
						<form id="checklist-form" class="sdlms-form-elements">
							<div class="mx-4 mt-3" style="margin-bottom: 0!important;">
								<!-- BEGIN hygineChecklist -->
								<div class="form-check my-1">
									<input class="form-check-input" type="checkbox" value="" id="check_{@index}">
									<label class="form-check-label" for="check_{@index}">
										<strong>{hygineChecklist.header}</strong>: {hygineChecklist.text}
									</label>
								</div>
								<!-- END hygineChecklist -->

							</div>
							<div class="mx-4 mt-3 sdlms-text-black-16px mb-2">
								Hope you've covered <strong class="text-danger">all the checkboxes</strong>. These five checks make it a great reflection. You may read the guidelines incase of any doubts
							</div>
						</form>
					</div>
				</div>
				<div class="modal-footer justify-content-center">
					<button type="button" id="submit-checklist-form" class="btn px-5 btn-primary button-primary">Submit</button>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-2 px-lg-4 reflection-section fullscreen" style="transition: 0.3s;">
		<div class="row mt-5">
			<div class="col-12 col-md-6">
				<div class="video-container w-100 d-flex justify-content-center"></div>
			</div>
			<div class="col-12 col-md-6">
				<form id="reflection-form">
					<div class="form-row mb-3 justify-content-end">
						<div class="form-group col-12">
							<textarea class="reflection d-none" name="reflection">{reflection.reflection}</textarea>
						</div>
					</div>
				</form>
			</div>
			<button class="d-none" data-toggle="modal" data-target="#hyginecheckModal"></button>
		</div>
		<div class="row justify-content-end mx-0">
			<div class="col-6 row justify-content-end">
				<button id="submit-reflection" type="button" class="btn btn-primary button-primary">Submit reflection</button>
			</div>
		</div>
		<div class="justify-content-center row" style="position: absolute; bottom: 15px; left: 0; width: 100vw;">
			<div class="col-12 d-flex justify-content-center">
				<button class="bg-light border p-2 mx-3 px-3" style="width: 48px; height: 48px;" enter-fullscreen>
					<i style="display: none;" class="fa fa-arrows-alt" aria-hidden="true"></i>
					<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnf2ePzfXTITe7xGvpX1wGYrawnd3hTHvU77hUcaXC9G90yxrEwRjgfgM6T00KerxpprI&amp;usqp=CAU" style="width: 16px;" />
				</button>
			</div>

			<div fullscreen-text style="color: #bebbbb;" class="justify-content-center text-center pt-2 col-12">Press &nbsp;<strong>Escape</strong>&nbsp; to exit fullscreen</div>

		</div>


	</div>
</section>
<!-- IMPORT partials/footer.tpl -->