<button class="react col-4 button-brand button-md-p m-2" id="react">Add reflection</button>

<div class="modal main-box d-none">
<div class=" font-12 " id="main-box">
    <form id="submit-reflection">
        <div style="border: 1px solid #ced4da; border-radius:10px;">
            <div class=" reaction d-flex">
                <div class="emotion react-1 font-12"><i class="fa fa-smile-o"></i> Emotion</div>
                <div class="values react-1 font-12"><i class="fa fa-diamond"></i> Value</div>
                <div class="wisdom react-1 font-12"><i class="fa fa-lightbulb-o"></i> Wisdom</div>
            </div>
            <div class="react-2">
                <label for="options" class="font-12">Select emotions<span style="color:red;">*</span></label>
                <div>
                    <select class="form-control font-12" required>
                        <option selected disabled value="">Select option</option>
                        <option>General Discussion</option>
                        <option>Socratic Dialogue</option>
                        <option>Topic Oriented</option>
                        <option>Room Classification</option>
                        <option>General Discussion</option>
                        <option>Socratic Dialogue</option>
                        <option>Topic Oriented</option>
                        <option>Room Classification</option>
                        <option>General Discussion</option>
                    </select>
                </div>
                <div>
                    <label for="input" class="font-12">Reflection<span style="color:red;">*</span></label>
                    <div>
                        <textarea id="reflection" class="form-control font-12" name="reflection" rows="3" cols="40"
                            placeholder="Enter the reflection..." required></textarea>
                    </div>
                </div>
                <div class="main-box mt-20-px">
                    <button class="button-primary button-lg-p font-12">Submit</button>
                </div>
            </div>
        </div>

    </form>
</div>
<div>