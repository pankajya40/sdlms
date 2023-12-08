<div class="primary-bg py-3">
    <div class="secondary-bg py-3 rounded-lg">
        <div class="rounded-lg tertiary-bg container py-1">
            <p class="mb-0 font-14 secondary-text">Create Thought Process Template</p>
        </div>

        <div class="pt-4 container">
            <form>
                <div class="form-group">
                    <label class="font-12" for="title-field">Title of your template:</label>
                    <input type="text" class="form-control font-12" id="title-field" aria-describedby="title-field-ans" name="title">
                </div>
                <div class="form-group">
                    <label class="font-12" for="pitch-field">Give a brief pitch for your thought process</label>
                    <textarea class="form-control font-12" id="pitch-field"
                        aria-describedby="pitch-field-ans" name="description"></textarea>
                </div>
                <div class="d-flex justify-content-end">
                    <input type="file" accept="image/*" class="d-none" id="img-input" name="files[image]">
                    <label for="img-input" class="rounded-lg button-md-p button-primary font-12 mb-0">Upload
                        template
                        icon</label>
                </div>
                <div id="blocks-container">
                    <div class="question-block mt-4">
                        <div class="form-group">
                            <div class="d-flex justify-content-between align-items-center">
                                <label class="font-12" for="q1">Enter question:</label>
                                <button type="button" class="remove-block-btn bg-transparent p-2 border-0">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                            <input type="text" class="form-control font-12 question-field" id="q1"
                                aria-describedby="q1-ans">
                            <label class="font-12" for="q1-summary">Enter a short summary for above
                                question:</label>
                            <input type="text" class="form-control font-12 summary-field" id="q1-summary"
                                aria-describedby="q1-summary-ans" maxlength="20">
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-between">
                    <button type="button" id="add-btn" class="button-brand rounded-lg button-md-p font-12">Add
                        Question</button>
                    <button type="submit" id="submit-btn" class="button-brand rounded-lg button-md-p font-12 asset-create-btn">Submit
                        Template</button>
                </div>
            </form>

        </div>

    </div>

</div>

<!-- IMPORT mobile/loader.tpl -->