<div class="row w-100 ml-0 position-relative">
	<div class="form-group col-6 col-lg-4 pr-lg-3">
		<input required name="company[payScale][{@index}][type]" placeholder="Type (e.g. Full time, Part time)" value="{company.payScale.type}" class="form-control"></input>
	</div>
	<div class="form-group col-6 col-lg-4 pr-lg-3">
		<input required type="number" name="company[payScale][{@index}][hours]" placeholder="Working hours" value="{company.payScale.hours}" class="form-control"></input>
	</div>
	<div class="form-group col-6 col-lg-4 pr-lg-3">
		<input required type="number" name="company[payScale][{@index}][amount]" placeholder="Amount per month" value="{company.payScale.amount}" class="form-control"></input>
	</div>

	<div class="position-absolute d-flex cursor-pointer" id="remove-payscale" style="right: 0; height: 40px;">
		<i class="fa fa-trash my-auto" aria-hidden="true"></i>
	</div>
</div>