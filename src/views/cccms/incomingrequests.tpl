<style>
  .outLine:focus{
    outline: none;
  }
  .sdlms-container { padding: 0!important; width: 100%!important; }
</style>

<!-- IMPORT partials/sidebar.tpl -->
<div class="modal fade" id="acceptTicket-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="position: relative; width: 100%; margin: 2rem auto;">
    <div class="modal-content border-0 sdlms-section" style="height: auto;">
      <div class="modal-header sdlms-section-header primary-header sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
        <h5 class="modal-title" id="exampleModalLabel">Fill details to Accept</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <form  id="create-form">
      <div class="modal-body sdlms-section-body">
          
          <div class="form-group" >
            <label for="message-text"  class="col-form-label">Objectives:</label>
            <input id="objectives" class="form-control" name="objectives[0]" >
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Kpis:</label>
            <input id="objectives" class="form-control" name="kpis[0]" >
          </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" id="declineTicket" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" id="acceptTicket" class="btn btn-primary">Accept Request</button>
      </div>
    </form>
    </div>
  </div>
</div>
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
    <a class="dropdown-item" id="filter-mentor" data-value="mentor" href="#">Mentor-Mentee</a>
    
  </div>
</div>
    </div>
                </div>
              </div>


              <div class="incomingTickSec" id="inSec">
                  <!-- Incoming request -->
                  
                  
                  
              </div>
              
            </div>
        </div>
        

<!-- IMPORT partials/footer.tpl -->