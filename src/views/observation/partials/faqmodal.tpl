
<!-- BEGIN faqs -->
    <!-- IF isAdmin -->
  <!--  <div class="w-100 d-flex justify-content-end">
        <svg class="cursor-pointer" id="deletefaq" faqs-id="{faqs._id}" xmlns="http://www.w3.org/2000/svg"
            width="25" height="25" viewBox="0 0 50 50" fill="none">
            <rect width="50" height="50" rx="10" fill="#F1F1F1" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M22.5411 15.0165C21.8485 15.0165 21.287 15.578 21.287 16.2706H28.8118C28.8118 15.578 28.2503 15.0165 27.5576 15.0165H22.5411ZM31.32 18.7789H18.7787V31.3202C18.7787 33.3981 20.4632 35.0826 22.5411 35.0826H27.5576C29.6356 35.0826 31.32 33.3981 31.32 31.3202V18.7789ZM16.2705 18.7789V31.3202C16.2705 34.7834 19.0779 37.5908 22.5411 37.5908H27.5576C31.0208 37.5908 33.8283 34.7834 33.8283 31.3202V18.7789H35.0824C35.7751 18.7789 36.3366 18.2174 36.3366 17.5248C36.3366 16.8321 35.7751 16.2706 35.0824 16.2706H31.32C31.32 14.1927 29.6356 12.5082 27.5576 12.5082H22.5411C20.4632 12.5082 18.7787 14.1927 18.7787 16.2706H15.0163C14.3237 16.2706 13.7622 16.8321 13.7622 17.5248C13.7622 18.2174 14.3237 18.7789 15.0163 18.7789H16.2705Z"
                fill="#333333" />
        </svg>
    </div> -->
    <!-- END isAdmin -->
        <div class="card mb-3" collpsible>
            <div class="Scard-header p-1" id="headingOne" style="background: linear-gradient(180deg, #e6effd 7%, rgba(235, 238, 252, 0.62) 41.5%);">
                <div class="mb-0">
                    <div collapse class="btn cursor-pointer d-flex text-left">
                        <div class="col-11" title="{faqs.question}">
                            {faqs.question}
                        </div>
                        <div class="col-1 d-flex justify-content-center">
                            <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon class="rotate flip">
                        </div>
                    </div>
                </div>
            </div>        
            <div collapse-body style="display: none;">
                <div class="p-2">
                    <div class="rounded-lg">
                            <div class="col-12 pl-4">
                                {faqs.content}
                            </div>
                    </div>
                </div>
            </div>
        </div>
<!-- END faqs -->