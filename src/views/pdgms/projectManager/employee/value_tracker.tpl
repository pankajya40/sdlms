<!-- IMPORT pdgms/projectManager/home.tpl -->
<section class="container-fluid" id="employee-view-content">
    <div class="row d-flex justify-content-center m-2">
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" id="value-employee-view-btn" class="btn border-light view-button button-primary sdlms-button">Employee View</button>
            <button type="button" id="value-leader-view-btn" class="btn border-light view-button button-secondary sdlms-button">Leader View</button>
          </div>
        </div>
<!--<div class="row p-3 bg-gray d-flex align-items-center"> 
    <div class="col-8 sdlms-text-black-28px font-weight-500">Value Tracker</div>
    <div class="col-3 sdlms-sub-text-primary-20px d-flex justify-content-end text-nowrap"><a data-toggle="modal" href="#myModal3" class="col-md-2">+ Create Journal </a></div>
</div>-->

<div class="row p-3 d-flex justify-content-center align-items-center m-3"> 
    <div class="col-4 sdlms-text-black-28px font-weight-500 d-flex justify-content-center align-items-center">Total Credits: <span class="sdlms-sub-text-primary-20px">1000</span></div>
    <div class="col-4 sdlms-text-black-28px font-weight-500 d-flex justify-content-center align-items-center">Credits Earned: <span class="sdlms-sub-text-primary-20px">550</span></div>
    <div class="col-4 sdlms-text-black-28px font-weight-500 d-flex justify-content-center align-items-center">Project Progress <span class="sdlms-sub-text-primary-20px">75 %</span></div>
</div>



<div class="m-2">
    <div class="sdlms-section d-block overflow-auto mb-3">
        <div class="align-items-center cursor-pointer d-flex font-weight-500 justify-content-around justify-content-between sdlms-section-header sdlms-text-white-17px primary-header">
            <div class="align-items-center d-flex pt-1 justify-content-center font-weight-500 sdlms-text-white-20px">
                Value Overview
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

</div><div class="m-2">
  <div class=" text-center sdlms-text-black font-weight-500"><h4>Credit Growth</h4></div>
        <div class="col-12"><canvas id="myChart" width="400" height="100"></canvas></div>
</div>
<!-- IMPORT pdgms/projectManager/footer.tpl -->
