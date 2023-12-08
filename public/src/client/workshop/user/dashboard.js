'use strict';

/* globals define */

define('forum/workshop/user/dashboard', ['api'], function (api) {
    var dashboard = {};

    dashboard.init = function () {
        // Get All Upcoming Workshop API Integration
        let url = '/workshop/publish/?limit=5&page=0'
        api.get(url, {}).then((res) => {
            res.data.map((ev) => {
                $('.upcoming-card').append(dashboard.workshop_card.components.upcoming.card(ev));
            })

        });
        // Get Attended Workshop API Integration
        let urli = '/workshop/user/?limit=5&page=0'
        api.get(urli, {}).then((res) => {
            res.data.map((ev) => {
                $('.attended-card').append(dashboard.workshop_card.components.attended.card(ev))
            });
        });


        $('body').on("click", '#attended-btn', function () {
            console.log("attended clicked")
            $('.upcoming-card').addClass('change-class');
            $('.attended-card').removeClass('change-class');
        })
        $('body').on("click", '#upcoming-btn', function () {
            console.log("u clicked")

            $('.attended-card').addClass('change-class');
            $('.upcoming-card').removeClass('change-class');
        })
        // Register workshop
        $("body").on("click", '[register-workshop]', function () {
            console.log("workshop registered ")
            let pid = $(this).data('pid')
            // $(`#button-${pid}`).hide();
            let registered = "true";
            let payload = {
                pid,
                registered,
            }
            api.post('/workshop/user', payload)
                .then((data) => {
                    console.log(data)
                    notify('Succesfully Registered the Workshop', 'success')
                }).catch((err) => {
                    notify('Workshop Already Registered!!', 'warn')
                    console.log(err)
                })
        })
        // Search workshop integration
        $('#workshop-card-search-bar').off('keyup').on('keyup', function (e) {
            let attendedSessionList = $("#attended-btn").hasClass('active');
            let title = $('input[type="text"]').val();
            let api = `${title.length > 0 ? `/api/v3/workshop/${attendedSessionList ? 'user/' : 'publish/'}?limit=5&page=0&title=${title}` : `/api/v3/workshop/${attendedSessionList ? 'user/' : 'publish/'}?limit=5&page=0`}`
            let target = `${attendedSessionList ? '.attended-card' : '.upcoming-card'}`
            let type = `${attendedSessionList ? 'attended' : 'upcoming'}`
            displayWorkshopCard(api, target, type)
        });

        // Display through search workshop
        function displayWorkshopCard(url, target, type) {
            api.get(url, {}).then((res) => {
                $(target).empty()
                res.data.map((ev) => {
                    $(target).append(dashboard.workshop_card.components[type].card(ev));
                })
            });
        };


    };
    dashboard.workshop_card = {
        components: {
            upcoming: {
                card: (ev) => {
                    let { registered } = ev;
                    return `
                        <div class="score-card" pid=${ev.pid}>
                            <div class="score-card-tile-outer">
                                <div class="score-card-tile-container">
                                    <div class="score-card-tile score-card-tile-visible p-0">
                                        <img class="score-card-image"
                                            src="https://media.giphy.com/media/ITRemFlr5tS39AzQUL/giphy.gif">
                                    </div>
                                    <div class="score-card-tile score-card-tile-hidden hidden-detail">
                                        <p>${ev.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="score-card-copy">
                                <b>${ev.title}</b>
                                <div class="light-text pt-2" style="font-size: var(--sdlms-font-size-16);">
                                    <p>Scheduled at :${app.dateFormatter(ev.createdAt)}</p>
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="p-2">
                                        <button ${!registered ? '' : 'disabled'} register-workshop data-pid="${ev.pid}" class="button sdlms-button button-lg button-primary" >${registered ? 'Registered' : 'Register'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                            `;
                }
            },
            attended: {
                card: (ev) => {
                    return `
                    <div class="score-card">
                        <div class="score-card-tile-outer">
                            <div class="score-card-tile-container">
                                <div class="score-card-tile score-card-tile-visible p-0">
                                    <img class="score-card-image"
                                        src="https://media.giphy.com/media/ITRemFlr5tS39AzQUL/giphy.gif">
                                </div>
                                <div class="score-card-tile score-card-tile-hidden hidden-detail">
                                    <p>${ev.description}</p>
                                </div>
                            </div>
                        </div>
                        <div class="score-card-copy">
                            <b>${ev.title}</b>
                            <div class="light-text pt-2" style="font-size: var(--sdlms-font-size-16);">
                                <p>Registered: ${app.dateFormatter(ev.createdAt)}</p>
                            </div>
                            <div class="p-2 d-flex" >
                                <button class="button sdlms-button button-lg button-primary">Download</button>
                            </div>
                        </div>
                    </div>
                        `;
                }
            }
        }
    }
    //
    return dashboard;
});




// More Unicorns -> More conversations -> More collaborations -> Wealth creation



