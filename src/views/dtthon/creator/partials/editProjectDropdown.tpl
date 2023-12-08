<style>
    #viewScorecard .modal-dialog {
        position: relative;
        width: 70rem;
        max-width: 70rem!important;
        margin: 2rem auto;
    }
    #viewScorecard .modal-body {
        padding: 0;
    }
    #viewScorecard .modal-header {
        padding: 0.6rem;
    }
    .showdescription:hover {
        cursor: pointer;
    }
</style>
<!-- IF isProjectOwner -->
<a href="/api/v3/apps/csv/submission/report?tid=1824">
    <div class="microdashboard-menu-option row">
        <div class="col-2 p-0">
            <i class="fa fa-download cursor-pointer" title="Download Submission report" aria-hidden="true"
                style="color: #0029ff; font-size: 18px;"></i><span class="sr-only">Download Submission report</span>
        </div>
        <div class="col-10 p-0">Submission Report</div>
    </div>
</a>
<div class="dropdown-divider"></div>
<!-- ENDIF isProjectOwner -->
<!-- <div class="microdashboard-menu-option row cursor-pointer" storyboard>
    <div class="col-2 p-0"><i class="mr-1 fa fa-home" aria-hidden="true" style="color: #0029ff; font-size: 18px;"></i>
    </div>
    <div class="col-10 p-0">Storyboard</div>
</div> 
<div class="dropdown-divider"></div> -->
<!-- IF !(project.category == "Event") -->
<div class="microdashboard-menu-option row cursor-pointer" flip-button>
    <div class="col-2 p-0"><img src="https://sdlms.deepthought.education/assets/uploads/files/files/flip.svg"
            class="mr-1" /></div>
    <div class="col-10 p-0">Scorecard Statistic</div>
</div>
<div class="dropdown-divider"></div>
<!-- ENDIF !(project.category == "Event") -->
<div class="microdashboard-menu-option row cursor-pointer share-project-url" data-project-tid={project.tid}>
    <div class="col-2 p-0"><i class="fa-link fas mr-1" style="color: #0029ff; font-size: 18px;" aria-hidden="true"
            data-project-tid="1824"></i></div>
    <div class="col-10 p-0">Share Project</div>
</div>
<div class="dropdown-divider"></div>
<!-- IF isProjectOwner -->
<div class="microdashboard-menu-option row cursor-pointer clone-project" data-project-tid={project.tid}>
    <div class="col-2 p-0"><i class="fa-copy fas mr-1" style="color: #0029ff; font-size: 18px;" aria-hidden="true"
            data-project-tid={project.tid}></i></div>
    <div class="col-10 p-0">Clone Project</div>
</div>
<div class="dropdown-divider"></div>
<!-- ENDIF isProjectOwner -->
<!-- IF project.scorecardId -->
<div class="microdashboard-menu-option row cursor-pointer" data-toggle="modal" data-target="#viewScorecard">
    <div class="col-2 p-0">
        <i class="mr-1 fa fa-address-card-o cursor-pointer" aria-hidden="true"
            style="color: #0029ff; font-size: 18px;"></i>
    </div>
    <div class="col-10 p-0">Associated ScoreC</div>
</div>
<div class="dropdown-divider"></div>
<!-- ENDIF project.scorecardId -->
<!-- IF isProjectOwner -->
<!-- IF !project.scorecardId -->
<div class="microdashboard-menu-option row cursor-pointer" data-toggle="modal" data-target="#associateScorecard">
    <div class="col-2 p-0">
        <i class="mr-1 fa fa-compress cursor-pointer" aria-hidden="true" style="color: #0029ff; font-size: 18px;"></i>
    </div>
    <div class="col-10 p-0">Associate ScoreC</div>
</div>
<div class="dropdown-divider"></div>
<!-- ENDIF !project.scorecardId -->
<div class="microdashboard-menu-option row cursor-pointer" faq>
    <div class="col-2 p-0">
        <i class="mr-1 fa fa-question-circle cursor-pointer" aria-hidden="true"
            style="color: #0029ff; font-size: 18px;"></i>
    </div>
    <div class="col-10 p-0">Create FAQ</div>
</div>
<div class="dropdown-divider"></div>
<div class="microdashboard-menu-option row cursor-pointer" reflection>
    <div class="col-2 p-0">
        <i class="mr-1 fa fa-question-circle cursor-pointer" aria-hidden="true"
            style="color: #0029ff; font-size: 18px;"></i>
    </div>
    <div class="col-10 p-0">Create Reflection</div>
</div>
<div class="dropdown-divider"></div>
<div class="microdashboard-menu-option row cursor-pointer" noticeboard>
    <div class="col-2 p-0"><img src="https://sdlms.deepthought.education/assets/uploads/files/files/associate.svg" class="cursor-pointer mr-1" /></div>
    <div class="col-10 p-0">Notice</div>
</div>
<div class="dropdown-divider"></div>
<div class="microdashboard-menu-option row cursor-pointer" deleteproject>
    <div class="col-2 p-0">
        <svg class="mr-1 cursor-pointer" width="14" height="20" viewBox="0 0 11 14" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z"
                fill="#0029FF"></path>
        </svg>
    </div>
    <div class="col-10 p-0">Delete Project</div>
</div>
<div class="dropdown-divider"></div>
<!--IF project.isItPrivate-->


<div class="microdashboard-menu-option row cursor-pointer" data-toggle="modal" data-target="#publicProject" id="makeProjectPublic">
    <div class="col-2 p-0">
        <i class="fa fa-user-secret" aria-hidden="true" style="color: #0029ff; font-size: 18px;"></i>
    </div>
    <div class="col-10 p-0">Make Project Public</div>
</div>
<!--ELSE-->
<div class="microdashboard-menu-option row cursor-pointer" data-toggle="modal" data-target="#privatePublic">
    <div class="col-2 p-0">
        <i class="fa fa-user-secret" aria-hidden="true" style="color: #0029ff; font-size: 18px;"></i>
    </div>
    <div class="col-10 p-0">Private Project</div>
</div>
<!--ENDIF project.isItPrivate-->
<!-- ENDIF isProjectOwner -->