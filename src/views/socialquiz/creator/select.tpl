
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" rel="stylesheet" />

<div class = "sdlms-section session-view sdlms-form-elements">
    <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
        <div class="align-items-center sdlms-text-white-20px" style="text-align: center;">
            <span class="sdlms-floating-left">
                <svg class="back-btn" width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z" fill="white"></path>
                    <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4"></line>
                </svg>
            </span>
            <div><span class="headerSQ">Select Quiz</span><span class="qName"></span></div>
        </div>
    </div>
    <div class="sdlms-section-body d-flex justify-content-center selectQuizBody">
        <select quiz-dropdown required data-value class="cursor-pointer label-radius align-item-center form-control pl-3 w-50" name="asset_content_type" style="z-index: 1;box-shadow: var(--primary-box-shadow);"> </select>
        <button id='moveToControls' class="button-lg button-primary sdlms-button ">Go to controls</button>
    </div>
</div>    
