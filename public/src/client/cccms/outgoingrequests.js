'use strict';

/* globals define */

define('forum/cccms/outgoingrequests', ['api'], function (api) {
    var outgoingrequests = {};

    outgoingrequests.init = function () {



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


        $('#filter-mentee').on('click', function(){
            if(filter === $('#filter-mentee').data('value')){
                $('#filteringbtn').html($('#filter-mentee').text());
                callingCards();

            }else{
                filter = $('#filter-mentee').data('value');
                $('#filteringbtn').html($('#filter-mentee').text());
                callingCards();
            }
        })

        


        function callingCards(){
            $("#outSec").empty();
            let url = `/cccms/request?type=sent&mode=${filter}`;
                api.get(url, {}).then((res) => {
                    // console.log(res.data);
                    console.log(res);
                    res.map((ev) => {
                        
                        $(".outgoingTickSec").append(
                            outgoingrequests.requestCards.components.outgoing.card(ev)
                        );
                    });
                });

        }


        outgoingrequests.requestCards = {
            components: {
                outgoing: {
                    card: (ev) => {
                        return `<div class="sdlms-section mb-3">
                        <div class="border-0 sdlms-section-body">
                            <div>
                                <span class="font-weight-bold sdlms-text-black-25px">Name &nbsp;</span> <span class="sdlms-text-black-25px">:&nbsp;${ev.receiver.username}</span> <br>
                                <span class="font-weight-bold">Objectives &nbsp;</span> :&nbsp;${ev.sender.objectives[0]} <br>
                                <span class="font-weight-bold">Kpi &nbsp;</span> :&nbsp;${ev.sender.kpis[0]}

                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="sdlms-button button-primary  button-sm d-flex align-items-center justify-contentt-end">
                                    <span id="cancelReq" data-request-id="${ev._id}" class="sdlms-text-white-20px">Cancel request</span>
                                </button>
                                
                            </div>

                        </div>
                    </div>`},
                },
            },
        };

        

        $('body').on('click', '#cancelReq', function(){
            let id = $(this).data('request-id');
            console.log(id);
            let payload = {};
            payload.uid = app.user.uid;
            payload.action = 'cancel';
            payload.requestId = id;
            console.log(payload);
            api.post('/cccms/requestAction', payload)
            .then((data) => {
            notify('request unsent', 'success')
            ajaxify.refresh()
            }).catch((err) => {
            console.log(err)
            })
        })

        

        


        
    }

    return outgoingrequests;
})