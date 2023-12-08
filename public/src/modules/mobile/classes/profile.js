class DiscussionProfileTemplate {
    constructor() { }

    static profile() {
        let emotion = `<i class="fa fa-smile-o pr-2 pt-1" aria-hidden="true"></i>`;
        let value = `<i class="fa fa-diamond pr-2 pt-1" aria-hidden="true"></i>`;
        let wisdom = `<i class="fa fa-lightbulb-o pr-2 pt-1" aria-hidden="true"></i>`;
        let components = {
            reflection: {//moment(data.updatedAt).startOf('day').fromNow() 
                thread: (data) => {
                    var reflectionCategoryIcon;
                    if(data.category === "Value") reflectionCategoryIcon = value;
                    else if(data.category === "Emotion") reflectionCategoryIcon = emotion;
                    else if(data.category === "Wisdom") reflectionCategoryIcon = wisdom;
                    return `<div class="m-1 my-3 p-2 profile-reflection-card">
                    <div>
                        <div class="bg-gray p-2 rounded-lg">
                            <div>
                                <p class="font-weight-bold m-0 text-dark">${data.user.displayname}</</p>
                                <p class="mt-1 profile-reflection-card-text">${data.reflection}</p>
                            </div>
                            <div class="d-flex justify-content-between mt-3 sdlms-text-white-12px text-dark font-weight-bold">
                                <p class="m-0">${app.timeFormatter(data.updatedAt)}</p>
                                <p class="m-0">${reflectionCategoryIcon}${data.subCategory.charAt(0).toUpperCase() + data.subCategory.slice(1)}</p>
                            </div>
                        </div>
                    </div>
                </div>`
                },
                discussion: (data) => {
                    return `<div class="row m-1 my-3 p-2 profile-reflection-card">
                    <div class="p-2" style="">
                        <div class="section-collapsed">
                            <div class="sdlms-section-header section-header row p-0" collapse="">
                                <div class="d-flex col-6 justify-content-start pb-2"><span class="pt-1">Shagun Mishra</span></div>
                                <span class="col-6 d-flex justify-content-end sdlms-floating-right">
                                    <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon="" alt="" class="mb-2 mr-2 rotate" style="width: 10px;" onerror="this.onerror=null;this.src='https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg';">
                                    See Thread
                                </span>
                            </div>
                            <div class="col-md-1 mb-4 p-0 profile-reflection-card-thread" collapse-body="" style="display: none;">
                                <div>Focus on outcome because it will give you clear process how to think and stick on particular thread.</div>
                            </div>
                        </div>
                        <div class="profile-reflection-card-text">Focus on outcome because it will give you clear process how to think and stick on particular thread.</div>
                        <div class="row justify-content-end">
                            <div class="d-flex pr-4 justify-content-end"><i class="fa fa-smile-o pr-2 pt-1" aria-hidden="true"></i> Happy</div>
                            <div class="d-flex justify-content-end pr-3">4 min ago</div>
                        </div>
                    </div>
                </div>`
                }
            },
            reaction: (data) => {
                return `<div class="p-4 row profile-reaction-card">
                <div>
                  <i class="fa fa-smile-o pr-2 pt-1" aria-hidden="true"></i>
                  <span class="emotions">${data.emotions}</span>
                </div>
                <div>
                  <i class="fa fa-diamond pr-2 pt-1" aria-hidden="true"></i>
                  <span class="values">${data.values}</span>
                </div>
                <div>
                  <i class="fa fa-lightbulb-o pr-2 pt-1" aria-hidden="true"></i>
                  <span class="wisdoms">${data.wisdoms}</span>
                </div>
            </div>`
            }
        }
        return components;
    }
}
