<section>
	<div class="sdlms-form container mt-5 mb-3"></div>
	<!-- IF !isSuccessPage -->

	<!-- IF collectInfo -->
	<div class="my-4 container">
		<form id="contact-info-form" class="sdlms-form-elements py-3 sdlms-section position-relative w-100 shadow-lg d-block">
			<div class="mx-4 mt-3" style="margin-bottom: 0!important;">

				<div class="form-row mb-3">
					<div class="form-group col-12 col-lg-5 pr-lg-3">
						<label class="bold-medium-font" for="typeSelect">Email id</label>
						<input required id="userEmailId" placeholder="Enter your email Id" name="emailId" type="email" width="100%" value="" class="form-control">
					</div>

					<div class="form-group col-12 col-lg-3 pr-lg-3">
						<label class="bold-medium-font" for="countryCodeSelect">Country code</label>
						<select required id="countryCodeSelect" name="countryCode" class="form-control">
							<!-- BEGIN countryCodes -->
							<option value="{countryCodes.code}">{countryCodes.country} (+{countryCodes.code})</option>
							<!-- END countryCodes -->
						</select>
					</div>


					<div class="form-group col-12 col-lg-4 pr-lg-3">
						<label class="bold-medium-font" for="userContactInfo">Contact number</label>
						<input required id="userContactInfo" placeholder="Please enter your contact number" name="contact" type="number" width="100%" value="" class="form-control">
					</div>
				</div>

			</div>
		</form>
	</div>
	<!-- ENDIF collectInfo -->

	<div class="container d-flex justify-content-end">
		<div class="mb-5">
			<button id="submit-form" class="btn btn-primary button-primary mt-4">
			Submit form
			<i class="fa fa-spinner fa-spin ml-1" id="spinner" style="display: none;" aria-hidden="true"></i>
			</button>
		</div>
	</div>
	<!-- ENDIF !isSuccessPage -->
</section>