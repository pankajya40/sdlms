<form id="quizForm" class="d-flex flex-wrap">
    <div class="form-group col-12">
        <label>Title</label>
        <input type="text" name="title" required class="form-control">
    </div>
  

    <div class="form-group col-12">
        <label for="date">Questions</label>
        <div class="w-100" questions>

        </div>
        <div class="w-100 d-flex justify-content-end">
            <button type="button" class="btn btn-primary" add-question>Add Question</button>
            <button type="submit" class="btn btn-primary ml-3">Save</button>
        </div>
    </div>

</form>