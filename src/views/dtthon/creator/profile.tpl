<div id="create-profile-Preview" class="sdlms-section session-view sdlms-form-elements">
  <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between ">
    <div class=" align-items-center sdlms-text-white-20px" style="text-align:center;"><span class="sdlms-floating-left">
      <svg class="backBtn" width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z" fill="white" />
        <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4" />
      </svg></span>
      Create Profile for your Process
    </div>
    <span class="sdlms-floating-right d-none"> <svg id="Preview-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="30" width="30"><path d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z" fill="white"></path></svg>  </span>
  </div>
  <div class="sdlms-section-body">
    <div class="row px-lg-2">
        <div class="col-12 col-md-6">
            <div class="col-12 p-0">
                <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                    <div class="sdlms-floating-label label-style bold-medium-font">Title</div>
                    <textarea id="pTitle" class="form-control label-text" placeholder="Enter Text Here" name="project-title" rows="2">{project.title}</textarea>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="col-12 p-0">
                <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                    <div class="sdlms-floating-label label-style bold-medium-font">Image <span class="secondary-text"> (Optional) </span></div>
                    <textarea id="imageURL" class="form-control image-placeholder label-text" placeholder="Paste image URL here" name="content" rows="2">{project.project_image}</textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="row px-lg-2">
        <div class="col-12 col-md-6">
            <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                <div class="sdlms-floating-label label-style bold-medium-font">Trailer for your Process</div>
                <textarea id="short-description" class="form-control label-text discript-textarea" placeholder="Enter the quick trailer why you want people to apply on this project" name="project-title" rows="10" maxlength="500">{project.short_description}</textarea>
                <label class="holder">
                    <span class="sdlms-text-primary-12px"><span show-characters>0</span>/500</span>
                </label>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                <div class="sdlms-floating-label label-style bold-medium-font">Opportunity Description</div>
                <textarea id="pDescription" class="form-control label-text" name="content" rows="6" maxlength="2000" aria-hidden="true">{project.description}</textarea>
            </div>
        </div>
    </div>
    <div class="row px-lg-2">
      <div class="col-12 col-md-6">
          <div class="d-flex flex-column sdlms-floating-label-input mt-4 justify-content-between">
              <div class="sdlms-floating-label bold-medium-font">Learning Outcomes</div>
              <div class="sdlms-form-elements container col-12 pl-0 pr-0">
                  <textarea id="learnTask" class="form-control add-more-values" placeholder="Please enter the learning outcomes for the project" name="content" rows="1"></textarea>
                  <svg class="sdlms-floating-right" width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="#0029FF"></path>
                  </svg>
              </div>
              <div id="learnAddedTasks">
                  <!-- BEGIN project.learning_outcomes -->
                  <div class="col-12 pl-0 pr-0 taskAdded">
                      <div outcomes-content class="add-more-values px-2 pr-4 py-1 mt-1 sdlms-text-tertiary-14px">{@value}</div>
                      <svg delete-outcomes class="sdlms-floating-right delete" width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z"
                              fill="#0029FF"
                          ></path>
                      </svg>
                  </div>
                  <!-- END project.learning_outcomes -->
              </div>
          </div>
      </div>
      <div class="col-12 col-md-6">
          <div class="d-flex flex-column sdlms-floating-label-input mt-4 justify-content-between">
              <div class="sdlms-floating-label bold-medium-font">Pre-requisites</div>
              <div class="sdlms-form-elements container col-12 pl-0 pr-0">
                  <textarea id="preReqTask" class="form-control add-more-values" placeholder="Please enter the pre-requisites for the project" name="content" rows="1"></textarea>
                  <svg class="sdlms-floating-right" width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="#0029FF"></path>
                  </svg>
              </div>
              <div id="preReqAddedTasks">
                  <!-- BEGIN project.pre_requisites -->
                  <div class="col-12 pl-0 pr-0 taskAdded">
                      <div prerequisites-content class="add-more-values px-2 pr-4 py-1 mt-1 sdlms-text-tertiary-14px">{@value}</div>
                      <svg delete-prerequisites class="sdlms-floating-right delete" width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z"
                              fill="#0029FF"
                          ></path>
                      </svg>
                  </div>
                  <!-- END project.pre_requisites -->
              </div>
          </div>
      </div>
    </div>
    <div class="row px-lg-2">
      <div class="col-12 col-md-6">
        <div class="row">
          <div class="col-3 pr-0">
            <div class="d-flex flex-column align-items-center mt-4 justify-content-between">
              <select id="category" class="custom-select border-0" style="background-color:rgba(0, 0, 0, 0.05);  font-size: var(--sdlms-font-size-18); border-radius:0.50rem;">
                <option selected>Category</option>
                <option value="1" option-id="Project" class="dropdown-item p">Project</option>
                <option value="2" option-id="Course" class="dropdown-item c">Course</option>
                <option value="3" option-id="Selection" class="dropdown-item s">Selection</option>
                <option value="4" option-id="Event" class="dreopdown-item event">Event</option>
              </select>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="custom-commit" style="display:none">
              <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                <div class="sdlms-floating-label label-style bold-medium-font">Commit: Custom
                  <svg class="sdlms-floating-right custom-arrow" width="10" height="8" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.11523 10L9 3.81909L15.8848 10L18 8.09713L9 0L0 8.09713L2.11523 10Z" fill="black"/>
                  </svg>
                </div>
                <textarea id="commitment-input" class="form-control label-text" placeholder="Please enter commitment" name="content" rows="1" maxlength="50">{project.commitment}</textarea>
              </div>
            </div>
            <div id="id_commitment" class="mt-4">
              <select id="custom-commit-dropdown" class="custom-select border-0" style="background-color:rgba(0, 0, 0, 0.05);  font-size: var(--sdlms-font-size-18); border-radius:0.50rem;"">
                <option selected>Commitment</option>
                <option value="1" option-id="Part Time" class="dropdown-item">Part Time</option>
                <option value="2" option-id="Full Time" class="dropdown-item">Full Time</option>
                <hr class="m-0">
                <option value="3" option-id="Custom" class="dropdown-item custom-dropdown">Custom</option>
              </select>
            </div>
        </div>
      </div>
    </div>
    <!--  <div class="col-6">
        <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
          <div class="sdlms-floating-label label-style bold-medium-font">
            Deadline for the Project <span class="secondary-text"> (Optional) </span>
          </div>
          <input type="date" id="deadline" class="form-control label-text m-2 p-3" placeholder="" name="content" rows="2">
        </div>
      </div> -->
    </div>
    <div class="row pr-0 pt-4 d-flex align-items-center justify-content-center">
      <div class="justify-content-center">
        <button type="submit" id="createProject" data-tid="{project.tid}" class="sdlms-button button-primary button-md d-flex align-items-center">
            <!-- IF project.tid -->
                <!-- IF (clone == "1") -->Clone
                <!-- ELSE -->Update
                <!-- ENDIF (clone == "1") -->
            <!-- ELSE -->Create
            <!-- ENDIF project.tid --> Process Profile</button>
      </div>
    </div>
  </div>
</div>