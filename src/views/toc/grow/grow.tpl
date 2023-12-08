<!-- IMPORT toc/partials/style.tpl -->
<style>
    .task-complete {
        text-decoration: line-through;
    }

    /* .owl-carousel .owl-item {
      opacity: 0.5!important;
      transition: all 0.3s ease-in-out!important;
    }
    .owl-carousel .owl-item.active {
      opacity: 1!important;
    }
    .owl-carousel .owl-item.active.center {
      transform: scale(1.1)!important;
    } */
</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" />

<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />
<!-- IMPORT toc/partials/header.tpl -->
<div class="mx-5">
    <div class="">
        <div class="d-flex justify-content-start mb-2">
            <button class="btn btn-primary button-primary common-border-radius d-none mr-2" id="addreflectionbutton">Write Reflection</button>
            <button class="btn btn-primary button-primary common-border-radius" data-toggle="modal" data-target="#viewpublicreflection">View Public Reflections</button>
            <!-- IF learnings -->
            <button class="btn btn-primary button-primary ml-2 common-border-radius" data-toggle="modal" data-target="#learning">View learning</button>
            <!-- ELSE -->
            <!-- <button class="btn btn-primary button-primary common-border-radius" data-toggle="modal"
        data-target="#addreflection" title="Please set learnings first" addReflection>Add Reflection</button> -->
            <button class="btn btn-primary button-primary ml-2 common-border-radius" data-toggle="modal" data-target="#learning">Set learnings</button>
            <!-- ENDIF learnings-->
            <!--IF publicReflections -->
            <button class="btn btn-primary btn-secondary common-border-radius" data-toggle="modal" data-target="#reflectionlibrary"><i class="fa fa-book" aria-hidden="true"></i> Week library</button>
            <!-- ENDIF publicReflections -->
            <button class="btn button-tertiary common-border-radius ml-2" data-toggle="modal" data-target="#learning">
                Keep up the good work
                <div class="bg-light bold-medium-font common-border-radius float-right ml-2 px-2 text-body" streakcount></div>
            </button>
        </div>
        <div class="row" id="addreflectioncard">
            <div class="card mx-2 text-center w-100 common-border-radius shadow-sm border-0">
                <div class="card-body">
                    <button type="button" id="closeaddreflection" class="close" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    <h5 class="float-left modal-title mb-2" id="addreflectionmodaltitle">Please write your reflections for {currentDateAlpha}</h5>
                    <textarea id="reflectionarea"></textarea>
                    <div class="modal-footer mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" id="addreflectionfortheday" class="cursor-pointer">
                            <path
                                d="M5.5999 19.4V14C5.5999 13.3373 6.13716 12.8 6.7999 12.8H15.1999C15.8626 12.8 16.3999 13.3373 16.3999 14V20M13.9999 6.20002L6.7999 6.20002C6.13716 6.20002 5.5999 5.66276 5.5999 5.00002L5.5999 1.40002M19.9974 5.5975L16.4024 2.00255C16.0166 1.61676 15.4934 1.40003 14.9478 1.40002H3.45705C2.3209 1.40002 1.3999 2.32102 1.3999 3.45717V18.5429C1.3999 19.679 2.3209 20.6 3.45705 20.6H18.5428C19.6789 20.6 20.5999 19.679 20.5999 18.5429V7.05211C20.5999 6.50652 20.3832 5.98328 19.9974 5.5975Z"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-4 timeline">
        <div class="d-flex justify-content-between">
            <div class="btn button-tertiary common-border-radius ml-2" id="prev-week"><i class="fas fa-chevron-left"></i><small class="my-auto mx-1">Prev Week</small></div>
            <div class="d-flex flex-column">
                <h2 class="text-center">{currentWeek}</h2>
            </div>
            <div class="btn button-tertiary common-border-radius ml-2" id="next-week"><small class="my-auto mx-1">Next Week</small><i class="fas fa-chevron-right"></i></div>
        </div>
        <h2 class="text-center py-3"></h2>

        <div class="container py-2 mt-4 mb-4 d-flex flex-column justify-content-center" reflectionscontainer></div>
        <!--container-->
    </div>
    <!-- <div style="flex: 1;border-radius: 10px;" class="border p-5">
    <div class="owl-carousel owl-theme"> -->

    <!--       
        <div class="card">
          <h3>{publicReflections.learning}</h3>
          <p class="date">{publicReflections.momentCurrentDate}</p>
          <p>{publicReflections.reflection}</p>
        </div> -->

    <!-- </div>
  </div> -->

    <!-- <div class="mt-4 timeline">
    <div class="d-flex justify-content-between">
      <div class="border p-1 cursor-pointer my-auto btn btn-secondary btn-sm" id="prev-week"><i class="fas fa-chevron-left"></i><small class="my-auto mx-1">Prev Week</small></div>
      <div class="d-flex flex-column">
        <h2 class="text-center">{currentWeek}</h2>
      </div>
      <div class="border p-1 cursor-pointer my-auto btn btn-secondary btn-sm" id="next-week"><small class="my-auto mx-1">Next Week</small><i class="fas fa-chevron-right"></i></div>
    </div>
    <h2 class="text-center py-3"></h2>

    <div class="container py-2 mt-4 mb-4 d-flex flex-column justify-content-center" reflectionscontainer>
      
    </div> -->
    <!--container-->
    <!-- </div> -->
</div>
<!-- IMPORT toc/partials/footer.tpl -->
<!-- IMPORT toc/grow/partials/addlearningmodal.tpl -->
<!-- IMPORT toc/grow/partials/librarymodal.tpl -->
<!-- IMPORT toc/grow/partials/learningreflectionmodal.tpl -->
<!-- IMPORT toc/grow/partials/learningmodal.tpl -->
<!-- IMPORT toc/grow/partials/addreflectionmodal.tpl -->
