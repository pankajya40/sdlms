<!-- IMPORT partials/sidebar.tpl -->

<!-- IMPORT contentManager/partials/feedback.tpl -->
<div class="tabs-container w-100">
    <div class="tab-content border-0" style="height:20px; width:auto; padding-left:65px; padding-right:45px">

        <section>
            <div class="rounded-0  border-0">
                <div class="col bg-white">
                    <div class="d-flex justify-content-between align-items-center bg-white">
                        <h5 id="vs-title" class="bold-font pt-2" style="font-size:30px; color:#2B2A28;"></h5>
                        <button id="approveBtn" disabled="true" type="button" data-toggle="modal"
                            data-target="#feedbackModal" class="btn btn-md disabled"
                            style="background-color:blue; color:white; width:fit-content">
                            Review
                        </button>
                    </div>
                    <div class="d-flex justify-content-between bg-white">
                        <div>Written by <span id="vs-written-by" class="font-weight-500"
                                style="color: blue; cursor: pointer;"></span></div>
                        <div id="vs-created-at"></div>
                    </div>
                </div>
                <div class="col bg-white pb-2">
                    <div class="d-flex justify-content-between pb-2">
                        <div>Spotted by <span id="vs-content-spotter" class="font-weight-500"
                                style="color: blue; cursor: pointer;"></span></div>
                        <div>Spotted from <span id="vs-content-spotted-from" class="font-weight-500"
                                style="color: blue; cursor: pointer; "></span>
                        </div>
                    </div>
                </div>

                <div class="bg-light p-3 mt-4 rounded-lg cursor-pointer ">
                    <div class="float-right border p-1 rounded px-4 " style="background-color:#e3dde5;"><b
                            style="font-size :14px; color:#3d393e">Usage :</b>
                        <span id="vs-usage" class="font-weight-500"
                            style="color: blue; cursor: pointer; text-transform: capitalize;">
                            {content.usage}
                        </span>
                    </div><br>
                    <div id="vs-content" class="mt-3 p-3 sdlms-text-white-14px text-dark text-ellipse-4"></div>
                    <div class="col p-3 rounded text-dark">
                        <div><b>Why is it a content?</b></div>
                        <div id="vs-message" class="mt-2"></div>
                    </div>
                </div>



            </div>

            <div id="feedbacks-container"></div>
            <div class="d-flex justify-content-center pt-4" id="view-single-page-pagination"></div>

        </section>

    </div>
</div>

<!-- IMPORT partials/footer.tpl -->

<script src="https://kit.fontawesome.com/e7b4e5a7a5.js" crossorigin="anonymous"></script>



<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="width:150%; height:"50%">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Content Usage Form</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

        <div class="modal-body">
          <div class="border pl-2 pr-2 sdlms-section session-view sdlms-form-elements p-2 rounded-0 pb-3" style="width:100%;" >
             <b>Your Name :</b> {content.usernaam}
             <br><br>
             <form id="formdataused">
             <label for="source" class="bold-medium-font">Where you are using this content?</label>
             <select class="custom-select" name="platform">
	               <option selected=" " value="None">Open this select menu</option>
                   <option selected="Instagram" value="Instagram">Instagram</option>
                   <option selected="Linkedin" value="Linkedin">Linkedin</option>
                   <option selected="Deepthoughts" value="Deepthoughts Website">Deepthoughts Website</option>
                   <option selected="Facebook" value="Facebook">Facebook</option>
                   <option selected="Others" value="Others">Others</option>	    	
	        </select>
           <br><br>
           <span>Why are you using this content?</span>
           <textarea  class=" pt-3 mt-2 ml-2 border" style="border-color: #262627; min-width:250px; max-width:99%; min-height:50px;height:auto;" name="purpose"></textarea>
           
          </div>
        </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary border-0" data-dismiss="modal">Close</button>
        <button type="submit"  class="btn sdlms-button" style="background-color:blue; color:white;" id="saveUsedData">Save changes</button>
      </form>
      </div>
    </div>
  </div>
</div>
