<style>
  .outLine:focus{
    outline: none;
  }
  .sdlms-container { padding: 0!important; width: 100%!important; }
</style>

<!-- IMPORT partials/sidebar.tpl -->
<br>
<div class="container border py-4 shadow px-lg-4">
	<form class="" style="">
		<div class="form-group mb-0" style=''>

			<input type="email" class="form-control text1" id="exampleFormControlInput1" placeholder="Broadcast Name">
		</div>
		<br>

		<div class="" style="">
			<input type="file" class="border" name="csv" id="csv" accept="text/csv">
			<button type="button" class="btn-danger btn" id="resetUpload" style='width: 100px;'>
				Clear
			</button>
		</div>
		
		<div class="form-group row value-grp">
			<div class="dropdown my-auto col-12 col-md-4">
				<select name="channel" id="channel-dropdown" style="font-size: 14px;" class="form-control w-100">
					<option hidden value="" selected>Select channel</option>
					<!-- BEGIN channels -->
					<option value="{channels.value}">{channels.name}</option>
					<!-- END channels -->
				</select>
			</div>

			<div class="col-12 col-md-8" id="channelId" style="display: none;">
				<input required type="text" class="form-control" id="templateId" placeholder="Please enter WATI Template Id">
			</div>

            <div class="col-12 col-md-8" id="subject" style="display: none;">
				<input required type="text" class="form-control" id="emailSubject" placeholder="Please enter the subject">
			</div>
		</div>

		<div class="row side-btn-top">
			<div class="col-12 col-md-3 col-lg-2" id="buttons">

			</div>
			<div class="col-12 col-md-9 col-lg-10">
				<textarea class="form-control append" id="exampleFormControlTextarea3" rows="11"></textarea>
			</div>
			<div id="uid" class="ml-auto">

			</div>
		</div><br><br>
		<div class="row">
			<div class="col-9"></div>
			<div class="col-5" style='display:flex;justify-content: end;align-items:center;margin-left: 58.9%;'>
                    <div class='m-2'>
                        <button type="button" class="btn-m button-lg sdlms-button button-primary" style='width:141px'>Save as draft
                        </button>
                    </div>

                    <div class='m-2'>
                        <button type="reset" class=" btn-m button-lg sdlms-button button-primary" id="reset">Reset
                        </button>
                    </div>

                    <div class='m-2'>
                        <button type="button" class=" btn-m button-lg sdlms-button button-primary"
                            id="submit">Submit
                        </button>
                    </div>
                </div>
		</div>
	</form>
</div>

<!-- IMPORT partials/footer.tpl -->
