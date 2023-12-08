<div class="container">
	<!-- IF scorecard -->
	<div style="min-height: 40vh;" class="row align-items-center justify-content-center">
		<div>
			<div class="d-flex justify-content-center mb-3">
				<i style="font-size: 100px; color: #0029ff;" class="fa fa-check-circle-o" aria-hidden="true"></i>
			</div>
			<h2>Scorecard submitted for this week</h2>
		</div>
	</div>
	<!-- ELSE -->

	<div enquiry-block class="bg-light shadow border mb-4 p-3 position-relative">

		<form id="metainfo">
			<div class="d-flex mt-2">
				<div class="col-6 d-flex">
					<div class="pb-4 pt-2" style="font-size: x-large; font-weight: 600; color: #0029ff;">Share Your Happiness</div>
				</div>
			</div>
			<div class="d-flex justify-content-center pb-4">
				<div class="col-8 pl-0">
					<div enquiry-block class="bg-white border mb-3 position-relative px-2">
						<div class="col-12 form-group pt-2 sdlms-text-primary-16px">
							<span id="Your_name" class="font-weight-500">Your Name</span>
						</div>
						<div class="form-group col-12">
							<input id="name" rows="1" name="name" type="text" class="form-control w-100" required />
						</div>
					</div>
					<div enquiry-block="" class="bg-white border mb-4 position-relative px-2">
						<div class="col-12 font-weight-500 form-group pt-2 sdlms-text-primary-16px">
							<span id="Your Organisation">Your Organisation</span>
						</div>
						<div class="form-group col-12">
							<div class="row">
								<div class="col-12">
									<select style="font-size: 14px; min-width: 40%;" value name="organization" id="company" class="form-control mr-3" required>
				    					<option id="org" value="">Select</option>
				    					<!-- BEGIN companies -->
				    					<option value="{companies.name}">{companies.name}</option>
				    					<!-- END companies -->
				    				</select>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div enquiry-block="" class="bg-white border mb-4 position-relative px-2">
						<div class="col-12 font-weight-500 form-group pt-2 sdlms-text-primary-16px">
							<span id="Your Lab">If you selected DeepThought, which Lab do you belong to?</span>
						</div>
						<div class="form-group col-12">
							<div class="row">
								<div class="col-12">
									<select style="font-size: 14px; min-width: 40%;" value="" name="lab" id="org-labs" class="form-control mr-3" required="">
				    					<option id="labs" value="">Select</option>
				    					<!-- BEGIN teams -->
				    					<option value="{teams.name}">{teams.name}</option>
				    					<!-- END teams -->
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="align-items-center col-4 d-flex justify-content-center">
					<img
						src="https://sdlms.deepthought.education/assets/uploads/files/happiness-1.svg"
						style="height: 290px; border-radius: 100%;"
						onerror="this.onerror=null;this.src='https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg';"
					/>
				</div>
			</div>
		</form>

		<form id="reflectionform">

			<!-- BEGIN questions -->

			<!-- IF (questions.type == "range")-->
			<div class="d-flex">
				<!-- IF (questions.emoji == "left")-->
				<div class="col-2">
						<div class="justify-content-center emoji" id="emoji_{questions.id}" style="font-size: 6em;">😄</div>
				</div>
				<!-- END -->
			    <div enquiry-block class="bg-white border mb-4 px-2 position-relative col-10">
			    	<div class="col-12 font-weight-500 form-group mb-3 pt-3 question-area sdlms-text-primary-16px">
						<span id="{questions.id}">
							<span class="font-weight-bold">Question {questions.id} : </span> {questions.value} <br>
							<span style="font-weight: 100; font-size: smaller;">{questions.helptext}</span>
						</span>
			    	</div>
			    	<div class="form-group col-12">
			    		<div class="row">
			    			<div class="col-12 answering-field-area">
			    				<label class="col-12 d-flex form-label m-0 p-0" style="font-size: x-small;"> 
			    					<span class="col-6 p-0">{questions.from}</span> 
			    					<span class="col-6 d-flex justify-content-end p-0">{questions.to}</span>
			    				</label>
			    				<input id="{questions.input_id}" class="range-input w-100" type="range" data-emoji-id="emoji_{questions.id}" range-selector name="{questions.value}" value="0" min="0" max="10" oninput="this.nextElementSibling.value = this.value" class="form-range w-100" required>
								<!-- IF (questions.emoji == "right") -->
			    				<output style="font-weight: 600; color: #0029ffd9;">0</output>
								<!-- END -->
								<!-- IF (questions.emoji == "left") -->
								<output style="font-weight: 600; color: #0029ffd9;" class="d-flex justify-content-end w-100">0</output>
								<!-- END -->
			    			</div>
			    		</div>
			    	</div>
			    </div>
				<!-- IF (questions.emoji == "right")-->
			        <div class="col-2">
			        	<div class="justify-content-center emoji" id="emoji_{questions.id}" style="font-size: 6em;">😄</div>
			        </div>
			    <!-- END -->
			</div>	
			<!-- END-->

			<!-- IF (questions.type == "text")-->
			    <div class="w-100 mt-2">
			    	<div enquiry-block="" class="bg-white border mb-4 px-2 position-relative">
						<div class="col-12 font-weight-500 form-group mb-3 pt-3 question-area sdlms-text-primary-16px">
							<span id="{questions.id}">
								<span class="font-weight-bold">Question {questions.id} : </span> {questions.value} <br>
								<span style="font-weight: 100; font-size: smaller;">{questions.helptext}</span>
							</span>
						</div>
			    		<div class="form-group col-12">
			    			<textarea id="{questions.input_id}" rows="4" name="{questions.value}" type="text" class="form-control w-100" style="resize:none" required></textarea>
			    		</div>
			    	</div>
			    </div>
			<!-- END-->

			<!-- IF (questions.type == "options")-->
			    <div class="w-100 mt-2">
			    	<div enquiry-block class="bg-white border mb-4 px-2 position-relative">
						<div class="col-12 font-weight-500 form-group mb-3 pt-3 question-area sdlms-text-primary-16px">
							<span id="{questions.id}">
								<span class="font-weight-bold">Question {questions.id} : </span> {questions.value} <br>
								<span style="font-weight: 100; font-size: smaller;">{questions.helptext}</span>
							</span>
						</div>
			    		<div class="form-group col-12">
							<!-- BEGIN questions.options-->
			    			<div class="form-check mb-2">
			    				<input class="form-check-input" type="radio" name="{questions.value}" value="{questions.options.value}" id="{questions.options.id}" required>
			    				<label class="form-check-label" for="{questions.options.id}">{questions.options.name}</label>
			    			</div>
							<!-- END questions.options -->
			    		</div>
			    	</div>
			    </div>
			<!-- END-->

		<!-- END questions -->

			<div class="w-100 d-flex justify-content-center">
				<button type="submit" class="border button-lg button-primary mx-3 sdlms-button">Submit</button>
			</div>
		</form>
	</div>

	<!-- ENDIF scorecard -->
</div>