'use strict';





/* globals define */

define('forum/cccms/explore', ['api'], function (api) {
	var explore = {};
   explore.init  = function () {
      
    showOpen();
    $('.category').on('click', function (event) {
        let filter = (event.target.getAttribute('data-value'))        
        $('#filteringbtn').html(event.target.innerText);
        showOpen(filter);

    })

  $('.times').on('click', function (event) {
        let filter = (event.target.getAttribute('data-value'))        
       console.log(filter)
        oneCard(filter)

    })


	 function showOpen(filter) {
		$('#openSec').empty();
        filter = filter || '';        
		let url = `/cccms/explore?tag=${filter}`;
		api.get(url, {}).then((res) =>{   
            console.log(res);       
			res.data.map((element) =>{              
				$('.openTickSec').append(
					explore.openCards.components.card(element)
				)
			})
		})
	 }	 
     
     function oneCard(id) {
		$('#openSec').empty();
        filter = filter || '';        
		let url = `/cccms/explore/${id}`;
		api.get(url, {}).then((res) =>{   
            console.log(res);       
			// res.data.map((element) =>{              
				// $('.openTickSec').append(
				// 	explore.openCards.components.card(element)
				// )
			// })
		})
	 }

     window.collaborate = (uid) => {
        console.log('Button' + uid);
   
        ajaxify.go(`/cccms/explore/${uid}`)
    };



        // api.get(`/cccms/explore/${dataId}`,{})
        // .then((res) =>{console.log(res)})
        // .catch((err) => {console.log(err)} )

   explore.openCards = 
   {
	 components:{
		card: (element) => {
			return   `<div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card p-3 mb-4">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div class="icon"> <img class="icon" src="${element.sender.picture}"> </div>
                        <div class="ms-2 c-details ml-2">
                            <h6 class="mb-0">${element.sender.displayname}</h6> <span>Description</span>
                        </div>
                    </div>
                    <div class="p-0 mt-0"> 
                    <div>
                    <div class="badge p-0 " > 
                    <span >${element.tags}</span>                 
                    </div>  
                    
                    <div class="badge p-0">                    
                    <span>${element.toMode}</span>  
                    </div>  
                    </div>
                    <div class="d-flex w-100 justify-content-end c-details">
                    <span >${moment(element.createdAt).fromNow()}</span>
                    
                    </div>
                  </div>
                  
                </div>
                <div class="mt-2">               
                    <h6 class="heading"> ${element.objectives.slice(0, 80)}</h6>
                    <h6 class="heading"> ${element._id}</h6>
                </div>
                <div class="d-flex justify-content-between mt-3"> 
                <button class="btn btn-primary times" onclick="view()" data-value="${element._id}">View</button>

                <button class="btn btn-primary d-flex" onclick="collaborate(${element.sender.uid})">Collaborate</button>                
                </div>
            </div>
        </div>`
		}
	 }
   }

	
}

	return explore;
})

// 


// function View(id){
//     console.log(id,"dhdhdh")
//     // ajaxify.redirect(id)

//     ajaxify.go(`/cccms/explore/${id}`)

// }
// <div class="mt-3">
//     <div class="progress">
//         <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
//     </div>
//     <div class="mt-3"> <span class="text1">32 Applied <span class="text2">of 50 capacity</span></span> </div>
// </div>