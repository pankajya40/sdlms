'use strict';

/* globals define */

define('forum/sdlms/persona/profile', ["api", "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"], function (api) {

  var profile = {};

  profile.init = function () {

    let { discussionRooms, counters, recentThreadbuilders, batches } = ajaxify.data;

    $(document).ready(function () {
      $(".sdlms-container").css({ "margin": "0", "width": "100%" });
      $("#About-me-section").css({ "width": "100%" })
      $("#About-me-section").removeClass("display-hide")
      $("#Personas").addClass("heading-highlight");
      $("#Personas").removeClass(" border-bottom");
      $("#Values").removeClass("heading-highlight border-bottom");
      $("#Impacts").removeClass("heading-highlight border-bottom");
      $("#Competencies").removeClass("heading-highlight border-bottom");

      $("#competencies").addClass("display-hide");
      $("#valuesP").addClass("display-hide");
      $("#impacts").addClass("display-hide");
      $("#personas").removeClass("display-hide");
    })

    $(".drop-down1").on("click", function () {
      $("#collapseExample12").toggleClass("show");
    })

    $(".drop-down2").on("click", function () {
      $("#collapseExample34").toggleClass("show");
    })

    $(".drop-down34").on("click", function () {
      $("#collapseExample35").toggleClass("show");
    })

    $(".drop-down45").on("click", function () {
      $("#collapseExample36").toggleClass("show");
    })

    $(".drop-down3").on("click", function () {
      $("#collapseExample56").toggleClass("show");
    })

    $(".drop-down4").on("click", function () {
      $("#collapseExample78").toggleClass("show");
    })

    $("#Personas").on("click", function () {
      $("#Personas").addClass("heading-highlight");
      $("#Personas").removeClass(" border-bottom");
      $("#Values").removeClass("heading-highlight border-bottom");
      $("#Impacts").removeClass("heading-highlight border-bottom");
      $("#Competencies").removeClass("heading-highlight border-bottom");

      $("#competencies").addClass("display-hide");
      $("#valuesP").addClass("display-hide");
      $("#impacts").addClass("display-hide");
      $("#personas").removeClass("display-hide");
    });

    $("#Competencies").on("click", function () {
      $("#Competencies").addClass("heading-highlight");
      $("#Competencies").removeClass(" border-bottom");
      $("#Values").removeClass("heading-highlight border-bottom");
      $("#Impacts").removeClass("heading-highlight border-bottom");
      $("#Personas").removeClass("heading-highlight border-bottom");

      $("#competencies").removeClass("display-hide");
      $("#valuesP").addClass("display-hide");
      $("#impacts").addClass("display-hide");
      $("#personas").addClass("display-hide");
    });

    $("#Values").on("click", function () {
      $("#Values").addClass("heading-highlight");
      $("#Values").removeClass(" border-bottom");
      $("#Competencies").removeClass("heading-highlight border-bottom");
      $("#Impacts").removeClass("heading-highlight border-bottom");
      $("#Personas").removeClass("heading-highlight border-bottom");

      $("#competencies").addClass("display-hide");
      $("#valuesP").removeClass("display-hide");
      $("#impacts").addClass("display-hide");
      $("#personas").addClass("display-hide");
    });

    console.log("Impacts");
    $("#Impacts").on("click", function () {
      $("#Impacts").addClass("heading-highlight");
      $("#Impacts").removeClass(" border-bottom");
      $("#Values").removeClass("heading-highlight border-bottom");
      $("#Competencies").removeClass("heading-highlight border-bottom");
      $("#Personas").removeClass("heading-highlight border-bottom");

      $("#competencies").addClass("display-hide");
      $("#valuesP").addClass("display-hide");
      $("#impacts").removeClass("display-hide");
      $("#personas").addClass("display-hide");
    });

    console.log("Line 94");

    $.each(discussionRooms, function (index, elem) {
      if (elem) {
        $("#discussion-room").append(`
      <div class=" border shadow m-2 rounded-lg p-4 w-50">
      <div class="d-flex justify-content-between">
        <div style="margin-right: 5rem;">
          <img class="communities-card-img" src="${elem.image}" alt="image">
        </div>
        <div>
          <div class="sdlms-text-white-14px text-dark mt-2 pl-2 float-right">Completed ${elem.updatedAt} 
          </div><br>
          <p class="sdlms-sub-text-primary-20px font-weight-bold mt-2 float-right align-text-right">
            ${elem.name}</p>
        </div>
      </div>
      <div class="sdlms-text-tertiary-18px font-weight-bold">
        <p>${elem.roomName}</p>
      </div>
      <ul style="list-style-type:square">
          ${elem.description}
      </ul>
      </div>
      `)
      }
    });
    console.log("line 123");

    $.each(recentThreadbuilders, function (index, item) {
      if (item) {
        $(".recentAssets").append(`
          <div>
          <div class="m-1">
          <div class="d-flex justify-content-between">
            <div class="ml-2">
              <p class="sdlms-text-black-18px">${item.threads[0].title}</p>
            </div>
              <div class="m-1">
                <button class="sdlms-button button-primary leaderboard-btn">Go to EB</button>
              </div>
          </div>
            <div>
              <p class="sdlms-text-white-14px text-dark pl-2">Eaglebuilder</p>
              <p class="sdlms-text-white-14px text-dark pl-2">Thread Count:124</p>
              <p class="sdlms-text-white-14px text-dark pl-2">Character Count:1300</p>
              <p class="sdlms-text-white-14px text-dark pl-2">Date: 13th August 2022</p>
            </div>
            <hr class="m-0 mx-2">
            </div>
          </div>
          `)
      }
    })

    $("#profile-right-section").on("click", "#membership-section", function () {
      console.log("Helloooo");
      $("#About-me-section").addClass("display-hide");
      $("#Membership-section").removeClass("display-hide");
      $("#Feed-section").addClass("display-hide");
      $("#Asset-section").addClass("display-hide");
      $("#Leaderboard-section").addClass("display-hide");

      $("#membership-section").addClass("profile-section-btn-highlight");
      $("#about-me-section").removeClass("profile-section-btn-highlight");
    })

    $("#about-me-section").on("click", function () {
      $("#About-me-section").removeClass("display-hide");
      $("#Membership-section").addClass("display-hide");
      $("#Feed-section").addClass("display-hide");
      $("#Asset-section").addClass("display-hide");
      $("#Leaderboard-section").addClass("display-hide");

      $("#about-me-section").addClass("profile-section-btn-highlight");
      $("#membership-section").removeClass("profile-section-btn-highlight");
    })

    $("#feed-section").on("click", function () {
      $("#About-me-section").addClass("display-hide");
      $("#Membership-section").addClass("display-hide");
      $("#Feed-section").removeClass("display-hide");
      $("#Asset-section").addClass("display-hide");
      $("#Leaderboard-section").addClass("display-hide");

      $("#membership-section").addClass("profile-section-btn-highlight");
      $("#about-me-section").removeClass("profile-section-btn-highlight");
    })

    $("#assets-section").on("click", function () {
      $("#About-me-section").addClass("display-hide");
      $("#Membership-section").addClass("display-hide");
      $("#Feed-section").addClass("display-hide");
      $("#Asset-section").removeClass("display-hide");
      $("#Leaderboard-section").addClass("display-hide");

      $("#membership-section").addClass("profile-section-btn-highlight");
      $("#about-me-section").removeClass("profile-section-btn-highlight");
    })

    $("#leaderboard-section").on("click", function () {
      $("#About-me-section").addClass("display-hide");
      $("#Membership-section").addClass("display-hide");
      $("#Feed-section").addClass("display-hide");
      $("#Asset-section").addClass("display-hide");
      $("#Leaderboard-section").removeClass("display-hide");


      $("#membership-section").addClass("profile-section-btn-highlight");
      $("#about-me-section").removeClass("profile-section-btn-highlight");
      $(".countCommited").val(counters.reflectionsCommitted);
      $(".countCompleted").val(counters.reflectionsCompleted);
    })

    $.each(batches, function(index, item){
      $("#batches").append(`                      
      <div class=" border shadow m-2 rounded-lg p-2 w-50">
      <div class="d-flex justify-content-between">
        <p class="sdlms-sub-text-primary-20px font-weight-bold">${item.name}</p>
        <div class="sdlms-text-white-14px text-dark mt-1 pl-2">${item.status}</div>
      </div>
      <div class="sdlms-text-tertiary-18px font-weight-bold">
        <p>Learning reflectionds</p>
      </div>
      <ul style="list-style-type:square">
        <li>${item.description}</li>
      </ul>
      <!-- <div class="d-flex">
          <div class="p-2 sdlms-text-white-14px text-dark text-right">
            <p class="m-0 font-weight-bold">Palash</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
          </div>
          <div>
            <img class="w-75" src="Component 36.png" alt="">
          </div>
        </div>
        <hr class="m-0 mx-2">
        <div class="sdlms-text-white-14px text-dark mt-1 pl-2">
          <p>12 February 2022</p>
        </div> -->
    </div>`)
    })

    api.post("/app/getfeeds").then( res=>{
      console.log(res);
    })


    // plots
    var xValuesTb = ["TB", "EB"];
    var yValuesTb = [55, 49, 44, 24, 15];
    var barColors = ["#0029FF", "black"];

    let chart1 = document.getElementById("myChart");
    let chart2 = document.getElementById("myChart1");
    let chart3 = document.getElementById("myChart2");

    new Chart(chart1.getContext('2d'), {
      type: "bar",
      data: {
        labels: xValuesTb,
        datasets: [{
          backgroundColor: barColors,
          data: [counters.threadBuilder, counters.eagleBuilder]
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: ""
        },
        scales: {
          yAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Builders Count'
            }
          }],
          xAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Builders'
            }
          }]
        }
      }
    });


    // Workshop and Events Plot
    var data = {
      labels: ["Events"],
      datasets: [{
        label: "Attended",
        backgroundColor: "#0029FF",
        data: [3, 7]
      }, {
        label: "Created",
        backgroundColor: "black",
        data: [7, 5, 6]
      }]
    };

    new Chart(chart2.getContext('2d'), {
      type: 'bar',
      data: data,
      options: {
        barValueSpacing: 20,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              display: false
            }, display: true,
            scaleLabel: {
              display: true,
              labelString: 'Count'
            }
          }]
        }
      }
    });


    // Assets plot
    var xValues = ["articles", "eagleBuilder", "events", "posts", "threadBuilder"];
    var yValues = [counters.articles, counters.eagleBuilder, counters.events, counters.posts, counters.threadBuilder];
    var barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
      "#1e7145"
    ];

    new Chart(chart3.getContext('2d'), {
      type: "pie",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        title: {
          display: true,
          text: ""
        }
      }
    });

    $("#Filter").on("click", function () {
      $("#Sidebar").removeClass("sidebar");
      $("#Sidebar").addClass("sidebar-open");
    })

    // api.get("/profile/memberships/discussionRooms", {}).then(res => {

    //   for(let i=0; i<res.length; i++)
    //   {
    //   const picture = res[i].picture;
    //   const timestamp = res[i].timestamp;
    //   const date = new Date(timestamp);
    //   const day = date.getDate();
    //   const month = date.toLocaleString('default', { month: 'long' });
    //   const year = date.getFullYear();
    //   console.log(day+" "+month+" "+year);
    //   const name = res[i].name;
    //   const description = res[i].description;

    //     $("#discussion-room").append(`
    //   <div class=" border shadow m-2 rounded-lg p-4 w-50">
    //   <div class="d-flex justify-content-between">
    //     <div style="margin-right: 5rem;">
    //       <img class="communities-card-img" src="${picture}" alt="image">
    //     </div>
    //     <div>
    //       <div class="sdlms-text-white-14px text-dark mt-2 pl-2 float-right">Completed ${day} ${month} ${year} 
    //       </div><br>
    //       <p class="sdlms-sub-text-primary-20px font-weight-bold mt-2 float-right align-text-right">
    //         ${name}</p>
    //     </div>
    //   </div>
    //   <div class="sdlms-text-tertiary-18px font-weight-bold">
    //     <p>Learning reflectionds</p>
    //   </div>
    //   <ul style="list-style-type:square">
    //       ${description}
    //   </ul>
    //   `)
    //   }

    //   })


  }

  return profile;
});