<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" rel="stylesheet" />

<!-- IMPORT dtthon/creator/partials/associateSC.tpl -->
<!-- IMPORT dtthon/creator/partials/privateWindow.tpl -->

<style>
.select2-container{
    z-index: 1000000;
}
.select2-selection{
    width: 326px;
}
.sdlms-container {
    width: 1200px;
}
</style>
<div class="sdlms-section session-view sdlms-form-elements">

    <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
        <div class="align-items-center sdlms-text-white-20px" style="text-align: center;">
            <span class="sdlms-floating-left">
                <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg" back-btn>
                    <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z" fill="white"></path>
                    <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4"></line>
                </svg>
            </span>
            <div id="pageTitle"></div>
        </div>
    </div>

    <div class="sdlms-section-body">
            <div class="published-screen">
                <div class="row">
                    <div class="col-4 sdlms-form-elements">
                    <!--<div class="d-flex align-items-center justify-content-between" sdlms-assest-search-bar="">
                            <input type="text" id="dtthon-explore-search-bar" placeholder="Search by Name of Applicant" class="form-control sdlms-text-tertiary-16px font-weight-400" />
                            <label for="dtthon-explore-search-bar" style="position: relative; right: 35px;">
                                <i class="fa fa-search mt-2" style="color: #afafac;" aria-hidden="true"></i>
                            </label>
                        </div> -->
                    </div>                   
                    <div class="col-8 d-flex align-items-center justify-content-end">
                        <a href="/dtthon/applicant/profile/{project.tid}" id="join-storyboard" class="btn button-primary mr-1">Join
                        </a>
                        <div class="btn-group dropleft">
                            <button type="button" class="btn btn-secondary" data-toggle="dropdown" aria-expanded="false" style="background-color:white; border-color: white; color:#0029ff; border-radius: 5px;">
                                <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
                            </button>
                            <div class="dropdown-menu" style="width: 200px;">
                                <!-- IMPORT dtthon/creator/partials/editProjectDropdown.tpl -->
                            </div>
                        </div>
                    </div>   
                </div>     
                <div class="row mb-3 pl-3 d-flex justify-content-center sdlms-text-black-20px">
                <span applicant-detail-heading><b>{project.category} Detail</b></span>
                <span scorecard-detail-heading style="display: none;"><b>{project.category} Evaluation Detail</b></span>      
                </div>
                <div id="applicants-detail"></div>
                <div id="scorecard-detail" style="display: none;"></div>
            </div>
    </div>
</div>
