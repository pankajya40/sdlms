
let todoTemplates = {

    container: () => {
        return `<div class="sdlms-section rounded-0 session-view sdlms-form-elements">
        <div class="sdlms-section-header rounded-0 shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between" collapse="">
            <div id="project_title" class="d-flex align-items-center sdlms-text-white-20px">To Do</div>
            <span class="sdlms-floating-right">
                <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg" collapse-icon="" alt="" onerror="this.onerror=null;this.src='https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg';" class="">
            </span>
        </div>
        <div class="col-md-12 m-0 p-0" collapse-body="" style="">
            <div id="journalSec" class="sdlms-section-body p-2 rounded-0 h-100">
                <div class="search-add-sec row d-flex justify-content-between">
                    <div class="col-md-8 input-group w-50 m-2 rounded-lg border-0">
                        <div class="form-outline">d
                            <input type="search" id="form1" class="form-control" placeholder=" Search" style="font-family: 'Poppins', sans-serif, FontAwesome;">
                        </div>
                        <svg class="ml-2 p-1" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.1042 24.8834L21.8424 24.9102C22.3873 24.9121 22.8284 25.3684 22.8284 25.9277V30.8436C22.8284 31.4049 22.5096 31.9127 22.0129 32.1475L14.0809 35.8721C13.8955 35.958 13.6991 36 13.5026 36C13.2413 36 12.98 35.9236 12.7521 35.7728C12.3536 35.5094 12.1127 35.055 12.1127 34.5682V25.901C12.1127 25.3378 12.5575 24.8815 13.1042 24.8834ZM32.1693 0C34.2857 0 36 1.76589 36 3.94606V6.70276C36 7.76039 35.5867 8.77602 34.8528 9.51674L23.1438 21.3606C22.9418 21.5668 22.6675 21.6814 22.3839 21.6795L12.5801 21.6489C12.2817 21.6489 11.9981 21.521 11.7943 21.2976L1.03413 9.46328C0.368803 8.73211 0 7.76612 0 6.76385V3.94797C0 1.7678 1.71429 0 3.83073 0H32.1693Z" fill="#D9D9D9" fill-opacity="0.25"></path>
                            <path d="M13.1027 25.3834L13.1024 25.3834C12.8463 25.3826 12.6127 25.6007 12.6127 25.901V34.5682C12.6127 34.8913 12.7728 35.1871 13.0278 35.3557L13.028 35.3558C13.1736 35.4522 13.3389 35.5 13.5026 35.5C13.6268 35.5 13.751 35.4737 13.8694 35.419C13.8698 35.4188 13.8702 35.4186 13.8706 35.4185L21.7992 31.6955C21.7994 31.6954 21.7995 31.6953 21.7997 31.6952C22.1176 31.5447 22.3284 31.2155 22.3284 30.8436V25.9277C22.3284 25.6303 22.0968 25.4112 21.8409 25.4102C21.8408 25.4102 21.8407 25.4102 21.8407 25.4102M13.1027 25.3834L21.8424 24.9102L21.8407 25.4102M13.1027 25.3834L21.8407 25.4102M13.1027 25.3834L21.8407 25.4102M34.4976 9.16482L34.4972 9.16521L22.7882 21.0091L22.7866 21.0107C22.6783 21.1213 22.5336 21.1805 22.3873 21.1795L22.3855 21.1795L12.5816 21.1489H12.5801C12.4266 21.1489 12.2759 21.0834 12.1639 20.9609C12.1638 20.9608 12.1637 20.9607 12.1636 20.9606L1.40408 9.12692L1.40394 9.12678C0.824104 8.48955 0.5 7.64423 0.5 6.76385V3.94797C0.5 2.02954 2.00461 0.5 3.83073 0.5H32.1693C33.9957 0.5 35.5 2.02795 35.5 3.94606V6.70276C35.5 7.63108 35.137 8.5195 34.4976 9.16482Z" stroke="black" stroke-opacity="0.75"></path>
                        </svg>
                    </div>
                    
                    <a data-toggle="modal" href="#myModal2" class="col-md-2 btn btn-white border-dark show-add-modal rounded-lg h-25 m-2">Add</a>
                </div>
                
            </div>
        </div>
    </div> `
    },
    details: () => {
        return `<div class="p-2">
        <div class="bg-gray p-1 rounded-lg">
            <div class="row mt-2">
                <div class="col-6 pr-2"><div class="ml-3 sdlms-text-white-16px text-dark font-weight-bold m-0">1. ToC Wireframes</div></div>
                <div class="col-6 d-flex justify-content-end">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" class="mr-2">
                        <rect width="22" height="22" rx="5" fill="#D9D9D9" fill-opacity="0.5"></rect>
                        <path d="M6.7925 7.79492L11 11.7568L15.2075 7.79492L16.5 9.01464L11 14.2049L5.5 9.01464L6.7925 7.79492Z" fill="black" fill-opacity="0.75"></path>
                    </svg>
                </div>
                <div class="sdlms-text-white-12px text-dark ml-5 pl-4" style="color: rgba(0, 0, 0, 0.5) !important;">#tag #tag #tag</div>
            </div>
            <div class="d-flex row">
                <div class="col-4 pr-2 ml-3">
                Task Status
                </div>
                <div class="col-4 pr-2">
                Priority
                </div>
                <div class="col-3 d-flex p-0 pb-2 align-items-end justify-content-end">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                        <path d="M0.589844 1.41L1.99984 0L7.99984 6L1.99984 12L0.589844 10.59L5.16984 6L0.589844 1.41ZM6.58984 1.41L7.99984 0L13.9998 6L7.99984 12L6.58984 10.59L11.1698 6L6.58984 1.41Z" fill="#0029FF"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div> `
    },
    modal: (id) => {
        return `<div class="modal-content modal" style="right: 300%; height: 45%; width: 150%;" id="modal-${id}">
        <div class="modal-header">
            <h4 class="modal-title">Add Your Task Here</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        </div>
        <div class="modal-body">
            <div>
                <p class="sdlms-text-black-14px m-0">Name</p>
                <div class="">
                    <input class="p-2 w-100 border-0 bg-gray rounded-lg input-text-popup mb-1" style="height: 40px;" type="text" placeholder="Name of task">
                    <input class="p-2 w-100 border-0 bg-gray rounded-lg input-text-popup-small mb-3" style="height: 25px;" type="text" placeholder="#addhashtag">
                </div>
                <div class="d-flex">
                    <div class="pr-2">
                        <select id="custom-commit-dropdown" class="custom-select border-0" style="font-size: var(--sdlms-font-size-18); border-radius: 0.5rem; box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);">
                            <option selected="">Task Status</option>
                            <option value="1" class="dropdown-item">Complete</option>
                            <option value="2" class="dropdown-item">Ongoing</option>
                            <option value="3" class="dropdown-item">Reschedule</option>
                            <option value="4" class="dropdown-item">To be planned</option>
                        </select>
                    </div>
                    <div class="">
                        <select class="custom-select border-0" style="font-size: var(--sdlms-font-size-18); border-radius: 0.5rem; box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);">
                            <option selected="">Select Priority</option>
                            <option value="1" class="dropdown-item">Hackathon</option>
                            <option value="2" class="dropdown-item">Learning</option>
                            <option value="3" class="dropdown-item">Progress</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <button class="mt-2 border-0 bg-white sdlms-text-black-16px">Reason +</button>
                    </div>
                    <div>
                        <button class="border-0 bg-white sdlms-text-black-16px">Journal Entry +</button>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="submit" id="createProject" class="sdlms-button button-primary button-lg d-flex align-items-center">Add to Task List</button>
                </div>
            </div>
        </div>
    </div> `
    },
}

class Todo {
    constructor(options) {
        this.target = $(options.target);
        this.data = options.data;
    }

    render(){
        this.id = app.unique();
        this.target.html(todoTemplates.container(todoTemplates.details() ))
        this.target.append(todoTemplates.modal(this.id));
        this.events();
    }

    events(){
        let $that = this;
        this.target.on('click','.show-add-modal',function(){
            $(`#modal-${$that.id}`).modal('show')
        })
    }
}
