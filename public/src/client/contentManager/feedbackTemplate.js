


class feedbackTemplate {
    constructor(userFeed) {

        let paragraphStyles = "height:50px; overflow: hidden;text-overflow: ellipsis;-webkit-line-clamp: 2;display: -webkit-box;-webkit-box-orient: vertical;cursor:pointer;"

        this.template = $(`
            <div class="d-flex flex-start bg-light mt-3">
                <img class="rounded-circle shadow-1-strong me-3 m-3" src="${userFeed.picture}" alt="avatar" width="65" height="65" />
                    <div class="flex-grow-1 flex-shrink-1">
                        <div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-1 mt-3">
                                    <span class="small" style="color: blue; cursor: pointer;">@${userFeed.username}</span>
                                    <span class="small" >${userFeed.createdAt}</span>
                                </p>
                                <p class="mb-1 mt-3 mr-3">
                                    ${userFeed.isApproved ? '<i class="fa fa-check mb-2" style="color:blue;" aria-hidden="true"></i>' : ''}
                                    <span class="small" sytle="color: blue; cursor: pointer;">${userFeed.rating} / 5</span>
                                    <i class="fa fa-star mb-2" style="color:blue;" aria-hidden="true"></i>
                                </p>
                            </div>

                            <p class="medium pr-3 mb-3 para" state="false" style="${paragraphStyles}">
                                ${userFeed.feedback}
                            </p>
                        </div>
                    </div>
                </div>
            `).on('click', function () {
            if (userFeed.feedback.length > 180) {
                let feedback = $(this).find('.para')
                let lessSpan = $(`<span id="lessSpan" state="not-inserted" class="small" style="color:blue">...less</span>`)


                if (feedback.attr('state') == "false") {
                    feedback.attr('state', 'true');
                    feedback.attr('style', 'height:auto;cursor:pointer;')

                    if (feedback.find('#lessSpan').attr('state') !== 'inserted') {
                        feedback.append(lessSpan)
                        feedback.find('#lessSpan').attr('state', 'inserted');
                    }
                } else {
                    feedback.attr('state', 'false');
                    feedback.attr('style', paragraphStyles)
                }
            }
        });
    }
}