<div class="col-12 col-md-6 col-lg-4 mb-3">
	<div class="bg-light p-3 rounded cursor-pointer content-card" style="padding-bottom: 0px !important;">
		<div data-contentid="{data._id}">
			<div class="ml-0" style="width:100%;">
				<div class="">
					<div class="row">
						<div class="col-12">
							<div class="d-flex justify-content-between">
								<p class="font-weight-bold m-0 sdlms-text-white-16px text-dark text-ellipse">
									{data.title}
								</p>
								<div class="d-flex justify-content-end">
									<!-- IF data.approvalCount-->
									<span class="badge rounded-pill" style="border-radius:6px; background-color:rgb(107 255 107 / 50%); color:green; padding:5px 10px;">{data.approvalCount}
										Approvals</span>
									<!-- ENDIF data.approvalCount-->

								</div>
							</div>

							<p class="sdlms-text-white-14px text-dark m-0 text-ellipse">
							<span style="font-weight: 600;">Used As : </span>{data.usage}
							</p>

						</div>
					</div>
					<div class="mt-1 sdlms-text-white-14px text-dark text-ellipse-4 pr-0" style="min-height: 70px; width:117%;">
						{data.content}
					</div>
					<div class="d-flex justify-content-between" style="margin-top:15px;">
						<p class="sdlms-text-white-14px text-dark">Spotted by :
							{data.spotter.fullname}
						</p>
						<p class="sdlms-text-white-12px text-dark m-0" style="color: rgba(0, 0, 0, 0.5) !important;">
							{data.createdAt}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
