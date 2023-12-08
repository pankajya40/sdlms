<!-- IMPORT partials/sidebar.tpl -->
<section>
	<!-- IMPORT observation/partials/new_entry.tpl -->

	<ul class="nav nav-pills nav-fill shadow mb-4">
		<li class="nav-item">
			<a class="nav-link h-100 active" href="/observation/admin">Manage observations</a>
		</li>
		<li class="nav-item">
			<a class="nav-link h-100 border" href="/observation/admin/pages">Static pages</a>
		</li>
		<li class="nav-item">
			<a class="nav-link h-100 border" href="/observation/admin/statuses">Observation statuses</a>
		</li>
		<li class="nav-item">
			<a class="nav-link h-100 border" href="/observation/videoref/submissions">Video reflections</a>
		</li>
		<li class="nav-item">
			<a class="nav-link h-100 border" href="/observation/admin/faq">FAQ</a>
		</li>
	</ul>

	<div class="">
		<div class="d-flex justify-content-between">
			<button class="btn btn-primary button-primary mb-4" data-toggle="modal" data-target="#newEntryModal">
				<i class="fa fa-plus mr-1" aria-hidden="true"></i>
				Add entry
			</button>
		</div>
	</div>
	<div id="modal-area"></div>

	<div class="observations-table border justify-content-center mb-5">

	</div>

</section>
<!-- IMPORT partials/footer.tpl -->