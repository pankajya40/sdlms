<div>
    <!-- Header -->
    <div class="w-100"></div>

    <!-- Banner -->

    <div>
      <img class="w-100" style="height: 203px;" src="image 16.png" alt="">
    </div>

  </div>

  <div class="d-flex ">


    <!-- Profile Section -->

    <div id="profile-right-section" class="d-flex justify-content-center text-center px-3 position-sticky" style=" margin-top: -60px;">
      <div>
        <img src="{user.picture}" style="border-radius:100%; width:95.24px; height:95.24px" alt="">
        <h3 class="mb-0 bold-font" style="font-family: 'Inter', sans-serif"><!-- IF user.fullname -->{user.fullname}<!-- ELSE -->{user.displayname}<!-- ENDIF user.fullname --></h3>
        <h5 class="mb-3" style="font-family: 'Inter', sans-serif">@{user.username}</h5>
        <hr>
        <div class="text-left" style="padding-left: 46px">
          <p class="mb-2 " id="about-me-section" style="font-family:  'Poppins', sans-serif; font-size: 20px;
      line-height: 30px"><a href="#">About Me</a></p>
          <p class="mb-2 " id="membership-section" style="font-family:  'Poppins', sans-serif; font-size: 20px;
      line-height: 30px"><a href="#" style="color: black">Memberships</a></p>
          <p class="mb-2 " id="assets-section" style="font-family:  'Poppins', sans-serif; font-size: 20px;
      line-height: 30px"><a href="#" style="color: black">Assets</a></p>
          <p class="mb-2 " id="feed-section" style="font-family:  'Poppins', sans-serif; font-size: 20px;
      line-height: 30px"><a href="#" style="color: black">Feed</a></p>
          <p class="mb-2 " id="leaderboard-section" style="font-family:  'Poppins', sans-serif; font-size: 20px;
      line-height: 30px"><a href="#" style="color: black">Leaderboard</a></p>
        </div>
      </div>
    </div>

    <!-- Right Section -->


    <div id="About-me-section" class="display-hide">
      <div class="border-left px-4 w-100">

        <div id="user-bio" class="d-flex">
        
            <div class="h-75 border-0 bg-gray mt-3 p-3 w-75 mr-2">
              <h5 class="font-weight-bold">Who I am...</h5>
              <h7>{user.aboutme}</h7>
            </div>
            <div class=" border bg-gray border-0 mt-3 p-3 w-50"></div>

        </div>

        <!-- Persona section -->

        <div class="justify-content-center d-flex pt-3">
          <div class="button-header mb-3">
            <button id="Personas" class="btn-heading border-bottom">Personas</button>
            <button id="Competencies" class="btn-heading border-bottom">Competencies</button>
            <button id="Values" class="btn-heading border-bottom">Values</button>
            <button id="Impacts" class="btn-heading border-bottom">Impacts</button>
          </div>
        </div>
        <div>

        </div>

        <!-- Leadership section -->
        <div id="personas">
          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Leadership</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa fa-solid fa-angle-down drop-down" type="button" data-toggle="collapse"
                         ></i>
                    </p>

                  </div>

                </div>

              </div>


              <div class="collapse shadow px-3 pb-3" id="collapseExample1">

                <hr class="m-0 mx-2 border-dark">
                <div class="d-flex bg-gray m-3">
                  <div class="embed-responsive embed-responsive-16by9 w-50 m-3">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Kx76Du84MTQ"
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen></iframe>
                  </div>
                  <div class="p-3 w-50">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, aut. Sed architecto, totam aperiam
                      neque nobis alias illo consequatur eius, amet eligendi deleniti velit hic, expedita quod at
                      pariatur
                      natus reiciendis molestiae.
                    </p>
                  </div>
                </div>


                <!-- Carousel 1 -->
                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">Annecdote</p>
                    <button class="edit-custom">Edit</button>
                  </div>
                  <hr class="mb-2 m-0 mx-2 border-dark bg-white">
                  <div id="carouselExampleControls" class="carousel slide p-5" data-interval="false">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <div class="d-flex">
                          <div class=" border m-2 rounded-lg p-2 w-50">
                            <p class="sdlms-text-black-18px font-weight-bold"><u>Annecdote Heading by Palash</u></p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero tempora deserunt nisi
                              quam
                              commodi corrupti dignissimos, non fuga, minima voluptatem maxime quos repellendus debitis.
                              In
                              accusamus accusantium quo omnis quaerat esse corrupti dolorem saepe expedita.</p>
                            <div class="d-flex">
                              <div class="p-2 sdlms-text-white-14px text-dark text-right">
                                <p class="m-0 font-weight-bold">Palash</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                              </div>
                              <div>
                                <img class="w-75" src="Component 36.png" alt="">
                              </div>
                            </div>
                            <hr class="m-0 mx-2">
                            <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                              <p>12 February 2022</p>
                            </div>
                          </div>
                          <div class=" border m-2 rounded-lg p-2 w-50">
                            <p class="sdlms-text-black-18px font-weight-bold"><u>Annecdote Heading by Palash</u></p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero tempora deserunt nisi
                              quam
                              commodi corrupti dignissimos, non fuga, minima voluptatem maxime quos repellendus debitis.
                              In
                              accusamus accusantium quo omnis quaerat esse corrupti dolorem saepe expedita.</p>
                            <div class="d-flex">
                              <div class="p-2 sdlms-text-white-14px text-dark text-right">
                                <p class="m-0 font-weight-bold">Palash</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                              </div>
                              <div>
                                <img class="w-75" src="Component 36.png" alt="">
                              </div>
                            </div>
                            <hr class="m-0 mx-2">
                            <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                              <p>12 February 2022</p>
                            </div>
                          </div>

                        </div>
                        <div class="float-right m-2">
                          <button class="edit-custom p-1 mt-2">Request Annecdote</button>
                        </div>
                      </div>
                      <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="...">
                      </div>
                      <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="...">
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>

                </div>

                <!-- Carousel 2 -->
                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">Assets</p>
                    <button class="edit-custom">Edit</button>
                  </div>
                  <hr class="mb-2 m-0 mx-2 border-dark bg-white">
                  <div id="carouselExampleControls" class="carousel assets slide p-5" data-interval="false">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <div class="d-flex justify-content-between m-4">
                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>

                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="carousel-item ">
                        <div class="d-flex justify-content-between m-4">
                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>

                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a class="carousel-control-prev" href=".assets" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href=".assets" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>

                <!-- Qna -->

                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">QnA</p>
                    <button class="edit-custom">Edit</button>
                  </div>
                  <hr class="m-0 mx-2 border-dark bg-white">
                  <div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">1. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">2. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">3. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">4. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">5. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>


                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Humility section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Humility</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExampleTwo" aria-expanded="false" aria-controls="collapseExampleTwo"></i>
                    </p>

                  </div>

                </div>

              </div>
              <div class="collapse shadow px-3" id="collapseExampleTwo"></div>
            </div>
          </div>

          <!-- Hardworking section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Hardworking</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExampleThree" aria-expanded="false"
                        aria-controls="collapseExampleThree"></i>
                    </p>

                  </div>

                </div>

              </div>
              <div class="collapse shadow px-3" id="collapseExampleThree"></div>
            </div>
          </div>

          <!-- Curious section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Curious</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExampleFour" aria-expanded="false"
                        aria-controls="collapseExampleFour"></i>
                    </p>

                  </div>

                </div>

              </div>
              <div class="collapse shadow px-3" id="collapseExampleFour"></div>
            </div>
          </div>
        </div>


        <div id="competencies" class="display-hide">
          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Hello</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></i>
                    </p>

                  </div>

                </div>

              </div>


              <div class="collapse shadow px-3 pb-3" id="collapseExample">

                <hr class="m-0 mx-2 border-dark">
                <div class="d-flex bg-gray m-3">
                  <div class="embed-responsive embed-responsive-16by9 w-50 m-3">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Kx76Du84MTQ"
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen></iframe>
                  </div>
                  <div class="p-3 w-50">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, aut. Sed architecto, totam aperiam
                      neque nobis alias illo consequatur eius, amet eligendi deleniti velit hic, expedita quod at
                      pariatur
                      natus reiciendis molestiae.
                    </p>
                  </div>
                </div>


                <!-- Carousel 1 -->
                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">Annecdote</p>
                    <button class="edit-custom">Edit</button>
                  </div>
                  <hr class="mb-2 m-0 mx-2 border-dark bg-white">
                  <div id="carouselExampleControls" class="carousel slide p-5" data-interval="false">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <div class="d-flex">
                          <div class=" border m-2 rounded-lg p-2 w-50">
                            <p class="sdlms-text-black-18px font-weight-bold"><u>Annecdote Heading by Palash</u></p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero tempora deserunt nisi
                              quam
                              commodi corrupti dignissimos, non fuga, minima voluptatem maxime quos repellendus debitis.
                              In
                              accusamus accusantium quo omnis quaerat esse corrupti dolorem saepe expedita.</p>
                            <div class="d-flex">
                              <div class="p-2 sdlms-text-white-14px text-dark text-right">
                                <p class="m-0 font-weight-bold">Palash</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                              </div>
                              <div>
                                <img class="w-75" src="Component 36.png" alt="">
                              </div>
                            </div>
                            <hr class="m-0 mx-2">
                            <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                              <p>12 February 2022</p>
                            </div>
                          </div>
                          <div class=" border m-2 rounded-lg p-2 w-50">
                            <p class="sdlms-text-black-18px font-weight-bold"><u>Annecdote Heading by Palash</u></p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero tempora deserunt nisi
                              quam
                              commodi corrupti dignissimos, non fuga, minima voluptatem maxime quos repellendus debitis.
                              In
                              accusamus accusantium quo omnis quaerat esse corrupti dolorem saepe expedita.</p>
                            <div class="d-flex">
                              <div class="p-2 sdlms-text-white-14px text-dark text-right">
                                <p class="m-0 font-weight-bold">Palash</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                              </div>
                              <div>
                                <img class="w-75" src="Component 36.png" alt="">
                              </div>
                            </div>
                            <hr class="m-0 mx-2">
                            <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                              <p>12 February 2022</p>
                            </div>
                          </div>

                        </div>
                        <div class="float-right m-2">
                          <button class="edit-custom p-1 mt-2">Request Annecdote</button>
                        </div>
                      </div>
                      <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="...">
                      </div>
                      <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="...">
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>

                </div>

                <!-- Carousel 2 -->
                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">Assets</p>
                    <button class="edit-custom">Edit</button>
                  </div>
                  <hr class="mb-2 m-0 mx-2 border-dark bg-white">
                  <div id="carouselExampleControls" class="carousel assets slide p-5" data-interval="false">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <div class="d-flex justify-content-between m-4">
                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>

                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="carousel-item ">
                        <div class="d-flex justify-content-between m-4">
                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>

                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a class="carousel-control-prev" href=".assets" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href=".assets" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>

                <!-- Qna -->

                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">QnA</p>
                    <button class="edit-custom">Edit</button>
                  </div>
                  <hr class="m-0 mx-2 border-dark bg-white">
                  <div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">1. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">2. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">3. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">4. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">5. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>


                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Humility section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Humility</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExampleTwo" aria-expanded="false" aria-controls="collapseExampleTwo"></i>
                    </p>

                  </div>

                </div>

              </div>
              <div class="collapse shadow px-3" id="collapseExampleTwo"></div>
            </div>
          </div>

          <!-- Hardworking section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Hardworking</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExampleThree" aria-expanded="false"
                        aria-controls="collapseExampleThree"></i>
                    </p>

                  </div>

                </div>

              </div>
              <div class="collapse shadow px-3" id="collapseExampleThree"></div>
            </div>
          </div>

          <!-- Curious section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Curious</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExampleFour" aria-expanded="false"
                        aria-controls="collapseExampleFour"></i>
                    </p>

                  </div>

                </div>

              </div>
              <div class="collapse shadow px-3" id="collapseExampleFour"></div>
            </div>
          </div>
        </div>

        <div id="valuesP" class="display-hide">
          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">qwerty</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></i>
                    </p>

                  </div>

                </div>

              </div>


              <div class="collapse shadow px-3 pb-3" id="collapseExample">

                <hr class="m-0 mx-2 border-dark">
                <div class="d-flex bg-gray m-3">
                  <div class="embed-responsive embed-responsive-16by9 w-50 m-3">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Kx76Du84MTQ"
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen></iframe>
                  </div>
                  <div class="p-3 w-50">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, aut. Sed architecto, totam aperiam
                      neque nobis alias illo consequatur eius, amet eligendi deleniti velit hic, expedita quod at
                      pariatur
                      natus reiciendis molestiae.
                    </p>
                  </div>
                </div>


                <!-- Carousel 1 -->
                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">Annecdote</p>
                    <button class="edit-custom">Edit</button>
                  </div>
                  <hr class="mb-2 m-0 mx-2 border-dark bg-white">
                  <div id="carouselExampleControls" class="carousel slide p-5" data-interval="false">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <div class="d-flex">
                          <div class=" border m-2 rounded-lg p-2 w-50">
                            <p class="sdlms-text-black-18px font-weight-bold"><u>Annecdote Heading by Palash</u></p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero tempora deserunt nisi
                              quam
                              commodi corrupti dignissimos, non fuga, minima voluptatem maxime quos repellendus debitis.
                              In
                              accusamus accusantium quo omnis quaerat esse corrupti dolorem saepe expedita.</p>
                            <div class="d-flex">
                              <div class="p-2 sdlms-text-white-14px text-dark text-right">
                                <p class="m-0 font-weight-bold">Palash</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                              </div>
                              <div>
                                <img class="w-75" src="Component 36.png" alt="">
                              </div>
                            </div>
                            <hr class="m-0 mx-2">
                            <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                              <p>12 February 2022</p>
                            </div>
                          </div>
                          <div class=" border m-2 rounded-lg p-2 w-50">
                            <p class="sdlms-text-black-18px font-weight-bold"><u>Annecdote Heading by Palash</u></p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero tempora deserunt nisi
                              quam
                              commodi corrupti dignissimos, non fuga, minima voluptatem maxime quos repellendus debitis.
                              In
                              accusamus accusantium quo omnis quaerat esse corrupti dolorem saepe expedita.</p>
                            <div class="d-flex">
                              <div class="p-2 sdlms-text-white-14px text-dark text-right">
                                <p class="m-0 font-weight-bold">Palash</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                              </div>
                              <div>
                                <img class="w-75" src="Component 36.png" alt="">
                              </div>
                            </div>
                            <hr class="m-0 mx-2">
                            <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                              <p>12 February 2022</p>
                            </div>
                          </div>

                        </div>
                        <div class="float-right m-2">
                          <button class="edit-custom p-1 mt-2">Request Annecdote</button>
                        </div>
                      </div>
                      <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="...">
                      </div>
                      <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="...">
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>

                </div>

                <!-- Carousel 2 -->
                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">Assets</p>
                    <button class="edit-custom">Edit</button>
                  </div>
                  <hr class="mb-2 m-0 mx-2 border-dark bg-white">
                  <div id="carouselExampleControls" class="carousel assets slide p-5" data-interval="false">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <div class="d-flex justify-content-between m-4">
                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>

                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="carousel-item ">
                        <div class="d-flex justify-content-between m-4">
                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>

                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a class="carousel-control-prev" href=".assets" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href=".assets" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>

                <!-- Qna -->

                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">QnA</p>
                    <button class="edit-custom">Edit</button>
                  </div>
                  <hr class="m-0 mx-2 border-dark bg-white">
                  <div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">1. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">2. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">3. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">4. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">5. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>


                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Humility section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Humility</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExampleTwo" aria-expanded="false" aria-controls="collapseExampleTwo"></i>
                    </p>

                  </div>

                </div>

              </div>
              <div class="collapse shadow px-3" id="collapseExampleTwo"></div>
            </div>
          </div>

          <!-- Hardworking section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Hardworking</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExampleThree" aria-expanded="false"
                        aria-controls="collapseExampleThree"></i>
                    </p>

                  </div>

                </div>

              </div>
              <div class="collapse shadow px-3" id="collapseExampleThree"></div>
            </div>
          </div>

          <!-- Curious section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Curious</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExampleFour" aria-expanded="false"
                        aria-controls="collapseExampleFour"></i>
                    </p>

                  </div>

                </div>

              </div>
              <div class="collapse shadow px-3" id="collapseExampleFour"></div>
            </div>
          </div>
        </div>

        <div id="impacts" class="display-hide">
          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">qwerty</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></i>
                    </p>

                  </div>

                </div>

              </div>


              <div class="collapse shadow px-3 pb-3" id="collapseExample">

                <hr class="m-0 mx-2 border-dark">
                <div class="d-flex bg-gray m-3">
                  <div class="embed-responsive embed-responsive-16by9 w-50 m-3">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Kx76Du84MTQ"
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen></iframe>
                  </div>
                  <div class="p-3 w-50">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, aut. Sed architecto, totam aperiam
                      neque nobis alias illo consequatur eius, amet eligendi deleniti velit hic, expedita quod at
                      pariatur
                      natus reiciendis molestiae.
                    </p>
                  </div>
                </div>


                <!-- Carousel 1 -->
                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">Annecdote</p>
                    <button class="edit-custom">Edit</button>
                  </div>
                  <hr class="mb-2 m-0 mx-2 border-dark bg-white">
                  <div id="carouselExampleControls" class="carousel slide p-5" data-interval="false">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <div class="d-flex">
                          <div class=" border m-2 rounded-lg p-2 w-50">
                            <p class="sdlms-text-black-18px font-weight-bold"><u>Annecdote Heading by Palash</u></p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero tempora deserunt nisi
                              quam
                              commodi corrupti dignissimos, non fuga, minima voluptatem maxime quos repellendus debitis.
                              In
                              accusamus accusantium quo omnis quaerat esse corrupti dolorem saepe expedita.</p>
                            <div class="d-flex">
                              <div class="p-2 sdlms-text-white-14px text-dark text-right">
                                <p class="m-0 font-weight-bold">Palash</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                              </div>
                              <div>
                                <img class="w-75" src="Component 36.png" alt="">
                              </div>
                            </div>
                            <hr class="m-0 mx-2">
                            <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                              <p>12 February 2022</p>
                            </div>
                          </div>
                          <div class=" border m-2 rounded-lg p-2 w-50">
                            <p class="sdlms-text-black-18px font-weight-bold"><u>Annecdote Heading by Palash</u></p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero tempora deserunt nisi
                              quam
                              commodi corrupti dignissimos, non fuga, minima voluptatem maxime quos repellendus debitis.
                              In
                              accusamus accusantium quo omnis quaerat esse corrupti dolorem saepe expedita.</p>
                            <div class="d-flex">
                              <div class="p-2 sdlms-text-white-14px text-dark text-right">
                                <p class="m-0 font-weight-bold">Palash</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                              </div>
                              <div>
                                <img class="w-75" src="Component 36.png" alt="">
                              </div>
                            </div>
                            <hr class="m-0 mx-2">
                            <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                              <p>12 February 2022</p>
                            </div>
                          </div>

                        </div>
                        <div class="float-right m-2">
                          <button class="edit-custom p-1 mt-2">Request Annecdote</button>
                        </div>
                      </div>
                      <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="...">
                      </div>
                      <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="...">
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>

                </div>

                <!-- Carousel 2 -->
                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">Assets</p>
                    <button class="edit-custom">Edit</button>
                  </div>
                  <hr class="mb-2 m-0 mx-2 border-dark bg-white">
                  <div id="carouselExampleControls" class="carousel assets slide p-5" data-interval="false">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <div class="d-flex justify-content-between m-4">
                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>

                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="carousel-item ">
                        <div class="d-flex justify-content-between m-4">
                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>

                          <div class="sdlms-card">
                            <div class="sdlms-card-thumbnail img">
                              <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                            </div>
                            <div class="sdlms-card-title" style="padding-bottom: 50px;">
                              <div class="sdlms-asset-category-name">
                                ARTICLE <br>
                                Artificial Intelligence
                              </div>
                            </div>
                            <div class="sdlms-asset-description mt-5">
                              <div class="sdlms-asset-content-body">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                                  repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                                  obcaecati
                                  assumenda eaque laborum facilis nulla porro.</p>
                              </div>

                              <div class="sdlms-asset-nav">
                                <a href="#">Read more</a>
                              </div>
                            </div>
                            <div class="sdlms-card-author author-container author mt-6">
                              <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                                <img src="Component 36.png" alt="">
                              </div>
                              <div class="sdlms-card-author-name pl-4">
                                <p class="sdlms-card-author-details">
                                <p class="sdlms-card-author-name m-0 ">Palash</p>
                                Lorem ipsum dolor, sit amet consectetur
                                </p>
                              </div>
                            </div>
                            <div class="sdlms-card-footer">
                              <hr>
                              <div class="sdlms-card-footer-content">
                                <p class="sdlms-asset-modification-date">12 February 2022</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a class="carousel-control-prev" href=".assets" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href=".assets" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>

                <!-- Qna -->

                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">QnA</p>
                    <button class="edit-custom">Edit</button>
                  </div>
                  <hr class="m-0 mx-2 border-dark bg-white">
                  <div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">1. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">2. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">3. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">4. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>
                      <hr class="m-0 mx-3 bg-white">

                    </div>
                    <div>
                      <div class="px-3 py-4">
                        <div class="d-flex">
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">5. </p>
                          &nbsp;
                          <p class="sdlms-text-white-14px text-dark font-weight-bold">Lorem ipsum dolor sit amet
                            consectetur
                            adipisicing.
                          </p>
                        </div>
                        <p class="sdlms-text-white-14px text-dark pl-3">Lorem ipsum dolor sit amet consectetur
                          adipisicing
                          elit. Beatae quae odit fugiat labore in?</p>
                      </div>


                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Humility section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Humility</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExampleTwo" aria-expanded="false" aria-controls="collapseExampleTwo"></i>
                    </p>

                  </div>

                </div>

              </div>
              <div class="collapse shadow px-3" id="collapseExampleTwo"></div>
            </div>
          </div>

          <!-- Hardworking section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Hardworking</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExampleThree" aria-expanded="false"
                        aria-controls="collapseExampleThree"></i>
                    </p>

                  </div>

                </div>

              </div>
              <div class="collapse shadow px-3" id="collapseExampleThree"></div>
            </div>
          </div>

          <!-- Curious section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Curious</p>
                <div class="p-2">
                  <div class="d-flex">
                    <button class="edit-custom mr-2">Edit</button>
                    <p>
                      <i class="fa-solid fa fa-angle-down" type="button" data-toggle="collapse"
                        data-target="#collapseExampleFour" aria-expanded="false"
                        aria-controls="collapseExampleFour"></i>
                    </p>

                  </div>

                </div>

              </div>
              <div class="collapse shadow px-3" id="collapseExampleFour"></div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Membership Section  -->
    <div class="display-hide" id="Membership-section">
      <div class="border-left px-4 mt-4 w-100">
        <div class="bg-gray shadow mb-3">

          <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
            <p class="mr-auto ml-2 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Memberships</p>
            <div class="p-2">


            </div>

          </div>


          <div class="px-3 pb-3" id="collapseExample1">

            <hr class="m-0 mx-0 border-dark">


            <!-- Carousel 1 -->
            <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
              <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                <p class="sdlms-text-black-18px m-0">Batches</p>
                <button class="edit-custom">Edit</button>
              </div>
              <hr class="mb-2 m-0 mx-2 border-dark bg-white">
              <div id="carouselExampleControls" class="carousel slide p-5" data-interval="false">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div id="batches" class="d-flex justify-content-between m-4">
                      
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src="..." class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                    <img src="..." class="d-block w-100" alt="...">
                  </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>

            </div>

            <!-- Carousel 2 -->
            <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
              <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                <p class="sdlms-text-black-18px m-0">Communities</p>
                <button class="edit-custom">Edit</button>
              </div>
              <hr class="mb-2 m-0 mx-2 border-dark bg-white">
              <div id="carouselExampleControls" class="carousel assets slide p-5" data-interval="false">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div class="d-flex justify-content-between m-4">
                      <div class=" border shadow m-2 rounded-lg p-4 w-50">
                        <div class="d-flex justify-content-between">
                          <div style="margin-right: 5rem;">
                            <img class="communities-card-img" src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="image">
                          </div>
                          <div>
                            <div class="sdlms-text-white-14px text-dark mt-2 pl-2 float-right">Completed 7th Jan 2022
                            </div><br>
                            <p class="sdlms-sub-text-primary-20px font-weight-bold mt-2 float-right align-text-right">
                              Annecdote Heading by Palash</p>
                          </div>
                        </div>
                        <div class="sdlms-text-tertiary-18px font-weight-bold">
                          <p>Learning reflectionds</p>
                        </div>
                        <ul style="list-style-type:square">
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                        </ul>
                        <!-- <div class="d-flex">
                            <div class="p-2 sdlms-text-white-14px text-dark text-right">
                              <p class="m-0 font-weight-bold">Palash</p>
                              <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                            </div>
                            <div>
                              <img class="w-75" src="Component 36.png" alt="">
                            </div>
                          </div>
                          <hr class="m-0 mx-2">
                          <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                            <p>12 February 2022</p>
                          </div> -->
                      </div>

                      <div class=" border shadow m-2 rounded-lg p-4 w-50">
                        <div class="d-flex justify-content-between">
                          <div style="margin-right: 5rem;">
                            <img class="communities-card-img" src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="image">
                          </div>
                          <div>
                            <div class="sdlms-text-white-14px text-dark mt-2 pl-2 float-right">Completed 7th Jan 2022
                            </div><br>
                            <p class="sdlms-sub-text-primary-20px font-weight-bold mt-2 float-right align-text-right">
                              Annecdote Heading by Palash</p>
                          </div>
                        </div>
                        <div class="sdlms-text-tertiary-18px font-weight-bold">
                          <p>Learning reflectionds</p>
                        </div>
                        <ul style="list-style-type:square">
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                        </ul>
                        <!-- <div class="d-flex">
                            <div class="p-2 sdlms-text-white-14px text-dark text-right">
                              <p class="m-0 font-weight-bold">Palash</p>
                              <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                            </div>
                            <div>
                              <img class="w-75" src="Component 36.png" alt="">
                            </div>
                          </div>
                          <hr class="m-0 mx-2">
                          <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                            <p>12 February 2022</p>
                          </div> -->
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item ">
                    <div class="d-flex justify-content-between m-4">
                      <div class=" border shadow m-2 rounded-lg p-4 w-50">
                        <div class="d-flex justify-content-between">
                          <div style="margin-right: 5rem;">
                            <img class="communities-card-img" src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="image">
                          </div>
                          <div>
                            <div class="sdlms-text-white-14px text-dark mt-2 pl-2 float-right">Completed 7th Jan 2022
                            </div><br>
                            <p class="sdlms-sub-text-primary-20px font-weight-bold mt-2 float-right align-text-right">
                              Annecdote Heading by Palash</p>
                          </div>
                        </div>
                        <div class="sdlms-text-tertiary-18px font-weight-bold">
                          <p>Learning reflectionds</p>
                        </div>
                        <ul style="list-style-type:square">
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                        </ul>
                        <!-- <div class="d-flex">
                            <div class="p-2 sdlms-text-white-14px text-dark text-right">
                              <p class="m-0 font-weight-bold">Palash</p>
                              <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                            </div>
                            <div>
                              <img class="w-75" src="Component 36.png" alt="">
                            </div>
                          </div>
                          <hr class="m-0 mx-2">
                          <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                            <p>12 February 2022</p>
                          </div> -->
                      </div>

                      <div class=" border shadow m-2 rounded-lg p-4 w-50">
                        <div class="d-flex justify-content-between">
                          <div style="margin-right: 5rem;">
                            <img class="communities-card-img" src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="image">
                          </div>
                          <div>
                            <div class="sdlms-text-white-14px text-dark mt-2 pl-2 float-right">Completed 7th Jan 2022
                            </div><br>
                            <p class="sdlms-sub-text-primary-20px font-weight-bold mt-2 float-right align-text-right">
                              Annecdote Heading by Palash</p>
                          </div>
                        </div>
                        <div class="sdlms-text-tertiary-18px font-weight-bold">
                          <p>Learning reflectionds</p>
                        </div>
                        <ul style="list-style-type:square">
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti?</li>
                        </ul>
                        <!-- <div class="d-flex">
                            <div class="p-2 sdlms-text-white-14px text-dark text-right">
                              <p class="m-0 font-weight-bold">Palash</p>
                              <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                            </div>
                            <div>
                              <img class="w-75" src="Component 36.png" alt="">
                            </div>
                          </div>
                          <hr class="m-0 mx-2">
                          <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                            <p>12 February 2022</p>
                          </div> -->
                      </div>
                    </div>
                  </div>
                </div>
                <a class="carousel-control-prev" href=".assets" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href=".assets" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>

            <!-- Carusel 3 -->
            <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
              <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                <p class="sdlms-text-black-18px m-0">Discussion Rooms</p>
                <button class="edit-custom">Edit</button>
              </div>
              <hr class="mb-2 m-0 mx-2 border-dark bg-white">
              <div id="carouselExampleControls" class="carousel assets slide p-5" data-interval="false">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div id="discussion-room" class="d-flex justify-content-between m-4">


                    </div>
                  </div>
                </div>
                <a class="carousel-control-prev" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>

            <!-- Institution -->

            <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
              <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                <p class="sdlms-text-black-18px m-0">Institution</p>
                <button class="edit-custom">Edit</button>
              </div>
              <hr class="mb-2 m-0 mx-2 border-dark bg-white">
              <div class="">
                <div class="d-flex justify-content-center m-2">
                  <div class=" border m-4 shadow rounded-lg p-4 w-50">
                    <div class="d-flex justify-content-center">
                      <img class="institution-card-img" src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="image">
                    </div>
                    <div class="text-center">
                      <p class="sdlms-sub-text-primary-20px font-weight-bold mt-2">Annecdote Heading by Palash</p>
                    </div>
                    <div class="text-center sdlms-text-tertiary-18px font-weight-bold">
                      <p>Grade 7</p>
                    </div>
                    <div class="text-center sdlms-text-tertiary-18px font-weight-bold">
                      <p>Attending since 2022</p>
                    </div>
                    <!-- <div class="d-flex">
                            <div class="p-2 sdlms-text-white-14px text-dark text-right">
                              <p class="m-0 font-weight-bold">Palash</p>
                              <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                            </div>
                            <div>
                              <img class="w-75" src="Component 36.png" alt="">
                            </div>
                          </div>
                          <hr class="m-0 mx-2">
                          <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                            <p>12 February 2022</p>
                          </div> -->
                  </div>

                  <div class=" border m-4 shadow rounded-lg p-4 w-50">
                    <div class="d-flex justify-content-center">
                      <img class="institution-card-img" src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="image">
                    </div>
                    <div class="text-center">
                      <p class="sdlms-sub-text-primary-20px font-weight-bold mt-2">Annecdote Heading by Palash</p>
                    </div>
                    <div class="text-center sdlms-text-tertiary-18px font-weight-bold">
                      <p>Grade 7</p>
                    </div>
                    <div class="text-center sdlms-text-tertiary-18px font-weight-bold">
                      <p>Attending since 2022</p>
                    </div>
                    <!-- <div class="d-flex">
                            <div class="p-2 sdlms-text-white-14px text-dark text-right">
                              <p class="m-0 font-weight-bold">Palash</p>
                              <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                            </div>
                            <div>
                              <img class="w-75" src="Component 36.png" alt="">
                            </div>
                          </div>
                          <hr class="m-0 mx-2">
                          <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                            <p>12 February 2022</p>
                          </div> -->
                  </div>
                </div>
                <div class="d-flex justify-content-center m-2">
                  <div class=" border m-4 shadow rounded-lg p-4 w-50">
                    <div class="d-flex justify-content-center">
                      <img class="institution-card-img" src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="image">
                    </div>
                    <div class="text-center">
                      <p class="sdlms-sub-text-primary-20px font-weight-bold mt-2">Annecdote Heading by Palash</p>
                    </div>
                    <div class="text-center sdlms-text-tertiary-18px font-weight-bold">
                      <p>Grade 7</p>
                    </div>
                    <div class="text-center sdlms-text-tertiary-18px font-weight-bold">
                      <p>Attending since 2022</p>
                    </div>
                    <!-- <div class="d-flex">
                            <div class="p-2 sdlms-text-white-14px text-dark text-right">
                              <p class="m-0 font-weight-bold">Palash</p>
                              <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                            </div>
                            <div>
                              <img class="w-75" src="Component 36.png" alt="">
                            </div>
                          </div>
                          <hr class="m-0 mx-2">
                          <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                            <p>12 February 2022</p>
                          </div> -->
                  </div>

                  <div class=" border m-4 shadow rounded-lg p-4 w-50">
                    <div class="d-flex justify-content-center">
                      <img class="institution-card-img" src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="image">
                    </div>
                    <div class="text-center">
                      <p class="sdlms-sub-text-primary-20px font-weight-bold mt-2">Annecdote Heading by Palash</p>
                    </div>
                    <div class="text-center sdlms-text-tertiary-18px font-weight-bold">
                      <p>Grade 7</p>
                    </div>
                    <div class="text-center sdlms-text-tertiary-18px font-weight-bold">
                      <p>Attending since 2022</p>
                    </div>
                    <!-- <div class="d-flex">
                            <div class="p-2 sdlms-text-white-14px text-dark text-right">
                              <p class="m-0 font-weight-bold">Palash</p>
                              <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                            </div>
                            <div>
                              <img class="w-75" src="Component 36.png" alt="">
                            </div>
                          </div>
                          <hr class="m-0 mx-2">
                          <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
                            <p>12 February 2022</p>
                          </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>

    <!-- Feed Section -->
    <div class="display-hide" id="Feed-section">
      <div class="border-left px-4 mt-4 w-100">
        <div class="border m-2 rounded-lg p-2 m-2">
          <div class="d-flex m-4">
            <div>
              <img class="w-75" src="Component 36.png" alt="">
            </div>
            <div class="">
              <p class="sdlms-text-black-20px font-weight-bold mb-1">First Last</p>
              <p class="sdlms-sub-text-primary-14px mb-1">Lorem, ipsum dolor.</p>
              <div class="sdlms-text-white-14px text-dark">
                <p>12 February 2022</p>
              </div>
            </div>
          </div>
          <div class="m-4">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab numquam est perspiciatis?Lorem ipsum dolor
              sit amet consectetur, adipisicing elit. Corporis impedit, vel cumque ullam fugiat harum?</p>
          </div>

          <div class="mb-2">
            <div class="text-center">
              <img class="w-50 rounded-lg" src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
              <div class="text-right sdlms-text-white-14px text-dark m-2">
                <p>3 views. 2 discussion. 10 comments</p>
              </div>
            </div>
          </div>

          <div class="mt-2">
            <hr style="border: 1px solid #828282;">
            <div class="d-flex justify-content-center justify-content-between  ml-4 mr-4">
              <div class="ml-4 mt-0 mb-0 text-center">
                <img class="p-2" src="Vector.svg" alt="">
                <p>Reflection</p>
              </div>
              <div class="text-center mt-0 mb-0">
                <img class="p-2" src="Vector (3).png" alt="">
                <p>Discussion</p>
              </div>

              <div class="text-center mt-0 mb-0">
                <img class="p-2" src="Vector (4).png" alt="">
                <p>Thought Process</p>
              </div>

              <div class="text-center mt-0 mb-0 mr-4">
                <img class="p-2" src="Vector (5).png" alt="">
                <p>Comment</p>
              </div>
            </div>
            <hr style="border: 1px solid #828282;">
          </div>

          <div class="p-4 text-center">
            <div class="h-75 border-0 bg-gray mt-3 p-3 w-75 " style="display: inline-block">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt sequi tenetur cupiditate veritatis
                possimus debitis!</p>
            </div>

            <div class="h-75 border-0 bg-gray mt-4 p-3 w-75" style="display: inline-block">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt sequi tenetur cupiditate veritatis
                possimus debitis!</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  
    <!-- Asset Section -->
        <div class="display-hide" id="Asset-section">
      <div class="border-left px-4 mt-4 w-100">
        <div class="m-2 rounded-lg p-2 m-2">
          <div class="d-flex m-4">
            <div>
              <div class="input-group">
                <div id="search-autocomplete" class="form-outline">
                  <input type="search" class="search-bar rounded-lg" placeholder="" id="form1" class="form-control" />
                </div>
              </div>
            </div>
            <div id="Filter" class="filter">
              <div class="filter-rectangle"></div>
              <img class="filter-icon" src="Vector (7).png" alt="">
            </div>
          </div>
          <div id="Sidebar" class="sidebar border rounded-lg">
            <div class="sidebar-header rounded-lg bg-dark pl-2 pb-2">
              <p class="sdlms-text-white-20px pl-2 pt-2">Filter</p>
            </div>
            <div class="sidebar-content p-4">
              <div class="sidebar-text-container">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                <label class="sidebar-text" for="vehicle1">Threadbuilder</label><br>
              </div>
              <div class="sidebar-text-container">
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
                <label class="sidebar-text" for="vehicle2">Eaglebuilder</label><br>
              </div>
              <div class="sidebar-text-container">
                <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
                <label class="sidebar-text" for="vehicle3">Quizzes</label><br>
              </div>
              <div class="sidebar-text-container">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                <label class="sidebar-text" for="vehicle1">Root Of Thoughts</label><br>
              </div>
              <div class="sidebar-text-container">
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
                <label class="sidebar-text" for="vehicle2">Articles</label><br>
              </div>
              <div class="sidebar-text-container">
                <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
                <label class="sidebar-text" for="vehicle3">Eureka Moments</label><br>
              </div>
              <div class="sidebar-text-container">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                <label class="sidebar-text" for="vehicle1">Questions</label><br>
              </div>
              <div class="sidebar-text-container">
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
                <label class="sidebar-text" for="vehicle2">Answers</label><br>
              </div>
              <div class="sidebar-text-container">
                <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
                <label class="sidebar-text" for="vehicle3">Teaching Methods</label><br>
              </div>
            </div>
            <div class="d-flex justify-content-between sidebar-footer">
              <button class="btn sidebar-button">Select All</button>
              <button class="btn sidebar-button">Unselect All</button>
            </div>
          </div>
          <div class="m-4">
            <div style="width: 100%; height: 20px; border-bottom: 1px solid 
            #C4C4C4; text-align:left;">
              <span class="" style="font-size: 16px; font-weight: 600; background-color:white; padding: 0 10px;">
                Section Title
                <!--Padding is optional-->
              </span>
            </div>
          </div>

          <div class="m-4">
            <div class="d-flex m-4">
              <div class="sdlms-card m-2">
                <div class="sdlms-card-thumbnail img">
                  <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                </div>
                <div class="sdlms-card-title" style="padding-bottom: 50px;">
                  <div class="sdlms-asset-category-name">
                    ARTICLE <br>
                    Artificial Intelligence
                  </div>
                </div>
                <div class="sdlms-asset-description mt-5">
                  <div class="sdlms-asset-content-body">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                      repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                      obcaecati
                      assumenda eaque laborum facilis nulla porro.</p>
                  </div>

                  <div class="sdlms-asset-nav">
                    <a href="#">Read more</a>
                  </div>
                </div>
                <div class="sdlms-card-author author-container author mt-6">
                  <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                    <img src="Component 36.png" alt="">
                  </div>
                  <div class="sdlms-card-author-name pl-4">
                    <p class="sdlms-card-author-details">
                    <p class="sdlms-card-author-name m-0 ">Palash</p>
                    Lorem ipsum dolor, sit amet consectetur
                    </p>
                  </div>
                </div>
                <div class="sdlms-card-footer">
                  <hr>
                  <div class="sdlms-card-footer-content">
                    <p class="sdlms-asset-modification-date">12 February 2022</p>
                  </div>
                </div>
              </div>

              <div class="sdlms-card m-2">
                <div class="sdlms-card-thumbnail img">
                  <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                </div>
                <div class="sdlms-card-title" style="padding-bottom: 50px;">
                  <div class="sdlms-asset-category-name">
                    ARTICLE <br>
                    Artificial Intelligence
                  </div>
                </div>
                <div class="sdlms-asset-description mt-5">
                  <div class="sdlms-asset-content-body">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                      repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                      obcaecati
                      assumenda eaque laborum facilis nulla porro.</p>
                  </div>

                  <div class="sdlms-asset-nav">
                    <a href="#">Read more</a>
                  </div>
                </div>
                <div class="sdlms-card-author author-container author mt-6">
                  <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                    <img src="Component 36.png" alt="">
                  </div>
                  <div class="sdlms-card-author-name pl-4">
                    <p class="sdlms-card-author-details">
                    <p class="sdlms-card-author-name m-0 ">Palash</p>
                    Lorem ipsum dolor, sit amet consectetur
                    </p>
                  </div>
                </div>
                <div class="sdlms-card-footer">
                  <hr>
                  <div class="sdlms-card-footer-content">
                    <p class="sdlms-asset-modification-date">12 February 2022</p>
                  </div>
                </div>
              </div>

              <div class="sdlms-card m-2">
                <div class="sdlms-card-thumbnail img">
                  <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                </div>
                <div class="sdlms-card-title" style="padding-bottom: 50px;">
                  <div class="sdlms-asset-category-name">
                    ARTICLE <br>
                    Artificial Intelligence
                  </div>
                </div>
                <div class="sdlms-asset-description mt-5">
                  <div class="sdlms-asset-content-body">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                      repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                      obcaecati
                      assumenda eaque laborum facilis nulla porro.</p>
                  </div>

                  <div class="sdlms-asset-nav">
                    <a href="#">Read more</a>
                  </div>
                </div>
                <div class="sdlms-card-author author-container author mt-6">
                  <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                    <img src="Component 36.png" alt="">
                  </div>
                  <div class="sdlms-card-author-name pl-4">
                    <p class="sdlms-card-author-details">
                    <p class="sdlms-card-author-name m-0 ">Palash</p>
                    Lorem ipsum dolor, sit amet consectetur
                    </p>
                  </div>
                </div>
                <div class="sdlms-card-footer">
                  <hr>
                  <div class="sdlms-card-footer-content">
                    <p class="sdlms-asset-modification-date">12 February 2022</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex m-4">
              <div class="sdlms-card m-2">
                <div class="sdlms-card-thumbnail img">
                  <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                </div>
                <div class="sdlms-card-title" style="padding-bottom: 50px;">
                  <div class="sdlms-asset-category-name">
                    ARTICLE <br>
                    Artificial Intelligence
                  </div>
                </div>
                <div class="sdlms-asset-description mt-5">
                  <div class="sdlms-asset-content-body">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                      repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                      obcaecati
                      assumenda eaque laborum facilis nulla porro.</p>
                  </div>

                  <div class="sdlms-asset-nav">
                    <a href="#">Read more</a>
                  </div>
                </div>
                <div class="sdlms-card-author author-container author mt-6">
                  <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                    <img src="Component 36.png" alt="">
                  </div>
                  <div class="sdlms-card-author-name pl-4">
                    <p class="sdlms-card-author-details">
                    <p class="sdlms-card-author-name m-0 ">Palash</p>
                    Lorem ipsum dolor, sit amet consectetur
                    </p>
                  </div>
                </div>
                <div class="sdlms-card-footer">
                  <hr>
                  <div class="sdlms-card-footer-content">
                    <p class="sdlms-asset-modification-date">12 February 2022</p>
                  </div>
                </div>
              </div>

              <div class="sdlms-card m-2">
                <div class="sdlms-card-thumbnail img">
                  <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                </div>
                <div class="sdlms-card-title" style="padding-bottom: 50px;">
                  <div class="sdlms-asset-category-name">
                    ARTICLE <br>
                    Artificial Intelligence
                  </div>
                </div>
                <div class="sdlms-asset-description mt-5">
                  <div class="sdlms-asset-content-body">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                      repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                      obcaecati
                      assumenda eaque laborum facilis nulla porro.</p>
                  </div>

                  <div class="sdlms-asset-nav">
                    <a href="#">Read more</a>
                  </div>
                </div>
                <div class="sdlms-card-author author-container author mt-6">
                  <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                    <img src="Component 36.png" alt="">
                  </div>
                  <div class="sdlms-card-author-name pl-4">
                    <p class="sdlms-card-author-details">
                    <p class="sdlms-card-author-name m-0 ">Palash</p>
                    Lorem ipsum dolor, sit amet consectetur
                    </p>
                  </div>
                </div>
                <div class="sdlms-card-footer">
                  <hr>
                  <div class="sdlms-card-footer-content">
                    <p class="sdlms-asset-modification-date">12 February 2022</p>
                  </div>
                </div>
              </div>

              <div class="sdlms-card m-2">
                <div class="sdlms-card-thumbnail img">
                  <img src="surendran-mp-IhWYiwSxm8g-unsplash.jpg" alt="">
                </div>
                <div class="sdlms-card-title" style="padding-bottom: 50px;">
                  <div class="sdlms-asset-category-name">
                    ARTICLE <br>
                    Artificial Intelligence
                  </div>
                </div>
                <div class="sdlms-asset-description mt-5">
                  <div class="sdlms-asset-content-body">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto voluptas velit odit
                      repellendus nemo praesentium ipsam, quo corporis! Ad quod autem explicabo magni
                      obcaecati
                      assumenda eaque laborum facilis nulla porro.</p>
                  </div>

                  <div class="sdlms-asset-nav">
                    <a href="#">Read more</a>
                  </div>
                </div>
                <div class="sdlms-card-author author-container author mt-6">
                  <div class="row sdlms-card-author-image" style="padding-right: 34px;">
                    <img src="Component 36.png" alt="">
                  </div>
                  <div class="sdlms-card-author-name pl-4">
                    <p class="sdlms-card-author-details">
                    <p class="sdlms-card-author-name m-0 ">Palash</p>
                    Lorem ipsum dolor, sit amet consectetur
                    </p>
                  </div>
                </div>
                <div class="sdlms-card-footer">
                  <hr>
                  <div class="sdlms-card-footer-content">
                    <p class="sdlms-asset-modification-date">12 February 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="mb-2">
            
          </div>

          <div class="mt-2">
            <hr style="border: 1px solid #828282;">
            <div class="d-flex justify-content-center justify-content-between  ml-4 mr-4">
              <div class="ml-4 mt-0 mb-0 text-center">
                <img class="p-2" src="Vector.svg" alt="">
                <p>Reflection</p>
              </div>
              <div class="text-center mt-0 mb-0">
                <img class="p-2" src="Vector (3).png" alt="">
                <p>Discussion</p>
              </div>

              <div class="text-center mt-0 mb-0">
                <img class="p-2" src="Vector (4).png" alt="">
                <p>Thought Process</p>
              </div>

              <div class="text-center mt-0 mb-0 mr-4">
                <img class="p-2" src="Vector (5).png" alt="">
                <p>Comment</p>
              </div>
            </div>
            <hr style="border: 1px solid #828282;">
          </div>

          <div class="p-4 text-center">
            <div class="h-75 border-0 bg-gray mt-3 p-3 w-75 " style="display: inline-block">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt sequi tenetur cupiditate veritatis
                possimus debitis!</p>
            </div>

            <div class="h-75 border-0 bg-gray mt-4 p-3 w-75" style="display: inline-block">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt sequi tenetur cupiditate veritatis
                possimus debitis!</p>
            </div>

          </div> -->
        </div>
      </div>

    </div>

    <!-- Leaderboard Section -->
    <div id="Leaderboard-section" class="display-hide w-100 m-2">
      <div class="border-left px-4 w-100">

        <!-- Leadership section -->
        <div id="personas">
          <div class="bg-gray shadow mb-3">
              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Threadbuilders And
                  Eaglebuilders</p>
                <div class="p-2">
                  <div class="d-flex">
                    <p>
                      <i class="fa fa-solid fa-angle-down drop-down1" type="button" data-toggle="collapse" aria-hidden="true"></i>
                    </p>
                  </div>
                </div>
              </div>


              <div class="collapse shadow px-3 pb-3" id="collapseExample12">

                <hr class="m-0 mx-2 border-dark">
                <!-- Carousel 1 -->
                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <!-- <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">Annecdote</p>
                  </div> -->
                  <div class="d-flex justify-content-between">
                    <div class=" border m-2 rounded-lg p-2 w-50 scroll">
                      <p class="sdlms-text-black-18px font-weight-bold">Recent Builders</p>
                      <hr class="border-dark bg-white">
                      <div class="overflow-auto recentAssets">
                      </div>
                    </div>
                    <div class="m-2 p-2 w-50">
                      <canvas id="myChart" style="width:100%;max-width:600px"></canvas>
                    </div>
                  </div>
                </div>
              </div>

          </div>

          <!-- Humility section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Workshops And
                  Events</p>
                <div class="p-2">
                  <div class="d-flex">
                    <p>
                      <i class="fa fa-solid fa-angle-down drop-down2" type="button" data-toggle="collapse" aria-hidden="true"></i>
                    </p>

                  </div>

                </div>

              </div>


              <div class="collapse shadow px-3 pb-3" id="collapseExample34">

                <hr class="m-0 mx-2 border-dark">


                <!-- Carousel 1 -->
                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <!-- <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">Annecdote</p>
                  </div> -->
                  <div class="d-flex">
                    <div class=" border m-2 rounded-lg p-2 w-50 scroll">
                      <p class="sdlms-text-black-18px font-weight-bold">Recent Builders</p>
                      <hr class="border-dark bg-white">
                      <div class="overflow-auto">
                        <div class="m-1">
                        <div class="d-flex">
                          <div class="ml-2">
                            <p class="sdlms-text-black-18px">1. Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quisquam.</p>
                          </div>
                            <div class="m-1">
                              <button class="sdlms-button button-primary leaderboard-btn">Go to EB</button>
                            </div>
                        </div>
                          <div>
                            <p class="sdlms-text-white-14px text-dark pl-2">Eaglebuilder</p>
                            <p class="sdlms-text-white-14px text-dark pl-2">Thread Count:124</p>
                            <p class="sdlms-text-white-14px text-dark pl-2">Character Count:1300</p>
                            <p class="sdlms-text-white-14px text-dark pl-2">Date: 13th August 2022</p>
                          </div>
                        </div>
                          <hr class="m-0 mx-2">
                          <div class="m-1">
                          <div class="d-flex">
                            <div class="ml-2">
                              <p class="sdlms-text-black-18px">1. Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quisquam.</p>
                            </div>
                              <div class="m-1">
                                <button class="sdlms-button button-primary leaderboard-btn">Go to EB</button>
                              </div>
                          </div>
                            <div>
                              <p class="sdlms-text-white-14px text-dark pl-2">Eaglebuilder</p>
                              <p class="sdlms-text-white-14px text-dark pl-2">Thread Count:124</p>
                              <p class="sdlms-text-white-14px text-dark pl-2">Character Count:1300</p>
                              <p class="sdlms-text-white-14px text-dark pl-2">Date: 13th August 2022</p>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div class="m-2 p-2 w-50">
                      <canvas id="myChart1" style="width:100%;max-width:600px"></canvas>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Hardworking section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Assets</p>
                <div class="p-2">
                  <div class="d-flex">
                    <p>
                      <i class="fa fa-solid fa-angle-down drop-down34" type="button" data-toggle="collapse" aria-hidden="true"></i>
                    </p>

                  </div>

                </div>

              </div>


              <div class="collapse shadow px-3 pb-3" id="collapseExample35">

                <hr class="m-0 mx-2 border-dark">


                <!-- Carousel 1 -->
                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <!-- <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">Annecdote</p>
                  </div> -->
                  <div class="d-flex">
                    <div class=" border m-2 rounded-lg p-2 w-50 scroll">
                      <p class="sdlms-text-black-18px font-weight-bold">Recent Builders</p>
                      <hr class="border-dark bg-white">
                      <div class="overflow-auto">
                        <div class="m-1">
                        <div class="d-flex">
                          <div class="ml-2">
                            <p class="sdlms-text-black-18px">1. Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quisquam.</p>
                          </div>
                            <div class="m-1">
                              <button class="sdlms-button button-primary leaderboard-btn">Go to EB</button>
                            </div>
                        </div>
                          <div>
                            <p class="sdlms-text-white-14px text-dark pl-2">Eaglebuilder</p>
                            <p class="sdlms-text-white-14px text-dark pl-2">Thread Count:124</p>
                            <p class="sdlms-text-white-14px text-dark pl-2">Character Count:1300</p>
                            <p class="sdlms-text-white-14px text-dark pl-2">Date: 13th August 2022</p>
                          </div>
                        </div>
                          <hr class="m-0 mx-2">
                          <div class="m-1">
                          <div class="d-flex">
                            <div class="ml-2">
                              <p class="sdlms-text-black-18px">1. Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quisquam.</p>
                            </div>
                              <div class="m-1">
                                <button class="sdlms-button button-primary leaderboard-btn">Go to EB</button>
                              </div>
                          </div>
                            <div>
                              <p class="sdlms-text-white-14px text-dark pl-2">Eaglebuilder</p>
                              <p class="sdlms-text-white-14px text-dark pl-2">Thread Count:124</p>
                              <p class="sdlms-text-white-14px text-dark pl-2">Character Count:1300</p>
                              <p class="sdlms-text-white-14px text-dark pl-2">Date: 13th August 2022</p>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div class="m-2 p-2 w-50">
                      <canvas id="myChart2" style="width:100%;max-width:600px"></canvas>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Curious section -->

          <div class="bg-gray shadow mb-3">
            <div>

              <div class="d-flex justify-content-center bg-gray" style="height: 40px;">
                <p class="mr-auto ml-3 pl-2 pt-2 sdlms-text-black-18px font-weight-bold">Reflections</p>
                <div class="p-2">
                  <div class="d-flex">
                    <p>
                      <i class="fa fa-solid fa-angle-down drop-down45" type="button" data-toggle="collapse" aria-hidden="true"></i>
                    </p>
                  </div>
                </div>
              </div>


              <div class="collapse shadow px-3 pb-3" id="collapseExample36">

                <hr class="m-0 mx-2 border-dark">


                <!-- Carousel 1 -->
                <div class="bg-white mx-3 mt-3 mb-0 rounded-lg">
                  <!-- <div class="d-flex mr-auto justify-content-between pt-2 px-2 pb-1">
                    <p class="sdlms-text-black-18px m-0">Annecdote</p>
                  </div> -->
                  <div class="d-flex">
                    <div class=" border m-2 rounded-lg p-2 w-50 scroll">
                      <p class="sdlms-text-black-18px font-weight-bold">Recent Builders</p>
                      <hr class="border-dark bg-white">
                      <div class="overflow-auto">
                        <div class="m-1">
                        <div class="d-flex">
                          <div class="ml-2">
                            <p class="sdlms-text-black-18px">1. Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quisquam.</p>
                          </div>
                            <div class="m-1">
                              <button class="sdlms-button button-primary leaderboard-btn">Go to EB</button>
                            </div>
                        </div>
                          <div>
                            <p class="sdlms-text-white-14px text-dark pl-2">Eaglebuilder</p>
                            <p class="sdlms-text-white-14px text-dark pl-2">Thread Count:124</p>
                            <p class="sdlms-text-white-14px text-dark pl-2">Character Count:1300</p>
                            <p class="sdlms-text-white-14px text-dark pl-2">Date: 13th August 2022</p>
                          </div>
                        </div>
                          <hr class="m-0 mx-2">
                          <div class="m-1">
                          <div class="d-flex">
                            <div class="ml-2">
                              <p class="sdlms-text-black-18px">1. Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quisquam.</p>
                            </div>
                              <div class="m-1">
                                <button class="sdlms-button button-primary leaderboard-btn">Go to EB</button>
                              </div>
                          </div>
                            <div>
                              <p class="sdlms-text-white-14px text-dark pl-2">Eaglebuilder</p>
                              <p class="sdlms-text-white-14px text-dark pl-2">Thread Count:124</p>
                              <p class="sdlms-text-white-14px text-dark pl-2">Character Count:1300</p>
                              <p class="sdlms-text-white-14px text-dark pl-2">Date: 13th August 2022</p>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div class="p-2 w-50">
                      <div class="border rounded-lg p-2 w-100">
                        <div class="header-reflections">
                          <p class="sdlms-text-black-20px">Reflections Count</p>
                        </div>
                        <div class="body-reflections justify-content-between d-flex">
                          <div class="count-container">
                            <div class="border m-2 rounded-lg p-2">
                              <p class="countCommited">100</p>
                            </div>
                            <p>Reflections commited to</p>
                          </div>
                          <div class="count-container">
                            <div class="border m-2 rounded-lg p-2">
                              <p class="countCompleted">10</p>
                            </div>
                            <p>Reflections completed</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>