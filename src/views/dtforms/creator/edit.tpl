<!-- IMPORT partials/sidebar.tpl -->
<!-- IMPORT dtforms/partials/spreadsheet.tpl -->
<section class="mb-5">
	<div class="justify-content-center d-flex mb-4">
		<div class="d-flex w-90 justify-content-start">
			<a class="btn btn-dark mb-4 mr-3" href="/forms/responses/{form._id}">
				View form responses
				<i class="fa fa-chevron-right mr-1" aria-hidden="true"></i>
			</a>
			<button class="btn btn-dark mb-4 mr-3" data-toggle="modal" data-target="#attachSpreadsheet">
				Link google sheet
				<i class="fa fa-paperclip mr-1" aria-hidden="true"></i>
			</button>
			<button id="copy-form-link" class="btn btn-dark mb-4 mr-3">
				Copy form link
				<i class="fa fa-copy mr-1" aria-hidden="true"></i>
			</button>
		</div>
	</div>

	<!-- IF !form.linkedSheetId -->

	<div class="d-flex w-90 mx-auto justify-content-between">
		<div class="alert w-100 alert-danger alert-dismissible fade show">
			<strong>Warning!</strong> A google spreadsheet is not linked with this form. Please add a spreadsheet for the responses to get recorded.
		</div>
	</div>

	<!-- ENDIF !form.linkedSheetId -->

	<!-- IF !form.subsheetIndex -->

	<div class="d-flex w-90 mx-auto justify-content-between">
		<div class="alert w-100 alert-danger alert-dismissible fade show">
			<strong>Warning!</strong> Subsheet is not linked with this form. Please select the Subsheet for the responses to get recorded.
		</div>
	</div>

	<!-- ENDIF !form.subsheetIndex -->

	<div class="py-4 d-flex w-90 mx-auto justify-content-between">
		<h5 class="bold-font mb-4 my-auto ">Update form elements</h5>
		<button id="form-preview" data-toggle="modal" data-target="#DTForms-preview" class="btn btn-dark mb-4 mr-3 my-auto">
			Preview
			<i class="fa fa-eye mr-1" aria-hidden="true"></i>
		</button>
	</div>
	<div class="sdlms-form-edit justify-content-center d-flex mb-4"></div>


	<div class="modal fade" id="DTForms-preview" tabindex="-1" role="dialog" aria-labelledby="DTFormsLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg" style="position: relative; width: 75%!important; max-width: 75%!important; margin: 2rem auto;" role="document">
			<div class="modal-content border-0 sdlms-section" style="height: auto;">

				<div id="form-preview-container"></div>

			</div>
		</div>
	</div>


	<div class="pt-4 w-90 mx-auto">

		<!-- IMPORT dtforms/partials/collectinfo.tpl -->
		<div class="">
			<h5 class="bold-font mb-4 ">Message to show after form submission</h5>
		</div>
		<div class="justify-content-center d-flex">
			<textarea id="after-submit-message-edit" rows="5" class="form-control">{form.message}</textarea>
		</div>
		<div class="d-flex justify-content-end mb-4">
			<div class="">
				<button id="edit-form" data-id="{form._id}" class="btn btn-primary button-primary mt-4">Save form</button>
			</div>
		</div>
	</div>
</section>
<!-- IMPORT partials/footer.tpl -->