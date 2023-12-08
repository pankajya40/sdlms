<div class="primary-bg py-3">
    <div class="container secondary-bg py-3 rounded-lg">
        <div class="d-flex align-items-center">
            <img src="{author.picture}"
                alt="img" class="img-cover circle-md rounded-circle" id="author-img">
            <p class="font-14 brand-text ml-3 mb-0" id="author-name"></p>
        </div>
        <p class="font-12 text-center mt-3" id="summary-text"></p>

        <div class="accordion" id="reflectionAccordion"></div>

        <div class="mt-5 rounded-lg px-2 py-3 primary-bg" id="confirm-summary">
            <p class="mb-0 font-12">Your summary will be shown as preview of your reflection to other viewers. You
                can click on the summary preview if you
                would like to edit it</p>
        </div>

    </div>

    <div class="fixed-bottom pb-4 d-flex justify-content-between container" id="confirm-btns">
        <button class="button-secondary border-0 rounded-lg font-12 button-lg-p" id="prev-btn">Previous</button>
        <button class="button-brand border-0 rounded-lg font-12 button-lg-p asset-create-btn" id="confirm-btn">Confirm</button>
    </div>
</div>

<!-- IMPORT mobile/loader.tpl -->