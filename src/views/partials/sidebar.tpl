<section class="d-flex tabs-section leaves-tracker-main-section" id="wrapper">
    <!-- Sidebar-->
    <div class="border-right bg-white position-relative" id="sidebar-wrapper">
        <button class="d-none" id="sidebarToggle">
            <i data-icon="left" class="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <ul class="list-group nav nav-tabs border-right h-100">
            <!-- BEGIN sidebar -->
            <li class="nav-item border-bottom d-flex align-items-center font-weight-500">
                <a class="nav-link bold-font w-100 {sidebar.classes}" <!-- IF sidebar.url -->
                    href="{sidebar.url}"
                    <!-- ELSE -->
                    data-toggle="tab" href="#container-{sidebar.id}"
                    <!-- ENDIF -->
                    >
                    <i class="{sidebar.icon} icons" aria-hidden="true"></i>
                    <span id='sidebar-title'>{sidebar.title}</span>
                </a>
            </li>

            <!-- END sidebar -->
             <!-- IF faqs -->
            <!-- <li class="nav-item border-bottom d-flex align-items-center font-weight-500">
                <a class="nav-link bold-font w-100" href="/observation/videoref/faqs">
                    <i class="fas fa fa-question-circle-o icons" aria-hidden="true"></i>
                    <span id="sidebar-title">FAQs</span>
                </a>
            </li> -->
            <!-- ENDIF faqs -->
        </ul>
    </div>

    <!-- Page content wrapper-->
    <div id="page-content-wrapper">
        <!-- Top navigation-->
        <nav class="navbar navbar-expand-lg navbar-light">
            <!-- IF backUrl -->
            <a class="mr-2 mb-4" href="{backUrl}">
                <i data-icon="left" class="fa fa-chevron-left" aria-hidden="true"></i>
            </a>
            <!-- ENDIF -->
            <h5 class="bold-font mb-4" style="font-family: var(--sdlms-font-family-poppins);">{title}</h3>

        </nav>
        <!-- Page content-->
        <div class="tabs-container w-100">
            <div class="tab-content">