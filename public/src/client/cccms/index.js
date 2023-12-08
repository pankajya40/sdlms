'use strict';



/* globals define */

define('forum/cccms/index', ['api',"mobile/DiscussionRoom","https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js",
  'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
  'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js',"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/js/all.min.js","https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"], function (api) {
    var indexPage = {};

    indexPage.init = function () {



      // Variables initialized here
      let UID = app.user.uid;
      let ticketID;
      let uid;
      let filter = $('#filter-peer').data('value');
      let roomId;






      // Creating ticket api int

      $("#create-form").on("submit", function (e) {
        console.log('button clicked');
        e.preventDefault();
        let payload = $(this).serializeObject();
        console.log(payload,"ssss")
        payload.uid = config.uid;
        console.log(payload);
        api.post('/cccms/request', payload)
          .then((data) => {
            notify('Succesfully Created a Request ', 'success')
            ajaxify.refresh()
          }).catch((err) => {
            console.log(err)
          })
      })









      // Get all the users in select2 => raise ticket modal

      $("#users").select2({
        ajax: {
          url: "/api/users",
          dataType: "json",
          data: function (params) {
            var query = {
              query: params.term,
            };
            return query;
          },
          processResults: function (data) {
            let results = {
              results: data.users.map(function (row) {
                // console.log(row);
                return {
                  id: row.uid,
                  text: row.displayname || row.fullname || row.username,
                };
              }),
            };
            return results;
          },
        },
      });









      // filter mechanism => the value of the filter changes and calling cards on click

      // filter value peer
      $('#filteringbtn').html($('#filter-peer').text());
      callingCards();
      $('#filter-peer').on('click', function () {
        if (filter === $('#filter-peer').data('value')) {
          $('#filteringbtn').html($('#filter-peer').text());
          callingCards();
        } else {
          filter = $('#filter-peer').data('value');
          $('#filteringbtn').html($('#filter-peer').text());
          callingCards();
        }
      })

      // filter value mentee
      $('#filter-mentee').on('click', function () {
        if (filter === $('#filter-mentee').data('value')) {
          callingCards();
          $('#filteringbtn').html($('#filter-mentee').text());
        } else {
          filter = $('#filter-mentee').data('value');
          $('#filteringbtn').html($('#filter-mentee').text());
          callingCards();
        }
      })

      // filter value mentor
      $('#filter-mentor').on('click', function () {
        if (filter === $('#filter-mentor').data('value')) {
          callingCards();
          $('#filteringbtn').html($('#filter-mentor').text());
        } else {
          filter = $('#filter-mentor').data('value');
          $('#filteringbtn').html($('#filter-mentor').text());
          callingCards();
        }
      })





      
      // This gets the cards of the value(filter variable)

      function callingCards() {
        // $("#containerTickets").empty();
        // ?mode=${filter}
        let url = `/cccms/tickets?mode=${filter}`;
        api.get(url, {}).then((res) => {
          // console.log(res.data);
          console.log(res);
          res.map((ev) => {
            $(".containTickets").append(
              indexPage.history.components.approved.card(ev)
            );
          });
        });
      }

      indexPage.history = {
        components: {
          approved: {
            card: (ev) => {
              let tid = ev._KEY;
              let finaltid = tid.split(':')
              let success = 'badge-success'
              let  incomplete= 'badge-danger' 
              let pending = 'badge-warning'
      
              return ` 
              <div class=" col">
              <div class="bg-secondary d-flex justify-content-between p-4 sdlms-text-white-20px"
                  style="border-radius:5px 5px 5px 5px;cursor:pointer;margin-top: 20px;" ; id='cards'>
                  <!--         Peer 1 -->
      
                  <div>
                      <div style='display: flex; justify-content: flex-end;width: 206%;margin-top: -8px;'>
                          <span class="badge ${success ? success : pending}"
                              style='padding: 10px 17px 10px 17px;margin-bottom: -17px;'>Success</span>
                      </div>
      
                      <div>
                          <div style='margin-top:-11px'><span><b>MENTOR :</b></span>
                              <span style='margin-left:32px'>${ev.sender.username}</span>
                          </div><br>
                          <div style='margin-top:-11px'><span><b>MENTEE :</b></span>
                              <span style='margin-left:35px'>${ev.receiver.username}</span>
                          </div><br>
                          <div style='margin-top:-11px'><span><b>OBJECTIVE :</b></span>
                              <span style='margin-left:10px'>${ev.receiver.objectives[0]}</span>
                          </div>
                      </div>
                      <div>
                      </div>
                  </div>
              </div>
          </div>`
            },
          },
        },
      };

// carosal for the initial settings

$(document).ready(function() {

  var sync1 = $("#sync1");
  sync1.owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: true,
      autoplay: true, 
      dots: true,
      loop: true,
      responsiveRefreshRate: 200,
      navText: ['<svg width="80%" height="80%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="80%" height="80%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
  }).on('changed.owl.carousel', syncPosition);

  function syncPosition(el) {
      //if you set loop to false, you have to restore this next line
      //var current = el.item.index;

      //if you disable loop you have to comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - (el.item.count / 2) - .5);

      if (current < 0) {
          current = count;
      }
      if (current > count) {
          current = 0;
      }
  }
});

$(document).ready(function() {

  var sync2 = $("#sync2");
  sync2.owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: true,
      autoplay: false, 
      dots: true,
      loop: true,
      responsiveRefreshRate: 200,
      navText: ['<button type="button" class="btn btn-secondary" data-dismiss="modal"><svg width="10" height="20" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;"d="M9.554,1.001l-8.607,8.607l8.607,8.606" /></svg></button>','<button class="btn btn-secondary" id="createTicket" type="button" data-toggle="modal"><svg width="10" height="20" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607" /></svg></button>'],
  }).on('changed.owl.carousel', syncPosition);

  function syncPosition(el) {
      //if you set loop to false, you have to restore this next line
      //var current = el.item.index;

      //if you disable loop you have to comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - (el.item.count / 2) - .5);

      if (current < 0) {
          current = count;
      }
      if (current > count) {
          current = 0;
      }
  }
});


// modal title for differet slides

let title1 = $('#first-slide')
let title2 = $('#second-slide')

let active = $('.active')
let owl = $('.owl-item')
let modal_title = $('#title-modal')
let total = $('#carousel-part')

title1 && owl && active  ? `${modal_title.html('Type Of Collebration')}` : `${modal_title.html('Connection')}`



// if(!active && title1){
//   modal_title.html('Connection') 
// }else{
//   modal_title.html('Type Of The Collabration')
// }


// if ticket is present then carousel will be gone
if($('#containerTickets').length >= 0){
  $('#sync1').css({
    'display' : 'none'
  })
}else{
  $('#sync1').css({
    'display' : 'block'
  })
}

      // This is the ticket(html) and ev is the response






      

      // Tinymce Initialized here

      $('.discript-textarea').on('keyup', function () {
        var characterCount = $(this).val().length;
        var current = $('#current');
        var maximum = $('#maximum');
        var theCount = $('#the-count');

        current.text(characterCount);
      });


      // Tinymce => Outcomes Modal
      $(`#pOutcomes`).tinymce({
        height: 300,
        width: 756,
        menubar: false,
        branding: false,
        paste_data_images: false,
        automatic_uploads: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'charmap',
          'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
          'insertdatetime', 'wordcount'
        ],
        toolbar: 'undo redo fullscreen | blocks | bold italic backcolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat'
      });


      // Tinymce => Reflections Modal
      $(`#pReflections`).tinymce({
        height: 300,
        width: 756,
        menubar: false,
        branding: false,
        paste_data_images: false,
        automatic_uploads: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'charmap',
          'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
          'insertdatetime', 'wordcount'
        ],
        toolbar: 'undo redo fullscreen | blocks | bold italic backcolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat'
      });


      // Tinymce => Case Study Modal
      $(`#pCasestudy`).tinymce({
        height: 300,
        width: 756,
        menubar: false,
        branding: false,
        paste_data_images: false,
        automatic_uploads: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'charmap',
          'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
          'insertdatetime', 'wordcount'
        ],
        toolbar: 'undo redo fullscreen | blocks | bold italic backcolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat'
      });






      // Opens up the Outcomes Modal onclick Outcomes Button

      $('body').on('click', '.outcomesPage', function () {
        $('#consequenceHeader').html('Outcomes');
        uid = $(this).data('id');
        ticketID = $(this).data('ticket-id');

        // logs
        console.log(ticketID);
        console.log(uid, UID);

        // If uid != UID then its only view mode
        if (uid != UID) {
          $('#showConsequences').modal('show');
          let url = `/cccms/consequence?uid=${uid}&type=out&ticketId=${ticketID}`;
          api.get(url, {}).then((res) => {
            // console.log(res.data);
            if (res.consequence == undefined) {
              $('#consequencesContent').html('Nothing to show here...');
            } else {
              console.log(res)
              $('#consequencesContent').html(`${res.consequence}`);
            }
          });
        } else {

          // Editable
          let url = `/cccms/consequence?uid=${uid}&type=out&ticketId=${ticketID}`;
          api.get(url, {}).then((res) => {
            // console.log(res.data);
            if (res.consequence == undefined) {
              $('#outcomesPart').modal('show');
              tinymce.get("pOutcomes").setContent(` `);
            } else {
              console.log(res)
              if (res.status == 'drafted') {
                $('#outcomesPart').modal('show');
                tinymce.get("pOutcomes").setContent(` `);
                tinymce.get("pOutcomes").setContent(res.consequence);

              } else if (res.status == 'published') {
                $('#showConsequences').modal('show');
                $('#consequencesContent').html(`${res.consequence}`);
              }
            }
          });
        }
      })








      // Opens up the Reflections Modal onclick Reflections Button

      $('body').on('click', '.refPage', function () {
        $('#consequenceHeader').html('Reflections');
        uid = $(this).data('id');
        ticketID = $(this).data('ticket-id');

        // logs
        console.log(ticketID);
        console.log(uid, UID);

        // If uid != UID then its only view mode
        if (uid != UID) {
          $('#showConsequences').modal('show');
          let url = `/cccms/consequence?uid=${uid}&type=ref&ticketId=${ticketID}`;
          api.get(url, {}).then((res) => {
            if (res.consequence == undefined) {
              $('#consequencesContent').html('Nothing to show here...');
            } else {
              console.log(res)
              $('#consequencesContent').html(`${res.consequence}`);
            }
          });
        } else {

          // Editable
          let url = `/cccms/consequence?uid=${uid}&type=ref&ticketId=${ticketID}`;
          api.get(url, {}).then((res) => {
            // console.log(res.data);

            if (res.consequence == undefined) {
              $('#refPart').modal('show');
              tinymce.get("pReflections").setContent(` `);
            } else {
              console.log(res)
              if (res.status == 'drafted') {
                $('#refPart').modal('show');
                tinymce.get("pReflections").setContent(` `);
                tinymce.get("pReflections").setContent(res.consequence);
              } else if (res.status == 'published') {
                $('#showConsequences').modal('show');
                $('#consequencesContent').html(`${res.consequence}`);
              }
            }
          });
        }
      })












      // Opens up the Case Study Modal onclick Case Study Button

      $('body').on('click', '.casePage', function () {
        $('#consequenceHeader').html('Case Study');
        uid = $(this).data('id');
        ticketID = $(this).data('ticket-id');

        // logs
        console.log(ticketID);
        console.log(uid, UID);

        // If uid != UID then its only view mode
        if (uid != UID) {
          $('#showConsequences').modal('show');
          let url = `/cccms/consequence?uid=${uid}&type=cas&ticketId=${ticketID}`;
          api.get(url, {}).then((res) => {
            if (res.consequence == undefined) {
              console.log(true);
              $('#consequencesContent').html('Nothing to show here...');
            } else {
              console.log(res)
              $('#consequencesContent').html(`${res.consequence}`);
            }
          });
        } else {
          
          // Editable
          let url = `/cccms/consequence?uid=${uid}&type=cas&ticketId=${ticketID}`;
          api.get(url, {}).then((res) => {
            // console.log(res.data);
            if (res.consequence == undefined) {
              $('#casePart').modal('show');
              tinymce.get("pCasestudy").setContent(` `);
            } else {
              console.log(res)
              if (res.status == 'drafted') {
                $('#casePart').modal('show');
                tinymce.get("pCasestudy").setContent(` `);
                tinymce.get("pCasestudy").setContent(res.consequence);
              } else if (res.status == 'published') {
                $('#showConsequences').modal('show');
                $('#consequencesContent').html(`${res.consequence}`);
              }
            }
          });
        }
      })






      // On Draft it will check if the data is already there or no, if there it'll put api, if not then post => Outcomes

      $('#draft-outcomes').on('click', function () {
        let payload = {};
        payload.consequence = tinymce.get("pOutcomes").getContent();
        payload.uid = app.user.uid;
        payload.type = 'out';
        payload.action = 'save';
        
        console.log(payload);
        let url = `/cccms/consequence?uid=${uid}&type=out&ticketId=${ticketID}`;
        api.get(url, {}).then((res) => {
          if (res.status == 'drafted') {
            payload._id = res._id;
            api.put('/cccms/consequence', payload)
              .then((data) => {
                notify('Drafted Outcomes ', 'success')
                ajaxify.refresh()
              }).catch((err) => {
                console.log(err)
              })
          } else {
            payload.ticketId = ticketID;
            api.post('/cccms/consequence', payload)
              .then((data) => {
                notify('Drafted Outcomes ', 'success')
                ajaxify.refresh()
              }).catch((err) => {
                console.log(err)
              })
          }
        })
      })








      // On Draft it will check if the data is already there or no, if there it'll put api, if not then post => Reflections

      $('#draft-reflections').on('click', function () {
        let payload = {};
        payload.consequence = tinymce.get("pReflections").getContent();
        payload.uid = app.user.uid;
        payload.type = 'ref';
        payload.action = 'save';
        console.log(payload);
        let url = `/cccms/consequence?uid=${uid}&type=ref&ticketId=${ticketID}`;
        api.get(url, {}).then((res) => {
          if (res.status == 'drafted') {
            payload._id = res._id;
            api.put('/cccms/consequence', payload)
              .then((data) => {
                notify('Submitted Outcomes ', 'success')
                ajaxify.refresh()
              }).catch((err) => {
                console.log(err)
              })
          } else {
            payload.ticketId = ticketID;
            api.post('/cccms/consequence', payload)
              .then((data) => {
                notify('Submitted Outcomes ', 'success')
                ajaxify.refresh()
              }).catch((err) => {
                console.log(err)
              })
          }
        })
      })







      // On Draft it will check if the data is already there or no, if there it'll put api, if not then post => Case Study

      $('#draft-case').on('click', function () {
        let payload = {};
        payload.consequence = tinymce.get("pCasestudy").getContent();
        payload.uid = app.user.uid;
        payload.type = 'cas';
        payload.action = 'save';
        payload.ticketId = ticketID;
        console.log(payload);
        let url = `/cccms/consequence?uid=${uid}&type=cas&ticketId=${ticketID}`;
        api.get(url, {}).then((res) => {
          if (res.status == 'drafted') {
            payload._id = res._id;
            api.put('/cccms/consequence', payload)
              .then((data) => {
                notify('Submitted Outcomes ', 'success')
                ajaxify.refresh()
              }).catch((err) => {
                console.log(err)
              })
          } else {
            payload.ticketId = ticketID;
            api.post('/cccms/consequence', payload)
              .then((data) => {
                notify('Submitted Outcomes ', 'success')
                ajaxify.refresh()
              }).catch((err) => {
                console.log(err)
              })
          }
        })
      })








      // On Publish it will check if the data is already there or no, if there it'll put api, if not then post => Outcomes

      $("#outcomesForm").on("submit", function (e) {
        console.log('button clicked');
        e.preventDefault();
        let payload = $(this).serializeObject();
        payload.uid = app.user.uid;
        payload.type = 'out';
        payload.action = 'publish';
        // logs
        console.log(payload);
        let url = `/cccms/consequence?uid=${uid}&type=out&ticketId=${ticketID}`;
        api.get(url, {}).then((res) => {
          if (res.status == 'drafted') {
            payload._id = res._id;
            api.put('/cccms/consequence', payload)
              .then((data) => {
                notify('Submitted Outcomes ', 'success')
                ajaxify.refresh()
              }).catch((err) => {
                console.log(err)
              })
          } else {
            payload.ticketId = ticketID;
            api.post('/cccms/consequence', payload)
              .then((data) => {
                notify('Submitted Outcomes ', 'success')
                ajaxify.refresh()
              }).catch((err) => {
                console.log(err)
              })
          }
        })
      })









      // On Publish it will check if the data is already there or no, if there it'll put api, if not then post => Reflections

      $("#reflectionForm").on("submit", function (e) {
        console.log('button clicked');
        e.preventDefault();
        let payload = $(this).serializeObject();
        payload.uid = app.user.uid;
        payload.type = 'ref';
        payload.action = 'publish';
        // logs
        console.log(payload);
        let url = `/cccms/consequence?uid=${uid}&type=ref&ticketId=${ticketID}`;
        api.get(url, {}).then((res) => {
          if (res.status == 'drafted') {
            payload._id = res._id;
            api.put('/cccms/consequence', payload)
              .then((data) => {
                notify('Submitted Outcomes ', 'success')
                ajaxify.refresh()
              }).catch((err) => {
                console.log(err)
              })
          } else {
            payload.ticketId = ticketID;
            api.post('/cccms/consequence', payload)
              .then((data) => {
                notify('Submitted Outcomes ', 'success')
                ajaxify.refresh()
              }).catch((err) => {
                console.log(err)
              })
          }
        })
      })

      


      $('#dashboardHeader2').on('click',function(){
        $('#dashboardHeader2').css({
          'background-color':'blue'
        })
        $('#pageTitle2').css({
          'color':'white'
        })

        $('#dashboardHeader1').css({
          'background-color':'white'
        })
        $('#pageTitle1').css({
          'color':'black'
        })
        $('#totalCard').css({
          'display' : 'none'
        })
      })

      $('#dashboardHeader1').on('click',function(){
        $('#dashboardHeader1').css({
          'background-color':'blue'
        })
        $('#pageTitle1').css({
          'color':'white'
        })

        $('#dashboardHeader2').css({
          'background-color':'white'
        })
        $('#pageTitle2').css({
          'color':'black'
        })
        $('#totalCard').css({
          'display' : 'block'
        })
      })



      // On Publish it will check if the data is already there or no, if there it'll put api, if not then post => Case Study

      $("#caseForm").on("submit", function (e) {
        console.log('button clicked');
        e.preventDefault();
        let payload = $(this).serializeObject();
        payload.uid = app.user.uid;
        payload.type = 'cas';
        payload.action = 'publish';
        // logs
        console.log(payload);
        let url = `/cccms/consequence?uid=${uid}&type=cas&ticketId=${ticketID}`;
        api.get(url, {}).then((res) => {
          if (res.status == 'drafted') {
            payload._id = res._id;
            api.put('/cccms/consequence', payload)
              .then((data) => {
                notify('Submitted Outcomes ', 'success')
                ajaxify.refresh()
              }).catch((err) => {
                console.log(err)
              })
          } else {
            payload.ticketId = ticketID;
            api.post('/cccms/consequence', payload)
              .then((data) => {
                notify('Submitted Outcomes ', 'success')
                ajaxify.refresh()
              }).catch((err) => {
                console.log(err)
              })
          }
        })
      })
      




      // Trigerring the Discussion room => imported at the top

      $('body').on('click', '#connect',function(){
        roomId = $(this).data('room-id');
        console.log(roomId);
        let discuss = new DiscussionRoom(roomId, "#droonBody");
        $('#droonModal').modal('show');
      })
      
    }

    return indexPage;
  })