'use strict';

/* globals define */

/**
 * @author Nikhil
 * @date 15/12/2022
 * @description Dashboard for users and creator to solve and create quiz.
 * @returns Rigorbuilder Dashboard
 */

define('forum/rigorbuilder/dashboard', ['api', 'sdlms/table'], function (api) {
    var dashboard = {};

    dashboard.init = function () {
        const BASE_URL = "/api/v3/rigor"
        $('[quiz-problems]').addClass('text-primary')
        $('[quiz-solutions]').removeClass('text-primary')
        $('#thead').empty();
        $('#thead').append(`
            <tr class="sdlms-my-upcoming-session-table-header-row">
                <th class="font-weight-500">S. NO</th>
                <th class="font-weight-500">Quiz Name</th>
                <th class="font-weight-500">Creator</th>
                    <th class="font-weight-500">Status</th>
                    <th class="font-weight-500">Actions</th>
                </tr>`
        )

        api.get(BASE_URL + `/all`, {}).then((res) => {
            $('#table').empty();
            res.data.map((ev, index) => {
                $('#table').append(`
                    <tr data-id="1782" redirect=""
                        class="sdlms-my-upcoming-session-table-row">
                        <td
                            class="sdlms-my-upcoming-session-table-Sno font-weight-500 sdlms-text-black-18px">
                            ${index + 1}</td>
                        <td
                            class="sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
                            ${ev.title} </td>
                        <td
                            class="sdlms-my-upcoming-session-table-date font-weight-500 sdlms-text-black-18px">
                            <span
                                class="sdlms-my-upcoming-session-table-time font-weight-500 sdlms-text-black-18px">${ev.userData.username}</span>
                        </td>

                        <td
                            class="sdlms-my-upcoming-session-table-date font-weight-500 sdlms-text-black-18px">
                            <span
                            class="sdlms-my-upcoming-session-table-time font-weight-500 sdlms-text-black-18px">${ev.status} </span>
                        </td>


                        <td
                            class="sdlms-my-upcoming-session-table-related-sessions font-weight-500 sdlms-text-black-18px">

                            <svg xmlns="http://www.w3.org/2000/svg" data-pid="${ev.pid}" delete-rigor width="20" height="20"
                                fill="currentColor"
                                class="bi bi-trash3-fill mx-2 cursor-pointer"
                                viewBox="0 0 16 16">
                                <path
                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" start-rigor data-pid="${ev.pid}" width="20" height="20"
                                fill="currentColor"
                                class="bi bi-caret-right-fill mx-2 cursor-pointer"
                                viewBox="0 0 16 16">
                                <path
                                    d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" end-rigor data-pid="${ev.pid}" class="bi bi-stop-fill mx-2 cursor-pointer" viewBox="0 0 16 16">
                                <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                            </svg>

                        ${ev.status === 'started' ? `<i class="fas fa-sign-in-alt cursor-pointer" solution-rigor data-pid="${ev.pid}"
                        join-now="" data-href="/live/1782" aria-hidden="true"></i>` : ''}

                        </td>
                    </tr>

                    `
                );
            });
        }).catch((err) => {
            console.log(err);
        });

        $('#customSwitch1').change(function () {
            if ($(this).is(':checked')) {
                $('[quiz-solutions]').addClass('text-primary')
                $('[quiz-problems]').removeClass('text-primary')
                $('#thead').empty();
                $('#thead').append(`
            <tr class="sdlms-my-upcoming-session-table-header-row">
                <th class="font-weight-500">S. NO</th>
                <th class="font-weight-500">Quiz Name</th>
                <th class="font-weight-500">Creator</th>
                <th class="font-weight-500">Participant</th>
                <th class="font-weight-500">Actions</th>
            </tr>`
                )
                api.get(BASE_URL + `/submissions`, {}).then((res) => {
                    console.log(res.data)
                    // clear the table before populating it with new data
                    $('#table').empty();
                    res.data.map((ev, index) => {
                        const length = Object.keys(ev.creator).length;
                        console.log(length); // Output: 3
                        $('#table').append(`
                            <tr data-id="1782" redirect=""
                                class="sdlms-my-upcoming-session-table-row">
                                <td
                                    class="sdlms-my-upcoming-session-table-Sno font-weight-500 sdlms-text-black-18px">
                                    ${index + 1}</td>
                                <td class="sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
                                    ${ev.res.title} 
                                </td>
                                <td
                                    class="sdlms-my-upcoming-session-table-date font-weight-500 sdlms-text-black-18px">
                                    <span
                                        class="sdlms-my-upcoming-session-table-time font-weight-500 sdlms-text-black-18px">${ev.userData.username}</span>
                                </td>
                                <td
                                    class="sdlms-my-upcoming-session-table-date font-weight-500 sdlms-text-black-18px">
                                    <span
                                        class="sdlms-my-upcoming-session-table-time font-weight-500 sdlms-text-black-18px">${ev.block['Reason-0']} & others</span>
                                </td>
                                <td
                                    class="sdlms-my-upcoming-session-table-related-sessions font-weight-500 sdlms-text-black-18px">
                                    <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" fill="currentColor" check-answer data-pid="${ev.res.pid}" class="bi bi-lightbulb mx-2 cursor-pointer" viewBox="0 0 16 16">
                                        <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" fill="currentColor" class="bi bi-share-fill mx-2 cursor-pointer" viewBox="0 0 16 16">
                                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                                    </svg>
                                </td>
                            </tr>

                            `
                        );
                    });
                }).catch((err) => {
                    console.log(err);
                });

            } else {
                $('[quiz-problems]').addClass('text-primary')
                $('[quiz-solutions]').removeClass('text-primary')
                $('#thead').empty();
                $('#thead').append(`
                    <tr class="sdlms-my-upcoming-session-table-header-row">
                        <th class="font-weight-500">S. NO</th>
                        <th class="font-weight-500">Quiz Name</th>
                        <th class="font-weight-500">Creator</th>
                            <th class="font-weight-500">Status</th>
                            <th class="font-weight-500">Actions</th>
                        </tr>`
                )

                api.get(BASE_URL + `/all`, {}).then((res) => {
                    $('#table').empty();
                    res.data.map((ev, index) => {
                        $('#table').append(`
                            <tr data-id="1782" redirect=""
                                class="sdlms-my-upcoming-session-table-row">
                                <td
                                    class="sdlms-my-upcoming-session-table-Sno font-weight-500 sdlms-text-black-18px">
                                    ${index + 1}</td>
                                <td
                                    class="sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
                                    ${ev.title} </td>
                                <td
                                    class="sdlms-my-upcoming-session-table-date font-weight-500 sdlms-text-black-18px">
                                    <span
                                        class="sdlms-my-upcoming-session-table-time font-weight-500 sdlms-text-black-18px">${ev.userData.username}</span>
                                </td>
                                <td
                                    class="sdlms-my-upcoming-session-table-date font-weight-500 sdlms-text-black-18px">
                                    <span
                                        class="sdlms-my-upcoming-session-table-time font-weight-500 sdlms-text-black-18px">${ev.status} </span>
                                </td>
                                <td
                                    class="sdlms-my-upcoming-session-table-related-sessions font-weight-500 sdlms-text-black-18px">

                                    <svg xmlns="http://www.w3.org/2000/svg" data-pid="${ev.pid}" delete-rigor width="20" height="20"
                                        fill="currentColor"
                                        class="bi bi-trash3-fill mx-2 cursor-pointer"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" start-rigor data-pid="${ev.pid}" width="20" height="20"
                                        fill="currentColor"
                                        class="bi bi-caret-right-fill mx-2 cursor-pointer"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" end-rigor data-pid="${ev.pid}" class="bi bi-stop-fill mx-2 cursor-pointer" viewBox="0 0 16 16">
                                        <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                                    </svg>
                                    ${ev.status === 'started' ? `<i class="fas fa-sign-in-alt cursor-pointer" solution-rigor data-pid="${ev.pid}"
                                    join-now="" data-href="/live/1782" aria-hidden="true"></i>` : ''}
                                </td>
                            </tr>

                            `
                        );
                    });
                }).catch((err) => {
                    console.log(err);
                });

            }
        });

        $("body").on("click", '[solution-rigor]', function () {
            let pid = $(this).data("pid");
            ajaxify.go(`/rigor/user/solution/${pid}`);    
        })

        // home
		$('[exit]').on('click', function(){
			ajaxify.go('/rigor/home')
		})

        // start API Integration
        $("body").on("click", '[start-rigor]', function () {
            let pid = $(this).data('pid');
            api.put(BASE_URL + `/start/`, { pid: pid })
                .then((res) => {
                    ajaxify.refresh()
                    notify('Succesfully Started the rigor ', 'success')

                })
                .catch(err => console.log("Could not start", "error"))
        })

        // End Rigor
        $("body").on("click", '[end-rigor]', function () {
            let pid = $(this).data('pid');
            api.put(BASE_URL + `/ended/`, { pid: pid })
                .then((res) => {
                    ajaxify.refresh()
                    notify('Succesfully Ended the rigor ', 'success')

                })
                .catch(err => console.log("Could not start", "error"))
        })


        // this api will be established in new page

        $("body").on("click", '[check-answer]', function () {
            let pid = $(this).data("pid");
            console.log(pid)
            ajaxify.go(`/rigor/user/answer/${pid}`);
        })




        // delete API Integration
        $("body").on("click", '[delete-rigor]', function () {
            console.log("delete is clicked")
            let pid = $(this).data('pid')
            console.log(pid)
            api.del(BASE_URL + `/delete/${pid}`, {})
                .then((res) => {
                    notify('Succesfully deleted the rigor ', 'success')
                    ajaxify.refresh()
                })
                .catch(err => { console.log(err) })
        })

        // Filter btn collapse function
        $(document).ready(function () {
            $("[collapse]").click(function () {
                $("[collapse-icon]").toggleClass('rotate')
                $("[collapse-body]").animate({ height: 'toggle' })
            })
        })
        $("body").on("click", "#view", function () {
            ajaxify.go('/rigor/user/solution');
        })

        // let projectslistTable = new Table
        //     ({
        //         target: '#table-summary',
        //         columns: [
        //             { title: 'S.No', value: 'table' },
        //             { title: 'Quiz Name', value: 'end' },
        //             { title: "Creator", value: 'end' },
        //             { title: "Status", value: 'end' },

        //         ],
        //         formatter: dashboard.formatProjectsTableResponse,
        //     })
        // projectslistTable.render(`${BASE_URL}/submissions`
        // );

    };

    // dashboard.formatProjectsTableResponse = function (data, from = 0) {

    //     console.log(data)

    //     return data.map(function (row, index) {
    //         return {
    //             attributes: {
    //             },
    //             data: {
    //                 Sno: `${(from + (index + 1))}`,
    //                 name: row.creator.displayName,
    //                 participant: row.creator.username,
    //                 status: row.res.status
    //             }
    //         }
    //     });
    // }


    return dashboard;
});