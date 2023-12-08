<style>
	.page-scorecard-happiness .sdlms-container {
		padding: 0px !important;
		--max-container-width: 90% !important;
	}

	table {
		font-size: 12px;
	}

	table tr td,
	th {
		text-align: center !important;
	}

	table tr td {
		font-weight: 500;
	}

	th {
		color: #0029ff;
	}

	[parameters] {
		background-color: white;
		color: black;
		padding-left: 5rem !important;
		padding-right: 5rem !important;
	}

	[no] {
		background-color: white;
		color: black;
	}

	.number {
		/* background-color: powderblue; */
	}

	.table-bordered td, th {
    	border: 1px solid black!important;
	}

	::-webkit-scrollbar {
    width: 10px;
    background: #e7e7e7;
    height: 10px;
    scrollbar-width: 10px;
}

::-webkit-scrollbar-thumb {
    background: gray;
	border-radius: 5px;
}

#submissions-table_filter, #submissions-table_info {
	display: none;
}

</style>

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.2/css/jquery.dataTables.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.0.10/jspdf.plugin.autotable.min.js"></script>

<!-- IF isAdministrator -->
<div class="row justify-content-end mt-4">
	<button id="download-report" class="btn btn-primary button-primary">
	<i class="fa fa-download mr-1" aria-hidden="true"></i>
	Download report
	</button>
</div>
<!-- ENDIF isAdministrator -->

<div class="table-overflow my-4 pb-5">
	<table class="table table-bordered" id="submissions-table">
		<thead>
			<tr>
				<!-- BEGIN headers -->
				<th class="" {@value} style=" vertical-align: middle;" scope="col">{@value}</th>
				<!-- END headers -->
			</tr>
		</thead>
		<tbody>
			<!-- BEGIN rows -->

			<tr>
				<!-- BEGIN @value -->
				<!-- IF (@index == 0) -->
				<td class="p-2 {isNaN(@value)}" style="vertical-align: middle;">
					<!-- ELSE -->
				<td class="p-2 {isNaN(@value)}"
					style="vertical-align: middle; background-color: {getCellColorsFromNumber(@value)};">
					<!-- ENDIF (@index == 0) -->
					<div>{@value}</div>
				</td>
				<!-- END @value -->
			</tr>

			<!-- END rows -->
		</tbody>
	</table>

</div>