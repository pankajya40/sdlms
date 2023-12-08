
class ProjectManagerTemplates {
    constructor() {
        
    }

    static projectmanager() {
        const pmcomponents = {
            taskDescription: function () {
                

                return `<div class="sdlms-section task-accordian change-class">
                <div class="sdlms-section-header secondary-header cursor-pointer d-flex align-items-center justify-content-between font-weight-500 sdlms-text-white-20px"
                    collapse>
                    <div class="d-flex align-items-center">
                        <div class="d-flex align-items-center mr-2">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.4743 1.5H9.21537C8.88792 0.63 8.03031 0 7.01678 0C6.00324 0 5.14563 0.63 4.81818 1.5H1.55928C0.701678 1.5 0 2.175 0 3V13.5C0 14.325 0.701678 15 1.55928 15H12.4743C13.3319 15 14.0336 14.325 14.0336 13.5V3C14.0336 2.175 13.3319 1.5 12.4743 1.5ZM7.01678 1.5C7.44558 1.5 7.79642 1.8375 7.79642 2.25C7.79642 2.6625 7.44558 3 7.01678 3C6.58797 3 6.23713 2.6625 6.23713 2.25C6.23713 1.8375 6.58797 1.5 7.01678 1.5ZM8.57606 12H3.11857V10.5H8.57606V12ZM10.915 9H3.11857V7.5H10.915V9ZM10.915 6H3.11857V4.5H10.915V6Z"
                                    fill="white" />
                            </svg>
                        </div>
                        Task 1
                    </div>
                    <div class="text-center"><a data-toggle="modal" href="#myModal4" class="col-md-2">+ Edit tasks </a></div>
                    <span class="">
                        <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg"
                            collapse-icon alt="" />
                    </span>
                </div>
                <div class="sdlms-section-body" collapse-body>
                    <div class="row">
                       <div class="col-12">
                            <p class="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <div class="row">
                                <div class=" col-sm-12 col-md-6 text-center"><p>Credits:<span class="sdlms-sub-text-primary-20px pl-1">100</span></p></div>
                                <div class=" col-sm-12 col-md-6 text-center"><p>Task type:<span class="sdlms-sub-text-primary-20px pl-1">FrontEnd</span></p></div>
                                <div class=" col-sm-12 col-md-6 text-center"><p>Priority:<span class="sdlms-sub-text-primary-20px pl-1">High</span></p></div>
                                <div class=" col-sm-12 col-md-6 text-center"><p>Duration:<span class="sdlms-sub-text-primary-20px pl-1">3_Days</span></p></div>
                            </div>
                            <div class="row">
                                <div class="col-12 text-center">List of Prerequisites:
                                    <ul class="sdlms-sub-text-primary-20px">
                                        <li>wireframes</li>
                                        <li>Data Models</li>
                                        <li>Figma</li>
                                    </ul>
                                </div>
                                <div class="col-12 row text-center">
                                    <div class=" col-sm-12 col-md-6 "><p>Date of creation:</p><span class="sdlms-sub-text-primary-20px">10-06-2022 19:20</span></div>
                                    <div class=" col-sm-12 col-md-6 "><p>Deadline:</p><span class="sdlms-sub-text-primary-20px">10-06-2022 19:20</span></div>
                                </div>
                            </div>
                       </div>
                       <div class="col-12">
                          <!--<div class="row">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">@</span>
                                </div>
                                <input type="text" class="form-control" placeholder="Assign too" aria-label="Username" aria-describedby="basic-addon1">
                            </div>
                          </div>-->
                          <div class="row">
                            <div class=" col-sm-6 col-md-3 ">
                                <div class="border border-primary rounded bg-primary text-white p-1 fw-bold">
                                    <div class="float-right mr-0 mt-0 border-left border-primary ">x</div>
                                    Linne H
                                </div>
                            </div>
                          </div>
                       </div>
                    </div>
                </div>
            </div>`;
            },
        };

        const modals = {
            detailModal: function () {
               

                return    `<div class="modal fade modal_middle " id="myModal4" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal_dialog_middle modal-lg" role="document">
               
                        <div class="modal-content  ">
                            <div class="modal-header d-flex text-white primary-header" style="height: 50px;">
                                <h5 class="modal-title pb-1" id="exampleModalLongTitle">Project detail</h5>
                                <button type="button" class="close pb-1" data-dismiss="modal" aria-label="Close" style="color: white;">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                               <div class="row">
                                          <div class="col-12">
                                               <p class="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                               <div class="row">
                                                   <div class="col-6 text-center"><p>Credits:<span class="sdlms-sub-text-primary-20px pl-1">100</span></p></div>
                                                   <div class="col-6 text-center"><p>Project type:<span class="sdlms-sub-text-primary-20px pl-1">FrontEnd</span></p></div>
                                                   <div class="col-6 text-center"><p>Priority:<span class="sdlms-sub-text-primary-20px pl-1">High</span></p></div>
                                                   <div class="col-6 text-center"><p>Duration:<span class="sdlms-sub-text-primary-20px pl-1">3_Days</span></p></div>
                                               </div>
                                               <div class="row">
                                                   <div class="col-12 text-center">List of Prerequisites:
                                                       <ul class="sdlms-sub-text-primary-20px">
                                                           <li>wireframes</li>
                                                           <li>Data Models</li>
                                                           <li>Figma</li>
                                                       </ul>
                                                   </div>
                                                   <div class="col-12 row text-center">
                                                       <div class="col-6"><p>Date range:</p><span class="sdlms-sub-text-primary-20px">10-06-2022 19:20</span></div>
                                                       <div class="col-6"><p>Created by:</p><span class="sdlms-sub-text-primary-20px">Tarun CEO</span></div>
                                                   </div>
                                               </div>
                                          </div>
                                          <div class="col-12">
                                             <!--<div class="row">
                                               <div class="input-group mb-3">
                                                   <div class="input-group-prepend">
                                                       <span class="input-group-text" id="basic-addon1">@</span>
                                                   </div>
                                                   <input type="text" class="form-control" placeholder="Assign too" aria-label="Username" aria-describedby="basic-addon1">
                                               </div>
                                             </div>-->
                                             <div class="row">
                                               <div class="col-3">
                                                   <div class="border border-primary rounded bg-primary text-white p-1 fw-bold">
                                                       <div class="float-right mr-0 mt-0 border-left border-primary ">x</div>
                                                       Linne H
                                                   </div>
                                               </div>
                                             </div>
                                          </div>
                                       </div>
                            </div>
                           <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                   </div>`
                }
            };
        return { pmcomponents, modals};
    }
}