class ContentManager {
    constructor() { }

    static templates() {

        let content = {

            card : function (data) {
                
                return `<div class="col-12 col-md-6 col-lg-4 mb-3">
                <div class="bg-gray p-3 rounded-lg border cursor-pointer content-card">
                    <div>
                        <div class="d-flex ml-0">
                            <div class="ml-auto">
                                <div class="row">
                                    <div class="col-12">
                                        <p class="font-weight-bold m-0 sdlms-text-white-16px text-dark text-ellipse">Content Test 1</p>
                                        <p class="sdlms-text-white-12px text-dark m-0" style="color: rgba(0, 0, 0, 0.5) !important;">Date: 07/09/2022</p>
                                        <p class="sdlms-text-white-14px text-dark m-0 text-ellipse"><span style="font-weight: 600;">Used As : </span>Article, Poster, Reflection, WhatsApp</p>
                                        <p class="sdlms-text-white-14px text-dark"><span style="font-weight: 600;">Spotted by : </span>Palash</p>
                                    </div>
                                </div>
                                <p class="mt-1 sdlms-text-white-14px text-dark text-ellipse-4">
                                    One of the most often-mentioned benefits of keeping a dream journal is that it can help you advance from merely experiencing your dreams to actually controlling them. This is known as "lucid dreaming," a state in
                                    which you are not only consciously aware that you are dreaming, but can also consciously manipulate what happens in a dream (at least to some extent). Becoming a lucid dreamer can help you learn how to give bad
                                    dreams good endings, or even learn to avoid having nightmares in the first place.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between mt-4 sdlms-text-white-14px text-dark font-weight-bold">
                        <p class="ml-1" style="color: green;">*<span></span>Approved</p>
                        <a href="" class="m-0">Give Feedback</a>
                    </div>
                </div>
            </div>`
            }
        }

        return  content;
    }
}
