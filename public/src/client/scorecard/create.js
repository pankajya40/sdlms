"use strict";
/* globals define */
define("forum/scorecard/create",
	['api',
	'sdlms/scorecard'],
	function (api) {
		var create = {};
		const BASE_URL = "/api/v3/social_scorecard"
		create.init = () => {
			let creatorTemplate = ScorecardTemplate.scorecard()
			let data = ajaxify.data.scorecard || {}
			
			$('#pageTitle').append(data.title)
			$('body').off('click').on('click','.addrubricbutton',function(){
				let currentId = $(this).data("attribute-id")
				addnewrubric(currentId)
				$(`#current${currentId}`).find('#rubricrating').val("");
				$(`#current${currentId}`).find('#rubricname').val("");
			})
			$('body').on('click','.addnewattributebutton',function(){
				addnewsubattribute($(this).data('attribute-id'))
			})
			$('body').on('click','[edit-title-scorecard]',function(){
				let newtitle = prompt("Enter new title : ",data.title)
				//let newdescription = prompt("Enter new description : ",data.description)
				let confirmation = confirm("Are you sure you want to change ?")
				console.log(newtitle)
				if(confirmation){api.put(BASE_URL+"/templates",{tid:Number(data.tid),title:String(newtitle),description:""})
								.then((res)=>{notify("Scorecard updated !","success");$('#pageTitle').empty().append(res.title)})
								.catch((error)=>{console.log(error);notify("Some error encountered.","error")})}
			})
			$('body').on('click','[edit-title-attribute]',function(){
				let currentId = $(this).data("attribute-id")
				console.log(currentId)
				let newtitle = prompt("Enter new title",$('body').find(`[attribute-title-${currentId}]`).text())
				let newdescription = prompt("Enter new description",$("body").find(`[attribute-description-${currentId}]`).text())
				let confirmation = confirm("Are you sure ?")
				if(confirmation){
					api.put(BASE_URL+"/attribute",{tid:Number(data.tid),attributeId:currentId,attribute:{title:String(newtitle),description:String(newdescription),weightage:""}})
					.then((res)=>{console.log(res);$(`#attributetitle${currentId}`).empty().append(newtitle);$(`#attributedescription${currentId}`).empty().append(newdescription)})
					.catch((error)=>{console.log(error)})
				}
			})
			$('body').on('click','[edit-subattribute]',function(){
				let currentsubattributeid = $(this).data("subattribute-id")
				let currentattributeid = $(this).data("attribute-id")
				let currentdata = {
						attributeId : currentattributeid,
						subattributeId : currentsubattributeid,
						title : $('body').find('[subattributeheading]').text(),
						description : $('body').find("[subattributedescription]").text().replace(/^\s*/,''),
						weightage : $('body').find(`[subattributeweightage${currentsubattributeid}]`).text(),
						ratings : getRatingsediting(currentsubattributeid)
				}
				$('body').find(`[subattribute${currentsubattributeid}]`).empty().append(creatorTemplate.creatorScorecard.editablesubattribute(currentdata))
			})
			$('body').on('click','[addneweditablerubric]',function(){
				let currentId = $(this).data("addnewrubric-id")
				let emptydata = {
					name : "Name",
					rating : "Rating"
				}
				$('body').find(`[subattributebody${currentId}]`).append(creatorTemplate.creatorScorecard.editablelist(emptydata))
			})
			function donewithediting(editeddata){
				console.log("done witrh")
				$("body").find(`[subattribute${editeddata.subattributeId}]`).empty().append(creatorTemplate.creatorScorecard.aftereditbody(editeddata))
			}
			$('body').on('click','.editdonebutton',function(){
				let currentsubattributeid = $(this).data("subattribute-id")
				let currentattributeid = $(this).data("attribute-id")
				let editeddata = {
					tid : data.tid,
					attributeId : currentattributeid,
					subattributeId : currentsubattributeid,
					subattribute : {
						title : $('body').find("#editedheadingsubattribute").val(),
						description : $('body').find("#subattributeediteddescription").val(),
						weightage : $('body').find("#subattributeeditedweightage").text(),
						ratings : getRatingsediting(currentsubattributeid)
					}
				}
				let confirmation = confirm("Are you sure ?")
				if(confirmation){
					api.put(BASE_URL+"/subattribute",editeddata)
					.then((res)=>{notify("Submitted successfully.","success");donewithediting(editeddata)})
					.catch((error)=>{console.log(error);notify("Some error encountered.","error");})
				}
			})
			$('body').on('click','[deletescorecard]',function(){
				api.del(BASE_URL+'/template',{tid:data.tid}).then((res)=>{notify(`Delete Scorecard ${data.title}`,'success');ajaxify.go('/scorecard/dashboard')})
				.catch((err)=>{notify('Some error encountered','error');console.log(err)})
			})
			function resetcreatorbox(currentId){
				$(`#creatortab${currentId}`).find('#heading').val("")
				$(`#creatortab${currentId}`).find('#description').val("")
				$(`#preview-rubrics-${currentId}`).find('[name="values"]').remove()
				$(`#current${currentId}`).find('#rubricrating').val("");
					$(`#current${currentId}`).find('#rubricname').val("");
					$(`#current${currentId}`).find('#rubricscore').val("");
					$(`#creatortab${currentId}`).find('#weightage').val("")
			}
			$("body").on("click",".resetfields",function(){
				resetcreatorbox($(this).data('reset-id'))
			})
			function getRatings(currentId){
				let ratings = []
				console.log(currentId)
				$(`#preview-rubrics-${currentId}`).find('[name="values"]').each(function(){
					ratings.push({
						name : $(this).find('[name="name"]').text(),
						//score : $(this).find('[name="score"]').text(),
						rating : $(this).find('[name="rating"]').text()
					}
				)
			})
				return ratings
			}
			function getRatingsediting(currentId){
				let ratings = []
				$(`[subattributebody${currentId}]`).find('[name="values"]').each(function(){
					ratings.push({
						name:$(this).find('[name="name"]').text(),
						rating:$(this).find('[name="rating"]').text()
					})
				})
				return ratings
			}
			$(".backBtn").on("click", function() {
				ajaxify.go(`/scorecard/dashboard`);
			  });
			function makeattributeinvisible(id,attrtype){
				attrtype == "attribute" ? 
				$(".emptyattributecontainer").find(`[emptyparameter-${id}]`).remove()
				: $(".emptyattributecontainer").find(`[subattribute${id}]`).remove()
			}
			// $('body').on("click",".deletesubattribute",function(){
			// 	api.del(BASE_URL+"/subattribute",{tid:data.tid,attributeId:$(this).data("attribute-id"),subattributeId:})
			// })
			$("body").on("click",".deletesubattribute",function(){
				let currentId = $(this).data("attribute-id")
				let attrbteId = $(this).data("attribute-sub")
				api.del(BASE_URL+"/subattribute",{tid:data.tid,attributeId:attrbteId,subattributeId:currentId})
				.then((res)=>{ 
					makeattributeinvisible(currentId,"subattribute")
					notify(`Deleted Subattribute`,"success")
				})
				.catch((err)=>{notify(err,'error')})
			})
			$("body").on("click",".deleteattributebutton",function(){
				let currentId = $(this).data('attribute-id')
				api.del(BASE_URL+'/attribute',{tid:data.tid,attributeId:currentId})
				.then((res)=>{
					makeattributeinvisible(currentId,"attribute")
					notify('Attribute deleted successfully','success')
				})
				.catch((err)=>{notify(err,'error')})
			})


			
			

			function addnewrubric(currentid){
					console.log('run addnewrubric')
					let currentId = currentid
					let rating = $(`#current${currentId}`).find('#rubricrating').val();
					let name = $(`#current${currentId}`).find('#rubricname').val();
					//let score = $(`#current${currentId}`).find('#rubricscore').val();
					if(!rating||!name){
						alert('Rubric is empty')
					}
					else{
						let attributeData = {
							rating : rating,
							name :  name,
							//score :  score
						}
						$(`#preview-rubrics-${currentId}`).append(creatorTemplate.creatorScorecard.rubricselements(attributeData))
					}
			}		
			
			

			function addnewsubattribute(currentid){
				let currentId = currentid
					var title = String($(`#creatortab${currentId}`).find('#heading').val())
					var description = String($(`#creatortab${currentId}`).find('#description').val())
					var weightage = String($(`#creatortab${currentId}`).find('#weightage').val())
					let iasked = "creatortab"
					let subparameterdata = {
						tid : data.tid,
						attributeId : currentId,
						subattribute : {
							title : title,
							description : description,
							weightage : weightage,
							ratings : getRatings(currentId,iasked)
						}
					}
	
					console.log(getRatings(currentId))
					if(!title||!description||getRatings(currentId).length==0){
						alert('Heading and Description and atleast one rubric is compulsory')
					}
	
					else{
						api.post(BASE_URL+"/subattribute",subparameterdata)
						.then(function(res){
							$('body').find(`#create-attribute-${currentId}`).find('#nosubattributes').addClass('d-none')
							$('body').find(`#create-attribute-${currentId}`).append(creatorTemplate.creatorScorecard.rubricBtn(res.subattribute,currentId))
							resetcreatorbox(currentId)
							notify("Added subattribute successfully","success")
						})
						.catch((err)=>{notify(err,'error')})
					}
			}
			
			if(data.attributes.length==0){
				$('#element').append(`<div class="alert alert-warning" role="alert" id="noparameters">No parameters to edit here </div>`)}
			else{data.attributes.map((value)=>{
				value.pagetype = "creator"
				$('#element').append(creatorTemplate.creatorScorecard.emptyparameter(value))
				if(value.subattributes.length==0){
					$(`#create-attribute-${value.attributeId}`).append(`<div class="col-3 col-lg-3 sdlms-spacer justify-content-center" id="nosubattributes" role="alert"><div class="alert-warning" style="
					border-radius: 5px;
					text-align: center;
				">No Subattributes<div></div></div></div>`)
				}
				else{
					value.subattributes.map((data)=>{$('body').find(`#create-attribute-${value.attributeId}`).append(creatorTemplate.creatorScorecard.rubricBtn(data,value.attributeId))})
				 } 	 
			  })  
			}	

			
			$('#add-btn').on('click',function(){  
				let title = $('#parameter-title').val()
				let description = $('#parameter-desc').val()
				if (String(title).trim() == "" || String(description).trim() == ""){ return alert("Please Enter Title and Description.");}
				else {
					let parameterdata = {
						tid : Number(data.tid),
						attribute : {
							tid : Number(data.tid),
							title : title,
							description  : description
						}	
					}
					api.post(BASE_URL+'/attribute',parameterdata)
					.then(function(res){
						console.log(res,"here is attribute response")
						$("#element").find("#noparameters").addClass("d-none")
						$('#parameter-title').val("")
						$('#parameter-desc').val("")
						res.attributeData.pagetype = "creator"
						$('#element').append(creatorTemplate.creatorScorecard.emptyparameter(res.attributeData))
						notify('Parameter added successfully','success')
					})
					.catch((err)=>{notify(err,'error')})
				}
			})

			function checkAllfield(data){
				if(!data.attributes.length){return "attribute"}
				else{
					data.attributes.map((value)=>
					{if(!value.subattributes.length)
						{return "subattribute"}
					 else{
						value.subattributes.map((value)=>{
							if(!value.ratings.length){return "rating"}
						})
					 }
					}
					
					)
				}
			}
			$('body').on('click','#publishbutton',function(){
				ajaxify.refresh()
				if(checkAllfield(data)=="attribute"){notify("Add atleast one attribute","error")}
				else if(checkAllfield(data)=="subattribute"){notify("Add atleast one subattribute in every attribute","error")}
				else if(checkAllfield(data)=="rating"){notify("Add atleast one rubrin inside every subattribute","error")}
				else{
					if (!confirm("Are you sure ? You cannot edit scorecard after publising.")) return;
					let editData = {
						tid : data.tid,
						status : "published",
						isActive : true
					}
					api.post(BASE_URL+"/publish",editData)
					.then((res)=>{
						notify("Published succesfully","success")
						ajaxify.go('/scorecard/dashboard')
					})
					.catch((err)=>{console.log(err);notify("Some error encountered","error")})
				}
			})
			$('body').on('click', '.sdlms-thread [collapse]', function (e) {
				console.log('collapse');
				console.log($(this).parents('.sdlms-thread').first())
				if ($(e.target).attr('contenteditable') == 'true') return;
				$(this).parents('.sdlms-thread').first().find('[collapse-body]')
					.slideToggle();
				$(this).parents('.sdlms-thread').first().find('[collapse-icon]')
					.toggleClass('rotate');
			});
		}
		return create;
	});