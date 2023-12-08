<div class="modal fade" id="privatePublic" tabindex="-1" role="dialog" aria-labelledby="privatePublic" aria-hidden="true">
    <div class="modal-dialog modal-lg" style="position: relative; width: 100%; margin: 2rem auto;" role="document">
        <div class="modal-content border-0 sdlms-section" style="height: auto;">
            <div class="modal-header primary-header sdlms-section-header align-items-center sdlms-text-white-20px" style="height: 56px; max-height: 56px; border-radius: 1rem 1rem 0 0;">
                <h5 class="modal-title" id="newAssociateScorecard">Make project private</h5>
                <button type="button" class="close close-modal text-white" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body" style="height: 300px;">
                <div class="draft-screen">
                    <div class="mt-3" style="font-size: var(--sdlms-font-size-20);">
                        <b>Dtthon will be accessible to selected people</b>
                        <div class="mt-3 text-danger"></div>
                    </div>
                    <div class="col-6 form-group">
						<label for="usage" class="bold-medium-font">Select users from the list</label>
						<select class="form-control" id="selectAllowedUsers" multiple="multiple"></select>
					</div>
                    <!-- <div class="col-md-6 pl-0">
                        <div class="d-flex flex-column align-items-center mt-4 justify-content-between">
                            <select scorecards-select="" required="" data-value="" class="cursor-pointer label-radius align-item-center form-control pl-3" name="asset_content_type" style="z-index: 1;"> </select>
                        </div>
                    </div> -->
                    <div class="col-12 p-0 pt-4 d-flex align-items-center justify-content-end">
                        <button type="submit" class="button sdlms-button button-lg d-flex align-items-center button-primary" allowPeopleDTthon data-dismiss="modal" aria-label="Close">Done</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>