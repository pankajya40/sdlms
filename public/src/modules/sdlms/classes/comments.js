class Comment {
    constructor(data) {
        if (!data.target || !$(data.target).length) {
            throw new Error('Invalid HTML elem supplied');
        }
        if (!data.assetId) {
            throw new Error('Invalid assetId supplied');
        }
        if (!data.uid) {
            throw new Error('Invalid uid supplied');
        }
        this.data = data;
        this.disableComment = data.disableComment;
        this.disableMessage = data.disableMessage;
        var b = document.documentElement;
        b.setAttribute("data-useragent", navigator.userAgent);
        b.setAttribute("data-platform", navigator.platform);
        this.builder();
    }

    unique(prefix = "") {
        var dt = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
        return prefix + uuid;
    }

    log(log) {
        !this.data.log || console.log(log);
    }
    builder() {
        this.id = this.unique("sdlms-this-");

        $(this.data.target).append(
            $("<sdlms-comments>")
                .attr({
                    id: this.id,
                    style: 'width:100%'
                })
        );
        let $container = $(`#${this.id}`);
        // $container.append(`<div class="sdlms-comment-received sdlms-eagle-thread-header position-relative secondary-header mt-3" >
        //     <span class="sdlms-floating-left">
        //         <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg" class="rotate" collapse collapse-icon alt="" />
        //     </span>
        //         <div class="sdlms-comments col-11 mx-auto d-flex align-items-center justify-content-between " id="comment-${this.id}"> <span class="sdlms-text-white-20px font-weight-500" >comments </span>
        //     <span class="sdlms-floating-right" refresh-comments>
        //         <svg style="width:19px" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer" refresh-asset width="24" height="24" viewBox="0 0 24 24">
        //           <path fill="white" d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"/>
        //         </svg>
        //     </span>
        // </div>`);
        $container.append(`<div class="sdlms-comments-container sdlms-comment-received-body col-12  mx-auto" collapse-body id="comment-contianer-${this.id}">this <i class="fas fa-chevron"></i></div></div>`);
        $container.find('[refresh-comments]').off('click').on('click', (e) => {
            $(this).addClass('spintorefresh')
            this.render();
        });
        this.render();
    }
    render() {
        let self = this;
        let assetId = self.data.assetId;

        var saveComment = function (data) {
            $(Object.keys(data.pings)).each(function (index, userId) {
                var fullname = data.pings[userId];
                var pingText = '@' + fullname;
                data.content = data.content.replace(new RegExp('@' + userId, 'g'), pingText);
            });
            return data;
        }
        let $renderer = $(`#comment-contianer-${self.id}`)
        let $comment = $(`#comment-${self.id}`);
        var usersArray = self.data.users || [];
        function checkForNew(date) {
            return ((Date.now() - new Date(date).getTime()) / (1000) < 5000)
        }
        let current = self.data.uid;
        try {
            current = ajaxify.data.user[0].uid;
        } catch (error) {

        }

        console.log(current)
        require(['api'], function (api) {
            $renderer.comments({
                profilePictureURL: self.data.picture,
                currentUserId: current,
                roundProfilePictures: true,
                textareaRows: 3,
                parentElement: self.data.target,
                enableAttachments: !true,
                enableHashtags: true,
                enablePinging: true,
                users: usersArray,
                scrollContainer: $renderer,
                timeFormatter: function (time) {
                    let date = new Date(time);
                    var intervals = [
                        { label: 'year', seconds: 31536000 },
                        { label: 'month', seconds: 2592000 },
                        { label: 'day', seconds: 86400 },
                        { label: 'hour', seconds: 3600 },
                        { label: 'minute', seconds: 60 },
                        { label: 'second', seconds: 1 }
                    ];

                    var seconds = Math.floor((Date.now() - date.getTime()) / 1000);
                    if (!seconds || seconds < 0) return "Just now";
                    var interval = intervals.find(i => i.seconds < seconds);
                    if (!interval) return "Just now";
                    var count = Math.floor(seconds / interval.seconds);
                    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
                },
                searchUsers: function (term, success, error) {
                    api.get(`/sdlms/attendance/${self.data.tid}`, {}).then(function (response) {
                        success(response.attendance.filter(function (user) {
                            user.id = user.uid;
                            var containsSearchTerm = (user.fullname || user.displayName || user.username).toLowerCase().indexOf(term.toLowerCase()) != -1;
                            var isNotSelf = user.uid != self.data.uid;
                            return containsSearchTerm && isNotSelf;
                        }));
                    })
                },
                getComments: function (success, error) {

                    api.get(`/api/v3/app/comments?id=${assetId}`, {}).then(res => {
                        res = res.map(e => $.extend({}, e, {
                            id: e._id,
                            created_by_current_user: (e.creator == current),
                            is_new: checkForNew(e.modified || e.created),
                            user_has_upvoted: !!((e.votes && Array.isArray(e.votes) ? e.votes : [])).find(vote => vote.uid == self.data.uid)
                        }))
                        success(res);
                    })

                },

                postComment: function (data, success, error) {
                    if (self.disableComment) {
                        self.render();
                        return notify(self.disableMessage, 'error');
                    }

                    let comment = saveComment(data);
                    let payload = {
                        content: comment.content,
                        attachment_id: assetId,
                        attachment_type: self.data.type || "comment",
                        pings: comment.pings,
                        attachments: comment.attachments,
                        parent: comment.parent,
                        created_by_current_user: comment.created_by_current_user,
                        asset_owner_uid: self.data.uid,
                        topic: self.data.topic
                    }
                    //console.log(comment)
                    api.post(`/api/v3/app/comments`, payload).then(res => {
                        success(comment);
                        payload.with = {};
                        payload.creator = current;
                        self.render();
                    });
                },
                putComment: function (data, success, error) {
                    if (self.disableComment) {
                        self.render();
                        return notify(self.disableMessage, 'error');
                    }
                    let comment = saveComment(data);
                    let payload = {
                        id: comment.id,
                        content: comment.content,
                        pings: comment.pings != null ? comment.pings : {},
                        attachments: comment.attachments != null ? comment.attachments : [],
                        upvote_count: comment.upvote_count,
                        asset_owner_uid: self.data.uid
                    }
                    api.put(`/api/v3/app/comments/${data.id}`, payload).then(res => {
                        success(comment);
                        self.render();
                    });
                },
                deleteComment: function (data, success, error) {
                    if (self.disableComment) {
                        self.render();
                        return notify(self.disableMessage, 'error');
                    };
                    api.del(`/api/v3/app/comments/${data.id}`, {}).then(res => {
                        success();
                        self.render();
                    });
                },
                upvoteComment: function (data, success, error) {
                    if (self.disableComment) {
                        self.render();
                        return notify(self.disableMessage, 'error');
                    };
                    api.put(`/app/comments/${data.id}/vote`, {}).then(res => {
                        success(data);
                        // this.render();
                    });
                },
                validateAttachments: function (attachments, callback) {
                    setTimeout(function () {
                        callback(attachments);
                    }, 500);
                },
            });

            if (self.disableComment) {
                $(self.data.target).find('.textarea-wrapper').remove();
            }
        })
    }
}