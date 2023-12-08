'use strict';

const { data } = require("jquery");

/* globals define */

define('forum/mobile/assetsExplore/index', ['api'], function (api) {
	var assetsExplore = {};
    const $target = $('.assets-area');
    const {icons, assetstypes} = ajaxify.data;

    const type = ajaxify.data.type.type;

    assetstypes.map(type=>$("#asset-category").append(
    
        `<div class="col-6 col-md-6 assets mb-4" data-type="${type.value}">
    <div class="card mb-2 mx-auto d-flex shadow" style="padding: 30px; display: flex; justify-content: center; align-items: center;  border-radius: 10px; box-shadow: 0 3px 8px rgb(0, 0, 0, 0.1), 0 2px 4px hsl(0deg, 0%, 100%, 0.8);"  >
        <div class="icon">
        <div class="my-auto" style="background: #0029ff; border-radius: 25px; width:50px; height:50px;">
        <i style="font-size: 20px; margin: 15px; color: #fff;" class="${icons[type.value]}" aria-hidden="true"></i>
        </div>
        </div>
        <div class="data-type mt-3">
            <div class="font-weight-200 bold-font text-center">
                ${type.name}
            </div>
        </div>
    </div>
 </div>`))
 

    $(".assets").on("click",function(){ 
        location.href = `/mobile/assets/` + ($(this).data("type")).toLowerCase().replaceAll(" ","");
        data($(this).data("type"));
    })

    return assetsExplore;
})

// Threadbuilder logo -->

{/* <i class="fa-calculator fas fa-2x" aria-hidden="true"></i> */}

// Eaglebuilder logo --> 

{/* <i class="fab fa-twitter fa-2x" aria-hidden="true"></i> */}

// Aritcle logo -->

{/* <i class="fas fa-newspaper fa-2x" aria-hidden="true"></i> */}

// Refections logo -->

// <i class="fas fa-file-excel fa-2x" aria-hidden="true"></i>