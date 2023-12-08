<div class="d-flex ">
        <!-- Buttons -->
        <div class="d-flex flex-column">
            <button type="button" class="btn button-primary sdlms-text-white-12px m-2 btn-circle btn-xl p-0">Create</button>
            <button type="button" class="btn button-primary sdlms-text-white-12px m-2 btn-circle btn-xl p-0">Segments</button>
            <button id = "mainControlbtn" type="button" class="btn button-primary sdlms-text-white-12px m-2 btn-circle btn-xl p-0">Control</button>
            <div id = "mainControls" style = "display:none;">
                <button type="button" class="btn sdlms-text-white-12px button-primary">Start Quiz</button><br>
                <button type="button" class="btn sdlms-text-white-12px button-primary">Start Marking</button>
            </div>

        </div>
        <div class="w-100">
        <!-- Body -->
        <div class="sdlms-container border rounded bg-gray">

            <div class="section-body d-flex w-100">
                <div class="section-body border rounded bg-light w-50 p-2">
                    <div>
                        <p>Questions</p>
                        <input class="w-75" type="text">
                        <button class="btn button-primary">Add + </button>

                    </div>
                    <h5>Questions added : </h5>
                    <div class="d-flex ">
                        
                        <p>Question that is added.</p>
                        

                    </div>

                </div>
                <div class="section-body border rounded bg-light w-50 ml-2 p-2">
                    <div>
                        <p>Rubrics</p>
                        <div class="d-flex justify-content-center">
                            <button class = "btn button-primary"> Choose Template</button>
                        </div>

                    </div>
                    
                </div>
                
            </div>
            <div class="d-flex justify-content-right mt-2">
                <button class= "btn button-primary mr-2">Preview</button>
                <button class= "btn button-primary">Next</button>

            </div>
        </div>
        </div>
    </div>

    <style>
     

        .bg-gray{
            background-color: #f5f5f5;
        }

        
        .main-btn{
            border: none;
        }

        .xyz {
            background-size: auto;
            text-align: center;
            padding-top: 100px;
        }
        .btn-circle.btn-sm {
            width: 30px;
            height: 30px;
            padding: 6px 0px;
            border-radius: 15px;
            font-size: 8px;
            text-align: center;
        }
        .btn-circle.btn-md {
            width: 50px;
            height: 50px;
            padding: 7px 10px;
            border-radius: 25px;
            font-size: 10px;
            text-align: center;
        }
        .btn-circle.btn-xl {
            width: 70px;
            height: 70px;
            padding: 10px 16px;
            border-radius: 35px;
            font-size: 12px;
            text-align: center;
        }
    </style>