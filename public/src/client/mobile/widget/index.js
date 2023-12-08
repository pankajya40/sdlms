'use strict';

/* globals define */

define('forum/mobile/widget/index', ['api','mobile/DiscussionRoom'], function (api) {
	var widget = {};
    widget.init = () => {
        let discuss = new DiscussionRoom("92","#targetedmodal")
        $('body').on("click",".open-button",function(){
          console.log('hello')
          $('#myForm').removeClass('d-none')
        })
        $("#close-button").on("click",function(){
          $("#myForm").addClass('d-none')
        })
    }
    

     
    return widget;
    
})