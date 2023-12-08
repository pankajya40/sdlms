class Template {
    constructor() {}
    static polls(data = {}) {
        let components = {
            checkbox: (data) => {
                data
                return `  <div class="form-group form-check col-6" student-checkbox data-fullname="${data.fullname}" data-displayname="${data.displayname}" data-username="${data.username}" data-uid="${data.uid}">		
								<input type="checkbox" class="form-check-input custom-sdlms-checkbox" name="student" value="${data.uid}" id="student-filter-${data.uid}-${data.index}">		
								<label class="form-check-label" for="student-filter-${data.uid}-${data.index}">${data.fullname || data.displayname || data.username}</label> 
						</div>`
            },
            filter: (data) => {
                return `<div class="w-100 border-bottom d-flex">
							<div class="col-3 py-2 d-flex justify-content-center sdlms-menu">
								<b class="nowrap">Showing : </b>
							</div>
							<div class="col-3 py-2 d-flex dropdown-toggle cursor-pointer justify-content-center polls-filter-dropdown sdlms-menu">
								<span class="filter-label">${(data.statuses.filter(e => e.selected) || [{}])[0].name || ''}</span>
								<div class="sdlms-menu-items">
									${data.statuses.map(e => `<a class="dropdown-item  cursor-pointer ${e.selected ? 'active' : ''} sdlms-menu-item" filter-status data-value="${e.value}">${e.name}</a>`).join('')}
								</div>
							</div>
							<div class="col-4  py-2  d-flex dropdown-toggle cursor-pointer  polls-filter-dropdown justify-content-center sdlms-menu">
								<span class="filter-label">${(data.times.filter(e => e.selected) || [{}])[0].name || ''}</span>
								<div class="sdlms-menu-items">
									${data.times.map(e => `<a class="dropdown-item cursor-pointer ${e.selected ? 'active' : ''} sdlms-menu-item" filter-time data-value="${e.value}">${e.name}</a>`).join('')}
								</div>
							</div>
							<div class="col-2  py-2 d-none cursor-pointer polls-filter-dropdown justify-content-center sdlms-menu">
								<span class="filter-label">Students</span>
								<div class="sdlms-menu-items">
									${data.students.map(e => `<a class="dropdown-item cursor-pointer sdlms-menu-item">${Template.polls.checkbox(e)}</a>`).join('')}
								</div>
							</div>
							<div class="align-items-center border-left col-1 d-none justify-content-center cursor-pointer px-0 sdlms-secodary-bg sdlms-text-white-16px secondary-header" publish-poll-group>
								<b class="text-center"><i class="fas fa-bullhorn  " ></i></b>
							</div>
							<div class="align-items-center border-left col-2 d-flex justify-content-center cursor-pointer px-0 sdlms-secodary-bg sdlms-text-white-16px secondary-header" create-custom-poll>
								<b class="text-center"><i class="fas fa-plus"></i></b>
							</div>
						</div>`
            },
            tray: {
                header: (data) => {
                    return `<div id="tray" class="bg-dark text-center mt-3 rounded-top p-1">
                    <h1 class="sdlms-text-white-20px my-2">Polls</h1>
                  </div>`;
                },
                container: (data, html = "") => {
                    return `<div class="position-relative ${data.classes ? data.classes : ''}">${html}</div>`;
                },
                tabGroup: (data) => {
                    return `<ul class="nav nav-tabs d-flex justify-content-between" role="tablist">
							${data.map((item) => {
                        return `<li class="nav-item d-flex align-items-center justify-content-center sdlms-polls-tab" data-group="${item.type}" role="presentation">
									<a class="nav-link sdlms-text-black-17px text-center text-capitalize"  id="${item.id}-tab" data-toggle="tab" href="#${item.id}" role="tab" aria-controls="${item.id}" aria-selected="true">${item.title}</a>
							 	 </li>`
                    }).join('')}
							</ul>`
                },
                filter: (data,html="") =>{
                    return  `
                    <h3 class="poll-time-heading text-center m-3">${data.heading}</h3>
                    <div class="p-2 polls-selection-container py-2 d-flex dropdown-toggle cursor-pointer justify-content-center polls-filter-dropdown sdlms-menu">
                    <span class="filter-label">${data.default}</span>
                    <div class="sdlms-menu-items">
                        ${data.times.map(e => `<a class="dropdown-item  cursor-pointer ${e.selected ? 'active' : ''} sdlms-menu-item" filter-status data-value="${e.value || e.group}">${e.name}</a>`).join('')}
                    </div>
                </div>`
                },
                roundedCard: (data, html ="") => {
                    return ` <div class="card p-3 pb-1">
                    <div class="card rounded p-3">${html}</div></div>`
                },
                radioInput: (data,html="") =>{
                    return  `<div class="${data.classes}">
                    <input id="${data.id}" class="form-check-input" type="radio" name="assets" steps value="${data.value}" 
         >
                    <label class="form-check-label ms-3" for="flexRadioDefault2">
                        ${data.value[0].toUpperCase() + data.value.slice(1)}
                    </label></div>`

                },
                bottomNavbar: (data) =>{
                    return `
                    <div class="position-sticky p-2 d-flex justify-content-around w-100 bottom-navbar">
                    ${data.teacher?`<div name='new'>Not Published</div>`:''}
                    <div name='published'>Ongoing</div>
                    <div name='completed'>Completed</div>
                    ${data.teacher?`
                    <button  to-create-poll-page id="button-create-poll" type="button" class="btn sdlms-text-white-18px px-3 "><i
                                    class="fa fa-solid fa-plus"></i>  	&nbsp;Create Polls</button>`:''}
                    </div>`
                },
                createHeader:(data) => {
                    return `<div class="row border-bottom pb-2">
                    <div class="col-4 text-start ps-3 pt-1">
                      <i class="fa-solid fa-arrow-left"></i>
                    </div>
                    <div class="col-4 text-center font-weight-medium font-text-black-20px">
                      ${data.header}
                    </div>
                    <div class="col-4 text-end pe-3 pt-1">
                              <i class="fa-solid fa-trash"></i>
                    </div>
                      </div> 
                      <div id="" class=" mt-5">
                    <form class="create-poll-form" action=""></form></div>`
                },
                pollOption: (value=null,html="") =>{
                    return `<input type="text" class="form-control my-3 py-2 ps-3 sdlms-text-tertiary-16px"
                    id="exampleFormControlInput1" placeholder=" &nbsp; Add Option 1"
                    style="font-family:Arial, FontAwesome" poll-option>`
                },
                socialPollSelection:(data,html="")=>{
                    return `<h3 class="poll-time-heading text-center m-3">${data.heading}</h3>
                    <div class="d-flex justify-content-center dropdown m-3">
                        <button class="btn btn-secondary dropdown-toggle px-5 py-2" type="button" id="timebutton"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            ${data.default}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        ${data.times.map((e) => `<li><a class="dropdown-item" href="#">${e.name}</a></li>`).join('')}
                        </ul>
                    </div>`
                },
                tabContainerGroup: (data) => {
                    return `<div class="tab-content poll-group-tab-content">
							${data.map((item) => {
                        return `<div poll-group data-group-type="${item.type}" class="tab-pane ${item.classes ? item.classes : ''} fade" id="${item.id}" role="tabpanel" aria-labelledby="${item.id}-tab">
									<div class="sdlms-tab-polls-container w-100"></div>
								</div>`
                    }).join('')}</div>`
                },
                pollListItem: (data) =>{
                    let bannerTime = data.closedAt || data.publishedAt || data.createdAt
                    data.voteCount = data.voteCount? data.voteCount: []
                    data.votes = data.votes || []
                    data.students = data.students || []
                    return ` 
                    <div class='mb-2 pt-2'>
                    <div class="poll-list-item pb-1" data-pid=${data.pid} data-group=${data.group} data-status=${data.status}>
                    <div class="header p-3 align-items-center d-flex justify-content-space">
                     <div poll-heading>${data.data.question || data.content}</div>
                     <div class='d-flex align-items-center response-button-container'>
                     <div class='responses text-center d-flex flex-column'>
                        <div>Responses</div>
                        <div><span total-votes>${data.votes.length}</span> of <span total-members>${data.totalCount || 0}</span></div>
                     </div>
                     <div class='poll-button-container'>

                     <button id="button-create-poll" class="btn px-3 sdlms-text-white-18px" id="" poll-action-button>${data.status == 'new'?'Publish':data.status=='published'?'Stop':'View'}</button>
                     <i class="fa fa-angle-down" aria-hidden="true"></i>
                     </div>
                     </div>
                     </div>
                    
                    <div class="poll-option-list d-none mx-2" data-pid="${data.pid}">
      
                    ${(data.data.options||[]).map((e,i) => 
                        `<div class="p-2 mb-2 poll-option ${data.selected!=undefined && data.selected===i?'selected-option':''}" data-pid=${data.pid} data-option-index=${i} id="f1">
                            <div class="d-flex justify-content-between pb-2">
                                <div class='vote-content'>${e}</div>
                                <div class='vote-count'>${data.voteCount[i] || 0 }</div>
                            </div>
                            <div class="vote-bar w-100">
                                <div style='height:10px; width:${data.totalCount==0?'0':Math.round(data.voteCount[i]||0)*100/data.totalCount}%'></div>
                            </div>
                        </div>`).join('')}
                        
                    <div class='${data.status=='new'?'d-flex':'d-none'} py-2 justify-content-around' edit-poll>
                        <button id="button-create-poll" class="btn px-3 sdlms-text-white-18px edit-poll-button">Edit Poll</button>
                        <button id="button-create-poll" class="btn px-3 d-none sdlms-text-white-18px cancel-edit-poll">Cancel Edit</button>
                    </div>

                    <div class='${data.status=='published'?'d-flex':'d-none'} justify-content-center'>
                        <button id="button-create-poll" class="btn px-3 sdlms-text-white-18px" id="" alternate-poll-button>Stop Poll</button>
                    </div>

                    <div class='students-non-voted m-2 ${data.status=='new'?'d-none':''} ${data.votes.length == data.totalCount?'d-none':''}' >
                        Students who didn't respond: ${data.students.map(e => `<span data-uid=${e.uid}>${e.username}</span>`).join(', ')}
                    </div>
                    </div>
                    </div>
                    <div class="sdlms-text-tertiary-12px pr-1 pb-1 text-right">${moment(bannerTime).fromNow()}</div>
                  </div>`
                },
                groupPollListItem: (data, html='') => {
                    let bannerTime = data.closedAt || data.publishedAt || data.createdAt
                    data.voteCount = data.voteCount? data.voteCount: []
                    data.votes = data.votes || []
                    data.students = data.students || []
                    return `
                    <div class='mb-2 pt-2'>
                    <div class="poll-list-item pb-1" group-poll-item data-group=${data.group} data-status=${data.status} data-pid=${data.pid}>
                    <div class="header p-3 align-items-center d-flex justify-content-space">
                     <div poll-heading>Here are Everyone's <span class='group-name'>${data.group[0].toUpperCase() + data.group.slice(1)} Threads</span></div>
                     <div class='d-flex align-items-center response-button-container'>
                     <div class='responses text-center d-flex flex-column'>
                        <div>Responses</div>
                        <div><span total-votes>${data.votes.length || data.voteCount.reduce((a, b) => a + b, 0) ||data.responseCount || 0}</span> of <span total-members>${data.totalCount || 0}</span></div>
                     </div>
                     <div class='poll-button-container'>

                     <button id="button-create-poll" class="btn px-3 sdlms-text-white-18px" id="" poll-action-button>${data.status == 'new'?'Publish':data.status=='published'?'Stop':'View'}</button>
                     <i class="fa fa-angle-down" aria-hidden="true"></i>
                     </div>
                     </div>
                     </div>
                    
                    <div class="poll-option-list d-none mx-2">
      
                    ${(data.data.options||[]).map((e,i) => 
                        `<div class="p-2 mb-2 poll-option ${data.selected!=undefined && data.selected===i?'selected-option':''}" data-pid=${e.pid} data-option-index=${i} id="f1">
                            <div class="d-flex justify-content-between pb-2">
                                <div class='vote-content'>${e.content}</div>
                                <div class='vote-count'>${data.voteCount[i] || 0 }</div>
                            </div>
                            <div class="vote-bar w-100">
                                <div style='height:10px; width:${data.totalCount==0?'0':Math.round(data.voteCount[i]||0)*100/data.totalCount}%'></div>
                            </div>
                        </div>`).join('')}

                        <div class='${data.status=='published'?'d-flex':'d-none'} justify-content-center'>
                            <button id="button-create-poll" class="btn px-3 sdlms-text-white-18px" id="" alternate-poll-button>Stop Poll</button>
                        </div>

                        <div class='students-non-voted m-2 ${data.status=='new'?'d-none':''} ${data.votes.length == data.totalCount?'d-none':''}' >
                            Students who didn't respond: ${data.students.map(e => `<span data-uid=${e.uid}>${e.username}</span>`).join(', ')}
                        </div>
                    </div>
                    </div>
                    <div class="sdlms-text-tertiary-12px pr-1 pb-1 text-right">${moment(bannerTime).fromNow()}</div>
                  </div>`
                },
                pollListOption: (data, html ='') => {
                    return `
                    <div class="p-2 mb-2 poll-option" id="f1">
                            <div class="d-flex justify-content-between pb-2">
                                <div>${data.content || ''}</div>
                                <div>1</div>
                            </div>
                            <div class="vote-bar w-100" data-pid=${data.pid} data-option-index=${data.index}>
                                <div style='height:10px'></div>
                            </div>
                        </div>
                    </div>
                    </div>
                  </div>`
                },
                pollListContainer: (data, html = '') => {
                    const header = data.status=='new'?"Not Published":data.status == 'published'?'Ongoing':'Completed'
                    return `<div class='container' data-status=${data.status} >
                    <h5 class='mb-2'>${header}</h5>
                    <div class="list-group poll-container  ${data.classes ? data.classes : ''}" poll-list-container-${data.status}>
                    ${html}
                    </div>
                    </div>`
                },
                studentPollListItem: (data,html='') => {
                    let bannerTime = data.closedAt || data.publishedAt || data.createdAt
                    data.votes = data.votes || []
                    return `
                    <div class='mb-2 pt-2'>
                        <div class="poll-list-item " data-pid=${data.pid} data-group=${data.group} data-status=${data.status} ${data.modal?'modal-poll-list':''}>
                        <div class="header p-3 align-items-center d-flex justify-content-${data.modal?'center':'space'}">
                     <div poll-heading>${data.data.question || data.content}</div>
                     <div class='${data.modal?'d-none':"d-flex"} align-items-center  response-button-container'>
                     <div class='responses text-center  flex-column'>
                        <div>Responses</div>
                        <div><span total-votes>${data.votes.length}</span> of <span total-members>${data.totalCount || 0}</span></div>
                     </div>
                     <div class='poll-button-container'>

                     <button id="button-create-poll" class="btn px-3 sdlms-text-white-18px" id="" poll-action-button>${data.status == 'published'?'Answer':'View'}</button>
                     <i class="fa fa-angle-down" aria-hidden="true"></i>
                     </div>
                     </div>
                    
                     </div>
                    
                    <div class="poll-option-list ${data.modal?"":'d-none'} mx-2" data-pid="${data.pid}" data-votted="${data.selected!=null?"true":"false"}">
      
                    ${(data.data.options||[]).map((e,i) => 
                        `<div class='student-option d-flex p-3 mb-2 align-items-center justify-content-start ${data.selected!=undefined && data.selected===i?'selected-option':''}' data-option-index=${i}>
                            <i class="fa-solid fa-xs fa-circle"></i>
                            <div class='mx-3 overflow-auto'>${e}</div>
                        </div>`).join('')}

                     <div class='${data.status=='published'?'d-flex':'d-none'} py-2 justify-content-center'>
                        <button id="button-create-poll" ${data.selected!=null?'disabled':''} submit-vote-button class="btn px-5 sdlms-text-white-18px" id="">Submit</button>
                        </div>
                    </div>
                    
                    </div>
                    <div class="${data.modal?'d-none':''} sdlms-text-tertiary-12px pr-1 pb-1 text-right">${moment(bannerTime).fromNow()}</div>
                  </div>`
                },
                studentGroupPoll: (data) => {
                    let bannerTime = data.closedAt || data.publishedAt || data.createdAt
                    data.votes = data.votes || []
                    return `<div class='mb-2 pt-2'>
                    <div class="poll-list-item" data-group=${data.group} data-pid=${data.pid} data-status=${data.status} ${data.modal?'modal-poll-list':''}>
                    <div class="header p-3 align-items-center d-flex justify-content-${data.modal?'center':'space'}">
                 <div poll-heading>Here are Everyone's <span class='group-name'>${data.group[0].toUpperCase() + data.group.slice(1)} Threads</span></div>
                 
                 <div class='${data.modal?'d-none':'d-flex'} align-items-center response-button-container'>
                 <div class='responses text-center d-flex flex-column'>
                    <div>Responses</div>
                    <div><span total-votes>${data.votes.length || data.responseCount || 0}</span> of <span total-members>${data.totalCount || 0}</span></div>
                 </div>
                 <div class='poll-button-container'>

                 <button id="button-create-poll" class="btn px-3 sdlms-text-white-18px" id="" poll-action-button>${data.status == 'new'?'Publish':data.status=='published'?'Answer':'View'}</button>
                 <i class="fa fa-angle-down" aria-hidden="true"></i>
                 </div>
                 </div>
                 </div>
                
                <div class="poll-option-list ${data.modal?"":'d-none'} mx-2" data-votted="false">
  
                ${(data.data.options||[]).map((e,i) => 
                    `<div class='student-option d-flex p-3 mb-2 align-items-center justify-content-start' data-pid=${e.pid} data-option-index=${i}>
                        <i class="fa-solid fa-xs fa-circle"></i>
                        <div class='mx-3 overflow-auto'>${e.content}</div>
                    </div>`).join('')}

                 <div class='${data.status=='published'?'d-flex':'d-none'} py-2 justify-content-center'>
                    <button id="button-create-poll" submit-vote-button class="btn px-5 sdlms-text-white-18px" id="">Submit</button>
                    </div>
                </div>
                
                </div>
                <div class="sdlms-text-tertiary-12px pr-1 pb-1 text-right">${moment(bannerTime).fromNow()}</div>
              </div>`
                },
                list: (data, index) => {
                    data.creator = data.creator || {};
                    return `<li class="list-group-item w-100 d-flex sdlms-single-poll selected single-selectable-poll flex-wrap justify-content-between ${data.classes ? data.classes : ''}" data-pid="${data.pid}" poll-list>

							<div class="d-flex w-75 align-items-center">
								<img onerror="${app.IMG_ERROR()}" class="social-poll-pic mr-3" src="${data.creator.picture}">
								<div>
									<div class="polls-user-name">${data.creator.fullname || data.creator.displayname || data.creator.username}</div>
									<div class="sdlms-text-tertiary-12px">${moment(data.createdAt).fromNow()}</div>
								</div>
							</div>
							<div class="w-25 text-right">
								<span data-pid="${data.pid}" class="d-none ${data.status == 'new' ? 'd-none' : ''}"> <i class="fas fa-users"></i> <span poll-vote-count="${data.pid}">${(data.votes || []).length}</span></span>
								<span data-pid="${data.pid}" class="d-none ${data.status != 'new' ? 'd-none' : ''}"> <span poll-vote-count="${data.pid}"> -- </span></span>
							</div>
							<div class="text-capitalize sdlms-font-open-sans w-100 sdlms-text-black-14px py-3" poll-content>${data.content}</div>
							</li>`;
                },
                group: (data, html = "") => {
                    return `<div class="col-12 ${data.classes ? data.classes : ''}" >
						<div class="publish cursor-pointer"  publish-poll-group>Publish ${data.type}</div>
						<div>${html}</div>
					</div>`
                }
            },
            polls: {
                header: (data) => {
                    return  `<div id="tray" class="bg-dark text-center mt-3 rounded-top p-1">
                    <h1 class="sdlms-text-white-20px my-2">Polls</h1>
                  </div>`;
                },
                container: (data, html = "") => {
                    return `<ul class="list-group poll-container ${data.classes ? data.classes : ''}">${html}</ul>`;
                },
                modal: (data, html='') => {
                    return `<div class="fade show display-block poll-modal" id="${data.id}" poll-vote-modal tabindex="-1" aria-labelledby="${data.id}Label" aria-hidden="true">
						<div class="modal-dialog-centered text-center">
						  <div class="poll-modal-content w-100">
							<div class="poll-modal-header p-2">${data.title}</div>
							<div class="poll-modal-body p-2">
                            ${html}
                           
                        <div class='pb-1 skip-poll-button'>Skip</div>
					</div>
				</div>
				</div>
					</div>`
                },
                custom: (data) => {
                    return `
						<form class="custom-poll-response-form">
							<div class="form-group"><label>Question: ${data.content || ''}</label></div>
							<div class="sdlms-polls-options">
								${data.data.options.map((e, i) => {
                        return `<div class="form-check">
												<input class="form-check-input" type="radio" name="response" id="custom-response-${data.pid}-${i}" value="${i}">
												<label class="form-check-label" for="custom-response-${data.pid}-${i}">${app.numberToAlphabates(i + 1)} : ${e}</label>
						 					</div>`
                    }).join('')}
							</div>
							<div class="d-flex justify-content-end mt-3"><button class="sdlms-button button-primary button-lg" type="submit">Submit</button></div>
						</form>
					`;
                },
                list: (data) => {
                    return `<li class="list-group-item w-100 d-flex justify-content-between ${data.classes ? data.classes : ''}" data-pid="${data.pid}" poll-list>
								<span class="text-capitalize"> <img src="${data.creator.profile}" class="poll-list-creator"> ${data.content}</span> <span vote-poll class="cursor-pointer" data-tid="${data.tid}" data-group="${data.group}" data-pid="${data.pid}">upvote <span poll-vote-count="${data.pid}">0</span></span>
							</li>`;
                }
            },
            graph: {
                container: (data) => {
                    return `
					<div class="w-50 p-3 ${data.classes ? data.classes : ''}" data-id="${data.id}" >
						<div class="form-group form-check d-none col-12">		
							<input type="checkbox" class="form-check-input custom-sdlms-checkbox" name="useGraphFilter" value="1" id="useGraphFilter-${data.id}">		
							<label class="form-check-label" for="useGraphFilter-${data.id}">Update Graph on filter Change</label> 
						</div>
						<div class="owl-carousel polls-graph-canvas">
							<div class="item"><canvas id="graph-canvas-groups-${data.id}" width="400" height="400"></canvas></div>
							<div class="item"><canvas id="graph-canvas-polls-all-${data.id}" width="400" height="400"></canvas></div>
							<div class="item"><canvas id="graph-canvas-list-polls-${data.id}" width="400" height="400"></canvas></div>
						</div>
					</div>`
                },
                canvas: ($id) => {
                    return `<canvas id="graph-canvas-${$id}" width="400" height="400"></canvas>`;
                }
            },
            custom: {
                container: (data) => {
                    return `<div class="col-12 ${data.classes ? data.classes : ''}" style="${data.style || ''}" id="${'contianer-' + data.id}" ><form class="py-3 sdlms-form-elements" id="${data.id}">
						${data.html || ''}
					</form></div>`
                },
                canvas: (data) => {
                    return `<canvas id="${data.id}" width="400" height="200"></canvas>`;
                },
                steps: {
                    one: (data = {}) => {
                        return `
						<div sdlms-step>
							<div class="form-group">
								<label >Number of Options</label>
								<input type="hidden" value="alphabets" name="format">
								<input type="number" name="options" value="${data.value || ''}" min="0" class="form-control pl-3">
							</div>
							<div class="d-flex justify-content-end">
								<button type="button" class="close-custom-polls button-primary sdlms-button button-lg">Cancel</button>
								<button type="button" class="polls-step-2 ml-2 button-primary sdlms-button button-lg">Next</button>
							</div>
					</div>`
                    },
                    two: (data = {}, option = () => { }) => {
                        return ` 
						<div sdlms-step>
							<div class="form-group">
								<label>Question</label>
								<textarea class="form-control" name="question" rows="4">${data.content || ''}</textarea>
							</div>
							<div class="sdlms-polls-options">
									${(data.data || {}).options ?
                                ` < ul class = "list-group border-top border-bottom  px-2 rounded-0 sdlms-polls-option-container" > $ {
								data.data.options.map((e, i) => option(i, e)).join('')
							} < /ul>`: ''
                            } < /div>  </div > `
                    }
                },
                option: (index, value) => {
                    return ` < li class = "list-group-item border-0 py-2 px-0 position-relative sdlms-polls-option align-items-center d-flex" >
						<
						div class = "sdlms-polls-option-index pr-3" > $ {
							app.numberToAlphabates(index + 1)
						} < /div> <input type="text" name="options[${index}]" class="form-control" value="${value}" placeholder="Option" >  <div class = "remove-sdlms-polls-option  pointer-cursor text-center pl-3" > <i class = "fas fa-times" > </i > < /div> <
						/li>`
                },
                list: (data, index) => {
                    data.creator = data.creator || {};
                    return `<li class="list-group-item w-100 d-flex sdlms-single-poll flex-wrap justify-content-between ${data.classes ? data.classes : ''}" data-pid="${data.pid}" custom-poll-list>
							<span custom-poll-list-index>${app.numberToAlphabates(index ? index : ($('[data-group-type="custom"].tab-pane').find('.sdlms-single-poll').length + 1))}</span>
							<div class="d-flex pl-2 w-75 align-items-center">
								<img onerror="${app.IMG_ERROR()}" class="social-poll-pic mr-3" src="${data.creator.picture}">
								<div>
									<div class="polls-user-name">${data.creator.fullname || data.creator.displayname || data.creator.username}</div>
									<div class="sdlms-text-tertiary-12px">${moment(data.createdAt).fromNow()}</div>
								</div>
							</div>
							<div class="w-25 d-flex align-items-center justify-content-end text-right">

							    <span data-pid="${data.pid}"> 
							    	<span> <i class="fas fa-edit  cursor-pointer mr-2" edit-poll="${data.pid}"></i></span>
							    </span>

								<span data-pid="${data.pid}" class="${(data.status != 'new') ? '' : 'd-none'}"> 
									<i class="fa-poll-h cursor-pointer mr-2 fas" view-poll-response="${data.pid}"></i>
								</span>

								<span class="${data.status == 'published' ? '' : 'd-none'}"> 
									<span> <i class="fas fa-check-circle mr-2 cursor-pointer" complete-poll="${data.pid}"></i></span>
								</span>

								<span data-pid="${data.pid}" class="${data.status == 'new' ? '' : 'd-none'}"> 
									<span> <i class="fas fa-bullhorn mr-2 cursor-pointer" publish-poll="${data.pid}"></i></span>
								</span>

								<span class="${data.status == 'new' ? 'd-none' : ''}">
									<i class="fas fa-users mr-1"></i> <span  poll-vote-count="${data.pid}">${(data.votes || []).length}</span>
								</span>

							</div>
							<div class="text-capitalize sdlms-font-open-sans w-100 py-3">${data.content}
							<div class="pl-1 mt-1">${((data.data || {}).options || []).map((e, i) => ` < div class = "sdlms-text-black-14px" > $ {
							app.numberToAlphabates(i + 1)
						}: $ {
							e
						} < /div>`).join('')}</div >

						<
						/div> <
						div edit - container class = "w-100"
					data - pid = "${data.pid}" > < /div> <
						div $ {
							data.status == 'new' ? 'new' : 'response'
						} - container class = "w-100"
					data - pid = "${data.pid}" > < /div>

						<
						/li>`;

                },
                actions: (edit = false, data = {}) => {
                    return `
					<div class="sdlms-polls-action-buttons d-flex justify-content-end pt-3">
					<button type="button" class="close-custom-polls button-secondary sdlms-button button-lg ml-2"><i class="fas fa-times"></i></button>
					<button type="button" class="${edit ? 'd-none' : ''} button-primary ml-2 button-lg sdlms-button sdlms-polls-action-button-prev"><i class="fas fa-arrow-left"></i></button>
					<button type="button" class=" button-lg button-primary ml-2 sdlms-button sdlms-polls-action-button-add"><i class="fas fa-plus"></i></button>
					<button type="button" class=" button-lg button-primary ml-2 sdlms-button sdlms-polls-action-button-save"><i class="fas fa-save"></i></button>
					<button type="button" class=" button-lg button-primary ml-2 ${data.status != 'new' ? 'd-none' : ''} sdlms-button sdlms-polls-action-button-publish"><i class="fas fa-bullhorn"></i></button>
					</div>
					`
                }
            }
        }
        return components;
    }
    static threadBuilder($that) {
        let components = {
        thread() {
            let components = {
                header: (meta = {}, show = !true) => {
                    return `<div class="sdlms-thread-header d-${!show ? 'none' : 'flex'} col-12 py-2 position-relative sdlms-text-black-25px font-weight-500">
                                <span contenteditable header-title>${meta.title || 'Personal Asset'}</span>
                                <span class="sdlms-floating-right sdlms-text-black-18px" raw-stats></span>
                            </div>`
                },
                container: (thread = "") => {
                    return ` <div class="sdlms-threads-container">${thread}</div>`;
                },
                thread: (subthread = "", data = {}) => {
                    data.summary = data.summary || {};
                    
                    /**
                     * @author Unknown 
                     * @description removing title as of now we dont need dynamic title
                     * */
                    data.title = null;
                    data.summary.title = null;
                    data.credit = data.credit || {};
                    return ` 
                    <div class="sdlms-thread" thread>
                        <div class="sdlms-thread-builder-thread sdlms-thread-builder-thread-header position-relative thread-color">
                            <span class="sdlms-floating-left" collapse>
                                <img onerror="${app.IMG_ERROR()}" onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                            </span>
                            <div class="col-md-9 col-11 px-4 mx-auto d-flex align-items-center justify-content-between">
                                <span class="sdlms-text-black-20px font-weight-medium" thread-name="title">${data.title || 'Thread <index>A</index>'}</span>
                                <span class="font-weight-500 sdlms-text-black-17px" thread-name="duration"></span>
                            </div>
                            <svg remove-thread class="sdlms-floating-right" width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z"
                                    fill="#323232"
                                />
                            </svg>
                        </div>
    
                        <div class="sdlms-thread-builder-thread-body col-md-11 mx-auto" collapse-body>
                             <div subthreadcontainer class="sdlms-subthreads">
                             ${subthread}
                             </div>
                             <div class="sdlms-eagle-sub-thread-actions pt-4">
                                 <button add-subthread type="button" class="sdlms-button button-primary button-md d-flex align-items-center">
                                     <svg width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="white" />
                                     </svg>
                                     Sub thread
                                 </button>
                             </div>
                             <div class="sdlms-summary" summary>
                                <div class="d-flex align-items-center flex-column pt-4 justify-content-between">
                                    <div class="sdlms-floating-label"summary-title="name">${data.summary.title || 'Summary for Thread <index>A</index>'}</div>
                                    <textarea class="form-control" name="content" placeholder="Enter Text Here" rows="3">${data.summary.content || ''}</textarea>
                                </div>
                            </div>
                               <div class="d-flex mt-4  align-items-start justify-content-between">
                                       <div class="d-flex align-items-center">
                                       <div class="cursor-pointer sdlms-menu" thread-credit>
                                           <div class="d-flex flex-column">
                                               <div class="d-flex align-items-center mb-2"> <svg width="12" height="5" class="mr-2" viewBox="0 0 12 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M1.13994 2.5C1.13994 1.645 1.974 0.949997 3 0.949997H5.4V0H3C1.344 0 0 1.12 0 2.5C0 3.88 1.344 5 3 5H5.4V4.05H3C1.974 4.05 1.13994 3.355 1.13994 2.5ZM3.6 3H8.4V2H3.6V3ZM9 0H6.6V0.949997H9C10.026 0.949997 10.8601 1.645 10.8601 2.5C10.8601 3.355 10.026 4.05 9 4.05H6.6V5H9C10.656 5 12 3.88 12 2.5C12 1.12 10.656 0 9 0Z" fill="#323232" />
                                                   </svg>
                                                   <div class="sdlms-sub-text-tertiary-16px font-weight-500">Thread Credit</div>
                                                   <svg width="15" height="13" class="ml-2 cursor-pointer" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M12.7062 1.42383L11.7084 0.464013C11.0653 -0.154671 10.0181 -0.154671 9.37499 0.464013L7.16518 2.58979L0 9.48252V12.687H3.33116L10.5376 5.75459L12.7062 3.66851C13.3575 3.04982 13.3575 2.04252 12.7062 1.42383ZM2.64673 11.1006H1.64908V10.1409L8.7896 3.27192L9.78726 4.23164L2.64673 11.1006ZM6.5963 12.687L9.89445 9.51427H14.8417V12.687H6.5963Z" fill="#0029FF" /></svg>
                                                   <div class="sdlms-menu-items" student-list></div>
                                               </div>
                                               <div class="d-flex align-items-center flex-column" thread-credited-user data-uid="${data.credit.uid}" data-fullname="${data.credit.fullname}" data-displayname="${data.credit.displayname}" data-picture="${data.credit.picture}" data-username="${data.credit.username}">
                                                   <img onerror="${app.IMG_ERROR()}" class="img-md border-2px-unset rounded-circle ${(data.credit.uid > 0) || 'd-none'}" src="${data.credit.picture}">
                                                   <span class="sdlms-sub-text-tertiary-16px font-weight-500 ${(data.credit.uid > 0) || 'd-none'}">${data.credit.fullname || data.credit.displayname || data.credit.username}</span>
                                               </div>
                                           </div>
                                       </div>
                                    </div>
                                    <select name="emotions"  value="${data.emotions || ''}" class="sdlms-form-select">
                                        <option value="">Select Emotion</option>
                                        <option value="eurekaEmphasis">Eureka Emphasis</option>
                                        <option value="blissfullyPuzzled">Blissfully Puzzled</option>
                                        <option value="spirituallyDetermined">Spiritually Determined</option>
                                        <option value="upsetandmotivated">Upset & Motivated</option>
                                    </select>
                              </div>
                        </div>
                    </div>`;
                },
                subthread: (data = {}) => {
                    let temp_id = $that.unique('thought-');
                    /**
                     * @author Unknown 
                     * @description removing title as of now we dont need dynamic title
                     * */
                    data.title = null;
                    return `
                    <div class="d-flex" subthread>
                    <div class="col-6 pl-0">
                        <div  class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                            <div class="sdlms-floating-label" subthread-name="title">${data.title || 'Sub Thread <index>A</index>'}
                                <svg class="sdlms-floating-right" remove-subthread width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z"
                                        fill="#323232"
                                    />
                                </svg>
                            </div>
                            <textarea class="form-control" placeholder="Enter Text Here" name="content" rows="3">${data.content || ''}</textarea>
                        </div>
                        <div class="d-flex sdlms-subthread-actions pt-3 justify-content-end">
                            <div class="sdlms-custom-radio-image" data-title="Eureka Moment" title-bottom>
                                <input type="checkbox" ${!!!Number(data.eureka) || 'checked'} data-name="thoughts" data-group="eureka" name="thought-eureka" id="${temp_id}1">
                                <label for="${temp_id}1">
                                    <img onerror="${app.IMG_ERROR()}" src="${app.asset_url}/eureka-moment.svg" inactive alt="" />
                                    <img onerror="${app.IMG_ERROR()}" src="${app.asset_url}/hover-eureka-moment.svg" hover alt="" />
                                    <img onerror="${app.IMG_ERROR()}" src="${app.asset_url}/selected-eureka-moment.svg" active alt="" />
                                </label>
                            </div>
                            <div class="sdlms-custom-radio-image"data-title="Answers" title-bottom>
                                <input type="checkbox" ${!!!Number(data.answer) || 'checked'} data-name="thoughts"  data-group="answer" name="thought-answer" id="${temp_id}2">
                                <label for="${temp_id}2">
                                    <img onerror="${app.IMG_ERROR()}" src="${app.asset_url}/answer.svg" inactive alt="" />
                                    <img onerror="${app.IMG_ERROR()}" src="${app.asset_url}/hover-answer.svg" hover alt="" />
                                    <img onerror="${app.IMG_ERROR()}" src="${app.asset_url}/selected-answer.svg" active alt="" />
                                </label>
                            </div>
                            <div class="sdlms-custom-radio-image"data-title="Questions" title-bottom>
                                <input type="checkbox"  ${!!!Number(data.question) || 'checked'} data-name="thoughts" data-group="question"  name="thought-question" id="${temp_id}3">
                                <label for="${temp_id}3">
                                    <img onerror="${app.IMG_ERROR()}" src="${app.asset_url}/question.svg" inactive alt="" />
                                    <img onerror="${app.IMG_ERROR()}" src="${app.asset_url}/hover-question.svg"  hover alt="" />
                                    <img onerror="${app.IMG_ERROR()}" src="${app.asset_url}/selected-question.svg" active alt="" />
                                </label>
                            </div>
                            <div class="sdlms-custom-radio-image" data-title="Root of thought" title-bottom>
                                <input type="checkbox"   ${!!!Number(data.root) || 'checked'} data-name="thoughts"  data-group="root" name="thought-root" id="${temp_id}4">
                                <label for="${temp_id}4">
                                    <img onerror="${app.IMG_ERROR()}" src="${app.asset_url}/root-of-thought.svg" inactive alt="" />
                                    <img onerror="${app.IMG_ERROR()}" src="${app.asset_url}/hover-root-of-thought.svg" hover alt="" />
                                    <img onerror="${app.IMG_ERROR()}" src="${app.asset_url}/selected-root-of-thought.svg" active alt="" />
                                </label>
                            </div>
                        </div>
                    </div>
    
                    <div class="col-6 pr-0">
                        <div  class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                            <div class="sdlms-floating-label" interpretation-name="title">Sub Interpretation <index>1</index>	</div>
                            <textarea class="form-control" placeholder="Enter Text Here" name="interpretation" rows="3">${data.interpretation || ''}</textarea>
                        </div>
                        <div class="d-flex pt-3 justify-content-end">
                            <select name="category"  value="${data.category || ''}" class="sdlms-form-select w-50 mr-3">
                                <option value="">Select Category</option>
                                <option value="remark">Remark</option>
                                <option value="subargument">Sub-argument</option>
                                <option value="subexplanation">Sub-explanation</option>
                                <option value="coreprinciple">Core-principle</option>
                            </select>
                            <select name="process" value="${data.process || ''}" class="sdlms-form-select w-50">
                                <option value="">Select Process</option>
                                <option value="question">Question</option>
                                <option value="analogy">Analogy</option>
                                <option value="sarcasm">Sarcasm</option>
                                <option value="insight">Insight</option>
                                <option value="counterexample">Counter-Example</option>
                            </select>
                        </div>
                    </div>
                </div>`;
                },
                action: (data = {}) => {
                    return ` <div class="sdlms-threads-actions col-md-11 mx-auto d-flex justify-content-end">
                    <button  type="button" data-thread="new" class="sdlms-button button-primary button-lg d-flex align-items-center">
                        <svg width="10" height="10" viewBox="0 0 10 10" class="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="white" />
                        </svg>
                        New Thread
                    </button>
                </div>`
                },
                save: () => {
                    return `
                    <div class="sdlms-threads-actions mt-4  col-md-11 mx-auto d-flex justify-content-end">
                        <svg width="25" height="26" cursor-pointer save-thread-builder viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.303 0H2.75758C1.22712 0 0 1.3 0 2.88889V23.1111C0 24.7 1.22712 26 2.75758 26H22.0606C23.5773 26 24.8182 24.7 24.8182 23.1111V5.77778L19.303 0ZM12.4091 23.1111C10.1203 23.1111 8.27273 21.1756 8.27273 18.7778C8.27273 16.38 10.1203 14.4444 12.4091 14.4444C14.6979 14.4444 16.5455 16.38 16.5455 18.7778C16.5455 21.1756 14.6979 23.1111 12.4091 23.1111ZM16.5455 8.66667H2.75758V2.88889H16.5455V8.66667Z" fill="#323232"/>
                        </svg>
                    </div>`
                }
            }
            return components;
        },
        _reader() {
            let components = {
                header: (meta = {}, show = false) => {
                    return `<div class="sdlms-thread-header d-${!show ? 'none' : 'flex'} col-12 py-2 position-relative sdlms-text-black-25px font-weight-500">
                    <span>${meta.title || 'Personal Asset'}</span>
                    <span class="sdlms-floating-right sdlms-text-black-18px" raw-stats></span>
                </div>`;
                },
                container: (thread = "") => {
                    return ` <div class="sdlms-threads-container">${thread}</div>`;
                },
                thread: (subthread = "", data = {}) => {
                    return ` 
    
                    <div class="sdlms-thread" thread>
                     <div class="sdlms-thread-builder-thread thread-color sdlms-thread-builder-thread-header position-relative thread-color">
                        <span class="sdlms-floating-left" collapse>
                            <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                        </span>
                        <div class="col-11 mx-auto d-flex align-items-center justify-content-between">
                            <span class="sdlms-text-black-20px font-weight-medium" thread-name="title">${data.title || 'Thread <index>A</index>'}</span>
                            <span class="font-weight-500 sdlms-text-black-17px">${Number(data.duration) || ''}</span>
                        </div>
                    </div>
                    <div class="sdlms-eagle-thread-body col-11 mx-auto" summary collapse-body>
                        <div class="sdlms-subthreads"  target="show-more">
                            <div class="d-flex align-items-center pt-3 justify-content-between">
                                <p name="content" content class="text-ellipse-4">
                                ${app.processString(data.summary.content)}
                                </p>
                            </div>
                            <div class="sdlms-threads-actions mx-auto d-flex justify-content-end">
                                <a show-more class="d-flex align-items-center sdlms-text-tertiary-14px font-weight-500">
                                    See more
                                </a>
                            </div>
                        </div>
                        <div class="d-flex mt-3 justify-content-between align-items-start">
                        <div class="d-flex align-items-center">
                           <div class="cursor-pointer sdlms-menu" thread-credit>
                               <div class="d-flex flex-column">
                                   <div class="d-flex align-items-center mb-2"> 
                                        <svg width="12" height="5" class="mr-2" viewBox="0 0 12 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                           <path d="M1.13994 2.5C1.13994 1.645 1.974 0.949997 3 0.949997H5.4V0H3C1.344 0 0 1.12 0 2.5C0 3.88 1.344 5 3 5H5.4V4.05H3C1.974 4.05 1.13994 3.355 1.13994 2.5ZM3.6 3H8.4V2H3.6V3ZM9 0H6.6V0.949997H9C10.026 0.949997 10.8601 1.645 10.8601 2.5C10.8601 3.355 10.026 4.05 9 4.05H6.6V5H9C10.656 5 12 3.88 12 2.5C12 1.12 10.656 0 9 0Z" fill="#323232" />
                                       </svg>
                                       <div class="sdlms-sub-text-tertiary-16px font-weight-500">Thread Credit</div>
                                   </div>
                                   <div class="d-flex align-items-center flex-column" thread-credited-user data-uid="${data.credit.uid}" data-fullname="${data.credit.fullname}" data-displayname="${data.credit.displayname}" data-picture="${data.credit.picture}" data-username="${data.credit.username}">
                                       <img onerror="${app.IMG_ERROR()}" class="img-md border-2px-unset rounded-circle ${!isNaN(data.credit.uid) || 'd-none'}" src="${data.credit.picture}">
                                       <span class="sdlms-sub-text-tertiary-16px font-weight-500 ${!isNaN(data.credit.uid) || 'd-none'}">${data.credit.fullname || data.credit.displayname || data.credit.username}</span>
                                   </div>
                               </div>
                           </div>
                        </div>
                        <select name="emotions"  value="${data.emotions || ''}" class="sdlms-form-select">
                            <option value="">Select Emotion</option>
                            <option value="eureka">Eureka</option>
                            <option value="emphasis">Emphasis</option>
                            <option value="blissfully">Blissfully</option>
                            <option value="puzzled">Puzzled</option>
                            <option value="spiritually">Spiritually</option>
                            <option value="determined">Determined</option>
                            <option value="upsetandmotivated">Upset & Motivated</option>
                        </select>
                   </div>
                        <div subthreadcontainer class="sdlms-subthreads mt-3">
                             ${subthread}
                        </div>
                    </div>
                </div>`;
                },
                subthread: (data = {}, index = 1) => {

                    return `
                    <div class="sdlms-thread" subthread>
                    <div class="sdlms-thread-builder-thread subthread-header sdlms-thread-builder-thread-header position-relative thread-color">
                        <div class="col-12 mx-auto d-flex align-items-center justify-content-between">
                            <span class="sdlms-text-black-20px font-weight-medium">${data.title || 'Example <index>1</index>'}</span>
                        </div>
                    </div>
                    <div class="sdlms-eagle-thread-body col-12 pr-0 mx-auto">
                        <div class="sdlms-subthreads"  target="show-more">
                            <div class="d-flex align-items-center pt-3 justify-content-between">
                                <p content  name="content" class="text-ellipse-4">
                                 ${app.processString(data.content)}
                                </p>
                            </div>
                            <div class="sdlms-threads-actions mx-auto d-flex justify-content-end">
                                <a show-more class="d-flex align-items-center sdlms-text-tertiary-14px font-weight-500">
                                    See more
                                </a>
                            </div>
                            <div class="d-flex pt-3 read-thoughts">
                                ${!!Number(data.eureka) ? $that.thoughts(1) : ''}
                                ${!!Number(data.answer) ? $that.thoughts(2) : ''}
                                ${!!Number(data.question) ? $that.thoughts(3) : ''}
                                ${!!Number(data.root) ? $that.thoughts(4) : ''}
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="sdlms-thread">
                <div class="sdlms-thread-builder-thread  subthread-header sdlms-thread-builder-thread-header position-relative thread-color">
                    <div class="col-12 mx-auto d-flex align-items-center justify-content-between">
                        <span class="sdlms-text-black-20px font-weight-medium">${data.interpretation_title || 'Sub Interpretation <index>1</index>'}</span>
                    </div>
                </div>
                <div class="sdlms-eagle-thread-body pr-0 col-12 mx-auto">
                    <div class="sdlms-subthreads"  target="show-more">
                        <div class="d-flex align-items-center pt-3 justify-content-between">
                            <p name="interpretation" content class="text-ellipse-4">
                             ${app.processString(data.interpretation)}
                            </p>
                        </div>
                        <div class="sdlms-threads-actions mx-auto d-flex justify-content-end">
                            <a show-more class="d-flex align-items-center sdlms-text-tertiary-14px font-weight-500">
                                See more
                            </a>
                        </div>
                        <div class="d-flex pt-3">
                            <select name="category"  value="${data.category || ''}" class="sdlms-form-select mr-3">
                                <option value="">Select Category</option>
                                <option value="remark">Remark</option>
                                <option value="subargument">Sub-argument</option>
                                <option value="subexplanation">Sub-explanation</option>
                                <option value="coreprinciple">Core-principle</option>
                            </select>
                            <select name="process" value="${data.process || ''}" class="sdlms-form-select">
                                <option value="">Select Process</option>
                                <option value="question">Question</option>
                                <option value="analogy">Analogy</option>
                                <option value="sarcasm">Sarcasm</option>
                                <option value="insight">Insight</option>
                                <option value="counterexample">Counter-Example</option>
                            </select>
                    </div>
                    </div>
                </div>
            </div>
                    `;
                },
                time: (time) => {
                    // time = time.split(":");
                    // return Number(time[0]) * 60 + Number(time[1]) || 10;
                    return time;
                },
            }
            return components;
        }
    }
    return components;
    }
    static threadbuilder_mobile($that) {
        let components = {
          thread() {
            let components = {
              header: (meta = {}, show = !true) => {
                return `<div class="sdlms-thread-header d-${
                  !show ? "none" : "flex"
                } col-12 py-2 position-relative sdlms-text-black-25px font-weight-500">
                                <span contenteditable header-title>${
                                  meta.title || "Personal change"
                                }</span>
                                <span class="sdlms-floating-right sdlms-text-black-18px" raw-stats></span>
                            </div>`;
              },
              container: (thread = "") => {
                return `<div class="threadbuilder border border-grey rounded pt-3 pb-3 sdlms-threads-container" >${thread}</div>`;
              },
              thread: (subthread = "", data = {}) => {
                data.summary = data.summary || {};
    
                /**
                 * @author Unknown
                 * @description removing title as of now we dont need dynamic title
                 * */
                data.title = null;
                data.summary.title = null;
                data.credit = data.credit || {};
                return ` 
                    <div class="thread-container sdlms-thread" thread>
         <header
          class="cursor-pointer sdlms-text-black-12px mb-3 border border-1 border-grey p-1 px-3 d-flex justify-content-between sdlms-font-open-sans secondary-thread opacity-5"
        >
        <div class="cursor-pointer d-flex align-items-center">
            <span class="px-2" collapse>
                <img onerror="${app.IMG_ERROR()}" onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
            </span>
            <h3 class="mb-0 sdlms-text-black-16px" thread-name="title">${
              data.title || "Thread <index>A</index>"
            }</h3>
         </div>
            <svg remove-thread class="mt-1 cursor-pointer" width="17" height="17" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z"
                                    fill="#323232"
                                />
            </svg>
        </header>
        <div class="threads mb-5  sdlms-thread-builder-thread-body" collapse-body>
          <div class="sub-thread mb-3" subthreadcontainer>
            ${subthread}
          </div>
          <div
            class="d-flex justify-content-between align-items-start mb-3"
          >
            <button
              class="cursor-pointer align-items-center d-flex interpretBtn justify-content-center rounded bg-light button-primary-mobile sdlms-sub-text-primary-14px"
            >
              + Interpret
            </button>
            <div
              class="sdlms-text-primary-14px d-flex flex-column align-items-center"
            >
              <button
                class="cursor-pointer align-items-center bg-light justify-content-center d-flex rounded rigor-btn sdlms-sub-text-primary-14px button-primary-mobile"
              >
                +</button
              ><span
                class="rigor-text"
                style="color: var(--primary-sub-text-color)"
                >Rigor</span
              >
            </div>
            <button add-subthread type="button" class="cursor-pointer sdlms-text-primary-14px align-items-center d-flex exampleBtn bg-light float-right rounded button-primary-mobile sdlms-sub-text-primary-14px">
                            <svg width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="#0029FF" />
                            </svg>
                    Sub thread
            </button>
          </div>
          <div class="summary-thread mb-3" summary>
            <header
              class="border border-1 border-grey p-1 px-4 d-flex align-items-center sdlms-font-open-sans secondary-thread opacity-5"
            >
              <h4 class="mb-0 sdlms-text-black-16px" summary-title="name">
              ${data.summary.title || "Summary for Thread <index>A</index>"}
              </h4>
            </header>
            <textarea
              class="bg-white mobile-form fs-2 text-black opacity-5 rounded w-100 form-control fs-2"
              style="resize: none"
              placeholder="Enter Text Here"
              name="content"
            >${data.summary.content || ""}</textarea>
          </div>
         
          <div class="d-flex align-items-center justify-content-between">
            <div class="cursor-pointer sdlms-menu" thread-credit>
                <div class="d-flex flex-column">
                    <div class="d-flex align-items-center mb-2"> 
                        <div class="border-1 rounded-circle m-1 cursor-pointer button-primary-mobile d-flex align-items-center justify-content-center" style="width:30px; height:30px;">
                        +
                        </div>
                        <div class="sdlms-sub-text-tertiary-16px font-weight-500">Thread Credit</div>
                        <div class="sdlms-menu-items" student-list>
                        </div>
                    </div>
                    <div class="d-flex align-items-center flex-column" thread-credited-user data-uid="${
                      data.credit.uid
                    }" data-fullname="${data.credit.fullname}" data-displayname="${
                  data.credit.displayname
                }" data-picture="${data.credit.picture}" data-username="${
                  data.credit.username
                }">
                        <img onerror="${app.IMG_ERROR()}" class="img-md border-2px-unset rounded-circle ${
                  data.credit.uid > 0 || "d-none"
                }" src="${data.credit.picture}">
                        <span class="sdlms-sub-text-tertiary-16px font-weight-500 ${
                          data.credit.uid > 0 || "d-none"
                        }">${
                  data.credit.fullname ||
                  data.credit.displayname ||
                  data.credit.username
                }</span>
                    </div>
                </div>
            </div>
            <select class="drop-down" value="speakers emotion">
              <option name="" id="">Select category</option>
              <option name="" id="">option</option>
              <option name="" id="">options</option>
            </select>
        </div>
          </div>
        </div>
        
      </div>`;
              },
              subthread: (data = {}) => {
                let temp_id = $that.unique("thought-");
                /**
                 * @author Unknown
                 * @description removing title as of now we dont need dynamic title
                 * */
                data.title = null;
                return `
                    <div subthread class="subthread-container mb-4 mt-2" >
                <header
                  class="subthread-header mb-0 border border-1 border-grey p-1 px-4 d-flex justify-content-between align-items-center sdlms-font-open-sans secondary-thread opacity-5" 
                >
                  <h4 class="cursor pointer mb-0 sdlms-text-black-16px" subthread-name="title">${
                    data.title || "Sub Thread <index>A</index>"
                  }</h4>
                  <svg  remove-subthread width="17" height="17" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z"
                            fill="#323232"
                        />
                 </svg> 
                </header>
                <textarea
                  class="subthread-content mobile-form bg-white fs-2 text-black opacity-5 rounded w-100 form-control fs-2"
                  style="resize: none"
                  placeholder="Enter Text Here"
                  name="content"
                >${data.content || ""}</textarea>
    
              <div class="subthread-container mt-2 mb-1" >
                <header
                  class="subthread-header mb-0 border border-1 border-grey p-1 px-4 d-flex justify-content-between align-items-center sdlms-font-open-sans secondary-thread opacity-5" 
                >
                  <h4 class="mb-0 sdlms-text-black-16px" interpretation-name="title">Sub Interpretation <index>1</index></h4>
                </header>
                <textarea
                  class="subthread-content  mobile-form bg-white fs-2 text-black opacity-5 rounded w-100 form-control fs-2"
                  style="resize: none"
                  placeholder="Enter Text Here"
                  name="interpretation"
                >${data.interpretation || ""}</textarea>
              </div>
              </div>
              `;
              },
              action: (data = {}) => {
                return `
                    <button  type="button" data-thread="new" class="cursor-pointer thread-btn align-items-center float-right d-flex interpretBtn justify-content-center rounded sdlms-sub-text-primary-16px button-primary-mobile">
                        <svg width="10" height="10" viewBox="0 0 10 10" class="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="#0029FF" />
                        </svg>
                        New Thread
                    </button>
                    <div class="clearfix"></div>
                    `;
              },
              save: () => {
                return `
                    <div class="sdlms-threads-actions mt-4  col-md-11 mx-auto d-flex justify-content-end">
                        <svg width="25" height="26" cursor-pointer save-thread-builder viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.303 0H2.75758C1.22712 0 0 1.3 0 2.88889V23.1111C0 24.7 1.22712 26 2.75758 26H22.0606C23.5773 26 24.8182 24.7 24.8182 23.1111V5.77778L19.303 0ZM12.4091 23.1111C10.1203 23.1111 8.27273 21.1756 8.27273 18.7778C8.27273 16.38 10.1203 14.4444 12.4091 14.4444C14.6979 14.4444 16.5455 16.38 16.5455 18.7778C16.5455 21.1756 14.6979 23.1111 12.4091 23.1111ZM16.5455 8.66667H2.75758V2.88889H16.5455V8.66667Z" fill="#323232"/>
                        </svg>
                    </div>`;
              },
            };
            return components;
          },
        };
        return components;
    }

    static eaglebuilder_mobile($that){
        let components = {
            eagle() {
                let components = {
                    header: (data = {}) => {
                        /**
                         * @author Unknown 
                         * @description removing title as of now we dont need dynamic title
                         * */
                        data.title = null;
                        return `
                        <div class="sdlms-threads-container">
                 <div class="Intro-box sdlms-thread" meta>
                <header
                  class="py-1 eagle-header subthread-header mb-3 border border-1 border-grey px-4 d-flex justify-content-between align-items-center sdlms-font-open-sans secondary-thread opacity-5"
                >
                  <div class="cursor-pointer d-flex align-items-center">
                    <span class="px-1" collapse>
                        <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                    </span>
                    <h3 class="mb-0 sdlms-text-black-16px" name="title">${data.title || 'Introduction'}</h3>
                  </div>
                </header>
                <textarea
                  class="example-content mobile-form bg-white fs-2 text-black opacity-5 rounded w-100 form-control fs-2"
                  style="resize: none"
                  name="content"
                  placeholder="Enter Text Here"
                  collapse-body >${data.introduction || ''}</textarea>
              </div>
               `;
                    },
                    container: (thread = "") => {
                        return `<div class="threadbuilder border border-grey rounded pt-3 pb-3  ">${thread}</div>`;
                    },
                    thread: (subthread = "", data = {}, index = 1) => {
                        /**
                         * @author Unknown 
                         * @description removing title as of now we dont need dynamic title
                         * */
                        data.title = null;
                        return ` 
                        
                    <div class="threads sdlms-thread" thread>
                <header
                  class="thread-header subthread-header mb-3 border border-1 border-grey px-4 d-flex justify-content-between align-items-center sdlms-font-open-sans secondary-thread opacity-5"
                >
                  <div class="cursor-pointer d-flex align-items-center">
                  <span class="px-1" collapse>
                    <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                  </span>
                    <h3 class="mb-0 sdlms-text-black-16px">${data.title || 'Thread ' + `<index>${app.numberToAlphabates(index)}</index>`}</h3>
                  </div>
                  <svg remove-thread  width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z" fill="#323232"/>
                 </svg>     
                </header>
                <div class="sub-threads-container" collapse-body> 
                <div class="example-thread mb-3" subthreadcontainer>
                    ${subthread}
                <div>
                  <button add-subthread type="button" class="cursor-pointer sdlms-text-primary-14px align-items-center d-flex exampleBtn mb-3 bg-light float-right rounded button-primary-mobile sdlms-sub-text-primary-14px">
                                <svg width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="white" />
                                </svg>
                                Example
                </button>
                  <div class="clearfix"></div>
                </div>
                <div class="summary-thread mb-3" arguement>
                  <header
                    class="summary-header py-1 subthread-header mb-0 border border-1 border-grey px-4 d-flex justify-content-between align-items-center sdlms-font-open-sans secondary-thread opacity-5"
                  >
                    <h4 class="mb-0 sdlms-text-black-16px">
                    Argument for Thread <index>${app.numberToAlphabates(index)}
                    </h4>
                  </header>
                  <textarea
                    class="summary-content mobile-form example-content bg-white fs-2 text-black opacity-5 rounded w-100 form-control fs-2"
                    style="resize: none"
                    placeholder="Enter Text Here"
                    name="content"
                  >${data.arguement || ''}</textarea>
                </div>
                </div>
                </div>
                    `;
                    },
                    subthread: (data = {}, index = 1) => {
                        /**
                         * @author Unknown 
                         * @description removing title as of now we dont need dynamic title
                         * */
                        data.title = null;
                        return `
                    <div subthread class="example-container mb-3">
                    <header
                      class="example-header thread-header py-1 subthread-header mb-0 border border-1 border-grey px-4 d-flex justify-content-between align-items-center sdlms-font-open-sans secondary-thread opacity-5"
                    >
                      <h4 class="cursor-pointer mb-0 sdlms-text-black-16px" subthread-name="title">${data.title || 'Example ' + `<index>${index}</index>`}</h4>
                      <svg  remove-subthread width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z" fill="#323232"/>
                      </svg>
                    </header>
                    <textarea
                      class="example-content mobile-form bg-white fs-2 text-black opacity-5 rounded w-100 form-control fs-2"
                      style="resize: none"
                      placeholder="Enter Text Here"
                      name="content"
                    >${data.content || ""}</textarea>
                  </div>
                </div>
                    `;
                    },
                    transitions: (id = "", data = {}, index = 1) => {
                        /**
                         * @author Unknown 
                         * @description removing title as of now we dont need dynamic title
                         * */
                        data.title = null;
                        return `  
                    <div class="sdlms-thread" transitions>
                    <div class="sdlms-eagle-thread sdlms-eagle-thread-header position-relative secondary-thread opacity-5">
                        <span class="sdlms-floating-left" collapse>
                            <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                        </span>
                        <div class=" col-md-9 col-11 px-4 mx-auto d-flex align-items-center justify-content-between">
                            <span class="sdlms-text-black-20px font-weight-medium" transition-name="title">${data.title || 'Transition ' + `<index>${index}</index>`}</span>
                            <span class="font-weight-500 sdlms-text-black-17px" transition-name="duration" ${!$that.data.enableDuration || 'contenteditable'} >${Number(data.duration) || ''} </span>
                        </div>
                    </div>
                    <div class="sdlms-eagle-thread-body col-md-9 col-11 px-4 mx-auto" collapse-body>
                        <div class="sdlms-subthreads">
                            <div class="d-flex align-items-center pt-4 justify-content-between">
                                <textarea class="form-control" name="content" placeholder="Enter Transition" rows="3">${data.content || ''}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
                    `
                    },
                    actions: () => {
                        return `
                        <button  type="button" data-thread="new" class="cursor-pointer thread-btn align-items-center float-right d-flex interpretBtn justify-content-center rounded sdlms-sub-text-primary-16px button-primary-mobile">
                        <svg width="10" height="10" viewBox="0 0 10 10" class="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="white" />
                        </svg>
                        New Thread
                    </button>
                    <div class="clearfix"></div>
                    `
                    },
                    conclusion: (data = {}) => {
                        /**
                         * @author Unknown 
                         * @description removing title as of now we dont need dynamic title
                         * */
                        data.title = null;
                        return `<div class="sdlms-conclusion-container pt-3 sdlms-thread" conclusion>
                        <header
                        class="thread-header subthread-header mb-3 border border-1 border-grey px-4 d-flex justify-content-between align-items-center sdlms-font-open-sans secondary-thread opacity-5"
                      >
                        <div class="d-flex align-items-center">
                          <span  collapse>
                                      <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                          </span>
                          <h3 class="mb-0 sdlms-text-black-16px">${data.title || 'Conclusion'}</h3>
                        </div>
                      </header>
                      <textarea
                            class="example-content mobile-form bg-white fs-2 text-black opacity-5 rounded w-100 form-control fs-2"
                            style="resize: none"
                            placeholder="Enter Text Here"
                            name="content"
                            collapse-body
                          >${data.content || ""}</textarea>
                      </div>
                     </div>
                    </div>

                `
                    },
                    save: () => {
                        return `<div class="sdlms-threads-actions  col-11 col-md-9 mx-auto d-flex justify-content-end">
                        <svg width="25" height="26" cursor-pointer save-eagle-builder viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.303 0H2.75758C1.22712 0 0 1.3 0 2.88889V23.1111C0 24.7 1.22712 26 2.75758 26H22.0606C23.5773 26 24.8182 24.7 24.8182 23.1111V5.77778L19.303 0ZM12.4091 23.1111C10.1203 23.1111 8.27273 21.1756 8.27273 18.7778C8.27273 16.38 10.1203 14.4444 12.4091 14.4444C14.6979 14.4444 16.5455 16.38 16.5455 18.7778C16.5455 21.1756 14.6979 23.1111 12.4091 23.1111ZM16.5455 8.66667H2.75758V2.88889H16.5455V8.66667Z" fill="#323232"/>
                        </svg>
                    </div>`
                    },
                    time: (time) => {
                        // time = time.split(":");
                        // return Number(time[0]) * 60 + Number(time[1]) || 10;
                        return time;
                    },
                }
                return components;
            },
        }
        return components
    }

    static eagleBuilder($that) {
        let components = {
            eagle() {
                let components = {
                    header: (data = {}) => {
                        /**
                         * @author Unknown 
                         * @description removing title as of now we dont need dynamic title
                         * */
                        data.title = null;
                        return `
                <div class="sdlms-thread" meta>
                    <div class="sdlms-eagle-thread sdlms-eagle-thread-header position-relative secondary-thread opacity-5">
                        <span class="sdlms-floating-left" collapse>
                            <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                        </span>
                        <div class=" col-md-9 col-11 px-4 mx-auto d-flex align-items-center justify-content-between">
                            <span class="sdlms-text-black-20px font-weight-medium" name="title">${data.title || 'Introduction'}</span>
                            <span class="font-weight-500 sdlms-text-black-17px" name="duration" ${!$that.data.enableDuration || 'contenteditable'}> ${Number(data.duration) || ''} </span>
                        </div>
                    </div>
                    <div class="sdlms-eagle-thread-body col-md-9 col-11 px-4 mx-auto" collapse-body>
                        <div class="sdlms-subthreads">
                            <div class="d-flex align-items-center pt-4 justify-content-between">
                                <textarea class="form-control"  name="content" placeholder="Enter Introduction" rows="3">${data.introduction || ''}</textarea>
                            </div>
                        </div>
                    </div>
                 </div>
               `;
                    },
                    container: (thread = "") => {
                        return ` <div class="sdlms-threads-container">${thread}</div>`;
                    },
                    thread: (subthread = "", data = {}, index = 1) => {
                        /**
                         * @author Unknown 
                         * @description removing title as of now we dont need dynamic title
                         * */
                        data.title = null;
                        return ` 
                    <div class="sdlms-thread" thread>
                    <div class="sdlms-eagle-thread sdlms-eagle-thread-header position-relative thread-color">
                        <span class="sdlms-floating-left" collapse>
                            <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                        </span>
                        <div class=" col-md-9 col-11 px-4 mx-auto d-flex align-items-center justify-content-between">
                            <span class="sdlms-text-black-20px font-weight-medium" thread-name="title">${data.title || 'Thread ' + `<index>${app.numberToAlphabates(index)}</index>`} </span>
                            <span class="font-weight-500 sdlms-text-black-17px" thread-name="duration" ${!$that.data.enableDuration || 'contenteditable'}>${Number(data.duration) || ''} </span>
                        </div>
                        <svg remove-thread class="sdlms-floating-right" width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z" fill="#323232"/>
                        </svg>
                    </div>
                    <div class="sdlms-eagle-thread-body col-md-9 col-11 px-4 mx-auto" collapse-body>
                        <div subthreadcontainer class="sdlms-subthreads">
                        ${subthread}
                        </div>
                        <div class="sdlms-eagle-sub-thread-actions pt-4">
                            <button add-subthread type="button" class="sdlms-button button-primary button-md d-flex align-items-center">
                                <svg width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="white" />
                                </svg>
                                Example
                            </button>
                        </div>
                        <div class="sdlms-arguement" arguement>
                           <div class="d-flex align-items-center flex-column  pt-4 justify-content-between">
                               <div class="sdlms-floating-label">Argument for Thread <index>${app.numberToAlphabates(index)}</index></div>
                               <textarea class="form-control" name="content" placeholder="Enter Text Here" rows="3">${data.arguement || ''}</textarea>
                           </div>
                        </div>
                      </div>
                    </div>`;
                    },
                    subthread: (data = {}, index = 1) => {
                        /**
                         * @author Unknown 
                         * @description removing title as of now we dont need dynamic title
                         * */
                        data.title = null;
                        return `
                    <div subthread class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                     <div class="sdlms-floating-label" subthread-name="title">${data.title || 'Example ' + `<index>${index}</index>`} <svg class="sdlms-floating-right" remove-subthread width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z" fill="#323232"/>
                     </svg>
                     </div>
                        <textarea class="form-control"  placeholder="Enter Text Here" name="content"  rows="3">${data.content || ""}</textarea>
                    </div>
                    `;
                    },
                    transitions: (id = "", data = {}, index = 1) => {
                        /**
                         * @author Unknown 
                         * @description removing title as of now we dont need dynamic title
                         * */
                        data.title = null;
                        return `  
                    <div class="sdlms-thread" transitions>
                    <div class="sdlms-eagle-thread sdlms-eagle-thread-header position-relative secondary-thread opacity-5">
                        <span class="sdlms-floating-left" collapse>
                            <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                        </span>
                        <div class=" col-md-9 col-11 px-4 mx-auto d-flex align-items-center justify-content-between">
                            <span class="sdlms-text-black-20px font-weight-medium" transition-name="title">${data.title || 'Transition ' + `<index>${index}</index>`}</span>
                            <span class="font-weight-500 sdlms-text-black-17px" transition-name="duration" ${!$that.data.enableDuration || 'contenteditable'} >${Number(data.duration) || ''} </span>
                        </div>
                    </div>
                    <div class="sdlms-eagle-thread-body col-md-9 col-11 px-4 mx-auto" collapse-body>
                        <div class="sdlms-subthreads">
                            <div class="d-flex align-items-center pt-4 justify-content-between">
                                <textarea class="form-control" name="content" placeholder="Enter Transition" rows="3">${data.content || ''}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
                    `
                    },
                    actions: () => {
                        return ` <div class="sdlms-threads-actions col-11 col-md-9 mx-auto d-flex justify-content-end">
                    <button  type="button" data-thread="new" class="sdlms-button button-primary button-lg d-flex align-items-center">
                        <svg width="10" height="10" viewBox="0 0 10 10" class="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="white" />
                        </svg>
                        New Thread
                    </button>
                </div>`
                    },
                    conclusion: (data = {}) => {
                        /**
                         * @author Unknown 
                         * @description removing title as of now we dont need dynamic title
                         * */
                        data.title = null;
                        return `
                <div class="sdlms-conclusion-container pt-4" conclusion>
                    <div class="sdlms-thread">
                        <div class="sdlms-eagle-thread sdlms-eagle-thread-header position-relative secondary-thread opacity-5">
                            <span class="sdlms-floating-left" collapse>
                                <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                            </span>
                            <div class=" col-md-9 col-11 px-4 mx-auto d-flex align-items-center justify-content-between">
                                <span class="sdlms-text-black-20px font-weight-medium" name="title">${data.title || 'Conclusion'}</span>
                                <span class="font-weight-500 sdlms-text-black-17px" name="duration" ${!$that.data.enableDuration || 'contenteditable'}> ${Number(data.duration) || ''} </span>
                            </div>
                        </div>
                        <div class="sdlms-eagle-thread-body col-md-9 col-11 px-4 mx-auto" collapse-body>
                            <div class="sdlms-subthreads">
                                <div class="d-flex align-items-center pt-4 justify-content-between">
                                    <textarea class="form-control" name="content" placeholder="Enter Conclusion"rows="3">${data.content || ''}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
                    },
                    save: () => {
                        return `<div class="sdlms-threads-actions  col-11 col-md-9 mx-auto d-flex justify-content-end">
                        <svg width="25" height="26" cursor-pointer save-eagle-builder viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.303 0H2.75758C1.22712 0 0 1.3 0 2.88889V23.1111C0 24.7 1.22712 26 2.75758 26H22.0606C23.5773 26 24.8182 24.7 24.8182 23.1111V5.77778L19.303 0ZM12.4091 23.1111C10.1203 23.1111 8.27273 21.1756 8.27273 18.7778C8.27273 16.38 10.1203 14.4444 12.4091 14.4444C14.6979 14.4444 16.5455 16.38 16.5455 18.7778C16.5455 21.1756 14.6979 23.1111 12.4091 23.1111ZM16.5455 8.66667H2.75758V2.88889H16.5455V8.66667Z" fill="#323232"/>
                        </svg>
                    </div>`
                    },
                    time: (time) => {
                        // time = time.split(":");
                        // return Number(time[0]) * 60 + Number(time[1]) || 10;
                        return time;
                    },
                }
                return components;
            },
            _reader() {
                let components = {
                    header: (data = {}) => {

                        return `
                    <div class="sdlms-thread" meta data-thread-status="${data.status || -1}">
                        <div class="sdlms-eagle-thread sdlms-eagle-thread-header position-relative secondary-thread opacity-5">
                            <span class="sdlms-floating-left" collapse>
                                <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                            </span>
                            <div class="col-11 mx-auto d-flex align-items-center justify-content-between">
                                <span class="sdlms-text-black-20px font-weight-medium" thread-name="title">${data.title || 'Introduction'}</span>
                                <span class="font-weight-500 sdlms-text-black-17px"><span data-name="percentageToTime"></span> <span convert-to-minute>${Number(data.duration) || ''}</span></span>
                            </div>
                            <span class="sdlms-floating-right">
                                <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/completed.svg" mark-as-completed="${data.id || ''}" alt="" class='${data.status == 1 ? "d-none" : ""}' />
                            </span>
                            <div class="thread-bar ${data.completed > 1 ? 'completed' : ''} ${data.progress > 100 ? 'overflow' : ''}" track-mode="online" data-name="${data.title || 'Introduction'}" data-id="${data.id || ''}" data-thread-mode="meta" data-thread-completed="${data.completed || 0}" data-thread-progress="${data.progress || 0}" data-thread-status="${data.status || -1}" data-thread-duration="${data.duration || 0}"></div>
                        </div>
                        <div class="sdlms-eagle-thread-body col-11 mx-auto" collapse-body>
                            <div class="sdlms-subthreads" target="show-more">
                                <div class="d-flex align-items-center pt-4 justify-content-between">
                                    <p  content  name="content" class="text-ellipse-4">${data.introduction || ''}</p>
                                </div>
                                <div class="sdlms-threads-actions mx-auto d-flex justify-content-end">
                                    <a show-more class="d-flex align-items-center sdlms-text-tertiary-14px font-weight-500">
                                        See more
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
               `;
                    },
                    container: (thread = "") => {
                        return ` <div class="sdlms-threads-container">${thread}</div>`;
                    },
                    thread: (subthread = "", data = {}) => {
                        return ` 
    
                    <div class="sdlms-thread" data-thread-status="${data.status || -1}" thread>
                     <div class="sdlms-eagle-thread sdlms-eagle-thread-header thread-color secondary-thread opacity-5 position-relative">
                        <span class="sdlms-floating-left" collapse>
                            <img  onerror="${app.IMG_ERROR()}"src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                        </span>
                        <div class="col-11 mx-auto d-flex align-items-center justify-content-between">
                            <span class="sdlms-text-black-20px font-weight-medium" thread-name="title">${data.title || 'Thread <index>A</index>'}</span>
                            <span class="font-weight-500 sdlms-text-black-17px"><span data-name="percentageToTime"></span> <span convert-to-minute>${Number(data.duration) || ''}</span></span>
                        </div>
                        <span class="sdlms-floating-right">
                            <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/completed.svg" mark-as-completed="${data.id || ''}" alt="" class='${data.status == 1 ? "d-none" : ""}' />
                        </span>
                        <div class="thread-bar ${data.completed > 1 ? 'completed' : ''} ${data.progress > 100 ? 'overflow' : ''}" data-name="${data.title || 'Thread'}" track-mode="online" data-id="${data.id || ''}" data-thread-mode="track" data-thread-progress="${data.progress || 0}"  data-thread-status="${data.status || -1}" data-thread-duration="${data.duration || 0}" data-thread-completed="${data.completed || 0}"></div>
                    </div>
                    <div arguement class="sdlms-eagle-thread-body col-11 mx-auto" collapse-body>
                        <div class="sdlms-subthreads"  target="show-more">
                            <div class="d-flex align-items-center pt-3 justify-content-between">
                                <p content  name='content' class="text-ellipse-4">
                                  ${app.processString(data.arguement)}
                                </p>
                            </div>
                            <div class="sdlms-threads-actions mx-auto d-flex justify-content-end">
                                <a show-more class="d-flex align-items-center sdlms-text-tertiary-14px font-weight-500">
                                    See more
                                </a>
                            </div>
                        </div>
                        <div subthreadcontainer class="sdlms-subthreads mt-3">
                             ${subthread}
                        </div>
                    </div>
                </div>`;
                    },
                    subthread: (data = {}, index = 1) => {

                        return `
                    <div class="sdlms-thread" subthread>
                    <div class="sdlms-eagle-thread sdlms-eagle-thread-header subthread-header position-relative thread-color">
                        <div class="col-12 mx-auto d-flex align-items-center justify-content-between">
                            <span class="sdlms-text-black-20px font-weight-medium">${data.title || 'Example <index>1</index>'}</span>
                        </div>
                    </div>
                    <div class="sdlms-eagle-thread-body pr-0 col-12 mx-auto">
                        <div class="sdlms-subthreads"  target="show-more">
                            <div class="d-flex align-items-center pt-3 justify-content-between">
                                <p content name="content" class="text-ellipse-4">
                                 ${app.processString(data.content)}
                                </p>
                            </div>
                            <div class="sdlms-threads-actions mx-auto d-flex justify-content-end">
                                <a show-more class="d-flex align-items-center sdlms-text-tertiary-14px font-weight-500">
                                    See more
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                    `;
                    },
                    transitions: (id = "", data = {}, index = 1) => {

                        return `  
                    <div class="sdlms-thread" transitions  data-thread-status="${data.status || -1}">
                    <div class="sdlms-eagle-thread sdlms-eagle-thread-header secondary-thread opacity-5  position-relative">
                        <span class="sdlms-floating-left" collapse>
                            <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                        </span>
                        <div class="col-11 mx-auto d-flex align-items-center justify-content-between">
                            <span class="sdlms-text-black-20px font-weight-medium">${data.title || 'Transition <index>1</index>'}</span>
                            <span class="font-weight-500 sdlms-text-black-17px"><span data-name="percentageToTime"></span> <span convert-to-minute>${Number(data.duration) || ''}</span></span>
                        </div>
                        <span class="sdlms-floating-right">
                            <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/completed.svg" mark-as-completed="${data.id || ''}" alt=""  class='${data.status == 1 ? "d-none" : ""}' />
                        </span>
                    <div class="thread-bar ${data.completed > 1 ? 'completed' : ''} ${data.progress > 100 ? 'overflow' : ''}" track-mode="online" data-name="${data.title || 'Thread'}" data-id="${data.id || ''}" data-thread-mode="transitions" data-thread-progress="${data.progress || 0}"  data-thread-status="${data.status || -1}" data-thread-duration="${data.duration || 0}" data-thread-completed="${data.completed || 0}"></div>
                    </div>
                    <div class="sdlms-eagle-thread-body col-11 mx-auto" collapse-body>
                        <div class="sdlms-subthreads"  target="show-more">
                            <div class="d-flex align-items-center pt-3 justify-content-between">
                                <p content class="text-ellipse-4">
                                    ${app.processString(data.content)}
                                </p>
                            </div>
                            <div class="sdlms-threads-actions mx-auto d-flex justify-content-end">
                                <a show-more class="d-flex align-items-center sdlms-text-tertiary-14px font-weight-500">
                                    See more
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                    `
                    },
                    conclusion: (data = {}) => {

                        return `	<div class="sdlms-thread" conclusion>
                    <div class="sdlms-eagle-thread sdlms-eagle-thread-header secondary-thread opacity-5 position-relative">
                        <span class="sdlms-floating-left" collapse>
                            <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt="" />
                        </span>
                        <div class="col-11 mx-auto d-flex align-items-center justify-content-between">
                            <span class="sdlms-text-black-20px font-weight-medium">${data.title || 'Conclusion'}</span>
                            <span class="font-weight-500 sdlms-text-black-17px"><span data-name="percentageToTime"></span> <span convert-to-minute>${Number(data.duration) || ''}</span></span>
                        </div>
                            <span class="sdlms-floating-right">
                                <img onerror="${app.IMG_ERROR()}" src="https://sdlms.deepthought.education/assets/uploads/files/files/completed.svg" mark-as-completed="${data.id || ''}" alt=""  class='${data.status == 1 ? "d-none" : ""}' />
                            </span>
                        <div class="thread-bar ${data.completed > 1 ? 'completed' : ''} ${data.progress > 100 ? 'overflow' : ''}" track-mode="online" data-name="${data.title || 'Conclusion'}" data-id="${data.id || ''}" data-thread-mode="conclusion" data-thread-progress="${data.progress || 0}"  data-thread-status="${data.status || -1}" data-thread-duration="${data.duration || 0}" data-thread-completed="${data.completed || 0}"></div>
                     </div>
                    <div class="sdlms-eagle-thread-body col-11 mx-auto" collapse-body>
                        <div class="sdlms-subthreads"  target="show-more">
                            <div class="d-flex align-items-center pt-3 justify-content-between">
                                <p content class="text-ellipse-4" name="content" >
                                    ${app.processString(data.content)}
                                </p>
                            </div>
                            <div class="sdlms-threads-actions mx-auto d-flex justify-content-end">
                                <a show-more class="d-flex align-items-center sdlms-text-tertiary-14px font-weight-500">
                                    See more
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`
                    },

                    time: (time) => {
                        // time = time.split(":");
                        // return Number(time[0]) * 60 + Number(time[1]) || 10;
                        return time;
                    },
                }
                return components;
            }
        }
        return components
    }

    static parentDashboard() {

        let parentcomponents = {
            dashboard_table: {
                container: (data) => {
                    return ` <table class="sdlms-my-upcoming-session-table w-100" id="session-topics">${data.html || ''}</table>`
                },
                header: (data) => {
                    return `<thead
                    class="sdlms-my-upcoming-session-table-head secondary-header sdlms-text-white-18px font-weight-medium">
                    <tr class="sdlms-my-upcoming-session-table-header-row">${data.columns.map(column => parentcomponents.dashboard_table.th(column)).join(' ')}</tr> </thead>        `
                },
                th: (data) => {
                    return ` <th class="${data.classes || ''} font-weight-500" style="color: white;">${data.title}</th>`
                },
                row: (row) => {
                    return `<tr class="sdlms-my-upcoming-session-table-header-row">${Object.keys(row).map(key => parentcomponents.table.td({
                        classes: key,
                        value: row[key]
                    })).join(' ')
                        }</tr>`
                },
                td: (data) => {
                    return `<td class="sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px ${data.classes || ''}">${data.value}</td>`
                },
                body: function (data) {
                    return `<tbody>${data.map(row => parentcomponents.table.row(row)).join(' ')}</tbody>`
                }
            },

            pagination: {
                container: function (data) {
                    return `<nav aria-label="Page navigation example" class="d-flex justify-content-center pt-4"> <ul class="pagination">${data.html || ''}</ul></nav>`
                },
                link: function (data) {
                    return `  <li class="page-item fb-navigator " data-url=""><a data-page="${data.page}" data-navigation  class="page-link" href="#">${data.page}</a></li>`
                },
                previous: function (url) {
                    return ` <li class="page-item fb-navigator prev" data-url=""><a  data-href="${url}" data-navigation class="page-link ${!url ? 'disabled' : ''}" href="#"> <span aria-hidden="true" class="p-2">
                    <svg width="15" height="24" viewBox="0 0 15 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15 21.1797L5.72863 12L15 2.82031L12.1457 -1.24766e-07L-5.24537e-07 12L12.1457 24L15 21.1797Z"
                            fill="#0029FF" fill-opacity="0.8" />
                    </svg>
                </span></a></li>`
                },
                next: function (url) {
                    return ``
                }
            },

    sessions: (value, srNum) =>
                // console.log('here template',res)
                `<tr class="sdlms-my-upcoming-session-table-row change-view" data-tid=${value.tid} data-topic=${value.topic} show-session='1'>
                        <td class="sdlms-my-upcoming-session-table-Sno font-weight-500 sdlms-text-black-18px dashboard-sessionIndex">${value.per_page * (value.current_page) + (srNum + 1)}
                        </td>
                        <td class="sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
                                            ${value.topic}</td>
                        <td class="sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px ">
                                                ${(value.teacherName)? value.teacherName : "--"}</td>
                        <td class="sdlms-my-upcoming-session-table-date font-weight-500 sdlms-text-black-18px ">${moment(value.DateTime).format("ddd,DD MMM, YYYY")}
                        <br/>
                        <span> ${moment(value.DateTime).format('hh:mm A')} </span>
                        </td>
                        <td class="class="sdlms-my-upcoming-session-table-related-sessions font-weight-500 sdlms-text-black-18px dashboard-sessionIndex">${value.navigate == -1 ?
                    ((value.threadbuilder && value.threadbuilder.count) ? value.threadbuilder.count.words : 0) : value.navigate == 1 ? ((value.threadbuilder && value.threadbuilder.remark) ? value.threadbuilder.remark.length : 0) : ((value.threadbuilder && value.threadbuilder.question) ? value.threadbuilder.question.length : 0)}</td>
                        <td class="class="sdlms-my-upcoming-session-table-related-sessions font-weight-500 sdlms-text-black-18px dashboard-sessionIndex">${value.navigate == -1 ? (value.threadbuilder && value.threadbuilder.count) ? value.threadbuilder.count.threads : 0
                    : (value.navigate == 1) ? " -- " : ((value.threadbuilder && value.threadbuilder.answer) ? value.threadbuilder.answer.length : 0)}</td>
                          
                </tr>`,

    selectedSession: (value) => ` <tr class="sdlms-my-upcoming-session-table-row one-view" >
                <td class="sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px">
                ${value.col1}
                </td>
                <td class="sdlms-my-upcoming-session-table-Session-topic font-weight-500 sdlms-text-black-18px ">
                ${value.col2}
                </td>
                <td class="sdlms-my-upcoming-session-table-date font-weight-500 sdlms-text-black-18px ">
                ${value.col3}
                </td>
            </tr>`,

    // child_detail: (value) => ` <div class="item demo">
    //         <div class="row">
    //             <div class="row d-flex user-session">
    //                 <div class="col-1"></div>
    //                 <div class="col-3">
    //                     <img class="w-100 mw-100  mx-2 pb-2" src=${value.picture} alt="user picture"
    //                         style="border-radius: 50%;">
    //                 </div>
    //                 <div class="col-7">
    //                     <div
    //                         class="user-session-heading sdlms-text-black-20px font-weight-bold pt-3">
    //                         ${value.fullname}
    //                     </div>
    //                     <div class="font-open-sans p-10 " style="font-size:small">

    //                         <p class="font-weight-300 h6">
    //                         </p>
    //                         <p class="text-justify text-ellipse-4">${value.aboutme}</p>

    //                     </div>
    //                 </div>

    //             </div>

    //         </div>
    //     </div>`,

    Feedback: (value) => `<li class="">
            <div class="row mt-4">
                <div class="col-1">
                    <div class="user-img d-flex align-items-center pl-4">
                    <img src=${value.profile_picture_url ? value.profile_picture_url : "https://sdlms.deepthought.education/assets/uploads/files/files/files/default_profile.png"} alt = "" />
                    </div >
                </div>
                <div class="col-7">
                    <div class="user-session-heading sdlms-text-black-20px font-weight-bold pt-0 mx-0">
                        ${value.fullname}
                    </div>
                    <div class="mx-0 p-1 speed-dial-options-btn shadow talkbubble">
                    
                    <div class="user-session-info para-ellipse p-2"> 	
                        <div class="sdlms-sub-text-primary-15px pb-1"> <span
                        class=" text-capitalize">${value.feedback_for ? value.feedback_for : "SDLMS Asset"}</span> </div>
                        <p class="sdlms-text-tertiary-14px sdlms-font-open-sans text-justify">${value.content.replaceAll(
                "-_-",
                " "
            )}</p><div class="sdlms-text-tertiary-15px float-right pb-0"><span> ${moment(value.modified).format('hh:mm A')} </span></div> 
                             </div>														
                     </div>
                    
                </div>
            </div>
        </li>
    `,


            questions: (value) => `<li class="align-items-center">
                <div class="row sdlms-section mt-1 mx-4 p-3">
                    <div class="col-1 d-flex justify-content-center align-items-center">
                    ${(value.type=="question")? ` <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                    fill="currentColor" class="bi bi-question-square-fill" viewBox="0 0 16 16">
                    <path
                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z">
                    </path>
                </svg>` : `<img src="https://sdlms.deepthought.education/assets/uploads/files/files/hover-answer.svg
                " width="25" height="25">
                `}
                               
                               
                        
                    </div>

                    <div class="col-11 ml-0 text-left">
                    ${value.content.replaceAll("-_-", " ")}
                    </div>
                </div>
            </li>`,

            answers: (value) => `<li class="align-items-center">
                        <div class="row sdlms-section mt-1 mx-4 p-3">
                            <div class="col-1 d-flex justify-content-center align-items-center">
                                Answer's svg!!
                            </div>

                            <div class="col-11 ml-0 text-left">
                            ${value.content.replaceAll("-_-", " ")}
                            </div>
                        </div>
                        </li>`
        }
        return { parentcomponents };
    }
    static storyBoard($that) {
        let components = {
            journey: {
                empty: (data = {}) => {
                    return `<div class="text-center p-4">
                                <img src="https://sdlms.deepthought.education/assets/uploads/files/files/frame.svg" alt="empty-task" />
                                <hr />
                                <h5>Your Storyboard seems to be empty</h5>
                                <p>Add Task Now!</p>
                                <button type="button" id="addtask" class="sdlms-button button-primary button-lg rounded-sm">Add Task</button>
                           </div>`
                },
                start: (data = {}) => {
                    return `<div class="sdlms-floating-label-input d-flex position-relative m-2 input-task">
                                <input type="text" placeholder="Enter Name of Your task" class="w-100 bg-transparent p-2 border-0" style="outline: none;" task-input>
                            </div>
                            <div class="sdlms-floating-label-input d-flex position-relative m-2 input-description">
                                <textarea type="text" placeholder="Enter Description for task" class="w-100 bg-transparent p-2 border-0" style="outline: none; resize: none;" task-description rows="5" cols="8"></textarea>
                            </div>
                            <div class="pr-2 d-flex justify-content-end mt-4">
                                <button class="button-primary cursor-pointer p-1 sdlms-button sdlms-task-complete" id="add-btn" style="font-size: xx-small; border-radius: 5px;">Add task</button>
                            </div>
                            <ol>${data.tasks || ''}</ol>`;
                }
            },
            task: {

                container : (data={}) =>{
                    // console.log(data);
                    return `<div task-target="task-${data.task_id}" class="session-view sdlms-form-elements" style="display: none;">
                    <div class="align-items-center d-flex justify-content-end pb-3 pl-3" style="display:${data.showComplete ? 'block' : 'none'} !important; position: fixed; right: 200px; top: 65px; z-index: 1000">
                        <button type="button" data-task-number="${data.task_number}" mark-as-done="${data.task_id}" class="mt-4 sdlms-button button-primary button-md d-flex align-items-center">Submit Task</button>
                    </div>
                    <div class="jumbotron p-3 mt-4">
                        <div class="d-flex sdlms-text-black-22px task-heading taskHeading text-center" style="font-weight: 700; font-size: larger;">${data.task_title}</div>
                            <div style="font-size: small;">${data.task_description}</div>
                        </div>
                    <div class="w-100">
                        <div class="col-12">
                            <div class="d-${data.hideAction ? 'none' : 'flex'} align-items-center justify-content-end" create-assets style="padding-bottom: 10px; font-size: x-large;">
                                <div style="font-size: medium; font-weight: 500;">Click me to add new asset</div>
                                <i class="fa fa-plus-square ml-3 cursor-pointer" aria-hidden="true" style="color: #0029ff;" create-asset-btn data-task-id="${data.task_id}"></i>
                            </div>
                            <div class="drag" task-container-id="${data.task_id}">
                                ${data.assets.map((asset) => `
                                <div id="asset-${asset.asset_id}" task-assets-container-id="${asset.asset_id}"></div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>`
                },
                get: function (data = {}) {
                    let taskHTML = `<div task-list class="pr-2 py-2 d-flex justify-content-between">
                        <li show-task="${data.task_id}" class="font-weight-bold px-4 text-wrap cursor-pointer">${data.task_title}</li>
                        <div class="pr-2 cursor-pointer">
                            <i task-action style="display:none" save-edited-task="${data.task_id}" class="fas mt-2 fa-save"></i>
                            <i task-action style="display:none" cancel-edit-task="${data.task_id}" class="fas mt-2 ml-2 fa-times"></i>
                            <svg style="display:${data.hideAction ? 'none' : ''}" task-action edit-task="${data.task_id}" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.4844 2.43505L12.8333 5.07814C12.9323 5.18949 12.9323 5.37117 12.8333 5.48252L7.14583 11.8822L4.72917 12.184C4.40625 12.225 4.13281 11.9174 4.16927 11.554L4.4375 8.83473L10.125 2.43505C10.224 2.3237 10.3854 2.3237 10.4844 2.43505ZM14.7031 1.76402L13.4323 0.33405C13.0365 -0.11135 12.3932 -0.11135 11.9948 0.33405L11.0729 1.37136C10.974 1.48271 10.974 1.66439 11.0729 1.77574L13.4219 4.41883C13.5208 4.53018 13.6823 4.53018 13.7812 4.41883L14.7031 3.38152C15.099 2.93319 15.099 2.20942 14.7031 1.76402ZM10 10.1416V13.1246H1.66667V3.7478H7.65104C7.73437 3.7478 7.8125 3.70971 7.8724 3.64524L8.91406 2.47314C9.11198 2.25044 8.97135 1.87244 8.69271 1.87244H1.25C0.559896 1.87244 0 2.50244 0 3.27896V13.5935C0 14.37 0.559896 15 1.25 15H10.4167C11.1068 15 11.6667 14.37 11.6667 13.5935V8.96953C11.6667 8.65599 11.3307 8.50068 11.1328 8.72045L10.0911 9.89256C10.0339 9.95995 10 10.0479 10 10.1416Z" fill="#0029FF"/>
                            </svg>
                            <svg style="display:${data.hideAction ? 'none' : ''}" task-action remove-task="${data.task_id}" width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z" fill="#0029FF" />
                            </svg>
                        </div>
                    </div>
                    ${data.showAssets ? '<ul>' + data.assets.map(asset => `<li class="pl-4">${asset.asset_title}</li>`).join('') + '</ul>' : ''}`;
                    if (data.$container) $(data.$container).append(Template.storyBoard().task.container(data));
                    return taskHTML;
                }
            },
            asset: {
                get: function (data = {}) {
                    return `<div class="col-md-6 my-2 mx-auto">
                        <div class="resize-drag sdlms-section sdlms-form-elements">
                            <div class="sdlms-section-header shadow-none secondary-header align-items-center justify-content-between p-1 pl-3">
                                <div class="d-flex align-items-center sdlms-text-white-20px">
                                    <div class="d-flex justify-content-center align-items-center w-100 cursor-pointer">
                                        <span class="pt-1">${data.asset_title}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="dtthon-asset--body sdlms-section-body p-0">
                                <div class="d-flex">
                                    <div class="col-md-12 text-break p-0">Hello
                                        <div class="d-flex pt-3 px-4">
                                            <div class="col-12 p-0 pb-2" style="">
                                            <b>Description: </b>
                                                ${data.asset_description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                }
            }
        }
        return components;
    }
    static challenge(data) {
        let components = {
            header: {
                editable: (title) => {
                    return `<div class="sdlms-section-header pt-1 shadow-none secondary-header align-items-center justify-content-between" header-asset-div>
                    <div class="d-flex justify-content-center align-items-center w-100 cursor-pointer">
                      
                        <div class="d-flex align-items-center sdlms-text-white-20px w-100" new-header-asset>
                            
                                <input placeholder="Asset Name" value="${title || data.asset_title || ''}"  name="asset_title" class="form-control py-1 w-100">
                              
                        </div>
                    </div>
                </div>`
                },
                static: (title) => {
                    return `<div class="d-flex align-items-center sdlms-text-white-20px" header>
                    <div class="d-flex justify-content-center align-items-center w-100 cursor-pointer" header-text>
                      <span  class="pt-1" content="text">${title || data.asset_title || ''}</span>
                    </div>
                  </div>
                  <div>
                    <svg class="sdlms-floating-left" edit-title width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.4844 2.43505L12.8333 5.07814C12.9323 5.18949 12.9323 5.37117 12.8333 5.48252L7.14583 11.8822L4.72917 12.184C4.40625 12.225 4.13281 11.9174 4.16927 11.554L4.4375 8.83473L10.125 2.43505C10.224 2.3237 10.3854 2.3237 10.4844 2.43505ZM14.7031 1.76402L13.4323 0.33405C13.0365 -0.11135 12.3932 -0.11135 11.9948 0.33405L11.0729 1.37136C10.974 1.48271 10.974 1.66439 11.0729 1.77574L13.4219 4.41883C13.5208 4.53018 13.6823 4.53018 13.7812 4.41883L14.7031 3.38152C15.099 2.93319 15.099 2.20942 14.7031 1.76402ZM10 10.1416V13.1246H1.66667V3.7478H7.65104C7.73437 3.7478 7.8125 3.70971 7.8724 3.64524L8.91406 2.47314C9.11198 2.25044 8.97135 1.87244 8.69271 1.87244H1.25C0.559896 1.87244 0 2.50244 0 3.27896V13.5935C0 14.37 0.559896 15 1.25 15H10.4167C11.1068 15 11.6667 14.37 11.6667 13.5935V8.96953C11.6667 8.65599 11.3307 8.50068 11.1328 8.72045L10.0911 9.89256C10.0339 9.95995 10 10.0479 10 10.1416Z" fill="white"/>
                    </svg>
                  </div>
                 `
                }
            },
            container: (html) => {
                return `<div class="sdlms-section-body">${html}</div>`
            },
            options: () => {
                return ` <div class="d-flex">
                <input type="hidden" name="asset_id" value="${data.asset_id || 0}"> 
                <div class="col-md-12 pl-0">
                    <div class="d-flex flex-column align-items-center mt-4 justify-content-between">
                        <div class="sdlms-floating-label">
                            Select Asset Option:
                        </div>
                        <select name="asset_type" data-value="${data.asset_type || ''}" required class="custom-select cursor-pointer form-control label-radius align-item-center form-control pl-3" style="z-index: 1;">
                            <option value="" selected>Choose type of asset...</option>
                            <option value="input_asset">Input Asset</option>
                            <option value="display_asset">Display Asset</option>
                        </select>
                    </div>
                </div>
            </div>`
            },
            type: () => {
                return `  <div class="d-flex">
                <div class="col-md-12 pl-0">
                    <div class="d-flex flex-column align-items-center mt-4 justify-content-between">
                        <div class="sdlms-floating-label">
                            What you want as Asset??
                        </div>
                        <select required   data-value="${data.asset_content_type || ''}" class="custom-select cursor-pointer label-radius align-item-center form-control pl-3" name="asset_content_type" style="z-index: 1;" >
                            <option value="" selected>Choose asset content to be shown...</option>
                          <!--  <option value="reflection">Reflection</option> -->
                            <option value="threadbuilder">ThreadBuilder</option>
                            <option value="eaglebuilder">EagleBuilder</option>
                            <option value="spreadsheet">SpreadSheet</option>
                            <option value="article">Article</option>
                           <!-- <option value="quiz">Quiz</option>-->
                            <option value="form">Form</option> 
                            <option value="video">Video</option>
                            <option value="image">Image</option>
                            <option value="audio">Audio</option>
                            <option value="docs">Document</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            </div>`
            },
            custom: () => {
                return `  
            <div class="d-flex">
                <div class="col-md-12 pl-0" asset-display-link style="display: none;">
                    <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                        <div class="sdlms-floating-label">
                           Paste Sharer Link of asset
                        </div>
                        <textarea  class="form-control label-text" placeholder="Paste Your Link Here" name="asset_content" rows="1"> ${String(data.asset_content || '').trim()}</textarea>
                    </div>
                </div>
            </div>`
            },
            description: () => {
                return ` <div class="d-flex">
                <div class="col-12 pl-0">
                    <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                        <div class="sdlms-floating-label">
                            Description
                        </div>
                        <textarea class="form-control" placeholder="Enter the description of the asset" name="asset_description" rows="4" no-of-characters maxlength="200" >${data.asset_description || ''}</textarea>
                        <label class="holder">
                            <span class="sdlms-text-primary-12px"><span show-characters>0</span>/200</span>
                        </label>
                    </div>
                </div>
            </div>`
            },
            action: () => {
                return `<div class="col-12 pl-0 d-flex mt-4 align-items-center task-asset-action justify-content-end">
                <button type="button" remove-asset="${data.asset_id}" class="sdlms-button button-secondary  button-md mr-3 d-flex align-items-center">Delete</button>
                <button type="submit" class="sdlms-button button-primary button-md d-flex align-items-center">Save</button>
            </div>`
            }
        }
        return components;
    }
    static others(data){
        console.log(data);
        let components  = {
            applicant : {
                container: function(){
                    return`<div class="mx-auto single-asset">
                    <div class="resize-drag sdlms-section sdlms-form-elements" >
                        <div class="sdlms-section-header shadow-none secondary-header align-items-center justify-content-between p-1 pl-3">
                            <div class="d-flex align-items-center sdlms-text-white-20px" >
                                <div class="d-flex justify-content-center align-items-center w-100 cursor-pointer">
                                    ${data.asset_type == 'input_asset' && !data.readonly ? Template.others(data).submit() : ''} 
                                    <span class="pt-1" content="text">${data.asset_title || ''}
                                ${data.asset_description !== "" ? `<i class="fa fa-info-circle sdlms-floating-right description-icon" aria-hidden="true" tid></i>` : ""}
                                </div>
                            </div>
                        </div>
                        ${data.asset_description !== "" ? `<div class="sdlms-section-body rounded-0 custom-padding-x-40 px-3" description-box><b>Description: </b> ${data.asset_description || ''}
                        </div>` : ''}
                        <div class="dtthon-asset--body sdlms-section-body p-0">
                            <div class="d-flex">
                                <div class="tab-content col-md-12 text-break p-0">
                                <div >
                                    </div>
                                    <div class="sdlms-asset border border-bottom-0" id="${data.id}"></div>          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
                //     return `<div class="w-100">
                //     <div class="py-0" student-assets>
                //         <div class="d-flex align-items-center sdlms-text-white-20px sdlms-section-header pt-1 shadow-none secondary-header align-items-center justify-content-between" header>
                //             <div class="d-flex justify-content-center align-items-center w-100 cursor-pointer" header-text>
                //                 <span class="pt-1" content="text">${data.asset_title || ''}</span>
                //             </div>
                //         </div>
                //         <div>
                //             <div class="tab-content pb-3 w-100">
                //                 <div class="sdlms-asset border border-bottom-0" id="${data.id}"></div>
                //                 <div collpsible>
                //                 <div class="align-items-center border border-bottom-0 py-2 primary-background sdlms-text-white-17px position-relative cursor-pointer custom-padding-x-40 d-flex font-weight-500 justify-content-between shadow-none" collapse>
                //                     <div class="d-flex align-items-center">Description</div>
                //                     <span class="sdlms-floating-right">
                //                         <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-icon.svg" collapse-icon alt="" />
                //                     </span>
                //                 </div>
                //                     <div class="sdlms-section-body  custom-padding-x-40 px-3" collapse-body>${data.asset_description || ''}</div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </div>                
                // `
                }
            },
            textarea : (data={content:{}})=>{
                return `<div class="d-flex pb-3">
                <div class="col-12">
                    <div class="d-flex flex-column align-items-center sdlms-floating-label-input mt-4 justify-content-between">
                        <div class="sdlms-floating-label">
                            Paste Your Link Here
                        </div>
                        <textarea class="form-control" ${data.readonly ? 'readonly disabled' : ''} placeholder="Enter the description of the asset" name="asset_description" rows="3" maxlength="100" >${data.content.content || ''}</textarea>
                    </div>
                </div>
            </div>`
            },
            url(url){
                url = String(url || '').trim();
                try {
                    let p = new URL(url);
                    if(p.pathname.includes('storyboard')) throw new Error('Storyboard not allowed');
                    if(p.pathname == location.pathname) throw new Error('Same Page');
                } catch (error) {
                    console.log(error);
                    return '/notFound/404'
                }
                return url.includes('?') ? url : url + '?';
            },
            image: {
                display : ()=>{
                    return `<img src="${String(data.asset_content || '').trim()}" class="w-100" alt="${data.asset_title || ''}">`
                },
                input : ()=>{
                    return Template.others().textarea(data);
                }
            },
            video: {
                display : ()=>{
                    return `<iframe id="frame-${data.id}" style="min-height:315px" class="w-100 border-0" src="${this.others().url(data.asset_content || '')}&no_header=1"></iframe>`
                },
                input : ()=>{
                    return Template.others().textarea(data);
                }
            },
            audio: {
                display : ()=>{
                  
                    return `<iframe id="frame-${data.id}" style="min-height:100px" class="w-100 border-0" src="${this.others().url(data.asset_content || '')}&no_header=1"></iframe>`
                },
                input : ()=>{
                    return Template.others().textarea(data);
                }
            },
            docs: {
                display : ()=>{
                    return `<iframe id="frame-${data.id}" style="min-height:800px" class="w-100 border-0" src="${this.others().url(data.asset_content || '')}&no_header=1"></iframe>`
                },
                input :()=>{
                    return Template.others().textarea(data);
                }
            },
            other :{
                display : ()=>{
                    return `<iframe  id="frame-${data.id}" scrolling="yes" style="min-height:600px" class="w-100 border-0" src="${this.others().url(data.asset_content || '')}&no_header=1"></iframe>`
                },
                input :()=>{
                    return Template.others().textarea(data);
                }
            },
            reflection:{
                display : ()=>{
                    return `<iframe id="frame-${data.id}" style="min-height:500px" class="w-100 border-0" src="${this.others().url(data.asset_content || '')}&no_header=1"></iframe>`
                },
                input :()=>{
                    return Template.others().textarea(data);
                }
            },
            submit : ()=>{
                return `<i class="fa fa-spinner sdlms-floating-left pt-1" save-applicant-asset aria-hidden="true" style="display: none" title="🙂It seems like you are searching to Save🙂 Click me 👆👆 to Save your Asset."></i>`
            }
        }
        return components;
    }
    static cards() {
        let components = {
            dtthonCard: {
                creatorProject: (data) => {
                return `<div project-cards class="col-xs-12 col-sm-6 col-md-3 col-lg-3 p-0 justify-content-center d-flex" id="card-${data.tid}">
                            <div class="score-card">
                                <div project-card-top data-tid="${data.tid}" data-status="${data.status}">
                                    <div class="score-card-tile-outer">
                                        <div class="score-card-tile-container">
                                            <div class="score-card-tile score-card-tile-visible p-0">
                                                <img class="score-card-image" src="${data.project_image ? data.project_image : "https://media.giphy.com/media/ITRemFlr5tS39AzQUL/giphy.gif"}">
                                            </div>
                                            <div class="score-card-tile score-card-tile-hidden hidden-detail"></div>
                                        </div>
                                    </div>
                                    <div class="score-card-copy pb-0">
                                        <b>${data.title}</b>
                                        <div class="light-text pt-2" style="font-size: var(--sdlms-font-size-16);">
                                            <p>Created at : ${moment(data.timestamp).format("DD MMM, YYYY")}</p>
                                            <p>Status : ${data.status}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row pt-2 px-3 pb-3">
                                    <div class="col-4">
                                        <div class="${data.uid === app.user.uid ? "custom-control custom-switch" : "d-none"}" >
                                            <input type="checkbox" class="custom-control-input active" active-switch ${data.isActive ? "checked" : ""} id="${data.tid}"  data-id="${data.tid}" data-category="${data.category}" data-isActive="${data.isActive}">
                                            <label class="custom-control-label light-text pt-1 active-lable" for="${data.tid}" style="font-size: var(--sdlms-font-size-14); font-weight: 700;"> ${data.isActive ? "Active" : ""}</label>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div class="d-flex justify-content-end">
                                            <span class="pr-2 pt-1 light-text" style="font-size: var(--sdlms-font-size-17);">
                                                ${data.applicants_count ? data.applicants_count : "0"}
                                            </span>
                                            <img src="https://sdlms.deepthought.education/assets/uploads/files/files/people-icon.svg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                },
                applicantProject: (data) => {
                    return `<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 p-0 justify-content-center d-flex" id="card-${data.tid}">
                    <div class="score-card" project-card data-id="${data.tid}">
                        <div class="score-card-tile-outer">
                            <div class="score-card-tile-container">
                                <div class="score-card-tile score-card-tile-visible p-0">
                                    <img class="score-card-image" src="${data.project_image ? data.project_image : "https://media.giphy.com/media/ITRemFlr5tS39AzQUL/giphy.gif"}">
                                </div>
                                <div class="score-card-tile score-card-tile-hidden hidden-detail">
                                    <p><b>Category : ${data.category}</b></p>
                                </div>
                            </div>
                        </div>
                        <div class="score-card-copy">
                            <b>${data.title}</b>
                            <div class="light-text pt-2" style="font-size: var(--sdlms-font-size-16);">
                                <p>Started at : ${moment(data.start_time || data.publishedAt).format("DD MMM, YYYY")}</p>
                                <p>Status : ${data.status}</p>
                            </div>
                        </div>
                    </div>
                </div>`
                },
                exploreProject: (data) => {
                    let learning_outcomes = data.learning_outcomes ? data.learning_outcomes.join(',') : "";
                    let Pre_requisites = data.pre_requisites ? data.pre_requisites.join(',') : "";
                    return `<div class="col-md-4 p-2">
                    <div class="explore-card bg-gray border p-3 cursor-pointer" style="border-radius: 0.5rem;" data-tid="${data.tid}" change-to-aprofile>
                        <div>
                            <div class="ml-auto">
                                <div class="row">
                                    <div class="col-6">
                                        <p class="sdlms-text-white-16px text-dark font-weight-bold m-0 text-ellipse">${data.title}</p>
                                        <p class="sdlms-text-white-12px text-dark m-0" style="color: rgba(0, 0, 0, 0.5) !important;">Date: ${moment(data.timestamp).format("DD MMM, YYYY")}</p>
                                        <p class="sdlms-text-white-14px text-dark">${data.category}</p>
                                    </div>
                                    <div class="align-items-start col-6 d-flex justify-content-end">
                                        <div class="d-flex align-items-center pl-0">
                                            <div class="user-img position-relative">
                                                <img src="https://sdlms.deepthought.education/assets//uploads/files/images/dt_logo.png" alt="" />
                                            </div>
                                            <div class="user-info pl-2">
                                            <div style="font-size: small;">${data.recruiter.username}</div>
                                                <div class="user-name sdlms-text-tertiary-16px font-weight-medium text-left">
                                                    <a href="https://deepthought.education/">DeepThought</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <img src="${data.project_image ? data.project_image : "https://thumbs.dreamstime.com/b/creative-mind-concept-hand-holding-colorful-brain-sketch-concrete-background-85126393.jpg"}" alt="" width="120" height="120" style="border-radius: 10px; object-fit: cover;" />
                                    </div>
                                    <div class="col-1"></div>
                                    <div class="col-6" style="padding:0">
                                        <p class="sdlms-text-white-14px text-dark mt-1 text-ellipse-4"style="-webkit-line-clamp: 6;">
                                        ${data.short_description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
                }
            }
        }
        return components;
    }
    static postercards() {
        let components = {
            posterCard:{
                profileCard:(data) =>{
                    return `<div project-cards data-slug="${data.slug}" class="col-xs-12 col-sm-6 col-md-3 col-lg-3 p-0 justify-content-center d-flex" data-id="${data._id}">
                    <div class="score-card">
                        <div class="score-card-tile-outer">
                            <div class="score-card-tile-container">
                                <div class="score-card-tile score-card-tile-visible p-0">
                                    <img class="score-card-image" src="${data.image ? data.image : "https://media.giphy.com/media/ITRemFlr5tS39AzQUL/giphy.gif"}">
                                </div>
                                <div class="score-card-tile score-card-tile-hidden hidden-detail"></div>
                            </div>
                        </div>
                        <div class="score-card-copy">
                            <b>${data.name}</b>
                            <div class="light-text pt-2" style="font-size: var(--sdlms-font-size-16);">
                                <b>Designation : ${data.designation}</b>
                                <p>Created at : ${moment(data.createdAt).format("DD MMM, YYYY")}</p>
                                
                            </div>
                            <div class="d-flex justify-content-end">
                                <div class="d-flex justify-content-end align-items-end mr-3 active-state"></div>
                                <span class="pr-2 pt-1 light-text" style="font-size: var(--sdlms-font-size-17);">
                                    ${data.applicants_count ? data.applicants_count : "0"}
                                </span>
                                <img src="https://sdlms.deepthought.education/assets/uploads/files/files/people-icon.svg" />
                            </div>
                        </div>
                    </div>
                </div>`
                }
            }
        }
        return components;
    }
    
    static escalationengine(){
        let components = {
            journal : {
                textarea : () => `<textarea name="notice" style="text-align: left;" id="createor-notice" class="form-control"
                    rows="10"></textarea>`
            }
        }
        return components;
    }
   
}