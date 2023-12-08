<style>
    .custom-control-input {
        z-index: 100;
    }
</style>
<div class="row">
    <div class="col-md-12 mx-auto">
        <div class="session-view sdlms-form-elements sdlms-section">
            <div class="sdlms-section-header justify-content-between font-weight-500 sdlms-text-white-20px" tabheader style="box-shadow: 0 0 2px 0 #00000050;">
                <div class="sdlms-assets-tab cursor-pointer position-relative d-flex align-items-center sdlms-sessions-control" style="background: white;">
                    <div class="d-flex sdlms-asset-tab w-50 justify-content-center sdlms-sessions" data-type="navigation" data-navigate="-1" data-state="/dtthon/creator/dashboard">Dashboard</div>
                    <div class="d-flex sdlms-asset-tab w-50 justify-content-center sdlms-sessions active" data-type="navigation" data-navigate="-1" data-state="scorecard/dashboard">Scorecard</div>
                </div>
            </div>
            <div class="sdlms-section-body">
                <div class="pl-0 row justify-content-between">
                    <div class="col-4 sdlms-form-elements">
                        <div class="mb-4 p-0 d-flex align-items-center justify-content-between" sdlms-assest-search-bar="">
                            <input type="text" id="score-card-search-bar" placeholder="Search by Name of Scorecard" class="form-control sdlms-text-tertiary-16px font-weight-400" />
                            <label for="score-card-search-bar" style="position: relative; right: 35px;">
                                <i class="fa fa-search mt-2" style="color: #afafac;" aria-hidden="true"></i>
                            </label>
                        </div>
                    </div>
                    <div class="col-4 pt-2">
                        <input type="checkbox" id="myScorecard" checked /> <label for="myScorecard">Display my Scorecards</label>
                    </div>

                    <div class="dropdown">
                        <button class="sdlms-button button-primary button-lg mr-3 dropdown-toggle"
                         type="button" data-toggle="dropdown" aria-expanded="false">
                          Filter
                        </button>
                        <div id= "scorecard-filter" class="dropdown-menu">
                          <a data-value="all" class="dropdown-item" href="#">All</a>
                          <a data-value="published" class="dropdown-item" href="#" id="publish">Published</a>
                          <a data-value="draft" class="dropdown-item" href="#">Draft</a>
                        </div>
                      </div>
                </div>

                <div class="row scorecards"></div>
                <div class="d-flex justify-content-center pt-4" id="scorcard-pagination"></div>
            </div>
        </div>
    </div>
</div>
