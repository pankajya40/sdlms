<form class="" data-id="{leaders.id}">
	<div class="form-row">
		<div class="form-group col-md-6">
			<label class="bold-medium-font" for="inputFullName">Full Name</label>
			<input type="text" name="fullname" value="{leaders.fullname}" class="form-control" id="inputFullName">
		</div>
		<div class="form-group col-md-6">
			<label class="bold-medium-font" for="inputPhoneNumber">Contact number</label>
			<input type="text" name="contact" value="{leaders.contact}" class="form-control" id="inputPhoneNumber">
		</div>
		<div class="form-group col-md-12">
			<label class="bold-medium-font" for="inputLeaderImage">Profile image</label>
			<input type="file" class="form-control" data-id="{leaders.id}" name="files[leaders_image]" id="inputLeaderImage" placeholder="Profile image">
		</div>
	</div>
	<div class="form-row">
		<div class="form-group col-md-6">
			<label class="bold-medium-font" for="inputEmail">Email</label>
			<input type="email" name="email" value="{leaders.email}" class="form-control" id="inputEmail">
		</div>
		<div class="form-group col-md-4">
			<label class="bold-medium-font" for="inputPosition">Position</label>
			<input type="text" name="position" value="{leaders.position}" class="form-control" id="inputPosition">
		</div>
		<div class="form-group col-md-2">
			<label class="bold-medium-font" for="inputOrder">Order</label>
			<select id="inputOrder" name="sortOrder" class="form-control">
				<option value="" selected>Select...</option>
				<option value="">1</option>
			</select>
		</div>
	</div>
</form>