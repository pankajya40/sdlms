<style>
  .sdlms-container {
      padding: 0!important;
      width: 100%!important;
  }
  body{
	font : 15px Inter,sans-serif;
    line-height: 1.5rem;
  }
  </style>

  <!-- IMPORT partials/sidebar.tpl -->
  <section>
    <div class="container">
      <div class="m-0">
        <div class="d-flex justify-content-center p-2">
          <iframe title="YouTube video player" src="{video}" width="617" height="347" frameborder="0" allowfullscreen="" style="width: 700px; height: 347px;"></iframe>
        </div>
        <div class="d-flex justify-content-center pt-5">
          <div style="width: 700px;">{content}</div>
        </div>
        <div class="d-flex justify-content-center pt-5">
          <iframe src="{assignment}" width="1000" height="1000" frameborder="0" marginwidth="0" marginheight="0" style="width: 700px; height: 1630px;">Loading…</iframe>
        </div>
        </div>
      </div>
    </div>
  </section>
  <!-- IMPORT partials/footer.tpl -->

