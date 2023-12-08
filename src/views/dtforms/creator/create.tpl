<!-- IMPORT partials/sidebar.tpl -->
<section class="mb-5">
	
	<div class="d-flex justify-content-center mb-3">
		<div class="justify-content-end d-flex w-90">
			<button id="add-editor" data-toggle="modal" data-target="#user-access" class="btn btn-dark mb-4 mr-3 my-auto">
				Add Editors
			</button>
		</div>
	</div>
	<div class="modal fade" id="user-access" tabindex="-1" role="dialog" aria-labelledby="DTFormsLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg" style="position: relative; width: 75%!important; max-width: 75%!important; margin: 2rem auto;" role="document">
			<div class="modal-content border-0 sdlms-section" style="height: auto;">
				
				<div class="row">
					<div class="col-md-6 form-group">
						<div class="d-flex flex-column mt-4 justify-content-between">
							<label for="author" class="bold-medium-font">Name the persons, who can edit the form</label>
							<select user-name-select required data-value class="cursor-pointer label-radius align-item-center form-control pl-3" multiple="multiple" id="author" style="z-index: 1; width: 20rem;"></select>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>

	<div class="d-flex justify-content-center mb-3">
		<div class="justify-content-end d-flex w-90">
			<button id="form-preview" data-toggle="modal" data-target="#DTForms-preview" class="btn btn-dark mb-4 mr-3 my-auto">
				Preview form
				<i class="fa fa-eye mr-1" aria-hidden="true"></i>
			</button>
		</div>
	</div>

	<div class="modal fade" id="DTForms-preview" tabindex="-1" role="dialog" aria-labelledby="DTFormsLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg" style="position: relative; width: 75%!important; max-width: 75%!important; margin: 2rem auto;" role="document">
			<div class="modal-content border-0 sdlms-section" style="height: auto;">
				
			<div id="form-preview-container"></div>

			</div>
		</div>
	</div>


	<div class="sdlms-form justify-content-center d-flex mb-4"></div>
	<div class="pt-4 w-90 mx-auto">
		<!-- IMPORT dtforms/partials/collectinfo.tpl -->

		<div class="">
			<h5 class="bold-font mb-4">Message to show after form submission</h5>
		</div>
		<div class="justify-content-center d-flex">
			<textarea id="after-submit-message" rows="5" class="form-control"></textarea>
		</div>
		<div class="d-flex justify-content-end">
			<div class="">
				<button id="create-form" class="btn btn-primary button-primary mt-4">Create form</button>
			</div>
		</div>
	</div>
</section>
<!-- IMPORT partials/footer.tpl -->