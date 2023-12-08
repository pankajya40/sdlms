class dtthon_template {
    constructor() { }

    static templates() {

        let storyboard_templates = {

            tab: function (tab, index) {
                let { storyboard_templates } = dtthon_template.templates()
                return `  <li task-list class=" cursor-pointer nav-link ${!index ? 'active' : ''}" id="v-pills-${index}-tab" data-toggle="pill" href="#v-pills-${index}" role="tab" aria-controls="v-pills-${index}" aria-selected="false" task-list>${tab.title}</li>
                <div class="status" style="color:#c4c4c4;">Not Worked Yet</div>
                <ul sub-asset style = "font-weight: lighter; list-style: disc;">${tab.assets.map(storyboard_templates.tab_status.bind(this)).join('')}</ul>   `
            },

            tab_status: function (tab) {
                return `<li><div task-list>${tab.asset_title}</div></li>`
            },
            container: function (tab, index) {
                var project_title = ajaxify.data.project.title
                let { asset_template } = dtthon_template.templates()
                return `<div class="tab-pane fade ${!index ? 'show active' : ''}" id="v-pills-${index}" role="tabpanel" aria-labelledby="v-pills-${index}-tab">
        <div class="sdlms-section session-view sdlms-form-elements">
            <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
                <div id="project_title" class="d-flex align-items-center sdlms-text-white-20px">You are taking challenges of ${project_title}</div>
            </div>
            <h1 class="taskHeading sdlms-text-black-22px task-heading mt-4 text-center">${tab.title}</h1>
            <div class="col-md-11" style="margin-left: 40px;">
                <div class="col-12 p-0 pt-4">
                    <div class="row" id="storyboard-asset${tab.id}">${tab.assets.map(asset_template.asset.bind(this)).join('')}</div>
                </div>
            </div>
        </div>
    </div>
    `;
            }
        }

        let journeyboard_templates = {
            addtaskbutton: function () {
                return `<div class="text-center p-4">
                           <img src="https://sdlms.deepthought.education/assets/uploads/files/files/frame.svg" alt="empty-task" />
                           <hr />
                           <h5>Your Storyboard seems to be empty</h5>
                           <p>Add Task Now!</p>
                           <button type="button" id="addtask" class="sdlms-button button-primary button-lg rounded-sm">Add Task</button>
                        </div>`
            }
        }


        let asset_template = {
            asset: function (data) {
                return `<div class="col-md-6 my-2 mx-auto">
        <div class="sdlms-section sdlms-form-elements">
            <div class="sdlms-section-header shadow-none secondary-header align-items-center justify-content-between p-1 pl-3">
                <div class="d-flex align-items-center sdlms-text-white-20px">
                    <div class="d-flex justify-content-center align-items-center w-100 cursor-pointer">
                        <span class="pt-1">${data.asset_title}</span>
                    </div>
                </div>
            </div>
            <div class="sdlms-section-body p-0">
                <div class="d-flex">
                    <div class="col-md-12 text-break p-0">We have to append assets here...
                        <div class="d-flex pt-3 px-4">
                            <div class="col-12 p-0 pb-2" style="">
                                ${data.asset_description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
            }
        }
        return {
            storyboard_templates, journeyboard_templates, asset_template
        };
    }
}
