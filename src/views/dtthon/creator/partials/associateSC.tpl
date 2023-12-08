<!-- When scorecard is not associated this modal lets user associate a scorecard -->
<div class="modal fade" id="associateScorecard" tabindex="-1" role="dialog" aria-labelledby="newAssociateScorecard" aria-hidden="true">
    <div class="modal-dialog modal-lg" style="position: relative; width: 100%; margin: 2rem auto;" role="document">
        <div class="modal-content border-0 sdlms-section" style="height: auto;">
            <div class="modal-header primary-header sdlms-section-header align-items-center sdlms-text-white-20px" style="height: 56px; max-height: 56px; border-radius: 1rem 1rem 0 0;">
                <h5 class="modal-title" id="newAssociateScorecard">Associate Scorecard</h5>
                <button type="button" class="close close-modal text-white" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body" style="height: 300px;">
                <div class="draft-screen">
                    <div class="mt-3" style="font-size: var(--sdlms-font-size-20);">
                        <b>What if feelings develop in reference to your project? Everybody has emotions, but how can you measure them? If you wanted to assess the person's feelings while they were working on the project? </b>
                        <div class="mt-3 text-danger">Once your scorecard is associated, you cannot change it.</div>
                    </div>
                    <div class="col-md-6 pl-0">
                        <div class="d-flex flex-column align-items-center mt-4 justify-content-between">
                            <select scorecards-select="" required="" data-value="" class="cursor-pointer label-radius align-item-center form-control pl-3" name="asset_content_type" style="z-index: 1;"> </select>
                        </div>
                    </div>
                    <div class="col-12 p-0 pt-4 d-flex align-items-center justify-content-end">
                        <button type="submit" class="button sdlms-button button-md d-flex align-items-center button-primary" associate-scorecard disabled data-dismiss="modal" aria-label="Close">Associate Scorecard</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- When scorecard is associated this modal shows the scorecard -->
<div class="modal fade" id="viewScorecard" tabindex="-1" aria-hidden="true" aria-labelledby="scorecard-title">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="scorecard-title"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <div id="attribute-box"></div>
            </div>
        </div>
    </div>
</div>