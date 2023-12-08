<div class="container mt-5">
	<div id="submission-area">
		<div class="p-3">
			<div class="sdlms-article-builder-header mb-5">
				<h1 style="font-weight: 600;">{user.name}'s reflection</h1>
				<p class="d-flex mb-1" style="justify-content: space-between;">
					<span class="sdlms-text-black-20px">
						Company applied: <span style="color: blue;
						font-weight: 500;
						cursor: pointer;">{user.company}</span>
					</span>
					<span class='sdlms-text-black-20px' style="font-weight: 600; ">
						{submission.createdAt}
					</span>
				</p>
			</div>
			<div class="sdlms-article-builder-container mb-2 sdlms-text-black-20px text-justify" style="word-wrap: break-word;">
				{submission.reflection}
			</div>
		</div>

	</div>
</div>