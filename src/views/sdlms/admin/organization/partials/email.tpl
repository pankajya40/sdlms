<form id="organization-emails">
	<div class="form-row">
		<div class="form-group col-md-6">
			<label class="bold-medium-font" for="inputEmail">Email</label>
			<input type="email" name="email" value="{email.email}" class="form-control" id="inputEmail">
		</div>
		<div class="form-group col-md-6">
			<label class="bold-medium-font" for="inputEmailType4">Email type</label>
			<select id="inputEmailType4" name="type" class="form-control">
				<option value="" selected>Select...</option>
				<!-- BEGIN validEmailTypes -->
				<option value="{@value}">{@value}</option>
				<!-- END validEmailTypes -->
			</select>
		</div>
	</div>
</form>