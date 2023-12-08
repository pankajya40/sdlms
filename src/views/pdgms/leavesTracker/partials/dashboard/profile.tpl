<div class="modal fade" id="viewProfile" tabindex="-1" role="dialog" aria-labelledby="newProfileLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="position: relative; width: 100%; margin: 2rem auto;" role="document">
		<div class="modal-content border-0 sdlms-section" style="height: auto;">
			<div class="modal-header primary-header sdlms-section-header align-items-center sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
				<h5 class="modal-title" id="newProfileLabel">View or Update Profile</h5>
				<button type="button" class="close close-modal text-white" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body pb-0">

				<div class="tabs-section" style="min-height: 100px;">
					<form id="profile-form" class="sdlms-form-elements">
						<div class="mx-4 mt-3" style="margin-bottom: 0!important;">

							<div class="form-row mt-2">
								<div class="form-group col-12 col-lg-6 pr-lg-3">
									<label class="bold-medium-font" for="Name">Name</label>
									<input id="Name" disabled name="name" placeholder="Enter Your Name" value="{user.fullname}" class="form-control"></input>
								</div>
								<div class="form-group col-12 col-lg-6 pr-lg-3">
									<label class="bold-medium-font" for="RollsSelect">Rolls</label>
									<select id="RollsSelect" name="rolls" class="form-control">
										<option value="">Select Rolls</option>
										<option value="Agile Recruitech">Agile Recruitech</option>
										<option value="DeepThought">DeepThought</option>
									</select>
								</div>
							</div>

							<div class="form-row mb-3">
								<div class="form-group col-12 col-lg-6 pr-lg-3">
									<label class="bold-medium-font" for="typeSelect">Type</label>
									<select id="typeSelect" name="internshipType" class="form-control">
										<option value="">Select Type</option>
										<!-- BEGIN validInternshipTypes -->
                                        <option value="{@value}">{@value}</option>
										<!-- END validInternshipTypes -->
									</select>
								</div>
                                <div class="form-group col-12 col-lg-6 pr-lg-3">
									<label class="bold-medium-font" for="commitedHoursSelect">Commited Hours Per Week</label>
									<select id="hourSelect" name="commitedHours" class="form-control">
										<option value="">Select Hours</option>
                                        <!-- BEGIN commitedHours -->
										<option value="{@value}">{@value}&nbsp;{commitedHoursClassification}</option>
										<!-- END commitedHours -->
									</select>
								</div>
							</div>

							<div class="form-row mb-4">
								<div class="form-group col-12 col-lg-4 pr-lg-3">
									<label class="bold-medium-font" for="joiningDate">Joining Date</label>
									<input id="joiningdate" name="joiningDate" type="date" width="100%" value="{profile.joiningDate}" class="form-control">
								</div>
								<div class="form-group col-12 col-lg-4 pr-lg-3">
									<label class="bold-medium-font" for="honororium">Honororium</label>
									<input id="honororium" name="honororium" value="{profile.honororium}" type="number" placeholder="Amount Per Month" width="100%" class="form-control">
								</div>
								<div class="form-group col-12 col-lg-4 pr-lg-3">
									<label class="bold-medium-font" for="currencySelect">Currency</label>
									<select id="currencySelect" name="currency" class="form-control">
										<option value="">Select</option>
                                        <option value="INR">INR</option>
                                        <option value="USD">USD</option>
									</select>
								</div>
							</div>

							<div class="form-row mb-3">
								<div class="form-group col-12 col-lg-6 pr-lg-3">
									<label class="bold-medium-font" for="bankaccount">Account Number</label>
									<input id="bankaccount" name="accountNuber" placeholder="Your bank account number" value="{profile.accountNuber}" class="form-control"></input>
								</div>
                                <div class="form-group col-12 col-lg-6 pr-lg-3">
									<label class="bold-medium-font" for="ifsc">IFSC Code</label>
									<input id="ifsc" name="ifscCode" placeholder="Your IFSC code" value="{profile.ifscCode}" class="form-control"></input>
								</div>
							</div>

						</div>
					</form>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary border-0" data-dismiss="modal">Close</button>
				<button type="button" id="submit-profile-form" class="btn btn-primary button-primary">Update</button>
			</div>
		</div>
	</div>
</div>