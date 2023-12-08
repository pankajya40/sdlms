<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
<style>
    * {
        margin: 0px;
        padding: 0px;
    }

    .profile-pic {
        /* position: absolute; */
        width: 8rem;
        height: 8rem;
        /* bottom: -60px; */
        left: 15px;
        border-radius: 5%;
        border: 2px solid rgb(236, 234, 234);
        background: rgb(245, 245, 245);
        padding: 3px;
    }

    .user-name {
        font-weight: 700;
        font-size: 20px;
    }

    .fc-b {
        color: blue;
    }

    .about-user {
        margin-bottom: 5px;
        min-height: 20px;
        background-color: #e1e0e04f;
        border-radius: 5px;
        padding: 3px;
    }

    .fs-12 {
        font-size: 12px;
    }

    .fs-15 {
        font-size: 15px;
    }
</style>
<div class="container-fluid shadow p-3 rounded border mb-2">
    <div class="row">
        <div class="col-sm-2 text-center">
            <img src="https://media.istockphoto.com/id/469753498/photo/portrait-of-happy-little-boy-giving-you-thumbs-up.jpg?s=612x612&w=0&k=20&c=EK8rtpHJotMlBER71dKNww8ETSIEmxS0vYzz-WDyIOo="
                class="profile-pic">

        </div>
        <div class="col-sm-10">
            <div class="row mb-2 ">
                <div class="col-4 col-sm-4"><i class="fa fa-envelope fs-12"></i> &nbsp;&nbsp;<span
                        class="email fs-12 fc-b">
                        xyzstu123@gmail.com</span></div>
                <div class="col-4 col-sm-4"><i class="fa fa-phone fs-12"></i>&nbsp;&nbsp;<span
                        class="phonenumber fs-12 fc-b"> 9987***** </span></div>
                <div class="col-4 col-sm-4"><i class="fa fa-map-marker fs-12"></i>&nbsp;&nbsp;<span
                        class="company-clg fs-12 fc-b"> xyz company
                        limited </span></div>
            </div>
            <div class="user-name fs-15">lorem ipsum</div>
            <div class="designation fs-12 fc-b mb-2">Software Developer</div>
            <div class="about-user fs-12">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim eligendi
                quae
                omnis voluptatem sunt obcaecati?</div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-sm-2 p-0 ">
            <div class="shadow rounded p-3 border mb-2">
                <div class="fc-b"> Skills</div>
                <div class="skills ml-3 fs-12">
                    <div>Python</div>
                    <div>Javascript</div>
                    <div>Ruby</div>
                    <div>Time player</div>
                </div>
            </div>
            <div class="interest shadow p-3 rounded border mb-2">
                <div class="fc-b">Interests</div>
                <div class="interests ml-3 fs-12">
                    <div>Travel</div>
                    <div>Explore</div>
                    <div>Writing</div>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="graph">
            <div class="summaryy">
                            <div class=" dt-graph text-center">
                            <canvas id="myChart" style="width:100%;max-width:700px"></canvas>
                        </div>
                        </div>
            </div>

            <div>
                <div class="GR-level"></div>
                <div class="BP-level"></div>
            </div>
        </div>

    </div>
</div>