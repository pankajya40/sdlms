'use strict';

/* globals define */

define("forum/dtthon/creator/profile", ["api",
'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js', 
'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js'], function(api) {
  var creatorProfile = {};
  creatorProfile.init = function() {

    //CREATOR PROFILE PAGE

    let { project, clone } = ajaxify.data;

    var response;
    var learning_outcomes=[];
    var pre_requisites=[];
    var commitment;
    var projectTid;

    $(".backBtn").on("click", function() {
      ajaxify.go(`/dtthon/creator/storyboard/${project.tid}`);
    });

    if (project && project.category) {
      $('body').find('[id="category"]').find(`[option-id="${project.category}"]`).attr('selected', true);
    }

    if (project && project.commitment) {
      let commitment = project.commitment;
      if (project.commitment_type) {
        commitment = project.commitment_type.charAt(0).toUpperCase() + project.commitment_type.slice(1);
        $('body').find('.custom-commit').show();
        $('body').find('#id_commitment').hide();
      }
      $('body').find('[id="custom-commit-dropdown"]').find(`[option-id="${commitment}"]`).attr('selected', true);
    }

    //to add values in the learning outcomes
    $("#learnTask").next().on("click", function() {
        var learnTask = $("#learnTask").val()
        $("#learnTask").val('');
        if (learnTask == "") {
          alert("You Can't add a Empty Task");
        } else {
          learning_outcomes.push(learnTask);
          $("#learnAddedTasks").append(`<div class="col-12 pl-0 pr-0 taskAdded">
          <div outcomes-content class="add-more-values px-2 pr-4 py-1 mt-1 sdlms-text-tertiary-14px">${learnTask}</div>
              <svg delete-outcomes class="sdlms-floating-right delete" width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z" fill="#0029FF" />
              </svg>
          </div>`
				);
				// var newTaskAdded = $('#learnAddedTasks').find('.taskAdded').last();
				// newTaskAdded.find('.delete').on('click', function () {
				// 	$(this).parent().remove();
				// 	learning_outcomes.pop(learnTask);
				// });
			}
		});

		// to add values in pre requisites
		$('#preReqTask').next().on('click', function () {
			var preReqTask = $('#preReqTask').val();
			$('#preReqTask').val('');
			if (preReqTask == '') {
				alert("You Can't add a Empty Task");
			} else {
				pre_requisites.push(preReqTask);
				$('#preReqAddedTasks').append(
					`<div class="col-12 pl-0 pr-0 taskAdded">
          <div prerequisites-content class="add-more-values px-2 pr-4 py-1 mt-1 sdlms-text-tertiary-14px">${preReqTask}</div>
              <svg delete-prerequisites class="sdlms-floating-right delete" width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z" fill="#0029FF" />
              </svg>
          </div>`
				);

				// var newTaskAdded1 = $('#preReqAddedTasks').find('.taskAdded').last();
				// newTaskAdded1.find('.delete').on('click', function () {
				// 	$(this).parent().remove();
				// 	pre_requisites.pop(preReqTask);
				// });
			}
		});

    $('body').on('click', '[delete-prerequisites]', function () {
      let val = $(this).parent().find('[prerequisites-content]').text();

      $(this).parent().remove();
      var index = pre_requisites.findIndex(item => item.toLowerCase() == val.toLowerCase());

      if (index >= 0) {
        pre_requisites.splice(index, 1);
      }

    });

    $('body').on('click', '[delete-outcomes]', function () {
      let val = $(this).parent().find('[outcomes-content]').text();

      $(this).parent().remove();
      var index = learning_outcomes.findIndex(item => item.toLowerCase() == val.toLowerCase());

      if (index >= 0) {
        learning_outcomes.splice(index, 1);
      }
    });

		// to count character in description box
		$('.discript-textarea').on('keyup', function () {
      let ML = $(this).attr("maxlength");
      let CL = $(this).val().length;
      if (CL >= ML) {
        return alert("You have reached the maximum number of characters.");
      } else {
        $(this).next().find("[show-characters]").text(CL);
      }
		});

    $(`#pDescription`).tinymce({
      height: 270,
      width: '100%',
			menubar: false,
			branding: false,
			paste_data_images: false,
			automatic_uploads: false,
      responsive: true,
      placeholder: 'Please enter opportunity description of the project',
			plugins: [
			  'advlist', 'autolink', 'lists', 'link', 'charmap',
			  'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
			  'insertdatetime', 'wordcount'
			],
			toolbar: 'undo redo fullscreen | blocks | bold italic backcolor | ' +
			  'alignleft aligncenter alignright alignjustify | ' +
			  'bullist numlist outdent indent | removeformat'
		  });

    //to show custom commitment box
    $("body").on("change", "#custom-commit-dropdown", function() {
      if ($(this).val() == "3"){
        $("#id_commitment").hide();
        $(".custom-commit").show(); 
        }
    });

    //to show dropdown box
    $("body").on("click", ".custom-arrow", function() {
      $("#id_commitment").show();
      $(".custom-commit").hide();
    });

	//to post data value to post create project API
    $("body").off("click").on("click", "#createProject", function(event) {
      event.preventDefault();
     
      let commitment_type;
      projectTid = $(this).data('tid');

      commitment = $("#custom-commit-dropdown option:selected").text()
      if(commitment == "Custom") {
        commitment_type = commitment;
        commitment = $("#commitment-input").val();
      }

      //not to add empty values
      if ($("#pTitle").val() == "" && $("#pDescription").val() == "" && $("#short-description").val()) {
        alert("Make sure you have a Title, Trailer and Description of Process");
      } else {

        var data = {
          title: $("#pTitle").val(),
          project_image:$("#imageURL").val(),
          description: $("#pDescription").val(),
          short_description: $("#short-description").val(),
          pre_requisites: pre_requisites,
          learning_outcomes: learning_outcomes,
          category: $("#category option:selected").text(),
          commitment: commitment,
          tid:projectTid,
          clone: clone,
         // deadline: $("#deadline").val()
        };

        if (commitment_type) {
          data.commitment_type = commitment_type;
        }

        api[projectTid ? 'put' : 'post'](`/apps/project`, data).then(function(res) {
            response = res;
            alert("Congrats!!! Your Process is created. It's time to create Story for your Process.");
            ajaxify.go(`/dtthon/creator/storyboard/${clone ? response.tid : projectTid || response.tid}`);
          })
          .catch((error) => {
            notify(error.message, "error");
          });
      }

      // $(`#Next-btn`).attr("disabled", false)
      // $(`.create-story`).show();
      
    });

	//when click on next button redirect to storyboard
    // $("#Next-btn").on("click", function() {
    //   ajaxify.go(`/dtthon/creator/storyboard/${projectTid ? projectTid : response.tid}`);
    // });

	//to preview modal of the project profile
    $("#Preview-btn").on("click", function() {

    });  
	};

	return creatorProfile;
});







      // object.commitment = $("#custom-commit-dropdown option:selected").text()
      // if(object.commitment == "Custom") {
      //   object.commitment = $("#commitment-input").val();
      // }

    //   object.category =  $("#category option:selected").text();
    //   object.name = $("#pTitle").val(),
    //   object.description = $("#pDescription").val();
    //   object.project_image = $("#imageURL").val();
    //   object.deadline = $("#deadline").val();
    //   // object.commitment = commitment;
    //   $("#create-profile-Preview").append(template.aProfile(object));
    //   $(".cProfile-modal").removeClass("change-class");
    // });

    // $("body").on("click", "#preview-backbtn", function() {
    //   $(".cProfile-modal").remove();
    //   $(".cProfile-modal").addClass("change-class");
    // });

	//template for the project profile
    // const template = {
    //   aProfile: (data) => {
    //     let learning_outcomes_html = "";
    //     let pre_requisites_html = "";
    //     learning_outcomes.forEach(function(item,index) {
    //       learning_outcomes_html += `<li>${learning_outcomes[index]}</li>`;
    //     })
    //     pre_requisites.forEach(function(item,index) {
    //       pre_requisites_html += `<li>${pre_requisites[index]}</li>`;
    //     })

    //     let html = `<div class="cProfile-modal change-class d-flex justify-content-center align-items-center">
    //     <div class="cProfile-modal-content">
    //         <div class="sdlms-section session-view sdlms-form-elements">
    //             <div class="sdlms-section-header shadow-none custom-padding-x-40 primary-header align-items-center justify-content-between">
    //                 <div id="preview-backbtn" class="align-items-center sdlms-text-white-20px" style="text-align: center;">
    //                     <span class="sdlms-floating-left">
    //                         <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                             <path d="M10.5261 18L13 15.8849L4.96494 9L13 2.11505L10.5261 0L0 9L10.5261 18Z" fill="white" />
    //                             <line x1="5" y1="9" x2="26" y2="9" stroke="white" stroke-width="4" />
    //                         </svg>
    //                     </span>
    //                     <div id="pageTitle">${data.category}</div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="sdlms-section-body">
    //             <div id="details">
    //                 <div class="d-flex">
    //                     <div class="col-md-8 pl-3">
    //                         <div class="col-md-10 p-0 pb-4 project-heading font-weight-medium">${data.name}</div>
    //                         <div>
    //                             <div class="pb-2 bold-font">Opportunity description</div>
    //                             <div class="pb-3">${data.description}</div>
    //                         </div>
    //                         <div class="bold-font">Learning outcomes</div>
    //                         <div>
    //                             <ul id="learning_outcomes" style="font-weight: lighter; list-style: disc;">
    //                                 ${learning_outcomes_html}
    //                             </ul>
    //                         </div>
    //                         <div class="bold-font">Pre-requisties</div>
    //                         <div>
    //                             <ul id="pre_requisites" style="font-weight: lighter; list-style: disc;">
    //                                 ${pre_requisites_html}
    //                             </ul>
    //                         </div>
    //                         <div>
    //                            <!-- <div class="pt-3"><b>Deadline: </b>${data.deadline}</div> -->
    //                             <div class="pt-3"><b>Commitment: </b>${data.commitment}</div>
    //                         </div>
    //                     </div>
    //                     <div class="col-4 pb-3">
    //                         <div class="pb-3">
    //                             <img src="${data.project_image}" width="300px" height="200px" class="img-fluid profile-image" />
    //                         </div>
    //                         <div class="organization-profile card m-2 border-0 shadow rounded-10">
    //                             <div class="row">
    //                                 <div class="col-md-3 pr-0">
    //                                     <div class="pt-3 mt-2 pl-2 d-flex align-items-center justify-content-center">
    //                                         <img class="organization-profile-image" src="${companyprofile}" alt="" style="height: 50px;" />
    //                                     </div>
    //                                 </div>
    //                                 <div class="col-md-9 pl-0 p-3">
    //                                     <div class="bold-font pb-1">By <a href="${companyurl}">DeepThought</a></div>
    //                                     <div class="pr-3 pb-1 organization-font">
    //                                         ${company_details}
    //                                         <a href="#">Know more</a>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>`;

		// 		return html;
		// 	},
		// };
