<div class="container mt-5">
	<div class="row mx-0">
		<a class="btn btn-dark border px-4 py-2" href="/observation/explore/all">
			<i class="fas fa fa-chevron-left mr-1 icons" aria-hidden="true"></i>
			<span>Back</span>
		</a>
	</div>
	<div id="submission-area">
		<div class="px-0 py-3">
			<div class="sdlms-article-builder-header mb-5">
				<h1 style="font-weight: 600;">{reflection.user.fullname}'s reflection</h1>
				<p class="d-flex mb-1" style="justify-content: space-between;">
					<span class="sdlms-text-black-20px">
						Company applied: <span style="color: blue;
						font-weight: 500;
						cursor: pointer;">{user.company}</span>
					</span>
					<span class='sdlms-text-black-20px' style="font-weight: 600; ">
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