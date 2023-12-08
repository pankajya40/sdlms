<!-- IMPORT partials/sidebar.tpl -->

<section>

	<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" rel="stylesheet" />

	<div class="sdlms-section session-view sdlms-form-elements">
		<div
			class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
			<div class="align-items-center sdlms-text-white-20px" style="text-align: center;">
				<div id="pageTitle">Have You Spotted Any Content? Fill This Form...</div>
			</div>
		</div>
		<div class="sdlms-section-body">

			<form class="form-data">
				<div class="row">
					<div class="col-6 form-group">
						<label for="title" class="bold-medium-font">Title</label>
						<input type="text" class="border form-control p-3 shadow-none" id="title"
							placeholder="Enter title for your content" />
					</div>
					<div class="col-6 form-group">
						<label for="usage" class="bold-medium-font">How we can use it?</label>
						<select class="custom-select" id="usage">
							<option value="" disabled selected hidden>Open this select menu</option>
							<!-- BEGIN sources.usage -->
							<option value="{sources.usage.value}">{sources.usage.name}</option>
							<!-- END sources.usage -->
						</select>
					</div>
				</div>

				<div class="form-group">
					<label for="content" class="bold-medium-font">Content Spotted</label>
					<textarea class="border form-control shadow-none content-description" id="content" rows="10"
						placeholder="Enter the content you spotted" style="border-radius: 0.5rem;"></textarea>
				</div>

				<div class="row">
					<div class="col-6 form-group">
						<label for="message" class="bold-medium-font">Why you think it is a content?</label>
						<textarea class="border form-control shadow-none" id="message" rows="5"
							placeholder="What interesting you found about this content?"
							style="border-radius: 0.5rem;"></textarea>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label for="source" class="bold-medium-font">Spotted from</label>
							<select class="custom-select" id="source">
								<option value="" disabled selected hidden="">Open this select menu</option>
								<!-- BEGIN sources.source -->
								<option value="{source.source.name}">{sources.source.name}</option>
								<!-- END sources.source -->
							</select>
						</div>
						<div class="form-group" for="source-name">
							<label for="title" class="bold-medium-font">Source/Group Name</label>
							<input type="text" class="border form-control p-3 shadow-none" id="source-name"
								placeholder="Enter source or group name" />
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-6 form-group">
						<div class="d-flex flex-column mt-4 justify-content-between">
							<label for="author" class="bold-medium-font">Name the person, who wrote it</label>
							<select user-name-select required data-value
								class="cursor-pointer label-radius align-item-center form-control pl-3" id="author"
								style="z-index: 1;"></select>
						</div>

					</div>
					<div class="col-6 form-group">

						<div class="d-flex flex-column mt-4 justify-content-between">
							<label for="nativePlatform" class="bold-medium-font">Where can we use it?</label>
							<select id="nativePlatform" class="custom-select" , required>
								<option value="" disabled selected hidden>e.g., Linkedin </option>

								<!-- BEGIN platforms-->
								<option name="{platforms.name}" value="{platforms.value}">{platforms.name}</option>
								<!-- END platforms -->
							</select>
						</div>
					</div>

				</div>

			</form>

			<div class="col-12 pr-3 d-flex align-items-center justify-content-end">
				<button id="submit-content"
					class="align-items-center button button-lg button-primary d-flex sdlms-button submit-button">Submit</button>
			</div>

		</div>
	</div>
</section>
<!-- IMPORT partials/footer.tpl -->