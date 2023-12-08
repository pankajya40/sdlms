"use strict";

/* globals define */

define("forum/pdgms/projectManager/employee/value_tracker", ['api'], function (api) {

	var valueTracker = {};

	valueTracker.init = () => {
        console.log("Value Tracker inited")
		valueTracker.Graphdraw();
		
		$("body").on("click","#value-leader-view-btn",function(){
			console.log("Leader")
			ajaxify.go("/pdgms/projectmanager/trackers/value/teamview")

		})
	};
	valueTracker.Graphdraw = () =>{
		const DATA_COUNT = 5;
		const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

		const data = {
		labels: ['January', 'February', 'March', 'April',],
		datasets: [
			{
			label: 'Dataset 1',
			data: [ 3, 5, 2, 3],
			backgroundColor: [
									'red',
									'orange',
									'blue',
									'black'
								]
			},{
				label: 'Dataset 1',
				data: [12, 6, 10, 8],
				backgroundColor: [
										'red',
										'orange',
										'yellow',
										'green',
										
									]
				},{
					label: 'Dataset 1',
					data: [12, 14, 8, 6],
					backgroundColor: [
											
											'yellow',
											'green',
											'blue',
											'black'
										]
					}
		]
		};
		// var Utils = {};
		
		// const DATA_COUNT = 7;
		// const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

		// const labels = Utils.months({count: DATA_COUNT});
		// const data = {
		// labels: labels,
		// datasets: [
		// 	{
		// 	label: 'Unfilled',
		// 	fill: false,
		// 	backgroundColor: Utils.CHART_COLORS.blue,
		// 	borderColor: Utils.CHART_COLORS.blue,
		// 	data: Utils.numbers(NUMBER_CFG),
		// 	}, {
		// 	label: 'Dashed',
		// 	fill: false,
		// 	backgroundColor: Utils.CHART_COLORS.green,
		// 	borderColor: Utils.CHART_COLORS.green,
		// 	borderDash: [5, 5],
		// 	data: Utils.numbers(NUMBER_CFG),
		// 	}, {
		// 	label: 'Filled',
		// 	backgroundColor: Utils.CHART_COLORS.red,
		// 	borderColor: Utils.CHART_COLORS.red,
		// 	data: Utils.numbers(NUMBER_CFG),
		// 	fill: true,
		// 	}
		// ]
		// };
		const config = {
			type: 'line',
			data: data,
			options: {
			  responsive: true,
			  plugins: {
				title: {
				  display: false,
				  text: 'Current Growth'
				},
			  },
			  interaction: {
				mode: 'index',
				intersect: false
			  },
			  scales: {
				x: {
				  display: true,
				  title: {
					display: true,
					text: 'Month'
				  }
				},
				y: {
				  display: true,
				  title: {
					display: true,
					text: 'Value'
				  }
				}
			  }
			},
		  };
		  const myChart =  new Chart( $('#myChart') , config);
	}

	return valueTracker;

});