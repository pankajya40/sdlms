 <style>
.sdlms-container {
    width: 100%!important;
    padding: 0!important;
}

 </style>
 <!-- <div class="primary-bg d-flex justify-content-center">
    <div class="component-full">
        <div class="container secondary-bg mt-3 rounded-top-10-px">
             static elements 
            <div class="static pb-3">
                 header
                <img src={eventData.image}
                    alt="headerImg" class="mt-3 mb-1 img-height-160 component-full rounded-lg img-cover" />
                <p class="font-24 mb-1">{eventData.name}</p>

                 details summary
                <div class="d-flex justify-content-between">
                    <div class="hosted-by d-flex align-items-center">
                        <img src={eventData.hostPicture}
                            alt="pfp" class="rounded-circle circle-xsm mr-1 img-cover" />
                        <p class="mb-0 font-10">
                            Hosted by:
                            <span class="brand-text font-medium">{eventData.hostDisplayName}</span>
                        </p>
                    </div>
                    <div class="date d-flex align-items-center">
                        <i class="fas fa fa-solid fa-calendar"></i>
                        <p class="font-medium mb-0 ml-1 font-10">{eventData.date}</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-2">
                    <div class="venue d-flex align-items-center">
                        <i class="fas fa fa-solid fa-location-dot mr-1"></i>
                        <p class="mb-0 font-10">Venue: DeepThought Zoom Link</p>
                    </div>
                    <div class="date d-flex align-items-center">
                        <i class="fas fa fa-solid fa-clock"></i>
                        <p class="font-medium mb-0 ml-1 font-10">{eventData.time}</p>
                    </div>
                </div>

                 participant details
                <div class="mt-20-px d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                        <i class="fas fa fa-solid fa-tag mr-1 font-12"></i>
                        <p class="mb-0 font-10">{eventData.category_name.name} > {eventData.sub_category_name.name}</p>
                    </div>
                    <div class="d-flex align-items-center font-10">
                        <i class="fas fa mr-1 fa-solid fa-users"></i>
                        <p class="mb-0">{eventData.attendeeNum} Registrations</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="fas fa mr-1 fa-solid fa-circle-check font-12"></i>
                        <p class="mb-0 font-10">Rigor Rank: {eventData.rigor_rank}</p>
                    </div>
                </div>
            </div>
        </div>

         tabs list
        <div class="container py-1">
            <ul class="nav font-14 justify-content-between" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="active primary-text pb-1" id="details-tab" data-toggle="tab" href="#details" role="tab"
                        aria-controls="details" aria-selected="true">Details</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="primary-text pb-1" id="learning-tab" data-toggle="tab" href="#learning" role="tab"
                        aria-controls="learning" aria-selected="false">Learning Outcomes</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="primary-text pb-1" id="purpose-tab" data-toggle="tab" href="#purpose" role="tab"
                        aria-controls="purpose" aria-selected="false">Purpose</a>
                </li>
            </ul>
        </div>

         tabs
        <div class="container secondary-bg pt-2 rounded-bottom-10-px">
            <div class="tab-content mb-3" id="myTabContent">
                <div class="tab-pane fade show active font-12" id="details" role="tabpanel"
                    aria-labelledby="details-tab">
                    {eventData.description}
                </div>
                <div class="tab-pane fade" id="learning" role="tabpanel" aria-labelledby="learning-tab">
                     <ul class="font-12">
                        <li>Learn about neural networks</li>
                        <li>Learn use cases of neural networks</li>
                        <li>Apply learnt neural network knowledge on making a chat bot</li>
                        <li>elementum facilisis leo vel fringilla</li>
                        <li>Apply learnt neural network knowledge on making a chat</li>
                        <li>Learn about neural networks</li>
                        <li>Learn use cases of neural networks</li>
                        <li>Apply learnt neural network knowledge on making a chat bot</li>
                        <li>elementum facilisis leo vel fringilla</li>
                        <li>Apply learnt neural network knowledge on making a chat</li>
                    </ul>
                    <p class="font-12">{eventData.description_2}</p>
                </div>
                <div class="tab-pane fade pt-2" id="purpose" role="tabpanel" aria-labelledby="purpose-tab">
                     <div class="host-tagline d-flex align-items-center mb-2">
                        <img src="https://www.mantruckandbus.com/fileadmin/_processed_/7/1/csm_Richard_von_Braunschweig_2a0347f46a.jpeg"
                            alt="pfp" class="rounded-circle circle-md mr-2 img-cover" />
                        <div class="tagline">
                            <p class="mb-0 font-14">Saksham Dahiya</p>
                            <p class="font-10 mb-0">
                                Full stack web developer at DeepThought
                            </p>
                        </div>
                    </div>
                    <p class="font-12">
                        habitasse platea dictumst quisque sagittis purus sit amet volutpat
                        consequat mauris nunc congue nisi vitae suscipit tellus mauris a
                        diam maecenas sed
                    </p>
                    {eventData.description_1}
                </div>
            </div>

            <div class="hold d-flex pb-4">
                <p></p>
                <button type="submit" class="button-brand button-lg-p font-12 floating-right" id="register">
                    Register
                </button>
            </div>
        </div>
    </div>
</div> -->

 <!-- paste by prateek -->
    <style>
        .bg-black{
            background-color: black;
        }
        .profile-size{
            height: 50px;
            width: 50px;
        }
        .border-radii{
            border-top-left-radius: 10px !important;
             border-top-right-radius: 10px !important;  
        }
        .border-radii2{
            border-top-left-radius: 0px !important;
            border-top-right-radius: 0px !important; 
        }
        .card-width{
            width: 100%;
        }
        .owl-stage-outer{
            margin-bottom: -40px !important;
        }
        button{
            padding: 4px 9px !important;
        }
    </style>
    <div class="container p-0">
        <!-- profile image of events -->
        <img class="rounded-10-px border-radii2" src={eventData.image}  style="height: 200px; width: 100%;">
        <div class="d-flex justify-content-center">
            <div class="card text-center shadow rounded-10-px border-0" style="width: 90%; margin-top: -40px;">
                <div class="row pl-3 mt-2 ml-0">
                    <!-- events name -->
                    <div class="col-8 d-flex justify-content-start" style="margin-left: -14px;">
                        <h5>{eventData.name}</h5>
                    </div>
                    <div class="col-4">
                        <button class="button-primary button-lg sdlms-button sdlms-section flex text-white" style="background-color: #0000ff; margin-left: -10px;">
                            <span>Register</span>
                        </button>      
                    </div>
                </div>
                <!-- Date and time of events -->
                <div class="row pl-3 profile-reflection-card-text ml-0">
                    <span>{eventData.date} | </span>
                    <span>{eventData.time}</span>
                </div>
                <div class="row pl-3 profile-reflection-card-text ml-0">
                    <p>Venue : Deep Thought Zoom Link</p>
                </div>
            </div>
        </div>
        <!-- Host name and profile pic -->
        <div class="container" style="padding: 0px 28px;">
            <div class="mt-3" style="width: 100%;">
                <p>Hosted by-</p>
                <div class="d-flex align-items-end" style="margin-top: -7px;">
                    <img src={eventData.hostPicture} alt="" class="rounded-circle profile-size">
                    <p style="padding-left: 16px;">{eventData.hostDisplayName}</p>
                </div>
            </div>
            <!-- Event attendee  -->
            <div class="row mt-20-px">
                <div class="col-7">
                    <p><i class="fas fa mr-1 fa-solid fa-users"></i> {eventData.attendeeNum} Registrations</p>
                </div>
                <div class="col-5  d-flex justify-content-center">
                    <p>Regior Rank:{eventData.rigor_rank}</p>
                </div>
            </div>
            <div class="mb-0">
                <p><i class="fas fa fa-solid fa-tag mr-1 font-12"></i>{eventData.category_name.name} > {eventData.sub_category_name.name}</p>   
            </div>
            <div id="cardpart">

            </div>
            <!-- Details purpose and Learning outcomes from events -->
            <div class="row mb-3" style="margin-top: -12px;">
                <!-- use owl carousel class -->
                <div class="owl-carousel owl-theme">
                    <!-- Details col -->
        
                    <div class="col pt-3 mt-3 item mb-5 d-flex justify-content-center cardpart ">
                        <div class="card text-center shadow rounded-10-px border-0 card-width">
                            <div class="card-header bg-black border-radii text-white">
                                <span>Details</span>
                            </div>
                            <div class="card-body">
                                <p class="card-text">{eventData.description}</p>
                            </div>
                        </div>
                    
                    </div>
                    <!-- Learning Outcomes col -->
                    <div class="col pt-3 mt-3 item mb-5 d-flex justify-content-center">
                        <div class="card text-center shadow rounded-10-px border-0 card-width">
                            <div class="card-header bg-black border-radii text-white">
                                <span>Learning Outcomes</span>
                            </div>
                            <div class="card-body">
                                <p class="card-text">{eventData.description_2}</p>
                            </div>
                        </div> 
                    </div>
                    <!-- Purpose col -->
                    <div class="col pt-3 mt-3 item mb-5 d-flex justify-content-center">
                        <div class="card text-center shadow rounded-10-px border-0 card-width">
                            <div class="card-header bg-black border-radii text-white">
                                <span>Purpose</span>
                            </div>
                            <div class="card-body">
                                <p class="card-text">{eventData.description_1}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      