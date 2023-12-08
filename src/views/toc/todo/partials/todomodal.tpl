<form id="todo" class="">
  <div class="form-group">
      <label for="input" class="">What do you want to do?</label>
      <div class="input-group">
          <div class="input-group-prepend">
              <span class="input-group-text"><i class="far fa-sticky-note" aria-hidden="true"></i></span>
          </div>
          <textarea class="form-control resize-none" placeholder="Enter your todo, then press Enter" name="title" rows="2" required="" maxlength="30"></textarea>
      </div>
  </div>
  <div class="form-group">
      <label for="description" class="">Description (optional)</label>
      <div class="input-group">
          <div class="input-group-prepend">
              <span class="input-group-text"><i class="far fa-comment" aria-hidden="true"></i></span>
          </div>
          <textarea class="form-control resize-none" placeholder="Press Enter to add description" name="description" rows="2" maxlength="100"></textarea>
      </div>
  </div>
  <div class="form-group">
      <small class="form-text text-muted">Press Enter to submit</small>
  </div>
</form>
