class ScorecardTemplate {
    constructor() { }

    static scorecard() {
        let components = {
            dashboard: {
                createScorecard: () => {
                    return `<div new-score-card class="col-xs-12 col-sm-6 col-md-3 col-lg-3 p-0 justify-content-center d-flex">
                    <div class="score-card">
                        <div class="score-card-tile-outer" style="background-color: #c6c9cb17 !important; height: 18em; border-radius: 10px;">
                            <div class="score-card-tile-container" style="height: 18em; background: #c6c9cb00;">
                                <div>
                                    <div class="m-4 d-flex flex-column align-items-center justify-content-between">
                                        <textarea score-card-title class="form-control" placeholder="Enter Title for Score Card" rows="2" style="border-radius: 0px;"></textarea>
                                    </div>
                                    <div add-new-score-card class="m-4 d-flex justify-content-center" style="border-radius: 100%;">
                                        <svg class="add-score-card" width="75" height="75" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="#0029FF"></path>
                                        </svg>
                                        <br>
                                        <br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
                },
                viewScorecard: (data) => {
                    return `<div scorecard-card class="col-xs-12 col-sm-6 col-md-3 col-lg-3 p-0 d-flex justify-content-center" data-tid="${data.tid}" data-status="${data.status}" id="card-${data.tid}">     
                    <div class="score-card">    
                        <div class="score-card-top" data-tid="${data.tid}" data-status="${data.status}">
                            <div class="score-card-tile-outer">
                                    <div class="score-card-tile-container">
                                        <div class="score-card-tile score-card-tile-visible p-0">
                                            <div class="image" style="height: 15em;">
                                                <img class="score-card-image" src="https://media.giphy.com/media/l378c04F2fjeZ7vH2/giphy.gif" />
                                                <div class="pt-2 highlight-color score-card-heading">${data.title}</div>
                                            </div>
                                        </div>
                                        <div class="score-card-tile score-card-tile-hidden" style="background: darkgray;">
                                            <p><b>Congratulaions!!!</b></p>
                                            <p>Your scorecard is successfully created. explore further and add additional parameters and sub-parameters for marking.</p>
                                        </div>
                                    </div>
                            </div>
                            <div class="score-card-copy">
                                <b>${data.status.charAt(0).toUpperCase() + data.status.slice(1)}</b>
                                <div class="light-text pt-2" style="font-size: var(--sdlms-font-size-16);">
                                    <p>Created at : ${moment(data.createdAt).format("DD MMM, YYYY")}</p>
                                    <div class="scorecard-details"></div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between pt-2 px-3 pb-3 active-state"></div>
                    </div>
                </div>`
                },
            },
            creatorScorecard: {
                taskBox: function () {
                    return `
                    <div class="sdlms-section session-view sdlms-form-elements" id="element">
                    <section>
                        <details open="">
                            <summary class="sdlms-collapse py-2 font-weight-bold text-center drop-box-heading">
                                Contribution and Value creation</summary>
                            <div class="row">
                                <div class="col-3 col-lg-3">
                                    <div class="sdlms-spacer">
                                        <ol class=" list-group font-list">
                                            <li class=" row-col-2 list-group-item headingbeforeafter">
                                                <i class="fa fa-info-circle fa-lg icon-i" aria-hidden="true"
                                                    id="icon1"></i>
                                                Value creation
                                            </li>
                                            <div class=" sdlms-subthreads listbox">
                                                <div>
                                                    <li class="list-group-item">
                                                        <label for="1">
                                                            <input type="radio" class="radio-btn" name="rubric1" id="1">
                                                            <span class="design"></span>
                                                        </label>
                                                        <span style="color:blue; margin-left:10px">
                                                            2
                                                        </span>-Justified
                                                    </li>
                                                </div>
                                                <div>
                                                    <li class="list-group-item">
                                                        <label for="2">
                                                            <input type="radio" class="radio-btn" name="rubric1" id="2">
                                                            <span class="design"></span>
                                                        </label>
                                                        <span style="color:blue; margin-left:10px">
                                                            2
                                                        </span>-Justified
                                                    </li>
                                                </div>
                                                <div>
                                                    <li class="list-group-item">
                                                        <label for="3">
                                                            <input type="radio" class="radio-btn" name="rubric1" id="3">
                                                            <span class="design"></span>
                                                        </label>
                                                        <span style="color:blue; margin-left:10px">
                                                            2
                                                        </span>-Justified
                                                    </li>
                                                </div>

                                            </div>
                                            <p class="text-place px-4 py-2 textbox hidden">
                                                The IMPACT Articulation and Phonology Rating Scale evaluates a
                                                child’s
                                                speech characteristics, as well as the impact of a speech disorder
                                                on a
                                                child’s social interactions, academic life, and home/after school
                                                life
                                            </p>


                                            <div class="form-group" style="width:110%;" height:42px;font-weight:=""
                                                var(--sdlms-font-weight-medium);="">
                                                <label for="exampleFormControlTextarea1"></label>
                                                <textarea class="form-control" placeholder="Type your Observations"
                                                    id="exampleFormControlTextarea1" rows="3"
                                                    style="box-shadow: none; border: 0.5px solid #ccc;"></textarea>
                                            </div>
                                            <li class="p-2 sdlms-featured-card-author-area list-num" id="score-shadow" style="width:110%;"
                                                height:42px;font-weight:="" var(--sdlms-font-weight-medium);=""> Score
                                                - <span style="color:blue; margin-left:10px">
                                                            2
                                                        </span>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                <div class="col-3 col-lg-3 boxy">
                                    <div class="sdlms-spacer">
                                        <ol class=" list-group font-list">
                                            <li class=" row-col-2 list-group-item headingbeforeafter ">
                                                <i class="fa fa-info-circle fa-lg icon-i" aria-hidden="true"
                                                    id="icon2"></i>
                                                Impact Articulation

                                            </li>
                                            <div class="sdlms-subthreads listbox2">
                                                <li class="list-group-item">
                                                    <label>
                                                        <input type="radio" class="radio-btn" name="rubric2" id="1">
                                                        <span class="design"></span>
                                                    </label>
                                                    <span style="color:blue; margin-left:10px">
                                                        2
                                                    </span>-Justified
                                                </li>
                                                <li class="list-group-item">
                                                    <label>
                                                        <input type="radio" class="radio-btn" name="rubric2" id="2">
                                                        <span class="design"></span>
                                                    </label>
                                                    <span style="color:blue; margin-left:10px">
                                                        2
                                                    </span> -Partial Explanation
                                                </li>
                                                <li class="list-group-item">
                                                    <label>
                                                        <input type="radio" class="radio-btn" name="rubric2" id="3">
                                                        <span class="design"></span>
                                                    </label>
                                                    <span style="color:blue; margin-left:10px">
                                                        2
                                                    </span>-Unable to explain
                                                </li>
                                            </div>
                                            <p class="text-place px-4 py-2 textbox2 hidden">
                                                The IMPACT Articulation and Phonology Rating Scale evaluates a
                                                child’s
                                                speech characteristics, as well as the impact of a speech disorder
                                                on a
                                                child’s social interactions, academic life, and home/after school
                                                life
                                            </p>
                                            <div class="form-group" style="width:110%;" height:42px;font-weight:=""
                                                var(--sdlms-font-weight-medium);="">
                                                <label for="exampleFormControlTextarea1"></label>
                                                <textarea class="form-control" placeholder="Type your Observations"
                                                    id="exampleFormControlTextarea1" rows="3"
                                                    style="box-shadow: none; border: 0.5px solid #ccc;"></textarea>
                                            </div>
                                            <li class="p-2 sdlms-featured-card-author-area list-num" id="score-shadow" style="width:110%;"
                                                height:42px;="">Score -<span style="color:blue; margin-left:10px">
                                                            2
                                                        </span>
                                                        </li>
                                        </ol>
                                    </div>

                                </div>


                                <div class="col-3 col-lg-3 boxy">
                                    <div class="sdlms-spacer">
                                        <ol class=" list-group font-list ">
                                            <li class=" row-col-2 list-group-item headingbeforeafter ">
                                                <i class="fa fa-info-circle fa-lg icon-i" aria-hidden="true"
                                                    id="icon3"></i>

                                                Deliverables

                                            </li>
                                            <div class="sdlms-subthreads listbox3">
                                                <li class="list-group-item listbox3">
                                                    <label>
                                                        <input type="radio" class="radio-btn" name="rubric3" id="1">
                                                        <span class="design"></span>
                                                    </label>
                                                    <span style="color:blue; margin-left:10px">
                                                        2
                                                    </span>-Justified
                                                </li>
                                                <li class="list-group-item">
                                                    <label>
                                                        <input type="radio" class="radio-btn" name="rubric3" id="2">
                                                        <span class="design"></span>
                                                    </label>
                                                    <span style="color:blue; margin-left:10px">
                                                        2
                                                    </span>-Partial Explanation
                                                </li>
                                                <li class="list-group-item">
                                                    <label>
                                                        <input type="radio" class="radio-btn" name="rubric3" id="3">
                                                        <span class="design"></span>
                                                    </label>
                                                    <span style="color:blue; margin-left:10px">
                                                        2
                                                    </span>-Unable to explain
                                                </li>
                                                <li class="list-group-item">
                                                    <label>
                                                        <input type="radio" class="radio-btn" name="rubric3" id="4">
                                                        <span class="design"></span>
                                                    </label>
                                                    <span style="color:blue; margin-left:10px">
                                                        2
                                                    </span>-Unable to explain
                                                </li>
                                            </div>

                                            <p class="text-place px-4 py-2 textbox3 hidden">
                                                The IMPACT Articulation and Phonology Rating Scale evaluates a
                                                child’s
                                                speech characteristics, as well as the impact of a speech disorder
                                                on a
                                                child’s social interactions, academic life, and home/after school
                                                life
                                            </p>

                                            <div class="form-group" style="width:110%;" height:42px;font-weight:=""
                                                var(--sdlms-font-weight-medium);="">
                                                <label for="exampleFormControlTextarea1"></label>
                                                <textarea class="form-control" placeholder="Type your Observations"
                                                    id="exampleFormControlTextarea1" rows="3"
                                                    style="box-shadow: none; border: 0.5px solid #ccc;"></textarea>
                                            </div>
                                            <li class="p-2 sdlms-featured-card-author-area list-num" id="score-shadow" style="width:110%;"
                                                height:42px;="" text-align:center;"=""> Score -<span style="color:blue; margin-left:10px">
                                                            2
                                                        </span>
                                            </li>

                                        </ol>
                                    </div>


                                </div>

                                <div class="col-3 col-lg-3 boxy">
                                    <div class="sdlms-spacer">
                                        <ol class=" list-group font-list">
                                            <li class=" row-col-2 list-group-item headingbeforeafter ">
                                                <i class="fa fa-info-circle fa-lg icon-i" aria-hidden="true"
                                                    id="icon4"></i>
                                                Planning
                                            </li>
                                            <div class="sdlms-subthreads listbox4">
                                                <li class="list-group-item">
                                                    <label>
                                                        <input type="radio" class="radio-btn" name="rubric4" id="1">
                                                        <span class="design"></span>
                                                    </label>
                                                    <span style="color:blue; margin-left:10px">
                                                        2
                                                    </span> -Justified
                                                </li>
                                                <li class="list-group-item">
                                                    <label>
                                                        <input type="radio" class="radio-btn" name="rubric4" id="2">
                                                        <span class="design"></span>
                                                    </label>
                                                    <span style="color:blue; margin-left:10px">
                                                        2
                                                    </span>-Partial Explanation
                                                </li>
                                                <li class="list-group-item">
                                                    <label>
                                                        <input type="radio" class="radio-btn" name="rubric4" id="3">
                                                        <span class="design"></span>
                                                    </label>
                                                    <span style="color:blue; margin-left:10px">
                                                        2
                                                    </span>-Unable to explain
                                                </li>
                                                <li class="list-group-item">
                                                    <label>
                                                        <input type="radio" class="radio-btn" name="rubric4" id="4">
                                                        <span class="design"></span>
                                                    </label>
                                                    <span style="color:blue; margin-left:10px">
                                                        2
                                                    </span>-Unable to explain
                                                </li>
                                                <li class="list-group-item">
                                                    <label>
                                                        <input type="radio" class="radio-btn" name="rubric4" id="5">
                                                        <span class="design"></span>
                                                    </label>
                                                    <span style="color:blue; margin-left:10px">
                                                        2
                                                    </span> -Unable to explain
                                                </li>
                                            </div>
                                            <p class="text-place px-4 py-2 textbox4 hidden">
                                                The IMPACT Articulation and Phonology Rating Scale evaluates a
                                                child’s
                                                speech characteristics, as well as the impact of a speech disorder
                                                on a
                                                child’s social interactions, academic life, and home/after school
                                                life
                                            </p>
                                            <div class="form-group" style="width:110%;" height:42px;="" font-weight:=""
                                                var(--sdlms-font-weight-medium);="">
                                                <label for="exampleFormControlTextarea1"></label>
                                                <textarea class="form-control" placeholder="Type your Observations"
                                                    id="exampleFormControlTextarea1" rows="3"
                                                    style="box-shadow: none; border: 0.5px solid #ccc;"></textarea>
                                            </div>
                                            <li class="p-2 sdlms-featured-card-author-area list-num" id="score-shadow" style="width:110%;"
                                                height:42px;=""> Score -<span style="color:blue; margin-left:10px">
                                                            2
                                                        </span>
                                            </li>
                                        </ol>
                                    </div>
                                </div>

                            </div>

                            <div class="row" id="pad">

                                <div class="col-4">

                                </div>
                                <div class="col-4 col-lg-4">
                                    <textarea class="form-control" placeholder="Enter your overall observation here"
                                        id="exampleFormControlTextarea1" style="height: 80px;"></textarea>
                                </div>
                                <div class="col-4">
                                    <div class="side-score">
                                        Overall Score-<br>
                                        <span style="color:blue; margin-left:10px">
                                                            2
                                                        </span>
                                    </div>
                                </div>
                            </div>



                        </details>
                    </section>
                </div>`
                },
                rubricBtn: function (data, attributeId) {
                    return `<div class="col-3 col-lg-3 col-md-4 boxy subattribute" data-attribute-id="${attributeId}" subattribute${data.subattributeId} findsubparameter>
                    <div class="sdlms-spacer">
                       <ol class=" list-group font-list">
                          <li class=" row-col-2 list-group-item headingbeforeafter">
                             <img src="https://sdlms.deepthought.education/assets/uploads/files/files/oval-delete.svg" class="deletesubattribute" data-attribute-id=${data.subattributeId} data-attribute-sub="${attributeId}" style="position: absolute; top: -11px; left: -12px;" cursor-pointer>
                             <div class="d-flex justify-content-between" subattributeheading>${data.title}<i class="fa fa-pencil-square-o cursor-pointer" aria-hidden="true" edit-subattribute data-subattribute-id="${data.subattributeId}" data-attribute-id="${attributeId}"></i>
                             </div>
                          </li>
                          <div class="sdlms-subthreads listbox" subattributebody${data.subattributeId}>
                            ${data.ratings.length == 0 ? `<li class="list-group-item" style="width:110%;" height:42px;="" font-weight:=""
                            var(--sdlms-font-weight-medium);="">
                                No Rubrics available
                            </li>`: data.ratings.map(components.creatorScorecard.rubricselements.bind(this)).join('')}
                             <div class="flip-card">
                                <div class="flip-card-inner">
                                   <div class="flip-card-front">
                                      <div class="border px-2" style="width:100%;">
                                         <p class="sdlms-asset-tab justify-content-center">
                                            Weightage :
                                         </p>
                                         <p class="sdlms-text-black-14px" subattributeweightage${data.subattributeId}>${data.weightage}</p>
                                      </div>
                                   </div>
                                   <div class="flip-card-back">
                                      <p class="sdlms-text-black-14px border  py-4 px-2">
                                        Description : <div subattributedescription>${data.description}</div>
                                      </p>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </ol>
                    </div>
                 </div>`
                    //     return `<div class="col-4 col-lg-4 col-md-4 boxy subattribute" data-attribute-id="${attributeId}" subattribute${data.subattributeId} findsubparameter>
                    //     <div class="sdlms-spacer">
                    //       <ol class=" list-group font-list">
                    //         <li class=" row-col-2 list-group-item headingbeforeafter">
                    //         <img src="https://sdlms.deepthought.education/assets/uploads/files/files/oval-delete.svg" class="deletesubattribute" data-attribute-id=${data.subattributeId} data-attribute-sub="${attributeId}" style="position: absolute; top: -11px; left: -12px;" cursor-pointer>
                    //          ${data.title}
                    //         </li>
                    //         <div class="sdlms-subthreads listbox">
                    //           ${data.ratings.length==0?`<li class="list-group-item" style="width:110%;" height:42px;="" font-weight:=""
                    //           var(--sdlms-font-weight-medium);="">
                    //             No Rubrics available
                    //           </li>`: data.ratings.map(components.creatorScorecard.rubricselements.bind(this)).join('')}
                    //           <div class="border px-2" style="width:110%;">
                    //             <p class="sdlms-asset-tab justify-content-center">
                    //               Description
                    //             </p>
                    //             <p class="sdlms-text-black-14px">
                    //               ${data.description}
                    //             </p>
                    //             <div class="row ">
                    //               <div class="col-6">
                    //               </div>
                    //               <div class="col-6 d-flex justify-content-center">
                    //                 <p class="font-weight-medium h-h1">
                    //                   Weightage
                    //                   <span style="color:blue; ">
                    //                     ${data.weightage}
                    //                   </span>
                    //                 </p>
                    //               </div>
                    //             </div>
                    //           </div>
                    //         </div>
                    //       </ol>
                    //     </div>
                    //   </div>`
                },
                aftereditbody: (data) => {
                    return ` <div class="sdlms-spacer">
                    <ol class=" list-group font-list">
                       <li class=" row-col-2 list-group-item headingbeforeafter">
                          <img src="https://sdlms.deepthought.education/assets/uploads/files/files/oval-delete.svg" class="deletesubattribute" data-attribute-id=${data.subattributeId} data-attribute-sub="${data.attributeId}" style="position: absolute; top: -11px; left: -12px;" cursor-pointer>
                          <div class="d-flex justify-content-between" subattributeheading>${data.subattribute.title}<i class="fa fa-pencil-square-o cursor-pointer" aria-hidden="true" edit-subattribute data-subattribute-id="${data.subattributeId}" data-attribute-id="${data.attributeId}"></i>
                          </div>
                       </li>
                       <div class="sdlms-subthreads listbox" subattributebody${data.subattributeId}>
                         ${data.subattribute.ratings.length == 0 ? `<li class="list-group-item" style="width:110%;" height:42px;="" font-weight:=""
                         var(--sdlms-font-weight-medium);="">
                             No Rubrics available
                         </li>`: data.subattribute.ratings.map(components.creatorScorecard.rubricselements.bind(this)).join('')}
                          <div class="flip-card">
                             <div class="flip-card-inner">
                                <div class="flip-card-front">
                                   <div class="border px-2" style="width:100%;">
                                      <p class="sdlms-asset-tab justify-content-center">
                                         Weightage :
                                      </p>
                                      <p class="sdlms-text-black-14px" subattributeweightage${data.subattributeId}>${data.subattribute.weightage}</p>
                                   </div>
                                </div>
                                <div class="flip-card-back">
                                   <p class="sdlms-text-black-14px border  py-4 px-2">
                                     Description : <div subattributedescription>${data.subattribute.description}</div>
                                   </p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </ol>
                 </div>`
                },
                emptyparameter: (data) => {
                    return `
               <div class="sdlms-thread" meta="" id="emptyparameter${data.attributeId}" emptyparameter-${data.attributeId} findparameter>
                    <div class="sdlms-eagle-thread sdlms-eagle-thread-header position-relative secondary-thread opacity-5 cursor-pointer">
                    ${data.pagetype == "creator" ? `<img src="https://sdlms.deepthought.education/assets/uploads/files/files/oval-delete.svg" class="deleteattributebutton" id="deleteAttribute" data-attribute-id="${data.attributeId}" style="position: absolute; top: -11px; left: -12px;" />` : ""}  
                    <span class="sdlms-floating-right" collapse="">
                            <img onerror="this.onerror=null;this.src='https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg';" src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon="" alt="">
                        </span>
                        <div class="col-md-9 col-11 ml-3">
                            <span class="sdlms-text-black-20px font-weight-medium" name="title" sdlms-id="sdlms-meta-title" attribute-title-${data.attributeId} id="attributetitle${data.attributeId}">${data.title}</span>
                            ${data.pagetype == "creator" ? `<i class="fa fa-pencil-square-o cursor-pointer ml-3" aria-hidden="true" edit-title-attribute="" data-attribute-id="${data.attributeId}"></i>` : ""}
                            <span class="font-weight-500 sdlms-text-black-17px" name="duration" true="">  </span>
                        </div>
                    </div>
                    <div class="sdlms-eagle-thread-body m-4" collapse-body="">
                    ${this.scorecard().creatorScorecard.description(data)}
                    <div class="row" id="create-attribute-${data.attributeId}" data-attribute-id='${data.attributeId}'>
                      ${data.pagetype == "creator" ? this.scorecard().creatorScorecard.createsubparameter(data) : ""}<!-- Appending creator box for sub parameter -->
                      ${data.pagetype == "evaluate" && data.subattributes ?
                            data.subattributes.map((subattribute) => this.scorecard().viewScorecard.evaluateAttributeComponent(data.attributeId, subattribute)).join('')
                            : ""}
                      ${data.pagetype == "preview" && data.subattributes ?
                      data.subattributes.map((subattribute) => this.scorecard().viewScorecard.previewAttributeComponent(data.attributeId, subattribute)).join('')
                      : ""} 
                      ${data.pagetype == "evaluate" ? `` : ""}
                    </div>
                    ${data.pagetype == "evaluate" ? `<div class="d-flex align-items-center justify-content-between">
                        <textarea class="form-control" name="content" placeholder="Type observation for ${data.title}" rows="3" sdlms-id="sdlms-conclusion-content" data-dirrty-initial-value="" overallobservationattribute${data.attributeId}></textarea>
                    </div>
                  <div class="pl-0 mt-4 d-flex justify-content-end scorecardbuttoncontainer">
                   <button type="button" class="sdlms-button button-primary button-lg d-flex align-items-center mb-4" evaluateattribute data-attribute-id="${data.attributeId}" >Save</button>
               </div>
            </div>`: ""} `
                },
                createsubparameter: (data) => {
                    return `
                    <div class="col-3 col-lg-3 col-md-4" id="creatortab${data.attributeId}">
                            <div class="sdlms-spacer">
                               <div class="sdlms-section">
                                   <div class="sdlms-section-header secondary-header text-white" style="padding: 5px; border-radius: 10px 10px 0 0;">
                                   <div class="resetfields" data-reset-id="${data.attributeId}" reset${data.attributeId} cursor-pointer>
                                   <span class="fa-stack" style="position: absolute; top: -11px; left: -12px;">
                                             <i class="fa fa-circle fa-stack-2x" aria-hidden="true" style=" color: #c2c2c2; "></i>
                                    <i class="fa fa-undo fa-stack-1x fa-inverse" aria-hidden="true" style=" color: black;"></i>
                                    </span>
                                    </div>
                                       <input placeholder="Heading" name="title" class="label-text form-control" id='heading' value="" style="text-align:center;">
                                   </div>
                               </div>
                               <div class="sdlms-section-body subparameter-section " id="current${data.attributeId}">
                                   <textarea placeholder="Description" name="description" value="" class="form-control descript-textarea label-text" id="description" style="text-align:center;"></textarea>
                                    <br>
                                    <input placeholder="Weightage" type="number" name="weightage" value="" class="form-control descript-textarea label-text" id="weightage" style="text-align:center;"></input>
                                    <br>
                                    <div class="row justify-content-center">
                                       <input class="col-2 form-control m-1" type="number" placeholder="0" id="rubricrating" style="padding: 0.375rem 0.8rem;">
                                       <input class="col-6 form-control m-1" type="name" placeholder="Name" id="rubricname">
                                      <!-- <input class="col-2 form-control m-1" type="number" placeholder="%" style="padding: 0.375rem 0.5rem;" id="rubricscore"> -->

                                       <div class="col-2 addrubricbutton" id="add-rubric-button-${data.attributeId}" data-attribute-id="${data.attributeId}">
                                           <svg class="sdlms-floating-right" width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path d="M9.29703 4.13574V5.66504H0.525543V4.13574H9.29703ZM5.72867 0.400391V9.7168H4.10269V0.400391H5.72867Z" fill="#0029FF"></path>
                                           </svg>
                                       </div>
                                   </div>
                                   <br>
                                   <div class="row" id="preview-rubrics-${data.attributeId}" data-attribute-id='${data.attributeId}'>
                                   </div>
                                   <br>
                                   <button class="sdlms-button button-primary button-lg addnewattributebutton" id="addnew-btn-${data.attributeId}" add-new-button  data-attribute-id='${data.attributeId}' style="bottom: 0; width: 100%; margin-bottom: 0; background-color: white; color: blue; border-color: blue;">
                                       Create
                                   </button>
                               </div>
                               </div>
                           </div>`
                },
                rubricselements: (data) => {
                    return `<li class="list-group-item" style="width:110%;" height:42px;="" font-weight:="" var(--sdlms-font-weight-medium);="" name="values">
                    <span style="color:blue; "   name="rating">${data.rating}</span>
                    <span name="name">${data.name}</span>
                    <!--<span class="float-lg-right" style="color:blue;  " name="score">
                    ${data.score}
                    </span>-->
                    </li>`
                    // return `<li class="list-group-item" name="values" style="width:110%;" height:42px;="" font-weight:=""
                    // var(--sdlms-font-weight-medium);="">
                    //   <span style="color:blue; " name="rating">
                    //     ${data.rating}
                    //   </span>
                    //     <span name="name">${data.name}</span>
                    //   <span name="score" class="float-lg-right" style="color:blue;  ">
                    //     ${data.score}
                    //   </span>
                    // </li>`
                },
                description: (data) => {
                    return ` <div class="row justify-content-start m-2">
                    <p attribute-description-${data.attributeId} id="attributedescription${data.attributeId}">Description - ${data.description}</p>
                    </div>`
                },
                editablesubattribute: (data) => {
                    return `<div class="sdlms-spacer">
                    <ol class=" list-group font-list">
                      <li class=" row-col-2 list-group-item headingbeforeafter">
                      <div class="resetfields" data-reset-id="256" reset256="" cursor-pointer="">
                                   <span class="fa-stack" style="position: absolute; top: -11px; left: -12px;">
                                             <i class="fa fa-circle fa-stack-2x" aria-hidden="true" style=" color: #c2c2c2; "></i>
                                    <i class="fa fa-undo fa-stack-1x fa-inverse" aria-hidden="true" style=" color: black;"></i>
                                    </span>
                                    </div>
                        <input name="title" class="form-control" id="editedheadingsubattribute"
                        value="${data.title}" style="margin-top: -11px;">
                      </li>
                      <div class="sdlms-subthreads listbox" subattributebody${data.subattributeId}>
                        ${data.ratings.map(components.creatorScorecard.editablelist.bind(this)).join('')}
                       
                      </div>
                      <li class="list-group-item" style="width:110%;" name="values" addneweditablerubric=""
                      cursor-pointer="" data-addnewrubric-id="${data.subattributeId}">
                      <div class="text-center">
                          Add new
                          <i class="fa fa-plus-circle " aria-hidden="true" style="">
                          </i>
                      </div>
                      </li>
                      <li class="list-group-item" style="width:110%;">
                      <span style="color:blue; " name="weightagelabel" class="">
                        Weightage :
                      </span>
                      <span name="weightage" contenteditable="" style="
                      " class="border-2px-unset" id="subattributeeditedweightage">
                        ${data.weightage}
                      </span>
                    </li>
                    <li class="list-group-item h-100" style="width:110%;">
                      <span style="color:blue; " name="descriptionlabel" class="">
                        Description
                      </span>
                      <textarea  placeholder="${data.description}" name="description" value="${data.description}" class="form-control descript-textarea label-text" id="subattributeediteddescription"></textarea>
                    </li>
                    <li class="list-group-item h-25 justify-content-center" style="width:110%;">
                        <button class="sdlms-button button-primary button-lg editdonebutton" id="editdonebutton-${data.subattributeId}"
                        editdonebutton="" data-subattribute-id="${data.subattributeId}" data-attribute-id="${data.attributeId}" style="bottom: 0; width: 100%; margin-bottom: 0; background-color: white; color: blue; border-color: blue;">
                            Done
                        </button>
                    </li>
                    </ol>
                  </div>`
                },
                editablelist: (data) => {
                    return `<li class="list-group-item" style="width:110%;" name="values">
                    <span style="color:blue; " name="rating" contenteditable="" class="border-2px-unset">
                      ${data.rating}
                    </span>-<span name="name" contenteditable="" style="
                    " class="border-2px-unset">
                        ${data.name}
                    </span>
                  </li>`
                },
                emptyparameter2: (data) => {
                    return `
                    <br>
                    <div class="session-view sdlms-form-elements" id="element${data.attributeId}">
                        <section>
                            <details class="shadow details-heading" open="">
                                <summary class="sdlms-section-header shadow font-weight-bold text-center drop-box-heading">
                                    ${data.pagetype == 'evaluate' ? '' : `<img src="https://sdlms.deepthought.education/assets/uploads/files/files/oval-delete.svg" style="position:           absolute; top: -11px; left: -12px;" />`}
                                    ${data.title}
                                </summary>
                                     <div class="row" id="emptyattribute${data.attributeId}">
                                        ${data.pagetype == 'evaluate' && data.subattributes ?
                            data.subattributes.map((subattribute) => this.scorecard().viewScorecard.evaluateAttributeComponent(subattribute)).join('')
                            : this.scorecard().viewScorecard.overallObservation(data)} 
                                     </div>
                                     <div class="d-flex justify-content-center">
                                             <input class="border sdlms-floating-label-input my-4 px-2" type="text" class="form-control overallrubric" placeholder="Please enter           Overall observation for parameter"
                                             id="exampleFormControlTextarea1" rows="3"
                                             style="margin-left:5%; height: 120px; width: 40%; padding-bottom: 7%;" id="overallObservationData"></input>
                                     </div>
                                     <button type="button" class="sdlms-button button-primary button-lg m-2 attr-btn" createnewproject="" id="btn-parameter">
                                          <span class="sdlms-text-white-20px">submit parameter</span>
                                     </button>
                        </section>
                    </div>
                       `
                },
            },
            viewScorecard: {
                viewRubric: (data) => {
                    return `
                <li class="list-group-item" style="font-weight: var(--sdlms-font-weight-medium);">
                    <span style="color:blue;">${data.rating}</span> ${data.name}
                </li>
                `
                },
                previewRubric: (subattributeId, data) => {
                    return `<li class="list-group-item">
                                 <label>
                                    <div class="d-flex justify-content-center" style="width:117%;"><span style="color:blue; margin-left:10px;" class="rating-text">${data.rating}</span>
                                    -${data.name}
                                 </label>
                            </li>`
                },
                evaluateRubric: (attributeId, subattributeId, data, name) => {
                    let id = app.unique('subattribute');
                    return `<li class="list-group-item">
                                 <label for="rating-sub-${id}">
                                    <input type="radio" class="radio-btn" name="${name}" id="rating-sub-${id}" data-id="${id}" data-attribute-id=${attributeId} data-subattribute-id="${subattributeId}"><span class="design"></span> 
                                    <div class="d-flex justify-content-center" style="width:117%;"><span style="color:blue; margin-left:10px;" id="rating-${id}" class="rating-text">${data.rating}</span>
                                    -${data.name}
                                 </label>
                            </li>`
                },
                previewAttributeComponent: (attributeId, data) => {
                    return `  
                            <div class="col-3 col-lg-3" style="width:90%;">
                                <div class="sdlms-spacer">
                                <ol class=" list-group font-list">
                                    <li class=" row-col-2 list-group-item headingbeforeafter ">
                                         ${data.title}<i class="fa fa-info-circle showdescription ml-2" aria-hidden="true" data-description-id="${data.subattributeId}" ></i>                   
                                    </li>
                                    <li class="list-group-item h-100 hidden" showmedescriptionof${data.subattributeId}>
                                    <p class="p-2 bold-font d-flex justify-content-center sdlms-text-tertiary-18px">Description</p>
                                    <p class="sdlms-text-black-14px text-center p-1 sdlms-eagle-thread font-weight-500"> 
                                    ${data.description}
                                    </p>
                                    <!-- <p class="sdlms-text-black-16px mx-2 font-weight-500 float-right"> weightage ${data.weightage}% </p> -->
                                   
                                    </li>
                                    <div class="sdlms-subthreads listbox" id="emptysubattribute${data.subattributeId}">
                                           ${(data.ratings && data.ratings.map((rating) => this.scorecard().viewScorecard.previewRubric(data.subattributeId, rating)).join('')) || ''} 
                                    </div>
                                    </ol>
                                </div>
                            </div>
                            `
                },
                evaluateAttributeComponent: (attributeId, data) => {
                    let name = app.unique('subattribute');
                    return `  
                            <div class="col-3 col-lg-3" style="width:90%;">
                                <div class="sdlms-spacer">
                                <ol class=" list-group font-list">
                                    <li class=" row-col-2 list-group-item headingbeforeafter ">
                                         ${data.title}<i class="fa fa-info-circle showdescription ml-2" aria-hidden="true" data-description-id="${data.subattributeId}" ></i>                   
                                    </li>
                                    <li class="list-group-item h-100 hidden" showmedescriptionof${data.subattributeId}>
                                    <p class="p-2 bold-font d-flex justify-content-center sdlms-text-tertiary-18px">Description</p>
                                    <p class="sdlms-text-black-14px text-center p-1 sdlms-eagle-thread font-weight-500"> 
                                    ${data.description}
                                    </p>
                                    <!-- <p class="sdlms-text-black-16px mx-2 font-weight-500 float-right"> weightage ${data.weightage}% </p> -->
                                   
                                    </li>
                                    <div class="sdlms-subthreads listbox" id="emptysubattribute${data.subattributeId}">
                                           ${(data.ratings && data.ratings.map((rating) => this.scorecard().viewScorecard.evaluateRubric(attributeId, data.subattributeId, rating, name)).join('')) || ''} 
                                    </div>
                                    <li class="list-group-item h-100">
                                    <textarea placeholder="Type observations for ${data.title}" name="observation" value="" class="form-control descript-textarea label-text observation" id="observation" observationforsubattribute${data.subattributeId} data-attribute-id="${attributeId}" data-subattribute-id="${data.subattributeId}"></textarea>
                                    </li>
                                    <!-- <li class="list-group-item h-50 justify-content-center">
                                    <button type="button" class="sdlms-button button-primary button-lg d-flex align-items-center" submitevaluationsubattribute data-attribute-id="${attributeId}" data-subattribute-id="${data.subattributeId}">Submit</button>
                                    </li> -->
                                    </ol>
                                </div>
                            </div>
                            `
                },
                viewAttributeComponent: (data) => {
                    return ` 
                    <div class="col-3 col-lg-3 col-md-4 boxy">
                        <div class="sdlms-spacer">
                            <ol class=" list-group font-list" style="width: 100%;">
                                <li class=" row-col-2 list-group-item headingbeforeafter ">
                                    ${data.title}
                                </li>
                                    <div class=" sdlms-subthreads">
                                        ${(data.ratings && data.ratings.map((rating) => this.scorecard().viewScorecard.viewRubric(rating)).join('')) || ''}
                                        <div class="flip-card">
                                            <div class="flip-card-inner">
                                                <div class="flip-card-front" id="frontpart">
                                                    <div class="border px-2">
                                                        <p class="sdlms-asset-tab justify-content-center">
                                                            Observation</p>
                                                        <p class="sdlms-text-black-14px">
                                                        ${data.observation}
                                                        </p>
                                                    <div class="row justify-content-center d-flex">
                                                        <div class="col-6">
                                                            <p class="font-weight-medium  h-h1">
                                                            Score : <span style="color:blue;">${data.score}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flip-card-back border">
                                                <p class="sdlms-asset-tab justify-content-center p-2">
                                                        Description
                                                </p>
                                                <p class="sdlms-text-black-14px p-2">
                                                ${data.description}
                                                </p>
                                                <!-- <p class="sdlms-text-black-16px mx-2 font-weight-500 float-right"> weightage-
                                                <span style="color:blue; weight:600;">
                                                 ${data.weightage}%
                                                </span> 
                                                </p> -->
                                            </div>
                                        </div>
                                    </div>
                            </ol>
                        </div>
                    </div>`
                },
                overallObservation: (data) => {
                    return `
                                <div class="">
                                        <div class="sdlms-floating-label-input px-2 shadow-lg" style=width:40%;>
                                            <p class="justify-content-center sdlms-asset-tab">
                                                Overall Observation
                                            </p>
                                            <p class="sdlms-text-black-16px font-weight-500 px-3">
                                               ${data.observation}
                                            </p>
                                            <div class="row justify-content-center d-flex">
                                                <div class="col-6">
                                                    <p class="font-weight-medium h-h1 justify-content-center d-flex">
                                                        Score -
                                                        <span style="color:blue;">
                                                            ${data.score}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    `
                },
                flipObservationFront: (data) => {
                    return `
                    
                        `
                },
                typeObservation: (data) => {
                    return ` <div class="form-group" style="width:10%; height:42px; font-weight:var(--sdlms-font-weight-medium);">
                    <h3 class="font-weight-medium sdlms-text-tertiary-16px border">Score - <input type="number" Value="3"   class="num-btn2 border-none">
                    </input>
                    </h3>
                    <label for="exampleFormControlTextarea1"></label>
                    <textarea class="form-control" placeholder="Type your Observations"
                        id="exampleFormControlTextarea1" rows="3"
                        style="box-shadow: none; border: 0.5px solid #ccc;"></textarea>
                     </div>`
                },
                tabContent: (data) => {
                    return `
                    <li class="nav-item border-bottom">
                       <a href="#" class="nav-link bold-font px-4 sdlms-text-white-16px" data-toggle="tab"
                       data-target="#tab-${data.attributeId}" aria-expanded="false">
                       ${data.title}
                       </a>
                    </li>
                    `
                },
                tabContentHolder: (data) => {
                    return `
                    <div class="tab-pane" id="tab-${data.attributeId}">
                        <div class="row justify-content-start mb-2 mt-4 mx-2">
                        <p attribute-description-${data.attributeId} id="attributedescription${data.attributeId}">Description - ${data.description}</p>
                        </div>
                        <div class="row">
                            ${(data.subattributes.map((subattribute) => this.scorecard().viewScorecard.viewAttributeComponent(subattribute)).join(''))}
                        </div>
                        <div class="row justify-content-center">
                            <div class="sdlms-floating-label-input px-2 shadow-lg" style=width:40%;>
                                <p class="justify-content-center sdlms-asset-tab">
                                    Overall Observation
                                </p>
                                <p class="sdlms-text-black-16px font-weight-500 px-3">
                                   ${data.observation}
                                </p>
                                <div class="row justify-content-center d-flex">
                                    <div class="col-6">
                                        <p class="font-weight-medium h-h1 justify-content-center d-flex">
                                            Score : 
                                            <span style="color:blue;">
                                            &nbsp; ${data.score}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                },
                newoverall: (data) => {
                    return `
                    <div class="sdlms-floating-label-input my-4 px-2 shadow-lg" style="width: 40%;">
                        <p class="sdlms-text-tertiary-28px justify-content-center sdlms-asset-tab">
                            Observation
                        </p>
                        <p class="sdlms-text-black-16px font-weight-500 px-3">
                            N/A
                        </p>
                        <div class="row d-flex justify-content-center">
                            <div class="col-6">
                                <p class="font-weight-medium sdlms-asset-tab h-h1 d-flex justify-content-center">
                                    Score - <span style="color:blue;">N/A</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    `
                },
                finalObservationItem: (data) => {
                    return `
                    <div class="col-lg-3 col-md-6 col-xs-12 py-4 mb-4 boxy">
                        <div class="sdlms-floating-label-input px-2 shadow-lg tab-default-box d-flex align-items-center flex-column">
                            <p class="sdlms-asset-tab mt-2 mb-4">${data.title}</p>
                            <div id="score-wrapper-${data.attributeId}" class="score-wrapper position-relative d-flex align-items-center flex-column justify-content-center rounded-circle mb-4">
                                <p class="score-text sdlms-asset-tab mb-0 pb-0 position-absolute">Score</p>
                                <p class="score sdlms-asset-tab mt-0 pt-0 position-absolute"><span class="sub-score">${data.score}/</span><span id="total-sub-score-${data.attributeId}"></span></p>
                            </div>
                            <a data-toggle="tab" data-target="#tab-${data.attributeId}" class="view-text mb-3 view_details_button">View details</a>
                        </div>
                    </div>
                    `
                },
            },
        }
        return components;
    }
}
