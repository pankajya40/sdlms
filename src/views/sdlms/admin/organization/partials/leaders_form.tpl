<form class="border border-1 p-3" data-id="{leaders.id}">
	<div class="form-row">
		<div class="form-group col-md-6">
			<label for="inputFullName">Full Name</label>
			<input type="text" name="fullname" value="{leaders.fullname}" class="form-control" id="inputFullName">
		</div>
		<div class="form-group col-md-3">
			<label for="inputPhoneNumber">Contact number</label>
			<input type="text" name="contact" value="{leaders.contact}" class="form-control" id="inputPhoneNumber">
		</div>
		<div class="form-group col-md-3">
			<label for="inputLeaderImage">Profile image</label>
			<input type="file" class="form-control" data-id="{leaders.id}" name="files[leaders_image]" id="inputLeaderImage" placeholder="Profile image">
		</div>
	</div>
	<div class="form-row">
		<div class="form-group col-md-6">
			<label for="inputEmail">Email</label>
			<input type="email" name="email" value="{leaders.email}" class="form-control" id="inputEmail">
		</div>
		<div class="form-group col-md-4">
			<label for="inputPosition">Position</label>
			<input type="text" name="position" value="{leaders.position}" class="form-control" id="inputPosition">
		</div>
		<div class="form-group col-md-2">
			<label for="inputOrder">Order</label>
			<select id="inputOrder" name="sortOrder" class="form-control">
				<option value="" selected>Select...</option>
				<option value="">1</option>
			</select>
		</div>
	</div>
</form>