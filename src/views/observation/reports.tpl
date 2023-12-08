<!-- IMPORT partials/sidebar.tpl -->
<section>

	<ul class="nav nav-pills nav-fill shadow mb-4">
		<li class="nav-item">
			<a class="nav-link h-100 active" href="/observation/report">Observation History</a>
		</li>
		<li class="nav-item">
			<a class="nav-link h-100 border" href="/observation/report/analytics">Analytics</a>
		</li>
	</ul>

	<div class="justify-content-center pt-4 mx-2">
		<h5 class="font-weight-700 mb-3">My reflections</h5>
		<div id="reflections-table" class="border">
			<sdlms-table>
				<table class="sdlms-my-upcoming-session-table w-100">
					<thead class="sdlms-my-upcoming-session-table-head secondary-header sdlms-text-white-18px font-weight-medium">
						<tr class="sdlms-my-upcoming-session-table-header-row">
							<th class="font-weight-500">S.No</th>
							<th class="font-weight-500">Date</th>
							<th class="font-weight-500">Reflection</th>
							<th class="font-weight-500">Action</th>
						</tr>
					</thead>
					<tbody>
						<!-- BEGIN reflections -->
						<tr data-id="{reflections._id}" class="sdlms-my-upcoming-session-table-row">
							<td class="Sno sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{reflections.index}</td>
							<td class="createdAt sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{reflections.createdAt}</td>
							<td class="name sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{reflections.content}</td>
							<td class="action sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
								<a href="/observation/reflections/view/{reflections._id}" style="font-size: 15px;" class="btn btn-primary button-primary">
									Read more <i class="fa fa-chevron-right" style="font-size: 12px;" aria-hidden="true"></i>
								</a>
							</td>
						</tr>
						<!-- END reflections -->
					</tbody>
				</table>
			</sdlms-table>

		</div>
	</div>

	<div class="justify-content-center pt-4 mx-2">
		<h5 class="font-weight-700 mb-3">Leaves taken</h5>
		<div id="reflections-table" class="border">
		<sdlms-table>
				<table class="sdlms-my-upcoming-session-table w-100">
					<thead class="sdlms-my-upcoming-session-table-head secondary-header sdlms-text-white-18px font-weight-medium">
						<tr class="sdlms-my-upcoming-session-table-header-row">
							<th class="font-weight-500">S.No</th>
							<th class="font-weight-500">Applied to</th>
							<th class="font-weight-500">From</th>
							<th class="font-weight-500">To</th>
							<th class="font-weight-500">Reason</th>
						</tr>
					</thead>
					
					<tbody>
						<!-- BEGIN leaves -->
						<tr data-id="{leaves._id}" class="sdlms-my-upcoming-session-table-row">
							<td class="Sno sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{leaves.index}</td>
							<td class="createdAt sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{leaves.user.fullname}</td>
							<td class="name sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{leaves.from}</td>
							<td class="name sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{leaves.to}</td>
							<td class="name sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{leaves.reason}</td>
						</tr>
						<!-- END leaves -->
					</tbody>
				</table>
			</sdlms-table>
		</div>
	</div>

</section>
<!-- IMPORT partials/footer.tpl -->