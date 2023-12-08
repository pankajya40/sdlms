<section class="d-flex tabs-section project-manager-main-section" id="wrapper">
    <!-- Sidebar-->
    <div class="border-end bg-white" id="sidebar-wrapper">
        <nav class="main-menu desktop" id="assets">
            <div class="sidebar-heading sdlms-text-black-22px bold-font sidebar-head border-bottom border bg-light">Project Manager</div>
            <ul class="list-group nav nav-tabs border-right h-100">
                <li class="nav-item border-bottom d-flex align-items-center font-weight-500">
                    <a class="nav-link bold-font w-100 <!-- IF isDashboardTab -->active <!-- END isDashboardTab --><!-- IF isLeaderTab -->active <!-- END isLeaderTab -->" data-toggle="tab" href="/pdgms/projectmanager/dashboard/employee" data-item="dashboard" tab="dashboard">
                        <i class="fa fa-home icons" aria-hidden="true"></i>
                        <span>Project Dashboard</span>
                    </a>
                </li>
                <li class="nav-item border-bottom d-flex align-items-center font-weight-500">
                    <a class="nav-link bold-font w-100 <!-- IF isResultTab -->active <!-- END isResultTab -->" data-toggle="tab" href="/pdgms/projectmanager/trackers/result" tab="result-tracker">
                        <i class="fa fa-list icons" aria-hidden="true"></i>
                        Result Tracker
                    </a>
                </li>
                <li class="nav-item border-bottom d-flex align-items-center font-weight-500">
                    <a class="nav-link bold-font w-100 <!-- IF isEffortTab -->active <!-- END isEffortTab -->" data-toggle="tab" href="/pdgms/projectmanager/trackers/effort" tab="effort-tracker">
                        <i class="fa fa-check-circle icons" aria-hidden="true"></i>
                        Effort Tracker
                    </a>
                </li>
                <li class="nav-item border-bottom d-flex align-items-center font-weight-500">
                    <a class="nav-link bold-font w-100 <!-- IF isValueTab -->active <!-- END isValueTab -->" data-toggle="tab" href="/pdgms/projectmanager/trackers/value" tab="value-tracker">
                        <i class="fa fa-calendar icons" aria-hidden="true"></i>
                        Value Tracker
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    <!-- Page content wrapper-->
    <div id="page-content-wrapper">
        <!-- Top navigation-->
        <nav class="navbar navbar-expand-lg navbar-light border-bottom">
            <div class="">
                <button class="btn btn-primary button-primary" id="sidebarToggle">
                    <i data-icon="left" class="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
            </div>
        </nav>
