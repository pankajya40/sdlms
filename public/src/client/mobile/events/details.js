"use strict";



/* globals define */

define("forum/mobile/events/details",['api', 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js'], function (api) {
	var details = {};

	details.init = function(){
		//store owl-carousel configuration
		var owlcarousel={
			loop:true,
			nav:true,
			mouseDrag:true,
			touchDrag:true,
			autoplay:true,
			autoplayTimeout:5000,
			autoplaytouchDragPause:true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				1000:{
					items:3
				}
			}
		};
		
		let eid = ajaxify.data.eventData._id;
		//Here use of owl-carousel
		$('.owl-carousel').owlCarousel(owlcarousel);
		

		
		$('#register').on('click',()=>{
			
		
			doAjax({
				type: 'PUT',
				url: `/app/events/register/${eid}`,
			}).then((result) => {
				console.log("Registered ", result)
				alert("Your are Registered")
			}).catch((err) => {
				console.log(err);
			});
		});
	}
	

	return details;
});
