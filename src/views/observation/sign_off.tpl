<!-- IMPORT partials/sidebar.tpl -->
<section>
	<div class="mt-2">
		<div class="row justify-content-center mx-2">
			<form id="signoff-form" class="col-11 col-lg-10 border shadow p-4">

				<h4 class="text-body text-center bold-font mt-2 mb-3">Hello {profile.name},</h4>
				<p class="text-center">
				<span class="font-weight-700">Congratulations!</span> for completing the observing period. Hope you got to experience the culture and operations of our organization. As the final step, please fill the final four questions reflecting on objectives, duties and your learnings about the role. Thank you for spending time with us.
				</p>

				<div class="form-row mb-4">
                <!-- BEGIN reflectionQuestions -->
					<label class="w-100 bold-medium-font ml-2 mt-3" for="">{reflectionQuestions.id}. {reflectionQuestions.question}</label>
					<div class="col-12">
                        <input name="response[{@index}][id]" value="{reflectionQuestions.id}" type="hidden">
						<textarea required name="response[{@index}][response]" rows="3" placeholder="Enter your answer" width="100%" class="form-control"></textarea>
					</div>
                <!-- END reflectionQuestions -->
				</div>
				
				<hr>
				
				<div class="form-row mt-3 mr-0 justify-content-end">
					<button type="submit" class="btn btn-primary button-primary">Submit response</button>
				</div>

			</form>
		</div>
	</div>
	<!-- IMPORT observation/partials/stage.tpl -->
</section>
<!-- IMPORT partials/footer.tpl -->