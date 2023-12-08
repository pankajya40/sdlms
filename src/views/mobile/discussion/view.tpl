<style>
.sdlms-container {
    padding : 0px !important;
    padding-bottom: 50px !important;
}
</style>
<div id="newwrapper">
    <div header></div>
    <div discussionroombody></div>
    <div footer></div>
</div>

<!-- modal to showcase images 
<div class="modal fade" id="imageModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="imageModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div id="message-modal" class="modal-content rounded-10-px">
            <div class="modal-header border-0">
                <button type="button cursor-pointer" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body py-2">
                <img src="" alt="" class="rounded-lg w-100 img-cover" id="modalImg">
            </div>
        </div>
    </div>
</div>-->
<!--reaction panel-->


<!--reflection form--> 
<!--<div class="modal d-none main-box font-12" data-backdrop="false" id="main-box" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <form id="submit-reflection" class="" style="border-radius: 0.25rem;">
        <div style="border: 1px solid #ced4da; border-radius: 10px; box-shadow: -1px 5px 18px -7px #000;">
            <div class="cross-mod d-flex">
                <div class="col-10 ml-2 p-2" style="font-size: medium; font-weight: 600;">Hey! It's time to reflect...</div>
                <div class="close-modal d-flex">x</div>
            </div>
            <div class="d-flex tabs">
                <div class="reaction-tab tab-active font-12" data-name="emotion"><i class="fa fa-smile-o" aria-hidden="true"></i> Emotion</div>
                <div class="reaction-tab font-12" data-name="value"><i class="fa fa-diamond" aria-hidden="true"></i> Value</div>
                <div class="reaction-tab font-12" data-name="wisdom"><i class="fa fa-lightbulb-o" aria-hidden="true"></i> Wisdom</div>
            </div>
            <div class="reactions" id="reactions">
                <label for="options" class="font-12">Select <span class="select-lable">emotion</span><span style="color: red;">*</span></label>
                <div>
                    <select class="form-control font-12" name="reaction_category">
                        <option selected disabled class="sel-opt">Select Option</option>
                    </select>
                </div>
                <div class="col-12 p-0">
                    <label for="input" class="font-12">Reflection<span style="color: red;">*</span></label>
                    <div class="align-items-center d-flex flex-column justify-content-between" style="border: 1px solid #ced4da; border-radius: 0.25rem;">
                        <textarea class="form-control reflection" placeholder="Please give reflection about this thread..." name="reflection" rows="6" no-of-characters maxlength="200" style="border: none; resize: none; font-size: smaller;"></textarea>
                           <label class="holder">
                            <span class="sdlms-text-primary-12px"><span show-characters="">0</span>/200</span>
                        </label> 
                    </div>
                </div>
                <div class="main-box mt-20-px">
                    <button class="border-0 button-lg-p font-12 submit-reflection" style="background: #0029ff; color: white;">Submit</button>
                </div>
            </div>
        </div>
    </form>
</div>-->


<!-- participant options -->
<!--<div class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right mt-5" id="participant-options">
    <div class="d-flex align-items-center mb-3" id="saved-threads">
        <i class="fas fa fa-solid fa-bookmark font-14"></i>
        <p class="font-12 ml-2 mb-0">Saved Threads</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="search-thread">
        <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/search-dr-icon.svg" alt="search-icon"
            class="icon-15">
        <p class="font-12 ml-2 mb-0">Search Thread</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="mod-list">
        <i class="fas fa fa-solid fa-users font-14"></i>
        <p class="font-12 ml-2 mb-0">Moderators List</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="dr-rules">
        <i class="fas fa fa-solid fa-book font-14"></i>
        <p class="font-12 ml-2 mb-0">Rules of the room</p>
    </div> 
    <div class="d-flex align-items-center mb-3" id="highlighted-threads">
        <i class="fa fa-solid fa-thumbtack font-14"></i>
        <p class="font-12 ml-2 mb-0">Highlighted Threads</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="mute-room">
        <i class="fas fa fa-solid fa-bell-slash font-14"></i>
        <p class="font-12 ml-2 mb-0">Mute room</p>
    </div>
    <div class="d-flex align-items-center mb-3 text-danger" id="leave-room">
        <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/leave-dr-icon.svg" alt="leave-icon"
            class="icon-15">
        <p class="font-12 ml-2 mb-0">Leave room</p>
    </div>
    
</div>-->

<!-- participant options on thread select -->
<!--<div class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right mt-5" id="participant-options-selected">
    <div class="d-flex align-items-center mb-3" id="reply-selected">
        <i class="fas fa fa-solid fa-reply font-14"></i>
        <p class="font-12 ml-2 mb-0">Reply</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="save-selected">
        <i class="fas fa fa-solid fa-bookmark font-14"></i>
        <p class="font-12 ml-2 mb-0">Save Thread</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="share-selected">
        <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/share.svg" class="icon-15"
            alt="share-icon">
        <p class="font-12 ml-2 mb-0">Share thread</p>
    </div>
    <div class="d-flex align-items-center text-danger" id="report-selected">
        <i class="fas fa fa-solid fa-shield font-14"></i>
        <p class="font-12 ml-2 mb-0">Report</p>
    </div>
</div>-->

<!-- mod options -->
<!--<div class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right" id="mod-options">
    <div class="d-flex align-items-center mb-3" id="saved-threads">
        <i class="fas fa fa-solid fa-bookmark font-14"></i>
        <p class="font-12 ml-2 mb-0">Saved Threads</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="search-thread">
        <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/search-dr-icon.svg" alt="search-icon"
            class="icon-15">
        <p class="font-12 ml-2 mb-0">Search Thread</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="mod-list">
        <i class="fas fa fa-solid fa-users font-14"></i>
        <p class="font-12 ml-2 mb-0">Moderators List</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="dr-rules">
        <i class="fas fa fa-solid fa-book font-14"></i>
        <p class="font-12 ml-2 mb-0">Rules of the room</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="highlighted-threads">
        <i class="fa fa-solid fa-thumbtack font-14"></i>
        <p class="font-12 ml-2 mb-0">Highlighted Threads</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="reported-threads">
        <i class="fas fa fa-solid fa-shield font-14"></i>
        <p class="font-12 ml-2 mb-0">Reported Threads</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="mute-room">
        <i class="fas fa fa-solid fa-bell-slash font-14"></i>
        <p class="font-12 ml-2 mb-0">Mute room</p>
    </div>
    <div class="d-flex align-items-center mb-3 text-danger" id="leave-room">
        <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/leave-dr-icon.svg" alt="leave-icon"
            class="icon-15">
        <p class="font-12 ml-2 mb-0">Leave room</p>
    </div>
    <div class="d-none d-flex align-items-center text-danger" id="delete-room">
        <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/delete-dr-icon.svg" alt="leave-icon"
            class="icon-15">
        <p class="font-12 ml-2 mb-0">Delete room</p>
    </div>
    
</div>-->

<!-- mod options on thread select -->
<!--<div class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right" id="mod-options-selected">
    <div class="d-flex align-items-center mb-3" id="reply-selected">
        <i class="fas fa fa-solid fa-reply font-14"></i>
        <p class="font-12 ml-2 mb-0">Reply</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="save-selected">
        <i class="fas fa fa-solid fa-bookmark font-14"></i>
        <p class="font-12 ml-2 mb-0">Save Thread</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="share-selected">
        <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/share.svg" class="icon-15"
            alt="share-icon">
        <p class="font-12 ml-2 mb-0">Share thread</p>
    </div>
    <div class="d-flex align-items-center mb-3" id="highlight-selected">
        <i class="fa fa-solid fa-thumbtack font-14"></i>
        <p class="font-12 ml-2 mb-0">Highlight Thread</p>
    </div>
    <div class="d-flex align-items-center text-danger mb-3" id="delete-selected">
        <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/delete-dr-icon.svg" alt="delete-icon"
            class="icon-15">
        <p class="font-12 ml-2 mb-0">Delete Thread</p>
    </div>
    <div class="d-flex align-items-center text-danger" id="remove-selected">
        <i class="fa fa-solid fa-user-minus font-14"></i>
        <p class="font-12 ml-2 mb-0">Remove user</p>
    </div>
</div>



<div id="wrapper" class="toggled mod-toggled">-->

    <!-- Sidebar -->
    <!--<div id="sidebar-wrapper">
        <div class="sidebar-nav">-->
            <!-- sidebar header -->
            <!--<div class="d-flex justify-content-between align-items-center px-2 py-2 mb-3 shadow-sm secondary-bg"
                id="sidebar-header">
                <div class=" d-flex align-items-center">
                    <i class="fa fa-solid fa-thumbtack"></i>
                    <p class="mb-0 ml-1 font-bold">Highlighted Threads</p>
                </div>
                <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/black-cross.svg"
                    id="close-highlighted">
            </div>
            <div class="px-3" id="highlighted-body"></div>
        </div>
    </div>-->
    <!-- /#sidebar-wrapper -->

    <!-- mod Sidebar -->
    <!--<div id="mod-sidebar-wrapper">
        <div class="sidebar-nav">-->
            <!-- sidebar header -->
            <!--<div class="d-flex justify-content-between align-items-center px-2 py-2 mb-3 shadow-sm secondary-bg"
                id="sidebar-header">
                <div class=" d-flex align-items-center">
                    <i class="fa fa-solid fa-thumbtack"></i>
                    <p class="mb-0 ml-1 font-bold">Highlighted Threads</p>
                </div>
                <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/black-cross.svg"
                    id="close-highlighted">
            </div>-->
            <!-- sidebar body -->
            <!--<div class="px-3" id="mod-highlighted-body"></div>-->
            <!-- sidebar footer -->
            <!--<div class="primary-bg d-flex justify-content-center align-items-center py-2 text-danger"
                id="sidebar-footer">
                <p class="font-14 mb-0">Remove Highlighted Thread</p>
            </div>
        </div>
    </div>-->

    <!-- Page Content -->
    <!--<div id="page-content-wrapper" class="pt-5 px-0 pb-0" style="width: 100%!important;">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    header 
                    <div class="fixed-top" id="dr-header">
                        <div
                            class="dr-header d-flex justify-content-between align-items-center py-2 px-3 secondary-bg" style="box-shadow: 0 .125rem .25rem rgba(0,0,0,0.25)!important">
                            <div class="dr-name d-flex align-items-center">
                                <div class="backBtn pr-2"><i class="fa fa-arrow-left" aria-hidden="true" style=" font-size: smaller;"></i></div>
                                <img src="" alt="tesla roadster" class="circle-sm rounded-circle mr-2 img-cover" id="room-img">
                                <p class="font-bold  mb-0" id="room-title"></p>
                            </div>
                            <button class="border-0 bg-transparent" type="button" id="menu-btn">
                                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                            </button> 
                        </div>
                    </div>-->

                     <!--search thread -->
                    <!--<div class="d-none fixed-top" id="search-thread-box">
                        <div class="d-flex justify-content-between align-items-center py-1 shadow-sm px-3 secondary-bg">
                            <i class="fas fa fa-solid fa-arrow-left mr-2" id="close-search"></i>
                            <input type="search" name="search-thread-input" id="search-thread-input"
                                class="form-control " placeholder="Search Thread">
                        </div>
                    </div>-->

                    <!-- intro boxes: rules and suggested article -->
                    <!--<div id="intro-boxes">
                        <div class="primary-bg rounded-10-px border-secondary p-3 mb-3" id="room-rules-text">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class=" mb-0">Rules of Discussion Room:</p>
                               <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/black-cross.svg" id="close-rules">

                            </div>
                            <ol class="font-12 mb-0 pl-3 mt-2" id="rules-list">
                            </ol>
                        </div>

                        <div class="primary-bg rounded-10-px border-secondary px-3 pt-3 pb-1 mb-3"
                            id="room-article-text">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="font-14 mb-0">Article Recommended by the host:</p>
                                <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/black-cross.svg"
                                    id="close-article">
                            </div>
                            <div class="m-3 secondary-bg d-flex justify-content-between align-items-center py-1 px-3 rounded-10-px shadow-sm"
                                id="article-container">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>-->
    <!-- /#page-content-wrapper -->

    <!-- attachment options -->
    <!--<div class="d-none attachments-menu">
        <div
            class="secondary-bg shadow-sm primary-border rounded-10-px d-inline-flex flex-column py-2 px-1 justify-content-between align-items-center">

            <input type="file" class="form-control-file d-none" name="files" id="event-img" />
            <label for="event-img" class="mb-2">
                <i class="fas fa fa-solid fa-file"></i>
            </label>

            <input type="file" accept="image/*" name="files" class="form-control-file d-none" id="event-img" />
            <label for="event-img" class="mb-2">
                <i class="fas fa fa-solid fa-image"></i>
            </label>

            <input type="file" accept="image/*" name="files" class="form-control-file d-none" id="event-img" />
            <label for="event-img" class="mb-0">
                <i class="fas fa fa-solid fa-camera"></i>
            </label>
        </div>
    </div>-->

    <!-- text field -->
    <!--<div class="fixed-bottom pb-3 px-3 grey-background" id="dr-footer" style="background: #f5f5f5;">
        <form action="" id="chatbox">
            <div class="reply-to">
                <p id="replyto"></p>
            <div class="input-group">
                <textarea type="text" class="form-control font-12 rounded-lg mr-2" placeholder="Type a message" name="chatbox"
                    id="chat-input" style=" height: 40px;"></textarea>
                <div class="input-group-append" id="button-addon4">
                     <button class="border-0 ml-1 bg-transparent " id="attachments-btn" type="button">-->
                         <!--<i class="fas fa fa-solid fa-paperclip"></i>-->
                   <!--  </button>-->
                    <!-- <button class="border-0 bg-transparent ml-1 attachment" id="attachments-btn" type="button">
                    <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/paperclip-solid.svg" alt="" class="circle-xsm attachment">
                    </button> 
                    <button class="border-0 brand-text ml-1 bg-transparent" type="submit" id="submit-thread">
                        <i class="fa fa-solid fa-lg fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
        </form>

    </div>
</div>-->

<!-- leave modal -->
<!--<div class="modal fade" id="leave-room-modal" tabindex="-1" aria-labelledby="leave-room-modal-label" aria-hidden="true">
    <div class="modal-dialog p-4 m-0">
        <div class="modal-content secondary-bg rounded-10-px">
            <div class="modal-body">
                <div class="d-flex justify-content-center mb-1">
                    <p class=" font-medium text-center">Are you sure you want to leave the discussion room?
                    </p>
                </div>
                <div class="d-flex justify-content-between px-5">
                    <button type="button" class="button-tertiary-brand-text font-14 border-0"
                        id="cancel-leave">Cancel</button>
                    <button type="button" class="button-tertiary text-danger font-14 border-0"
                        id="leave-final">Leave</button>
                </div>
            </div>
        </div>
    </div>
</div>-->


<!-- delete modal -->
<!--<div class="modal fade" id="delete-room-modal" tabindex="-1" aria-labelledby="delete-room-modal-label" aria-hidden="true">
    <div class="modal-dialog p-4 m-0">
        <div class="modal-content secondary-bg rounded-10-px">
            <div class="modal-body">
                <div class="d-flex justify-content-center mb-1">
                    <p class=" font-medium text-center">Are you sure you want to delete the discussion room?
                    </p>
                </div>
                <div class="d-flex justify-content-between px-5">
                    <button type="button" class="button-tertiary-brand-text font-14 border-0"
                        id="cancel-delete">Cancel</button>
                    <button type="button" class="button-tertiary text-danger font-14 border-0"
                        id="delete-ok">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>-->

<!-- report modal -->
<!--<div class="modal fade" id="report-thread-modal" tabindex="-1" aria-labelledby="report-thread-modal-label"
    aria-hidden="true">
    <div class="modal-dialog p-4 m-0">
        <div class="modal-content secondary-bg rounded-10-px">
            <div class="modal-body">
                <div class="d-flex justify-content-center mb-1">
                    <p class=" font-medium text-center">Are you sure you want to report this thread?
                    </p>
                </div>
                <div class="d-flex justify-content-between px-5">
                    <button type="button" class="button-tertiary-brand-text font-14 border-0"
                        id="cancel-report">Cancel</button>
                    <button type="button" class="button-tertiary text-danger font-14 border-0"
                        id="report-final">Report</button>
                </div>
            </div>
        </div>
    </div>
</div>-->

<!-- mod leave modal -->
<!--- seems to be deprecated -->
<!--<div class="modal fade" id="mod-leave-modal" tabindex="-1" aria-labelledby="mod-leave-modal-label" aria-hidden="true">
    <div class="modal-dialog p-4 m-0">
        <div class="modal-content secondary-bg rounded-10-px">
            <div class="modal-body">
                <div class="search-participant mb-3">
                    <input type="search" name="search-participant-box" id="search-participant-box"
                        class="form-control font-12" placeholder="Search participants list">
                    <div class="row mt-3">
                        <div class="col-6 d-flex align-items-center mb-2 pariticipant-selectable">
                            <img src="https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358__340.jpg"
                                alt="man1" class="img-cover circle-sm rounded-circle">
                            <div class="ml-1">
                                <p class="font-12 mb-0">Adam Spintzer</p>
                                <p class="font-10 brand-text mb-0">Moderator</p>
                            </div>
                        </div>
                        <div class="col-6 d-flex align-items-center mb-2 pariticipant-selectable">
                            <img src="https://static01.nyt.com/images/2019/11/17/books/review/17Salam/Salam1-superJumbo.jpg"
                                alt="man1" class="img-cover circle-sm rounded-circle">
                            <div class="ml-1">
                                <p class="font-12 mb-0">July Cramer</p>
                                <p class="font-10 brand-text mb-0">Moderator</p>
                            </div>
                        </div>
                        <div class="col-6 d-flex align-items-center mb-2 pariticipant-selectable">
                            <img src="https://www.thoughtco.com/thmb/jIUclL8nYDNm5ikjNTHoAtRnKxg=/735x0/good-looking-man-with-big-beard-56688bcf3df78ce1611f7ba8.jpg"
                                alt="man1" class="img-cover circle-sm rounded-circle">
                            <p class="font-12 ml-1 mb-0">Arnold Parker</p>
                        </div>
                        <div class="col-6 d-flex align-items-center mb-2 pariticipant-selectable">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500g"
                                alt="man1" class="img-cover circle-sm rounded-circle">
                            <p class="font-12 ml-1 mb-0">Sam Cardon</p>
                        </div>
                        <div class="col-6 d-flex align-items-center mb-2 pariticipant-selectable">
                            <img src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/12/NINTCHDBPICT000546900214.jpg"
                                alt="man1" class="img-cover circle-sm rounded-circle">
                            <p class="font-12 ml-1 mb-0">Ally Lotti</p>
                        </div>
                        <div class="col-6 d-flex align-items-center mb-2 pariticipant-selectable">
                            <img src="https://cdn.episode.ninja/file/episodeninja/6404757.jpg" alt="man1"
                                class="img-cover circle-sm rounded-circle">
                            <p class="font-12 ml-1 mb-0">Crony Parkinson</p>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between px-5">
                    <button type="button" class="button-tertiary-brand-text font-14 border-0"
                        id="cancel-leave">Cancel</button>
                    <button type="button" class="button-tertiary text-danger font-14 border-0"
                        id="leave-final">Leave</button>
                </div>
            </div>
        </div>
    </div>
</div>-->

<!-- mod delete thread modal -->
<!--<div class="modal fade" id="delete-thread-modal" tabindex="-1" aria-labelledby="delete-thread-modal-label"
    aria-hidden="true">
    <div class="modal-dialog p-4 m-0">
        <div class="modal-content secondary-bg rounded-10-px">
            <div class="modal-body">
                <div class="d-flex justify-content-center mb-1">
                    <p class=" font-medium text-center">Are you sure you want to delete this thread?
                    </p>
                </div>
                <div class="d-flex justify-content-between px-5">
                    <button type="button" class="button-tertiary-brand-text font-14 border-0"
                        id="cancel-delete">Cancel</button>
                    <button type="button" class="button-tertiary text-danger font-14 border-0"
                        id="delete-final">delete</button>
                </div>
            </div>
        </div>
    </div>
</div>-->

<!-- mod remove user modal -->
<!--<div class="modal fade" id="remove-user-modal" tabindex="-1" aria-labelledby="remove-user-modal-label"
    aria-hidden="true">
    <div class="modal-dialog p-4 m-0">
        <div class="modal-content secondary-bg rounded-10-px">
            <div class="modal-body">
                <div class="d-flex justify-content-center mb-1">
                    <p class=" font-medium text-center">Are you sure you want to remove this user?
                    </p>
                </div>
                <div class="d-flex justify-content-between px-5">
                    <button type="button" class="button-tertiary-brand-text font-14 border-0"
                        id="cancel-remove">Cancel</button>
                    <button type="button" class="button-tertiary text-danger font-14 border-0"
                        id="remove-final">remove</button>
                </div>
            </div>
        </div>
    </div>
</div>-->

<!-- report options modal -->
<!--<div class="modal fade" id="report-thread-reason-modal" tabindex="-1" aria-labelledby="report-thread-reason-modal-label"
    aria-hidden="true">
    <div class="modal-dialog p-4 m-0">
        <div class="modal-content secondary-bg rounded-10-px">
            <div class="modal-body">
                <div class="d-flex justify-content-center mb-1">
                    <p class="mb-0 font-medium text-center">What do you want to report this message for?</p>
                </div>
                <div>
                    <hr class="mb-0">
                    <button type="button"
                        class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3">Fake
                        news</button>
                    <hr class="m-0">
                    <button type="button"
                        class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3">Discriminatory
                        comment</button>
                    <hr class="m-0">
                    <button type="button"
                        class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3">Sexual
                        content</button>
                    <hr class="m-0">
                    <button type="button"
                        class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3">Irrelevent</button>
                    <hr class="m-0">
                    <button type="button"
                        class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3">Spam</button>
                    <hr class="m-0">
                    <button type="button"
                        class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3">Promotional
                        content</button>
                    <hr class="mt-0 mb-2">
                </div>
            </div>
        </div>
    </div>
</div>-->