'use strict';

/* globals define */

define('forum/workshop/creator/admin', ['api'], function (api) {
    var admin = {};


    admin.init = function () {
        // Get All Workshop API Integration
        let url = '/workshop/all/?limit=10&page=0'
        api.get(url, {}).then((res) => {
            res.data.map((ev) => {
                $('.recent-card').append(admin.workshop_card.components.recent.card(ev));
            });
        });
        // Get Completed Workshop API Integration
        let urls = '/workshop/complete/?limit=5&page=0'
        api.get(urls, {}).then((res) => {
            res.data.map((ev) => {
                $('.previous-card').append(admin.workshop_card.components.previous.card(ev));
            });
        });

        $('body').on("click", '#previous-btn', function () {
            console.log("previous clicked")

            $('.recent-card').addClass('change-class');
            $('.previous-card').removeClass('change-class');
        })

        $('body').on("click", '#recent-btn', function () {
            console.log("recent clicked")
            $('.previous-card').addClass('change-class');
            $('.recent-card').removeClass('change-class');
        })

        // post API Integration
        $("#create").on("submit", function (e) {
            console.log('button clicked');
            e.preventDefault();
            let payload = $(this).serializeObject();
            api.post('/workshop/', payload)
                .then((data) => {
                    notify('Succesfully Created a Workshop ', 'success')
                    ajaxify.refresh()
                }).catch((err) => {
                    console.log(err)
                })
        })
        // delete API Integration
        $("body").on("click", '[delete-workshop]', function () {
            console.log("delete is clicked")
            let pid = $(this).data('pid')
            api.del(`/workshop/${pid}`, {})
                .then((res) => {
                    notify('Succesfully Deleted a Workshop ', 'success')
                    ajaxify.refresh()
                })
                .catch(err => { console.log(err) })
        })
        // start API Integration
        $("body").on("click", '[start-workshop]', function () {
            let pid = $(this).data('pid')
            api.put(`/workshop/start/`, { pid: pid })
                .then((res) => {
                    notify('Succesfully Started a Workshop ', 'success')
                    ajaxify.refresh()
                })
                .catch(err => console.log("Could not start", "error"))
        })
        // Complete workshop
        $("body").on("click", '[complete-workshop]', function () {
            console.log("workshop completed ")
            let pid = $(this).data('pid')
            api.put(`/workshop/complete/`, { pid: pid })
                .then((res) => {
                    notify('Succesfully Conducted a Workshop ', 'success')
                    ajaxify.refresh()
                })
                .catch(err => console.log("Could not start", "error"))
        })

        // Search workshop integration
        $('#workshop-card-search-bar').off('keyup').on('keyup', function (e) {
            let attendedSessionList = $("#previous-btn").hasClass('active');
            let title = $('input[type="text"]').val();
            let api = `${title.length > 0 ? `/api/v3/workshop/${attendedSessionList ? 'complete/' : 'all/'}?limit=5&page=0&title=${title}`
                : `/api/v3/workshop/${attendedSessionList ? 'complete/' : 'all/'}?limit=5&page=0`}`
            let target = `${attendedSessionList ? '.previous-card' : '.recent-card'}`
            let type = `${attendedSessionList ? 'previous' : 'recent'}`
            displayWorkshopCard(api, target, type)
        });

        // Display through search workshop
        function displayWorkshopCard(url, target, type) {
            api.get(url, {}).then((res) => {
                $(target).empty()
                res.data.map((ev) => {
                    $(target).append(admin.workshop_card.components[type].card(ev));
                })
            });
        };
    };
    admin.workshop_card = {
        components: {
            recent: {
                card: (ev) => {
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
                            <p>Scheduled at : ${app.dateFormatter(ev.createdAt)}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                                <div class="p-2 ">
                                    <svg  xmlns="http://www.w3.org/2000/svg" data-pid="${ev.pid}" delete-workshop width="16" height="16" fill="currentColor" class="bi bi-trash3-fill mx-2 "  viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                    <svg  xmlns="http://www.w3.org/2000/svg" start-workshop data-pid="${ev.pid}" width="16" height="16" fill="currentColor" class="bi bi-skip-start-circle-fill mx-2" id="start-workshop" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM9.71 5.093 7 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407v-5a.5.5 0 0 0-.79-.407z"/>
                                    </svg>
                                     <svg  xmlns="http://www.w3.org/2000/svg" complete-workshop data-pid="${ev.pid}" width="16" height="16" fill="currentColor" class="bi bi-archive-fill mx-2" viewBox="0 0 16 16">
                                        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p>${ev.status}</p>
                                </div>
                        </div>
                    </div>
                </div>`;
                }
            },
            previous: {
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
                            <p>Scheduled at : ${app.dateFormatter(ev.createdAt)}</p>
                        </div>
                        <div>
                            <p>${ev.status}</p>
                        </div>
                    </div>
                </div>
                `;
                }
            }
        }
    }

    return admin;
});
