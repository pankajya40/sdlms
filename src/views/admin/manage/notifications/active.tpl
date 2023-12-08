<!-- delete modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel"
  aria-display-none="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <p class="font-20 font-semi-bold margin-bottom-3">Are you Sure you want to remove <span id="notification-title"></span></p>
        <div class="display-flex jc-between">
          <button type="button" class="btn margin-right-3 btn-warning"
            data-dismiss="modal" id="cancel-delete">Cancel</button>
          <button type="button" class="btn btn-danger margin-right-3"
            id="confirm-delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="container pt-5">
  <h1 class="heading font-30 font-bold primary-text margin-bottom-5">Active Notifications</h1>

  <table id="table-2" class="table table table-striped">

    <thead class="secondary-text">
      <tr>
        <th scope="col">
          <input type="checkbox" name="" id="all-check">
        </th>
        <th scope="col">S.no</th>
        <th scope="col">Title</th>
        <th scope="col">Type</th>
        <th scope="col">Content</th>
        <th scope="col">Metric</th>
        <th scope="col">Value</th>
        <th scope="col">Metric</th>
        <th scope="col">Value</th>
      </tr>
    </thead>

    <tbody class="tertiary-bg" id="table-body"></tbody>

  </table>

  <div class="bts-container display-flex jc-between align-items-center w-100">
      <button class="btn btn-danger margin-right-3" id="delete-btn">Delete</button>
      <button class="btn btn-info margin-right-3" id="add-redirect">Create notification</button>
  </div>
</div>