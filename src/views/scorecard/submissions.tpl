<style>
	.page-scorecard-happiness .sdlms-container {
		padding: 0px !important;
		--max-container-width: 100% !important;
	}
</style>

<!-- IMPORT partials/sidebar.tpl -->
<section>
	<ul class="nav nav-pills nav-fill shadow mb-4">
		<li class="nav-item">
			<a class="nav-link h-100 active" href="/scorecard/happiness/submissions?start={params.start}&end={params.end}">All responses</a>
		</li>
		<li class="nav-item">
			<a class="nav-link h-100 border" target="_blank" href="/scorecard/happiness/submissions/organization?start={params.start}&end={params.end}">View company specific</a>
		</li>
	</ul>

	<form id="filter">
	<input type="hidden" name="start" >
	<input type="hidden" name="end" >
		<select class="form-select" id="org-filter" name="org" aria-label="Default select example">
			<option selected>Filter by company</option>
			<!-- BEGIN companies -->
			<option value="{companies.name}">{companies.name}</option>
			<!-- END companies -->
		</select>
	</form>

	<div class="">
		<div id="output-table" class="mt-2 border">
			<sdlms-table>
				<table class="sdlms-my-upcoming-session-table w-100">
					<thead class="sdlms-my-upcoming-session-table-head secondary-header sdlms-text-white-18px font-weight-medium">
						<tr class="sdlms-my-upcoming-session-table-header-row">
							<th class=" font-weight-500">S.No</th>
							<th class=" font-weight-500">Name</th>
							<th class=" font-weight-500">Organization</th>
							<th class=" font-weight-500">Submission time</th>
							<th class=" font-weight-500">Action</th>
						</tr>
					</thead>
					<tbody>
						<!-- BEGIN scorecardSubmissions -->
						<tr data-requestid="638a0a41a8f7360c4007b466" class="sdlms-my-upcoming-session-table-row">
							<td class="Sno sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{scorecardSubmissions.index}</td>
							<td class="name sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{scorecardSubmissions.meta.name}</td>
							<td class="email sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{scorecardSubmissions.meta.organization}</td>
							<td class="action sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
								{scorecardSubmissions.createdAt}
							</td>
							<td class="action sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
								<a href="/scorecard/happiness/submissions/{scorecardSubmissions._id}" style="width: 114px; font-size: 15px;" class="btn btn-primary button-primary">
									View <i class="fa fa-chevron-right" style="font-size: 12px;" aria-hidden="true"></i>
								</a>
							</td>
						</tr>
						<!-- END scorecardSubmissions -->
					</tbody>
				</table>
			</sdlms-table>

		</div>
	</div>
</section>
<!-- IMPORT partials/footer.tpl -->