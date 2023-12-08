<!-- IMPORT partials/sidebar.tpl -->

<!-- IMPORT contentManager/partials/feedback.tpl -->

<div class="mt-3 container-fluid">
    <div class="filter-container d-flex view-tab">

        <input type="text" class="border form-control mr-3 p-3 shadow-none" id="titleSearch"
            placeholder="search content by title" />
        <select user-name-select-for-view required data-value id="searchBy"
            class="cursor-pointer label-radius align-item-center form-control pl-3" style=" padding:10px !important;">
        </select>
    </div>
    <div id="content-info-cards" class="d-flex flex-wrap"></div>

<!-- IMPORT contentManager/partials/navigation.tpl -->
</div>

<!-- IMPORT partials/footer.tpl -->