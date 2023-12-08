<div class="container p-3">
    <div class="mcq-header py-3">
        <h5>{mcq.title}</h5>
    </div>
    <form id="submitMCQ"  class="needs-validation" novalidate>
        <!-- BEGIN mcq.questions -->
        <div class="card mb-3" question="{@index}" style="border-radius: 1rem;">
         <div class="card-body">
           <h6 class="card-title sdlms-text-black-20px">{mcq.questions.title}  <!-- IF mcq.questions.isRequired  --> <span class="position-absolute pt-1 pl-1 m-0  sdlms-text-black-25px line-height-1 text-danger">*</span> <!-- END mcq.questions.isRequired --></h6>
           <!-- BEGIN mcq.questions.options -->
           <div class="form-check mb-2">
            <input class="form-check-input" options="{@index}" type="<!-- IF mcq.questions.isMultiple -->checkbox<!-- ELSE -->radio<!-- END mcq.questions.isMultiple -->" 
                   name="questions[{mcq.questions.id}]" id="radio-{mcq.questions.options.id}" value="{mcq.questions.options.option}">
            <label class="form-check-label" for="radio-{mcq.questions.options.id}">
              {mcq.questions.options.option}
            </label>
            </div>
            <!-- END mcq.questions.options -->
         </div>
        </div>
        <!-- END mcq.questions -->

        <div class="form-group col-12 d-flex justify-content-end">
            <button type="submit" class="btn btn-primary ml-3">Submit</button>
        </div>
    </form>
</div>