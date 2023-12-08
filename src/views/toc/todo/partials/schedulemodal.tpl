<div class="fade modal p-4" id="scheduleModal" tabindex="-1" role="dialog" aria-labelledby="schedulemodal" aria-hidden="true" style="display: none;">
  <div class="modal-dialog-centered modal-lg mx-auto" role="document">
      <div class="border-0 modal-content" style="height: auto;">
          <div class="modal-body p-4">
              <form id="scheduledata" class="">
                  <div class="form-group" id="assignee-group">
                      <label for="assignee" class="">Schedule</label>
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
              </form>

              <div class="modal-footer">
                  <button id="submitschedule" type="button" class="btn btn-primary submit-schedule btn btn-sm btn-primary" data-id="">Submit</button>
                  <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
              </div>
          </div>
      </div>
  </div>
</div>
