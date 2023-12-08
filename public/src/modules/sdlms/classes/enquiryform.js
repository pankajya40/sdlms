/**
 * @author imshawan
 * @date 21-05-2022
 * @class EnquiryForm
 * @description Contains the @methods or @function - for the builder, answerer and renderer
 * 
 * @example How to use/initialize the component?
 * let data = new EnquiryForm({
            target: '.sdlms-form', target where to init the form component
            header: 'Form component', Heading for the form component
			classes: 'shadow-lg', CSS classes for the main form window (component)
            action: 'reader', Modes: create, answer, reader
            requiresValidation: true, (If form validstion is required or keep it false -> Still a work in progress)
            with: {}, A json object containing the form data (Incase of existing form, incase of new form, leave it empty)
 		})
 *
 * @methods the methods for getting JSON data from the component ->
 * 
 * As we inited the form by -> let data = new EnquiryForm({})
 * Now we use 'data' to access the internal functions of the class such as @getMetaData and @getFormResponses to get the
 * desired json data out from the form
 * 
 * @example How to get the form data?
 * let formData = data.getMetaData();
 * 
 * @example How to get the form responses?
 * let formResponses = data.getFormResponses();
 * 
 * @todo: Add the form validation, and multiple question support in a conditional block
 */
		 class EnquiryForm {
			constructor(data) {
				this.data = data;
				this.requiresValidation = data.requiresValidation || false;
				this.data.with = data.with || {};
				this.strictMode = data.strictMode || false;
				this.header = data.header || 'Enquiry Form';
				this.classes = data.classes || '';
				this.modes = ['create', 'answer', 'reader'];
		
				var b = document.documentElement;
				b.setAttribute("data-useragent", navigator.userAgent);
				b.setAttribute("data-platform", navigator.platform);
				this.data.queue = 0;
				this.builder(this.data.target);
		
				//	Defining custom cloning method for Jquery
				(function (original) {
					jQuery.fn.clone = function () {
					  var result           = original.apply(this, arguments),
						  my_textareas     = this.find('textarea').add(this.filter('textarea')),
						  result_textareas = result.find('textarea').add(result.filter('textarea')),
						  my_selects       = this.find('select').add(this.filter('select')),
						  result_selects   = result.find('select').add(result.filter('select'));
				  
					  for (var i = 0, l = my_textareas.length; i < l; ++i) $(result_textareas[i]).val($(my_textareas[i]).val());
					  for (var i = 0, l = my_selects.length;   i < l; ++i) result_selects[i].selectedIndex = my_selects[i].selectedIndex;
				  
					  return result;
					};
				  }) (jQuery.fn.clone);
			}

			/**
			 * @function unique
			 * @description Generates a unique id
			 * @param {String} prefix 
			 * @returns String
			 */
		
			unique(prefix = "") {
				var dt = new Date().getTime();
				var uuid = "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
					var r = (dt + Math.random() * 16) % 16 | 0;
					dt = Math.floor(dt / 16);
					return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
				});
				return prefix + uuid;
			}
		
			/**
			 * @function log
			 * @description Logs the data to the console
			 * @param {String} log 
			 */
			log(log) {
				!this.data.log || console.log(log);
			}
		

			/**
			 * @function builder
			 * @description Builds the form component that is always unique by itself. 
			 * It is the main component of the class in whuch all the other components are built/appended
			 * @param {String} target 
			 */
			builder(target = "body") {
		
				this.id = this.unique("sdlms-enquiry-form-");
				let $that = this;
				let $target = $(target);
				if (!$target.length) {
					$that.log("No HTML element found For Builder Given ==>" + target);
					throw new Error(`No HTML element found while searching ${target}`);
				}
				if (!$that.data.action) {
					$that.log('Form action is required!');
					throw new Error('Form action is required!');
				}
				if (!$that.modes.includes($that.data.action)) {
					$that.log(`Invalid mode: '${$that.data.action}'`);
					throw new Error(`Invalid mode: '${$that.data.action}'`);
				}

				if (!$that.data.append) {
					$target.empty();
				}
				$target.append(
					$("<sdlms-enquiry-form-builder>")
						.attr({
							id: $that.id,
							class: ($that.data.noAction ? "sdlms-readonly" : '') + ' sdlms-section position-relative w-100 ' + $that.classes
						})
						.append(`<div class="sdlms-section-header position-relative shadow-none d-${this.data.hideHeader ? 'none' : 'flex'} primary-header align-items-center justify-content-between enquiry-form-header">
							<div class="font-weight-bold sdlms-text-white-20px my-auto">${$that.header}</div>`)
						.append($(`<form>`).attr({
							id: "form-" + $that.id,
							class: 'sdlms-session-container p-3 create sdlms-session-container needs-validation position-relative',
						})
						)
				);
				let $builder = $(`#form-${$that.id}`);
				$that.$builder = $builder;
				$that[$that.data.action == 'answer' ? 'answer' : ($that.data.action == 'reader' ? 'reader': 'create')]($that.data.with);
			}
		
			/**
			 * @date 26-05-2022
			 * @author imshawan
			 * @param {Object} data 
			 * @returns Formatted DateTime
			 */
			dateFormatter (data = {}) {
				let date = new Date(data.timestamp)
				let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
				return `${date.getDate()} ${date.toLocaleDateString(undefined, { month: "long" })}, ${date.getFullYear()} ${data.datetime ? `, ${time}` : ''}`
			}
		
			/**
			 * @author imshawan
			 * @description Contains all the components that is going to be used by the form builder and renderer
			 * @returns {components}
			 */
			enquiryForm() {
				let $that = this;
				let components = {
					form: function (data = {}) {
						return `
						<div class="m-3">
							<div class="row mt-2">
								<div class="form-group mb-3 w-100">
									<label for="">Title</label>
									<input required value="${data.title || ''}" name="title" type="text" class="form-control">
								</div>
		
								<div class="w-100 mt-2" appending-area="${$that.id}">
									
								</div>
							</div>
							<button class="btn button-secondary border-0 btn-secondary mb-3" addblock-btn="${$that.id}">
								<i class="fa fa-plus mr-1" aria-hidden="true"></i> Block
							</button>
						</div>
						`;
					},
		
					textArea: function (data = {}) {
						return `
						${data.label ? '<label for="">Response</label>' : ''}
						<textarea rows="4" placeholder="${data.placeholder || ''}" required value="${data.response || ''}" name="response" type="text" class="form-control w-100"></textarea>
						`
					},
		
					dropDownOptions: function (data = []) {
						let options = `<option value="">Select</option>`;
						$.each(data, function (index, option) {
							let name = Object.keys(option)[0];
							options += `<option value="${name}">${option[name]}</option>`;
						});	
						return options;
					},
					
					checkBoxes: function (data = []) {
						let options = '';
						$.each(data, function (index, option) {
							let name = Object.keys(option)[0];
							options += `
							<input type="checkbox" placeholder="${option.placeholder || ''}" id="${option[name] + '_' + name}" value="${option[name] || ''}" name="${name}">
							<label for="${option[name] + '_' + name}" >${option[name] || ''}</label><br>
						`;
						})
						return options;
					},

					radioButtons: function (data = {}) {
						let {options, unique} = data;
						let html = '';
						let id=app.unique()                                                        
						$.each(options, function (index, item) {
							let name = Object.keys(item)[0];
							html += `
								<div class="form-check mb-2">
									<input class="form-check-input" type="radio" value="${name}" name="${id}" id="${item[name] + '_' + name}">
									<label class="form-check-label" for="${item[name] + '_' + name}">
									${item[name] || ''}
									</label>
								</div>
							`;
						})
						
						return html;
					},
		
					inputField: function (data = {}) {
						let allowConditionalBlocks = data.allowConditionalBlocks == 'none' ? false : true;
						let addConditionalBlockBtn = `<i style="margin-top: 12px;" class="fa fa-plus-circle ml-2 conditional-block-btn" data-conditional-btn="${data.id}" aria-hidden="true"></i>`
						return `
							<div class="d-flex position-relative" option-id="${data.id}">
								<input options required placeholder="${data.placeholder || ''}" value="${data.value || ''}" name="${data.name}" type="text" class="mb-2 form-control">
								<i class="fa fa-close my-2 ml-2 delete-option-btn position-absolute" data-delete-btn="${data.id}" aria-hidden="true"></i>
								${allowConditionalBlocks ? addConditionalBlockBtn : ''}
							</div>
						`;
					},
		
					dateTime: function (data = {}) {
						return `
						<div class="d-flex">
							<input class="w-100 form-control" type="${data.input_type || 'date'}" placeholder="${data.placeholder || ''}" id="${data.unique}_dateTime" value="${data.value || ''}" name="response">
							<label for="${data.unique}_dateTime" >${''}</label><br>
						</div>
						`;
					},
		
					helpTextTooltip: function (data = '') {
						if (!data) return '';
						return `
							<span data-helptext class="helptext-tooltip sdlms-text-tertiary-16px font-weight-500">
								<i class="fa fa-question-circle" aria-hidden="true"></i>
								<span class="helptext-tooltiptext">${data}</span>
							</span>
						`;
					},

					inputRange: function (data = {}) {
						if (!data) return '';
						let value = data.value || data.default;

						return `
							<div range-container="${data.unique}" class="row">
								<label for="" class="form-label col-12">Select range</label>
								<div class="col-12 range-configuration">
									
								</div>
								<div class="col-12">
									<input data-id="${data.unique}" title="${value || ''}" range-selector type="range" value="${value}" 
										class="form-range w-100" min="${data.min}" max="${data.max}" step="${data.step}" id="">
								</div>
								<div class="col-12 justify-content-between label-area d-flex">
									<div class="">
										<label label-start-id=${data.unique}>${data.min || ''}</label>
									</div>
									<div class="">
										<label label-end-id=${data.unique}>${data.max || ''}</label>
									</div>
								</div>
							</div>
						`;
					},

					rangeConfigForm: function (data = {}) {
						return `
							<div range-config="${data.unique}" class="row d-flex mb-3 justify-content-between">
								<div class="col-6 col-md-3">
									<label for="">Min</label>
									<input required name="min" class="form-control" type="number">
								</div>
								<div class="col-6 col-md-3">
									<label for="">Max</label>
									<input required name="max" class="form-control" type="number">
								</div>
								<div class="col-6 col-md-3">
									<label for="">Default</label>
									<input required name="default" class="form-control" type="number">
								</div>
								<div class="col-6 col-md-3">
									<label for="">Step</label>
									<input required name="step" class="form-control" type="number">
								</div>
							</div>
						`;
					},
		
					/**
					 * @function formItem
					 * @description Creates a form item and returns it back to the caller
					 * @param {Object} data 
					 * @returns String (HTMl content)
					 */
					formItem: function (data = {}) {
						let unique = data.unique || $that.unique();
						let customBlockName = data.customBlockName || 'enquiry-block';
						return `
							<div ${customBlockName}="${unique}" data-input-type="${data.input_type}" class="border mb-4 px-2 bg-light position-relative">
							<div class="delete-block-btn position-absolute" data-delete-block="${unique}">
								<i class="fa fa-trash my-2 ml-2" aria-hidden="true"></i>
							</div>
								<div class="pt-2 form-group col-12">
									<label for="questionId-${unique}">Question</label>
										<span>
											<button data-helptext-id="${unique}" class="add-help-text" style="border: none; background: transparent;">
												<i class="fa fa-question-circle" aria-hidden="true"></i>
											</button>
										</span>
										<div class="d-none mb-2 position-relative" helptext-area-id="${unique}">
											<input required value="${data.helptext || ''}" name="helptext" type="text" placeholder="Enter a help text for your question" class="form-control">
											<button style="position: absolute;right: 8px; background: transparent; border: none; top: 3px;" class="" helptext-remove data-remove-id="${unique}">
												<i class="fa fa-minus-circle my-2" aria-hidden="true"></i>
											</button>
										</div>
									<input required id="questionId-${unique}" value="${data.question || ''}" name="question" type="text" class="form-control">
								</div>
								<div class="form-group col-12">
									<div class="row">
										<div class="col-12 col-lg-9 input-field-area">
											<div input-field-area="${unique}">
											${data.label ? '<label for="">Response</label>' : ''}
												<textarea rows="4" required value="${data.response || ''}" name="response" type="text" class="form-control w-100"></textarea>
											</div>
											<div input-field-btn="${unique}" class="justify-content-end d-flex mt-3"></div>
										</div>
										
										<div class="col-12 col-lg-3 user-input-types">
											<label for="">User input type</label>
											<select data-select-id="${unique}" style="font-size: 16px;" value="" name="input_type" class="form-control w-100 mr-3">
												<option value="">Select input</option>
												<option value="dropdown">Dropdown</option>
												<option value="date">Date</option>
												<option value="datetime">Date-Time</option>
												<option value="multiselect">Multi-select</option>
												<option value="radio">Radio buttons</option>
												<option value="range">Range</option>
												<option selected value="textfield">Text box</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						`;
					},
					responseFormItem: function (data = {}) {
						let unique = data.unique || $that.unique();
						let customBlockName = data.customBlockName || 'enquiry-block';
						let dataBlockFor = data.parent_id || null;
		
						return `
							<div ${customBlockName}="${unique}" ${dataBlockFor ? `data-block-for="${dataBlockFor}"` : ''} data-input-type="${data.input_type}" class="bg-light border mb-4 px-2 ${data.class} position-relative">
								<div class="pt-2 form-group col-12 sdlms-text-primary-16px font-weight-bold">
									<div question-area="${unique}">
										<span data-question>${data.question || ''}</span>
										${components.helpTextTooltip(data.helptext)}
									</div>
								</div>
								<div class="form-group col-12">
									<div class="row">
										<div class="col-12 answering-field-area">
											<div answering-field-area="${unique}"> </div>
										</div>
									</div>
								</div>
							</div>
						`;
					},
		
					renderResponseFormItem: function (data = {}) {
						let unique = data.unique || $that.unique();
						let customBlockName = data.customBlockName || 'enquiry-block';

						return `
							<div ${customBlockName}="${unique}" data-input-type="${data.input_type}" class="border mb-4 px-2 bg-light position-relative">
								<div class="pt-2 form-group col-12 sdlms-text-primary-16px font-weight-bold">
									<div question-area="${unique}">
										<span data-question>${data.question || ''}</span>
										${components.helpTextTooltip(data.helptext)}
									</div>
								</div>
								<div class="form-group col-12">
									<div class="row">
										<div class="col-12 render-answer-field-area">
											<div render-answer-field-area="${unique}">
												${data.response || ''}
											</div> 
										</div>
									</div>
								</div>
							</div>
						`;
					}
				}
				return components;
			}
		
			/**
			 * @author imshawan
			 * @function inputOnChange
			 * @description Handles the input change events, while the user is selecting a different input field
			 * @param {String} id 
			 * @param {String} inputType 
			 */
			inputOnChange (id, inputType, allowConditionalBlocks = true) {
				let $target = this.$builder,
					components = this.enquiryForm(),
					$that = this;
		
				if (inputType == 'dropdown' || inputType == 'multiselect' || inputType == 'radio') {
					$target.find(`[input-field-area="${id}"]`).empty().append('<label for="">Options</label>')
					.append(components.inputField({placeholder: 'Option 1', name: '1', id, 
							allowConditionalBlocks: inputType == 'dropdown' && allowConditionalBlocks == true ? true : 'none' }));
		
					$target.find(`[input-field-btn="${id}"]`).empty()
						.append(`<button class="btn btn-primary sdlms-btn" add-options-btn="${id}"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp; Option</button>`);
					$target.find(`[add-options-btn="${id}"]`).off('click').on('click', function (e) {
						e.preventDefault();
						let counter = $target.find(`[input-field-area="${id}"]`).find('[options]').length + 1;
						let name = counter;
						$target.find(`[input-field-area="${id}"]`).append(components.inputField({ placeholder: 'Option ' + counter, name, id, 
							allowConditionalBlocks: inputType == 'dropdown' && allowConditionalBlocks == true ? true : 'none' }));
					});
				} 
				
				else if (inputType == 'textfield') {
					$target.find(`[input-field-btn="${id}"]`).empty();
					$target.find(`[input-field-area="${id}"]`).empty().append(components.textArea());
				} 
				
				else if (inputType == 'datetime') {
					$target.find(`[input-field-btn="${id}"]`).empty();
					$target.find(`[input-field-area="${id}"]`).empty().append('<label>DateTime selector</label>')
					.append(components.dateTime({
						unique: id,
						input_type: 'datetime-local'
					}));
				} 
				
				else if (inputType == 'date') {
					$target.find(`[input-field-btn="${id}"]`).empty();
					$target.find(`[input-field-area="${id}"]`).empty().append('<label>Date selector</label>')
					.append(components.dateTime({ unique: id }));
				} 
				
				else if (inputType == 'range') {
					$target.find(`[input-field-btn="${id}"]`).empty();
					$target.find(`[input-field-area="${id}"]`).empty()
					.append(components.inputRange({ unique: id }));

					if ($that.data.action == 'create') {
						$target.find(`[range-container="${id}"]`).find('.range-configuration').append(components.rangeConfigForm({ unique: id }));
					}

					$target.find(`[input-field-area="${id}"]`).find(`[range-selector]`).off('change').on('change', function (e) {
						$(this).attr('title', $(this).val());
					})
				}
			}
		
			/**
			 * @author imshawan
			 * @function renderBlock
			 * @description Renders a block for a particular entry. Renders the block in the DOM
			 * @param {Object} item 
			 * @returns String
			 */
			renderBlock (data = {}) {
				let $target = data.target || this.$builder,
					components = this.enquiryForm(),
					$that = this,
					allowConditionalBlocks = data.allowConditionalBlocks;
		
				let unique = data.unique || $that.unique();
				let addFormItem = data.addFormItem || false;
				if (addFormItem) {
					$target.find(`[appending-area]`).append(components.formItem({ ...data, unique }));
				}
				if (data.helptext) {
					$target.find(`[helptext-area-id="${unique}"]`).addClass('d-flex');
				}
		
				if (data.input_type == 'dropdown' || data.input_type == 'multiselect' || data.input_type == 'radio') {
					if (!data.options) return alert('Invalid options! Error occured while parsing options');
		
					$target.find(`[input-field-area="${unique}"]`).empty().append('<label for="">Options</label>')
					$.each(data.options, function (index, option) {
						let name = Object.keys(option)[0];
						$target.find(`[input-field-area="${unique}"]`)
							.append(components.inputField({
								value: option[name],
								name,
								id: unique,
								allowConditionalBlocks
							}));
					});
					$target.find(`[input-field-btn="${unique}"]`).empty()
						.append(`<button class="btn btn-primary sdlms-btn" add-options-btn="${unique}"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp; Option</button>`);
					$target.find(`[add-options-btn="${unique}"]`).off('click').on('click', function (e) {
						e.preventDefault();
						let counter = $target.find(`[input-field-area="${unique}"]`).find('[options]').length + 1;
						let name = counter;
						$target.find(`[input-field-area="${unique}"]`)
							.append(components.inputField({
								placeholder: 'Option ' + counter,
								name,
								id: unique,
								allowConditionalBlocks
							}));
					});
				} else if (data.input_type == 'datetime') {
					$target.find(`[input-field-area="${unique}"]`).empty()
						.append(components.dateTime({ unique, input_type: 'datetime-local' }));
				} else if (data.input_type == 'textfield') {
					$target.find(`[input-field-area="${unique}"]`).empty()
						.append(components.textArea({ response: data.response }));
				} else if (data.input_type == 'date') {
					$target.find(`[input-field-area="${unique}"]`).empty().append(components.dateTime({ unique }));
				} else if (data.input_type == 'range') {
					$target.find(`[input-field-area="${unique}"]`).empty().append(components.inputRange({
						unique,
						...data
					}));
					$target.find(`[input-field-area="${unique}"]`).find(`[range-selector]`).off('change').on('change', function (e) {
						$(this).attr('title', $(this).val());
					})
				}
		
				$target.find(`[data-select-id="${unique}"]`).find(`[value="${data.input_type}"]`).attr('selected', 'selected');
				return unique;
			}

			/**
			 * @author imshawan
			 * @function renderAnsweringBlock
			 * @description Renders a particular answering block for a particular entry
			 * @param {Object} item 
			 */
		
			renderAnsweringBlock (item = {}) {
				let $that = this;
				let $target = item.target || this.$builder;
				let components = this.enquiryForm();
				let unique = item.unique;
		
				if (item.input_type == 'dropdown') {
					$target.find(`[answering-field-area="${unique}"]`).empty()
					.append(`
							<select data-select-id="${unique}" style="font-size: 14px; min-width: 40%;" value="" name="input_type" class="form-control mr-3">
								${components.dropDownOptions(item.options)}
							</select>
						`);
				} else if (item.input_type == 'textfield') {
					$target.find(`[answering-field-area="${unique}"]`).empty()
					.append(components.textArea({ response: item.response }));
				} else if (item.input_type == 'multiselect') {
					$target.find(`[answering-field-area="${unique}"]`).empty()
					.append(components.checkBoxes(item.options));
				} else if (item.input_type == 'datetime' || item.input_type == 'date') {
					if (item.input_type == 'datetime') {
						item.input_type = 'datetime-local';
					}
					$target.find(`[answering-field-area="${unique}"]`).empty()
					.append(components.dateTime(item));					
				} else if (item.input_type == 'range') {
					$target.find(`[answering-field-area="${unique}"]`).empty()
					.append(components.inputRange({unique, ...item}));
				} else if (item.input_type == 'radio') {
					$target.find(`[answering-field-area="${unique}"]`).empty()
					.append(components.radioButtons({unique, ...item}));
				}
			}
		
			/**
			 * @author imshawan
			 * @function conditionalBlock
			 * @description Adds/renders a conditional block for a particular entry
			 * @param {Object} item 
			 */
			conditionalBlock (data = {}) {
				if (!data.target) throw new Error('Target is not defined!');
		
				let $target = $(data.target),
					components = this.enquiryForm(),
					$that = this,
					unique = data.unique || $that.unique(),
					allowConditionalBlocks = 'none';
		
				if (data && data.block) {
					let { block } = data;
					$target.append(components.formItem({label:true, input_type: 'textfield', customBlockName: 'enquiry-block-child', unique, ...block}));
					$that.renderBlock({ ...block, unique, target: $target, allowConditionalBlocks, addFormItem: false });
				}
				else {
					$target.append(components.formItem({label:true, input_type: 'textfield', customBlockName: 'enquiry-block-child', unique}));
				}
		
				$target.find('[data-select-id]').on('change', function (e) {
					e.preventDefault();
					let id = $(this).data('select-id');
					let inputType = $(this).val();
					$target.find(`[enquiry-block-child="${id}"]`).attr('data-input-type', inputType);
					$that.inputOnChange(id, inputType, allowConditionalBlocks);
				});
			}
		
			/**
			 * @author imshawan
			 * @function renderReadingBlock
			 * @description Renders the reader block for a particular entry
			 * @param {Object} item 
			 * @returns String
			 */
			renderReadingBlock (item = {}) {
				let $that = this;
				let $target = item.target || this.$builder;
				let components = this.enquiryForm();
		
				let unique = $that.unique();
				let response = !isNaN(item.response) ? item.responseRaw : item.response;
		
				if (!isNaN(Date.parse(response)) && item.input_type != 'radio') {
					if (item.input_type == 'datetime') {
						response = $that.dateFormatter({timestamp: response, datetime: true});
					} else if (item.input_type == 'range') {
						response = item.response + ' / ' + item.max;
					} else {
						response = $that.dateFormatter({timestamp: response});
					}
				} else if (response && Array.isArray(response)) {
					response = '';
				}
				// Building HTML like formatting for display
				if (item.input_type == 'textfield') {
					try {
						response = response.split('\n').join('<br />');
						response = response.split('\t').join('&nbsp;&nbsp;');
					} catch (e) {}
				}

				if (item.customBlockName) {
					$target.append(components.renderResponseFormItem({ ...item, unique, response }));
				} else {
					$target.find(`[appending-area]`).append(components.renderResponseFormItem({ ...item, unique, response }));
				}
				if (item.input_type == 'multiselect') {
					let responses = [];
					$.each(item.response, function (index, option) {
						responses.push({ [option]: item.responseRaw[index] });
					});
					$target.find(`[render-answer-field-area="${unique}"]`).empty()
					.append(components.checkBoxes(responses));	
					$target.find(`[render-answer-field-area="${unique}"]`).find('input').each(function (i, el) {
						$(el).attr('disabled', true).attr('checked', true).css({ color: '#0029ff' });
					})
				}
		
				return unique;
			}
		
			/**
			 * @author imshawan
			 * @function create
			 * @description Creates a new enquiry form, also allows the user to modify pre-created entries
			 * @param {Object} data 
			 */
			create(data = {}) {
		
				let $target = this.$builder,
					components = this.enquiryForm(),
					$that = this;
		
				$target.append(components.form(data));
		
				if (data && data.blocks) {
					$.each(data.blocks, function (index, block) {
						let { child } = block;
						let id = $that.renderBlock({ ...block, addFormItem: true});
						if (child && child.length && (block.input_type == 'dropdown' || block.input_type == 'multiselect' || inputType == 'radio')) {
							$.each($target.find(`[input-field-area="${id}"]`).find('[options]'), function (index, elem) {
								let inputName = $(elem).attr('name');
								let childBlock = child.find(item => item.parent_id == inputName);
								if (childBlock) {
									let newId = $that.unique();
									$(elem).attr('data-conditional-block-attached', newId);
		
									$target.find($(elem).parent()).after(`
										<div data-parent-id="${id}" conditional-enquiry-block=${newId} data-block-for="${inputName}" class="bg-light form-group mt-3 mb-3">
														
										</div>
									`);
									$that.conditionalBlock({ unique: newId, target: $(`[conditional-enquiry-block="${newId}"]`), block: childBlock });
								}
							})
						}
					})
				}
				else {
					$target.find(`[appending-area=${$that.id}]`).append(components.formItem({label:true, input_type: 'textfield'}));
				}
		
				$target.on('click', '[data-delete-block]', function (e) {
					if ($('[data-delete-block]').length <= 1) {
						return alert('Cannot remove all the blocks');
					}
					if (confirm('Are you sure you want to delete this block?')) {
						let id = $(this).attr('data-delete-block');
						let isConditional = $(this).parent().parent().attr('conditional-enquiry-block');
						if (isConditional) {
							$(this).parent().parent().remove();
						} else {
							$(this).parent().remove();
						}
						
					}
				});
		
				$target.find('[data-select-id]').on('change', function (e) {
					e.preventDefault();
					let id = $(this).data('select-id');
					let inputType = $(this).val();
					$target.find(`[enquiry-block="${id}"]`).attr('data-input-type', inputType);
					$that.inputOnChange(id, inputType);
				});
		
				$target.on('click', '.add-help-text', function (e) {
					e.preventDefault();
					let unique = $(this).data('helptext-id');
					$target.find(`[helptext-area-id="${unique}"]`).addClass('d-flex');
				})
				$target.on('click', `[helptext-remove]`, function (e) {
					e.preventDefault();
					let unique = $(this).data('remove-id');
					$target.find(`[helptext-area-id="${unique}"]`).removeClass('d-flex').addClass('d-none')
					$target.find(`[helptext-area-id="${unique}"]`).find('[name="helptext"]').val('');
				})
		
				$target.find(`[addblock-btn="${$that.id}"]`).on('click', function (e) {
					e.preventDefault();
					$target.find(`[appending-area=${$that.id}]`).append(components.formItem({input_type: 'textfield'}));
					$target.find('[data-select-id]').on('change', function (e) {
						e.preventDefault();
						let inputType = $(this).val();
						let id = $(this).data('select-id');
						$target.find(`[enquiry-block="${id}"]`).attr('data-input-type', inputType);
							$that.inputOnChange(id, inputType); 
					})
				});
		
				$target.on('click', '[data-delete-btn]', function (e) {
					let optId = $(this).data('delete-btn');
		
					if ($(`[data-delete-btn="${optId}"]`).length <= 1) {
						return alert('Cannot remove all the options');
					}
		
					// let name = $(this).parent().find('input').attr('name');
					let conditional_block = $(this).parent().find('input').data('conditional-block-attached');
					if (conditional_block) {
						$target.find(`[conditional-enquiry-block="${conditional_block}"]`).remove();
					}
		
					$(this).parent().remove();
					
					//	Re-Indexing
					$(`[input-field-area="${optId}"]`).find('[options]').each(function (i, el) {
						let conditional_block = $(el).data('conditional-block-attached');
						if (conditional_block) {
							$target.find(`[conditional-enquiry-block="${conditional_block}"]`).attr('data-block-for', (i + 1))
						}
						$(el).attr('placeholder', 'Option ' + (i + 1));
						$(el).attr('name', (i + 1));
					})
				});
		
				$target.on('click', '[data-conditional-btn]', function (e) {
					e.preventDefault();
					let unique = $(this).data('conditional-btn');
					let value = $(this).parent().find('input').attr('name');
					let newId = $that.unique();
		
					$(this).parent().find('input').attr('data-conditional-block-attached', newId);
		
					$target.find($(this).parent()).after(`
						<div data-parent-id="${unique}" conditional-enquiry-block=${newId} data-block-for="${value}" class="bg-light form-group mt-3 mb-3">
										
						</div>
					`)
		
					$that.conditionalBlock({ unique: newId, target: $(`[conditional-enquiry-block="${newId}"]`) })
				});
		
			}
		
			/**
			 * @author imshawan
			 * @function answer
			 * @description Answers the enquiry form, contains the answering logic/mechanism for the enquiry form
			 * @param {Object} data 
			 */
			answer(data = {}) {
				let $that = this;
				let $target = data.target || this.$builder;
				let components = this.enquiryForm();
				$target.append(`
				<div class="m-3">
					<div class="row mt-2">
						<div class="form-group mb-3 mt-2 w-100">
							<h5 form-title class="font-weight-bold">${data.title || ''}</h5>
						</div>
		
						<div class="w-100 mt-2" appending-area="${$that.id}">
							
						</div>
					</div>
				</div>
				`);
		
				if (data && data.blocks) {
					$.each(data.blocks, function (index, item) {
						let unique = $that.unique();
						$target.find(`[appending-area]`).append(components.responseFormItem({ ...item, unique }));
		
						$that.renderAnsweringBlock({...item, unique});
						
						$target.find(`[data-select-id="${unique}"]`).on('change', function (e) {
							e.preventDefault();
							let responseId = $(this).val();
							let { child } = item;
							if (child.length) {
								let newId = $that.unique();
								let block = child.find(item => item.parent_id == responseId);
								let customBlockName = 'conditional-answering-block';
								$target.find(`[enquiry-block="${unique}"]`).find(`[${customBlockName}]`).remove();
								if (block) {
									$target.find(`[enquiry-block="${unique}"]`).append(components.responseFormItem({
										...block,
										unique: newId,
										customBlockName,
										class: 'm-3'
									}));
									$that.renderAnsweringBlock({...block, unique: newId, target: $(`[${customBlockName}="${newId}"]`)});
								}
							}
						})
					});
		
				} else {
					return alert('No data found');
				}
			}
		
			/**
			 * @author imshawan
			 * @function reader
			 * @description Reads the enquiry form and renders the form in an human-readable format, 
			 * contains the rendering logic for an answered enquiry form
			 * @param {Object} data 
			 */
			reader(data = {}) {
				
				let $that = this;
				let $target = this.$builder;
				let components = this.enquiryForm();
				let customBlockName = 'responses-preview-block';
		
				if (data && data.blocks) {
					$target.append(`
					<div class="m-3">
						<div class="row mt-2">
							<div class="form-group mb-3 mt-2 w-100">
								<h5 form-title class="font-weight-bold">${data.title + ' (response)' || ''}</h5>
							</div>
							<div class="w-100 mt-2" appending-area="${$that.id}"></div>
						</div>
					</div>
					`);
					$.each(data.blocks, function (index, item) {
						let id = $that.renderReadingBlock({...item, customBlockName});
						let { child } = item;
						if (child && child.length) {
							$.each(child, function (index, block) {
								console.log(block);
								let newId = $that.unique();
								$target.find(`[responses-preview-block="${id}"]`).append(`<div ${customBlockName}-child="${newId}" class=""></div>`);
								$that.renderReadingBlock({ ...block, customBlockName, class: 'border-0', target: $(`[${customBlockName}-child="${newId}"]`) });
							})
						}
					});
				} else {
					return alert('No data found');
				}
		
			}
		
			gatherMetaData (element, ignoreBlock = '') {
				let $that = this;
				let data = {}
				let options = [];
				let tempId = $that.unique('temp_form_');
		
				let dataBlockFor = $(element).attr('data-block-for');
				if (dataBlockFor) data.condition_for = dataBlockFor;
		
				$('body').append($('<form>', {id: tempId, class:'d-none temp-form'}));
				let $clone = $(element).clone(true, true);
					$(`#${tempId}`).append($clone);
		
				if (ignoreBlock) {
					$.each($('body').find(`#${tempId}`).find(ignoreBlock), function (index, item) {
						$(item).remove();
					})
				}
		
				let payload = $(`#${tempId}`).serializeArray();
				if (payload.length) {
					payload.forEach(function (item) {
						if (item.name) {
							if (isNaN(item.name)) {
								data[item.name] = item.value;
							} else {
								options.push({[item.name]: item.value});
							}
						}
					})
				}
		
				$('.temp-form').remove();
				return { ...data, options };
			}
		
			gatherFormResponses (element, ignoreBlock = '') {
				let $that = this;
				let data = {}
				let tempId = $that.unique('temp_form_');
		
				$('body').append($('<form>', {id: tempId, class:'d-none temp-form'}));
				let $clone = $(element).clone(true, true);
					$(`#${tempId}`).append($clone);
		
				let el;
				let parent_id = $(`#${tempId}`).data('block-for');
				if (ignoreBlock) {
					el = $(`#${tempId}`).find('[enquiry-block]');
					$.each($('body').find(`#${tempId}`).find(ignoreBlock), function (index, item) {
						$(item).remove();
					})
				} else {
					el = $(element);
					parent_id = $(element).data('block-for');
				}
		
				data.question = $(el).find('[question-area]').find('[data-question]').text().trim();
				data.helptext = $(el).find('[question-area]').find('[data-helptext]').text().trim();
				if (parent_id) data.parent_id = String(parent_id);
				let inputType = $(el).attr('data-input-type');
				data.input_type = inputType;
		
				if (inputType == 'dropdown') {
					data.response = $(el).find('[data-select-id]').val()
					data.responseRaw = $(el).find(`[value="${data.response}"]`).text();
				} else if (inputType == 'multiselect') {
					data.response = [];
					data.responseRaw = [];
					$.each($(el).find('[type="checkbox"]:checked'), function (i, el) {
						data.response.push($(el).attr('name'));
						data.responseRaw.push($(el).val());
						data.input_type = inputType;
					})
				} else if (inputType == 'textfield') {
					data.response = $(el).find('textarea').val();
				} else if (inputType == 'datetime') {
					data.response = $(el).find('[type="datetime-local"]').val();
					data.responseRaw = new Date(data.response).getTime();
				} else if (inputType == 'date') {
					data.response = $(el).find('[type="date"]').val();
					data.responseRaw = new Date(data.response).getTime();
				} else if (inputType == 'range') {
					let elem =  $(el).find('[type="range"]');
					data.response = elem.val();
					data.responseRaw = data.response;
					data.max = elem.attr('max');
					data.min = elem.attr('min');
				} else if (inputType == 'radio') {
					let elem =  $(el).find('[type="radio"]:checked');
					data.response = elem.val();
					data.responseRaw = $(el).find(`[for="${elem.attr('id')}"]`).text();
					if (data.responseRaw) data.responseRaw = data.responseRaw.trim();
				}
		
				$('.temp-form').remove();
				return data;
			}
		
			/**
			 * @author imshawan
			 * @function getMetaData
			 * @description Gets the meta data generated by the enquiry form (User input/formdata) and returns it as JSON
			 * @returns {Object}
			 */
			getMetaData() {
				let $that = this;
				let $target = this.$builder;
				let enquiryblocks = [];
				let requiresValidation = $that.requiresValidation;
				
				$.each($($target).find('[enquiry-block]'), function (i, el) {
					let data = {};
					let child = [];
					data = { ...$that.gatherMetaData(el, '[enquiry-block-child]') };
		
					$.each($(el).find('[enquiry-block-child]'), function (i, el) {
						let parent_id = $(el).parent().attr('data-block-for');
						child.push({ parent_id, ...$that.gatherMetaData(el) });
					})
					
					enquiryblocks.push({...data, child});
				})
		
				return {
					title: $target.find('[name="title"]').val(),
					blocks: enquiryblocks
				}
			}
		
			/**
			 * @author imshawan
			 * @function getFormResponses
			 * @description Returns the responses of the enquiry form (User input/formdata) as JSON
			 * @returns {Object}
			 */
			getFormResponses() {
				let $that = this;
				let $target = this.$builder;
				let responses = [];
				let requiresValidation = $that.requiresValidation;
				let errors = 0;
				console.log($that);
		
				if ($that.data.action == 'answer') {
					$.each($($target).find('[enquiry-block]'), function (i, elem) {
						let data = {};
						let child = [];
						data = $that.gatherFormResponses(elem, '[conditional-answering-block]');
		
						if (!data.response && requiresValidation) {
							$(elem).addClass('border-danger');
							errors++;
						} else {
							$(elem).removeClass('border-danger');
						}
						$.each($(elem).find('[conditional-answering-block]'),function (i, el) {
							child.push($that.gatherFormResponses(el))
						})
						responses.push({...data, child})
					})
		
					if (errors > 0) {
						// Can use any custom alert here
						return alert('All fields are required');
					} else {
						return {
							title: $target.find('[form-title]').text(),
							blocks: responses
						}
					}
				} else return {};
			}

			/**
			 * @date 15-07-2022
			 * @author imshawan
			 * @function getJSON
			 * @description Returns the JSON responses of the enquiry form based on the mode of the enquiryform
			 * @returns {Object}
			 */
			getJSON() {
				let $that = this;

				if ($that.data.action == 'create') {
					return $that.getMetaData();
				} else if ($that.data.action == 'answer') {
					return $that.getFormResponses();
				}

				return {};
			}
		}