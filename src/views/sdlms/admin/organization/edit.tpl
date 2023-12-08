<!-- IMPORT sdlms/admin/organization/partials/manage_members.tpl -->

<div class="row d-flex justify-content-center align-items-center h-100">
	<div class="col-12">
		<div class="card" style="border: none!important;">
			<div class="rounded-top position-relative text-white d-flex flex-row justify-content-center organization-cover-img" id="organization-cover-img" style="background: url({coverImage.image}), #000;">
				<div class="flex-column position-relative" style="width: 150px; margin-top: 6rem;">
					<label id="edit-organization" for="inputProfileImage" data-id="{organizationId}" class="fa fa-camera p-2 position-absolute cursor-pointer" aria-hidden="true" style="bottom: -25px;z-index: 1;right: 15px;font-size: 25px;background: black;border-radius: 100%;"></label>
					<img src="{profileImage.image}" id="organization-profile-img" alt="Organization image" class="img-fluid img-thumbnail mt-4 mb-2" style="width: 150px;height: 150px; z-index: 1; border-radius: 50%;object-fit: cover;">
					<!-- <label id="edit-organization" for="inputProfileImage" data-id="{organizationId}" type="button" class="btn btn-primary button-primary form-row" style="z-index: 1;">
						CHANGE PROFILE
					</label> -->
					<input type="file" class="form-control d-none" name="files[organization_profile]" id="inputProfileImage" placeholder="Name">
				</div>
				<div class="position-absolute" style="right: 18px;bottom: 5px;font-size: 30px;">
					<label id="edit-organization" for="inputCoverImage" data-id="4" type="button" class="form-row position-absolute" style="z-index: 1;right: 18px;bottom: 5px;font-size: 30px;">
						<i class="fa fa-camera" aria-hidden="true"></i>
					</label>
					<input type="file" class="form-control d-none" name="files[organization_cover]" id="inputCoverImage" placeholder="Sector">
				</div>
			</div>
			<div class="p-4 text-black" style="background-color: #f8f9fa; height: 90px;">
				<div class="d-flex justify-content-end text-center py-1">
					<div>
						<button id="view-organization-profile" data-id="{organizationId}" class="btn btn-primary button-primary form-row">View profile</button>
					</div>
					<div class="ml-2" style="padding-left: .6rem;padding-right: 0.6rem;">
						<button id="manage-organization-members" data-id="{organizationId}" class="btn btn-primary button-primary form-row" data-toggle="modal" data-target="#addmembers">Manage members</button>
					</div>
				</div>
			</div>
			<div style="" class="forms-container">

				<section class="tabs-section">
					<div class="row">
						<div class="col-sm-5 col-lg-3">
							<ul class="nav nav-tabs flex-column mb-3 border h-100">
								<li class="nav-item border-bottom">
									<a class="nav-link bold-font active show" data-toggle="tab" href="#tab-1">Basic details</a>
								</li>
								<li class="nav-item border-bottom">
									<a class="nav-link bold-font" data-toggle="tab" href="#tab-2">Location</a>
								</li>
								<li class="nav-item border-bottom">
									<a class="nav-link bold-font" data-toggle="tab" href="#tab-3">Social links</a>
								</li>
								<li class="nav-item border-bottom">
									<a class="nav-link bold-font" data-toggle="tab" href="#tab-4">Contact</a>
								</li>
								<li class="nav-item border-bottom">
									<a class="nav-link bold-font" data-toggle="tab" href="#tab-5">Leaders</a>
								</li>
							</ul>
						</div>
						<div class="col-sm-7 col-lg-9" style="min-height: 500px;">
							<div class="tab-content">
								<div class="tab-pane active show" id="tab-1">
									<form id="organization-basic-details" class="mt-3">
										<h4 class="bold-font mb-3">Basic information</h4>
										<div class="form-row">
											<div class="form-group col-md-6">
												<label class="bold-medium-font" for="inpuName4">Name</label>
												<input type="text" class="form-control" name="name" value="{organization.name}" id="inpuName4" placeholder="Name">
											</div>
											<div class="form-group col-md-6">
												<label class="bold-medium-font" for="inputSector4">Sector</label>
												<input type="text" class="form-control" name="sector" value="{organization.sector}" id="inputSector4" placeholder="Sector">
											</div>
										</div>
										<div class="form-row">
											<div class="form-group col-md-6">
												<label class="bold-medium-font" for="inputWebsite4">Website</label>
												<input type="url" class="form-control" name="website" value="{organization.website}" id="inputWebsite4" placeholder="https://example.com">
											</div>
											<div class="form-group col-md-3">
												<label class="bold-medium-font" for="inputemployeeRange4">Employee Range</label>
												<input type="text" class="form-control" value="{organization.employeeRange}" name="employeeRange" id="inputemployeeRange4" placeholder="E.g. 200-300">
											</div>
											<div class="form-group col-md-3">
												<label class="bold-medium-font" for="inputOrganizationType4">Organization type</label>
												<select id="inputOrganizationType4" name="type" class="form-control">
													<option value="" selected>Select...</option>
													<!-- BEGIN organizationTypes -->
													<option value="{@value}">{@value}</option>
													<!-- END organizationTypes -->
												</select>
											</div>
										</div>
										<div class="form-row">
											<div class="form-group col-12">
												<label class="bold-medium-font" for="inputAbout4">About</label>
												<textarea class="form-control" name="about" rows="8" id="inputAbout4" placeholder="About">{organization.about}</textarea>
											</div>
										</div>
									</form>
								</div>

								<div class="tab-pane" id="tab-2">
									<form id="organization-address" class="mt-3">
										<h4 class="bold-font mb-3">Where is your organization located?</h4>
										<div class="form-group">
											<label class="bold-medium-font" for="inputAddress">Address Line 1</label>
											<input type="text" class="form-control" value="{location.addressLine1}" name="addressLine1" id="inputAddress" placeholder="1234 Main St">
										</div>
										<div class="form-group">
											<label class="bold-medium-font" for="inputAddress2">Address Line 2</label>
											<input type="text" class="form-control" value="{location.addressLine2}" name="addressLine2" id="inputAddress2" placeholder="Apartment, studio, or floor">
										</div>
										<div class="form-row">
											<div class="form-group col-md-4">
												<label class="bold-medium-font" for="inputCountry">Country</label>
												<select name="country" id="inputCountry" class="form-control">
													<option value="" selected>Select...</option>
													<!-- BEGIN countries -->
													<option value="{@value}">{@value}</option>
													<!-- END countries -->
												</select>
											</div>

											<div class="form-group col-md-4">
												<label class="bold-medium-font" for="inputState">State</label>
												<select id="inputState" name="state" class="form-control">
													<option value="" selected>Select...</option>
												</select>
											</div>

											<div class="form-group col-md-4">
												<label class="bold-medium-font" for="inputCity">City</label>
												<input type="text" name="city" value="{location.city}" class="form-control" id="inputCity">
											</div>

											<div class="form-group col-md-4">
												<label class="bold-medium-font" for="inputZip">Zip</label>
												<input type="text" name="pincode" value="{location.pincode}" class="form-control" id="inputZip">
											</div>
										</div>
									</form>
								</div>

								<div class="tab-pane" id="tab-3">
									<div id="organization-social-links" class="mt-3">
										<h4 class="bold-font mb-3">Social media handles</h4>
										<div class="form-row">

											<!-- BEGIN validSocialChannels -->
											<div class="form-group col-md-6">
												<label class="bold-medium-font" for="input{@value}">{@value}</label>
												<input type="text" name="url" data-channel="{@value}" class="form-control" id="input{@value}">
											</div>
											<!-- END validSocialChannels -->

										</div>
									</div>
								</div>
								<div class="tab-pane" id="tab-4">
									<div class="mt-3">
										<h4 class="bold-font mb-3">Contact information</h4>
										<!-- IF email.length -->
											<!-- BEGIN email -->
												<!-- IMPORT sdlms/admin/organization/partials/email.tpl -->
											<!-- END email -->
										<!-- ELSE -->
											<!-- IMPORT sdlms/admin/organization/partials/email.tpl -->
										<!-- ENDIF email.length -->
									</div>

									<!-- IF phoneNumber.length -->
										<!-- BEGIN phoneNumber -->
											<!-- IMPORT sdlms/admin/organization/partials/phone.tpl -->
										<!-- END phoneNumber -->
									<!-- ELSE -->
										<!-- IMPORT sdlms/admin/organization/partials/phone.tpl -->
									<!-- ENDIF phoneNumber.length -->
									
								</div>

								<div class="tab-pane" id="tab-5">
									<div id="organization-leaders" class="mt-3">
										<h4 class="bold-font mb-3">Organization leaders</h4>
										<!-- IF leaders.length -->
											<!-- BEGIN leaders -->
												<!-- IMPORT sdlms/admin/organization/partials/leader.tpl -->
											<!-- END leaders -->
										<!-- ELSE -->
											<!-- IMPORT sdlms/admin/organization/partials/leader.tpl -->
										<!-- ENDIF leaders.length -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<div class="justify-content-end d-flex">
					<button id="save-organization-details" class="btn btn-primary button-primary px-4 py-2">Update details</button>
				</div>
			</div>
		</div>
	</div>
</div>