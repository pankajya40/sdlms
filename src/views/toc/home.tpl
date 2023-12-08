<link rel="stylesheet" href="https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.min.css" />
<link rel="stylesheet" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.min.css" />
<link rel="stylesheet" href="/assets/src/client/toc/calendar-library.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" /> 

<div id="create-profile-Preview"></div>

<div class="modal modal_outer right_modal fade" tabindex="-1" role="dialog" style="z-index: 10000; display: none;" id="myModal">
    <div class="modal-dialog" role="document" style="background: white;">
        <div class="modal-header">
            <h1 class="modal-title" style="font-size: larger; font-weight: 700;">Your Todo List</h1>
        </div>
        <div class="modal-content w-100 border-0 py-0 rounded-0">
            <div class="modal-body overflow-auto p-0 rounded-0 pb-5">
                <div id="journalSec" class="sdlms-section-body p-2 rounded-0 h-100">
                    <div class="search-add-sec d-flex justify-content-between">
                        <a
                            data-toggle="modal"
                            href="#myModal2"
                            class="align-items-center border button-lg button-primary sdlms-button material-btn"
                            style="background: #fff; color: #0029ff; box-shadow: 0 4px 4px 0 #00000040; font-size: small; font-weight: 600;"
                        >
                            Add Todo
                        </a>
                        <div class="d-flex justify-content-end pb-2">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input active" active-switch="" id="1726" data-id="1726" data-category="Project" data-isactive="true" />
                                <label class="active-lable custom-control-label light-text pt-1" for="1726" style="font-size: var(--sdlms-font-size-14); font-weight: 700;">Completed Tasks</label>
                            </div>
                        </div>
                    </div>
                    <div class="align-content-center feeds-area justify-content-center">
                        <div class="m-1 my-2 p-2 d-flex profile-reflection-card w-100" style="border-radius: 10px; font-size: small; background: #f5f5f5;">
                            <div class="p-2">
                                <div class="row">
                                    <div class="col-8" style="font-size: medium; font-weight: 600;">Task 1</div>
                                    <div class="col-4 d-flex justify-content-end" style="font-size: medium;">
                                        <i class="fa fa-check-circle mr-2" aria-hidden="true" style="color: #0cbb0c;"></i><i class="fa fa-trash" aria-hidden="true" style="color: black;"></i>
                                    </div>
                                </div>

                                <div class="profile-reflection-card-text pt-2" style="font-size: small; font-weight: 500;">
                                    i just want to say this hi means alot to me. And i want to reflect something so i am reflecting on this and i am testing this reflection here
                                </div>
                                <div class="font-10 d-flex justify-content-end">5 days ago</div>
                            </div>
                        </div>
                        <div class="m-1 my-2 p-2 profile-reflection-card w-100" style="border-radius: 10px; font-size: small; background: #f5f5f5;">
                            <div class="p-2">
                                <div class="row">
                                    <div class="col-8" style="font-size: medium; font-weight: 600;">Task 3</div>
                                    <div class="col-4 d-flex justify-content-end" style="font-size: medium;">
                                        <i class="fa fa-times-circle mr-2" aria-hidden="true" style="color: #b10303;"></i><i class="fa fa-trash" aria-hidden="true" style="color: black;"></i>
                                    </div>
                                </div>

                                <div class="profile-reflection-card-text pt-2" style="font-size: small; font-weight: 500;">
                                    i just want to say this hi means alot to me. And i want to reflect something so i am reflecting on this and i am testing this reflection here
                                </div>
                                <div class="font-10 d-flex justify-content-end">5 days ago</div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="myModal2" data-backdrop="static" style="z-index: 10000; display: none;">
    <div class="modal-dialog">
       <div class="details">
       </div>
    </div>
</div>
<div class="modal" id="myModal3" data-backdrop="static" style="display: none; z-index: 10000;">
    <div class="modal-dialog">
        <div class="modal-content" style="right: 300%; height: 45%; width: 150%;">
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
                    <div class="d-flex justify-content-end">
                        <button type="submit" id="createProject" class="sdlms-button button-primary button-lg d-flex align-items-center">Done</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<a data-toggle="modal" href="#myModal">
    <div class="d-flex position-fixed" style="right: 0;z-index: 100;top: 10%;">
        <div class="p-3 add-row" data-toggle="modal" data-target="#CreateSession" style="box-shadow: 1px 4px 16px rgba(0, 0, 0, 0.25);border-radius: 10px;background-color: white;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.6667 18.6667H24V16H10.6667V18.6667ZM0 12L5.33333 17.3333V6.66667L0 12ZM0 24H24V21.3333H0L0 24ZM0 0L0 2.66667H24V0L0 0ZM10.6667 8H24V5.33333H10.6667V8ZM10.6667 13.3333H24V10.6667H10.6667V13.3333Z" fill="#0029FF"></path>
            </svg>
        </div>
    </div>
</a>
<div class="app-container code-html">
    <article class="content">
        <aside class="calendar-sidebar">
            <div class="search-add-sec row d-flex justify-content-between">
                <div class="col-9 pr-0 input-group w-50 m-2 border-0">
                    <div class="form-outline">
                        <input type="search" id="form1" class="form-control" placeholder=" Search" style="font-family: 'Poppins', sans-serif, FontAwesome;" />
                    </div>
                </div>
                <div class="col-2 d-flex p-2 pb-2 align-items-end justify-content-center">
                    <svg id="Preview-btn" class="cursor-pointer" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.1042 24.8834L21.8424 24.9102C22.3873 24.9121 22.8284 25.3684 22.8284 25.9277V30.8436C22.8284 31.4049 22.5096 31.9127 22.0129 32.1475L14.0809 35.8721C13.8955 35.958 13.6991 36 13.5026 36C13.2413 36 12.98 35.9236 12.7521 35.7728C12.3536 35.5094 12.1127 35.055 12.1127 34.5682V25.901C12.1127 25.3378 12.5575 24.8815 13.1042 24.8834ZM32.1693 0C34.2857 0 36 1.76589 36 3.94606V6.70276C36 7.76039 35.5867 8.77602 34.8528 9.51674L23.1438 21.3606C22.9418 21.5668 22.6675 21.6814 22.3839 21.6795L12.5801 21.6489C12.2817 21.6489 11.9981 21.521 11.7943 21.2976L1.03413 9.46328C0.368803 8.73211 0 7.76612 0 6.76385V3.94797C0 1.7678 1.71429 0 3.83073 0H32.1693Z"
                            fill="#D9D9D9"
                            fill-opacity="0.25"
                        ></path>
                        <path
                            d="M13.1027 25.3834L13.1024 25.3834C12.8463 25.3826 12.6127 25.6007 12.6127 25.901V34.5682C12.6127 34.8913 12.7728 35.1871 13.0278 35.3557L13.028 35.3558C13.1736 35.4522 13.3389 35.5 13.5026 35.5C13.6268 35.5 13.751 35.4737 13.8694 35.419C13.8698 35.4188 13.8702 35.4186 13.8706 35.4185L21.7992 31.6955C21.7994 31.6954 21.7995 31.6953 21.7997 31.6952C22.1176 31.5447 22.3284 31.2155 22.3284 30.8436V25.9277C22.3284 25.6303 22.0968 25.4112 21.8409 25.4102C21.8408 25.4102 21.8407 25.4102 21.8407 25.4102M13.1027 25.3834L21.8424 24.9102L21.8407 25.4102M13.1027 25.3834L21.8407 25.4102M13.1027 25.3834L21.8407 25.4102M34.4976 9.16482L34.4972 9.16521L22.7882 21.0091L22.7866 21.0107C22.6783 21.1213 22.5336 21.1805 22.3873 21.1795L22.3855 21.1795L12.5816 21.1489H12.5801C12.4266 21.1489 12.2759 21.0834 12.1639 20.9609C12.1638 20.9608 12.1637 20.9607 12.1636 20.9606L1.40408 9.12692L1.40394 9.12678C0.824104 8.48955 0.5 7.64423 0.5 6.76385V3.94797C0.5 2.02954 2.00461 0.5 3.83073 0.5H32.1693C33.9957 0.5 35.5 2.02795 35.5 3.94606V6.70276C35.5 7.63108 35.137 8.5195 34.4976 9.16482Z"
                            stroke="black"
                            stroke-opacity="0.75"
                        ></path>
                    </svg>
                </div>
            </div>
            <div class="sidebar-item p-2 pl-4 ml-4">
                <input type="checkbox" id="all" value="all" checked="" />
                <label class="checkbox checkbox-all" for="all" style="--checkbox-all: #2a4fa7;"><b>Click me to view all</b></label>
            </div>

            <hr />
            <div class="sdlms-section session-view sdlms-form-elements">
                <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between" collapse="">
                    <div id="project_title" class="d-flex align-items-center sdlms-text-white-20px">Priority</div>
                    <span class="sdlms-floating-right">
                        <img
                            src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg"
                            collapse-icon=""
                            alt=""
                            onerror="this.onerror=null;this.src='https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg';"
                            class=""
                        />
                    </span>
                </div>
                <div class="col-md-11 my-2" collapse-body="">
                    <div class="col-12">
                        <div class="sidebar-item">
                            <input type="checkbox" id="1" value="1" checked="" />
                            <label class="checkbox checkbox-1" for="1" style="--checkbox-1: #9e5fff;">Hackathon</label>
                        </div>
                        <div class="sidebar-item">
                            <input type="checkbox" id="2" value="2" checked="" />
                            <label class="checkbox checkbox-2" for="2" style="--checkbox-2: #00a9ff;">Learning</label>
                        </div>
                        <div class="sidebar-item">
                            <input type="checkbox" id="3" value="3" checked="" />
                            <label class="checkbox checkbox-3" for="3" style="--checkbox-3: #db473f;">Progress</label>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="sdlms-section session-view sdlms-form-elements">
                <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between" collapse="">
                    <div id="project_title" class="d-flex align-items-center sdlms-text-white-20px">Task Status</div>
                    <span class="sdlms-floating-right">
                        <img
                            src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg"
                            collapse-icon=""
                            alt=""
                            onerror="this.onerror=null;this.src='https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg';"
                            class=""
                        />
                    </span>
                </div>
                <div class="col-md-11 my-2" collapse-body="">
                    <div class="col-12">
                        <div class="sidebar-item">
                            <input type="checkbox" id="1" value="1" />
                            <label class="checkbox checkbox-1" for="1" style="--checkbox-1: #fff;">Complete</label>
                        </div>
                        <div class="sidebar-item">
                            <input type="checkbox" id="2" value="2" />
                            <label class="checkbox checkbox-2" for="2" style="--checkbox-2: #fff;">Ongoing</label>
                        </div>
                        <div class="sidebar-item">
                            <input type="checkbox" id="3" value="3" />
                            <label class="checkbox checkbox-3" for="3" style="--checkbox-3: #fff;">Rescheduled</label>
                        </div>
                        <div class="sidebar-item">
                            <input type="checkbox" id="4" value="4" />
                            <label class="checkbox checkbox-4" for="4" style="--checkbox-4: #fff;">To be planned</label>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="sdlms-section session-view sdlms-form-elements">
                <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between" collapse="">
                    <div id="project_title" class="d-flex align-items-center sdlms-text-white-20px">Tags</div>
                    <span class="sdlms-floating-right">
                        <img
                            src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg"
                            collapse-icon=""
                            alt=""
                            onerror="this.onerror=null;this.src='https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg';"
                            class=""
                        />
                    </span>
                </div>
                <div class="col-md-11" collapse-body="">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-md-8 p-2 mt-2">
                                Shagun Mishra
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8 p-2 mt-2">
                                Shawan Mandal
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8 p-2 mt-2">
                                Deepanshu G
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </aside>
        <section class="app-column">
            <nav class="navbar">
                <div class="dropdown">
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span class="button-text"></span>
                            <span class="dropdown-icon toastui-calendar-icon toastui-calendar-ic-dropdown-arrow"></span>
                        </button>
                    </div>
                    <div class="dropdown-menu">
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-item" data-view-name="month">Monthly</a>
                            <a href="#" class="dropdown-item" data-view-name="week">Weekly</a>
                            <a href="#" class="dropdown-item" data-view-name="day">Daily</a>
                        </div>
                    </div>
                </div>
                <button class="button today">Today</button>
                <button class="button prev">
                    <img src="https://sdlms.deepthought.education/assets/uploads/files/files/ic-arrow-line-left.png" />
                </button>
                <button class="button next">
                    <img src="https://sdlms.deepthought.education/assets/uploads/files/files/ic-arrow-line-right.png" />
                </button>
                <span class="navbar--range"></span>
                <div class="nav-checkbox" style="display: none;">
                    <input class="checkbox-collapse" type="checkbox" id="collapse" value="collapse" />
                </div>
            </nav>
            <main id="app"></main>
        </section>
    </article>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.3/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/chance/1.1.8/chance.min.js"></script>
<script src="https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.min.js"></script>
<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.min.js"></script>
<script src="/assets/src/client/toc/calendar-library.js"></script>

