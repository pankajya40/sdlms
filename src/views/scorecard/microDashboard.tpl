<style>
    #preview-scorecard-modal .modal-dialog {
        position: relative;
        width: 70rem;
        max-width: 70rem!important;
        margin: 2rem auto;
    }
    #preview-scorecard-modal .modal-body {
        padding: 0;
    }
    #preview-scorecard-modal .modal-header {
        padding: 0.6rem;
    }
    .showdescription:hover {
        cursor: pointer;
    }
</style>

<div class="sdlms-section session-view sdlms-form-elements">
    <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
        <div class="align-items-center sdlms-text-white-20px" style="text-align: center;">
            <span class="sdlms-floating-left">
                <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg" back-btn="">
                    <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z" fill="white"></path>
                    <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4"></line>
                </svg>
            </span>
            <div id="pageTitle"></div>
        </div>
    </div>
    <div class="sdlms-section-body">
        <div class="filter-nav-bar">
            <div class="row mb-3">
                <div class="col-4 sdlms-form-elements">
                    <div class="d-flex align-items-center justify-content-between" sdlms-assest-search-bar="">
                        <input type="text" id="dtthon-explore-search-bar" placeholder="Search by Name of Applicant" class="form-control sdlms-text-tertiary-16px font-weight-400" />
                        <label for="dtthon-explore-search-bar" style="position: relative; right: 35px;">
                            <i class="fa fa-search mt-2" style="color: #afafac;" aria-hidden="true"></i>
                        </label>
                    </div>
                </div>
                <div class="col-8 d-flex align-items-center justify-content-end">
                    <button type="button" preview-scorecard-btn class="btn btn-success d-flex mr-3 p-1 px-2 sdlms-text-white-12px" data-toggle="modal" data-target="#preview-scorecard-modal" style="border-radius: 16px;">Preview <span class="fa fa-eye ml-1 my-auto" aria-hidden="true"></span></button>
                    <!-- IF (scorecard.isActive == true) -->
                        <!-- <button activate-scorecard-btn class="btn btn-danger d-flex mr-3 p-1 px-2 sdlms-text-white-12px" style="border-radius: 16px;">Deactivate<span class="fa fa-check-circle-o ml-1 my-auto" aria-hidden="true"></span></button> -->
                    <!-- ELSE -->
                        <!-- <button activate-scorecard-btn class="btn btn-success d-flex mr-3 p-1 px-2 sdlms-text-white-12px" style="border-radius: 16px;">Activate<span class="fa fa-check-circle-o ml-1 my-auto" aria-hidden="true"></span></button> -->
                    <!-- ENDIF -->
                    <!-- <svg deletescorecard class="cursor-pointer" width="14" height="20" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z"
                            fill="#0029FF"
                        ></path>
                    </svg> -->
                </div>
            </div>
            <div id="project-details"></div>
        </div>
    </div>
</div>

<div class="modal fade" id="preview-scorecard-modal" tabindex="-1" aria-hidden="true" aria-labelledby="scorecard-title">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="scorecard-title"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <div id="attribute-box"></div>
            </div>
        </div>
    </div>
</div>
