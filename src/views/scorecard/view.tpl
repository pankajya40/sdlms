<style>
    html,
    body {
        --max-container-width: 100% !important;
    }
    .sdlms-container{
        padding: 0!important;
    }
    .tabs-section .nav-item:hover {
        cursor: pointer;
    }
    .tabs-section .nav-item.active .nav-link {
        color: #fff;
        background: #0029ff;
    }
    .tab-content .text-white {
        color: #fff!important;
    }
    .tabs-content .pb-4rem {
        padding-bottom: 4rem ;
    }
    .final-preview-wrapper {
        gap: 6rem;
        padding: 0 4rem 0 4rem;
    }
    .score-wrapper {
        box-shadow: 2.37037px 2.37037px 11.0617px -3.16049px rgba(0, 0, 0, 0.13); 
        width: 8rem; 
        height:8rem
    }
    .score-wrapper .score-text {
        top: 15%;
    }
    .score-wrapper .score {
        top: 50%;
    }
    .score-wrapper .sub-score, #overall-score {
        color: #0029ff;
    }
    .view-text:hover {
        cursor: pointer;
    }
    @media (max-width: 990px) {
        .final-preview-wrapper {
            flex-direction: column;
            gap: 2rem;
        }
        .final-observation-text {
            text-align: center;
        }
    }
</style>

<section>
    <div class="row">
        <div class="col-sm-2 col-lg-2 col-2 tabs-section">
            <ul class="nav nav-tabs flex-column mb-3 h-100 border-right" id="tab-box" style="margin-left: -6%;">
                <li class="nav-item border-bottom active">
                    <a class="nav-link bold-font px-4" href="#" data-toggle="tab" data-target="#tab-default" aria-expanded="true">Final Observation</a>
                </li>
                <!-- <li class="nav-item border-bottom">
                    <a class="nav-link bold-font show px-4" data-toggle="tab" data-target="#tabb">
                        Overall Observation
                    </a>
                </li> -->
            </ul>
        </div>

        <div class="col-sm-8 col-lg-10 col-10" style="min-height: 500px;">
            <div class="tab-content">
                <div class="tab-pane active tab-content-holder" id="tab-default">
                    <div class="row pt-4 px-5 pb-4rem">
                        <div class="col-12 col-lg-12 col-md-12 boxy" id="overall-observation-card">
                            <div class="final-score-box border sdlms-floating-label-input py-4 shadow-lg tab-default-box d-flex align-items-center flex-column">
                                <p class="sdlms-asset-tab sdlms-text-white-25px justify-content-center mt-2 mb-4">Overall Observation</p>
                                <div class="d-flex align-items-center final-preview-wrapper">
                                    <div id="final-score-wrapper" class="score-wrapper position-relative d-flex align-items-center flex-column justify-content-center rounded-circle mb-4">
                                        <p class="score-text sdlms-text-white-22px sdlms-asset-tab mb-0 pb-0 position-absolute">Score</p>
                                        <p class="score sdlms-asset-tab sdlms-text-white-18px mt-0 pt-0 position-absolute"><span id="overall-score">N/A</span><span id="overall-max-score"></span></p>
                                    </div>
                                    <p class="final-observation-text"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row pt-4 px-5 justify-content-center" id="observation-details"></div>
                </div>
               <!-- <div class="tab-pane active show tab-content-holder" id="tabb">
                    <div class="row">
                        <div class="d-flex justify-content-center newobs" style="width: 1500%;">                            
                        </div>
                    </div>
                </div> -->
            </div?>
        </div>
    </div>
</section>
