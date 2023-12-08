<div class="primary-bg py-3">
    <div class="secondary-bg py-3 rounded-lg">
        <div class="rounded-lg tertiary-bg container py-1">
            <p class="mb-0 font-14 secondary-text">Create Reflection Template</p>
        </div>

        <div class="pt-4 container">
            <form id="template-form">
                <div class="form-group" id="title-group">
                    <label class="font-12" for="title-field">Title of your reflection:</label>
                    <input type="text" class="form-control font-12" id="title-field" aria-describedby="title-field-ans">
                </div>
                <div class="form-group" id="pitch-group">
                    <label class="font-12" for="pitch-field">Give a brief pitch for your reflection</label>
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
                                    <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/delete.svg" alt="delete-icon" class="icon-15">
                                </button>
                            </div>
                            <input type="text" class="form-control font-12 question-field" id="q1"
                                aria-describedby="q1-ans">
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-between">
                    <button type="button" id="add-btn" class="button-brand rounded-lg button-md-p font-12">Add
                        Question</button>
                    <button type="submit" id="submit-btn" class="button-brand rounded-lg button-md-p font-12 asset-create-btn">Submit
                        Question</button>
                </div>
            </form>

        </div>

    </div>

</div>

<!-- IMPORT mobile/loader.tpl -->