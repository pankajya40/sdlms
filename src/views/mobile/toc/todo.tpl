<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<style>
	.sdlms-container {
		padding: 0 !important;
		width: 100% !important;
	}

	.container-sdlms {
		min-height: 100%;
		width: calc(var(--max-container-width));
		margin: auto;
		padding: calc(var(--primary-spacing)*1.2) var(--primary-spacing);
	}
</style>
<div class="pt-4">
	<div class="container">
		<div class="d-flex justify-content-end pb-2">
			<div class="custom-control custom-switch">
				<input type="checkbox" class="custom-control-input" id="complete-task">
				<label class="custom-control-label light-text pt-1 todo-complete-task" for="complete-task">Completed Tasks</label>
			</div>
		</div>
	</div>
</div>

<div class="container">
	<div class="justify-content-center row todo-container"></div>
</div>

<div class="d-flex fixed-bottom justify-content-end p-3">
	<div class="square-60-px rounded-circle bordered-brand-btn mb-2" data-toggle="modal" data-target="#todoModal">
		<button class="info-button">
			<i class="fa fa-plus" aria-hidden="true"></i>
		</button>
	</div>
</div>

<!-- IMPORT mobile/toc/partials/todoModal.tpl -->