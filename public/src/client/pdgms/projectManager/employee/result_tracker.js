"use strict";

/* globals define */

define("forum/pdgms/projectManager/employee/result_tracker", ['api'], function (api) {

	var resultTracker = {};

	resultTracker.init = () => {
        console.log("Result Tracker inited")
		resultTracker.drawGraph1();
		resultTracker.drawGraph2();
		resultTracker.drawGraph3();
		resultTracker.drawGraph4();
		resultTracker.drawGraph5();
		
	};
	resultTracker.drawGraph1 = () =>{
		const DATA_COUNT = 5;
		const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

		const data = {
		labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
		datasets: [
			{
			label: 'Dataset 1',
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
									'red',
									'orange',
									'yellow',
									'green',
									'blue',
									'black'
								]
			}
		]
		};
		const config = {
			type: 'doughnut',
			data: data,
			options: {
			  responsive: true,
			  plugins: {
				legend: {
				  position: 'top',
				},
				title: {
				  display: true,
				  text: 'Task start Rating'
				}
			  }
			},
		  };
		  const myChart =  new Chart( $('#myChart1') , config);
	};
	resultTracker.drawGraph2 = () =>{
		const DATA_COUNT = 5;
		const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

		const data = {
		labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
		datasets: [
			{
			label: 'Dataset 1',
			data: [ 3, 5, 2, 3, 12, 19,],
			backgroundColor: [
									'red',
									'orange',
									'yellow',
									'green',
									'blue',
									'black'
								]
			}
		]
		};
		const config = {
			type: 'doughnut',
			data: data,
			options: {
			  responsive: true,
			  plugins: {
				legend: {
				  position: 'top',
				},
				title: {
				  display: true,
				  text: 'Team Lead Rating'
				}
			  }
			},
		  };
		  const myChart =  new Chart( $('#myChart2') , config);
	};
	resultTracker.drawGraph3 = () =>{
		const DATA_COUNT = 5;
		const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

		const data = {
		labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
		datasets: [
			{
			label: 'Dataset 1',
			data: [ 2, 3, 12, 19, 3, 5,],
			backgroundColor: [
									'red',
									'orange',
									'yellow',
									'green',
									'blue',
									'black'
								]
			}
		]
		};
		const config = {
			type: 'doughnut',
			data: data,
			options: {
			  responsive: true,
			  plugins: {
				legend: {
				  position: 'top',
				},
				title: {
				  display: true,
				  text: 'Rating after LA'
				}
			  }
			},
		  };
		  const myChart =  new Chart( $('#myChart3') , config);
	};
	resultTracker.drawGraph4 = () =>{
		const DATA_COUNT = 5;
		const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

		const data = {
		labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
		datasets: [
			{
			label: 'Dataset 1',
			data: [3, 12, 19, 3, 5, 2,],
			backgroundColor: [
									'red',
									'orange',
									'yellow',
									'green',
									'blue',
									'black'
								]
			}
		]
		};
		const config = {
			type: 'bar',
			data: data,
			options: {
			  responsive: true,
			  plugins: {
				legend: {
				  position: 'top',
				},
				title: {
				  display: true,
				  text: 'Overall Emotion Graph'
				}
			  }
			},
		  };
		  const myChart =  new Chart( $('#myChart4') , config);
	};
	resultTracker.drawGraph5 = () =>{
		const DATA_COUNT = 5;
		const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

		const data = {
		labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
		datasets: [
			{
			label: 'Dataset 1',
			data: [3, 12, 19, 3, 5, 2,],
			backgroundColor: [
									'red',
									'orange',
									'yellow',
									'green',
									'blue',
									'black'
								]
			}
		]
		};
		const config = {
			type: 'doughnut',
			data: data,
			options: {
			  responsive: true,
			  plugins: {
				legend: {
				  position: 'bottom',
				},
				title: {
				  display: true,
				  text: 'Overall Emotion Graph'
				}
			  }
			},
		  };
		  const myChart =  new Chart( $('#myChart5') , config);
	};
	

	return resultTracker;

});