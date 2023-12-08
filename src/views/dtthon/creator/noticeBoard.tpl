<div class="sdlms-section session-view sdlms-form-elements">
    <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
        <div class="align-items-center sdlms-text-white-20px" style="text-align: center;">
            <span class="sdlms-floating-left">
                <svg class="backBtn" width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z" fill="white"></path>
                    <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4"></line>
                </svg>
            </span>
            Notice Board
        </div>
    </div>
    <div class="sdlms-section-body">
        <div class="notice-area">
            <form id="notice-form" class="notice-form" action="">
                <div class="form-group mb-3 col-12">
                    <label class="bold-font" for=""> Select a task to view notice</label>
                    <select name="" id="select-task" class="form-control" data-name="task">
                        <option value="">SELECT</option>
                        <!-- BEGIN tasks -->
                        <option id="{tasks.task_number}" data-task-number="{tasks.task_number}" value="{tasks.task_id}">Task {tasks.task_number}: {tasks.task_title}</option>
                        <!-- END tasks -->
                    </select>
                </div>
                <div class="form-group mb-3 col-12">
                    <label class="bold-font" for="createor-notice">Notice</label>
                    <textarea name="notice" style="text-align: left;" id="createor-notice" class="form-control" rows="10">{notice}</textarea>
                </div>
                <div class="d-flex justify-content-end">
                    <button id="update-notice-btn" type="submit" class="sdlms-button btn mr-3 px-3-2 button-primary">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>