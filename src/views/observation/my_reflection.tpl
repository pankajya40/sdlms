<!-- IMPORT partials/sidebar.tpl -->
<section>

	<div class="container">
		<div id="submission-area">
			<div class="px-0">
				<div class="sdlms-article-builder-header mb-3">
					<h4 class="text-body pb-0" style="font-weight: 600;">{profile.name}'s reflection</h4>
					<p class="d-flex mb-1" style="justify-content: space-between;">
						<span class="sdlms-text-black-18px" style="font-weight: 600; ">
							{reflection.createdAt}
						</span>
					</p>
				</div>
				<div class="sdlms-article-builder-container mb-2 sdlms-text-black-20px text-justify" style="word-wrap: break-word;">
					{reflection.content}
				</div>
			</div>

		</div>
	</div>

</section>
<!-- IMPORT partials/footer.tpl -->