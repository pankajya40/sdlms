<div class="d-flex row mb-2">
	<h5 class="bold-font mb-0 my-auto col-8 ">Collect email Id and contact number:</h5>
	<select class="form-control font-12 col-4" id="collectUserInfo" name="collectInfo">
		<option selected value="">Select</option>
		<option value="true">Yes</option>
		<option value="false">No</option>
	</select>
</div>
<div id="templateIdContainer" class="d-none row">
	<h5 class="bold-medium-font my-auto col-8" for="templateId">Please enter your template Id</h5>
	<input required id="templateId" placeholder="WATI Template Id" name="templateId" type="text" width="100%" value="{form.templateId}" class="form-control font-12 col-4">
</div>
<div class="mt-0 mb-5">
	This allows in sending automated message after the form is submitted by the user
</div>