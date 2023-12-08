<div id="create-faq" class="sdlms-section session-view sdlms-form-elements">
  <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
      <div class="align-items-center sdlms-text-white-20px" style="text-align: center;">
          <span class="sdlms-floating-left">
              <svg back-btn width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z" fill="white"></path>
                  <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4"></line>
              </svg>
          </span>
          Frequently Asked Question
      </div>
  </div>
  <div class="px-4">
  <div class="row row-cols-2">
  <div class="col-12 col-md-6 mx-auto pr-0">
      <div id="faqbody" class=""> </div>
  </div>
  <div id="all-faq" class="col-12 col-md-6 mr-1 mx-auto pr-3" style="margin-top: 20px;">
  <div class="align-items-center custom-padding-x-40 justify-content-between primary-header py-3 shadow-none" style="
     margin-bottom: 20px; 
    ">
      <div class="align-items-center sdlms-text-white-20px" style="text-align: center;">
          <span class="sdlms-floating-left">
              
          </span>
          View Your FAQs Here
      </div>
  </div>
     <!-- BEGIN project.faqs -->
     <div class="pb-4">
     <div class="rounded-0 section-collapsed">
         <div class="align-items-center custom-padding-x-40 justify-content-between primary-header rounded-0 sdlms-section-header shadow-none" collapse style="background: #ddd; letter-spacing: 0; border-radius: 5px 5px 0 0 !important;">
             <div id="project_title" class="d-flex align-items-center sdlms-text-white-20px" style="color: var(--primary-sub-text-color); font-weight: 700;">{project.faqs.question}</div>
             <span class="sdlms-floating-right">
                 <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt class="flip rotate">
                 <i data-delete data-faq-id="{project.faqs.faqId}" class="fa ml-2 fa-solid fa-trash"></i>
             </span>
         </div>
         <div class="col-md-12 p-0" collapse-body style="display: none;">
             <div class="viewResponse col-12 p-0">
                 <div class="p-2 responseCard border" style="border-radius: 0 0 5px 5px;">
                     <div class="bg-gray p-3 rounded-lg">
                         <div style="word-break: break-all;">
                             <p class="sdlms-text-white-16px text-dark mt-1" >
                             {project.faqs.answer}
                             </p>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </div>
  <!-- END project.faqs -->

  </div>
  </div>
  </div>
</div>
