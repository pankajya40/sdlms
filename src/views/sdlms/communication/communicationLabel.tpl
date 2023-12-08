<style>
  .outLine:focus{
    outline: none;
  }
  .sdlms-container { padding: 0!important; width: 100%!important; }
</style>

<!-- IMPORT partials/sidebar.tpl -->

    <div class="container" style='max-width:100%'>
        <form class="sdlms-form-elements" style='box-shadow:rgb(14 30 37 / 12%) 0px 2px 4px 0px, rgb(14 30 37 / 32%) 0px 2px 16px 0px;padding: 45px 20px;margin-top: 8px;'>
        <div style='display:flex;align-items:center;margin-left:12px'>
            <div class="form-group" style='width: 50%; margin-right: 10px;'>

                <input type="email" class="form-control text1" id="exampleFormControlInput1"
                    placeholder="Broadcast Name" style='width: 100%;height: 43px;margin-top: 0px;'>
            </div>
             <div class="form-group" style='width: 50%;height: 44px;'>
                <input type="search" class="form-control search-bar" name="search" id="search" placeholder="Search..." style='width:100%'>
                <section id="searchResults" class="container">
                    <p id="searchText"></p>
                </section>
            </div>
        </div>
           

            <div class="form-group value-grp">
                    <div class="col-lg-3 col-md-6 col-sm-12 ">
                        <h3 class="value my-2">Send message to</h3>
                    </div><br>
                <div style='display:flex;justify-content:space-around;align-items:center;margin: 0px -50px 0px 0px'>

                    <div class="col-lg-3 col-md-6 col-sm-12" style='height:40px'>
                        <div class="btn-group" style='height:48px'>
                            <div class="dropdown" style='width:200px;'>
                                <select name="batch" id="batch-dropdown" class="sdlms-form-select" style='width:100%;height: 40px;'>
                                    <option hidden selected>Batch</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12" style='height:40px'>
                        <div class="dropdown" style='width:200px;height:48px;'>
                            <select name="cohort" id="cohort-dropdown" class="sdlms-form-select" style='width:100%;height: 40px;'>
                                <option hidden selected>Cohort</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12" style='height:40px'>
                        <div class="dropdown" style='width:200px;height:48px;'>
                            <select name="channel" id="channel-dropdown" class="sdlms-form-select" style='width:100%;height: 40px;'>
                                <option hidden selected>Channel</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12" style='height:40px'>
                        <div class="dropdown" style='width:200px;height:48px;'>
                            <select name="session" id="session-dropdown" class="sdlms-form-select" style='width:100%;height: 40px;'>
                                <option hidden selected>Session</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
            <div class="row side-btn-top">
                <div class="col-3 " id='buttons'>
                    <p class='text1' style='margin-left:10px'>Select Cohort/Session</p>
                </div>
                <div class="col-9" id="textarea"> <textarea class="form-control append" id="exampleFormControlTextarea3"
                        rows="11" style='box-shadow: rgb(14 30 37 / 12%) 0px 2px 4px 0px, rgb(14 30 37 / 32%) 0px 2px 16px 0px;'></textarea>
                </div>
                <div id='uid' class='ml-auto' style='margin-right:50px'>

                </div>
            </div><br><br>
            <div class="row justify-content-end">
                <div class="col-9"></div>
                <div class="col-5" style='display:flex;justify-content: end;align-items:center'>
                    <div class='m-2'>
                        <button type="button" class="btn-m button-lg sdlms-button button-primary" style='width:141px'>Save as draft
                        </button>
                    </div>

                    <div class='m-2'>
                        <button type="reset" class=" btn-m button-lg sdlms-button button-primary" id="reset">Reset
                        </button>
                    </div>

                    <div class='m-2'>
                        <button type="button" class=" btn-m button-lg sdlms-button button-primary"
                            id="submit">Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>

<!-- IMPORT partials/footer.tpl -->
