<nav class="sdlms-pagination" style="display:none" aria-label="pagination">
    <ul class="pagination pagination-circle justify-content-center pagination-jtcms">


        <li class="page-item mr-2 <!-- IF !pagination.isPrev -->disabled <!-- END pagination.isPrev -->">
            <a class="page-link prev" href="{pagination.prev}" aria-label="Previous">
                <span aria-hidden="true" class="p-2">
                    <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15 21.1797L5.72863 12L15 2.82031L12.1457 -1.24766e-07L-5.24537e-07 12L12.1457 24L15 21.1797Z"
                            fill="#0029FF" fill-opacity="0.8"></path>
                    </svg>
                </span>
            </a>
        </li>

        <!--Numbers-->
        <span class="d-flex align-items-center">Page {pagination.current} of {pagination.total}</span>

        <!--Arrow right-->
        <li class="page-item ml-2 <!-- IF !pagination.isNext -->disabled <!-- END pagination.isNext -->">
            <a class="page-link next" href="{pagination.next}" aria-label="Next">
                <span aria-hidden="true" class="p-2">
                    <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M-9.25794e-07 2.82031L9.27137 12L-1.2328e-07 21.1797L2.85431 24L15 12L2.85431 -1.24766e-07L-9.25794e-07 2.82031Z"
                            fill="#0029FF" fill-opacity="0.8"></path>
                    </svg>
                </span>
            </a>
        </li>
    </ul>
</nav>