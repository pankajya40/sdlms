'use strict';

/* globals define */

define('forum/mobile/insightfeeds/index', ['api'], function (api) {
    var insightfeeds = {};
    const $target = $('.feeds-area');
    const allData = [];

    insightfeeds.init = function () {

        const { reactions = {} } = ajaxify.data;

        insightfeeds.renderPage();

        $('[name="category"]').on('change', function () {
            let value = $(this).val();
            let items = reactions[value.toLowerCase()];

            $('[name="sub-category"]').empty()
                .append(insightfeeds.renderSelectItems(items))
        });

        $('body').on('change', '[name="category"] , [name="sub-category"]', function () {
            let category = $('[name="category"]').val();
            let subCategory = $('[name="sub-category"]').val();

            insightfeeds.renderPage({ category, subCategory })
        });

    }

    insightfeeds.renderPage = function (params = {}) {

        let events = ajaxify.data.events.data;
        console.log(events)
        events.forEach((ele)=>{
            
            allData.push( ele)});
        // events.map(val => {
        //     // $target.empty();
        //     console.log(val);
        //     $target.append(insightfeeds.events(val))
        // })

        // api.post('/app/getevents', params)
        // .then((resp) => {
        //     $target.empty();
        //     console.log(resp);

        //     const {data} = resp;
        //     if (data && data.length) {
        //         $.each(data, function (i, elem) {
        //             $target.append(insightfeeds.events(elem))
        //         });
        //     } else {
        //         $target.append('<h4 class="bold-medium-font">Nothing was found!</h4>')
        //     }
        // })
        // .catch((err) => notify(err.message, 'error'));

        api.get('/app/insightfeeds', params)
            .then((resp) => {

                console.log(resp);

                const { data } = resp;
                console.log(data);
                data.forEach((ele)=>{
                    const date = new Date(ele.reflection.updatedAt)
                    ele.timestamp= date.valueOf();
                    allData.push(ele)});
                
                allData.sort((a,b)=>{
                    return b.timestamp - a.timestamp;
                })
                console.log(allData);
                if (data && data.length) {

                    allData.forEach((ele)=>{

                        if(ele.type == 'event')
                        {
                            $target.append(insightfeeds.events(ele));
                        }else{
                            $target.append(insightfeeds.card(ele))
                        }
                    })

                    // $.each(data, function (i, elem) {
                    //     $target.append(insightfeeds.card(elem))
                    // });
                } else {
                    $target.append('<h4 class="bold-medium-font">Nothing was found!</h4>')
                }
            }).catch((err) => notify(err.message, 'error'));
    }

    insightfeeds.renderSelectItems = function (data = []) {
        let options = '<option selected value="">Sub-category</option>' + '\n';

        data.forEach((el) => {
            options += `<option value="${el.name}">${el.name}</option>`
        });

        return options;
    }

    insightfeeds.events = function (data) {
        let { description } = data;
        let { schedule } = data;
        var date = new Date(parseInt(schedule))
        let { name } = data;
        let { timestamp } = data;


        

        return `
        <div class="m-1 w-100 my-3 p-2 event-card "  onclick='eventClick(this)' > 
        <div id="tid" class="d-none" >${data.tid}</div>
        <div class="p-2" style="">
            <!--<div class="mb-2 p-0 bg-white p-3" style="border-radius: 12px;">
                <div class="sdlms-section-header section-header row p-0" >
                    <div class="d-flex col-6 justify-content-start pb-1">
                        <span class="font-weight-medium">${name}</span>
                    </div>
                </div>
            </div>-->
        </div>

        <div class="ml-2">
        <div class="sdlms-section-header d-flex section-header p-0">
                        <div style="width: 30px;" class="mr-2">
                            <img src="${data.hostDetails.picture}"style="width: 30px; height: 30px; border-radius: 30px; border: 1px solid black" />
                        </div>
                        <div class="justify-content-start my-auto pb-1">
                            <div class="font-weight-medium">${data.hostDetails.username}</div>
                        </div>
                    </div>
        <div class="d-flex pr-2 justify-content-end">${date.toLocaleDateString()}</div>
        <div class="d-flex pr-2 justify-content-end">${date.toLocaleTimeString()}</div>
            <div class="sdlms-section-header d-flex section-header p-0" >
                <div class="justify-content-start my-autogs/searchEngines pl-2">
                    <div class="font-weight-medium">${name}</div>
                    <div class="font-10">${app.timeFormatter(timestamp)}</div>
                </div>
            </div>
            <div class="event-card-description mt-1 pl-2" style="font-weight: 500;color: #0029ff;">${description}</div>
        </div>
           
            <div class="row justify-content-end mt-2">
            <div class="d-flex pr-2 justify-content-end">Events</div>
            <div class="d-flex pr-2 justify-content-end"><i style="font-size: 5px; margin-top: 6px;" aria-hidden="true"></i></div>
               <div class="d-flex justify-content-end pr-3"></div>
           </div> 
       </div>
       </div>`

    },

        insightfeeds.card = function (data) {
            const Icons = {
                emotion: `<i class="fa fa-smile-o pr-2 pt-1" aria-hidden="true"></i>`,
                value: `<i class="fa fa-diamond pr-2 pt-1" aria-hidden="true"></i>`,
                wisdom: `<i class="fa fa-lightbulb-o pr-2 pt-1" aria-hidden="true"></i>`
            }
            let { reflection, thread } = data;
            let { author } = reflection;

            var reflectionCategoryIcon = Icons[reflection.category.toLowerCase()];


            return `<div class="m-1 my-2 p-2 profile-reflection-card w-100">
                    <div class="p-2" style="">
                        <div class="section-collapsed">
                            <div class="sdlms-section-header section-header row p-0" collapse="">
                                <div class="col-6 sdlms-section-header d-flex section-header">
                                    <div style="width: 30px;" class="mr-2">
                                        <img src="${author.picture}" style="width: 30px; height: 30px; border-radius: 30px; border: 1px solid black;">
                                    </div>
                                    <div class="justify-content-start my-auto pb-1">
                                        <div class="font-weight-medium">${author.fullname || author.username}</div>
                                        <div class="font-10">${app.timeFormatter(reflection.updatedAt)}</div>
                                    </div>
                                </div>
                                <span class="col-6 d-flex justify-content-end sdlms-floating-right profile-reflection-card-thread">
                                    <img src="https://sdlms.deepthought.education/assets/uploads/files/files/up-arrow-black-icon.svg" collapse-icon alt class="mb-2 mr-2 rotate" style="width: 10px;">
                                    See Thread
                                </span>
                            </div>
                            <div class="col-md-1 py-2 p-0 mt-2" collapse-body="" style="background: white; border-radius: 10px; display: none;">
                                <div class="d-flex col-6 justify-content-start pb-1">
                                    <span class="font-weight-medium">Thread by ${thread.author.fullname || thread.author.username}</span>
                                </div>
                                <div class="pl-3">${thread.content}</div>
                            </div>
                        </div>
                        <div class="profile-reflection-card-text pt-2">${reflection.reflection}</div>
                        <div class="row justify-content-end">
                            <div class="d-flex pr-4 pt-2 justify-content-end">${reflection.subCategory.charAt(0).toUpperCase() + reflection.subCategory.slice(1)} ${reflectionCategoryIcon || ''}</div>
                        </div>
                    </div>
                </div>`
        ;
        }



    return insightfeeds;

})

function eventClick(e) {

    console.log("some"  );
    console.log(e);
    const tid = e.childNodes[1].innerText;
    ajaxify.go(`mobile/events/details/${tid}`);
    console.log(tid);
}



// `
//             <div class="m-1 w-100 my-3 p-2 profile-reflection-card">
//                 <div class="p-2" style="">
//                     <div class="mb-2 p-0 bg-white p-3" style="border-radius: 12px;">
//                         <div class="sdlms-section-header section-header row p-0" >
//                             <div class="d-flex col-6 justify-content-start pb-1">
//                                 <span class="font-weight-medium">${thread.author.fullname || thread.author.username}</span>
//                             </div>
//                         </div>
//                     ${thread.content}
//                     </div>
//                 </div>

//                 <div class="ml-2">
//                     <div class="sdlms-section-header d-flex section-header p-0" >
//                         <div style="width: 30px;" class="mr-2">
//                             <img src="${author.picture}" style="width: 30px; height: 30px; border-radius: 30px; border: 1px solid black" />
//                         </div>
//                         <div class="justify-content-start my-auto pb-1">
//                             <div class="font-weight-medium">${author.fullname || author.username}</div>
//                             <div class="font-10">${app.timeFormatter(reflection.updatedAt)}</div>
//                         </div>
//                     </div>
//                     <div class="profile-reflection-card-thread mt-1" style="font-weight: 500;">${reflection.reflection}</div>
//                 </div>
                    
//                     <div class="row justify-content-end mt-2">
//                     <div class="d-flex pr-2 justify-content-end">${reflectionCategoryIcon || ''} ${reflection.category || ''}</div>
//                     <div class="d-flex pr-2 justify-content-end"><i style="font-size: 5px; margin-top: 6px;" class="fa fa-circle pr-2" aria-hidden="true"></i>${reflection.subCategory}</div>
//                         <div class="d-flex justify-content-end pr-3"></div>
//                     </div>
//                 </div>
//             </div>
//         `