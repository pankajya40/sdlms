<!-- IMPORT pdgms/projectManager/home.tpl -->
<section class="container-fluid" id="employee-view-content">
<div class="container-fluid">
    <div class="row d-flex justify-content-center m-2">
    <!--<div class="btn-group dashboard" role="group" aria-label="Basic example">
                <button type="button" id="employee-view-dashboard" class="btn border-light view-button button-primary sdlms-button"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person" viewBox="0 0 20 20">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg></button>
                <button type="button" id="leader-view-dashboard" class="btn border-light view-button button-secondary sdlms-button"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-people" viewBox="0 0 20 20">
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg></button>
        </div>-->
        <div class="btn-group dashboard" role="group" aria-label="Basic example">
            <button type="button" id="employee-view-dashboard" class="btn border-light view-button button-primary sdlms-button">Employee View</button>
            <button type="button" id="leader-view-dashboard" class="btn border-light view-button button-secondary sdlms-button">Leader View</button>
          </div>
    </div>
    <div class="modals">
   
    </div>
    <!--<div class="row p-3 bg-gray d-flex align-items-center"> 
        <div class="col-8 sdlms-text-black-28px font-weight-500">Project Dashboard</div>
        <div class="col-3 sdlms-sub-text-primary-20px d-flex justify-content-end text-nowrap"><a data-toggle="modal" href="#myModal3" class="col-md-2">+ Create Journal </a></div>
    </div>

    <div class="modal" id="myModal3" data-backdrop="static" style="display: none; z-index: 10000;">
        <div class="modal-dialog d-flex justify-content-center align-items-center" style="width: 400px;">
            <div class="modal-content" style="right: 150%; height: 55%; width: 150%;">
                <div class="modal-header">
                    <h4 class="modal-title">Add Your Journal Here</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="d-flex col-2 pr-0 pt-2"><p class="sdlms-text-black-16px m-0">Title :</p></div>
                            <div class="col-6 p-0">
                                <input type="text" id="form1" class="form-control" style="font-family: 'Poppins', sans-serif, FontAwesome; box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1); border-radius: 5px; border: none;" placeholder="Title of Journal">
                            </div>
                        </div>
                        <div class="pt-3">
                            <textarea id="pTitle" class="form-control label-text" placeholder="Type Something Here" name="project-title" rows="10" style="background: rgba(217, 217, 217, 0.25); height: 99px; resize: none; border: none; border-radius: 0px;"></textarea>
                        </div>
                        <div class="d-flex pt-2">
                            <div class="pr-2">
                                <select id="custom-commit-dropdown" class="custom-select border-0" style="font-size: var(--sdlms-font-size-18); border-radius: 0.5rem; box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);">
                                    <option selected="">Choose Stimulus</option>
                                    <option value="1" class="dropdown-item">Insight</option>
                                    <option value="2" class="dropdown-item">Heuristic</option>
                                    <option value="3" class="dropdown-item">Celebration</option>
                                </select>
                            </div>
                            <div class="">
                                <select id="custom-commit-dropdown" class="custom-select border-0" style="font-size: var(--sdlms-font-size-18); border-radius: 0.5rem; box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);">
                                    <option selected="">Choose Perception</option>
                                    <option value="1" class="dropdown-item">Motivation</option>
                                    <option value="2" class="dropdown-item">Speculation</option>
                                    <option value="3" class="dropdown-item">Observation</option>
                                    <option value="4" class="dropdown-item">Mythbuster</option>
                                </select>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end mt-4">
                            <button type="submit" id="createProject" class="sdlms-button button-primary button-lg d-flex align-items-center">Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>-->
     
    <div class="row m-4">
        <div class="sdlms-text-tertiary-28px font-weight-500 col-6">Task Assigned</div>
        <div class="col-6 d-flex justify-content-end">
            <div class="btn-group">
                <button class="btn sdlms-button view-button dropdown-toggle shadow px-lg-5 border " type="button" data-toggle="dropdown" aria-expanded="false">
                Filter
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">None</a>
                    <a class="dropdown-item" href="#">Recent</a>
                    <a class="dropdown-item" href="#">Deadline</a>
                    <a class="dropdown-item" href="#">Priority</a>
                </div>
            </div>
        </div>    
    </div>
    <div class=" mt-2">
                <div class="sdlms-section d-block overflow-auto mb-3">
                    <div class="align-items-center cursor-pointer d-flex font-weight-500 justify-content-around justify-content-between sdlms-section-header sdlms-text-white-17px primary-header">
                        <div class="align-items-center d-flex pt-1 justify-content-center font-weight-500 sdlms-text-white-20px">
                            Current Tasks
                        </div>
                    </div>
                    <div class="sdlms-section-body">
                        <div class="row col-equal-h" style="min-height: 4rem;">
                            <div class="sdlms-assets-tab-content w-100">
                                <div>
                                    <div>
                                        <div class="projects-table-area border">
                                            <table class="table">
                                            <thead class="thead-dark">
                                                <tr class="text-center">
                                                <th scope="col">S.No</th>
                                                <th scope="col">ProjectName</th>
                                                <th scope="col">TaskName</th>
                                                <th scope="col">Created Date</th>
                                                <th scope="col">Deadline</th>
                                                <th scope="col">Est. Credits</th>
                                                <th scope="col">Priority</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <td scope="row">1</td>
                                                <td><a data-toggle="modal" href="#myModal4" class="col-md-2">SaaS </a></td>
                                                <td><a data-toggle="modal" href="#myModal4" class="col-md-2">figma </a></td>
                                                <td>08-10-2019</td>
                                                <td>12-11-2020</td>
                                                <td>2000</td>
                                                <td>High</td>
                                                </tr>
                                                <tr>
                                                <td scope="row">2</td>
                                                <td><a data-toggle="modal" href="#myModal4" class="col-md-2">CPaaS </a></td>
                                                <td><a data-toggle="modal" href="#myModal4" class="col-md-2">Emotion Chart </a></td>
                                                <td>05-03-2022</td>
                                                <td>11-05-2022</td>
                                                <td>1500</td>
                                                <td>Medium</td>
                                                </tr>
                                                <tr>
                                                <td scope="row">3</td>
                                                <td><a data-toggle="modal" href="#myModal4" class="col-md-2">DTThon </a></td>
                                                <td><a data-toggle="modal" href="#myModal4" class="col-md-2">Ganesh API </a></td>
                                                <td>07-04-2023</td>
                                                <td>21-06-2023</td>
                                                <td>1000</td>
                                                <td>Low</td>
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
    
    <div class="sdlms-spacer"></div>
    <div class="sdlms-section d-block overflow-auto mb-3 change-class">
        <div class="align-items-center cursor-pointer d-flex font-weight-500 justify-content-around justify-content-between sdlms-section-header sdlms-text-white-17px primary-header">
            <div class="align-items-center d-flex pt-1 justify-content-center font-weight-500 sdlms-text-white-20px">
                Task Assigned
            </div>
        </div>
        <div class="sdlms-section-body">
            <div class="row col-equal-h" style="min-height: 4rem;">
                <div class="sdlms-assets-tab-content w-100">
                    <div>
                        <div>
                            <div class="tasks-table-area border"></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="row mt-2 px-0">
            <div class="col-7">
               <!-- <ul class="list-group" >
                    <li class="border border-dark rounded d-flex justify-content-between align-items-center">
                        Cras justo odio
                        <span class="badge badge-primary badge-pill">done</span>
                    </li>
                    
                </ul>-->
            </div>
            <div class="col-4 text-center ml-4">
            <canvas id="myChart" width="400" height="400"></canvas>
            </div>
        </div>
    </div>
</div>
    
</section>

<!-- IMPORT pdgms/projectManager/footer.tpl -->