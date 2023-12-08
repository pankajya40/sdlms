<h1>Search Here</h1>

<div class="container mt-5">
    <div search-bar class="mx-auto sdlms-article-search-bar row">
        <form class="sdlms-search-bar col-12">
            <input type="search" name="term" placeholder="Search for member..." class="vsdlms-text-tertiary-16px p-2 rounded">
            <button type="submit" class="ml-2">
                <i class="fas fa-search"></i>
            </button>
        </form>
    </div>

    <div class="sdlms-articles-section-heading mb-2">
        <span class="font-weight-700">Results</span> for "{query}"
    </div>
    <div class="mb-2 sdlms-text-black-25px">
        <span class="font-weight-500">Found</span> {total} result(s)
    </div>


    <div class="row mt-3" id="members_list">
        
    </div>
</div>

<!-- IMPORT sdlms/assets/navigation.tpl -->