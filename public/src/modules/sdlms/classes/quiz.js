(() => {

	/**
	 * @class Quiz
	 * @description Class to handle quizzes
	 */
	const Quiz = class {

		/**
		 * @constructor
		 * @param {string} attachmentId - The ID of the quiz attachment
		 * @param {object} options - Options for the quiz
		 */
		constructor(attachmentId, options = {}) {
			this.attachmentId = attachmentId;
			this.options = options;
			this.id = `quiz-${this.attachmentId}`;
			this.quiz = null;
			this.mode = options.mode;
			this.UIDsForAllocation = [];
			this.init();
		}

		/**
		 * @method init
		 * @description Initializes the quiz modal
		 */
		async init() {
			// Append the HTML for the quiz modal if it doesn't exist
			const content = $('#content');
			!$(`#${this.id}`).length && content.append(this.getHtml());

			// Get the quiz modal element
			this.$modal = $(`#${this.id}`);

			console.log(`Quiz: ${this.attachmentId}`);
			// Set the HTML for the quiz modal body
			this.$modal.find('.modal-body').html(await this.setBodyHtml());

			console.log(`Quiz: ${this.attachmentId} - ${this.mode}`);
			// Set up event handlers for the quiz modal
			this.events();

		}


		state(state) {
			this.$modal.modal(state);
		}

		/**
		 * @method refresh
		 * @async
		 * @description Refreshes the quiz modal body by setting its HTML to the result of calling the setBodyHtml method
		 * @returns {void}
		 */
		async refresh(force) {
			force && (this.quiz = null);
			this.$modal.find('.modal-body').html(await this.setBodyHtml());
			this.mode == 'answer' && this.setUpAnswerMode();
			this.state('show');
		}

		/**
		 * @method getHtml
		 * @description Returns the HTML for the quiz modal
		 * @returns {string} HTML string
		 */
		getHtml() {
			return `<div class="modal quiz-modal fade" id="${this.id}" tabindex="-1" aria-labelledby="${this.id}Label" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div class="modal-content">
				  <div class="modal-header">
					<h5 class="modal-title" id="${this.id}Label">Quiz</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
				  </div>
				  <div class="modal-body p-0"><div class="p-3">Loading...</div></div>
				  <div class="modal-footer">
					<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
				  </div>
				</div>
			  </div>
			</div>`;
		}

		/**
		 * @method setBodyHtml
		 * @description Sets the HTML for the quiz modal body
		 */
		async setBodyHtml() {

			// Get the quiz for the attachment ID
			const quiz = this.quiz || await this.getQuiz({
				attachmentId: this.attachmentId,
				limit: 1
			});

			// Set the flag for whether the quiz exists or not
			this.quiz = quiz ? (Array.isArray(quiz) ? quiz[0] : quiz) : null;

			// If no quiz exists, show the search form 
			if (!this.quiz) return this.getSearchHtml()

			// If a quiz exists, show the quiz and responses tabs
			else {
				if (this.mode == 'answer') {
					let running = this.quiz.questions.find(question => question.status == 'running');
					this.questionId = running ? running.id : null;
				}
				return await this.getTabsHTML()
			};


		}


		/**
		 * @method getSearchHtml
		 * @description Returns the HTML for the quiz search form
		 * @returns {string} HTML string
		 */
		getSearchHtml() {
			return `<div class="form-group quizSearchInput mb-0 p-3">
			  <label>Search Quiz</label>
			  <input type="search" class="form-control searchQuiz" placeholder="Search Quiz">
			</div>
			<div class="quizSearchResults px-3"></div>
			`;
		}

		/**
		 * @method getTabsHtml
		 * @description Returns the HTML for the quiz and responses tabs
		 * @returns {string} HTML string
		 */
		async getTabsHTML() {
			//use default values
			let tabs = [{
				id: `main-${this.attachmentId}`,
				title: 'Quiz',
				html: this.mode == 'answer' ? await this.getQuizAnswerModeHTML() : this.getQuizHTML()
			},
			{
				id: `responses-${this.attachmentId}`,
				title: 'Responses',
				html: await this.getResponsesHTML()
			},
			];


			// Initialize empty strings for tab links and tab contents
			let tabLinks = '';
			let tabContents = '';

			// Iterate over each tab and generate the corresponding HTML
			tabs.forEach((tab, index) => {
				// Determine if the current tab should be active
				let active = index === 0 ? 'active show' : '';

				// Generate the HTML for the tab link
				tabLinks += `<li class="nav-item ${active}" role="presentation">
				<a class="nav-link " id="${tab.id}-tab" data-toggle="tab" data-target="#${tab.id}-${this.attachmentId}" type="button" role="tab" aria-controls="${tab.title}" aria-selected="${active ? 'true' : 'false'}">${tab.title}</a>
			  </li>`;

				// Generate the HTML for the tab content
				tabContents += `<div class="tab-pane h-100 fade ${active}" id="${tab.id}-${this.attachmentId}" role="tabpanel" aria-labelledby="${tab.id}-tab">${tab.html}</div>`;
			});

			// Combine the tab links and tab contents into a single HTML string
			return `
			  <ul class="nav nav-tabs m-0" id="tab-${this.attachmentId}" role="tablist">
				${tabLinks}
			  </ul>
			  <div class="h--42 mb-0 overflow-hidden tab-content" id="myTabContent-${this.attachmentId}">
				${tabContents}
			  </div>
			`;
		}


		/**
		 * @method getQuiz
		 * @description Returns the quiz for the given attachment ID
		 * @returns {object|null} Quiz object or null if not found
		 */
		async getQuiz(data = {}) {
			try {
				let quiz = await doAjax({ // Make a GET request using jQuery's $.ajax() method
					type: 'GET',
					url: '/socialquiz/quiz',
					data: data
				})
				return quiz.response.data.length ? quiz.response.data : null; // Return the quiz data if it exists, otherwise return null
			} catch (error) {
				console.error(error); // Log any errors to the console
				return null;
			}
		}

		/**
		 * @method events
		 * @description Sets up event listeners for the quiz modal
		 */
		events() {

			const self = this;
			// If no quiz data exists, set up a search
			!this.quiz && this.setUpSearch();

			// Mode is answer
			this.mode == 'answer' && this.setUpAnswerMode();

			console.log('mode', this.mode);
			this.$modal.off('click', '[start-quiz]').on('click', '[start-quiz]', async function () {
				let questionId = $(this).attr('data-question-id');

				self.updateQuestions({
					disabled: true
				})

				try {

					// update the modal
					self.setQuestionsActions();

					// Disable the start quiz button
					self.$modal.find('[question] [start-quiz]').attr('disabled', true);

					let keys = {
						status: "running",
						startedAt: new Date()
					};

					// Set the question status to running
					let updated = await self.updateQuestion(questionId, keys);
					if (!updated) throw new Error('Could not update question status to running');

					// Start the quiz timer
					self.startQuizTimer(questionId);

					self.broadcast('start', {
						questionId: questionId,
						attachmentId: self.attachmentId
					});

				} catch (error) {

					// Set the running flag to null
					self.RUNNING = null;
					console.error(error);

				}

			});

			this.$modal.off('click', '.show-answer-list')
				.on('click', '.show-answer-list', function () {
					self.$modal.find('.answerContent').hide();
					$(this).next('.answerContent').show();
				});

			this.$modal.off('click', `#responses-${this.attachmentId}-tab`)
				.on('click', `#responses-${this.attachmentId}-tab`, async function () {
					let $tabContent = $(`#responses-${self.attachmentId}-${self.attachmentId}`);
					$tabContent.html(await self.getResponsesHTML());
				});

				

				this.$modal.off('mouseover', '[quiz-rating] li')
				.on('mouseover', '[quiz-rating] li', function() {
					$(this).addClass('hover').prevAll().addClass('hover');
				});
			  
			  this.$modal.off('mouseout', '[quiz-rating] li')
				.on('mouseout', '[quiz-rating] li', function() {
				  $(this).removeClass('hover').prevAll().removeClass('hover');
				});
			  
			  this.$modal.off('click', '[quiz-rating] li')
				.on('click', '[quiz-rating] li', async function(e) {

					let $parent = $(this).parents('[quiz-rating]');
					if($parent.attr('marked')) return;

					$(this).siblings().removeClass('selected');
					$(this).addClass('selected').prevAll().addClass('selected');
					let questionId = $parent.first().attr('quiz-rating');
					let rating = $(this).attr('data-value');

					let payload = {
						mark:{
							value: rating,
							by:app.user.fullname || app.user.displayname || app.user.username
						},
						questionId: questionId,
						answerId: $(this).parents('[answer-id]').first().attr('answer-id')
					}

					let res = await self.submitMarks(questionId,payload);

					if(res) $parent.attr('marked',true);

				});
			  

		}
		setUpAnswerMode() {
			let self = this;
			let questionId = this.$modal.find('.running [answer-duration]').attr('answer-duration');
			questionId && this.startAnswerTimer(questionId);


			this.$modal.find(`#answer-${questionId} textarea`).off('input').on('input', debounce(function () {
				localStorage.setItem(`quiz:${self.quiz._id}:answer:${questionId}`, JSON.stringify({
					content: $(this).val()
				}));
			}, 1000))


			this.stepper = new Stepper({
				target: `#quiz-${self.quiz._id}-questions`
			});

			this.$modal.find(`.show-question`).off('click').on('click', function () {
				let index = $(this).attr('data-index');
				self.stepper.go(index);
				self.$modal.find(`.show-question`).removeClass('active');
				$(this).addClass('active');

			});



		}

		startAnswerTimer(questionId) {
			let question = this.quiz.questions.find(q => q.id == questionId);
			console.log(`question`, question);
			if (!question) return;

			// Set the question status to running
			let previous = localStorage.getItem(`quiz:${this.quiz._id}:running`);
			previous = previous ? JSON.parse(previous) : {};

			// If the question is already running, set the duration to the previous duration
			if (previous && previous.questionId === questionId) {
				question.duration = previous.questionDuration;
			}



			const endTime = (previous ? previous.endTime : null) || (new Date(question.startedAt).getTime() + (Number(question.duration) * 60) * 1000);

			// Set the running question in localStorage
			localStorage.setItem(`quiz:${this.quiz._id}:running`, JSON.stringify({
				questionId,
				endTime: endTime,
			}));

			// If the timer is  set, stop the timer
			this.timer && clearInterval(this.timer);


			// Set the timer
			this.timer = setInterval(() => {

				// remaining time in seconds
				let remainingTime = Math.floor((endTime - new Date().getTime()) / 1000);

				// Set the question duration in minutes
				this.$modal.find(`.running [answer-duration="${questionId}"]`).text(`${this.formatTime(remainingTime)}`);

				// If the question duration is 0, stop the timer
				if (endTime <= new Date().getTime()) {

					this.stopAnswerTimer(questionId);

					this.submitAnswer(questionId, {
						answer: this.$modal.find(`#answer-${questionId} textarea`).val(),
						timeTaken: Number(question.duration) * 60
					});
					return;
				}

			}, 1000);
		}

		stopAnswerTimer(questionId) {
			// Clear the timer
			clearInterval(this.timer);
			this.timer = null;

			// Set the question duration to 0
			this.$modal.find(`.running [answer-duration="${questionId}"]`).text(`00:00`);

			// Remove the running question from localStorage
			localStorage.removeItem(`quiz:${this.quiz._id}:running`);

			this.$modal.find(`#answer-${questionId} textarea`).prop('disabled', true);
		}
		/**
		 * @method setUpSearch
		 * @description Sets up the search event handler and loads recent quizzes for the modal
		 */
		async setUpSearch() {
			let self = this;
			// Set up a search event handler for the search input
			this.$modal.find('.searchQuiz').off('input').on('input', debounce(() => this.searchQuiz(), 500));

			// Set up a click event handler for the select quiz button
			this.$modal.off('click', '.selectQuiz').on('click', '.selectQuiz', function () {
				self.selectQuiz($(this).data('id'));
			});
			// load the 10 most recent quizzes
			let quizzes = await this.getQuiz({
				limit: 10,
				status:"available"
			});

			// Set the modal body HTML to the search results
			this.$modal.find('.quizSearchResults').html(this.getSearchResultsHtml(quizzes));
		}

		/**
		 * @method searchQuiz
		 * @description Searches for a quiz using the search input value
		 * @returns {void}
		 */
		async searchQuiz() {


			// Get the search input value
			let search = this.$modal.find('.searchQuiz').val();

			// If no search value exists, return
			if (!search) return;

			// If the modal is already searching, return
			if (this.SEARCHING) return;

			// Set the searching flag to true
			this.SEARCHING = true;

			// Get the quiz data from the search
			let quizzes = await this.getQuiz({
				query: search,
				status: 'available'
			});

			// Set the modal body HTML to the search results
			this.$modal.find('.quizSearchResults').html(this.getSearchResultsHtml(quizzes));

			// Set the searching flag to false
			this.SEARCHING = false;
		}

		/**
		 * @method getSearchResultsHtml
		 * @description Generates HTML for the quiz search results
		 * @param {array} quizzes - Array of quiz objects
		 * @returns {string} HTML string
		 */
		getSearchResultsHtml(quizzes) {

			// Store the quizzes in the class instance
			this.result = quizzes;

			// If no quizzes exist, return a message
			if (!quizzes.length) return '<p>No quizzes found</p>';

			// Otherwise, generate the HTML for the quiz results
			let html = '<ul class="list-group ">';
			quizzes.forEach(quiz => {
				html += `<li class="list-group-item d-flex justify-content-between">
							<span>${quiz.title} </span>
							<span>
								<span class="mr-3">${quiz.questions.length} Questions</span>
								${this.getQuizSelectionActions(quiz)}
							</span>
						</li>`
			});
			html += '</ul>';

			return html;
		}

		/**
		 * @method getQuizSelectionActions
		 * @description Generates HTML for the action buttons for a quiz selection
		 * @param {object} quiz - The quiz object
		 * @returns {string} HTML string
		 */
		getQuizSelectionActions(quiz) {
			return `<button class="btn btn-primary btn-sm selectQuiz" data-id="${quiz._id}">Select</button>`;
		}


		async selectQuiz(quizId) {

			// If the modal is already selecting a quiz, return
			if (this.SELECTING) return;

			// Set the selecting flag to true
			this.SELECTING = true;

			// Disable the select quiz button
			$(this.$modal).find('.selectQuiz').prop('disabled', true);

			doAjax({
				type: 'POST',
				url: `/socialquiz/quiz/${quizId}/attach`,
				data: JSON.stringify({
					attachedTo: [this.attachmentId]
				}),
				contentType: 'application/json'
			}).then(({ response: { attached } }) => {

				// If the quiz was not attached, throw an error
				this.quiz = this.result.find(quiz => quiz._id === quizId);
				if (!this.quiz) throw new Error('Quiz not found');

				// Set the quiz data and update the modal
				this.refresh();
			}).catch(error => {
				console.error(error);
				// Enable the select quiz button
				$(this.$modal).find('.selectQuiz').prop('disabled', false);
			}).finally(() => {
				// Set the selecting flag to false
				this.SELECTING = false;
			});

		}

		/**
		 * @method getQuizHTML
		 * @description Generates HTML for a quiz, including the quiz title and a list of questions with their durations
		 * @returns {string} HTML string
		 */
		getQuizHTML() {

			// If no quiz exists, return an empty string
			if (!this.quiz) return '';

			// // Disable all questions that are not running
			// this.quiz.questions.find(question => question.status == 'running') &&
			// 	this.updateQuestions({ disabled: true }, (question) => question.status != 'running');

			// Set the modal title to the quiz title
			this.setTitle(this.quiz.title);

			let html = `
		        <div class="quiz p-3 h-100">
		            <div class="questions">
		                <ul class="list-group">
		                    ${this.quiz.questions.map(question => {
				return `<li class="list-group-item d-flex justify-content-between align-items-center" question="${question.id}">
		                    <div class="">${question.question || ""}</div>
		                    <div class="nowrap" actions> ${this.getQuestionActions(question)}</div>
		                 </li>`
			}).join('')}
		                </ul>
		            </div>
		        </div>`;

			return html;
		}

		setTitle(title) {
			this.$modal.find('.modal-title').text(title || 'Quiz');
		}



		/**
		 * @method getQuizAnswerModeHTML
		 * @description Generates HTML for a quiz in answer mode, including a list of questions with collapsible answer fields
		 * @returns {string} HTML string
		 */
		async getQuizAnswerModeHTML() {

			let quiz = await (!this.questionId ? this.getAnswers(true) : this.submitAnswer(this.questionId, { answer: " ", timeTaken: 0.1 }));


			// Set the modal title to the quiz title
			this.setTitle(this.quiz.title);

			let draft = localStorage.getItem(`quiz:${this.quiz._id}:answer:${this.questionId}`);
			draft = draft ? JSON.parse(draft) : {};

			// shift the question to the top
			quiz.questions = quiz.questions.filter(question => question.questionId == this.questionId).concat(quiz.questions.filter(question => question.questionId != this.questionId));

			// Add an accordion for each question
			let html = `<div class="d-flex h-100">
				<div class="col-4 h-100 overflow-auto px-0">
					<ul class="list-group m-0">
						${quiz.questions.map((question, index) => {
				return `<li class="list-group-item cursor-pointer show-question ${(this.questionId == question.questionId || !index) ? "active" : ""}"  data-index="${index + 1}">
										${question.question || ""}
									</li>`
			}).join('')}
					</ul>
				</div>
				<div class="col-8 pl-0">
		        	<div class="quiz answer">
		        	    <div class="questions">
		        	        <ul class="list-group quiz-container m-0" id="quiz-${this.quiz._id}-questions">
		        	            ${quiz.questions.map((question, index) => {
				return `<li class="list-group-item h--42  overflow-auto ${this.questionId == question.questionId ? 'running' : ''}" sdlms-step question="${question.questionId}">
		        	                            <div class="d-flex cursor-pointer justify-content-between">
													<span class="font-weight-500">${question.question || ""}</span>
		        	                            	<span class="nowrap pl-3"><i class="fas fa-stopwatch mr-1"></i> <span answer-duration="${question.questionId}">${question.duration} Min</span></span>
												</div>
												<div id="answer-${question.questionId}"  class="pt-3 w-100">
		        	                              	${this.questionId == question.questionId ?
						`<textarea class="form-control" rows="10" placeholder="Write Your Answer here...">${draft.content || question.answer || ""}</textarea>`
						: (question.answer || "")
					}
		        	                       		</div>
		        	                        </li>
		        	                `}).join('')}
		        	        </ul>
		        	    </div>
		        	</div>
				</div>
				</div>`;

			return html;
		}

		/**
		 * @method getResponsesHTML
		 * @description Generates HTML for a quiz in response mode, including a list of questions with collapsible answer fields
		 * @returns {string} HTML string
		 * @private
		 * @memberof QuizModal
		 */
		async getResponsesHTML() {
			if (this.LOADING) return;

			this.LOADING = true;
			let response = await this.getAnswers();

			// group the answers by question 
			let answers = response.reduce((acc, answer) => {
				answer.questions.forEach(question => {
					if (!acc[question.questionId]) {
						acc[question.questionId] = {
							question: question.question,
							answers: [],
							uid: answer.uid
						}
					}
					acc[question.questionId].answers.push({
						content: question.answer,
						user: answer.createdBy || {},
						mark: question.mark || {},
						answerId: question.answerId
					});
				});
				return acc;
			}, {});
			
			let html = `<div class="d-flex h-100">
							<div class="col-12 h-100 overflow-auto px-0">
								<ul class="list-group m-0">	
									${Object.keys(answers).map(questionId => {
										console.log(answers[questionId]);
				let _answers = answers[questionId].answers.filter(e => $.trim(e.content));
				return `<li class="list-group-item cursor-pointer font-weight-700 show-answer-list" >
													${answers[questionId].question || ""}
												</li>
												<div class="answerContent p-3 px-4"  style="display:none">
													${_answers.map((answer, index) => {
														answer.mark = answer.mark || {};
														
														let ratingGiven = answer.mark.value && answer.mark.value > 0;
															// will Fix ${answer.mark <= 1 ? "selected" : ""}...  to Events
															return `<div>									
																	<div class=""> ${answer.content} </div>
																	<i class="d-flex justify-content-end">~ By ${answer.user.fullname || answer.user.displayname}</i>
																	${answers[questionId].uid == app.user.uid ? '' : `
																	<div class="rate-answer rating-stars">
																		<label class="font-weight-500" for="rate-${questionId}"> ${ratingGiven ? 'Rated By ' + '<i>' + answer.mark.by + '</i>' : 'Rate Answer' }</label>
																		<ul id='stars-${questionId}' ${!ratingGiven ? `data-rating="${answer.mark}" answer-id="${answer.answerId}" quiz-rating="${questionId}" ` : ""}>
																		<li class='star cursor-pointer ${answer.mark.value >= 1 ? "selected" : ""}' title='Poor' data-value='1'>
																			<i class='fa fa-star fa-fw'></i>
																		</li>
																		<li class='star cursor-pointer ${answer.mark.value >= 2 ? "selected" : ""}' title='Fair' data-value='2'>
																			<i class='fa fa-star fa-fw'></i>
																		</li>
																		<li class='star cursor-pointer ${answer.mark.value >= 3 ? "selected" : ""}' title='Good' data-value='3'>
																			<i class='fa fa-star fa-fw'></i>
																		</li>
																		<li class='star cursor-pointer ${answer.mark.value >= 4 ? "selected" : ""}' title='Excellent' data-value='4'>
																			<i class='fa fa-star fa-fw'></i>
																		</li>
																		<li class='star cursor-pointer ${answer.mark.value >= 5 ? "selected" : ""}' title='WOW!!!' data-value='5'>
																			<i class='fa fa-star fa-fw'></i>
																		</li>
																	</ul>
																	</div>`}
																</div>`
				}).join('')}
												</div>`
			}).join('')}
						</div>`


			this.LOADING = false;
			return html;
		}

		/**
		 * @method updateQuestion
		 * @description Updates the quiz data for a question
		 * @returns {void}
		 * @private
		 * @memberof QuizModal
		 */

		async updateQuestion(questionId, keys) {


			// Set the quiz data
			this.quiz.questions = this.quiz.questions.map(question => {
				if (question.id === questionId) {
					return {
						...question,
						...keys
					};
				}
				return question;
			});

			try {
				await doAjax({
					type: 'PUT',
					url: `/socialquiz/quiz/${this.quiz._id}/question/${questionId}`,
					data: keys
				});
				return true;
			} catch (error) {
				console.error(error);
				return false;
			}

		}

		updateQuestions(keys, filter = () => true) {
			this.quiz.questions = this.quiz.questions
				.filter(filter)
				.map(question => {
					return {
						...question,
						...keys
					};
				});
		}


		/**
		 * @method getQuestionActions
		 * @description Generates HTML for the actions of a question
		 * @param {object} question - The question object
		 * @returns {string} HTML string
		 * @memberof QuizModal
		 */

		getQuestionActions(question) {
			console.log(question);
			let html = `<span duration class="mr-2">${question.duration} Min </span>`;

			if (!question.status && !question.disabled) {
				html += `<i class="fas cursor-pointer fa-play" start-quiz data-question-id="${question.id}"></i>`
			} else if (question.status == "completed") {
				html += `<i class="fas cursor-pointer fa-check" stop-quiz data-question-id="${question.id}"></i>`
			} else if (question.status == "running") {

				let endDate = (new Date(question.startedAt)).valueOf() + question.duration * 60 * 1000;
				let shouldStop = endDate < (new Date()).valueOf();

				shouldStop && console.log(`Question ${question.id} should stop: ${shouldStop}, As end date ${endDate} is less than ${new Date()}`);

				if (shouldStop) this.stopQuizTimer(question.id);
				else this.startQuizTimer(question.id);

			}
			return html;

		}


		/**
		 * @method setQuestionsActions
		 * @description Sets the actions for each question
		 * @returns {void}
		 * @memberof QuizModal
		 */

		setQuestionsActions() {

			// If no quiz exists, return 
			if (!this.quiz) return;

			this.quiz.questions.forEach(question => {
				let $question = this.$modal.find(`[question="${question.id}"]`);
				$question.find('[actions]').html(this.getQuestionActions(question));
			});

		}

		/**
		 * @method startQuizTimer
		 * @description Starts the timer for a question
		 * @param {string} questionId - The question ID
		 * @returns {void}
		 * @memberof QuizModal
		 */

		startQuizTimer(questionId) {

			// Find the question
			const question = this.quiz.questions.find(question => question.id === questionId);

			// If the question is not found, return
			if (!question) return;


			// Set the running flag
			this.RUNNING = questionId;

			// Set the question status to running
			let previous = localStorage.getItem(`quiz:${this.quiz._id}:running`);
			previous = previous ? JSON.parse(previous) : {};



			const endTime = (previous ? previous.endTime : null) || (new Date().getTime() + (Number(question.duration) * 60) * 1000);

			// Set the running question in localStorage
			localStorage.setItem(`quiz:${this.quiz._id}:running`, JSON.stringify({
				questionId,
				endTime: endTime,
			}));

			// If the timer is  set, stop the timer
			this.timer && clearInterval(this.timer);


			// Set the timer
			this.timer = setInterval(() => {

				// remaining time in seconds
				let remainingTime = Math.floor((endTime - new Date().getTime()) / 1000);

				// Set the question duration in minutes
				this.$modal.find(`[question="${questionId}"]`).find('[duration]').text(`${this.formatTime(remainingTime)}`);

				// If the question duration is 0, stop the timer
				if (endTime <= new Date().getTime()) {
					this.stopQuizTimer(questionId);
					return;
				}

			}, 1000);

		}

		/**
		 * @method stopQuizTimer
		 * @description Stops the timer for a question
		 * @param {string} questionId - The question ID
		 * @returns {void}
		 * @memberof QuizModal
		 * @private
		 */

		async stopQuizTimer(questionId) {

			// If the timer is  set, stop the timer
			this.timer && clearInterval(this.timer);


			// Set the running flag to null
			this.RUNNING = null;

			// set the stop icon
			this.$modal.find(`[question="${questionId}"]`).find('[duration]').html(`<i class="fas fa-check text-success"></i>`);

			// enable the question
			this.updateQuestions({
				disabled: false
			}, (question) => !question.completedAt);

			let keys = {
				status: "completed",
				completedAt: new Date()
			};

			// Set the question status to stopped
			let updated = await this.updateQuestion(questionId, keys);
			if (!updated) throw new Error('Could not update question');

			// Set the question NULL in localStorage
			localStorage.removeItem(`quiz:${this.quiz._id}:running`);

			// Set the question actions
			this.setQuestionsActions();


		}

		/**
		 * @method FormatTime
		 * @description Formats the time
		 * @param {string} time - The time
		 * @returns {string} The formatted time
		 * @memberof QuizModal
		 * @private
		 */

		formatTime(time) {
			let minutes = Math.floor(time / 60);
			let seconds = time % 60;
			minutes = minutes < 10 ? `0${minutes}` : minutes;
			seconds = seconds < 10 ? `0${seconds}` : seconds;
			return `${minutes}:${seconds} Min`;
		}

		/**
		 * @method broadcast
		 * @description Broadcasts an event to the server
		 * @param {string} event - The event name
		 * @param {object} payload - The payload
		 * @returns {void}
		 * @memberof QuizModal
		 * @private
		 */

		broadcast(event, payload) {
			console.log(`Broadcasting event: ${event}`, payload);
			socket.emit(`sdlms.quiz.${event}`, payload);
		}

		/**
		 * @method listeners
		 * @description Sets the listeners
		 * @returns {void}
		 * @memberof QuizModal
		 * @private
		 */

		static listeners(QuizInstance) {
			socket.on('event:quiz.start', function (data) {
				QuizInstance && QuizInstance.refresh(true);
			});
		}


		/**
		 * @method submitAnswer
		 * @description Answers a question
		 * @returns {void}
		 * @memberof QuizModal
		 * @private
		 */

		async submitAnswer(questionId, { answer, timeTaken }) {

			console.log("Answering question", questionId, answer, timeTaken);
			// If the question is already being answered, return
			if (this.ANSWERING) return;

			// Set the answering flag
			this.ANSWERING = true;

			let resp = null;

			try {
				let UIDsForAllocation = this.UIDsForAllocation;
				UIDsForAllocation = UIDsForAllocation.filter(e => e != app.user.uid).map(e => Number(e));
				UIDsForAllocation = [...new Set(UIDsForAllocation)].join(',');

				console.log(`UIDsForAllocation`,UIDsForAllocation);
				// Answer the question
				resp = await doAjax({
					url: `/socialquiz/quiz/${this.quiz._id}/answer/${questionId}`,
					method: "POST",
					data: JSON.stringify({ answer, timeTaken, attachmentId: this.attachmentId, UIDsForAllocation }),
					contentType: "application/json",
					dataType: "json",
				});

				resp = resp.response.data.answer;

			} catch (error) {
				console.error(error);
			}

			// Set the answering flag to false
			this.ANSWERING = false;

			return resp;
		}

		/**
		 * @method getAnswers
		 * @description Gets the answers for a question
		 * @returns {void}
		 * @memberof QuizModal
		 * @private
		 */

		async getAnswers(own) {

			let resp = null;

			try {

				// Answer the question
				resp = await doAjax({
					url: `/socialquiz/quiz/${this.quiz._id}/responses/${own ? app.user.uid : ''}`,
					data: {
						populate: 'createdBy:user',
						context:own ? null  : "marking" 
					}
				});

				resp = !own ? resp.response.data : resp.response.data[0];
			} catch (error) {
				console.error(error);
			}

			return resp;
		}

		/**
		 * @method submitMarks
		 * @description Rates an answer
		 * @returns {void}
		 * @memberof QuizModal
		 * @private
		 */

		async submitMarks(questionId, payload) {
			
			console.log("MARKING question", questionId,payload);
			// If the question is already being answered, return
			if (this.MARKING) return;

			// Set the MARKING flag
			this.MARKING = true;

			let resp = null;

			try {

				// MARKING the answer
				resp = await doAjax({
					url: `/socialquiz/quiz/${this.quiz._id}/answer/${questionId}/mark`,
					method: "POST",
					data: JSON.stringify(payload),
					contentType: "application/json",
					dataType: "json",
				});

				resp = resp.response.data;

			} catch (error) {
				console.error(error);
			}

			// Set the MARKING flag to false
			this.MARKING = false;

			return resp;
		}

		addUidForAllocation(uid) {
			if(Number(uid) && !this.UIDsForAllocation.includes(uid)){
				this.UIDsForAllocation.push(Number(uid));
			}
		}
	}



	window.Quiz = Quiz;

})();