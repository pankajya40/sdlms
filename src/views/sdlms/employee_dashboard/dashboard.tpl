<div class="tmb">
    <div class="px-0">
        <div class="row sdlms-sections">
            <!--Student Details-->
            <div class="col-12 col-md-6">
                <!-- BEGIN user-->
                <div class="sdlms-section">
                    <div class="sdlms-section-header primary-header cursor-pointer d-flex align-items-center justify-content-between font-weight-500 sdlms-text-white-20px px-4 px-1-8"
                        collapse>
                        <div class="d-flex align-items-center">
                            <div class="d-flex align-items-center mr-2">
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.1925 1.58636H9.74597C9.39967 0.666273 8.49267 0 7.42078 0C6.34889 0 5.4419 0.666273 5.0956 1.58636H1.64906C0.742078 1.58636 0 2.30023 0 3.17273V14.2773C0 15.1498 0.742078 15.8636 1.64906 15.8636H13.1925C14.0995 15.8636 14.8416 15.1498 14.8416 14.2773V3.17273C14.8416 2.30023 14.0995 1.58636 13.1925 1.58636ZM7.42078 1.58636C7.87428 1.58636 8.24532 1.9433 8.24532 2.37955C8.24532 2.8158 7.87428 3.17273 7.42078 3.17273C6.96729 3.17273 6.59625 2.8158 6.59625 2.37955C6.59625 1.9433 6.96729 1.58636 7.42078 1.58636ZM7.42078 4.75909C8.78951 4.75909 9.89438 5.82196 9.89438 7.13864C9.89438 8.45532 8.78951 9.51819 7.42078 9.51819C6.05206 9.51819 4.94719 8.45532 4.94719 7.13864C4.94719 5.82196 6.05206 4.75909 7.42078 4.75909ZM12.368 14.2773H2.47359V13.1668C2.47359 11.5805 5.77172 10.708 7.42078 10.708C9.06985 10.708 12.368 11.5805 12.368 13.1668V14.2773Z"
                                        fill="white" />
                                </svg>
                            </div>
                            <!--IF user.fullname-->
                            {user.fullname}
                            <!--ELSE-->
                            {user.username}
                            <!--ENDIF user.fullname-->'s Details
                        </div>
                        <span class="sdlms-floating-right">
                            <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg"
                                collapse-icon alt="" />
                        </span>
                    </div>
                    <div class="student-detail sdlms-section-body p-10" collapse-body>
                        <div class="row">
                            <div class="row d-flex user-session">
                                <div class="col-1"></div>
                                <div class="col-3">
                                    <img class="w-100 mw-100  mx-2 pb-2" src={user.picture} alt="user picture"
                                        style="border-radius: 50%;">
                                </div>
                                <div class="col-7">
                                    <div class="user-session-heading sdlms-text-black-20px font-weight-bold pt-3">
                                        <p class="font-weight-300 h6">{user.signature}
                                        </p>
                                    </div>
                                    <div class="font-open-sans p-10 " style="font-size:small">

                                       
                                        <p class="text-justify">{user.aboutme}</p>
            
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <!--Report card-->
            <div class="col-12 col-md-6">
                <div class="sdlms-section">
                    <div class="sdlms-section-header primary-header cursor-pointer d-flex align-items-center justify-content-between font-weight-500 sdlms-text-white-20px"
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
                            Report card
                        </div>
                        <span class="sdlms-floating-right">
                            <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg"
                                collapse-icon alt="" />
                        </span>
                    </div>
                    <div class="sdlms-section-body" collapse-body>
                        <div class="row">
                            <div class="col-12 col-md-16 mx-auto">

                                <div class="sdlms-reportcard-detials d-flex justify-content-between border rounded border-primary col-12 mx-auto mt-2 p-3" id="dataonly">
                                    <div class="tracker-state active col-4">
                                        <div class="session-state-label sdlms-text-tertiary-16px font-weight-500" id="word-1">Asset Count</div>
                                        <div class="text-center font-weight-400 sdlms-text-tertiary-16px" id="word-1b">
                                            <!-- IF user.assetsCount -->
                                            {user.assetsCount}
                                            <!-- ELSE -->
                                            0
                                            <!-- ENDIF user.classes_attended -->
                                        </div>
                                    </div>
                                    <div class="tracker-state mx-0 px-2 border border-top-0 border-bottom-0 col-4">
                                        <div class="session-state-label sdlms-text-tertiary-16px font-weight-500" id="word-2">
                                            Session Attended </div>
                                        <div class="text-center font-weight-400 sdlms-text-tertiary-16px" id="word-2b">
                                             <!-- IF user.classes_attended -->
                                            {user.classes_attended}
                                            <!-- ELSE -->
                                            0
                                            <!-- ENDIF user.classes_attended -->
                                        </div>
                                    </div>
                                    <div class="tracker-state col-4">
                                        <div class="session-state-label sdlms-text-tertiary-16px font-weight-500" id="word-3">New Comments </div>
                                        <div class="text-center font-weight-400 sdlms-text-tertiary-16px" id="word-3b">
                                            <!-- IF feedbackCount -->
                                            {feedbackCount}
                                            <!-- ELSE -->
                                            0
                                            <!-- ENDIF feedbackCount -->
                                        </div>
                                    </div>
                                </div>
                               <!-- END user-->
                                <div class="d-flex justify-content-around col-lg-10 mx-auto mt-2">
                                <button type="button" class="button-primary w-50 button-lg ml- sdlms-button rep-card-button  modal-button" data-toggle="modal"
                                    data-target=".modal_middle">
                                    emotion pulse!
                                </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
     <!-- Modal -->
     <div class="modal fade modal_middle " tabindex="-1" role="dialog"
     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered modal_dialog_middle modal-lg" role="document">

         <div class="modal-content modal_content_middle ">
             <div class="modal-header d-flex text-white primary-header" style="height: 50px;">
                 <h5 class="modal-title pb-1" id="exampleModalLongTitle">Reaction pulse</h5>
                 <button type="button" class="close pb-1" data-dismiss="modal" aria-label="Close" style="color: white;">
                     <span aria-hidden="true">&times;</span>
                 </button>
             </div>
             <div class="modal-body chart-emoticons">
                 <div class="d-flex w-100">
                     <div>This indicated the most used 5 emoticons this month</div>
                     <div class="ml-auto">
                         <select class="months" name="months" id="months">
                             <option value="January">January</option>
                             <option value="February">February</option>
                             <option value="March">March</option>
                             <option value="April">April</option>
                             <option value="May">May</option>
                             <option value="June">June</option>
                             <option value="July">July</option>
                             <option value="August">August</option>
                             <option value="September">September</option>
                             <option value="October">October</option>
                             <option value="November">November</option>
                             <option value="December">December</option>
                         </select>
                     </div>
                 </div>
                 <div class="emoticons-chart-container">
                     <canvas  id="myChart" class="emoticons-chart-div" ></canvas>
                     </canvas>
                 </div>

                 <div class="compare-with-container row">
                     <div class="col-2"><input type="radio" name="compare_with_radio"  value="January"><label for="January">January</label></div>
                     <div class="col-2"><input type="radio" name="compare_with_radio"  value="February"><label for="February">February</label></div>
                     <div class="col-2"><input type="radio" name="compare_with_radio"  value="March"><label for="March">March</label></div>
                     <div class="col-2"><input type="radio" name="compare_with_radio"  value="April"><label for="April">April</label></div>
                     <div class="col-2"><input type="radio" name="compare_with_radio"  value="May"><label for="May">May</label></div>
                     <div class="col-2"><input type="radio" name="compare_with_radio"  value="June"><label for="June">June</label></div>
                     <div class="col-2"><input type="radio" name="compare_with_radio"  value="July"><label for="July">July</label></div>
                     <div class="col-2"><input type="radio" name="compare_with_radio"  value="August"><label for="August">August</label></div>
                     <div class="col-2"><input type="radio" name="compare_with_radio"  value="September"><label for="September">September</label></div>
                     <div class="col-2"><input type="radio" name="compare_with_radio"  value="October"><label for="October">October</label></div>
                     <div class="col-2"><input type="radio" name="compare_with_radio"  value="November"><label for="November">November</label></div>
                     <div class="col-2"><input type="radio" name="compare_with_radio"  value="December"><label for="December">December</label></div>  
                 </div>
                 <br>
                 <div><b>Description</b></div>
                 <div class="emoticons-description row" id="emoticonsDescription"></div>
                 
             </div>
             <div class="modal-footer">
                 <button type="button" class="btn btn-danger"
                     data-dismiss="modal">Close</button>
             </div>
         </div>
     </div>
 </div>
<div class="sdlms-spacer"></div>
    <!--Session statistics-->
    <div class="row sdlms-sections">
        <div class="col-12 col-md-12 mx-auto sdlms-parentDashboard-view " data-view="expanded" id="expanded-view">
            <div class="sdlms-section session-view">
                <div
                    class="sdlms-section-header cursor-pointer justify-content-between font-weight-500 sdlms-text-white-20px">
                    <div class="sdlms-assets-tab position-relative d-flex align-items-center sdlms-sessions-control ">
                        <div class="d-flex sdlms-asset-tab w-50 tab1 justify-content-center sdlms-sessions active"
                            data-type='navigation' data-navigate="-1" data-state="previous" SessionStatistics>
                            Session statistics
                        </div>
                        <div class="d-flex sdlms-asset-tab w-50 tab3 justify-content-center sdlms-sessions"
                            data-type="navigation" data-navigate="1" data-state="feedback">
                            Feedbacks
                        </div>
                        <div class="d-flex sdlms-asset-tab w-50  tab2 justify-content-center sdlms-sessions"
                            data-type="navigation" data-navigate="2" data-state="Questions" questions>
                            Questions
                        </div>
                        <!-- <div class="sdlms-add-assets">
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.69175 7.008H15.7397V10.432H9.69175V16.448H6.26775V10.432H0.21975V7.008H6.26775V0.927999H9.69175V7.008Z"
                                    fill="white" />
                            </svg>
                        </div> -->
                    </div>
                </div>
                <div class="sdlms-section-body" collapse-body>
                    <div class="px-3 pt-0">
                        <div class="row col-equal-h" style="min-height: 33rem;">
                            <div class="sdlms-assets-tab-content w-100">
                                <div>
                                    <div>
                                        <table class="sdlms-my-upcoming-session-table w-100" id="session-topics">
                                            <thead
                                                class="sdlms-my-upcoming-session-table-head secondary-header sdlms-text-white-18px font-weight-medium">
                                                <tr class="sdlms-my-upcoming-session-table-header-row">
                                                    <th class="font-weight-500" style="color: white;">S. No</th>
                                                    <th class="font-weight-500" style="color: white;">Session Topic</th>
                                                    <th class="font-weight-500" style="color:white;">Teacher Name</th>
                                                    <th class="font-weight-500" style="color: white;">Date and Time</th>
                                                    <th class="font-weight-500" style="color: white;"
                                                        id="change-header1">words Typed</th>
                                                    <th class="font-weight-500" style="color: white;"
                                                        id="change-header2">Thread Captured</th>
                                                    
                                                </tr>

                                            </thead>
                                            <tbody class="sdlms-my-upcoming-session-table-body">

                                            </tbody>
                                        </table>
                                    </div>
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
        <!--Selected session topic-->
        <div class="col-12 smaller-view sdlms-parentDashboard-view change-class" data-view="smaller" smaller-view>
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
                        Sessions
                    </div>
                </div>
                <div class="sdlms-section-body">
                    <div>
                        <div class="row col-equal-h" style="min-height: 4rem;">
                            <div class="sdlms-assets-tab-content w-100">
                                <div>
                                    <div>
                                        <table class="sdlms-my-upcoming-session-table w-100">
                                            <thead
                                                class="sdlms-my-upcoming-session-table-head secondary-header sdlms-text-white-18px font-weight-medium">
                                                <tr class="sdlms-my-upcoming-session-table-header-row ">
                                                    <th class="font-weight-500" style="color: white;">Session Topic
                                                    </th>
                                                    <th class="font-weight-500" style="color:white;">Teacher Name
                                                    </th>
                                                    <th class="font-weight-500" style="color: white;">Date and Time
                                                    </th>

                                                </tr>

                                            </thead>
                                            <tbody class="sdlms-my-upcoming-session-table-body" show-session>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--<nav aria-label="Page navigation example dashboard-sessionIndex change-class" class="d-flex justify-content-center pt-4">
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
            </nav>-->
        </div>
        <div class="sdlms-spacer"></div>
        <!--Feedback section-->
        <div class="col-12  feedback-sections change-class">
            <div class="sdlms-section feedback-section d-block overflow-auto">
                <div
                    class="align-items-center cursor-pointer d-flex font-weight-500 justify-content-around justify-content-between sdlms-section-header sdlms-text-white-17px primary-header">
                    <div class="sdlms-floating-left">
                       <!-- <svg class="backBtn" width="26" height="18" viewBox="0 0 26 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg%22%3E">
                            <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z"
                                fill="white"></path>
                            <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4"></line>
                        </svg>-->
                    </div>
                    <div
                        class="align-items-center d-flex pt-1 justify-content-center font-weight-500 sdlms-text-white-20px" >
                        <span asset-selection-label class="feedback active" data-fb-type="fr">Feedbacks Received</span>
                        <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg"
                            class="ml-2" />
                    </div>
                </div>
                <div class="sdlms-section-body px-3 pt-2 col-equal-h position-relative" style="min-height: 34rem;">
                    <div class="assetSelectionDropDown feedback" style="display: none;">
                        <div class="sdlms-text-black-16px text-center py-3 font-weight-bold" data-type="fr" get-asset>
                            Feedback Received
                        </div>
                        <div class="sdlms-text-black-16px text-center py-3 font-weight-bold" data-type="fg" get-asset>
                            Feedback Given
                        </div>
                    </div>
                    <div>
                        <!--<div class="clearfix sdlms-text-primary-20px font-weight-bold">
                            <span class="float-left">Management by objective</span>
                            <span class="float-right">12th September, 2022</span>
                        </div>-->
                    </div>
                    <div>
                        <ul class="sdlms-section-list sdlms-collapse sdlms-mb-feedback-section h-100 overflow-auto ">
                        </ul>
                    </div>
                </div>
            </div>
            <nav aria-label="Page navigation example" class="d-flex justify-content-center pt-4">
                <ul class="pagination">
                    <li class="page-item fb-navigator prev" data-url="">
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

                    <li class="page-item">
                        <input
                            class="page-link-1 sdlms-text-black-16px font-weight-500 feedback-page feedbacks-page p-0 text-center"
                            href="#" contenteditable="true" style="width: 2rem;" /> /
                        <span class="feedback-page-count ml-1"></span>
                    </li>
                    <li class="page-item fb-navigator next" data-url="">
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
        <!--Questions section-->
        <div class="col-12 question-sections change-class">
            <div class="sdlms-section question-section d-block overflow-auto">
                <div
                    class="align-items-center cursor-pointer d-flex font-weight-500 justify-content-around justify-content-between sdlms-section-header sdlms-text-white-17px primary-header">
                    <div class="sdlms-floating-left">
                       <!-- <svg class="backBtn" width="26" height="18" viewBox="0 0 26 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg%22%3E">
                            <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z"
                                fill="white"></path>
                            <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4"></line>
                        </svg>-->
                    </div>
                    <div
                        class="align-items-center d-flex pt-1 justify-content-center font-weight-500 sdlms-text-white-20px">
                        <span asset-selection-label class="active question" data-qn-type="">Questions Asked</span>
                        <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg"
                            class="ml-2" />
                    </div>
                </div>
                <div class="sdlms-section-body px-3 pt-2 col-equal-h position-relative" style="min-height: 34rem;">
                    <div class="assetSelectionDropDown question" style="display: none;">
                        <div class="sdlms-text-black-16px text-center py-3 font-weight-bold" data-type="qa" get-asset>
                            Question Asked
                        </div>
                        <div class="sdlms-text-black-16px text-center py-3 font-weight-bold" data-type="ag" get-asset>
                            Answer Given
                        </div>
                    </div>
                   <!-- <div class="clearfix sdlms-sub-text-primary-20px font-weight-bold">
                        <span class="float-left">Management by objective</span>
                        <span class="float-right">12th September, 2022</span>
                    </div>-->
                    <div class="collapse-body">
                        <ul
                            class="sdlms-section-list sdlms-collapse sdlms-mb-question-section h-100 overflow-auto p-10">
                            
                             
                        </ul>
                    </div>
                </div>
            </div>
            <nav aria-label="Page navigation example" class="d-flex justify-content-center pt-4">
                <ul class="pagination">
                    <li class="page-item qn-navigator prev" data-url="">
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

                    <li class="page-item">
                        <input
                            class="page-link-1 sdlms-text-black-16px font-weight-500 question-page questions-page p-0 text-center"
                            href="#" contenteditable="true" style="width: 2rem;" />
                        <span class="question-page-count ml-1"></span>
                    </li>
                    <li class="page-item qn-navigator next" data-url="">
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
    </div>
    <div class="sdlms-spacer"></div>
    <!--Thread, Eagle and spreadsheets-->
    <div class="row sdlms-sections">
        <div class="col-12  sdlms-asset-view change-class" student-assets>
            <div class="sdlms-section">
                <div
                    class="sdlms-section-header cursor-pointer justify-content-between font-weight-500 sdlms-text-white-20px">
                    <div class="sdlms-assets-tab position-relative d-flex align-items-center" id="nav-tab"
                        role="tablist">

                        <a class="d-flex sdlms-asset-tab w-50 tab1 justify-content-center sdlms-sessions active"
                            id="nav-student-thread-tab" data-toggle="tab" href="#nav-student-thread-tab-panel"
                            role="tab" aria-controls="nav-home" aria-selected="true">
                            <!-- IF isTeacher --> Planned <span class="hidden-on-collapsed">&nbsp;Eagle
                                Builder</span><span class="shown-on-collapsed">&nbsp;EB</span>
                            <!-- ELSE --> Thread Builder
                            <!--END isTeacher -->
                        </a>
                        <a class="d-flex sdlms-asset-tab w-50  tab3 justify-content-center sdlms-sessions"
                            id="nav-student-eagle-tab" data-toggle="tab" href="#nav-student-eagle-tab-panel"
                            href="javascript:void(0)" role="tab" aria-controls="nav-profile" aria-selected="false">
                            <!-- IF isTeacher -->
                            Actual <span class="hidden-on-collapsed">&nbsp;Eagle Builder</span><span
                                class="shown-on-collapsed">&nbsp;EB</span>
                            <!-- ELSE -->
                            Eagle Builder
                            <!--END isTeacher -->
                        </a>
                        <a class="d-flex sdlms-asset-tab w-50 tab2 justify-content-center sdlms-sessiosn "
                            id="nav-student-spread-tab" data-toggle="tab" href="#nav-student-spread-tab-panel"
                            href="javascript:void(0)" role="tab" aria-controls="nav-profile" aria-selected="false">
                            <!-- IF isTeacher -->
                            Actual <span class="hidden-on-collapsed">&nbsp;Spreadsheets</span><span
                                class="shown-on-collapsed">&nbsp;EB</span>
                            <!-- ELSE -->
                            Spreadsheets
                            <!--END isTeacher -->
                        </a>
                        <div class="sdlms-add-assets expand_participants">
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.69175 7.008H15.7397V10.432H9.69175V16.448H6.26775V10.432H0.21975V7.008H6.26775V0.927999H9.69175V7.008Z"
                                    fill="white" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="sdlms-section-body px-3 pt-4">
                    <div class="row">
                        <div class="tab-content w-100" id="nav-tabContent">
                            <div class="sdlms-assets-tab-content tab-pane fade show active w-100"
                                id="nav-student-thread-tab-panel" role="tabpanel"
                                aria-labelledby="nav-student-thread-tab">
                                <div class="sdlms-asset sdlms-thread-builder" id="studentThreadBuilder">

                                </div>
                            </div>
                            <div class="sdlms-assets-tab-content tab-pane fade show w-100"
                                id="nav-student-eagle-tab-panel" role="tabpanel"
                                aria-labelledby="nav-student-eagle-tab">
                                <div class="sdlms-asset sdlms-eagle-builder" id="studentEagleBuilder">
                                </div>
                            </div>
                            <div class="sdlms-assets-tab-content tab-pane fade show w-100"
                                id="nav-student-spread-tab-panel" role="tabpanel"
                                aria-labelledby="nav-student-eagle-tab">
                                <div class="sdlms-asset sdlms-eagle-builder" id="studentSpreadSheet">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-6  participants_section mh-100 change-class" members-assets>
                        <div class="sdlms-section">
                            <div class="sdlms-section-header secondary-header cursor-pointer justify-content-between font-weight-500 sdlms-text-white-18px">
                                <div class="sdlms-floating-left return-participants">
                                    <svg width="9" sdlms-toggle-members-list style="display: none;" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.48828 11.4515L3.54355 6.4882L8.48828 1.5249L6.96598 0L0.488281 6.4882L6.96598 12.9764L8.48828 11.4515Z" fill="white" />
                                    </svg>
                                </div>
                                <div class="d-flex justify-content-center align-items-center">
                                    <span class="mr-3 d-flex align-items-center">
                                        <svg width="18" sdlms-search-toggle height="17" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9 9.5C11.4862 9.5 13.5 7.37437 13.5 4.75C13.5 2.12562 11.4862 0 9 0C6.51375 0 4.5 2.12562 4.5 4.75C4.5 7.37437 6.51375 9.5 9 9.5ZM9 11.875C5.99625 11.875 0 13.4662 0 16.625V19H18V16.625C18 13.4662 12.0037 11.875 9 11.875Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </span>
                                    <span asset-selection-label class="pt-1 assets">asset Selection</span>
                                    <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg" class="ml-2" />
                                </div>
                                <div class="sdlms-floating-right">
                                    <span class="sdlms-floating-right">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                            class="bi bi-x close_participants" viewBox="0 0 16 16">
                                            <path
                                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div class="sdlms-section-body px-3 position-relative pt-4">
                                <div class="assetSelectionDropDown assets" style="display: none;">
                                    <div class="sdlms-text-black-16px text-center py-3 font-weight-bold" data-type="tb" get-asset>Thread Builder</div>
                                    <div class="sdlms-text-black-16px text-center py-3 font-weight-bold" data-type="eb" get-asset>Eagle Builder</div>
                                    <div class="sdlms-text-black-16px text-center py-3 font-weight-bold"data-type="sp" get-asset>Spread Sheet</div>
                                </div>
                                <div class="row">
                                    <div class="sdlms-assets-tab-content sdlms-w-0" sdlms-members-asset-view>
                                        <div class="sdlms-asset sdlms-asset-viewer" id="studentAssetView"></div>
                                    </div>
                                    <div class="sdlms-search w-100" sdlms-search>
                                        <div class="sdlms-asset sdlms-asset-selection">
                                            <div class="sdlms-asset-selection-container sdlms-form-elements">
                                                <div class="sdlms-asset-container">
                                                    <div class="sdlms-asset">
                                                        <div class="sdlms-asset-selection-body col-11 mx-auto" collapse-body>
                                                            <div class="sdlms-subasset">
                                                                <div class="d-flex align-items-center col-11 mx-auto justify-content-between sdlms-asset-search-bar">
                                                                    <input type="search" id="search-student-bar" placeholder="Search " class="form-control sdlms-text-tertiary-16px font-weight-400" />
                                                                    <label for="search-student-bar">
                                                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M10.3066 8.72496H9.65526L9.42439 8.51079C10.2324 7.60656 10.7189 6.43268 10.7189 5.15566C10.7189 2.30815 8.31952 0 5.35946 0C2.39939 0 0 2.30815 0 5.15566C0 8.00317 2.39939 10.3113 5.35946 10.3113C6.68695 10.3113 7.90727 9.84339 8.84723 9.06607L9.06985 9.28809V9.91473L13.1925 13.8727L14.4211 12.6909L10.3066 8.72496ZM5.35946 8.72496C3.30637 8.72496 1.64906 7.13067 1.64906 5.15566C1.64906 3.18064 3.30637 1.58636 5.35946 1.58636C7.41254 1.58636 9.06985 3.18064 9.06985 5.15566C9.06985 7.13067 7.41254 8.72496 5.35946 8.72496Z"
                                                                                fill="#323232"
                                                                            />
                                                                        </svg>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="sdlms-asset-selection">
                                                        <div class="sdlms-asset-selection-user sdlms-assets-selection-user-header position-relative primary-thread">
                                                            <div class="col-11 mx-auto d-flex align-items-center justify-content-between">
                                                                <span class="sdlms-text-white-20px pt-1 font-weight-500">Participants</span>
                                                            </div>
                                                        </div>

                                                        <div class="sdlms-asset-selection-user-body"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

    </div>

</div>