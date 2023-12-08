<div class="modal fade" id="attachSpreadsheet" tabindex="-1" role="dialog" aria-labelledby="attachSpreadsheetLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="position: relative; width: 100%; margin: 2rem auto;" role="document">
		<div class="modal-content border-0 sdlms-section" style="height: auto;">
			<div class="modal-header primary-header sdlms-section-header align-items-center sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
				<h5 class="modal-title" id="attachSpreadsheetLabel">Attach google sheet for saving responses</h5>
				<button type="button" class="close close-modal text-white" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body pb-0">

				<div class="tabs-section" style="min-height: 200px;">
					<form id="leave-form" class="sdlms-form-elements">
						<div class="mx-3 mt-3" style="margin-bottom: 0!important;">

							<div class="form-row mb-4">
								<label class="w-100 bold-font ml-2" for="">1. Add this email as editor to your google spreadsheet</label>
								<div class="pl-4" style="font-family: monospace;">{serviceEmail}</div>
							</div>

							<div class="form-row mb-3">
								<div class="form-group col-12 pr-lg-3">
									<label class="bold-font" for="google-sheet-id">2. Enter your google sheet Id (for verifying access)</label>
									<div class="pl-3" style="font-size: 14px; word-break: break-all;">
										<span class="bold-font">Example:</span> https://docs.google.com/spreadsheets/d/<span class="bold-font" style="color: red;">spreadsheetId</span>/edit#gid=263521927
									</div>
									<div class="d-flex mt-3">
										<input id="google-sheet-id" placeholder="Your sheet Id (e.g. 1E3GUewTypFmfEeGYaiy5y_t_-R1-d_wInxJQCg4onkc)" value="{form.linkedSheetId}" name="" class="form-control">
										<button type="button" id="verify-linkage" style="width: 180px;" class="btn btn-primary button-primary ml-3">
											Add sheet
											<i class="fa fa-spinner fa-spin" id="spinner" style="display: none;" aria-hidden="true"></i>
										</button>
									</div>
									<div>
										<label id="process-success" style="display: none;" class="bold-medium-font mt-3 text-success" for=""></label>
									</div>
									<div>
										<label id="process-failed" style="display: none;" class="bold-medium-font mt-3 text-danger" for=""></label>
									</div>

									<div id="subsheet-section" class="form-group col-12 px-0" style="display: none;">
										<label for="subsheet-selection" class="bold-font mt-3 col-12 px-0">Select subsheet</label>
										<select required id="subsheet-selection" class="form-select col-6 sdlms-form-select" style="font-size: 14px;" aria-label="Select subsheet">

										</select>
									</div>
								</div>
							</div>

						</div>
					</form>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary border-0" data-dismiss="modal">Close</button>
				<button type="button" id="save-spreadsheet-data" class="btn btn-primary button-primary">
				Save
				<i class="fa fa-spinner fa-spin ml-1" id="save-form-spinner" style="display: none;" aria-hidden="true"></i>
				</button>
			</div>
		</div>
	</div>
</div>