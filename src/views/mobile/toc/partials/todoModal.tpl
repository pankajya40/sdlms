<div class="fade modal p-4" id="todoModal" tabindex="-1" role="dialog" aria-labelledby="newtodomodal" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-lg mobile-modal" role="document">
        <div class="border-0 modal-content" style="height: auto;">
            <div class="modal-body">
                <form id="todo">
                    <div class="col-12 p-0">
                        <label for="input" class="font-12">What you want add?</label>
                        <div class="align-items-center d-flex flex-column justify-content-between mobile-modal-text">
                            <textarea class="form-control reflection mobile-modal-textarea" placeholder="Add your todo" name="title" rows="1" no-of-characters="" maxlength="200"></textarea>
                        </div>
                    </div>
                    <label for="options" class="font-12 pt-3">Select priority</label>
                    <div>
                        <select class="form-control font-12" name="priority">
                            <option value="urgent" selected>Urgent</option>
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div class="col-12 p-0">
                        <label for="options" class="font-12 pt-3">Why?</label>
                        <div>
                            <select class="form-control font-12" name="priority_reason">
                                <option value="progress" selected>Progress</option>
                                <option value="learning">Learning</option>
                                <option value="hackathon">Hackathon</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12 p-0 pt-3">
                        <label for="input" class="font-12">Description (Optional)</label>
                        <textarea class="form-control reflection mobile-modal-textarea border" placeholder="Write description about todo" name="description" rows="6" no-of-characters="" maxlength="200"></textarea>
                    </div>
                </form>
                <div class="main-box mt-20-px">
                    <button class="border-0 button-lg-p font-12 submit-reflection modal-submit-button submit-todo mr-5">Submit</button>
                    <button class="border-0 button-lg-p font-12 close-reflection modal-close-button close-todo" id="close-button" style="background-color: gray; color:black;">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
