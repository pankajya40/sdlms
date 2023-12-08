<style>

.outLine:focus{
      outline: none;
    }
    .sdlms-container { padding: 0!important; width: 100%!important; }
.card {
    border: none;
    border-radius: 10px
}

.c-details span {
    font-weight: 300;
    font-size: 13px
}

.icon {
    width: 50px;
    height: 50px;
    background-color: #eee;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 39px
}

.badge span {
    background-color: #0d6efd;
    width: auto;
    padding: 0 .25rem;
    height: 1.3rem;
/*     padding-bottom: 3px; */
    border-radius: 10px;  
    display: flex;
    color: white;
    justify-content: center;
    align-items: center
}


/* .text1 {
    font-size: 14px;
    font-weight: 500
} */

/* .text2 {
    color: #a5aec0
} */


</style>
<!-- IMPORT partials/sidebar.tpl -->

  
  
  
  <div class="sdlms-section session-view sdlms-form-elements shadow-none">
              
              <div class="sdlms-section-body border-0">
                <div>
                  
                  <div class="align-items-center d-flex mb-4 w-100" sdlms-assest-search-bar="">
                      <input type="text" id="score-card-search-bar" placeholder="Search..." class="font-weight-400 form-control sdlms-text-tertiary-16px w-50" spellcheck="false" data-ms-editor="true">
                      <label for="score-card-search-bar" style="position: relative; right: 35px;">
                          <i class="fa fa-search mt-2" style="color: #afafac;" aria-hidden="true"></i>
                      </label>
      <div class="d-flex justify-content-end w-100 outLine">
          
          <div class="dropdown outLine pr-5">
    <button class="btn dropdown-toggle outLine pr-5" type="button" id="filteringbtn" data-toggle="dropdown" aria-expanded="false">
      Filter
    </button>
    <div class="dropdown-menu">
        <!-- BEGIN data.types -->
        <a class="dropdown-item category"  data-value="{data.types.value" href="#">{data.types.label}</a>
        <!-- END data.types -->  
    </div>
  </div>
      </div>
                  </div>
                </div>
                
                <div class="openTickSec " id="openSec">
                    <!-- Outgoing request -->
                    
                    
                    
                </div>
                
                  
              </div>
          </div>
  
  <!-- IMPORT partials/footer.tpl -->