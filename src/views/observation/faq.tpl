<!-- IMPORT partials/sidebar.tpl -->
<section>

	<div class="row mx-2">
		<ul class="nav nav-pills col-12 px-0 shadow nav-fill mb-4">
			<li class="nav-item">
				<a class="nav-link h-100 border" href="/observation/admin">Manage observations</a>
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
				<a class="nav-link h-100 border active" href="/observation/admin/faq">FAQs</a>
			</li>
		</ul>
	</div>

	<div class="row justify-content-center mx-2 mt-4">
		<div class="d-flex justify-content-end mb-2 w-100">
			<button class="btn button-primary btn-sm" data-toggle="modal" data-target="#viewfaq">
				View Your FAQs</button>
		</div>
		<form id="faq-form" class="col-12 border p-4">
			<div class="form-row mx-0">
				<div class="form-group col-12 col-md-8">
					<label class="bold-medium-font" for="question">Question</label>
					<input required="" id="question" name="question" class="form-control">
				</div>
				<div class="form-group col-12 col-md-4">
					<label class="bold-medium-font d-block" for="options">Options</label>
					<div class="form-check form-check-inline">
						<input type="checkbox" id="observation" name="observation" class="form-check-input">
						<label class="form-check-label" for="observation">Observation</label>
					</div>
					<div class="form-check form-check-inline">
						<input type="checkbox" id="videoref" name="videoref" class="form-check-input">
						<label class="form-check-label" for="videoref">Video Ref</label>
					</div>
				</div>
			</div>
			

			<div class="form-group">
				<textarea class="d-none" value="" id="answer-area"></textarea>
			</div>

			<div class="form-row mx-0 justify-content-end">
				<button type="submit" class="btn btn-primary button-primary px-3 py-2">+ Add FAQ</button>
			</div>

		</form>
	</div>

</section>
<!-- IMPORT partials/footer.tpl -->
<div class="fade modal p-4" id="viewfaq" tabindex="-1" role="dialog" aria-labelledby="viewfaq" aria-hidden="true"
	style="display: none;">
	<div class="modal-dialog-centered modal-lg mx-auto" role="document">
		<div class="border-0 modal-content" style="height: auto;">
			<div class="modal-content border-0 sdlms-section" style="height: auto;">
				<div class="modal-header primary-header sdlms-section-header align-items-center sdlms-text-white-20px"
					style="height: 56px; border-radius: 1rem 1rem 0 0;">
					<h5 class="modal-title" id="newfaqModal" style="font-size: initial;">Your FAQ
					</h5>
					<button type="button" class="close close-modal text-white" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body">
					<!-- IMPORT observation/partials/faqmodal.tpl -->
				</div>
			</div>
		</div>
	</div>
</div>