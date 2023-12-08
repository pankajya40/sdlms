<div class="modal fade" id="remove-mod-modal" tabindex="-1" aria-labelledby="remove-mod-modal-label"
    aria-hidden="true">
    <div class="modal-dialog p-4 m-0">
        <div class="modal-content secondary-bg rounded-10-px">
            <div class="modal-body">
                <div class="d-flex justify-content-center mb-1">
                    <p class=" font-medium text-center" id="remove-mod-text"></p>
                </div>
                <div class="d-flex justify-content-between px-5">
                    <button type="button" class="button-tertiary-brand-text font-14 border-0"
                        id="cancel-remove">Cancel</button>
                    <button type="button" class="button-tertiary text-danger font-14 border-0"
                        id="remove-final">Remove</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- add moderator modal -->
<div class="modal fade" id="add-mods-modal" tabindex="-1"
    aria-labelledby="add-mods-modal-Label" style="display: none;" aria-hidden="true">
    <div class="modal-dialog ">
        <div class="modal-content rounded-10-px bg-white shadow-sm">
            <div class="modal-header border-0 d-flex justify-content-between align-items-center">
                <form action="" class="form-group w-90 position-relative mb-0">
                    <input type="text" id="add-mod-input" class="form-control text-center rounded-10-px"
                        placeholder="Search for moderators">
                </form>
                <button class="button-tertiary-brand-text-v2 button-sm-p" id="cancel-add-mod">Cancel</button>
            </div>

            <div class="modal-body">
                <div class="d-flex flex-column justify-content-center align-items-center overflow-auto mb-4" id="add-mod-body"></div>
                <div class="d-flex justify-content-center">
                    <button class="button-brand rounded-lg" id="add-mod-btn">Add Moderator</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="primary-bg">
    <!-- header -->
    <div class="fixed-top dr-header d-flex container align-items-center py-1 shadow-sm secondary-bg">
        <div class="dr-name d-flex align-items-center">
            <i class="fas fa fa-solid fa-arrow-left mr-2" id="back-btn"></i>
            <img src="" alt="tesla roadster"
                class="header-img circle-sm rounded-circle mr-1 img-cover">
            <div class="d-flex flex-column justify-content-center">
                <p class="font-bold font-14 mb-0 dr-title"></p>
                <p class="font-10 mb-0">Moderators List</p>
            </div>
        </div>
    </div>

    <div class="pt-5">
        <div class="rounded-10-px secondary-bg component-full pb-20-px">

            <img src="" alt="static-banner"
                class="header-img height-160 component-full rounded-top-10-px img-cover">

            <div class="container mt-3">
                <p class="brand-text font-10 mb-0">Discussion Room</p>
                <p class="font-18 dr-title"></p>
                <p class="mt-3 font-14 mb-2">Moderator's List:</p>

                <div id="mod-list"></div>

                <div class="d-none justify-content-between mt-5 pb-30-px" id="mod-btns">
                    <button type="button" class="button-primary font-10 font-medium border-0 button-sm-p floating-right"
                        id="edit-mods-btn">Edit
                        Moderators</button>
                    <button type="button" class="button-primary font-10 font-medium border-0 button-sm-p d-none"
                        id="add-mods-btn">Add
                        Moderator</button>
                    <button type="button" class="button-primary font-10 font-medium border-0 button-sm-p d-none"
                        id="save-mods-btn">Save
                        Changes</button>
                </div>

            </div>
        </div>
    </div>
</div>

