class MobileTOCTemplate {
  constructor() { }

  static todo() {
    const getRandomColor = function (opacity = 50) {
      const colors = ['#CDC7E5', '#FCDDF2', '#D9FFF8', '#E6EBE0', '#E4DFDA', '#BFEDC1', '#B2FFA8', '#F2DFD7', '#D2F1E4', '#D7FFAB',];
      return colors[Math.floor(Math.random() * colors.length)] + opacity;
    }
    let components = {
      card: (data) => {
        // let attributes = Object.keys(data).map(key => `data-${key}="${data[key]}"`).join(" ");
        // console.log(attributes);
        return `<div class="border m-2 col-md-3 p-2 profile-reflection-card shadow" single-todo data-_id="${data._id}" style="background: #fff;">
                    <div class="p-2">
                        <div class="row">
                            <div class="col-8 todo-card-header">
                            <input type="checkbox" data-_id="${data._id}" ${data.status == 'done' ? "checked" : ""}  name="isCompleted" class="mr-2">${data.priority}-${data.priority_reason}</div>
                            <div class="col-4 d-flex font-10 justify-content-end">${moment(data.updatedAt).fromNow()}</div>
                        </div>
                        <div class="profile-reflection-card-text pt-2" style="font-size: medium;">${data.title}</div>
                        <div class style="font-size: smaller;">${data.description}</div>
                        <div class="d-flex  justify-content-end mt-1 sdlms-text-white-12px text-dark">
                            <div class="d-flex justify-content-end">
                                <div class="todo-edit-button mr-3" data-_id="${data._id}" data-description="${data.description}" data-title="${data.title}" data-reason="${data.priority}" data-priority_reason="${data.priority_reason}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                <div class="d-flex">     
                                <a class="btn btn-sm btn-link text-muted" id="delete" data-id="645035416998e53d8cf04c1d"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                                <a class="btn btn-sm btn-link text-muted" id="delete" data-id="645035416998e53d8cf04c1d"><i class="fas fa-trash" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
      },
      // desktopcard: (data) => {
      //     // let attributes = Object.keys(data).map(key => `data-${key}="${data[key]}"`).join(" ");
      //     // console.log(attributes);
      //     return `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 p-0 m-1  justify-content-center d-flex profile-reflection-card shadow" single-todo data-_id="${data._id}" style="background: #fff;border-radius: 10px;">
      //         <div class="p-2">
      //             <div class="row">
      //                 <div class="col-8 todo-card-header">
      //                 <input type="checkbox" data-_id="${data._id}" ${data.status == 'done' ? "checked" : ""}  name="isCompleted" class="mr-2">${data.priority}-${data.priority_reason}</div>
      //                 <div class="col-4 d-flex font-10 justify-content-end">${moment(data.updatedAt).fromNow()}</div>
      //             </div>
      //             <div class="profile-reflection-card-text pt-2" style="font-size: medium;">${data.title}</div>
      //             <div class style="font-size: smaller;">${data.description}</div>
      //             <div class="d-flex  justify-content-end mt-1 sdlms-text-white-12px text-dark">
      //                 <div class="d-flex justify-content-end">
      //                     <div class="todo-edit-button mr-3" data-_id="${data._id}" data-description="${data.description}" data-title="${data.title}" data-reason="${data.priority}" data-priority_reason="${data.priority_reason}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
      //                     <div class="todo-delete-button" data-_id="${data._id}"><i class="fa fa-trash" aria-hidden="true"></i></div>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>`
      // },
      desktopcard: (data) => {
        return `
        <tr class="common-border-radius" style="background: ${getRandomColor()}" id="task${data._id}">
          <td> 
          ${data.isCompleted ? `<i class="fa fa-check-square-o complete-task-check cursor-pointer" id="taskCheck-${data._id}" data-isCompleted="${data.isCompleted}" data-id="${data._id}" aria-hidden="true"></i>`
            : `<i class="fa fa-square-o complete-task-check cursor-pointer" id="taskCheck-${data._id}" data-isCompleted="${data.isCompleted}" data-id="${data._id}" aria-hidden="true"></i>`}
          </td>
          <td>${moment(data.createdAt).format('MMM D, h:mm a')}</td>
          <td> ${data.isCompleted ? `<p class="form-check-label complete-task text-break" id="tasklabel${data._id}" for="task-${data._id}"> ${data.title}</p>`
          : `<p class="form-check-label text-break" id="tasklabel${data._id}" for="task-${data._id}"> ${data.title}</p>`}</td>
          <td>
          <button type="button" class="btn btn-link text-muted" data-toggle="popover" data-content="${data.description}" data-placement="bottom">
          Show Description
        </button>
          </td>
          <td> <div class="text-muted my-auto">
          ${data.isUrgent ? `<span class="badge badge-danger">Urgent</span>` : `<span></span>`}
          ${data.isImportant ? `<span class="badge badge-warning">Important</span>` : `<span></span>`}
        </div></td>
        <td><a class="btn btn-sm btn-link text-muted" id="delete" data-id="${data._id}"><i class="fas fa-trash" aria-hidden="true"></i></a></td>
        </tr>
        `
      },
      // desasdsadktopcard: (data) => {
      //   // let attributes = Object.keys(data).map(key => `data-${key}="${data[key]}"`).join(" ");
      //   // console.log(attributes);
      //   return `<div class="col-sm-6 col-md-4 col-lg-4 mb-4 todo-tasks" id="task${data._id}">
      //           ${data.isCompleted ? `<i class="fa fa-check-square-o complete-task-check form-check-input cursor-pointer" id="taskCheck-${data._id}" data-isCompleted="${data.isCompleted}" data-id="${data._id}" aria-hidden="true"></i>`
      //       : `<i class="fa fa-square-o complete-task-check form-check-input cursor-pointer" id="taskCheck-${data._id}" data-isCompleted="${data.isCompleted}" data-id="${data._id}" aria-hidden="true"></i>`}
      //           <div class="card" style="border: 0; background: ${getRandomColor()}; border-radius: 20px; min-height: 266px;" ">
      //             <div class="card-body">
      //             <div class="d-flex justify-content-between">
      //               </div>
      //               <div class="">
      //               <div class="d-flex justify-content-between">
      //                 ${data.isCompleted ? `<p class="form-check-label complete-task text-break" id="tasklabel${data._id}" for="task-${data._id}"> ${data.title}</p>`
      //       : `<p class="form-check-label text-break" id="tasklabel${data._id}" for="task-${data._id}"> ${data.title}</p>`}
      //                 <div class="d-flex">
      //                 <a class="btn btn-sm btn-link text-muted" id="delete" data-id="${data._id}"><i class="fas fa-trash" aria-hidden="true"></i></a>
      //                 <a class="btn btn-sm btn-link text-muted" id="edittodo" data-toggle="modal" data-target="#editmodal" data-id="${data._id}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
      //                 </div>
      //                 </div>
      //                 <div class="text-muted my-auto">
      //                   ${data.isUrgent ? `<span class="badge badge-danger">Urgent</span>` : `<span></span>`}
      //                   ${data.isImportant ? `<span class="badge badge-warning">Important</span>` : `<span></span>`}
      //                 </div>                     
      //               </div>
      //               <div class="d-flex justify-content-between align-items-center">
      //                 <div class="text-muted">
      //                 <small class="text-ellipse-4">${data.description}</small>
      //                 </div>
                      
      //               </div>
      //               ${data.assignedBy ? ` <small class="text-muted">Assigned by: ${data.assignedBy}</small>` : ""}
      //               <hr>
      //               <div class="d-flex justify-content-between align-items-center" style="
      //                   position: absolute;
      //                   bottom: 35px;
      //                   left: 24px;
      //               ">
      //               <div class="text-muted my-auto">
      //                 <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="none">
      //                 <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18ZM10 4C9.73479 4 9.48043 4.10536 9.2929 4.29289C9.10536 4.48043 9 4.73478 9 5V9.42L6.9 10.63C6.70736 10.7392 6.5564 10.9092 6.47078 11.1134C6.38517 11.3176 6.36975 11.5444 6.42695 11.7583C6.48414 11.9722 6.61072 12.1611 6.78682 12.2953C6.96292 12.4296 7.17859 12.5015 7.4 12.5C7.57518 12.5012 7.7476 12.4564 7.9 12.37L10.5 10.87L10.59 10.78L10.75 10.65C10.7891 10.6005 10.8226 10.5468 10.85 10.49C10.8826 10.4363 10.9094 10.3793 10.93 10.32C10.9572 10.2564 10.9741 10.1889 10.98 10.12L11 10V5C11 4.73478 10.8946 4.48043 10.7071 4.29289C10.5196 4.10536 10.2652 4 10 4Z" fill="black"></path>
      //                 </svg>
      //                 ${data.scheduleFrom ? `${moment(data.scheduleFrom).format('HH:mm')} - ${moment(data.scheduleTo).format('HH:mm')},${moment(data.scheduleFrom).format(' DD-MMMM')}</small>`
      //       : ` <button data-id="${data._id}" id="scheduleButton" schedule class="btn btn-link p-0 text-dark text-decoration-none" data-toggle="modal" data-target="#scheduleModal">
      //                 <span>📅</span> Schedule
      //               </button> `}
                      
      //                 </div>
                     
      //                 <div class=" d-flex justify-content-between align-items-end">
                  
      //             <div class="ml-auto my-auto mb-3 ml-auto mr-3">
      //           </div>
                  
      //           </div>
                
      //                 <!-- <div class="form-check">
      //                   ${data.isCompleted ? ` <div class="custom-control custom-switch">
      //                   <input data-id="${data._id}" type="checkbox" class="custom-control-input complete-task-check" id="switch1${data._id}" checked>
      //                   <label class="custom-control-label" for="switch1${data._id}" style="color: #000; font-weight: bold; font-size: 18px;">Completed</label>
      //                   <div class="custom-control-indicator"></div>
      //               </div>` : `<div class="custom-control custom-switch">
      //               <input data-id="${data._id}" type="checkbox" class="custom-control-input complete-task-check" id="switch1${data._id}">
      //                   <label class="custom-control-label" for="switch1${data._id}" style="color: #000; font-weight: bold; font-size: 18px;">Complete</label>
      //                   <div class="custom-control-indicator"></div>
      //               </div>` }
                       
      //                 </div> -->
      //               </div>
      //               <small class="float-right mt-1 my-auto" style="
      //                   position: absolute;
      //                   bottom: 15px;
      //                   right: 26px;
      //               ">${moment(data.createdAt).format('MMM D, h:mm a')}</small>
      //               <div class="card mt-3 schedulecollapse d-none" id="schedule-form${data._id}">
      //                 <div class="card-body">
      //                 <form id="scheduledata${data._id}" class="">
      //                 <div class="form-group">
      //                 <label for="datetime" class="">Date and Time:</label>
      //                 <div class="input-group">
      //                   <div class="input-group-prepend">
      //                     <span class="input-group-text"><i class="far fa-calendar-alt" aria-hidden="true"></i></span>
      //                   </div>
      //                   <input type="datetime-local" class="form-control" id="datetime" name="scheduleFrom">
      //                 </div>
      //               </div>
      //               <div class="form-group">
      //                 <label for="datetime" class="">Date and Time:</label>
      //                 <div class="input-group">
      //                   <div class="input-group-prepend">
      //                     <span class="input-group-text"><i class="far fa-calendar-alt" aria-hidden="true"></i></span>
      //                   </div>
      //                   <input type="datetime-local" class="form-control" id="datetime" name="scheduleTo">
      //                 </div>
      //               </div>
      //               <button class="btn button-primary submit-schedule" type="submit" data-id="${data._id}">Submit</button>
      //               <button class="btn btn-dark close-collapse" data-id="${data._id}" >Close</button>
      //               </form>
      //               <div>
                           
      //                   </div>
      //                 </div>
      //               </div>
      //             </div>
                  
      //           </div>
      //         </div>`
      // },
      // journalcard: (data) => {
      //     return `<div class="card mt-3" data-journal-id="${data._id}">
      //     <div class="card-body">
      //         <p data-id="${data._id}" contenteditable="true" class="">${data.content}</p>
      //         <div class="d-flex justify-content-between align-items-center">
      //             <div class="tags">
      //                 <span class="badge badge-warning">${data.category}</span>
      //                 <span class="badge badge-warning">${data.reason}</span>
      //             </div>
      //         </div>
      //         <div class="align-items-end d-flex justify-content-between mt-3">
      //             <div class="d-flex">
      //                 ${data.isPublished ? 
      //                   `<button disabled class="btn btn-primary button-primary float-right rounded-sm sdlms-button" data-published-id="${data._id}">Published</button>`
      //                    : `<button class="btn btn-primary button-primary float-right rounded-sm sdlms-button" data-publish-id="${data._id}" journalpublishbutton>Publish</button>`
      //                   }
      //                 <button class="btn btn-danger ml-2 mt-auto" data-id="${data._id}" journaldeletebutton>Delete</button>
      //             </div>

      //             <div class="text-secondary">${moment(data.updatedAt).fromNow()}</div>
      //         </div>
      //     </div>
      // </div>`
      // },
      journalcard: (data) => {
        console.log(data)
        return `<div class="card mt-3" data-journal-id="${data._id}" style="
              border-radius: 20px;background: ${getRandomColor()};">
              <div class="card-body" style="font-size: 14px;">
              <div class="d-flex justify-content-between align-items-center mb-3">
                ${data.category ? ` <span class="">${data.category} </span> ` : ``}
              
                <div class="text-secondary timestamp">${moment(data.createdAt).format("MMMM Do YYYY")}</div>
              </div>
              <div class="border p-2 rounded" style="font-size: 16px;">
                <div contenteditable="true" class="journal-content p-0 m-0" data-id="${data._id}">
                ${data.content}
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-3">
                <div>
                 ${data.isPublished ? ` <button class="btn rounded-pill disabled" data-published-id="${data._id}" title="Published"><i class="fa fa-check" aria-hidden="true"></i></button>` :
            ` <button class="btn rounded-pill" data-publish-id="${data._id}" journalpublishbutton><i class="fa fa-check" aria-hidden="true"></i></button>`}
                  <button class="btn rounded-pill" data-id="${data._id}" journaldeletebutton=""><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>
                ${data.reason ? ` <div class="text-secondary ">${data.reason}</div>` : ``}
               
              </div>
            </div>            
          </div>`
      },
      pubslishedJournalCard: (data) => {
        console.log(data)
        //     return `<div class="card mt-3" data-journal-id="${data._id}" style="
        //     border-radius: 20px;">
        //     <div class="card-body" style="font-size: 14px;">
        //     <div class="d-flex justify-content-between align-items-center mb-3">
        //     ${data.category ? ` <span class="">${data.category} </span> ` : `` }
        //       <div class="text-secondary timestamp">${moment(data.createdAt).format("MMMM Do YYYY")}</div>
        //     </div>
        //     <div class="border p-2 rounded" style="font-size: 16px;">
        //       <div  class="journal-content p-0 m-0" data-id="${data._id}">
        //       ${data.content}
        //       </div>
        //     </div>
        //     <div class="d-flex justify-content-between align-items-center mt-3">

        //     ${data.reason ? ` <div class="text-secondary ">${data.reason}</div>`: `` }
        //     </div>
        //   </div>            
        // </div>`
        let iconSet = {
          Celebration: "🎉",
          Insight: "🤔",
          Heuristic: "💡"
        }
        console.log(iconSet[data.category])
        return `<div class="card mt-2 mx-auto w-83" data-journal-id="${data._id}" style="background: ${getRandomColor()};border-radius: 20px;">
    <div class="card-body p-3" style="font-size: 14px;">
        <div class="p-0 row" collapse="">
            <div class="col-12 d-flex justify-content-between">
                <div class="d-flex">
                    <div class="mr-2 my-auto">
                        <img class="explore-profile-image" src="${data.user.picture}" style="width: 10px;" />
                    </div>
                    <div class="justify-content-start my-auto pb-1">
                        <div class="explore-card-text-header font-weight-medium text-ellipse-2">${data.user.username}</div>
                    </div>
                </div>
                <div>${iconSet[`${data.category}`]}</div>
            </div>
        </div>
        <div class="d-flex" style="font-size: 16px;">
            <div class="journal-content m-0 p-0 text-ellipse-4" data-id="${data._id}" >${data.content}</div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="text-secondary">#${data.reason}</div>
            <div class="text-secondary">${moment(data.createdAt).format("MMMM Do YYYY")}</div>
        </div>
    </div>
</div>
`
      },


    }
    return components;
  }
  static grow() {
    const getRandomColor = function (opacity = 50, from) {
      let colors = ['#CDC7E5', '#FCDDF2', '#D9FFF8', '#E6EBE0', '#E4DFDA', '#BFEDC1', '#B2FFA8', '#F2DFD7', '#D2F1E4', '#D7FFAB',];
      if (from = 'button') {
        console.log('insisde button')
        let colors = ['#33333380', '#00000080', '#FFFFFF80'];
      }

      return colors[Math.floor(Math.random() * colors.length)] + opacity;
    }
    let components = {
      startReflection: (data) => {
        return `<div class="row">
          <!-- timeline item 1 left dot -->
          <div class="col-auto text-center flex-column d-none d-sm-flex">
            <div class="row h-50">
              <div class="col">&nbsp;</div>
              <div class="col">&nbsp;</div>
            </div>
            <h5 class="m-2">
            <span class="badge badge-pill bg-light border border-primary border-3">&nbsp;</span>
            </h5>
            <div class="row h-50">
              <div class="col border-right">&nbsp;</div>
              <div class="col">&nbsp;</div>
            </div>
          </div>
          <!-- timeline item 1 event content -->
          <div class="col py-2">
            <div class="card  border-0 ">
              <div class="card-body bg-light common-border-radius shadow">
              <div class="d-flex justify-content-between">
              <div>
                <h4 class="card-title">${moment(data.createdAt).format('dddd')}</h4>
                <div class=" text-muted">${moment(data.createdAt).format('MMMM Do YYYY')}</div>
              </div>
              <div>
                <svg  class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 31 31" fill="none" deletereflectionbutton data-id="${data._id}">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5411 5.01656C11.8485 5.01656 11.287 5.57805 11.287 6.27069H18.8118C18.8118 5.57805 18.2503 5.01656 17.5576 5.01656H12.5411ZM21.32 8.77895H8.77873V21.3203C8.77873 23.3982 10.4632 25.0826 12.5411 25.0826H17.5576C19.6356 25.0826 21.32 23.3982 21.32 21.3203V8.77895ZM6.27047 8.77895V21.3203C6.27047 24.7834 9.07793 27.5909 12.5411 27.5909H17.5576C21.0208 27.5909 23.8283 24.7834 23.8283 21.3203V8.77895H25.0824C25.7751 8.77895 26.3366 8.21746 26.3366 7.52482C26.3366 6.83218 25.7751 6.27069 25.0824 6.27069H21.32C21.32 4.19278 19.6356 2.5083 17.5576 2.5083H12.5411C10.4632 2.5083 8.77873 4.19278 8.77873 6.27069H5.01634C4.3237 6.27069 3.76221 6.83218 3.76221 7.52482C3.76221 8.21746 4.3237 8.77895 5.01634 8.77895H6.27047Z" fill="#333333"></path>
                </svg>
                <svg sharereflectionbutton data-id="${data._id}" class="cursor-pointer ml-2" xmlns="http://www.w3.org/2000/svg" width="15" height="19" viewBox="0 0 20 20" fill="none">
              <path d="M7 11.5L13 14.5M13 5.5L7 8.5M16 19C14.3431 19 13 17.6569 13 16C13 14.3431 14.3431 13 16 13C17.6569 13 19 14.3431 19 16C19 17.6569 17.6569 19 16 19ZM4 13C2.34315 13 1 11.6569 1 10C1 8.34315 2.34315 7 4 7C5.65685 7 7 8.34315 7 10C7 11.6569 5.65685 13 4 13ZM16 7C14.3431 7 13 5.65685 13 4C13 2.34315 14.3431 1 16 1C17.6569 1 19 2.34315 19 4C19 5.65685 17.6569 7 16 7Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              </div>
              </div>
                <div class="card-text" reflectionText id="reflection${data._id}">${data.reflection}</div>
              </div>
            </div>
          </div>
        </div>`
      },

      midReflectionLeft: (data) => {
        return `<div class="row">
            <div class="col-auto text-center flex-column d-none d-sm-flex">
              <div class="row h-50">
                <div class="col border-right">&nbsp;</div>
                <div class="col">&nbsp;</div>
              </div>
              <h5 class="m-2">
                <span class="badge badge-pill bg-light border border-primary border-3">&nbsp;</span>
              </h5>
              <div class="row h-50">
                <div class="col border-right">&nbsp;</div>
                <div class="col">&nbsp;</div>
              </div>
            </div>
            <div class="col py-2">
            <div class="card  border-0">
            <div class="card-body bg-light common-border-radius shadow">
                <div class="d-flex justify-content-between">
              <div>
                <h4 class="card-title">${moment(data.createdAt).format('dddd')}</h4>
                <div class=" text-muted">${moment(data.createdAt).format('MMMM Do YYYY')}</div>
              </div>
              <div>
                <svg  class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 31 31" fill="none" deleteReflectionButton data-id="${data._id}">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5411 5.01656C11.8485 5.01656 11.287 5.57805 11.287 6.27069H18.8118C18.8118 5.57805 18.2503 5.01656 17.5576 5.01656H12.5411ZM21.32 8.77895H8.77873V21.3203C8.77873 23.3982 10.4632 25.0826 12.5411 25.0826H17.5576C19.6356 25.0826 21.32 23.3982 21.32 21.3203V8.77895ZM6.27047 8.77895V21.3203C6.27047 24.7834 9.07793 27.5909 12.5411 27.5909H17.5576C21.0208 27.5909 23.8283 24.7834 23.8283 21.3203V8.77895H25.0824C25.7751 8.77895 26.3366 8.21746 26.3366 7.52482C26.3366 6.83218 25.7751 6.27069 25.0824 6.27069H21.32C21.32 4.19278 19.6356 2.5083 17.5576 2.5083H12.5411C10.4632 2.5083 8.77873 4.19278 8.77873 6.27069H5.01634C4.3237 6.27069 3.76221 6.83218 3.76221 7.52482C3.76221 8.21746 4.3237 8.77895 5.01634 8.77895H6.27047Z" fill="#333333"></path>
                </svg>
                <svg sharereflectionbutton data-id="${data._id}" class="cursor-pointer ml-2" xmlns="http://www.w3.org/2000/svg" width="15" height="19" viewBox="0 0 20 20" fill="none">
              <path d="M7 11.5L13 14.5M13 5.5L7 8.5M16 19C14.3431 19 13 17.6569 13 16C13 14.3431 14.3431 13 16 13C17.6569 13 19 14.3431 19 16C19 17.6569 17.6569 19 16 19ZM4 13C2.34315 13 1 11.6569 1 10C1 8.34315 2.34315 7 4 7C5.65685 7 7 8.34315 7 10C7 11.6569 5.65685 13 4 13ZM16 7C14.3431 7 13 5.65685 13 4C13 2.34315 14.3431 1 16 1C17.6569 1 19 2.34315 19 4C19 5.65685 17.6569 7 16 7Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              </div>
              </div>
              <div class="card-text" reflectionText id="reflection${data._id}">${data.reflection}</div>
                </div>
              </div>
            </div>
          </div>`
      },

      endReflection: (data) => {
        return `<div class="row">
            <div class="col-auto text-center flex-column d-none d-sm-flex">
              <div class="row h-50">
                <div class="col border-right">&nbsp;</div>
                <div class="col">&nbsp;</div>
              </div>
              <h5 class="m-2">
                <span class="badge badge-pill bg-light border border-primary border-3">&nbsp;</span>
              </h5>
              <div class="row h-50">
                <div class="col">&nbsp;</div>
                <div class="col">&nbsp;</div>
              </div>
            </div>
            <div class="col py-2">
            <div class="card border-0">
            <div class="card-body bg-light common-border-radius shadow">
                <div class="d-flex justify-content-between">
                <div>
                  <h4 class="card-title">${moment(data.createdAt).format('dddd')}</h4>
                  <div class=" text-muted">${moment(data.createdAt).format('MMMM Do YYYY')}</div>
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 31 31" fill="none" class="cursor-pointer" deleteReflectionButton data-id="${data._id}">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5411 5.01656C11.8485 5.01656 11.287 5.57805 11.287 6.27069H18.8118C18.8118 5.57805 18.2503 5.01656 17.5576 5.01656H12.5411ZM21.32 8.77895H8.77873V21.3203C8.77873 23.3982 10.4632 25.0826 12.5411 25.0826H17.5576C19.6356 25.0826 21.32 23.3982 21.32 21.3203V8.77895ZM6.27047 8.77895V21.3203C6.27047 24.7834 9.07793 27.5909 12.5411 27.5909H17.5576C21.0208 27.5909 23.8283 24.7834 23.8283 21.3203V8.77895H25.0824C25.7751 8.77895 26.3366 8.21746 26.3366 7.52482C26.3366 6.83218 25.7751 6.27069 25.0824 6.27069H21.32C21.32 4.19278 19.6356 2.5083 17.5576 2.5083H12.5411C10.4632 2.5083 8.77873 4.19278 8.77873 6.27069H5.01634C4.3237 6.27069 3.76221 6.83218 3.76221 7.52482C3.76221 8.21746 4.3237 8.77895 5.01634 8.77895H6.27047Z" fill="#333333"></path>
                  </svg>
                  <svg sharereflectionbutton data-id="${data._id}" class="cursor-pointer ml-2" xmlns="http://www.w3.org/2000/svg" width="15" height="19" viewBox="0 0 20 20" fill="none">
              <path d="M7 11.5L13 14.5M13 5.5L7 8.5M16 19C14.3431 19 13 17.6569 13 16C13 14.3431 14.3431 13 16 13C17.6569 13 19 14.3431 19 16C19 17.6569 17.6569 19 16 19ZM4 13C2.34315 13 1 11.6569 1 10C1 8.34315 2.34315 7 4 7C5.65685 7 7 8.34315 7 10C7 11.6569 5.65685 13 4 13ZM16 7C14.3431 7 13 5.65685 13 4C13 2.34315 14.3431 1 16 1C17.6569 1 19 2.34315 19 4C19 5.65685 17.6569 7 16 7Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              </div>
                </div>
                <div class="card-text" reflectionText id="reflection${data._id}">${data.reflection}</div>
                </div>
              </div>
            </div>
          </div>`
      },
      reflection: (data) => {
        return `
          <div class="card  border-0">
          <div class="card-body bg-light common-border-radius shadow">
              <div class="d-flex justify-content-between">
              <div>
                <h4 class="card-title">${moment(data.createdAt).format('dddd')}</h4>
                <div class=" text-muted">${moment(data.createdAt).format('MMMM Do YYYY')}</div>
              </div>
                
              </div>
             <div class="card-text" reflectionText id="reflection${data._id}">${data.reflection}</div>
              </div>
            </div>
          </div>`
      },
      publishedReflections: (data) => {
        console.log(data)
        return `<div class="card mt-3 shadow" data-journal-id="${data._id}" style="background: ${getRandomColor()}; border-radius: 20px;text-align: left;">
        <div class="card-body p-3" style="font-size: 14px;">
            <div class="p-0 row" collapse="">
                <div class="col-12 d-flex justify-content-between">
                    <div class="d-flex">
                        <div class="mr-2 my-auto">
                            <img class="explore-profile-image" src="${data.user.picture}" style="width: 20px;" />
                        </div>
                        <div class="justify-content-start my-auto pb-1">
                            <div class="explore-card-text-header font-weight-medium text-ellipse-2">${data.user.username}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex" style="font-size: 16px;">
                <div>
                    <div class="font-weight-500 text-ellipse">${data.learning}</div>
                    <div class="journal-content m-0 p-0 small text-ellipse-4" data-id="${data._id}">
                        ${data.reflection}
                    </div>
                </div>
            </div>
            <div class="mt-2 d-flex justify-content-between" style="">
                <!-- <button class="btn btn-sm shadow-sm" style="background:${getRandomColor(50, 'button')}"> 🎉 Celebrate</button> -->
                <div class="text-secondary mt-1">${moment(data.createdAt).fromNow()}</div>
            </div>
        </div>
    </div>
    `
      },
    }
    return components;
  }
}