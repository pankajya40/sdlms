<style>
.sdlms-container {
    padding: 0!important;
    width: 100%!important;
}
</style>

<!-- IMPORT partials/sidebar.tpl -->
<div class="row">
    <div class="col-md-12 mx-auto">
        <div class="sdlms-form-elements">
            <div class="col-12 col-md-7 col-lg-5 mb-4 p-0 d-flex align-items-center justify-content-between" sdlms-assest-search-bar="">
                <input type="text" id="dtthon-card-search-bar" placeholder="Search by Name of Process" class="form-control sdlms-text-tertiary-16px font-weight-400" />
                <label for="dtthon-card-search-bar" style="position: relative; right: 35px;">
                    <i class="fa fa-search mt-2" style="color: #afafac;" aria-hidden="true"></i>
                </label>
            </div>
        </div>
        <div class="row project-cards pt-3"></div>
        <div class="d-flex justify-content-center pt-4" id="dashboard-pagination"></div>
    </div>
</div>
<!-- <div class="manage-project-btn">
    <button class="speed-dial__button speed-dial__button--primary" toc-btn>
        <img src="https://sdlms.deepthought.education/assets/uploads/files/files/toc-icon.svg" />
    </button>
</div> -->
<!-- IMPORT partials/footer.tpl -->