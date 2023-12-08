<form id="mcqForm" class="d-flex flex-wrap">
    <div class="form-group col-6">
        <label>Title</label>
        <input type="text" name="title" required class="form-control">
    </div>
    <div class="form-group col-6">
        <label>Quiz</label>
        <select name="quizId" select2="quiz" required class="form-control"></select>
    </div>

    <div class="form-group col-12">
        <label>Questions</label>
        <div class="w-100" questions></div>
    </div>
    <div class="form-group col-12 d-flex justify-content-end">
        <button type="button" class="btn btn-primary" add-question>Add Question</button>
        <button type="submit" class="btn btn-primary ml-3">Save</button>
    </div>
</form>
