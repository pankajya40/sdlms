<!-- IMPORT partials/sidebar.tpl -->
<section>

	<div class="row mx-0 mb-4">
	<!-- IF !disallowPost -->
		<a class="btn btn-secondary button-secondary border " href="/observation/reflections/create">
			<i class="fas fa fa-plus icons" aria-hidden="true"></i>
			<span>Add reflection</span>
		</a>
	<!-- ENDIF !disallowPost -->
	</div>
	<div>
	<div class="alert alert-dismissible alert-info fade mt-2 show timeline-content" role="alert" style="background: #ffffff;">
		<div class="d-flex">
			<div>
		        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
			        <span aria-hidden="true">×</span>
		        </button>
		        <p class="mb-0" reflectionNotice></p><br>
		        <p class="mt-0" reflectionNote ></p> 
		    </div>
		    <div>
			    <img src="https://res.cloudinary.com/duhtmh8hp/image/upload/v1682597179/17543960_2002.i515.001_modern_students_flat_icons-13_hrmyxl.jpg" width="120px">
		    </div>
		</div>
	</div>
	<div class="timeline justify-content-center mb-5">
	</div>
</div>
	<div class="reflections-area row">
		<!-- IF mode -->
		<!-- BEGIN reflections -->
		<div class="col-12 col-md-6 col-lg-4 my-2">
			<div class="card">
				<div class="card-body">
					<div class="chip">
						<img src="{reflections.user.picture}" alt="{reflections.user.fullname}" width="96" height="96">
						<span class="bold-medium-font">{reflections.user.fullname}</span>
					</div>
					<p class="card-text">{reflections.content}</p>
					<a href="{pageUrl}/all?id={reflections._id}" class="btn btn-primary bg-dark border-0 btn-sm">Read more</a>
				</div>
			</div>
		</div>
		<!-- END reflections -->
		<!-- ENDIF mode -->
	</div>
</section>
<!-- IMPORT partials/footer.tpl -->