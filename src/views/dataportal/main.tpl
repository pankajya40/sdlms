<link href="https://cdn.datatables.net/1.13.3/css/jquery.dataTables.css">
<link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-datepicker@1.9.0/dist/css/bootstrap-datepicker3.min.css">
<link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/jQuery-QueryBuilder@2.6.2/dist/css/query-builder.default.min.css">

<div class="d-flex flex-row">
    <div id="dataportal-sidebar" class="p-2 bg-primary vh-100">
        <!--IF datasets.length -->
        <!-- BEGIN datasets -->
        <button class="d-flex flex-row justify-content-between" data-datasetid="{datasets._id}">
            <i class="fa-table fas align-self-center" aria-hidden="true"></i>
            <span>&nbsp;{datasets.name}</span>
        </button>
        <!-- END datasets -->
        <!-- ENDIF datasets.length -->
    </div>
    <div id="dataportal-main" class="p-2 d-flex flex-column">
        <h1 id="datasetName"></h1>
		<div id="groupBy"></div>
        <div id="datasetSchema"></div>
        <div id="filterContainer" style="display: none;">
            <div id="filter"></div>

            <div>
                <span>Note: </span>
            </div>

            <div class="btn-group">
                <button class="btn btn-warning reset" id="filter-reset" data-target="basic">Reset Filter</button>
            </div>
        </div>
        <button id="getDataButton" style="display: none;">Get Data</button>
        <button id="getCSVDataButton" style="display: none;">Download CSV</button>
        <div id="dataTableContainer"></div>
    </div>
</div>