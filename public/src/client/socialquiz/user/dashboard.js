'use strict';

/* globals define */

define('forum/socialquiz/user/dashboard',['api','sdlms/table'], function (api) {
	var dashboard = {};
	dashboard.init = () => {

		api.get(`/socialquiz/active`,{})
		.then((res)=>{console.log(res)})
		.catch((err)=>{console.log(err)})

		let quiztable = new Table({
			target: "#quiztable",
			columns:[
				{title: 'S.No',value:'table'},
				{title: 'Quiz Title',value:'Action'},
				{title: 'Status',value:'Action'},
				{title: 'Quiz Session started by',value:'Action'},
			],
			formatter: formatProjectDetailsTableResponse
		})
		function formatProjectDetailsTableResponse(data, from=0){
			return data.map(function(row,index){
				console.log(row)
				return {
					attributes:{
						sessionid: row._id
					},
					data: {
						Sno:`${(from + (index + 1 ))}`,
						QuizTitle : row.quizData.quizDetail.title ? row.quizData.quizDetail.title : `<b>Yet to update</b>`,
						Status : row.isStarted ? `Quiz is started` : `Quiz is not started yet`,
						StartedBy : row.uid 
						//Status : row.status.charAt(0).toUpperCase() + row.status.slice(1),
						//creationdate : `${moment(row.createdAt).format("DD MM, YYYY")} at ${moment(row.createdAt).format("hh:mm A")}`,
					}
				}
			})
		}
		quiztable.render(`/socialquiz/active`)
		dashboard.solvequiz()
	};
	dashboard.solvequiz = () =>{
		$("body").on("click","tbody tr",function(e){
			let sessionid = $(this).data("sessionid")
			if(sessionid){	ajaxify.go(`/socialquiz/user/solve/${sessionid}`)}
			else{notify("Pid not valid or avaiable","error")}
			console.log(app.user.uid," participated")
			api.put('/socialquiz/addParticipant/'+sessionid,{})
			.then(res=>console.log(res))
			.catch(err => console.log(err))
		
		})
	}
	return dashboard;
});
