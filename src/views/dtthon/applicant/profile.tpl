<style>
    .sdlms-container {
        padding: 0 !important;
        width: 100% !important;
    }

    html {
        padding: 0 !important;
    }

    .profile-container {
        width: 100vw;
    }
</style>

<div class="main-content">
    <div class="align-items-center d-flex justify-content-around header pb-8 pt-lg-5 dtthon-profile-background">
        <span class="mask bg-gradient-default opacity-8"></span>
        <div class="profile-container d-flex align-items-center">
            <div class="col-lg-7 col-md-10">
                <h1 class="project-title text-white">{project.title}</h1>
                <p class="text-white mt-3 mb-5">
                    "{project.short_description}"
                </p>
                <button class="border-0 btn button-primary sdlms-button apply-btn"
                    style="padding: 0.625rem 1.25rem;">Apply Now</button>
            </div>
            <div class="col-md-4 col-lg-5 pb-3 d-flex justify-content-center">
                <div class="pb-3 process-image mb-4">
                </div>
            </div>
        </div>
    </div>
    <div class="profile-container">
        <div class="row">
            <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div class="card card-profile shadow">
                    <div class="row justify-content-center">
                        <div class="col-lg-3 order-lg-2">
                            <div class="card-profile-image">
                                <div>
                                    <img src="https://sdlms.deepthought.education/assets//uploads/files/images/dt_logo.png"
                                        class="rounded-circle">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body pt-0 pt-md-4">
                        <div class="text-center" style="padding-top: 120px;">
                            <h3 style="font-weight: 600;">Deep Thought</h3>
                            <hr class="my-4">
                            <p>DT powers the teams of futuristic startups. Young contributors unlearn, relearn with us,
                                to create socio-economic value. DT repositions the education industry, DT is India's
                                answer to Tesla</p>
                            <a href="https://deepthought.education">Explore more</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-8 order-xl-1">
                <div class="card card-background shadow">
                    <div class="card-header bg-white border-0">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h5 class="mb-0">Opportunity Description</h5>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="pl-3">
                            <div>
                                <div class="pb-3">
                                    <p>
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                            <div class="bold-font">
                                Learning outcomes
                            </div>
                            <div>
                                <ul id="learning_outcomes" style="font-weight: lighter; list-style: disc;">
                                    <!-- BEGIN project.learning_outcomes -->
                                    <li>{@value}</li>
                                    <!-- END project.learning_outcomes -->
                                </ul>
                            </div>
                            <div class="bold-font">
                                Pre-requisties
                            </div>
                            <div>
                                <ul id="pre_requisites" style="font-weight: lighter; list-style: disc;">
                                    <!-- BEGIN project.pre_requisites -->
                                    <li>{@value}</li>
                                    <!-- END project.pre_requisites -->
                                </ul>
                            </div>
                            <div>
                                <div class="pt-3"><b>Duration of time expected to accomplish:</b> &nbsp
                                    {project.commitment}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<footer class="dtthon-profile-footer">
    <div class="row align-items-center justify-content-xl-between">
        <div class="col-xl-6 m-auto text-center">
            <div class="dtthon-profile-copyright">
            </div>
        </div>
    </div>
</footer>