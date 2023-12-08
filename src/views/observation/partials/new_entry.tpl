<div class="modal fade" id="newEntryModal" tabindex="-1" role="dialog" aria-labelledby="newEntryModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="position: relative; width: 100%; margin: 2rem auto;" role="document">
		<div class="modal-content border-0 sdlms-section" style="height: auto;">
			<div class="modal-header primary-header sdlms-section-header align-items-center sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
				<h5 class="modal-title" id="newEntryModalLabel">Add new Organization</h5>
				<button type="button" class="close close-modal text-white" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body pb-0">

				<div class="tabs-section">
					<form id="observation-form" class="sdlms-form-elements">
						<div class="mx-4 mt-3" style="margin-bottom: 0!important;">

							<div class="form-row mb-2">
								<div class="form-group col-12">
									<label class="bold-medium-font" for="companyName">Project name</label>
									<input required id="companyName" name="name" placeholder="Add your organization name" class="form-control"></input>
								</div>
								<div class="form-group col-12 ">
									<label class="bold-medium-font" for="WAGroup">WhatsApp Group</label>
									<input required id="WAGroup" placeholder="Paste Whatsapp group link" name="whatsAppGroup" class="form-control"></input>
								</div>
								<div class="form-group col-12">
									<label class="bold-medium-font" for="videoId">Video Reflection url</label>
									<input required id="videoId" name="videoUrl" placeholder="Youtube video URL for writing reflection" class="form-control"></input>
								</div>
								<div class="form-group col-12">
									<button id="add-video-btn" class="btn border-0 btn-sm btn-secondary button-primary" type="button">Add More Video</button>
								</div>
								<div class="form-group col-6">
									<label class="bold-medium-font" for="pocs">POC</label>
									<input required id="pocs" placeholder="Person of contact for the organization" name="poc" class="form-control"></input>
								</div>
								<div class="form-group col-6">
									<label class="bold-medium-font" for="observationPeriod">Observation period</label>
									<input required id="observationPeriod" placeholder="No. of days (e.g. 6)" name="observationPeriod" class="form-control"></input>
								</div>
							</div>

						</div>
					</form>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary border-0" data-dismiss="modal">Close</button>
				<button type="button" id="submit-observation-form" class="btn btn-primary button-primary">Save</button>
			</div>
		</div>
	</div>
</div>