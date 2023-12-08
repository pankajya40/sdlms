"use strict";

/* globals define */

define("forum/pdgms/projectManager/employee/effort_tracker", ['api',"sdlms/table"], function (api) {

	var effortTracker = {};

	effortTracker.init = () => {
        console.log("Effort Tracker inited")
		console.log("Effort Tracker inited Test 2")
		// effortTracker.drawGraph();
	};
	// effortTracker.drawGraph = () =>{
	// 	const DATA_COUNT = 5;
	// 	const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

	// 	const data = {
	// 	labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
	// 	datasets: [
	// 		{
	// 		label: 'Dataset 1',
	// 		data: [3, 12, 19, 3, 5, 2,],
	// 		backgroundColor: [
	// 								'red',
	// 								'orange',
	// 								'yellow',
	// 								'green',
	// 								'blue',
	// 								'black'
	// 							]
	// 		}
	// 	]
	// 	};
	// 	const config = {
	// 		type: 'bar',
	// 		data: data,
	// 		options: {
	// 		  responsive: true,
	// 		  plugins: {
	// 			legend: {
	// 			  position: 'top',
	// 			},
	// 			title: {
	// 			  display: false,
	// 			  text: 'Overall Emotion Graph'
	// 			}
	// 		  }
	// 		},
	// 	  };
	// 	  const myChart =  new Chart( $('#myChart') , config);
	// };

	return effortTracker;

});