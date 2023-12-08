<header class="d-flex flex-row-reverse">
    <button class="border-0  bg-transparent" type="button" id="menu-btn" data-toggle='modal' data-target='#ModalCenter'>
        <i class="fa fa-solid fa-bars" style='font-size:20px' aria-hidden="true"></i> 
    </button>

<!-- Modal -->
<div class="modal fade" id="ModalCenter" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="ModalLongTitle"></h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <button class="message-tab w-100 border-0 bg-transparent nav-link" id="nav-profile-tab" data-toggle="tab" 
      data-target="#nav-requests" discussion-rooms="" type="button" role="tab" aria-controls="nav-requests" 
      aria-selected="false">Join Rooms</button>
      <br><br>
      <button class="message-tab w-100 bg-transparent nav-link active font-bold tertiary-border-bottom border-0"
      id="nav-homr-tab" data-toggle="tab" data-target="#nav-chats" type="button" role="tab"
      aria-controls="nav-chats" aria-selected="true">My Chats</button>
      <br><br>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>
</header>
<header class="d-flex  flex-column component-full secondary-bg secondary-shadow position-sticky"
    style="top: 0; z-index: 1;">
    <div class="d-flex justify-content-center align-items-center position-relative">
        <!--

        <div class="d-flex px-2 position-absolute" style="right:0;">
            <div id="write-icon" class="mr-3" data-toggle="modal" data-target="#staticBackdrop">
                <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/write-icon.svg" alt="write-icon">
            </div>
            <div id="delete-icon" class="mr-3 d-none" data-toggle="modal" data-target="#deleteModal">
                <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/delete.svg" alt="write-icon">
            </div>
            <div id="archive-icon" class="mr-3 d-none">
                <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/archive-icon.svg" alt="write-icon">
            </div>

            <div class="settings-icon mr-3">
                <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/settings-icon.svg" alt="settings-icon">
            </div>

        </div>

        -->


    </div>
    <!-- tabs start here -->
    <nav class="m-0">
        <!--<div id="messasing-tabs" class="nav nav-tabs" id="nav-tab" role="tablist">
        <button class="message-tab w-100 bg-transparent nav-link active font-bold tertiary-border-bottom border-0"
            id="nav-homr-tab" data-toggle="tab" data-target="#nav-chats" type="button" role="tab"
            aria-controls="nav-chats" aria-selected="true">My Chats</button>
        <button class="message-tab w-50 border-0 bg-transparent nav-link d-none" id="nav-profile-tab" data-toggle="tab"
            data-target="#nav-requests" discussion-rooms type="button" role="tab" aria-controls="nav-requests"
            aria-selected="false">Join Rooms</button>
        </div>
    </nav>-->
    <!-- tabs ends here -->
    <div class=" search d-flex px-3 py-2 align-items-center shadow-sm">
        <form class="form-group component-full mb-0" action="#">
            <input id="search" class="form-control  pl-3 px-2 py-1 w-95" type="text"
                placeholder="Search">
        </form>
        <!-- filters start here -->
        <!-- <div id="filter-icon" class="position-relative">
            <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/Preferences.svg" alt="filter-icon">
            <div id="filters" class="d-none flex-column secondary-bg shadow-sm rounded-lg position-absolute p-3  "
                style="top: 0; z-index: 1; right: 0;">
                <div class="d-flex align-items-center mb-2">
                    <input type="checkbox" name="All Unread" id="">
                    <label class="font-12 ml-2 mb-0" for="">All Unread</label>
                </div>
                <div class="d-flex align-items-center mb-2">
                    <input type="checkbox" name="All Unread" id="">
                    <label class="font-12 ml-2 mb-0" for="">My Connections</label>
                </div>
                <div class="d-flex align-items-center mb-2">
                    <input type="checkbox" name="All Unread" id="">
                    <label class="font-12 ml-2 mb-0" for="">In Mail</label>
                </div>
                <div class="d-flex align-items-center mb-2">
                    <input type="checkbox" name="All Unread" id="">
                    <label class="font-12 ml-2 mb-0" for="">Archvied</label>
                </div>
                <div class="d-flex align-items-center">
                    <input type="checkbox" name="All Unread" id="">
                    <label class="font-12 ml-2 mb-0" for="">Spam</label>
                </div>
            </div>
        </div> -->
        <!-- filters ends here -->
        <!--IF roomCreator-->
        <button class="button-brand button-primary ml-3 sdlms-btn sdlms-button" create-room>
            Create Room
        </button>
        <!--ENDIF roomCreator-->
    </div>
    <div id="dropdown"
        class=" dropdown-content  d-none  flex-column position-absolute secondary-bg font-12 rounded-10-px font-regular shadow px-3 py-2"
        style="right: 0; top: 0; z-index: 1;">
        <a class="dropdown-content__action primary-text mb-2" href="#">Categories</a>
        <a class="dropdown-content__action primary-text mb-2" href="#">Archived Chat</a>
        <a class="dropdown-content__hold d-none primary-text mb-2" href="#">Mute Chat</a>
        <a id="unread" class="dropdown-content__hold unread  primary-text mb-2" href="#">Mark as Unread</a>
        <a id="read" class="dropdown-content__hold read  primary-text mb-2 " href="#">Mark as Read</a>
        <a class="dropdown-content__hold d-none primary-text" href="#">Select All</a>
    </div>
</header>
<!-- header ends here -->
<!-- tab-content starts here  -->
<div class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade show active" id="nav-chats" role="tabpanel" aria-labelledby="nav-chats-tab">
        <!-- message tab content starts here -->
        <div class="messages d-flex flex-column">
            
          
        </div>
        <!-- message tab content ends here -->
    </div>
    <div class="tab-pane fade" id="nav-requests" role="tabpanel" aria-labelledby="nav-requests-tab">
        <!-- request tab content starts here -->
        <div id="requests" class="d-flex flex-column rooms-area pt-3">hiii</div>
        <!-- <div id="requests" class="d-flex flex-column pt-3">
            <a href="./request " class="requests-details d-flex align-items-center">
                <div class="profile-pic mx-3">
                    <img class="rounded-circle img-cover  circle-lg" src="https://blog.deepthought.education/wp-content/uploads/2022/04/image-2.png"
                        alt="profile-pic">


                </div>
                <div class="d-flex justify-content-between w-75">
                    <div class="requests-content d-flex flex-column ">
                        <div class="username">
                            <h2 class="font-14 font-medium mb-1">Ananya Doshi</h2>
                        </div>
                        <div class="requests-message">
                            <p class="font-10 font-bold mb-0">Socratic Dialogue is the collective deliberation of
                                very
                                interesting topics </p>
                        </div>
                    </div>
                    <div class="requests-extra-details d-flex flex-column mx-2  align-items-center">
                        <div class="requests-time d-flex ">
                            <p class="font-10 font-regular mb-0 text-center">9:30 AM</p>
                        </div>
                        <div
                            class="requests-counter d-flex justify-content-center align-items-center  rounded-circle p-2 brand-bg text-center circle-xsm">
                            <span class="text-white font-10">2</span>
                        </div>
                    </div>
                </div>

            </a>
            <hr class="mx-4">
            <a href="./request " class="requests-details d-flex align-items-center">
                <div class="profile-pic mx-3">
                    <img class="rounded-circle img-cover  circle-lg" src="https://blog.deepthought.education/wp-content/uploads/2022/04/image-2.png"
                        alt="profile-pic">


                </div>
                <div class="d-flex justify-content-between w-75">
                    <div class="requests-content d-flex flex-column ">
                        <div class="username">
                            <h2 class="font-14 font-medium mb-1">Ananya Doshi</h2>
                        </div>
                        <div class="requests-message">
                            <p class="font-10 font-bold mb-0">Socratic Dialogue is the collective deliberation of
                                very
                                interesting topics </p>
                        </div>
                    </div>
                    <div class="requests-extra-details d-flex flex-column mx-2  align-items-center">
                        <div class="requests-time d-flex ">
                            <p class="font-10 font-regular mb-0 text-center">9:30 AM</p>
                        </div>
                        <div
                            class="requests-counter d-flex justify-content-center align-items-center  rounded-circle p-2 brand-bg text-center circle-xsm">
                            <span class="text-white font-10">2</span>
                        </div>
                    </div>
                </div>

            </a>
            <hr class="mx-4">
        </div> -->

        
        <!-- request tab content ends here -->
    </div>
</div>
<!-- tab-content ends here -->
<!-- new message modal starts here -->
<!--
<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="width: 100%;">
        <div id="message-modal" class="modal-content rounded-10-px">
            <div class="modal-header border-0">
                <h5 class="modal-title" id="staticBackdropLabel">New Message</h5>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>

            </div>
            <div class="modal-body py-0">
                <form action="">
                    <div id="search-users" class="rounded-lg secondary-bg p-0 mb-1">
                        <input type="text" class="form-control" placeholder="Enter username">
                        <div id="users-list" class="py-1 px-2"></div>
                    </div>
                    <textarea name="message-content" id="new-message-content" cols="30" rows="5"
                        placeholder="Type your message" class="form-control mt-2"></textarea>
                </form>
            </div>
            <div class="modal-footer border-0">
                <div id="send-icon">
                    <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/Vector-9.svg" alt="send-icon">
                </div>
            </div>
        </div>
    </div>
</div>
-->
<!-- Modal -->
<!--<div class="modal fade" id="DiscussionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="DiscussionModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary join-room">Join Room</button>
      </div>
    </div>
  </div>
</div>-->
<!-- new message modal starts here -->
<div class="modal fade" id="deleteModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div id="deleteModal" class="modal-content">

            <div class="modal-body">
                <p>Are you sure you want to delete selected messages</p>
            </div>
            <div class="modal-footer border-0">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Yes</button>
            </div>
        </div>
    </div>
</div>

<!-- IMPORT mobile/loader.tpl -->