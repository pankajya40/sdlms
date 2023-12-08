<style>

</style>

<!-- IMPORT partials/sidebar.tpl -->
<section>

	<div class="mt-2 px-lg-4">
		<div class="row justify-content-center mx-2">
			<form id="reflection-form" class="col-12 col-sm-11 col-lg-8 col-xl-6 border shadow p-4">
				<div class="form-row mb-4">
					<label class="w-100 bold-medium-font ml-2 mt-3" for="">Your name</label>
					<div class="col-12">
						<input required name="name" value="{profile.name}" placeholder="Enter your full name here" type="text" width="100%" class="form-control">
					</div>
					<label class="w-100 bold-medium-font ml-2 mt-3" for="">Email Id</label>
					<div class="col-12">
						<input required name="email" value="{user.email}" placeholder="Enter your email id here" type="email" width="100%" class="form-control">
					</div>

					<label class="w-100 bold-medium-font ml-2 mt-3" for="">Contact number</label>
					<div class="col-12">
						<input required name="contact" value="{profile.contact}" placeholder="Enter your mobile here" type="tel" width="100%" class="form-control">
					</div>
				</div>

				<div class="form-group">
					<label class="bold-medium-font" for="companySelect">Select Project</label>
					<select required id="companySelect" name="companyId" class="form-control">
						<option value="">Select</option>
						<!-- BEGIN companies -->
						<option value="{companies._id}">{companies.name}</option>
						<!-- END companies -->

					</select>
				</div>


				<div class="form-group">
					<label class="bold-medium-font" for="roleSelect">Select role</label>
					<select required id="roleSelect" name="role" class="form-control">
						<option value="">Select</option>
						<!-- BEGIN roles -->
						<option value="{roles.name}">{roles.name}</option>
						<!-- END roles -->

					</select>
				</div>

				<div class="d-flex mt-2 justify-content-end">
					<button type="submit" class="btn btn-primary button-primary px-4">Submit</button>
				</div>
			</form>
		</div>
	</div>

</section>
<!-- IMPORT partials/footer.tpl -->