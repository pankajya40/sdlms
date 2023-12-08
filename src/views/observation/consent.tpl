<!-- IMPORT partials/sidebar.tpl -->
<section>
	<div class="mt-2">
		<div class="row justify-content-center mx-2">
			<form id="consent-form" class="col-12 col-md-8 border shadow p-4">

				<h4 class="text-body text-center bold-font mb-3">Welcome! {user.fullname}</h4>
				<p>
					In order to provide you with a smooth experience, we need to collect certain information from you. Please read the following carefully and indicate your consent by clicking the checkbox below.
				</p>
				<h5>Personal Information</h5>
				<p>
					We may use/collect the following personal information from you: name, email address, and phone number. This information will be used to contact you and to provide you a smooth experience during your observation period.
				</p>

				<h5>IP Data</h5>
				<p>
					We may collect your IP address in order to analyze traffic and to protect against spam and abuse.
				</p>

				<div class="d-flex">
					<input required type="checkbox" id="consent" name="consent" value="">
					<label class="ml-2 mb-0" for="consent">I consent to the collection of my personal information, the use of cookies, and the collection of my IP data.</label>
				</div>
				
				<hr>
				
				<div class="form-row mt-3 justify-content-end">
					<button type="submit" id="start-observation" class="btn btn-primary button-primary">Start process</button>
				</div>

			</form>
		</div>
	</div>

	<!-- IMPORT observation/partials/stage.tpl -->
</section>
<!-- IMPORT partials/footer.tpl -->