<style>
  .outLine:focus{
    outline: none;
  }
  .sdlms-container { padding: 0!important; width: 100%!important; }
</style>

<!-- IMPORT partials/sidebar.tpl -->

<div class="sdlms-container" id="content" component="content">
    <div class="sdlms-section session-view sdlms-form-elements">
        <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
            <div class="align-items-center sdlms-text-white-20px" style="text-align: center;">
                <div id="pageTitle">Available Templates for usage</div>
            </div>
        </div>
        <div class="sdlms-section-body">
            <div class="broadcast">
                <div class="d-flex justify-content-end pb-3">
                <a class="row mx-0 mb-2 justify-content-start" href="/communication/templates?action=create">
                    <button class="button-lg sdlms-button button-primary" id="message">Create template</button>
                  </a>
                </div>
                <div id="broadcast-details">
                <div class="border" id="templates-table"></div>
                </div>
            </div>
        </div>

    </div>



</div>

<!-- IMPORT partials/footer.tpl -->


