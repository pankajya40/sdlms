<!-- IMPORT partials/sidebar.tpl -->
<section>
    <!-- IMPORT pdgms/leavesTracker/partials/new_leave.tpl -->
	<div class="">
		<div id="leave-action-prompt-area"></div>
		<div class="d-flex justify-content-between">
			<button class="btn btn-primary button-primary mb-4" data-toggle="modal" data-target="#newLeaveModal">
				<i class="fa fa-plus mr-1" aria-hidden="true"></i>
				Request leave
			</button>
		</div>

		<div>
			<h5 class="bold-font my-4">Applied leaves</h5>
			<div class="appliedleaves-table-body border"></div>
		</div>

		<div>
			<h5 class="bold-font my-4">Previouly applied leaves</h5>
			<div class="previousleaves-table-body border"></div>
		</div>

	</div>
</section>
<!-- IMPORT partials/footer.tpl -->