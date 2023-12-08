<form id="organization-basic-details" class="mt-4 needs-validation" novalidate>
	<div class="form-row">
		<div class="form-group col-md-6">
			<label for="inpuName4">Name</label>
			<input type="text" class="form-control" name="name" id="inpuName4" placeholder="Name" required>
			<div class="invalid-feedback">
				Please enter a name for your organization.
			</div>
		</div>
		<div class="form-group col-md-6">
			<label for="inputSector4">Sector</label>
			<input type="text" class="form-control" name="sector" id="inputSector4" placeholder="Sector" required>
			<div class="invalid-feedback">
				Please enter the sector.
			</div>
		</div>
	</div>
	<div class="form-row">
		<div class="form-group col-md-6">
			<label for="inputWebsite4">Website</label>
			<input type="text" class="form-control" name="website" id="inputWebsite4" placeholder="https://example.com">
		</div>
		<div class="form-group col-md-3">
			<label for="inputemployeeRange4">Employee Range</label>
			<input type="text" class="form-control" name="employeeRange" id="inputemployeeRange4" placeholder="E.g. 200-300" required>
			<div class="invalid-feedback">
				Please enter a range.
			</div>
		</div>
		<div class="form-group col-md-3">
			<label for="inputOrganizationType4">Organization type</label>
			<select id="inputOrganizationType4" name="type" class="form-control" required>
				<option selected>Select...</option>
				<!-- BEGIN organizationTypes -->
				<option value="{@value}">{@value}</option>
				<!-- END organizationTypes -->
			</select>
			<div class="invalid-feedback">
				Please choose your organization type.
			</div>
		</div>
	</div>
	<div class="form-row">
		<div class="form-group col-12">
			<label for="inputAbout4">About</label>
			<textarea class="form-control" name="about" rows="8" id="inputAbout4" placeholder="About"></textarea>
		</div>
	</div>
	<div class="mt-4 justify-content-end d-flex">
		<button type="submit" class="btn btn-primary">Save details</button>
	</div>
</form>