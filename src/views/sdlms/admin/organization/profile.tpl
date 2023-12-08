<div class="row d-flex justify-content-center align-items-center h-100">
	<div class="col-12">
		<div class="card">
			<div class="rounded-top text-white d-flex flex-row justify-content-center organization-cover-img" style="background: url({coverImage.image}), #000; height:250px; background-size: cover; background-repeat: no-repeat;">
				<div class="d-flex flex-column" style="width: 150px; margin-top: 6rem;">
					<img src="{profileImage.image}" alt="Organization image" class="img-fluid img-thumbnail mt-4 mb-2" style="width: 150px; z-index: 1; border-radius: 50%;">
					
				</div>
			</div>
			<div class="text-black d-flex justify-content-between" style="background-color: #f8f9fa; min-height: 90px;">
				
					<div class="m-4" style="">
						<h5 class="bold-font">{organization.name}</h5>
						<p class="mb-0">
						<!-- IF address -->
							<i class="fa fa-map-marker-alt" aria-hidden="true"></i>
						{address}
						<!-- END -->
						</p>
					</div>
					<button id="edit-organization" data-id="{organizationId}" type="button" class="btn btn-primary button-primary my-auto mr-4 <!-- IF !organization.name --> mx-auto <!-- ENDIF !organization.name -->" style="z-index: 1;">
						EDIT PROFILE
					</button>
				
			</div>
			<div class="card-body p-4 text-black">
				<div class="mb-2">
					<p class="lead fw-normal mb-1 bold-font">About</p>
					<div class="py-2" style="">
						<p class="">{organization.about}</p>
					</div>
				</div>
                <div class="mb-5">
					<div class="p-3 row">

						<div class="px-3 col-12 col-md-3 text-center py-4 border">
                            <p class="mb-1 h6">Website</p>
                            <p class="small mb-0">
                                <a href="{organization.website}" style="color: #0029ff;">
                                    {website}
                                </a>
                            </p>
                        </div>
                        <div class="px-3 col-12 col-md-3 text-center py-4 border">
                            <p class="mb-1 h6">Sector</p>
                            <p class="small mb-0" style="color: #0029ff;">{organization.sector}</p>
                        </div>
                        <div class="px-3 col-12 col-md-3 text-center py-4 border">
                            <p class="mb-1 h6">Type</p>
                            <p class="small mb-0" style="color: #0029ff;">{organization.organizationType}</p>
                        </div>
						<div class="px-3 col-12 col-md-3 text-center py-4 border">
                            <p class="mb-1 h6">Employees</p>
                            <p class="small mb-0" style="color: #0029ff;">{organization.employeeRange}</p>
                        </div>

					</div>
				</div>
			</div>
		</div>
	</div>
</div>