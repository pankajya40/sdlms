<style>
  .sdlms-container {
      padding: 0!important;
      width: 100%!important;
  }
  a:hover { text-decoration: none; }
  </style>
  
  <!-- IMPORT partials/sidebar.tpl -->
  <div class="header">
    <p>{content.description}</p>
  </div>
    <div class="row">
      <!-- BEGIN content.items -->
      <a href="{content.items.url}" class="border-bottom border-left border-right product-card cursor-pointer product-card-top-border">
        <div class="product-card-heading">{content.items.title}</div>
        <p>{content.items.description}</p>
        <i class="product-card-icon {content.items.icon}" aria-hidden="true"></i>
      </a>
       <!-- END content.items -->
    </div>
  <!-- IMPORT partials/footer.tpl -->