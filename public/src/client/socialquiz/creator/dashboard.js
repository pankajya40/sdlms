'use strict';



/* globals define */

define('forum/socialquiz/creator/dashboard',['api','sdlms/table'], function (api) {
	var dashboard = {};
	dashboard.init = () => {
		$('.create-quiz').on('click', function () {
			api.post('/socialquiz/quiz',{})
			.then(function(res){
				console.log(res.pid)
				ajaxify.go(`socialquiz/creator/create/${res.pid}`)
			})
			.catch(err => notify(err.message,"error"))
		});

		$('#start-the-quiz').on('click', function () {
		    ajaxify.go(`/socialquiz/creator/select`);
		});

		let userId = ajaxify.data.uid;
 
		api.get(`/socialquiz/quiz/${userId}`,{})
		.then((res)=>{console.log(res)})
		.catch((err)=>{console.log(err)})


		// api.get(`/socialquiz/publish`,{})
		// .then((res)=>{console.log(res)})
		// .catch((err)=>{console.log(err)})

		let quiztable = new Table({
			target: "#quiztable",
			columns:[
				{title: 'S.No',value:'table'},
				{title: 'Quiz Title',value:'Action'},
				{title: 'Status',value:'Action'},
				{title:'Created on',value:'end'},
			],
			formatter: formatProjectDetailsTableResponse
		})
		function formatProjectDetailsTableResponse(data, from=0){
			return data.map(function(row,index){
				return {
					attributes:{
						pid: row.pid
					},
					data: {
						Sno:`${(from + (index + 1 ))}`,
						QuizTitle : row.quizDetail.title ? row.quizDetail.title : `<b>Yet to update</b>`,
						Status : row.status.charAt(0).toUpperCase() + row.status.slice(1),
						creationdate : `${moment(row.createdAt).format("DD MM, YYYY")} at ${moment(row.createdAt).format("hh:mm A")}`,
					}
				}
			})
		}
        
		quiztable.render(`/socialquiz/quiz/${userId}`)
		// quiztable.render(`/socialquiz/publish`)
		dashboard.editDraft()
	};

	

	dashboard.editDraft = () =>{
		$("body").on("click","tbody tr",function(e){
			let currentPid = $(this).data("pid")
			if(currentPid){	ajaxify.go(`/socialquiz/creator/create/${currentPid}`)}
			else{notify("Pid not valid or avaiable","error")}
		
		})
	}
	return dashboard;
});
