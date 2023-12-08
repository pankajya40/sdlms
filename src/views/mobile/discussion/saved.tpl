<div
        class="fixed-top dr-header d-flex justify-content-between container align-items-center py-1 shadow-sm secondary-bg">
        <div class="dr-name d-flex align-items-center">
            <button class="bg-transparent border-0 back-btn">
                <i class="fas fa fa-solid fa-arrow-left mr-2"></i>
            </button>
            <img src="{roomData.image}" alt="tesla roadster"
                class="circle-sm rounded-circle mr-1 img-cover">
            <div class="d-flex flex-column justify-content-center">
                <p class="font-bold font-14 mb-0">{roomData.name}</p>
                <p class="font-10 mb-0">Saved Threads</p>
            </div>
        </div>
    </div>

    <div class="d-none floating-right rounded-10-px secondary-bg py-3 px-2 shadow-sm">
        <p class="font-medium font-12 mb-3">Sort</p>
        <div class="d-flex align-items-center mb-3">
            <i class="fas fa font-12 fa-solid fa-calendar-plus"></i>
            <p class="font-10 ml-2 mb-0">Most recent</p>
        </div>
        <div class="d-flex align-items-center mb-3">
            <i class="fas fa font-12 fa-solid fa-calendar-minus"></i>
            <p class="font-10 ml-2 mb-0">Least recent</p>
        </div>
        <div class="d-flex align-items-center mb-3">
            <i class="fas fa font-12 fa-solid fa-comments"></i>
            <p class="font-10 ml-2 mb-0">Most discussions</p>
        </div>
        <div class="d-flex align-items-center">
            <i class="fas fa font-12 fa-solid fa-arrow-trend-up"></i>
            <p class="font-10 ml-2 mb-0">Trending</p>
        </div>
    </div>

    <div class="container pt-5" id="saved-messages-container"></div>

    