 class Task {
    constructor() {
        this.builder();
    }

    id() {
        var stamp = new Date().getTime();
        var uuid = "xxxxxxxx_xxxx_xxxx_yxxx_xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                var r = (stamp + Math.random() * 16) % 16 | 0;
                stamp = Math.floor(stamp / 16);
                return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
            }
        );
        return uuid.replaceAll("_", "-");
    }


    builder() {
      this.taskId = this.id();
      var taskID = this.taskId;

        console.log(taskID)
        var taskcontainer=taskID
        var task_html = `<div class="sdlms-section session-view sdlms-form-elements mt-4" id="${taskcontainer}" taskID="${taskID}">
        <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
            <div id="project_title${taskID}" class="d-flex align-items-center sdlms-text-white-20px"></div>
        </div>
        <h1 class="sdlms-text-black-22px mt-4 task-heading${taskID}" style="text-align: center;"></h1>
        <div class="col-md-11" style="margin-left: 40px; padding-bottom: 10px;">
            <div class="col-12 p-0 pt-4">
                <div class="d-flex align-items-center justify-content-end" create-assets style="padding-bottom: 10px;">
                    <button type="button" class="sdlms-button button-primary button-md d-flex align-items-center" create-asset-btn data-task-id="${taskID}">Add Asset</button>
                </div>
                <div class="row" id="storyboard-asset${taskID}"></div>
            </div>
        </div>
    </div>`

        $("#create-task").append(task_html);
        $(`#project_title${taskID}`).append(`Create Story for ${ajaxify.data.project.title}`);
    }

    getTaskId () {
      return this.taskId;
    }
}