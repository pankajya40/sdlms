<div class="row">
    <div class="col-md-12">


        <div class="d-flex justify-content-around">
            <div class="formComponent">

            </div>
            <div class="sdlms-section session-view sdlms-form-elements">
                <div
                    class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
                    <div class="align-items-center sdlms-text-white-20px" style="text-align: center;">

                        <div><span>Mark here</span><span id="pageTitle"></span></div>
                    </div>
                </div>
                <div class="sdlms-section-body">
                    <form class="w-100" scores>
                    <!--BEGIN answers -->
                    <!--BEGIN answers.answers-->
                    <div class="m-3">
                        <div class="row mt-2">


                            <div class="w-100 mt-2">


                                <div data-input-type="range" class="bg-light border mb-4 px-2 position-relative">
                                    <div class="pt-2 form-group col-12 sdlms-text-primary-16px font-weight-bold">
                                        <div>
                                            <span
                                                data-question='{answers.answers.question}'>{answers.answers.question}</span>
                                        </div>
                                    </div>
                                    <div class="form-group col-12">
                                        <div class="row">
                                            <div class="col-12 answering-field-area">
                                                <div answering-field-area="4eabadf0-8619-97ca-8101-c318e4a5204a">
                                                    <div range-container="4eabadf0-8619-97ca-8101-c318e4a5204a"
                                                        class="row">
                                                        <label for="" class="form-label col-12">Slide to give rating to
                                                            your buddy's response</label>
                                                        <div class="col-12 range-configuration">

                                                        </div>
                                                        <div class="col-12">
                                                            <input data-id="4eabadf0-8619-97ca-8101-c318e4a5204a"
                                                                title="" name="response[@index][score]" range-selector="" type="range" value="2"
                                                                class="form-range w-100" min="2" max="10" step="1"
                                                                id="Score-for-question">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-12">
                                        <div class="row">
                                            <div class="col-12 answering-field-area">
                                                <div answering-field-area="9e63af5a-9f67-ae6c-b627-5b53385d5d69">

                                                    <textarea rows="4"
                                                        placeholder="Reflect on why you gave that score ?" required=""
                                                        value="" name="response[@index][reflection]" type="text"
                                                        class="form-control w-100"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <!--END answers.answers-->
                    <!--END answers -->
                    <div class="d-flex align-items-center justify-content-center mt-4" change-to-aprofile=""
                    data-tid="1486">
                    <button type="submit" class="sdlms-button button-primary button-lg" submitScore>Submit</button>
                </div>
                </form>
                   
                </div>
            </div>
        </div>

        <div class="loadingScreen"></div>
        <div class="row">
            <div class="col-8">
                <div class="markAnswer pb-4"></div>
            </div>
        </div>

    </div>
</div>