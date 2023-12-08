<div class="primary-bg">
  <div class="create-post-box d-flex flex-column bg-white shadow-sm rounded-10-px my-3 p-3">

  <div class="alert alert-warning alert-dismissible fade d-none position-absolute mr-3" style="z-index: 100;" id="article-alert" role="alert">
    You can only embed one Article, remove the attached Article if you wish to add a different one
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  <div class="alert alert-warning alert-dismissible fade d-none position-absolute mr-3" style="z-index: 100;" id="discussion-alert" role="alert">
    You can only embed three Discussions, remove one of the attached Discussions if you wish to add a different one
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

    <div class="create-post-heading d-flex flex-column">
      <h2 class="font-18 font-small">Learnt something fun?</h2>
      <h2 class="font-18 font-small">Share it with others!</h2>
    </div>
    <form action="" id="post-form" class="form-group w-100">
      <div class="create-post-icons-post d-flex justify-content-between align-items-center">
        <div class="create-post-icons d-flex position-relative">
          <div
            class="attachments d-none shadow-sm rounded-10-px bg-white px-3 py-2 justify-content-between align-items-center mb-2"
            style="top: 0; z-index: 2">
            <div class="cross-icon mx-2">
              <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/cross.svg" alt="" />
            </div>
            <div class="article-link mx-2" id="articles-btn">
              <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/article-link.svg" alt="" />
            </div>
            <div class="dr-link mx-2" id="discussions-btn">
              <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/DR-link.svg" alt="" />
            </div>
            <div class="attach-image-icon mx-2">
              <label for="fileInput" class="mb-0">
                <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/attach-image.svg" alt="" />
              </label>
              <input id="fileInput" type="file" class="d-none position-absolute" name="files[image]" />
            </div>
          </div>

          <div id="btn-rack" class="d-flex mb-3">
            <button type="button" class="btn-icon rounded-circle button-secondary font-14 p-2 border-0 attachment circle-md mr-2">
              <i class="fa fa-solid fa-paperclip"></i>
            </button>
            <button type="button" class="btn-icon rounded-circle button-secondary font-14 p-2 border-0  circle-md mr-2 categories" data-toggle="modal" id="categories-btn">
              <i class="fa fa-solid fa-tag"></i>
            </button>
            <button type="button" class="btn-icon rounded-circle button-secondary font-14 p-2 border-0 circle-md mr-2 tp-btn">
              <i class="fa fa-solid fa-brain"></i>
            </button>
          </div>
        </div>
        <div class="d-flex">
            <button id="mobile-post-action" data-draft="true" class="mr-2 d-flex align-items-center rounded-lg brand-bg text-white px-3 py-1 mb-2 border-0">
              DRAFT
              <i class='fa fa-save pl-2'></i>
            </button>
            <button id="mobile-post-action" data-draft="false" type="submit" class="d-flex align-items-center rounded-lg brand-bg text-white px-3 py-1 mb-2 border-0 asset-create-btn">
              POST
              <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/post-btn-icon.svg" class="ml-2" alt="" />
            </button>
        </div>
      </div>
      <textarea id="post-content" class="form-group" name="content"></textarea>
    </form>
  
  <div id="attachment-info-container" class="row p-3"></div>
  </div>


  <div class="modal fade" id="categories-modal" tabindex="-1" aria-labelledby="categories-modal-label"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable rounded-10-px p-4 m-0">
      <div class="modal-content secondary-bg">
        <div class="modal-body">
          <div class="categories-tree font-12">
            <ul>
              <li collpsible>
                <div id="opener" collapse>
                  <p>Category</p>
                  <i class="fas fa fa-solid fa-chevron-down chevron-180 mr-2" collapse-icon></i>
                </div>
                <ul collapse-body id="open-categories" style="display: none;">
                </ul>
              </li>
            </ul>
          </div>
          <div class="d-flex justify-content-center mt-3">
            <button type="submit" class="button-brand button-md-p font-12" data-dismiss="categories-modal" id="submit-category">
              Submit selection
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" style="display: none"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content rounded-10-px bg-white shadow-sm">
        <div class="modal-header border-0 d-flex justify-content-center align-items-center pb-0">
          <div class="form-group w-100 position-relative">
            <input type="text" class="form-control text-center rounded-10-px w-100 pl-4"
              placeholder="Search (Article)" id="search-article" />
            <div class="filter">
              <div class="filter-icon position-absolute" style="top: 50%; transform: translate(50%, -50%)">
                <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/filter.svg" alt="" />
              </div>
              <div class="filters w-50 d-none flex-column position-absolute bg-white shadow-lg" style="z-index: 3">
                <div class="close-filter-btn mb-1 border-bottom">
                  <img class="cross-img ml-1" src="https://blog.deepthought.education/wp-content/uploads/2022/04/cross.svg" alt="" />
                </div>
                <div class="most-recent-filter border-bottom">
                  <p class="ml-1 font-8">Most Recent</p>
                </div>
                <div class="most-recent-relevant">
                  <p class="ml-1 font-8 mt-1">Most Relevant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body d-flex flex-column justify-content-center align-items-center" id="article-modal-body">
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content rounded-10-px bg-white shadow-sm">
        <div class="modal-header border-0 d-flex justify-content-center align-items-center">
          <div class="form-group w-100 position-relative">
            <input type="text" class="form-control text-center rounded-10-px w-100 pl-4"
              placeholder="Search (Discussion)" />
            <div class="filter">
              <div class="filter-icon position-absolute" style="top: 50%; transform: translate(50%, -50%)">
                <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/filter.svg" alt="" />
              </div>
              <div class="filters w-50 shadow-lg d-none flex-column position-absolute bg-white shadow-sm"
                style="z-index: 3">
                <div class="close-filter-btn mb-1 border-bottom">
                  <img class="cross-img ml-1" src="https://blog.deepthought.education/wp-content/uploads/2022/04/cross.svg" alt="" />
                </div>
                <div class="most-recent-filter border-bottom">
                  <p class="ml-1 font-8">Most Recent</p>
                </div>
                <div class="most-recent-relevant">
                  <p class="ml-1 font-8 mt-1">Most Relevant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body d-flex flex-column justify-content-center align-items-center pt-0" id="discussion-modal-body">
        </div>
      </div>
    </div>
  </div>

  
</div>

<!-- IMPORT mobile/loader.tpl -->