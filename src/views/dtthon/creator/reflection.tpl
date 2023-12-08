<style>
    .questions {
        padding-bottom: 1em;
    }

    .question-trash {
        cursor: pointer;
    }
</style>

<div class="sdlms-section session-view sdlms-form-elements">
    <div
        class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
        <div class="align-items-center sdlms-text-white-20px" style="text-align: center;">
            <span class="sdlms-floating-left">
                <svg back-btn width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z" fill="white"></path>
                    <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4"></line>
                </svg>
            </span>
            Reflection Generator
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-6 p-4">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Did you learn anything new?"
                    aria-label="Reflection Question" aria-describedby="button-addon2">
                <div class="input-group-append">
                    <button class="btn btn-primary" type="button" id="button-addon2" addQuestion>Add</button>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-center questions">
        <!-- BEGIN reflection -->
        <div class="col-8 p-1">
            <div class="card shadow-sm">
                <div class="row align-items-center">
                    <div class="card-body col-11">
                        This is some text within a card body.
                    </div>
                    <div class="col-1 question-trash"><i class="fa fa-trash" aria-hidden="true"></i></div>
                </div>
            </div>
        </div>
        <!-- END reflection -->
        <div class="col-8 p-1">
            <div class="card shadow-sm">
                <div class="row align-items-center">
                    <div class="card-body col-11">
                        This is some text within a card body.
                    </div>
                    <div class="col-1 question-trash"><i class="fa fa-trash" aria-hidden="true"></i></div>
                </div>
            </div>
        </div>
        <div class="col-8 p-1">
            <div class="card shadow-sm">
                <div class="row align-items-center">
                    <div class="card-body col-11">
                        This is some text within a card body.
                    </div>
                    <div class="col-1 question-trash"><i class="fa fa-trash" aria-hidden="true"></i></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>