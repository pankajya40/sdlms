<!-- IMPORT pdgms/projectManager/home.tpl -->
<section class="container-fluid" id="leader-view-content">
    <div class="row d-flex justify-content-center m-2">
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" id="team-value-employee-view-btn" class="btn border-light view-button button-secondary sdlms-button">Employee View</button>
            <button type="button" id="team-value-leader-view-btn" class="btn border-light view-button button-primary sdlms-button">Leader View</button>
          </div>
        </div>
<div class="row p-3 bg-gray d-flex align-items-center"> 
        <div class="col-8 sdlms-text-black-28px font-weight-500">Broadcast</div>
        <div class="col-3 sdlms-sub-text-primary-20px d-flex justify-content-end text-nowrap"><a data-toggle="modal" href="#myModal3" class="col-md-2">+ Add a message </a></div>
    </div>
    

    <div class="modal fade modal_middle " id="myModal3" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered modal_dialog_middle modal-lg" role="document">

        <div class="modal-content  ">
            <div class="modal-header d-flex text-white primary-header" style="height: 50px;">
                 <h5 class="modal-title pb-1" id="exampleModalLongTitle">Send a message</h5>
                 <button type="button" class="close pb-1" data-dismiss="modal" aria-label="Close" style="color: white;">
                     <span aria-hidden="true">&times;</span>
                 </button>
            </div>          
                            <div class="row ">
                            <div class="pt-2 pl-3 col-5">
                                
                                <input type="text" id="title" class="form-control mx-sm-3" aria-describedby="reason" placeholder="Reason">
                            </div>
                            <div class="col-3"></div>
                            <div class="col-3 pt-2">
                                <div class="pr-2">
                                    <select id="custom-commit-dropdown" class="custom-select border-0" style="font-size: var(--sdlms-font-size-18); border-radius: 0.5rem; box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);">
                                        <option selected="">For...</option>
                                        <option value="1" class="dropdown-item">All</option>
                                        <option value="1" class="dropdown-item">FrontEnd</option>
                                        <option value="2" class="dropdown-item">BackEnd</option>
                                        <option value="3" class="dropdown-item">TPM</option>
                                    </select>
                                </div>
                                <!--<div class="">
                                    <select id="custom-commit-dropdown" class="custom-select border-0" style="font-size: var(--sdlms-font-size-18); border-radius: 0.5rem; box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);">
                                        <option selected="">Prioritiness</option>
                                        <option value="1" class="dropdown-item">High</option>
                                        <option value="2" class="dropdown-item">Medium</option>
                                        <option value="3" class="dropdown-item">Low</option>
                                    </select>
                                </div>-->
                            </div>
                            </div>
                <div class="pt-3 mx-3">
                    <textarea id="pTitle" class="form-control label-text" placeholder="Type description of the project" name="project-title" rows="10" style="background: rgba(217, 217, 217, 0.25); height: 99px; resize: none; border: none; border-radius: 0px;"></textarea>
                </div>
            <div class="modal-footer">
                 <button type="button" class="btn btn-primary">Save changes</button>
                 <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
     </div>
     </div>

      <div class=" mt-2">
                <div class="sdlms-section d-block overflow-auto mb-3 employees-list-table-section">
                    <div class="align-items-center cursor-pointer d-flex font-weight-500 justify-content-around justify-content-between sdlms-section-header sdlms-text-white-17px primary-header">
                        <div class="align-items-center d-flex pt-1 justify-content-center font-weight-500 sdlms-text-white-20px">
                            List of Employees
                        </div>
                    </div>
                    <div class="sdlms-section-body">
                        <div class="row col-equal-h" style="min-height: 4rem;">
                            <div class="sdlms-assets-tab-content w-100">
                                <div>
                                    <div>
                                        <div class="overview-table-area border">
                                          <table class="table">
                                            <thead class="thead-dark">
                                                <tr class="text-center">
                                                <th scope="col">S.No</th>
                                                <th scope="col">Employee name</th>
                                                <th scope="col">Working hours</th>
                                                <th scope="col">T.C.Assigned</th>
                                                <th scope="col">T.C.Tasks</th>
                                                <th scope="col">T.P.Tasks</th>
                                                
                                                </tr>
                                            </thead>
                                            <tbody class="cursor-pointer">
                                                <tr  id="choose-mee">
                                                <td scope="row">1</td>
                                                <td>Ronak</td>
                                                <td>4/day</td>
                                                <td>5000</td>
                                                <td>10</td>
                                                <td>3</td>
                                                
                                                </tr>
                                                <tr  id="choose-mee">
                                                <td scope="row">2</td>
                                                <td>Srijit</td>
                                                <td>6/day</td>
                                                <td>4000</td>
                                                <td>20</td>
                                                <td>5</td>
                                                </tr>
                                                <tr  id="choose-mee">
                                                <td scope="row">3</td>
                                                <td>Amrit</td>
                                                <td>4/day</td>
                                                <td>2500</td>
                                                <td>9</td>
                                                <td>4</td>
                                                </tr>
                                            </tbody>
                                            </table>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      </div>

   
    <div class="col-12 smaller-view pdgms-proj-choosen-view change-class value" data-view="smaller" smaller-view>
        <div class="sdlms-section d-block overflow-auto mb-3">
            <div
                class="align-items-center cursor-pointer d-flex font-weight-500 justify-content-around justify-content-between sdlms-section-header sdlms-text-white-17px primary-header">

                <div class="sdlms-floating-left close_participants" exittomain>
                    <svg class="backBtn" width="26" height="18" viewBox="0 0 26 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z"
                            fill="white"></path>
                        <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4"></line>
                    </svg>
                </div>

                <div
                    class="align-items-center d-flex pt-1 justify-content-center font-weight-500 sdlms-text-white-20px" >
                    Employee selected
                </div>
            </div>
            <div class="sdlms-section-body">
                <div>
                    <div class="row col-equal-h" style="min-height: 4rem;">
                        <div class="sdlms-assets-tab-content w-100">
                            <div>
                                <div>
                                    <div class="summary-table-area border">
                                          <table class="table">
                                            <thead class="thead-dark">
                                                <tr class="text-center">
                                                <th scope="col">Employee name</th>
                                                <th scope="col">Working hours</th>
                                                <th scope="col">T.C.Assigned</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               <tr>
                                                <td scope="row">Srijit</td>
                                                <td>6/day</td>
                                                <td>4000</td>
                                                </tr>
                                            </tbody>
                                          </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
<div class="mt-5 target-view-section  change-class">
    <div class="sdlms-section d-block overflow-auto mb-3">
        <div class="align-items-center cursor-pointer d-flex font-weight-500 justify-content-around justify-content-between sdlms-section-header sdlms-text-white-17px primary-header">
            <div class="align-items-center d-flex pt-1 justify-content-center font-weight-500 sdlms-text-white-20px">
                 Name's View
            </div>
        </div>
        <div class="sdlms-section-body">
            <div class="row col-equal-h" style="min-height: 4rem;">
                <div class="sdlms-assets-tab-content w-100">
                    <div>
                        <div>
                        <table class="table table-striped">
                        <thead class=" secondary-header">
                            <tr>
                            <th scope="col" class="text-white text-center">Task</th>
                            <th scope="col" class="text-white text-center">Project</th>
                            <th scope="col" class="text-white text-center">Deadline</th>
                             <th scope="col" class="text-white text-center">cre. Date</th>
                            <th scope="col" class="text-white text-center">Credits Assigned</th>
                            <th scope="col" class="text-white text-center">Credits Used</th>
                            <th scope="col" class="text-white text-center">Constraints</th>
                            <th scope="col" class="text-white text-center">Status</th>
                            <th scope="col" class="text-white text-center">flag</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td scope="row">make figma for dtthon</td>
                            <td>DtThon</td>
                            <td>23-10-22</td>
                            <td>20-10-22</td>
                            <td>30</td>
                            <td>50</td>
                            <td>1hr = 2Cr.</td>
                            <td>ongoing</td>
                            <td><button type="button" class="btn btn-outline-primary">In Process</button></td>
                            </tr>

                            <tr>
                                <td scope="row">make Wireframes for SaaS packaging</td>
                                <td>SaaS</td>
                                <td>21-10-22</td>
                                <td>19-10-22</td>
                                <td>50</td>
                                <td>45</td>
                                <td>2hr = 1Cr.</td>
                                <td>Complete</td>
                                <td><button type="button" class="btn btn-outline-success">Done</button></td>
                            </tr>

                            <tr>
                                <td scope="row">resize Javascript file</td>
                                <td>DtThon</td>
                                <td>27-10-22</td>
                                <td>25-10-22</td>
                                <td>100</td>
                                <td>10</td>
                                <td>1hr = 1Cr.</td>
                                <td>ongoing</td>
                                <td><button type="button" class="btn btn-outline-danger">Missing</button></td>
                            </tr>

                            <tr>
                                <td scope="row">desiign data models file</td>
                                <td>DtThon</td>
                                <td>27-10-22</td>
                                <td>26-10-22</td>
                                <td>100</td>
                                <td>50</td>
                                <td>2hr = 2Cr.</td>
                                <td>Complete</td>
                                <td><button type="button" class="btn btn-outline-warning">Done Late</button></td>
                            </tr>
                           
                        </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     <nav aria-label="Page navigation example" class="d-flex justify-content-center pt-4">
        <ul class="pagination">
            <li class="page-item page-navigator prev" data-url="">
                <a class="" href="#" aria-label="Previous">
                    <span aria-hidden="true" class="p-2">
                        <svg width="15" height="24" viewBox="0 0 15 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15 21.1797L5.72863 12L15 2.82031L12.1457 -1.24766e-07L-5.24537e-07 12L12.1457 24L15 21.1797Z"
                                fill="#0029FF" fill-opacity="0.8" />
                        </svg>

                    </span>
                </a>
            </li>
            <li class="page-item"><input
                    class="page-link-1 sdlms-text-black-16px font-weight-500 sessions-page p-0 text-center"
                    href="#" contenteditable="true" style="width: 2rem;"></input>/<span
                    class="sessions-page-count ml-1"></span>
            </li>
            <li class="page-item page-navigator next" data-url="">
                <a class="" href="#" aria-label="Next">
                    <span aria-hidden="true" class="p-2">
                        <svg width="15" height="24" viewBox="0 0 15 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M-9.25794e-07 2.82031L9.27137 12L-1.2328e-07 21.1797L2.85431 24L15 12L2.85431 -1.24766e-07L-9.25794e-07 2.82031Z"
                                fill="#0029FF" fill-opacity="0.8" />
                        </svg>
                    </span>
                </a>
            </li>
        </ul>
    </nav>
</div>

</section>
<!-- IMPORT pdgms/projectManager/footer.tpl -->