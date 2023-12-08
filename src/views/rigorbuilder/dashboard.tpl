<div class="rigor-builder mt-4">
    <div class="w-100" sdlms-component="rigor-builder">
        <div class="sdlms-section">
            <div
                class="sdlms-section-header text-center  sdlms-primary-bg cursor-pointer custom-padding-x-40 primary-header font-weight-500 sdlms-text-white-20px">
                Rigor Builder</div>
            <div class="sdlms-section-body px-3 pt-4">
                <div class="px-5 pt-2">
                    <div class="w-100 pb-5">
                        <span class="font-poppins sdlms-text-black-22px">
                            Here, you will find sets of problems that are put
                            forward by everyone . Click on <svg xmlns="http://www.w3.org/2000/svg" start-rigor
                                data-pid="12516" width="20" height="20" fill="currentColor"
                                class="bi bi-caret-right-fill mx-1 cursor-pointer" viewBox="0 0 16 16">
                                <path
                                    d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z">
                                </path>
                            </svg> icon to start a quiz and then Click on <i class="fas fa-sign-in-alt mx-2"
                                data-id="1782" join-now="" data-href="/live/1782" aria-hidden="true"></i>
                            icon to enter a quiz
                        </span>
                    </div>
                    <div class="d-flex justify-content-around  h-100  pt-4 mb-5 justify-content-md-between">
                        <div class="d-flex ">
                            <p class="" quiz-problems>Problems</p>

                            <div class="custom-control custom-switch pl-5">
                                <input type="checkbox" class="custom-control-input" id="customSwitch1">
                                <label class="custom-control-label" for="customSwitch1"></label>
                            </div>
                            <p quiz-solutions class="text-primary">Solutions</p>

                        </div>
                        <div class="filters " collapse>
                            <button class="btn cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down "
                                    collapse-icon>
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg></button>
                        </div>
                    </div>
                    <div collapse-body style="display:none">
                        <div class="search-filters d-flex justify-content-md-between">
                            <input id="teamNameSelect" placeholder="Search" name="search"
                                class="form-control form-control mb-4 rounded sdlms-section w-25">
                            <input id="teamNameSelect" placeholder="Search" name="Creator"
                                class="form-control form-control mb-4 rounded sdlms-section w-25 ml-4">
                            <select class="dropdown-header h-100 ml-4 p-2 rounded sdlms-section border-0" name="" id="">
                                <option value="">option1</option>
                                <option value="">option2</option>
                            </select>
                            <select class="dropdown-header h-100 ml-4 p-2 rounded sdlms-section border-0" name="" id="">
                                <option value="">option1</option>
                                <option value="">option2</option>
                            </select>
                            <select class="dropdown-header h-100 ml-4 p-2 rounded sdlms-section border-0" name="" id="">
                                <option value="">option1</option>
                                <option value="">option2</option>
                            </select>
                        </div>
                    </div>
                    <!-- table -->
                    <div>
                        <div class="row col-equal-h" style="min-height: 4rem;">
                            <div class="sdlms-assets-tab-content w-100">
                                <div>
                                    <div>
                                        <table class="sdlms-my-upcoming-session-table w-100 sdlms-section" id="table-1">
                                            <thead id="thead"
                                                class="sdlms-my-upcoming-session-table-head secondary-header sdlms-text-white-18px font-weight-medium">
                                                <!-- <tr class="sdlms-my-upcoming-session-table-header-row">
                                                    <th class="font-weight-500">S. NO</th>
                                                    <th class="font-weight-500">Quiz Name</th>
                                                    <th class="font-weight-500">Creator</th>
                                                    <th class="font-weight-500">Status</th>
                                                    <th class="font-weight-500">Actions</th>
                                                </tr> -->
                                            </thead>
                                            <tbody class="sdlms-my-upcoming-session-table-body" id="table">

                                            </tbody>
                                        </table>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- pagination -->
                    <nav aria-label="Page navigation example" class="d-flex justify-content-center pt-4">
                        <ul class="pagination">
                            <li class="page-item page-navigator prev" data-url="">
                                <a class="" href="#" aria-label="Previous">
                                    <span aria-hidden="true" class="p-2">
                                        <svg width="15" height="24" viewBox="0 0 15 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15 21.1797L5.72863 12L15 2.82031L12.1457 -1.24766e-07L-5.24537e-07 12L12.1457 24L15 21.1797Z"
                                                fill="#0029FF" fill-opacity="0.8"></path>
                                        </svg>
                                    </span>
                                </a>
                            </li>
                            <li class="page-item">
                                <input
                                    class="page-link-1 sdlms-text-black-16px font-weight-500 sessions-page p-0 text-center"
                                    href="#" contenteditable="true" style="width: 2rem;"> / <span
                                    class="sessions-page-count ml-1">1</span>
                            </li>
                            <li class="page-item page-navigator next" data-url="">
                                <a class="" href="#" aria-label="Next">
                                    <span aria-hidden="true" class="p-2">
                                        <svg width="15" height="24" viewBox="0 0 15 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M-9.25794e-07 2.82031L9.27137 12L-1.2328e-07 21.1797L2.85431 24L15 12L2.85431 -1.24766e-07L-9.25794e-07 2.82031Z"
                                                fill="#0029FF" fill-opacity="0.8"></path>
                                        </svg>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <!-- last exit icon -->
                    <div class="p-5 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-log-out float-right cursor-pointer" exit>
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>