(function ($) {
	let defaults = {
		user: {
			picture: "https://sdlms.deepthought.education/assets/uploads/files/profile_images/default_profile-image-from-rawpixel-id-6270472-original.jpg",
			name: "John Doe",
			role: "Admin"
		}
	}
	let template = {
		form: function (options) {
			let form = $('<form/>', {
				class: 'needs-validation col-12 mx-0 px-0 row sdlms-form-elements',
				novalidate: true,
				id: options.id || app.unique()
			});
			return form;
		},
		filters: {
			type: function (options = []) {
				return ` <div class="form-group">
                    <label for="assets">Assets</label>
                    <select class="form-control" name="type">
                        ${options.map((option) => `<option value="${option.value}">${option.name}</option>`).join('')}
                    </select>
                </div>`
			},
			users: function (options = {}) {
				return ` <div class="form-group">
                    <label for="users">Users</label>
                    <select class="form-control" name="users" multiple></select>
                </div>`
			},
			query: function (options = {}) {
				return ` <div class="form-group col-10">
                    <label for="search">Contains</label>
                    <input type="search" value="${options.value || ''}"  class="form-control" name="query" placeholder="Search">
                </div>`
			},
			date: function (options = {}) {
				return ` <div class="form-group">
					<label for="Date">Date</label>
					<input type="hidden" value="${options.start || ''}"  name="startDate">
					<input type="hidden" value="${options.end || ''}"  name="endDate">
					<input type="text" value="${options.value || ''}"  class="form-control" name="date" placeholder="Date">
				</div>`
			},
			submit: function (options = {}) {
				return ` <div class="align-items-end row mb-3 pr-0 col-2 justify-content-end">
						  <button type="submit" class="sdlms-button button-primary button-lg btn-block">Search</button>
					</div>`
			}

		},
		stickers: function (id, data = []) {
			return `<div class="sdlms-asset-sticker" data-id="${id}">
			<div class="add-sticker-icon"><i class="fas fa-plus"></i></div>
				${data.map((sticker, index) => `<div class="sdlms-asset-sticker-item">
					<label class="sdlms-asset-sticker-item-label" for="${id}-${index}">
						<span>${sticker.emoji}</span>
					</label>
					<input type="radio" name="stickers" value="${sticker.value}" id="${id}-${index}">
				</div>
				`).join('')}
				<div class="sdlms-asset-sticker-item">
					<emoji-picker></emoji-picker>
				</div>
				
			</div>`
		},
		assets: {
			empty: function (options = {}) {
				return `<div class="sdlms-asset-empty">
					<h3 class="text-center">No Assets Found</h3>
				</div>`
			},
			"observation:reflection": function (article = {}) {

				article.user = article.user || {};
				article.observation.profile = article.observation.profile || {};
				article.observation.profile.role = article.observation.profile.role || "";

				let { content = "", user: { fullname, picture = defaults.user.picture, signature, displayname } } = article;
				return `<div class="card border-0 mb-4 ${article.classes || ''}" single-asset data-_id="${article._id}" data-emoji="${article.sticker || ''}" data-type="${article.type}">
						 ${article.stickers}
						<div class="asset-observation-refelection d-flex p-3">
							 <div class="asset-observation-image d-flex align-items-center">
							 	<img src="${picture}" onerror="this.src='${defaults.user.picture}'" alt="${fullname || displayname || defaults.user.name}" >
								<div class="animated-emoji"></div>
							 </div>
							 <div class="asset-observation-content pl-3">
								 <div class="asset-observation-title sdlms-text-black-22px font-weight-500">${fullname || displayname || defaults.user.name}</div>
								 <div class="asset-observation-description sdlms-text-black-17px text-ellipse-4">${$(`<span>${content}</span>`).text()}</div>
								 <div class="asset-observation-role d-flex sdlms-text-black-14px justify-content-between pt-2">
										<div class="asset-observation-role-name"><b>${article.observation.profile.role}</b></div>
										<div class="asset-observation-joined"><b>${article.createdAt}</b></div>
								 </div>		
							 </div>
						</div>
                </div>`
			},
			default: function (asset = {}) {
				asset.user = asset.user || {};
				let { content = "", user: { fullname, picture = defaults.user.picture, signature, displayname } } = asset;
				return `<div class="card border-0 mb-4 ${asset.classes || ''}" single-asset data-_id="${asset._id}" data-emoji="${asset.sticker || ''}" data-type="${asset.type}">
						 ${asset.stickers}
						<div class="asset-observation-refelection d-flex p-3">
							 <div class="asset-observation-image d-flex align-items-center">
							 	<img src="${picture}" onerror="this.src='${defaults.user.picture}'" alt="${fullname || displayname || defaults.user.name}" >
								<div class="animated-emoji"></div>
							 </div>
							 <div class="asset-observation-content pl-3">
								 <div class="asset-observation-title sdlms-text-black-22px font-weight-500">${fullname || displayname || defaults.user.name}</div>
								 <div class="asset-observation-description sdlms-text-black-17px text-ellipse-4">${$(`<span>${content}</span>`).text()}</div>
								 <div class="asset-observation-role d-flex sdlms-text-black-14px justify-content-end pt-2">
										<div class="asset-observation-joined"><b>${asset.createdAt}</b></div>
								 </div>		
							 </div>
						</div>
                </div>`
			}
		}
	};
	let defaultOptions = {
		filters: {
			type: [{
				name: "Observation",
				value: "observation:reflection"
			}, {
				name: "Threadbuilder",
				value: "threadbuilder"
			}, {
				name: "Eaglebuilder",
				value: "eaglebuilder"
			}, {
				name: "Article",
				value: "article"
			}],
			query: {
				value: ""
			},
			users: {
				value: []
			},
			date: {
				start: new Date(),
				end: new Date()
			},
		},
		stickers: {
			"defaults": [{
				name: "Happy",
				value: "😀",
				emoji: "😀"
			}, {
				name: "Sad",
				value: "😔",
				emoji: "😔"
			}],
			"observation:reflection": [{
				name: "Happy New Year",
				value: "🎉",
				emoji: "🎉"
			}]
		},
		containers: {
			filters: ".widgetsArea .widget-filters",
			assets: ".widgetsArea .widget-body",
			pagination: ".widgetsArea .widget-pagination",
			scroller: "#page-content-wrapper > .tabs-container"
		},
		classes: 'col-12 col-md-4',
		formats: {
			// 21 July
			date: "DD MMM, YYYY",
		},
		pagination: "scroll",
	}

	window.widgets = window.widgets || {};

	let assets = function (options) {
		this.options = $.extend(true, {}, defaultOptions, options);
		console.log(this.options);
		this.init()
	}

	assets.prototype.init = function () {


		this.id = app.unique();

		/// Create the filters
		let filters = this.options.filters || {};

		this.filters = filters;
		this.stickers = this.options.stickers || {};
		this.callbacks = this.options.callbacks || {};


		this.filters.startDate = (this.options.filters.date || {}).start;
		this.filters.endDate = (this.options.filters.date || {}).end;
		this.hasDateFilters = this.filters.endDate && this.filters.startDate;
		this.hasUserFilters = this.options.filters.users;
		this.hasStickers = Object.keys(this.stickers).length > 0;
		this.classes = this.options.classes || '';
		this.pagination = this.options.pagination || 'scroll';


		let filtersHtml = Object.keys(filters).map((filter) => {
			if (!template.filters[filter]) return '';
			if (filters[filter] instanceof Object) {
				return template.filters[filter](filters[filter]);
			} else if (filters[filter] instanceof Array) {
				return template.filters[filter](filters[filter]);
			}
		}).join('');

		if (String(filtersHtml).trim()) filtersHtml += template.filters.submit();

		this.hidden = this.options.filters.hidden || {};

		/// Create the form
		let formHTML = template.form({ id: this.id });
		formHTML.append(filtersHtml);


		/// Append the form to the 
		$(this.options.containers.filters).append(formHTML);

		this.$form = $(`#${this.id}`);


		/// Add the event listeners
		this.addEventListeners();

		this.getAssets();


	}

	assets.prototype.addEventListeners = function () {
		let self = this;

		this.hasUserFilters && this.addSearchEventListeners();
		this.hasDateFilters && this.addDateEventListeners();
		this.hasStickers && this.addStickerEventListeners();

		this.$form.on('submit', function (e) {
			e.preventDefault();
			$(self.options.containers.assets).empty();
			self.getAssets();
		});

		$(this.options.containers.assets).on('click', '[single-asset]', function (e) {

			if ($(e.target).parent().hasClass('sdlms-asset-sticker') || $(e.target).parent().hasClass('sdlms-asset-sticker-item')) return;
			self.fire('onClick', $(this));
		})
	}
	assets.prototype.fire = function (name, ev) {
		if (this.callbacks[name]) this.callbacks[name](ev);
	}
	assets.prototype.getAssets = function (params = {}) {


		if(this.loading) return;

		let self = this;
		let data = $(self.$form).serializeArray();
		let payload = {};

		/// multiple select
		data.forEach((item) => {
			if (payload[item.name]) payload[item.name] = payload[item.name] instanceof Array ? payload[item.name].push(item.value) : [payload[item.name], item.value];
			else payload[item.name] = item.value;
		});

		payload = self.sanitizePayload(payload);
		payload = {
			...payload,
			...params
		}


		self.loader(true);
		require(['api'], function (api) {
			api.post('/globals/getassets', payload).then((data) => {
				self.renderAssets(data);
			})
		})

	}

	assets.prototype.sanitizePayload = function (payload) {


		Object.keys(payload).forEach((key) => {
			if (payload[key] === "") delete payload[key];
			if (payload[key] instanceof Array && payload[key].length === 0) delete payload[key];
			if (!(key in this.filters) || !this.filters[key]) delete payload[key];
			if (payload[key] instanceof Array) payload[key] = payload[key].map((item) => isNaN(item) ? item : parseInt(item));
		});

		payload = {
			...this.hidden,
			...payload
		}

		return payload;

	}

	assets.prototype.renderAssets = function (data) {
		let assets = data.data;
		assets = assets.map((asset) => {
			asset.createdAt = moment(asset.createdAt).format(this.options.formats.date);
			asset.stickers = this.getStickers(asset._id, asset.type, true);
			asset.classes = this.classes;
			return asset;
		})

		let getHTML = (asset, index) => template.assets[asset.type] ? template.assets[asset.type](asset) : template.assets.default(asset);
		let html = assets.map(getHTML).join('');

		if (!html) html = template.assets.empty();
		$(this.options.containers.assets)[this.pagination === 'scroll' ? 'append' : 'html'](html);

		this.loader(!true);
		this.pagination === 'scroll' && this.getScrollPagination(data);
		this.pagination === 'page' && this.getPagePagination(data)
		this.stickers && this.setEmojiPicker();

	}

	assets.prototype.getPagePagination = function (data) {

		let self = this;
		require(['sdlms/pagination'], function (p) {
			let pagination = new Pagination({
				target: self.options.containers.pagination,
				onChange: self.paginate.bind(self),
			});
			pagination.paginate(data);
		});

	}

	assets.prototype.getScrollPagination = function (data) {

		let self = this;
		
		$(this.options.containers.scroller).off('scroll').on('scroll', function (e) {
			let $this = $(this);
			let scrollHeight = $this[0].scrollHeight;
			let scrollTop = $this.scrollTop();
			let height = $this.height();
			let offset = 300;
			if (self.loading || (scrollTop + height + offset) < scrollHeight || !data.next_page_url) return;

			let queryParams = app.getQueryParams(data.next_page_url.split('?')[1]);
			self.getAssets(queryParams);

		});

	}

	assets.prototype.paginate = function (url) {

		let self = this;
		require(['api'], function (api) {
			let queryParams = app.getQueryParams(url.split('?')[1]);
			self.getAssets(queryParams);
		});

	}

	assets.prototype.loader = function (state) {
		$(this.options.containers.assets).toggleClass('ajaxifying', state);
		this.$form.find('button[type="submit"]').attr('disabled', state);
		this.loading = state;
	}

	assets.prototype.addDateEventListeners = function () {
		let $date = this.$form.find('input[name="date"]');
		let self = this;

		this.startDate = this.options.filters.date.start;
		this.endDate = this.options.filters.date.end;

		var start = moment(this.startDate).subtract(29, 'days');
		var end = moment(this.endDate);

		$date.daterangepicker({
			startDate: start,
			endDate: end,
			ranges: {
				'Today': [moment().startOf('day'), moment().endOf('day')],
				'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
				'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
				'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			}
		}, (start, end) => {
		}).on('apply.daterangepicker', function (ev, picker) {
			self.setDate(picker.startDate, picker.endDate);
		});
		self.setDate(start, end);
	}

	assets.prototype.setDate = function (start, end) {
		this.$form.find('input[name="date"]').val(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
		this.$form.find('input[name="startDate"]').val(start.valueOf());
		this.$form.find('input[name="endDate"]').val(end.valueOf());
	}


	assets.prototype.addSearchEventListeners = function () {
		let $users = this.$form.find('select[name="users"]');
		$users.select2({
			ajax: {
				url: '/api/users',
				dataType: 'json',
				data: function (params) {
					var query = {
						query: params.term
					}
					return query;
				},
				processResults: function (data) {
					let results = {
						results: data.users.map(function (row) {
							return {
								id: row.uid,
								text: row.displayname || row.fullname || row.username
							}
						})
					};
					return results;
				}
			}
		});
	}

	assets.prototype.addStickerEventListeners = function () {

		let self = this;
		$(this.options.containers.assets).on('change', '[name="stickers"]', function (e) {
			let $this = $(this);
			let value = $this.val();
			let { _id: id, type } = $this.parents('[single-asset]').data();
			self.setSticker(id, type, value);
		});


	}

	assets.prototype.setEmojiPicker = function () {
		let self = this;
		$(this.options.containers.assets).find('emoji-picker').each(function (index, elem) {
			let { _id: id, type, emoji } = $(elem).parents('[single-asset]').data();
			EmojiButton(this, (emoji) => self.setSticker(id, type, emoji));
			emoji && self.animateAndSetSticker(id, type, emoji);
		});
	}

	assets.prototype.setSticker = function (id, type, value) {

		this.animateAndSetSticker(id, type, value);

		require(['api'], function (api) {
			api.put(`/globals/assets/sticker/${id}`, {
				sticker: value,
				type: type
			}).then(function (data) {
				console.log(data);
			}).catch(function (err) {
				console.log(err);
			});
		});

	}

	assets.prototype.animateAndSetSticker = function (id, type, emoji) {
		if (!this.hasStickers) return console.log('no stickers');
		let $parent = $(this.options.containers.assets).find(`[single-asset][data-_id="${id}"]`);
		$parent.find(`emoji-picker`).html(emoji);
		$parent.find(`.animated-emoji`).html(`<span>${emoji}</span>`).addClass('animate');
		setTimeout(() => {
			$parent.find(`.animated-emoji`).toggleClass('animate');
		}, 3000);
	}

	assets.prototype.getStickers = function (id, type, withDefaults = true) {
		if (!this.hasStickers) return '';
		let self = this;
		let defaults = this.stickers.defaults || [];
		let stickers = this.stickers[type] || [];
		stickers = withDefaults ? stickers.concat(defaults) : stickers;

		return template.stickers(id, stickers);
	}

	window.widgets.Assets = assets;

	// <div class="widgetsArea d-flex flex-wrap">
	//         <div class="widget-filters col-3 d-flex border-right"></div>
	//     <div class="align-items-start col-9 d-flex widget-body flex-wrap"></div>
	//     <div class="d-flex col-12 widget-pagination"></div>
	// </div>
	// window.widgets && new window.widgets.Assets({
	// 	filters: {
	// 		type: null,
	// 		users: null,
	// 		date: null,
	// 		query: null,
	// 		hidden: {
	// 			type: "observation:reflection",
	// 			limit: 6,
	// 		}
	// 	},
	// 	// stickers: null,
	// 	classes:'col-12 col-md-4'
	// })

})(jQuery);