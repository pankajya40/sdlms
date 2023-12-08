"use strict";

/* globals define */

define("forum/dtthon/applicant/profile", ["api"], function (api) {
	var profile = {};
	profile.init = function () {
    $(".apply-btn").on("click", function () {
      let { tid } = ajaxify.data.project;
  
      api.put('/apps/project/'+ tid +'/apply', {})
        .then(() => location.href = `/dtthon/applicant/storyboard/${tid}`)
        .catch((err) => notify(err.message, 'error'));
    });

    $(".process-image").append(`<img src="${ajaxify.data.project.project_image ? ajaxify.data.project.project_image : "https://thumbs.dreamstime.com/b/creative-mind-concept-hand-holding-colorful-brain-sketch-concrete-background-85126393.jpg"}" class="img-fluid profile-image"></img>`)
    $(".dtthon-profile-copyright").append(` <p>©️ DTthon ${ajaxify.data.project.category} by ${ajaxify.data.userData.username} </p>`)

	};

	return profile;
});




	  // $(".select-box").on("change", function () {
		// 	if ($(".select-box").val() == "Y") {
		// 		$(".button")
		// 			.toggleClass("button-primary apply-button")
		// 			.attr("disabled", false);
		// 	}
		// 	if ($(".select-box").val() == "N") {
		// 		$(".button")
		// 			.toggleClass(" apply-button  button-primary")
		// 			.attr("disabled", true);
		// 	}
		// });


//     $("#details").append(`<div class="d-flex">
//     <div class="col-md-8 pl-3">
//       <div class="col-md-10 p-0 pb-4 project-heading font-weight-medium">
//         ${project.title}
//       </div>
//       <div>
//         <div class="pb-2 bold-font">
//           Opportunity description
//         </div>
//         <div class="pb-3"> ${project.description} </div>
//       </div>
//       <div class="bold-font">
//         Learning outcomes
//       </div>
//       <div>
//         <ul id="learning_outcomes" style="font-weight: lighter; list-style: disc;">
//         </ul>
//       </div>
//       <div class="bold-font">
//         Pre-requisties
//       </div>
//       <div>
//         <ul id="pre_requisites" style="font-weight: lighter; list-style: disc;">
//         </ul>
//       </div>
//       <div>
//      <!--   <div class="pt-3">
//           <b>Deadline:</b>${project.deadline}
//         </div> -->
//         <div class="pt-3">
//         <b>Commitment:</b>${project.commitment}
//       </div>
//       </div>
//     </div>
//     <div class="col-4 pb-3">
//       <div class="pb-3">
//         <img src="${project.project_image}" class="img-fluid profile-image" alt="">
//       </div>
//       <div class="organization-profile card m-2 border-0 shadow">
//         <div class="row">
//           <div class="col-md-3 pr-0">
//             <div class="pt-3 pl-3">
//               <img class="organization-profile-image" src="${profile_pic}" alt="">
//             </div>
//           </div>
//           <div class="col-md-9 pl-0 p-3">
//             <div class="bold-font pb-1">
//               By <a href="${company_site}">DeepThought</a>
//             </div>
//             <div class="pr-3 pb-1 organization-font">
//             ${company_details}
//               <a href="#">Know more</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div> 
// `);