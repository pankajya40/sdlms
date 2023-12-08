<style>
  .outLine:focus{
    outline: none;
  }
  .sdlms-container { padding: 0!important; width: 100%!important; }
</style>

<!-- IMPORT partials/sidebar.tpl -->
<div class="container" style='margin-top: 25px;'>
	<div class="sdlms-form-elements"style='box-shadow:rgb(14 30 37 / 12%) 0px 2px 4px 0px, rgb(14 30 37 / 32%) 0px 2px 16px 0px;padding: 35px 30px;margin-top: -20px;margin-left: -64px;'>
		<div class="form-group">
			<div class="mb-3">
				<label for="templateName" class="form-label">Template name</label>
				<input type="text" value="{templateData.templateName}" class="form-control" id="templateName" placeholder="Enter name of the template">
			</div>
			<div class="mb-3">
				<label for="templateName" class="form-label">Compatiable Channel</label>
				<select class="form-select form-control" id="compatibleChannel" name="compatiableChannel">
                <option hidden value="">Channel</option>
                <!-- BEGIN channels -->
                <option value="{channels.value}">{channels.name}</option>
                <!-- END channels -->
				</select>
			</div>
			<div class="mb-3">
				<label for="" class="form-label">Template content</label>
				<textarea id="template-content" class="form-control append" rows="11"></textarea>
			</div>
		</div>
			<div class="row mx-0 justify-content-end">
				<button id="save-template" class="btn btn-primary button-primary">Save template</button>
			</div>
	</div>

</div>

<!-- IMPORT partials/footer.tpl -->
