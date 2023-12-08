<div class="bg-light shadow-sm container d-flex align-items-center justify-content-between py-2 position-fixed">
    <p class="font-semi-bold mb-0">My Nudges</p>
    <button class="bg-transparent border-0 px-2" id="filtering-btn">
        <img src="https://blog.deepthought.education/wp-content/uploads/2022/05/sort-dashes.svg" alt="sort dashes">
    </button>
</div>

<div class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right" id="filtering-options">
    <div class="d-flex align-items-center mb-3 filter-opt" data-filterby="upcoming">
        <i class="fas fa fa-solid fa-bookmark font-14"></i>
        <p class="font-12 ml-2 mb-0">Upcoming nudges</p>
    </div>
    <div class="d-flex align-items-center mb-3 filter-opt" data-filterby="ongoing">
        <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/search-dr-icon.svg" alt="search-icon" class="icon-15">
        <p class="font-12 ml-2 mb-0">On going nudges</p>
    </div>
    <div class="d-flex align-items-center mb-3 filter-opt" data-filterby="articles">
        <i class="fas fa fa-solid fa-users font-14"></i>
        <p class="font-12 ml-2 mb-0">Article nudges</p>
    </div>
    <div class="d-flex align-items-center filter-opt" data-filterby="events">
        <i class="fas fa fa-solid fa-book font-14"></i>
        <p class="font-12 ml-2 mb-0">Event nudges</p>
    </div>
</div>

<div class="pt-5" id="page-container"></div>

<div id="page-checker"></div>

<!-- IMPORT mobile/loader.tpl -->