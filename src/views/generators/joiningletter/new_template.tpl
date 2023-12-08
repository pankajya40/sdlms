<!-- IMPORT partials/sidebar.tpl -->
<section>
	<div class="">
		<!-- IF editing -->
		<form class="col" data-action="edit" id="newTemplateForm">
			<!-- ELSE -->
			<form class="col" data-action="create" id="newTemplateForm">
				<!-- ENDIF editing -->


				<div class="sdlms-form-elements">
					<div class="form-row mt-2">
						<div class="form-group col-12 col-lg-6 pr-lg-3">
							<label class="bold-medium-font" for="templateName">Template name</label>
							<input required id="templateName" name="templateName" placeholder="Name of this template" value="{letterTemplate.templateName}" class="form-control"></input>
						</div>

						<div class="form-group col-12 col-lg-6 pl-lg-3">
							<label class="bold-medium-font" for="letterhead">Letter-head (select company name)</label>
							<select required id="letterhead" class="form-control font-12" id="letterHead" name="letterHeadTemplate">
								<option selected value="">Select</option>
								<!-- BEGIN letterTemplates -->
								<option value="{letterTemplates.value}">{letterTemplates.name}</option>
								<!-- END letterTemplates -->
							</select>
						</div>

					</div>
				</div>

				<div class="mt-4 pt-4 border-top">
					<h5 class="bold-font">Company details</h5>
					<div class="sdlms-form-elements pt-1">
						<div class="form-row">
							<div class="form-group col-12 col-lg-6 pr-lg-3">
								<label class="bold-medium-font" for="companyName">Name</label>
								<input required id="companyName" name="company[name]" placeholder="Company Name" value="{company.name}" class="form-control"></input>
							</div>
							<div class="form-group col-12 col-lg-6 pl-lg-3">
								<label class="bold-medium-font" for="noticePeriod">Notice Period (in days)</label>
								<input required id="noticePeriod" placeholder="Notice Period (in days)" name="company[noticePeriod]" value="{company.noticePeriod}" class="form-control"></input>
							</div>
						</div>

						<div class="form-row">
							<div class="form-group col-12 col-lg-6 pr-lg-3">
								<label class="bold-medium-font" for="internshipDuration">Internship Duration (in months)</label>
								<input required id="internshipDuration" name="company[internshipDuration]" placeholder="Internship Duration (in months)" value="{company.internshipDuration}" class="form-control"></input>
							</div>

						</div>

						<div class="form-row">
							<div class="form-group col-12 mb-1">
								<label class="bold-medium-font" for="payScales">Payment structure</label>
							</div>
						</div>

						<div class="form-row border p-3">
							<div class="w-100" id="payscale-area">
								<!-- IF company.payScale -->
								<!-- BEGIN company.payScale -->
								<!-- IMPORT generators/joiningletter/partials/payscale.tpl -->
								<!-- END company.payScale -->
								<!-- ELSE -->
								<!-- IMPORT generators/joiningletter/partials/payscale_template.tpl -->
								<!-- ENDIF company.payScale -->


							</div>

							<div class="form-group col-12 justify-content-end mt-4 d-flex w-100">
								<div type="button" id="add-payscale" class="btn btn-primary button-primary">
									<i class="fa fa-plus mr-1" aria-hidden="true"></i>Add
								</div>
							</div>

						</div>

						<div class="form-row mt-3">
							<div class="form-group col-12 col-lg-6 pr-lg-3">
								<label class="bold-medium-font" for="signingAuthority">Signing Authority</label>
								<input required id="signingAuthority" name="company[signingAuthority][name]" placeholder="Name of the Signing Authority" value="{company.signingAuthority.name}" class="form-control"></input>
							</div>

							<div class="form-group col-12 col-lg-6 pr-lg-3">
								<label class="bold-medium-font" for="signingAuthorityDesignation">Designation</label>
								<input required id="signingAuthorityDesignation" name="company[signingAuthority][designation]" placeholder="Designation of the Signing Authority" value="{company.signingAuthority.designation}" class="form-control"></input>
							</div>

							<div class="form-group col-12 col-lg-6 pr-lg-3">
								<label class="bold-medium-font" for="signingAuthority" Company>Company</label>
								<input required id="signingAuthorityCompany" name="company[signingAuthority][company]" placeholder="Company" value="{company.signingAuthority.company}" class="form-control"></input>
							</div>

						</div>
					</div>
				</div>

				<div class="d-flex mt-4 justify-content-between">
					<button type="submit" class="btn btn-primary button-primary mb-4 px-3 py-2">

						<!-- IF editing -->
						<i class="fa fa-save mr-1" aria-hidden="true"></i> Save template
						<!-- ELSE -->
						<i class="fa fa-plus mr-1" aria-hidden="true"></i> Create template
						<!-- ENDIF editing -->
					</button>
				</div>

			</form>

	</div>
</section>
<!-- IMPORT partials/footer.tpl -->