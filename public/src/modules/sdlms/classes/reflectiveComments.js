'use strict';

/**
 * @author Fardin Kamal
 * @date 21-05-2022
 * @class ReflectiveComments
 * @description Allows the user to initiate Reflective Comment section on SD-LMS
 *
 */

/**
 * @var {class} ReflectiveComments
 * @description Contains the @methods or @function - to run Reflective Comments
 * @function ReflectiveComments.get
 * @function ReflectiveComments.insertComment
 * @function ReflectiveComments.insertReflection
 * @function ReflectiveComments.insertReflectiveAnswer
 */

class ReflectiveComments {
	constructor() {
		$('#comments')
			.append(`
		<div class="container p-4"> <!-- Whole thing -->
        <div class="p-3 border border-1 rounded-4" id='messages'> <!-- all messages inside -->
            
        </div>
        <textarea class="form-control" name="" id="comment" cols="30" rows="1" placeholder="Your Query"></textarea>
        <button class='btn btn-sm btn-primary' id='insert_comment'>Ask Question</button>
    </div>
		`);
	}

	insertComment(data) {
		require(['api'], function (api) {
			const route = '/globals/insertReflectiveComment';
			const result = api.post(route, data);
			result.then((r) => {
				load();
			});
		});
	}

	insertReflection(data) {
		require(['api'], function (api) {
			const route = '/globals/insertReflection';
			const result = api.post(route, data);
			result.then((r) => {
				load();
			});
		});
	}

	insertReflectiveAnswer(data) {
		require(['api'], function (api) {
			const route = '/globals/insertReflectiveAnswer';
			const result = api.post(route, data);
			result.then((r) => {
				load();
			});
		});
	}

	get(data = {}) {
		require(['api'], function (api) {
			const route = '/globals/getReflectiveComments';
			const result = api.post(route, data);
			result.then((r) => {
				r.map(e => $('#messages')
					.append(`
					<div class="border border-1 p-3" id='reflections_${e._id}'> <!-- individual message -->
                	<div>
                    	<img class="rounded float-start" src="${e.picture}" alt="profile_pic" height="auto" width="4%">
                    	<p>${e.fullname || e.username}<span class="text-black-50"> ${new Date(e.timestamp)}</span></p>
                    	<div style="padding-left: 4%"><p>${e.question}</p></div>
                	</div>
                	<div style="padding-left: 4%">
                    	${Object.keys(e.answer).length === 0 ? `
							${parseInt(data.uid) === parseInt(data.req_uid) ?
		`<textarea class='form-control' id='question' cols='30' rows='1' placeholder='Your Answer'></textarea><button class='btn btn-sm btn-primary reply' id='${e._id}'>Reply</button>` : "<br><p class='text-danger'>User haven't reflected yet.</p>"}
							` :
		`<img class="rounded float-start" src="${e.answer.picture}" alt="profile_pic" height="auto" width="4%">
                    	<p>${e.answer.fullname || e.answer.username}<span class="text-black-50"> ${new Date(e.timestamp)}</span></p><p style='padding-left:4%'>${e.answer.answer}</p>
                    	${Object.keys(e.reflections).length !== 0 ?
		`<button class='btn btn-primary btn-sm reflections_toggle' id='${e._id}'>View
							${e.reflections.length} reflections</button><br>` : `<br>`}
					<textarea class="form-control reflection_textarea" id="${e._id}" cols="30" rows="1" placeholder="Your Reflection"></textarea>
        <button class='btn btn-sm btn-primary insert_reflection' id="${e._id}">Insert Reflection</button>
					<br>`
}
					<div  style='padding-left: 4%;'>
					${e.reflections.map(reflection => `<div id='reflection_${e._id}' class='d-none'>
                            <img class="rounded float-start" src="${reflection.picture}" alt="profile_pic" height="auto" width="4%">
                            <p>${reflection.fullname || reflection.username}<span class="text-black-50"> 15-01-2023</span></p>
                            <div style="padding-left: 4%"><p>${reflection.reflection}</p></div>
                        </div>
                        `)
		.join('')}
                	</div>
                	</div>
            		</div>
            		<br>
					`));
				//
				$('.reply')
					.on('click', (e) => {
						console.log(e.target);
						const payload = {
							_id: e.target.id,
							answer: e.target.parentElement.children[0].value,
						};
						ReflectiveComments.prototype.insertReflectiveAnswer(payload);
					});
				$('.reflections_toggle')
					.on('click', (e) => {
						const id = e.target.id;
						$(`#reflection_${id}`)
							.toggleClass('d-none');
					});

				$('.insert_reflection')
					.on('click', (e) => {
						const payload = {
							_id: e.target.id,

						};
						$('textarea')
							.closest(e.target)
							.prevObject
							.map((t) => {
								const text = $('textarea')
									.closest(e.target).prevObject[t].value;
								if (text !== '') {
									payload.reflection = $('textarea')
										.closest(e.target).prevObject[t].value;
								}
							});
						ReflectiveComments.prototype.insertReflection(payload);
					});
				$('#insert_comment')
					.on('click', () => {
						const payload = {
							tid: parseInt(ajaxify.data.tid),
							task_tid: parseInt(ajaxify.data.task_tid) || null,
							question: $('#comment')[0].value,
						};
						ReflectiveComments.prototype.insertComment(payload);
					});
				//
			})
				.catch((e) => {
					console.log(`Error: ${e}`);
				});
		});
	}
}

const data = {};
data.tid = parseInt(ajaxify.data.tid);

const load = () => {
	ReflectiveComments.prototype.get(data);
	$('#messages')
		.empty();
	$('textarea')
		.val('');
};

// TODO fix reflection toggle
