 <style>
    .outLine:focus{
      outline: none;
    }
    .sdlms-container { padding: 0!important; width: 100%!important; }
  </style>
  
  <!-- IMPORT partials/sidebar.tpl -->

  
  
  <div class="sdlms-section session-view sdlms-form-elements shadow-none">
              
              <div class="sdlms-section-body border-0">
                <div>
                  
                  <div class="align-items-center d-flex mb-4 w-100" sdlms-assest-search-bar="">
                      <input type="text" id="score-card-search-bar" placeholder="Search workshops.." class="font-weight-400 form-control sdlms-text-tertiary-16px w-50" spellcheck="false" data-ms-editor="true">
                      <label for="score-card-search-bar" style="position: relative; right: 35px;">
                          <i class="fa fa-search mt-2" style="color: #afafac;" aria-hidden="true"></i>
                      </label>
      <div class="d-flex justify-content-end w-100 outLine">
          
          <div class="dropdown outLine pr-5">
    <button class="btn dropdown-toggle outLine pr-5" type="button" id="filteringbtn" data-toggle="dropdown" aria-expanded="false">
      Filter
    </button>
    <div class="dropdown-menu">
      <a class="dropdown-item" id="filter-peer" data-value="peer" href="#">Peer-Peer</a>
      <a class="dropdown-item" id="filter-mentee" data-value="mentee" href="#">Mentor-Mentee</a>
      
    </div>
  </div>
      </div>
                  </div>
                </div>


                
                <div class="outgoingTickSec " id="outSec">
                    <!-- Outgoing request -->
                    
                    
                    
                </div>
                
                  
              </div>
          </div>
  
  <!-- IMPORT partials/footer.tpl -->