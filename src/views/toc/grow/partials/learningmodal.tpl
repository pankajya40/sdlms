<div class="fade modal p-4" id="learning" tabindex="-1" role="dialog" aria-labelledby="learning" aria-hidden="true" style="display: none;">
    <div class="modal-dialog-centered modal-lg mx-auto" role="document">
        <div class="border-0 modal-content" style="height: auto;">
            <div class="modal-header mx-5">
                <!-- IF learnings -->
                <h5 class="modal-title">Your learnings milestones this week</h5>
                <!-- ELSE -->
                <h5 class="modal-title">Write Your learnings milestones this week</h5>
                <!-- ENDIF learnings -->
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body py-0">
                <div class="container">
                    <div class="">
                        <div class="card-body">
                            <!-- IF learnings -->
                            <ul class="list-group mb-3" id="learningcontainer">
                                <!-- BEGIN learnings -->
                                <li class="d-flex justify-content-lg-between list-group-item px-5" id="learning-{learnings._id}">
                                    <div class="d-flex flex-column w-100">
                                    <div class="d-flex justify-content-between">
                                        <div>
                                        <!-- IF learnings.isAcomplished -->
                                        <input learningcheck  data-id="{learnings._id}" class="form-check-input" type="checkbox" value="" id="for{learnings._id}" checked disabled/>
                                        <label learninglabel id="label-{learnings._id}" class="form-check-label todo-text task-complete" for="for{learnings._id}" disabled>
                                        <!-- ELSE -->
                                        <input learningcheck  data-id="{learnings._id}" class="form-check-input" type="checkbox" value="" id="for{learnings._id}"/>
                                        <label learninglabel id="label-{learnings._id}" class="form-check-label todo-text" for="for{learnings._id}">
                                        <!-- ENDIF learnings.isAcomplished -->
                                            {learnings.learning}
                                        </label>
                                      </div>
                                      <div class="d-flex"> 
                                        <!-- IF learnings.reflection --> 
                                        <i class="fa fa-eye ml-2  cursor-pointer" show-reflection data-id="{learnings._id}" aria-hidden="true"></i>
                                        <!-- IF learnings.isPublished-->
                                        <i class="fa fa-check-circle-o ml-2" aria-hidden="true" title="Published"></i>
                                        <!-- ELSE -->
                                        <i class="fa fa-paper-plane-o ml-2 cursor-pointer" publishreflection title="Make it public" data-id="{learnings._id}" aria-hidden="true"></i>
                                        <!-- ENDIF learnings.isPublished -->
                                    <!-- ENDIF learnings.reflection -->
                                        <i class="far fa-trash-alt cursor-pointer ml-2" aria-hidden="true" id="deletelearning" data-id="{learnings._id}" ></i>
                                        
                                      </div>
                                    
                                    
                                </div>
                                    <div class="d-none mt-2" reflectionmodal-{learnings._id}>
                                        <!-- IF learnings.reflection -->
                                        <textarea disabled placeholder="{learnings.reflection}" class="form-control mt-2" id="learningreflectionmodal{learnings._id}" rows="5" style="
                                        resize: none;
                                    " id="reflection-{learnings._id}"></textarea>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 22 22" fill="none" class="float-lg-right mt-1 cursor-pointer" save-reflection-button data-id="{learnings._id}">
                                    <path d="M5.5999 19.4V14C5.5999 13.3373 6.13716 12.8 6.7999 12.8H15.1999C15.8626 12.8 16.3999 13.3373 16.3999 14V20M13.9999 6.20002L6.7999 6.20002C6.13716 6.20002 5.5999 5.66276 5.5999 5.00002L5.5999 1.40002M19.9974 5.5975L16.4024 2.00255C16.0166 1.61676 15.4934 1.40003 14.9478 1.40002H3.45705C2.3209 1.40002 1.3999 2.32102 1.3999 3.45717V18.5429C1.3999 19.679 2.3209 20.6 3.45705 20.6H18.5428C19.6789 20.6 20.5999 19.679 20.5999 18.5429V7.05211C20.5999 6.50652 20.3832 5.98328 19.9974 5.5975Z" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                    </svg>
                                    <!-- ELSE -->
                                        <textarea placeholder="Please write a reflection what learnings you got." class="form-control mt-2" id="learningreflectionmodal{learnings._id}" rows="5" style="
                                        resize: none;
                                    " id="reflection-{learnings._id}" maxlength="150"></textarea>
                                        <svg disabled xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 22 22" fill="none" class="float-lg-right mt-1 cursor-pointer" save-reflection-button data-id="{learnings._id}">
                                    <path d="M5.5999 19.4V14C5.5999 13.3373 6.13716 12.8 6.7999 12.8H15.1999C15.8626 12.8 16.3999 13.3373 16.3999 14V20M13.9999 6.20002L6.7999 6.20002C6.13716 6.20002 5.5999 5.66276 5.5999 5.00002L5.5999 1.40002M19.9974 5.5975L16.4024 2.00255C16.0166 1.61676 15.4934 1.40003 14.9478 1.40002H3.45705C2.3209 1.40002 1.3999 2.32102 1.3999 3.45717V18.5429C1.3999 19.679 2.3209 20.6 3.45705 20.6H18.5428C19.6789 20.6 20.5999 19.679 20.5999 18.5429V7.05211C20.5999 6.50652 20.3832 5.98328 19.9974 5.5975Z" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                    </svg>
                                    <!-- ENDIF learnings.reflection -->
                                    </div>
                                </div>
                                </li>
                                <!-- END learnings -->
                            </ul>
                            <!-- ELSE -->
                            <div class="container d-flex justify-content-center" id="learningillustration">
                                <img src="https://res.cloudinary.com/duhtmh8hp/image/upload/v1679857959/learningillustration_pxhsf3.png" style="max-width: 300px;" class="img-responsive" alt="Your Image">
                            </div>
                            <!-- ENDIF learnings -->
                        </div>
                    </div>
                </div>
                <div class="modal-footer mx-4">
                    <div class="card-footer w-100" style="border-radius: 10px;">
                        <form id="form">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fa fa-plus-circle" aria-hidden="true"></i></span>
                                </div>
                                <input type="text" id="addlearninginput" class="form-control" id="todo" placeholder="+ Add learning &amp; press enter" maxlength="80"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
  </div>