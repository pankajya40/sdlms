<!-- IMPORT partials/sidebar.tpl -->
<section>

	<div class="">
		<div id="output-table" class="mt-2 border">
			<sdlms-table>
				<table class="sdlms-my-upcoming-session-table w-100">
					<thead class="sdlms-my-upcoming-session-table-head secondary-header sdlms-text-white-18px font-weight-medium">
						<tr class="sdlms-my-upcoming-session-table-header-row">
							<th class=" font-weight-500">S.No</th>
							<th class=" font-weight-500">Name</th>
							<th class=" font-weight-500">Email</th>
							<th class=" font-weight-500">Actions</th>
						</tr>
					</thead>
					<tbody>
						<!-- BEGIN processedItems -->
                        <tr data-requestid="638a0a41a8f7360c4007b466" class="sdlms-my-upcoming-session-table-row">
							<td class="Sno sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{processedItems.index}</td>
							<td class="name sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{processedItems.firstname} {processedItems.lastname}</td>
							<td class="email sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{processedItems.email}</td>
							<td class="action sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
								<div>
									<a href="{processedItems.url}" style="width: 140px; font-size: 15px;" data-view-url="" class="btn btn-primary button-primary mx-1">
										Download <i class="fa fa-download ml-1" style="font-size: 12px;" aria-hidden="true"></i>
									</a>
								</div>
							</td>
						</tr>
                        <!-- END processedItems -->
					</tbody>
				</table>
			</sdlms-table>

		</div>
	</div>

</section>
<!-- IMPORT partials/footer.tpl -->