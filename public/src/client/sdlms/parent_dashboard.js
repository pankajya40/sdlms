"use strict";

define("forum/sdlms/parent_dashboard", [
	"api",
	"sdlms/threadbuilder",
	"sdlms/eaglebuilder",
	"sdlms/spreadsheet",
	"sdlms/feedbacks",
	"https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
	"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js",
], function (api) {
	var parentDashboard = {};
	let navigate = -1; // Navigation ids for sessions table
	let {parentcomponents} = Template.parentDashboard(); //template for sessions table
	var body;
	
	let tpid;
	let topica;
    let reactions;
    
	parentDashboard.init = function () {

		// session participants
		$('.expand_participants').off('click').on('click', function () {
			$('.participants_section').toggleClass('change-class');
			$('.sdlms-asset-view').toggleClass('col-md-6');
			parentDashboard.initMembers();
		})		
		$('.return-participants').on('click', function () {
			// $('#studentAssetView').empty();
			// $('#studentAssetView').addClass('h-100 w-100 text-center d-flex justify-content-center align-items-center');;
			// $('[asset-selection-label].assets').text(`Assests selection`);
			// $('[asset-selection-label].assets').removeClass('active');
			// $('[sdlms-toggle-members-list]').toggle();
			// $("body").find(".sdlms-asset-selection").addClass('change-class');
			// parentDashboard.initMembers();

		})
		$('.close_participants').on('click', function () {
			$('.participants_section').toggleClass('change-class');
			$('.sdlms-asset-view').toggleClass('col-md-6');
		})	
		//end participants
		

		//carousel 
		$('.owl-carousel').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			dots: false,
			responsive: {
				0: {
					items: 1
				}
			}
		})

		//modal of emoticons started
		parentDashboard.getReactionsDataByMonths(ajaxify.data.user[0].uid)
		.then(reactions =>{			
			//data of graph - No of emoticons
			const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			var primary_month = months[new Date().getMonth()], secondary_month = months[new Date().getMonth()];
			//Declarement and initialization of onload graph
			var no_of_primary_month_emoticons = [], no_of_secondary_month_emoticons = [];
			var link_of_primary_month_emoticons = [], link_of_secondary_month_emoticons = [];
			var obj;
			obj = reactions[primary_month];
			console.log(obj);
			var index = 0;
			for(let x in obj)
			{
				no_of_primary_month_emoticons.push(obj[x]);
				link_of_primary_month_emoticons[index] = new Image();
				link_of_primary_month_emoticons[index].src = reactions.icons[x];
				index+=1;
			}
			obj = reactions[secondary_month];
			console.log(obj);
			index = 0;
			for(let x in obj)
			{
				no_of_secondary_month_emoticons.push(obj[x]);
				link_of_secondary_month_emoticons[index] = new Image();
				link_of_secondary_month_emoticons[index].src = reactions.icons[x];
				index+=1;
			}
			console.log(no_of_primary_month_emoticons,no_of_secondary_month_emoticons);
			// Labels of the emoticons graph
			const labels = ['','','','',''];
			// Datasets of the emoticons graph
			const data = {
				labels: labels,
				datasets: [
					{
						label:primary_month,
						backgroundColor: '#fc8cff',
						barPercentage:0.9,
						data:no_of_primary_month_emoticons
					},
					{
						label:secondary_month,
						backgroundColor: '#009a6e',
						barPercentage:0.9,
						data:no_of_secondary_month_emoticons 
					}
				]
			};
			//Adding the image and number of counts after the bar
 			const multiBarLogo = {
				id: 'multiBarLogo',
				afterDatasetDraw(chart,args,options){
					const {ctx} = chart;
					ctx.save();
					console.log("inside multibarrlogo")
					if(no_of_primary_month_emoticons.length != 0 && no_of_secondary_month_emoticons.length != 0 )
					{
						for(let i = 0 ; i < no_of_primary_month_emoticons.length ; i++ )
						{
							ctx.drawImage(link_of_primary_month_emoticons[i], chart.getDatasetMeta(0).data[i].x +5, chart.getDatasetMeta(0).data[i].y - 15 , 25,25);
							ctx.fillText( `( ${no_of_primary_month_emoticons[i]} )` , chart.getDatasetMeta(0).data[i].x+35,chart.getDatasetMeta(0).data[i].y,)
							ctx.fillStyle = "#0029FF"
						}
						for(let i = 0 ; i < no_of_secondary_month_emoticons.length ; i++ )
						{
							ctx.drawImage(link_of_secondary_month_emoticons[i], chart.getDatasetMeta(1).data[i].x +5, chart.getDatasetMeta(1).data[i].y - 15 , 25,25);
							ctx.fillText( `( ${no_of_secondary_month_emoticons[i]} )` , chart.getDatasetMeta(1).data[i].x+35,chart.getDatasetMeta(1).data[i].y,)
							ctx.fillStyle = "#0029FF"
						}
					}
					else if(no_of_primary_month_emoticons.length != 0)
					{
						for(let i = 0 ; i < no_of_primary_month_emoticons.length ; i++ )
						{
							ctx.drawImage(link_of_primary_month_emoticons[i], chart.getDatasetMeta(0).data[i].x +5, chart.getDatasetMeta(0).data[i].y - 15 , 25,25);
							ctx.fillText( `( ${no_of_primary_month_emoticons[i]} )` , chart.getDatasetMeta(0).data[i].x+35,chart.getDatasetMeta(0).data[i].y,)
							ctx.fillStyle = "#0029FF"
						}
					}
					else if(no_of_secondary_month_emoticons.length !=0)
					{
						for(let i = 0 ; i < no_of_secondary_month_emoticons.length ; i++ )
						{
							ctx.drawImage(link_of_secondary_month_emoticons[i], chart.getDatasetMeta(1).data[i].x +5, chart.getDatasetMeta(1).data[i].y - 15 , 25,25);
							ctx.fillText( `( ${no_of_secondary_month_emoticons[i]} )` , chart.getDatasetMeta(1).data[i].x+35,chart.getDatasetMeta(1).data[i].y,)
							ctx.fillStyle = "#0029FF"
						}
					}
					else
					alert("No reactions for these months");
			}
			};	
			//Configuration of the emoticons graph 
			const config = {
				type: 'bar',
				data: data,
				plugins: [multiBarLogo],
				options: {
					indexAxis: 'y',  
					scales:{
						y:{
							grid:{display: false,drawBorder:false}
						},
						x:{
							grid:{display: false,drawBorder:false},
							ticks:{display:false}
						}
					},
					layout:{
						padding:{right:100}
					},
				} 
			};
			console.log("Drawing Chart...")
			const myChart =  new Chart( $('.emoticons-chart-div') , config);
			emoticonsDescription(reactions, primary_month, secondary_month);			
			//selection of new primary or secondary months to compare
			$(".months").on("change",function(){
				console.log("Changed me primary")
				compareGraph();
			});
			$("[name ='compare_with_radio']").on("click",function(){
				console.log("Changed me secondary")
				compareGraph();
			});			
			// compare graph function for passing the new data to the graph
			function compareGraph(){
				primary_month = $(".months").val();
				console.log(primary_month);
				let month_elements = $("[name ='compare_with_radio']");
				//Redeclaration and reasignment of the data to the graph
				link_of_primary_month_emoticons = [], no_of_primary_month_emoticons=[];
				link_of_secondary_month_emoticons = [], no_of_secondary_month_emoticons=[];
			
				for (let i = 0; i < month_elements.length ; i++) {
					if(month_elements[i].checked){
						secondary_month = month_elements[i].value
						console.log(secondary_month);
						}
				}
				var index = 0;
				
				obj = reactions[primary_month];
				for(let x in obj)
				{
					no_of_primary_month_emoticons.push(obj[x]);
					link_of_primary_month_emoticons[index] = new Image();
					link_of_primary_month_emoticons[index].src = reactions.icons[x];
					index+=1;
				}
				index = 0;
				obj = reactions[secondary_month];
				for(let x in obj)
				{
					no_of_secondary_month_emoticons.push(obj[x]);
					link_of_secondary_month_emoticons[index] = new Image();
					link_of_secondary_month_emoticons[index].src = reactions.icons[x];
					index+=1;
				}
				// console.log(link_of_primary_month_emoticons)
				// console.log(link_of_secondary_month_emoticons)
				myChart.data.datasets[0].data = no_of_primary_month_emoticons 
				myChart.data.datasets[1].data = no_of_secondary_month_emoticons
				myChart.data.datasets[0].label = primary_month
				myChart.data.datasets[1].label = secondary_month
				
				myChart.update();
				emoticonsDescription(reactions, primary_month, secondary_month);
				
			}
		})
		.catch(err => console.log(err));
		//end of modal		
		// session statics minimization
		$("#change-header1").text("words Typed")
		$("#change-header2").text("Thread Captured")
		$("body").on("click", ".change-view", function (e) {
			if ($(".sdlms-sections").find(".change-class").data("view") == "smaller") {
				$(".sdlms-parentDashboard-view").toggleClass("change-class");
				var currentRow = $(this).closest("tr");
				var col1 = currentRow.find("td:eq(1)").html();
				var col2 = currentRow.find("td:eq(2)").html();
				var col3 = currentRow.find("td:eq(3)").html();
				body = $('tbody').html();

				$(".sdlms-asset-view").removeClass("change-class");
				$(".feedback-sections").addClass("change-class");
				$(".question-sections").addClass("change-class");
				parentDashboard.initThreadBuilder(
					$(this).data("tid"),
					$(this).data("topic")
				);
				parentDashboard.initEagleBuilder(
					$(this).data("tid"),
					$(this).data("topic")
				);
				parentDashboard.initSpreadSheet(
					$(this).data("tid"),
					$(this).data("topic")
				);
			} else {
				$(".sdlms-asset-view").removeClass("change-class");
				$(".feedback-sections").addClass("change-class");
				$(".question-sections").addClass("change-class");
				parentDashboard.initThreadBuilder(
					$(this).data("tid"),
					$(this).data("topic")
				);
				parentDashboard.initEagleBuilder(
					$(this).data("tid"),
					$(this).data("topic")
				);
				parentDashboard.initSpreadSheet(
					$(this).data("tid"),
					$(this).data("topic")
				);
			}
		});
		parentDashboard.paginateSessions(`/sdlms/getsessions?limitBy=5&page=0&type=previous`, {
			parent: "sdlms-my-upcoming-session-table-body"
		});
		//Feedback given and recieved Dropdown 
		$("[asset-selection-label].active")
			.off("click")
			.on("click", function () {
				console.log("inside");
				$(".assetSelectionDropDown").slideToggle();
				$(this).toggleClass("visibility-shown");
				let $this = $(this);
				$(".assetSelectionDropDown")
					.find("[get-asset]")
					.off("click")
					.on("click", function () {
						$("#studentAssetView")
							.empty()
							.removeClass(
								"h-100 w-100 text-center d-flex justify-content-center align-items-center"
							);
						$("[asset-selection-label]").text(
							`${$(this).data("type") == "fr"
								? "Feedback Received"
								: "Feedback Given"
							}`
						);
						$("[asset-selection-label]").data("fbType", $(this).data("type"));
						$(".assetSelectionDropDown").slideToggle();
						$(".assetSelectionDropDown")
							.find("[get-asset]")
							.removeClass("active");
						$(this).addClass("active");
						// LIVE_CLASS.getAsset($this.data('uid'), $(this).data('type'));
						
						$(this).data("type") == "fr"
							? parentDashboard.paginateFeedback(
								`/sdlms/feedbacks?uid=${ajaxify.data.user[0].uid}`,
								{
									parent: "sdlms-mb-feedback-section",
								}
							)
							: parentDashboard.paginateFeedback(
								`/sdlms/feedbacks?uid=${ajaxify.data.user[0].uid}&type=given`,
								{
									parent: "sdlms-mb-feedback-section",
								}
							);
					});
			});
		//Question asked and answered dropdown
		$("[asset-selection-label].question.active")
			.off("click")
			.on("click", function () {
				console.log("inside");
				$(".assetSelectionDropDownqn").slideToggle();
				$(this).toggleClass("visibility-shown");
				let $this = $(this);
				$(".assetSelectionDropDownqn")
					.find("[get-asset]")
					.off("click")
					.on("click", function () {
						$("#studentAssetView")
							.empty()
							.removeClass(
								"h-100 w-100 text-center d-flex justify-content-center align-items-center"
							);
						$("[asset-selection-label_qn]").text(
							`${$(this).data("type") == "qa"
								? "Question asked"
								: "Answer given"
							}`
						);
						$("[asset-selection-label_qn]").data("fbType", $(this).data("type"));
						$(".assetSelectionDropDownqn").slideToggle();
						$(".assetSelectionDropDownqn")
							.find("[get-asset]")
							.removeClass("active");
						$(this).addClass("active");
						// LIVE_CLASS.getAsset($this.data('uid'), $(this).data('type'));
						$(this).data("type") == "qa"
							//fixing api for questions and answers
							? parentDashboard.paginateQuestion(
								`/sdlms/question?uid=${ajaxify.data.user[0].uid}&tid=${tpid}`,
								{
									parent: "sdlms-mb-question-section",
								}
							)
							: parentDashboard.paginateAnswer(
								`/sdlms/answer?uid=${ajaxify.data.user[0].uid}&tid=${tpid}`,
								{
									parent: "sdlms-mb-question-section",
								}
								//fixing api for questions and answers
							);
					});
			});		
	};
	//Session statistics, feedback, and question's table navigation
	$("[data-type = 'navigation']").on("click", function () {

		navigate = $(this).data("navigate") || -1
		if (navigate == -1) {
			$("#change-header1").text("words Typed")
			$("#change-header2").text("Thread Captured")
			$("body").on("click", ".change-view", function (e) {
				if ($(".sdlms-sections").find(".change-class").data("view") == "smaller") {
					$(".sdlms-parentDashboard-view").toggleClass("change-class");
					$(".dashboard-sessionIndex").toggleClass("change-class");
					$(".sdlms-asset-view").removeClass("change-class");
					$(".feedback-sections").addClass("change-class");
					$(".question-sections").addClass("change-class");
					parentDashboard.initThreadBuilder(
						$(this).data("tid"),
						$(this).data("topic")
					);
					parentDashboard.initEagleBuilder(
						$(this).data("tid"),
						$(this).data("topic")
					);
					parentDashboard.initSpreadSheet(
						$(this).data("tid"),
						$(this).data("topic")
					);
				} else {
					$(".sdlms-asset-view").removeClass("change-class");
					$(".feedback-sections").addClass("change-class");
					$(".question-sections").addClass("change-class");
					parentDashboard.initThreadBuilder(
						$(this).data("tid"),
						$(this).data("topic")
					);
					parentDashboard.initEagleBuilder(
						$(this).data("tid"),
						$(this).data("topic")
					);
					parentDashboard.initSpreadSheet(
						$(this).data("tid"),
						$(this).data("topic")
					);
				}
			});
			parentDashboard.paginateSessions(`/sdlms/getsessions?limitBy=5&page=0&type=previous`, {
				parent: "sdlms-my-upcoming-session-table-body"
			})
		}
		else if (navigate == 1) {
			$("#change-header1").text("no of feedbacks")
			$("#change-header2").text("Teacher Feedback")
			$("body").on("click", ".change-view", function (e) {
				if ($(".sdlms-sections").find(".change-class").data("view") == "smaller") {
					$(".sdlms-parentDashboard-view").toggleClass("change-class");
					$(".dashboard-sessionIndex").toggleClass("change-class");
					$(".sdlms-asset-view").addClass("change-class");
					$(".feedback-sections").removeClass("change-class");
					$(".question-sections").addClass("change-class");
					parentDashboard.paginateFeedback(
						`/sdlms/feedbacks?uid=${ajaxify.data.user[0].uid}&sessionIDs=${$(this).data('attachment-id')}`,
						{
							parent: "sdlms-mb-feedback-section",
						}
					);
				} else {
					$(".sdlms-asset-view").addClass("change-class");
					$(".feedback-sections").removeClass("change-class");
					$(".question-sections").addClass("change-class");
					parentDashboard.paginateFeedback(
						`/sdlms/feedbacks?uid=${ajaxify.data.user[0].uid}&sessionIDs=${$(this).data('attachment-id')}`,
						{
							parent: "sdlms-mb-feedback-section",
						}
					);
				}
			});
			parentDashboard.paginateSessions(`/sdlms/getsessions?limitBy=5&page=0&type=previous`, {
				parent: "sdlms-my-upcoming-session-table-body"
			})
		}
		else if (navigate == 2) {
			console.log($(this).data("navigate"))
			$("#change-header1").text("Questions asked")
			$("#change-header2").text("Answer given")
			$("body").on("click", ".change-view", function (e) {
				if ($(".sdlms-sections").find(".change-class").data("view") == "smaller") {
					$(".sdlms-parentDashboard-view").toggleClass("change-class");
					$(".dashboard-sessionIndex").toggleClass("change-class");
					$(".sdlms-asset-view").addClass("change-class");
					$(".feedback-sections").addClass("change-class");
					$(".question-sections").removeClass("change-class");
					parentDashboard.paginateQuestion(
						`/sdlms/question?uid=${ajaxify.data.user[0].uid}&tid=${tpid}`,
						{
							parent: "sdlms-mb-question-section",
						}
					)
				} else {
					$(".sdlms-asset-view").addClass("change-class");
					$(".feedback-sections").addClass("change-class");
					$(".question-sections").removeClass("change-class");
					parentDashboard.paginateQuestion(
						`/sdlms/question?uid=${ajaxify.data.user[0].uid}&tid=${tpid}`,
						{
							parent: "sdlms-mb-question-section",
						}
					)
				}
			});
			parentDashboard.paginateSessions(`/sdlms/getsessions?limitBy=5&page=0&type=previous`, {
				parent: "sdlms-my-upcoming-session-table-body"
			})
		}
	})
	$(".").find(".page-navigator").off("click").on("click", function () {
		let url = $(this).data("url")
		console.log(url)
		if (url) {
			parentDashboard.paginateSessions(url, {
				parent: "sdlms-my-upcoming-session-table-body",
			})
		}
		// data-sdlms-type ==> .data("sdlmsType")

	})
	$(".sdlms-container").find(".page-navigator").off("click").on("click", function () {
		let url = $(this).data("url")
		console.log(url)
		if (url) {
			parentDashboard.paginateSessions(url, {
				parent: "sdlms-my-upcoming-session-table-body",
			})
			return
		}
		// data-sdlms-type ==> .data("sdlmsType")

	})
	$(".sdlms-container").find(".page-navigator").off("click").on("click", function () {
		let url = $(this).data("url")
		console.log(url)
		if (url) {
			parentDashboard.paginateSessions(url, {
				parent: "sdlms-my-upcoming-session-table-body",
			})
			return
		}
		// data-sdlms-type ==> .data("sdlmsType")

	})
	//The back functionality
	$('[exittomain]').on('click', () => {
		$('#expanded-view').removeClass("change-class");
		$('[smaller-view]').addClass("change-class");
		$(".dashboard-sessionIndex").removeClass("change-class");
		$(".sdlms-asset-view").addClass("change-class");
		$(".feedback-sections").addClass("change-class");
		$(".question-sections").addClass("change-class");
		$('.participants_section').removeClass('change-class');


		$(".sdlms-my-upcoming-session-table").find('tbody').html(`
			${body}
		`);
	})
	//Session's statistics table calling function
	parentDashboard.paginateSessions = (
		url,
		data = {}
	) => {
		$(".sdlms-container").find(`.${data.parent}`).empty();
		api.get(url, {}).then((res) => {
			console.log('here temp data ', res)
			let response = res.data.map((value, index) => {
				let data = {};
				data.srNum = index;
				data.per_page = res.per_page;
				data.current_page = res.current_page;
				data.tid = value.tid;
				data.topic = value.topic;
				data.teacherName = (!value.teacher.fullname)?value.teacher.username : value.teacher.fullname;
				data.DateTime = value.schedule;
				data.threadbuilder = value.threadbuilderStats;
				data.navigate = navigate;
				return data;
			})//Pegination of session statistics table
			$(".sdlms-container").find(`.${data.parent}`).html(response.map(parentcomponents.sessions.bind(this)).join(""))
			$(".sdlms-container").find(".sessions-page").val(res.current_page + 1);
			$(".sdlms-container").find(".sessions-page-count").text(res.last_page + 1);
			$(".sdlms-container").find(".page-navigator.next").data("url", res.next_page_url);
			$(".sdlms-container").find(".page-navigator.prev").data("url", res.prev_page_url);
		});
	};
	//Threadbuilder view function
	parentDashboard.initThreadBuilder = (tid, topic) => {
		var uid = ajaxify.data.user.at().uid;
		try {
			api
				.get(`/sdlms/${tid}/threadbuilder?uid=${uid}`, {})
				.then((r) => {
					// console.log(r);
					let data = {
						meta: r.meta,
						threads: r.threads,
						conclusion: r.conclusion || {},
					};

					new threadBuilder({
						target: "#studentThreadBuilder",
						action: "reader",
						tid: tid,
						id: r.pid || r.id,
						uid: uid,
						with: data,
						addFeedbacks: false,
						topic: topic,
					});

					parentDashboard.tbLoaded = true;
				})
				.catch((error) => {
					console.log(error);
					throw error;
				});
		} catch (error) {
			console.log("Error while fetching Student Thread Builder:", error);
		}
	};
	//EagleBuilder view function
	parentDashboard.initEagleBuilder = (tid, topic) => {
		var uid = ajaxify.data.user.at().uid;
		try {
			api.get(`/sdlms/${tid}/eaglebuilder?uid=${uid}`, {}).then((r) => {
				// console.log(r);
				let data = {
					meta: r.meta,
					tracks: r.tracks,
					conclusion: r.conclusion || {},
				};

				new eagleBuilder({
					target: "#studentEagleBuilder",
					action: "reader",
					tid: tid,
					with: data,
					tracking: false,
					id: r.pid || r.id,
					control: true,
					addFeedbacks: false,
					uid: uid,
					topic: topic,
				});


			});
		} catch (error) {
			console.log("Error while fetching Student Eagle Builder:", error);
		}
	};
	//SpreadSheet view function
	parentDashboard.initSpreadSheet = (tid, topic) => {
		var uid = ajaxify.data.user.at().uid;
		try {
			api.get(`/sdlms/spreadsheet?uid=${uid}&tid=${tid}`, {}).then((r) => {

				// console.log(r);
				new spreadSheet({
					target: "#studentSpreadSheet",
					action: "reader",
					tid: tid,
					with: r.data,
					tracking: false,
					id: r.pid,
					control: true,
					addFeedbacks: false,
					uid: uid,
					topic: topic,
				});
			});
		} catch (error) {
			console.log("Error while fetching Spreadsheets:", error);
		}
	};
	//Questions view function
	parentDashboard.paginateQuestion = (
		url,
		data = {}
	) => {
		console.log(data)
		$(".sdlms-container").find(`.${data.parent}`).empty().removeClass("d-flex justify-content-center align-items-center");
		api.get(url, {}).then((res) => {
			console.log("These are questions results");
			console.log(res.data);
			if (!res.data || res.data.length == 0) {
				return $(".sdlms-container").find(`.${data.parent}`).html("No questions").addClass("d-flex justify-content-center align-items-center");		
			}
			let questionResponse= res.data.map((elem)=>{
				let questiondata={}
				questiondata.content=elem.content;
				return questiondata;
			});
			$(".sdlms-container").find(`.${data.parent}`).html(questionResponse.map(parentcomponents.questions.bind(this)).join(""));
			$(".sdlms-container").find(".questions-page").val(res.current_page + 1);
			$(".sdlms-container").find(".question-page-count").text(res.last_page + 1);
			$(".sdlms-container").find(".qn-navigator.next").data("url", res.next_page_url);
			$(".sdlms-container").find(".qn-navigator.prev").data("url", res.prev_page_url);
			parentDashboard.rquestionLoaded = true;
		});
	};
	//Answer view function
	parentDashboard.paginateAnswer = (
		url,
		data = {}
	) => {
		console.log(data)
		$(".sdlms-container").find(`.${data.parent}`).empty().removeClass("d-flex justify-content-center align-items-center");
		api.get(url, {}).then((res) => {
			console.log("These are answerss results");
			console.log(res.data);
			if (!res.data || res.data.length == 0) {
				return $(".sdlms-container").find(`.${data.parent}`).html("No answerss").addClass("d-flex justify-content-center align-items-center");		
			}
			let answerResponse= res.data.map((elem)=>{
				let answerdata={}
				answerdata.content=elem.content;
				return answerdata;
			});
				$(".sdlms-container").find(`.${data.parent}`).html(answerResponse.map(parentcomponents.answers.bind(this)).join(""))
				$(".sdlms-container").find(".questions-page").val(res.current_page + 1);
				$(".sdlms-container").find(".question-page-count").text(res.last_page + 1);
				$(".sdlms-container").find(".qn-navigator.next").data("url", res.next_page_url);
				$(".sdlms-container").find(".qn-navigator.prev").data("url", res.prev_page_url);
				parentDashboard.ranswerLoaded = true;
			});
	};
	//Feedbacks view function	
	parentDashboard.paginateFeedback = (
		url,
		data = {}
	) => {
		console.log(data)
		$(".sdlms-container")
			.find(`.${data.parent}`)
			.empty()
			.removeClass("d-flex justify-content-center align-items-center");
		api.get(url, {}).then((res) => {
			console.log(res.data);

			// console.log(res.data[0].topic);
			// $(".clearfix").find('.session-topic').text(`${res.data.topic}`);
			// $(".clearfix").find('.session-date').text(`${res.data.modified.$moment(value.DateTime).format("ddd,DD MMM, YYYY")}`);
			if (!res.data || res.data.length == 0) {
				return $(".sdlms-container").find(`.${data.parent}`).html("No Feedbacks").addClass("d-flex justify-content-center align-items-center");
			}
			let feedbackResponse = res.data.map((value) => {
				let Feedbackdata = {};
				Feedbackdata.profile_picture_url = value.profile_picture_url;
				Feedbackdata.feedback_for = value.feedback_for;
				Feedbackdata.content = value.content;
				Feedbackdata.modified = value.modified;
				Feedbackdata.fullname = value.fullname;
				return Feedbackdata;
			});
			$(".sdlms-container")
				.find(".feedbacks-page")
				.val(res.current_page + 1);
			$(".sdlms-container")
				.find(".feedback-page-count")
				.text(res.last_page + 1);
			$(".sdlms-container")
				.find(".fb-navigator.next")
				.data("url", res.next_page_url);
			$(".sdlms-container")
				.find(".fb-navigator.prev")
				.data("url", res.prev_page_url);
			parentDashboard.rfeedbacksLoaded = true;
		});
	};
	//Participants attended the selected session
    parentDashboard.initMembers = () => {
        api.get(`/sdlms/${tpid}/attendance`, {
            limit: 50
        })
            .then((r) => {
                // $("body").find(".sdlms-asset-selection-user-body").append(parentDashboard._template('studentSearch',student));
				
                $.each(r.data, function (index, student) {
					
					$("body").find(".sdlms-asset-selection-user-body").append(app._template('studentSearch', student));
                });
                $("body").find(".sdlms-asset-selection-user-body").off('click').on('click', '[data-students-search]', function (e) {
                    var member = $(this).data();
                    let labels = {
						sp:'Spread Sheet',
						eb:'Eagle Builder',
						tb:'Thread Builder'
					}
                    if (member.uid) {
                        $('#studentAssetView').empty();
                        $('[sdlms-toggle-members-list]').toggle();
                        $('#studentAssetView').removeClass('h-100 w-100 text-center d-flex justify-content-center align-items-center');;
                        $('[sdlms-members-asset-view],[sdlms-search]').toggleClass('w-100 sdlms-w-0');
                        $('[asset-selection-label].assets').text(`${member.fullname || member.displayname || member.username}'s Eagle Builder`);
                        $('[asset-selection-label].assets').addClass('active');
                        $('[asset-selection-label].assets').data('uid', member.uid);
						if ((!ajaxify.data.tracker && member.role == "teacher") || member.role != "teacher") {
                            $('[asset-selection-label].active.assets').off('click').on('click', function () {
                                $('.assetSelectionDropDown.assets').slideToggle();
                                $(this).toggleClass('visibility-shown');
                                let $this = $(this);
                                $('.assetSelectionDropDown.assets').find('[get-asset]').off('click').on('click', function () {
                                    $('#studentAssetView').empty().removeClass('h-100 w-100 text-center d-flex justify-content-center align-items-center');
									$('[asset-selection-label].assets').text(`${member.fullname || member.displayname || member.username}'s ${labels[$(this).data('type')]}`);
									$('.assetSelectionDropDown.assets').slideToggle();
									$('.assetSelectionDropDown.assets').find('[get-asset]').removeClass('active');
									$('.assetSelectionDropDown.assets').find('[get-asset]').attr('uid', 0);
									$(this).attr('uid', member.uid);
                                    $(this).addClass('active');
                                    parentDashboard.getAsset(member.uid, $(this).data('type'));
								});
							});
							api.get(`/sdlms/${tpid}/eaglebuilder?uid=${member.uid}`, {}).then((r) => {
								const data = {
									meta: r.meta,
									tracks: r.tracks,
									conclusion: r.conclusion || {},
								};
								if (!r.tracks || !r.tracks.length) {
									$('#studentAssetView').html('No Eagle Builder found').addClass('h-100 w-100 text-center d-flex justify-content-center align-items-center');
									return;
								}
				
								$('[members-assets]').data('id', r.id)
								new eagleBuilder({
									target: '#studentAssetView',
									action: "reader",
									tid: tpid,
									with: data,
									uid: member.uid,
									id: r.pid || r.id,
									topic: topica
								});
							});
					
						 }
					}
				});
				parentDashboard.memberLoaded = true;
			})
			.catch((e) => {
				//
			});
	};
	parentDashboard._template = (part, data = {}) => {
		const components = {
			
			studentSearch: () => ` <div class="sdlms-assets-selection-user-list" data-students-search data-fullname="${data.fullname}" data-displayname="${data.displayname}" data-username="${data.username}" data-uid="${data.uid}" data-is-teacher="${data.isTeacher}" data-role="${data.role}" >
				<div class="col-11 mx-auto">
					<div class="d-flex align-items-center py-2 justify-content-start">
						<img onerror="${app.IMG_ERROR()}" src="${data.picture}" class="rounded-circle" alt="" /><span class="sdlms-text-tertiary-16px text-ellipse font-weight-medium ml-3">${data.fullname || data.displayname || data.username} ${data.uid == uid ? (`(${(data.isTeacher ? 'Teacher, ' : '')}Me)`) : ''}</span>
					</div>
				</div>
			</div>`,
		};
		return components[part]();
	};
	//Getting the assets for selected participant
	parentDashboard.getAsset = async (uid, type) => {
		if (type == 'tb') {
			api.get(`/sdlms/${tpid}/threadbuilder?uid=${uid}`, {}).then((r) => {
				
				let data = {
					threads: r.threads,
					
				};

				if (!r.threads || !r.threads.length) {
					$('#studentAssetView').html('No Thread Builder found').addClass('h-100 w-100 text-center d-flex justify-content-center align-items-center');
					return;
				}
				$('[members-assets]').data('id', r.id)
				new threadBuilder({
					target: '#studentAssetView',
					action: "reader",
					tid: tpid,
					with: data,
					uid: uid,
					id: r.pid || r.id,
					topic: topica
				});
				
			});
		} else if (type == 'eb') {
			api.get(`/sdlms/${tpid}/eaglebuilder?uid=${uid}`, {}).then((r) => {
				const data = {
					meta: r.meta,
					tracks: r.tracks,
					conclusion: r.conclusion || {},
				};
				if (!r.tracks || !r.tracks.length) {
					$('#studentAssetView').html('No Eagle Builder found').addClass('h-100 w-100 text-center d-flex justify-content-center align-items-center');
					return;
				}

				$('[members-assets]').data('id', r.id)
				new eagleBuilder({
					target: '#studentAssetView',
					action: "reader",
					tid: tpid,
					with: data,
					uid: uid,
					id: r.pid || r.id,
					topic: topica
				});
			});
		} else if (type == 'sp') {
			let teacherSP = {
				data: {
					data: [],
					readonly: '[]',
					widths: '[]',
				},
			};
			const userSP = await api.get(`/sdlms/spreadsheet?tid=${tpid}&uid=${uid}`, {});
			const pid = userSP.pid;
			userSP.data = userSP.data || {};
			let readonly = (userSP.data || {}).readonly;
			if (!ajaxify.data.isTeacher && ajaxify.data.isStudent) {
				teacherSP = await api.get(`/sdlms/spreadsheet?tid=${tpid}&uid=${session.teacher.uid}`, {});
				teacherSP.data = teacherSP.data || {};
				readonly = teacherSP.data.readonly;
			}
			const SPdata = {
				data: $.extend([], teacherSP.data.data, userSP.data.data),
				readonly: readonly,
				widths: userSP.data.widths,
				styles: teacherSP.data.styles,
			};
			new spreadSheet({
				target: '#studentAssetView',
				action: 'reader',
				tid: tpid,
				with: SPdata,
				addFeedbacks: true,
				uid: uid,
				id: pid,
				topic: topica,
			});
		}
	};
	//Reaction data integration to get the data of current year in months
	parentDashboard.getReactionsDataByMonths = (uid) =>{

		var month = new Date().getMonth();//current month.
		var year = new Date().getFullYear();// current year
		var start = new Date(year,month-12+1,1).getTime();//Timestamp of start date of 12th month before with respect to today
		var end = new Date().getTime()// Timestamp of today's date. 

		return new Promise((resolve,reject) =>{
			doAjax({
				type: 'GET',
				url: '/sdlms/reaction/' + uid + '?start='+ start +'&end='+ end,
			}).then(res => {
				resolve(res.response.data)
			}).catch(err => { 
				reject(err);          
			});
		});
	}
	//Emoticons description section filitration
	function emoticonsDescription(reactions, primary_month, secondary_month){
		let filtered_emoticons_location = [],filtered_emoticons_name = [];
		let merged_emoticons_name = new Array();
		let merged_emoticons_link = new Array();
	
		$('#emoticonsDescription').empty()
	  
		for(let x in reactions[secondary_month])
		{
			merged_emoticons_name.push(x);
			merged_emoticons_link.push(reactions.icons[x])
		}
		for(let x in reactions[primary_month])
		{
			merged_emoticons_name.push(x);
			merged_emoticons_link.push(reactions.icons[x])
		}
		// test_emoticons_data[secondary_month].forEach(element => {
		//   merged_emoticons_name.push(element.emoticon_name)
		//   merged_emoticons_link.push(element.link_of_emoticons)
		// });
		// test_emoticons_data[primary_month].forEach(element => {
		//   merged_emoticons_name.push(element.emoticon_name)
		//   merged_emoticons_link.push(element.link_of_emoticons)
		// });
		filtered_emoticons_location = [ ...new Set(merged_emoticons_link)];
		filtered_emoticons_name = [ ...new Set(merged_emoticons_name)];
	  
		for (let i = 0; i < filtered_emoticons_location.length; i++) {
		  $(document).ready(function(){
			
			let container_id = `emoticon_description_container_${i}`;
			let emoticon_container = $(`<div> </div>`).attr({
			  'class':'emoticon-description-container col-3 justify-content-center',
			  'id': container_id,
			}).appendTo('#emoticonsDescription');
	  
			let img = $('<img />').attr({
			  'src': filtered_emoticons_location[i],
			  'alt': 'JSFiddle logo',
			  'title': 'JSFiddle logo',
			  'align':'center',
			}).appendTo("#"+container_id);
	  
			let emoticon_name = $("<h6></h6>").text(
			  filtered_emoticons_name[i]
			  ).appendTo("#"+container_id);
		  })
		}
	}
	return parentDashboard;
});
