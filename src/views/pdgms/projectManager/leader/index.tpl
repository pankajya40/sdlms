<!-- IMPORT pdgms/projectManager/home.tpl -->
<section class="container-fluid" id="leader-view-content">
    <div class="row d-flex justify-content-center m-2">
        <div class="btn-group dashboard" role="group" aria-label="Basic example">
            <button type="button" id="employee-view-dashboard" class="btn border-light view-button button-secondary sdlms-button">Employee View</button>
            <button type="button" id="leader-view-dashboard" class="btn border-light view-button button-primary sdlms-button">Leader View</button>
        </div>
    </div>
    <!--<div class="row d-flex justify-content-end m-2">
        <div class=" btn-group dashboard" role="group" aria-label="Basic example">
                <button type="button" id="employee-view-dashboard" class="btn border-light view-button button-secondary sdlms-button"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person" viewBox="0 0 20 20">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg></button>
                <button type="button" id="leader-view-dashboard" class="btn border-light view-button button-primary sdlms-button"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-people" viewBox="0 0 20 20">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg></button>
        </div>
    </div>-->
    <!--<div class="row p-3 bg-gray d-flex align-items-center"> 
        <div class="col-8 sdlms-text-black-28px font-weight-500">Project Management</div>
        <div class="col-3 sdlms-sub-text-primary-20px d-flex justify-content-end text-nowrap"><a data-toggle="modal" href="#myModal3" class="col-md-2">+ Create project </a></div>
    </div>
    

    <div class="modal fade modal_middle " id="myModal3" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered modal_dialog_middle modal-lg" role="document">

        <div class="modal-content  ">
            <div class="modal-header d-flex text-white primary-header" style="height: 50px;">
                 <h5 class="modal-title pb-1" id="exampleModalLongTitle">Create a Project</h5>
                 <button type="button" class="close pb-1" data-dismiss="modal" aria-label="Close" style="color: white;">
                     <span aria-hidden="true">&times;</span>
                 </button>
            </div>
             
                        <div class="row mx-3 pt-2">
                            <div class="d-flex col-2 pr-0 pt-2"><p class="sdlms-text-black-16px m-0">Title :</p></div>
                            <div class="col-6 p-0">
                                <input type="text" id="form1" class="form-control" style="font-family: 'Poppins', sans-serif, FontAwesome; box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1); border-radius: 5px; border: none;" placeholder="Title of project">
                            </div>
                        </div>
                        <div class="pt-3 mx-3">
                            <textarea id="pTitle" class="form-control label-text" placeholder="Type description of the project" name="project-title" rows="10" style="background: rgba(217, 217, 217, 0.25); height: 99px; resize: none; border: none; border-radius: 0px;"></textarea>
                        </div>
                        <div class="row pt-2 mx-3">
                            <div class="col-6 pr-2 form-group">
                               <label for="deadline">Deadline:</label>
                                <input class="form-control " type="date" id="deadline" name="deadline">
                            </div>
                            <div class="col-6 form-group">
                                <label for="Credits">Credits:</label>
                                <input class="form-control " type="number" id="credits" name="Credits">
                            </div>
                        </div>
                       
            <div class="modal-footer">
                 <button type="button" class="btn btn-primary">Save changes</button>
                 <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
     </div>
     </div>-->
     <div class=" mt-2">
                <div class="sdlms-section d-block overflow-auto projects-table-section mb-3">
                    <div class="align-items-center cursor-pointer d-flex font-weight-500 justify-content-around justify-content-between sdlms-section-header sdlms-text-white-17px primary-header">
                        <div class="align-items-center d-flex pt-1 justify-content-center font-weight-500 sdlms-text-white-20px" >
                            Current projects
                        </div>
                    </div>
                    <div class="sdlms-section-body">
                        <div class="row col-equal-h" style="min-height: 4rem;">
                            <div class="sdlms-assets-tab-content w-100">
                                <div>
                                    <div>
                                        <div class="project-table-area border">
                                            <table class="table">
                                            <thead class="thead-dark">
                                                <tr class="text-center cursor-pointer">
                                                <th scope="col">S.No</th>
                                                <th scope="col">ProjectName</th>
                                                <th scope="col">Assigner</th>
                                                <th scope="col">Created Date</th>
                                                <th scope="col">Deadline</th>
                                                <th scope="col">Est. Credits</th>
                                                <th scope="col">Priority</th>
                                                </tr>
                                            </thead>
                                            <tbody class=" cursor-pointer">
                                                <tr id="choose-me">
                                                <td scope="row">1</td>
                                                <td>CPaas</td>
                                                <td>Shawan</td>
                                                <td>02-09-2022</td>
                                                <td>12-09-2022</td>
                                                <td>200</td>
                                                <td>low</td>
                                                </tr>
                                                <tr id="choose-me">
                                                <td scope="row">2</td>
                                                <td>DTThon</td>
                                                <td>Shagun</td>
                                                <td>22-10-2022</td>
                                                <td>24-11-2022</td>
                                                <td>400</td>
                                                <td>High</td>
                                                </tr>
                                                <tr id="choose-me">
                                                <td scope="row">3</td>
                                                <td>SaaS</td>
                                                <td>Anirban</td>
                                                <td>30-08-2022</td>
                                                <td>7-09-2022</td>
                                                <td>500</td>
                                                <td>Medium</td>
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

    <!--<div class="row p-3 bg-gray d-flex align-items-center"> 
        <div class="col-8 sdlms-text-black-28px font-weight-500">Task Management</div>
        <div class="col-3 sdlms-sub-text-primary-20px d-flex justify-content-end text-nowrap"><a data-toggle="modal" href="#myModal4" class="col-md-2">+ Create Task </a></div>
    </div>
     <div class="modal fade modal_middle " id="myModal4" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered modal_dialog_middle modal-lg" role="document">

         <div class="modal-content  ">
             <div class="modal-header d-flex text-white primary-header" style="height: 50px;">
                 <h5 class="modal-title pb-1" id="exampleModalLongTitle">Create a Task</h5>
                 <button type="button" class="close pb-1" data-dismiss="modal" aria-label="Close" style="color: white;">
                     <span aria-hidden="true">&times;</span>
                 </button>
             </div>
             
                        <div class="row mx-3 pt-2 d-flex justify-content-between">
                           <div class="pt-2">
                                
                                <input type="text" id="title" class="form-control mx-sm-3 " aria-describedby="Title" placeholder="Task Title">
                            </div>
                            <div class="d-flex pt-2">
                                <div class="pr-2">
                                    <select id="custom-commit-dropdown" class="custom-select border-0" style="font-size: var(--sdlms-font-size-18); border-radius: 0.5rem; box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);">
                                        <option selected="">Task type</option>
                                        <option value="1" class="dropdown-item">FrontEnd</option>
                                        <option value="2" class="dropdown-item">BackEnd</option>
                                        <option value="3" class="dropdown-item">TPM</option>
                                    </select>
                                </div>
                                <div class="">
                                    <select id="custom-commit-dropdown" class="custom-select border-0" style="font-size: var(--sdlms-font-size-18); border-radius: 0.5rem; box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);">
                                        <option selected="">Priority</option>
                                        <option value="1" class="dropdown-item">High</option>
                                        <option value="2" class="dropdown-item">Medium</option>
                                        <option value="3" class="dropdown-item">Low</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <select class="task-title" name="Task-Title" id="task-title">
                                    <option value="none">None</option>
                                    <option value="frontEnd">FrontEnd</option>
                                    <option value="backEnd">BackEnd</option>
                                    <option value="Tpm">TPM</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="task-title" name="Task-Title" id="task-title">
                                    <option value="none">Prioritiness</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                        </div>
                        <div class="pt-3 mx-3">
                            <textarea id="tTitle" class="form-control label-text" placeholder="Type description of the Task" name="task-title" rows="10" style="background: rgba(217, 217, 217, 0.25); height: 99px; resize: none; border: none; border-radius: 0px;"></textarea>
                        </div>
                        <div class="d-flex pt-2 mx-3">
                            <div class="pr-2 form-group">
                               
                                <input type="text" name="daterange" value="01/01/2018 - 01/15/2018" />
                            </div>
                            <div class="pr-2 form-group">
                                
                                <input class="form-control mx-sm-3" type="number" id="credits" name="Credits" placeholder="Credits">
                            </div>
                            
                        </div>
                       <div class="pt-3 mx-3">
                            <textarea id="tTitle" class="form-control label-text" placeholder="Lists the prerequisite" name="task-title" rows="10" style="background: rgba(217, 217, 217, 0.25); height: 99px; resize: none; border: none; border-radius: 0px;"></textarea>
                        </div>
            <div class="modal-footer">
                 <button type="button" class="btn btn-primary">Save changes</button>
                 <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
             </div>
         </div>
     </div>
 </div>-->
 <div class="col-12 smaller-view pdgms-proj-choosen-view dashboard change-class" data-view="smaller" smaller-view>
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
                    class="align-items-center d-flex pt-1 justify-content-center font-weight-500 sdlms-text-white-20px">
                    Project selected
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
                                                <th scope="col">ProjectName</th>
                                                <th scope="col">Assigner</th>
                                                <th scope="col">Deadline</th>
                                                <th scope="col">Est. Credits</th>
                                                <th scope="col">Priority</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <td scope="row">Mark</td>
                                                <td>Ronak</td>
                                                <td>20-11-2022</td>
                                                <td>300</td>
                                                <td>medium</td>
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
 <div class=" mt-2">
              <div class="col-6 task-available">
                
            </div>
 </div>

</section>
<!-- IMPORT pdgms/projectManager/footer.tpl -->