'use strict';

/* globals define */

define('forum/rigorbuilder/user/reason', ['api'], function (api) {
    var reason = {};

    reason.init = function () {
        let rigor = ajaxify.data.rigor || {}
        const BASE_URL = "/api/v3/rigor"
        console.log("All reasons here");

        api.get(BASE_URL + `/allReasons`, {}).then((res) => {
            console.log('res', res.data.map(e => {
                return e.pid;
            }))
            res.data.map((e, i) => {
                console.log(e.blocks.payload, e.blocks.statement)
                $('.reasons').append(`<div class="card mb-2 " style="width: auto;">
                <div class="card-body p-3">
                  <p class="card-title sdlms-text-black-17px"> <strong> Statement </strong>: ${e.blocks.statement}</p>
                  <a href="#" class="btn btn-primary" data-pid="${e.pid}" reasons-${i}>Reason</a>
                </div>
              </div>`)
              $(`[reasons-${i}]`).on('click', function() {
               console.log(this.getAttribute("data-pid"));
               let pid = this.getAttribute("data-pid");
               api.get(BASE_URL + `/reason/${pid}`, {}).then((res) => {
                console.log(res)
    
                console.log(res.blocks);
                
                let statement = res.blocks.statement;
                let payload = res.blocks.payload;
                for (const x in payload) {
                console.log(`${x}: ${payload[x]}`);
                }
                require(["api"], function (api) {
					new Feed(statement, 'rigor', api);
					console.log(api,'api');
					new Rigor('framework-modal', api, payload)
				});
            }).catch((err) => {
                console.log(err);
            });
    
              })
            })
        }).catch((err) => {
            console.log(err);
        });
    
        // api.get(BASE_URL + `/reason/13060`, {}).then((res) => {
        //     console.log(res)
        //     $('.demo-1').append(` <h2 class="text-center text-capitalize ">${res.title}</h2>`)

        //     console.log(res.blocks);
            
        //     let statement = res.blocks.statement;
        //     let payload = res.blocks.payload;
        //     $('.demo-2').append(`<span class="text-justify pb-4">${statement}</span>`)
        //     for (const x in payload) {
        //     console.log(`${x}: ${payload[x]}`);
        //     $('.demo-3').append(`
        //         <div class="align-items-baseline d-flex">
        //                 <p class="font-poppins font-weight-500 py-2 ">
        //                     ${payload[x]} .
        //                 </p>
        //                     <p class="mx-2">${x}</p>
        //        </div>
        //         `)
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // });

        
    
    };
    return reason;
});