<div class="modal fade" id="addmembers" tabindex="-1" role="dialog" aria-labelledby="addmembersLabel" aria-hidden="true">
	<div class="<!-- modal-dialog --> modal-lg" style="position: relative; width: 100%; margin: 2rem auto;" role="document">
		<div class="modal-content border-0 sdlms-section" style="height: auto;">
			<div class="modal-header primary-header sdlms-section-header align-items-center sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
				<h5 class="modal-title" id="addmembersLabel">Manage members</h5>
				<button type="button" class="close close-modal text-white" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">

				<section class="tabs-section">
					<div class="row">
						<div class="col-sm-5 col-lg-4">
							<ul class="nav nav-tabs flex-column mb-3 border h-100">
								<li class="nav-item border-bottom">
									<a class="nav-link bold-font active show" data-toggle="tab" href="#add-members">Add members</a>
								</li>
								<li class="nav-item border-bottom" id="organization-members">
									<a class="nav-link bold-font" data-toggle="tab" href="#list-members">All members</a>
								</li>
							</ul>
						</div>
						<div class="col-sm-7 col-lg-8 pr-4" style="min-height: 500px;">
							<div class="tab-content">
								<div class="tab-pane active show" id="add-members">
									<h5 class="bold-font mb-3">Add users to organization</h5>
									<form class="form-inline d-flex justify-content-center">
										<div class="input-group w-100 mb-3">
											<input type="text" id="search-users" style="height: 50px;" class="form-control" placeholder="Search username" aria-label="Search username" aria-describedby="basic-addon1">
										</div>
									</form>
									<div id="users-area" class="users-list-area"></div>
								</div>

								<div class="tab-pane" id="list-members">
									<h5 class="bold-font mb-3">Viewing existing members</h5>
									<form class="form-inline d-flex justify-content-center">
										<div class="input-group w-100 mb-3">
											<input type="text" id="search-memberlist" style="height: 50px;" class="form-control" placeholder="Search username" aria-label="Search username" aria-describedby="basic-addon1">
										</div>
									</form>

									<div id="memberlist-area">
										
						
									</div>
									

								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div class="modal-footer">
				<!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
				<button type="button" id="save-members" class="btn btn-primary button-primary">Save</button>
			</div>
		</div>
	</div>
</div>