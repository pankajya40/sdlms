<form id="organization-phone">
	<div class="form-row">
		<div class="form-group col-md-6">
			<label class="bold-medium-font" for="inputContact">Contact</label>
			<input type="text" name="contact" value="{phoneNumber.contact}" class="form-control" id="inputContact">
		</div>
		<div class="form-group col-md-6">
			<label class="bold-medium-font" for="inputContactType4">Contact type</label>
			<select id="inputContactType4" name="type" class="form-control">
				<option value="" selected>Select...</option>
				<!-- BEGIN validContactTypes -->
				<option value="{@value}">{@value}</option>
				<!-- END validContactTypes -->
			</select>
		</div>
	</div>
</form>