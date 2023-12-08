<div class="profile">
  <header class="profile-header">
      <nav>
          <div class="header-back-icon p-0">
              <div class="backBtn"><i class="fa fa-arrow-left" aria-hidden="true" style="color: white; font-size: smaller;"></i></div>
              <!-- IF (type == "thread") -->
              <div class="align-items-center d-flex profile-nav-text">Thread by {thread.author.displayname}</div>
              <!-- ENDIF -->
          </div>
      </nav>
      <div class="profile-header-content">
          <!-- IF (type != "thread") -->
          <img class="profile-image" src="https://i.pinimg.com/originals/17/5c/13/175c1355af4adc478512f2ed7d3d677f.png" />
          <!-- ENDIF -->
          <div class="profile-header-text text-ellipse-4">{thread.content}</div>
      </div>
  </header>
  <main class="main">
    <div class="profile-reflection"> 
      <div class="profile-reaction"></div>
        <div class="profile-reflection-section">
            <div class="profile-reflection-header">
                <div>Recent Reflections</div>
            </div>
            <div class="reflections"></div>
            <div class="d-flex justify-content-center pt-4" id="reflection-pagination"></div>
        </div>
    </div>
  </main>
<div>