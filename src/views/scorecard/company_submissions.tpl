<div class="container">

	<div id="email-action-prompt-area"></div>

	<div class="">
		<div id="output-table" class="mt-2 border">
			<sdlms-table>
				<table class="sdlms-my-upcoming-session-table w-100">
					<thead class="sdlms-my-upcoming-session-table-head secondary-header sdlms-text-white-18px font-weight-medium">
						<tr class="sdlms-my-upcoming-session-table-header-row">
							<th class=" font-weight-500">S.No</th>
							<th class=" font-weight-500">Organization</th>
							<th class=" font-weight-500">Status</th>
							<th class=" font-weight-500">Action</th>
						</tr>
					</thead>
					<tbody>
						<!-- BEGIN companies -->
						<tr class="sdlms-my-upcoming-session-table-row">
							<td class="Sno sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{companies.index}</td>
							<td class=" sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">{companies.name}</td>
							<td class=" sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
								<!-- IF companies.status -->
								{companies.status}
								<!-- ELSE -->
								--
								<!-- ENDIF companies.status -->
							</td>
							
							<td class="action sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
								<button view-scores data-href="/scorecard/happiness/submissions/organization/{companies.name}?start={params.start}&end={params.end}" style="width: 114px; font-size: 15px;" class="btn mx-1 btn-primary button-primary">
									View <i class="fa fa-chevron-right" style="font-size: 12px;" aria-hidden="true"></i>
								</button>

								<!-- IF companies.status -->
								<button 
									disabled
									style="width: 114px; font-size: 15px;" class="btn mx-1 btn-primary button-primary">
									Send <i class="fa fa-send" style="font-size: 12px;" aria-hidden="true"></i>
								</button>
								<!-- ELSE -->
								<button 
									broadcast-email
									data-email="{companies.email}"
									data-poc="{companies.poc}"
									data-self-reflection="{companies.selfReflection}"
									data-url="/scorecard/happiness/submissions/organization/{companies.name}?start={params.start}&end={params.end}" 
									style="width: 114px; font-size: 15px;" class="btn mx-1 btn-primary button-primary">
									Send <i class="fa fa-send" style="font-size: 12px;" aria-hidden="true"></i>
								</button>
								<!-- ENDIF companies.status -->
								
							</td>
						</tr>
						<!-- END companies -->
					</tbody>
				</table>
			</sdlms-table>

		</div>
	</div>
</div>