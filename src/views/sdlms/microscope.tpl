<!-- <div class="session-microscope">
    <div class="w-100" sdlms-component="microscope">
        <div class="row flex-md-nowrap">
            <div class="col-12 pl-md-2 sdlms-mw-210 col-md-1 collapsed" sdlms-microscope="session">
                <div class="w-100">
                    <div class="sdlms-section-header line-height-2-1-5 secondary-header cursor-pointer d-flex align-items-center justify-content-between font-weight-500 sdlms-text-white-14px">
                        <div class="d-flex w-100">
                            Session Details
                        </div>
                    </div>
                    <div class="sdlms-section-body px-3">
                        <div class="sdlms-text-black-20px line-height-1 font-weight-medium">{{data.session.topic}}</div>
                        <div class="font-weight-medium sdlms-text-black-16px">{{data.session.sub_category}}</div>
                        <div class="sdlms-sub-text-secondary-13px">{{data.session.category}}</div>
                        <div class="sdlms-sub-text-secondary-16px mt-4">{{data.session.teacher.fullname}}</div>
                        <div class="sdlms-sub-text-secondary-13px" date="{{data.session.schedule}}"></div>
                    </div>
                </div>
                <div class="sdlms-spacer"></div>
                <div class="w-100">
                    <div class="sdlms-section-header line-height-2-1-5 secondary-header cursor-pointer d-flex align-items-center justify-content-between font-weight-500 sdlms-text-white-14px">
                        <div class="d-flex w-100">
                            Session Eagle-view
                        </div>
                    </div>
                    <div class="sdlms-section-body px-3">
                        <div class="row">
                            <div class="eagle-view-stats bg-light-white col-12 sdlms-font-open-sans sdlms-text-black-14px">
                                <div class="font-weight-medium d-inline" highest-count></div>
                                saw the highest number of insights being spotted and least number of
                                <div class="font-weight-medium d-inline" lowest-count></div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="eagle-view-stats bg-light-sky-blue col-12 sdlms-font-open-sans sdlms-text-black-14px">
                                <div class="font-weight-medium d-inline" highest-reaction></div>
                                saw the highest TB and EB activity and
                                <div class="font-weight-medium d-inline" lowest-reaction></div>
                                the least.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 pr-0 sdlms-search-container-open col-md-12 sdlms-mw--210">
                <div class="w-100 d-flex">
                    <div class="col-12 pb-3 pr-md-2 pl-0 col-md-6">
                        <div class="sdlms-section">
                            <div class="sdlms-section-header sdlms-primary-bg cursor-pointer custom-padding-x-40 primary-header font-weight-500 sdlms-text-white-20px">Graphs</div>
                            <div class="sdlms-section-body px-3 pt-4">
                                <div class="row">
                                    <div class="w-100" collpsible>
                                        <div class="sdlms-graph-head position-relative secondary-thread opacity-5">
                                            <span class="sdlms-floating-left" collapse>
                                                <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                                            </span>
                                            <div class="col-11 mx-auto d-flex align-items-center justify-content-between">
                                                <span class="sdlms-text-black-20px font-weight-medium">Graph 1</span>
                                            </div>
                                            <span class="sdlms-floating-right" data-toggle="modal" data-target="#graphFilter">
                                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M5.63549 11.3411H4.05654V5.67056H5.63549V11.3411ZM8.79338 11.3411H7.21443V3.24032H8.79338V11.3411ZM11.9513 11.3411H10.3723V8.1008H11.9513V11.3411ZM13.925 13.0423H2.08285V1.62016H13.925V13.0423ZM13.925 0H2.08285C1.21443 0 0.503906 0.729072 0.503906 1.62016V12.9613C0.503906 13.8524 1.21443 14.5814 2.08285 14.5814H13.925C14.7934 14.5814 15.5039 13.8524 15.5039 12.9613V1.62016C15.5039 0.729072 14.7934 0 13.925 0Z"
                                                        fill="#323232"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="col-11 mx-auto" collapse-body>
                                            <div class="my-3">
                                                <canvas id="trackerGraph"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-100" collpsible>
                                        <div class="sdlms-graph-head position-relative secondary-thread opacity-5">
                                            <span class="sdlms-floating-left" collapse>
                                                <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                                            </span>
                                            <div class="col-11 mx-auto d-flex align-items-center justify-content-between">
                                                <span class="sdlms-text-black-20px font-weight-medium">Graph 2</span>
                                            </div>
                                            <span class="sdlms-floating-right" data-toggle="modal" data-target="#graphFilter">
                                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M5.63549 11.3411H4.05654V5.67056H5.63549V11.3411ZM8.79338 11.3411H7.21443V3.24032H8.79338V11.3411ZM11.9513 11.3411H10.3723V8.1008H11.9513V11.3411ZM13.925 13.0423H2.08285V1.62016H13.925V13.0423ZM13.925 0H2.08285C1.21443 0 0.503906 0.729072 0.503906 1.62016V12.9613C0.503906 13.8524 1.21443 14.5814 2.08285 14.5814H13.925C14.7934 14.5814 15.5039 13.8524 15.5039 12.9613V1.62016C15.5039 0.729072 14.7934 0 13.925 0Z"
                                                        fill="#323232"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="col-11 mx-auto" collapse-body>
                                            <div class="my-3">
                                                <div id="custom_legend" class="row justify-content-end"></div>
                                                <canvas id="reactionGraph"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 pb-3 pr-md-2 col-md-6 pl-3" members-assets>
                        <div class="sdlms-section">
                            <div class="sdlms-section-header secondary-header cursor-pointer justify-content-between font-weight-500 sdlms-text-white-18px">
                                <div class="sdlms-floating-left">
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
                                    <span asset-selection-label class="pt-1">Asset Selection</span>
                                    <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg" class="ml-2" />
                                </div>
                            </div>
                            <div class="sdlms-section-body px-3 position-relative pt-4">
                                <div class="assetSelectionDropDown" style="display: none;">
                                    <div class="sdlms-text-black-16px text-center py-3 font-weight-bold" data-type="tb" get-asset>Thread Builder</div>
                                    <div class="sdlms-text-black-16px text-center py-3 font-weight-bold" data-type="eb" get-asset>Eagle Builder</div>
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
                                                                    <input type="search" id="search-student-bar" placeholder="Search " data-tid="{{data.tid}}" class="form-control sdlms-text-tertiary-16px font-weight-400" />
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

                                                        <div class="sdlms-asset-selection-user-body" data-tid="{{data.tid}}"></div>
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
        </div>
    </div>
</div> -->

<div class="session-microscope mt-4">
    <div class="w-100" sdlms-component="microscope">
        <div class="sdlms-section">
            <div
                class="sdlms-section-header text-center  sdlms-primary-bg cursor-pointer custom-padding-x-40 primary-header font-weight-500 sdlms-text-white-20px">
                Session Microscope</div>
            <div class="sdlms-section-body px-3 pt-4">
                <div class="row">
                    <div class="w-100" collpsible="">
                        <div class="row d-flex opacity-5 align-items-lg-center px-5">
                            <div class="col-4 d-flex">
                                <!-- <div class="col-6">
                                <select id="category" class="border-0 custom-select drop" style="background-color:rgba(0, 0, 0, 0.05);  font-size: var(--sdlms-font-size-18); border-radius:0.50rem;">
                                    <option selected="">char. Count</option>
                                    <option value="1" option-id="Project" class="dropdown-item p">Project </option>
                                    <option value="2" option-id="Course" class="dropdown-item c">Course</option>
                                    <option value="3" option-id="Selection" class="dropdown-item s">Selection </option>
                                </select>
                            </div> -->
                                <!-- dropdown 
                            <div class="col-6">
                                <select id="category" class="custom-select border-0" style="background-color:rgba(0, 0, 0, 0.05);  font-size: var(--sdlms-font-size-18); border-radius:0.50rem;">
                                    <option selected="">Time</option>
                                    <option value="1" option-id="Project" class="dropdown-item p">Thread</option>
                                    <option value="2" option-id="Course" class="dropdown-item c">Bloom's Taxonomy</option>
                                </select>
                            </div>
                            -->
                            </div>
                            <div class="col-8 d-flex justify-content-end">
                                <!-- <input type="radio" name="radio" id="radio-black">
                            <label class="colour-box-black ml-3 mt-1" for="radio-black">
                            </label>
                            <div class="ml-2">You</div>
                            <input type="radio" name="radio" id="radio-brown">
                            <label class="colour-box-brown ml-3 mt-1" for="radio-brown">
                            </label>
                            <div class="ml-2">Shawan</div>
                            <input type="radio" name="radio" id="radio-yellow">
                            <label class="colour-box-yellow ml-3 mt-1" for="radio-yellow">
                            </label>
                            <div class="ml-2">Merwin</div>
                            <input type="radio" name="radio" id="radio-green">
                            <label class="colour-box-green ml-3 mt-1" for="radio-green">
                            </label>
                            <div class="ml-2">Shagun</div>
                            <input type="radio" name="radio" id="radio-blue">
                            <label class="colour-box-blue ml-3 mt-1" for="radio-blue">
                            </label>
                            <div class="ml-2">Rohit</div> -->

                                <button type="button" data-toggle="modal" data-target="#participantslist"
                                    class="participantsbutton border btn text-primary">
                                    <span class="ml-3 mr-1 align-items-center">
                                        <svg width="18" sdlms-search-toggle="" height="17" viewBox="0 0 18 19"
                                            class="mb-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9 9.5C11.4862 9.5 13.5 7.37437 13.5 4.75C13.5 2.12562 11.4862 0 9 0C6.51375 0 4.5 2.12562 4.5 4.75C4.5 7.37437 6.51375 9.5 9 9.5ZM9 11.875C5.99625 11.875 0 13.4662 0 16.625V19H18V16.625C18 13.4662 12.0037 11.875 9 11.875Z"
                                                fill="blue"></path>
                                        </svg>
                                    </span>
                                    Participants
                                </button>
                                <div class="modal fade modal-right" id="participantslist" tabindex="-1" role="dialog"
                                    aria-labelledby="egenerateLinkLabel">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Filter Graphs</h5>
                                                <button type="button" class="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                    <span aria-hidden="true"></span>
                                                </button>
                                            </div>
                                            <div class="modal-body overflow-auto p-0 rounded-0 pb-5">
                                                <form action="" class="pb-0" id="threadFilterForm">
                                                    <div
                                                        class="sdlms-graph-head position-relative secondary-thread opacity-5">
                                                        <div
                                                            class="col-12 mx-auto d-flex align-items-center justify-content-between">
                                                            <span class="sdlms-text-black-20px font-weight-medium">Graph
                                                                1</span>
                                                        </div>
                                                    </div>
                                                    <div class="p-3">
                                                        <div class="form-group mb-0">
                                                            <input type="text" class="form-control" search-student=""
                                                                placeholder="Search">
                                                        </div>
                                                    </div>
                                                    <div class="d-flex w-100 flex-wrap" data-target="search-student">
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Ebrahim Aliyou" data-displayname="eeb"
                                                            data-username="eeb" data-uid="418">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="418" id="student-filter-418-0">
                                                            <label class="form-check-label"
                                                                for="student-filter-418-0">Ebrahim Aliyou</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Shawan Mandal" data-displayname="imshawan"
                                                            data-username="imshawan" data-uid="71">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="71" id="student-filter-71-1">
                                                            <label class="form-check-label"
                                                                for="student-filter-71-1">Shawan Mandal</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Teja" data-displayname="Teja"
                                                            data-username="Teja" data-uid="93">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox  check"
                                                                name="student" value="93" id="student-filter-93-2">
                                                            <label class="form-check-label"
                                                                for="student-filter-93-2">Teja</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="null" data-displayname="div0510"
                                                            data-username="div0510" data-uid="587">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox  check"
                                                                name="student" value="587" id="student-filter-587-3">
                                                            <label class="form-check-label"
                                                                for="student-filter-587-3">div0510</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="MOHIT JAKHOTRA"
                                                            data-displayname="mohitjakhotra"
                                                            data-username="mohitjakhotra" data-uid="391">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox  check"
                                                                name="student" value="391" id="student-filter-391-4">
                                                            <label class="form-check-label"
                                                                for="student-filter-391-4">MOHIT JAKHOTRA</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="null" data-displayname="Awwal"
                                                            data-username="Awwal" data-uid="566">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="566" id="student-filter-566-5">
                                                            <label class="form-check-label"
                                                                for="student-filter-566-5">Awwal</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="null" data-displayname="tarundt"
                                                            data-username="tarundt" data-uid="186">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="186" id="student-filter-186-6">
                                                            <label class="form-check-label"
                                                                for="student-filter-186-6">tarundt</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="null" data-displayname="Sinjini"
                                                            data-username="Sinjini" data-uid="509">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="509" id="student-filter-509-7">
                                                            <label class="form-check-label"
                                                                for="student-filter-509-7">Sinjini</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Palash Dewangan" data-displayname="Palash"
                                                            data-username="Palash" data-uid="69">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="69" id="student-filter-69-8">
                                                            <label class="form-check-label"
                                                                for="student-filter-69-8">Palash Dewangan</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Pooja Sonavane"
                                                            data-displayname="pooja sonavane"
                                                            data-username="pooja sonavane" data-uid="102">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="102" id="student-filter-102-9">
                                                            <label class="form-check-label"
                                                                for="student-filter-102-9">Pooja Sonavane</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Soumita mondal" data-displayname="Soumita"
                                                            data-username="Soumita" data-uid="404">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="404" id="student-filter-404-10">
                                                            <label class="form-check-label"
                                                                for="student-filter-404-10">Soumita mondal</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="" data-displayname="Abhishek Kumar"
                                                            data-username="Abhishek Kumar" data-uid="376">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="376" id="student-filter-376-11">
                                                            <label class="form-check-label"
                                                                for="student-filter-376-11">Abhishek Kumar</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Aditya Pal" data-displayname="meadityapal"
                                                            data-username="meadityapal" data-uid="361">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="361" id="student-filter-361-12">
                                                            <label class="form-check-label"
                                                                for="student-filter-361-12">Aditya Pal</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="null" data-displayname="Subhangi 0"
                                                            data-username="Subhangi 0" data-uid="75">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="75" id="student-filter-75-13">
                                                            <label class="form-check-label"
                                                                for="student-filter-75-13">Subhangi 0</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Bharat Rathi" data-displayname="Bharat"
                                                            data-username="Bharat" data-uid="396">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="396" id="student-filter-396-14">
                                                            <label class="form-check-label"
                                                                for="student-filter-396-14">Bharat Rathi</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Rahul Ranjan"
                                                            data-displayname="rahulranjanext"
                                                            data-username="rahulranjanext" data-uid="360">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="360" id="student-filter-360-15">
                                                            <label class="form-check-label"
                                                                for="student-filter-360-15">Rahul Ranjan</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Nishant Aryan" data-displayname="Nishant"
                                                            data-username="Nishant" data-uid="508">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="508" id="student-filter-508-16">
                                                            <label class="form-check-label"
                                                                for="student-filter-508-16">Nishant Aryan</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Fardin Kamal"
                                                            data-displayname="fardinkamal62"
                                                            data-username="fardinkamal62" data-uid="362">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="362" id="student-filter-362-17">
                                                            <label class="form-check-label"
                                                                for="student-filter-362-17">Fardin Kamal</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="null" data-displayname="Shagun"
                                                            data-username="Shagun" data-uid="100">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="100" id="student-filter-100-18">
                                                            <label class="form-check-label"
                                                                for="student-filter-100-18">Shagun</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="KUBAHO LINNE Heaven"
                                                            data-displayname="kubaho3" data-username="kubaho3"
                                                            data-uid="392">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="392" id="student-filter-392-19">
                                                            <label class="form-check-label"
                                                                for="student-filter-392-19">KUBAHO LINNE Heaven</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Abhishek Yadav"
                                                            data-displayname="abhishek yadav"
                                                            data-username="abhishek yadav" data-uid="406">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="406" id="student-filter-406-20">
                                                            <label class="form-check-label"
                                                                for="student-filter-406-20">Abhishek Yadav</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Ronak Bothra" data-displayname="Ronak 1"
                                                            data-username="Ronak 1" data-uid="494">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="494" id="student-filter-494-21">
                                                            <label class="form-check-label"
                                                                for="student-filter-494-21">Ronak Bothra</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Srijit patra"
                                                            data-displayname="srijitpatra99"
                                                            data-username="srijitpatra99" data-uid="359">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="359" id="student-filter-359-22">
                                                            <label class="form-check-label"
                                                                for="student-filter-359-22">Srijit patra</label>
                                                        </div>
                                                        <div class="form-group form-check col-6" student-checkbox=""
                                                            data-fullname="Jai Patel" data-displayname="jaipatel"
                                                            data-username="jaipatel" data-uid="357">
                                                            <input type="checkbox"
                                                                class="form-check-input custom-sdlms-checkbox check"
                                                                name="student" value="357" id="student-filter-357-23">
                                                            <label class="form-check-label"
                                                                for="student-filter-357-23">Jai Patel</label>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-end pb-3 px-3 mt-1 w-100">
                                                        <button type="submit"
                                                            class="btn button-primary sdlms-button">Apply</button>
                                                    </div>
                                                </form>
                                                <!-- <form action="" class="pb-3" id="reactionFilterForm">
                                                    <div
                                                        class="sdlms-graph-head position-relative secondary-thread opacity-5">
                                                        <div
                                                            class="col-12 mx-auto d-flex align-items-center justify-content-between">
                                                            <span class="sdlms-text-black-20px font-weight-medium">Graph
                                                                2</span>
                                                        </div>
                                                    </div>
                                                    <div class="p-3">
                                                        <div class="form-group mb-0">
                                                            <input type="text" class="form-control" search-student=""
                                                                placeholder="Search">
                                                        </div>
                                                    </div>
                                                    <div class="d-flex w-100 flex-wrap" data-target="search-student">
                                                    </div>
                                                    <hr>
                                                    <div class="d-flex flex-wrap">

                                                    </div>
                                                    <div class="d-flex justify-content-end mt-1 pb-3 px-3 w-100">
                                                        <button type="submit"
                                                            class="btn button-primary sdlms-button">Apply</button>
                                                    </div>
                                                </form> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="col-11 mx-auto" collapse-body>
                            <div class="my-3">
                                <canvas id="graphmicroscope">
                                </canvas>
                            </div>
                            <div>
                                <span id="ms-details-text" class="text-primary">Hover</span>
                                <!-- <span class="text-primary">Click</span>
                                on any graph to
                                view the person's asset.
                                Each graph shall highlight a few many <span class="text-primary"> key details </span>of
                                a person's threadbuilding session,
                                which you may use to make new <span class="text-primary">contributions</span>.-->
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

</div>