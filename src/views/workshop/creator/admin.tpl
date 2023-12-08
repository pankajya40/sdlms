<div class="">
    <div class="sdlms-section session-view sdlms-form-elements">
        <div
            class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center text-white justify-content-between d-flex">
            Workshop Manager - Admin Panel
        </div>
        <div class="sdlms-section-body">
            <!-- creating the workshop -->
            <div class="mb-3">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createPage">
                    Create a workshop
                </button>
                <!-- Modal -->
                <div class="modal fade" id="createPage" tabindex="-1" role="dialog" aria-labelledby="createTitle"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="w-50">
        <div class="sdlms-section session-view sdlms-form-elements" >
            <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center text-white justify-content-between d-flex">
                Workshop Manager - Create Workshop
            </div>
            <div class="sdlms-section-body">
                <div class=" d-flex justify-content-center">
                    <div class="w-50 mb-2">
                        
                        <textarea id="parameter-title" class="form-control label-text mb-3 " placeholder="Enter title of the workshop" name="content" rows="1" spellcheck="false" data-ms-editor="true"></textarea>
                        <textarea id="parameter-title" class="form-control label-text mb-3" placeholder="Enter duration of the workshop" name="content" rows="1" spellcheck="false" data-ms-editor="true"></textarea>
                        <div class="mb-3 ">
                            <input name="from" type="datetime-local" width="100%" class="form-control">
                        </div>
                    </div>
                </div>
                <!-- end -->




                <!-- <button createWBtn class="button sdlms-button button-lg button-primary " type="button"
                    data-toggle="creating" data-target="#createPage">Create Workshop</button> -->

                <div class="creating fade" id="createPage" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="w-50">
                                <div class="sdlms-section session-view sdlms-form-elements">
                                    <div
                                        class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center text-white justify-content-between d-flex">
                                        Workshop Manager - Create Workshop
                                    </div>
                                    <div class="sdlms-section-body">
                                        <div class=" d-flex justify-content-center">
                                            <div class="w-50 mb-2">

                                                <textarea id="parameter-title" class="form-control label-text mb-3 "
                                                    placeholder="Enter title of the workshop" name="content" rows="1"
                                                    spellcheck="false" data-ms-editor="true"></textarea>
                                                <textarea id="parameter-title" class="form-control label-text mb-3"
                                                    placeholder="Enter duration of the workshop" name="content" rows="1"
                                                    spellcheck="false" data-ms-editor="true"></textarea>
                                                <div class="mb-3 ">
                                                    <input name="from" type="datetime-local" width="100%"
                                                        class="form-control">
                                                </div>
                                                <textarea id="parameter-title" class="form-control label-text mb-3"
                                                    placeholder="Enter description of the workshop" name="content"
                                                    rows="5" spellcheck="false" data-ms-editor="true"></textarea>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-end">
                                            <button class="button sdlms-button button-lg button-primary ">Create
                                                Workshop</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


            <!-- two sections - recent & previous workshops -->
            <div class="sdlms-section session-view sdlms-form-elements">
                <div class="sdlms-section-header justify-content-between font-weight-500 sdlms-text-white-20px"
                    tabheader="" style="box-shadow: 0 0 2px 0 #00000050;">
                    <div class="sdlms-assets-tab cursor-pointer position-relative d-flex align-items-center sdlms-sessions-control"
                        style="background: white;">
                        <div class=" uWorkshops d-flex sdlms-asset-tab w-50 justify-content-center sdlms-sessions active "
                            id="recent-btn" data-type="navigation" data-navigate="-1"
                            data-state="/dtthon/creator/dashboard">
                            Recent
                        </div>
                        <div class="aWorkshops d-flex sdlms-asset-tab w-50 justify-content-center sdlms-sessions"
                            id="previous-btn" data-navigate="-1" data-state="scorecard/dashboard">
                            Previous
                        </div>
                    </div>
                </div>
                <div class="sdlms-section-body">
                    <div class="mb-4 p-0 d-flex align-items-center justify-content-between" sdlms-assest-search-bar="">
                        <input type="text" id="workshop-card-search-bar" placeholder="Search workshops.."
                            class="form-control sdlms-text-tertiary-16px font-weight-400" spellcheck="false"
                            data-ms-editor="true">
                        <label for="score-card-search-bar" style="position: relative; right: 35px;">
                            <i class="fa fa-search mt-2" style="color: #afafac;" aria-hidden="true"></i>
                        </label>
                    </div>
                    <div project-cards="" data-tid="1195" data-status="Visible"
                        class="uCard d-flex flex-wrap recent-card">
                        <!-- <div class="score-card">
                            <div class="score-card-tile-outer">
                                <div class="score-card-tile-container">
                                    <div class="score-card-tile score-card-tile-visible p-0">
                                        <img class="score-card-image"
                                            src="https://media.giphy.com/media/ITRemFlr5tS39AzQUL/giphy.gif">
                                    </div>
                                    <div class="score-card-tile score-card-tile-hidden hidden-detail"></div>
                                </div>
                            </div>
                            <div class="score-card-copy">
                                <b>React JS By Shubham</b>
                                <div class="light-text pt-2" style="font-size: var(--sdlms-font-size-16);">
                                    <p>Scheduled at : 28 Jun, 2022</p>
                                </div>
                                <div class="d-flex justify-content-end mt-3">
                                    <button class="border-0 bg-transparent"><i class="fa-solid fa-trash"></i></button>
                                    <button class="border-0 bg-transparent ml-2"><i
                                            class="fa-regular fa-circle-play"></i></button>
                                    <button class="border-0 bg-transparent ml-2"><i
                                            class="fa-solid fa-check"></i></button>
                                </div>

                            </div>
                        </div> -->
                        <!--  -->
                    </div>
                    <div project-cards="" data-tid="1195" data-status="Visible"
                        class=" aCard d-flex flex-wrap previous-card change-class">
                        <!-- <div class="score-card">
                            <div class="score-card-tile-outer">
                                <div class="score-card-tile-container">
                                    <div class="score-card-tile score-card-tile-visible p-0">
                                        <img class="score-card-image"
                                            src="https://media.giphy.com/media/ITRemFlr5tS39AzQUL/giphy.gif">
                                    </div>
                                    <div class="score-card-tile score-card-tile-hidden hidden-detail"></div>
                                </div>
                            </div>
                            <div class="score-card-copy">
                                <b>Rigour Builder By Rohit</b>
                                <div class="light-text pt-2" style="font-size: var(--sdlms-font-size-16);">
                                    <p>Scheduled at : 28 Jun, 2022</p>
                                </div>


                            </div>
                        </div> -->
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>