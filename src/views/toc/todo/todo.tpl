<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" rel="stylesheet" />
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

<!-- IMPORT toc/partials/style.tpl -->
<!-- IMPORT toc/partials/header.tpl -->
<div class="d-flex mb-4 mx-2 px-5 row w-100 ">
    <div style="flex: 2;" class="ml-3 p-5 bg-light common-border-radius">
        <!-- IMPORT toc/todo/partials/todomodal.tpl -->
    </div>
    <div style="flex: 1;" class="ml-4 mr-3">
        <canvas id="myChart" style="width: 100%; height: 300px;"></canvas>
        <p class="text-center">Eisenhower Matrix</p>
    </div>
</div>
<div class="px-5 w-100">
    <div class="bg-light common-border-radius d-flex justify-content-center mb-3 mx-4 px-2 py-3">
        <div class="row w-100">
            <div class="col-md-4">
                <div class="input-group">
                    <input type="text" class="form-control" id="search-input" placeholder="Search...">
                    <div class="input-group-append">
                        <span class="input-group-text"><i class="fa fa-search" aria-hidden="true"></i></span>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <select class="form-control urgency-button" id="urgency-select">
                    <option value="">All</option>
                    <option value="urgent">Urgent</option>
                    <option value="important">Important</option>
                    <option value="urgentandimportant">Urgent and Important</option>
                </select>
            </div>

            <div class="col-md-4">
                <select class="form-control" id="completestatus">
                    <option value="incomplete">Yet to complete</option>
                    <option value="complete">Completed</option>
                    <option value="">All</option>
                </select>
            </div>
        </div>
        <!-- <button class="btn btn-sm button-tertiary ml-2">Filter</button> -->
    </div>
    <div class="bg-light common-border-radius justify-content-center mb-3 mx-4 px-2 py-3">
        <p class="ml-2">Pending Tasks</p>
        <table class="px-4 table table-stripped">
            <tbody id="tasks">

            </tbody>
        </table>
    </div>
</div>
<div id="tasks-pagination"></div>
<!-- IMPORT toc/partials/footer.tpl -->
<!-- IMPORT toc/todo/partials/schedulemodal.tpl -->
<!-- IMPORT toc/todo/partials/edittodomodal.tpl -->