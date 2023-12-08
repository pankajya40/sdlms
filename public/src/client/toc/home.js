"use strict";

/* globals define */

define("forum/toc/home", ["sdlms/classes/calendar"], function () {
	var home = {};
	home.init = () => {
  

        $(".sdlms-container").addClass("h-100 w-100 p-0");
        

        $("#Preview-btn").on("click", function() {
            $("#create-profile-Preview").append(template.aProfile());
            $(".cProfile-modal").removeClass("change-class");
          });
      
          $("body").on("click", "#preview-backbtn", function() {
            $(".cProfile-modal").remove();
            $(".cProfile-modal").addClass("change-class");
          });


        
    };
	return home;
});
