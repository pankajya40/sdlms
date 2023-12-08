<div class="form-group">
	<label for="invite-modal-emails">[[users:prompt-email]]</label>
	<input id="invite-modal-emails" type="text" class="form-control" placeholder="friend1@example.com,friend2@example.com" />
</div>
<div class="form-group">
	<label for="invite-modal-groups">[[users:groups-to-join]]</label>
	<select id="invite-modal-groups" class="form-control" multiple size="5">
		<!-- BEGIN groups -->
		<option value="{@value}">{@value}</option>
		<!-- END groups -->
	</select>
</div>
<div class="form-group">
	<label for="invite-modal-user-type">Select user type</label>
	<select id="invite-modal-user-type" class="form-control">
		<option value="">Select</option>
		<!-- BEGIN validUserTypes -->
		<option value="{@value}">{@value}</option>
		<!-- END validUserTypes -->
	</select>
</div>