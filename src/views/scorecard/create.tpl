   <div class="sdlms-section session-view sdlms-form-elements">
       <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between d-flex">
           <span class="sdlms-floating-left">
               <svg class="backBtn" width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z" fill="white"></path>
                   <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4"></line>
               </svg>
           </span>
           <div class="align-items-left sdlms-text-white-20px ml-4">
               <div id="pageTitle"></div>
           </div>
           <div class="d-flex">
            <i edit-title-scorecard class="fa fa-edit mr-3 cursor-pointer" style="color: #ffffff;font-size: 25px;" aria-hidden="true"></i>
               <svg deletescorecard="" class="cursor-pointer" width="25" height="25" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z" fill="#FFFFFF"></path>
            </svg>
        </div>
       </div>
       <div class="sdlms-section-body socialscorecard">
           <div class="d-flex">
               <textarea id="parameter-title" class="form-control label-text m-1" placeholder="Enter Title for parameter" name="content" rows="1"></textarea>
               <textarea id="parameter-desc" class="form-control label-text m-1" placeholder="Enter Description" name="content" rows="1"></textarea>
           </div>
           <div class="d-flex m-1 mt-2">
               <button type="button" id="add-btn" class="sdlms-button button-primary button-md d-flex align-items-center">Add parameter</button>
               <!-- <button type="button" id="choose-btn" class="sdlms-button button-primary button-md d-flex align-items-center ml-1" disabled>View Templates</button> -->
           </div>
           <br>
          <div class="emptyattributecontainer" id="element">
          </div>
           <!-- <div class="sdlms-section">
         <div class="sdlms-section-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"
               style="position: absolute;top: -10px; left: -10px;">
               <circle cx="15" cy="15" r="15" fill="#D9D9D9"></circle>
               <path
                  d="M20.5 11H18.5V9.75C18.5 9.19844 18.0516 8.75 17.5 8.75H12.5C11.9484 8.75 11.5 9.19844 11.5 9.75V11H9.5C9.22344 11 9 11.2234 9 11.5V12C9 12.0688 9.05625 12.125 9.125 12.125H10.0687L10.4547 20.2969C10.4797 20.8297 10.9203 21.25 11.4531 21.25H18.5469C19.0813 21.25 19.5203 20.8313 19.5453 20.2969L19.9312 12.125H20.875C20.9438 12.125 21 12.0688 21 12V11.5C21 11.2234 20.7766 11 20.5 11ZM17.375 11H12.625V9.875H17.375V11Z"
                  fill="black"></path>
            </svg>
            <div class=" align-items-center font-weight-500" style="text-align:center;"><span
               class="sdlms-floating-left">
               </span>Parameter Name
            </div>
         </div>
         <div class="sdlms-section-body">
            <div class="container">
               <div class="row">
                  <div class="col-sm">
                     <div class="sdlms-section">
                        <div class="sdlms-section-header secondary-header text-white">
                           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                              viewBox="0 0 30 30" fill="none"
                              style="position: absolute;top: -10px; left: -10px;">
                              <circle cx="15" cy="15" r="15" fill="#D9D9D9"></circle>
                              <path
                                 d="M20.5 11H18.5V9.75C18.5 9.19844 18.0516 8.75 17.5 8.75H12.5C11.9484 8.75 11.5 9.19844 11.5 9.75V11H9.5C9.22344 11 9 11.2234 9 11.5V12C9 12.0688 9.05625 12.125 9.125 12.125H10.0687L10.4547 20.2969C10.4797 20.8297 10.9203 21.25 11.4531 21.25H18.5469C19.0813 21.25 19.5203 20.8313 19.5453 20.2969L19.9312 12.125H20.875C20.9438 12.125 21 12.0688 21 12V11.5C21 11.2234 20.7766 11 20.5 11ZM17.375 11H12.625V9.875H17.375V11Z"
                                 fill="black"></path>
                           </svg>
                           Rubric 1
                        </div>
                     </div>
                     <div class="sdlms-section-body">
                        <div class="row m-1">
                           <div class="col-5 ">
                              <div class="row">
                                 <div class="row">
                                    <div class="d-flex">
                                       <button class="col-sm minus sdlms-button button-tertiary">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                             height="16" fill="currentColor" class="bi bi-dash-lg"
                                             viewBox="0 0 16 16">
                                             <path fill-rule="evenodd"
                                                d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z">
                                             </path>
                                          </svg>
                                       </button>
                                       <input type="number" placeholder="0"
                                          class="col-sm label-text form-control">
                                       <button class=" col-sm plus sdlms-button button-tertiary">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                             height="16" fill="currentColor" class="bi bi-plus-lg"
                                             viewBox="0 0 16 16">
                                             <path fill-rule="evenodd"
                                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z">
                                             </path>
                                          </svg>
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-6">
                              <input class="label-text form-control ml-2"
                                 placeholder="Sub-parameter name">
                           </div>
                           <div class="col=1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                 fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                 <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z">
                                 </path>
                              </svg>
                           </div>
                        </div>
                        <div class="row justify-content-center">
                           <button class="sdlms-button button-primary button-lg ">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                 fill="currentColor" class="bi bi-plus-lg mr-1" viewBox="0 0 16 16">
                                 <path fill-rule="evenodd"
                                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z">
                                 </path>
                              </svg>
                              Add New
                           </button>
                        </div>
                     </div>
                  </div>
                  <div class="col-sm">
                  </div>
               </div>
            </div>
         </div>
      </div> -->
       </div>
   </div>
   <div class="pl-0 mt-4 d-flex align-items-center justify-content-end scorecardbuttoncontainer">
      <button type="button" id="publishbutton" class="sdlms-button button-primary button-lg d-flex align-items-center">Publish Scorecard</button>
  </div>
