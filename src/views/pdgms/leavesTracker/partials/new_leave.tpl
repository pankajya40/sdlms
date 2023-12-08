<div class="modal fade" id="newLeaveModal" tabindex="-1" role="dialog" aria-labelledby="newLeaveModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="position: relative; width: 100%; margin: 2rem auto;" role="document">
		<div class="modal-content border-0 sdlms-section" style="height: auto;">
			<div class="modal-header primary-header sdlms-section-header align-items-center sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
				<h5 class="modal-title" id="newLeaveModalLabel">Request for leave</h5>
				<button type="button" class="close close-modal text-white" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body pb-0">

				<div class="col">
					<div class="text-center mb-3">
						<h5 class="font-weight-medium">{user.fullname}</h5>
						<div class="sdlms-text-black-20px">{user.signature}</div>
					</div>

					<div class="sdlms-form-elements mx-2">
						<div class="form-row mt-2">
							<div class="form-group col-12 col-lg-6 pr-lg-3">
								<label class="bold-medium-font" for="comittedHours">Committed hours</label>
								<input disabled id="comittedHours" name="comittedHours" placeholder="Committed hours" value="{profile.commitedHours}&nbsp;{commitedHoursClassification}" class="form-control"></input>
							</div>
							<div class="form-group col-12 col-lg-6 pl-lg-3">
								<label class="bold-medium-font" for="joiningDate">Joining date</label>
								<input disabled id="joiningDate" placeholder="Joining date" name="joiningDate" value="{profile.joiningDate}" class="form-control"></input>
							</div>
						</div>
					</div>

				</div>

				<div class="tabs-section" style="min-height: 400px;">
					<form id="leave-form" class="sdlms-form-elements">
						<div class="mx-4 mt-3" style="margin-bottom: 0!important;">

							<div class="form-row mb-4">
								<label class="w-100 bold-medium-font ml-2" for="">Leave duration</label>
								<div class="col-12 col-lg-5">
									<input name="from" type="datetime-local" width="100%" class="form-control">
								</div>
								<div class="text-center col-12 col-lg-2 my-1 bold-medium-font">To</div>
								<div class="col-12 col-lg-5">
									<input name="to" type="datetime-local" width="100%" class="form-control">
								</div>
							</div>

							<div class="form-row mb-3">
								<div class="form-group col-12 col-lg-6 pr-lg-3">
									<label class="bold-medium-font" for="leaveReasonSelect">Reason for leave</label>
									<select id="leaveReasonSelect" name="reason" class="form-control">
										<option value="">Select</option>
										<!-- BEGIN leaveReasons -->
										<option value="{@value}">{@value}</option>
										<!-- END leaveReasons -->
									</select>

									<label class="bold-medium-font mt-2" for="teamNameSelect">Team</label>
									<input id="teamNameSelect" placeholder="Enter you team name" name="teamName" class="form-control">
								</div>
								<div class="form-group col-12 col-lg-6 pl-lg-3">
									<label class="bold-medium-font" for="lesveReasonSelect">Description</label>
									<textarea id="lesveReasonSelect" placeholder="Describe your reason" rows="5" name="description" class="form-control"></textarea>
								</div>
							</div>

							<div class="form-row mb-4">
								<div class="form-group col-12 col-lg-6 pr-lg-3">
									<label class="bold-medium-font" for="currentDeliverables">Current deliverables</label>
									<input id="currentDeliverables" name="deliverables" placeholder="Add your current deliverables" class="form-control"></input>
								</div>
								<div class="form-group col-12 col-lg-6 pl-lg-3">
									<label class="bold-medium-font" for="assignee">Assign alternatives</label>
									<input id="assignee" placeholder="Assign a person as your alternative" name="assignee" class="form-control"></input>
								</div>
							</div>

							<div class="form-row mb-4">
								<div class="form-group col-12 col-lg-6 pr-lg-3">
									<label class="bold-medium-font" for="applicationTo">Request to</label>
									<select id="applicationTo" placeholder="Add your current deliverables" name="requestedTo" class="form-control">
										<option value="">Select</option>
										<!-- BEGIN leaders -->
										<option value="{leaders.uid}"><!-- IF leaders.fullname -->{leaders.fullname}<!-- ELSE -->{leaders.username}<!-- ENDIF leaders.fullname --></option>
										<!-- END leaders -->
									</select>
								</div>
								<div class="form-group col-12 col-lg-6 pr-lg-3">
									<label class="bold-medium-font" for="totalLeaveHours">Total leave hours</label>
									<span data-helptext="" class="helptext-tooltip sdlms-text-tertiary-16px font-weight-500">
										<i class="fa fa-question-circle" aria-hidden="true"></i>
										<span class="helptext-tooltiptext">Hahahah</span>
									</span>
									<input id="totalLeaveHours" type="number" placeholder="Total leave hours (working hours)" name="totalLeaveHours" class="form-control">
								</div>
							</div>

						</div>
					</form>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary border-0" data-dismiss="modal">Close</button>
				<button type="button" id="submit-leave-form" class="btn btn-primary button-primary">Save</button>
			</div>
		</div>
	</div>
</div>