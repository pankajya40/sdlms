<!-- IMPORT partials/sidebar.tpl -->
<section>
	<div class="">
		<form class="col" id="newRequestForm">

			<div class="sdlms-form-elements">
				<div class="form-row mt-2">
					<div class="form-group col-12 col-lg-6 pr-lg-3">
						<label class="bold-medium-font" for="requestName">Request name</label>
						<input required id="requestName" name="requestName" placeholder="Name of this request" value="" class="form-control"></input>
					</div>

					<div class="form-group col-12 col-lg-6 pl-lg-3">
						<label class="bold-medium-font" for="templateName">Template name</label>
						<select required class="form-control font-12" id="templateName" name="templateId">
							<option selected value="">Select</option>
							<!-- BEGIN templates -->
							<option value="{templates._id}">{templates.templateName}</option>
							<!-- END templates -->
						</select>
					</div>

				</div>

				<div class="form-row">
					<div class="form-group col-12 col-lg-6 pr-lg-3">
						<label class="bold-medium-font" for="userpayscale">Payscale</label>
						<select required class="form-control font-12" id="userpayscale" name="payscale">
							<option selected value="">Select</option>
						</select>
					</div>
					<div class="form-group col-12 col-lg-6 pl-lg-3">
						<label class="bold-medium-font" for="projectRoles">Working days</label>
						<div class="d-flex p-0 col-12 justify-content-between">
							<select required class="form-control font-12 col-5" id="workDays" name="days[from]">
								<option selected value="">Select</option>
								<!-- BEGIN workDays -->
								<option value="{@index}">{@value}</option>
								<!-- END workDays -->
							</select>
							<span class="my-auto">To</span>
							<select required class="form-control font-12 col-5" id="workDays" name="days[to]">
								<option selected value="">Select</option>
								<!-- BEGIN workDays -->
								<option value="{@index}">{@value}</option>
								<!-- END workDays -->
							</select>
						</div>

					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-12 col-lg-6 pr-lg-3">
						<label class="bold-medium-font" for="usertimings">Working time</label>
						<div class="d-flex p-0 col-12 justify-content-between">
							<input required type="time" name="workingHours[from]" value="" class="form-control col-5"></input>
							<span class="my-auto">To</span>
							<input required type="time" name="workingHours[to]" value="" class="form-control col-5"></input>
						</div>
					</div>
					<div class="form-group col-12 col-md-6 pl-lg-3">
						<label class="bold-medium-font" for="userjoiningDate">Internship Role</label>
						<input required id="userjoiningDate" placeholder="The role in which the candidate is hired for" name="role" value="" class="form-control"></input>
					</div>
					<div class="form-group col-12">
						<label class="bold-medium-font" for="projectRoles">Project roles & responsiblities</label>
						<input required placeholder="Roles separated by comma, e.g. Product Management, Product Research, Growth Hacking" id="projectRoles" type="text" name="projectRoles" value="" class="form-control"></input>
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-12 col-md-6 pr-lg-3">
						<label class="bold-medium-font" for="userjoiningDate">Joining Date</label>
						<input required id="userjoiningDate" type="date" name="dateOfJoining" value="" class="form-control"></input>
					</div>
					<div class="form-group col-12 col-md-6 pl-lg-3">
						<label class="bold-medium-font" for="view-honorarium">Honorarium</label>
						<input id="view-honorarium" disabled value="" class="form-control"></input>
					</div>
				</div>
			</div>

			<div class="mt-4 pt-4 border-top">
				<h5 class="bold-font">User details</h5>
				<div class="sdlms-form-elements pt-1">
					<div class="form-row mx-0 border p-3">
						<div class="w-100" id="users-area">
							<div class="row w-100 ml-0 position-relative">
								<div class="form-group col-6 col-lg-4 pr-lg-3">
									<input required name="batchList[0][firstname]" placeholder="Firstname" value="" class="form-control"></input>
								</div>
								<div class="form-group col-6 col-lg-4 pr-lg-3">
									<input required name="batchList[0][lastname]" placeholder="Lastname" value="" class="form-control"></input>
								</div>
								<div class="form-group col-6 col-lg-4 pr-lg-3">
									<input required type="email" name="batchList[0][email]" placeholder="Email id of the user" value="" class="form-control"></input>
								</div>

								<div class="position-absolute d-flex cursor-pointer" id="remove-user" style="right: 0; height: 40px;">
									<i class="fa fa-trash my-auto" aria-hidden="true"></i>
								</div>
							</div>


						</div>

						<div class="form-group col-12 justify-content-end mt-4 d-flex w-100">
							<div type="button" id="add-user" class="btn btn-primary button-primary">
								<i class="fa fa-plus mr-1" aria-hidden="true"></i>Add
							</div>
						</div>

					</div>

				</div>

				<h5 class="my-4 text-center bold-font">OR</h5>

			</div>

			<div class="p-4 border">

				<div class="mb-4">
					<h5 class="text-body bold-font">Manage records in bulk</h5>
					<div class="row mx-0">
						<div class="text-body">Upload CSV and automatically add multiple records at once.&nbsp;</div>
						<a href="#">Download CSV template here</a>
					</div>
				</div>
				<div class="input-group">
					<div class="custom-file">
						<input type="file" class="custom-file-input form-control" accept=".csv" name="csv_file" id="choose-csv-file" aria-describedby="inputGroupCSV">
						<label class="custom-file-label" id="choose-file-label" for="choose-csv-file">Choose a CSV file</label>
					</div>
				</div>
				<div class="d-flex mt-3 w-100 justify-content-start">
					<button type="button" id="reset-file-upload" class="mr-2 px-4 btn btn-outline-secondary">Clear file</button>
				</div>

				<div id="processed-result" class="w-100 mt-2" style="display: none;">
					<div id="csv-read-status" class="text-info"></div>
				</div>
			</div>


			<div class="d-flex mt-4 justify-content-between">
				<button type="submit" class="btn btn-primary button-primary mb-4 px-3 py-2">
					<i class="fa fa-plus mr-1" aria-hidden="true"></i>
					Submit request
				</button>
			</div>

		</form>

	</div>
</section>
<!-- IMPORT partials/footer.tpl -->