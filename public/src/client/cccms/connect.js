'use strict';

/* globals define */

define('forum/cccms/connect', ['api'], function (api) {
    var connect = {};

    connect.init = function() {
        $.get( "http://localhost:4567/api/users", function( data ) {
            // $( ".result" ).html( data );
             
            return data.users.map((value,index) => {
    
                let errImage = 'https://sdlms.deepthought.education/assets/uploads/files/profile_images/default_profile-image-from-rawpixel-id-476985-jpeg.jpg'
                let cardHtml = `
                <div class="card hovercard" id='total-card'>
                <div class="cardheader">
        
                </div>
                <div class="avatar">
                    <img alt="" src="${value.picture ? value.picture : errImage }">
                </div>
                <div class="info">
                    <div class="title">
                        <a href="" style='font-size: 19px;'>${value.username}</a>
                    </div>
                    <div class="desc">Passionate</div>
                    <div class="desc">Curious developer</div>
                    <div class="desc">${value.status}</div>
                </div>
               <button class="connect" id='connect-btn' onclick="${cardspart(value.uid)}">Connect</button>
            </div>`
            
            $('#total-cards').append(cardHtml)
        }); 
    })
    
            // $('.connect').on('click', function(){
            //   alert("clicked")
            //     const uid = $(this).attr('uid');
            //     ajaxify.go(`/api/users/${uid}`)
            // })   

            function cardspart(uid){
                console.log(uid,"uid")
            }
    }
    
    return connect;
})