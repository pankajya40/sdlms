<div class="container pt-5">
  <h1 class="heading font-30 font-bold primary-text margin-bottom-5">Create Notifications</h1>
    <div class="container-left display-flex column-flex w-50 margin-right-5">

      <form class="form-group display-flex margin-bottom-5">
        <label class="primary-text primary-text font-medium margin-right-3 margin-bottom-0" for="type-select">Select asset type for the notification</label>
        <select name="type-select" id="type-select" class="w-50">
          <option value="" selected disabled>select</option>
          <option value="article">article</option>
          <option value="post">post</option>
          <option value="event">event</option>
          <option value="discussion">discussion</option>
        </select>
      </form>

      <form class="form-group display-flex margin-bottom-5 ai-center">
        <label class="primary-text primary-text font-medium margin-right-3 margin-bottom-0" for="asset-search">Search asset by name or content</label>
        <div class="w-50">
          <input type="text" id="asset-search" class="form-control border-0 bg-layer ps-1 primary-text">
        </div>
      </form>

      <table id="table" class="table table-striped display-none">
        <thead class="secondary-text"></thead>
        <tbody id="table-body" class="tertiary-bg"></tbody>
      </table>

      <button type="button" class="btn btn-info display-none" id="load-btn">Load more</button>

    </div>

    <div class="container-right column-flex w-50 display-none" id="container-right">
      <div id="user-info" class="user-info display-flex  bg-layer w-100 border-0 p-3 user-info-border margin-bottom-3">
      </div>
      <div class="notification-inputs">
        <form action="" class="notification-input-form form-group margin-bottom-0">
          <input type="text" name="title-input" placeholder="Enter notification title here" id="title-input" class="form-control margin-bottom-3">
          <textarea name="content-input" id="content-input" cols="30" rows="5" class="form-control margin-bottom-4"
            placeholder="Enter notification tagline here"></textarea>
          <div class="notifications-button display-flex jc-between">
            <button type="button" class="btn btn-warning margin-right-3" id="cancel-btn">Cancel</button>
            <button type="button" class="btn btn-info" id="submit-btn">Create Notifcation</button>
          </div>
        </form>
      </div>
    </div>
    
</div>