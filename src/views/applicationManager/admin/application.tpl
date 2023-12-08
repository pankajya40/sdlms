<div class="d-flex">
    <div class="col-2"><i class="fa fa-arrow-left cursor-pointer" aria-hidden="true" style="font-size: x-large;" id="back-btn"></i></div>
    <div class="col-7 d-flex justify-content-center mb-3">
        <h4 class="bold-font" style="color: #0029ff;">{project.name}</h4>
    </div>
    <div class="align-items-center col-3 d-flex justify-content-end pb-3 pl-3">
        <button type="button" class="align-items-center button-md button-primary d-flex sdlms-button cursor-pointer" id="assignment">Assignment</button>
    </div>
</div>
<div class="d-flex justify-content-center mb-2 row">
    <!-- BEGIN rubric.rubrics -->
    <div class="mb-3">
        <button data-id="{rubric.rubrics.id}" data-score="{rubric.rubrics.scale}" class="border button-md button-primary material-btn mx-3 sdlms-button score">{rubric.rubrics.shortCode}</button>
    </div>
    <!-- END rubric.rubrics -->
</div>
<div id="application-detail"></div>