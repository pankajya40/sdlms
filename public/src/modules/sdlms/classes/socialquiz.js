class Socialquiz {
    constructor() {

    }

    static solveQuiz() {
        let component = {
            loadingScreen: () => {
                return `<div style="font-size: var(--sdlms-font-size-45); font-weight: 600;" class="d-flex justify-content-center">Wait... Not Started Yet...</div>
                <div class="d-flex justify-content-center">
                    <img src="https://media.giphy.com/media/elQwRAXG5E01gEgc9N/giphy.gif" onerror="this.onerror=null;this.src='https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg';"/>
                </div>
                <div style="font-size: var(--sdlms-font-size-28);"><b> Try again, Reload this Page...</b></div>`
            },
            answerbox: () => {
                return `<div class="col-12 p-0">
                <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                    <div class="sdlms-floating-label label-style">Question 1: What is your name?</div>
                    <textarea id="pTitle" class="form-control label-text" placeholder="Enter Your Answer Here" name="project-title" rows="2" style="resize: none;z-index: 0;"></textarea>
                </div>
            </div>
            `
            },
        }
        return component;
    }
    static markQuiz() {
        let component = {
            loadingScreen: () => {
                return `<div style="font-size: var(--sdlms-font-size-45); font-weight: 600;" class="d-flex justify-content-center">Wait... Not Started Yet...</div>
                <div class="d-flex justify-content-center p-4 m-4">
                    <img src="https://media.giphy.com/media/imILssa0ye5kTZewHz/giphy.gif" style="width: 30%; height: 30%;" onerror="this.onerror=null;this.src='https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg';"/>
                </div>
                <div style="font-size: var(--sdlms-font-size-28); margin-bottom: 30px;"><b> Try again, Reload this Page...</b></div>`
            },
            markCard: () => {
                return `<div class="sdlms-section rounded-0">
                    <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between rounded-0" collapse="" style="background: #ddd;">
                        <div id="project_title" class="d-flex align-items-center sdlms-text-white-20px" style="color: var(--primary-sub-text-color); font-weight: 700;">Question 1 : What is Deep Learning?</div>
                        <span class="sdlms-floating-right">
                            <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt class="flip" onerror="this.onerror=null;this.src='https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg';"/>
                        </span>
                    </div>
                    <div class="col-md-12 p-0" collapse-body="" style="">
                        <div class="viewResponse col-12 p-0">
                            <div class="p-2 responseCard">
                                <div class="bg-gray p-3 rounded-lg">
                                    <div>
                                        <p class="sdlms-text-white-16px text-dark font-weight-bold m-0">Answered by:</p>
                                        <p class="sdlms-text-white-14px text-dark mt-1">
                                            Deep learning is a type of machine learning and artificial intelligence (AI) that imitates the way humans gain certain types of knowledge. Deep learning is an important element of data science, which includes
                                            statistics and predictive modeling.
                                        </p>
                                    </div>
                                    <div class="d-flex justify-content-between mt-2 sdlms-text-white-12px text-dark font-weight-bold">
                                        <p class="m-0">Marks : <input type="number" step="1" max="10" value="1" name="quantity" class="quantity-field border-0 text-center w-25" /></p>
                                    </div>
                                    <div class="d-flex justify-content-between mt-2 sdlms-text-white-12px text-dark font-weight-bold">
                                        <p class="m-0">Remarks : <input type="text" step="1" class="quantity-field border-0 text-center" /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            }
        }
        return component;
    }
    static viewQuiz() {
        let component = {
            question: () => {
                return `<div class="question pb-4">
                <div class="sdlms-section rounded-0 section-collapsed">
                    <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between rounded-0" collapse="" style="background: #ddd;">
                        <div id="project_title" class="d-flex align-items-center sdlms-text-white-20px" style="color: var(--primary-sub-text-color); font-weight: 700;">Question 1 : What is Deep Learning?</div>
                        <span class="sdlms-floating-right">
                            <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon="" alt="" class="flip rotate" onerror="this.onerror=null;this.src='https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg';">
                        </span>
                    </div>
                    <div class="col-md-12 p-0" collapse-body="" style="display: none;">
                        <div class="viewResponse col-12 p-0"></div>
                    </div>
                </div>
            </div>`
            },
            responseCard: () => {
                return `<div class="p-2 responseCard">
                <div class="bg-gray p-3 rounded-lg">
                    <div>
                        <p class="sdlms-text-white-16px text-dark font-weight-bold m-0">Answered by:</p>
                        <p class="sdlms-text-white-14px text-dark mt-1">
                            Deep learning is a type of machine learning and artificial intelligence (AI) that imitates the way humans gain certain types of knowledge. Deep learning is an important element of data science, which includes statistics and
                            predictive modeling.
                        </p>
                    </div>
                    <div class="d-flex justify-content-between mt-2 sdlms-text-white-12px text-dark font-weight-bold">
                        <p class="m-0">Marks :3</p>
                    </div>
                    <div class="d-flex justify-content-between mt-2 sdlms-text-white-12px text-dark font-weight-bold">
                        <p class="m-0">Remarks : Abhishek did his task really well, I like his copy paste code but he understands now how functionality works for it.</p>
                    </div>
                </div>
            </div>`
            },
        }
        return component;
    }
}