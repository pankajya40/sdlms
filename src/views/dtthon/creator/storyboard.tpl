<style>
    .enquiry-form-header {
        border-radius: 0px;
    }
</style>
<div class="row">
    <div class="col-2 pt-2">
        <span class="sdlms-floating-left">
            <svg class="backBtn" width="26" height="18" viewBox="0 0 26 18" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z" fill="#0029ff"></path>
                <line x1="5" y1="9" x2="26" y2="9" stroke="#0029ff" stroke-width="4"></line>
            </svg>
        </span>
    </div>
    <div class="w-100 d-flex justify-content-end col-10">
        <button class="sdlms-button button-primary cursor-pointer button-md sdlms-task-complete mr-3" id="finish-btn">Publish Process</button>
        <button class="sdlms-button button-primary cursor-pointer button-md sdlms-task-complete mr-3" id="edit-profile-btn">Edit Process Profile</button>
        <button class="sdlms-button button-primary cursor-pointer button-md sdlms-task-complete" id="delete-btn">Delete Process</button>
    </div>
</div>
<div id="create-task" class="mx-auto mt-4"></div>
<div class="col-md-4 p-md-2" collapse>
    <div class="dtThone-journey-board sdlms-section position-fixed"
        style="z-index: 5; left: 0; top: 77px; height: 100%; border-top-left-radius: 0; overflow:auto" collapse-right>
        <div class="sdlms-section-header justify-content-between align-items-center shadow-none secondary-header cursor-pointer font-weight-500 sdlms-text-white-22px d-flex"
            style="border-top-left-radius: 0px;">
            <div class="sdlms-text-white-17px text-center" collapse-header>
                Journey Board
            </div>
            <span class="pl-3">
                <i class="fa fa-arrow-circle-right" aria-hidden="true" style="font-size: x-large;"
                    collapse-menu-icon></i>
            </span>
        </div>
        <div class="sdlms-section-body w-100 p-3" style="overflow: scroll; height: 100%;">
            <div expanded-tasks>
                <ol></ol>
            </div>
            <div class="col-2" collapsed-tasks>
                <div number-list>
                </div>
            </div>
        </div>
    </div>
</div>



<div class="modal modal_outer right_modal fade" id="CreateForm" tabindex="-1" role="dialog"
    aria-labelledby="CreateSessionLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content border-0 py-0 rounded-0">
            <div class="modal-body overflow-auto p-0 rounded-0 pb-5">
            </div>
        </div>
    </div>
</div>