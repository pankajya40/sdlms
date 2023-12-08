"use strict";

/* globals define */

define("forum/pdgms/escalation/journals/index", ["sdlms/table"], function () {
	var journals = {};
	journals.init = () => {
		console.log("journals");

		let journals = ajaxify.data.journals || {};
		let priorities = {
			1 :{
				classes :"badge badge-pill badge-danger",
				title :"High"
			},
			2 :{
				classes :"badge badge-pill badge-warning",
				title :"Medium"
			},
			3 :{
				classes :"badge badge-pill badge-success",
				title :"Low"
			}
		}

		let table = new Table({
			target: '.journals',
			columns: [
				{ title: '<div  class="text-left w-100">Title</div>', value: 'end' },
				{ title: `<div  class="text-left w-100">Description</div>`, value: 'end' },
				{ title: 'Created', value: 'Action' },
				{ title: 'Action', value: 'Action' },
			],
			formatter: formatJournal,
		});
		function formatJournal(data, from = 0) {
			return data.map(function (row, index) {
				let priority = priorities[Math.floor(Math.random() * 3) + 1];
				return {
					attributes:{
						"journal":row.uid,
					},
					data: {
						title:`<div class="text-left nowrap w-100"><span class="badge ${priority.classes}">${priority.title}</span>&nbsp;<b>${row.title}</b></div>`,
						content: `<div class="text-center text-ellipse w-100">${row.content}</div>`,
						date: `<div class="nowrap">${moment(row.createdAt).format("DD MMM, YYYY")} at ${moment(row.createdAt).format("hh:mm A")}</div>`,
						info: `<div class="text-center w-100"><a href="/pdgms/escalation/journals/${row.uid}">View</a></div>`,
					}
				}
			})
		}
		table.render('https://api.jsonbin.io/v3/b/6331c2f0e13e6063dcb67074');
		$('.journals').on('click', '[data-journal]', function () {
			let journal = $(this).data('journal');
			ajaxify.go(`/pdgms/escalation/journals/${journal}`);
		});

	};

	return journals;

});