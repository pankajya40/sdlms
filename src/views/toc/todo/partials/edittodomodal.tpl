<div class="fade modal p-4" id="editmodal" tabindex="-1" role="dialog" aria-labelledby="editmodal" aria-hidden="true" style="display: none;">
    <div class="modal-dialog-centered modal-lg mx-auto" role="document">
        <div class="border-0 modal-content" style="height: auto;">
            <div class="modal-body p-4">
                <form id="todo" class="">
                    <div class="row">
                        <div class="form-group col">
                            <label for="input" class="">What do you want to do?</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-sticky-note" aria-hidden="true"></i></span>
                                </div>
                                <textarea class="form-control resize-none" placeholder="Enter your todo" name="title" rows="2" required="" maxlength="30"></textarea>
                            </div>
                        </div>
                        <div class="form-group col">
                            <label for="description" class="">Description (optional)</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-comment" aria-hidden="true"></i></span>
                                </div>
                                <textarea class="form-control resize-none" placeholder="Add a description (optional)" name="description" rows="2" maxlength="100"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="form-group">
                                <label for="priority_reason" class="">Urgent or Important </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="far fa-question-circle" aria-hidden="true"></i></span>
                                    </div>
                                    <div class="d-flex form-control justify-content-xl-start" name="priority_reason" aria-required="true">
                                        <div class="form-check">
                                            <input class="form-check-input hideCheckbox" type="checkbox" value="true" id="urgent" name="isUrgent" />
                                            <label class="emoji form-check-label" for="urgent" title="Urgent">🚨</label>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input hideCheckbox" type="checkbox" value="true" id="important" name="isImportant" />
                                            <label class="form-check-label emoji" for="important" title="Important">📌</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-group" id="assignee-group">
                                <label for="assignee" class="">Schedule </label>
                                <div class="row">
                                    <div class="col-5 input-group">
                                        <input type="datetime-local" class="form-control" id="datetime" name="scheduleFrom" />
                                    </div>
                                    <p class="col-2 my-auto">to</p>
                                    <div class="col-5 input-group">
                                        <input type="datetime-local" class="form-control" id="datetime" name="scheduleTo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-end">
                        <button id="saveedit" class="border-0">
                            <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path
                                    d="M5.5999 19.4V14C5.5999 13.3373 6.13716 12.8 6.7999 12.8H15.1999C15.8626 12.8 16.3999 13.3373 16.3999 14V20M13.9999 6.20002L6.7999 6.20002C6.13716 6.20002 5.5999 5.66276 5.5999 5.00002L5.5999 1.40002M19.9974 5.5975L16.4024 2.00255C16.0166 1.61676 15.4934 1.40003 14.9478 1.40002H3.45705C2.3209 1.40002 1.3999 2.32102 1.3999 3.45717V18.5429C1.3999 19.679 2.3209 20.6 3.45705 20.6H18.5428C19.6789 20.6 20.5999 19.679 20.5999 18.5429V7.05211C20.5999 6.50652 20.3832 5.98328 19.9974 5.5975Z"
                                    stroke="black"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </form>
<!-- 
                <div class="modal-footer">
                    <button id="submitedit" type="button" class="btn btn-primary submit-schedule btn btn-sm btn-primary" data-id="">Submit</button>
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                </div> -->
            </div>
        </div>
    </div>
</div>
