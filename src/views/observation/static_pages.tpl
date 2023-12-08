<!-- IMPORT partials/sidebar.tpl -->
<section>

	
		<ul class="nav nav-pills nav-fill shadow mb-4">
			<li class="nav-item">
				<a class="nav-link h-100 " href="/observation/admin">Manage observations</a>
			</li>
			<li class="nav-item">
				<a class="nav-link h-100 border active" href="/observation/admin/pages">Static pages</a>
			</li>
			<li class="nav-item">
				<a class="nav-link h-100 border " href="/observation/admin/statuses">Observation statuses</a>
			</li>
			<li class="nav-item">
				<a class="nav-link h-100 border" href="/observation/videoref/submissions">Video reflections</a>
			</li>
			<li class="nav-item">
				<a class="nav-link h-100 border" href="/observation/admin/faq">FAQ</a>
			</li>
		</ul>
	

	<div class="row justify-content-center mx-2 mt-4">
		<form id="reflection-form" class="col-12 border p-4">
			<div class="form-row mx-0">
				<div class="form-group col-12 col-md-8 px-0">
					<label class="bold-medium-font" for="staticPage">Select static page</label>
					<select required id="staticPage" name="page" class="form-control">
						<!-- BEGIN pages -->
						<option value="{@value}">{@value}</option>
						<!-- END pages -->
					</select>
				</div>
			</div>

			<div class="form-group">
				<textarea class="d-none" value="" id="content-area">{pageInfo.content}</textarea>
			</div>

			<div class="form-row mx-0 justify-content-end">
				<button type="submit" class="btn btn-primary button-primary px-3 py-2">Save page information</button>
			</div>

		</form>
	</div>

</section>
<!-- IMPORT partials/footer.tpl -->