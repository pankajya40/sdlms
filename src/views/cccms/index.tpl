<style>
  .outLine:focus{
    outline: none;
  }
  .select2-container{
    z-index: 105000;
    width: 100%;
  }
  .sdlms-container { padding: 0!important; width: 100%!important; }
  .hovertext {
  position: relative;
  border-bottom: 1px dotted black;
}

.hovertext:before {
  content: attr(data-hover);
  visibility: hidden;
  opacity: 0;
  width: 140px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px 0;
  transition: opacity 0.5s ease-in-out;

  position: absolute;
  z-index: 1;
  left: 0;
  top: 110%;
}

.hovertext:hover:before {
  opacity: 1;
  visibility: visible;
}


.caro-image{
  box-shadow: rgb(67 71 85 / 27%) 0px 0px 0.25em, rgb(90 125 188 / 5%) 0px 0.25em 1em;

}
#sync1 .item {
  box-shadow: rgb(67 71 85 / 27%) 0px 0px 0.25em, rgb(90 125 188 / 5%) 0px 0.25em 1em;
    background: #FFFFFF;
    padding: 24px 34px;
    color: #FFF;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    text-align: center;
    width: 65%;
    margin-top: 28px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom:4px
}


.owl-theme .owl-nav {
  /*default owl-theme theme reset .disabled:hover links */
  margin-top: -2px;
}
.owl-theme .owl-nav [class*='owl-'] {
  transition: all .3s ease;
}
.owl-theme .owl-nav [class*='owl-'].disabled:hover {
  background-color: #D6D6D6;
}

#sync1.owl-theme {
  position: relative;
}
#sync1.owl-theme .owl-next, #sync1.owl-theme .owl-prev {
  width: 22px;
  height: 40px;
  margin-top: -20px;
  position: absolute;
  top: 50%;
}
#sync1.owl-theme .owl-prev {
  left: 17%;
}
#sync1.owl-theme .owl-next {
  right: 17%;
}
.ifrm{border:none; width:100%;margin-top:50px;}

.owl-nav{
    margin-top: 176px;
    display: flex;
    justify-content: space-between;
}

.cards{
  transition:0.3s;
}
.cards:hover{
  transform: scale(1.02);
}

#sidebar-title{
  display : none
}

#sidebar-wrapper{
  width: 5%
}
#sidebar-wrapper .icons {
  margin-left:12px;
  font-size: 20px
}

</style>

<!-- IMPORT partials/sidebar.tpl -->

<!-- Create Ticket Modal -->
 <div class="modal fade" id="createTicketModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ">
        <div class=" modal-dialog" style="position: relative; width: 100%; margin: 2rem auto;">
        <div class="modal-content border-0 sdlms-section" style="height: 500px;margin-top: 100px;width: 175%;
          margin-left: -170px;">
            <div class="modal-header sdlms-section-header primary-header sdlms-text-white-20px" style="height: 56px;">
                <h5 class="modal-title" style='margin-left: auto;' id='title-modal'></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="create-form">
                <div class="modal-body sdlms-section-body" style='height: 92%'>


                    <div id="sync2" class="owl-carousel owl-theme" id='carousel-part'>
                        <div class="item" style='margin: 53px 0px 115px 0px;'  id='first-slide'>
                            <div
                                style='display: flex;justify-content: center; flex-direction: column;text-align: center;height: 95%;'>
                                <div style='margin-top: 16px;width: 100%;margin-left: auto;margin-right: auto;'>
                                    <button type="button" data-toggle="modal"
                                        class="button-lg sdlms-button button-primary"
                                        style='width: 95%;padding: 14px 10px;margin-top: 22px;'>
                                        <span class="sdlms-text-white-20px">Find A Mentor</span>
                                    </button>
                                </div>
                                <div style='margin-top: 30px;width: 100%;margin-left: auto;margin-right: auto;'>
                                    <button type="button" data-toggle="modal"
                                        class="button-lg sdlms-button button-primary"
                                        style='width: 95%;padding: 14px 10px;'>
                                        <span class="sdlms-text-white-20px">Find A Peer</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="item" style='margin: 53px 0px 115px 0px;' id='second-slide'>
                            <div
                                style='display: flex;justify-content: center; flex-direction: column;text-align: center;height: 95%;'>
                                <div style='margin-top: 16px;width: 100%;margin-left: auto;margin-right: auto;'>
                                    <button type="button" data-toggle="modal" data-target="#createTicketModal2"
                                        class="button-lg sdlms-button button-primary"
                                        style='width: 95%;padding: 14px 10px;margin-top: 22px;'>
                                        <span class="sdlms-text-white-20px">Open To All</span>
                                    </button>
                                </div>
                                <div style='margin-top: 30px;width: 100%;margin-left: auto;margin-right: auto;'>
                                
                                        <div class="form-group" style='background-color:#0029ff ;width: 95%;margin-left: 21px; color: white;border-radius: 8px;'>
                                          <label for="message-text" class="sdlms-text-white-20px">Select To: </label><br>
                                          <select id='users'class="" name="toUid" style="width: 100%;" placeholder='Select To:'>
                                            
                                          </select>
                                        </div>
                                </div>
                            </div>
                        </div>
          
                    </div>


                </div>
            </form>
        </div>
    </div>
    </div>

<!-- after clicking the open to all button in first modal a form will be pop up-->
    <div class="modal fade" id="createTicketModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ">
        <div class=" modal-dialog" style="position: relative; width: 100%; margin: 2rem auto;">
        <div class="modal-content border-0 sdlms-section" style="height: 500px;margin-top: 100px;width: 175%;
          margin-left: -170px;">
            <div class="modal-header sdlms-section-header primary-header sdlms-text-white-20px" style="height: 56px;">
                <h5 class="modal-title" style='margin-left: auto;'>To Everyone</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="create-form">
                <div class="modal-body sdlms-section-body" style='height: 86%'>
                    <!-- added body -->
                    <div class="modal-body sdlms-section-body" style='padding: 20px 30px 30px 30px;height: 98%;box-shadow: rgb(67 71 85 / 27%) 0px 0px 0.25em, rgb(90 125 188 / 5%) 0px 0.25em 1em'>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label" style='font-weight: bold;font-size: 18px;'>What Do You Want To Achive From The Collaboration :</label>
                            <input class="form-control" name="objectives[0]" style='height:85px'>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label" style='font-weight: bold;font-size: 18px;'>Kpis:</label>
                            <input class="form-control" name="kpis[0]" style='height:85px'>
                        </div>

                    </div>
                    <!-- over body -->
                </div>

                <div class="modal-footer">
                    <button id="createTicket" type="submit" class="btn btn-primary">Send</button>
                </div>
            </form>
        </div>
    </div>
    </div>

    


<!-- Outcomes Modal -->
<div class="modal fade" id="outcomesPart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ">
    <div class="modal-dialog modal-lg" style="position: relative; width: 100%; margin: 2rem auto;">
      <div class="modal-content border-0 sdlms-section" style="height: auto;">
        <div class="modal-header sdlms-section-header primary-header sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
          <h5 class="modal-title" >Outcomes</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="outcomesForm">
        <div id='emptyOutcomes' class="modal-body sdlms-section-body" style="height: 481px;">
            <div id="textareaOutcomes" class="form-group">
              <div class="d-flex flex-column align-items-center sdlms-floating-label-input justify-content-between mb-5">
                <div class="sdlms-floating-label label-style">Outcomes</div>
                <textarea id="pOutcomes" class=" stopText form-control discript-textarea label-text" placeholder="Please jot down all your outcomes here ^_^" name="consequence" rows="6" maxlength="2000"></textarea>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" id="draft-outcomes" class="stopbtn sdlms-button button-primary button-lg d-flex align-items-center justify-contentt-end mr-3" createnewproject="">
                    <span class="sdlms-text-white-20px">Save as Draft</span>
                </button>
                <button type="submit" class=" stopbtn  sdlms-button button-primary button-lg d-flex align-items-center justify-contentt-end" createnewproject="">
                    <span class="sdlms-text-white-20px">Publish</span>
                </button>
              </div>
        </div>
            </div>
            
          
        </div>
        <div class="modal-footer">
          
        </div>
      </form>
      </div>
    </div>



<!-- reflection modal -->
<div class="modal fade" id="refPart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ">
    <div class="modal-dialog modal-lg" style="position: relative; width: 100%; margin: 2rem auto;">
      <div class="modal-content border-0 sdlms-section" style="height: auto;">
        <div class="modal-header sdlms-section-header primary-header sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
          <h5 class="modal-title" >Reflections</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="reflectionForm">
        <div id='emptyRef' class="modal-body sdlms-section-body" style="height: 481px;">
            <div id="textareaRef" class="form-group">
              <div class="d-flex flex-column align-items-center sdlms-floating-label-input justify-content-between mb-5">
                <div class="sdlms-floating-label label-style">Reflections</div>
                <textarea id="pReflections" class="stopText form-control discript-textarea label-text" placeholder="Write a reflection..." name="consequence" rows="6" maxlength="2000">{project.description}</textarea>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" id="draft-reflections" class=" stopbtn sdlms-button button-primary button-lg d-flex align-items-center justify-contentt-end mr-3" createnewproject="">
                    <span class="sdlms-text-white-20px">Save as Draft</span>
                </button>
                <button type="submit" class="stopbtn sdlms-button button-primary button-lg d-flex align-items-center justify-contentt-end" createnewproject="">
                    <span class="sdlms-text-white-20px">Publish</span>
                </button>
              </div>
        </div>
            </div>
            
          
        </div>
        <div class="modal-footer">
          
        </div>
      </form>
      </div>
    </div>

<!-- case study modal -->
<div class="modal fade" id="casePart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ">
    <div class="modal-dialog modal-lg" style="position: relative; width: 100%; margin: 2rem auto;">
      <div class="modal-content border-0 sdlms-section" style="height: auto;">
        <div class="modal-header sdlms-section-header primary-header sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
          <h5 class="modal-title" id="exampleModalLabel">Case Study</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="caseForm">
        <div id='emptyCase' class="modal-body sdlms-section-body" style="height: 481px;">
            <div id="textareaCase" class="form-group">
              <div class="d-flex flex-column align-items-center sdlms-floating-label-input justify-content-between mb-5">
                <div class="sdlms-floating-label label-style">Case Study</div>
                <textarea id="pCasestudy" class="stopText form-control discript-textarea label-text" placeholder="Write your case studies..." name="consequence" rows="6" maxlength="2000">{project.description}</textarea>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" id="draft-case" class="stopbtn sdlms-button button-primary button-lg d-flex align-items-center justify-contentt-end mr-3" createnewproject="">
                    <span class="sdlms-text-white-20px">Save as Draft</span>
                </button>
                <button type="submit" class="stopbtn sdlms-button button-primary button-lg d-flex align-items-center justify-contentt-end" createnewproject="">
                    <span class="sdlms-text-white-20px">Publish</span>
                </button>
              </div>
        </div>
            </div>
            
          
        </div>
        <div class="modal-footer">
          
        </div>
      </form>
      </div>
    </div>

<!-- discussion room modal -->
<div class="modal fade" id="droonModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ">
    <div class="modal-dialog modal-lg" style="position: relative; width: 100%; margin: 2rem auto;">
      <div class="modal-content border-0 sdlms-section" style="height: auto;">
        <div class="modal-header sdlms-section-header primary-header sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
          <h5 class="modal-title" ></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        
        <div class="modal-body sdlms-section-body" id="droonBody" style="height: 481px;">
          <div class="modal-header header"></div>
          <div class="modal-body" discussionroombody></div>
          <div class="modal-footer" footer></div>
            </div>
            <div class="modal-footer">
          
        </div>
      </div>
    </div>
  </div>

<!-- view modal (outcomes, reflections, case study) -->
<div class="modal fade" id="showConsequences" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ">
  <div class="modal-dialog modal-lg" style="position: relative; width: 100%; margin: 2rem auto;">
    <div class="modal-content border-0 sdlms-section" style="height: auto;">
      <div class="modal-header sdlms-section-header primary-header sdlms-text-white-20px" style="height: 56px; max-height: 56px;">
        <h5 class="modal-title" id="consequenceHeader"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      <div id='' class="modal-body sdlms-section-body" style="height: 481px;">
          <div id="consequencesContent">

          </div>
          </div>
          <div class="modal-footer">
        
      </div>
    </div>
  </div>
</div>

<div class="sdlms-container" id="content" component="content">
 <div style='display: flex;justify-content: end;'>
                        <button type="button" data-toggle="modal" data-target="#createTicketModal" class="button-lg sdlms-button button-primary" style='position: absolute;top: 106px; right: 43px;width: 155px;'>
                        <span class="sdlms-text-white-20px">Collaborate</span>
                        </button>
          </div>  
        <div class="sdlms-section session-view sdlms-form-elements">
        
    
          <div style='display:flex'>
            <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between" id='dashboardHeader1' style='width:50% ;border:1px solid black;border-radius: 15px 0px 0px 0px;cursor:pointer'>
                <div class="align-items-center sdlms-text-white-20px" id='dashboardHeaderSub1' style="text-align: center;">
                    <div id="pageTitle1">Manage Request</div>
                </div>
            </div>
            <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between" id='dashboardHeader2' style='width:50% ;border:1px solid black;border-radius: 0px 15px 0px 0px;cursor:pointer;background-color:white'>
                <div class="align-items-center sdlms-text-white-20px" id='dashboardHeaderSub2' style="text-align: center;">
                    <div id="pageTitle2" style='color:black'>Manage Tickets</div>
                </div>
            </div>
          </div>
            <div class="sdlms-section-body">
                <div class="broadcast" style='justify-content: flex-end;display: flex; align-items: baseline;'>
                
                    <div class="dropdown outLine" style='box-shadow: rgb(67 71 85 / 27%) 0px 0px 0.25em, rgb(90 125 188 / 5%) 0px 0.25em 1em;margin-right: 40px;'>
          <button class="btn dropdown-toggle outLine pr-5" type="button" id="filteringbtn"  data-toggle="dropdown" aria-expanded="false">
            Filter
          </button>
          <div class="dropdown-menu w-33" style = 'position: absolute'>
            <a class="dropdown-item" id="filter-peer" data-value="peer" href="#">Peer</a>
            <a class="dropdown-item" id="filter-mentor" data-value="mentor" href="#">Mentor</a>
            <a class="dropdown-item" id="filter-mentee" data-value="mentee" href="#">Mentee</a>
            
          </div>         
                </div>
    
      </div>

      <!-- carosal -->
      <div id="sync1" class="owl-carousel owl-theme" style='display:none'>
    <div class="item">
        <img src='https://bd.gaadicdn.com/processedimages/suzuki/hayabusa/640X309/hayabusa614d56bddfc73.jpg' class='caro-image' alt ='alt' width='100%' height='300px'>
    </div>
    <div class="item">
        <img src='https://bd.gaadicdn.com/processedimages/kawasaki/ninja-400/640X309/ninja-40062b2b760470d9.jpg' class='caro-image' alt ='alt' width='100%' height='300px'>
       
    </div>
    <div class="item">
        <img src='https://imgd.aeplcdn.com/310x174/n/cw/ec/129571/v302c-right-front-three-quarter.gif?isig=0' alt ='alt' width='100%' height='300px' class='caro-image'>
        
    </div>
</div>

            <div class="historySec mt-3" id='totalCard'>
    
                    <div id='containerTickets' class="containTickets row row-cols-2">
                
                      <!-- TICKET -->

<div class=" col">
        <div class="bg-secondary d-flex justify-content-between p-4 sdlms-text-white-20px cards"
            style="border-radius:5px 5px 5px 5px;cursor:pointer">
            <!--         Peer 1 -->

            <div>
                <div style='display: flex; justify-content: flex-end;width: 208%;margin-top: -8px;'>
                    <span class="badge badge-success"
                        style='padding: 10px 17px 10px 17px;margin-bottom: -17px;'>Success</span>
                </div>

                <div>
                    <div style='margin-top:-11px'><span><b>MENTOR :</b></span>
                        <span style='margin-left:32px'>Prafulkumar</span>
                    </div><br>
                    <div style='margin-top:-11px'><span><b>MENTEE :</b></span>
                        <span style='margin-left:35px'>Rahul</span>
                    </div><br>
                    <div style='margin-top:-11px'><span><b>OBJECTIVE :</b></span>
                        <span style='margin-left:10px'>point to be pointed order</span>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    </div>
          
<div class=" col">
        <div class="bg-secondary d-flex justify-content-between p-4 sdlms-text-white-20px cards"
            style="border-radius:5px 5px 5px 5px;cursor:pointer">
            <!--         Peer 1 -->

            <div>
                <div style='display: flex; justify-content: flex-end;width: 208%;margin-top: -8px;'>
                    <span class="badge badge-danger"
                        style='padding: 10px 17px 10px 17px;margin-bottom: -17px;'>Pending</span>
                </div>

                <div>
                    <div style='margin-top:-11px'><span><b>MENTOR :</b></span>
                        <span style='margin-left:32px'>Prafulkumar</span>
                    </div><br>
                    <div style='margin-top:-11px'><span><b>MENTEE :</b></span>
                        <span style='margin-left:35px'>Rahul</span>
                    </div><br>
                    <div style='margin-top:-11px'><span><b>OBJECTIVE :</b></span>
                        <span style='margin-left:10px'>point to be pointed order</span>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    </div>
                    <!-- TICKET -->
                    </div>
            </div>
    
    
            </div>
    
        </div>

    </div >    

<!-- IMPORT partials/footer.tpl -->