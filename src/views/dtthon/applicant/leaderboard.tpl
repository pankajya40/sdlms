<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<style>
  *{
    margin: 0;
    padding: 0;
  }

  .how-btn > i {
    margin: 0 10% 0 auto;
    border: none;
    cursor: pointer;
  }

  .blur {
    transition: .7s;
    filter: blur(10px);
  }
  .tabble {
    margin-top: 10%;
    display: flex;
    justify-content: center;
  }

  th {
    padding-bottom: 1rem;
  }

  th > span {
    background: blue;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 0.6rem;
    text-transform: capitalize;
    margin-right: auto;
  }
  tr {
    text-align: center;
    padding: 1rem;
  }
  table th, table td {
    text-align: center;
    padding: 1rem 0
  }  

  .sdlms-container {
    padding: 0!important;
    width: 100%!important;
  }

  .closePage {
    position: absolute;
    right: 27%;
    top: 10px;
    border: 2px solid;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .closePage:hover {
    background-color: rgba(0, 0, 0, 0.405);
    cursor: pointer;
  }

  .howPage {
    visibility: hidden;
    position: absolute;
    top: 30%;
    z-index: 1;
    transform: scale(0);
    transition: 0.7s;

  }

  .carousel {
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .carousel-inner {
    border-radius: 1.5rem;
    height: 240px;
  }

  .carousel-item {
    max-width: 85%;
  }

  .carousel-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .carousel-img {
    max-width: 50%;
    max-height: 250px;
    object-fit: cover;
  }

  .carousel-caption {
    width: 50%;
    position: static;
    margin: auto;
  }

  .show {
    visibility: visible;
    transform: scale(1);
  }

  .carousel-control-next {
    right: -2%;
    z-index: 0;
  }

  .carousel-control-prev {
    left: -2%;
    z-index: 0;
  }
</style>
<div class="header p-lg-3" style="height:50%; background:#0029ff">
  <h1 class="text-white fs-1 text-center">Leader Board</h1>
  <div class="ms-auto d-flex align-content-center justify-content-center how-btn">
    <!-- <button class="fw-bolder rounded px-2 py-2 bg-white">How it Works</button> -->
    <i class="fa-sharp fa-solid fa-circle-question fa-2xl" style="color: #ffffff;"></i>
  </div>
  <div class=" d-flex align-items-center justify-content-center" style="gap: 5%;">
    <div class="position-relative " >
      
      <div class=" d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex justify-content-center align-items-center" style="width: 3rem; height: 3rem;">
          <i class="fa-solid fa-crown fa-2xl" style="color: #C0C0C0;"></i>
        </div>
      
        <div class="sm-img img-fluid rounded-circle " style="width: 10rem; object-fit: cover;">
          <img src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png" alt="user image" class="h-100 w-100 rounded-circle"/>
        </div>

        <div class=" d-flex flex-column p-1 bg-white rounded align-items-center justify-content-center position-absolute shadow-lg" style="margin-top: -2rem; width: 150px; top: 100%;">
          <p>Shivam</p>
          <div class="percent d-flex g-1">
            <div>

              <i class="fa-solid fa-bolt" style="color: #FFD700;"></i>
            </div>
            <h4>50%</h4>
          </div>
        </div>
      </div>  
    </div>
    <div class="position-relative " >       
      <div class=" d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex justify-content-center align-items-center" style="width: 3rem; height: 3rem;">
          <i class="fa-solid fa-crown fa-2xl" style="color:  #FFD700;"></i>
        </div>        
        <div class="sm-img img-fluid rounded-circle " style="width: 12rem; height: 12rem; object-fit: cover;">
          <img src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png" alt="user image" class="h-100 w-100 rounded-circle"/>
        </div>
        <div class=" d-flex flex-column p-1 bg-white rounded align-items-center justify-content-center position-absolute shadow-lg" style="margin-top: -2rem; width: 150px; top: 100%;">
          <p>Pankaj</p>
          <div class="percent d-flex g-1">
            <div>

              <i class="fa-solid fa-bolt" style="color: #FFD700;"></i>
            </div>
            <h4>50%</h4>
          </div>
        </div>
      </div>  
    </div>
    <div class="position-relative " >
      
      <div class=" d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex justify-content-center align-items-center" style="width: 3rem; height: 3rem;">
          <i class="fa-solid fa-crown fa-2xl" style="color: 	#CD7F32;"></i>
        </div> 
        <div class="sm-img img-fluid rounded-circle " style="width: 10rem; object-fit: cover;">
          <img src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png" alt="user image" class="h-100 w-100 rounded-circle"/>
        </div>
        <div class=" d-flex flex-column p-1 bg-white rounded align-items-center justify-content-center position-absolute shadow-lg" style="margin-top: -2rem; width: 150px; top: 100%;">
          <p>Raza</p>
          <div class="percent d-flex g-1">
            <div>

              <i class="fa-solid fa-bolt" style="color: #FFD700;"></i>
            </div>
            <h4>50%</h4>
          </div>
        </div>
      </div>  
    </div>
    
  
  </div>
</div>

<section class="tabble">
  <table class="w-75 m-auto overflow-auto">
      <thead>
        <tr>
          <th> <span>Rank</span></th>
          <th> <span>Change</span></th>
          <th> <span>name</span></th>
          <th> <span>score</span></th>
          <th> <span>update</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><i class="fa-solid fa-angles-up" style="color: #349a0e;"></i></td>
          <td>Pankaj</td>
          <td>30</td>
          <td>30</td>
        </tr>
        <tr class="active">
          <td>2</td>
          <td><i class="fa-solid fa-angles-down" style="color: #9a0e0e;"></i></td>
          <td>Shivam</td>
          <td>25</td>
          <td>25</td>
        </tr>
        <tr>
          <td>3</td>
          <td><i class="fa-solid fa-angles-up" style="color: #349a0e;"></i></td>
          <td>Raza</td>
          <td>20</td>
          <td>20</td>
        </tr>
        
      </tbody>
  </table>
</section>

<div class="w-100 d-flex justify-content-center howPage" id="showPopup">
<div class="closePage" style="z-index: 1;"><i class="fa-solid fa-xmark"></i></div>

<div id="carouselPage" class="carousel rounded carousel-dark slide w-50 shadow-lg" >
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselPage" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselPage" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselPage" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselPage" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="2000">
      <div class="carousel-content">
        <img src="https://media.istockphoto.com/id/170091505/photo/blue-question-mark.jpg?s=612x612&w=0&k=20&c=LPPlKrRZBRmHpoJWwYFo0CRB8vtZjGHLi2yuUCv6t8M=" class="carousel-img" alt="...">
        <div class="carousel-caption text-dark">
          <h4>HOW IT WORKS</h4>
          <p>+10 points for every question solved during the lab session.</p>
        </div>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <div class="carousel-content">
        <img src="https://img.freepik.com/free-vector/hand-drawn-people-asking-questions-illustration_23-2148906555.jpg?w=2000" class="carousel-img"  alt="...">
        <div class="carousel-caption text-dark">
          <h4>HOW IT WORKS</h4>
          <p>+5 Points for every in-class/post-class question solved before the end time</p>
        </div>
      </div>
    </div>
    <div class="carousel-item">
      <div class="carousel-content">
        <img src="https://t3.ftcdn.net/jpg/00/38/73/18/360_F_38731826_glk6sKJ8wlHD5IpNWFCSU8JiEfyyGx5m.jpg" class="carousel-img"  alt="...">
        <div class="carousel-caption text-dark">
          <h4>HOW IT WORKS</h4>
          <p>+1 Point for questions solved after the end time</p>
        </div>
      </div>
    </div>
    <div class="carousel-item">
      <div class="carousel-content">
        <img src="https://t3.ftcdn.net/jpg/00/54/86/76/360_F_54867646_mfY2T5DDbxHBkYgKVgj08Kk0v8qsxd5a.jpg" class="carousel-img"  alt="...">
        <div class="carousel-caption text-dark">
          <h4>HOW IT WORKS</h4>
          <p>+15 Point for every task you solved</p>
        </div>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselPage" data-bs-slide="prev">
    <span class="carousel-control-prev-icon bg-black" aria-hidden="true"></span>
    <span class="visually-hidden"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselPage" data-bs-slide="next">
    <span class="carousel-control-next-icon bg-black" aria-hidden="true"></span>
    <span class="visually-hidden"></span>
  </button>
</div>

<div id="show-data">
</div>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>