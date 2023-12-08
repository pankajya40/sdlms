'use strict';

/**
 * 
 * @typedef {{
 *  timestamp: string | number,
 *  content: string
 * }} DataPrototype
 * 
 * @typedef {DataPrototype & {
 *  pid: number | string,
 *  image: string,
 *  title: string
 * }} Article
 * 
 * @typedef {DataPrototype & {
 *  messageId: string | number,
 *  author: {
 *      fullname: string
 *  }
 * }} HighlightedMessage
 */


class Templates {
    constructor() { }
    static disucssionroom(data = {}) {
        let components = {
            chat: (data) => {
                if (app.user.uid == data.fromUser.uid) {
                    return `<div class="chat-row outgoing unselectable" mid=${data.mid ? data.mid : data.messageId} uid=${data.fromUser.uid}>
                            <div>
                                <p class="font-10 mb-0">
                                    Me
                                </p>
                                <div class="chat">
                                    <p class="mb-0 font-12">${data.cleanedContent}</p>
                                </div>
                            </div>
                            <img src="${data.fromUser.picture}"
                                alt="man 2" class="circle-sm rounded-circle img-cover">
                        </div>`;
                }
                return `<div class=" chat-row incoming unselectable" mid=${data.mid ? data.mid : data.messageId} uid=${data.fromUser.uid}>
                            <img src="${data.fromUser.picture}"
                            alt="man 2" class="circle-sm rounded-circle img-cover">
                            <div>
                                <p class="font-10 mb-0">
                                    ${data.fromUser.displayname}
                                </p>
                                <div class="chat">
                                    <p class="mb-0 font-12">${data.cleanedContent}</p>
                                </div>
                            </div>
                        </div>`;
            },
            image: (data) => {
                if (app.user.uid == data.fromUser.uid) {
                    return `<div class="chat-row outgoing day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                            <div>
                                <p class="font-10 mb-0">
                                    Me
                                </p>
                                <div class="chat">
                                    <img src="${data.content}" alt="" class="circle-lg img-cover">
                                </div>
                            </div>
                            <img src="${data.fromUser.picture}" alt="man 2" class="circle-sm rounded-circle img-cover">
                        </div>`;
                }
                return `<div class="chat-row incoming day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                            <img src="${data.fromUser.picture}" alt="man 2" class="circle-sm rounded-circle img-cover">
                            <div>
                                <p class="font-10 mb-0">
                                    ${data.fromUser.displayname}
                                </p>
                                <div class="chat">
                                    <img src="${data.content}" alt="" class="circle-lg img-cover">
                                </div>
                            </div>
                        </div>`;
            },
            audio: (data) => {
                if (app.user.uid == data.fromUser.uid) {
                    return `<div class="chat-row  outgoing day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                            <div class="w-75">
                                <p class="font-10 mb-0">
                                    Me
                                </p>
                                <div class="chat">
                                    <audio controls class="w-100">
                                        <source src="${data.content}" type="audio/mpeg">
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            </div>
                            <img src="${data.fromUser.picture}"
                                alt="man 2" class="circle-sm rounded-circle img-cover">
                        </div>`;
                }
                return `<div class="chat-row  incoming day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                            <img src="${data.fromUser.picture}"
                            alt="man 2" class="circle-sm rounded-circle img-cover">
                            <div class="w-75">
                                <p class="font-10 mb-0">
                                    ${data.fromUser.displayname}
                                </p>
                                <div class="chat">
                                    <audio controls class="w-100">
                                        <source src="${data.content}" type="audio/mpeg">
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            </div>
                        </div>`;
            },
            video: (data) => {
                if (app.user.uid == data.fromUser.uid) {
                    return `<div class="chat-row  outgoing day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                            <div>
                                <p class="font-10 mb-0">
                                    Me
                                </p>
                                <div class="chat">
                                    <video controls>
                                        <source src="${data.content}" type="video/mp4">
                                        Your browser does not support the audio element.
                                    </video>
                                </div>
                            </div>
                            <img src="${data.fromUser.picture}"
                                alt="man 2" class="circle-sm rounded-circle img-cover">
                        </div>`;
                }
                return `<div class="chat-row  incoming day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                            <img src="${data.fromUser.picture}" alt="man 2" class="circle-sm rounded-circle img-cover">
                            <div>
                                <p class="font-10 mb-0">
                                    ${data.fromUser.displayname}
                                </p>
                                <div class="chat">
                                    <video controls>
                                        <source src="${data.content}" type="video/mp4">
                                        Your browser does not support the audio element.
                                    </video>
                                </div>
                            </div>
                        </div>`;
            },
            pdf: (data) => {
                if (app.user.uid == data.fromUser.uid) {
                    return `<div class="chat-row  outgoing day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                            <div>
                                <p class="font-10 mb-0">
                                    Me
                                </p>
                                <div class="chat">
                                    ${view._template.download(data, data.content)}
                                </div>
                            </div>
                            <img src="${data.fromUser.picture}"
                                alt="man 2" class="circle-sm rounded-circle img-cover">
                        </div>`;
                }
                return `<div class="chat-row  incoming day${app.getDayTimeStamp(data.timestamp)}" data-day="${app.getDayTimeStamp(data.timestamp)}"  mid=${data.mid ? data.mid : data.messageId}>
                            <img src="${data.fromUser.picture}" alt="man 2" class="circle-sm rounded-circle img-cover">
                            <div>
                                <p class="font-10 mb-0">
                                    ${data.fromUser.displayname}
                                </p>
                                <div class="chat">
                                    ${view._template.download(data, data.content)}
                                </div>
                            </div>
                        </div>`;
            },
            download: (data, name) => {
                return `<div class="w-100 d-flex justify-content-end" ><a href="${data.content}" download="">${name || 'Download'}</a></div>`;
            },
            imageReply: (data) => {
                if (app.user.uid == data.uid) {
                    return `<div class="chat-row outgoing" mid=${data.mid ? data.mid : data.messageId} uid=${data.uid}>
                                <div>
                                    <p class="font-10 mb-0">
                                        Me
                                    </p>
                                    <div class="chat unselectable">
                                        <div  pointer=${data.pointer}>
                                                <img class="circle-lg img-cover" src="${data.orgText}">
                                        </div>
                                        <p class="mb-0 font-12">${data.replyText}</p>
                                    </div>
                                </div>
                                <img src="${data.picture}"
                                    alt="man 2" class="circle-sm rounded-circle img-cover">
                            </div>`;
                }
                return `<div class="chat-row incoming" mid=${data.mid ? data.mid : data.messageId} uid=${data.uid}>
                                <img src="${data.picture}"
                                alt="man 2" class="circle-sm rounded-circle img-cover">
                                <div>
                                    <p class="font-10 mb-0">
                                        ${data.displayname}
                                    </p>
                                    <div class="chat">
                                        <div class="reply mb-1" pointer=${data.pointer}>
                                                <img class="circle-lg img-cover" src="${data.orgText}">
                                        </div>
                                        <p class="mb-0 font-12">${data.replyText}</p>
                                    </div>
                                </div>
                            </div>`;
            },
            chatReply: (data) => {
                if (app.user.uid == data.uid) {
                    return `<div class="chat-row outgoing" mid=${data.mid ? data.mid : data.messageId} uid=${data.uid}>
                                <div>
                                    <p class="font-10 mb-0">
                                        Me
                                    </p>
                                    <div class="chat unselectable">
                                        <div class="reply mb-1" pointer=${data.pointer}>
                                                <p class="font-12 mb-0">${data.orgText}</p>
                                        </div>
                                        <p class="mb-0 font-12">${data.replyText}</p>
                                    </div>
                                </div>
                                <img src="${data.picture}"
                                    alt="man 2" class="circle-sm rounded-circle img-cover">
                            </div>`;
                }
                return `<div class="chat-row incoming" mid=${data.mid ? data.mid : data.messageId} uid=${data.uid}>
                                <img src="${data.picture}"
                                alt="man 2" class="circle-sm rounded-circle img-cover">
                                <div>
                                    <p class="font-10 mb-0">
                                        ${data.displayname}
                                    </p>
                                    <div class="chat">
                                        <div class="reply mb-1" pointer=${data.pointer}>
                                                <p class="font-12 mb-0">${data.orgText}</p>
                                        </div>
                                        <p class="mb-0 font-12">${data.replyText}</p>
                                    </div>
                                </div>
                            </div>`;
            },

            /**
             * @param {string} data
             */
            rule: (data) => {
                return `<li>${data}</li>`;
            },

            /**
             * 
             * @param {Article} data 
             * @returns 
             */
            article: (data) => {
                return `<img src="${data.image}"
                                    alt="article-img" class="circle-md rounded-circle mr-2 img-cover" data-pid=${data.pid}>
                        <div class="w-75">
                            <p class="font-14 mb-0">${data.title}</p>
                            <p class="font-10 brand-text mb-0">${moment(data.timestamp).format(
                    'ddd Do MMM, YYYY'
                )}</p>
                            <p class="mt-1 font-10 text-secondary mb-0 truncate-line-2">${app.htmltoText(
                    data.content
                )}</p>
                        </div>`;
            },

            /**
             * 
             * @param {HighlightedMessage} data 
             * @returns 
             */
            highlightedMessage: (data) => {
                return `<div class="d-flex">
                            <img src="${data.author.picture}"
                                alt="pfp" class="img-cover circle-md rounded-circle mr-2">
                            <div class="w-100">
                                <div class="d-flex justify-content-between">
                                    <p class="font-10 mb-0 ml-1">${data.author.fullname}</p>
                                    <p class="font-10 mb-0">Posted on ${moment(data.timestamp).format('Do MMM, YYYY')}</p>
                                </div>
                                <div class="font-12 px-2 py-1 mb-2 secondary-border rounded-lg mb-2">
                                    <p class="mb-0">${data.content}</p>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex flex-column align-items-center visit-listed-btn" data-mid=${data.messageId}>
                                        <i class="fas fa font-14 fa-solid fa-circle-chevron-up mb-1"></i>
                                        <p class="font-10 mb-0">Visit thread</p>
                                    </div>
                                    <div class="d-flex flex-column align-items-center mb-1 reply-listed-btn" data-mid=${data.messageId}>
                                        <i class="fas fa font-14 fa-solid fa-reply"></i>
                                        <p class="font-10 mb-0">Reply</p>
                                    </div>
                                </div>
                                <hr class="primary-border mb-20-px">
                            </div>
                        </div>`;
            },

            /**
             * 
             * @param {HighlightedMessage} data 
             * @returns 
             */
            highlightedModMessage: (data) => {
                return `<div class="d-flex highlighted-thread-content" data-mid=${data.messageId}>
                            <div class="form-check">
                                <input 
                                    class="form-check-input 
                                    position-static blankCheckbox" 
                                    type="checkbox"
                                    name="thread-selector" value=${data.messageId}>
                            </div>
                            <div class="w-100">
                                <div class="d-flex justify-content-between">
                                    <p class="font-10 mb-0 ml-1">${data.author.fullname}</p>
                                    <p class="font-10 mb-0">Posted on ${moment(data.timestamp).format('Do MMM, YYYY')}</p>
                                </div>
                                <div class="font-12 px-2 py-1 mb-2 secondary-border rounded-lg mb-2">
                                    <p class="mb-0">${data.content}</p>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex flex-column align-items-center visit-listed-btn" data-mid=${data.messageId}>
                                        <i class="fas fa font-14 fa-solid fa-circle-chevron-up mb-1"></i>
                                        <p class="font-10 mb-0">Visit thread</p>
                                    </div>
                                    <div class="d-flex flex-column align-items-center mb-1 reply-listed-btn" data-mid=${data.messageId}>
                                        <i class="fas fa font-14 fa-solid fa-reply"></i>
                                        <p class="font-10 mb-0">Reply</p>
                                    </div>
                                </div>
                                <hr class="primary-border mb-20-px">
                            </div>
                        </div>`;
            },
            /** 
             * @author Divyansh Verma
             * @param {string} id
             * @returns {string}
             * 
             */
            imageShowcaseModal: (id) => {
                return `<div class="modal fade collapse" id="${id}" data-backdrop="static" data-keyboard="false" tabindex="-1"
                aria-labelledby="imageModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content rounded-10-px message-modal">
                        <div class="modal-header border-0">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" data-bs-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body py-2">
                            <img src="" alt="" class="rounded-lg w-100 img-cover modalImg">
                        </div>
                    </div>
                </div>
            </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @returns {string}
             */
            commentAttachments: () => {
                return ` <div class="d-none attachments-menu">
                            <div
                                class="secondary-bg shadow-sm primary-border rounded-10-px d-inline-flex flex-column py-2 px-1 justify-content-between align-items-center">
        
                                <input type="file" class="form-control-file d-none event-img" name="files" />
                                <label for="event-img" class="mb-2">
                                    <i class="fas fa fa-solid fa-file"></i>
                                </label>
        
                                <input type="file" accept="image/*" name="files" class="form-control-file d-none event-img"/>
                                <label for="event-img" class="mb-2">
                                    <i class="fas fa fa-solid fa-image"></i>
                                </label>
        
                                <input type="file" accept="image/*" name="files" class="form-control-file d-none event-img" />
                                <label for="event-img" class="mb-0">
                                    <i class="fas fa fa-solid fa-camera"></i>
                                </label>
                            </div>
                        </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @returns {string}
             */
            commentTextInputField: () => {
                return `<div class="fixed-bottom mb-2 px-3 grey-background dr-footer">
                            <form action="" class="chat-focused chatbox">
                                <div class="reply-to">
                                    <p class="replyto"></p>
                                <div class="input-group">
                                    <input 
                                        type="text" 
                                        class="form-control font-12 rounded-lg chat-input" 
                                        placeholder="Type a message" 
                                        name="chatbox"
                                    >
                                    <div class="input-group-append button-addon4">
                                        <button class="border-0 ml-1 bg-transparent attachments-btn" type="button">
                                            <i class="fas fa fa-solid fa-paperclip"></i>
                                        </button>
                                        <button class="border-0 brand-text ml-1 bg-transparent submit-thread" type="submit">
                                            <i class="fa fa-solid fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </form>
        
                        </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @param {string} leaveRoomModalId
             * @returns {string}
             */
            leaveModal: (leaveRoomModalId) => {
                return `<div class="modal fade leave-room-modal" id="${leaveRoomModalId}" tabindex="-1" aria-labelledby="leave-room-modal-label" aria-hidden="true">
                            <div class="modal-dialog p-4 m-0">
                                <div class="modal-content secondary-bg rounded-10-px">
                                    <div class="modal-body">
                                        <div class="d-flex justify-content-center mb-1">
                                            <p class="font-medium text-center">Are you sure you want to leave the discussion room?
                                            </p>
                                        </div>
                                        <div class="d-flex justify-content-between px-5">
                                            <button 
                                                type="button" 
                                                class="button-tertiary-brand-text font-14 border-0 cancel-leave"
                                                data-bs-dismiss="modal"
                                            >Cancel</button>
                                            <button 
                                                type="button" 
                                                class="button-tertiary text-danger font-14 border-0 leave-final leave-final"
                                                data-bs-dismiss="modal"
                                            >Leave</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @param {string} id
             * @returns {string}
             */
            deleteRoomModal: (id) => {
                return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="delete-room-modal-label" aria-hidden="true">
                            <div class="modal-dialog p-4 m-0">
                                <div class="modal-content secondary-bg rounded-10-px">
                                    <div class="modal-body">
                                        <div class="d-flex justify-content-center mb-1">
                                            <p class=" font-medium text-center">Are you sure you want to delete the discussion room?
                                            </p>
                                        </div>
                                        <div class="d-flex justify-content-between px-5">
                                            <button 
                                                type="button" 
                                                class="button-tertiary-brand-text font-14 border-0 cancel-delete"
                                                data-bs-dismiss="modal"
                                            >Cancel</button>
                                            <button 
                                                type="button" 
                                                class="button-tertiary text-danger font-14 border-0 delete-ok"
                                                data-bs-dismiss="modal"
                                            >Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @param {string} id
             * @returns {string}
             */
            reportMessageModal: (id) => {
                return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="report-thread-modal-label"
                            aria-hidden="true">
                            <div class="modal-dialog p-4 m-0">
                                <div class="modal-content secondary-bg rounded-10-px">
                                    <div class="modal-body">
                                        <div class="d-flex justify-content-center mb-1">
                                            <p class=" font-medium text-center">Are you sure you want to report this thread?
                                            </p>
                                        </div>
                                        <div class="d-flex justify-content-between px-5">
                                            <button 
                                                type="button" 
                                                class="button-tertiary-brand-text font-14 border-0 cancel-report"
                                                data-bs-dismiss="modal"
                                            >Cancel</button>
                                            <button 
                                                type="button" 
                                                class="button-tertiary text-danger font-14 border-0 report-final"
                                                data-bs-dismiss="modal"
                                            >Report</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @param {string} id
             * @returns {string}
             */
            deleteThreadModal: (id) => {
                return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="delete-thread-modal-label"
                            aria-hidden="true">
                            <div class="modal-dialog p-4 m-0">
                                <div class="modal-content secondary-bg rounded-10-px">
                                    <div class="modal-body">
                                        <div class="d-flex justify-content-center mb-1">
                                            <p class=" font-medium text-center">Are you sure you want to delete this thread?
                                            </p>
                                        </div>
                                        <div class="d-flex justify-content-between px-5">
                                            <button 
                                                type="button" 
                                                class="button-tertiary-brand-text font-14 border-0 cancel-delete"
                                                data-bs-dismiss="modal"
                                            >Cancel</button>
                                            <button 
                                                type="button" 
                                                class="button-tertiary text-danger font-14 border-0 delete-final"
                                                data-bs-dismiss="modal"
                                            >delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @param {string} id
             * @returns {string}
             */
            removeUserModal: (id) => {
                return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="remove-user-modal-label"
                            aria-hidden="true">
                            <div class="modal-dialog p-4 m-0">
                                <div class="modal-content secondary-bg rounded-10-px">
                                    <div class="modal-body">
                                        <div class="d-flex justify-content-center mb-1">
                                            <p class=" font-medium text-center">Are you sure you want to remove this user?
                                            </p>
                                        </div>
                                        <div class="d-flex justify-content-between px-5">
                                            <button 
                                                type="button" 
                                                class="button-tertiary-brand-text font-14 border-0 cancel-remove"
                                                data-bs-dismiss="modal"
                                            >Cancel</button>
                                            <button 
                                                type="button" 
                                                class="button-tertiary text-danger font-14 border-0 remove-final"
                                                data-bs-dismiss="modal"
                                            >remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
            },

            /**
             * @author Subham Bhattacharjee
             * @param {string} id
             * @param {dtring} reportMessageModalId
             * @returns {string}
             */
            messageReportOptionsModal: (id, reportMessageModalId) => {
                return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="report-thread-reason-modal-label"
                            aria-hidden="true">
                            <div class="modal-dialog p-4 m-0">
                                <div class="modal-content secondary-bg rounded-10-px">
                                    <div class="modal-body">
                                        <div class="d-flex justify-content-center mb-1">
                                            <p class="mb-0 font-medium text-center">What do you want to report this message for?</p>
                                        </div>
                                        <div>
                                            <hr class="mb-0">
                                            <button 
                                                type="button"
                                                class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3"
                                                data-bs-dismiss="modal"
                                                data-bs-toggle="modal"
                                                data-bs-target="#${reportMessageModalId}"
                                            >Fake news</button>
                                            <hr class="m-0">
                                            <button 
                                                type="button"
                                                class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3"
                                                data-bs-dismiss="modal"
                                                data-bs-toggle="modal"
                                                data-bs-target="#${reportMessageModalId}"
                                            >Discriminatory comment</button>
                                            <hr class="m-0">
                                            <button 
                                                type="button"
                                                class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3"
                                                data-bs-dismiss="modal"
                                                data-bs-toggle="modal"
                                                data-bs-target="#${reportMessageModalId}"
                                            >Sexual content</button>
                                            <hr class="m-0">
                                            <button 
                                                type="button"
                                                class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3"
                                                data-bs-dismiss="modal"
                                                data-bs-toggle="modal"
                                                data-bs-target="#${reportMessageModalId}"
                                            >Irrelevent</button>
                                            <hr class="m-0">
                                            <button 
                                                type="button"
                                                class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3"
                                                data-bs-dismiss="modal"
                                                data-bs-toggle="modal"
                                                data-bs-target="#${reportMessageModalId}"
                                            >Spam</button>
                                            <hr class="m-0">
                                            <button 
                                                type="button"
                                                class="bg-transparent border-0 report-option font-12 d-block w-100 text-center py-3"
                                                data-bs-dismiss="modal"
                                                data-bs-toggle="modal"
                                                data-bs-target="#${reportMessageModalId}"
                                            >Promotional content</button>
                                            <hr class="mt-0 mb-2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
            },
            /** 
             * @author Divyansh Verma
             * @param {string} leaveRoomModalId
             * @param {number} roomTid
             * @returns {string}
             * 
             */
            participantOptions: (leaveRoomModalId, roomTid) => {
                return `<div class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right participant-options">
                <a class="d-flex align-items-center mb-3 saved-threads" href="/mobile/discussion/saved?tid=${roomTid}&uid=${app.user.uid}">
                    <i class="fas fa fa-solid fa-bookmark font-14"></i>
                    <p class="font-12 ml-2 mb-0">Saved Threads</p>
                </a>
                <div class="d-flex align-items-center mb-3 search-thread">
                    <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/search-dr-icon.svg" alt="search-icon"
                        class="icon-15">
                    <p class="font-12 ml-2 mb-0">Search Thread</p>
                </div>
                <a class="d-flex align-items-center mb-3 mod-list" href="/mobile/discussion/modlist?tid=${roomTid}">
                    <i class="fas fa fa-solid fa-users font-14"></i>
                    <p class="font-12 ml-2 mb-0">Moderators List</p>
                </a>
                <a class="d-flex align-items-center mb-3 dr-rules" href="/mobile/discussion/rules?tid=${roomTid}">
                    <i class="fas fa fa-solid fa-book font-14"></i>
                    <p class="font-12 ml-2 mb-0">Rules of the room</p>
                </a>
                <div class="d-flex align-items-center mb-3 highlighted-threads">
                    <i class="fa fa-solid fa-thumbtack font-14"></i>
                    <p class="font-12 ml-2 mb-0">Highlighted Threads</p>
                </div>
                <div class="d-flex align-items-center mb-3 mute-room">
                    <i class="fas fa fa-solid fa-bell-slash font-14"></i>
                    <p class="font-12 ml-2 mb-0">Mute room</p>
                </div>
                <div class="d-flex align-items-center mb-3 text-danger leave-room" data-bs-toggle="modal" data-bs-target="#${leaveRoomModalId}">
                    <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/leave-dr-icon.svg" alt="leave-icon"
                        class="icon-15">
                    <p class="font-12 ml-2 mb-0">Leave room</p>
                </div>
                </div>`
            },
            /** 
             * @author Divyansh Verma
             * @param {string} reportModalOptionsId
             * @returns {string}
             * 
             */
            participantOptionsOnSelectedThread: (reportModalOptionsId) => {
                return `<div id="${reportModalOptionsId}" class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right chat-focused participant-options-selected">
                <div class="d-flex align-items-center mb-3 chat-focused reply-selected">
                    <i class="fas fa fa-solid fa-reply font-14"></i>
                    <p class="font-12 ml-2 mb-0">Reply</p>
                </div>
                <div class="d-flex align-items-center mb-3 save-selected">
                    <i class="fas fa fa-solid fa-bookmark font-14"></i>
                    <p class="font-12 ml-2 mb-0">Save Thread</p>
                </div>
                <div class="d-flex align-items-center mb-3 share-selected">
                    <img 
                        src="https://blog.deepthought.education/wp-content/uploads/2022/04/share.svg" 
                        class="icon-15"
                        alt="share-icon"
                    >
                    <p class="font-12 ml-2 mb-0">Share thread</p>
                </div>
                <div class="d-flex align-items-center text-danger report-selected" data-bs-toggle="modal" data-bs-target="#${reportModalOptionsId}">
                    <i class="fas fa fa-solid fa-shield font-14"></i>
                    <p class="font-12 ml-2 mb-0">Report</p>
                </div>report-option
                        </div>`
            },
            /** 
             * @author Divyansh Verma
             * @param {string} leaveRoomModalId
             * @param {number} roomTid
             * @returns {string}
             * 
             */
            moderatorOptions: (leaveRoomModalId, roomTid) => {
                return `<div class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right mod-options">
                <a class="d-flex align-items-center mb-3 saved-threads" href="/mobile/discussion/saved?tid=${roomTid}&uid=${app.user.uid}">
                    <i class="fas fa fa-solid fa-bookmark font-14"></i>
                    <p class="font-12 ml-2 mb-0">Saved Threads</p>
                </a>
                <div class="d-flex align-items-center mb-3 search-thread">
                    <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/search-dr-icon.svg" alt="search-icon"
                        class="icon-15">
                    <p class="font-12 ml-2 mb-0">Search Thread</p>
                </div>
                <a class="d-flex align-items-center mb-3 mod-list" href="/mobile/discussion/modlist?tid=${roomTid}">
                    <i class="fas fa fa-solid fa-users font-14"></i>
                    <p class="font-12 ml-2 mb-0">Moderators List</p>
                </a>
                <a class="d-flex align-items-center mb-3 dr-rules" href="/mobile/discussion/rules?tid=${roomTid}">
                    <i class="fas fa fa-solid fa-book font-14"></i>
                    <p class="font-12 ml-2 mb-0">Rules of the room</p>
                </a>
                <div class="d-flex align-items-center mb-3 highlighted-threads">
                    <i class="fa fa-solid fa-thumbtack font-14"></i>
                    <p class="font-12 ml-2 mb-0">Highlighted Threads</p>
                </div>
                <a class="d-flex align-items-center mb-3 reported-threads" href="/mobile/discussion/reported/?roomid=${roomTid}">
                    <i class="fas fa fa-solid fa-shield font-14"></i>
                    <p class="font-12 ml-2 mb-0">Reported Threads</p>
                </a>
                <div class="d-flex align-items-center mb-3 mute-room">
                    <i class="fas fa fa-solid fa-bell-slash font-14"></i>
                    <p class="font-12 ml-2 mb-0">Mute room</p>
                </div>
                <div class="d-flex align-items-center mb-3 text-danger leave-room" data-bs-toggle="modal" data-bs-target="#${leaveRoomModalId}">
                    <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/leave-dr-icon.svg" alt="leave-icon"
                        class="icon-15">
                    <p class="font-12 ml-2 mb-0">Leave room</p>
                </div>
                
                
            </div>`
            },

            /**
             * 
             * @param {string} deleteRoomModalId 
             * @returns 
             */
            deleteRoomButton: (deleteRoomModalId) => {
                return `<div class="d-none d-flex align-items-center text-danger delete-room" data-bs-toggle="modal" data-bs-target="#${deleteRoomModalId}">
                    <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/delete-dr-icon.svg" alt="leave-icon"
                        class="icon-15">
                    <p class="font-12 ml-2 mb-0">Delete room</p>
                </div>`
            },

            /** 
             * @author Divyansh Verma
             * @param {string} removeUserModalId
             * @param {string} deleteThreadModalId
             * @returns {string}
             * 
             */
            moderatorOptionsOnSelectedThread: (removeUserModalId, deleteThreadModalId) => {
                return `<div class="d-none secondary-bg py-3 px-2 shadow-sm rounded-10-px floating-right chat-focused mod-options-selected">
                <div class="d-flex align-items-center mb-3 chat-focused mod-options-selected">
                    <i class="fas fa fa-solid fa-reply font-14"></i>
                    <p class="font-12 ml-2 mb-0">Reply</p>
                </div>
                <div class="d-flex align-items-center mb-3 save-selected">
                    <i class="fas fa fa-solid fa-bookmark font-14"></i>
                    <p class="font-12 ml-2 mb-0">Save Thread</p>
                </div>
                <div class="d-flex align-items-center mb-3 share-selected">
                    <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/share.svg" class="icon-15"
                        alt="share-icon">
                    <p class="font-12 ml-2 mb-0">Share thread</p>
                </div>
                <div class="d-flex align-items-center mb-3 highlight-selected">
                    <i class="fa fa-solid fa-thumbtack font-14"></i>
                    <p class="font-12 ml-2 mb-0">Highlight Thread</p>
                </div>
                <div class="d-flex align-items-center text-danger mb-3 delete-selected" data-bs-toggle="modal" data-bs-target="#${deleteThreadModalId}">
                    <img src="https://blog.deepthought.education/wp-content/uploads/2022/06/delete-dr-icon.svg" alt="delete-icon"
                        class="icon-15">
                    <p class="font-12 ml-2 mb-0">Delete Thread</p>
                </div>
                <div class="d-flex align-items-center text-danger remove-selected" data-bs-toggle="modal" data-bs-target="#${removeUserModalId}">
                    <i class="fa fa-solid fa-user-minus font-14"></i>
                    <p class="font-12 ml-2 mb-0">Remove user</p>
                </div>
            </div>`
            },
            /** 
             * @author Divyansh Verma
             * @returns {string}
             * 
             */
            sidebar: () => {
                return `<div class="sidebar-wrapper">
                <div class="sidebar-nav">
                    <!-- sidebar header -->
                    <div class="d-flex justify-content-between align-items-center px-2 py-2 mb-3 shadow-sm secondary-bg sidebar-wrapper">
                        <div class=" d-flex align-items-center">
                            <i class="fa fa-solid fa-thumbtack"></i>
                            <p class="mb-0 ml-1 font-bold">Highlighted Threads</p>
                        </div>
                        <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/black-cross.svg"
                            class="close-highlighted">
                    </div>
                    <div class="px-3 highlighted-body"></div>
                </div>
            </div>`
            },
            /** 
             * @author Divyansh Verma
             * @returns {string}
             * 
             */
            moderatorSidebar: () => {
                return `<div class="mod-sidebar-wrapper">
                <div class="sidebar-nav">
                    <!-- sidebar header -->
                    <div class="d-flex justify-content-between align-items-center px-2 py-2 mb-3 shadow-sm secondary-bg sidebar-header">
                        <div class=" d-flex align-items-center">
                            <i class="fa fa-solid fa-thumbtack"></i>
                            <p class="mb-0 ml-1 font-bold">Highlighted Threads</p>
                        </div>
                        <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/black-cross.svg close-highlighted">
                    </div>
                    <!-- sidebar body -->
                    <div class="px-3" class="mod-highlighted-body"></div>
                    <!-- sidebar footer -->
                    <div class="primary-bg d-flex justify-content-center align-items-center py-2 text-danger sidebar-footer">
                        <p class="font-14 mb-0">Remove Highlighted Thread</p>
                    </div>
                </div>
            </div>`
            },
            /** 
             * @author Divyansh Verma
             * @returns {string}
             */
            showPageContent: () => {
                return `<div id="page-content-wrapper" class="pt-5 px-0 pb-0">     
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12">
                                ${this.pageContentHeader()}
                                ${this.pageContentSearchThread()}
                                ${this.pageContentIntroBoxes()}
                            </div>
                        </div>
                    </div>
                </div>`
            },

            /**
             * 
             * @param {boolean} isMod 
             * @returns {string}
             */
            mainContent: (isMod) => {
                return `<main class="toggled mod-toggled wrapper">
                    ${isMod ? this.moderatorSidebar() : this.sidebar()}
                    ${this.showPageContent()}
                    ${this.commentAttachments()}
                    ${this.commentTextInputField()}
                </main>`
            },

            mainPage: () => {
                return `<main class="toggled mod-toggled wrapper">
                    ${this.showPageContent()}
                    ${this.commentAttachments()}
                    ${this.commentTextInputField()}
            </main>`
            },

            /** 
             * @author Divyansh Verma
             * @param {string} title
             * @param {string} image
             * @param {string} imageModalId
             * @returns {string}
             * 
             */
            pageContentHeader: (title, image, imageModalId) => {
                return `<div class="fixed-top dr-header">
                            <div
                                class="dr-header d-flex justify-content-between align-items-center py-1 shadow-sm px-3 secondary-bg">
                                <div class="dr-name d-flex align-items-center">
                                    <i class="fas fa fa-solid fa-arrow-left mr-2"></i>
                                    <img src="${image}"
                                        alt="tesla roadster" class="circle-sm rounded-circle mr-1 img-cover room-img" data-bs-toggle="modal" data-bs-target="#${imageModalId}">
                                    <p class="font-bold  mb-0 room-title">${title}</p>
                                </div>
                                <button class="border-0 bg-transparent chat-focused" type="button menu-btn">
                                    <img src="https://blog.deepthought.education/wp-content/uploads/2022/04/settings-icon.svg"
                                        alt="settings-icon">
                                </button>
                            </div>
                        </div>`
            },
            /** 
             * @author Divyansh Verma
             * @returns {string}
             * 
             */
            pageContentSearchThread: () => {
                return `<div class="d-none fixed-top search-thread-box">
                <div class="d-flex justify-content-between align-items-center py-1 shadow-sm px-3 secondary-bg">
                    <i class="fas fa fa-solid fa-arrow-left mr-2 close-search"></i>
                    <input type="search" name="search-thread-input search-thread-input"
                        class="form-control " placeholder="Search Thread">
                </div>
            </div>`
            },
            /** 
             * @author Divyansh Verma
             * @returns {string}
             * @description intro boxes: rules and suggested article
             */
            pageContentIntroBoxes: () => {
                return `<div class="intro-boxes">
                <div class="primary-bg rounded-10-px border-secondary p-3 mb-3 room-rules-text">
                    <div class="d-flex justify-content-between align-items-center">
                        <p class=" mb-0">Rules of Discussion Room:</p>
                       <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/black-cross.svg" class="close-rules">
        
                    </div>
                    <ol class="font-12 mb-0 pl-3 mt-2 rules-list">
        
                    </ol>
                </div>
        
                <div class="primary-bg rounded-10-px border-secondary px-3 pt-3 pb-1 mb-3 room-article-text">
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="font-14 mb-0">Article Recommended by the host:</p>
                        <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/black-cross.svg"
                            class="close-article">
                    </div>
                    <a 
                        class="m-3 secondary-bg d-flex justify-content-between align-items-center py-1 px-3 rounded-10-px shadow-sm article-container"
                        href=""
                    >
                    </a>
                </div>
            </div>`
            },

        }
        return components;

        /**
         * @typedef {Template} TemplateType
         */
    }
}

