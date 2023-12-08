<!-- categories modal -->
<div class="modal fade" id="categories-modal" tabindex="-1" aria-labelledby="categories-modal-label"
                aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable rounded-10-px p-4 m-0">
        <div class="modal-content secondary-bg">
            <div class="modal-body">
                <div class="categories-tree font-14">
                    <ul>
                        <li collpsible>
                            <div id="opener" collapse>
                                <p>Category</p>
                                <i class="fas fa fa-solid fa-chevron-down chevron-180 mr-2" collapse-icon></i>
                            </div>
                            <ul collapse-body id="open-categories" style="display: none;"></ul>
                        </li>
                    </ul>
                </div>
                <div class="d-flex justify-content-center mt-3">
                    <button type="submit" class="button-brand button-md-p font-14"
                        id="submit-categories">Submit selection</button>
                </div>
            </div>
        </div>
    </div>
</div>

 <!-- rr modal -->
 <div class="modal fade" id="rr-modal" tabindex="-1" aria-labelledby="rr-modal-label" aria-hidden="true">
     <div class="modal-dialog rounded-10-px p-4 m-0">
         <div class="modal-content secondary-bg">
             <div class="modal-body">
                 <div class="d-flex justify-content-center mb-3">
                     <p class="font-18 font-medium">Select Rigor Rank</p>
                 </div>
                 <form>
                     <div class="d-flex justify-content-around">
                         <div class="inc-btn">
                             <i class="fas fa fa-solid fa-plus"></i>
                         </div>
                         <input type="text" name="rr" id="rr-select" value="5">
                         <div class="dec-btn">
                             <i class="fas fa fa-solid fa-minus"></i>
                         </div>
                     </div>

                     <div class="d-flex justify-content-center mt-3">
                         <input type="button" value="submit" id="submit-rr" class="button-brand button-md-p">
                     </div>
                 </form>
             </div>
         </div>
     </div>
 </div>

 <div class="primary-bg d-flex justify-content-center">
     <div class="container secondary-bg rounded-10-px mt-3 component-full">
         <div style="display: flex;align-items: center; justify-content: center;">
             <p class="font-semi-bold font-18 pt-2 mb-20-px" style="font-weight: 600;">Discussion Room Details</p>
         </div>
         <form id="create-dr-form">

             <!-- header img and name -->
             <div class="input-group mb-3">
                 <input type="text" class="form-control font-12" placeholder="Enter Discussion room name" id="dr-name"
                     aria-label="Enter Discussion room name" aria-descri 1bedby="img-btn" required>
             </div>
             <div
                 style="height: 170px; border: 1px solid #ddd; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; font-size: 25px; padding: 10px;">
                 <div id="preview-img"
                     style="width: 100%; height: 150px;display: flex; align-items: center; justify-content: center; background-position: center;  font-size: 45px; background-size: cover; background-repeat: no-repeat; background-position: center; background-color: #eee;">
                     <div class="input-group-append"
                         style="display: flex; align-items: center; justify-content: center;">
                         <div>
                             <div>
                                 <input type="file" accept="image/*" class="form-control-file d-none" id="event-img"
                                     name="files[image]">
                                 <label for="event-img"
                                     class="primary-shadow d-flex justify-content-center align-items-center mb-0 btn-fit-input rounded-right-5-px"
                                     id="profile-img">

                                     <i class="fas fa fa-solid fa-image"
                                         style="    color: #ddd; background: transparent;"></i>
                             </div>
                             <div style="color: #96999c; font-size: 15px;">Add Image</div>
                         </div>
                     </div>
                 </div>
             </div>

             <div class="d-flex justify-content-between">
                 <div class="form-group w-100 mr-1">
                     <select class="form-control font-12" id="dr-classification" name="classification">
                         <option selected disabled>Room Classification</option>
                         <option>General Discussion</option>
                         <option>Socratic Dialogue</option>
                         <option>Topic Oriented</option>
                     </select>
                 </div>

                 <div class="form-group w-100 ml-1">
                     <select class="form-control font-12" id="dr-participant-criteria" name="criteria">
                         <option selected disabled>Participant Criteria</option>
                         <option value="everyone">Everybody</option>
                         <option value="rr">Rigor Rank</option>
                         <option value="reflection">Reflection Submission</option>
                     </select>
                 </div>
             </div>

             <div class="form-group">
                 <select class="form-control font-12" id="dr-category">
                     <option id="category-placeholder" selected disabled>Select Category</option>
                 </select>
             </div>

             <div class="form-group">
                 <textarea class="form-control font-12" id="dr-description"
                     placeholder="Discussion room description. . ." rows="4" required></textarea>
                 <img style="height: 15px;float: right; margin-right: 10px; margin-top: -80px; "
                     src="https://img.icons8.com/material/24/96999c/multiline-text.png" />
             </div>
             <div class="form-group">
                 <textarea class="form-control font-12" id="dr-rules" rows="3"
                     placeholder="Discussion room rules. . ."></textarea>
                 <img style="height: 15px;float: right; margin-right: 10px; margin-top: -63px; "
                     src="https://img.icons8.com/material/24/96999c/multiline-text.png" />
             </div>

             <div class="form-group mb-3">
                 <input type="text" class="form-control font-12" placeholder="Are you promoting an event?"
                     id="events-search" aria-label="Are you promoting an event?" aria-describedby="img-btn">
                 <div class="bg-white rounded-bottom px-2 d-none" id="events-menu"></div>
             </div>

             <div class="form-group mb-20-px">
                 <input type="search" class="form-control font-12" id="username-search" placeholder="Add co-moderators">
                 <div class="bg-white rounded-bottom px-2 d-none" id="users-menu">
                     <div id="user-menu-content"></div>
                 </div>
                 <img style="height: 15px; float: right; margin-right: 10px; margin-top: -27px;"
                     src="https://img.icons8.com/material/24/96999c/add-user-group-man-man--v1.png" />
             </div>

             <div id="events-holder" class="mt-3"></div>

             <div id="mod-holder" class="mt-3 mb-20-px"></div>

             <div class="pb-5">
                 <button type="submit" class="button-primary button-lg-p font-12 floating-right asset-create-btn"
                     style=" float: right; border: none; padding: 5px; border-radius: 5px; margin-top: 10px; background-color: #0029FF;">Create
                     Room</button>
             </div>

         </form>
     </div>
</div>