'use strict';

/* globals define */

define('forum/cccms/incomingrequests', ['api'], function (api) {
    var incomingrequests = {};

    incomingrequests.init = function () {
        

        $('#backToCreate').on('click', function(){
            location.href = `/cccms/`
        })
        
        let filter = $('#filter-peer').data('value');
        $('#filteringbtn').html($('#filter-peer').text());
        callingCards();

        $('#filter-peer').on('click', function(){
            if(filter === $('#filter-peer').data('value')){
                $('#filteringbtn').html($('#filter-peer').text());
                callingCards();
            }else{
                filter = $('#filter-peer').data('value');
                $('#filteringbtn').html($('#filter-peer').text());
                callingCards();
            }
        })


        $('#filter-mentor').on('click', function(){
            if(filter === $('#filter-mentor').data('value')){
                $('#filteringbtn').html($('#filter-mentor').text());
                callingCards();

            }else{
                filter = $('#filter-mentor').data('value');
                $('#filteringbtn').html($('#filter-mentor').text());
                
                callingCards();
            }
        })

        
        function callingCards(){
            $("#inSec").empty();
            let url = `/cccms/request?type=pending&mode=${filter}`;
                api.get(url, {}).then((res) => {
                    // console.log(res.data);
                    console.log(res);
                    res.map((ev) => {
                        
                        $(".incomingTickSec").append(
                            incomingrequests.requestCards.components.incoming.card(ev)
                        );
                    });
                });
            
            
        }


        let id;

        let action;

        $('body').on('click', '#getting-Id', function(){
            id = $(this).data("request-id");
            action = "approve"
            console.log(id);
        })
        $('body').on('click', '#rejectingRequest', function(){
            id = $(this).data("request-id");
            action = "decline"
            console.log(id);
        })


        


        $("#create-form").on("submit", function (e) {
            console.log('button clicked');

            e.preventDefault();
            let payload = $(this).serializeObject();
            payload.uid = app.user.uid;
            payload.action = action;
            payload.requestId = id;
            console.log(payload);
            api.post('/cccms/requestAction', payload)
            .then((data) => {
            notify('Succesfully accepted request ', 'success')
            ajaxify.refresh()
            }).catch((err) => {
            console.log(err)
            })
            }) 

        
        
        incomingrequests.requestCards = {
            components: {
                incoming: {
                    card: (ev) => {
                        return `<div class="sdlms-section mb-3">
              <div class="border-0 sdlms-section-body">
                  <div>
                      <span class="font-weight-bold sdlms-text-black-25px">Name &nbsp;</span> <span class="sdlms-text-black-25px">:&nbsp;${ev.sender.username}</span> <br>
                      <span class="font-weight-bold">Objectives &nbsp;</span> :&nbsp;${ev.sender.objectives[0]}<br>
                      <span class="font-weight-bold">Kpi &nbsp;</span> :&nbsp;${ev.sender.kpis[0]}

                  </div>
                  <div class="d-flex justify-content-end">
                      <button type="button" data-toggle="modal" data-target="#acceptTicket-modal" id="getting-Id" data-request-id="${ev._id}" class="sdlms-button button-primary mr-2 button-sm d-flex align-items-center justify-contentt-end">
                          <span class="sdlms-text-white-20px">Accept</span>
                      </button>
                      <button data-request-id="${ev._id}" id="rejectingRequest" type="button" class="sdlms-button button-primary button-sm d-flex align-items-center justify-contentt-end">
                          <span class="sdlms-text-white-20px">Reject</span>
                      </button>
                  </div>

              </div>
          </div>
            `},
                },
            },
        };

        
        



        

    }

    return incomingrequests;
})