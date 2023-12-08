<style>
.sdlms-container {
    padding: 0!important;
    width: 100%!important;
}
</style>

<!-- IMPORT partials/sidebar.tpl -->
<div class="row project-explore">
  <div class="col-md-12">
    <div class="sdlms-form-elements">
      <div class="col-12 col-md-7 col-lg-5 mb-4 p-0 d-flex align-items-center justify-content-between" sdlms-assest-search-bar="">
        <input type="text" id="dtthon-explore-search-bar" placeholder="Search by Name of Process" class="form-control sdlms-text-tertiary-16px font-weight-400" />
          <label for="dtthon-explore-search-bar" style="position: relative; right: 35px;">
            <i class="fa fa-search mt-2" style="color: #afafac;" aria-hidden="true"></i>
          </label>
      </div>
    </div>
    <div class="dtthon-explore-page row"></div>
    <div class="d-flex justify-content-center pt-4" id="explore-page-pagination"></div>
  </div>
</div>
   <!-- <div class="manage-project-btn">
        <button class="speed-dial__button speed-dial__button--primary" toc-btn>
            <img src="https://sdlms.deepthought.education/assets/uploads/files/files/toc-icon.svg" />
        </button>
    </div> -->




<!-- <div class="Dtthon-filter">
              <svg class="cursor-pointer dtthon-filter-icon" width="30" height="15" viewBox="0 0 34 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.2222 23H20.7778V19.1667H13.2222V23ZM0 0V3.83333H34V0H0ZM5.66667 13.4167H28.3333V9.58333H5.66667V13.4167Z"
                  fill="black" />
              </svg>
              <div class="sdlms-section-body p-0 Dtthon-filter-body" style="display: none;">
                <div class="type">
                  <div class="secondary-header sdlms-text-white-18px p-2 px-3 w-100">Type</div>
                  <div class="type-body  px-2 py-1 d-flex align-items-center">
                    <input type="checkbox"  name="Course" value="Course">
                    <label for="Course" class="ml-1 mb-0">Course</label>
                  </div>
                  <div class="type-body  px-2 py-1 d-flex align-items-center">
                    <input type="checkbox"  name="Project" value="Project">
                    <label for="Project" class="ml-1 mb-0">Project</label>
                  </div>
                  <div class="type-body  px-2 py-1 d-flex align-items-center">
                    <input type="checkbox"  name="Selection" value="Selection">
                    <label for="Selection" class="ml-1 mb-0">Selection</label>
                  </div>
                </div>
                <div class="type">
                  <div class="secondary-header sdlms-text-white-18px p-2 px-3 w-100">Level</div>
                  <div class="type-body  px-2 py-1 d-flex align-items-center">
                    <input type="checkbox"  name="Beginner" value="Beginner">
                    <label for="Beginner" class="ml-1 mb-0">Beginner</label>
                  </div>
                  <div class="type-body  px-2 py-1 d-flex align-items-center">
                    <input type="checkbox"  name="Intermediate" value="Intermediate">
                    <label for="Intermediate" class="ml-1 mb-0">Intermediate</label>
                  </div>
                  <div class="type-body  px-2 py-1 d-flex align-items-center">
                    <input type="checkbox"  name="Advanced" value="Advanced">
                    <label for="Advanced" class="ml-1 mb-0">Advanced</label>
                  </div>
                </div>
                <div class="type">
                  <div class="secondary-header sdlms-text-white-18px p-2 px-3 w-100">Sort By</div>
                  <div class="type-body  px-2 py-1 d-flex align-items-center">
                    <input type="checkbox"  name="CompanyName" value="CompanyName">
                    <label for="CompanyName" class="ml-1 mb-0">Company Name</label>
                  </div>
                  <div class="type-body  px-2 py-1 d-flex align-items-center">
                    <input type="checkbox"  name="PublishDate" value="Publish Date">
                    <label for="PublishDate" class="ml-1 mb-0">Publish Date</label>
                  </div>
                </div>
                <div class="m-2 pl-0 d-flex align-items-center justify-content-between">
                  <button type="button" class="sdlms-button button-primary button-md d-flex align-items-center mx-2" resetFilter>
                    <span class="sdlms-text-white-20px" >reset</span>
                  </button>
                  <button type="button" class="sdlms-button button-primary button-md d-flex align-items-center mx-2 " ApplyFilter>
                    <span class="sdlms-text-white-20px" >apply</span>
                  </button>
                </div>
              </div>
            </div> -->
            <!-- IMPORT partials/footer.tpl -->